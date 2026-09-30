import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { createServer } from 'node:net';
import { fileURLToPath } from 'node:url';
import { normalizeBase, relayRequest } from './relay.mjs';
import { allowedTarget } from './network.mjs';

test('user base URL validation rejects credentials, redirects endpoints, local DNS and mixed answers',async()=>{
  assert.equal(normalizeBase('https://api.example/v1/'),'https://api.example/v1');
  for(const value of ['http://example.com','https://key@example.com','https://example.com/v1?key=secret','https://example.com/v1#x','https://example.com:8443/v1','https://example.com/v1/chat/completions'])assert.throws(()=>normalizeBase(value));
  await assert.rejects(()=>allowedTarget('https://example.com',['example.com'],async()=>[{address:'127.0.0.1',family:4}]),/blocked_address/);
  await assert.rejects(()=>allowedTarget('https://example.com',['example.com'],async()=>[{address:'8.8.8.8',family:4},{address:'10.0.0.1',family:4}]),/blocked_address/);
});
test('relay rebuilds allowed payload and sends only the caller key to the chosen endpoint',()=>{
  const input={kind:'model',baseUrl:'https://model.example/v1',key:'caller-only-key',payload:{model:'gpt-6-sol',messages:[{role:'user',content:'hello'}],max_completion_tokens:64,store:true,tools:[{}],user:'discard'}};
  const r=relayRequest(input);assert.equal(r.url.href,'https://model.example/v1/chat/completions');assert.equal(r.headers.Authorization,'Bearer caller-only-key');
  const p=JSON.parse(r.body);assert.equal(p.store,false);assert.equal(p.tools,undefined);assert.equal(p.user,undefined);assert.equal(p.model,'gpt-6-sol');
  assert.throws(()=>relayRequest({...input,key:'bad\r\nheader'}));
  assert.throws(()=>relayRequest({...input,payload:{...input.payload,max_completion_tokens:99999}}));
  const search=relayRequest({kind:'search',key:'own-brave-key',query:'pain points',baseUrl:'https://evil.example'});
  assert.equal(search.url.hostname,'api.search.brave.com');assert.equal(search.headers['X-Subscription-Token'],'own-brave-key');
});
test('stateless service starts without owner keys and exposes no shared jobs, secrets or files',async()=>{
  const listener=createServer();listener.listen(0,'127.0.0.1');await once(listener,'listening');const port=listener.address().port;await new Promise(r=>listener.close(r));
  const child=spawn(process.execPath,[fileURLToPath(new URL('./server.mjs',import.meta.url))],{env:{...process.env,RADAR_PORT:String(port),RADAR_PUBLIC_ORIGIN:'https://ai-superman-djy.me',BRAVE_API_KEY:'owner-brave-never-used',RADAR_MODEL_API_KEY:'owner-model-never-used'},stdio:['ignore','pipe','pipe']});
  try{
    await Promise.race([once(child.stdout,'data'),once(child,'exit').then(()=>{throw new Error('server exited');})]);
    const base=`http://127.0.0.1:${port}/radar`;
    assert.equal((await fetch(base+'/api/health')).status,200);
    for(const route of ['/api/scans','/api/config','/.env.radar.local','/../server.mjs'])assert.equal((await fetch(base+route)).status,404);
    const page=await(await fetch(base+'/')).text();assert.match(page,/接口设置/);assert.ok(!page.includes('owner-brave'));
    for(const asset of ['app.js','client.js','storage.js','engine.js','style.css'])assert.equal((await fetch(base+'/'+asset)).status,200);
    const post=(headers,body)=>fetch(base+'/api/relay',{method:'POST',headers,body:JSON.stringify(body)});
    assert.equal((await post({'Content-Type':'application/json'},{kind:'search',key:'x',query:'x'})).status,403);
    const headers={'Content-Type':'application/json','X-Radar-Client':'browser-v1'};
    assert.equal((await post({...headers,Origin:'https://evil.example'},{})).status,403);
    const bad=await post(headers,{kind:'model',key:'dont-reflect-this',baseUrl:'https://127.0.0.1/v1',payload:{model:'test',messages:[{role:'user',content:'x'}],max_completion_tokens:10}});
    assert.equal(bad.status,400);assert.ok(!(await bad.text()).includes('dont-reflect-this'));
    assert.equal((await post(headers,{padding:'x'.repeat(520000)})).status,400);
  }finally{child.kill();await once(child,'exit');}
});
