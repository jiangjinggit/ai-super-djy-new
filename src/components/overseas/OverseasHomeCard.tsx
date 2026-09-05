import { ArrowRight, Globe2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OVERSEAS_PATH, OVERSEAS_PHASES } from '@/content/overseas';

export function OverseasHomeCard() {
  return <section aria-labelledby="overseas-modules">
    <div className="mb-6 md:mb-8"><p className="font-mono-tech text-[10px] tracking-[0.22em] text-emerald-700 dark:text-emerald-300 mb-2">05 · AI 出海</p><h3 id="overseas-modules" className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">把产品做给世界</h3><p className="text-sm md:text-base text-slate-600 dark:text-gray-400">看懂路线，各自实践。从需求验证到上线、收款、引流与 SEO。</p></div>
    <Link to={OVERSEAS_PATH} className="group block rounded-3xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/25 p-6 md:p-9 hover:border-emerald-500 transition-colors focus-visible:outline-2 focus-visible:outline-emerald-600 focus-visible:outline-offset-4">
      <div className="flex items-center justify-between gap-4"><div className="flex items-center gap-4"><Globe2 className="text-emerald-700 dark:text-emerald-300 shrink-0" size={34} strokeWidth={1.5} /><div><h4 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">AI 出海实战路线图</h4><p className="text-sm text-slate-600 dark:text-gray-400 mt-2">9 个阶段 · 具体任务 · 图解与模板 · 生图项目记录</p></div></div><ArrowRight className="text-emerald-700 dark:text-emerald-300 shrink-0 group-hover:translate-x-1 transition-transform" size={22} /></div>
      <div className="grid md:grid-cols-3 gap-3 mt-7">{OVERSEAS_PHASES.map((phase, index) => <div key={phase.title} className="border-t border-emerald-200 dark:border-emerald-900 pt-4"><span className="text-xs text-emerald-700 dark:text-emerald-300">0{index + 1}</span><strong className="block text-sm text-slate-800 dark:text-slate-100 mt-1">{phase.title}</strong><p className="text-xs text-slate-600 dark:text-gray-400 mt-1">{phase.description}</p></div>)}</div>
    </Link>
  </section>;
}
