import { writeFileSync, readdirSync, mkdirSync } from "node:fs";
import path from "node:path";
const origin = process.env.QA_ORIGIN || "http://localhost:3000";
const output = path.resolve(".review");
mkdirSync(output, { recursive: true });
const pages = await (await fetch("http://localhost:9222/json")).json();
const target = pages.find(page => page.type === "page");
if (!target) throw new Error("Start the isolated QA browser on port 9222.");
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => { ws.addEventListener("open", resolve, { once: true }); ws.addEventListener("error", reject, { once: true }); });
let id = 0;
const pending = new Map(), errors = [], checks = [];
ws.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  if (message.id) { const promise = pending.get(message.id); pending.delete(message.id); if (message.error) promise?.reject(new Error(JSON.stringify(message.error))); else promise?.resolve(message.result); }
  if (message.method === "Runtime.exceptionThrown") errors.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
  if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") errors.push(message.params.args.map(arg => arg.value || arg.description || "").join(" "));
});
function send(method, params = {}) { return new Promise((resolve, reject) => { const key = ++id; pending.set(key, { resolve, reject }); ws.send(JSON.stringify({ id: key, method, params })); }); }
async function evaluate(expression) { const result = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true }); if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text); return result.result.value; }
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
async function go(route) {
  await send("Page.navigate", { url: origin + route });
  let ready = false;
  for (let i = 0; i < 200; i++) { await pause(50); if (await evaluate("document.readyState === 'complete' && location.pathname === " + JSON.stringify(new URL(route, origin).pathname) + " && !!document.querySelector('h1')")) { ready = true; break; } }
  if (!ready) throw new Error("Page not ready: " + route);
  await evaluate("document.fonts.ready");
  await pause(200);
}
async function viewport(width) { await send("Emulation.setDeviceMetricsOverride", { width, height: 1000, deviceScaleFactor: 1, mobile: width < 768 }); await pause(90); }
async function shot(name, selector) {
  if (selector) {
    await evaluate("document.querySelector(" + JSON.stringify(selector) + ").scrollIntoView({block:'start'})");
    await pause(120);
  } else { await evaluate("scrollTo(0,0)"); }
  await evaluate("Promise.all([...document.images].filter(img => img.getBoundingClientRect().bottom > 0 && img.getBoundingClientRect().top < innerHeight).map(img => img.decode().catch(() => {})))");
  const clip = selector ? await evaluate("(()=>{const r=document.querySelector(" + JSON.stringify(selector) + ").getBoundingClientRect(); return {x:r.x+scrollX,y:r.y+scrollY,width:r.width,height:r.height,scale:1};})()") : await evaluate('({x:0,y:0,width:innerWidth,height:1000,scale:1})');
  const image = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, ...(clip ? { clip } : {}) });
  writeFileSync(path.join(output, name + ".png"), Buffer.from(image.data, "base64"));
}
async function assert(name, expression) { const passed = await evaluate(expression); checks.push({ name, passed }); if (!passed) errors.push(name); }
await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
await viewport(1440);
await go("/");
await evaluate("localStorage.setItem('globalpath-language','en'); window.dispatchEvent(new Event('globalpath-language-change'))");
await pause(100);
await shot("desktop-hero");
for (const [name, selector] of [["desktop-flow", ".recruitment-flow-section"], ["desktop-service-section", ".services-studio"], ["desktop-industry-section", ".sector-studio"], ["desktop-people", ".people-intro"], ["desktop-contact-start", ".contact-start"]]) await shot(name, selector);
await assert("Original flow has all 14 cards including parallel tracks", "document.querySelectorAll('.flow-node').length === 14");
await assert("Desktop flow has forward connections and a return branch", "document.querySelectorAll('.flow-connectors > path').length === 15 && document.querySelectorAll('.flow-return').length === 1");
await assert("Interview return branch targets the shared talent pool", "document.querySelector(document.querySelector('.flow-decision a').getAttribute('href')).classList.contains('flow-pools')");
for (let i = 0; i < 4; i++) {
  await evaluate("document.getElementById('service-tab-" + i + "').click()");
  await assert("Service tab " + i + " updates the panel", "document.getElementById('service-tab-" + i + "').getAttribute('aria-selected') === 'true' && document.getElementById('home-service-panel').getAttribute('aria-labelledby') === 'service-tab-" + i + "'");
}
await evaluate("document.getElementById('service-tab-0').click(); document.getElementById('service-tab-0').focus()");
await send("Input.dispatchKeyEvent", { type: "keyDown", key: "ArrowDown", code: "ArrowDown", windowsVirtualKeyCode: 40 });
await send("Input.dispatchKeyEvent", { type: "keyUp", key: "ArrowDown", code: "ArrowDown", windowsVirtualKeyCode: 40 });
await assert("Service tabs support keyboard navigation", "document.activeElement.id === 'service-tab-1' && document.getElementById('service-tab-1').getAttribute('aria-selected') === 'true'");
const layouts = [];
for (const width of [320, 375, 430, 768, 1024, 1440, 1920]) {
  await viewport(width);
  const result = await evaluate("({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,flowWidth:document.querySelector('.flow-chart').getBoundingClientRect().width})");
  layouts.push(result);
  if (result.scrollWidth > width + 1) errors.push("Home overflow at " + width);
  if (width === 375) { await shot("mobile-hero"); await shot("mobile-flow", ".recruitment-flow-section"); }
}
console.log("Home visual checks:", JSON.stringify({ layouts, checks, errors }));
if (process.argv.includes("--visual-only")) { ws.close(); process.exit(errors.length ? 1 : 0); }
const routes = ["/about/", "/services/", "/industries/", "/countries/", "/employers/", "/process/", "/contact/", "/workforce/", "/find-a-job/", "/request-workforce/", "/team/", "/how-we-work/", "/blog/", "/case-studies/", "/glossary/", "/compliance/"];
for (const route of routes) {
  await viewport(1440); await go(route);
  await assert("One main heading: " + route, "document.querySelectorAll('main h1').length === 1");
  await evaluate("Promise.all([...document.querySelectorAll('main img')].map(img => {img.loading='eager'; return img.decode().catch(() => {});} ))");
  const broken = await evaluate("[...document.querySelectorAll('main img')].filter(img => !img.naturalWidth).map(img => img.src)");
  if (broken.length) errors.push("Broken images on " + route + ": " + broken.join(","));
  if (["/workforce/", "/contact/", "/about/", "/services/", "/countries/"].includes(route)) await shot("desktop-" + route.split("/")[1]);
  for (const width of [375, 768, 1440]) {
    await viewport(width);
    const actual = await evaluate("document.documentElement.scrollWidth");
    if (actual > width + 1) errors.push("Overflow " + route + " at " + width + ": " + actual);
  }
  await viewport(375);
  await evaluate("document.querySelector('.language-switch').click()");
  await pause(120);
  if (await evaluate("document.documentElement.scrollWidth > innerWidth + 1")) errors.push("Hindi overflow " + route);
  if (["/contact/", "/workforce/"].includes(route)) await shot("mobile-hindi-" + route.split("/")[1]);
  await evaluate("document.querySelector('.language-switch').click()");
}
await go("/workforce/");
await evaluate("(()=>{const select=document.querySelectorAll('.recruitment-filters select');select[0].value='Healthcare';select[0].dispatchEvent(new Event('change',{bubbles:true}));select[1].value='Technical';select[1].dispatchEvent(new Event('change',{bubbles:true}));})()");
await pause(100);
await assert("Workforce filters combine correctly", "document.querySelectorAll('.workforce-profile').length===1 && document.querySelector('.workforce-profile h3').textContent==='Nurse'");
await evaluate("document.querySelector('.profile-details summary').click()");
await assert("Profile details expand", "document.querySelector('.profile-details').open");
await go("/request-workforce/?role=Nurse");
await assert("Selected role survives the enquiry link", "document.querySelector('.selected-workforce-role h2')?.textContent === 'Nurse'");
await go("/contact/?type=employer");
await assert("Employer contact deep link", "document.querySelector('#employer-tab').getAttribute('aria-selected') === 'true'");
await evaluate("document.querySelector('.enquiry-panel .button').click()");
await assert("Unconfigured contact opens an honest fallback", "!!document.querySelector('dialog[open]')");
await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
await send("Input.dispatchKeyEvent", { type: "keyUp", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
await assert("Escape closes the contact dialog", "!document.querySelector('dialog[open]')");
await evaluate("document.querySelector('.faq-list summary').click()");
await assert("FAQ expands", "document.querySelector('.faq-list details').open");
await go("/");
await viewport(375);
await evaluate("document.querySelector('.language-switch').click()");
await pause(100);
await shot("mobile-hindi-home");
await go("/");
await assert("Hindi preference survives navigation", "document.documentElement.lang === 'hi'");
await evaluate("document.querySelector('.language-switch').click(); document.querySelector('.menu-toggle').click()");
await assert("Mobile menu opens", "!!document.querySelector('#mobile-navigation')");
await evaluate("document.querySelector('#mobile-navigation a[href^=\"/about\"]').click()");
await pause(300);
await assert("Mobile menu closes after navigation", "!document.querySelector('#mobile-navigation')");
await viewport(1440);
await go("/");
await evaluate("document.querySelector('.nav-group summary').click();document.querySelector('.nav-group summary').focus()");
await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
await assert("Escape closes the desktop dropdown", "!document.querySelector('.nav-group details').open");
const walk = directory => readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
const exported = walk("out").filter(file => file.endsWith("index.html") && !file.includes("/404/") && !file.includes("/_not-found/")).map(file => "/" + path.relative("out", path.dirname(file)).split(path.sep).filter(Boolean).join("/") + (path.dirname(file) === "out" ? "" : "/"));
const assets = new Set(), links = new Set(), responses = new Map();
for (const route of exported) {
  const response = await fetch(origin + route);
  const html = await response.text();
  responses.set(route, html);
  if (!response.ok) errors.push("Route failed: " + route);
  for (const match of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) if (match[1].startsWith("/")) assets.add(match[1]);
  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) if (match[1].startsWith("/")) links.add(match[1].replaceAll("&amp;", "&"));
}
for (const asset of assets) if (!(await fetch(origin + asset, { method: "HEAD" })).ok) errors.push("Missing asset: " + asset);
for (const link of links) {
  const url = new URL(link, origin);
  let route = url.pathname.endsWith("/") ? url.pathname : url.pathname + "/";
  let html = responses.get(route);
  if (!html) { const response = await fetch(origin + route); if (!response.ok) { errors.push("Broken link: " + link); continue; } html = await response.text(); responses.set(route, html); }
  if (url.hash && !html.includes('id="' + decodeURIComponent(url.hash.slice(1)) + '"')) errors.push("Missing anchor: " + link);
}
const report = { routes: exported.length, assets: assets.size, internalLinks: links.size, layouts, checks, errors: [...new Set(errors)] };
writeFileSync(path.join(output, "redesign-qa.json"), JSON.stringify(report, null, 2));
console.log("Final QA:", JSON.stringify(report));
await viewport(1440); await go("/");
ws.close();
if (report.errors.length) process.exitCode = 1;
