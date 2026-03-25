import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, 
  Brain, 
  Cpu, 
  Rocket, 
  ChevronRight, 
  Github, 
  Twitter, 
  Menu, 
  X,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Lightbulb,
  Code,
  Layers,
  Star,
  Globe,
  ShieldCheck,
  Lock,
  Share2,
  Bot,
  Users,
  FileText,
  Video,
  MessageSquare,
  Box
} from "lucide-react";
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { BrowserRouter, Routes, Route, useNavigate, useParams, Link, useLocation } from "react-router-dom";

// --- Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// --- Data ---

const NAV_LABELS: Record<string, string> = {
  "super-individual": "入门",
  "llm": "大模型",
  "openclaw": "OpenClaw",
  "scenarios": "场景库",
  "toolbox": "工具箱",
  "cases": "案例",
  "growth": "成长",
};

const MODULE_CONTENT: Record<string, any> = {
  "super-individual": {
    title: "AI 超级个体入门",
    subtitle: "零基础 · 快速上手 · 一人成军",
    icon: Rocket,
    color: "blue",
    description: "理解\"超级个体\"的核心概念，掌握 Prompt Engineering 基础，搭建个人 AI 工具矩阵。从\"知道AI\"走向\"用好AI\"，开启你的超级个体之路。",
    keyTakeaways: [
      "理解超级个体的核心逻辑：AI 如何放大个人产出",
      "掌握万能 Prompt 公式：角色 + 任务 + 约束 + 输出格式",
      "搭建个人 AI 工具矩阵：对话/绘图/搜索/编程",
      "避坑指南：AI 的幻觉、局限性、隐私安全问题"
    ],
    sections: [
      { title: "超级个体认知觉醒", content: "揭开超级个体的面纱，理解为什么 AI 时代是一个人也能成军的元年。", icon: Globe },
      { title: "提示词工程入门", content: "学会与 AI 沟通的艺术，让 AI 真正听懂你的指令。", icon: Bot },
      { title: "工具矩阵搭建", content: "从文本到图像，从搜索到办公，挑选最适合你的 AI 武器库。", icon: Layers }
    ],
    lessons: [
      {
        title: "AI 到底是什么？从图灵测试到 AGI 时代",
        content: "本课将带你穿越 AI 的发展史，理解大模型的本质，并探讨 AI 如何重塑我们的工作与生活。",
        image: "https://picsum.photos/seed/ai-intro/800/450",
        details: ["什么是生成式 AI (GenAI)？", "Transformer 架构：AI 的\"大脑\"是如何工作的", "从 GPT-1 到 GPT-5：模型进化历程", "AGI (通用人工智能) 离我们还有多远？", "AI 时代的职业替代与能力重构", "超级个体的崛起：为什么你不再需要庞大的组织"],
        fullContent: [
          { subtitle: "1. 生成式 AI 的本质", text: "生成式 AI 不仅仅是搜索，它是创造。它通过学习海量人类知识，掌握了语言的统计规律，从而能够根据你的指令生成全新的内容。" },
          { subtitle: "2. 为什么是现在？", text: "算力的爆发、算法优化以及海量高质量数据的积累，使得 AI 在 2020 年代中期实现了质的飞跃，从\"人工智障\"进化为\"数字天才\"。" },
          { subtitle: "3. 你的新身份：AI 导演", text: "在 AI 时代，你不再是单纯的执行者，而是导演。AI 是你的演员、编剧和后期，你的核心价值在于你的审美、决策和跨界整合能力。" }
        ]
      },
      {
        title: "Prompt Engineering：如何让 AI 成为你的顶级员工",
        content: "提示词工程（Prompt Engineering）是 AI 时代最重要的沟通技能。学会这套公式，你就能释放大模型 200% 的潜力。",
        image: "https://picsum.photos/seed/prompt/800/450",
        details: ["万能 Prompt 公式：角色 + 任务 + 约束 + 输出格式", "少样本提示 (Few-Shot)：给 AI 几个例子", "思维链 (CoT)：引导 AI 逐步思考", "结构化提示词：利用 Markdown 让 Prompt 更清晰", "Prompt 调优：如何通过迭代获得完美答案", "避坑指南：如何减少 AI 的幻觉与胡言乱语"],
        fullContent: [
          { subtitle: "1. 角色设定的重要性", text: "给 AI 一个身份（如\"资深架构师\"或\"顶级文案专家\"），能显著提升其回答的专业度和语气。这本质上是在引导模型在特定的参数空间内进行预测。" },
          { subtitle: "2. 任务描述要具体", text: "模糊的指令只会得到平庸的回答。明确你的目标、受众、字数限制和语气要求，越具体，AI 的表现就越出色。" },
          { subtitle: "3. 幻觉问题：为什么它会乱编？", text: "由于 LLM 是基于概率生成的，当它面对知识盲区时，为了完成\"接龙\"，它可能会编造出听起来非常合理的错误信息。这就是所谓的\"幻觉\"。" }
        ]
      },
      {
        title: "超级个体思维：如何利用 AI 放大个人价值",
        content: "在 AI 时代，一个人就是一支团队。超级个体不再依赖庞大的组织，而是通过 AI 工具矩阵，实现从创意到执行的全流程闭环。",
        image: "https://picsum.photos/seed/super/800/450",
        details: ["杠杆效应：AI 是你的智力杠杆，放大你的产出", "低成本试错：AI 降低了从 0 到 1 的创业门槛", "个人品牌：利用 AI 辅助内容产出与全平台分发", "未来趋势：AI Agent 驱动的个人自动化工作室", "跨界能力：AI 帮你快速跨越不同领域的知识鸿沟", "行动指南：从今天开始构建你的超级个体计划"],
        fullContent: [
          { subtitle: "1. 什么是超级个体？", text: "超级个体是指那些能够熟练运用 AI 和数字化工具，独立完成复杂项目，并直接面向市场交付价值的人。他们不依附于公司，而是依附于自己的能力网。" },
          { subtitle: "2. AI 带来的能力溢出", text: "以前你需要请设计师、程序员、文案策划。现在，通过 AI，你一个人就能完成这些工作。AI 弥补了你的短板，让你的长板无限延伸。" },
          { subtitle: "3. 商业模式的变革", text: "超级个体的商业模式通常是：极低成本、高自动化、高单价。他们通过 AI 处理 80% 的琐事，将 20% 的精力投入到最具创造力的决策中。" }
        ]
      }
    ],
    cta: { text: "掌握了基础？进阶了解大模型实战 → 探索大模型实战库", link: "/module/llm" }
  },
  "llm": {
    title: "大模型实战库",
    subtitle: "不堆理论 · 场景驱动 · 即学即用",
    icon: Brain,
    color: "purple",
    description: "深度解析 ChatGPT、Claude、DeepSeek、Gemini 等主流大模型。按场景分类提供 Prompt 模板，帮你为 OpenClaw 配置最强\"大脑\"。",
    keyTakeaways: [
      "全球大模型格局：ChatGPT vs Claude vs DeepSeek vs Gemini",
      "国产大模型对比：DeepSeek、Kimi、通义千问、文心一言",
      "模型选型：推理能力、长上下文、成本的权衡",
      "实战：获取 API Key 并完成 OpenClaw 配置"
    ],
    sections: [
      { title: "2026 大模型全景图", content: "从 OpenAI 到 DeepSeek，带你俯瞰当前最前沿的 AI 技术版图。", icon: Layers },
      { title: "场景化 Prompt 模板", content: "按写作、设计、编程、运营分类，提供可直接复用的 Prompt 模板。", icon: Star },
      { title: "API 配置实战", content: "手把手教你获取 API Key，在 OpenClaw 中配置模型。", icon: Cpu }
    ],
    lessons: [
      {
        title: "全球主流大模型全景图：谁才是真正的王者？",
        content: "从 OpenAI 的 GPT 系列到 Anthropic 的 Claude，再到 Google Gemini 和国内的 DeepSeek、Kimi。深度剖析各大模型的\"性格\"与\"特长\"。",
        image: "https://picsum.photos/seed/models/800/450",
        details: ["ChatGPT (OpenAI): 全能冠军，多模态交互标杆", "Claude (Anthropic): 逻辑、编程与安全性的执着者", "Gemini (Google): 超长上下文与生态整合", "DeepSeek: 国产黑马，极致性价比", "Kimi (月之暗面): 超长上下文处理专家", "如何参考 LMSYS 等权威排行榜"],
        fullContent: [
          { subtitle: "1. OpenAI: 行业的领跑者", text: "GPT-4o 是目前旗舰模型之一，不仅在逻辑推理上处于第一梯队，其多模态能力——能实时看懂视频、听懂情绪，是目前最接近 AGI 的产品之一。" },
          { subtitle: "2. Anthropic: 逻辑与安全的执着者", text: "Claude 系列在编程和复杂逻辑推理上经常超越同类产品。它的语气更自然，更少\"AI味\"，是很多专业开发者的首选。" },
          { subtitle: "3. 国产力量：更懂中文场景", text: "DeepSeek 凭借推理模型打破技术壁垒；Kimi 以超长上下文处理能力出圈；通义千问在企业级应用和中文语境理解上表现稳健。" }
        ]
      },
      {
        title: "模型选择指南：不选最贵的，只选最对的",
        content: "面对琳琅满目的模型，如何根据需求和预算做出选择？从逻辑能力、响应速度、上下文长度、价格和多模态支持五个维度拆解。",
        image: "https://picsum.photos/seed/choice/800/450",
        details: ["逻辑复杂度：简单任务 vs 复杂推理", "响应延迟：实时对话 vs 异步处理", "长文本需求：处理 10 万字文档需要什么模型？", "成本控制：API 调用计费模式与节省策略", "多模态支持：是否需要识别图片或生成语音", "合规性与隐私：数据安全与国产化替代"],
        fullContent: [
          { subtitle: "维度 1：逻辑深度", text: "简单邮件或总结，轻量级模型就足够了，速度快且便宜。复杂代码或法律合同，必须上旗舰模型。" },
          { subtitle: "维度 2：上下文长度", text: "如果你需要 AI 分析整个项目的代码文件或总结一整年的财务报表，你需要关注模型的 Context Window。Gemini 在这方面是王者。" },
          { subtitle: "维度 3：成本与 API 额度", text: "对于开发者来说，API 的价格和调用频率限制是核心考量。DeepSeek 等国产模型通过低成本方案为个人开发者提供了实惠选择。" }
        ]
      },
      {
        title: "为 OpenClaw 配置模型 API：开启自动化之路",
        content: "想要在 OpenClaw 中使用大模型，你需要获取 API Key。本课将手把手教你注册账号、创建 Key 以及在 OpenClaw 中配置。",
        image: "https://picsum.photos/seed/api/800/450",
        details: ["API 基础知识：什么是 API Key？", "OpenAI API 注册与充值全流程", "DeepSeek 开放平台注册与 API 获取", "国内大模型 API (Kimi/阿里/百度) 申请", "中转 API 与聚合平台的优劣", "OpenClaw 配置实操：填入 Key，激活 AI 助手"],
        fullContent: [
          { subtitle: "1. API Key 的本质", text: "API Key 就像是你的\"数字身份证\"和\"钱包\"。通过它，OpenClaw 可以代表你向大模型发送请求，并从你的账户余额中扣除相应的费用。" },
          { subtitle: "2. 安全第一：不要泄露你的 Key", text: "永远不要在公开场合展示你的 API Key。一旦泄露，别人可以瞬间耗尽你的余额。学会使用环境变量来管理这些敏感信息。" }
        ]
      }
    ],
    cta: { text: "选择好模型了？前往 OpenClaw 配置实战 → 学习 OpenClaw 实战专区", link: "/module/openclaw" }
  },
  "openclaw": {
    title: "OpenClaw 实战专区",
    subtitle: "开源 · 自动化 · 本地部署",
    icon: Cpu,
    color: "emerald",
    description: "OpenClaw 是一个开源 AI 助手框架，支持本地部署，通过 Skills 技能系统实现邮件、日历、文件、浏览器等自动化。超级个体必学的效率神器。",
    keyTakeaways: [
      "理解 OpenClaw 架构：本地部署、Skills 技能系统、多渠道接入",
      "掌握 10 个超级个体必用工作流",
      "从安装配置到实战应用的完整路径",
      "解决常见部署问题与性能优化"
    ],
    sections: [
      { title: "OpenClaw 是什么？", content: "开源 AI 助手框架，支持 Telegram/WhatsApp/Discord/飞书/钉钉等多渠道，1700+ Skills 技能插件。", icon: Code },
      { title: "安装与配置", content: "从零开始安装 OpenClaw，配置 API Key，连接你的消息渠道。", icon: Rocket },
      { title: "实战工作流", content: "邮件自动处理、日程管理、文件整理、浏览器自动化等真实场景。", icon: Layers }
    ],
    lessons: [
      {
        title: "OpenClaw 快速上手：30 分钟完成安装与配置",
        content: "学习如何在本地快速部署 OpenClaw，配置 API Key，并连接你常用的消息渠道（Telegram/微信/飞书等）。",
        image: "https://picsum.photos/seed/openclaw-setup/800/450",
        details: ["系统要求与环境准备", "安装 OpenClaw（Docker / 源码方式）", "配置 LLM API Key（DeepSeek / OpenAI）", "连接消息渠道（Telegram / WhatsApp / 飞书）", "基础对话测试与调优", "常见安装问题排查"],
        fullContent: [
          { subtitle: "1. OpenClaw 简介", text: "OpenClaw 是一个开源 AI 助手项目，核心理念是让用户可以本地部署自己的 AI 助手，通过丰富的 Skills 技能系统实现各种自动化任务。支持 Telegram、WhatsApp、Discord、飞书、钉钉等多渠道接入。" },
          { subtitle: "2. 安装步骤", text: "OpenClaw 提供多种安装方式。Docker 方式最简单，一行命令即可启动。也可以从源码安装进行自定义配置。安装后需要配置至少一个 LLM API Key（推荐使用 DeepSeek，性价比高）。" },
          { subtitle: "3. 连接消息渠道", text: "通过简单的配置文件，你可以让 OpenClaw 接入你常用的聊天工具。配置完成后，你就可以在 Telegram 或飞书中直接与你的 AI 助手对话了。" }
        ]
      },
      {
        title: "Skills 技能系统：解锁 1700+ 自动化能力",
        content: "OpenClaw 的 ClawHub 平台上有 1700+ Skills 技能插件，覆盖邮件、日历、文件管理、浏览器控制等多个领域。",
        image: "https://picsum.photos/seed/openclaw-skills/800/450",
        details: ["ClawHub 技能市场：浏览和安装 Skills", "邮件自动分类与回复", "日历/日程智能管理", "文件批量整理与重命名", "浏览器自动化（网页抓取/填表）", "自定义 Skill 开发入门"],
        fullContent: [
          { subtitle: "1. 什么是 Skills？", text: "Skills 是 OpenClaw 的核心扩展机制。每个 Skill 都是一个独立的功能模块，让你的 AI 助手获得特定能力。ClawHub 社区已经贡献了 1700+ 个 Skills。" },
          { subtitle: "2. 必装 Skills 推荐", text: "邮件管理（自动分类、智能回复）、日历管理（日程提醒、会议安排）、文件管理（批量重命名、格式转换）、浏览器控制（网页抓取、自动填表）是最常用的四大类 Skills。" },
          { subtitle: "3. 自定义开发", text: "如果你有特殊需求，可以开发自己的 Skill。OpenClaw 提供了清晰的开发文档和模板，有编程基础的用户可以在几小时内完成一个基础 Skill。" }
        ]
      },
      {
        title: "超级个体必用 10 个工作流",
        content: "精心整理的 10 个 OpenClaw 工作流，涵盖内容创作、客户服务、数据分析等超级个体高频场景。",
        image: "https://picsum.photos/seed/openclaw-workflow/800/450",
        details: ["工作流 1：自动写稿（选题→大纲→全文→排版）", "工作流 2：自动剪辑（素材整理→字幕生成→输出）", "工作流 3：自动客服（常见问题→智能回复→工单）", "工作流 4：邮件自动处理（分类→优先级→草拟回复）", "工作流 5：日程智能管理（日历同步→提醒→冲突检测）", "工作流 6：数据自动整理（表格清洗→汇总→可视化）", "工作流 7：竞品自动监控（定期抓取→对比→报告）", "工作流 8：社媒内容自动发布（生成→排版→定时发布）", "工作流 9：文件自动归档（分类→重命名→备份）", "工作流 10：学习笔记自动整理（摘要→标签→知识库）"],
        fullContent: [
          { subtitle: "1. 内容创作工作流", text: "结合选题分析、大纲生成、全文撰写、排版优化的完整工作流。你可以设置定时任务，每天自动根据热点生成初稿，你只需要审核和修改即可。" },
          { subtitle: "2. 客户服务工作流", text: "OpenClaw 可以接入你的客服渠道，自动识别常见问题并给出智能回复。复杂问题自动创建工单并通知你处理，大幅提升响应速度。" },
          { subtitle: "3. 数据整理工作流", text: "定期自动从指定文件夹或网盘读取数据文件，进行清洗、汇总和格式转换，生成可视化报告。适合需要定期做数据分析的超级个体。" }
        ]
      }
    ],
    cta: { text: "掌握了 OpenClaw？去场景库看看更多实战 → 探索超级个体场景库", link: "/module/scenarios" }
  },
  "scenarios": {
    title: "超级个体场景库",
    subtitle: "按职业分类 · 工具组合 · 真实案例",
    icon: Zap,
    color: "orange",
    description: "按职业和副业分类，每个场景提供工具组合+流程+案例。内容创作者、设计师、程序员、电商从业者都能找到适合你的 AI 工作流。",
    keyTakeaways: [
      "掌握按职业分类的 AI 工具组合方案",
      "学会构建完整的个人 AI 工作流",
      "了解不同场景下的真实应用案例",
      "探索 AI 变现的多种路径"
    ],
    sections: [
      { title: "内容创作者", content: "自媒体、博主、UP主如何用 AI 提效：选题、写稿、配图、剪辑全流程。", icon: Video },
      { title: "设计师 / 程序员", content: "AI 辅助设计与编程：从 Midjourney 出图到 Cursor 写代码。", icon: Code },
      { title: "电商 / 自由职业", content: "AI 选品、AI 客服、AI 数据分析，一人公司的高效运营。", icon: Bot }
    ],
    lessons: [
      {
        title: "内容创作者：用 AI 打造日更自媒体矩阵",
        content: "如何利用 AI 找选题、写脚本、配图、剪辑？拆解完整的自媒体 AI 工作流，让一个人产出十人团队的内容量。",
        image: "https://picsum.photos/seed/media/800/450",
        details: ["选题挖掘：AI 分析热点与用户痛点", "爆款标题生成：心理学钩子公式", "视频脚本拆解：黄金 3 秒与留存钩子", "AI 批量生成配图与封面", "AI 配音与字幕自动生成", "多平台分发与数据反馈分析"],
        fullContent: [
          { subtitle: "1. 选题的艺术", text: "AI 可以帮你分析成千上万条热门评论和搜索趋势，找出用户最关心的问题，从而精准定位你的内容方向。" },
          { subtitle: "2. 脚本的结构化生产", text: "通过设定特定的角色和受众，AI 可以帮你写出极具共鸣感的文案，并自动标注出适合插入素材的时间点。" }
        ]
      },
      {
        title: "AI 辅助编程：从小白到独立开发者的捷径",
        content: "利用 Cursor、GitHub Copilot 等工具，通过自然语言描述需求，让 AI 帮你写代码。不会编程也能做产品。",
        image: "https://picsum.photos/seed/code/800/450",
        details: ["Cursor: 最好用的 AI 编程编辑器", "如何向 AI 描述复杂的业务逻辑", "代码调试 (Debug) 的 AI 技巧", "利用 AI 快速学习新框架", "构建并部署你的第一个产品", "代码安全与最佳实践"],
        fullContent: [
          { subtitle: "1. 自然语言驱动开发", text: "现在的编程更像是'对话'。你只需要描述需求，AI 就能帮你搭建好基础框架。Cursor 是目前最主流的 AI 编程工具。" },
          { subtitle: "2. 快速学习新领域", text: "遇到看不懂的代码？直接让 AI 逐行解释。它是你 24 小时在线的顶级编程导师。" }
        ]
      },
      {
        title: "电商 / 自由职业：一人公司的高效运营",
        content: "AI 选品、AI 客服、AI 数据分析。探索如何用 AI 让一个人的电商/自由职业团队达到传统 5-10 人团队的效率。",
        image: "https://picsum.photos/seed/ecommerce/800/450",
        details: ["AI 选品：利用数据分析找到蓝海市场", "AI 客服：24 小时智能回复与问题分类", "AI 运营：文案、投放、数据分析自动化", "AI 设计：产品图、详情页批量生成", "AI 财务：收支分析与报表自动化", "自由职业者：项目管理与客户沟通提效"],
        fullContent: [
          { subtitle: "1. AI 选品策略", text: "利用 AI 分析电商平台数据、社交媒体趋势和用户评论，找到高需求低竞争的产品方向。这比传统的'凭感觉选品'效率高出数倍。" },
          { subtitle: "2. 自动化客服系统", text: "通过 OpenClaw + AI 模型搭建 24 小时客服系统，自动处理 80% 的常见问题，复杂问题再转人工。大幅节省人力成本。" }
        ]
      }
    ]
  },
  "toolbox": {
    title: "超级个体工具箱",
    subtitle: "免费 · 低价 · 精选推荐",
    icon: Layers,
    color: "blue",
    description: "精选免费/低价 AI 工具合集 + 一人公司效率栈（Notion+AI+自动化+OpenClaw）。帮你找到最适合的 AI 工具组合，不花冤枉钱。",
    keyTakeaways: [
      "2026 年最值得关注的 AI 工具全景",
      "免费/低价工具替代方案（不花冤枉钱）",
      "一人公司效率栈搭建指南",
      "按场景匹配最佳工具组合"
    ],
    sections: [
      { title: "AI 对话工具", content: "ChatGPT、Claude、DeepSeek、Kimi、通义千问等主流对话模型的对比与选型。", icon: Bot },
      { title: "AI 创意工具", content: "Midjourney、可灵(Kling)、Suno、Gamma 等视觉/音乐/演示工具。", icon: Star },
      { title: "一人公司效率栈", content: "Notion + AI + 自动化 + OpenClaw 的完整效率工具链。", icon: Rocket }
    ],
    lessons: [
      {
        title: "2026 AI 工具全景：对话、绘图、视频、编程一站全览",
        content: "为你梳理 2026 年最值得关注的 AI 工具，涵盖对话、绘图、视频生成、编程辅助、AI 搜索等全场景。",
        image: "https://picsum.photos/seed/tools2026/800/450",
        details: ["对话类：ChatGPT (全能) / Claude (逻辑) / DeepSeek (性价比)", "国产推荐：Kimi (长文本) / 通义千问 (办公) / 文心一言 (知识库)", "创意绘图：Midjourney / DALL-E / Flux.1 / 通义万相", "视频生成：可灵 Kling / Sora / Runway", "AI 搜索：Perplexity / 秘塔AI搜索", "编程辅助：Cursor / GitHub Copilot / Windsurf"],
        fullContent: [
          { subtitle: "1. 对话类工具", text: "ChatGPT 依然是最均衡的选择；Claude 在逻辑严密性和代码编写上优势独特；DeepSeek 以极高性价比和强大的中文理解力成为国产黑马。" },
          { subtitle: "2. 视觉与视频", text: "Midjourney 依然统治艺术绘图领域；国产可灵(Kling)在视频生成方面表现突出；Suno 则是 AI 音乐生成的首选。" },
          { subtitle: "3. 编程与效率", text: "Cursor 是目前最主流的 AI 编程编辑器，通过自然语言对话即可生成代码；Perplexity 改变了信息获取方式，直接总结答案并附引用来源。" }
        ]
      },
      {
        title: "免费/低价工具替代方案：不花冤枉钱",
        content: "很多付费 AI 工具都有免费的替代方案。本课帮你找到性价比最高的工具组合，用最少的钱获得最大的价值。",
        image: "https://picsum.photos/seed/free-tools/800/450",
        details: ["DeepSeek：免费模型能力媲美 GPT-4", "Kimi：200 万字长文本免费使用", "Stable Diffusion：免费本地部署替代 Midjourney", "Ollama：免费本地运行开源大模型", "Zotero + AI：免费文献管理与知识库", "LibreOffice + AI：免费替代 Office 365 Copilot"],
        fullContent: [
          { subtitle: "1. 免费模型的力量", text: "DeepSeek 提供了免费额度，其模型能力在多项评测中接近甚至超过 GPT-4 水平。Kimi 同样提供 generous 的免费额度，200 万字上下文处理能力。" },
          { subtitle: "2. 本地部署方案", text: "通过 Ollama 或 LM Studio，你可以在本地免费运行 Llama、Qwen 等开源大模型。配合 Stable Diffusion，你可以完全不花钱实现 AI 绘图。" }
        ]
      },
      {
        title: "一人公司效率栈：从 Notion 到 OpenClaw",
        content: "搭建完整的个人效率工具链：Notion (知识管理) + AI (内容生成) + 自动化 (Zapier/n8n) + OpenClaw (AI 助手)。",
        image: "https://picsum.photos/seed/efficiency-stack/800/450",
        details: ["Notion：个人知识管理与项目管理", "AI 对话工具：内容生成与问题解决", "自动化工具：Zapier / n8n 连接一切", "OpenClaw：24/7 AI 助手处理琐事", "数据同步与备份策略", "实际案例：我的效率栈配置"],
        fullContent: [
          { subtitle: "1. 为什么需要效率栈？", text: "单个工具只能解决单个问题。一套整合的效率栈能打通信息孤岛，让数据在工具间自动流转，实现\"设置一次，自动运行\"的效果。" },
          { subtitle: "2. 推荐组合方案", text: "Notion 做知识和项目管理大脑，OpenClaw 做日常自动化助手，Cursor 做开发工具，Perplexity 做信息检索。这四个工具覆盖了超级个体 90% 的需求。" }
        ]
      }
    ]
  },
  "cases": {
    title: "真实案例库",
    subtitle: "可验证 · 公开报道 · 深度拆解",
    icon: Users,
    color: "purple",
    description: "精选公开报道的\"1人+AI\"真实案例，拆解他们用了什么工具、做了什么、收入如何。不画大饼，只讲事实。",
    keyTakeaways: [
      "了解真实的 AI 创业案例与收入数据",
      "拆解成功案例的工具组合与工作流",
      "认识 AI 创业的真实困难与挑战",
      "找到适合你的 AI 变现路径"
    ],
    sections: [
      { title: "海外案例", content: "Ishan Sharma、Every 公司等公开报道的真实 AI 创业故事。", icon: Globe },
      { title: "国内案例", content: "被裁程序员、自由职业者用 AI 创业的真实经历。", icon: Users },
      { title: "避坑指南", content: "AI 创业常见误区、真实困难与应对策略。", icon: ShieldCheck }
    ],
    lessons: [
      {
        title: "案例拆解：Ishan Sharma 如何用 8 个 AI 工具运营 300 万粉丝",
        content: "Ishan Sharma 是一位印度 YouTuber，在 TED2025 上分享了如何用 8 个 AI 工具将团队从 40 人缩减到 25 人，同时维持 300 万粉丝的内容产出。（来源：TED2025 / 网易报道）",
        image: "https://picsum.photos/seed/ishan/800/450",
        details: ["背景：印度知名科技 YouTuber，300 万订阅", "8 个 AI 工具：ChatGPT / Claude / Midjourney / Cursor 等", "团队精简：40 人 → 25 人，效率不降反升", "核心策略：AI 负责草稿和初版，人类负责创意决策", "关键认知：AI 不是替代人，而是让每个人产出 10 倍", "启示：内容创作者的核心价值在于审美和判断力"],
        fullContent: [
          { subtitle: "1. 背景与工具组合", text: "Ishan Sharma 在 TED2025 演讲中详细介绍了他使用的 8 个 AI 工具：ChatGPT 用于脚本初稿，Claude 用于深度研究，Midjourney 用于缩略图，Cursor 用于网站开发，以及用于视频剪辑、SEO 优化等环节的 AI 工具。" },
          { subtitle: "2. 团队变化", text: "通过引入 AI 工具，他的团队从 40 人缩减到 25 人，但内容产出量反而增加了。AI 处理了脚本初稿、素材整理、SEO 优化等重复性工作，让团队成员可以专注于创意和策略。" },
          { subtitle: "3. 核心观点", text: "Ishan 强调：AI 不会取代内容创作者，但会用 AI 的创作者会取代不会用的人。他建议每个人都应该学会至少 3 个 AI 工具。" }
        ]
      },
      {
        title: "案例拆解：Samuel 从配镜师到程序员，3 个月收入 $35K",
        content: "Samuel 原本是一名配镜师，通过复制成功的应用并利用 AI 工具学习编程，在 3 个月内实现了月收入 3.5 万美元。（来源：腾讯云 2025.9 报道）",
        image: "https://picsum.photos/seed/samuel/800/450",
        details: ["背景：配镜师转行，零编程基础", "方法：复制已有成功应用的商业模式", "工具：Cursor / ChatGPT 辅助学习编程", "时间线：3 个月达到 $35K/月收入", "关键策略：找到验证过的市场需求，用 AI 降低技术门槛", "风险提示：复制模式有法律风险，需注意知识产权"],
        fullContent: [
          { subtitle: "1. 转型路径", text: "Samuel 的核心策略是：不发明轮子，而是找到已有成功的小型应用（如工具类 App），用 AI 工具快速复制并改进。Cursor 帮他处理了大部分编码工作，ChatGPT 帮他理解业务逻辑。" },
          { subtitle: "2. 收入数据", text: "根据腾讯云报道，Samuel 在转型 3 个月后月收入达到 3.5 万美元。但需注意，这是经过筛选报道的案例，不代表普遍水平。大多数人的转型过程会更长、更艰难。" },
          { subtitle: "3. 需要注意的风险", text: "复制模式存在知识产权风险。更重要的是，Samuel 有配镜师的工作收入支撑转型期，并非完全从零开始。AI 创业不能保证快速成功，需要充分的准备和持续的学习。" }
        ]
      },
      {
        title: "案例拆解：Every 公司 15 人团队如何实现 7 位数营收",
        content: "Every 是一家美国媒体公司，通过大量使用 AI 自动化工具，仅 15 人团队实现了 7 位数的年营收。（来源：腾讯云 2026.3 报道）",
        image: "https://picsum.photos/seed/every-co/800/450",
        details: ["背景：美国媒体公司，垂直领域内容", "团队：仅 15 人，实现 7 位数年营收", "AI 应用：内容生成、编辑、分发全流程", "核心理念：AI 负责生产，人类负责质量和方向", "关键洞察：小团队 + AI 可以挑战大公司", "适用性分析：这个模式适合有媒体经验的人"],
        fullContent: [
          { subtitle: "1. Every 的 AI 策略", text: "Every 团队在内容生产的各个环节都引入了 AI：选题分析用 AI 搜索数据，初稿由 AI 撰写，编辑用 AI 辅助校对，分发用 AI 优化 SEO。人类编辑主要负责质量把控和方向决策。" },
          { subtitle: "2. 关键成功因素", text: "Every 的成功不仅因为用了 AI，更因为他们有深厚的媒体行业经验。AI 是加速器，不是起点。团队对内容质量的把控能力才是核心竞争力。" },
          { subtitle: "3. 对普通人的启示", text: "如果你想复制这种模式，首先要在某个垂直领域建立专业能力，然后再用 AI 放大你的产出。AI 不能替代专业知识。" }
        ]
      }
    ]
  },
  "growth": {
    title: "成长路径",
    subtitle: "分阶段 · 可执行 · 循序渐进",
    icon: BookOpen,
    color: "emerald",
    description: "从零基础到独立运营 AI 业务的成长路线图。分阶段规划你该学什么、做什么，避免走弯路。不承诺暴富，只提供务实的成长建议。",
    keyTakeaways: [
      "阶段 0：建立 AI 基础认知，搭建工具矩阵",
      "阶段 1：找到你的垂直领域，用 AI 提效",
      "阶段 2：构建个人产品或服务，开始变现",
      "持续学习：关注行业动态，不断迭代"
    ],
    sections: [
      { title: "阶段 0：入门", content: "了解 AI 基础概念，学会使用 ChatGPT/DeepSeek，掌握基本 Prompt 技巧。", icon: Lightbulb },
      { title: "阶段 1：提效", content: "在现有工作中深度使用 AI，找到你的垂直领域优势。", icon: Zap },
      { title: "阶段 2：变现", content: "构建个人产品或服务，探索 AI 变现路径。", icon: Rocket }
    ],
    lessons: [
      {
        title: "阶段 0（1-2 周）：建立 AI 基础认知",
        content: "目标：了解 AI 基本概念，学会使用 3 个以上的 AI 工具，掌握基本 Prompt 技巧，为后续学习打下基础。",
        image: "https://picsum.photos/seed/phase0/800/450",
        details: ["Day 1-3：注册并使用 ChatGPT / DeepSeek，了解基本对话", "Day 4-7：学习 Prompt Engineering 基础公式", "Day 8-10：尝试 Midjourney / 可灵等创意工具", "Day 11-14：整理个人 AI 工具清单，建立工作流雏形", "推荐资源：本站 AI 超级个体入门模块", "里程碑：能用 AI 独立完成一个简单任务（写文章/做PPT）"],
        fullContent: [
          { subtitle: "1. 核心任务", text: "这个阶段的目标不是精通，而是\"上手\"。你需要亲自使用 3 个以上的 AI 工具，体验它们的能力边界。不需要学底层原理，只需要知道它们能做什么、不能做什么。" },
          { subtitle: "2. 学习建议", text: "不要追求完美，先动手。哪怕只是用 ChatGPT 帮你写一封邮件、用 Midjourney 生成一张图片，都是好的开始。关键是建立\"AI 能帮我做事\"的直觉。" }
        ]
      },
      {
        title: "阶段 1（1-3 月）：深度使用 AI 提效",
        content: "目标：在现有工作或副业中深度使用 AI，将效率提升 3-5 倍，找到你感兴趣且擅长的垂直领域。",
        image: "https://picsum.photos/seed/phase1/800/450",
        details: ["在当前工作中找到 3 个可用 AI 优化的环节", "为每个环节搭建 AI 辅助工作流", "学习 OpenClaw 等自动化工具", "开始在小红书/知乎/公众号等平台发布 AI 相关内容", "加入 AI 社群，持续学习交流", "里程碑：工作效率明显提升，开始积累个人品牌"],
        fullContent: [
          { subtitle: "1. 找到提效切入点", text: "回顾你每天的日常工作，找到最耗时的 3 个环节。通常这些环节有一定的重复性或规律性，最适合引入 AI。不要试图一次性改变所有工作方式，从小处着手。" },
          { subtitle: "2. 持续输出", text: "在社交媒体上分享你的 AI 使用经验和心得。这不仅能帮你积累个人品牌，还能倒逼你持续学习和思考。很多超级个体的起点都是从分享开始的。" }
        ]
      },
      {
        title: "阶段 2（3-6 月）：探索变现路径",
        content: "目标：基于你的垂直领域专业知识和 AI 能力，构建个人产品或服务，开始探索变现方式。",
        image: "https://picsum.photos/seed/phase2/800/450",
        details: ["方向 1：AI 辅助咨询/服务（如 AI 培训、Prompt 定制）", "方向 2：AI 工具/产品开发（如浏览器插件、小程序）", "方向 3：内容变现（课程、专栏、付费社群）", "方向 4：一人公司（用 AI 运营电商/自媒体）", "重要提醒：不要辞去主业，先从副业开始验证", "里程碑：获得第一笔 AI 相关收入"],
        fullContent: [
          { subtitle: "1. 选择变现方向", text: "根据你在阶段 1 积累的专业知识和技能来选择变现方向。如果你擅长写作，可以考虑内容变现；如果你擅长编程，可以开发 AI 工具；如果你擅长培训，可以做 AI 课程。" },
          { subtitle: "2. 小步快跑，快速验证", text: "不要花 3 个月打磨一个\"完美产品\"然后才上线。先做一个 MVP（最小可行产品），快速获取用户反馈，然后迭代改进。AI 的优势之一就是帮你快速试错。" },
          { subtitle: "3. 管理预期", text: "根据公开报道的案例，从开始学习 AI 到实现稳定收入，通常需要 3-6 个月甚至更长。不要被\"月入 10 万\"的标题误导，大多数人的成长曲线是缓慢上升的。关键是持续行动，不放弃。" }
        ]
      }
    ]
  }
};

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAction = () => {
    toast.success("即将开启您的超级个体之旅！", {
      description: "该功能正在开发中，敬请期待。",
    });
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? "bg-black/80 backdrop-blur-md border-white/10 py-4" 
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)]">
            <Zap className="text-white fill-white" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">AI Superman <span className="text-blue-500">DJY</span></span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">首页</Link>
          {Object.entries(MODULE_CONTENT).map(([id]) => (
            <Link 
              key={id} 
              to={`/module/${id}`} 
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              {NAV_LABELS[id] || id}
            </Link>
          ))}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAction}
            className="px-5 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
          >
            开启超级个体
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-black border-b border-white/10 p-6 flex flex-col gap-4"
          >
            <Link to="/" className="text-lg font-medium text-gray-400" onClick={() => setIsMobileMenuOpen(false)}>首页</Link>
            {Object.entries(MODULE_CONTENT).map(([id]) => (
              <Link 
                key={id} 
                to={`/module/${id}`} 
                className="text-lg font-medium text-gray-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {NAV_LABELS[id] || id}
              </Link>
            ))}
            <motion.button 
              whileTap={{ scale: 0.98 }}
              onClick={handleAction}
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl"
            >
              开启超级个体
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  
  const handleStart = () => {
    const modulesSection = document.getElementById("modules");
    if (modulesSection) {
      modulesSection.scrollIntoView({ behavior: "smooth" });
      toast("已为您定位到核心模块", {
        icon: <Rocket className="text-blue-500" size={16} />,
      });
    }
  };

  const handleLearnMore = () => {
    const communitySection = document.getElementById("community");
    if (communitySection) {
      communitySection.scrollIntoView({ behavior: "smooth" });
      toast.info("正在为您跳转到社区加入区域");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-600/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-400/10 border border-blue-400/20 rounded-full">
            让每个人成为超级个体
          </span>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white mb-10 leading-[1.1]">
            AI Superman <br className="my-2" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              EVOLUTION
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-10 leading-relaxed">
            探索人工智能的无限可能。从零基础入门到掌握前沿大模型，
            DJY 助你打破边界，重塑自我，成为时代的超级个体。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStart}
              className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black text-lg rounded-2xl hover:from-blue-500 hover:to-purple-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] cursor-pointer"
            >
              开始探索
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLearnMore}
              className="w-full sm:w-auto px-10 py-5 bg-white text-blue-600 font-black text-lg rounded-2xl hover:bg-gray-100 transition-all shadow-2xl cursor-pointer"
            >
              了解更多
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-500 z-20"
      >
        <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-gray-500 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

const ModuleCard = ({ title, desc, icon: Icon, color, index, id }: any) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.08)" }}
      whileTap={{ scale: 0.98 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={() => {
        toast.success(`已进入: ${title}`, { description: "正在加载学习资源..." });
        navigate(`/module/${id}`);
      }}
      className="group relative p-8 bg-white/5 border border-white/10 rounded-3xl transition-all cursor-pointer overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-600/10 blur-3xl group-hover:bg-${color}-600/20 transition-all`} />
      
      <div className={`w-14 h-14 mb-6 rounded-2xl bg-${color}-600/20 flex items-center justify-center text-${color}-400 group-hover:scale-110 transition-transform`}>
        <Icon size={28} />
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed mb-6">
        {desc}
      </p>
      
      <div className="flex items-center text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
        进入模块 <ChevronRight size={16} className="ml-2 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
};

const Modules = () => {
  const modules = [
    {
      id: "super-individual",
      title: "AI 超级个体入门",
      desc: "从\"知道AI\"到\"用好AI\"。理解超级个体逻辑，掌握 Prompt 基础，搭建个人 AI 工具矩阵。",
      icon: Rocket,
      color: "blue",
    },
    {
      id: "llm",
      title: "大模型实战库",
      desc: "深度解析 ChatGPT、Claude、DeepSeek 等主流模型。按场景提供 Prompt 模板，选型配置一站搞定。",
      icon: Brain,
      color: "purple",
    },
    {
      id: "openclaw",
      title: "OpenClaw 实战专区",
      desc: "开源 AI 助手框架。本地部署、1700+ Skills 技能、10 个超级个体必用工作流。",
      icon: Cpu,
      color: "emerald",
    },
    {
      id: "scenarios",
      title: "超级个体场景库",
      desc: "按职业分类：内容创作者、设计师、程序员、电商。每个场景给工具组合+流程+案例。",
      icon: Zap,
      color: "orange",
    },
    {
      id: "toolbox",
      title: "超级个体工具箱",
      desc: "精选免费/低价 AI 工具合集 + 一人公司效率栈（Notion+AI+自动化+OpenClaw）。",
      icon: Layers,
      color: "blue",
    },
    {
      id: "cases",
      title: "真实案例库",
      desc: "公开报道的\"1人+AI\"赚钱案例深度拆解。不画大饼，只讲事实，标注来源。",
      icon: Users,
      color: "purple",
    },
    {
      id: "growth",
      title: "成长路径",
      desc: "从零基础到 AI 变现的务实路线图。分阶段规划学什么、做什么，避免走弯路。",
      icon: BookOpen,
      color: "emerald",
    },
  ];

  return (
    <section id="modules" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">七大核心模块</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          从入门到实战，从工具到案例。七大模块覆盖超级个体进化全链路，助你一人成军。
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { value: "7", label: "核心模块" },
          { value: "20+", label: "实战课程" },
          { value: "50+", label: "Prompt 模板" },
          { value: "10", label: "OpenClaw 工作流" },
        ].map((stat, i) => (
          <div key={i} className="text-center p-6 bg-white/5 border border-white/10 rounded-2xl">
            <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {modules.map((mod, i) => (
          <ModuleCard key={mod.title} {...mod} index={i} />
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="text-blue-500 fill-blue-500" size={20} />
            <span className="text-lg font-bold text-white tracking-tighter">AI Superman DJY</span>
          </div>
          <p className="text-sm text-gray-500">
            © 2026 AI Superman DJY. 让每个人成为超级个体。
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors"><Github size={20} /></a>
        </div>

        <div className="flex gap-8 text-sm font-medium text-gray-500">
          <a href="#" className="hover:text-white transition-colors">隐私政策</a>
          <a href="#" className="hover:text-white transition-colors">服务条款</a>
          <a href="#" className="hover:text-white transition-colors">联系我们</a>
        </div>
      </div>
    </footer>
  );
};

const HomePage = () => {
  return (
    <>
      <Hero />
      <Modules />
      
      {/* Free Resources */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">免费资源</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            我们为你准备了入门必备的免费资源，扫码进群即可领取完整版。
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: BookOpen, title: "入门电子书", desc: "《AI 超级个体入门指南》PDF，零基础友好" },
            { icon: FileText, title: "Prompt 模板集", desc: "50+ 可直接复用的 Prompt 模板，按场景分类" },
            { icon: Cpu, title: "OpenClaw 工作流", desc: "10 个超级个体必用自动化工作流详细教程" },
            { icon: Users, title: "案例合集", desc: "精选 3 个公开报道的真实 AI 创业案例拆解" },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/8 transition-all">
              <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400 mb-4"><item.icon size={24} /></div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Growth Path Preview */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">成长路径</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              从零基础到独立运营 AI 业务，循序渐进的务实成长路线。
            </p>
          </div>
          <div className="space-y-8">
            {[
              { phase: "阶段 0", time: "1-2 周", title: "建立 AI 基础认知", desc: "学会使用 ChatGPT/DeepSeek，掌握 Prompt 基础公式，搭建个人工具矩阵", color: "blue" },
              { phase: "阶段 1", time: "1-3 月", title: "深度使用 AI 提效", desc: "在现有工作中深度使用 AI，搭建自动化工作流，开始积累个人品牌", color: "purple" },
              { phase: "阶段 2", time: "3-6 月", title: "探索变现路径", desc: "基于垂直领域知识 + AI 能力，构建个人产品或服务，获得第一笔收入", color: "emerald" },
            ].map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="flex items-start gap-6 p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/8 transition-all">
                <div className={`w-16 h-16 rounded-2xl bg-${step.color}-600/20 flex items-center justify-center text-${step.color}-400 shrink-0 text-sm font-bold`}>{step.phase}</div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    <span className="text-xs font-medium text-gray-500 bg-white/5 px-3 py-1 rounded-full">{step.time}</span>
                  </div>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="community" className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600 to-purple-700 rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              准备好开启你的 <br /> 超级个体进化了吗？
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              加入 AI Superman DJY 社区，与数万名先行者一起，
              用 AI 重塑未来。
            </p>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toast.success("欢迎加入社区！", { description: "请检查您的邮箱以完成注册。" })}
              className="px-10 py-5 bg-white text-blue-600 font-black text-lg rounded-2xl hover:bg-gray-100 transition-all shadow-2xl cursor-pointer"
            >
              立即免费加入
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
};

const ModulePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const content = id ? MODULE_CONTENT[id] : null;

  if (!content) return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">模块未找到</h2>
        <button onClick={() => navigate("/")} className="text-blue-500 hover:underline">返回首页</button>
      </div>
    </div>
  );

  const Icon = content.icon;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 max-w-5xl mx-auto"
    >
      <button 
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 返回首页
      </button>

      <div className="flex flex-col md:flex-row items-start gap-12 mb-20">
        <div className={`w-24 h-24 rounded-3xl bg-${content.color}-600/20 flex items-center justify-center text-${content.color}-400 shrink-0`}>
          <Icon size={48} />
        </div>
        <div>
          <span className={`text-sm font-bold uppercase tracking-widest text-${content.color}-400 mb-4 block`}>
            {content.subtitle}
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">{content.title}</h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">{content.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {content.sections.map((section: any, i: number) => {
          const SIcon = section.icon;
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-white/5 border border-white/10 rounded-3xl"
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white mb-6">
                <SIcon size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{section.title}</h3>
              <p className="text-gray-400 leading-relaxed">{section.content}</p>
            </motion.div>
          );
        })}
      </div>

      {content.keyTakeaways && (
        <div className="mb-20 p-12 bg-blue-600/5 border border-blue-500/20 rounded-[40px]">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Star className="text-yellow-500" /> 核心收获
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.keyTakeaways.map((takeaway: string, i: number) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold shrink-0 mt-1">
                  {i + 1}
                </div>
                <p className="text-gray-300 leading-relaxed">{takeaway}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white/5 border border-white/10 rounded-[40px] p-12">
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <BookOpen className="text-blue-500" /> 课程大纲
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.lessons.map((lesson: any, i: number) => {
            const isObject = typeof lesson === 'object';
            const title = isObject ? lesson.title : lesson;
            
            return (
              <div 
                key={i} 
                onClick={() => isObject && setSelectedLesson(lesson)}
                className={`flex items-center gap-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors ${isObject ? 'cursor-pointer' : 'cursor-default'} group`}
              >
                <div className="w-8 h-8 bg-blue-600/20 text-blue-400 rounded-lg flex items-center justify-center text-sm font-bold group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {i + 1}
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">{title}</span>
                {isObject && <ChevronRight size={16} className="ml-auto text-gray-600 group-hover:text-white transition-colors" />}
              </div>
            );
          })}
        </div>
      </div>

      {content.cta && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 p-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-[32px] text-center"
        >
          <p className="text-lg text-blue-200 mb-6">{content.cta.text.split(" → ")[0]}</p>
          <button 
            onClick={() => navigate(content.cta.link)}
            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-all shadow-xl flex items-center gap-2 mx-auto"
          >
            {content.cta.text.split(" → ")[1]} <ArrowRight size={20} />
          </button>
        </motion.div>
      )}

      {/* Lesson Detail Modal */}
      <AnimatePresence>
        {selectedLesson && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLesson(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl bg-[#121212] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            >
              <button 
                onClick={() => setSelectedLesson(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-black/40 backdrop-blur-md hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors z-20"
              >
                <X size={20} />
              </button>

              <div className="overflow-y-auto custom-scrollbar">
                <div className="h-80 overflow-hidden relative">
                  <img 
                    src={selectedLesson.image} 
                    alt={selectedLesson.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/20 to-transparent" />
                </div>

                <div className="p-10 -mt-24 relative">
                  <h2 className="text-4xl font-black text-white mb-6 leading-tight">{selectedLesson.title}</h2>
                  <p className="text-gray-300 text-xl leading-relaxed mb-12 font-medium">
                    {selectedLesson.content}
                  </p>

                  {selectedLesson.fullContent ? (
                    <div className="space-y-12 mb-12">
                      {selectedLesson.fullContent.map((item: any, i: number) => (
                        <div key={i} className="group">
                          <h4 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-3">
                            <span className="w-8 h-px bg-blue-500/30 group-hover:w-12 transition-all" />
                            {item.subtitle}
                          </h4>
                          <p className="text-gray-400 text-lg leading-relaxed pl-11 border-l border-white/5">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-6 mb-12">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-blue-500">核心知识点</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedLesson.details.map((detail: string, i: number) => (
                          <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            <span className="text-gray-300 text-sm">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={() => setSelectedLesson(null)}
                    className="w-full py-5 bg-blue-600 text-white font-black text-lg rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20"
                  >
                    完成学习，返回大纲
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
        <Toaster position="top-center" richColors theme="dark" />
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/module/:id" element={<ModulePage />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
