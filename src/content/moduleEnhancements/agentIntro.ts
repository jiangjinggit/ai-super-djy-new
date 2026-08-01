import type { ModuleEnhancement } from '@/types/course';

export const agentIntroEnhancement: ModuleEnhancement = {
  lastVerifiedOn: '2026-06-08',
  sources: [
    {
      label: 'Claude Code Overview',
      url: 'https://code.claude.com/docs/en/overview',
    },
    {
      label: 'Cowork Docs',
      url: 'https://claude.com/docs/cowork',
    },
    {
      label: 'OpenClaw Docs',
      url: 'https://docs.openclaw.ai/',
    },
    {
      label: 'Model Context Protocol Specification',
      url: 'https://modelcontextprotocol.io/specification/2025-06-18',
    },
    {
      label: 'Coze Docs',
      url: 'https://www.coze.com/docs',
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
    {
      type: 'action-checklist',
      title: '学完后要交付这 3 样',
      description: '智能体入门的目标不是记概念，而是能把真实任务分流到合适的后续模块。',
      hideMeta: true,
      items: [
        {
          title: '1 张智能体能力判断卡',
          timebox: '第 1 课完成',
          description: '用感知、规划、行动、记忆 4 个维度评估你正在用的 2 个 AI 工具。',
          doneDefinition: '每个工具都能归类为聊天工具、半自动助手或更完整的智能体，并写出理由。',
        },
        {
          title: '1 张任务适配评分表',
          timebox: '第 2 课完成',
          description: '从最近工作中选 3 个候选任务，按输入、标准、频率、风险、工具支撑打分。',
          doneDefinition: '只保留 1 个最值得继续推进的任务，并写出为什么其他任务暂缓。',
        },
        {
          title: '1 个后续学习入口',
          timebox: '模块结束前',
          description: '长期主动监控优先 OpenClaw；仓库、终端和代码任务优先 Claude Code；文件资料和成品文档优先 Cowork；低门槛流程验证优先 Coze。产品能力和配置细节以当前官方文档为准。',
          doneDefinition: '你能说清下一步去哪个模块，以及这个选择对应的是任务需求，而不是工具热度。',
        },
      ],
    },
  ],
};
