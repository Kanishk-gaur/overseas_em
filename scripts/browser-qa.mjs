import {writeFileSync} from 'node:fs';
const origin=process.env.QA_ORIGIN || 'http://localhost:3000';
const pages=await (await fetch('http://localhost:9222/json')).json();
const page=pages.find(p=>p.type==='page');
const ws=new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve,reject)=>{ws.addEventListener('open',resolve,{once:true});ws.addEventListener('error',reject,{once:true});});
let id=0;const pending=new Map();const errors=[];
ws.addEventListener('message',({data})=>{const msg=JSON.parse(data);if(msg.id){const p=pending.get(msg.id);pending.delete(msg.id);if(msg.error)p?.reject(new Error(JSON.stringify(msg.error)));else p?.resolve(msg.result);}if(msg.method==='Runtime.exceptionThrown')errors.push(msg.params.exceptionDetails.text+': '+(msg.params.exceptionDetails.exception?.description||''));});
function send(method,params={}){return new Promise((resolve,reject)=>{const key=++id;pending.set(key,{resolve,reject});ws.send(JSON.stringify({id:key,method,params}));});}
async function evaluate(expression){const result=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(result.exceptionDetails)throw new Error(JSON.stringify(result.exceptionDetails));return result.result.value;}
const pause=ms=>new Promise(r=>setTimeout(r,ms));
async function go(path){await send('Page.navigate',{url:origin+path});for(let i=0;i<200;i++){await pause(75);if(await evaluate(`document.readyState==='complete' && location.pathname===${JSON.stringify(new URL(path,origin).pathname)} && !!document.querySelector('h1')`))break;}await evaluate('document.fonts.ready');await pause(250);}
async function viewport(width,height=1000){await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<768});}
async function screenshot(name,full=false){const height=full?await evaluate('document.documentElement.scrollHeight'):1000;const width=await evaluate('innerWidth');const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width,height,scale:1}});writeFileSync('/tmp/globalpath-'+name+'.png',Buffer.from(shot.data,'base64'));}
await send('Page.enable');await send('Runtime.enable');await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
await viewport(1440);await go('/');
await screenshot('desktop');
const pageHeight=await evaluate('document.documentElement.scrollHeight');
for(let y=0;y<pageHeight;y+=900){await evaluate(`scrollTo(0,${y})`);await pause(75);}
await evaluate('scrollTo(0,0)');await pause(150);
const emptyTiles=await evaluate(`[...document.querySelectorAll('.industry-tile')].filter(el=>el.getBoundingClientRect().height<100).length`);
if(emptyTiles)errors.push('An industry tile has collapsed');
for(const [name,selector] of [['about-section','.about-home'],['industries-section','.industries-home']]){const box=await evaluate(`(()=>{const r=document.querySelector('${selector}').getBoundingClientRect();return {x:0,y:r.top+scrollY,width:innerWidth,height:Math.min(r.height,1400),scale:1};})()`);const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:box});writeFileSync('/tmp/globalpath-'+name+'.png',Buffer.from(shot.data,'base64'));}

console.log('DESKTOP',await evaluate(`({title:document.title,h1:document.querySelector('h1').innerText,fonts:document.fonts.status,width:innerWidth,scrollWidth:document.documentElement.scrollWidth})`));
for(const width of [375,430,768,1024,1440,1920]){await viewport(width);await pause(100);const result=await evaluate(`({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,overflow:[...document.querySelectorAll('body *')].filter(el=>{const r=el.getBoundingClientRect();const s=getComputedStyle(el);return r.width>0 && r.right>innerWidth+1 && s.position!=='absolute' && s.position!=='fixed' && !el.closest('.reach-orbit')}).slice(0,5).map(el=>el.className)})`);console.log('VIEWPORT',result);if(result.scrollWidth>width+1)errors.push('Home overflow at '+width);if(width===375)await screenshot('mobile');}
await viewport(1440);
const routes=['/about/','/services/','/industries/','/countries/','/employers/','/process/','/contact/','/privacy-policy/','/terms/'];
const brokenLinks=[];
for(const route of ['/',...routes]){await go(route);const result=await evaluate(`({route:location.pathname,h1:document.querySelectorAll('h1').length,title:document.title,images:[...document.images].filter(i=>i.complete && !i.naturalWidth).map(i=>i.src),canonical:document.querySelector('link[rel=canonical]')?.href})`);console.log('ROUTE',result);if(result.h1!==1)errors.push('Bad heading count '+route);if(result.images.length)errors.push('Broken images '+route);const bad=await evaluate(`(async()=>{const links=[...document.querySelectorAll('main a[href]')].filter(a=>a.origin===location.origin);const out=[];for(const a of links){const u=new URL(a.href);const response=await fetch(u.pathname);if(!response.ok){out.push(a.getAttribute('href'));continue;}if(u.hash){const doc=new DOMParser().parseFromString(await response.text(),'text/html');if(!doc.getElementById(decodeURIComponent(u.hash.slice(1))))out.push(a.getAttribute('href'));}}return out;})()`);brokenLinks.push(...bad);for(const width of [375,768]){await viewport(width);await pause(50);const scrollWidth=await evaluate('document.documentElement.scrollWidth');if(scrollWidth>width+1)errors.push('Overflow '+route+' at '+width);}await viewport(1440);}
await go('/');await evaluate(`document.querySelector('.language-switch').click()`);await pause(250);console.log('HINDI',await evaluate(`({lang:document.documentElement.lang,h1:document.querySelector('h1').innerText,nav:document.querySelector('.desktop-nav').innerText})`));
if(await evaluate(`document.documentElement.lang!=='hi'`))errors.push('Language switch failed');
await viewport(375);await screenshot('mobile-hindi');if(await evaluate('document.documentElement.scrollWidth>innerWidth+1'))errors.push('Hindi overflow');
await send('Page.reload');await pause(900);if(await evaluate(`document.documentElement.lang!=='hi'`))errors.push('Language did not persist');await evaluate(`document.querySelector('.language-switch').click()`);await pause(100);
await evaluate(`document.querySelector('.menu-toggle').click()`);await pause(100);if(!await evaluate(`!!document.querySelector('#mobile-navigation')`))errors.push('Menu failed to open');await evaluate(`document.querySelector('#mobile-navigation a[href^="/about"]').click()`);await pause(600);if(await evaluate(`!!document.querySelector('#mobile-navigation')`))errors.push('Menu did not close');
await go('/contact/?type=employer');await pause(300);console.log('EMPLOYER',await evaluate(`document.querySelector('#employer-tab').getAttribute('aria-selected')`));
if(!await evaluate(`document.querySelector('#employer-tab').getAttribute('aria-selected')==='true'`))errors.push('Employer deep link failed');
await evaluate(`document.querySelector('.enquiry-panel .button').click()`);await pause(100);if(!await evaluate(`!!document.querySelector('dialog[open]')`))errors.push('Contact fallback did not open');await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
await evaluate(`document.querySelector('.faq-list summary').click()`);if(!await evaluate(`document.querySelector('.faq-list details').open`))errors.push('FAQ failed');
console.log('BROKEN_LINKS',[...new Set(brokenLinks)]);console.log('ERRORS',[...new Set(errors)]);writeFileSync('/tmp/globalpath-qa.json',JSON.stringify({brokenLinks:[...new Set(brokenLinks)],errors:[...new Set(errors)]},null,2));
ws.close();if(errors.length||brokenLinks.length)process.exitCode=1;
