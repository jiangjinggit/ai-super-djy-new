import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { relay } from './relay.mjs';
const root=path.dirname(fileURLToPath(import.meta.url));
const port=Number(process.env.RADAR_PORT||4317);
const origin=process.env.RADAR_PUBLIC_ORIGIN;
if(origin && new URL(origin).origin!==origin)throw new Error('RADAR_PUBLIC_ORIGIN must be an origin');
const origins=new Set([`http://127.0.0.1:${port}`,`http://localhost:${port}`,...(origin?[origin]:[])]);
const json=(res,status,data)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8'});res.end(JSON.stringify(data));};
let active=0;
const server=createServer(async(req,res)=>{
  res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');
  res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self' data:; object-src 'none'; frame-ancestors 'self'; base-uri 'self'; form-action 'self'");
  if(![...origins].some(o=>new URL(o).host===req.headers.host))return json(res,403,{error:'host_not_allowed'});
  if(req.headers.origin&&!origins.has(req.headers.origin))return json(res,403,{error:'origin_not_allowed'});
  if(req.headers['sec-fetch-site']==='cross-site')return json(res,403,{error:'cross_site_denied'});
  const u=new URL(req.url,'http://localhost');
  const route=u.pathname.replace(/^\/radar(?=\/)/,'');
  const assets={'/':'web/browser-index.html','/index.html':'web/browser-index.html','/app.js':'web/browser-app.js','/style.css':'web/style.css','/client.js':'web/client.js','/storage.js':'web/storage.js','/engine.js':'core.mjs'};
  try{
    if(req.method==='GET'&&assets[route]){const file=assets[route];res.writeHead(200,{'Content-Type':file.endsWith('.html')?'text/html; charset=utf-8':file.endsWith('.css')?'text/css; charset=utf-8':'text/javascript; charset=utf-8'});res.end(await readFile(path.join(root,file)));return;}
    if(route==='/api/health'&&req.method==='GET')return json(res,200,{ok:true,mode:'browser-owned'});
    if(route!=='/api/relay'||req.method!=='POST')return json(res,404,{error:'not_found'});
    if(req.headers['x-radar-client']!=='browser-v1'||!req.headers['content-type']?.startsWith('application/json'))return json(res,403,{error:'invalid_client'});
    if(active>=8)return json(res,429,{error:'relay_busy'});
    active++;
    const abort=new AbortController();const timeout=setTimeout(()=>abort.abort(),95000);
    const close=()=>{if(!res.writableEnded)abort.abort();};res.on('close',close);
    try{
      let size=0;const chunks=[];
      for await(const chunk of req){size+=chunk.length;if(size>512000)throw new Error('body_limit');chunks.push(chunk);}
      const input=JSON.parse(Buffer.concat(chunks).toString('utf8'));
      const result=await relay(input,abort.signal);
      if(!res.destroyed)json(res,result.status,result.data);
    }catch{if(!res.destroyed)json(res,400,{error:'请求未完成，请检查接口地址、密钥、模型和网络。仅支持公网 HTTPS 接口。'});}
    finally{clearTimeout(timeout);res.off('close',close);active--;}
  }catch{if(!res.headersSent)json(res,500,{error:'service_error'});else res.end();}
});
server.requestTimeout=100000;
server.listen(port,'127.0.0.1',()=>console.log(`需求雷达：http://127.0.0.1:${port}/radar/（配置与报告保存在浏览器）`));
