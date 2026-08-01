import { Cpu, Lightbulb, ListChecks } from 'lucide-react';

import type { BaseModuleContent } from '@/types/course';

export const agentIntroModule: BaseModuleContent = {
  title: 'AI 智能体入门',
  subtitle: '先建立智能体判断，再决定学什么工具',
  icon: Cpu,
  color: 'emerald',
  description:
    '2 节课先统一“智能体 = Agent”的基本认知，再用任务适配和工具分流两张判断表，决定下一步该走 OpenClaw、Claude Code、Cowork 还是 Coze。',
  keyTakeaways: [
    '用感知、规划、行动、记忆 4 个维度判断一个产品是不是适合推进真实任务',
    '用 5 维评分表判断任务是否值得做成智能体，而不是为了自动化而自动化',
    '把 OpenClaw、Claude Code、Cowork、Coze 放到各自适合的任务入口里',
    '输出一张后续学习路线图：长期主动系统去 OpenClaw，仓库/文件执行去 Claude 相关模块',
  ],
  sections: [
    {
      title: '感知 · 规划 · 行动 · 记忆',
      content: '先用 4 问速查卡区分聊天工具、半自动助手和更完整的智能体，不急着背产品名。',
      icon: Cpu,
    },
    {
      title: '任务适配判断',
      content: '用输入、标准、频率、风险、工具支撑 5 维评分，判断该手动、半自动还是继续做智能体。',
      icon: ListChecks,
    },
    {
      title: '工具选型速查',
      content: '主动监控看 OpenClaw，仓库与终端看 Claude Code，文件与资料看 Cowork，低门槛流程验证看 Coze。',
      icon: Lightbulb,
    },
  ],
  lessons: [
    {
      title: 'AI 智能体是什么：4 个核心能力',
      content: '先用一套教学框架理解智能体。感知、规划、行动、记忆越完整，越接近能稳定推进真实任务的 Agent。',
      image: 'cover://what-is-agent',
      details: [
        '学习目标：能用 4 个能力解释智能体和普通对话的区别',
        '本课作业：评估 2 个你正在用的 AI 工具，并归类为聊天工具、半自动助手或智能体',
        '验收标准：能说清“能联网、会写代码、有聊天记录”为什么不等于完整 Agent',
        '承接路线：需要长期主动运行看 OpenClaw，需要仓库或文件执行看 Claude 相关模块',
      ],
      fullContent: [
        {
          subtitle: '1. 智能体的 4 个核心能力',
          text: '本课程用“感知、规划、行动、记忆”作为新手判断框架：感知是读取环境，规划是拆任务和决定顺序，行动是调用工具改变世界，记忆是记录状态并在下一轮继续。它不是行业唯一标准，但很适合判断一个产品是不是能稳定推进真实任务。',
        },
        {
          subtitle: '2. 对比：智能体 vs 普通 AI 对话',
          text: '普通 AI 对话通常是你输入、它输出、任务结束。智能体或 agentic workflow 会读取环境、制定计划、执行工具，再把结果写回到任务上下文中；MCP 这类协议则负责把模型应用和外部工具/上下文连接起来，它不是智能体本身。',
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
        '学习目标：用 5 维评分表筛掉不适合智能体的任务',
        '本课作业：给 3 个真实任务打分，只保留分数最高的 1 个',
        '验收标准：能写出工具选择理由、人工确认点和不做自动化的原因',
        '承接路线：OpenClaw 负责主动系统，Claude Code/Cowork 负责仓库、终端、文件与资料任务',
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
    text: '认知建好了，先把一个长期主动场景跑通 → OpenClaw 实战专区',
    link: '/module/openclaw',
  },
};
