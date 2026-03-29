import type { ModuleEnhancement } from '@/types/course';

export const superIndividualEnhancement: ModuleEnhancement = {
  lastVerifiedOn: '2026-03-29',
  sources: [
    { label: 'OpenAI Models', url: 'https://developers.openai.com/api/docs/models' },
    { label: 'Anthropic Prompt Guides', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview' },
    { label: 'DeepSeek API Docs', url: 'https://api-docs.deepseek.com/' },
    { label: 'Moonshot Blog', url: 'https://platform.moonshot.cn/blog' },
  ],
  blocks: [
    {
      type: 'action-checklist',
      title: '入门行动清单',
      description: '先完成真实任务，再考虑升级工具和流程。',
      items: [
        {
          title: '列出 10 个重复任务',
          timebox: '20 分钟',
          description: '把你最近一周做过的重复任务完整写下来，再筛出最值得先优化的 3 个。',
          doneDefinition: '得到一份任务清单，并标记优先级、频率和风险等级。',
        },
        {
          title: '写出 3 个可复用模板',
          timebox: '45 分钟',
          description: '围绕邮件、摘要、计划、复盘、脚本等高频任务，沉淀 3 个最小模板。',
          doneDefinition: '模板至少包含角色、目标、上下文、约束和输出格式。',
        },
        {
          title: '完成 5 个真实交付',
          timebox: '7 天',
          description: '用同一套工具组合完成至少 5 个真实任务，而不是停留在练习模式。',
          doneDefinition: '保留任务输入、输出结果和人工修改记录，用于后续复盘。',
        },
      ],
    },
  ],
};
