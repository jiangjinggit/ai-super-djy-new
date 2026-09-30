import { publicAddress, allowedTarget } from './network.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { discoveryPlan, freshDiscoveryEvidence, canonicalUrl, selectEvidence, materials, validateExtraction, validateGroups, createScan, runScan, report } from './core.mjs';

test('canonical URLs reject credentials and scripts, preserve meaningful query parameters', () => {
  assert.equal(canonicalUrl('https://example.com/post/?utm_source=x&sku=2#reply'), 'https://example.com/post?sku=2');
  assert.throws(()=>canonicalUrl('javascript:alert(1)'));
  assert.throws(()=>canonicalUrl('https://user:password@example.com'));
});
test('fixed round-robin sampling deduplicates URLs without inflating independent evidence', () => {
  const batches = Array.from({length:6},(_,q)=>Array.from({length:5},(_,r)=>({url:`https://example.com/q${q}/r${r}`,description:'source'})));
  batches[1][0].url=batches[0][0].url+'?utm_campaign=duplicate';
  const {candidates,selected}=selectEvidence(batches);
  assert.equal(candidates.length,29);assert.equal(selected.length,20);
  assert.equal(selected[1].url,'https://example.com/q2/r0');
  assert.equal(selected[0].occurrences.length,2);
});
test('body fetching blocks internal, metadata, mapped IPv6 and mixed DNS answers', async () => {
  for(const address of ['127.0.0.1','10.1.2.3','169.254.169.254','172.16.0.1','192.168.1.2','100.64.0.1','::1','::ffff:127.0.0.1','fc00::1','fe80::1','2002:7f00:1::']) assert.equal(publicAddress(address),false,address);
  assert.equal(publicAddress('8.8.8.8'),true);
  await assert.rejects(()=>allowedTarget('https://example.com',['example.com'],async()=>[{address:'8.8.8.8',family:4},{address:'127.0.0.1',family:4}]),/blocked_address/);
  await assert.rejects(()=>allowedTarget('https://other.com',['example.com']),/source_permission_unknown/);
});
const evidence = () => ({id:'E01',snippet:'I spend two hours renaming photos. My current tool solved the problem.',fetchStatus:'snippet_only',claims:[]});
const extraction = () => ({relevant:true,contentType:'user_experience',audience:null,claims:[{kind:'problem',materialId:'E01:P1',quote:'I spend two hours renaming photos.',summary:'自述改名耗时两小时',speaker:'unknown'}]});
test('exact quote validation rejects invented payment, stitched quotes and foreign material IDs', () => {
  const e=evidence();e.materials=materials(e);
  assert.equal(validateExtraction(extraction(),e).claims[0].verification,'excerpt_only');
  for(const quote of ['I paid $99.','I spend two hours...solved the problem.']){
    const x=extraction();x.claims[0].quote=quote;assert.throws(()=>validateExtraction(x,e),/quote_validation_failed/);
  }
  const wrong=extraction();wrong.claims[0].materialId='E02:P1';assert.throws(()=>validateExtraction(wrong,e));
});
test('grouping rejects nonexistent citations and promotion used as demand support', () => {
  const e=evidence();e.materials=materials(e);Object.assign(e,validateExtraction(extraction(),e));
  const groups={opportunities:[{title:'改名问题',supportIds:['E01:C1'],counterIds:[],unknowns:['付款未知'],nextStep:'核对最近一次上新'}]};
  assert.equal(validateGroups(groups,[e]).length,1);
  e.claims.push({id:'E01:C2',kind:'counterexample'});groups.opportunities[0].supportIds.push('E01:C2');
  assert.deepEqual(validateGroups(groups,[e])[0].excludedSupportIds,['E01:C2']);
  groups.opportunities[0].supportIds=['E01:C1'];
  e.contentType='promotion';assert.throws(()=>validateGroups(groups,[e]),/invalid_support/);
  groups.opportunities[0].supportIds=['E99:C1'];assert.throws(()=>validateGroups(groups,[e]),/unknown_citation/);
});
test('end-to-end simulated providers: one bad quote does not discard a valid neighbouring item; grouping keeps counterexample', async t => {
  const scan=createScan('test','photo problems',['q1','q2','q3','q4','q5','q6']);
  let extractionCalls=0;
  t.mock.method(globalThis,'fetch',async(url,init)=>{
    if(String(url).includes('brave.com')) return Response.json({web:{results:[
      {url:'https://example.com/a',description:'Renaming takes hours. The tool fixed it.'},
      {url:'https://example.com/b',description:'Something else.'},
    ]}});
    const input=JSON.parse(init.body), content=JSON.parse(input.messages[1].content);
    let data;
    if(content.materials){extractionCalls++;data={items:content.materials.map(e=>({id:e.id,relevant:true,contentType:'user_experience',audience:null,claims:e.id==='E01'?[
      {kind:'problem',materialId:'E01:P1',quote:'Renaming takes hours.',summary:'改名耗时',speaker:'unknown'},
      {kind:'counterexample',materialId:'E01:P1',quote:'The tool fixed it.',summary:'工具已解决',speaker:'unknown'},
    ]:[{kind:'payment_report',materialId:e.id+':P1',quote:'I paid $100',summary:'已付款',speaker:'unknown'}]}))};}
    else data={opportunities:[{title:'改名耗时（待验证）',supportIds:['E01:C1'],counterIds:['E01:C2'],unknowns:['付款未知'],nextStep:'核对现有工具覆盖范围'}]};
    return Response.json({choices:[{finish_reason:'stop',message:{content:JSON.stringify(data)}}],usage:{prompt_tokens:100,completion_tokens:80}});
  });
  await runScan(scan,{baseUrl:'https://model.example/v1',modelKey:'fake',braveKey:'fake',model:'test',bodyHosts:[]});
  assert.equal(scan.status,'partial');assert.equal(extractionCalls,2);
  assert.equal(scan.evidence[0].analysisStatus,'validated');assert.equal(scan.evidence[1].analysisStatus,'failed');
  assert.equal(scan.opportunities[0].counterIds[0],'E01:C2');
  assert.equal(scan.usage.filter(x=>x.operation==='search').length,6);
  assert.match(report(scan),/工具已解决/);assert.match(report(scan),/实际费用：未知/);
});
test('empty successful search is distinct from failed provider, and 403 never retries',async t=>{
  let calls=0;
  t.mock.method(globalThis,'fetch',async()=>{calls++;return Response.json({}, {status:403});});
  const scan=createScan('denied','topic',['one']);
  await runScan(scan,{baseUrl:'https://model.example',bodyHosts:[]});
  assert.equal(calls,1);assert.equal(scan.status,'failed');assert.equal(scan.errors[0].reason,'http_403');
});
test('empty results and cancellation terminate with explicit statuses',async t=>{
  t.mock.method(globalThis,'fetch',async()=>Response.json({web:{results:[]}}));
  const scan=createScan('empty','topic',['one']);await runScan(scan,{bodyHosts:[]});assert.equal(scan.status,'empty');
  const cancel=new AbortController();cancel.abort();
  const cancelled=createScan('cancelled','topic',['one']);await runScan(cancelled,{bodyHosts:[]},async()=>{},cancel.signal);assert.equal(cancelled.status,'cancelled');assert.equal(cancelled.usage.length,0);
});
test('a topic alone generates and fixes all six queries before any search',async t=>{
  const scan=createScan('automatic','customer feedback',[]);
  scan.model='gpt-custom-test';
  const order=[];
  t.mock.method(globalThis,'fetch',async(url,init)=>{
    if(String(url).includes('brave.com')){
      assert.ok(scan.samplingFixedAt);assert.equal(scan.queries.length,6);order.push('search');
      return Response.json({web:{results:[]}});
    }
    assert.equal(JSON.parse(init.body).model,'gpt-custom-test');
    order.push('model');return Response.json({choices:[{finish_reason:'stop',message:{content:JSON.stringify({queries:['q1','q2','q3','q4','q5','q6']})}}]});
  });
  await runScan(scan,{baseUrl:'https://model.example/v1',bodyHosts:[]});
  assert.deepEqual(order,['model',...Array(6).fill('search')]);assert.equal(scan.status,'empty');
});

for (const scenario of ['success', 'empty', 'plan_failure', 'search_failure', 'cancel']) {
  test(`discovery two-pass workflow: ${scenario}`, async t => {
    const scan = createScan('discovery-test', 'image API should be ignored', ['ignored'], 'discovery');
    const cancel = new AbortController();
    let searches = 0, groups = 0;
    t.mock.method(globalThis, 'fetch', async (url, init) => {
      if (String(url).includes('brave.com')) {
        searches++;
        if (searches > 6 && scenario !== 'empty') {
          assert.ok(scan.followup.fixedAt);
          if (scenario === 'search_failure') return Response.json({}, {status:403});
        }
        return Response.json({web:{results:scenario === 'empty' ? [] : Array.from({length:5},(_,i)=>({
          url:`https://example.com/${searches}/${i}`, description:searches <= 6 ? `Scheduling takes hours. Case ${searches}-${i}.` : `Our existing tool solved scheduling. Case ${searches}-${i}.`
        }))}});
      }
      const input = JSON.parse(JSON.parse(init.body).messages[1].content);
      let data;
      if (input.materials) data = {items:input.materials.map(e=>({id:e.id,relevant:true,contentType:'user_experience',claims:[{
        kind:e.blocks[0].text.startsWith('Our')?'counterexample':'problem', materialId:e.blocks[0].id,
        quote:e.blocks[0].text, summary:'材料释义', speaker:'unknown'
      }]}))};
      else if (input.candidates) {
        assert.equal(scan.evidence.length,12);
        if (scenario === 'cancel') cancel.abort();
        data = {queries:scenario === 'plan_failure' ? ['same','same'] : ['scheduling user experiences','scheduling solved existing tool','scheduling workaround reviews']};
      } else {
        groups++;
        data = {opportunities:[{title:'排班耗时',supportIds:input.supports.slice(0,2).map(c=>c.id),counterIds:input.counters.map(c=>c.id),unknowns:['付款未知'],nextStep:'核对用户最近一次排班'}]};
      }
      return Response.json({choices:[{finish_reason:'stop',message:{content:JSON.stringify(data)}}]});
    });
    await runScan(scan,{baseUrl:'https://model.example',bodyHosts:[]},async()=>{},cancel.signal);
    assert.equal(scan.discoveryAreas.length,6);
    assert.equal(new Set(scan.discoveryAreas).size,6);
    assert.ok(!scan.topic.includes('image API'));
    assert.ok(scan.evidence.length<=20);
    assert.ok(scan.usage.filter(x=>x.operation==='search').length<=10);
    assert.equal(new Set(scan.evidence.map(e=>e.id)).size,scan.evidence.length);
    if(scenario==='success') {
      assert.equal(searches,9);assert.equal(groups,2);assert.equal(scan.evidence.length,20);
      assert.equal(scan.followup.status,'completed');assert.equal(scan.followup.selectedCount,8);
      assert.equal(scan.opportunities[0].counterIds.length,8);
      assert.equal(scan.followup.initialOpportunities[0].counterIds.length,0);
      assert.match(report(scan),/自动追查/);
    } else if(scenario==='empty') {assert.equal(searches,9);assert.equal(scan.recovery.attempts,3);assert.equal(scan.emptyReason,'no_results');assert.equal(scan.followup.status,'no_candidates');}
    else if(scenario==='plan_failure') {assert.equal(searches,6);assert.equal(scan.followup.status,'failed');assert.equal(scan.opportunities.length,1);}
    else if(scenario==='search_failure') {assert.equal(scan.followup.status,'partial');assert.equal(scan.followup.selectedCount,0);}
    else {assert.equal(scan.status,'cancelled');assert.equal(searches,6);assert.equal(scan.followup.status,'interrupted');}
  });
}

test('discovery product title is separate from research instructions and legacy exports are readable',()=>{
  const scan=createScan('title-test','ignored',[],'discovery');
  assert.equal(scan.topic,'需求探索');
  scan.topic='无方向探索：发现不同领域用户的具体问题，不按开发者能力、图片或 API 筛选。';
  assert.equal(report(scan).split('\n')[0],'# 需求探索');
});

test('context requires known evidence, retains inference labels and single-source caution',()=>{
  const e=evidence();e.materials=materials(e);Object.assign(e,validateExtraction(extraction(),e));
  const g={title:'排班维护困难',supportIds:['E01:C1'],counterIds:[],unknowns:[],nextStep:'核对产品功能',context:{}};
  for(const k of ['industry','role','task'])g.context[k]={text:'示例背景',basis:'inferred',evidenceIds:['E01']};
  let o=validateGroups({opportunities:[g]},[e])[0];
  assert.equal(o.assessment.level,'single_source');assert.equal(o.context.role.basis,'inferred');
  g.context.role.evidenceIds=['E99'];o=validateGroups({opportunities:[g]},[e])[0];
  assert.equal(o.context.role,undefined);assert.equal(o.assessment.level,'needs_context');
  delete g.context;o=validateGroups({opportunities:[g]},[e])[0];
  assert.equal(o.assessment.level,'needs_context');
});

test('discovery rotates into uncovered areas and skips previously analysed pages',()=>{
  const first=discoveryPlan(()=>0.5);
  const history=[{discoveryAreas:first.map(x=>x[0]),evidence:[{url:'https://example.com/seen'}]}];
  const next=discoveryPlan(()=>0.5,history);
  assert.equal(next.length,6);
  assert.ok(next.every(x=>!history[0].discoveryAreas.includes(x[0])));
  assert.deepEqual(freshDiscoveryEvidence([{url:'https://example.com/seen'},{url:'https://example.com/new'}],history),[{url:'https://example.com/new'}]);
});

test('discovery recovers empty initial searches with broader queries',async t=>{
 const scan=createScan('recovery','',[],'discovery');let searches=0;
 t.mock.method(globalThis,'fetch',async(url,init)=>{
  if(String(url).includes('brave.com')){searches++;return Response.json({web:{results:searches<=6?[]:[{url:'https://example.com/new',description:'I cannot schedule shifts.'}]}});}
  const input=JSON.parse(JSON.parse(init.body).messages[1].content);
  const data=input.materials?{items:input.materials.map(e=>({id:e.id,relevant:false,contentType:'unknown',claims:[]}))}:{opportunities:[]};
  return Response.json({choices:[{finish_reason:'stop',message:{content:JSON.stringify(data)}}]});
 });
 await runScan(scan,{baseUrl:'https://model.example',bodyHosts:[]},async()=>{});
 assert.equal(scan.evidence.length,1);assert.equal(scan.recovery.attempts,3);assert.equal(searches,9);assert.equal(scan.emptyReason,'no_clues');
});
