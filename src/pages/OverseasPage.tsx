import { useEffect, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Compass, Copy, Download, ExternalLink, FileText, Map, NotebookPen, Wrench } from 'lucide-react';
import { toast } from 'sonner';

import { OVERSEAS_PATH, OVERSEAS_REFERENCE, OVERSEAS_RESOURCES, OVERSEAS_STAGES, OVERSEAS_TERMS, OVERSEAS_UPDATED, overseasStagePath, type OverseasStage } from '@/content/overseas';
import { isStageComplete, stageProgressKeys, useOverseasProgress } from '@/hooks/useOverseasProgress';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { DecisionDiagram, FlowDiagram, ParallelTracks, PaymentSequence } from '@/components/overseas/OverseasDiagrams';
import { OverseasRoadmap } from '@/components/overseas/OverseasRoadmap';
import { OverseasGuide } from '@/components/overseas/OverseasGuide';
import { StageTutorialLink, TutorialCards, TutorialIndex, TutorialTopicPage } from '@/components/overseas/OverseasTutorials';
import './overseas.css';

const tabs = [
  { path: '', title: '出海路线图', icon: Map },
  { path: '/learn', title: '实战教程', icon: Compass },
  { path: '/knowledge', title: '出海知识库', icon: BookOpen },
  { path: '/journal', title: '生图项目实战', icon: NotebookPen },
  { path: '/toolkit', title: '模板与工具', icon: Wrench },
];

const markdownDownloadHref = (text: string) => `data:text/markdown;charset=utf-8,${encodeURIComponent(text)}`;

async function copyMarkdown(text: string) {
  try { await navigator.clipboard.writeText(text); toast.success('已复制，可粘贴到自己的笔记中'); }
  catch { toast.error('复制失败，请手动选中文本复制，或下载文件'); }
}

function roadmapMarkdown() {
  const flow = '```mermaid\nflowchart TD\n A[01 写下起点] --> B[02 找用户和问题]\n B --> C[03 试验需求]\n C --> D{有实际行动吗？}\n D -->|有，继续验证| E[04 做最小可用产品]\n D -->|没有，调整| B\n E --> F[05 定价与收款]\n F --> G[06 找第一批用户]\n G --> H[07 SEO 与持续获客]\n H --> I[08 体验与收支]\n I --> J[09 复盘与分享]\n J -->|下一轮| B\n```';
  return `# AI 出海实战路线图\n\n更新：${OVERSEAS_UPDATED}\n\n各自做项目，按成果推进，不绑定周计划。生图示例是假设或演示，不是真实经营结果。\n\n${flow}\n\n接触用户从需求阶段开始；提前查收款条件；开发时做好 SEO 基础；全程记录并分享。\n\n${OVERSEAS_STAGES.map((stage, index) => `## ${String(index + 1).padStart(2, '0')} ${stage.title}\n\n${stage.question}\n\n目标：${stage.goal}\n\n产出：${stage.output}\n\n${stage.tasks.map(task => `- [ ] ${task.title}：${task.detail}`).join('\n')}\n\n完成标准：\n\n${stage.checks.map(check => `- [ ] ${check}`).join('\n')}\n\n生图示例（非实绩）：${stage.example}\n\n常见卡点：${stage.pitfall}\n\n没达到时：${stage.fallback}\n`).join('\n')}\n## 下一步\n\n先完成项目起步卡，随后找目标用户和真实问题。\n`;
}

function Overview() {
  useDocumentTitle('AI 出海 · 实战路线图');
  const location = useLocation();
  const { completed, doneCount } = useOverseasProgress();
  const nextStage = OVERSEAS_STAGES.find(stage => !isStageComplete(stage, completed));
  useEffect(() => {
    const id = location.hash.slice(1);
    const targets = ['panorama-title', 'guide-title', 'overseas-next-step', ...OVERSEAS_STAGES.map(stage => `guide-${stage.id}`)];
    if (!targets.includes(id)) return;
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }));
    return () => cancelAnimationFrame(frame);
  }, [location.key, location.hash]);

  return <>
    <header className="os-roadmap-intro">
      <h1>AI 出海实战路线图</h1>
      <p className="os-lead">先看全景，再顺着九个阶段读。每个人做自己的项目，按成果推进，按自己的节奏实践。</p>
      <nav className="os-reading-jumps" aria-label="路线说明快捷入口"><a href="#panorama-title">看全景图 ↓</a><a href="#guide-title">读九阶段说明 ↓</a><a href="#overseas-next-step">找到我的下一步 ↓</a></nav>
    </header>

    <OverseasRoadmap />

    <section className="os-route-context" aria-label="理解这条路线">
      <div><h2>为什么这样走？</h2><p>先确认有人需要，再投入开发；产品能用后，跑通收款和推广；最后根据用户反馈和收支，决定怎么改。</p><p className="os-small os-muted">例如：先让卖家试几张商品场景图，再判断值不值得开发批量生图功能。</p></div>
      <div><h2>第一轮要争取什么？</h2><p>陌生目标用户找到产品，独立完成使用，并有人真实付费。再看他们会不会回来，以及每单的成本。</p><p className="os-small os-muted">暂时没有达到，就记录原因并调整。下面的生图例子是演示，不是真实经营结果。</p></div>
    </section>
    <ParallelTracks />
    <TutorialCards />
    <OverseasGuide />

    <section id="overseas-next-step" className="os-next-step" aria-labelledby="next-step-title">
      <span className="os-label">看完之后，先做这一件事</span><h2 id="next-step-title">填一张项目起步卡</h2>
      <p>写清你想帮谁、解决什么问题、能投入多少时间与预算、最想验证什么。然后找这类用户，收集他们的真实问题。</p>
      <Link className="os-button os-primary" to={`${OVERSEAS_PATH}/toolkit?stage=start`}><FileText size={16} />填写项目起步卡</Link>
    </section>
    <aside className="os-practice-progress" aria-label="我的实践进度">
      <div><strong>我的实践进度：{doneCount} / 9 个阶段</strong><progress value={doneCount} max={9} aria-label={`已完成 ${doneCount} 个阶段，共 9 个`} /><p className="os-small os-muted">做完任务并核对验收后再勾选。进度仅保存在当前浏览器。</p></div>
      <Link className="os-button os-secondary" to={overseasStagePath(nextStage?.id ?? 'review')}>{doneCount === 9 ? '回顾本轮实践' : completed.length ? '继续我的实践' : '进入第 01 阶段实践'}<ArrowRight size={17} /></Link>
    </aside>

    <FlowDiagram title="再从用户的角度，看一遍全程" steps={['发现你的产品', '试用并拿到结果', '觉得有用，付钱购买', '继续使用或反馈']} caption="做产品、支付、推广与运营，都是为了让用户顺利走完这些步骤。" />
    <Link to={`${OVERSEAS_PATH}/journal`} className="os-note-card os-journal-preview os-journal-link"><span className="os-label">跟着真实项目看方法</span><h2>查看站长的生图实践 <ArrowRight size={20} /></h2><p>项目方向已确定，需求、上线和经营结果待验证。后续的过程、踩坑与公众号分享，都从这里积累。</p></Link>
  </>;
}

function StagePage() {
  const { stageId } = useParams();
  const stageIndex = OVERSEAS_STAGES.findIndex(stage => stage.id === stageId);
  const stage = OVERSEAS_STAGES[stageIndex];
  const { completed, toggle, saveFailed } = useOverseasProgress();
  useDocumentTitle(stage ? `AI 出海 · ${stage.title}` : '未找到出海阶段');
  if (!stage) return <MissingPage />;
  const keys = stageProgressKeys(stage);
  const count = keys.filter(key => completed.includes(key)).length;
  const relevantTerms = OVERSEAS_TERMS.filter(term => stage.terms.includes(term.id));
  return <article className="os-stage-page">
    <Link to={OVERSEAS_PATH} className="os-back"><ArrowLeft size={16} />返回完整路线图</Link>
    <header className="os-page-heading"><p className="os-eyebrow">阶段 {String(stageIndex + 1).padStart(2, '0')} / 09</p><h1>{stage.title}</h1><p className="os-lead">{stage.question}</p></header>
    <div className="os-stage-layout">
      <div className="os-stage-body">
        <div className="os-goal"><Compass size={22} /><div><strong>本阶段目标</strong><p>{stage.goal}</p></div></div>
        <StageTutorialLink stageId={stage.id} />
        {stage.id === 'payment' ? <PaymentSequence /> : stage.id === 'validate' ? <DecisionDiagram /> : <FlowDiagram title="先看懂这一步怎么走" steps={stage.flow} />}

        <section className="os-section" aria-labelledby="stage-tasks"><div className="os-section-heading"><h2 id="stage-tasks">照着做，留下结果</h2><span className="os-small os-muted">3 个必做任务</span></div>
          <div className="os-task-list">{stage.tasks.map((task, index) => <label key={task.title} className="os-task">
            <input type="checkbox" checked={completed.includes(`${stage.id}:task:${index}`)} onChange={() => toggle(`${stage.id}:task:${index}`)} />
            <span><strong>{index + 1}. {task.title}</strong><span>{task.detail}</span></span>
          </label>)}</div>
        </section>
        <section className="os-example"><span className="os-label">生图例子 · 假设或演示，非实绩</span><p>{stage.example}</p></section>
        <section className="os-section"><h2>这些词，先懂就够用</h2><div className="os-inline-terms">{relevantTerms.map(term => <div key={term.id}><h3>{term.title}</h3><p>{term.meaning}</p><Link to={`${OVERSEAS_PATH}/knowledge#${term.id}`}>看具体例子 <ArrowRight size={13} /></Link></div>)}</div></section>
        <section className="os-acceptance" aria-labelledby="stage-checks"><h2 id="stage-checks"><CheckCircle2 size={22} />做到这样，再进入下一步</h2>
          {stage.checks.map((check, index) => <label className="os-check" key={check}><input type="checkbox" checked={completed.includes(`${stage.id}:check:${index}`)} onChange={() => toggle(`${stage.id}:check:${index}`)} /><span>{check}</span></label>)}
          <p className="os-small os-muted">按自己的真实结果勾选。阅读完毕不等于实践完成。</p>
        </section>
        <div className="os-pitfall"><h3>容易踩的坑</h3><p>{stage.pitfall}</p><h3>还没达到，怎么办？</h3><p>{stage.fallback}</p></div>
        {saveFailed && <p role="alert" className="os-save-error">浏览器未能保存进度。当前勾选只在本页有效，请下载模板记录结果。</p>}
        <nav className="os-stage-pagination" aria-label="阶段翻页">
          {stageIndex > 0 ? <Link to={overseasStagePath(OVERSEAS_STAGES[stageIndex - 1].id)}><ArrowLeft size={16} /><span>上一阶段<small>{OVERSEAS_STAGES[stageIndex - 1].title}</small></span></Link> : <Link to={OVERSEAS_PATH}><ArrowLeft size={16} />完整路线图</Link>}
          {stageIndex < 8 ? <Link to={overseasStagePath(OVERSEAS_STAGES[stageIndex + 1].id)}><span>下一阶段<small>{OVERSEAS_STAGES[stageIndex + 1].title}</small></span><ArrowRight size={16} /></Link> : <Link to={OVERSEAS_PATH}>回看全程<ArrowRight size={16} /></Link>}
        </nav>
      </div>
      <aside className="os-stage-aside">
        <div className="os-aside-card"><span className="os-label">这一步，带走什么</span><h2>{stage.output}</h2><Link className="os-button os-primary" to={`${OVERSEAS_PATH}/toolkit?stage=${stage.id}`}><FileText size={16} />填写本阶段模板</Link><p className="os-small os-muted">任务与验收：{count} / {keys.length} 已勾选</p><progress max={keys.length} value={count} aria-label="本阶段任务与验收进度" /><p className="os-small os-muted">进度仅保存在当前浏览器。<br />与站长的项目进展无关。</p></div>
        <nav className="os-aside-nav" aria-label="全部出海阶段">{OVERSEAS_STAGES.map((item, index) => <Link key={item.id} aria-current={item.id === stage.id ? 'page' : undefined} to={overseasStagePath(item.id)}><span>{String(index + 1).padStart(2, '0')}</span>{item.title}</Link>)}</nav>
      </aside>
    </div>
  </article>;
}

function Knowledge() {
  useDocumentTitle('AI 出海 · 知识库');
  const location = useLocation();
  const [query, setQuery] = useState('');
  useEffect(() => {
    const id = location.hash.slice(1);
    if (!OVERSEAS_TERMS.some(term => term.id === id)) return;
    setQuery('');
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }));
    return () => cancelAnimationFrame(frame);
  }, [location.key, location.hash]);
  const terms = OVERSEAS_TERMS.filter(term => `${term.title} ${term.meaning} ${term.example}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <>
    <header className="os-page-heading"><p className="os-eyebrow">遇到不懂的，来这里查</p><h1>出海知识库</h1><p className="os-lead">一句解释，一个例子，再回到自己的项目里用。</p></header>
    <label className="os-search-label">查找知识点<input type="search" placeholder="试试：SEO、支付、转化率" value={query} onChange={event => setQuery(event.target.value)} /></label>
    <p className="os-small os-muted" aria-live="polite">找到 {terms.length} 个知识点</p>
    <div className="os-knowledge-grid">{terms.map(term => <article className="os-knowledge-card" id={term.id} key={term.id}><span className="os-label">先懂这个</span><h2>{term.title}</h2><p>{term.meaning}</p><div className="os-term-example"><strong>举个例子</strong><p>{term.example}</p></div><Link to={overseasStagePath(term.stage)}>回到对应阶段实践 <ArrowRight size={15} /></Link></article>)}</div>
    {!terms.length && <div className="os-note-card"><h2>暂时没有这个知识点</h2><p>换个短词试试，或回到路线图找当前阶段。</p><Link to={OVERSEAS_PATH} className="os-text-link">查看路线图 →</Link></div>}
  </>;
}

function Journal() {
  useDocumentTitle('AI 出海 · 生图项目实战');
  return <>
    <header className="os-page-heading"><p className="os-eyebrow">站长的实践记录</p><h1>一个生图产品，边做边记录。</h1><p className="os-lead">我做生图，你做自己的项目。这里分享过程和方法。</p></header>
    <div className="os-journal-grid">
      <section className="os-note-card"><span className="os-status">项目起步 · 待验证</span><h2>目前确定了什么</h2><ul><li>以生图产品作为第一个出海实践项目。</li><li>亲自跑通需求、上线、引流、SEO、支付和运营。</li><li>在本站沉淀方法，在微信群交流，在公众号分享经历。</li></ul><a className="os-text-link" href={OVERSEAS_REFERENCE} target="_blank" rel="noreferrer">查看参考仓库 nova-image-studio <ExternalLink size={14} /></a><p className="os-small os-muted">已核对参考版本的 AGPL-3.0 许可证与运行文档；实际产品的复用范围、开发与部署仍待实践。</p><Link className="os-text-link" to={`${OVERSEAS_PATH}/learn/product#run-reference`}>查看参考核对与本地运行方法 <ArrowRight size={14} /></Link></section>
      <section className="os-note-card"><span className="os-label">下一步要弄清楚</span><h2>先把这 4 个问号解开</h2><ol><li>为哪一类人生成什么图？</li><li>他们现在怎么做，哪里最麻烦？</li><li>怎样找到他们，拿到真实反馈？</li><li>生成成本与收款条件是否可行？</li></ol><Link className="os-button os-primary" to={overseasStagePath('start')}>从项目起步卡开始<ArrowRight size={16} /></Link></section>
    </div>
    <section className="os-section"><div className="os-section-heading"><h2>实践日志</h2><span className="os-small os-muted">只记录实际发生的事</span></div><article className="os-journal-entry"><time dateTime={OVERSEAS_UPDATED}>{OVERSEAS_UPDATED}</time><div><span className="os-label">已确定 · 探索方向</span><h3>从生图项目开始，把出海全程跑一遍</h3><p>确定采用“先看路线图，再按自己的节奏实践”的方式。朋友们各做各的项目，共享方法与经验。</p><p><strong>尚未验证：</strong>目标用户、产品需求、上线情况、获客效果和真实收入。</p><p><strong>下一步：</strong>填写项目起步卡，找一类目标用户，收集他们的真实问题。</p><Link to={`${OVERSEAS_PATH}/toolkit?stage=review`}>查看以后怎么记日志 <ArrowRight size={14} /></Link></div></article></section>
    <FlowDiagram title="一次实践，怎样变成一篇公众号文章？" steps={['记下问题和做法', '补结果、证据与踩坑', '提炼读者能用的方法', '整理文章并关联资料']} caption="计划、假设、已验证结果分开写。公众号文章发布后，再把链接补回对应记录。" />
    <div className="os-note-card"><h2>后续文章，从真实问题长出来</h2><p>可以围绕“怎么判断生图需求”“第一次接入支付”“推广后为什么没人使用”等问题整理。等对应实践发生，再补过程和结论。</p><span className="os-small os-muted">以上是选题方向，尚未发布文章。</span></div>
  </>;
}

function TemplateEditor({ stage }: { stage: OverseasStage }) {
  const [value, setValue] = useState(stage.template);
  return <section className="os-template-editor"><div className="os-section-heading"><div><span className="os-label">可直接填写</span><h2>{stage.output}</h2></div><Link to={overseasStagePath(stage.id)} className="os-text-link">查看怎么做 <ArrowRight size={14} /></Link></div>
    <label className="os-sr-only" htmlFor="overseas-template">编辑{stage.output}</label><textarea id="overseas-template" value={value} onChange={event => setValue(event.target.value)} spellCheck={false} />
    <div className="os-actions"><a className="os-button os-primary" href={markdownDownloadHref(value)} download={`出海-${stage.output}.md`}><Download size={16} />下载填写结果</a><button className="os-button os-secondary" onClick={() => copyMarkdown(value)}><Copy size={16} />复制内容</button></div>
    <p className="os-small os-muted">内容只在当前页面编辑，不会上传。离开前请保存；若浏览器未开始下载，可复制到自己的笔记中。</p>
  </section>;
}

function Toolkit() {
  useDocumentTitle('AI 出海 · 模板与工具');
  const [params, setParams] = useSearchParams();
  const stage = OVERSEAS_STAGES.find(item => item.id === params.get('stage')) ?? OVERSEAS_STAGES[0];
  return <>
    <header className="os-page-heading"><p className="os-eyebrow">把方法变成自己的行动</p><h1>模板与工具</h1><p className="os-lead">选当前阶段，填自己的项目。结果随时带走。</p></header>
    <div className="os-toolkit-layout"><nav className="os-template-nav" aria-label="选择阶段模板">{OVERSEAS_STAGES.map((item, index) => <button aria-pressed={item.id === stage.id} key={item.id} onClick={() => setParams({ stage: item.id }, { replace: true })}><span>{String(index + 1).padStart(2, '0')}</span>{item.output}</button>)}</nav><TemplateEditor key={stage.id} stage={stage} /></div>
    <details className="os-offline-roadmap">
      <summary>离线保存路线图（可选）</summary>
      <p className="os-muted">网站上可直接阅读完整路线。需要留一份到自己的笔记时，再复制或下载。</p>
      <div className="os-actions"><a className="os-button os-secondary" href={markdownDownloadHref(roadmapMarkdown())} download="AI出海实战路线图.md"><Download size={16} />下载路线图</a><button className="os-button os-secondary" onClick={() => copyMarkdown(roadmapMarkdown())}><Copy size={16} />复制路线图到笔记</button></div>
    </details>
    <section className="os-section"><h2>用到时，再打开这些资料</h2><p className="os-muted">优先查官方说明。支付准入、费用与政策可能变化，执行时核对当前条件。</p><div className="os-resource-grid">{OVERSEAS_RESOURCES.map(resource => <a className="os-resource" href={resource.url} key={resource.url} target="_blank" rel="noreferrer"><span><strong>{resource.title}</strong><p>{resource.description}</p></span><ExternalLink size={17} /></a>)}</div></section>
  </>;
}

function MissingPage() {
  return <div className="os-page-heading"><h1>这里还没有内容</h1><p className="os-lead">从完整路线图中选择一个阶段继续。</p><Link className="os-button os-primary" to={OVERSEAS_PATH}>返回出海路线图</Link></div>;
}

export default function OverseasPage() {
  const location = useLocation();
  return <main className="os-page">
    <div className="os-shell">
      <div className="os-breadcrumb"><Link to="/">学习地图</Link><span>/</span><Link to={OVERSEAS_PATH}>AI 出海</Link><span className="os-version">实战手册 · 持续更新</span></div>
      <nav className="os-tabs" aria-label="AI 出海栏目">{tabs.map(({ path, title, icon: Icon }) => <NavLink key={path} to={`${OVERSEAS_PATH}${path}`} end={path === ''} className={({ isActive }) => `os-tab ${isActive || (path === '' && location.pathname.includes('/stage/')) ? 'is-active' : ''}`}><Icon size={17} /><span>{title}</span></NavLink>)}</nav>
      <Routes><Route index element={<Overview />} /><Route path="learn" element={<TutorialIndex />} /><Route path="learn/:topicId" element={<TutorialTopicPage />} /><Route path="stage/:stageId" element={<StagePage />} /><Route path="knowledge" element={<Knowledge />} /><Route path="journal" element={<Journal />} /><Route path="toolkit" element={<Toolkit />} /><Route path="*" element={<MissingPage />} /></Routes>
      <footer className="os-module-footer"><span>AI 出海 · 各自实践，共享方法</span><span>内容更新：{OVERSEAS_UPDATED}</span></footer>
    </div>
  </main>;
}
