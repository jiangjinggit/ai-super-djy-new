import type { ModuleEnhancement } from '@/types/course';

export const superIndividualEnhancement: ModuleEnhancement = {
  lastVerifiedOn: '2026-08-03',
  sources: [
    { label: '豆包官网', url: 'https://www.doubao.com/' },
    { label: '腾讯元宝官网', url: 'https://yuanbao.tencent.com/' },
    { label: '通义千问官网', url: 'https://tongyi.aliyun.com/qianwen/' },
    { label: 'Kimi 官网', url: 'https://kimi.moonshot.cn/' },
  ],
  blocks: [
    {
      type: 'action-checklist',
      title: '开始前，只准备一件真实任务',
      description: '不用先研究模型、工具栈和自动化。准备一个小任务和一份真实材料，边做边学。',
      hideMeta: true,
      items: [
        {
          title: '选一件重复的小事',
          timebox: '5 分钟',
          description: '从会议纪要、文章摘要、邮件初稿、周报整理中任选一件，或选择你最近两周重复做过的类似任务。',
          doneDefinition: '你能一句话说清要做什么，以及最后交付什么。',
        },
        {
          title: '准备一份真实材料',
          timebox: '5 分钟',
          description: '拿出一段会议记录、一篇文章、一封邮件或一份任务清单，课程中直接用它练习。',
          doneDefinition: '材料已经可以复制给 AI，并且不包含不该分享的敏感信息。',
        },
        {
          title: '确定最后由你检查',
          timebox: '1 分钟',
          description: 'AI 先出初稿，你负责核验事实、修改重点和决定是否交付，不让工具替你承担责任。',
          doneDefinition: '你知道数字、日期、承诺和对外内容必须人工确认。',
        },
      ],
    },
    {
      type: 'action-checklist',
      title: '模块完成标准',
      description: '不以看完课程为准，只看你是否真正留下一个可复用的方法。',
      hideMeta: true,
      items: [
        {
          title: '完成 3 次真实任务',
          timebox: '7 天内',
          description: '用同一类任务连续试 3 次，每次都记录主要错误和人工修改。',
          doneDefinition: '至少有 3 份真实输出，并能判断它是否确实节省时间。',
        },
        {
          title: '保存 1 个可复用模板',
          timebox: '10 分钟',
          description: '把验证有效的指令保存下来，写清适用场景、可替换材料和人工检查项。',
          doneDefinition: '换一份同类材料时，只改变量就能再次使用。',
        },
      ],
    },
  ],
};
