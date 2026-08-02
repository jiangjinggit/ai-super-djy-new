import type { ModuleEnhancement } from '@/types/course';

export const agentIntroEnhancement: ModuleEnhancement = {
  lastVerifiedOn: '2026-08-02',
  sources: [
    { label: 'OpenAI Agents SDK: Agents', url: 'https://openai.github.io/openai-agents-js/guides/agents/' },
    { label: 'OpenAI Agents SDK: Tools', url: 'https://openai.github.io/openai-agents-js/guides/tools/' },
    { label: 'OpenAI Agents SDK: Guardrails', url: 'https://openai.github.io/openai-agents-js/guides/guardrails/' },
    { label: 'Anthropic: Building effective agents', url: 'https://www.anthropic.com/engineering/building-effective-agents' },
    { label: 'Model Context Protocol Specification', url: 'https://modelcontextprotocol.io/specification/2025-06-18' },
  ],
  blocks: [
    {
      type: 'action-checklist',
      title: '开始前，先选一个低风险任务',
      description: '入门不是找最强工具，而是用一个真正会重复、又能快速核验的任务跑出经验。',
      hideMeta: true,
      items: [
        {
          title: '列出最近两周重复过的 3 件事',
          timebox: '5 分钟',
          description: '例如整理会议纪要、汇总公开资料、生成固定格式周报。不要选“做个产品”这种过大的目标。',
          doneDefinition: '每件事都能说明输入是什么、最后要交付什么。',
        },
        {
          title: '只保留一件可快速核验的任务',
          timebox: '5 分钟',
          description: '优先选择你能在几分钟内检查对错、出错后可以修改、且不涉及直接对外动作的任务。',
          doneDefinition: '你能说清为什么这件事适合作为第一个协作任务。',
        },
        {
          title: '写下人工确认与停止规则',
          timebox: '5 分钟',
          description: '明确哪些事实必须核验、谁决定最终发出、材料不足时 AI 应该怎么停下来提问。',
          doneDefinition: '任务没有依据时不会被 AI 自行补全，也不会直接对外执行。',
        },
      ],
    },
    {
      type: 'security-checklist',
      title: '智能体协作的四条底线',
      description: '课程的目标是提升可检查的执行力，不是把责任交给工具。',
      hideMeta: true,
      items: [
        { title: '目标由人设定', detail: 'AI 可以协助拆解，但“为什么做、做到什么程度、何时停止”由人决定。' },
        { title: '事实必须可追溯', detail: '数字、日期、引用、名单和关键结论要能回到原始资料或官方来源。' },
        { title: '外部动作必须确认', detail: '发送、发布、修改共享文件、付款、删除和改变权限等动作，默认由人确认。' },
        { title: '失败时立即停住', detail: '资料不足、规则冲突、输出超范围或无法核验时，应列出问题等待人处理。' },
      ],
    },
  ],
};
