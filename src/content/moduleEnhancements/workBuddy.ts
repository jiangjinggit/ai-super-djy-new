import type { ModuleEnhancement } from '@/types/course';

export const workBuddyEnhancement: ModuleEnhancement = {
  lastVerifiedOn: '2026-08-02',
  sources: [
    { label: 'OpenAI Help: Projects in ChatGPT', url: 'https://help.openai.com/en/articles/10169521-projects-in-chatgpt' },
    { label: 'OpenAI Help: File uploads FAQ', url: 'https://help.openai.com/en/articles/8555545-file-uploads-faq' },
    { label: 'Claude Cowork documentation', url: 'https://claude.com/docs/cowork' },
    { label: 'Anthropic: Claude Code common workflows', url: 'https://docs.anthropic.com/en/docs/claude-code/common-workflows' },
  ],
  blocks: [
    {
      type: 'action-checklist',
      title: '低风险协作，从这 4 类任务开始',
      description: '先让 AI 处理可检查、可回退的工作；不要第一天就把关键决定和对外动作交出去。',
      hideMeta: true,
      items: [
        {
          title: '资料清单与差异对照',
          timebox: '15 分钟',
          description: '让它列资料、版本、核心事实和缺失字段，再由人随机抽查原文。',
          doneDefinition: '输出能明确区分事实、待确认项和下一步。',
        },
        {
          title: '会议纪要转待办',
          timebox: '20 分钟',
          description: '让它按背景、决定、待办、负责人、待确认问题整理；决定和负责人必须由参会人确认。',
          doneDefinition: '每项待办都有负责人、截止时间和完成标准。',
        },
        {
          title: '结构化初稿',
          timebox: '20 分钟',
          description: '先根据模板生成提纲、信息位置和待确认项，再由人补上观点、承诺和最终语气。',
          doneDefinition: '初稿中没有把缺失信息伪装成既成事实。',
        },
        {
          title: '周度复盘与模板沉淀',
          timebox: '20 分钟',
          description: '记录一次有效协作、一次失败原因和一条需要删除或修改的规则。',
          doneDefinition: '下周有一份可复用的任务卡或检查表，而不是从零重新对话。',
        },
      ],
    },
    {
      type: 'security-checklist',
      title: '协作时必须保留的人类关口',
      description: 'WorkBuddy 追求的是可审查的效率，不是无边界自动化。',
      hideMeta: true,
      items: [
        { title: '事实核验', detail: '数字、日期、引用、名单和关键结论必须能回到原始材料或官方来源。' },
        { title: '外部动作', detail: '发送消息、发布内容、修改共享文件、购买、签约或提交系统，必须由人确认。' },
        { title: '敏感资料', detail: '上传前先确认资料权限、隐私规则和工具当前的数据处理说明；不确定时不要上传。' },
        { title: '失败就停', detail: '材料不足、输出超范围、规则冲突或无法核验时，要求 AI 列问题并停止，而不是自行补全。' },
      ],
    },
  ],
};
