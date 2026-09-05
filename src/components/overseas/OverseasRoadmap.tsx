import { useId } from 'react';
import { ArrowDown, RotateCcw } from 'lucide-react';
import { OVERSEAS_STAGES } from '@/content/overseas';

const layout = [
  [50, 60], [410, 60], [770, 60],
  [770, 310], [410, 310], [50, 310],
  [50, 500], [410, 500], [770, 500],
];
const shortTitles = ['写下项目起点', '找用户和真实问题', '用样例验证需求', '做最小可用产品', '定价格，接入支付', '找第一批真实用户', '做 SEO，持续获客', '看体验，算清收支', '复盘，决定下一轮'];
const hints = ['写项目起步卡', '留下真实需求证据', '观察试用、提交素材或询价', '让别人独立完成核心任务', '验证付款、交付和退款', '记录来源、使用和付费', '观察搜索到使用的过程', '根据反馈改进产品', '把真实过程整理成方法'];

export function OverseasRoadmap() {
  const marker = `roadmap-${useId().replace(/:/g, '')}`;
  return <figure className="os-panorama" aria-labelledby="panorama-title">
    <figcaption id="panorama-title"><strong>先看全程：从想法走到真实用户</strong><span>点图中的阶段，跳到下方说明</span></figcaption>
    <div className="os-panorama-legend"><span>01—03 找需求</span><span>04—05 做产品、收款</span><span>06—09 获客、经营与复盘</span></div>
    <svg className="os-panorama-desktop" viewBox="0 0 1140 610" role="group" aria-label="出海全景流程图，九个阶段及需求验证回退分支">
      <defs>
        <marker id={marker} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="currentColor" /></marker>
        <marker id={`${marker}-back`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="currentColor" /></marker>
      </defs>
      <g fill="none" stroke="currentColor" strokeWidth="2" className="os-route-lines" markerEnd={`url(#${marker})`} aria-hidden="true">
        <path d="M310 96H410" /><path d="M670 96H770" />
        <path d="M900 132V175" /><path d="M900 265V310" />
        <path d="M770 346H670" /><path d="M410 346H310" />
        <path d="M180 382V500" />
        <path d="M310 536H410" /><path d="M670 536H770" />
      </g>
      <g className="os-route-return" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 5" markerEnd={`url(#${marker}-back)`} aria-hidden="true">
        <path d="M784 220H540V132" />
        <path d="M1030 536H1100V22H540V60" />
      </g>
      <text className="os-route-label" x="914" y="292">有 → 继续验证</text>
      <text className="os-route-label" x="194" y="444">持续观察结果</text>
      <a href="#guide-research" className="os-route-return-label"><text x="658" y="204" textAnchor="middle">没有 → 回 02 调整需求</text></a>
      <a href="#guide-research" className="os-route-return-label"><rect x="657" y="7" width="300" height="30" rx="5" /><text x="807" y="27" textAnchor="middle">下一轮：带着新问题回到 02</text></a>
      <polygon className="os-route-gate" points="900,175 1016,220 900,265 784,220" />
      <text className="os-route-gate-text" x="900" y="215" textAnchor="middle"><tspan x="900">目标用户有</tspan><tspan x="900" dy="20">实际行动吗？</tspan></text>
      {OVERSEAS_STAGES.map((stage, index) => {
        const [x, y] = layout[index];
        return <a key={stage.id} href={`#guide-${stage.id}`} className={`os-route-node os-route-color-${index < 3 ? 0 : index < 5 ? 1 : 2}`} aria-label={`${String(index + 1).padStart(2, '0')} ${stage.title}，查看本页说明`}>
          <rect x={x} y={y} width="260" height="72" rx="10" />
          <text x={x + 16} y={y + 29} className="os-route-node-title">{String(index + 1).padStart(2, '0')}　{shortTitles[index]}</text>
          <text x={x + 16} y={y + 53} className="os-route-node-hint">{hints[index]}</text>
        </a>;
      })}
    </svg>
    <ol className="os-panorama-mobile" aria-label="九阶段路线与判断分支">
      {OVERSEAS_STAGES.map((stage, index) => <li key={stage.id}>
        <a href={`#guide-${stage.id}`} className={`os-mobile-route-node os-route-color-${index < 3 ? 0 : index < 5 ? 1 : 2}`}><span>{String(index + 1).padStart(2, '0')}</span><strong>{shortTitles[index]}</strong></a>
        {index === 2 && <div className="os-mobile-route-gate"><ArrowDown size={16} aria-hidden="true" /><strong>目标用户有实际行动吗？</strong><a href="#guide-research"><RotateCcw size={14} />没有 → 回 02 调整需求</a><span>有 → 继续验证</span></div>}
        {index < 8 && <ArrowDown className="os-mobile-route-arrow" size={18} aria-label="下一步" />}
      </li>)}
      <li className="os-mobile-route-loop"><a href="#guide-research"><RotateCcw size={16} />下一轮：带着新问题回到 02</a></li>
    </ol>
    <p className="os-panorama-caption">试用、提交素材、询价，是继续验证的信号。走到后面发现问题，也可以回到前面调整。</p>
  </figure>;
}
