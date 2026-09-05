import { useId } from 'react';
import { ArrowDown, ArrowRight, RotateCcw } from 'lucide-react';

export function FlowDiagram({ title, steps, caption }: { title: string; steps: string[]; caption?: string }) {
  return <figure className="os-diagram">
    <figcaption>{title}</figcaption>
    <ol className="os-flow">
      {steps.map((step, index) => <li key={step}>
        <div><span className="os-flow-number">{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong></div>
        {index < steps.length - 1 && <><ArrowRight className="os-flow-arrow" size={18} aria-hidden="true" /><ArrowDown className="os-flow-down" size={18} aria-hidden="true" /></>}
      </li>)}
    </ol>
    {caption && <p className="os-muted os-diagram-caption">{caption}</p>}
  </figure>;
}

export function DecisionDiagram() {
  return <figure className="os-diagram">
    <figcaption>收到反馈后，往哪里走？</figcaption>
    <div className="os-decision-question">目标用户看过样例后，有没有实际行动？</div>
    <div className="os-decision-branches">
      <div><span>有：提交素材、试用、询价</span><ArrowDown size={18} aria-hidden="true" /><strong>做小版本，继续验证</strong></div>
      <div><span>没有，或只说“挺好”</span><ArrowDown size={18} aria-hidden="true" /><strong>回到人群、问题和样例</strong></div>
    </div>
    <p className="os-muted os-diagram-caption">行动是继续探索的信号。真正愿意付费，还需要后续验证。</p>
  </figure>;
}

export function PaymentSequence() {
  const id = useId().replace(/:/g, '');
  const events = [
    { from: 0, to: 2, text: '① 选择套餐，完成付款' },
    { from: 2, to: 1, text: '② 通知服务器付款结果' },
    { from: 1, to: 2, text: '③ 验明通知后，查询订单' },
    { from: 2, to: 1, text: '④ 返回付款状态与金额' },
    { from: 1, to: 0, text: '⑤ 核对无误，只加一次额度' },
    { from: 2, to: 1, text: '⑥ 按结算周期核对到账与费用' },
  ];
  const positions = [90, 340, 650];
  const actors = ['用户', '你的服务器', '支付服务'];
  return <figure className="os-diagram">
    <figcaption>支付时序图：付款后，谁通知谁？</figcaption>
    <div className="os-sequence-scroll" tabIndex={0} role="region" aria-label="支付时序图，窄屏可左右滑动">
      <svg viewBox="0 0 760 420" role="img" aria-labelledby={`${id}-title ${id}-desc`} className="os-sequence">
        <title id={`${id}-title`}>用户、你的服务器与支付服务的交互顺序</title>
        <desc id={`${id}-desc`}>用户付款后，支付服务通知服务器。服务器核实通知、订单与金额，再给用户加一次额度。之后核对结算到账与费用。</desc>
        <defs><marker id={`${id}-arrow`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="currentColor" /></marker></defs>
        {['用户', '你的网站服务器', '支付服务'].map((label, index) => <g key={label}>
          <rect x={positions[index] - 78} y="12" width="156" height="40" rx="10" className="os-sequence-head" />
          <text x={positions[index]} y="38" textAnchor="middle" className="os-svg-label">{label}</text>
          <line x1={positions[index]} y1="62" x2={positions[index]} y2="405" stroke="currentColor" strokeDasharray="4 6" opacity=".25" />
        </g>)}
        {events.map((event, index) => <g key={event.text}>
          <text x={(positions[event.from] + positions[event.to]) / 2} y={88 + index * 54} textAnchor="middle" className="os-svg-label">{event.text}</text>
          <line x1={positions[event.from]} x2={positions[event.to]} y1={101 + index * 54} y2={101 + index * 54} stroke="currentColor" strokeWidth="1.5" markerEnd={`url(#${id}-arrow)`} />
        </g>)}
      </svg>
    </div>
    <ol className="os-sequence-mobile" aria-label="付款到交付的顺序">
      {events.map(event => <li key={event.text}><div><span>{actors[event.from]}</span><ArrowRight size={16} aria-label="通知或交付给" /><span>{actors[event.to]}</span></div><p>{event.text}</p></li>)}
    </ol>
    <p className="os-muted os-diagram-caption">付款确认与结算到账是两件事。失败不加额度，重复通知不重复加；退款另走退款流程。</p>
  </figure>;
}

export function ParallelTracks() {
  return <figure className="os-diagram">
    <figcaption>哪些事情要提前做？</figcaption>
    <div className="os-track-grid">
      <span />{['找需求', '做产品', '做增长'].map(text => <strong key={text}>{text}</strong>)}
      <span>接触用户</span><span className="os-track">访谈、看原话</span><span className="os-track">邀请试用</span><span className="os-track">跟进反馈</span>
      <span>收款</span><span className="os-track">查适用条件</span><span className="os-track">接入、测试</span><span className="os-track">核对结算</span>
      <span>SEO</span><span className="os-track">收集搜索词</span><span className="os-track">做好页面基础</span><span className="os-track">内容与观察</span>
      <span>记录分享</span><span className="os-track">记录假设</span><span className="os-track">记录过程</span><span className="os-track">复盘结果</span>
    </div>
    <p className="os-muted os-diagram-caption"><RotateCcw size={14} aria-hidden="true" /> 阶段表示当前重点。发现问题，随时回到前面调整。</p>
  </figure>;
}
