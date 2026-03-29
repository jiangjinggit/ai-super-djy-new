import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Copy,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { MODULE_COLOR_STYLES } from '@/constants/moduleStyles';
import { MODULE_ENHANCEMENTS } from '@/content/moduleEnhancements';
import { MODULE_CONTENT } from '@/content/modules';
import type { Lesson } from '@/types/course';
import { isModuleId } from '@/types/course';

const RELIABILITY_STYLES = {
  高: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  中: 'bg-yellow-500/20 text-yellow-200 border border-yellow-500/30',
  低: 'bg-red-500/20 text-red-200 border border-red-500/30',
} as const;

const splitCta = (text: string) => {
  const [prefix, suffix] = text.split(' → ');
  return {
    prefix,
    suffix: suffix ?? '继续学习',
  };
};

const tokenToCost = (tokens: number, unitPrice: number) => (tokens / 1_000_000) * unitPrice;

export default function ModulePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const moduleId = id && isModuleId(id) ? id : null;

  const content = moduleId ? MODULE_CONTENT[moduleId] : null;
  const enhancement = moduleId ? MODULE_ENHANCEMENTS[moduleId] : null;

  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [inputTokens, setInputTokens] = useState(120000);
  const [outputTokens, setOutputTokens] = useState(30000);
  const [budgetTier, setBudgetTier] = useState<'全部' | '低预算' | '均衡' | '高质量'>('全部');

  if (!content || !enhancement || !moduleId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">模块未找到</h2>
          <button type="button" onClick={() => navigate('/')} className="text-blue-500 hover:underline">
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const accent = MODULE_COLOR_STYLES[content.color];
  const Icon = content.icon;

  const modelOptions = enhancement.modelOptions ?? [];
  const filteredModels = useMemo(() => {
    if (budgetTier === '全部') {
      return modelOptions;
    }
    return modelOptions.filter((model) => model.tier === budgetTier);
  }, [budgetTier, modelOptions]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <button
        type="button"
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 返回首页
      </button>

      <div className="flex flex-col md:flex-row items-start gap-12 mb-20">
        <div className={`w-24 h-24 rounded-3xl flex items-center justify-center shrink-0 ${accent.iconWrap}`}>
          <Icon size={48} />
        </div>
        <div>
          <span className={`text-sm font-bold uppercase tracking-widest mb-4 block ${accent.subtitle}`}>{content.subtitle}</span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">{content.title}</h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">{content.description}</p>
        </div>
      </div>

      <div className="mb-12 p-6 bg-white/5 border border-white/10 rounded-3xl">
        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="text-emerald-400" size={18} />
          <h3 className="text-lg font-bold text-white">内容校验</h3>
        </div>
        <p className="text-sm text-gray-400 mb-4">最后校验日期：{enhancement.lastVerifiedOn}</p>
        <div className="flex flex-wrap gap-3">
          {enhancement.sources.map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition-colors"
            >
              {source.label}
            </a>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {content.sections.map((section, index) => {
          const SectionIcon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-white/5 border border-white/10 rounded-3xl"
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white mb-6">
                <SectionIcon size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{section.title}</h3>
              <p className="text-gray-400 leading-relaxed">{section.content}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="mb-20 p-12 bg-blue-600/5 border border-blue-500/20 rounded-[40px]">
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <Star className="text-yellow-500" /> 核心收获
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.keyTakeaways.map((takeaway, index) => (
            <div key={takeaway} className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold shrink-0 mt-1">
                {index + 1}
              </div>
              <p className="text-gray-300 leading-relaxed">{takeaway}</p>
            </div>
          ))}
        </div>
      </div>

      {enhancement.actionChecklist && enhancement.actionChecklist.length > 0 && (
        <section className="mb-20 p-10 bg-white/5 border border-white/10 rounded-[40px]">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Sparkles className="text-blue-400" /> 入门行动清单
          </h3>
          <div className="space-y-4">
            {enhancement.actionChecklist.map((item) => (
              <div key={item.title} className="p-5 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between mb-2 gap-2">
                  <h4 className="text-white font-bold">{item.title}</h4>
                  <span className="text-xs text-blue-300 bg-blue-500/20 px-2 py-1 rounded-full">{item.timebox}</span>
                </div>
                <p className="text-sm text-gray-300 mb-2">{item.description}</p>
                <p className="text-xs text-gray-500">完成标准：{item.doneDefinition}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {enhancement.modelOptions && enhancement.modelOptions.length > 0 && (
        <section className="mb-20 p-10 bg-white/5 border border-white/10 rounded-[40px]">
          <h3 className="text-2xl font-bold text-white mb-6">模型对比与成本估算</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <label className="text-sm text-gray-300">
              输入 Tokens
              <input
                type="number"
                min={0}
                value={inputTokens}
                onChange={(event) => setInputTokens(Number(event.target.value || 0))}
                className="mt-2 w-full px-3 py-2 rounded-xl bg-black/30 border border-white/10 text-white"
              />
            </label>
            <label className="text-sm text-gray-300">
              输出 Tokens
              <input
                type="number"
                min={0}
                value={outputTokens}
                onChange={(event) => setOutputTokens(Number(event.target.value || 0))}
                className="mt-2 w-full px-3 py-2 rounded-xl bg-black/30 border border-white/10 text-white"
              />
            </label>
            <label className="text-sm text-gray-300">
              预算档位
              <select
                value={budgetTier}
                onChange={(event) => setBudgetTier(event.target.value as '全部' | '低预算' | '均衡' | '高质量')}
                className="mt-2 w-full px-3 py-2 rounded-xl bg-black/30 border border-white/10 text-white"
              >
                <option value="全部">全部</option>
                <option value="低预算">低预算</option>
                <option value="均衡">均衡</option>
                <option value="高质量">高质量</option>
              </select>
            </label>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-300">
              <thead className="text-xs uppercase tracking-widest text-gray-500">
                <tr>
                  <th className="pb-3">模型</th>
                  <th className="pb-3">上下文</th>
                  <th className="pb-3">输入/输出单价</th>
                  <th className="pb-3">适用场景</th>
                  <th className="pb-3 text-right">预估成本</th>
                </tr>
              </thead>
              <tbody>
                {filteredModels.map((model) => {
                  const estimatedCost = tokenToCost(inputTokens, model.inputPerMTok) + tokenToCost(outputTokens, model.outputPerMTok);
                  return (
                    <tr key={model.name} className="border-t border-white/10">
                      <td className="py-4">
                        <p className="text-white font-semibold">{model.name}</p>
                        <p className="text-xs text-gray-500">{model.vendor} · 延迟 {model.latency}</p>
                      </td>
                      <td className="py-4">{model.contextWindow}</td>
                      <td className="py-4">${model.inputPerMTok}/MTok · ${model.outputPerMTok}/MTok</td>
                      <td className="py-4">{model.bestFor}</td>
                      <td className="py-4 text-right text-blue-300 font-bold">${estimatedCost.toFixed(3)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-3">说明：该估算只用于选型比较，不包含缓存命中、工具调用等额外成本。</p>
        </section>
      )}

      {enhancement.securityChecklist && enhancement.securityChecklist.length > 0 && (
        <section className="mb-20 p-10 bg-white/5 border border-white/10 rounded-[40px]">
          <h3 className="text-2xl font-bold text-white mb-6">智能体安全与权限边界</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enhancement.securityChecklist.map((rule) => (
              <div key={rule.title} className="p-5 bg-black/20 border border-white/10 rounded-2xl">
                <p className="text-white font-semibold mb-2">{rule.title}</p>
                <p className="text-sm text-gray-400">{rule.detail}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {enhancement.sopTemplates && enhancement.sopTemplates.length > 0 && (
        <section className="mb-20 p-10 bg-white/5 border border-white/10 rounded-[40px]">
          <h3 className="text-2xl font-bold text-white mb-6">场景 SOP 模板（输入-步骤-输出-KPI）</h3>
          <div className="space-y-5">
            {enhancement.sopTemplates.map((template) => (
              <div key={template.title} className="p-6 bg-black/20 border border-white/10 rounded-2xl">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <h4 className="text-white font-bold">{template.title}</h4>
                  <button
                    type="button"
                    onClick={async () => {
                      const templateText = [`标题: ${template.title}`, `输入: ${template.input}`, ...template.steps.map((step, index) => `${index + 1}. ${step}`), `输出: ${template.output}`, `KPI: ${template.kpi}`].join('\n');
                      await navigator.clipboard.writeText(templateText);
                      toast.success('SOP 模板已复制');
                    }}
                    className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/20 hover:border-white/40 text-gray-300"
                  >
                    <span className="inline-flex items-center gap-1">
                      <Copy size={14} /> 复制模板
                    </span>
                  </button>
                </div>
                <p className="text-sm text-gray-300 mb-2">输入：{template.input}</p>
                <ol className="text-sm text-gray-400 list-decimal list-inside space-y-1 mb-2">
                  {template.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
                <p className="text-sm text-gray-300">输出：{template.output}</p>
                <p className="text-xs text-blue-300 mt-2">KPI：{template.kpi}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {enhancement.caseEvidence && enhancement.caseEvidence.length > 0 && (
        <section className="mb-20 p-10 bg-white/5 border border-white/10 rounded-[40px]">
          <h3 className="text-2xl font-bold text-white mb-6">案例可信度与风险提示</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {enhancement.caseEvidence.map((evidence) => (
              <div key={evidence.title} className="p-5 bg-black/20 border border-white/10 rounded-2xl">
                <h4 className="text-white font-semibold mb-3">{evidence.title}</h4>
                <div className="flex items-center justify-between mb-2">
                  <a href={evidence.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-300 hover:underline">
                    {evidence.sourceLabel}
                  </a>
                  <span className="text-xs text-gray-500">{evidence.publishedOn}</span>
                </div>
                <div className={`inline-block text-xs px-2 py-1 rounded-full mb-3 ${RELIABILITY_STYLES[evidence.reproducibility]}`}>
                  可复制性：{evidence.reproducibility}
                </div>
                <p className="text-sm text-gray-400">{evidence.riskWarning}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {enhancement.weeklyPlan && enhancement.weeklyPlan.length > 0 && (
        <section className="mb-20 p-10 bg-white/5 border border-white/10 rounded-[40px]">
          <h3 className="text-2xl font-bold text-white mb-6">12 周执行路线（带回退策略）</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enhancement.weeklyPlan.map((weekPlan) => (
              <div key={weekPlan.week} className="p-5 bg-black/20 border border-white/10 rounded-2xl">
                <p className="text-blue-300 text-xs font-bold mb-2">Week {weekPlan.week}</p>
                <p className="text-white font-semibold mb-1">目标：{weekPlan.goal}</p>
                <p className="text-sm text-gray-400 mb-1">交付物：{weekPlan.deliverable}</p>
                <p className="text-xs text-gray-500">回退方案：{weekPlan.fallback}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="bg-white/5 border border-white/10 rounded-[40px] p-12">
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <BookOpen className="text-blue-500" /> 课程大纲
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.lessons.map((lesson, index) => (
            <button
              key={lesson.title}
              type="button"
              onClick={() => setSelectedLesson(lesson)}
              className="text-left flex items-center gap-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors group"
            >
              <div className="w-8 h-8 bg-blue-600/20 text-blue-400 rounded-lg flex items-center justify-center text-sm font-bold group-hover:bg-blue-600 group-hover:text-white transition-all">
                {index + 1}
              </div>
              <span className="text-gray-300 group-hover:text-white transition-colors">{lesson.title}</span>
              <ChevronRight size={16} className="ml-auto text-gray-600 group-hover:text-white transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {content.cta && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-12 p-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-[32px] text-center">
          <p className="text-lg text-blue-200 mb-6">{splitCta(content.cta.text).prefix}</p>
          <button
            type="button"
            onClick={() => navigate(content.cta?.link ?? '/')}
            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-all shadow-xl flex items-center gap-2 mx-auto"
          >
            {splitCta(content.cta.text).suffix} <ArrowRight size={20} />
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {selectedLesson && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLesson(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl bg-[#121212] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            >
              <button
                type="button"
                onClick={() => setSelectedLesson(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-black/40 backdrop-blur-md hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors z-20"
                aria-label="关闭"
              >
                <X size={20} />
              </button>

              <div className="overflow-y-auto custom-scrollbar">
                <div className="h-80 overflow-hidden relative">
                  <img src={selectedLesson.image} alt={selectedLesson.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/20 to-transparent" />
                </div>

                <div className="p-10 -mt-24 relative">
                  <h2 className="text-4xl font-black text-white mb-6 leading-tight">{selectedLesson.title}</h2>
                  <p className="text-gray-300 text-xl leading-relaxed mb-12 font-medium">{selectedLesson.content}</p>

                  <div className="space-y-12 mb-12">
                    {selectedLesson.fullContent.map((item) => (
                      <div key={item.subtitle} className="group">
                        <h4 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-3">
                          <span className="w-8 h-px bg-blue-500/30 group-hover:w-12 transition-all" />
                          {item.subtitle}
                        </h4>
                        <p className="text-gray-400 text-lg leading-relaxed pl-11 border-l border-white/5">{item.text}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedLesson(null)}
                    className="w-full py-5 bg-blue-600 text-white font-black text-lg rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20"
                  >
                    完成学习，返回大纲
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
