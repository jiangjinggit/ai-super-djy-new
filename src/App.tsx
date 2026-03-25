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

const MODULE_CONTENT: Record<string, any> = {
  "ai-basics": {
    title: "AI 入门",
    subtitle: "零基础 · 快速上手",
    icon: Lightbulb,
    color: "blue",
    description: "从零开始了解人工智能。打破认知壁垒，掌握 AI 时代的基本生存技能，开启您的超级个体进化之路。",
    keyTakeaways: [
      "理解生成式 AI 的底层逻辑与未来趋势",
      "掌握 Prompt Engineering 的核心指令公式",
      "构建属于自己的个人 AI 工具矩阵",
      "建立从“竞争”到“协作”的人机共生思维"
    ],
    sections: [
      {
        title: "AI 认知觉醒",
        content: "揭开 AI 的神秘面纱，理解为什么 2026 年是超级个体的元年。",
        icon: Globe
      },
      {
        title: "提示词工程入门",
        content: "学会与 AI 沟通的艺术，让 AI 真正听懂你的指令。",
        icon: Bot
      },
      {
        title: "工具矩阵搭建",
        content: "从文本到图像，从搜索到办公，挑选最适合你的 AI 武器库。",
        icon: Layers
      }
    ],
    lessons: [
      {
        title: "AI 到底是什么？从图灵测试到 AGI 时代",
        content: "本课将带你穿越 AI 的发展史，理解大模型的本质，并探讨 AI 如何重塑我们的工作与生活。",
        image: "https://picsum.photos/seed/ai-intro/800/450",
        details: [
          "什么是生成式 AI (GenAI)？",
          "Transformer 架构：AI 的“大脑”是如何工作的",
          "从 GPT-1 到 GPT-5：模型进化的速度与激情",
          "AGI (通用人工智能) 离我们还有多远？",
          "AI 时代的职业替代与能力重构",
          "超级个体的崛起：为什么你不再需要庞大的组织"
        ],
        fullContent: [
          {
            subtitle: "1. 生成式 AI 的本质",
            text: "生成式 AI 不仅仅是搜索，它是创造。它通过学习海量人类知识，掌握了语言的统计规律，从而能够根据你的指令生成全新的内容。"
          },
          {
            subtitle: "2. 为什么是现在？",
            text: "算力的爆发、算法 of 优化以及海量高质量数据的积累，使得 AI 在 2020 年代中期实现了质的飞跃，从“人工智障”进化为“数字天才”。"
          },
          {
            subtitle: "3. 你的新身份：AI 导演",
            text: "在 AI 时代，你不再是单纯的执行者，而是导演。AI 是你的演员、编剧和后期，你的核心价值在于你的审美、决策和跨界整合能力。"
          }
        ]
      },
      {
        title: "Prompt Engineering：如何让 AI 成为你的顶级员工",
        content: "提示词工程（Prompt Engineering）是 AI 时代最重要的沟通技能。学会这套公式，你就能释放大模型 200% 的潜力。",
        image: "https://picsum.photos/seed/prompt/800/450",
        details: [
          "万能 Prompt 公式：角色 + 任务 + 约束 + 输出格式",
          "少样本提示 (Few-Shot)：给 AI 几个例子，它会做得更好",
          "思维链 (CoT)：引导 AI 逐步思考，解决复杂逻辑问题",
          "结构化提示词：利用 Markdown 让 Prompt 更清晰",
          "Prompt 调优：如何通过迭代获得完美答案",
          "避坑指南：如何减少 AI 的幻觉与胡言乱语"
        ],
        fullContent: [
          {
            subtitle: "1. 角色设定的重要性",
            text: "给 AI 一个身份（如“资深架构师”或“顶级文案专家”），能显著提升其回答的专业度和语气。这本质上是在引导模型在特定的参数空间内进行预测。"
          },
          {
            subtitle: "2. 任务描述要具体",
            text: "模糊的指令只会得到平庸的回答。明确你的目标、受众、字数限制和语气要求，越具体，AI 的表现就越出色。"
          },
          {
            subtitle: "3. 迭代是关键",
            text: "不要指望一次 Prompt 就能得到完美答案。通过追问、修改约束条件，不断引导 AI 逼近你心中的理想结果。"
          },
          {
            subtitle: "4. 幻觉问题：为什么它会乱编？",
            text: "由于 LLM 是基于概率生成的，当它面对知识盲区时，为了完成“接龙”，它可能会编造出听起来非常合理的错误信息。这就是所谓的“幻觉”。"
          }
        ]
      },
      {
        title: "2026 个人 AI 工具箱：精选 Top 10 必装应用",
        content: "工欲善其事，必先利其器。本课将为你推荐 2026 年最值得关注的 10 款 AI 工具，涵盖办公、创意与生活全场景。",
        image: "https://picsum.photos/seed/tools2026/800/450",
        details: [
          "全能王：ChatGPT (GPT-5) & Claude 4",
          "国产之光：DeepSeek-V3/R1 (极致性价比)",
          "长文本之王：Kimi (支持 1000 万字上下文)",
          "办公提效：通义千问 (深度集成钉钉/办公套件)",
          "创意绘图：Midjourney v7 & Flux.1",
          "AI 搜索：Perplexity & SearchGPT",
          "视频生成：Sora & 可灵 (Kling)",
          "代码神器：Cursor & GitHub Copilot",
          "个人自动化：OpenClaw & Zapier AI",
          "浏览器增强：Monica & MaxAI"
        ],
        fullContent: [
          {
            subtitle: "1. 文本对话：你的全能助理",
            text: "ChatGPT 依然是目前最均衡的选择；Claude 在逻辑严密性和代码编写上有着独特的优势；而 DeepSeek 则以极高的性价比和强大的中文理解力成为 2026 年的黑马。"
          },
          {
            subtitle: "2. 视觉创意：从文字到大片",
            text: "Midjourney 依然统治着艺术绘图领域；而国产的可灵 (Kling) 在视频生成领域已经实现了全球领先，能够生成长达 2 分钟的高清视频。"
          },
          {
            subtitle: "3. 搜索革命：不再需要翻页",
            text: "Perplexity 改变了我们获取信息的方式。它直接阅读搜索结果并总结成答案，同时附上引用来源，极大地提高了研究效率。"
          }
        ]
      },
      {
        title: "常用 AI 工具清单：找到最适合你的那一个",
        content: "市面上的 AI 工具琳琅满目，从聊天机器人到绘图工具，从视频生成到代码助手。本课将为你梳理目前最顶尖的工具矩阵，帮你节省筛选时间，构建最高效的个人工作流。",
        image: "https://picsum.photos/seed/tools/800/450",
        details: [
          "对话类：ChatGPT (全能), Claude (逻辑), Gemini (生态)",
          "国产之光：文心一言 (本土化), Kimi (长文本), 通义千问",
          "生产力：Notion AI (文档), Microsoft 365 Copilot (办公)",
          "创意类：Midjourney (绘图), Runway (视频), Suno (音乐)",
          "搜索类：Perplexity (AI 搜索), SearchGPT",
          "插件与扩展：如何让你的浏览器武装到牙齿"
        ],
        fullContent: [
          {
            subtitle: "1. 文本对话：你的全能助理",
            text: "ChatGPT 依然是目前最均衡的选择；Claude 在长文本理解和代码编写上有着独特的优势；而 Gemini 则深度集成了 Google 的生态系统。"
          },
          {
            subtitle: "2. 视觉创意：从文字到图像",
            text: "Midjourney 是目前艺术表现力最强的绘图工具；DALL-E 3 则胜在理解力极强，能精准执行复杂的文字指令。"
          },
          {
            subtitle: "3. 搜索革命：不再需要翻页",
            text: "Perplexity 改变了我们获取信息的方式。它直接阅读搜索结果并总结成答案，同时附上引用来源，极大地提高了研究效率。"
          },
          {
            subtitle: "4. 国产大模型：更懂中国文化",
            text: "DeepSeek 凭借 R1 推理模型打破了技术壁垒；Kimi 以其超长的上下文处理能力脱颖而出；通义千问则在处理中文语境和本土业务逻辑上更具优势。"
          }
        ]
      },
      {
        title: "超级个体思维：如何利用 AI 放大个人价值",
        content: "在 AI 时代，一个人就是一支团队。超级个体不再依赖庞大的组织，而是通过 AI 工具矩阵，实现从创意到执行的全流程闭环。本课将为你揭示超级个体的底层逻辑。",
        image: "https://picsum.photos/seed/super/800/450",
        details: [
          "杠杆效应：AI 是你的智力杠杆，放大你的产出",
          "低成本试错：AI 降低了从 0 到 1 的创业门槛",
          "个人品牌：利用 AI 辅助内容产出与全平台分发",
          "未来趋势：AI Agent 驱动的个人自动化工作室",
          "跨界能力：AI 帮你快速跨越不同领域的知识鸿沟",
          "行动指南：从今天开始构建你的超级个体计划"
        ],
        fullContent: [
          {
            text: "超级个体是指那些能够熟练运用 AI 和数字化工具，独立完成复杂项目，并直接面向市场交付价值的人。他们不依附于公司，而是依附于自己的能力网。"
          },
          {
            subtitle: "2. AI 带来的能力溢出",
            text: "以前你需要请设计师、程序员、文案策划。现在，通过 AI，你一个人就能完成这些工作。AI 弥补了你的短板，让你的长板无限延伸。"
          },
          {
            subtitle: "3. 商业模式的变革",
            text: "超级个体的商业模式通常是：极低成本、高自动化、高单价。他们通过 AI 处理 80% 的琐事，将 20% 的精力投入到最具创造力的决策中。"
          }
        ]
      }
    ],
    cta: {
      text: "掌握了基础？进阶了解 AI 的大脑 → 探索大模型模块",
      link: "/module/llm"
    }
  },
  "models2026": {
    title: "AI 大模型",
    subtitle: "进阶用户 · 核心能力",
    icon: Brain,
    color: "purple",
    description: "深度解析 GPT-5、Claude 4、DeepSeek-V3/R1 等 2026 年主流大模型。重点对比国产大模型优势，为您的 AI 自动化之路选择最强“大脑”。",
    keyTakeaways: [
      "2026 全球大模型格局：GPT-5 vs Claude 4 vs DeepSeek",
      "国产大模型深度对比：DeepSeek、Kimi、通义千问谁更强？",
      "模型选型新标准：推理能力 (Reasoning) 与长上下文的权衡",
      "实战：获取 DeepSeek 与 OpenAI API 并完成 OpenClaw 配置"
    ],
    sections: [
      {
        title: "2026 大模型全景图",
        content: "从 OpenAI 的统治力到 DeepSeek 的平替神话，带你俯瞰当前最前沿的 AI 技术版图。",
        icon: Layers
      },
      {
        title: "国产大模型专题",
        content: "深度剖析 DeepSeek 的极致性价比、Kimi 的超长上下文以及通义千问的行业落地能力。",
        icon: Star
      },
      {
        title: "推理模型 (O1/R1) 时代",
        content: "理解“慢思考”模型的原理，学会利用 DeepSeek-R1 等推理模型解决复杂逻辑难题。",
        icon: Cpu
      }
    ],
    lessons: [
      {
        title: "为 OpenClaw 配置准备模型 API：开启自动化之路",
        content: "想要在 OpenClaw 中使用大模型，你需要获取 API Key。本课将手把手教你如何注册开发者账号、创建 Key 以及在 OpenClaw 中进行配置。",
        image: "https://picsum.photos/seed/api2026/800/450",
        details: [
          "API 基础知识：什么是 API Key？",
          "OpenAI API 注册与充值全流程",
          "DeepSeek 开放平台注册与 API 获取",
          "国内大模型 API (Kimi/阿里/百度) 申请流程",
          "中转 API 与聚合平台的优劣分析",
          "OpenClaw 配置实操：填入 Key，激活你的 AI 助手"
        ],
        fullContent: [
          {
            subtitle: "1. API Key 的本质",
            text: "API Key 就像是你的“数字身份证”和“钱包”。通过它，OpenClaw 可以代表你向大模型发送请求，并从你的账户余额中扣除相应的费用。"
          },
          {
            subtitle: "2. 注册与风控规避",
            text: "注册 OpenAI 或 Claude API 时，网络环境和支付卡片是最大的难点。我们会分享一些稳定的第三方支付方案和虚拟卡申请技巧。"
          },
          {
            subtitle: "3. 安全第一：不要泄露你的 Key",
            text: "永远不要在公开场合（如 GitHub）展示你的 API Key。一旦泄露，别人可以瞬间耗尽你的余额。学会使用环境变量来管理这些敏感信息。"
          }
        ]
      }
    ],
    cta: {
      text: "选择合适的模型是用好 OpenClaw 的第一步 → 前往学习 OpenClaw",
      link: "/module/openclaw"
    }
  },
  "llm": {
    title: "AI 大模型",
    subtitle: "进阶用户 · 核心能力",
    icon: Brain,
    color: "purple",
    description: "深度解析 GPT、Claude、文心一言等主流大模型。了解模型的能力边界，为 OpenClaw 配置打下坚实基础。",
    keyTakeaways: [
      "深度对比全球主流大模型的优劣势与适用场景",
      "掌握模型选型的 5 个核心维度与成本控制策略",
      "理解大模型的能力极限与幻觉规避方法",
      "学会如何获取并配置模型 API，实现私有化应用"
    ],
    sections: [
      {
        title: "什么是大模型？",
        content: "对比分析 GPT-4o 的全能、Claude 3.5 的逻辑以及文心一言等国产大模型的本土化优势。",
        icon: Layers
      },
      {
        title: "如何选择适合自己的模型？",
        content: "选择合适的模型是用好 OpenClaw 的第一步。我们将根据您的需求场景，匹配最精准的 AI 大脑。",
        icon: BookOpen
      },
      {
        title: "大模型的能力边界",
        content: "理解 AI 的幻觉、逻辑极限与知识截止日期，学会与 AI 协作的最佳姿势。",
        icon: Cpu
      }
    ],
    lessons: [
      {
        title: "全球主流大模型全景图：谁才是真正的王者？",
        content: "从 OpenAI 的 GPT 系列到 Anthropic 的 Claude，再到 Google 的 Gemini 和国内的文心一言、Kimi。本课将带你深度剖析各大模型的“性格”与“特长”。",
        image: "https://picsum.photos/seed/models/800/450",
        details: [
          "GPT-4o: 全能冠军，多模态交互的标杆",
          "Claude 3.5 Sonnet: 逻辑与编程的巅峰",
          "Gemini 1.5 Pro: 超长上下文处理的专家",
          "Llama 3: 开源界的领头羊",
          "国产模型: 文心一言、通义千问、Kimi 的实测对比",
          "模型排行榜: 如何参考 LMSYS 等权威榜单"
        ],
        fullContent: [
          {
            subtitle: "1. OpenAI: 行业的领跑者",
            text: "GPT-4o 是目前的旗舰模型，它不仅在逻辑推理上处于第一梯队，更重要的是其多模态能力——它能实时看懂视频、听懂情绪，是目前最接近 AGI 的产品。"
          },
          {
            subtitle: "2. Anthropic: 逻辑与安全的执着者",
            text: "Claude 3.5 Sonnet 在编程和复杂逻辑推理上经常超越 GPT-4o。它的语气更自然，更少“AI味”，是很多专业开发者的首选。"
          },
          {
            subtitle: "3. Google: 庞大生态的整合者",
            text: "Gemini 的杀手锏是超长上下文（高达 200万 tokens）。你可以把一整本书或者几个小时的视频喂给它，它能精准地找到其中的细节。"
          },
          {
            subtitle: "4. 国产力量：更懂中国心",
            text: "Kimi 凭借优秀的中文长文本处理能力迅速出圈；通义千问在企业级应用和中文语境理解上表现稳健；文心一言则拥有最深厚的本土知识库。"
          }
        ]
      },
      {
        title: "模型选择的 5 个维度：不选最贵的，只选最对的",
        content: "面对琳琅满目的模型，如何根据自己的需求 and 预算做出选择？我们将从逻辑能力、响应速度、上下文长度、价格和多模态支持五个维度进行拆解。",
        image: "https://picsum.photos/seed/choice/800/450",
        details: [
          "逻辑复杂度：简单任务 vs 复杂推理",
          "响应延迟：实时对话 vs 异步处理",
          "长文本需求：处理 10 万字文档需要什么模型？",
          "成本控制：API 调用计费模式与节省策略",
          "多模态支持：是否需要识别图片或生成语音",
          "合规性与隐私：数据安全与国产化替代方案"
        ],
        fullContent: [
          {
            subtitle: "维度 1：逻辑深度",
            text: "如果是写简单的邮件或总结，GPT-4o mini 这种轻量级模型就足够了，速度快且便宜。如果是写复杂代码或法律合同，必须上 GPT-4o 或 Claude 3.5。"
          },
          {
            subtitle: "维度 2：上下文长度",
            text: "如果你需要 AI 帮你分析整个项目的所有代码文件，或者总结一整年的财务报表，你需要关注模型的 Context Window。Gemini 1.5 Pro 在这方面是绝对的王者。"
          },
          {
            subtitle: "维度 3：多模态需求",
            text: "你需要 AI 帮你分析图表吗？还是需要它生成语音？不同的模型在这些子领域的表现差异巨大。例如，GPT-4o 的视觉分析能力目前公认最强。"
          },
          {
            subtitle: "维度 4：成本与 API 额度",
            text: "对于开发者来说，API 的价格和调用频率限制（Rate Limits）是核心考量。开源模型如 Llama 3 通过私有化部署可以彻底解决隐私和长期成本问题。"
          }
        ]
      },
      {
        title: "能力边界与幻觉识别：别让 AI 误导你",
        content: "AI 不是万能的。它有知识截止日期，会有逻辑漏洞，更会产生“幻觉”。本课将教你如何识别 AI 的错误，并利用技巧降低幻觉发生的概率。",
        image: "https://picsum.photos/seed/error/800/450",
        details: [
          "知识截止日期：为什么 AI 不知道昨天的新闻？",
          "幻觉的成因：概率预测的副作用",
          "事实核查技巧：如何验证 AI 给出的数据",
          "降低幻觉的 Prompt 技巧：要求 AI 提供引用",
          "逻辑陷阱：AI 在数学与复杂逻辑中的表现",
          "边界测试：如何试探一个模型的“智力上限”"
        ],
        fullContent: [
          {
            subtitle: "1. 什么是“幻觉”？",
            text: "幻觉是指 AI 以极其自信的语气编造事实。这是因为模型本质上是在预测概率，当它找不到确切答案时，它会根据概率生成一个看起来最像答案的回答。"
          },
          {
            subtitle: "2. 知识截止日期的限制",
            text: "大多数模型都是在历史数据上训练的。如果你问它今天的天气或者最新的股市动态，除非它连接了实时搜索插件，否则它给出的信息必然是过时的。"
          },
          {
            subtitle: "3. 如何降低幻觉？",
            text: "最有效的方法是：1. 在 Prompt 中明确要求：'如果你不知道，请直接回答不知道'；2. 提供参考资料，要求 AI 基于资料回答（RAG 模式）。"
          }
        ]
      },
      {
        title: "为 OpenClaw 配置准备模型 API：开启自动化之路",
        content: "想要在 OpenClaw 中使用大模型，你需要获取 API Key。本课将手把手教你如何注册开发者账号、创建 Key 以及在 OpenClaw 中进行配置。",
        image: "https://picsum.photos/seed/api/800/450",
        details: [
          "API 基础知识：什么是 API Key？",
          "OpenAI API 注册与充值全流程",
          "Claude (Anthropic) API 获取指南",
          "国内大模型 API (百度/阿里/月之暗面) 申请流程",
          "中转 API 与聚合平台的优劣分析",
          "OpenClaw 配置实操：填入 Key，激活你的 AI 助手"
        ],
        fullContent: [
          {
            subtitle: "1. API Key 的本质",
            text: "API Key 就像是你的“数字身份证”和“钱包”。通过它，OpenClaw 可以代表你向大模型发送请求，并从你的账户余额中扣除相应的费用。"
          },
          {
            subtitle: "2. 注册与风控规避",
            text: "注册 OpenAI 或 Claude API 时，网络环境和支付卡片是最大的难点。我们会分享一些稳定的第三方支付方案和虚拟卡申请技巧。"
          },
          {
            subtitle: "3. 安全第一：不要泄露你的 Key",
            text: "永远不要在公开场合（如 GitHub）展示你的 API Key。一旦泄露，别人可以瞬间耗尽你的余额。学会使用环境变量来管理这些敏感信息。"
          }
        ]
      }
    ],
    cta: {
      text: "选择合适的模型是用好 OpenClaw 的第一步 → 前往学习 OpenClaw",
      link: "/module/openclaw"
    }
  },
  "openclaw": {
    title: "OpenClaw 模块",
    subtitle: "开源力量，自由构建",
    icon: Cpu,
    color: "emerald",
    description: "探索 OpenClaw 生态系统，学习如何利用开源工具构建属于你自己的 AI 助手和自动化流程。",
    sections: [
      {
        title: "什么是 OpenClaw？",
        content: "OpenClaw 是一个致力于降低 AI 门槛的开源生态，提供了一系列开箱即用的工具和框架。",
        icon: Code
      },
      {
        title: "核心组件介绍",
        content: "深入了解 OpenClaw 的工作流引擎、知识库插件以及多智能体协作协议。",
        icon: Layers
      },
      {
        title: "快速部署指南",
        content: "手把手教您在本地或云端部署 OpenClaw 环境，开启您的私有化 AI 时代。",
        icon: Rocket
      }
    ],
    lessons: [
      {
        title: "OpenClaw 环境搭建：从零开始部署",
        content: "学习如何在本地或云端快速部署 OpenClaw 环境。我们将涵盖 Docker 部署、源码安装以及基础配置，确保你的 AI 引擎能够平稳运行。",
        image: "https://picsum.photos/seed/setup/800/450",
        details: [
          "Docker 一键部署指南",
          "Python 环境与依赖配置",
          "数据库 (Redis/PostgreSQL) 连接",
          "前端界面与后端服务的联调",
          "常见报错排查与性能优化",
          "云端部署 (Vercel/Railway) 方案"
        ],
        fullContent: [
          {
            subtitle: "1. 为什么选择 Docker？",
            text: "Docker 能够提供一致的运行环境，避免了'在我电脑上能跑，在你那里不行'的尴尬。通过 Docker Compose，你可以一键启动所有必要的服务。"
          },
          {
            subtitle: "2. 环境变量配置",
            text: "OpenClaw 需要配置多个 API Key 和数据库连接字符串。我们将教你如何安全地管理这些敏感信息，防止泄露。"
          },
          {
            subtitle: "3. 性能优化建议",
            text: "对于高并发场景，如何配置 Redis 缓存和数据库连接池？本课将分享一些大厂级别的优化经验。"
          }
        ]
      },
      {
        title: "构建第一个 AI Agent：让 AI 动起来",
        content: "Agent 是 AI 的高级形态。本课将教你如何利用 OpenClaw 的工作流引擎，构建一个能够自主思考、调用工具并完成复杂任务的智能体。",
        image: "https://picsum.photos/seed/agent/800/450",
        details: [
          "Agent 的核心原理：感知、决策、执行",
          "定义 Agent 的角色与目标 (System Prompt)",
          "工具调用 (Function Calling) 机制",
          "长短期记忆 (Memory) 的实现",
          "多轮对话的状态管理",
          "实战：构建一个自动搜索并总结新闻的 Agent"
        ],
        fullContent: [
          {
            subtitle: "1. 什么是 AI Agent？",
            text: "不同于简单的聊天机器人，Agent 拥有'自主性'。它能根据目标拆解任务，并主动调用外部工具（如搜索、计算器、代码执行器）来解决问题。"
          },
          {
            subtitle: "2. 提示词工程 (Prompt Engineering) 进阶",
            text: "如何写出让 Agent 听话的指令？我们将介绍 ReAct 框架、Chain of Thought 等高级提示词技术。"
          },
          {
            subtitle: "3. 记忆系统：让 AI 记住你是谁",
            text: "通过向量数据库实现长期记忆，让你的 Agent 能够随着交流的深入，越来越懂你的偏好和习惯。"
          }
        ]
      },
      {
        title: "知识库 RAG 实践：让 AI 拥有你的私有知识",
        content: "RAG (检索增强生成) 是解决 AI 幻觉和知识过时最有效的方案。学习如何将你的文档、笔记转化为 AI 的知识库。",
        image: "https://picsum.photos/seed/rag/800/450",
        details: [
          "RAG 的工作流程：切片、向量化、检索、生成",
          "向量数据库 (Pinecone/Milvus) 的选择与使用",
          "文档切片 (Chunking) 的艺术：如何保持语义完整",
          "检索算法优化：语义搜索 vs 关键词搜索",
          "重排序 (Rerank) 技术提升准确率",
          "实战：构建一个基于公司文档的智能客服"
        ],
        fullContent: [
          {
            subtitle: "1. 为什么需要 RAG？",
            text: "大模型的知识是静态的。RAG 允许模型在回答前，先去你的私有数据库中'查资料'，从而提供最新、最准确的回答。"
          },
          {
            subtitle: "2. 向量化的魔力",
            text: "通过 Embedding 模型，我们将文字转化为高维向量。这样 AI 就能通过计算向量距离，找到语义上最相关的段落。"
          },
          {
            subtitle: "3. 优化检索质量",
            text: "切片太大会丢失细节，太小会丢失上下文。本课将分享如何寻找最佳的切片大小和重叠度。"
          }
        ]
      },
      {
        title: "社区插件开发指南：扩展 OpenClaw 的无限可能",
        content: "OpenClaw 的强大在于其可扩展性。学习如何编写自己的插件，连接各种第三方服务，打造独一无二的 AI 助手。",
        image: "https://picsum.photos/seed/plugin/800/450",
        details: [
          "OpenClaw 插件架构解析",
          "开发环境准备与 SDK 使用",
          "定义插件的输入输出协议",
          "处理异步请求与错误重试",
          "插件的安全性与权限控制",
          "发布你的插件到 OpenClaw 社区"
        ],
        fullContent: [
          {
            subtitle: "1. 插件的工作原理",
            text: "插件本质上是连接 AI 与外部世界的桥梁。通过简单的代码，你可以让 AI 具备查天气、订机票、操作智能家居的能力。"
          },
          {
            subtitle: "2. 快速起步模板",
            text: "我们将提供一套标准的插件开发模板，让你在 10 分钟内就能写出自己的第一个插件。"
          }
        ]
      }
    ]
  },
  "scenarios": {
    title: "AI 应用场景",
    subtitle: "实战演练，生产力飞跃",
    icon: Zap,
    color: "orange",
    description: "实战演练：AI 在办公、创意、编程、生活等全场景的应用。将技术转化为真实的生产力。",
    keyTakeaways: [
      "掌握 10+ 个高频职场 AI 提效场景",
      "学会利用 AI 快速产出爆款自媒体内容",
      "构建个人专属的 AI 知识库与第二大脑",
      "探索 AI 在生活理财与旅行规划中的妙用"
    ],
    sections: [
      {
        title: "职场办公自动化",
        content: "利用 AI 快速生成周报、PPT 大纲、会议纪要，让重复性工作缩短 80%。",
        icon: Zap
      },
      {
        title: "创意内容生产",
        content: "AI 辅助写作、设计、视频剪辑。一个人就是一支营销团队，释放无限创意。",
        icon: Star
      },
      {
        title: "个人知识库构建",
        content: "将碎片化信息转化为结构化知识，利用 AI 构建您的“第二大脑”，永不遗忘。",
        icon: BookOpen
      }
    ],
    lessons: [
      {
        title: "AI 办公提效 36 计：告别加班的秘密武器",
        content: "从写邮件到做 PPT，从数据分析到会议纪要。本课将分享 36 个即学即用的 AI 办公技巧，帮你每天节省 2 小时。",
        image: "https://picsum.photos/seed/office/800/450",
        details: [
          "AI 撰写专业邮件：得体、高效、多语言",
          "一键生成 PPT 大纲与视觉素材",
          "Excel 高级公式与数据透视表 AI 助手",
          "会议录音转纪要：自动提取行动项",
          "PDF 长文档快速阅读与总结",
          "多任务并行的 AI 时间管理法"
        ],
        fullContent: [
          {
            subtitle: "1. PPT 制作的革命",
            text: "不再需要从零开始。先让 AI 帮你梳理逻辑大纲，再配合 AI 绘图工具生成高质量配图，最后使用 Gamma 等工具一键排版。"
          },
          {
            subtitle: "2. 数据分析不再难",
            text: "把原始数据丢给 AI，它能帮你写 Python 代码进行分析，并直接生成精美的可视化图表，你只需要负责解读结果。"
          }
        ]
      },
      {
        title: "自媒体爆款内容生成：一个人就是一支团队",
        content: "如何利用 AI 找选题、写脚本、配图、剪辑？我们将拆解一套完整的自媒体 AI 工作流，让你高产似母猪，质量赛大厂。",
        image: "https://picsum.photos/seed/media/800/450",
        details: [
          "选题挖掘：利用 AI 分析热点与用户痛点",
          "爆款标题生成：5 种心理学钩子公式",
          "视频脚本拆解：黄金 3 秒与留存钩子",
          "AI 批量生成高质量配图与封面",
          "数字人播报与 AI 配音实战",
          "全平台分发与数据反馈分析"
        ],
        fullContent: [
          {
            subtitle: "1. 选题的艺术",
            text: "AI 可以帮你分析成千上万条热门评论，找出用户最关心的问题，从而精准定位你的内容方向。"
          },
          {
            subtitle: "2. 脚本的结构化生产",
            text: "通过设定特定的角色和受众，AI 可以帮你写出极具共鸣感的文案，并自动标注出适合插入素材的时间点。"
          }
        ]
      },
      {
        title: "AI 辅助编程实战：从小白到全栈的捷径",
        content: "不会写代码也能做产品？本课将教你如何利用 GitHub Copilot, Cursor 等工具，通过自然语言描述需求，让 AI 帮你写出高质量代码。",
        image: "https://picsum.photos/seed/code/800/450",
        details: [
          "Cursor: 最好用的 AI 编程编辑器入门",
          "如何向 AI 描述复杂的业务逻辑",
          "代码调试 (Debug) 的 AI 技巧",
          "利用 AI 快速学习新框架与新技术",
          "构建并部署你的第一个 AI 小程序",
          "代码安全与最佳实践"
        ],
        fullContent: [
          {
            subtitle: "1. 自然语言驱动开发",
            text: "现在的编程更像是'对话'。你只需要描述：'我需要一个带登录功能的商城首页'，AI 就能帮你搭建好基础框架。"
          },
          {
            subtitle: "2. 快速学习新领域",
            text: "遇到看不懂的代码？直接让 AI 逐行解释。它是你 24 小时在线的顶级编程导师。"
          }
        ]
      },
      {
        title: "生活助手：AI 旅游与理财妙用",
        content: "AI 不仅能工作，还能让生活更美好。学习如何利用 AI 规划一场说走就走的旅行，或者制定一份科学的个人理财计划。",
        image: "https://picsum.photos/seed/life/800/450",
        details: [
          "AI 旅游攻略：避坑、省钱、深度游",
          "个人财务报表 AI 分析与预算建议",
          "AI 辅助健康管理与食谱定制",
          "智能家居场景联动配置",
          "AI 辅助语言学习：你的私人外教",
          "情感咨询与心理疏导 AI 实践"
        ],
        fullContent: [
          {
            subtitle: "1. 极致的旅行规划",
            text: "告诉 AI 你的预算、兴趣和时间，它能帮你规划出精确到分钟的行程单，甚至帮你查好当地的特色美食和隐藏打卡点。"
          },
          {
            subtitle: "2. 理财的小助手",
            text: "输入你的收支数据，AI 能帮你分析消费习惯，并根据当前的经济形势，提供一些基础的资产配置建议。"
          }
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
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">首页</Link>
          {Object.entries(MODULE_CONTENT).map(([id, content]) => (
            <Link 
              key={id} 
              to={`/module/${id}`} 
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              {content.title.replace("模块", "")}
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
            {Object.entries(MODULE_CONTENT).map(([id, content]) => (
              <Link 
                key={id} 
                to={`/module/${id}`} 
                className="text-lg font-medium text-gray-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {content.title}
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
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
            AI Superman <br />
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
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all shadow-[0_0_15px_rgba(37,99,235,0.2)] cursor-pointer text-base"
            >
              立即开始探索
            </motion.button>
            <motion.button 
              whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLearnMore}
              className="w-full sm:w-auto px-6 py-3 bg-white/5 text-white font-bold rounded-xl border border-white/10 transition-all cursor-pointer text-base"
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
      id: "ai-basics",
      title: "AI 入门模块",
      desc: "从零开始了解 AI 的基本概念、历史发展及未来趋势。为你的超级个体之路打下坚实基础。",
      icon: Rocket,
      color: "blue",
    },
    {
      id: "llm",
      title: "大模型模块",
      desc: "深度解析 GPT、Claude、Gemini 等主流大模型。掌握 Prompt Engineering，释放模型最大潜力。",
      icon: Brain,
      color: "purple",
    },
    {
      id: "openclaw",
      title: "OpenClaw 模块",
      desc: "探索 OpenClaw 生态系统，学习如何利用开源工具构建属于你自己的 AI 助手 and 自动化流程。",
      icon: Cpu,
      color: "emerald",
    },
    {
      id: "scenarios",
      title: "AI 应用场景",
      desc: "实战演练：AI 在办公、创意、编程、生活等全场景的应用。将技术转化为真实的生产力。",
      icon: Zap,
      color: "orange",
    },
  ];

  return (
    <section id="modules" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">核心学习模块</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          我们精心设计了四大核心模块，涵盖从理论到实战的全方位内容，助你全方位进化。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
