import {
  ArrowDown,
  ArrowRight,
  Bot,
  CheckCircle2,
  FileStack,
  FolderKanban,
  LayoutTemplate,
  SearchCheck,
  ShieldAlert,
  WandSparkles,
  Workflow,
} from 'lucide-react';

import type { ModuleId } from '@/types/course';

interface LessonVisualGuideProps {
  lessonSlug: string;
  moduleId: ModuleId;
}

const SectionHeader = ({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) => {
  return (
    <div className="mb-6">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-600 dark:text-blue-300 mb-3">{eyebrow}</p>
      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
      <p className="text-sm md:text-base text-slate-600 dark:text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
};

const AiBoundaryVisual = () => {
  const cards = [
    {
      label: 'A 类',
      title: '直接让 AI 起草',
      description: '摘要、纪要、周报、资料整理',
      tone: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200',
    },
    {
      label: 'B 类',
      title: 'AI 做 70%',
      description: '营销文案、方案框架、客户沟通稿',
      tone: 'border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-200',
    },
    {
      label: 'C 类',
      title: '只能辅助，不直接交付',
      description: '合同、财务、医疗、重大承诺',
      tone: 'border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-100',
    },
    {
      label: 'D 类',
      title: '先别交给 AI',
      description: '目标不清、材料不全、完成标准不明',
      tone: 'border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-300',
    },
  ];

  return (
    <section className="mb-10 rounded-[32px] border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-6 md:p-8">
      <SectionHeader
        eyebrow="VISUAL GUIDE"
        title="一图先看懂任务该怎么分"
        description="入门先别急着追模型，先把任务分对。对新手来说，这张图比任何工具推荐都更重要。"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card) => (
          <div key={card.label} className={`rounded-2xl border px-5 py-5 ${card.tone}`}>
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3 opacity-80">{card.label}</p>
            <h3 className="text-lg font-bold mb-2">{card.title}</h3>
            <p className="text-sm leading-relaxed opacity-90">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const PromptFormulaVisual = () => {
  const steps = [
    { icon: WandSparkles, title: '角色', description: '让 AI 知道它现在是谁' },
    { icon: CheckCircle2, title: '目标', description: '说清楚要完成什么' },
    { icon: FileStack, title: '上下文', description: '提供材料、对象和背景' },
    { icon: ShieldAlert, title: '约束', description: '限制长度、语气和禁区' },
    { icon: LayoutTemplate, title: '输出', description: '指定表格、列表或模板' },
  ];

  return (
    <section className="mb-10 rounded-[32px] border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-6 md:p-8">
      <SectionHeader
        eyebrow="VISUAL GUIDE"
        title="好用提示词不是灵感，是固定结构"
        description="以后每次提问，都先把下面 5 项补齐。只要结构完整，输出稳定性就会明显上升。"
      />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="relative rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-200 dark:bg-black/20 px-4 py-5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-300 flex items-center justify-center mb-4">
                <Icon size={18} />
              </div>
              <h3 className="text-slate-900 dark:text-white font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 text-gray-600">
                  <ArrowRight size={18} />
                </div>
              )}
              {index < steps.length - 1 && (
                <div className="flex md:hidden justify-center mt-4 text-gray-600">
                  <ArrowDown size={18} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

const WorkflowTemplateVisual = () => {
  const steps = [
    { title: '目标', description: '这次要产出什么结果' },
    { title: '输入', description: '原始材料从哪里来' },
    { title: '步骤', description: '按顺序要做哪些动作' },
    { title: '输出', description: '最终交付什么格式' },
    { title: '完成标准', description: '什么样才算合格' },
  ];

  return (
    <section className="mb-10 rounded-[32px] border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-6 md:p-8">
      <SectionHeader
        eyebrow="VISUAL GUIDE"
        title="先把任务拆成 5 个格子"
        description="工作流不是复杂自动化，而是先把一个重复任务写成固定结构。这个结构一旦清楚，后面才谈得上复用。"
      />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {steps.map((step, index) => (
          <div key={step.title} className="relative rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-200 dark:bg-black/20 px-4 py-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-300 mb-3">STEP {index + 1}</p>
            <h3 className="text-slate-900 dark:text-white font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
            {index < steps.length - 1 && (
              <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 text-gray-600">
                <ArrowRight size={18} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const ToolStackVisual = () => {
  const items = [
    {
      icon: Bot,
      title: '对话模型',
      role: '起草、总结、提纲、整理',
      avoid: '不要当成最终事实来源',
    },
    {
      icon: SearchCheck,
      title: '搜索工具',
      role: '查最新信息、找原始来源',
      avoid: '不要替代长期沉淀',
    },
    {
      icon: FolderKanban,
      title: '知识库',
      role: '存模板、案例、复盘',
      avoid: '不要承担即时生成',
    },
    {
      icon: Workflow,
      title: '自动化工具',
      role: '做提醒、搬运和串联',
      avoid: '不要一开始就碰高风险执行',
    },
  ];

  return (
    <section className="mb-10 rounded-[32px] border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-6 md:p-8">
      <SectionHeader
        eyebrow="VISUAL GUIDE"
        title="新手只要配这 4 类工具"
        description="先把每个工具的职责划清楚，再谈品牌。职责不清，工具越多越乱。"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-200 dark:bg-black/20 px-5 py-5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-300 flex items-center justify-center mb-4">
                <Icon size={18} />
              </div>
              <h3 className="text-slate-900 dark:text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-slate-700 dark:text-gray-300 mb-2">负责：{item.role}</p>
              <p className="text-sm text-slate-500 dark:text-gray-500">不要：{item.avoid}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const KnowledgeLoopVisual = () => {
  const items = [
    { title: '模板', description: '保留以后还能复用的好提示词' },
    { title: '流程', description: '把重复任务沉淀成 SOP' },
    { title: '案例', description: '记录什么场景下结果最好' },
    { title: '复盘', description: '失败一次就补一次规则' },
  ];

  return (
    <section className="mb-10 rounded-[32px] border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-6 md:p-8">
      <SectionHeader
        eyebrow="VISUAL GUIDE"
        title="让 AI 越用越准的 4 个沉淀桶"
        description="不是把所有聊天记录都存起来，而是只保留以后还会再次用到的内容。"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <div key={item.title} className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-200 dark:bg-black/20 px-5 py-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-300 mb-3">BUCKET {index + 1}</p>
            <h3 className="text-slate-900 dark:text-white font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const FirstWeekPlanVisual = () => {
  const days = [
    { day: 'Day 1', task: '列任务', note: '筛出最适合起步的 1 个任务' },
    { day: 'Day 2', task: '写模板', note: '写出第一个可复用 Prompt' },
    { day: 'Day 3-5', task: '跑真实任务', note: '至少完成 3 次真实交付' },
    { day: 'Day 6', task: '做归档', note: '把模板和复盘收进知识库' },
    { day: 'Day 7', task: '做复盘', note: '明确下周继续优化什么' },
  ];

  return (
    <section className="mb-10 rounded-[32px] border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-6 md:p-8">
      <SectionHeader
        eyebrow="VISUAL GUIDE"
        title="第一周只盯 5 个动作"
        description="入门最怕学了很多但没有结果。第一周只做这些最小动作，先把闭环跑出来。"
      />
      <div className="space-y-3">
        {days.map((item, index) => (
          <div key={item.day} className="flex flex-col md:flex-row md:items-center gap-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-200 dark:bg-black/20 px-5 py-4">
            <div className="w-24 text-sm font-bold text-blue-600 dark:text-blue-300 shrink-0">{item.day}</div>
            <div className="flex-1">
              <h3 className="text-slate-900 dark:text-white font-semibold mb-1">{item.task}</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">{item.note}</p>
            </div>
            {index < days.length - 1 && <ArrowDown size={16} className="text-gray-600 md:hidden" />}
          </div>
        ))}
      </div>
    </section>
  );
};

export const LessonVisualGuide = ({ lessonSlug, moduleId }: LessonVisualGuideProps) => {
  if (moduleId !== 'super-individual') {
    return null;
  }

  switch (lessonSlug) {
    case 'ai-boundary':
      return <AiBoundaryVisual />;
    case 'prompt-minimum':
      return <PromptFormulaVisual />;
    case 'workflow-template':
      return <WorkflowTemplateVisual />;
    case 'tool-stack-basic':
      return <ToolStackVisual />;
    case 'knowledge-loop':
      return <KnowledgeLoopVisual />;
    case 'first-week-plan':
      return <FirstWeekPlanVisual />;
    default:
      return null;
  }
};
