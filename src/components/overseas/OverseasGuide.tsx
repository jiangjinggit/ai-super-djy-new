import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, FileText } from 'lucide-react';
import { OVERSEAS_PATH, OVERSEAS_STAGES, overseasStagePath } from '@/content/overseas';
import { StageTutorialLink } from './OverseasTutorials';

export function OverseasGuide() {
  return <section className="os-section" aria-labelledby="guide-title">
    <div className="os-section-heading"><div><p className="os-eyebrow">顺着读，就知道怎么开始</p><h2 id="guide-title">每一步做什么，做到什么程度</h2></div><span className="os-small os-muted">完整说明直接读，无需逐页打开</span></div>
    <div className="os-reading-layout">
      <nav className="os-reading-nav" aria-label="本页阶段目录">
        {OVERSEAS_STAGES.map((stage, index) => <a key={stage.id} href={`#guide-${stage.id}`}><span>{String(index + 1).padStart(2, '0')}</span>{stage.title}</a>)}
        <a href="#overseas-next-step">接下来，从哪里开始</a>
      </nav>
      <div className="os-reading-body">
        {OVERSEAS_STAGES.map((stage, index) => <article className="os-guide-stage" id={`guide-${stage.id}`} key={stage.id} aria-labelledby={`guide-title-${stage.id}`} tabIndex={-1}>
          <header><span className="os-label">阶段 {String(index + 1).padStart(2, '0')}</span><h3 id={`guide-title-${stage.id}`}>{stage.title}</h3><p className="os-guide-question">{stage.question}</p></header>
          <dl className="os-guide-goal"><div><dt>目标</dt><dd data-guide-field="goal">{stage.goal}</dd></div><div><dt>产出</dt><dd data-guide-field="output">{stage.output}</dd></div></dl>
          <h4>具体做什么</h4>
          <ol className="os-guide-tasks">{stage.tasks.map(task => <li key={task.title}><strong data-guide-field="task-title">{task.title}</strong><p data-guide-field="task-detail">{task.detail}</p></li>)}</ol>
          <div className="os-guide-checks"><h4><CheckCircle2 size={17} />做到这样，才算完成</h4><ul>{stage.checks.map(check => <li key={check} data-guide-field="check">{check}</li>)}</ul></div>
          <div className="os-example"><span className="os-label">生图例子 · 假设或演示，非实绩</span><p data-guide-field="example">{stage.example}</p></div>
          <div className="os-guide-recovery"><div><h4>容易踩的坑</h4><p data-guide-field="pitfall">{stage.pitfall}</p></div><div><h4>还没达到，怎么办？</h4><p data-guide-field="fallback">{stage.fallback}</p></div></div>
          <StageTutorialLink stageId={stage.id} />
          <div className="os-guide-actions"><Link to={overseasStagePath(stage.id)}>进入本阶段实践与图解 <ArrowRight size={15} /></Link><Link to={`${OVERSEAS_PATH}/toolkit?stage=${stage.id}`}><FileText size={15} />填写本阶段模板</Link><a href="#panorama-title">回看全景图 ↑</a></div>
        </article>)}
      </div>
    </div>
  </section>;
}
