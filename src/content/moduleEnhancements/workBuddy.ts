import type { ModuleEnhancement } from '@/types/course';

export const workBuddyEnhancement: ModuleEnhancement = {
  lastVerifiedOn: '2026-08-03',
  sources: [
    { label: 'OpenAI Help: Projects in ChatGPT', url: 'https://help.openai.com/en/articles/10169521-projects-in-chatgpt' },
    { label: 'OpenAI Help: File uploads FAQ', url: 'https://help.openai.com/en/articles/8555545-file-uploads-faq' },
    { label: 'Claude Cowork documentation', url: 'https://claude.com/docs/cowork' },
    { label: 'Anthropic: Claude Code common workflows', url: 'https://docs.anthropic.com/en/docs/claude-code/common-workflows' },
  ],
  blocks: [
    {
      type: 'action-checklist',
      title: '一张表跑完一次工作协作',
      description: '把资料、初稿、行动和复盘接成一个可检查的小闭环。',
      hideMeta: true,
      items: [
        {
          title: '整理资料台账',
          timebox: '10 分钟',
          description: '列出资料、版本、事实和待确认项，随机抽查关键原文。',
          doneDefinition: '推测没有混进事实，重要内容能回到原始材料。',
        },
        {
          title: '先审结构再写正文',
          timebox: '10 分钟',
          description: '先确认提纲、事实位置和待确认问题，再生成完整初稿。',
          doneDefinition: '缺失信息仍有明确标记，没有被看似合理的内容填满。',
        },
        {
          title: '确认决定和行动',
          timebox: '10 分钟',
          description: '区分讨论、决定和待确认项，为行动补齐负责人、时间和完成标准。',
          doneDefinition: '关键决定和对外动作都有明确的人工确认人。',
        },
        {
          title: '复盘并做减法',
          timebox: '5 分钟',
          description: '保留一个有效模板，修正一个问题，删除一条无效规则。',
          doneDefinition: '下一次能复用方法，但工作台没有继续堆积。',
        },
      ],
    },
  ],
};
