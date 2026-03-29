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
      title: '开始前先准备这 3 样东西',
      description: '不用先会，也不用先做对。只要把学习时要用的例子和材料准备好，就能跟着课程往下走。',
      hideMeta: true,
      items: [
        {
          title: '准备 1 个你最熟悉的小任务',
          timebox: '5 分钟',
          description: '从邮件回复、文章摘要、会议纪要、周报整理里任选 1 个，不需要选最完美的，只要你最近做过。',
          doneDefinition: '你能说出这个任务大概要做什么，以及最后要交付什么。',
        },
        {
          title: '找一份原始材料放在手边',
          timebox: '5 分钟',
          description: '比如一段会议记录、一篇文章、一封邮件草稿，后面学模板和工作流时可以直接拿来练习。',
          doneDefinition: '你已经准备好一份可以复制粘贴到 AI 里的真实材料。',
        },
        {
          title: '先带着例子学，不急着一次学完',
          timebox: '整个模块',
          description: '后面的 6 节课会一步步教你怎么判断任务、写模板、搭流程和做复盘。你现在只需要带着一个例子往下看。',
          doneDefinition: '你知道这次学习的目标不是看懂概念，而是最后把这个例子真的跑通一次。',
        },
      ],
    },
  ],
};
