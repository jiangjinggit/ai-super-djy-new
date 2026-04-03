import { BarChart2, Bot, Building2, FileText, Layers, Zap } from 'lucide-react';

import type { BaseModuleContent } from '@/types/course';

export const casesModule: BaseModuleContent = {
  title: '场景与案例',
  subtitle: '真实工作流 · 一个场景一个主工具 · 按步骤操作可落地',
  icon: Layers,
  color: 'purple',
  description:
    '6 个真实可落地的工作流场景，每个场景选最合适的工具完整跑通：内容矩阵自动化、行业监控日报、FAQ 客服机器人、Vibe Coding 产品上线、企业知识库、自动化周报。看完能做，而不是看完觉得有道理。',
  keyTakeaways: [
    '用 OpenClaw 搭出内容矩阵自动化流水线：选题 → 写稿 → 飞书审核 → 发布',
    '用 OpenClaw 搭行业竞品监控日报，每天自动推送精选信息到飞书',
    '用 OpenClaw 搭飞书 FAQ 机器人，标准问题自动回复，复杂问题升级人工',
    '用 Cursor 或 Claude Code 把想法做成可上线的产品，掌握国内部署和收款方案',
    '用 FastGPT + OpenClaw 搭企业内部知识库机器人，员工可以"问文档"',
    '用 Claude Code 写数据报告脚本，定时生成并推送到飞书群',
  ],
  sections: [
    {
      title: '内容矩阵自动化',
      content: 'OpenClaw 定时选题 + AI 写稿 + 飞书审核频道 + 发布，从空白开始到跑通全流程。',
      icon: BarChart2,
    },
    {
      title: '行业竞品监控日报',
      content: 'OpenClaw 配置多个信息源，每天早 8:30 自动抓取 + 过滤 + 推送飞书精选日报。',
      icon: Zap,
    },
    {
      title: '飞书 FAQ 客服机器人',
      content: 'OpenClaw 接入飞书，自动回答标准问题，遇到投诉退款立即升级到人工。',
      icon: Bot,
    },
    {
      title: 'Vibe Coding 产品上线',
      content: 'Cursor / Claude Code 从产品描述文档到可访问产品，国内部署 + 收款方案一并解决。',
      icon: Building2,
    },
    {
      title: '企业知识库机器人',
      content: 'FastGPT 上传内部文档 + OpenClaw 接飞书，搭一个员工能"问文档"的问答机器人。',
      icon: Layers,
    },
    {
      title: '自动化数据报告',
      content: 'Claude Code 写数据脚本，从飞书多维表格或 Excel 读数据，生成报告定时推送飞书群。',
      icon: FileText,
    },
  ],
  lessons: [
    {
      title: '内容矩阵自动化：OpenClaw 定时选题写稿到飞书推送',
      content:
        '用 OpenClaw 的 Cron + web-search skill 搭一套内容自动化流水线：每天 8:00 自动搜集选题素材、AI 生成初稿、推送到飞书审核频道，人工确认后可继续推送发布。完整配置可直接复制使用。',
      image: 'cover://content-auto-publish',
      details: [
        '安装 web-search skill，配置 SOUL.md 内容创作规则',
        '设置 Cron：`0 8 * * 1-5`，timezone 必须配 Asia/Shanghai',
        'AGENTS.md 配置信息源、过滤规则和输出格式',
        '飞书审核频道接收初稿，人工回复"发布"或"修改"',
        '微信公众号 API 接入说明（需认证服务号）+ 替代方案',
      ],
      fullContent: [
        {
          subtitle: '1. 为什么从飞书审核，而不是全自动直接发布',
          text: '内容发布涉及观点把关和品牌形象，全自动发布风险太高。飞书审核频道是最合适的中间层：AI 负责选题研究和初稿生成，人工做最后的判断和触发发布，兼顾效率和质量。',
        },
        {
          subtitle: '2. 小红书为什么不能自动发布',
          text: '小红书没有官方内容发布 API，任何"自动发小红书"的方案本质上都是模拟点击，违反平台规则且容易被封号。建议：内容发到飞书审核后，人工手动发小红书，保持安全。',
        },
        {
          subtitle: '3. Cron timezone 是最常犯的配置错误',
          text: '如果不设置 `timezone: Asia/Shanghai`，OpenClaw 会按 UTC 执行。北京时间 8:00 对应 UTC 0:00，所以你会发现 Cron 在凌晨才触发。这个错误很隐蔽，调试时一定要先检查时区配置。',
        },
      ],
    },
    {
      title: '行业竞品监控日报：OpenClaw 自动聚合推送飞书',
      content:
        '用 OpenClaw 配置多个信息源，每天工作日 8:30 自动抓取行业热点和竞品动态，AI 过滤整理成精选日报（最多 5 条），推送到飞书频道。支持竞品异常变化的立即告警。',
      image: 'cover://industry-monitor',
      details: [
        '信息源配置（36氪、少数派、虎嗅、GitHub Trending）',
        'AGENTS.md 过滤规则：保留条件 + 过滤条件 + 紧急告警条件',
        'Cron 配置：`30 8 * * 1-5` + 2 小时 Heartbeat 竞品巡检',
        '飞书两个专用频道：行业日报 + 竞品告警',
        '日报输出格式模板（可直接复制到 AGENTS.md）',
      ],
      fullContent: [
        {
          subtitle: '1. 三层分流：日报、立即告警、静默记录',
          text: '不是所有信息都值得推送。日常行业信息合并到每日日报；竞品重大变化（融资、新功能发布）立即推送 @相关人员；广告软文和低价值内容静默记录到 daily notes。三层分流防止刷屏，也防止遗漏重要信息。',
        },
        {
          subtitle: '2. 信息源质量比数量更重要',
          text: '与其配 20 个信息源每天刷一大堆，不如精选 4-6 个高质量来源，用过滤规则保证每天推送的内容都在你的垂类里。配置多了反而容易噪音多，过滤规则越来越复杂。',
        },
        {
          subtitle: '3. Heartbeat 用于竞品巡检，Cron 用于日报',
          text: 'Heartbeat 适合需要随时检测变化的场景（如竞品定价页面），Cron 适合固定时间点的汇总任务（如日报）。两者配合使用，不要用 Heartbeat 来做日报（太频繁），也不要用 Cron 来做需要实时告警的场景。',
        },
      ],
    },
    {
      title: '飞书 FAQ 客服机器人：OpenClaw 接管标准问题',
      content:
        '用 OpenClaw 接入飞书，配置 FAQ 知识库和消息路由规则：标准问题自动回复，退款投诉立即 @ 负责人，非工作时间自动告知预计回复时间。从飞书机器人创建到 10 个测试场景验收，全程可操作。',
      image: 'cover://faq-bot-feishu',
      details: [
        'FAQ 整理模板：按类别整理 30-50 个问题和标准答案',
        'SOUL.md 客服角色配置：回答范围、风格、禁止事项',
        'AGENTS.md 消息路由：自动回复条件 + 升级关键词 + 非工作时间规则',
        '可选进阶：对接 FastGPT API 处理大量文档型 FAQ',
        '10 个验收测试场景清单',
      ],
      fullContent: [
        {
          subtitle: '1. 先整理 FAQ，再配 AI，而不是反过来',
          text: '很多人先配 AI 客服，发现效果差再去整理 FAQ。正确顺序是反过来：先花 1-2 小时把高频问题和标准答案整理好，再配 AI。AI 的质量上限等于你 FAQ 的质量，跳过这步直接上线会得到很多"我不清楚，请联系人工"的无效回复。',
        },
        {
          subtitle: '2. 升级条件要写具体的关键词，不要靠 AI 判断语义',
          text: '不要写"遇到用户不满意的情况就升级"，这太模糊。要写具体关键词列表："消息含退款/投诉/差评/骗子/质量问题，立即升级"。关键词匹配比语义判断更可靠，不会出现漏判或误判。',
        },
        {
          subtitle: '3. 非工作时间的自动回复是必须的',
          text: '半夜收到消息没有回复，用户体验很差。设置一个"非工作时间自动回复"，告知预计回复时间和紧急联系方式，既专业又避免了用户等待焦虑。这个配置 5 分钟就能做，但体验提升很明显。',
        },
      ],
    },
    {
      title: 'Vibe Coding 产品上线：从想法到可访问的产品',
      content:
        '用 Cursor 或 Claude Code 把一个具体想法做成可访问的产品。从产品描述文档的写法、与 AI 协作的迭代节奏，到国内部署方案（Vercel / 腾讯云函数）和收款方案（爱发电 / 微信支付），一站式解决。',
      image: 'cover://vibe-coding-launch',
      details: [
        '产品描述文档模板（解决什么问题 + 第一版功能 + 不做什么 + 成功标准）',
        '用 AI 扮演用户做 5 轮 "挑剔用户" 测试，提前暴露问题',
        '工具选型：Cursor（推荐）/ Claude Code / 百度秒哒（国内无代理）',
        '迭代节奏：每次只做一个功能，跑通后 git commit 再加下一个',
        '国内收款方案对比：爱发电 / 小报童 / 微信支付 / 出海 Stripe',
      ],
      fullContent: [
        {
          subtitle: '1. 产品描述文档是最被忽视的一步',
          text: '大多数人拿到 Vibe Coding 工具后，第一反应是直接让 AI 开始写代码。但没有清晰的产品描述文档，AI 会不断问你问题，或者按它理解的方向做，结果你总是在纠正方向而不是推进功能。先花 30 分钟写好文档，后面的效率会高 3-5 倍。',
        },
        {
          subtitle: '2. 收款是最常被推迟的事，但必须提前想',
          text: '很多人等产品做好了才发现：个人主体无法接微信支付，Stripe 需要境外主体，爱发电只支持某些场景。提前调研收款方案（通常 1-3 天），避免产品上线了却没法收钱的尴尬。',
        },
        {
          subtitle: '3. 遇到错误不要慌，复制完整错误信息给 AI',
          text: '新手最常犯的错误：遇到报错就说"你的代码有问题，你看看"。AI 无法凭空猜测错误原因。正确做法：复制完整的错误信息（包括文件名和行号），加上"我做了什么操作触发的"，AI 才能精准修复。',
        },
      ],
    },
    {
      title: '企业知识库机器人：FastGPT + OpenClaw 接入飞书',
      content:
        'FastGPT 上传公司内部文档，配置 RAG 问答系统，通过 OpenClaw 接入飞书群。员工 @ 机器人即可查询制度、FAQ、操作手册。包含文档整理方法、20 题测试标准和常见回答质量问题的优化方法。',
      image: 'cover://rag-knowledge-bot',
      details: [
        '文档整理 4 步清理法：删过期、处理扫描件、拆超长、统一格式',
        'FastGPT 配置：cloud.fastgpt.in 注册，知识库创建，分块参数',
        '系统提示词模板：让 AI 只回答知识库内的内容，找不到就说不知道',
        '20 题测试方法：准确率 ≥ 80% 才上线的验收标准',
        'OpenClaw + FastGPT API 对接配置',
      ],
      fullContent: [
        {
          subtitle: '1. 知识库质量等于文档质量，不要跳过文档整理',
          text: '很多企业知识库搭好了却不好用，根本原因是源文档质量差：有过期信息、有矛盾表述、有扫描图片无法读取。RAG 系统会放大这些问题。花在文档整理上的时间，比花在调整 AI 配置上的时间回报更高。',
        },
        {
          subtitle: '2. 必须配置"不知道就说不知道"，不允许 AI 猜测',
          text: '通用大模型的天性是"编"——当知识库里没有答案时，它会用通用知识猜测一个听起来合理的回答。在企业知识库场景，这很危险（错误的制度解读可能造成实际损失）。系统提示词里必须明确：找不到信息就说"知识库没有这方面内容，请联系相关负责人"。',
        },
        {
          subtitle: '3. 每月维护知识库是必要的，不是一次性工作',
          text: '公司制度会变，产品会更新，FAQ 里的答案也会过期。知识库不是"搭好就完事"，而是需要定期维护。建议每月做一次：查看哪些问题被频繁问到、哪些回答不准确，更新对应文档。',
        },
      ],
    },
    {
      title: '自动化数据报告：Claude Code 写脚本定时推送飞书',
      content:
        '用 Claude Code 生成数据报告脚本：从飞书多维表格、Excel 或 CSV 读取数据，AI 格式化成文字报告，通过飞书 Webhook 推送。配置 GitHub Actions 实现云端定时执行，不需要自己的服务器。',
      image: 'cover://auto-report-script',
      details: [
        '飞书 Webhook 配置（5 分钟，不需要开发者账号）',
        '需求描述模板：数据来源 + 指标 + 格式 + 时间',
        '向 Claude Code 描述脚本需求的正确 Prompt 格式',
        '错误调试：复制完整报错信息给 AI 修复的正确方式',
        'GitHub Actions 配置（免费云端定时执行，比本地 crontab 更可靠）',
      ],
      fullContent: [
        {
          subtitle: '1. 飞书 Webhook 是最简单的接入方式，5 分钟搞定',
          text: '很多人以为接入飞书很复杂（要开发者账号、要配权限），但自定义机器人 Webhook 不需要这些。在群设置里加一个自定义机器人，复制 Webhook URL，发一个 curl 命令就能推消息。整个过程 5 分钟。',
        },
        {
          subtitle: '2. 数字准确性必须人工核对，不能全信 AI 生成的脚本',
          text: '脚本跑通了不代表数字对了。第一次运行后，一定要拿脚本计算的结果和你手动核对的数据对比。找到偏差后，把具体情况（期望值 vs 实际值）描述给 Claude Code，它能很快修正逻辑。',
        },
        {
          subtitle: '3. GitHub Actions 比 crontab 更适合生产环境',
          text: 'crontab 在本地运行的问题：电脑睡眠就不执行，换了电脑要重新配，出错了很难排查。GitHub Actions 是云端的，不依赖你的电脑，有完整的执行日志，出错了会发邮件通知。对于"必须可靠运行"的报告脚本，GitHub Actions 是更好的选择。',
        },
      ],
    },
  ],
  cta: {
    text: '看完案例后，回到对应能力模块把自己的版本真正搭起来 → 选择要补的核心能力',
    link: '/',
  },
};
