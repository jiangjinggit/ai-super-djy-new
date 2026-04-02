import { Cpu, Lightbulb, ListChecks } from 'lucide-react';

import type { BaseModuleContent } from '@/types/course';

export const agentIntroModule: BaseModuleContent = {
  title: 'AI 智能体入门',
  subtitle: '先建立智能体判断，再决定学什么工具',
  icon: Cpu,
  color: 'emerald',
  description:
    '2 节课先统一“智能体 = Agent”的基本认知，再用任务适配和工具分流两张判断表，把 OpenClaw、Claude Code、Cowork、Coze 放回各自合适的位置。',
  keyTakeaways: [],
  sections: [
    {
      title: '感知 · 规划 · 行动 · 记忆',
      content: '真正的智能体必须同时具备这 4 个能力，少任何一个，都更像聊天框而不是工作系统。',
      icon: Cpu,
    },
    {
      title: '任务适配判断',
      content: '不是所有任务都适合做成智能体。用 5 维评分表，5 分钟判断该不该做。',
      icon: ListChecks,
    },
    {
      title: '工具选型速查',
      content: '主动监控选 OpenClaw，仓库与终端选 Claude Code，文件与资料工作选 Cowork，快速搭建选 Coze。',
      icon: Lightbulb,
    },
  ],
  lessons: [
    {
      title: 'AI 智能体是什么：4 个核心能力',
      content: '先用一套统一标准理解智能体。能感知、能规划、能行动、能记忆，缺一个都不算真智能体。',
      image: 'cover://what-is-agent',
      details: [
        '智能体的 4 个核心能力与对应判断标准',
        '智能体 vs 普通 AI 对话的核心区别对比表',
        '判断一个产品是不是真智能体的速查卡',
        '3 个最常见误区拆解',
      ],
      fullContent: [
        {
          subtitle: '1. 智能体的 4 个核心能力',
          text: '感知是读取环境，规划是拆任务和决定顺序，行动是调用工具改变世界，记忆是记录状态并在下一轮继续。缺一个，系统就很难稳定推进真实任务。',
        },
        {
          subtitle: '2. 对比：智能体 vs 普通 AI 对话',
          text: '普通 AI 对话通常是你输入、它输出、任务结束。智能体会持续读取环境、制定计划、执行工具，再把结果写回到任务上下文中。',
        },
        {
          subtitle: '3. 常见误区',
          text: '把聊天框当智能体、把智能体理解成全自动、或者过度相信它的稳定性，都是最常见的起步偏差。先理解边界，后面做出来的系统才稳。',
        },
      ],
    },
    {
      title: '哪些任务值得做智能体：5 维评分表',
      content: '不是所有任务都适合。用这张评分表快速判断该不该做，避免把精力浪费在不适合的任务上。',
      image: 'cover://agent-task-fit',
      details: [
        '5 维任务适配评分表，可直接复制',
        '最适合起手的 3 类任务',
        '新手阶段不要碰的 3 类任务',
        'OpenClaw / Claude Code / Cowork / Coze 选型速查',
      ],
      fullContent: [
        {
          subtitle: '1. 任务适配 5 维评分表',
          text: '输入来源是否固定、完成标准能否写成规则、任务频率是否足够高、风险是否可控、现有工具链是否能支撑，是新手最该先看的 5 个维度。',
        },
        {
          subtitle: '2. 最适合起手的 3 类任务',
          text: '信息汇总、内容整理、代码辅助这三类任务最适合起手，因为规则相对稳定、结果容易核查、失败代价可控。',
        },
        {
          subtitle: '3. 工具选型',
          text: '主动监控和消息推送更适合 OpenClaw，本地项目与命令行更适合 Claude Code，本地文件夹、研究资料和成品文档更适合 Cowork，低门槛工作流搭建更适合 Coze。',
        },
      ],
    },
  ],
  cta: {
    text: '认知建好了，去 OpenClaw 实战专区把第一个工作台跑通 →',
    link: '/module/openclaw',
  },
};
