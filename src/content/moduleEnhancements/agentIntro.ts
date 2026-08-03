import type { ModuleEnhancement } from '@/types/course';

export const agentIntroEnhancement: ModuleEnhancement = {
  lastVerifiedOn: '2026-08-03',
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
      title: '一张表跑完第一个智能体任务',
      description: '课程里的判断、任务卡、权限和试跑，最终只需要落实为这 4 步。',
      hideMeta: true,
      items: [
        {
          title: '选一个低风险任务',
          timebox: '5 分钟',
          description: '从近期重复工作中，选择规则清楚、结果容易检查且不直接对外执行的一件事。',
          doneDefinition: '能解释为什么它值得做，也能说出暂缓其他任务的原因。',
        },
        {
          title: '写清任务卡',
          timebox: '10 分钟',
          description: '写下目标、输入、允许动作、交付格式、人工确认和停止条件。',
          doneDefinition: '材料不足时 AI 会标记问题，而不是自行补全。',
        },
        {
          title: '收窄资料和权限',
          timebox: '5 分钟',
          description: '只开放当前任务所需的文件与工具；发送、发布、付款、删除和改权限保留人工确认。',
          doneDefinition: '“必须给、不能给、必须确认”三栏都有明确答案。',
        },
        {
          title: '试跑并复盘',
          timebox: '15 分钟',
          description: '记录输入、AI 的动作、人工接管点和最终结果，一次只修正少量问题。',
          doneDefinition: '能决定保存模板、继续半自动，还是停止投入。',
        },
      ],
    },
  ],
};
