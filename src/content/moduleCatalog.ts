import { Bot, Brain, Cpu, Plug, Rocket, Users } from 'lucide-react';

import type { ModuleCardData, ModuleId } from '@/types/course';

export interface ModuleGroup {
  id: 'foundation' | 'agents' | 'practice' | 'community';
  eyebrow: string;
  title: string;
  description: string;
  moduleIds: readonly ModuleId[];
}

export const NAV_LABELS: Record<ModuleId, string> = {
  'super-individual': '入门',
  llm: '大模型',
  'api-gateway': 'API 中转',
  'agent-intro': '智能体入门',
  chatgpt: 'ChatGPT',
  workbuddy: 'WorkBuddy',
  openclaw: 'OpenClaw',
  'claude-agent': 'Claude',
  'codex-agent': 'Codex',
  'ai-programming': 'AI 编程',
  cases: '场景与案例',
  'ai-group': 'AI 拼团',
};

export const MODULE_CARDS: ModuleCardData[] = [
  {
    id: 'super-individual',
    title: 'AI 超级个体入门',
    desc: '先建立判断力，再完成第一个真实闭环。适合零基础用户从任务、模板和工具栈开始上手。',
    icon: Rocket,
    color: 'blue',
  },
  {
    id: 'llm',
    title: '大模型实战库',
    desc: '用任务、成本、延迟和上下文来选模型，而不是盯着排行榜和单次参数表。',
    icon: Brain,
    color: 'purple',
  },
  {
    id: 'api-gateway',
    title: 'API 中转与模型接入',
    desc: '先判断是否需要中转，再把 Base URL、API Key、模型名、回退和治理接成一个可控的接入层。',
    icon: Plug,
    color: 'orange',
  },
  {
    id: 'agent-intro',
    title: 'AI 智能体入门',
    desc: '先统一智能体认知，再用任务适配和工具分流两张判断表决定下一步学什么。',
    icon: Cpu,
    color: 'emerald',
  },
  {
    id: 'chatgpt',
    title: 'ChatGPT 高效工作',
    desc: '用清晰任务、资料核验、项目沉淀和复盘，把一次对话变成稳定可复用的工作方法。',
    icon: Brain,
    color: 'blue',
  },
  {
    id: 'workbuddy',
    title: 'WorkBuddy 工作协作',
    desc: '让 AI 帮你整理资料、拆解任务、产出初稿与复盘，但把判断、确认和对外动作留在人手里。',
    icon: Bot,
    color: 'purple',
  },
  {
    id: 'cases',
    title: '场景与案例',
    desc: '6 个真实工作流案例，覆盖内容自动化、行业监控、市场研究、Vibe Coding 上线、MVP 推进、自动化报告，重点看前置条件、落地路径和风险边界。',
    icon: Users,
    color: 'purple',
  },
  {
    id: 'ai-group',
    title: 'AI 拼团',
    desc: '看懂拼团优势、1:10 面板额度、动态倍率、月末清空、团内转让和安全使用规则。',
    icon: Users,
    color: 'orange',
  },
];

export const MODULE_GROUPS: readonly ModuleGroup[] = [
  {
    id: 'foundation',
    eyebrow: '01 · 建立基础',
    title: '先把 AI 用明白',
    description: '先学会挑选合适的任务、模型与接入方式；这三步打稳，后面的智能体才不会变成复杂玩具。',
    moduleIds: ['super-individual', 'llm', 'api-gateway'],
  },
  {
    id: 'agents',
    eyebrow: '02 · 智能体应用',
    title: '从会问到会协作',
    description: '先建立智能体判断，再用 ChatGPT 与 WorkBuddy 把资料、任务和交付物接进日常工作。',
    moduleIds: ['agent-intro', 'chatgpt', 'workbuddy'],
  },
  {
    id: 'practice',
    eyebrow: '03 · 场景练习',
    title: '带着真实任务去练',
    description: '不必等全学完。从一个与你最接近的案例开始，验证方法是否真的节省时间、降低返工。',
    moduleIds: ['cases'],
  },
  {
    id: 'community',
    eyebrow: '04 · AI 拼团',
    title: '先看清优势与规则',
    description: '花十几分钟看清额度、倍率、周期、转让和使用边界，再决定是否参加。',
    moduleIds: ['ai-group'],
  },
];
