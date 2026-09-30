const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const stateNames = { queued:'等待中', running:'正在扫描', partial:'部分完成', succeeded:'已完成', failed:'扫描失败', cancelled:'已停止', empty:'没有结果' };
const typeNames = { user_experience:'用户经历', promotion:'推广内容', mixed:'混合推广', question:'提问', tutorial:'教程', unknown:'类型未知' };
const kindNames = { problem:'问题', workaround:'现有办法', counterexample:'反例', cost:'自述代价', payment_intent:'付款意向', payment_report:'付款自述 · 未核实' };
let config, currentId, currentScan, timer, submitting = false, pendingRequest;
let lastSignature = '', activeScanId = null, toastTimer, stoppingId = null;
const presetModels = ['gpt-5.6-luna','gpt-5.6-sol','gpt-5.6-terra','gpt-6-sol','gpt-6-astra','gpt-6-luna'];
const noteDrafts = new Map();
function isDiscovery(scan){return scan.mode==='discovery' || /^(无方向探索|需求探索)/.test(scan.topic || '');}
function studyTitle(scan){const topic=isDiscovery(scan)?'需求探索':scan.topic || '方向研究';return topic.length>38?topic.slice(0,38)+'…':topic;}
function studyDate(scan){return new Date(scan.createdAt).toLocaleString('zh-CN',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit',hour12:false});}
function filterOpportunities(){
  const filter=$('#opportunity-filter').value;let shown=0;
  document.querySelectorAll('[data-opportunity]').forEach(card=>{card.hidden=filter!=='all'&&card.dataset.status!==filter;if(!card.hidden)shown++;});
  $('#opportunity-count').textContent=`${shown} 条线索`;
  if($('#filter-empty'))$('#filter-empty').hidden=shown>0 || !currentScan?.opportunities.length;
}
function opportunityCard(o,scan,active){
  const claimMap=new Map(scan.evidence.flatMap(e=>e.claims.map(c=>[c.id,{...c,source:e}])));
  const support=o.supportIds.map(id=>claimMap.get(id)).filter(Boolean);
  const counters=o.counterIds.map(id=>claimMap.get(id)).filter(Boolean);
  const sources=new Set(support.map(c=>c.source.url)).size;
  const draft=noteDrafts.get(scan.id+':'+o.id);
  const statusNames={new:'待了解',saved:'已收藏',investigating:'调查中',rejected:'已排除'};
  return `<article class="card opportunity-card" data-opportunity="${esc(o.id)}" data-status="${esc(o.status)}"><div class="opportunity-heading"><span class="tag">${esc(statusNames[o.status] || '待了解')}</span><span class="source-count">${sources} 条支持来源 · ${counters.length} 条现有办法 / 反例</span></div><h3>${esc(o.title)}</h3>${support[0]?.source.audience?`<p class="audience">涉及人群：${esc(support[0].source.audience)}</p>`:''}<div class="small-label">为什么值得了解</div>${support.slice(0,2).map(c=>`<p>${esc(c.summary)}</p><blockquote>${esc(c.quote)}</blockquote><button class="claim-link" data-claim="${esc(c.id)}">查看出处 · ${esc(new URL(c.source.url).hostname)}</button>`).join('')}${counters.length?`<div class="counter-preview"><span class="small-label">也要留意</span><p>${esc(counters[0].summary)}</p></div>`:''}<details class="evidence-details"><summary>查看全部证据与未确认事项</summary><div class="small-label">支持来源</div><p>${claimLinks(o.supportIds)}</p><div class="small-label">现有办法与反例</div>${counters.length?counters.map(c=>`<p>${esc(c.summary)} ${claimLinks([c.id])}</p>`).join(''):'<p>暂未找到，不能据此判断没有替代方案。</p>'}<div class="small-label">还需要了解</div><ul>${o.unknowns.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></details><div class="next-action"><span class="small-label">建议下一步</span><p>${esc(o.nextStep)}</p></div><div class="opportunity-actions"><button class="secondary" data-item="${o.id}" data-set-status="${o.status==='saved'?'new':'saved'}" ${active?'disabled':''}>${o.status==='saved'?'取消收藏':'收藏线索'}</button><button class="secondary" data-item="${o.id}" data-set-status="investigating" ${active||o.status==='investigating'?'disabled':''}>开始调查</button><button class="text-button" data-item="${o.id}" data-set-status="${o.status==='rejected'?'new':'rejected'}" ${active?'disabled':''}>${o.status==='rejected'?'恢复线索':'排除'}</button></div><details ${draft?'open':''}><summary>记录调查结果${draft?' · 未保存':''}</summary><label for="note-${o.id}">你做了什么，得到了什么反馈？</label><textarea id="note-${o.id}" data-note="${o.id}" rows="3" maxlength="2000" placeholder="例如：与一位店主交流，对方演示了处理流程；是否愿意试用仍待确认。">${esc(draft?.note ?? o.note)}</textarea><div class="note-row"><select aria-label="${esc(o.id)} 跟进状态" data-follow="${o.id}" id="follow-${o.id}">${Object.entries(statusNames).map(([v,l])=>`<option value="${v}" ${(draft?.status ?? o.status)===v?'selected':''}>${l}</option>`).join('')}</select><button class="secondary" data-save="${o.id}" ${active?'disabled':''}>保存记录</button><span class="muted">${config.storage?'保存到本机':'临时保存，关闭服务后清空'}</span></div></details></article>`;
}
function toast(message) { clearTimeout(toastTimer); $('#toast').textContent=message; $('#toast').hidden=false; toastTimer=setTimeout(()=>{$('#toast').hidden=true;},4500); }
function activity(scan) {
  const active=['running','queued'].includes(scan.status);
  $('#scan-activity').hidden=!active;
  $('#results').classList.toggle('is-scanning',active);
  if(!active)return;
  const followup=scan.followup?.status==='running' || /规划追查/.test(scan.stage);
  const step=followup?4:/归类/.test(scan.stage)?3:/获取材料|提取与校验/.test(scan.stage)?2:/^搜索/.test(scan.stage)?1:0;
  const labels=['准备搜索','搜索线索','分析证据','整理问题',...(scan.mode==='discovery'?['追查与复核']:[])];
  const key=`${scan.mode}:${step}`;
  if($('#activity-steps').dataset.key!==key) {
    $('#activity-steps').dataset.key=key;
    $('#activity-steps').innerHTML=labels.map((label,i)=>`<li class="${i===step?'current':''}" ${i===step?'aria-current="step"':''}><span>${i+1}</span>${label}</li>`).join('');
  }
  const stage=stoppingId===scan.id?'正在停止，保留已取得的材料…':scan.stage.replace('生成搜索词','规划搜索范围').replace('提取与校验','分析材料').replace('归类候选问题','整理问题线索').replace(/获取材料 E[0-9]+/,'读取来源材料').replace('根据候选问题规划追查：其他经历、现有办法与反例','寻找补充证据与现有解决办法');
  if($('#activity-title').textContent!==stage)$('#activity-title').textContent=stage;
  const detail=`已找到 ${scan.candidates.length} 条网页线索 · ${scan.evidence.filter(e=>e.analysisStatus==='validated').length} 条材料通过摘录校验`;
  if($('#activity-detail').textContent!==detail)$('#activity-detail').textContent=detail;
  const seconds=Math.max(0,Math.floor((Date.now()-Date.parse(scan.startedAt || scan.createdAt))/1000));
  $('#activity-time').textContent=`已用 ${Math.floor(seconds/60)} 分 ${seconds%60} 秒`;
}
function selectedModel() { return $('#model-choice').value === 'custom' ? $('#model').value.trim() : $('#model-choice').value; }
function updateForm() {
  const custom = $('#model-choice').value === 'custom';
  $('#custom-model-fields').hidden = !custom;
  $('#model').disabled = !custom || !config?.modelSelection;
  $('#model').required = custom;
  $('#model-choice').disabled = !config?.modelSelection;
  $('#reset-model').disabled = !config?.modelSelection;
  const discovery = $('#mode').value === 'discovery';
  $('#scan-summary').textContent = `${discovery ? '发现问题，并补充调查' : '围绕你的题目寻找线索'} · 最多分析 20 条材料`;
  $('#model-setting-summary').textContent=selectedModel() || '请选择模型';
  $('#start').disabled = !config || submitting || !!activeScanId || config.runsRemaining === 0;
  $('#start').textContent = submitting ? '正在创建扫描…' : discovery ? '开始探索 ↗' : '开始研究 ↗';
  $('#scan-form').setAttribute('aria-busy',String(submitting));
  $('#quota-note').textContent = !config ? '正在连接服务…' : activeScanId ? '已有扫描正在运行，完成或停止后可开始下一轮。' : config.runsRemaining===0 ? '本次试用次数已用完。请先核对接口用量，再重启本地服务。' : `本次还可研究 ${config.runsRemaining} 次 · 按实际调用计费，金额暂不可预估。`;
  $('#resume-scan').hidden = !activeScanId;
}
function rememberModel() { const value=selectedModel(); if (!/^[a-zA-Z0-9][a-zA-Z0-9._:/-]{0,127}$/.test(value)) return; try { localStorage.setItem('radar-model-preference', value); } catch {} }
function setModel(value) { $('#model-choice').value = presetModels.includes(value) ? value : 'custom'; $('#model').value = presetModels.includes(value) ? '' : value; updateForm(); }
$('#model-choice').addEventListener('change',()=>{$('#form-error').textContent='';updateForm();rememberModel();if($('#model-choice').value==='custom')$('#model').focus();});
$('#model').addEventListener('input',()=>{ $('#form-error').textContent=''; updateForm(); rememberModel(); });
$('#reset-model').addEventListener('click',()=>{setModel('gpt-5.6-luna');$('#form-error').textContent='';rememberModel();});
$('#resume-scan').addEventListener('click',()=>{if(activeScanId)openScan(activeScanId);});

async function api(route, options = {}) {
  const res = await fetch(route, { ...options, headers: { 'Content-Type':'application/json', 'X-Radar-Token':config?.token || '', ...options.headers } });
  if (!res.ok) { const data = await res.json(); throw new Error(data.error || '请求失败'); }
  return res.json();
}
function empty(title, description, loading=false) { return `<div class="empty ${loading?'loading-empty':''}"><strong>${esc(title)}</strong><p>${esc(description)}</p>${loading?'<div class="skeleton-lines" aria-hidden="true"><i></i><i></i><i></i></div>':''}</div>`; }
async function history() {
  const scans = await api('/api/scans');
  activeScanId = scans.find(s=>['running','queued'].includes(s.status))?.id || null;
  updateForm();
  $('#history').innerHTML = scans.length ? scans.map(s => `<button data-scan="${esc(s.id)}" title="${esc(studyTitle(s))}" ${currentId===s.id?'aria-current="page"':''}>${esc(studyTitle(s))}<small>${esc(studyDate(s))} · ${esc(stateNames[s.status])}</small></button>`).join('') : '<p class="muted">还没有扫描记录</p>';
}
function claimLinks(ids) { return ids.map(id => `<button class="claim-link" data-claim="${esc(id)}">${esc(id)}</button>`).join(' ') || '<span class="muted">未找到，不代表没有</span>'; }
function render(scan) {
  const previous=currentScan;
  currentScan = scan;
  if(previous?.id===scan.id && ['running','queued'].includes(previous.status) && !['running','queued'].includes(scan.status)) {
    toast(scan.status==='cancelled'?'扫描已停止，已有材料保留。':scan.status==='failed'?'扫描未完成，请查看失败记录。':`本轮扫描结束，整理出 ${scan.opportunities.length} 个候选问题。`);
  }
  activity(scan);
  $('#result-topic').textContent = studyTitle(scan);
  $('#report-eyebrow').textContent=isDiscovery(scan)?'探索报告':'专题报告';
  $('#report-meta').textContent=`${studyDate(scan)} · ${scan.evidence.length} 条分析材料`;
  $('#research-brief').hidden=isDiscovery(scan) || scan.topic.length<=38;
  $('#research-brief-text').textContent=isDiscovery(scan)?'':scan.topic;

  const followupNames = {pending:'等待初步发现',running:'正在追查',no_candidates:'未发现可追查的问题',failed:'追查规划失败',partial:'追查部分完成',completed:'已完成公开证据追查',no_new_material:'未找到新的可分析材料',interrupted:'追查中断'};
  $('#discovery-summary').innerHTML = scan.mode === 'discovery' ? `<article class="card"><h3>探索范围与补充调查</h3><p>本轮覆盖：${esc((scan.discoveryAreas || []).join('、'))}。这是有限抽样，不代表全网所有需求；再次探索可能覆盖不同领域。</p><p>先分析最多 12 条发现材料，再补充最多 8 条追查材料，总计最多 20 条。</p><p>${esc(followupNames[scan.followup?.status] || '等待开始')} · 新增追查材料 ${scan.followup?.selectedCount || 0} 条。追查完成不等于真实使用或付款已验证。</p>${scan.followup?.initialOpportunities?.length ? `<details><summary>查看追查前的候选，比较最终结果</summary><ul>${scan.followup.initialOpportunities.map(o=>`<li>${esc(o.title)}</li>`).join('')}</ul><p>下方为追查后重新归类的结果；失败或中断时保留已有候选，请结合失败记录判断。</p></details>` : ''}</article>` : '';

  $('#status').textContent = stateNames[scan.status] || scan.status;
  $('#stage').textContent = ['running','queued'].includes(scan.status)?'':`${scan.opportunities.length} 条问题线索`;
  const active = ['running','queued'].includes(scan.status);
  $('#cancel').hidden = !active;
  $('#cancel').disabled = stoppingId===scan.id;
  $('#cancel').textContent = stoppingId===scan.id?'正在停止…':'停止扫描';
  $('#result-explanation').textContent = active ? '任务在后台执行，刷新页面也能继续查看。你可以先看已取得的证据。' : scan.status === 'partial' ? (scan.errors.length ? '本轮有部分步骤未完成。已有结果仍可查看，请在“研究详情”核对失败记录。' : '结果包含搜索摘要，原文上下文仍需核对。') : scan.status === 'failed' ? '本轮未能完成，请查看“研究详情”中的失败记录后再尝试。' : scan.status === 'cancelled' ? '扫描已停止，已取得的材料保留在本次服务中。' : '选择一条值得了解的线索，查看出处，再记录调查结果。';
  $('#export-help').textContent = !config.storage ? '临时报告：关闭服务后清空，暂不支持导出。' : active ? '扫描结束后可以导出报告。' : '';
  $('#export-help').hidden=!$('#export-help').textContent;
  $('#export').disabled = active || !config.storage;
  $('#export').title = config.storage ? '导出包含证据和用量的 Markdown 报告' : 'Brave 保存权未确认，暂不导出';
  const validated = scan.evidence.filter(e => e.analysisStatus === 'validated');
  const metrics = [[scan.candidates.length,'找到的网页线索','已去除重复链接，不代表独立客户'],[validated.length,'通过摘录校验','检查引用是否存在，不代表事实已核实'],[scan.opportunities.length,'待验证的问题','由材料归纳，尚未证明付费需求'],[scan.evidence.filter(e=>e.fetchStatus==='body_excerpt').length,'取得正文的材料','为 0 时，本轮依据搜索摘要分析']];
  $('#metrics').innerHTML = metrics.map(([n,label,help])=>`<div class="metric"><b>${n}</b><span>${label}</span><small>${help}</small></div>`).join('');
  const signature = JSON.stringify([scan.opportunities, scan.evidence, scan.status]);
  if (signature !== lastSignature) {
    lastSignature = signature;
    $('#opportunities').innerHTML = scan.opportunities.length ? scan.opportunities.map(o=>opportunityCard(o,scan,active)).join('')+`<div id="filter-empty" hidden>${empty('这个分类下还没有线索','切换到“全部线索”，收藏或标记你想继续了解的问题。')}</div>` : empty(active?'正在寻找值得了解的问题':'本轮暂未形成问题线索',active?'找到材料后，会在这里整理具体问题、原始出处和建议动作。':'可以查看来源证据，或点击“再研究一次”调整方向。没有结果不代表没有需求。',active);
    filterOpportunities();
    $('#evidence').innerHTML = scan.evidence.length ? scan.evidence.map(e=>`<article class="card" id="evidence-${e.id}"><span class="tag">${e.id}</span>${e.phase ? `<span class="tag">${e.phase === 'followup' ? '追查材料' : '初步发现'}</span>` : ''}<span class="tag">${e.fetchStatus==='body_excerpt'?'正文片段 · 非完整上下文':'仅搜索摘要'}</span><span class="tag">${esc(typeNames[e.contentType] || (e.analysisStatus==='pending'?'等待分析':e.analysisStatus==='failed'?'分析失败':'未分析'))}</span>${e.duplicateOf?`<span class="tag">与 ${esc(e.duplicateOf)} 材料重复</span>`:''}<h3>${esc(e.title)}</h3><a href="${esc(e.url)}" target="_blank" rel="noopener noreferrer">查看原始页面 ↗</a><p>发布日期：未知${e.dateHint?`；搜索日期提示：${esc(e.dateHint)}（未核实）`:''}<br>获取时间：${esc(new Date(e.fetchedAt).toLocaleString())}</p>${e.claims.map(c=>`<div id="claim-${esc(c.id)}"><span class="small-label">${esc(kindNames[c.kind])} · ${esc(c.id)}</span><p>${esc(c.summary)}</p><blockquote>${esc(c.quote)}</blockquote></div>`).join('')}${e.analysisError?`<p class="error">分析未通过：${esc(e.analysisError)}</p>`:''}<details><summary>查看输入材料与获取状态</summary><p>获取记录：${esc(e.fetchReason)}</p>${(e.materials||[]).map(m=>`<p>${esc(m.id)}</p><blockquote>${esc(m.text)}</blockquote>`).join('')}</details></article>`).join('') : empty('材料还未就绪',active?'搜索结束后会按固定顺序展示材料。':'本轮未取得可分析材料。',active);
  }
  const modelRows = scan.usage.filter(x=>x.operation==='model');
  const inputTokens = modelRows.reduce((n,x)=>n+(x.inputTokens||0),0), outputTokens = modelRows.reduce((n,x)=>n+(x.outputTokens||0),0);
  $('#run-content').innerHTML = `<article class="card"><h3>本轮查询</h3><p>${scan.mode === 'discovery' ? '前 6 个查询用于跨领域发现，后续查询用于追查。每查询前 5 条，分阶段按排名轮转去重，先分析最多 12 条，再补最多 8 条。' : '每个查询取前 5 条；按查询轮转去重，最多分析 20 条。'}不同页面不等于不同客户。</p><ol>${scan.queries.map(q=>`<li>${esc(q)}</li>`).join('')}</ol><p>固定采样时间：${esc(scan.samplingFixedAt||'等待生成查询')}</p></article><article class="card"><h3>用量与费用</h3><p>本轮模型：${esc(scan.model || '未记录（旧报告）')}</p><p>搜索 ${scan.usage.filter(x=>x.operation==='search').length} 次 · 模型 ${modelRows.length} 次<br>已返回用量：输入 ${inputTokens.toLocaleString()} / 输出 ${outputTokens.toLocaleString()} token（模型计费文本单位）<br>未返回用量的请求：${modelRows.filter(x=>x.inputTokens===null).length} 次<br>实际费用：未知，以账户账单为准。运行耗时：${scan.durationMs?Math.round(scan.durationMs/1000)+' 秒':'进行中'}</p><p>每轮搜索最多 10 次（含重试）、模型最多 18 次、最多 10 分钟；本次服务最多启动 3 轮。这是用量限制，不是已核实的金额上限。</p><details><summary>逐次请求记录</summary><pre>${esc(JSON.stringify(scan.usage,null,2))}</pre></details></article><article class="card"><h3>失败与覆盖限制</h3><p>${config.bodyHosts.length?'只读取已配置的来源域名。':'正文来源权限未确认，本轮只分析搜索摘要，不能视为完整需求证据。'}</p><pre>${esc(scan.errors.length?JSON.stringify(scan.errors,null,2):'没有请求或格式错误。来源和材料的局限仍需保留。')}</pre></article>`;
}
async function refresh() {
  if (!currentId) return;
  const id = currentId;
  try {
    const scan = await api(`/api/scans/${id}`);
    if (id !== currentId) return;
    render(scan); await history();
    if (id===currentId && ['running','queued'].includes(scan.status)) timer=setTimeout(refresh,2200);
  } catch(e) { if(id!==currentId)return; $('#result-error').textContent=e.message; timer=setTimeout(refresh,5000); }
}
function openScan(id) { clearTimeout(timer); currentId=id; currentScan=null; $('#result-topic').textContent='正在读取报告…'; $('#status').textContent='加载中'; $('#stage').textContent=''; $('#scan-activity').hidden=true; $('#metrics').innerHTML=''; $('#discovery-summary').innerHTML=''; $('#result-explanation').textContent='正在获取任务的最新状态。'; $('#export-help').textContent=''; $('#export').disabled=true; $('#cancel').hidden=true; $('#opportunity-filter').value='all'; $('#opportunities').innerHTML=empty('正在读取报告','已有任务会继续在后台执行。',true); $('#evidence').innerHTML=''; $('#run-content').innerHTML=''; $('#report-meta').textContent=''; $('#research-brief').hidden=true; window.history.replaceState(null,'',`#scan=${id}`); lastSignature=''; panel('opportunities'); $('#setup').hidden=true; $('#results').hidden=false; $('#breadcrumb').textContent='研究报告'; $('#result-error').textContent=''; void refresh(); }
async function newStudy(){clearTimeout(timer);currentId=null;window.history.replaceState(null,'',location.pathname);$('#setup').hidden=false;$('#results').hidden=true;$('#breadcrumb').textContent='新建研究';$('#form-error').textContent='';try{config=await api('/api/config');await history();}catch(e){$('#form-error').textContent=e.message;}updateForm();}
$('#new-study').addEventListener('click',newStudy);
$('#header-new').addEventListener('click',newStudy);
$('#history').addEventListener('click',e=>{const item=e.target.closest('[data-scan]');if(item)openScan(item.dataset.scan);});
$('#example').addEventListener('click',()=>{$('#topic').value='电商卖家批量上新时，整理和处理商品图片有哪些耗时、反复返工的问题？';$('#queries').value=config.defaultQueries.join('\n');});
$('#example-two').addEventListener('click',()=>{$('#topic').value='独立开发者如何收集、归类和跟进分散在邮件、社群中的客户反馈？寻找实际经历、现有办法和仍未解决的问题。';$('#queries').value='';});
function changeMode(mode){
  $('#mode').value=mode;
  const discovery=mode==='discovery';
  document.querySelectorAll('[data-mode]').forEach(button=>{button.classList.toggle('selected',button.dataset.mode===mode);button.setAttribute('aria-pressed',String(button.dataset.mode===mode));});
  $('#directed-fields').hidden=discovery;$('#topic').required=!discovery;$('#topic').disabled=discovery;$('#queries').disabled=discovery;
  $('#mode-help').textContent=discovery?'无需填写题目。从不同领域寻找具体问题，再补充调查现有解决办法。':'写下你关心的人群或问题，不需要先想好产品方案。';
  updateForm();
}
document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>changeMode(button.dataset.mode)));
$('#opportunity-filter').addEventListener('change',filterOpportunities);
$('#repeat-study').addEventListener('click',async()=>{const scan=currentScan;if(!scan)return;await newStudy();changeMode(isDiscovery(scan)?'discovery':'directed');if(!isDiscovery(scan)){$('#topic').value=scan.topic;$('#queries').value=scan.queries.length===6?scan.queries.join('\n'):'';}else $('#queries').value='';toast('研究设置已准备好，确认后再开始。');});
$('#scan-form').addEventListener('invalid',e=>{if(e.target.id==='model')$('#analysis-settings').open=true;},true);
$('#scan-form').addEventListener('submit',async e=>{
  e.preventDefault();if(submitting || activeScanId || !config || config.runsRemaining===0)return;$('#form-error').textContent='';
  const mode=$('#mode').value, model=selectedModel();
  const topic=mode === 'discovery' ? '' : $('#topic').value.trim(), queries=mode === 'discovery' ? [] : $('#queries').value.split('\n').map(x=>x.trim()).filter(Boolean);
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._:/-]{0,127}$/.test(model)) { $('#form-error').textContent='请填写完整模型 ID，不要包含空格。'; $('#analysis-settings').open=true;$('#model').focus(); return; }
  if (mode === 'directed' && topic.length < 4) { $('#form-error').textContent='请用至少 4 个字描述研究方向，或切换到无方向探索。'; $('#topic').focus(); return; }
  if (queries.length && (queries.length !== 6 || new Set(queries).size !== 6 || queries.some(q=>q.length>180))) { $('#form-error').textContent='自定义搜索词需要 6 行不同的内容，每行最多 180 字；也可清空，由雷达生成。'; $('.query-settings').open=true; $('#queries').focus(); return; }
  submitting=true;updateForm();rememberModel();
  const signature=JSON.stringify({mode,model,topic,queries});
  if(!pendingRequest||pendingRequest.signature!==signature)pendingRequest={signature,id:crypto.randomUUID()};
  try{const data=await api('/api/scans',{method:'POST',body:JSON.stringify({mode,model,topic,queries,requestId:pendingRequest.id})});pendingRequest=null;config.runsRemaining=Math.max(0,config.runsRemaining-1);activeScanId=data.id;openScan(data.id);}catch(error){$('#form-error').textContent=error.message;}finally{submitting=false;updateForm();}
});
function panel(name){$('#opportunity-toolbar').hidden=name!=='opportunities';document.querySelectorAll('.panel').forEach(x=>x.hidden=x.id!==name);document.querySelectorAll('[data-panel]').forEach(x=>{x.classList.toggle('selected',x.dataset.panel===name);x.setAttribute('aria-selected',String(x.dataset.panel===name));});}
document.querySelector('.tabs').addEventListener('click',e=>{const tab=e.target.closest('[data-panel]');if(tab)panel(tab.dataset.panel);});
$('#opportunities').addEventListener('click',async e=>{
  const cite=e.target.closest('[data-claim]');
  if(cite){panel('evidence');document.getElementById('claim-'+cite.dataset.claim)?.scrollIntoView({behavior:'smooth',block:'center'});return;}
  const button=e.target.closest('[data-save],[data-set-status]');if(!button)return;
  const id=button.dataset.save || button.dataset.item, scanId=currentId;
  const note=$('#note-'+id).value, status=button.dataset.setStatus || $('#follow-'+id).value;
  button.disabled=true;
  try{await api(`/api/scans/${scanId}/opportunities`,{method:'PATCH',body:JSON.stringify({id,status,note})});noteDrafts.delete(scanId+':'+id);toast('已更新线索。'+(config.storage?'':'记录暂存在本次服务中。'));if(currentId===scanId)await refresh();}
  catch(error){$('#result-error').textContent=error.message;}finally{button.disabled=false;}
});
function keepDraft(e){const id=e.target.dataset.note || e.target.dataset.follow;if(id&&currentId)noteDrafts.set(currentId+':'+id,{note:$('#note-'+id).value,status:$('#follow-'+id).value});}
$('#opportunities').addEventListener('input',keepDraft);$('#opportunities').addEventListener('change',keepDraft);
$('#cancel').addEventListener('click',async()=>{
  const id=currentId;if(stoppingId===id)return;stoppingId=id;$('#cancel').disabled=true;$('#cancel').textContent='正在停止…';
  try{await api(`/api/scans/${id}/cancel`,{method:'POST',body:'{}'});if(currentId===id){clearTimeout(timer);await refresh();}}
  catch(e){stoppingId=null;$('#cancel').disabled=false;$('#cancel').textContent='停止扫描';$('#result-error').textContent=e.message;}
});
$('#export').addEventListener('click',async()=>{try{const r=await fetch(`/api/scans/${currentId}/report`,{headers:{'X-Radar-Token':config.token}});if(!r.ok)throw new Error((await r.json()).error);const url=URL.createObjectURL(await r.blob());const a=document.createElement('a');a.href=url;a.download='需求雷达-'+currentId+'.md';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}catch(e){$('#result-error').textContent=e.message;}});
try{
  config=await api('/api/config');
  let preferredModel=config.model || 'gpt-5.6-luna';
  try { preferredModel=localStorage.getItem('radar-model-preference') || preferredModel; } catch {}
  setModel(config.modelSelection ? preferredModel : config.model);
  if (!config.modelSelection) $('#model-help').textContent='此服务尚未支持模型切换，请打开新版服务。';
  if (!config.modes?.includes('discovery')) { $('[data-mode=discovery]').disabled=true;changeMode('directed'); } else changeMode('discovery');
  $('#connection').innerHTML=`<strong>${config.storage?'研究记录保存在本机':'临时工作空间：关闭服务后，报告和跟进记录会清空。'}</strong><details><summary>数据来源与使用说明</summary><p>当前主要搜索英文公开内容，以中文整理报告。${config.bodyHosts.length?'正文仅读取已配置的来源。':'当前只分析搜索摘要，可能缺少上下文。'}搜索结果保存权确认后，才可开启长期保存与导出。模型调用费用以提供方账单为准。</p></details>`;
  if(config.diskError)$('#connection').append(' 报告写入失败，请检查本地磁盘。');
  await history();
  const savedRoute=location.hash.match(/^#scan=([\da-f-]{36})$/);
  if(savedRoute)openScan(savedRoute[1]);
}catch(e){$('#connection').textContent='服务连接失败：'+e.message;$('#start').disabled=true;}
