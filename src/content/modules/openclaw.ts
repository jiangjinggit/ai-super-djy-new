import { Bot, FileText, Wrench, Zap } from 'lucide-react';

import type { BaseModuleContent } from '@/types/course';

export const openclawModule: BaseModuleContent = {
  title: 'OpenClaw 实战',
  subtitle: '24/7 在线的开源 AI 助理',
  icon: Bot,
  color: 'orange',
  description:
    '14 节课，从判断是否值得搭、30 分钟跑通飞书日报，到三件套配置、技能组合、主动通知和长期治理。拿走模板和配置，不讲空话。',
  keyTakeaways: [],
  sections: [
    {
      title: '搭起来',
      content: '国内模型 + 飞书渠道 + 阿里云/腾讯云服务器，30 分钟跑通第一条日报。',
      icon: Zap,
    },
    {
      title: '配好它',
      content: 'SOUL.md 四段式、记忆三层分流、技能按场景组合，每课带可直接抄的模板。',
      icon: FileText,
    },
    {
      title: '用起来',
      content: '飞书日报、内容监控台、运营守夜台三个实战案例，配好就能长期跑。',
      icon: Wrench,
    },
  ],
  lessons: [
    {
      title: '先判断：值不值得搭',
      content: '4 个问题选出你的第一个场景，附 OpenClaw / Claude Code / Cowork / Coze 四工具分工表。',
      image: 'cover://openclaw-intro',
      details: [
        '344k+ Stars 开源 AI 助理平台速览',
        '4 个问题 + 四工具分工表',
      ],
      fullContent: [
        {
          subtitle: '1. OpenClaw 是什么',
          text: [
            '一个 24/7 在线的开源 AI 助理平台（GitHub 344k+ Stars），能主动执行任务、接入多平台、扩展 5400+ 社区技能。',
            '',
            '它不是聊天框，而是一套常驻系统，分 5 层：基础设施（服务器、模型、网关）→ 规则层（SOUL.md、USER.md、AGENTS.md）→ 记忆层 → 能力层（Skills 5400+、Nodes）→ 运行层（Heartbeat、Cron、通知）。',
            '',
            '> 📖 [OpenClaw 官方文档](https://docs.openclaw.ai/) · [GitHub 主仓库](https://github.com/openclaw/openclaw)（344k+ ⭐）· [知乎 — 一文读懂 OpenClaw](https://zhuanlan.zhihu.com/p/2000850539936765122)',
          ].join('\n'),
        },
        {
          subtitle: '2. 4 个问题判断该不该上',
          text: [
            '| 问题 | 如果是 |',
            '| --- | --- |',
            '| 信息源是不是固定的？ | 适合让系统自动抓取 |',
            '| 需不需要它主动做事？ | 这是 OpenClaw 最大的差异化 |',
            '| 结果要不要推到固定渠道？ | 飞书/钉钉/Telegram 都能接 |',
            '| 能不能接受先花 30-60 分钟搭环境？ | 不是开箱即用的工具 |',
            '',
            '4 个都是 → 直接开始。3 个是 → 先从最小场景切入。2 个以下 → 先用 Claude Cowork、Claude Code 或 Coze。',
          ].join('\n'),
        },
        {
          subtitle: '3. 四工具的分工边界',
          text: [
            '| 工具 | 擅长 | 不擅长 |',
            '| --- | --- | --- |',
            '| OpenClaw | 长期在线、主动触发、监控汇总、定时推送 | 一次性分析、本地代码仓库 |',
            '| Claude Code | 本地代码、终端命令、文档协作 | 长期后台运行、主动推送 |',
            '| Claude Cowork | 本地文件整理、文档生成、研究综合、无技术门槛 | 24/7 后台运行、主动推送、深度定制 |',
            '| Coze | 快速验证、低门槛流程搭建 | 深度定制、长期稳定运行 |',
          ].join('\n'),
        },
      ],
    },
    {
      title: '中国用户：30 分钟跑通飞书日报',
      content: '服务器 + 模型 + 飞书，最短路径。含国内/国外模型选型指南。',
      image: 'cover://openclaw-china-quickstart',
      details: [
        '选型表 + 5 步操作 + 踩坑清单',
        '国内/国外模型怎么选 + 社区资源',
      ],
      fullContent: [
        {
          subtitle: '1. 推荐技术栈',
          text: [
            '| 组件 | 首选 | 备选 |',
            '| --- | --- | --- |',
            '| 服务器 | 阿里云轻量 / 腾讯云 Lighthouse | 自有 Mac Mini（合盖就断，慎用笔记本） |',
            '| 主渠道 | 飞书 | 钉钉（阿里云生态） |',
            '',
            '> 📖 [阿里云 — 轻量服务器部署](https://help.aliyun.com/zh/simple-application-server/use-cases/quickly-deploy-and-use-openclaw) · [腾讯云 — Lighthouse + 飞书全流程](https://cloud.tencent.com/developer/article/2625073)',
          ].join('\n'),
        },
        {
          subtitle: '2. 模型怎么选',
          text: [
            '**普通用户（无翻墙）→ 国内模型，免折腾、直连稳定：**',
            '',
            '| 模型 | API Base URL | 适合 | 成本 |',
            '| --- | --- | --- | --- |',
            '| DeepSeek Chat | `https://api.deepseek.com/v1` | 日常最便宜首选 | ¥1/百万token输入 |',
            '| 通义千问 Qwen-Plus | `https://dashscope.aliyuncs.com/compatible-mode/v1` | 阿里云生态 | ¥0.8/千token输入 |',
            '| Kimi (Moonshot) | `https://api.moonshot.cn/v1` | 长文本场景 | ¥12/百万token |',
            '| 豆包 | `https://ark.cn-beijing.volces.com/api/v3` | 中文对话流畅 | 按量计费 |',
            '',
            '> 📖 [阿里云百炼 — OpenClaw 接入指南](https://help.aliyun.com/zh/model-studio/openclaw)（Qwen/DeepSeek/Kimi 多模型配置）',
            '',
            '**有翻墙 / 追求效果上限 → 国外顶尖模型：**',
            '',
            '效果天花板目前是 Claude Opus 4.6 和 GPT-5.4，复杂推理、长文档分析、对外发布内容明显更强。',
            '',
            '不想自己管 API Key 的，可以用国内中转站（如 API2D、OpenRouter 国内镜像等），填中转站的 Base URL 即可。',
            '',
            '> 模型效果横评见「大模型实战库」模块，有各模型在真实任务上的对比数据。',
          ].join('\n'),
        },
        {
          subtitle: '3. 5 步快速路径',
          text: [
            '买服务器（5 分钟）→ 配国内模型（5 分钟）→ 接飞书（10 分钟）→ 验证（3 分钟）→ 配早报（5 分钟）。',
            '',
            '```bash',
            'npm config set registry https://registry.npmmirror.com',
            'npm install -g openclaw@latest',
            'openclaw onboard --install-daemon',
            '```',
            '',
            '> 📖 [博客园 — 保姆级飞书对接教程](https://www.cnblogs.com/catchadmin/p/19556552)',
          ].join('\n'),
        },
        {
          subtitle: '4. 国内社区资源',
          text: [
            '| 资源 | 说明 |',
            '| --- | --- |',
            '| [OpenClaw 汉化版](https://github.com/1186258278/OpenClawChineseTranslation) | 中文 CLI + Dashboard |',
            '| [DataWhale「哈喽！龙虾」](https://github.com/datawhalechina/hello-claw) | 体系化中文开源教程 |',
            '| [菜鸟教程 — OpenClaw](https://www.runoob.com/ai-agent/openclaw-clawdbot-tutorial.html) | 从 clone 到 build 全流程 |',
            '| [B站 — 部署教程](https://www.bilibili.com/video/BV1kH6nBFEPq/) | 保姆级视频 |',
            '| [36氪 — 深度分析](https://36kr.com/p/3671941309260675) | 国内开发者视角 |',
          ].join('\n'),
        },
      ],
    },
    {
      title: '部署验证 + 渠道接入',
      content: '6 项验证清单 + 飞书双通道路由配置。',
      image: 'cover://openclaw-setup',
      details: [
        '6 项部署验证清单 + 故障排查速查表',
        '飞书接入命令 + 双通道路由模板',
      ],
      fullContent: [
        {
          subtitle: '1. 6 项验证清单',
          text: [
            '第一条回复不等于部署完成，6 项全过才算：',
            '',
            '| 检查项 | 命令 |',
            '| --- | --- |',
            '| 进程存活 | `openclaw gateway status` |',
            '| 模型可用 | 发测试消息 |',
            '| 渠道通畅 | 双向测试 |',
            '| 重启恢复 | `openclaw daemon restart` |',
            '| 日志可见 | `openclaw logs --follow` |',
            '| 控制台可用 | `openclaw dashboard` |',
          ].join('\n'),
        },
        {
          subtitle: '2. 渠道接入 + 路由',
          text: [
            '```bash',
            'openclaw channels add  # 选 Feishu，填 App ID 和 App Secret',
            'openclaw gateway status  # feishu 应为 connected',
            '```',
            '',
            '双通道路由写进 AGENTS.md：飞书承接日报/常规通知，Telegram 只做 P1 强提醒，22:00-08:00 静默。',
          ].join('\n'),
        },
      ],
    },
    {
      title: '生态结构：4 个对象怎么分层',
      content: '工作区、Agent、渠道、节点的边界和常见错误。',
      image: 'cover://openclaw-architecture',
      details: [
        '4 个对象的分工',
        '拆分 vs 共享的判断标准',
      ],
      fullContent: [
        {
          subtitle: '1. 4 个对象',
          text: [
            '| 对象 | 管什么 |',
            '| --- | --- |',
            '| 工作区 | 场景专用的规则、技能和资产 |',
            '| Agent | 执行任务的主体 |',
            '| 渠道 | 消息进出 |',
            '| 节点 | 设备级执行能力 |',
            '',
            '> 📖 [DEV Community — Unleashing OpenClaw](https://dev.to/mechcloud_academy/unleashing-openclaw-the-ultimate-guide-to-local-ai-agents-for-developers-in-2026-3k0h)（Gateway 架构深度解析）',
          ].join('\n'),
        },
        {
          subtitle: '2. 拆分原则',
          text: [
            '能跨场景稳定复用的才共享，只服务一个场景的别急着全局化。涉及外发、删改、生产环境的必须隔离。',
          ].join('\n'),
        },
      ],
    },
    {
      title: '规则三件套：SOUL.md / USER.md / AGENTS.md',
      content: '三个文件各管什么、怎么写、优先级是什么，每个附模板。',
      image: 'cover://openclaw-rules',
      details: [
        'SOUL.md 四段式 + 可直接用的模板',
        'USER.md / AGENTS.md 分工 + 三件套优先级',
      ],
      fullContent: [
        {
          subtitle: '1. 三件套分工',
          text: [
            '| 文件 | 管什么 |',
            '| --- | --- |',
            '| SOUL.md | 默认行为边界：角色定位、语气风格、决策权限、绝对禁止项 |',
            '| USER.md | 长期稳定的个人背景：身份、项目、偏好、免打扰时段 |',
            '| AGENTS.md | 场景化操作规程：通知规则、确认机制、记忆写入 |',
            '',
            '冲突时：SOUL.md 禁止项 > AGENTS.md 场景规则 > USER.md 默认偏好 > 系统默认行为。',
          ].join('\n'),
        },
        {
          subtitle: '2. SOUL.md 四段式',
          text: [
            '| 模块 | 该写什么 | 别写成什么 |',
            '| --- | --- | --- |',
            '| 角色定位 | 你是什么类型的助手 | 最懂我的超级 AI |',
            '| 语气风格 | 回答长短、先结论还是先展开 | 自然一点、聪明一点 |',
            '| 决策权限 | 什么能自主做、什么先告知、什么必须确认 | 高风险操作谨慎处理 |',
            '| 绝对禁止项 | 删除、外发、安装等红线 | 注意安全 |',
          ].join('\n'),
        },
      ],
    },
    {
      title: '记忆三层分流',
      content: 'daily notes / MEMORY.md / 场景资产，7 天判断法。',
      image: 'cover://openclaw-memory',
      details: [
        '三层记忆结构 + 判断标准',
        '防止记忆污染的规则',
      ],
      fullContent: [
        {
          subtitle: '1. 三层记忆',
          text: [
            '| 层级 | 放什么 |',
            '| --- | --- |',
            '| daily notes | 当天状态、巡检结果、临时反馈 |',
            '| MEMORY.md | 跨天仍有效的偏好和规律 |',
            '| 场景资产 | 已验证的 SOP、模板、失败案例 |',
            '',
            '> 📖 [Medium — How OpenClaw Memory Works](https://medium.com/@databytoufik/how-openclaw-memory-works-802bd8465b1a)（BM25 + 向量搜索混合检索原理）',
          ].join('\n'),
        },
        {
          subtitle: '2. 判断标准',
          text: [
            '7 天后还成立吗？不成立 → daily notes。成立且反复影响行为 → MEMORY.md。已形成可复用流程 → 升级成场景资产。',
          ].join('\n'),
        },
      ],
    },
    {
      title: '技能与节点扩展',
      content: '按场景装技能、ClawHub 安全提醒、Skill vs Node 判断。',
      image: 'cover://openclaw-skills',
      details: [
        '按场景选技能组合 + 自定义 SKILL.md 模板',
        'ClawHub 安全风险 + Skill vs Node 区别',
      ],
      fullContent: [
        {
          subtitle: '1. 按场景选组合',
          text: [
            '| 场景 | 最小组合 |',
            '| --- | --- |',
            '| 每日早报 | email + calendar + reminder |',
            '| 内容监控 | web-search + browser + reminder |',
            '| 客服/运营 | web-search + reminder |',
            '',
            '> 📖 [ClawHub 技能市场](https://clawhub.com/)（5400+ 技能）· [Awesome OpenClaw Skills](https://github.com/VoltAgent/awesome-openclaw-skills)（社区精选）',
          ].join('\n'),
        },
        {
          subtitle: '2. 安全提醒 + Skill vs Node',
          text: [
            'ClawHub 已发现 1000+ 恶意技能。安装前检查 star 数、SKILL.md 权限声明，优先用官方或审核过的技能。',
            '',
            'Skill = 调用 API 接口（搜索、发消息）。Node = 控制另一台设备（浏览器登录态、截图）。上 Node 前先确认：是不是设备能力、需不需要隔离、最小权限能说清吗。',
            '',
            '> ⚠️ [The Hacker News — 恶意 ClawHub 技能](https://thehackernews.com/2026/02/researchers-find-341-malicious-clawhub.html)',
          ].join('\n'),
        },
      ],
    },
    {
      title: 'Heartbeat + Cron + 通知分层',
      content: '配好了是利器，配废了是噪音源。附 4 周起手顺序。',
      image: 'cover://openclaw-proactive',
      details: [
        'Heartbeat / Cron 配置 + cron 表达式速查',
        '通知三层分流 + 刷屏排查',
      ],
      fullContent: [
        {
          subtitle: '1. 配置',
          text: [
            'Heartbeat：固定间隔巡检（`interval` 秒）。Cron：固定时间点任务（标准 cron 表达式）。',
            '',
            '注意：一定要设 `timezone: "Asia/Shanghai"`，否则时间按 UTC 算。',
          ].join('\n'),
        },
        {
          subtitle: '2. 通知三层分流',
          text: [
            '立即推送：真正需要行动的异常。合并摘要：当天知道就够的常规信息。静默记录：仅供复盘，不主动打扰。',
            '',
            '起手顺序：第 1 周只上 1 个 Cron（早报）→ 第 2 周加 Heartbeat → 第 3 周加监控 → 第 4 周回顾删减。',
          ].join('\n'),
        },
      ],
    },
    {
      title: '实战：飞书日报',
      content: '邮件 + 日历 + 待办 → 一条飞书日报，附模板和排错。',
      image: 'cover://openclaw-feishu-daily-report',
      details: [
        '最小闭环 + 日报规则模板',
        '消息/文档/表格分工',
      ],
      fullContent: [
        {
          subtitle: '1. 最小流程',
          text: [
            '抓取（邮件、日历、待办）→ 过滤（立即/关注/了解三层）→ 组装（套模板）→ 推送（飞书）→ 回收（次日优化）。',
          ].join('\n'),
        },
        {
          subtitle: '2. 资产分工',
          text: [
            '飞书消息：今日重点（极短）。飞书文档：邮件摘要、日历明细（承接长信息）。多维表格：日期、负责人、优先级、状态（持续追踪）。',
          ].join('\n'),
        },
      ],
    },
    {
      title: '实战：飞书内容监控台',
      content: '关键词 + 竞品 → 飞书线索流 + 多维表格素材池。',
      image: 'cover://openclaw-feishu-content-monitor',
      details: [
        'Heartbeat 巡检 + Cron 汇总配置',
        '多维表格素材池字段结构',
      ],
      fullContent: [
        {
          subtitle: '1. 核心',
          text: [
            '不是抓得多，而是筛得准。异常变化 → 立即推送。正常更新 → 摘要。噪音 → 静默。',
            '',
            '监控系统的终点不是群消息，而是飞书多维表格素材池。',
          ].join('\n'),
        },
      ],
    },
    {
      title: '实战：飞书运营守夜台',
      content: '运营异常 P1/P2/P3 分级 → 飞书工单表。',
      image: 'cover://openclaw-feishu-ops-watch',
      details: [
        'P1/P2/P3 分级规则 + 升级机制',
        '飞书工单多维表格结构',
      ],
      fullContent: [
        {
          subtitle: '1. 核心',
          text: [
            '先分级，再通知。P1 立即进飞书群指定责任人，P2 进摘要和工单表，P3 只记日志。',
            '',
            '飞书群提醒不是终点，工单多维表格才是。',
          ].join('\n'),
        },
      ],
    },
    {
      title: '安全与成本治理',
      content: '4 类边界 + 确认矩阵 + 每周巡检表。',
      image: 'cover://openclaw-security',
      details: [
        '密钥/行为/能力/成本 4 类边界',
        '确认矩阵 + 巡检框架',
      ],
      fullContent: [
        {
          subtitle: '1. 4 类边界',
          text: [
            '密钥：分开管理。行为：删除/外发/改配置必须确认。能力：共享和专用技能隔离。成本：日志、额度、失败任务定期看。',
            '',
            '> 📖 [Adversa AI — OpenClaw Security 101](https://adversa.ai/blog/openclaw-security-101-vulnerabilities-hardening-2026/) · [Microsoft Security — 安全运行 OpenClaw](https://www.microsoft.com/en-us/security/blog/2026/02/19/running-openclaw-safely-identity-isolation-runtime-risk/)',
          ].join('\n'),
        },
      ],
    },
    {
      title: '长期运营：别让系统烂尾',
      content: '分层排查 + 周检月检 + 场景资产沉淀。',
      image: 'cover://openclaw-grow',
      details: [
        '"变笨"时的分层排查法',
        '稳定场景升级成 SOP 资产',
      ],
      fullContent: [
        {
          subtitle: '1. 分层排查',
          text: [
            '风格漂了 → 查 SOUL.md。背景错了 → 查 MEMORY.md。技能乱了 → 查 description。通知失控 → 查 Heartbeat/Cron。',
            '',
            '长期调优的目标不是功能越来越多，而是有效场景越来越稳、无效配置越来越少。',
            '',
            '> 📖 [SitePoint — OpenClaw Production Guide](https://www.sitepoint.com/openclaw-production-lessons-4-weeks-self-hosted-ai/)（4 周自托管真实记录）',
          ].join('\n'),
        },
      ],
    },
    {
      title: '资源合集',
      content: '按分类整理的核心资源：官方文档、国内教程、安全研究、深度阅读。',
      image: 'cover://openclaw-resources',
      details: [
        '官方文档 + 国内社区 + 部署教程',
        '安全资源 + 深度阅读',
      ],
      fullContent: [
        {
          subtitle: '1. 官方与社区',
          text: [
            '| 资源 | 说明 |',
            '| --- | --- |',
            '| [官方文档](https://docs.openclaw.ai/) | API 参考、配置指南、架构说明 |',
            '| [GitHub 主仓库](https://github.com/openclaw/openclaw) | 源码、Issues、Release Notes |',
            '| [ClawHub 技能市场](https://clawhub.com/) | 5400+ 社区技能 |',
            '| [Awesome OpenClaw Skills](https://github.com/VoltAgent/awesome-openclaw-skills) | 社区精选，经过安全审查 |',
            '| [Discord 社区](https://discord.com/invite/clawd) | 官方交流、问题反馈 |',
          ].join('\n'),
        },
        {
          subtitle: '2. 安全资源',
          text: [
            '| 资源 | 说明 |',
            '| --- | --- |',
            '| [Adversa AI — Security 101](https://adversa.ai/blog/openclaw-security-101-vulnerabilities-hardening-2026/) | CVE + 加固建议 |',
            '| [Microsoft Security](https://www.microsoft.com/en-us/security/blog/2026/02/19/running-openclaw-safely-identity-isolation-runtime-risk/) | 身份隔离 + 运行时风险 |',
            '| [Kaspersky — 漏洞报告](https://www.kaspersky.com/blog/openclaw-vulnerabilities-exposed/55263/) | 512 个漏洞审计 |',
            '| [The Hacker News — 恶意技能](https://thehackernews.com/2026/02/researchers-find-341-malicious-clawhub.html) | 供应链攻击详情 |',
          ].join('\n'),
        },
      ],
    },
  ],
  cta: {
    text: 'OpenClaw 主线跑通后，去场景库挑一个流程真正落地 →',
    link: '/module/scenarios',
  },
};
