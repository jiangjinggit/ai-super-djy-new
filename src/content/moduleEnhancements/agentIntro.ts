import type { ModuleEnhancement } from '@/types/course';

export const agentIntroEnhancement: ModuleEnhancement = {
  lastVerifiedOn: '2026-04-02',
  sources: [
    {
      label: 'Claude Code Overview',
      url: 'https://code.claude.com/docs/en/overview',
    },
    {
      label: 'Cowork Docs',
      url: 'https://claude.com/docs/cowork',
    },
  ],
  blocks: [
    {
      type: 'action-checklist',
      title: '先看任务，再选工具',
      description: '不要先记工具名，先看你面对的到底是哪一种任务。下面这 5 条是给新手用的第一层判断。',
      hideMeta: true,
      items: [
        {
          title: '要长期后台监控、定时汇总、主动推送，用 OpenClaw',
          timebox: '10 秒判断',
          description: '如果任务需要它自己按时间检查、汇总、提醒你，而不是等你开口才执行，优先看 OpenClaw。',
          doneDefinition: '你能明确说出这个任务是否需要“长期在线 + 主动触发”。',
        },
        {
          title: '要改仓库、跑命令、看 diff，用 Claude Code CLI',
          timebox: '10 秒判断',
          description: '如果对象是代码仓库、脚本、终端命令、测试和项目文档，优先看 Claude Code CLI。',
          doneDefinition: '你能判断自己面对的是“工程任务”，而不是“资料整理任务”。',
        },
        {
          title: '要整理文件夹、资料、报告草稿，用 Cowork',
          timebox: '10 秒判断',
          description: '如果对象是本地文件、研究材料、表格、演示文稿或浏览器内容，而不是仓库，优先看 Cowork。',
          doneDefinition: '你能判断自己面对的是“文件与资料任务”，而不是“代码任务”。',
        },
        {
          title: '要低门槛搭一个流程或 Bot，用 Coze',
          timebox: '10 秒判断',
          description: '如果你还在验证流程、想快速拼装插件和节点，不想一开始就自己写太多配置，优先看 Coze。',
          doneDefinition: '你能判断自己当前阶段更需要“快速搭起来”，而不是“深度定制”。',
        },
      ],
    },
  ],
};
