import type { ModuleEnhancement } from '@/types/course';

export const chatgptEnhancement: ModuleEnhancement = {
  lastVerifiedOn: '2026-08-03',
  sources: [
    { label: 'OpenAI Help: Projects in ChatGPT', url: 'https://help.openai.com/en/articles/10169521-projects-in-chatgpt' },
    { label: 'OpenAI Help: Deep research in ChatGPT', url: 'https://help.openai.com/en/articles/10500283-deep-research-in-chatgpt' },
    { label: 'OpenAI Help: File uploads FAQ', url: 'https://help.openai.com/en/articles/8555545-file-uploads-faq' },
    { label: 'OpenAI Help Center: ChatGPT', url: 'https://help.openai.com/en/collections/3742473-chatgpt' },
  ],
  blocks: [
    {
      type: 'action-checklist',
      title: '一张表完成一次 ChatGPT 交付',
      description: '不用记很多提示词技巧，每次工作都按这 4 步走。',
      hideMeta: true,
      items: [
        {
          title: '定义交付物',
          timebox: '3 分钟',
          description: '写清受众、用途、材料、不能猜的内容和最终格式。',
          doneDefinition: '不看聊天上下文，也能理解最后要交付什么。',
        },
        {
          title: '先整理依据',
          timebox: '5 分钟',
          description: '让 ChatGPT 先列事实、来源和待确认项，再开始分析或写作。',
          doneDefinition: '推测没有混进事实，关键内容能回到原始材料。',
        },
        {
          title: '核验并修改',
          timebox: '10 分钟',
          description: '检查数字、日期、引用、遗漏和敏感信息，再加入你的判断与语气。',
          doneDefinition: '初稿与最终稿已经分开，关键事实已核对。',
        },
        {
          title: '只归档有用规则',
          timebox: '3 分钟',
          description: '保存有效模板和检查项；临时文件、过期结论和无关聊天不进入长期项目规则。',
          doneDefinition: '下一次能复用方法，但不会继承过期信息。',
        },
      ],
    },
  ],
};
