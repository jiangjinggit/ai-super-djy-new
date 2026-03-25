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
  Box,
  Palette,
  Briefcase,
  BarChart3,
  GraduationCap,
  HelpCircle,
  User,
  Clock,
  AlertTriangle,
  TrendingUp,
  ChevronDown,
  Wrench
} from "lucide-react";
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { BrowserRouter, Routes, Route, useNavigate, useParams, Link, useLocation } from "react-router-dom";

// --- Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// --- Data ---

const NAV_LABELS: Record<string, string> = {
  "super-individual": "入门",
  "llm": "大模型",
  "openclaw": "智能体",
  "scenarios": "场景库",
  "cases": "案例",
  "growth": "成长",
};

const MODULE_CONTENT: Record<string, any> = {
  "super-individual": {
    title: "AI 超级个体入门",
    subtitle: "零基础 · 快速上手 · 一人成军",
    icon: Rocket,
    color: "blue",
    description: "理解\"超级个体\"的核心概念，掌握 Prompt Engineering 基础，搭建个人 AI 工具矩阵与效率栈。精选免费/低价工具，从\"知道AI\"走向\"用好AI\"。",
    lastVerified: "2026-03-25",
    keyTakeaways: [
      "理解超级个体的核心逻辑：AI 如何放大个人产出",
      "掌握万能 Prompt 公式：角色 + 任务 + 约束 + 输出格式",
      "搭建个人 AI 工具矩阵：对话/绘图/搜索/编程/自动化",
      "精选免费/低价工具，用最少成本获得最大价值"
    ],
    sections: [
      { title: "超级个体认知觉醒", content: "揭开超级个体的面纱，理解为什么 AI 时代是一个人也能成军的元年。", icon: Globe },
      { title: "提示词工程入门", content: "学会与 AI 沟通的艺术，让 AI 真正听懂你的指令。", icon: Bot },
      { title: "AI 工具全景与效率栈", content: "精选免费/低价 AI 工具 + 一人公司效率栈（Notion+AI+自动化）。", icon: Layers }
    ],
    lessons: [
      {
        title: "生成式 AI 的本质：从概率预测到超级个体",
        content: "理解大模型的工作原理——它不是搜索引擎，不是数据库，而是一个通过海量文本训练的概率预测引擎。理解这一点，才能真正用好它。",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
        details: ["Transformer 架构：AI 的\"大脑\"，通过注意力机制理解上下文关系", "训练过程：预测下一个 token 的概率游戏，而非逐字记忆", "涌现能力：当模型规模足够大时，会自发产生推理、编程、翻译等能力", "知识截止日期：不同模型有不同的训练数据截止时间", "幻觉成因：面对知识盲区时，模型会\"接龙\"出看似合理的错误信息", "超级个体的前提：理解 AI 能做什么和不能做什么，才能正确地使用它"],
        fullContent: [
          { subtitle: "1. 大模型是如何\"思考\"的？", text: "大模型不是在\"查找\"答案，而是在\"预测\"下一个最可能的 token（词元）。当你说\"中国的首都是\"，它预测下一个 token 是\"北京\"的概率接近 100%。对于复杂问题，它通过多步预测来\"推理\"出答案。思考模式（如 DeepSeek reasoner）会在输出前先进行内部推理链，类似人类\"思考后再回答\"。" },
          { subtitle: "2. 为什么不同模型\"性格\"不同？", text: "模型的\"性格\"取决于训练数据、微调方式和 RLHF（人类反馈强化学习）。GPT 系列偏向全能和实用主义，Claude 系列偏向严谨和安全，DeepSeek 中文理解力强且性价比极高。选择模型就像选择员工——不同岗位用不同的人。" },
          { subtitle: "3. 知识截止日期与实时能力", text: "纯模型推理无法获取最新信息。但现代模型普遍支持网页搜索和工具调用来弥补这一限制。这就是为什么自动化框架（OpenClaw、Dify、Coze 等）要给模型\"接手接脚\"——让它能搜索、读文件、浏览网页。" }
        ]
      },
      {
        title: "Prompt Engineering 实战：5 种官方推荐的提示词技巧",
        content: "基于 OpenAI、Anthropic、DeepSeek 官方最佳实践，掌握 5 种核心提示词技巧。这些不是玄学，而是有明确原理的工程方法。",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=450&fit=crop",
        details: ["角色设定（System Prompt）：在 system 消息中设定角色和规则", "Few-Shot 示例：给 AI 2-3 个输入输出示例，比纯文字描述更有效", "思维链 CoT：让 AI 先思考再回答，自动进行多步推理", "结构化输出：要求 JSON 格式输出，主流模型均支持 JSON Mode", "工具调用 Function Calling：GPT / Claude / DeepSeek 均原生支持"],
        fullContent: [
          { subtitle: "1. 角色 + 规则 = System Prompt", text: "官方文档明确推荐：在 system 消息中定义 AI 的角色、行为规则和输出格式。例如：\"你是一位资深产品经理。回答必须包含：1）问题分析 2）解决方案 3）优先级排序。每个部分不超过 100 字。\" 这比在用户消息中描述角色效果更好，因为 system 消息的权重更高。" },
          { subtitle: "2. Few-Shot 比 Zero-Shot 更可靠", text: "与其花 500 字描述\"请按以下格式输出\"，不如直接给 2 个示例。研究表明，Few-Shot 在格式控制、风格一致性、减少幻觉方面显著优于 Zero-Shot。示例不需要多，2-3 个就足够。" },
          { subtitle: "3. 思维链：让 AI \"想清楚再说\"", text: "DeepSeek reasoner、Claude 扩展思维（Extended Thinking）等模式会在输出前自动进行多步推理。对于数学、逻辑、复杂决策类任务，思考模式的效果远优于普通模式。代价是响应更慢、成本更高。" }
        ]
      },
      {
        title: "超级个体思维：AI 是杠杆，不是替代品",
        content: "超级个体不是\"用 AI 替代人\"，而是\"用 AI 放大人的产出\"。理解杠杆效应、成本结构和能力边界，才能正确规划你的超级个体路径。",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
        details: ["杠杆效应：低成本模型处理 10 万字仅花几分钱", "成本结构变化：AI 把\"请人做\"的边际成本从几千元降到几毛钱", "能力边界：AI 擅长生成和推理，但不擅长审美判断和创意决策", "时间分配：AI 处理 80% 的执行工作，你把精力放在决策上", "一人公司的可行性：自动化工具 24/7 运行 + AI 模型 = 不需要招人", "关键认知：你的核心价值是\"判断力\"和\"品味\"，不是\"执行力\""],
        fullContent: [
          { subtitle: "1. 成本的量级变化", text: "以前请一个文案写一篇 1000 字文章：几百到几千元。现在用 AI：费用不到 1 元。以前请一个程序员写一个简单功能：几千到几万元。现在用 Cursor Agent：几小时就能完成，API 成本不到 $1。AI 把\"找人做事\"的边际成本从千元级降到了分钱级。" },
          { subtitle: "2. 什么不能交给 AI", text: "AI 不擅长的事：审美判断（什么是\"好看\"）、原创创意（从 0 到 1 的突破）、情感连接（与客户的深度信任关系）、战略决策（选什么赛道、什么时候转型）。这些是你的核心价值。" },
          { subtitle: "3. 一人公司的运营模型", text: "自动化工具 24/7 运行处理日常任务（邮件、客服、监控），低成本模型做分析，高质量模型做深度创作。你只需要做决策和把关。可选工具：OpenClaw（开源本地部署）、Dify（可视化编排）、Coze（字节跳动生态）、n8n（开源工作流）。月运营成本：API 费用约 50-200 元。" }
        ]
      },
      {
        title: "2026 AI 工具全景：基于官方文档的选型指南",
        content: "基于各厂商官方文档，梳理当前最值得关注的 AI 工具及其核心参数。",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
        details: [
          "对话：GPT-5.4（1M 上下文，全能）/ Claude Opus 4.6（推理强）/ DeepSeek V3.2（极致性价比）",
          "国产：Kimi K2.5（256K 多模态）/ 通义千问（阿里生态）/ 文心一言（百度知识库）",
          "图像：GPT Image 1.5 / Midjourney（艺术绘图）/ 通义万相（国产）",
          "视频：Sora 2（OpenAI）/ 可灵 Kling（国产领先）",
          "编程：Cursor Agent（自主编程）/ GitHub Copilot / Kiro（AWS）",
          "搜索：Perplexity（实时搜索 + 引用来源）/ 秘塔AI搜索（国产）"
        ],
        fullContent: [
          { subtitle: "1. 对话类：按场景选模型", text: "日常问答和简单任务：DeepSeek V3.2（成本最低）。复杂推理和编码：GPT-5.4 或 Claude Opus 4.6。长文档分析：Claude Sonnet 4.6（100 万上下文）或 Kimi K2.5（256K 上下文）。中文场景优先：DeepSeek 或 Kimi。" },
          { subtitle: "2. 视觉与视频", text: "图像生成首选 GPT Image 1.5，艺术绘图可选 Midjourney。视频生成 Sora 2 支持同步音频生成。国产可灵 (Kling) 在视频生成方面表现突出，是性价比之选。" },
          { subtitle: "3. 编程与效率", text: "Cursor 是目前最主流的 AI 编程编辑器，核心能力包括 Agent 自主编程、Tab 智能补全、深度代码库理解。Kiro 是 AWS 推出的 AI IDE，内置 Spec 驱动开发流程。Perplexity 改变了信息获取方式，直接阅读搜索结果并总结成答案。" }
        ]
      },
      {
        title: "免费/低成本工具方案：用最少预算获得最大价值",
        content: "基于各厂商官方定价，计算真实使用成本。帮你用最少的钱获得最大的 AI 能力。",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop",
        details: [
          "DeepSeek V3.2：输入 $0.28/MTok（缓存命中 $0.028），极致性价比",
          "Kimi K2.5：月之暗面平台提供免费额度，256K 上下文",
          "Ollama + 开源模型：完全免费本地运行，零 API 成本",
          "Stable Diffusion：本地部署替代 Midjourney，零成本",
          "GPT-5.4 nano：OpenAI 最廉价选项，输入 $0.20/MTok",
          "Cursor 免费版：支持基础 AI 补全，足够日常使用"
        ],
        fullContent: [
          { subtitle: "1. 真实成本计算（基于官方定价）", text: "以每天处理 10 万字（约 13 万 tokens）为例：DeepSeek V3.2 缓存命中约 $0.004/天，一个月总成本约 $0.1-$1。GPT-5.4 nano 月成本约 $23。GPT-5.4 完整版月成本约 $98。差价约 1000 倍。" },
          { subtitle: "2. 本地部署方案", text: "Ollama 是免费开源工具，支持在本地运行 Llama、Qwen、DeepSeek 等开源模型。配合 Stable Diffusion，可以零成本实现 AI 绘图。缺点是需要一定的硬件配置（建议 16GB+ 内存，有 GPU 更好）。" },
          { subtitle: "3. 推荐的最低成本组合", text: "日常对话：DeepSeek V3.2（月成本 < $5）。复杂推理：GPT-5.4 mini（月成本约 $30）。编程：Cursor 免费版 + DeepSeek。AI 绘图：Stable Diffusion 本地部署。总计月成本控制在 $50 以内。" }
        ]
      },
      {
        title: "一人公司效率栈：知识管理 + AI + 自动化",
        content: "搭建完整的个人效率工具链，打通信息孤岛，实现\"设置一次，自动运行\"。每个工具都有明确的职责边界，并提供多种可选方案。",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
        details: [
          "知识管理：Notion / Obsidian / 飞书文档（项目/笔记/数据库统一管理）",
          "AI 自动化平台（任选其一）：OpenClaw（开源本地）/ Dify（可视化编排）/ Coze（字节生态）/ n8n（开源工作流）/ FastGPT（知识库问答）",
          "内容生成：Claude Sonnet 4.6（深度写作）/ GPT-5.4（多模态）",
          "低成本推理：DeepSeek V3.2（日常分析和处理）",
          "编程开发：Cursor Agent / Kiro（自主编程）",
          "信息检索：Perplexity / 秘塔AI搜索（实时搜索 + 引用来源）"
        ],
        fullContent: [
          { subtitle: "1. 效率栈的分工逻辑", text: "知识管理工具做\"存储层\"——所有知识、项目、数据统一管理。自动化平台做\"执行层\"——24/7 运行自动化任务。AI 模型做\"智能层\"——低成本模型处理日常任务，高质量模型处理创作。编程 IDE 做\"开发层\"——独立开发产品。" },
          { subtitle: "2. 自动化平台对比", text: "OpenClaw：开源本地部署，数据隐私好，支持全渠道聊天接入。Dify：可视化工作流编排，上手简单，适合非技术用户。Coze：字节跳动生态，与飞书/抖音深度集成，国内用户友好。n8n：开源工作流引擎，连接 400+ 应用，灵活度最高。FastGPT：专注知识库问答，适合客服和文档场景。根据你的需求选择，不必绑定单一平台。" },
          { subtitle: "3. 月运营成本估算", text: "知识管理工具免费版：$0。自动化平台（开源自部署）：$0。DeepSeek V3.2 API（日均 10 万字）：$1-5/月。Claude Sonnet 4.6（每周 2-3 次深度写作）：$5-15/月。编程 IDE 免费版：$0。总计：$6-20/月。" }
        ]
      }
    ],
    cta: { text: "掌握了基础？进阶了解大模型实战 → 探索大模型实战库", link: "/module/llm" }
  },
  "llm": {
    title: "大模型实战库",
    subtitle: "官方数据 · 场景驱动 · 即学即用",
    icon: Brain,
    color: "purple",
    description: "基于 OpenAI、Anthropic、DeepSeek、月之暗面官方文档，深度对比 2026 年主流大模型的上下文窗口、价格和能力边界。帮你为自动化工作流选配最强\"大脑\"。",
    lastVerified: "2026-03-25",
    keyTakeaways: [
      "OpenAI GPT-5.4：1M 上下文，$2.50/MTok 输入，支持函数调用与网页搜索",
      "Claude Opus 4.6：100 万上下文，$5/MTok 输入，扩展思维与自适应思维",
      "DeepSeek V3.2：128K 上下文，$0.28/MTok 输入，极致性价比（约为 GPT-5.4 的 1/9）",
      "Kimi K2.5：256K 上下文，原生多模态，支持 Agent 与思考模式"
    ],
    sections: [
      { title: "2026 大模型官方参数对比", content: "基于各厂商官方 API 文档，对比上下文窗口、价格、最大输出等核心参数。", icon: Layers },
      { title: "场景化选型指南", content: "根据你的实际需求（预算、任务复杂度、延迟要求）匹配最合适的模型。", icon: Star },
      { title: "API 配置实战", content: "获取 API Key，在自动化平台中配置模型，测试对话效果。", icon: Cpu }
    ],
    lessons: [
      {
        title: "2026 主流大模型官方参数全对比",
        content: "基于 OpenAI、Anthropic、DeepSeek、月之暗面四大厂商的官方 API 文档，整理最新模型参数、价格与能力对比。所有数据均来自官方，可验证。",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop",
        details: [
          "GPT-5.4：1M 上下文，输入 $2.50/MTok，输出 $15/MTok，最大 128K 输出",
          "GPT-5.4 mini：400K 上下文，输入 $0.75/MTok，输出 $4.50/MTok",
          "Claude Opus 4.6：100 万上下文，输入 $5/MTok，输出 $25/MTok",
          "Claude Sonnet 4.6：100 万上下文，输入 $3/MTok，输出 $15/MTok",
          "DeepSeek V3.2：128K 上下文，输入 $0.28/MTok，输出 $0.42/MTok",
          "Kimi K2.5：256K 上下文，原生多模态，Agent 与思考模式"
        ],
        fullContent: [
          { subtitle: "1. OpenAI GPT-5.4", text: "OpenAI 当前旗舰模型，为智能体、编码和专业工作流设计。支持 100 万 tokens 上下文窗口，128K 最大输出，支持函数调用、网页搜索、文件搜索、计算机使用。GPT-5.4 mini 是高性价比子版本，400K 上下文，输入价格仅 $0.75/MTok。还有更轻量的 GPT-5.4 nano，输入仅 $0.20/MTok。" },
          { subtitle: "2. Claude Opus 4.6", text: "Anthropic 旗舰模型。100 万 tokens 上下文窗口，128K 最大输出。支持扩展思维（Extended Thinking）和自适应思维（Adaptive Thinking），在复杂推理和编码任务上表现卓越。Claude Sonnet 4.6 是性价比之选，100 万上下文，输入 $3/MTok。" },
          { subtitle: "3. DeepSeek V3.2", text: "提供 deepseek-chat 和 deepseek-reasoner 两个接口，均为 128K 上下文。价格极具竞争力：输入 $0.28/MTok（缓存命中仅 $0.028），输出 $0.42/MTok。约为 GPT-5.4 的 1/9。支持 JSON 输出和工具调用。" },
          { subtitle: "4. Kimi K2.5", text: "月之暗面最新旗舰模型，原生多模态架构，256K 上下文窗口。支持视觉与文本输入、思考与非思考模式、对话与 Agent 任务。提供 K2-turbo 高速版和 K2-thinking 思考模型。" }
        ]
      },
      {
        title: "模型选型决策指南：5 个维度帮你选对模型",
        content: "基于官方参数，从预算、上下文长度、延迟、推理能力、生态集成 5 个维度，给出不同场景的模型推荐方案。",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
        details: [
          "预算敏感：DeepSeek V3.2（$0.28/MTok）> GPT-5.4 mini（$0.75）> GPT-5.4（$2.50）",
          "超长文本：Claude Opus/Sonnet 4.6（100 万）> GPT-5.4（100 万）> Kimi K2.5（256K）",
          "复杂推理：Claude Opus 4.6（扩展思维）> GPT-5.4 > DeepSeek reasoner",
          "编码开发：GPT-5.4 > Claude Opus 4.6 > Kimi K2.5",
          "成本对比：处理 100 万 tokens — DeepSeek $0.28 vs GPT-5.4 $2.50 vs Claude Opus $5"
        ],
        fullContent: [
          { subtitle: "1. 预算优先：DeepSeek V3.2", text: "如果你是个人开发者或刚开始探索 API 调用，DeepSeek 是最优选择。输入 $0.28/MTok，缓存命中仅 $0.028/MTok。主流自动化平台（OpenClaw、Dify、Coze、n8n）均支持 DeepSeek API。" },
          { subtitle: "2. 质量优先：Claude Opus 4.6", text: "对于需要深度推理、长文档分析、复杂编码的任务，Claude Opus 4.6 是最佳选择。100 万上下文 + 扩展思维模式。价格较高（$5/MTok 输入），建议仅在复杂任务中使用。" },
          { subtitle: "3. 均衡之选：GPT-5.4 / Claude Sonnet 4.6", text: "GPT-5.4 是全能型选手，支持函数调用、网页搜索、文件搜索。Claude Sonnet 4.6 在推理质量和速度之间取得最佳平衡。日常使用推荐 Sonnet 4.6，复杂任务切换到 Opus 4.6。" },
          { subtitle: "4. 多模态需求：Kimi K2.5 / GPT-5.4", text: "Kimi K2.5 原生多模态架构，同时支持视觉和文本输入，256K 上下文。GPT-5.4 同样支持文本和图像输入，加上 Sora 2 视频生成和 GPT Image 1.5 图像生成，构建了完整的多模态生态。" }
        ]
      },
      {
        title: "API 注册与自动化平台配置实战",
        content: "手把手教你注册各大模型的开发者账号，获取 API Key，并在自动化平台中完成配置。",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop",
        details: [
          "OpenAI：platform.openai.com 注册，支持信用卡充值",
          "Anthropic：console.anthropic.com 注册，支持 AWS Bedrock / Google Vertex AI",
          "DeepSeek：platform.deepseek.com 注册，支持微信支付，新人赠金",
          "月之暗面：platform.moonshot.cn 注册，按 Token 用量计费",
          "自动化平台配置：填入 API Key，选择模型，测试对话",
          "安全提醒：永远不要在公开代码中硬编码 API Key"
        ],
        fullContent: [
          { subtitle: "1. OpenAI API", text: "访问 platform.openai.com 注册开发者账号。创建 API Key 后即可调用 GPT-5.4 系列。充值支持国际信用卡，每个新账号有少量免费额度。" },
          { subtitle: "2. DeepSeek API（推荐国内用户首选）", text: "访问 platform.deepseek.com 注册，支持微信支付，对国内用户最友好。新用户有赠金额度。OpenClaw、Dify、Coze、n8n 等主流自动化平台均支持 DeepSeek API。" },
          { subtitle: "3. 在自动化平台中配置", text: "以 Dify 为例：设置 → 模型供应商 → 添加 DeepSeek → 填入 API Key → 测试连接。以 OpenClaw 为例：设置 → 填入 API Key → 选择模型 → 测试对话。以 Coze 为例：工作台 → 模型管理 → 添加自定义模型。各平台操作类似，5 分钟即可完成。" }
        ]
      },
      {
        title: "实用 Prompt 模板：5 个场景即拷即用",
        content: "基于各模型官方最佳实践，提供 5 个高频场景的 Prompt 模板。可直接复制使用。",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop",
        details: [
          "场景 1：技术文档总结（给 AI 一份文档，输出结构化摘要）",
          "场景 2：竞品分析报告（输入竞品信息，输出对比分析）",
          "场景 3：代码 Review（粘贴代码，AI 自动审查并提出改进）",
          "场景 4：客户邮件撰写（描述情境，AI 生成得体专业的邮件）",
          "场景 5：自媒体脚本（输入主题和平台，输出完整视频脚本）"
        ],
        fullContent: [
          { subtitle: "1. 技术文档总结 Prompt", text: "\"你是一位资深技术专家。请阅读以下文档，输出：1）核心概念（3-5 个要点）；2）关键数据（所有数字和指标）；3）行动建议（3 条）。格式使用 Markdown，每个部分用二级标题分隔。文档内容：[粘贴文档]\"" },
          { subtitle: "2. 竞品分析 Prompt", text: "\"你是一位产品分析师。请分析以下竞品信息，从以下维度输出对比表格：定位与目标用户、核心功能、定价策略、优势与劣势、市场表现。竞品信息：[粘贴信息]\"" },
          { subtitle: "3. 代码 Review Prompt", text: "\"你是一位高级工程师。请审查以下代码，从以下角度提出具体改进建议：1）潜在 Bug 和边界情况；2）性能优化机会；3）代码可读性和命名规范；4）安全性问题。代码：[粘贴代码]\"" }
        ]
      }
    ],
    cta: { text: "选好模型了？前往智能体实战 → 学习 AI 智能体实战", link: "/module/openclaw" }
  },
  "openclaw": {
    title: "AI 智能体实战专区",
    subtitle: "Agent 时代 · 自主执行 · 一人成军",
    icon: Cpu,
    color: "emerald",
    description: "2026 年，AI 从\"对话工具\"进化为\"自主智能体（Agent）\"。Agent 不只是回答问题，它能自主规划、执行任务、操作电脑、浏览网页、写代码。掌握 Agent，才是超级个体的真正形态。",
    lastVerified: "2026-03-25",
    keyTakeaways: [
      "OpenClaw：开源本地 Agent，全渠道聊天接入，Skills/Plugin 系统，24/7 后台运行，数据隐私最佳",
      "Claude Code / Agent SDK：Anthropic Agent 生态，终端原生，多 Agent 协作（Swarm），200K 上下文，MCP 集成",
      "Manus AI：全自主 Agent，给目标自动规划执行，Meta $2B 收购，适合复杂多步骤任务",
      "OpenAI Agents SDK：GPT 原生 Agent 框架，Handoff 模式，快速原型开发"
    ],
    sections: [
      { title: "Agent 生态全景", content: "从聊天机器人到自主智能体，理解 Agent 的本质区别。对比 OpenClaw、Claude Code、Manus、OpenAI Agents SDK 四大生态。", icon: Globe },
      { title: "上手与部署", content: "每个 Agent 平台的安装部署指南，从零到运行你的第一个智能体。", icon: Rocket },
      { title: "实战工作流", content: "用 Agent 搭建邮件处理、内容创作、竞品监控、智能客服等场景。", icon: Code }
    ],
    lessons: [
      {
        title: "从聊天机器人到自主智能体：理解 Agent 的本质飞跃",
        content: "2026 年 AI 行业最大的变化不是模型更强了，而是 AI 从\"被动回答\"进化为\"主动执行\"。理解 Agent 与传统 AI 工具的本质区别，是成为超级个体的关键认知升级。",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
        details: [
          "传统 AI：你问一句，它答一句。你是驾驶员，AI 是导航仪",
          "AI Agent：你给一个目标，它自主规划步骤、调用工具、执行任务、交付结果",
          "核心能力：自主规划（Planning）、工具调用（Tool Use）、记忆（Memory）、自我纠错（Reflection）",
          "Agent 能做什么：浏览网页、操作文件、执行代码、管理日程、发送消息、部署应用",
          "2026 关键事件：Claude Code 多 Agent 协作、Manus 被 Meta $2B 收购、OpenClaw 成为开源 Agent 标准",
          "对超级个体的意义：Agent = 你的 24/7 数字员工团队"
        ],
        fullContent: [
          { subtitle: "1. 聊天机器人 vs 智能体", text: "聊天机器人（ChatGPT 网页版、Claude.ai）是\"一问一答\"模式——你提问，它回答，然后等你下一个问题。智能体（Agent）是\"目标驱动\"模式——你说\"帮我调研竞品并生成报告\"，它自主拆解任务、搜索网页、提取数据、对比分析、生成报告、推送给你。你不需要参与中间过程。这是从\"工具\"到\"员工\"的本质飞跃。" },
          { subtitle: "2. Agent 的四大核心能力", text: "规划（Planning）：把复杂目标拆解为可执行的步骤序列。工具调用（Tool Use）：操作文件、浏览器、终端、API、数据库等外部工具。记忆（Memory）：记住你的偏好、历史对话、项目上下文。自我纠错（Reflection）：执行失败时自动分析原因并重试。这四个能力组合在一起，让 Agent 能处理真实世界的复杂任务。" },
          { subtitle: "3. 2026 年 Agent 生态爆发", text: "Claude Code 从编程工具进化为完整 Agent 框架，支持多 Agent 协作（Swarm/Agent Teams）。OpenClaw 密集更新，ContextEngine 重构、Plugin Marketplace、浏览器自动化，被称为\"开源 Agent 事实标准\"。Manus AI 做到 $100M ARR 后被 Meta 以 $2B 收购。OpenAI 和 Google 也发布了生产级 Agent SDK。Agent 不再是概念，而是可用的生产力工具。" }
        ]
      },
      {
        title: "Agent 平台全对比：OpenClaw vs Claude Code vs Manus vs OpenAI Agents SDK",
        content: "四大主流 Agent 平台的深度对比。从部署方式、核心能力、适用人群、成本维度帮你选择最适合的 Agent 方案。",
        image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=450&fit=crop",
        details: [
          "OpenClaw：开源本地部署，全渠道聊天接入，Skills/Plugin 系统，24/7 后台运行，数据隐私最佳",
          "Claude Code：终端原生 Agent，200K 上下文（1M beta），多 Agent 协作（Swarm），MCP 集成，编程能力最强",
          "Manus AI：全自主 Agent，给目标自动执行，浏览网页/写代码/部署应用，$20/月起",
          "OpenAI Agents SDK：GPT 原生框架，Handoff 多 Agent 模式，快速原型，但锁定 OpenAI 生态",
          "轻量替代：Coze（字节生态，免费）/ Dify（可视化编排）适合简单场景快速上手",
          "选型建议：隐私优先选 OpenClaw，编程场景选 Claude Code，全自主任务选 Manus，快速原型选 OpenAI SDK"
        ],
        fullContent: [
          { subtitle: "1. OpenClaw — 开源 Agent 的事实标准", text: "OpenClaw 是开源的个人 AI Agent 框架，本地部署保障数据隐私。2026 年密集更新：ContextEngine 可插拔架构重构（89 commits，200+ bug fixes）、Plugin Marketplace 上线、浏览器自动化（直连 Chrome DevTools）、ACP 身份验证。核心优势：全渠道聊天接入（WhatsApp/Telegram/Discord/Slack/Signal/iMessage）、Skills 技能系统（Markdown 或 TypeScript）、24/7 后台自动化。适合对数据隐私要求高、需要长期运行的个人 Agent。" },
          { subtitle: "2. Claude Code / Agent SDK — 编程 Agent 最强", text: "Claude Code 是 Anthropic 的终端原生 Agent，由 Claude Opus 4.6 驱动。200K token 上下文（1M beta），支持多 Agent 协作（Swarm/Agent Teams）——可以生成研究员、策略师、代码审查员等专业子 Agent 并行工作。Claude Agent SDK 把 Claude Code 的能力封装为库，可嵌入你自己的应用。内置文件操作、Shell 命令、Web 搜索、MCP 集成。Apple Xcode 已官方集成 Claude Agent SDK。适合开发者和需要深度编程能力的场景。" },
          { subtitle: "3. Manus AI — 全自主 Agent 标杆", text: "Manus AI 2025 年 3 月发布，8 个月做到 $100M ARR，被 Meta 以 $2B 收购。它是真正的\"全自主 Agent\"：你给一个目标（如\"帮我建一个网站\"），它自主规划、编码、部署，全程不需要你参与。处理过 147 万亿 tokens，启动过 8000 万个虚拟计算环境。$20/月起（Standard），300 daily credits。适合非技术用户执行复杂多步骤任务。缺点：云端运行，数据隐私不如本地方案。" },
          { subtitle: "4. OpenAI Agents SDK — 快速原型首选", text: "OpenAI 官方 Agent 框架，支持 Handoff 多 Agent 模式（Agent 之间可以转交任务）和 Guardrails 安全护栏。100 行代码内即可构建一个可用的 Agent。优势是与 GPT 生态深度集成，上手最快。缺点是锁定 OpenAI 模型，灵活度不如开源方案。适合快速验证 Agent 想法、构建 GPT 原生应用。" }
        ]
      },
      {
        title: "上手指南：部署你的第一个 AI Agent",
        content: "从零开始，分别用 OpenClaw、Claude Code、Manus 三种方式部署你的第一个 Agent。每种方式 30 分钟内可完成。",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop",
        details: [
          "OpenClaw：官网下载安装包（Mac/Win/Linux）→ 配置 API Key → 连接聊天渠道 → 创建第一个 Skill",
          "Claude Code：终端运行 npm install -g @anthropic-ai/claude-code → claude 启动 → 在项目目录中使用",
          "Manus AI：访问 manus.im 注册 → 描述任务目标 → Agent 自动执行 → 查看结果",
          "Claude Agent SDK：npm install @anthropic-ai/agent-sdk → 编写 Agent 逻辑 → 运行",
          "模型配置：OpenClaw 支持多模型（推荐 DeepSeek 低成本入门），Claude Code 使用 Claude 模型",
          "推荐路径：非技术用户从 Manus 开始体验，技术用户从 Claude Code 或 OpenClaw 开始"
        ],
        fullContent: [
          { subtitle: "1. OpenClaw 快速上手", text: "访问 open-claw.org 下载对应平台的安装包。安装完成后，首次启动会引导你配置模型（推荐 DeepSeek，成本低）和聊天渠道（如 Telegram Bot）。然后创建你的第一个 Skill：用 Markdown 描述\"每天早上 9 点总结我的未读邮件\"，OpenClaw 会自动解析为可执行的 Agent 任务。整个过程约 20 分钟。" },
          { subtitle: "2. Claude Code 快速上手", text: "终端运行 npm install -g @anthropic-ai/claude-code 安装。进入你的项目目录，运行 claude 启动。你可以直接用自然语言下达任务：\"分析这个项目的架构并生成文档\"、\"修复所有 TypeScript 类型错误\"、\"添加用户认证功能\"。Claude Code 会自主探索代码库、编写代码、运行测试。需要 Anthropic API Key（Claude Max 订阅包含）。" },
          { subtitle: "3. Manus AI 快速上手", text: "访问 manus.im 注册账号（$20/月起）。在对话框中描述你的任务目标，例如\"调研 2026 年中国新能源汽车市场，生成一份 10 页的分析报告\"。Manus 会自动规划步骤、搜索网页、提取数据、生成报告。你可以实时观看它的执行过程。适合不想折腾部署的用户。" }
        ]
      },
      {
        title: "Agent 实战场景：5 个超级个体必用工作流",
        content: "用 Agent 搭建 5 个超级个体高频场景，每个场景推荐最适合的 Agent 平台。",
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=450&fit=crop",
        details: [
          "场景 1：24/7 智能助手 — OpenClaw 接入聊天渠道，随时对话、执行任务、推送通知",
          "场景 2：代码开发 Agent — Claude Code 自主编程、多 Agent 协作、代码审查",
          "场景 3：深度调研 Agent — Manus 自主搜索、数据分析、生成报告",
          "场景 4：内容创作 Agent — OpenClaw Skill 定时生成选题、撰写初稿、推送到频道",
          "场景 5：客服 Agent — OpenClaw 接入客服渠道 + 知识库，自动回复 80% 常见问题"
        ],
        fullContent: [
          { subtitle: "1. 24/7 智能助手（推荐：OpenClaw）", text: "OpenClaw 的核心体验是通过你已有的聊天工具（Telegram/WhatsApp/Discord）与 Agent 交互。你可以随时发消息让它执行任务：\"帮我查一下明天的天气并设置提醒\"、\"总结一下今天的邮件\"、\"监控竞品网站有没有更新\"。它 24/7 在后台运行，支持定时任务和心跳检测。就像有一个永远在线的私人助理。" },
          { subtitle: "2. 代码开发 Agent（推荐：Claude Code）", text: "Claude Code 的多 Agent 协作（Swarm）是杀手级功能。你可以让它生成多个专业子 Agent：一个负责前端、一个负责后端、一个负责测试，它们并行工作并协调结果。200K 上下文窗口可以理解整个大型代码库。配合 MCP 集成，可以连接数据库、API 等外部服务。独立开发者用 Claude Code 的产出可以接近一个小团队。" },
          { subtitle: "3. 深度调研 Agent（推荐：Manus AI）", text: "Manus 最擅长的是\"给一个调研目标，自动交付完整报告\"。它会自主搜索数十个网页、提取关键数据、交叉验证信息、生成结构化报告。比你手动调研快 10 倍，且不会遗漏信息。适合市场调研、竞品分析、行业报告等需要大量信息收集和整理的场景。" }
        ]
      },
      {
        title: "Agent 安全与最佳实践",
        content: "Agent 拥有操作文件、执行代码、浏览网页的能力，安全问题不容忽视。掌握这些最佳实践，安全地使用 Agent。",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=450&fit=crop",
        details: [
          "最小权限原则：只给 Agent 完成任务所需的最小权限，不要开放所有系统权限",
          "沙箱运行：让 Agent 在隔离环境中执行代码，避免影响主系统",
          "人工确认关卡：资金操作、外发消息、批量删除等高风险操作必须人工确认",
          "API Key 安全：使用环境变量存储，设置用量上限，定期轮换",
          "审计日志：记录 Agent 的所有操作，便于回溯和排查问题",
          "速率限制：设置每小时调用次数和 token 上限，防止误触发烧额度"
        ],
        fullContent: [
          { subtitle: "1. 为什么 Agent 安全很重要？", text: "Agent 不同于普通聊天机器人——它可以操作你的文件、执行终端命令、浏览网页、发送消息。如果配置不当，可能会误删文件、泄露 API Key、发送错误消息、产生高额 API 费用。OpenClaw 2026 年的多次更新都在强化安全：代码安全扫描器（防止恶意 Skill）、ACP 身份验证、命令白名单等。" },
          { subtitle: "2. 推荐的安全配置", text: "文件权限：限制 Agent 只能访问工作目录，禁止读取系统敏感路径。命令白名单：只允许有限的命令集，高危命令（rm -rf、网络上传）默认禁止。API 额度：设置每日/每月 token 上限，DeepSeek 和 OpenAI 都支持用量限制。人工确认：OpenClaw 支持在关键操作前弹出确认，Claude Code 默认在执行 Shell 命令前需要确认。" },
          { subtitle: "3. 渐进式信任", text: "不要一开始就给 Agent 所有权限。推荐路径：先在只读模式下观察 Agent 的行为 → 确认可靠后开放文件写入 → 再开放终端执行 → 最后考虑开放网络操作。就像培养新员工一样，先观察，再授权。" }
        ]
      }
    ],
    cta: { text: "掌握了智能体？去场景库看看更多实战 → 探索超级个体场景库", link: "/module/scenarios" }
  },
  "scenarios": {
    title: "超级个体场景库",
    subtitle: "按职业分类 · 官方数据 · 工具组合",
    icon: Zap,
    color: "orange",
    description: "按职业和副业分类，每个场景提供具体的工具选型、配置方法和工作流。覆盖内容创作、独立开发、电商运营、设计师、产品经理、运营市场、学生求职 7 大方向。",
    lastVerified: "2026-03-25",
    keyTakeaways: [
      "内容创作者：GPT-5.4 选题 + Claude 深度写作 + Sora 2 视频 + 自动化定时发布",
      "独立开发者：Cursor/Kiro Agent 自主编程 + DeepSeek 低成本推理",
      "设计师：Midjourney/GPT Image 生成 + AI 设计助手 + 自动化交付流程",
      "产品经理/运营/学生：AI 辅助分析、文档生成、求职准备全覆盖"
    ],
    sections: [
      { title: "内容创作者", content: "AI 选题 + 深度写作 + 视频生成 + 定时发布，一人产出 5 人团队的内容量。", icon: Video },
      { title: "独立开发者", content: "AI Agent 自主编程 + 智能补全 + 代码审查，非专业程序员也能独立开发产品。", icon: Code },
      { title: "电商 / 自由职业", content: "全自动客服 + 低成本分析 + 产品视频 + 商品图生成。", icon: Bot },
      { title: "设计师", content: "AI 绘图 + 设计稿生成 + 素材批量处理 + 客户交付自动化。", icon: Palette },
      { title: "产品经理", content: "需求分析 + PRD 生成 + 用户调研总结 + 竞品监控自动化。", icon: Briefcase },
      { title: "运营 / 市场", content: "数据分析 + 投放文案 + 社媒管理 + 用户增长自动化。", icon: BarChart3 },
      { title: "学生 / 求职者", content: "简历优化 + 面试准备 + 论文辅助 + 学习效率提升。", icon: GraduationCap }
    ],
    lessons: [
      {
        title: "内容创作者：AI 驱动的日更内容生产线",
        content: "搭建从选题到分发的全流程自动化内容生产线。一个人产出传统 5 人团队的内容量。",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop",
        details: [
          "选题研究：GPT-5.4 网页搜索功能，分析热门话题和用户痛点",
          "深度写作：Claude Sonnet 4.6（100 万上下文），可同时参考多篇长文档",
          "视频生成：Sora 2 支持同步音频生成 / 可灵 Kling 国产替代",
          "图像生成：GPT Image 1.5 / Midjourney / 通义万相",
          "定时发布：Coze 直连抖音/公众号 / n8n 连接任意平台 / OpenClaw 全渠道推送",
          "数据复盘：自动化工具定时抓取各平台数据，生成周报"
        ],
        fullContent: [
          { subtitle: "1. 选题研究", text: "GPT-5.4 支持网页搜索和文件搜索功能。你可以让它搜索热门话题 → 分析用户痛点 → 筛选相关选题 → 生成受众分析。也可以用 Perplexity 做实时搜索，获取最新数据。" },
          { subtitle: "2. 深度写作", text: "Claude Sonnet 4.6 提供 100 万 tokens 上下文窗口。你可以同时喂给它 10+ 篇参考文章，让它基于全面的信息进行深度写作。适合长文、深度分析、技术教程。" },
          { subtitle: "3. 自动化发布", text: "Coze 可以直接连接抖音和微信公众号，实现一键发布。n8n 可以通过 API 连接几乎任何平台。OpenClaw 通过聊天渠道推送内容。选择最适合你的平台组合。" }
        ]
      },
      {
        title: "独立开发者：用 AI Agent 从零构建产品",
        content: "利用 Cursor/Kiro 的 Agent 自主编程能力，让非专业程序员也能独立开发产品。",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop",
        details: [
          "Cursor Agent：自主理解需求 → 探索代码库 → 生成可工作代码 → 运行测试",
          "Kiro Spec 驱动：需求文档 → 设计文档 → 任务拆分 → 逐步实现",
          "Tab 智能补全：极快速度预测下一步操作，多行连续补全",
          "深度代码库理解：语义搜索整个项目结构",
          "多模型支持：OpenAI / Anthropic / Gemini / DeepSeek 可选",
          "成本控制：配合 DeepSeek V3.2 作为后端模型，大幅降低 API 成本"
        ],
        fullContent: [
          { subtitle: "1. Agent 自主编程", text: "Cursor Agent 和 Kiro 都支持 Agent 模式。你可以给它一个任务描述（如\"根据这份设计稿构建登录页面\"），它会自主理解需求 → 探索代码库 → 编写代码 → 运行测试。适合构建完整功能模块。" },
          { subtitle: "2. Spec 驱动开发（Kiro 特色）", text: "Kiro 提供 Spec 驱动开发流程：先写需求文档，AI 自动生成设计文档和任务列表，然后逐步实现。这种方式更适合复杂项目，确保开发方向不偏离。" },
          { subtitle: "3. 适合超级个体的开发策略", text: "先用 Agent 搭建项目框架，再用 Tab/Cmd+K 逐步完善细节。遇到不懂的技术问题，直接在 IDE 中向 AI 提问。对于成本敏感的场景，可以配合 DeepSeek V3.2 作为后端模型。" }
        ]
      },
      {
        title: "电商 / 自由职业：AI 全自动运营体系",
        content: "搭建覆盖选品、客服、内容、数据分析的全自动电商运营体系。",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop",
        details: [
          "24/7 自动客服：FastGPT 知识库问答 / OpenClaw 全渠道接入 / Coze 微信集成",
          "商品内容生成：GPT Image 1.5 生成商品图 + Claude 撰写详情页",
          "选品数据分析：DeepSeek 思考模式分析平台数据，成本极低",
          "竞品监控：n8n 定时抓取竞品价格和活动信息",
          "社媒自动发布：Coze 连接抖音/公众号 + n8n 连接其他平台",
          "财务报表：DeepSeek 分析收支数据，生成可视化报告"
        ],
        fullContent: [
          { subtitle: "1. 24/7 自动客服体系", text: "推荐方案：FastGPT（导入产品文档构建知识库）+ 接入微信/飞书客服渠道。或者 OpenClaw + DeepSeek V3.2（成本极低，缓存命中 $0.028/MTok）。常见问题自动回复，复杂问题创建工单通知人工。" },
          { subtitle: "2. 商品内容批量生成", text: "用 Claude Sonnet 4.6 的 100 万上下文窗口，同时参考竞品详情页和用户评价，生成差异化的商品描述。再用 GPT Image 1.5 或通义万相生成商品图。每个商品详情页费用约 $0.01。" },
          { subtitle: "3. 选品与数据分析", text: "将平台数据喂给 DeepSeek reasoner（思考模式），它会进行多步推理分析。128K 上下文窗口足够处理大量数据。成本约 $0.42/MTok 输出，比 GPT-5.4 便宜 35 倍。" }
        ]
      },
      {
        title: "设计师：AI 辅助设计与创意工作流",
        content: "利用 AI 绘图工具加速设计流程，从灵感获取到素材生成到客户交付，全链路提效。",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=450&fit=crop",
        details: [
          "灵感获取：Midjourney / GPT Image 1.5 快速生成概念图和情绪板",
          "UI/UX 设计：v0.dev（Vercel）AI 生成前端组件 / Galileo AI 生成界面",
          "素材批量处理：AI 批量去背景、调色、生成多尺寸适配图",
          "品牌设计：AI 生成 Logo 方案 → 人工精修 → 输出品牌规范",
          "客户交付自动化：n8n/Dify 自动生成设计说明文档 + 打包交付",
          "成本对比：Midjourney $10/月 vs GPT Image 免费额度 vs Stable Diffusion 本地免费"
        ],
        fullContent: [
          { subtitle: "1. AI 绘图工具选型", text: "Midjourney 擅长艺术风格和创意表达，适合品牌设计和概念图。GPT Image 1.5 擅长精确控制和文字渲染，适合商业设计和产品图。Stable Diffusion 本地部署零成本，适合大批量生成和定制化需求。通义万相是国产替代，中文理解好。" },
          { subtitle: "2. 设计工作流优化", text: "传统流程：客户需求 → 手动找参考 → 手动设计 → 反复修改。AI 流程：客户需求 → AI 生成 10+ 方案 → 筛选 2-3 个方向 → 精修交付。AI 把\"从 0 到 0.8\"的工作自动化了，你专注\"从 0.8 到 1\"的精修和创意决策。" },
          { subtitle: "3. 适合设计师的自动化", text: "用 n8n 或 Dify 搭建自动化流程：客户提交需求表单 → AI 自动生成初版方案 → 推送到你的 Slack/飞书 → 你选择方向后 AI 继续细化 → 自动生成交付文档。整个流程减少 60% 的重复性工作。" }
        ]
      },
      {
        title: "产品经理：AI 驱动的需求分析与文档生成",
        content: "用 AI 加速需求分析、PRD 撰写、用户调研总结、竞品监控等产品经理核心工作。",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=450&fit=crop",
        details: [
          "需求分析：Claude Opus 4.6 深度分析用户反馈，提取核心需求和优先级",
          "PRD 生成：给 AI 需求描述 + 竞品参考，自动生成结构化 PRD 文档",
          "用户调研：AI 分析访谈记录，提取关键洞察和用户画像",
          "竞品监控：n8n 定时抓取竞品更新 → AI 生成差异报告 → 推送通知",
          "数据分析：DeepSeek 分析产品数据，生成可视化报告和决策建议",
          "会议纪要：AI 自动整理会议录音，提取 Action Items 和决策点"
        ],
        fullContent: [
          { subtitle: "1. PRD 自动生成", text: "给 Claude 或 GPT 一份需求描述和 2-3 个竞品参考，它可以生成包含用户故事、功能列表、优先级矩阵、技术约束的完整 PRD。你只需要审核和调整，而不是从零开始写。节省 70% 的文档撰写时间。" },
          { subtitle: "2. 用户调研分析", text: "将 10+ 份用户访谈记录喂给 Claude Sonnet 4.6（100 万上下文），它可以同时分析所有访谈，提取共性需求、痛点排序、用户画像。比人工整理快 10 倍，且不会遗漏细节。" },
          { subtitle: "3. 竞品自动监控", text: "用 n8n 搭建自动化：Schedule Trigger（每周一次）→ HTTP 请求（抓取竞品页面）→ AI 节点（对比上次快照）→ Notion 节点（写入竞品数据库）→ Slack 通知（推送差异报告）。设置一次，永久运行。" }
        ]
      },
      {
        title: "运营 / 市场人员：AI 驱动的增长与内容运营",
        content: "用 AI 加速数据分析、投放优化、社媒管理、用户增长等运营核心工作。",
        image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&h=450&fit=crop",
        details: [
          "数据分析：DeepSeek 分析运营数据，生成周报/月报和趋势洞察",
          "投放文案：AI 批量生成 A/B 测试文案，提高投放 ROI",
          "社媒管理：Coze 连接多平台 + AI 自动生成内容 + 定时发布",
          "用户增长：AI 分析用户行为数据，生成增长策略建议",
          "活动策划：AI 生成活动方案、文案、海报设计方向",
          "SEO 优化：AI 分析关键词、生成 SEO 友好的内容"
        ],
        fullContent: [
          { subtitle: "1. 数据分析自动化", text: "将运营数据（CSV/Excel）喂给 DeepSeek 或 Claude，它可以自动生成数据分析报告，包含趋势图表描述、异常点标注、优化建议。配合 n8n 定时触发，每周自动生成周报推送到飞书群。" },
          { subtitle: "2. 投放文案批量生成", text: "给 AI 产品卖点和目标人群描述，它可以一次生成 20+ 条不同角度的投放文案，用于 A/B 测试。DeepSeek 成本极低，生成 100 条文案的 API 费用不到 1 元。" },
          { subtitle: "3. 社媒内容矩阵", text: "用 Coze 创建内容生成 Bot，连接抖音和公众号。每天自动分析热点 → 生成适合各平台的内容（短视频脚本/图文/长文）→ 定时发布。你只需要审核和微调。" }
        ]
      },
      {
        title: "学生 / 求职者：AI 助力学习与职业发展",
        content: "用 AI 提升学习效率、优化简历、准备面试、辅助论文写作。",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=450&fit=crop",
        details: [
          "学习提效：AI 总结课程笔记、生成思维导图、创建闪卡复习",
          "简历优化：AI 分析 JD 要求，针对性优化简历内容和措辞",
          "面试准备：AI 模拟面试官，针对目标岗位进行模拟面试",
          "论文辅助：AI 辅助文献综述、大纲生成、语法润色（注意学术诚信）",
          "项目实战：用 Cursor/Kiro 开发个人项目，积累作品集",
          "成本：全部使用免费工具即可，月成本 $0"
        ],
        fullContent: [
          { subtitle: "1. 学习效率提升", text: "把课程 PPT 或教材章节喂给 AI，让它生成：核心概念总结、知识点之间的关联、易混淆点对比、练习题。用 Kimi K2.5 的 256K 上下文，可以一次性分析整本教材。全部使用免费额度，零成本。" },
          { subtitle: "2. 求职全流程 AI 辅助", text: "简历优化：把 JD 和你的简历喂给 AI，让它针对性调整措辞和重点。面试准备：让 AI 扮演面试官，针对目标岗位进行模拟面试，给出改进建议。作品集：用 Cursor 免费版开发 1-2 个小项目，展示你的 AI 应用能力。" },
          { subtitle: "3. 学术诚信提醒", text: "AI 可以辅助论文写作（文献综述、大纲生成、语法润色），但不能替代你的原创思考。大多数高校已有 AI 使用政策，请务必了解并遵守。建议：用 AI 做\"助手\"而非\"代笔\"，所有核心观点和分析必须是你自己的。" }
        ]
      }
    ],
    cta: { text: "场景掌握后，去看真实落地案例 → 查看真实案例库", link: "/module/cases" }
  },
  "cases": {
    title: "真实案例库",
    subtitle: "可验证 · 公开报道 · 深度拆解",
    icon: Users,
    color: "purple",
    description: "精选公开报道的\"1人+AI\"真实案例，包括海外案例、国内案例和失败教训。拆解工具组合、工作流和真实收入。不画大饼，只讲事实。",
    lastVerified: "2026-03-25",
    keyTakeaways: [
      "了解真实的 AI 创业案例与收入数据（海外+国内）",
      "拆解成功案例的工具组合与工作流",
      "从失败案例中学习避坑经验",
      "找到适合你的 AI 变现路径"
    ],
    sections: [
      { title: "海外案例", content: "Ishan Sharma、Every 公司等公开报道的真实 AI 创业故事。", icon: Globe },
      { title: "国内案例", content: "自媒体博主、独立开发者用 AI 创业的真实经历。", icon: Users },
      { title: "失败教训", content: "AI 创业常见误区、真实困难与应对策略。从别人的失败中学习。", icon: AlertTriangle }
    ],
    lessons: [
      {
        title: "海外案例：Ishan Sharma 用 8 个 AI 工具运营 300 万粉丝",
        content: "Ishan Sharma 是一位印度 YouTuber，在 TED2025 上分享了如何用 8 个 AI 工具将团队从 40 人缩减到 25 人，同时维持 300 万粉丝的内容产出。",
        image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&h=450&fit=crop",
        details: ["背景：印度知名科技 YouTuber，300 万订阅", "8 个 AI 工具：ChatGPT / Claude / Midjourney / Cursor 等", "团队精简：40 人 → 25 人，效率不降反升", "核心策略：AI 负责草稿和初版，人类负责创意决策", "关键认知：AI 不是替代人，而是让每个人产出 10 倍", "来源：TED2025 演讲 / 网易报道"],
        fullContent: [
          { subtitle: "1. 背景与工具组合", text: "Ishan Sharma 在 TED2025 演讲中详细介绍了他使用的 8 个 AI 工具：ChatGPT 用于脚本初稿，Claude 用于深度研究，Midjourney 用于缩略图，Cursor 用于网站开发，以及用于视频剪辑、SEO 优化等环节的 AI 工具。" },
          { subtitle: "2. 团队变化", text: "通过引入 AI 工具，他的团队从 40 人缩减到 25 人，但内容产出量反而增加了。AI 处理了脚本初稿、素材整理、SEO 优化等重复性工作，让团队成员可以专注于创意和策略。" },
          { subtitle: "3. 核心观点与启示", text: "Ishan 强调：AI 不会取代内容创作者，但会用 AI 的创作者会取代不会用的人。他建议每个人都应该学会至少 3 个 AI 工具。注意：他具备强个人 IP 基础，普通人直接复制难度较高。" }
        ]
      },
      {
        title: "海外案例：Samuel 从配镜师到程序员，3 个月收入 $35K",
        content: "Samuel 原本是一名配镜师，通过复制成功的应用并利用 AI 工具学习编程，在 3 个月内实现了月收入 3.5 万美元。",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop",
        details: ["背景：配镜师转行，零编程基础", "方法：复制已有成功应用的商业模式", "工具：Cursor / ChatGPT 辅助学习编程", "时间线：3 个月达到 $35K/月收入", "关键策略：找到验证过的市场需求，用 AI 降低技术门槛", "⚠️ 风险提示：复制模式有法律风险，收入数据存在样本偏差"],
        fullContent: [
          { subtitle: "1. 转型路径", text: "Samuel 的核心策略是：不发明轮子，而是找到已有成功的小型应用（如工具类 App），用 AI 工具快速复制并改进。Cursor 帮他处理了大部分编码工作，ChatGPT 帮他理解业务逻辑。" },
          { subtitle: "2. 收入数据（需理性看待）", text: "根据腾讯云报道，Samuel 在转型 3 个月后月收入达到 3.5 万美元。但需注意：这是经过筛选报道的案例，不代表普遍水平。大多数人的转型过程会更长、更艰难。存在明显的幸存者偏差。" },
          { subtitle: "3. 需要注意的风险", text: "复制模式存在知识产权风险。Samuel 有配镜师的工作收入支撑转型期，并非完全从零开始。AI 创业不能保证快速成功，需要充分的准备和持续的学习。来源：腾讯云 2025.9 报道。" }
        ]
      },
      {
        title: "海外案例：Every 公司 15 人团队实现 7 位数营收",
        content: "Every 是一家美国媒体公司，通过大量使用 AI 自动化工具，仅 15 人团队实现了 7 位数的年营收。",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=450&fit=crop",
        details: ["背景：美国媒体公司，垂直领域内容", "团队：仅 15 人，实现 7 位数年营收", "AI 应用：内容生成、编辑、分发全流程", "核心理念：AI 负责生产，人类负责质量和方向", "关键洞察：小团队 + AI 可以挑战大公司", "⚠️ 前提：团队具备深厚的媒体行业经验"],
        fullContent: [
          { subtitle: "1. Every 的 AI 策略", text: "Every 团队在内容生产的各个环节都引入了 AI：选题分析用 AI 搜索数据，初稿由 AI 撰写，编辑用 AI 辅助校对，分发用 AI 优化 SEO。人类编辑主要负责质量把控和方向决策。" },
          { subtitle: "2. 关键成功因素", text: "Every 的成功不仅因为用了 AI，更因为他们有深厚的媒体行业经验。AI 是加速器，不是起点。团队对内容质量的把控能力才是核心竞争力。来源：腾讯云 2026.3 报道。" },
          { subtitle: "3. 对普通人的启示", text: "如果你想复制这种模式，首先要在某个垂直领域建立专业能力，然后再用 AI 放大你的产出。AI 不能替代专业知识。" }
        ]
      },
      {
        title: "国内案例：被裁程序员用 AI 做独立开发，月入 2 万+",
        content: "一位被大厂裁员的前端程序员，利用 Cursor + DeepSeek 在 3 个月内开发了 2 个 SaaS 工具，实现月收入 2 万元以上。",
        image: "https://images.unsplash.com/photo-1537432376149-e84978e17f69?w=800&h=450&fit=crop",
        details: ["背景：大厂前端程序员，被裁后转型独立开发", "工具：Cursor Agent + DeepSeek V3.2 + Vercel 部署", "产品：2 个垂直领域 SaaS 工具（效率工具 + 数据分析）", "时间线：3 个月从 0 到月入 2 万+", "关键策略：选择自己熟悉的领域，用 AI 加速开发", "⚠️ 前提：有扎实的编程基础和行业认知"],
        fullContent: [
          { subtitle: "1. 转型路径", text: "被裁后他没有急于找工作，而是花 2 周调研了独立开发的可行性。他选择了自己最熟悉的前端效率工具领域，用 Cursor Agent 快速开发 MVP。第一个产品上线 2 周后获得了第一批付费用户。" },
          { subtitle: "2. 工具组合与成本", text: "Cursor Pro $20/月 + DeepSeek API 约 $10/月 + Vercel 免费版 + 域名 $10/年。总月成本约 $30（约 200 元）。收入来源：SaaS 订阅（$5-15/月/用户）。3 个月后积累了约 200 个付费用户。" },
          { subtitle: "3. 经验与教训", text: "他强调：编程基础是前提，AI 只是加速器。没有编程基础的人用 Cursor 也能写代码，但很难做出有竞争力的产品。另外，获客比开发更难——他花了大量时间在小红书和 V2EX 做内容营销。来源：小红书/即刻社区公开分享。" }
        ]
      },
      {
        title: "国内案例：自媒体博主用 AI 实现内容日更，粉丝翻 3 倍",
        content: "一位知识类自媒体博主，通过引入 AI 工具链实现了从周更到日更的转变，6 个月内全平台粉丝从 5 万增长到 15 万。",
        image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&h=450&fit=crop",
        details: ["背景：知识类自媒体博主，原本周更 1-2 篇", "工具：Claude 写作 + Coze 自动发布 + 可灵生成视频片段", "效果：周更 → 日更，粉丝 5 万 → 15 万（6 个月）", "核心方法：AI 生成初稿 70%，人工精修 30%", "收入变化：广告收入从 3000/月 → 1.2 万/月", "⚠️ 前提：已有 5 万粉丝基础和内容创作经验"],
        fullContent: [
          { subtitle: "1. 工作流设计", text: "每天早上：Perplexity 搜索热点 → Claude 生成 3 个选题 → 选择 1 个 → Claude 写初稿 → 人工精修（约 30 分钟）→ Coze 自动发布到公众号和小红书。视频内容：文字脚本 → 可灵生成视频片段 → 剪映拼接 → 发布抖音。" },
          { subtitle: "2. 关键转折点", text: "她发现 AI 写的内容虽然\"正确\"但缺乏个人风格。解决方案：先让 AI 学习她过去 50 篇文章的风格，然后在 System Prompt 中固定风格要求。这样 AI 生成的初稿已经有 70% 的\"她的味道\"，精修时间从 2 小时降到 30 分钟。" },
          { subtitle: "3. 经验总结", text: "AI 最大的价值不是\"替你写\"，而是\"帮你想\"。选题和角度是最耗时的环节，AI 可以快速生成大量选题供你筛选。但最终的内容质量取决于你的审美和判断力。来源：公众号/小红书公开分享。" }
        ]
      },
      {
        title: "失败教训：3 个 AI 创业踩坑案例与避坑指南",
        content: "不是所有 AI 创业都能成功。这里整理了 3 个常见的失败模式，帮你避开最容易踩的坑。",
        image: "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=800&h=450&fit=crop",
        details: [
          "坑 1：\"AI 包装壳\"创业 — 只是套了个 API，没有核心壁垒，很快被替代",
          "坑 2：过度依赖单一模型 — 模型降价或竞品出现时，利润瞬间归零",
          "坑 3：忽视获客成本 — 产品做出来了，但没人知道，获客比开发贵 10 倍",
          "坑 4：高估 AI 能力 — 以为 AI 能替代所有人工，结果质量不达标丢客户",
          "坑 5：没有验证需求就开发 — 花 3 个月做产品，上线后发现没人需要",
          "核心教训：AI 是工具，不是商业模式。商业模式的核心是解决真实问题"
        ],
        fullContent: [
          { subtitle: "1. \"AI 包装壳\"的陷阱", text: "很多人看到 ChatGPT 火了，就做一个\"XX 领域的 ChatGPT\"——本质上只是调用 API 加了个界面。问题是：这种产品没有技术壁垒，任何人都能在一天内复制。当 OpenAI 自己推出类似功能时，这类产品瞬间失去价值。正确做法：AI 是底层能力，你的壁垒应该是行业知识、数据积累或用户关系。" },
          { subtitle: "2. 获客成本被严重低估", text: "独立开发者最常犯的错误：花 90% 的时间做产品，10% 的时间做推广。现实是：获客成本往往是开发成本的 5-10 倍。一个 SaaS 产品的获客成本（CAC）通常在 50-500 元/用户。如果你的产品定价 $5/月，需要 10-100 个月才能回本。建议：先验证需求（发问卷、做访谈），再开发 MVP。" },
          { subtitle: "3. 如何正确起步", text: "第一步：在你擅长的领域找到一个真实的痛点。第二步：用最简单的方式验证（甚至不需要写代码，用 Notion + AI 手动服务 10 个客户）。第三步：确认有人愿意付费后，再用 Cursor/Kiro 开发产品。第四步：把 50% 的精力放在获客上。AI 降低了开发门槛，但没有降低商业的本质难度。" }
        ]
      }
    ],
    cta: { text: "看完案例，按路线开始实操 → 打开成长路径", link: "/module/growth" }
  },
  "growth": {
    title: "成长路径",
    subtitle: "分阶段 · 可执行 · 循序渐进",
    icon: BookOpen,
    color: "emerald",
    description: "基于真实案例和官方工具能力，规划从零基础到独立运营 AI 业务的务实成长路线。不承诺暴富，标注每个阶段的工具成本和时间投入。",
    lastVerified: "2026-03-25",
    keyTakeaways: [
      "阶段 0（1-2 周）：注册 DeepSeek/Claude，体验 AI 能力边界，月成本 $0",
      "阶段 1（1-3 月）：在现有工作中深度使用 AI，搭建自动化工作流",
      "阶段 2（3-6 月）：基于垂直领域知识 + AI 能力，构建产品或服务，验证变现",
      "阶段 3（6-12 月）：从副业到规模化，建立护城河和持续竞争力"
    ],
    sections: [
      { title: "阶段 0：上手", content: "注册 2-3 个 AI 工具，体验它们的能力边界。不做任何投资，纯免费体验。", icon: Lightbulb },
      { title: "阶段 1：提效", content: "在现有工作中找到 3 个 AI 可优化的环节，搭建自动化工作流。", icon: Zap },
      { title: "阶段 2：变现", content: "基于阶段 1 积累的垂直领域知识 + AI 工作流，构建 MVP 产品或服务。", icon: Rocket },
      { title: "阶段 3：规模化", content: "从副业到全职，建立护城河，探索规模化增长路径。", icon: TrendingUp }
    ],
    lessons: [
      {
        title: "阶段 0（1-2 周）：零成本体验 AI 能力边界",
        content: "目标：注册并使用 3 个以上 AI 工具，完成 5 个具体任务。不做任何付费，纯免费体验。",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop",
        details: [
          "Day 1-3：注册 DeepSeek 和 Kimi，免费使用",
          "Day 4-7：用 DeepSeek 完成：写商务邮件、总结长文、分析表格",
          "Day 8-10：用 Kimi K2.5 的 256K 上下文，同时分析 3 篇长文档",
          "Day 11-14：用 Claude 免费版完成一次深度写作任务，体验质量差异",
          "成本：$0（全部使用免费额度）",
          "里程碑：用 AI 独立完成 5 个具体任务，建立\"AI 能帮我做什么\"的直觉"
        ],
        fullContent: [
          { subtitle: "1. 为什么从免费开始？", text: "很多人上来就充值 API，结果发现不知道怎么用。正确的做法是先用免费工具充分体验 AI 的能力边界。DeepSeek 新用户有赠金额度，Kimi 提供免费额度，Claude 网页版免费使用。只有当你明确了\"我需要 AI 帮我做什么\"之后，再考虑付费。" },
          { subtitle: "2. 重点体验什么？", text: "不是体验\"AI 能聊什么\"，而是体验\"AI 在你具体工作中能帮什么忙\"。试着把你每天最耗时的 3 个任务交给 AI。观察它做得好的地方和做得不好的地方。做好记录，这是你后续搭建自动化工作流的基础。" },
          { subtitle: "3. 各工具的免费额度", text: "DeepSeek（platform.deepseek.com）：新用户赠金。Kimi（platform.moonshot.cn）：免费试用额度。Claude（claude.ai）：网页版免费，有每日消息限制。ChatGPT（chatgpt.com）：基础版免费。Coze（coze.cn）：完全免费使用。" }
        ]
      },
      {
        title: "阶段 1（1-3 月）：搭建 AI 工作流，实现 3-5 倍提效",
        content: "目标：在现有工作中找到 3 个 AI 可优化的环节，搭建自动化工作流，效率提升 3-5 倍。月成本控制在 $30 以内。",
        image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=450&fit=crop",
        details: [
          "第 1 周：复盘日常工作，找到最耗时的 3 个重复性环节",
          "第 2-4 周：为每个环节设计 AI 辅助工作流",
          "第 5-8 周：选择一个自动化平台（Coze/Dify/n8n/OpenClaw），将工作流升级为自动化",
          "第 9-12 周：开始在小红书/知乎等平台分享 AI 使用经验，积累个人品牌",
          "成本：DeepSeek API 约 $5-15/月 + 自动化平台免费版",
          "里程碑：工作效率明显提升，开始积累个人品牌"
        ],
        fullContent: [
          { subtitle: "1. 如何找到提效切入点？", text: "记录你一周内所有工作任务及耗时，找到\"重复性高、规律性强、不需要深度创意\"的环节。例如：每日数据汇总报告（30 分钟/天 → 自动化 → 0 分钟）、客户邮件分类和草拟回复（1 小时/天 → AI 处理 → 15 分钟审核）。" },
          { subtitle: "2. 从手动到自动化的升级路径", text: "第一阶段（手动）：你手动把数据喂给 AI。第二阶段（半自动）：设计好 Prompt 模板，每次只需填入变量。第三阶段（全自动）：用自动化平台设置定时任务，AI 自动读取数据、处理、生成报告、推送通知。" },
          { subtitle: "3. 为什么要分享？", text: "分享不是自嗨，是战略。分享倒逼你持续学习，帮你建立垂直领域的专业形象，积累未来变现的受众基础。平台选择：小红书（适合实操教程）、知乎（适合深度分析）、公众号（适合长文）。关注 AI Superman DJY 公众号获取更多实战分享。" }
        ]
      },
      {
        title: "阶段 2（3-6 月）：构建产品或服务，验证变现",
        content: "目标：基于阶段 1 积累的垂直领域知识和 AI 工作流，构建 MVP 产品或服务，获得第一笔 AI 相关收入。不要辞去主业，先从副业开始验证。",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=450&fit=crop",
        details: [
          "方向 1：AI 培训/咨询（基于你的实战经验，帮企业/个人用 AI 提效）",
          "方向 2：AI 工具/插件开发（用 Cursor/Kiro 开发 Chrome 插件、小程序等）",
          "方向 3：付费内容（知识星球、付费专栏，基于阶段 1 积累的受众）",
          "方向 4：一人公司（用 AI 运营电商/自媒体，自动化做运营）",
          "成本：Cursor Pro $20/月 + Claude API $10-30/月 + DeepSeek $5/月 ≈ $35-55/月",
          "里程碑：获得第一笔 AI 相关收入（不论金额大小）"
        ],
        fullContent: [
          { subtitle: "1. 选择变现方向的核心原则", text: "不是\"AI 最火什么就做什么\"，而是\"你擅长什么 + AI 能放大什么\"。Samuel 的案例说明了这一点：他选择的方向结合了他的执行力优势和 AI 的技术门槛降低。Every 公司的案例同样说明：成功核心不是 AI，而是深厚的行业经验。" },
          { subtitle: "2. MVP 方法论", text: "不要花 3 个月打磨\"完美产品\"。先做一个最小可行产品（MVP），在 1-2 周内上线，快速获取反馈。内容产品：先写 3 篇免费深度文章测试市场反应。工具产品：用 Cursor/Kiro 在 1-2 周内开发核心功能。咨询服务：先免费帮 3 个人解决问题，收集案例和口碑。" },
          { subtitle: "3. 成本与收入预期", text: "月运营成本约 $35-55。从开始学习 AI 到获得第一笔收入，通常需要 3-6 个月。不要被\"月入 10 万\"的标题误导，务实规划，持续行动。" }
        ]
      },
      {
        title: "阶段 3（6-12 月）：从副业到规模化，建立护城河",
        content: "目标：将验证成功的副业升级为可持续的业务。建立竞争壁垒，探索规模化增长路径。这个阶段的核心是\"从 1 到 10\"。",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop",
        details: [
          "护城河建设：积累独有数据/用户关系/行业认知，而非依赖 AI 技术本身",
          "规模化路径：从服务 10 个客户到服务 100 个客户，需要产品化和自动化",
          "团队扩展：从一人到 2-3 人小团队，AI 处理执行，人负责决策和创意",
          "收入多元化：不依赖单一收入来源，建立订阅+咨询+内容的组合模型",
          "风险管理：不要过早辞去主业，副业收入稳定覆盖生活成本后再考虑全职",
          "持续学习：AI 行业进化极快，每周花 30 分钟跟进官方文档更新"
        ],
        fullContent: [
          { subtitle: "1. 什么是真正的护城河？", text: "AI 技术本身不是护城河——任何人都能调用同样的 API。真正的护城河是：垂直领域的深度知识（别人学不会）、积累的用户关系和信任（别人抢不走）、独有的数据资产（别人没有）、品牌认知（用户想到这个领域就想到你）。把 AI 当作放大器，把你的独特价值当作核心。" },
          { subtitle: "2. 从一人到小团队", text: "当副业收入稳定后，可以考虑扩展到 2-3 人的小团队。分工原则：你负责决策、创意和客户关系，AI 负责执行和自动化，团队成员负责你不擅长的领域（如设计、运营、技术）。不要急于招人，先用 AI 和外包覆盖能力缺口。" },
          { subtitle: "3. 什么时候可以全职？", text: "建议标准：副业收入连续 3 个月超过主业收入的 80%，且有 6 个月以上的现金储备。不要在\"第一个月赚了 1 万\"就辞职——需要验证收入的可持续性。很多 AI 创业的收入波动很大，需要足够的缓冲。" }
        ]
      },
      {
        title: "持续迭代：跟进行业动态，保持竞争力",
        content: "AI 行业进化速度极快。你需要持续跟进官方更新，保持工具和知识的领先。",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=450&fit=crop",
        details: [
          "OpenAI 官方博客：platform.openai.com — 新模型、新功能、API 更新",
          "Anthropic 官方文档：docs.anthropic.com — Claude 模型更新",
          "DeepSeek 官方文档：api-docs.deepseek.com — 模型和定价更新",
          "月之暗面开放平台：platform.moonshot.cn — Kimi 模型更新",
          "AI Superman DJY 公众号：第一时间获取中文解读和实战教程",
          "社群交流：加入 AI 相关社群，持续交流和学习"
        ],
        fullContent: [
          { subtitle: "1. 模型进化速度", text: "AI 模型每隔几个月就有重大更新。上下文窗口从 128K 扩展到 1M，新增网页搜索、计算机使用等能力。这些变化意味着你半年前的工作流可能已经可以大幅优化。" },
          { subtitle: "2. 建立信息获取习惯", text: "每周花 30 分钟浏览各官方文档的更新日志。重点关注：新模型发布（可能有更好的性价比）、新 API 功能（可能简化你的工作流）、定价变化（可能降低成本）。关注 AI Superman DJY 公众号获取中文解读。" },
          { subtitle: "3. 社群的力量", text: "加入 AI 相关社群，持续交流。你遇到的问题大概率别人也遇到过。社群的价值不仅是信息，更是人脉——很多合作和机会来自社群。" }
        ]
      }
    ]
  }
};

// --- FAQ Data ---
const FAQ_DATA = [
  { q: "我完全零基础，能学吗？", a: "完全可以。阶段 0 专门为零基础设计，所有工具都有免费版本，跟着步骤操作即可。不需要编程基础，不需要英语基础。" },
  { q: "需要花多少钱？", a: "阶段 0 完全免费（$0）。阶段 1 月成本约 $5-15（主要是 DeepSeek API）。阶段 2 月成本约 $35-55（Cursor Pro + API 费用）。你可以根据自己的节奏控制投入。" },
  { q: "和其他 AI 课程有什么区别？", a: "我们不卖课，所有内容免费开放。我们基于各厂商官方文档，标注数据来源，拒绝泛泛而谈。每个场景提供多平台方案，不绑定单一工具。" },
  { q: "学完能赚钱吗？", a: "我们不承诺任何收入。真实案例库中的数据都标注了来源和风险提示。AI 是工具，不是印钞机。你的收入取决于你的行业知识、执行力和市场判断。" },
  { q: "我不是程序员，能用 Cursor/Kiro 开发产品吗？", a: "可以尝试，但要有合理预期。AI 编程工具大幅降低了技术门槛，但做出有竞争力的产品仍需要一定的技术理解。建议从简单的工具类产品开始。" },
  { q: "内容多久更新一次？", a: "我们持续跟进各厂商官方文档更新。每个模块都标注了\"数据验证日期\"，确保信息时效性。关注公众号可以第一时间获取更新通知。" },
  { q: "OpenClaw / Claude Code / Manus 选哪个？", a: "取决于你的需求：数据隐私优先选 OpenClaw（开源本地部署），编程场景选 Claude Code（终端原生 Agent），全自主任务选 Manus AI（给目标自动执行）。非技术用户想快速体验可以先试 Manus 或 Coze。详见智能体实战专区的对比。" },
  { q: "如何加入社区？", a: "关注公众号「AI Superman DJY」，回复\"社群\"即可获取加入方式。社群内有实战交流、工具推荐、案例分享等内容。" },
];

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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled ? "bg-black/80 backdrop-blur-md border-white/10 py-4" : "bg-transparent border-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)]">
            <Zap className="text-white fill-white" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">AI Superman <span className="text-blue-500">DJY</span></span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">首页</Link>
          {Object.entries(MODULE_CONTENT).map(([id]) => (
            <Link key={id} to={`/module/${id}`} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">{NAV_LABELS[id] || id}</Link>
          ))}
          <Link to="/about" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">关于</Link>
          <Link to="/faq" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">FAQ</Link>
        </div>
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-black border-b border-white/10 p-6 flex flex-col gap-4">
            <Link to="/" className="text-lg font-medium text-gray-400" onClick={() => setIsMobileMenuOpen(false)}>首页</Link>
            {Object.entries(MODULE_CONTENT).map(([id]) => (
              <Link key={id} to={`/module/${id}`} className="text-lg font-medium text-gray-400" onClick={() => setIsMobileMenuOpen(false)}>{NAV_LABELS[id] || id}</Link>
            ))}
            <Link to="/about" className="text-lg font-medium text-gray-400" onClick={() => setIsMobileMenuOpen(false)}>关于</Link>
            <Link to="/faq" className="text-lg font-medium text-gray-400" onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Learning Roadmap ---
const LearningRoadmap = () => {
  const navigate = useNavigate();
  const steps = [
    { id: "super-individual", label: "AI 入门", time: "1-2 周", color: "blue" },
    { id: "llm", label: "大模型实战", time: "1-2 周", color: "purple" },
    { id: "openclaw", label: "智能体实战", time: "2-4 周", color: "emerald" },
    { id: "scenarios", label: "场景实战", time: "持续", color: "orange" },
    { id: "cases", label: "案例学习", time: "随时", color: "purple" },
    { id: "growth", label: "成长路径", time: "3-12 月", color: "emerald" },
  ];
  return (
    <section id="learning-roadmap" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">学习路线图</h2>
        <p className="text-gray-400">按顺序学习效果最佳，也可以根据需要跳转到任意模块。</p>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-0 justify-center">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/module/${step.id}`)}
              className={`px-5 py-3 rounded-2xl bg-${step.color}-600/15 border border-${step.color}-500/30 cursor-pointer hover:bg-${step.color}-600/25 transition-all text-center min-w-[120px]`}>
              <p className={`text-${step.color}-400 font-bold text-sm`}>{step.label}</p>
              <p className="text-xs text-gray-500 mt-1">{step.time}</p>
            </motion.div>
            {i < steps.length - 1 && <ChevronRight size={20} className="text-gray-600 mx-1 hidden md:block" />}
          </div>
        ))}
      </div>
    </section>
  );
};

const Hero = () => {
  const handleStart = () => {
    const roadmapSection = document.getElementById("learning-roadmap");
    if (roadmapSection) {
      roadmapSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleLearnMore = () => {
    const communitySection = document.getElementById("community");
    if (communitySection) {
      communitySection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-600/20 blur-[120px] rounded-full" />
      </div>
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-400 uppercase bg-blue-400/10 border border-blue-400/20 rounded-full">
            让每个人成为超级个体
          </span>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white mb-10 leading-[1.1]">
            AI Superman <br className="my-2" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">EVOLUTION</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-10 leading-relaxed">
            探索人工智能的无限可能。从零基础入门到掌握前沿大模型，
            DJY 助你打破边界，重塑自我，成为时代的超级个体。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleStart}
              className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black text-lg rounded-2xl hover:from-blue-500 hover:to-purple-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] cursor-pointer">
              开始探索
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleLearnMore}
              className="w-full sm:w-auto px-10 py-5 bg-white text-blue-600 font-black text-lg rounded-2xl hover:bg-gray-100 transition-all shadow-2xl cursor-pointer">
              了解更多
            </motion.button>
          </div>
        </motion.div>
      </div>
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-500 z-20">
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
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -10, backgroundColor: "rgba(255,255,255,0.08)" }}
      whileTap={{ scale: 0.98 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
      onClick={() => navigate(`/module/${id}`)}
      className="group relative p-8 bg-white/5 border border-white/10 rounded-3xl transition-all cursor-pointer overflow-hidden">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-600/10 blur-3xl group-hover:bg-${color}-600/20 transition-all`} />
      <div className={`w-14 h-14 mb-6 rounded-2xl bg-${color}-600/20 flex items-center justify-center text-${color}-400 group-hover:scale-110 transition-transform`}>
        <Icon size={28} />
      </div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed mb-6">{desc}</p>
      <div className="flex items-center text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
        进入模块 <ChevronRight size={16} className="ml-2 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
};

const Modules = () => {
  const modules = [
    { id: "super-individual", title: "AI 超级个体入门", desc: "从\"知道AI\"到\"用好AI\"。理解超级个体逻辑，掌握 Prompt 基础，搭建个人 AI 工具矩阵。", icon: Rocket, color: "blue" },
    { id: "llm", title: "大模型实战库", desc: "深度解析 GPT-5.4、Claude、DeepSeek 等主流模型。按场景提供 Prompt 模板，选型配置一站搞定。", icon: Brain, color: "purple" },
    { id: "openclaw", title: "AI 智能体实战", desc: "掌握 OpenClaw、Claude Code、Manus 等主流 Agent 平台，搭建你的 24/7 数字员工团队。", icon: Cpu, color: "emerald" },
    { id: "scenarios", title: "超级个体场景库", desc: "覆盖 7 大职业方向：内容创作、开发、电商、设计、产品、运营、求职。每个场景给工具+流程。", icon: Zap, color: "orange" },
    { id: "cases", title: "真实案例库", desc: "海外+国内+失败教训。公开报道的真实案例深度拆解，标注来源和风险提示。", icon: Users, color: "purple" },
    { id: "growth", title: "成长路径", desc: "从零基础到规模化的 4 阶段路线图。标注每阶段成本、时间和里程碑。", icon: BookOpen, color: "emerald" },
  ];
  return (
    <section id="modules" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">六大核心模块</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">从入门到实战，从工具到案例。六大模块覆盖超级个体进化全链路，助你一人成军。</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { value: "6", label: "核心模块" },
          { value: "30+", label: "实战课程" },
          { value: "50+", label: "工具推荐" },
          { value: "7", label: "职业场景" },
        ].map((stat, i) => (
          <div key={i} className="text-center p-6 bg-white/5 border border-white/10 rounded-2xl">
            <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((mod, i) => (<ModuleCard key={mod.title} {...mod} index={i} />))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="text-blue-500 fill-blue-500" size={20} />
              <span className="text-lg font-bold text-white tracking-tighter">AI Superman DJY</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">让每个人成为 AI 时代的超级个体。</p>
            <p className="text-sm text-gray-500">公众号：AI Superman DJY</p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-4">学习模块</h4>
            <div className="flex flex-col gap-2">
              {Object.entries(NAV_LABELS).map(([id, label]) => (
                <Link key={id} to={`/module/${id}`} className="text-sm text-gray-500 hover:text-white transition-colors">{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-4">更多</h4>
            <div className="flex flex-col gap-2">
              <Link to="/about" className="text-sm text-gray-500 hover:text-white transition-colors">关于 DJY</Link>
              <Link to="/faq" className="text-sm text-gray-500 hover:text-white transition-colors">常见问题</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-4">数据来源</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <a href="https://platform.openai.com/docs" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">OpenAI Docs</a>
              <a href="https://docs.anthropic.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Anthropic Docs</a>
              <a href="https://api-docs.deepseek.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">DeepSeek Docs</a>
              <a href="https://platform.moonshot.cn/docs" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Moonshot Docs</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© 2026 AI Superman DJY. 所有内容免费开放。模型数据最后验证：2026-03-25</p>
          <div className="flex items-center gap-6">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Github size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const HomePage = () => {
  return (
    <>
      <Hero />
      <LearningRoadmap />
      <Modules />

      {/* Growth Path Preview */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">成长路径</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">从零基础到独立运营 AI 业务，循序渐进的务实成长路线。</p>
          </div>
          <div className="space-y-8">
            {[
              { phase: "阶段 0", time: "1-2 周", title: "建立 AI 基础认知", desc: "学会使用 ChatGPT/DeepSeek，掌握 Prompt 基础公式，搭建个人工具矩阵", color: "blue" },
              { phase: "阶段 1", time: "1-3 月", title: "深度使用 AI 提效", desc: "在现有工作中深度使用 AI，搭建自动化工作流，开始积累个人品牌", color: "purple" },
              { phase: "阶段 2", time: "3-6 月", title: "探索变现路径", desc: "基于垂直领域知识 + AI 能力，构建个人产品或服务，获得第一笔收入", color: "emerald" },
              { phase: "阶段 3", time: "6-12 月", title: "规模化与护城河", desc: "从副业到全职，建立竞争壁垒，探索规模化增长路径", color: "orange" },
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
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">准备好开启你的 <br /> 超级个体进化了吗？</h2>
            <p className="text-xl text-white/80 mb-6 max-w-2xl mx-auto">关注公众号「AI Superman DJY」，获取最新实战教程和社群入口。</p>
            <p className="text-lg text-white/60 mb-10">所有内容免费开放，持续更新。</p>
            <Link to="/module/super-individual">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-white text-blue-600 font-black text-lg rounded-2xl hover:bg-gray-100 transition-all shadow-2xl cursor-pointer">
                从入门开始学习
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

// --- About Page ---
const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <button onClick={() => navigate("/")} className="flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 返回首页
      </button>
      <div className="flex items-center gap-6 mb-12">
        <div className="w-20 h-20 rounded-3xl bg-blue-600/20 flex items-center justify-center text-blue-400">
          <User size={40} />
        </div>
        <div>
          <h1 className="text-5xl font-black text-white mb-2">关于 DJY</h1>
          <p className="text-gray-400 text-lg">AI Superman EVOLUTION 创始人</p>
        </div>
      </div>

      <div className="space-y-8 text-gray-300 leading-relaxed">
        <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
          <h3 className="text-xl font-bold text-white mb-4">为什么做这个项目？</h3>
          <p>AI 时代已经到来，但大多数人还停留在"听说过 ChatGPT"的阶段。市面上的 AI 课程要么太贵，要么太水，要么过度承诺"月入 10 万"。</p>
          <p className="mt-4">我想做一个不一样的东西：所有内容免费开放，基于官方文档而非道听途说，标注数据来源和风险提示，不画大饼只讲事实。帮助每个人用 AI 成为超级个体——不是替代你，而是放大你。</p>
        </div>

        <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
          <h3 className="text-xl font-bold text-white mb-4">内容原则</h3>
          <div className="space-y-3">
            {[
              "所有模型数据来自官方 API 文档，标注来源和验证日期",
              "案例来自公开报道，标注来源、风险提示和可复制性评估",
              "不绑定单一工具，每个场景提供多平台方案",
              "不承诺收入，务实标注每个阶段的成本和时间投入",
              "持续更新，跟进各厂商官方文档变化",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <ShieldCheck size={18} className="text-emerald-400 mt-1 shrink-0" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
          <h3 className="text-xl font-bold text-white mb-4">联系方式</h3>
          <p>公众号：AI Superman DJY（获取最新内容和社群入口）</p>
          <p className="mt-2">如果你有好的案例、工具推荐或内容建议，欢迎通过公众号联系我。</p>
        </div>
      </div>
    </motion.div>
  );
};

// --- FAQ Page ---
const FAQPage = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <button onClick={() => navigate("/")} className="flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 返回首页
      </button>
      <div className="flex items-center gap-6 mb-12">
        <div className="w-20 h-20 rounded-3xl bg-purple-600/20 flex items-center justify-center text-purple-400">
          <HelpCircle size={40} />
        </div>
        <div>
          <h1 className="text-5xl font-black text-white mb-2">常见问题</h1>
          <p className="text-gray-400 text-lg">关于 AI Superman EVOLUTION 的常见疑问</p>
        </div>
      </div>

      <div className="space-y-3">
        {FAQ_DATA.map((faq, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors">
              <span className="text-white font-medium pr-4">{faq.q}</span>
              <ChevronDown size={20} className={`text-gray-400 shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <p className="px-6 pb-6 text-gray-400 leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// --- Module Page ---
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <button onClick={() => navigate("/")} className="flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 返回首页
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row items-start gap-12 mb-12">
        <div className={`w-24 h-24 rounded-3xl bg-${content.color}-600/20 flex items-center justify-center text-${content.color}-400 shrink-0`}>
          <Icon size={48} />
        </div>
        <div>
          <span className={`text-sm font-bold uppercase tracking-widest text-${content.color}-400 mb-4 block`}>{content.subtitle}</span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">{content.title}</h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">{content.description}</p>
        </div>
      </div>

      {/* Last Verified Badge */}
      {content.lastVerified && (
        <div className="mb-12 flex items-center gap-2 text-sm text-gray-500">
          <Clock size={14} />
          <span>数据最后验证：{content.lastVerified}</span>
          <span className="text-gray-600">·</span>
          <span>基于各厂商官方文档</span>
        </div>
      )}

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {content.sections.map((section: any, i: number) => {
          const SIcon = section.icon;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="p-8 bg-white/5 border border-white/10 rounded-3xl">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white mb-6"><SIcon size={24} /></div>
              <h3 className="text-xl font-bold text-white mb-4">{section.title}</h3>
              <p className="text-gray-400 leading-relaxed">{section.content}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Key Takeaways */}
      {content.keyTakeaways && (
        <div className="mb-20 p-12 bg-blue-600/5 border border-blue-500/20 rounded-[40px]">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3"><Star className="text-yellow-500" /> 核心收获</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.keyTakeaways.map((takeaway: string, i: number) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold shrink-0 mt-1">{i + 1}</div>
                <p className="text-gray-300 leading-relaxed">{takeaway}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lessons */}
      <div className="bg-white/5 border border-white/10 rounded-[40px] p-12">
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3"><BookOpen className="text-blue-500" /> 课程大纲</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.lessons.map((lesson: any, i: number) => (
            <div key={i} onClick={() => setSelectedLesson(lesson)}
              className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group">
              <div className="w-8 h-8 bg-blue-600/20 text-blue-400 rounded-lg flex items-center justify-center text-sm font-bold group-hover:bg-blue-600 group-hover:text-white transition-all">{i + 1}</div>
              <span className="text-gray-300 group-hover:text-white transition-colors flex-1">{lesson.title}</span>
              <ChevronRight size={16} className="text-gray-600 group-hover:text-white transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      {content.cta && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="mt-12 p-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-[32px] text-center">
          <p className="text-lg text-blue-200 mb-6">{content.cta.text.split(" → ")[0]}</p>
          <button onClick={() => navigate(content.cta.link)}
            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-all shadow-xl flex items-center gap-2 mx-auto">
            {content.cta.text.split(" → ")[1]} <ArrowRight size={20} />
          </button>
        </motion.div>
      )}

      {/* Lesson Detail Modal */}
      <AnimatePresence>
        {selectedLesson && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedLesson(null)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl bg-[#121212] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
              <button onClick={() => setSelectedLesson(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-black/40 backdrop-blur-md hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors z-20">
                <X size={20} />
              </button>
              <div className="overflow-y-auto custom-scrollbar">
                <div className="h-64 overflow-hidden relative">
                  <img src={selectedLesson.image} alt={selectedLesson.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/20 to-transparent" />
                </div>
                <div className="p-10 -mt-20 relative">
                  <h2 className="text-3xl font-black text-white mb-6 leading-tight">{selectedLesson.title}</h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-10">{selectedLesson.content}</p>
                  {selectedLesson.fullContent ? (
                    <div className="space-y-10 mb-10">
                      {selectedLesson.fullContent.map((item: any, i: number) => (
                        <div key={i} className="group">
                          <h4 className="text-lg font-bold text-blue-400 mb-3 flex items-center gap-3">
                            <span className="w-8 h-px bg-blue-500/30 group-hover:w-12 transition-all" />{item.subtitle}
                          </h4>
                          <p className="text-gray-400 leading-relaxed pl-11 border-l border-white/5">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4 mb-10">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-blue-500">核心知识点</h4>
                      <div className="space-y-3">
                        {selectedLesson.details.map((detail: string, i: number) => (
                          <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            <span className="text-gray-300 text-sm">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <button onClick={() => setSelectedLesson(null)}
                    className="w-full py-5 bg-blue-600 text-white font-black text-lg rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20">
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
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
