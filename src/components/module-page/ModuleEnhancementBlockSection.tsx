import { Copy, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import type {
  ActionChecklistBlock,
  CaseEvidenceBlock,
  ModelOption,
  ModelOptionsBlock,
  ModuleEnhancementBlock,
  SecurityChecklistBlock,
  SopTemplatesBlock,
  WeeklyPlanBlock,
} from '@/types/course';

const RELIABILITY_STYLES = {
  高: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  中: 'bg-yellow-500/20 text-yellow-200 border border-yellow-500/30',
  低: 'bg-red-500/20 text-red-200 border border-red-500/30',
} as const;

const tokenToCost = (tokens: number, unitPrice: number) => (tokens / 1_000_000) * unitPrice;

const ActionChecklistSection = ({ title, description, items }: ActionChecklistBlock) => {
  return (
    <section className="mb-20 p-10 bg-white/5 border border-white/10 rounded-[40px]">
      <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
        <Sparkles className="text-blue-400" /> {title}
      </h3>
      {description && <p className="text-sm text-gray-400 mb-6">{description}</p>}
      <div className="space-y-4">
        {items.map((item) => (
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
  );
};

const ModelOptionsSection = ({ title, description, items, footer }: ModelOptionsBlock) => {
  const [inputTokens, setInputTokens] = useState(120000);
  const [outputTokens, setOutputTokens] = useState(30000);
  const [budgetTier, setBudgetTier] = useState<'全部' | '低预算' | '均衡' | '高质量'>('全部');

  const filteredModels = useMemo(() => {
    if (budgetTier === '全部') {
      return items;
    }
    return items.filter((model: ModelOption) => model.tier === budgetTier);
  }, [budgetTier, items]);

  return (
    <section className="mb-20 p-10 bg-white/5 border border-white/10 rounded-[40px]">
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      {description && <p className="text-sm text-gray-400 mb-6">{description}</p>}
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
      {footer && <p className="text-xs text-gray-500 mt-3">{footer}</p>}
    </section>
  );
};

const SecurityChecklistSection = ({ title, description, items }: SecurityChecklistBlock) => {
  return (
    <section className="mb-20 p-10 bg-white/5 border border-white/10 rounded-[40px]">
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      {description && <p className="text-sm text-gray-400 mb-6">{description}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((rule) => (
          <div key={rule.title} className="p-5 bg-black/20 border border-white/10 rounded-2xl">
            <p className="text-white font-semibold mb-2">{rule.title}</p>
            <p className="text-sm text-gray-400">{rule.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const SopTemplatesSection = ({ title, description, items }: SopTemplatesBlock) => {
  return (
    <section className="mb-20 p-10 bg-white/5 border border-white/10 rounded-[40px]">
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      {description && <p className="text-sm text-gray-400 mb-6">{description}</p>}
      <div className="space-y-5">
        {items.map((template) => (
          <div key={template.title} className="p-6 bg-black/20 border border-white/10 rounded-2xl">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h4 className="text-white font-bold">{template.title}</h4>
              <button
                type="button"
                onClick={async () => {
                  const templateText = [
                    `标题: ${template.title}`,
                    `输入: ${template.input}`,
                    ...template.steps.map((step, index) => `${index + 1}. ${step}`),
                    `输出: ${template.output}`,
                    `KPI: ${template.kpi}`,
                  ].join('\n');
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
  );
};

const CaseEvidenceSection = ({ title, description, items }: CaseEvidenceBlock) => {
  return (
    <section className="mb-20 p-10 bg-white/5 border border-white/10 rounded-[40px]">
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      {description && <p className="text-sm text-gray-400 mb-6">{description}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((evidence) => (
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
  );
};

const WeeklyPlanSection = ({ title, description, items }: WeeklyPlanBlock) => {
  return (
    <section className="mb-20 p-10 bg-white/5 border border-white/10 rounded-[40px]">
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      {description && <p className="text-sm text-gray-400 mb-6">{description}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((weekPlan) => (
          <div key={weekPlan.week} className="p-5 bg-black/20 border border-white/10 rounded-2xl">
            <p className="text-blue-300 text-xs font-bold mb-2">Week {weekPlan.week}</p>
            <p className="text-white font-semibold mb-1">目标：{weekPlan.goal}</p>
            <p className="text-sm text-gray-400 mb-1">交付物：{weekPlan.deliverable}</p>
            <p className="text-xs text-gray-500">回退方案：{weekPlan.fallback}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

interface ModuleEnhancementBlockSectionProps {
  block: ModuleEnhancementBlock;
}

export const ModuleEnhancementBlockSection = ({ block }: ModuleEnhancementBlockSectionProps) => {
  switch (block.type) {
    case 'action-checklist':
      return <ActionChecklistSection {...block} />;
    case 'model-options':
      return <ModelOptionsSection {...block} />;
    case 'security-checklist':
      return <SecurityChecklistSection {...block} />;
    case 'sop-templates':
      return <SopTemplatesSection {...block} />;
    case 'case-evidence':
      return <CaseEvidenceSection {...block} />;
    case 'weekly-plan':
      return <WeeklyPlanSection {...block} />;
    default:
      return null;
  }
};
