import { BookOpen, Brain, Cpu, Rocket, Users, Zap } from 'lucide-react';

import type { ModuleCardData, ModuleId } from '@/types/course';

export const NAV_LABELS: Record<ModuleId, string> = {
  'super-individual': '入门',
  llm: '大模型',
  agents: '智能体',
  scenarios: '场景库',
  cases: '案例',
  growth: '成长',
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
    id: 'agents',
    title: 'AI 智能体实战专区',
    desc: '先理解权限边界和流程设计，再学习 OpenClaw、Claude Code 这类执行工作台如何落地。',
    icon: Cpu,
    color: 'emerald',
  },
  {
    id: 'scenarios',
    title: '超级个体场景库',
    desc: '聚焦内容创作者、独立开发者、电商与自由职业三类典型场景，按流程拆方法。',
    icon: Zap,
    color: 'orange',
  },
  {
    id: 'cases',
    title: '真实案例库',
    desc: '不追神话叙事，重点拆案例里的可复制方法、前置条件和风险边界。',
    icon: Users,
    color: 'purple',
  },
  {
    id: 'growth',
    title: '成长路径',
    desc: '按阶段推进：先识别任务、再做提效、最后做 MVP 或服务验证，用反馈驱动成长。',
    icon: BookOpen,
    color: 'emerald',
  },
];
