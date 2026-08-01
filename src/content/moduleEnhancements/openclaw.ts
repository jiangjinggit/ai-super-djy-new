import type { ModuleEnhancement } from '@/types/course';

export const openclawEnhancement: ModuleEnhancement = {
  lastVerifiedOn: '2026-06-08',
  sources: [
    { label: 'OpenClaw Docs', url: 'https://docs.openclaw.ai/' },
    { label: 'OpenClaw Install', url: 'https://docs.openclaw.ai/install' },
    { label: 'OpenClaw Feishu Channel', url: 'https://docs.openclaw.ai/channels/feishu' },
    { label: 'OpenClaw FAQ', url: 'https://docs.openclaw.ai/help/faq' },
    { label: 'ClawHub Docs', url: 'https://docs.openclaw.ai/clawhub' },
    { label: 'ClawHub Registry', url: 'https://clawhub.ai/' },
    { label: 'OpenClaw GitHub', url: 'https://github.com/openclaw/openclaw' },
  ],
  blocks: [
    {
      type: 'weekly-plan',
      title: '6 周项目路线：从安装到增长',
      description: '每周只交付一组可验收资产，先稳住一个场景，再逐步补规则、能力、主动系统和治理。',
      hideMeta: true,
      items: [
        {
          week: 1,
          goal: '选场景 + 完成安装验证',
          deliverable: '场景判断卡、本机或服务器安装记录、模型配置、第一条回复和 gateway 重启验证记录。',
          fallback: '选不出场景就用"每日早报"起步。',
        },
        {
          week: 2,
          goal: '接好渠道 + 写好三件套',
          deliverable: '飞书双向通信通过、AGENTS.md 消息路由就位，SOUL.md / USER.md / AGENTS.md 基础版完成。',
          fallback: '规则太多就先只保留权限边界和通知分层。',
        },
        {
          week: 3,
          goal: '完成记忆和技能资产',
          deliverable: '记忆分流表、MEMORY.md 清理清单、1 组核心技能安装验证记录、1 个自定义 SKILL.md 草案。',
          fallback: '技能误调用增加就减回最小能力包。',
        },
        {
          week: 4,
          goal: '上线主动系统',
          deliverable: '1 个 Cron、1 个 Heartbeat 或等价巡检任务、通知三层分流规则和首轮刷屏调优记录。',
          fallback: '刷屏就立刻缩窄条件。',
        },
        {
          week: 5,
          goal: '跑通 1 个实战案例',
          deliverable: '飞书日报 / 内容监控 / 运营守夜台任选一个，完成手动触发、渠道推送、输出质量验收。',
          fallback: '不稳就先优化，别急着加第二个。',
        },
        {
          week: 6,
          goal: '治理 + 资产沉淀',
          deliverable: '安全确认矩阵、周检/月检记录、1 份场景 SOP、1 份删减清单。',
          fallback: '系统还乱就先删低价值通知和闲置技能。',
        },
      ],
    },
    {
      type: 'action-checklist',
      title: 'OpenClaw 项目交付清单',
      description: '每学完一组课，就把对应产物提交到你的 workspace 或项目文档里。',
      hideMeta: true,
      items: [
        {
          title: '场景判断卡',
          description: '写清输入源、触发方式、输出渠道、为什么需要长期在线，以及暂时不用 OpenClaw 的理由。',
          timebox: '20 分钟',
          doneDefinition: '能用 4 个问题判断该场景是否值得搭，并选出第一个最小场景。',
        },
        {
          title: '部署验收单',
          description: '记录安装方式、模型 provider、渠道、gateway 状态、重启恢复和日志位置。',
          timebox: '30 分钟',
          doneDefinition: '6 项验证全部通过，飞书私聊和群聊都能双向通信。',
        },
        {
          title: '规则三件套',
          description: '交付 SOUL.md / USER.md / AGENTS.md 基础版，并补上通知、确认和记忆写入规则。',
          timebox: '45 分钟',
          doneDefinition: '用模糊任务、风险任务、主动任务各测一次，能观察到边界生效。',
        },
        {
          title: '记忆与技能资产',
          description: '整理 daily notes、MEMORY.md、场景资产边界，并按场景安装最小技能组合。',
          timebox: '45 分钟',
          doneDefinition: '每个技能至少真实调用一次，记忆写入规则不会污染长期记忆。',
        },
        {
          title: '主动任务闭环',
          description: '上线一个 Cron 或 Heartbeat，并把结果推到飞书或指定渠道。',
          timebox: '30 分钟',
          doneDefinition: '手动触发成功，通知按立即、摘要、静默三层分流。',
        },
        {
          title: '治理复盘',
          description: '检查密钥、权限、日志、成本、失败任务和闲置技能，删掉低价值配置。',
          timebox: '30 分钟',
          doneDefinition: '形成安全确认矩阵、巡检记录和下一轮删减清单。',
        },
      ],
    },
    {
      type: 'security-checklist',
      title: '上线前治理清单',
      description: '长期在线之前，这 5 项必须过。',
      hideMeta: true,
      items: [
        {
          title: '密钥分开管理',
          detail: '渠道 Token、模型 Key、服务器登录信息不混放，测试和正式环境不共用凭证。',
        },
        {
          title: '高风险动作设为确认',
          detail: '删除、外发、改配置直接列清单，不用"谨慎处理"这种空话。',
        },
        {
          title: '共享能力和场景能力隔离',
          detail: '全局目录只放通用能力，场景专用放工作区。',
        },
        {
          title: '日志和成本有人看',
          detail: '每周回顾失败任务、模型成本、闲置技能。',
        },
        {
          title: '主动规则有频控',
          detail: '能打断你的只有真正需要行动的事件，其余入摘要或静默。',
        },
      ],
    },
    {
      type: 'resource-links',
      title: '核心资源导航',
      description: '按类别整理的 OpenClaw 外部资源；命令、配置、路径、权限以官方文档和 GitHub 为准。',
      items: [
        {
          title: 'OpenClaw 官方文档',
          url: 'https://docs.openclaw.ai/',
          label: '官方',
          description: 'API 参考、配置指南、架构说明，遇到问题先查这里',
          category: '官方资源',
        },
        {
          title: 'GitHub 主仓库',
          url: 'https://github.com/openclaw/openclaw',
          label: '源码',
          description: '源码、Issues、Release Notes',
          category: '官方资源',
        },
        {
          title: 'ClawHub 技能市场',
          url: 'https://clawhub.ai/',
          label: '市场',
          description: '官方 registry，安装前检查版本、源码、扫描状态和权限声明',
          category: '官方资源',
        },
        {
          title: 'Awesome OpenClaw Skills',
          url: 'https://github.com/VoltAgent/awesome-openclaw-skills',
          label: '精选',
          description: '社区精选技能，可作线索；安装前仍需按官方 registry 信息复核',
          category: '官方资源',
        },
        {
          title: '阿里云 — 轻量服务器部署',
          url: 'https://help.aliyun.com/zh/simple-application-server/use-cases/quickly-deploy-and-use-openclaw',
          label: '教程',
          description: '阿里云官方，含钉钉接入',
          category: '国内部署',
        },
        {
          title: '腾讯云 — Lighthouse + 飞书全流程',
          url: 'https://cloud.tencent.com/developer/article/2625073',
          label: '教程',
          description: '保姆级，含飞书机器人配置',
          category: '国内部署',
        },
        {
          title: '阿里云百炼 — 国内模型接入',
          url: 'https://help.aliyun.com/zh/model-studio/openclaw',
          label: '教程',
          description: 'Qwen / DeepSeek / Kimi 多模型配置',
          category: '国内部署',
        },
        {
          title: 'OpenClaw Feishu Channel',
          url: 'https://docs.openclaw.ai/channels/feishu',
          label: '官方',
          description: '飞书/Lark 接入命令、WebSocket、群聊、排错',
          category: '官方资源',
        },
        {
          title: 'DataWhale「哈喽！龙虾」',
          url: 'https://github.com/datawhalechina/hello-claw',
          label: '教程',
          description: '体系化中文开源教程，从入门到架构',
          category: '中文社区',
        },
        {
          title: 'OpenClaw FAQ',
          url: 'https://docs.openclaw.ai/help/faq',
          label: '官方',
          description: '状态检查、日志、doctor、workspace 与常见问题',
          category: '官方资源',
        },
      ],
    },
  ],
};
