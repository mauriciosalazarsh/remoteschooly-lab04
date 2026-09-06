// Usage: node tools/export-diagrams.mjs /absolute/path/to/archify
// Requires Archify's ChromeVisualBrowser and a locally installed Chrome.
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const archify=process.argv[2];
if(!archify) throw new Error('Pass the local archify directory as the first argument');
const {findChrome,ChromeVisualBrowser}=await import(pathToFileURL(path.join(archify,'bin/visual-check.mjs')));
const ch=findChrome();const browser=new ChromeVisualBrowser(ch.executable||ch.path||ch);
const session=await browser.sessionPromise; const cdp=browser.cdp;
async function ev(expression){const r=await cdp.send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true},session);if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result?.value;}
const variants=[['arquitectura','', 'RemoteSchooly · Arquitectura lógica'],['arquitectura','hp1','RemoteSchooly · Arquitectura · HP1 Distribución'],['arquitectura','hp2','RemoteSchooly · Arquitectura · HP2 Generación con IA'],['happy-path-1-distribucion','','RemoteSchooly · HP1 Distribución semanal'],['happy-path-2-generacion-ia','','RemoteSchooly · HP2 Generación con IA']];
try{
 for(const [base,view,title] of variants){
  const ir=JSON.parse(fs.readFileSync(`Diagramas/${base}.${base==='arquitectura'?'architecture':'sequence'}.json`));
  const [w,h]=ir.meta.viewBox;const width=w+64,height=h+180;
  await cdp.send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1.5,mobile:false},session);
  let ready=cdp.waitFor('Page.loadEventFired',session);await cdp.send('Page.navigate',{url:'about:blank'},session);await ready;
  const url=pathToFileURL(path.resolve(`Diagramas/${base}.html`));url.searchParams.set('theme','light');if(view)url.hash=`view=${view}`;
  ready=cdp.waitFor('Page.loadEventFired',session);await cdp.send('Page.navigate',{url:url.href},session);await ready;
  await ev(`(async()=>{await document.fonts.ready; await new Promise(r=>setTimeout(r,700)); if(window.Archify?.view)Archify.view.reset({automatic:true});await new Promise(r=>setTimeout(r,700));return true})()`);
  const dim=await ev(`(()=>{
    const svg=document.querySelector('.diagram-container svg');
    const clone=svg.cloneNode(true);
    clone.setAttribute('width','${w}');clone.setAttribute('height','${h}');
    const main=document.createElement('main'); main.id='export-sheet';
    const heading=document.createElement('h1');heading.textContent=${JSON.stringify(title)};main.append(heading);
    const sub=document.createElement('p');sub.textContent='Caso 4 · Arquitectura de Software · Fabian Alvarado Vargas / Mauricio Salazar Hillenbrand · v3.2';main.append(sub);
    const chart=document.createElement('div');chart.className='diagram-container';chart.append(clone);main.append(chart);
    document.body.replaceChildren(main);document.documentElement.setAttribute('data-theme','light');
    const style=document.createElement('style');style.textContent=
      'html,body{margin:0!important;padding:0!important;background:white!important;color:#17253c!important;overflow:visible!important;min-width:0!important;} #export-sheet{display:block!important;box-sizing:border-box!important;width:${width}px!important;max-width:none!important;margin:0!important;padding:24px 32px!important;} #export-sheet h1{font:600 25px system-ui!important;margin:0 0 8px!important;text-align:left!important;} #export-sheet p{font:14px system-ui!important;margin:0 0 20px!important;} .diagram-container{display:block!important;width:${w}px!important;max-width:none!important;height:${h}px!important;min-height:0!important;margin:0!important;padding:0!important;border:0!important;overflow:visible!important;box-shadow:none!important;transform:none!important;} .diagram-container svg{display:block!important;width:${w}px!important;height:${h}px!important;max-width:none!important;transform:none!important;} @media print{#export-sheet .diagram-container svg[data-focus-active] [data-node-id],#export-sheet .diagram-container svg[data-focus-active] [data-edge-from]{opacity:0.13!important;}#export-sheet .diagram-container svg[data-focus-active] [data-focus-match]{opacity:1!important;}*{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}html,body,#export-sheet,.diagram-container,svg{visibility:visible!important;display:block!important;} @page{size:${width}px ${height}px;margin:0;}}';document.head.append(style);
    return {width:${width},height:${height},texts:clone.querySelectorAll('text').length};})()`);
  const stem=`Diagramas/${base}${view?'-'+view:''}`;
  const shot=await cdp.send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:{x:0,y:0,width,height,scale:1}},session,30000);fs.writeFileSync(stem+'.png',Buffer.from(shot.data,'base64'));
  const pdf=await cdp.send('Page.printToPDF',{printBackground:true,preferCSSPageSize:true,paperWidth:width/96,paperHeight:height/96,marginTop:0,marginBottom:0,marginLeft:0,marginRight:0,scale:1},session,30000);fs.writeFileSync(stem+'.pdf',Buffer.from(pdf.data,'base64'));console.log(JSON.stringify({stem,...dim}));
 }
}finally{await browser.close();}
