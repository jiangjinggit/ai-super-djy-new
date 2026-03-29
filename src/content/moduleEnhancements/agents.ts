import type { ModuleEnhancement } from '@/types/course';

export const agentsEnhancement: ModuleEnhancement = {
  lastVerifiedOn: '2026-03-29',
  sources: [
    { label: 'OpenClaw Docs', url: 'https://docs.openclaw.ai/' },
    { label: 'OpenClaw Website', url: 'https://openclaw.ai/' },
    { label: 'Claude Code Changelog', url: 'https://code.claude.com/docs/en/changelog' },
    { label: 'Claude Code Platforms', url: 'https://code.claude.com/docs/en/platforms' },
    { label: 'Claude Code Remote Control', url: 'https://code.claude.com/docs/en/remote-control' },
    { label: 'Ollama', url: 'https://ollama.com/' },
  ],
  blocks: [
    {
      type: 'security-checklist',
      title: '智能体安全与权限边界',
      description: '先决定什么可以自动做、什么必须人工确认，再谈系统有多强。',
      items: [
        { title: '动作分级', detail: '把只读、草稿、通知、写入、对外发送、批量操作分成不同风险等级。' },
        { title: '最小权限', detail: '默认只开放任务所需的最低权限，避免后台工作台长期持有高危能力。' },
        { title: '密钥隔离', detail: '测试、日常、生产使用不同 Key 和额度上限，防止误调用扩大损失。' },
        { title: '人工确认点', detail: '资金、对外消息、生产变更、批量覆盖文件必须保留人工确认。' },
        { title: '日志审计', detail: '记录触发来源、工具调用、关键输入、关键输出和失败原因，便于复盘。' },
        { title: '失败回退', detail: '每条自动化都要定义超时、报错、重试和停机策略，而不是默认一直跑。' },
        { title: '沙箱与目录边界', detail: '限制工作目录和命令范围，避免读取敏感路径或执行高危命令。' },
        { title: '灰度上线', detail: '先用只读和草稿模式试跑，稳定后再升级为可写或可外发流程。' },
      ],
    },
  ],
};
