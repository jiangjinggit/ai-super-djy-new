import https from 'node:https';
import { allowedTarget } from './network.mjs';
const agent=new https.Agent({proxyEnv:process.env});

export function normalizeBase(value) {
  if (typeof value !== 'string' || value.length > 500) throw new Error('invalid_base');
  const u = new URL(value.trim());
  if (u.protocol !== 'https:' || u.username || u.password || u.search || u.hash || (u.port && u.port !== '443')) throw new Error('invalid_base');
  if (/\/(chat\/completions|models)\/?$/.test(u.pathname)) throw new Error('base_not_endpoint');
  return u.href.replace(/\/$/, '');
}
export function relayRequest(input) {
  if (!input || !['search','model'].includes(input.kind)) throw new Error('invalid_kind');
  if (typeof input.key !== 'string' || !input.key.trim() || input.key.length > 4096 || /[\r\n]/.test(input.key)) throw new Error('invalid_key');
  if (input.kind === 'search') {
    if (typeof input.query !== 'string' || !input.query.trim() || input.query.length > 180) throw new Error('invalid_query');
    const url = new URL('https://api.search.brave.com/res/v1/web/search');
    url.search = new URLSearchParams({q:input.query,count:'5',extra_snippets:'false'}).toString();
    return {url,method:'GET',headers:{Accept:'application/json','X-Subscription-Token':input.key}};
  }
  const url = new URL(normalizeBase(input.baseUrl)+'/chat/completions');
  const p=input.payload;
  if (!p || typeof p.model !== 'string' || !/^[a-zA-Z0-9][a-zA-Z0-9._:/-]{0,127}$/.test(p.model) || !Array.isArray(p.messages) || p.messages.length>4 || !p.messages.length || p.messages.some(m=>!['system','user'].includes(m.role)||typeof m.content!=='string') || !Number.isInteger(p.max_completion_tokens) || p.max_completion_tokens<1 || p.max_completion_tokens>4000) throw new Error('invalid_payload');
  const body=JSON.stringify({model:p.model,messages:p.messages,max_completion_tokens:p.max_completion_tokens,store:false,response_format:{type:'json_object'}});
  if(body.length>250000)throw new Error('payload_limit');
  return {url,method:'POST',body,headers:{'Content-Type':'application/json',Authorization:'Bearer '+input.key}};
}
// HTTPS only, public DNS only, pinned address, no redirects. Never forward cookies.
export async function relay(input, signal) {
  const request=relayRequest(input);
  // The fixed Brave endpoint may use the deployment's trusted proxy DNS.
  // Custom model destinations still require public DNS validation and IP pinning.
  const proxySearch=input.kind==='search' && Boolean(process.env.HTTPS_PROXY||process.env.https_proxy);
  const address=proxySearch?null:(await allowedTarget(request.url.href,[request.url.hostname])).address;
  const pinned=new URL(request.url);if(address)pinned.hostname=address.family===6?`[${address.address}]`:address.address;
  return new Promise((resolve,reject)=>{
    const req=https.request(pinned,{method:request.method,headers:{...request.headers,Host:request.url.host},servername:request.url.hostname,agent,signal,
      ...(address?{lookup:(_host,options,cb)=>options.all?cb(null,[address]):cb(null,address.address,address.family)}:{})},res=>{
      if(res.statusCode!==200){res.resume();resolve({status:res.statusCode>=400&&res.statusCode<=599?res.statusCode:502,data:{error:'upstream_rejected'}});return;}
      let size=0;const chunks=[];
      res.on('data',chunk=>{size+=chunk.length;if(size>2_000_000)res.destroy(new Error('response_limit'));else chunks.push(chunk);});
      res.on('error',reject);
      res.on('end',()=>{try{const data=JSON.parse(Buffer.concat(chunks).toString('utf8'));
        // Do not reflect provider debug/error fields which may contain credentials.
        resolve({status:200,data:input.kind==='search'?{web:{results:(data.web?.results||[]).slice(0,5).map(x=>({url:x.url,title:x.title,description:x.description,age:x.age,page_age:x.page_age}))}}:{choices:data.choices,usage:data.usage}});
      }catch{reject(new Error('invalid_response'));}});
    });
    req.setTimeout(90000,()=>req.destroy(new Error('timeout')));req.on('error',reject);if(request.body)req.write(request.body);req.end();
  });
}
