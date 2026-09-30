import { LIMITS, DEFAULT_QUERIES, createScan, runScan, report } from './engine.js';
import * as db from './storage.js';
export { db };
const running=new Map(), memory=new Map();
export const hasActiveWork=()=>running.size>0;
const relayUrl=new URL('./api/relay',import.meta.url);
export function validateSettings(value){
  if(!value || typeof value.braveKey!=='string'||!value.braveKey.trim()||typeof value.modelKey!=='string'||!value.modelKey.trim())throw new Error('请填写 Brave Key 和模型 API Key。');
  if([value.braveKey,value.modelKey].some(k=>k.length>4096||/[\r\n]/.test(k)))throw new Error('密钥格式不正确。');
  let url;try{url=new URL(value.baseUrl.trim());}catch{throw new Error('请填写完整的 HTTPS Base URL。');}
  if(url.protocol!=='https:'||url.username||url.password||url.search||url.hash||(url.port&&url.port!=='443'))throw new Error('Base URL 需为公网 HTTPS 地址，不要包含密钥或查询参数。');
  if(/\/(chat\/completions|models)\/?$/.test(url.pathname))throw new Error('请填 Base URL（通常以 /v1 结尾），不要填 /chat/completions。');
  return {baseUrl:url.href.replace(/\/$/,''),braveKey:value.braveKey.trim(),modelKey:value.modelKey.trim(),storageConfirmed:value.storageConfirmed===true};
}
export function transportFor(settings){
  return async(url,init={})=>{
    const target=new URL(url);
    const input=target.hostname==='api.search.brave.com'?{kind:'search',key:settings.braveKey,query:target.searchParams.get('q')}:{kind:'model',key:settings.modelKey,baseUrl:settings.baseUrl,payload:JSON.parse(init.body)};
    return fetch(relayUrl,{method:'POST',headers:{'Content-Type':'application/json','X-Radar-Client':'browser-v1'},body:JSON.stringify(input),signal:init.signal,credentials:'omit',cache:'no-store'});
  };
}
export async function testSettings(settings,model){
  settings=validateSettings(settings);const send=transportFor(settings);
  const results=[];
  for(const kind of ['search','model']){
    try{
      const res=kind==='search'?await send('https://api.search.brave.com/res/v1/web/search?q=connection%20test',{signal:AbortSignal.timeout(25000)}):await send(settings.baseUrl+'/chat/completions',{body:JSON.stringify({model,messages:[{role:'user',content:'Reply with JSON {"ok":true}'}],max_completion_tokens:64}),signal:AbortSignal.timeout(95000)});
      if(!res.ok)throw new Error(String(res.status));
      const data=await res.json();if(kind==='model'&&!Array.isArray(data.choices))throw new Error('响应格式不兼容');
      results.push(`${kind==='search'?'Brave':'模型'}：连接成功`);
    }catch{results.push(`${kind==='search'?'Brave':'模型'}：连接未通过，请检查地址、密钥、模型权限和网络。`);}
  }
  return results.join('\n');
}
async function withIdleLock(action){
  if(!navigator.locks)throw new Error('当前浏览器不支持安全的任务锁，请使用最新版 Chrome、Edge 或 Safari，并通过 HTTPS 访问。');
  return navigator.locks.request('radar-scan-v1',{ifAvailable:true},async lock=>{if(!lock)throw new Error('另一个标签页正在研究，请等待完成或在那里停止。');return action();});
}
async function recover(){
  if(running.size)return;
  try{await withIdleLock(async()=>{for(const scan of await db.allScans())if(['running','queued'].includes(scan.status)){
    scan.status='partial';scan.stage='页面已关闭或刷新，研究中断；已保存材料保留，不会自动重跑';scan.errors.push({stage:'recovery',reason:'browser_interrupted'});scan.finishedAt=new Date().toISOString();await db.saveScan(scan);
  }});}catch(e){if(!e.message.startsWith('另一个标签页'))throw e;}
}
async function start(input){
  const settings=validateSettings(await db.readSettings());
  if(!settings.storageConfirmed)throw new Error('请先在接口设置中确认当前 Brave 套餐允许保存搜索结果。');
  if(!['discovery','directed'].includes(input.mode)||!Array.isArray(input.queries))throw new Error('研究设置无效。');
  if(input.mode==='directed'&&(typeof input.topic!=='string'||input.topic.trim().length<4||input.topic.length>1000))throw new Error('请输入 4—1000 字的研究题目。');
  if(input.queries.length&&(input.queries.length!==6||new Set(input.queries).size!==6||input.queries.some(q=>typeof q!=='string'||!q.trim()||q.length>180)))throw new Error('自定义查询需要 6 条不同搜索词。');
  if(!/^[a-zA-Z0-9][a-zA-Z0-9._:/-]{0,127}$/.test(input.model))throw new Error('模型 ID 无效。');
  if(!navigator.locks)throw new Error('浏览器任务锁不可用，请使用支持 HTTPS 的现代浏览器。');
  return new Promise((resolve,reject)=>{
    navigator.locks.request('radar-scan-v1',{ifAvailable:true},async lock=>{
      if(!lock){reject(new Error('另一个标签页正在研究，请在那里查看进度。'));return;}
      const history=(await db.allScans()).sort((a,b)=>a.createdAt.localeCompare(b.createdAt));
      const prior=history.find(s=>s.requestId===input.requestId);
      if(prior){resolve({id:prior.id});return;}
      const scan=createScan(crypto.randomUUID(),input.topic,input.queries,input.mode);scan.model=input.model;scan.requestId=input.requestId;
      const controller=new AbortController();running.set(scan.id,controller);memory.set(scan.id,scan);
      const persist=async()=>{try{await db.saveScan(scan);}catch(error){scan.persistenceError=error.message;controller.abort();throw error;}};
      try{
        await persist();resolve({id:scan.id});
        await runScan(scan,{...settings,model:input.model,bodyHosts:[],discoveryHistory:input.mode==='discovery'?history.filter(s=>s.mode==='discovery'):[],transport:transportFor(settings)},persist,controller.signal);
      }catch(error){scan.status='partial';scan.stage=scan.persistenceError||'研究中断';reject(error);}
      finally{running.delete(scan.id);if(!scan.persistenceError)memory.delete(scan.id);}
    }).catch(reject);
  });
}
export async function localApi(route,options={}){
  const input=options.body?JSON.parse(options.body):{};
  if(route==='/api/config'){
    await recover();let ready=false;
    try{const settings=validateSettings(await db.readSettings());ready=settings.storageConfirmed;}catch{}
    return {model:'gpt-5.6-luna',modelSelection:true,storage:true,bodyHosts:[],modes:['discovery','directed'],limits:LIMITS,defaultQueries:DEFAULT_QUERIES,ready};
  }
  if(route==='/api/scans'){
    if(options.method==='POST')return start(input);
    await recover();const scans=await db.allScans();
    return scans.sort((a,b)=>b.createdAt.localeCompare(a.createdAt)).map(s=>({id:s.id,mode:s.mode,topic:s.topic,status:s.status,stage:s.stage,createdAt:s.createdAt,count:s.evidence.length}));
  }
  const match=route.match(/^\/api\/scans\/([\da-f-]{36})(?:\/(cancel|opportunities))?$/);
  if(!match)throw new Error('操作不存在。');
  const id=match[1];const scan=memory.get(id)||await db.readScan(id);if(!scan)throw new Error('当前浏览器中没有这份报告。');
  if(match[2]==='cancel'){if(!running.has(id))throw new Error('请在启动研究的标签页停止任务。');running.get(id).abort();return {ok:true};}
  if(match[2]==='opportunities'){
    if(['running','queued'].includes(scan.status))throw new Error('请等待研究结束。');
    const item=scan.opportunities.find(o=>o.id===input.id);if(!item||!['new','saved','investigating','rejected'].includes(input.status)||typeof input.note!=='string'||input.note.length>2000)throw new Error('记录无效。');
    Object.assign(item,{status:input.status,note:input.note,updatedAt:new Date().toISOString()});await db.saveScan(scan);return {ok:true};
  }
  return structuredClone(scan);
}
export async function removeLocalData(kind){return withIdleLock(()=>kind==='credentials'?db.clearSettings():db.clearScans());}
export function markdown(scan){return report(scan);}
