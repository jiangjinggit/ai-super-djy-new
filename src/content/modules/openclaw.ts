import { Bot, FileText, Wrench, Zap } from 'lucide-react';

import type { BaseModuleContent } from '@/types/course';

export const openclawModule: BaseModuleContent = {
  title: 'OpenClaw 实战',
  subtitle: '24/7 在线的开源 AI 助理',
  icon: Bot,
  color: 'orange',
  description:
    '12 节项目式路径：先判断场景是否适合，再完成安装、渠道、三件套、记忆、技能、主动任务、安全治理和增长复盘。每节课都对应一个可提交产物，不讲空话。',
  keyTakeaways: [
    '完成一张场景判断卡：输入源、触发方式、输出渠道和工具选型结论',
    '交付可验收的基础设施：安装记录、模型配置、渠道双向通信和重启恢复测试',
    '沉淀规则与能力资产：SOUL.md / USER.md / AGENTS.md、记忆分流表、技能组合清单',
    '上线主动系统：Cron / Heartbeat、通知三层分流、飞书日报或监控闭环',
    '建立长期治理节奏：安全确认矩阵、成本/日志巡检、场景 SOP 和删减清单',
  ],
  sections: [
    {
      title: '搭起来',
      content: '从场景判断卡开始，按官方当前安装页完成本机或服务器、模型、飞书渠道和 6 项部署验收。',
      icon: Zap,
    },
    {
      title: '配好它',
      content: '交付三件套基础版、记忆分流表、工作区结构图和技能组合清单，每个配置都能测试。',
      icon: FileText,
    },
    {
      title: '用起来',
      content: '用 AI 热点日报跑通主动闭环，再补安全矩阵、周检月检和可复用场景 SOP。',
      icon: Wrench,
    },
  ],
  lessons: [
    {
      title: '先判断：值不值得搭',
      content: '4 个问题选出你的第一个场景，附 OpenClaw / Claude Code / Cowork / Coze 四工具分工表。',
      image: 'cover://openclaw-intro',
      details: [
        '本课产物：1 张 OpenClaw 场景判断卡',
        'OpenClaw 官方文档与核心能力速览',
        '4 个问题 + 四工具分工表',
      ],
      fullContent: [
        {
          subtitle: '1. OpenClaw 是什么',
          text: [
            'OpenClaw 是一个本地优先的个人 AI 助理与 Gateway 控制平面：它可以运行在你自己的设备或服务器上，通过聊天渠道触达，并通过模型、工具、记忆和任务编排完成长期协作。',
            '',
            '它不是聊天框，而是一套常驻系统，分 5 层：基础设施（设备/服务器、模型、Gateway）→ 规则层（课程模板里的 SOUL.md / USER.md / AGENTS.md）→ 记忆与工作区 → 能力层（Skills、Plugins、Nodes）→ 运行层（Cron、Heartbeat、通知）。具体命令和文件路径以官方文档为准。',
            '',
            '> 📖 [OpenClaw 官方文档](https://docs.openclaw.ai/) · [GitHub 主仓库](https://github.com/openclaw/openclaw) · [ClawHub 官方文档](https://docs.openclaw.ai/clawhub)',
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
      title: '中国用户：30 分钟搭好环境',
      content: '服务器 + 模型 + 飞书，最短路径。含国内/国外模型选型指南。',
      image: 'cover://openclaw-china-quickstart',
      details: [
        '本课产物：环境选型卡 + 安装验证记录',
        '选型表 + 5 步操作 + 踩坑清单',
        '国内/国外模型怎么选 + 社区资源',
      ],
      fullContent: [
        {
          subtitle: '0. 配置不用自己手写',
          text: [
            '遇到配置文件（SOUL.md、AGENTS.md 等）有两种省力方式：',
            '',
            '**方式一：直接跟 OpenClaw 聊天**，用自然语言告诉它你要什么，它会自动写进配置文件。',
            '',
            '**方式二：用 Claude Code 帮你配**，打开 OpenClaw 默认 workspace，让 Claude Code 读取现有结构直接帮你写：',
            '',
            '```bash',
            'claude ~/.openclaw/workspace',
            '```',
            '',
            'OpenClaw 默认工作区和状态文件在 `~/.openclaw` 体系下；如果你改过 workspace 路径，以 `openclaw status --all` 或官方 FAQ 显示的路径为准。',
          ].join('\n'),
        },
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
            '| 模型/平台 | API Base URL | 适合 | 接入前核验 |',
            '| --- | --- | --- | --- |',
            '| DeepSeek | `https://api.deepseek.com/v1` | 低成本中文任务、批量处理 | 官方价格页和模型列表 |',
            '| 通义千问 / 阿里云百炼 | `https://dashscope.aliyuncs.com/compatible-mode/v1` | 阿里云生态、中文协作 | 百炼模型与价格页 |',
            '| Kimi / Moonshot | `https://api.moonshot.cn/v1` | 长文本与中文资料处理 | Moonshot 平台模型页 |',
            '| 豆包 / 火山方舟 | `https://ark.cn-beijing.volces.com/api/v3` | 字节生态、中文对话 | 火山方舟模型与计费页 |',
            '',
            '> 成本和上下文窗口变化很快，课程不写死价格；上线前用你的日调用量、输出长度和失败重跑率重新估算。',
            '',
            '**追求效果上限 → 官方旗舰或推理模型：**',
            '',
            '选择 OpenAI、Anthropic、Google 等厂商当前官方旗舰或推理模型。具体型号、上下文和价格以厂商模型页与 OpenClaw provider 配置为准，不在课程里硬背版本号。',
            '',
            '如果必须走中转，先确认模型真实性、日志策略、回退路径和敏感数据边界，不要把生产资料默认压到未知代理层。',
            '',
            '> 模型效果横评见「大模型实战库」模块，有各模型在真实任务上的对比数据。',
          ].join('\n'),
        },
        {
          subtitle: '3. 5 步快速路径',
          text: [
            '买服务器或准备本机（5 分钟）→ 官方安装器安装（5 分钟）→ onboard 配模型（5 分钟）→ 接飞书（10 分钟）→ 验证（3 分钟）→ 配早报（5 分钟）。',
            '',
            '```bash',
            'curl -fsSL https://openclaw.ai/install.sh | bash',
            'openclaw onboard --install-daemon',
            'openclaw channels login --channel feishu',
            '```',
            '',
            '> npm / pnpm / bun 仍是官方备选安装方式。Node 版本、安装器行为和系统要求以 OpenClaw 官方当前安装页为准。',
          ].join('\n'),
        },
        {
          subtitle: '4. 国内社区资源',
          text: [
            '| 资源 | 说明 |',
            '| --- | --- |',
            '| [OpenClaw 官方安装文档](https://docs.openclaw.ai/install) | 安装方式、Node 要求、验证命令 |',
            '| [OpenClaw Feishu 文档](https://docs.openclaw.ai/channels/feishu) | 飞书/Lark 接入命令、WebSocket、排错 |',
            '| [阿里云百炼接入指南](https://help.aliyun.com/zh/model-studio/openclaw) | 百炼 OpenAI 兼容接口 + 多模型配置 |',
            '| [GitHub Releases](https://github.com/openclaw/openclaw/releases) | 版本变化与升级依据 |',
          ].join('\n'),
        },
      ],
    },
    {
      title: '部署验证：6 项全过才算稳',
      content: '第一条回复不等于部署完成，6 项验证清单 + 通知路由配置。',
      image: 'cover://openclaw-setup',
      details: [
        '本课产物：部署验收单 + 消息路由规则',
        '6 项验证清单 + 常见故障速查',
        '双通道路由模板（写进 AGENTS.md 即用）',
      ],
      fullContent: [
        {
          subtitle: '1. 6 项验证清单',
          text: [
            '第一条回复不等于部署完成，6 项全过才算稳：',
            '',
            '| 检查项 | 命令 | 预期结果 |',
            '| --- | --- | --- |',
            '| 进程存活 | `openclaw gateway status` | running |',
            '| 模型可用 | 发测试消息 | 正常回复 |',
            '| 渠道通畅 | 双向收发测试 | 消息可达 |',
            '| 重启恢复 | `openclaw gateway restart` | 自动重连 |',
            '| 日志可见 | `openclaw logs --follow` | 无报错 |',
            '| 控制台可用 | `openclaw dashboard` | 页面正常 |',
          ].join('\n'),
        },
        {
          subtitle: '2. 常见故障速查',
          text: [
            '| 现象 | 先查 |',
            '| --- | --- |',
            '| 渠道显示 disconnected | 检查 App ID / Secret 是否填错，安全组 443 端口是否开放 |',
            '| 发消息无回复 | `openclaw logs --follow` 看有没有报错 |',
            '| 重启后渠道断开 | 检查 Gateway 是否随系统启动 `openclaw gateway status` |',
            '| 模型超时 | 检查 Base URL 是否正确，国内模型不要填 OpenAI 地址 |',
          ].join('\n'),
        },
        {
          subtitle: '3. 验证完成后：配双通道路由',
          text: [
            '6 项全过之后，把通知路由写进 AGENTS.md，避免后续主动通知刷屏：',
            '',
            '```text',
            '通知路由规则：',
            '- P1 异常（需立即处理）→ Telegram + 主渠道',
            '- 常规日报/摘要 → 主渠道（飞书/企微/钉钉）',
            '- 22:00-08:00 → 仅 P1 可打扰，其余静默',
            '```',
          ].join('\n'),
        },
      ],
    },
    {
      title: '规则三件套：SOUL.md / USER.md / AGENTS.md',
      content: '三个文件各管什么、怎么写、优先级是什么，每个附模板。',
      image: 'cover://openclaw-rules',
      details: [
        '本课产物：三件套 v0.1 + 冲突优先级说明',
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
        '本课产物：记忆分流表 + MEMORY.md 清理清单',
        '三层记忆结构 + 判断标准',
        '防止记忆污染的规则',
      ],
      fullContent: [
        {
          subtitle: '1. 三层记忆',
          text: [
            '| 层级 | 放什么 |',
            '| --- | --- |',
            '| daily notes / `memory/YYYY-MM-DD.md` | 当天状态、巡检结果、临时反馈 |',
            '| `MEMORY.md` | 跨天仍有效的偏好和规律 |',
            '| `DREAMS.md` / 场景资产 | 已验证的想法、SOP、模板、失败案例 |',
            '',
            '> 📖 这些文件名来自 OpenClaw FAQ 和 workspace 约定；不要把第三方文章里的检索算法或权重当成官方事实。',
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
      title: '生态结构：4 个对象怎么分层',
      content: '工作区、Agent、渠道、节点的边界和常见错误。',
      image: 'cover://openclaw-architecture',
      details: [
        '本课产物：工作区 / Agent / 渠道 / 节点关系图',
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
            '> 📖 先看官方 [Gateway](https://docs.openclaw.ai/gateway) 与 [Multi-agent](https://docs.openclaw.ai/concepts/multi-agent) 文档，再用社区文章做延伸阅读。',
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
      title: '技能与节点扩展',
      content: '按场景装技能、ClawHub 安全提醒、Skill vs Node 判断。',
      image: 'cover://openclaw-skills',
      details: [
        '本课产物：技能组合清单 + 1 个自定义 SKILL.md',
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
            '> 📖 [ClawHub 官方文档](https://docs.openclaw.ai/clawhub) · [ClawHub](https://clawhub.ai/)（安装前查看源码、扫描状态、版本和权限说明）',
          ].join('\n'),
        },
        {
          subtitle: '2. 安全提醒 + Skill vs Node',
          text: [
            'ClawHub 是开放 registry，安装第三方 skill 或 plugin 前要查看发布者、源码、扫描状态、更新时间和权限说明；不要只凭下载量或 star 数判断安全。',
            '',
            'Skill = 调用 API 接口（搜索、发消息）。Node = 控制另一台设备（浏览器登录态、截图）。上 Node 前先确认：是不是设备能力、需不需要隔离、最小权限能说清吗。',
            '',
            '> 官方建议优先用 `openclaw skills install <slug>` 安装到当前 OpenClaw workspace；`clawhub install <slug>` 更适合 registry 直连工作流，会安装到当前目录的 `./skills`。',
          ].join('\n'),
        },
      ],
    },
    {
      title: 'Heartbeat + Cron + 通知分层',
      content: '配好了是利器，配废了是噪音源。附 4 周起手顺序。',
      image: 'cover://openclaw-proactive',
      details: [
        '本课产物：1 个 Cron、1 条通知分流规则和观测记录',
        'Heartbeat / Cron 配置 + cron 表达式速查',
        '通知三层分流 + 刷屏排查',
      ],
      fullContent: [
        {
          subtitle: '1. 配置',
          text: [
            'Heartbeat：适合持续巡检。Cron：适合固定时间点任务。字段名和配置位置会随版本变化，按官方 Cron/Heartbeat 文档配置；课程只保留分流规则和 prompt 模板。',
            '',
            '如果配置里支持 timezone，明确写 `Asia/Shanghai`；如果改用 CLI/管理命令创建任务，以官方显示的时区为准。',
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
      title: '实战：飞书 AI 热点日报',
      content: '36氪 AI 频道 + GitHub Trending + 少数派 → 每天早上一条飞书推送，5 步跑通。',
      image: 'cover://openclaw-feishu-daily-report',
      details: [
        '本课产物：可手动触发的飞书 AI 热点日报',
        '信息源配置（无翻墙/有翻墙两套）+ 过滤规则模板',
        '5 步手把手跑通 + 常见故障排查',
      ],
      fullContent: [
        {
          subtitle: '1. 最小流程',
          text: [
            '安装 web-search 技能 → 配信息源 → 写过滤规则到 AGENTS.md → 配 Cron 定时触发 → 验证输出质量。',
          ].join('\n'),
        },
        {
          subtitle: '2. 信息源两套方案',
          text: [
            '无翻墙：36氪 AI 频道 + GitHub Trending + 少数派 + 虎嗅前沿科技。有翻墙：加上 X/Twitter 关键账号 + Hacker News + Product Hunt。',
            '',
            '先用无翻墙版跑通，再按需扩展。',
          ].join('\n'),
        },
        {
          subtitle: '3. 过滤规则核心',
          text: [
            '保留：涉及大模型/AI Agent/AI 工具的新产品或重大更新、你关注仓库的 release/issue 异常、公开官方发布或产品变更。',
            '',
            '过滤：纯广告软文、昨日已推送内容、与 AI 无关的泛科技新闻。',
            '',
            '每日最多 5 条，按重要性排序，每条一句话摘要 + 来源链接。',
          ].join('\n'),
        },
      ],
    },
    {
      title: '安全与成本治理',
      content: '4 类边界 + 确认矩阵 + 每周巡检表。',
      image: 'cover://openclaw-security',
      details: [
        '本课产物：安全确认矩阵 + 每周巡检表',
        '密钥/行为/能力/成本 4 类边界',
        '确认矩阵 + 巡检框架',
      ],
      fullContent: [
        {
          subtitle: '1. 4 类边界',
          text: [
            '密钥：分开管理。行为：删除/外发/改配置必须确认。能力：共享和专用技能隔离。成本：日志、额度、失败任务定期看。',
            '',
            '> 📖 [ClawHub 官方文档](https://docs.openclaw.ai/clawhub) · [OpenClaw GitHub Security](https://github.com/openclaw/openclaw#security)',
          ].join('\n'),
        },
      ],
    },
    {
      title: '长期运营：别让系统烂尾',
      content: '分层排查 + 周检月检 + 场景资产沉淀。',
      image: 'cover://openclaw-grow',
      details: [
        '本课产物：周检/月检记录 + 场景 SOP',
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
            '> 长期调优优先看 `openclaw status --all`、`openclaw logs --follow` 和官方 Troubleshooting；社区文章只作经验参考。',
          ].join('\n'),
        },
        {
          subtitle: '2. 下一步：去场景库找更多落地场景',
          text: [
            'AI 热点日报只是起点。场景库里还有内容监控、运营守夜、竞品追踪等更多已验证的流程，配置模板可以直接复用。',
            '',
            '→ [前往场景库](/module/scenarios)',
          ].join('\n'),
        },
      ],
    },
    {
      title: '资源合集',
      content: '按分类整理的核心资源：官方文档、国内教程、安全研究、深度阅读。',
      image: 'cover://openclaw-resources',
      details: [
        '本课产物：官方资源核验清单',
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
            '| [ClawHub](https://clawhub.ai/) | 官方 registry，查看 skill/plugin 详情、版本、扫描状态 |',
            '| [ClawHub 文档](https://docs.openclaw.ai/clawhub) | 搜索、安装、发布和安全审查说明 |',
            '| [Discord 社区](https://discord.com/invite/clawd) | 官方交流、问题反馈 |',
          ].join('\n'),
        },
        {
          subtitle: '2. 安全资源',
          text: [
            '| 资源 | 说明 |',
            '| --- | --- |',
            '| [ClawHub 安全与审核说明](https://docs.openclaw.ai/clawhub) | 扫描状态、报告、下架和审核机制 |',
            '| [OpenClaw GitHub Security](https://github.com/openclaw/openclaw#security) | 官方安全模型与问题报告入口 |',
            '| [OpenClaw FAQ](https://docs.openclaw.ai/help/faq) | 日志、状态、doctor、gateway 排错路径 |',
          ].join('\n'),
        },
      ],
    },
  ],
  cta: {
    text: '日报跑通了？场景库里还有更多可以直接复用的流程，按需取用 →',
    link: '/module/cases',
  },
};
