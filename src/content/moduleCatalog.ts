import { Bot, Brain, Code2, Cpu, Rocket, Terminal, Users } from 'lucide-react';

import type { ModuleCardData, ModuleId } from '@/types/course';

export const NAV_LABELS: Record<ModuleId, string> = {
  'super-individual': '入门',
  llm: '大模型',
  'agent-intro': '智能体入门',
  openclaw: 'OpenClaw',
  'claude-agent': 'Claude',
  'ai-programming': 'AI 编程',
  cases: '场景与案例',
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
    id: 'agent-intro',
    title: 'AI 智能体入门',
    desc: '先统一智能体认知，再用任务适配和工具分流两张判断表决定下一步学什么。',
    icon: Cpu,
    color: 'emerald',
  },
  {
    id: 'openclaw',
    title: 'OpenClaw 实战',
    desc: '先判断是否适合，再完成部署、三件套配置、技能、主动通知和长期调优。',
    icon: Bot,
    color: 'orange',
  },
  {
    id: 'claude-agent',
    title: 'Claude 智能体实战',
    desc: '15 课从认知到落地：CLI、Cowork、工作流、Prompt、上下文、MCP、安全边界、多智能体与三大真实场景。',
    icon: Terminal,
    color: 'purple',
  },
  {
    id: 'ai-programming',
    title: 'AI 编程工具与模型实战',
    desc: '横向理解 Claude Code、Codex、Cursor、Gemini、Kiro 与国内工具路线，再把模型、流程和治理接成一套默认工作栈。',
    icon: Code2,
    color: 'blue',
  },
  {
    id: 'cases',
    title: '场景与案例',
    desc: '内容创作、独立开发、电商客服三类场景 SOP，加上内容团队、非技术建产品、AI-first 小团队三个案例拆解。看可复制的动作，不追神话叙事。',
    icon: Users,
    color: 'purple',
  },
];
