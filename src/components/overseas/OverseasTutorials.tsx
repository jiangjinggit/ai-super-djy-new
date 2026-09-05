import { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowDown, ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Copy, ExternalLink, PenLine } from 'lucide-react';
import { toast } from 'sonner';
import { OVERSEAS_PATH, OVERSEAS_STAGES, overseasStagePath } from '@/content/overseas';
import { OVERSEAS_TUTORIALS, TUTORIAL_REVIEWED, tutorialPath, type TutorialLesson, type TutorialTopic, type TutorialVisual } from '@/content/overseasTutorials';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useTutorialNotes } from '@/hooks/useTutorialNotes';
import { FlowDiagram } from './OverseasDiagrams';

async function copyText(text: string) {
  try { await navigator.clipboard.writeText(text); toast.success('已复制'); }
  catch { toast.error('复制失败，请选中文本后手动复制'); }
}

export function TutorialCards() {
  return <section className="os-section" aria-labelledby="tutorial-cards-title">
    <div className="os-section-heading"><div><p className="os-eyebrow">知道全程之后，照着做</p><h2 id="tutorial-cards-title">三块实战教程</h2></div><Link className="os-text-link" to={`${OVERSEAS_PATH}/learn`}>查看全部 16 篇 <ArrowRight size={15} /></Link></div>
    <div className="os-tutorial-cards">{OVERSEAS_TUTORIALS.map((topic, index) => <Link key={topic.id} className="os-tutorial-card" to={tutorialPath(topic.id)}><span className="os-label">专题 {String(index + 1).padStart(2, '0')} · {topic.lessons.length} 篇</span><h3>{topic.title}</h3><p>{topic.subtitle}</p><span className="os-text-link">从步骤学起 <ArrowRight size={15} /></span></Link>)}</div>
  </section>;
}

export function StageTutorialLink({ stageId }: { stageId: string }) {
  const topic = OVERSEAS_TUTORIALS.find(item => item.stages.includes(stageId));
  if (!topic) return null;
  return <Link className="os-tutorial-stage-link" to={tutorialPath(topic.id)}><BookOpen size={18} /><span><strong>具体怎么做：{topic.title}</strong><small>操作步骤、例子、图解与练习</small></span><ArrowRight size={17} /></Link>;
}

export function TutorialIndex() {
  useDocumentTitle('AI 出海 · 实战教程');
  return <>
    <header className="os-page-heading"><p className="os-eyebrow">各自做项目，共享方法</p><h1>从“知道”到“做一次”</h1><p className="os-lead">三块专题，16 篇教程。用生图案例看懂做法，练习时换成自己的产品。</p></header>
    <div className="os-learning-start"><strong>第一次来，从“如何找需求”开始。</strong><p>每篇按“步骤 → 图解与例子 → 自己练习 → 检查结果”阅读。按成果推进，不要求同一天、同一周完成。</p><Link className="os-button os-primary" to={tutorialPath('demand', 'find-clues')}>开始找需求 <ArrowRight size={16} /></Link></div>
    <div className="os-tutorial-index">{OVERSEAS_TUTORIALS.map((topic, index) => <section key={topic.id} className="os-note-card"><span className="os-label">专题 {index + 1} · {topic.lessons.length} 篇</span><h2><Link to={tutorialPath(topic.id)}>{topic.title}</Link></h2><p>{topic.intro}</p><ol>{topic.lessons.map(lesson => <li key={lesson.id}><Link to={tutorialPath(topic.id, lesson.id)}>{lesson.title}<ArrowRight size={14} /></Link></li>)}</ol><p className="os-small"><strong>做完带走：</strong>{topic.outcome}</p></section>)}</div>
    <aside className="os-tutorial-note">教程例子是演示，站长的真实进展看<Link to={`${OVERSEAS_PATH}/journal`}>生图项目实战</Link>。支付准入、平台操作和费用以执行时官方说明为准。资料核对：{TUTORIAL_REVIEWED}。</aside>
  </>;
}

function TutorialDiagram({ visual }: { visual: TutorialVisual }) {
  if (visual.kind === 'flow') return <FlowDiagram title={visual.title} steps={visual.steps} caption={visual.caption} />;
  if (visual.kind === 'decision') return <figure className="os-diagram"><figcaption>{visual.title}</figcaption><div className="os-decision-question">{visual.question}</div><div className="os-decision-branches"><div><span>有 / 是</span><ArrowDown size={18} aria-hidden="true" /><strong>{visual.yes}</strong></div><div><span>没有 / 否</span><ArrowDown size={18} aria-hidden="true" /><strong>{visual.no}</strong></div></div><p className="os-muted os-diagram-caption">{visual.caption}</p></figure>;
  return <figure className="os-diagram"><figcaption>{visual.title}</figcaption><ol className="os-tutorial-sequence" aria-label={visual.title}>{visual.events.map((event, index) => <li key={`${event.from}-${event.to}-${index}`}><span className="os-sequence-step">{index + 1}</span><div><div className="os-sequence-actors"><strong>{event.from}</strong><ArrowRight size={16} aria-label="到" /><strong>{event.to}</strong></div><p>{event.text}</p></div></li>)}</ol><p className="os-muted os-diagram-caption">{visual.caption}</p></figure>;
}

function ExerciseEditor({ topicId, lesson }: { topicId: string; lesson: TutorialLesson }) {
  const { text, edit, status } = useTutorialNotes(topicId, lesson.id, lesson.template);
  const messages: Record<string, string> = { failed: '无法保存到浏览器，请及时复制记录。', invalid: '原记录格式异常，暂显示空白模板；填写后会覆盖原记录。', saved: '已保存到当前浏览器', loaded: '已读取当前浏览器的记录', empty: '填写后自动保存到当前浏览器' };
  return <details className="os-lesson-notes"><summary><PenLine size={16} />填写本篇练习</summary><label htmlFor={`note-${lesson.id}`}>我的练习记录 · {lesson.title}</label><textarea id={`note-${lesson.id}`} value={text} onChange={event => edit(event.target.value)} spellCheck={false} /><div className="os-note-controls"><button className="os-button os-secondary" onClick={() => copyText(text)}><Copy size={15} />复制我的记录</button><span role="status" className={['failed', 'invalid'].includes(status) ? 'os-save-error' : 'os-small os-muted'}>{messages[status]}</span></div><p className="os-small os-muted">仅本机保存，不跨设备同步；清除浏览器数据会丢失。重要记录请复制留存，不要填写密钥和用户隐私。</p></details>;
}

function LessonArticle({ topic, lesson, index }: { topic: TutorialTopic; lesson: TutorialLesson; index: number }) {
  return <article id={lesson.id} className="os-guide-stage os-tutorial-lesson" aria-labelledby={`lesson-title-${lesson.id}`} tabIndex={-1}>
    <header><span className="os-label">第 {String(index + 1).padStart(2, '0')} 篇 / {String(topic.lessons.length).padStart(2, '0')}</span><h2 id={`lesson-title-${lesson.id}`}>{lesson.title}</h2><p className="os-guide-question">{lesson.question}</p></header>
    <div className="os-lesson-result"><strong>做完带走</strong><p>{lesson.result}</p></div>
    <h3>照着做</h3><ol className="os-guide-tasks">{lesson.steps.map(step => <li key={step.title}><strong>{step.title}</strong><p>{step.text}</p></li>)}</ol>
    <TutorialDiagram visual={lesson.visual} />
    <section className="os-lesson-example" aria-label={lesson.example.title}><h3>{lesson.example.title}</h3><div className="os-tutorial-table" tabIndex={0} role="region" aria-label={`${lesson.example.title}对照表`}><table><thead><tr>{lesson.example.columns.map(column => <th scope="col" key={column}>{column}</th>)}</tr></thead><tbody>{lesson.example.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>{lesson.example.note && <p className="os-small os-muted">{lesson.example.note}</p>}</section>
    {lesson.snippets?.map(snippet => <section className="os-lesson-snippet" key={snippet.title}><div><h3>{snippet.title}</h3><button aria-label={`复制：${snippet.title}`} onClick={() => copyText(snippet.text)}><Copy size={14} />复制</button></div><pre tabIndex={0}><code>{snippet.text}</code></pre><p className="os-small os-muted">{snippet.note}</p></section>)}
    <section className="os-lesson-practice"><h3><PenLine size={18} />轮到你做一次</h3><p>{lesson.exercise}</p><ExerciseEditor key={`${topic.id}:${lesson.id}`} topicId={topic.id} lesson={lesson} /></section>
    <section className="os-guide-checks"><h3><CheckCircle2 size={18} />做到这样，再继续</h3><ul>{lesson.checks.map(check => <li key={check}>{check}</li>)}</ul></section>
    <section className="os-lesson-troubleshooting"><h3>卡住时，先查这里</h3><dl>{lesson.troubleshooting.map(item => <div key={item.problem}><dt>{item.problem}</dt><dd>{item.action}</dd></div>)}</dl></section>
    {!!lesson.resources?.length && <aside className="os-lesson-resources"><strong>相关资料 · 执行时核对最新说明</strong>{lesson.resources.map(resource => <a key={resource.url} href={resource.url} target="_blank" rel="noreferrer">{resource.title}<ExternalLink size={13} /></a>)}</aside>}
    <nav className="os-guide-actions" aria-label={`${lesson.title}阅读导航`}><a href="#topic-top">回到本专题目录 ↑</a>{index < topic.lessons.length - 1 ? <Link to={tutorialPath(topic.id, topic.lessons[index + 1].id)}>下一篇：{topic.lessons[index + 1].title}<ArrowRight size={15} /></Link> : <a href="#topic-finish">做完本专题，下一步 →</a>}</nav>
  </article>;
}

export function TutorialTopicPage() {
  const { topicId } = useParams();
  const location = useLocation();
  const topicIndex = OVERSEAS_TUTORIALS.findIndex(item => item.id === topicId);
  const topic = OVERSEAS_TUTORIALS[topicIndex];
  useDocumentTitle(topic ? `AI 出海 · ${topic.title}` : '未找到实战教程');
  useEffect(() => {
    const id = location.hash.slice(1);
    if (!topic || !['topic-top', 'topic-finish', ...topic.lessons.map(lesson => lesson.id)].includes(id)) return;
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }));
    return () => cancelAnimationFrame(frame);
  }, [location.hash, location.key, topic]);
  if (!topic) return <div className="os-page-heading"><h1>没有找到这个专题</h1><p className="os-lead">从三个实战专题中选择一个继续。</p><Link className="os-button os-primary" to={`${OVERSEAS_PATH}/learn`}>查看实战教程</Link></div>;
  const next = OVERSEAS_TUTORIALS[topicIndex + 1];
  return <>
    <Link className="os-back" to={`${OVERSEAS_PATH}/learn`}><ArrowLeft size={16} />全部实战教程</Link>
    <header id="topic-top" className="os-page-heading"><p className="os-eyebrow">专题 {topicIndex + 1} · {topic.lessons.length} 篇操作教程</p><h1>{topic.title}</h1><p className="os-lead">{topic.intro}</p><p className="os-small os-muted">生图案例用于教学演示；练习换成自己的产品。资料核对：{TUTORIAL_REVIEWED}。</p></header>
    <div className="os-reading-layout os-tutorial-layout"><nav className="os-reading-nav" aria-label="本专题目录">{topic.lessons.map((lesson, index) => <Link key={lesson.id} to={tutorialPath(topic.id, lesson.id)} aria-current={location.hash === `#${lesson.id}` ? 'location' : undefined}><span>{String(index + 1).padStart(2, '0')}</span>{lesson.title}</Link>)}<a href="#topic-finish">做完之后，下一步</a></nav><div className="os-reading-body">{topic.lessons.map((lesson, index) => <LessonArticle key={`${topic.id}:${lesson.id}`} topic={topic} lesson={lesson} index={index} />)}</div></div>
    <section id="topic-finish" className="os-next-step"><span className="os-label">用真实结果检查本轮实践</span><h2>把练习带回路线图</h2><p>{topic.outcome} 按实际结果核对阶段任务；读完教程不等于实践完成。</p><div className="os-actions">{OVERSEAS_STAGES.filter(stage => topic.stages.includes(stage.id)).map(stage => <Link className="os-button os-secondary" key={stage.id} to={overseasStagePath(stage.id)}>{stage.title}<ArrowRight size={14} /></Link>)}</div><Link className="os-text-link" to={next ? tutorialPath(next.id) : `${OVERSEAS_PATH}/journal`}>{next ? `接着学习：${next.title}` : '把过程写进实践记录，积累分享素材'}<ArrowRight size={15} /></Link></section>
  </>;
}
