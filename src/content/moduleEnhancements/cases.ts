import type { ModuleEnhancement } from '@/types/course';

export const casesEnhancement: ModuleEnhancement = {
  lastVerifiedOn: '2026-08-04',
  sources: [
    { label: 'OpenClaw Automations 官方文档', url: 'https://docs.openclaw.ai/automation/cron-jobs' },
    { label: 'OpenClaw Heartbeat 官方文档', url: 'https://docs.openclaw.ai/gateway/heartbeat' },
    { label: '飞书自定义机器人使用指南', url: 'https://open.feishu.cn/document/client-docs/bot-v3/add-custom-bot' },
    { label: 'GitHub Actions schedule 官方文档', url: 'https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule' },
    { label: 'GitHub Actions Secrets 官方文档', url: 'https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets' },
  ],
  blocks: [
    {
      type: 'action-checklist',
      title: '一张表跑通你的第一个案例',
      description: '不要照抄完整案例。先把自己的任务压缩成一个能在 60 分钟内手动验证的小闭环。',
      hideMeta: true,
      items: [
        {
          title: '选择合适任务',
          timebox: '10 分钟',
          description: '选择重复、高频、输入能获得、失败可恢复的真实工作，不碰尚未想清楚的核心决策。',
          doneDefinition: '能说清谁在做、多久做一次、最耗时的步骤和失败后的处理方式。',
        },
        {
          title: '写出最小闭环',
          timebox: '15 分钟',
          description: '只保留一个输入、一次 AI 处理、一个人工关口和一个交付结果。',
          doneDefinition: '能用一句话描述从材料进入到结果被接收的完整路径。',
        },
        {
          title: '手动运行并核对',
          timebox: '20 分钟',
          description: '先手动触发，检查来源、事实、数字、格式和异常情况，不急着增加定时与更多来源。',
          doneDefinition: '结果可追溯、关键字段正确，失败时不会直接对外发布或发送错误结论。',
        },
        {
          title: '决定是否自动化',
          timebox: '15 分钟',
          description: '记录节省时间、返工原因和人工接管点；只有稳定步骤才增加 Automations、通知或云端执行。',
          doneDefinition: '明确继续、修改或停止，并只增加一个下一步改动。',
        },
      ],
    },
  ],
};
