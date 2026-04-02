import {
  ArrowDown,
  ArrowRight,
  Bot,
  BellRing,
  Blocks,
  Cable,
  CheckCircle2,
  CloudCog,
  DatabaseZap,
  FileStack,
  FolderKanban,
  LayoutTemplate,
  Layers3,
  MessageSquareShare,
  SearchCheck,
  ServerCog,
  ShieldAlert,
  ShieldCheck,
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
      title: '对话助手',
      example: '豆包 / Kimi / 元宝 / 通义千问',
      role: '写草稿、做整理、出提纲',
      avoid: '不要当事实来源，会编数据',
    },
    {
      icon: SearchCheck,
      title: '信息核查',
      example: '秘塔 AI 搜索 + 官网确认',
      role: '快速聚合信息，找到线索入口',
      avoid: '关键数据必须去官网验证',
    },
    {
      icon: FolderKanban,
      title: '知识沉淀',
      example: '飞书文档 / Notion',
      role: '存模板、案例、复盘记录',
      avoid: '不要什么都存，只存能复用的',
    },
    {
      icon: Workflow,
      title: '流程串联',
      example: '飞书多维表格 / Coze',
      role: '自动提醒、状态流转、定时汇总',
      avoid: '新手先用工具自带功能，别急着接 API',
    },
  ];

  return (
    <section className="mb-10 rounded-[32px] border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-6 md:p-8">
      <SectionHeader
        eyebrow="VISUAL GUIDE"
        title="4 个角色，每个只选 1 个工具"
        description="先按角色选，不按品牌选。AI 搜索是线索入口，关键数据要去官网确认。"
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
              <p className="text-xs font-medium text-blue-600 dark:text-blue-300 mb-3">{item.example}</p>
              <p className="text-sm text-slate-700 dark:text-gray-300 mb-2">✅ {item.role}</p>
              <p className="text-sm text-slate-500 dark:text-gray-500">⚠️ {item.avoid}</p>
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

const OpenClawLayersVisual = () => {
  const layers = [
    { icon: ServerCog, title: '基础设施层', desc: '服务器、模型、后台守护、渠道网关' },
    { icon: ShieldAlert, title: '规则层', desc: 'SOUL.md、USER.md、AGENTS.md' },
    { icon: DatabaseZap, title: '记忆层', desc: 'daily notes、MEMORY.md、场景资产' },
    { icon: Blocks, title: '能力层', desc: 'Skills、API、浏览器、Nodes' },
    { icon: BellRing, title: '运行层', desc: 'Heartbeat、Cron、通知分层' },
    { icon: ShieldCheck, title: '运营层', desc: '安全、成本、版本化、复盘' },
  ];

  return (
    <section className="mb-10 rounded-[32px] border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-6 md:p-8">
      <SectionHeader
        eyebrow="OPENCLAW MAP"
        title="先看懂 6 层结构，再决定怎么搭"
        description="OpenClaw 不适合按碎片功能去理解。先把整套系统分层，看清你现在卡在哪一层。"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {layers.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-200 dark:bg-black/20 px-5 py-5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-600 dark:text-orange-300 flex items-center justify-center mb-4">
                <Icon size={18} />
              </div>
              <h3 className="text-slate-900 dark:text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const OpenClawDeployVisual = () => {
  const steps = [
    { icon: ServerCog, title: '服务器', desc: '先保证常驻在线' },
    { icon: CloudCog, title: '模型', desc: '先选一个稳定模型' },
    { icon: MessageSquareShare, title: '主渠道', desc: '中国用户优先飞书' },
    { icon: ShieldCheck, title: '守护恢复', desc: '重启后能自动回来' },
  ];

  return (
    <section className="mb-10 rounded-[32px] border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-6 md:p-8">
      <SectionHeader
        eyebrow="DEPLOY STACK"
        title="第一套环境只接 4 个基础件"
        description="先把基础设施搭稳，再往上加技能和主动规则。第一套环境最怕过早复杂化。"
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="relative rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-200 dark:bg-black/20 px-4 py-5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-600 dark:text-orange-300 flex items-center justify-center mb-4">
                <Icon size={18} />
              </div>
              <h3 className="text-slate-900 dark:text-white font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">{step.desc}</p>
              {index < steps.length - 1 && <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 text-slate-500"><ArrowRight size={18} /></div>}
            </div>
          );
        })}
      </div>
    </section>
  );
};

const OpenClawChannelsVisual = () => {
  const routes = [
    {
      label: '主工作台',
      title: '飞书',
      desc: '日报、周报、协作提醒、文档承接、表格承接',
      tone: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200',
    },
    {
      label: '强提醒',
      title: 'Telegram',
      desc: '只保留重大异常和高优先级个人提醒',
      tone: 'border-orange-500/30 bg-orange-500/10 text-orange-700 dark:text-orange-200',
    },
    {
      label: '客户侧',
      title: '企业微信',
      desc: '外部联系、客户触达、销售和业务通知',
      tone: 'border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-200',
    },
  ];

  return (
    <section className="mb-10 rounded-[32px] border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-6 md:p-8">
      <SectionHeader
        eyebrow="CHANNEL ROUTING"
        title="中国用户默认先做双通道路由"
        description="飞书承接工作流，Telegram 只保留强提醒。不要把所有通知都丢进同一个入口。"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {routes.map((route) => (
          <div key={route.title} className={`rounded-2xl border px-5 py-5 ${route.tone}`}>
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3 opacity-80">{route.label}</p>
            <h3 className="text-lg font-bold mb-2">{route.title}</h3>
            <p className="text-sm leading-relaxed opacity-90">{route.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const OpenClawSkillsVisual = () => {
  const items = [
    { title: '工作区技能', desc: '只服务当前场景，适合内容监控、运营守夜等专用流程' },
    { title: '全局技能', desc: '高复用能力，如提醒、搜索、基础摘要' },
    { title: '自定义 Skill', desc: '输入输出边界稳定后再写，别拿它承载混乱流程' },
    { title: 'Nodes', desc: '当你需要的是设备能力，不是新工具时再进入这一层' },
  ];

  return (
    <section className="mb-10 rounded-[32px] border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-6 md:p-8">
      <SectionHeader
        eyebrow="SKILL LIFECYCLE"
        title="从目录治理到扩展升级，别一步跳太远"
        description="先治理技能目录，再写自定义 Skill；只有当你需要设备执行能力时，才进入 Nodes。"
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {items.map((item, index) => (
          <div key={item.title} className="relative rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-200 dark:bg-black/20 px-4 py-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-600 dark:text-orange-300 mb-3">STEP {index + 1}</p>
            <h3 className="text-slate-900 dark:text-white font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const OpenClawProactiveVisual = () => {
  const flow = [
    { icon: BellRing, title: 'Heartbeat', desc: '发现异常和条件命中' },
    { icon: Layers3, title: '规则分层', desc: '立即推送 / 摘要 / 静默' },
    { icon: MessageSquareShare, title: '渠道路由', desc: '飞书主工作台，Telegram 强提醒' },
    { icon: DatabaseZap, title: 'daily notes', desc: '当天结果和反馈沉淀' },
  ];

  return (
    <section className="mb-10 rounded-[32px] border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-6 md:p-8">
      <SectionHeader
        eyebrow="RUN LOOP"
        title="主动系统不是定时器，而是一条闭环"
        description="Heartbeat 负责发现，分层负责降噪，渠道负责送达，daily notes 负责沉淀。少一个环节都容易失控。"
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {flow.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="relative rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-200 dark:bg-black/20 px-4 py-5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-600 dark:text-orange-300 flex items-center justify-center mb-4">
                <Icon size={18} />
              </div>
              <h3 className="text-slate-900 dark:text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              {index < flow.length - 1 && <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 text-slate-500"><ArrowRight size={18} /></div>}
            </div>
          );
        })}
      </div>
    </section>
  );
};

const OpenClawSecurityVisual = () => {
  const items = [
    { icon: ShieldAlert, title: '密钥边界', desc: '模型、渠道、服务器权限分开' },
    { icon: Workflow, title: '行为边界', desc: '删除、外发、改配置必须确认' },
    { icon: Cable, title: '能力边界', desc: '全局能力和场景能力隔离' },
    { icon: SearchCheck, title: '成本巡检', desc: '日志、额度、闲置能力定期看' },
  ];

  return (
    <section className="mb-10 rounded-[32px] border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-6 md:p-8">
      <SectionHeader
        eyebrow="GOVERNANCE"
        title="长期在线系统至少守住 4 类边界"
        description="安全不是一条规则，而是密钥、行为、能力、成本四个面同时约束。"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-200 dark:bg-black/20 px-5 py-5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/15 text-orange-600 dark:text-orange-300 flex items-center justify-center mb-4">
                <Icon size={18} />
              </div>
              <h3 className="text-slate-900 dark:text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const OpenClawDailyReportVisual = () => {
  const items = [
    { title: '配搜索 + 信息源', desc: 'Brave Search API Key + 36氪 / GitHub Trending / 少数派' },
    { title: '过滤筛选', desc: '按保留规则留下 AI 相关热点，丢弃广告和噪音' },
    { title: '整理推送', desc: '最多 5 条，一句话摘要 + 来源链接，发到飞书' },
    { title: '观察收紧', desc: '连续 3 天看过空/过长/重复，持续调过滤规则' },
  ];

  return (
    <section className="mb-10 rounded-[32px] border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-6 md:p-8">
      <SectionHeader
        eyebrow="CASE FLOW"
        title="AI 热点日报的最小闭环"
        description="先配信息源，再写过滤规则，定时推送到飞书，根据实际效果持续收紧。"
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {items.map((item, index) => (
          <div key={item.title} className="relative rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-200 dark:bg-black/20 px-4 py-5">
            <h3 className="text-slate-900 dark:text-white font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
            {index < items.length - 1 && <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 text-slate-500"><ArrowRight size={18} /></div>}
          </div>
        ))}
      </div>
    </section>
  );
};

const OpenClawContentMonitorVisual = () => {
  const items = [
    { title: '关键词 / 竞品', desc: '定义输入边界' },
    { title: '巡检', desc: '定时抓取固定来源' },
    { title: '分层', desc: '立即 / 摘要 / 静默' },
    { title: '素材池', desc: '飞书文档或表格承接' },
  ];

  return (
    <section className="mb-10 rounded-[32px] border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-6 md:p-8">
      <SectionHeader
        eyebrow="CASE FLOW"
        title="内容监控台不是通知系统，而是线索引擎"
        description="先巡检，再分层，再沉淀到素材池。不要把所有线索都直接打断你。"
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {items.map((item, index) => (
          <div key={item.title} className="relative rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-200 dark:bg-black/20 px-4 py-5">
            <h3 className="text-slate-900 dark:text-white font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
            {index < items.length - 1 && <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 text-slate-500"><ArrowRight size={18} /></div>}
          </div>
        ))}
      </div>
    </section>
  );
};

const OpenClawOpsWatchVisual = () => {
  const cards = [
    {
      label: 'P1',
      title: '立即进飞书群',
      description: '关键客户投诉、系统不可用、大面积延迟',
      tone: 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-200',
    },
    {
      label: 'P2',
      title: '进入待办或摘要',
      description: '一般异常、普通投诉、人工跟进工单',
      tone: 'border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-100',
    },
    {
      label: 'P3',
      title: '只记日志',
      description: '低优先级反馈、重复性噪音、已处理结果',
      tone: 'border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-300',
    },
  ];

  return (
    <section className="mb-10 rounded-[32px] border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-6 md:p-8">
      <SectionHeader
        eyebrow="CASE FLOW"
        title="守夜台的核心不是全都提醒，而是先分级"
        description="P1 进人，P2 进池，P3 进日志。没有这个分层，守夜台一定会失控。"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

export const LessonVisualGuide = ({ lessonSlug, moduleId }: LessonVisualGuideProps) => {
  if (moduleId === 'super-individual') {
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
  }

  if (moduleId === 'openclaw') {
    switch (lessonSlug) {
      case 'openclaw-intro':
        return <OpenClawLayersVisual />;
      case 'openclaw-china-quickstart':
        return <OpenClawDeployVisual />;
      case 'openclaw-setup':
        return <OpenClawChannelsVisual />;
      case 'openclaw-skills':
        return <OpenClawSkillsVisual />;
      case 'openclaw-proactive':
        return <OpenClawProactiveVisual />;
      case 'openclaw-feishu-daily-report':
        return <OpenClawDailyReportVisual />;
      case 'openclaw-feishu-content-monitor':
        return <OpenClawContentMonitorVisual />;
      case 'openclaw-feishu-ops-watch':
        return <OpenClawOpsWatchVisual />;
      case 'openclaw-security':
        return <OpenClawSecurityVisual />;
      default:
        return null;
    }
  }

  return null;
};
