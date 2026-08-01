import type { ModuleEnhancement } from '@/types/course';

export const superIndividualEnhancement: ModuleEnhancement = {
  lastVerifiedOn: '2026-06-08',
  sources: [
    { label: '飞书自定义机器人使用指南', url: 'https://open.feishu.cn/document/client-docs/bot-v3/add-custom-bot' },
    { label: '飞书开放平台开发文档', url: 'https://open.feishu.cn/document/home/index' },
    { label: 'Coze 官方文档', url: 'https://www.coze.cn/open/docs' },
    { label: '豆包官网', url: 'https://www.doubao.com/' },
    { label: '腾讯元宝官网', url: 'https://yuanbao.tencent.com/' },
    { label: '通义千问官网', url: 'https://tongyi.aliyun.com/qianwen/' },
    { label: 'Kimi 官网', url: 'https://kimi.moonshot.cn/' },
    { label: '秘塔 AI 搜索官网', url: 'https://metaso.cn/' },
    { label: 'Perplexity 官方帮助中心', url: 'https://www.perplexity.ai/hub/faq' },
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
    {
      type: 'action-checklist',
      title: '模块毕业标准',
      description: '学完这 6 节课，不是以“看完”为准，而是以你手里有没有这些可复用资产为准。',
      hideMeta: true,
      items: [
        {
          title: '完成 1 条真实任务主线',
          timebox: '7 天内',
          description: '从任务分流表里选出的 A 类任务，至少真实跑过 3 次，并记录每次哪里需要人工修正。',
          doneDefinition: '你能拿出任务清单、3 次输出记录，以及为什么这件事适合继续用 AI 的判断。',
        },
        {
          title: '沉淀 2 份以上可复用模板',
          timebox: '7 天内',
          description: '至少包含 1 个 Prompt 模板和 1 个 5 格工作流，里面写清变量、输入、输出和人工确认点。',
          doneDefinition: '换一份同类材料时，你只改变量就能再次运行，不需要重新发明提示词。',
        },
        {
          title: '选出下一阶段学习路线',
          timebox: '复盘当天',
          description: '如果输出质量不稳，先去 LLM；如果要接系统和密钥，去 API 网关；如果流程稳定且需要主动触发，再去 Agent 入门。',
          doneDefinition: '你能用一句话说明下一模块为什么是它，而不是因为工具名字听起来更高级。',
        },
      ],
    },
  ],
};
