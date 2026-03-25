import { BookOpen, Brain, Cpu, Rocket, Users, Zap } from 'lucide-react';

import type { ModuleCardData, ModuleId } from '@/types/course';

export const NAV_LABELS: Record<ModuleId, string> = {
  'super-individual': '入门',
  llm: '大模型',
  openclaw: 'OpenClaw',
  scenarios: '场景库',
  cases: '案例',
  growth: '成长',
};

export const MODULE_CARDS: ModuleCardData[] = [
  {
    id: 'super-individual',
    title: 'AI 超级个体入门',
    desc: '从“知道AI”到“用好AI”。理解超级个体逻辑，掌握 Prompt 基础，搭建个人 AI 工具矩阵。',
    icon: Rocket,
    color: 'blue',
  },
  {
    id: 'llm',
    title: '大模型实战库',
    desc: '深度解析 ChatGPT、Claude、DeepSeek 等主流模型。按场景提供 Prompt 模板，选型配置一站搞定。',
    icon: Brain,
    color: 'purple',
  },
  {
    id: 'openclaw',
    title: 'OpenClaw 实战专区',
    desc: '开源 AI 助手框架。本地部署、1700+ Skills 技能、10 个超级个体必用工作流。',
    icon: Cpu,
    color: 'emerald',
  },
  {
    id: 'scenarios',
    title: '超级个体场景库',
    desc: '按职业分类：内容创作者、设计师、程序员、电商。每个场景给工具组合+流程+案例。',
    icon: Zap,
    color: 'orange',
  },
  {
    id: 'cases',
    title: '真实案例库',
    desc: '公开报道的“1人+AI”赚钱案例深度拆解。不画大饼，只讲事实，标注来源。',
    icon: Users,
    color: 'purple',
  },
  {
    id: 'growth',
    title: '成长路径',
    desc: '从零基础到 AI 变现的务实路线图。分阶段规划学什么、做什么，避免走弯路。',
    icon: BookOpen,
    color: 'emerald',
  },
];
