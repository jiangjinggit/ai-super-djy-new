import type { ModuleEnhancement } from '@/types/course';

export const chatgptEnhancement: ModuleEnhancement = {
  lastVerifiedOn: '2026-08-02',
  sources: [
    { label: 'OpenAI Help: Projects in ChatGPT', url: 'https://help.openai.com/en/articles/10169521-projects-in-chatgpt' },
    { label: 'OpenAI Help: Deep research in ChatGPT', url: 'https://help.openai.com/en/articles/10500283-deep-research-in-chatgpt' },
    { label: 'OpenAI Help: File uploads FAQ', url: 'https://help.openai.com/en/articles/8555545-file-uploads-faq' },
    { label: 'OpenAI Help Center: ChatGPT', url: 'https://help.openai.com/en/collections/3742473-chatgpt' },
  ],
  blocks: [
    {
      type: 'action-checklist',
      title: '每次开始前，用 60 秒写清任务',
      description: '这是所有 ChatGPT 课程的共同起点。先让任务可理解、可检查，再让工具提速。',
      hideMeta: true,
      items: [
        {
          title: '写下交付物，而不是工具动作',
          timebox: '15 秒',
          description: '写“给客户的一页方案初稿”，而不是“让 ChatGPT 帮我写”。前者有对象、范围和可检查结果。',
          doneDefinition: '你能让同事不看上下文也理解最后要交付什么。',
        },
        {
          title: '提供材料，并标出不能猜的字段',
          timebox: '20 秒',
          description: '附上原文、文件或链接，并明确数字、日期、引用、客户名和承诺不能补写。',
          doneDefinition: 'AI 知道哪些信息只能引用原材料，缺失时必须标为待确认。',
        },
        {
          title: '提前写人工确认点',
          timebox: '25 秒',
          description: '任何对外发送、承诺、隐私、金额、医疗或法律相关结论，都必须由对应负责人核对。',
          doneDefinition: '初稿与最终稿之间有清晰的确认人和检查动作。',
        },
      ],
    },
    {
      type: 'resource-links',
      title: '课程官方核验入口',
      description: '功能入口、可用范围和套餐限制会变化。使用前以 OpenAI 帮助中心当前说明为准。',
      hideMeta: true,
      items: [
        {
          title: 'Projects in ChatGPT',
          url: 'https://help.openai.com/en/articles/10169521-projects-in-chatgpt',
          label: '官方',
          description: '核验项目空间的组织方式、支持范围与当前使用说明。',
          category: '项目管理',
        },
        {
          title: 'Deep research in ChatGPT',
          url: 'https://help.openai.com/en/articles/10500283-deep-research-in-chatgpt',
          label: '官方',
          description: '核验深度研究的工作方式、来源使用与当前可用条件。',
          category: '研究',
        },
        {
          title: 'File uploads FAQ',
          url: 'https://help.openai.com/en/articles/8555545-file-uploads-faq',
          label: '官方',
          description: '核验文件上传的格式、限制、数据处理与常见问题。',
          category: '文件协作',
        },
      ],
    },
  ],
};
