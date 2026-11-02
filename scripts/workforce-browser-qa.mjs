import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
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
  const image = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: Boolean(selector), ...(selector && clip ? { clip } : {}) });
  writeFileSync(path.join(output, name + ".png"), Buffer.from(image.data, "base64"));
}
async function assert(name, expression) { const passed = await evaluate(expression); checks.push({ name, passed }); if (!passed) errors.push(name); }
async function setSiteLanguage(locale) {
  await evaluate("document.querySelector('.header-actions .language-switch').click()");
  await pause(50);
  await evaluate(`document.querySelector('.header-actions [data-locale="${locale}"]').click()`);
  for (let i = 0; i < 200; i++) {
    if (await evaluate(`document.documentElement.lang === '${locale}' && !document.querySelector('.language-picker [aria-busy="true"]')`)) { await pause(180); return; }
    await pause(50);
  }
  throw new Error(`Language did not load: ${locale}`);
}
const roles = JSON.parse(readFileSync('src/data/recruitment/workforce.json','utf8')).workforce.map(role => ({ ...role, slug: role.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') }));
async function fill(id, value) {
  await evaluate(`(() => { const input = document.getElementById(${JSON.stringify(id)}); Object.getOwnPropertyDescriptor(input instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : input instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype, 'value').set.call(input, ${JSON.stringify(value)}); input.dispatchEvent(new Event(input.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true })); })()`);
  await pause(60);
}
async function waitFor(expression) {
  for(let i=0;i<150;i++) { if(await evaluate(expression)) return; await pause(50); }
  throw Error('Timed out: '+expression);
}
const noOverflow = 'document.documentElement.scrollWidth <= innerWidth + 1';
await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setFocusEmulationEnabled', { enabled: true });
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
await viewport(1440);
await go('/workforce/');
await assert('Directory contains all 18 roles', "document.querySelectorAll('main article').length === 18");
await shot('workforce-directory-desktop');
await evaluate("document.querySelector('input[type=search]').id='workforce-search'");
await fill('workforce-search', 'TIG');
await assert('Skill search finds the welder', "document.querySelectorAll('main article').length === 1 && document.querySelector('main article h3').textContent === 'Welder'");
await fill('workforce-search','not-a-real-role');
await assert('Search empty state', "document.querySelector('main').textContent.includes('No matching profiles')");
await evaluate("[...document.querySelectorAll('main button')].find(button=>button.textContent === 'Clear filters').click()");
await assert('Clear filters restores all roles', "document.querySelectorAll('main article').length === 18");
await evaluate("document.querySelectorAll('[role=group] button')[1].click()");
await assert('Technical category preserves 7 roles', "document.querySelectorAll('main article').length === 7");
await evaluate("document.querySelectorAll('[role=group] button')[0].click(); document.querySelector('main select').id='industry-select'");
await fill('industry-select','Healthcare');
await assert('Industry filter shows nurse and caregiver', "document.querySelectorAll('main article').length === 2 && document.querySelector('main').textContent.includes('Caregiver')");
await go('/workforce/');
const links = await evaluate("[...document.querySelectorAll('main article h3 a')].map(a=>a.getAttribute('href'))");
for(const [i,role] of roles.entries()) {
  await go(links[i]);
  await assert(`${role.slug}: correct title and content`, `document.querySelector('h1').textContent === ${JSON.stringify(role.title)} && document.querySelectorAll('main article details').length === 3`);
  await assert(`${role.slug}: desktop layout`, noOverflow);
  await evaluate("Promise.all([...document.querySelectorAll('main img')].map(img=>{img.loading='eager';return img.decode().catch(()=>{});} ))");
  await assert(`${role.slug}: images load`, "[...document.querySelectorAll('main img')].every(img=>img.complete && img.naturalWidth > 0)");
  if(i===0) {
    await shot('workforce-role-desktop');
    await shot('workforce-role-hiring-desktop','#hiring');
    await evaluate("document.querySelector('main details summary').focus()");
    await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',text:'\r',windowsVirtualKeyCode:13});
    await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
    await pause(100);
    await assert('FAQ supports keyboard opening', "document.querySelector('main details').open");
  }
  await viewport(390);
  await assert(`${role.slug}: mobile layout`,noOverflow);
  if(i===0) await shot('workforce-role-mobile');
  await evaluate("document.querySelector('main a[href*=\"?role=\"]').click()");
  await waitFor(`document.querySelector('#brief-role')?.value === ${JSON.stringify(role.title)}`);
  await assert(`${role.slug}: enquiry prefills correct role`, `document.querySelector('#brief-role').value === ${JSON.stringify(role.title)}`);
  await assert(`${role.slug}: mobile enquiry layout`,noOverflow);
  await viewport(1440);
}
await go('/request-workforce/?role=welder');
await waitFor("document.querySelector('#brief-role')?.value === 'Welder'");
await assert('Unconfigured email is clearly disabled', "document.querySelector('form button[type=submit]').disabled && document.querySelector('#email-unavailable').textContent.includes('awaiting verification')");
await assert('Required fields reject empty form', "!document.querySelector('form').checkValidity()");
for(const [id,value] of Object.entries({'brief-company':'A&B #1','brief-person':'José शर्मा','brief-email':'invalid','brief-country':'Germany','brief-quantity':'0','brief-details':'Two shifts & specialist welding\nNo personal records.'})) await fill(id,value);
await assert('Email and headcount validation', "!document.querySelector('#brief-email').checkValidity() && !document.querySelector('#brief-quantity').checkValidity()");
await fill('brief-email','buyer@example.com'); await fill('brief-quantity','12');
await assert('Valid brief passes validation', "document.querySelector('form').checkValidity()");
await send('Browser.setDownloadBehavior',{behavior:'allow',downloadPath:path.join(output,'workforce-downloads')});
await evaluate("window.__originalObjectURL=URL.createObjectURL; URL.createObjectURL=(blob)=>{window.__briefBlob=blob;return window.__originalObjectURL(blob)}; document.querySelector('form button[type=button]').click()");
await waitFor('!!window.__briefBlob');
const downloaded = await evaluate('window.__briefBlob.text()');
if(!downloaded.includes('A&B #1') || !downloaded.includes('José शर्मा') || !downloaded.includes('Workforce role: Welder')) errors.push('Downloaded brief did not preserve form details');
await assert('Download status never claims submission', "document.querySelector('form [role=status]').textContent.includes('Nothing has been sent')");
await shot('workforce-enquiry-desktop');
await viewport(390); await shot('workforce-enquiry-mobile');
await go('/request-workforce/?role=not-a-role');
await assert('Unknown role does not populate a fake option', "document.querySelector('#brief-role').value === ''");
await go('/request-workforce/?role=Site%20Engineer');
await waitFor("document.querySelector('#brief-role')?.value === 'Site Engineer'");
await assert('Legacy title query still works', "document.querySelector('#brief-role').value === 'Site Engineer'");
await fill('brief-company','Retained while switching');
for(const language of ['hi','ar','he','ru','pt','cs','de','ja','pl','ro']) {
  await setSiteLanguage(language);
  const copy=JSON.parse(readFileSync(`src/locales/workforce/${language}.json`,'utf8'));
  await assert(`${language}: translated form and retained data`, `document.querySelector('h1').textContent === ${JSON.stringify(copy.formTitle)} && document.querySelector('#brief-company').value === 'Retained while switching'`);
  await assert(`${language}: mobile form layout`,noOverflow);
  if(language==='ar') await shot('workforce-enquiry-ar-mobile');
}
await go('/workforce/welder/');
for(const language of ['en','hi','ar','he','ru','pt','cs','de','ja','pl','ro']) {
  await setSiteLanguage(language);
  const copy=JSON.parse(readFileSync(`src/locales/workforce/${language}.json`,'utf8'));
  await assert(`${language}: headings follow language`, `document.querySelector('#overview h2').textContent === ${JSON.stringify(copy.overview)}`);
  await assert(`${language}: English guide accurately marked`, "document.querySelector('#overview p[lang=en]')?.getAttribute('dir') === 'ltr'");
  if(language!=='en') await assert(`${language}: visible fallback notice`, `document.querySelector('main article').textContent.includes(${JSON.stringify(copy.fallback)})`);
  await assert(`${language}: mobile role layout`,noOverflow);
  await assert(`${language}: direction`, `document.documentElement.dir === '${['ar','he'].includes(language)?'rtl':'ltr'}'`);
  if(language==='ar') await shot('workforce-role-ar-mobile');
  if(language==='de') await shot('workforce-role-de-mobile');
}
await setSiteLanguage('en');
for(const width of [360,768,1024,1440]) {
  await viewport(width);
  for(const route of ['/workforce/','/request-workforce/','/industries/','/']) { await go(route); await assert(`${route}: width ${width}`,noOverflow); }
}
await shot('workforce-home-desktop');
await go('/industries/manufacturing/');
await assert('Industry page links to relevant role guides', "document.querySelectorAll('main a[href^=\"/workforce/\"]').length >= 4");
await go('/workforce/not-a-real-role/');
await assert('Unknown route gets exported not-found page', "!document.querySelector('main a[href*=\"?role=\"]')");
writeFileSync(path.join(output,'workforce-browser-qa.json'),JSON.stringify({checks,errors,downloadVerified:true},null,2));
console.log(JSON.stringify({checks:checks.length,failed:checks.filter(check=>!check.passed),errors},null,2));
ws.close();
if(errors.length) process.exitCode=1;
