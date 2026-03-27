import {
  BookOpen,
  Brain,
  Bot,
  Code,
  Cpu,
  Globe,
  Layers,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Star,
  Users,
  Video,
  Zap,
} from 'lucide-react';

import type { ModuleContent, ModuleId } from '@/types/course';

export const MODULE_CONTENT: Record<ModuleId, ModuleContent> = {
  "super-individual": {
    title: "AI 超级个体入门",
    subtitle: "零基础 · 快速上手 · 一人成军",
    icon: Rocket,
    color: "blue",
    description: "理解\"超级个体\"的核心概念，掌握 Prompt Engineering 基础，搭建个人 AI 工具矩阵与效率栈。精选免费/低价工具，从\"知道 AI\"走向\"用好 AI\"。包含 9 节实战课、常见误区拆解、第一周行动计划。",
    keyTakeaways: [
      "理解超级个体的核心逻辑：AI 是杠杆，不是替代品，你的判断力才是核心价值",
      "掌握 Prompt 工程 5 大技巧：角色设定、Few-Shot、思维链、结构化输出、工具调用",
      "搭建个人 AI 效率栈：对话 / 搜索 / 编程 / 自动化，月成本控制在 $30 以内",
      "识别并规避 5 大新手误区，避免浪费时间和金钱",
      "完成第一周行动计划：7 天内用 AI 独立完成 5 个真实工作任务"
    ],
    sections: [
      { title: "认知与原理", content: "理解大模型的工作方式、能力边界和幻觉成因。知道 AI 能做什么、不能做什么，才能正确使用它。", icon: Globe },
      { title: "Prompt 工程实战", content: "掌握 5 种官方推荐的提示词技巧，附 5 个场景即拷即用模板。学会与 AI 沟通的工程方法，而非玄学。", icon: Bot },
      { title: "工具栈与行动计划", content: "精选免费/低价 AI 工具 + 一人公司效率栈 + 第一周 7 天行动计划，从学习直接过渡到实操。", icon: Layers }
    ],
    lessons: [
      {
        title: "生成式 AI 的本质：从概率预测到超级个体",
        content: "理解大模型的工作原理——它不是搜索引擎，不是数据库，而是一个通过海量文本训练的概率预测引擎。理解这一点，才能真正用好它。",
        image: "https://picsum.photos/seed/ai-intro/800/450",
        details: [
          "Transformer 架构：AI 的\"大脑\"，通过注意力机制理解上下文关系",
          "训练过程：预测下一个 token 的概率游戏，而非逐字记忆",
          "涌现能力：当模型规模足够大时，会自发产生推理、编程、翻译等能力",
          "知识截止日期：GPT-5.4 截至 2025.8 / Claude Opus 4.6 训练数据截至 2026.1",
          "幻觉成因：面对知识盲区时，模型会\"接龙\"出看似合理的错误信息",
          "超级个体的前提：理解 AI 能做什么和不能做什么，才能正确地使用它"
        ],
        fullContent: [
          { subtitle: "1. 大模型是如何\"思考\"的？", text: "以 DeepSeek V3.2 为例：它不是在\"查找\"答案，而是在\"预测\"下一个最可能的 token（词元）。当你说\"中国的首都是\"，它预测下一个 token 是\"北京\"的概率接近 100%。对于复杂问题，它通过多步预测来\"推理\"出答案。DeepSeek reasoner（思考模式）会在输出前先进行内部推理链，类似人类\"思考后再回答\"。" },
          { subtitle: "2. 为什么不同模型\"性格\"不同？", text: "模型的\"性格\"取决于训练数据、微调方式和 RLHF（人类反馈强化学习）。GPT-5.4 偏向全能和实用主义，Claude Opus 4.6 偏向严谨和安全，DeepSeek V3.2 中文理解力强且性价比极高。选择模型就像选择员工——不同岗位用不同的人。" },
          { subtitle: "3. 知识截止日期与实时能力", text: "纯模型推理无法获取最新信息。GPT-5.4 知识截止 2025 年 8 月，Claude Opus 4.6 训练数据截止 2026 年 1 月。但 GPT-5.4 支持网页搜索和文件搜索，可以弥补这一限制。Claude 同样支持工具调用。这就是为什么 OpenClaw 等框架要给模型\"接手接脚\"——让它能搜索、读文件、浏览网页。" },
          { subtitle: "4. 幻觉是什么，怎么应对？", text: "幻觉（Hallucination）是指模型生成了听起来合理但实际错误的内容。成因：训练数据中没有相关知识时，模型仍会\"接龙\"出看似合理的答案。应对方法：①要求模型引用来源（\"请给出你的依据\"）；②对关键数据用 Perplexity 或 GPT-5.4 网页搜索验证；③使用 RAG（检索增强生成）让模型基于你提供的文档回答，而非凭空生成。" },
          { subtitle: "5. Token 是什么，为什么重要？", text: "Token 是模型处理文本的基本单位，大约 1 个中文字 = 1.5-2 个 token，1 个英文单词 ≈ 1.3 个 token。理解 token 有两个实际意义：①成本计算——所有 API 按 token 计费，DeepSeek V3.2 输入 $0.28/MTok 意味着处理 100 万个 token 花 $0.28；②上下文窗口——模型每次能\"看到\"的 token 数量有上限，GPT-5.4 是 100 万，DeepSeek V3.2 是 12.8 万，超出后早期内容会被截断。" }
        ]
      },
      {
        title: "Prompt Engineering 实战：5 种官方推荐的提示词技巧",
        content: "基于 OpenAI、Anthropic、DeepSeek 官方最佳实践，掌握 5 种核心提示词技巧。这些不是玄学，而是有明确原理的工程方法。",
        image: "https://picsum.photos/seed/prompt-eng/800/450",
        details: [
          "角色设定（System Prompt）：Claude 官方推荐在 system 消息中设定角色和规则",
          "Few-Shot 示例：给 AI 2-3 个输入输出示例，比纯文字描述更有效",
          "思维链 CoT：DeepSeek reasoner 原生支持思考模式，自动进行多步推理",
          "结构化输出：要求 JSON 格式输出，OpenAI 官方支持 JSON Mode",
          "工具调用 Function Calling：GPT-5.4 / Claude / DeepSeek 均原生支持",
          "约束控制：用否定句明确告诉 AI 不要做什么，比正面描述更有效"
        ],
        fullContent: [
          { subtitle: "1. 角色 + 规则 = System Prompt", text: "Claude 官方文档明确推荐：在 system 消息中定义 AI 的角色、行为规则和输出格式。例如：\"你是一位资深产品经理。回答必须包含：1）问题分析 2）解决方案 3）优先级排序。每个部分不超过 100 字。\" 这比在用户消息中描述角色效果更好，因为 system 消息的权重更高。" },
          { subtitle: "2. Few-Shot 比 Zero-Shot 更可靠", text: "与其花 500 字描述\"请按以下格式输出\"，不如直接给 2 个示例。OpenAI 官方研究表明，Few-Shot 在格式控制、风格一致性、减少幻觉方面显著优于 Zero-Shot。示例不需要多，2-3 个就足够。DeepSeek V3.2 的 128K 上下文窗口可以轻松容纳大量示例。" },
          { subtitle: "3. 思维链：让 AI \"想清楚再说\"", text: "DeepSeek V3.2 的 deepseek-reasoner 接口原生支持思考模式，会在输出前自动进行多步推理。Claude Opus 4.6 支持\"扩展思维\"（Extended Thinking），可以在回复前进行深度推理。对于数学、逻辑、复杂决策类任务，思考模式的效果远优于普通模式。代价是响应更慢、成本更高。" },
          { subtitle: "4. 结构化输出：让结果可被程序处理", text: "要求 AI 输出 JSON 格式，可以直接被代码解析，是构建自动化工作流的基础。OpenAI 官方支持 JSON Mode（在 API 请求中设置 response_format: { type: 'json_object' }），DeepSeek 同样支持。示例 Prompt：\"请以 JSON 格式输出，包含字段：title（标题）、summary（100 字摘要）、tags（3 个标签数组）、priority（1-5 优先级）。\"" },
          { subtitle: "5. 约束控制：用否定句减少废话", text: "很多人写 Prompt 只说\"要做什么\"，忘了说\"不要做什么\"。加上约束往往比加上要求更有效。例如：\"不要使用列表格式\"、\"不要重复我的问题\"、\"不要给出免责声明\"、\"回答不超过 200 字\"。Claude 官方文档建议：对于格式控制，否定约束比正面描述更精准。" }
        ]
      },
      {
        title: "超级个体思维：AI 是杠杆，不是替代品",
        content: "超级个体不是\"用 AI 替代人\"，而是\"用 AI 放大人的产出\"。理解杠杆效应、成本结构和能力边界，才能正确规划你的超级个体路径。",
        image: "https://picsum.photos/seed/super-mindset/800/450",
        details: [
          "杠杆效应：DeepSeek V3.2 的 $0.28/MTok 意味着处理 10 万字仅花 $0.03",
          "成本结构变化：AI 把\"请人做\"的边际成本从几千元降到几毛钱",
          "能力边界：AI 擅长生成和推理，但不擅长审美判断和创意决策",
          "时间分配：AI 处理 80% 的执行工作，你把 80% 的精力放在 20% 的决策上",
          "一人公司的可行性：OpenClaw 24/7 运行 + AI 模型 = 不需要招人",
          "关键认知：你的核心价值是\"判断力\"和\"品味\"，不是\"执行力\""
        ],
        fullContent: [
          { subtitle: "1. 成本的量级变化", text: "以前请一个文案写一篇 1000 字文章：几百到几千元。现在用 Claude Sonnet 4.6（$3/MTok）：1000 字约消耗 2000 tokens，输入+输出总费用不到 $0.01。以前请一个程序员写一个简单功能：几千到几万元。现在用 Cursor Agent：几小时就能完成，API 成本不到 $1。AI 把\"找人做事\"的边际成本从千元级降到了分钱级。" },
          { subtitle: "2. 什么不能交给 AI", text: "AI 不擅长的事：审美判断（什么是\"好看\"）、原创创意（从 0 到 1 的突破）、情感连接（与客户的深度信任关系）、战略决策（选什么赛道、什么时候转型）。这些是你的核心价值。Ishan Sharma 在 TED2025 的演讲中强调了这一点：AI 负责草稿，人类负责创意决策。" },
          { subtitle: "3. 一人公司的运营模型", text: "传统一人公司：你一个人做所有事，产出有限。AI 超级个体：OpenClaw 24/7 运行处理日常任务（邮件、客服、监控），DeepSeek V3.2 做低成本分析，Claude Opus 4.6 做深度创作，GPT-5.4 做多模态任务。你只需要做决策和把关。月运营成本：API 费用约 50-200 元。" },
          { subtitle: "4. 如何衡量 AI 带来的提效？", text: "建议用\"时间置换率\"来衡量：某项任务原来需要 2 小时，用 AI 后需要 20 分钟（含审核），置换率 = 100/20 = 5 倍。记录你每周用 AI 完成的任务和节省的时间，3 个月后你会有一份清晰的数据，知道 AI 在哪些环节真正帮到了你，哪些环节还需要优化。" }
        ]
      },
      {
        title: "2026 AI 工具全景：基于官方文档的选型指南",
        content: "基于 OpenAI、Anthropic、DeepSeek、月之暗面、Cursor 官方文档，梳理当前最值得关注的 AI 工具及其核心参数。",
        image: "https://picsum.photos/seed/tools2026/800/450",
        details: [
          "对话：GPT-5.4（1M 上下文，全能）/ Claude Opus 4.6（100 万，推理）/ DeepSeek V3.2（128K，$0.28/MTok）",
          "国产：Kimi K2.5（256K 多模态，月之暗面官方）/ 通义千问（阿里生态）/ 文心一言（百度知识库）",
          "图像：GPT Image 1.5（OpenAI 最新）/ Midjourney（艺术绘图）/ 通义万相（国产）",
          "视频：Sora 2（OpenAI 官方，支持同步音频）/ 可灵 Kling（国产领先）",
          "编程：Cursor Agent（自主编程 + 深度代码库理解）/ GitHub Copilot",
          "搜索：Perplexity（实时搜索 + 引用来源）/ 秘塔AI搜索（国产）"
        ],
        fullContent: [
          { subtitle: "1. 对话类：按场景选模型", text: "日常问答和简单任务：DeepSeek V3.2（$0.28/MTok，成本最低）。复杂推理和编码：GPT-5.4（$2.50/MTok）或 Claude Opus 4.6（$5/MTok）。长文档分析：Claude Sonnet 4.6（100 万上下文，$3/MTok）或 Kimi K2.5（256K 上下文）。中文场景优先：DeepSeek 或 Kimi。" },
          { subtitle: "2. 视觉与视频", text: "图像生成首选 GPT Image 1.5（OpenAI 官方最新），艺术绘图可选 Midjourney。视频生成 Sora 2 是 OpenAI 官方旗舰模型，支持同步音频生成。国产可灵 (Kling) 在视频生成方面表现突出，是性价比之选。" },
          { subtitle: "3. 编程与效率", text: "Cursor 是目前最主流的 AI 编程编辑器。核心能力：Agent 自主编程（自主理解需求→探索代码库→生成可工作代码）、Tab 智能补全（极快速度预测下一步）、深度代码库理解（语义搜索整个项目）。受 Y Combinator、NVIDIA、Stripe 等认可。Perplexity 改变了信息获取方式，直接阅读搜索结果并总结成答案，附引用来源。" }
        ]
      },
      {
        title: "免费/低成本工具方案：用最少预算获得最大价值",
        content: "基于各厂商官方定价，计算真实使用成本。DeepSeek V3.2 的缓存命中仅 $0.028/MTok——处理 100 万字只需 $0.03。",
        image: "https://picsum.photos/seed/free-tools/800/450",
        details: [
          "DeepSeek V3.2：输入 $0.28/MTok（缓存命中 $0.028），思考模式输出 $0.42/MTok",
          "Kimi K2.5：月之暗面平台提供免费额度，256K 上下文",
          "Ollama + 开源模型：完全免费本地运行，零 API 成本",
          "Stable Diffusion：本地部署替代 Midjourney，零成本",
          "GPT-5.4 nano：OpenAI 最廉价选项，输入 $0.20/MTok",
          "Cursor 免费版：支持基础 AI 补全，足够日常使用"
        ],
        fullContent: [
          { subtitle: "1. 真实成本计算（基于官方定价）", text: "以每天处理 10 万字（约 13 万 tokens）为例：DeepSeek V3.2 非缓存 $0.036/天，缓存命中 $0.0036/天。一个月 30 天，总成本约 $0.1-$1。GPT-5.4 nano 输入 $0.20/MTok，同样工作量约 $0.78/天，月成本约 $23。GPT-5.4 完整版输入 $2.50/MTok，月成本约 $98。差价约 1000 倍。" },
          { subtitle: "2. 本地部署方案", text: "Ollama 是免费开源工具，支持在本地运行 Llama、Qwen、DeepSeek 等开源模型。配合 Stable Diffusion，可以零成本实现 AI 绘图。缺点是需要一定的硬件配置（建议 16GB+ 内存，有 GPU 更好），且模型能力不如云端旗舰模型。适合对隐私要求高或完全离线的场景。" },
          { subtitle: "3. 推荐的最低成本组合", text: "日常对话和分析：DeepSeek V3.2（月成本 < $5）。复杂推理和编码：GPT-5.4 mini（$0.75/MTok，月成本约 $30）。长文档：Claude Haiku 4.5（$1/MTok，20 万上下文）。编程：Cursor 免费版 + DeepSeek。AI 绘图：Stable Diffusion 本地部署。总计月成本控制在 $50 以内。" },
          { subtitle: "4. 国内用户的支付方案", text: "DeepSeek（platform.deepseek.com）支持微信支付，是国内用户最友好的选择，新用户有赠金。月之暗面 Kimi（platform.moonshot.cn）同样支持国内支付。OpenAI 和 Anthropic 需要国际信用卡，可以通过 WildCard 等虚拟卡服务解决。阿里云百炼平台提供通义千问 API，支持支付宝，也是国内替代方案。" }
        ]
      },
      {
        title: "一人公司效率栈：Notion + AI + 自动化 + OpenClaw",
        content: "搭建完整的个人效率工具链，打通信息孤岛，实现\"设置一次，自动运行\"。每个工具都有明确的职责边界。",
        image: "https://picsum.photos/seed/efficiency-stack/800/450",
        details: [
          "知识管理大脑：Notion（项目/笔记/数据库统一管理）",
          "24/7 AI 助手：OpenClaw（全渠道接入 + Skills 自动化 + 后台任务）",
          "内容生成：Claude Sonnet 4.6（深度写作）/ GPT-5.4（多模态）",
          "低成本推理：DeepSeek V3.2（日常分析和处理）",
          "编程开发：Cursor Agent（自主编程）",
          "信息检索：Perplexity（实时搜索 + 引用来源）"
        ],
        fullContent: [
          { subtitle: "1. 效率栈的分工逻辑", text: "Notion 做\"存储层\"——所有知识、项目、数据统一管理。OpenClaw 做\"执行层\"——24/7 运行自动化任务（邮件处理、日程管理、竞品监控），通过你已有的聊天工具交互。AI 模型做\"智能层\"——DeepSeek 处理低成本任务，Claude 处理高质量创作，GPT-5.4 处理多模态任务。Cursor 做\"开发层\"——独立开发产品。" },
          { subtitle: "2. 数据流设计", text: "信息输入：Perplexity 搜索 → 自动存入 Notion 知识库。内容生产：Claude 写作 → OpenClaw 定时发布到多平台。数据分析：DeepSeek 分析 Notion 数据库 → 生成报告 → OpenClaw 推送通知。客服处理：OpenClaw 接收消息 → DeepSeek 生成回复 → 复杂问题转发给你。整个流程无需人工介入，你只需要做决策。" },
          { subtitle: "3. 月运营成本估算", text: "Notion 免费版：$0。OpenClaw：免费开源，部署无成本。DeepSeek V3.2 API（日均 10 万字）：$1-5/月。Claude Sonnet 4.6（每周 2-3 次深度写作）：$5-15/月。GPT-5.4 nano（偶尔多模态任务）：$5-10/月。Cursor 免费版：$0。Perplexity 免费版：$0。总计：$11-30/月。" },
          { subtitle: "4. 从零搭建的优先顺序", text: "第 1 步：注册 DeepSeek，体验对话能力（1 天）。第 2 步：建立 Notion 知识库，把常用 Prompt 模板存进去（3 天）。第 3 步：安装 OpenClaw，配置 DeepSeek API，测试基础对话（1 天）。第 4 步：创建第一个自动化 Skill（如每日邮件摘要），跑通端到端流程（1 周）。第 5 步：根据实际需求逐步扩展工具栈。不要一次性搭建所有工具，先跑通核心流程。" }
        ]
      },
      {
        title: "新手必知的 5 大误区：避免浪费时间和金钱",
        content: "90% 的 AI 新手都会踩这 5 个坑。提前了解，少走弯路。每个误区都有具体的纠正方法。",
        image: "https://picsum.photos/seed/ai-mistakes/800/450",
        details: [
          "误区 1：把 AI 当搜索引擎用——问\"最新新闻\"，得到幻觉答案",
          "误区 2：Prompt 越长越好——冗长 Prompt 会稀释关键指令，反而效果更差",
          "误区 3：一个模型用到底——不同任务用不同模型，成本差 10 倍，效果差 3 倍",
          "误区 4：AI 输出直接用——不审核就发布，轻则质量差，重则事实错误",
          "误区 5：追新模型焦虑——每周都有新模型，但你的 Prompt 模板才是核心资产"
        ],
        fullContent: [
          { subtitle: "误区 1：把 AI 当实时搜索引擎", text: "大模型有知识截止日期（GPT-5.4 截至 2025.8，Claude Opus 4.6 截至 2026.1），对截止日期后的事件一无所知，且可能编造看似合理的答案。纠正方法：需要实时信息时，用 Perplexity 或 GPT-5.4 的网页搜索功能，而不是直接问模型。判断标准：如果你的问题包含\"最新\"、\"现在\"、\"今天\"，就需要搜索工具辅助。" },
          { subtitle: "误区 2：Prompt 越长越好", text: "很多人认为 Prompt 越详细越好，结果写了 1000 字的指令，AI 反而抓不住重点。OpenAI 官方研究表明：关键指令应该放在 Prompt 的开头或结尾，中间的内容容易被\"遗忘\"（注意力稀释）。纠正方法：核心指令控制在 3-5 条，用编号列出，每条不超过 20 字。复杂需求用 Few-Shot 示例代替文字描述。" },
          { subtitle: "误区 3：一个模型用到底", text: "很多人注册了 ChatGPT 就只用 ChatGPT，但不同任务用不同模型，成本和效果差异巨大。日常分析用 DeepSeek V3.2（$0.28/MTok），深度写作用 Claude Sonnet 4.6（$3/MTok），复杂推理用 Claude Opus 4.6（$5/MTok）。如果全部用 Claude Opus 4.6，月成本可能是 DeepSeek 的 18 倍。纠正方法：建立\"任务-模型\"对照表，按任务复杂度选模型。" },
          { subtitle: "误区 4：AI 输出直接使用", text: "AI 生成的内容存在幻觉风险，特别是涉及数据、引用、专业知识的内容。直接发布未经审核的 AI 内容，轻则质量差，重则事实错误损害信誉。纠正方法：建立\"AI 生成 → 人工审核 → 发布\"的三步流程。对于数字、引用、专业术语，必须逐一核实。把审核时间计入工作流，而不是省略它。" },
          { subtitle: "误区 5：追新模型焦虑", text: "AI 行业每周都有新模型发布，很多人花大量时间测试新模型，反而忽略了真正重要的事：积累可复用的 Prompt 模板和工作流。你的 Prompt 模板才是核心资产，它可以迁移到任何新模型上。纠正方法：每季度评估一次模型选型，而不是每周追新。把精力放在优化 Prompt 和工作流上，而不是测试新模型。" }
        ]
      },
      {
        title: "Prompt 模板库：8 个场景即拷即用",
        content: "基于各模型官方最佳实践，提供 8 个高频场景的 Prompt 模板。可直接复制到 ChatGPT / Claude / DeepSeek / Kimi 中使用，无需修改即可产出可用结果。",
        image: "https://picsum.photos/seed/prompt-templates/800/450",
        details: [
          "模板 1：技术文档总结 → 结构化摘要 + 关键数据 + 行动建议",
          "模板 2：竞品分析报告 → 多维度对比表格",
          "模板 3：代码 Review → Bug + 性能 + 安全三维审查",
          "模板 4：商务邮件撰写 → 得体专业 + 明确 CTA",
          "模板 5：自媒体脚本 → 钩子 + 3 要点 + 互动引导",
          "模板 6：会议纪要整理 → 决策 + 行动项 + 负责人 + 截止日期",
          "模板 7：数据分析解读 → 趋势 + 异常 + 建议",
          "模板 8：周报自动生成 → 完成事项 + 问题 + 下周计划"
        ],
        fullContent: [
          { subtitle: "模板 1-2：文档与分析类", text: "【技术文档总结】\"你是一位资深技术专家。请阅读以下文档，输出：1）核心概念（3-5 个要点）；2）关键数据（所有数字和指标）；3）行动建议（3 条）。格式使用 Markdown，每个部分用二级标题分隔。不要重复原文，用自己的语言总结。文档内容：[粘贴文档]\"\n\n【竞品分析】\"你是一位产品分析师。请分析以下竞品信息，输出 Markdown 表格，列：定位与目标用户、核心功能（3 条）、定价策略、核心优势、主要劣势。最后给出 2 条差异化建议。竞品信息：[粘贴信息]\"" },
          { subtitle: "模板 3-4：代码与沟通类", text: "【代码 Review】\"你是一位高级工程师。请审查以下代码，从以下角度提出具体改进建议：1）潜在 Bug 和边界情况；2）性能优化机会；3）安全性问题（SQL 注入、XSS 等）。每条建议给出具体的修改代码示例。不要泛泛而谈，要给出可直接使用的代码。代码：[粘贴代码]\"\n\n【商务邮件】\"你是一位专业的商务沟通专家。请帮我撰写一封邮件，情境：[描述]。要求：语气得体专业，不超过 300 字，结尾包含明确的行动号召（如：请于 [日期] 前回复）。收件人角色：[描述]\"" },
          { subtitle: "模板 5-6：内容与会议类", text: "【自媒体脚本】\"你是一位资深内容创作者。请为 [平台] 创作一个 [时长] 的视频脚本。主题：[主题]。结构：①前 3 秒钩子（制造悬念或冲突）②3 个核心要点（每点 30 秒）③结尾互动引导（提问或投票）。语言风格：口语化，避免书面语。\"\n\n【会议纪要】\"你是一位专业助理。请将以下会议记录整理为结构化纪要，包含：1）会议结论（3 条以内）；2）行动项列表（格式：负责人 | 任务 | 截止日期）；3）待确认事项。会议记录：[粘贴内容]\"" },
          { subtitle: "模板 7-8：数据与周报类", text: "【数据分析】\"你是一位数据分析师。请分析以下数据，输出：1）核心趋势（2-3 条）；2）异常数据点及可能原因；3）基于数据的 3 条具体建议。用非技术人员能理解的语言，避免统计术语。数据：[粘贴数据]\"\n\n【周报生成】\"你是一位职场写作专家。请根据以下工作记录，生成一份专业周报。格式：本周完成事项（按优先级排序）、遇到的问题及解决方案、下周计划（3 条）、需要支持的事项。语气：简洁专业，突出成果而非过程。工作记录：[粘贴记录]\"" }
        ]
      },
      {
        title: "第一周行动计划：7 天从零到第一个 AI 工作流",
        content: "不是理论，是每天具体要做什么。7 天结束后，你将拥有：3 个可复用 Prompt 模板、1 个自动化工作流、对 AI 能力边界的直觉认知。",
        image: "https://picsum.photos/seed/week-one-plan/800/450",
        details: [
          "Day 1：注册 DeepSeek（platform.deepseek.com）和 Kimi（platform.moonshot.cn），完成免费额度激活",
          "Day 2：用 DeepSeek 完成 3 个真实工作任务，记录哪些好用、哪些不好用",
          "Day 3：学习并实践 System Prompt 技巧，为你最常用的任务写第一个 Prompt 模板",
          "Day 4：用 Kimi K2.5 的 256K 上下文，同时分析 3 篇长文档，体验长上下文能力",
          "Day 5：安装 OpenClaw（open-claw.org），配置 DeepSeek API，完成第一次对话测试",
          "Day 6：创建第一个 OpenClaw Skill（推荐：每日邮件摘要或 RSS 订阅整理）",
          "Day 7：复盘本周，整理 3 个可复用 Prompt 模板，存入 Notion 知识库"
        ],
        fullContent: [
          { subtitle: "Day 1-2：建立直觉", text: "第一天不要急着学技巧，先注册工具，把你今天实际遇到的工作问题直接扔给 AI，看它能做到什么程度。记录下来：哪些任务 AI 做得很好（可以直接用）、哪些做得一般（需要修改）、哪些做得很差（暂时不适合用 AI）。这份记录是你后续优化的基础。第二天重复同样的任务，但这次尝试改进你的提问方式，观察结果是否有变化。" },
          { subtitle: "Day 3-4：掌握核心技巧", text: "第三天专注练习 System Prompt。选择你最高频的一个任务（如写邮件、做总结），按照\"角色 + 任务 + 约束 + 输出格式\"的结构写一个 Prompt，测试 5 次，每次微调，直到输出稳定满意。这个 Prompt 就是你的第一个模板资产。第四天体验长上下文：把 3 篇你平时需要参考的文档同时喂给 Kimi K2.5，让它做综合分析，感受 256K 上下文的威力。" },
          { subtitle: "Day 5-6：搭建自动化", text: "第五天安装 OpenClaw，访问 open-claw.org 下载安装包。配置 DeepSeek API Key（platform.deepseek.com 获取），完成基础对话测试。不要急着做复杂的事，先确保基础功能正常。第六天创建第一个 Skill。推荐从\"每日邮件摘要\"开始：设置触发时间（每天早上 9 点），读取收件箱，按重要程度分类，生成摘要推送到你的 Telegram。这是最有实感的自动化场景。" },
          { subtitle: "Day 7：沉淀与规划", text: "最后一天做复盘。整理本周所有有效的 Prompt，选出 3 个最常用的，规范化格式后存入 Notion。评估：哪个环节节省了最多时间？下周想优化哪个工作流？制定下两周的计划：继续深化 1 个已有工作流，或者探索 1 个新场景。记住：AI 工具的价值不在于你用了多少个，而在于你把哪几个用得足够深。" }
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
    description: "基于 OpenAI、Anthropic、DeepSeek、月之暗面官方文档，深度对比 2026 年主流大模型的上下文窗口、价格和能力边界。帮你为 OpenClaw 选配最强\"大脑\"。",
    keyTakeaways: [
      "OpenAI GPT-5.4：1M 上下文，$2.50/MTok 输入，支持函数调用与网页搜索",
      "Claude Opus 4.6：100 万上下文，$5/MTok 输入，扩展思维与自适应思维",
      "DeepSeek V3.2：128K 上下文，$0.28/MTok 输入，极致性价比（约为 GPT-5.4 的 1/9）",
      "Kimi K2.5：256K 上下文，原生多模态，支持 Agent 与思考模式"
    ],
    sections: [
      { title: "2026 大模型官方参数对比", content: "基于各厂商官方 API 文档，对比上下文窗口、价格、最大输出等核心参数。", icon: Layers },
      { title: "场景化选型指南", content: "根据你的实际需求（预算、任务复杂度、延迟要求）匹配最合适的模型。", icon: Star },
      { title: "OpenClaw 配置实战", content: "获取 API Key，在 OpenClaw 中配置模型，测试对话效果。", icon: Cpu }
    ],
    lessons: [
      {
        title: "2026 主流大模型官方参数全对比（数据来源：官方 API 文档）",
        content: "基于 OpenAI、Anthropic、DeepSeek、月之暗面四大厂商的官方 API 文档，整理最新模型参数、价格与能力对比。所有数据均来自官方，可验证。",
        image: "https://picsum.photos/seed/models-2026/800/450",
        details: [
          "GPT-5.4：1M 上下文，输入 $2.50/MTok，输出 $15/MTok，最大 128K 输出",
          "GPT-5.4 mini：400K 上下文，输入 $0.75/MTok，输出 $4.50/MTok",
          "Claude Opus 4.6：100 万上下文，输入 $5/MTok，输出 $25/MTok，最大 128K 输出",
          "Claude Sonnet 4.6：100 万上下文，输入 $3/MTok，输出 $15/MTok",
          "DeepSeek V3.2：128K 上下文，输入 $0.28/MTok，输出 $0.42/MTok（支持思考模式）",
          "Kimi K2.5：256K 上下文，原生多模态，Agent 与思考模式"
        ],
        fullContent: [
          { subtitle: "1. OpenAI GPT-5.4（来源：platform.openai.com/docs/models）", text: "GPT-5.4 是 OpenAI 当前旗舰模型，为智能体、编码和专业工作流设计。支持 100 万 tokens 上下文窗口，128K 最大输出，支持函数调用、网页搜索、文件搜索、计算机使用。知识截止 2025 年 8 月。GPT-5.4 mini 是高性价比子版本，400K 上下文，输入价格仅 $0.75/MTok。还有更轻量的 GPT-5.4 nano，输入仅 $0.20/MTok。" },
          { subtitle: "2. Claude Opus 4.6（来源：platform.claude.com/docs）", text: "Anthropic 旗舰模型。100 万 tokens 上下文窗口，128K 最大输出，训练数据截止 2026 年 1 月。支持扩展思维（Extended Thinking）和自适应思维（Adaptive Thinking），在复杂推理和编码任务上表现卓越。Claude Sonnet 4.6 是性价比之选，100 万上下文，输入 $3/MTok。Claude Haiku 4.5 最快最便宜，20 万上下文，输入 $1/MTok。" },
          { subtitle: "3. DeepSeek V3.2（来源：api-docs.deepseek.com）", text: "DeepSeek V3.2 提供两个接口：deepseek-chat（非思考模式）和 deepseek-reasoner（思考模式），均为 128K 上下文。思考模式默认输出 32K、最大 64K。价格极具竞争力：输入 $0.28/MTok（缓存命中仅 $0.028），输出 $0.42/MTok。以思考模式为例，完整处理 1M tokens 的总成本约 $0.42，约为 GPT-5.4 的 1/9。支持 JSON 输出和工具调用。" },
          { subtitle: "4. Kimi K2.5（来源：platform.moonshot.cn/docs）", text: "月之暗面最新旗舰模型，原生多模态架构，256K 上下文窗口。支持视觉与文本输入、思考与非思考模式、对话与 Agent 任务。开源评测中达到 SoTA 表现。提供 K2-turbo 高速版（60-100 tokens/秒）和 K2-thinking 思考模型。注意：kimi-latest 和 kimi-thinking-preview 已于 2025-2026 年下线，请使用新模型。" }
        ]
      },
      {
        title: "模型选型决策指南：5 个维度帮你选对模型",
        content: "基于官方参数，从预算、上下文长度、延迟、推理能力、生态集成 5 个维度，给出不同场景的模型推荐方案。",
        image: "https://picsum.photos/seed/model-choice/800/450",
        details: [
          "预算敏感：DeepSeek V3.2（输入 $0.28/MTok）> GPT-5.4 mini（$0.75）> GPT-5.4（$2.50）",
          "超长文本：Claude Opus/Sonnet 4.6（100 万）> GPT-5.4（100 万）> Kimi K2.5（256K）",
          "复杂推理：Claude Opus 4.6（扩展思维）> GPT-5.4 > DeepSeek reasoner（思考模式）",
          "编码开发：GPT-5.4 > Claude Opus 4.6 > Kimi K2.5（Agent Coding 能力）",
          "成本对比：处理 100 万 tokens 输入 — DeepSeek $0.28 vs GPT-5.4 $2.50 vs Claude Opus $5"
        ],
        fullContent: [
          { subtitle: "1. 预算优先：DeepSeek V3.2", text: "如果你是个人开发者或刚开始探索 API 调用，DeepSeek 是最优选择。输入 $0.28/MTok，缓存命中仅 $0.028/MTok。即使使用思考模式（deepseek-reasoner），完整处理 1M tokens 输出也只需 $0.42。OpenClaw 默认支持 DeepSeek API，配置简单。" },
          { subtitle: "2. 质量优先：Claude Opus 4.6", text: "对于需要深度推理、长文档分析、复杂编码的任务，Claude Opus 4.6 是最佳选择。100 万上下文 + 扩展思维模式，可以处理超大型代码库和复杂逻辑。价格较高（$5/MTok 输入），建议仅在复杂任务中使用。" },
          { subtitle: "3. 均衡之选：GPT-5.4 / Claude Sonnet 4.6", text: "GPT-5.4 是全能型选手，支持函数调用、网页搜索、文件搜索、计算机使用。Claude Sonnet 4.6 在推理质量和速度之间取得最佳平衡，100 万上下文仅 $3/MTok。日常使用推荐 Sonnet 4.6，复杂任务切换到 Opus 4.6。" },
          { subtitle: "4. 多模态需求：Kimi K2.5 / GPT-5.4", text: "Kimi K2.5 原生多模态架构，同时支持视觉和文本输入，256K 上下文，适合需要同时处理图片和文本的场景。GPT-5.4 同样支持文本和图像输入，加上 Sora 2 视频生成和 GPT Image 1.5 图像生成，构建了完整的多模态生态。" }
        ]
      },
      {
        title: "API 注册与 OpenClaw 配置实战",
        content: "手把手教你注册 OpenAI / Anthropic / DeepSeek / 月之暗面的开发者账号，获取 API Key，并在 OpenClaw 中完成配置。",
        image: "https://picsum.photos/seed/api-config/800/450",
        details: [
          "OpenAI：platform.openai.com 注册，支持信用卡充值",
          "Anthropic：console.anthropic.com 注册，支持 AWS Bedrock / Google Vertex AI",
          "DeepSeek：platform.deepseek.com 注册，支持微信支付，新人赠金",
          "月之暗面：platform.moonshot.cn 注册，按 Token 用量计费",
          "OpenClaw 配置：填入 API Key，选择模型，测试对话",
          "安全提醒：永远不要在公开代码中硬编码 API Key"
        ],
        fullContent: [
          { subtitle: "1. OpenAI API", text: "访问 platform.openai.com 注册开发者账号。创建 API Key 后即可调用 GPT-5.4 系列。充值支持国际信用卡，每个新账号有少量免费额度。API 调用通过 Responses API 和官方 SDK 进行。" },
          { subtitle: "2. Anthropic API", text: "访问 console.anthropic.com 注册。Claude API 支持 AWS Bedrock 和 Google Vertex AI，适合有云服务需求的用户。Claude Opus 4.6 推荐作为复杂推理任务的默认模型。" },
          { subtitle: "3. DeepSeek API", text: "访问 platform.deepseek.com 注册，支持微信支付，对国内用户最友好。新用户有赠金额度，DeepSeek V3.2 的 deepseek-chat 和 deepseek-reasoner 接口均可直接调用。OpenClaw 默认支持 DeepSeek，配置 API Key 即可使用。" },
          { subtitle: "4. OpenClaw 配置", text: "OpenClaw 内置支持 Opus 4.6、GLM-5、KIMI K2.5、GPT-5.2 Codex、Gemini 3 Pro 五种旗舰模型。也支持自定义 API 端点和 Ollama 本地模型。配置流程：打开 OpenClaw 设置 → 填入 API Key → 选择模型 → 测试对话。推荐先用 DeepSeek 测试，成本低、上手快。" }
        ]
      },
      {
        title: "实用 Prompt 模板：5 个场景即拷即用",
        content: "基于各模型官方最佳实践，提供 5 个高频场景的 Prompt 模板。可直接复制到 ChatGPT / Claude / DeepSeek / Kimi 中使用。",
        image: "https://picsum.photos/seed/prompt-templates/800/450",
        details: [
          "场景 1：技术文档总结（给 AI 一份文档，输出结构化摘要）",
          "场景 2：竞品分析报告（输入竞品 URL，输出对比分析）",
          "场景 3：代码 Review（粘贴代码，AI 自动审查并提出改进）",
          "场景 4：客户邮件撰写（描述情境，AI 生成得体专业的邮件）",
          "场景 5：自媒体脚本（输入主题和平台，输出完整视频脚本）"
        ],
        fullContent: [
          { subtitle: "1. 技术文档总结 Prompt", text: "\"你是一位资深技术专家。请阅读以下文档，输出：1）核心概念（3-5 个要点）；2）关键数据（所有数字和指标）；3）行动建议（3 条）。格式使用 Markdown，每个部分用二级标题分隔。文档内容：[粘贴文档]\"" },
          { subtitle: "2. 竞品分析 Prompt", text: "\"你是一位产品分析师。请分析以下竞品信息，从以下维度输出对比表格：定位与目标用户、核心功能、定价策略、优势与劣势、市场表现。竞品信息：[粘贴信息]\"" },
          { subtitle: "3. 代码 Review Prompt", text: "\"你是一位高级工程师。请审查以下代码，从以下角度提出具体改进建议：1）潜在 Bug 和边界情况；2）性能优化机会；3）代码可读性和命名规范；4）安全性问题。请给出具体的代码修改建议。代码：[粘贴代码]\"" },
          { subtitle: "4. 客户邮件 Prompt", text: "\"你是一位专业的商务沟通专家。请帮我撰写一封邮件，情境：[描述]。要求：语气得体专业，不超过 300 字，包含明确的行动号召（CTA），使用适当的商务用语。收件人：[角色描述]\"" },
          { subtitle: "5. 自媒体脚本 Prompt", text: "\"你是一位资深内容创作者。请为 [平台] 创作一个 [时长] 的视频脚本。主题：[主题]。要求：包含开头钩子（前 3 秒抓注意力）、3 个核心要点、结尾引导互动。每个要点给出建议的 B-roll 素材方向。语言风格：[风格描述]\"" }
        ]
      }
    ],
    cta: { text: "选好模型了？前往 OpenClaw 配置实战 → 学习 OpenClaw 实战专区", link: "/module/openclaw" }
  },
  "openclaw": {
    title: "OpenClaw 实战专区",
    subtitle: "开源 · 自动化 · 本地部署",
    icon: Cpu,
    color: "emerald",
    description: "OpenClaw 是一款开源的个人 AI 助手与自主代理，本地部署保障数据隐私，支持 WhatsApp/Telegram/Discord/Slack/Signal/iMessage 全渠道接入，通过 Skills 技能系统实现邮件、文件、浏览器等自动化。（数据来源：open-claw.org）",
    keyTakeaways: [
      "本地运行，数据主权：所有对话历史、偏好、文件均保留在本地，不上传第三方",
      "全渠道接入：WhatsApp / Telegram / Discord / Slack / Signal / iMessage",
      "内置 5 种旗舰模型：Opus 4.6 / GLM-5 / KIMI K2.5 / GPT-5.2 Codex / Gemini 3 Pro",
      "Skills 技能系统：用 Markdown 或 TypeScript 开发自定义自动化工作流"
    ],
    sections: [
      { title: "OpenClaw 核心能力", content: "本地部署、全渠道聊天集成、24/7 主动自动化、系统级操作权限。不是聊天机器人，是有\"手和眼\"的 AI 队友。", icon: Code },
      { title: "安装与配置", content: "支持 macOS / Windows / Linux，一键安装脚本或 Docker 部署，可配置自定义 API 或使用内置订阅。", icon: Rocket },
      { title: "Skills 技能开发", content: "Markdown 或 TypeScript 开发，支持对话自动生成，社区共享。邮件摘要、RSS 解析、股票管理皆可自动化。", icon: Layers }
    ],
    lessons: [
      {
        title: "OpenClaw 架构与核心能力（来源：open-claw.org 官方文档）",
        content: "OpenClaw 不是普通的聊天机器人——它是具有\"双眼和双手\"的 AI 助手与自主代理。本课基于官方文档，深入解析其架构设计和核心能力。",
        image: "https://picsum.photos/seed/openclaw-arch/800/450",
        details: [
          "本地运行：Mac / Windows / Linux，数据完全留在本地设备",
          "全渠道接入：WhatsApp、Telegram、Discord、Slack、Signal、iMessage",
          "24/7 主动自动化：后台任务、定时任务、心跳检测，自主评估并执行",
          "系统级权限：读写文件、执行 shell 命令、沙箱运行代码、浏览器控制",
          "多模型支持：内置 Opus 4.6 / GLM-5 / KIMI K2.5 / GPT-5.2 Codex / Gemini 3 Pro",
          "自定义模型：支持自定义 API 端点，或通过 Ollama 部署完全本地模型"
        ],
        fullContent: [
          { subtitle: "1. 与聊天机器人的本质区别", text: "传统聊天机器人只能对话。OpenClaw 具备\"双眼和双手\"——它可以浏览网页、操作文件、执行终端命令、填写表单、提取网页数据、配置 OAuth 等。它能在安全沙箱中运行代码，并具备高级浏览器控制能力。这意味着你可以让它执行真实的任务，而不仅仅是回答问题。" },
          { subtitle: "2. 数据主权与隐私", text: "OpenClaw 默认在用户本地硬件运行。所有个人数据（对话历史、偏好、文件）均保留在本地，不上传至第三方服务器。你可以选择完全离线运行（通过 Ollama 部署本地模型）或混合模式（部分任务用云端模型，部分用本地模型）。" },
          { subtitle: "3. 内置模型与订阅服务", text: "OpenClaw 内置支持 5 种旗舰模型：Opus 4.6、GLM-5、KIMI K2.5、GPT-5.2 Codex、Gemini 3 Pro。也提供\"内置 API 年费\"和\"Plus 年费\"两种订阅计划，包含专属 Gateway 实例和月度 API 额度，支持微信支付。订阅后无需自行配置 API Key，开箱即用。" }
        ]
      },
      {
        title: "Skills 技能系统：用 Markdown 开发自定义自动化",
        content: "Skills 是 OpenClaw 的核心扩展机制。你可以用 Markdown 或 TypeScript 开发自定义技能，也可以直接通过对话让 OpenClaw 自动生成。",
        image: "https://picsum.photos/seed/openclaw-skills-dev/800/450",
        details: [
          "Markdown 开发：无需编程，用自然语言描述即可定义技能",
          "TypeScript 开发：适合复杂逻辑，可调用外部 API 和数据库",
          "对话生成：直接告诉 OpenClaw 根据 YouTube 视频或笔记自动生成技能",
          "社区共享：ClawHub 社区提供现成的技能插件",
          "典型场景：邮件摘要、RSS 解析、股票监控、内容生产流水线、税务自动化",
          "后台运行：技能支持定时触发和心跳检测，无需手动启动"
        ],
        fullContent: [
          { subtitle: "1. Markdown vs TypeScript", text: "如果你不会编程，Markdown 方式是最佳入门。你只需要用结构化的自然语言描述：触发条件、执行步骤、输出格式。OpenClaw 会将其解析为可执行的工作流。TypeScript 方式适合需要调用外部 API、操作数据库、处理复杂逻辑的场景。有编程基础的用户可以在几小时内完成一个基础 Skill。" },
          { subtitle: "2. 对话式技能生成", text: "这是 OpenClaw 的独特功能。你可以直接在对话中告诉它：\"根据这个 YouTube 视频教程，帮我创建一个每天早上自动整理邮件的技能\"。OpenClaw 会理解视频内容，自动生成对应的 Skill 代码。你也可以让它根据本地笔记或文档来生成技能。" },
          { subtitle: "3. 实用技能推荐", text: "邮件摘要报告（每天定时汇总重要邮件）、RSS 订阅管理（监控行业动态）、股票投资组合追踪、内容生产流水线（选题→大纲→全文→分发）、会议纪要自动整理、日历冲突检测、文件自动归档与重命名。" }
        ]
      },
      {
        title: "安装部署：从零到运行只需 3 步",
        content: "OpenClaw 支持 macOS、Windows、Linux 三大平台。提供一键安装脚本和 Docker 两种部署方式，以及订阅服务免配置方案。",
        image: "https://picsum.photos/seed/openclaw-install/800/450",
        details: [
          "方式 1：一键安装脚本（推荐新手）— 官网下载安装包，图形界面引导",
          "方式 2：Docker 部署 — 适合有 Docker 经验的用户，一行命令启动",
          "方式 3：订阅服务 — 开箱即用，包含 API 额度，支持微信支付",
          "配置模型：内置模型直接用，或填入自定义 API Key（DeepSeek / OpenAI）",
          "连接聊天渠道：在配置文件中填入 Telegram/WhatsApp/Discord 的 Token",
          "隐私模式选择：完全离线（Ollama）或混合模式（本地+云端）"
        ],
        fullContent: [
          { subtitle: "1. 推荐安装方式", text: "对于非技术用户，推荐使用官方一键安装脚本。访问 open-claw.org 下载对应平台的安装包，按图形界面引导完成安装。安装完成后，首次启动会引导你配置模型和聊天渠道。如果你已有 DeepSeek API Key（推荐，性价比高），直接填入即可。" },
          { subtitle: "2. 订阅服务方案", text: "如果你不想自己管理 API Key，OpenClaw 提供订阅服务。\"内置 API 年费\"计划包含专属 Gateway 实例和月度 API 额度，支持微信支付。订阅后所有内置模型（Opus 4.6 / GLM-5 / KIMI K2.5 等）均可直接使用。" },
          { subtitle: "3. 连接聊天渠道", text: "OpenClaw 的核心体验是通过你已有的聊天工具来使用。配置方式：在设置中添加对应渠道的 Token（如 Telegram Bot Token、Discord Bot Token），配置完成后你就可以在私聊或群聊中直接与 AI 助手对话。" }
        ]
      },
      {
        title: "超级个体实战工作流：5 个即用场景",
        content: "基于 OpenClaw 的核心能力，设计 5 个超级个体高频场景的自动化工作流。每个工作流都可直接配置使用。",
        image: "https://picsum.photos/seed/openclaw-workflows/800/450",
        details: [
          "工作流 1：每日邮件自动整理 — 分类、标记优先级、生成摘要、草拟回复",
          "工作流 2：内容创作流水线 — 定时分析热点 → 生成选题 → 撰写初稿 → 推送通知",
          "工作流 3：竞品监控 — 定时抓取竞品页面 → 对比变化 → 生成差异报告",
          "工作流 4：学习笔记自动整理 — 读取笔记 → 提取摘要 → 生成标签 → 写入知识库",
          "工作流 5：日历智能管理 — 同步多个日历 → 检测冲突 → 生成日程摘要 → 提前提醒"
        ],
        fullContent: [
          { subtitle: "1. 邮件自动整理工作流", text: "配置方式：创建一个 Markdown Skill，设置触发条件为\"每天早上 9 点\"，执行步骤：读取收件箱 → 按发件人和主题分类 → 标记紧急程度 → 为重要邮件草拟回复草稿 → 通过 Telegram 推送摘要。你每天早上打开手机就能看到处理好的邮件列表和待办事项。" },
          { subtitle: "2. 内容创作工作流", text: "配置方式：创建定时 Skill，每天检查指定平台的 trending 话题 → 筛选与你领域相关的话题 → 根据话题生成 3 个选题方向 → 为每个选题写 500 字初稿 → 推送选题和初稿到你的 Discord/Telegram 频道。你只需要选择满意的选题，修改初稿即可发布。" },
          { subtitle: "3. 竞品监控工作流", text: "配置方式：创建一个 TypeScript Skill，使用 OpenClaw 的浏览器控制能力，定时访问竞品的官网、定价页面、社交媒体 → 提取关键信息（价格变化、新功能、新活动） → 与上一次快照对比 → 生成差异报告 → 推送到你的 Slack 频道。" }
        ]
      }
    ],
    cta: { text: "掌握了 OpenClaw？去场景库看看更多实战 → 探索超级个体场景库", link: "/module/scenarios" }
  },
  "scenarios": {
    title: "超级个体场景库",
    subtitle: "按职业分类 · 官方数据 · 工具组合",
    icon: Zap,
    color: "orange",
    description: "按职业和副业分类，每个场景提供具体的工具选型、配置方法和工作流。基于各工具官方文档，拒绝泛泛而谈。",
    keyTakeaways: [
      "Cursor 官方：Tab 智能补全 + Cmd+K 编辑 + Agent 自主编程 + 深度代码库理解",
      "OpenAI 官方：GPT-5.4 全模态 + Sora 2 视频 + GPT Image 1.5 图像，完整创作生态",
      "DeepSeek 官方：V3.2 思考模式（$0.42/MTok），低成本高推理",
      "OpenClaw 官方：全渠道接入 + Skills 自动化 + 24/7 后台运行"
    ],
    sections: [
      { title: "内容创作者", content: "GPT-5.4 选题研究 + Claude Sonnet 4.6 深度写作 + Sora 2 视频生成 + OpenClaw 定时发布。", icon: Video },
      { title: "独立开发者", content: "Cursor Agent 自主编程 + GPT-5.4 nano 轻量推理 + GitHub Copilot 代码审查。", icon: Code },
      { title: "电商 / 自由职业", content: "OpenClaw 全自动客服 + DeepSeek 低成本分析 + Sora 2 产品视频 + GPT Image 1.5 商品图。", icon: Bot }
    ],
    lessons: [
      {
        title: "内容创作者：AI 驱动的日更内容生产线",
        content: "基于 OpenAI / Anthropic / OpenClaw 官方能力，搭建从选题到分发的全流程自动化内容生产线。一个人产出传统 5 人团队的内容量。",
        image: "https://picsum.photos/seed/content-creator/800/450",
        details: [
          "选题研究：GPT-5.4 网页搜索 + 文件搜索功能，分析热门话题和用户痛点",
          "深度写作：Claude Sonnet 4.6（100 万上下文），可同时参考多篇长文档写作",
          "视频生成：Sora 2（OpenAI 官方），支持同步音频生成，旗舰视频模型",
          "图像生成：GPT Image 1.5（OpenAI 官方），最先进的图像生成模型",
          "定时发布：OpenClaw 定时任务 + 全渠道推送（Telegram / Discord / Slack）",
          "数据复盘：OpenClaw 浏览器控制能力自动抓取各平台数据"
        ],
        fullContent: [
          { subtitle: "1. 选题研究（GPT-5.4 官方能力）", text: "GPT-5.4 官方支持网页搜索和文件搜索功能。你可以让它：搜索指定平台的热门话题 → 分析热门评论中的用户痛点 → 筛选出与你领域相关的 3-5 个选题 → 为每个选题生成受众分析和内容角度。输入成本 $2.50/MTok，一次选题研究约消耗几千 tokens。" },
          { subtitle: "2. 深度写作（Claude Sonnet 4.6 官方能力）", text: "Claude Sonnet 4.6 提供 100 万 tokens 上下文窗口，输入 $3/MTok。你可以同时喂给它 10+ 篇参考文章、竞品分析报告、用户评论数据，让它基于全面的信息进行深度写作。适合长文、深度分析、技术教程等需要高质量输出的场景。" },
          { subtitle: "3. 视频与图像（OpenAI 官方工具链）", text: "Sora 2 是 OpenAI 旗舰视频生成模型，支持同步音频生成。Sora 2 Pro 是最先进的版本。GPT Image 1.5 是最新图像生成模型。你可以在 ChatGPT 中直接使用这些模型，也可以通过 API 调用。配合 GPT-5.4 nano（$0.20/MTok，成本极低）处理字幕和文案。" }
        ]
      },
      {
        title: "独立开发者：用 Cursor Agent 从零构建产品",
        content: "基于 Cursor 官方功能，利用 Agent 自主编程 + 深度代码库理解 + Tab 智能补全，让非专业程序员也能独立开发产品。（数据来源：cursor.com 官方网站）",
        image: "https://picsum.photos/seed/indie-dev/800/450",
        details: [
          "Agent 智能体：自主理解需求 → 探索代码库 → 生成可工作代码 → 运行测试",
          "Tab 智能补全：专用 Tab 模型以极快速度预测下一步操作，多行连续补全",
          "Cmd+K 编辑：选中代码后用自然语言描述修改需求，精准编辑",
          "深度代码库理解：安全代码库索引 + 语义搜索，理解整个项目结构",
          "多模型支持：OpenAI / Anthropic / Gemini / xAI / Cursor 自家模型可选",
          "集成生态：GitHub PR 自动审查、Slack 协作、终端、JetBrains IDE 集成"
        ],
        fullContent: [
          { subtitle: "1. Agent 自主编程（Cursor 官方）", text: "Cursor Agent 是其最强大的功能。你可以给它一个任务描述（如\"根据这份设计稿构建登录页面\"），它会自主：理解需求 → 探索代码库 → 编写代码 → 构建功能 → 运行测试。Agent 使用自己的计算资源在云端运行，与你并行工作。适合构建完整功能模块，而非单行代码修改。" },
          { subtitle: "2. Tab + Cmd+K 日常编码", text: "日常编码中，Tab 智能补全能以极快速度预测你的下一步操作，支持多行连续补全。对于精准修改，Cmd+K（Windows 上 Ctrl+K）是最佳选择：选中代码 → 描述你想要的修改 → AI 精准替换。这两个功能覆盖了 90% 的日常编码需求。" },
          { subtitle: "3. 适合超级个体的开发策略", text: "先用 Agent 搭建项目框架（路由、数据库、认证），再用 Tab/Cmd+K 逐步完善细节。遇到不懂的技术问题，直接在 Cursor 中向 AI 提问。无需查阅 Stack Overflow，AI 就是你的实时导师。对于成本敏感的场景，可以配合 DeepSeek V3.2 作为 Cursor 的后端模型。" }
        ]
      },
      {
        title: "电商 / 自由职业：AI 全自动运营体系",
        content: "利用 OpenClaw + DeepSeek + OpenAI 工具链，搭建覆盖选品、客服、内容、数据分析的全自动电商运营体系。",
        image: "https://picsum.photos/seed/ecommerce-auto/800/450",
        details: [
          "24/7 自动客服：OpenClaw 接入客服渠道，DeepSeek V3.2 处理 80% 常见问题",
          "商品内容生成：GPT Image 1.5 生成商品图 + Claude Sonnet 4.6 撰写详情页",
          "选品数据分析：DeepSeek V3.2 思考模式分析平台数据，成本极低（$0.42/MTok）",
          "竞品监控：OpenClaw 浏览器控制定时抓取竞品价格和活动信息",
          "社媒自动发布：OpenClaw 定时任务生成内容并推送到多平台",
          "财务报表：DeepSeek 分析收支数据，生成可视化报告"
        ],
        fullContent: [
          { subtitle: "1. 24/7 自动客服体系", text: "方案：OpenClaw + DeepSeek V3.2。OpenClaw 接入你的客服渠道（WhatsApp / Telegram / 飞书等），使用 DeepSeek V3.2 作为后端模型。成本极低：输入 $0.28/MTok，缓存命中 $0.028/MTok。即使每天处理 1000 条消息，月成本也仅几十元。常见问题自动回复，复杂问题创建工单通知人工。" },
          { subtitle: "2. 商品内容批量生成", text: "方案：GPT Image 1.5 + Claude Sonnet 4.6。用 Claude Sonnet 4.6 的 100 万上下文窗口，同时参考 10+ 个竞品详情页和用户评价，生成差异化的商品描述。再用 GPT Image 1.5 生成商品主图和场景图。成本估算：每个商品详情页约消耗 3000 tokens 输入 + 1500 tokens 输出，费用约 $0.01。" },
          { subtitle: "3. 选品与数据分析", text: "方案：DeepSeek V3.2 思考模式。将平台数据（销量、评价、价格趋势）喂给 DeepSeek reasoner，它会在输出前进行多步推理分析。128K 上下文窗口足够处理大量数据。思考模式输出最大 64K tokens，可以生成详细的分析报告。总成本约 $0.42/MTok 输出，比 GPT-5.4（$15/MTok）便宜 35 倍。" }
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
    ],
    cta: { text: "看完案例，按路线开始实操 → 打开成长路径", link: "/module/growth" }
  },
  "growth": {
    title: "成长路径",
    subtitle: "分阶段 · 可执行 · 循序渐进",
    icon: BookOpen,
    color: "emerald",
    description: "基于真实案例和官方工具能力，规划从零基础到独立运营 AI 业务的务实成长路线。不承诺暴富，标注每个阶段的工具成本和时间投入。",
    keyTakeaways: [
      "阶段 0（1-2 周）：注册 DeepSeek/Claude，体验 AI 能力边界，月成本 $0",
      "阶段 1（1-3 月）：在现有工作中深度使用 AI，安装 OpenClaw，搭建自动化工作流",
      "阶段 2（3-6 月）：基于垂直领域知识 + AI 能力，构建产品或服务，验证变现",
      "持续迭代：关注官方文档更新，模型能力快速进化"
    ],
    sections: [
      { title: "阶段 0：上手", content: "注册 2-3 个 AI 工具，体验它们的能力边界。不做任何投资，纯免费体验。", icon: Lightbulb },
      { title: "阶段 1：提效", content: "在现有工作中找到 3 个 AI 可优化的环节，安装 OpenClaw 搭建自动化。", icon: Zap },
      { title: "阶段 2：变现", content: "基于阶段 1 积累的垂直领域知识 + AI 工作流，构建 MVP 产品或服务。", icon: Rocket }
    ],
    lessons: [
      {
        title: "阶段 0（1-2 周）：零成本体验 AI 能力边界",
        content: "目标：注册并使用 3 个以上 AI 工具，完成 5 个具体任务。不做任何付费，纯免费体验。理解 AI 能做什么、不能做什么。",
        image: "https://picsum.photos/seed/phase0/800/450",
        details: [
          "Day 1-3：注册 DeepSeek（平台.deepseek.com）和 Kimi（platform.moonshot.cn），免费使用",
          "Day 4-7：用 DeepSeek 完成以下任务：写一封商务邮件、总结一篇长文、分析一份表格",
          "Day 8-10：用 Kimi K2.5 的 256K 上下文，同时分析 3 篇长文档并生成对比摘要",
          "Day 11-14：用 Claude（claude.ai 免费版）完成一次深度写作任务，体验质量差异",
          "成本：$0（全部使用免费额度）",
          "里程碑：用 AI 独立完成 5 个具体任务，建立\"AI 能帮我做什么\"的直觉"
        ],
        fullContent: [
          { subtitle: "1. 为什么从免费开始？", text: "很多人上来就充值 OpenAI API，结果发现不知道怎么用，钱白白浪费。正确的做法是先用免费工具（DeepSeek、Kimi、Claude 免费版）充分体验 AI 的能力边界。DeepSeek 平台新用户有赠金额度，Kimi 同样提供免费额度。只有当你明确了\"我需要 AI 帮我做什么\"之后，再考虑付费 API。" },
          { subtitle: "2. 重点体验什么？", text: "不是体验\"AI 能聊什么\"，而是体验\"AI 在你具体工作中能帮什么忙\"。试着把你每天最耗时的 3 个任务交给 AI：写邮件、整理数据、做周报。观察它做得好的地方和做得不好的地方。做好记录，这是你后续搭建自动化工作流的基础。" },
          { subtitle: "3. 各工具的免费额度", text: "DeepSeek（platform.deepseek.com）：新用户赠金，deepseek-chat 接口免费额度。Kimi（platform.moonshot.cn）：按 Token 计费，但提供免费试用额度。Claude（claude.ai）：网页版免费使用，有每日消息限制。ChatGPT（chatgpt.com）：基础版免费。OpenClaw（open-claw.org）：完全免费开源。" }
        ]
      },
      {
        title: "阶段 1（1-3 月）：搭建 AI 工作流，实现 3-5 倍提效",
        content: "目标：在现有工作中找到 3 个 AI 可优化的环节，搭建自动化工作流，将相关环节效率提升 3-5 倍。月成本控制在 $30 以内。",
        image: "https://picsum.photos/seed/phase1/800/450",
        details: [
          "第 1 周：复盘日常工作，找到最耗时的 3 个重复性环节",
          "第 2-4 周：为每个环节设计 AI 辅助工作流，用 DeepSeek V3.2 执行（$0.28/MTok）",
          "第 5-8 周：安装 OpenClaw，将简单工作流升级为自动化（定时执行、多渠道通知）",
          "第 9-12 周：开始在小红书/知乎等平台分享 AI 使用经验，积累个人品牌",
          "成本：DeepSeek API 约 $5-15/月 + OpenClaw 免费",
          "里程碑：工作效率明显提升，开始积累个人品牌和垂直领域知识"
        ],
        fullContent: [
          { subtitle: "1. 如何找到提效切入点？", text: "记录你一周内所有工作任务及耗时，找到\"重复性高、规律性强、不需要深度创意\"的环节。这类任务最适合 AI 优化。例如：每日数据汇总报告（30 分钟/天 → OpenClaw 自动化 → 0 分钟）、客户邮件分类和草拟回复（1 小时/天 → DeepSeek 自动处理 → 15 分钟审核）、竞品信息整理（2 小时/周 → OpenClaw 定时抓取 + AI 对比 → 20 分钟阅读报告）。" },
          { subtitle: "2. 从手动到自动化的升级路径", text: "第一阶段（手动）：你手动把数据/问题喂给 AI，AI 给你答案。第二阶段（半自动）：你设计好 Prompt 模板，每次只需填入变量。第三阶段（全自动）：用 OpenClaw 的 Skills 系统，设置定时任务，AI 自动读取数据、处理、生成报告、推送通知。整个过程不需要你参与。" },
          { subtitle: "3. 为什么要分享？", text: "分享不是自嗨，是战略。Ishan Sharma（TED2025 演讲者）在成为百万粉丝博主之前，也是从分享 AI 使用经验开始的。分享倒逼你持续学习，帮你建立垂直领域的专业形象，积累未来变现的受众基础。平台选择：小红书（适合实操教程）、知乎（适合深度分析）、公众号（适合长文）。" }
        ]
      },
      {
        title: "阶段 2（3-6 月）：构建产品或服务，验证变现",
        content: "目标：基于阶段 1 积累的垂直领域知识和 AI 工作流，构建 MVP 产品或服务，获得第一笔 AI 相关收入。不要辞去主业，先从副业开始验证。",
        image: "https://picsum.photos/seed/phase2/800/450",
        details: [
          "方向 1：AI 培训/咨询（基于你的实战经验，帮企业/个人用 AI 提效）",
          "方向 2：AI 工具/插件开发（用 Cursor Agent 开发 Chrome 插件、小程序等）",
          "方向 3：付费内容（知识星球、付费专栏，基于阶段 1 积累的受众）",
          "方向 4：一人公司（用 AI 运营电商/自媒体，OpenClaw 做自动化运营）",
          "成本：Cursor Pro $20/月 + Claude API $10-30/月 + DeepSeek $5/月 ≈ $35-55/月",
          "里程碑：获得第一笔 AI 相关收入（不论金额大小）"
        ],
        fullContent: [
          { subtitle: "1. 选择变现方向的核心原则", text: "不是\"AI 最火什么就做什么\"，而是\"你擅长什么 + AI 能放大什么\"。Samuel 的案例（腾讯云报道）说明了这一点：他原本是配镜师，但他选择的方向是复制已有成功的小型应用——这结合了他的执行力优势和 AI 的技术门槛降低。Every 公司的案例同样说明：他们的成功核心不是 AI，而是深厚的媒体行业经验。" },
          { subtitle: "2. MVP 方法论", text: "不要花 3 个月打磨\"完美产品\"。先做一个最小可行产品（MVP），在 1-2 周内上线，快速获取反馈。如果是内容产品：先写 3 篇免费深度文章测试市场反应。如果是工具产品：用 Cursor Agent 在 1-2 周内开发核心功能，先发布免费版。如果是咨询服务：先免费帮 3 个人解决问题，收集案例和口碑。" },
          { subtitle: "3. 成本与收入预期", text: "阶段 2 的月运营成本约 $35-55（Cursor Pro $20 + Claude API $10-30 + DeepSeek $5）。根据公开报道的案例，从开始学习 AI 到获得第一笔收入，通常需要 3-6 个月。Ishan Sharma 是长期积累的结果，Samuel 有配镜师收入支撑转型期，Every 团队有深厚的行业经验。不要被\"月入 10 万\"的标题误导，务实规划，持续行动。" }
        ]
      },
      {
        title: "持续迭代：跟进行业动态，保持竞争力",
        content: "AI 行业进化速度极快。GPT-5.4 的知识截止是 2025 年 8 月，Claude Opus 4.6 的训练数据截止 2026 年 1 月。你需要持续跟进官方更新。",
        image: "https://picsum.photos/seed/keep-learning/800/450",
        details: [
          "OpenAI 官方博客：platform.openai.com/blog — 新模型、新功能、API 更新",
          "Anthropic 官方文档：platform.claude.com/docs — Claude 模型更新",
          "DeepSeek 官方文档：api-docs.deepseek.com — 模型和定价更新",
          "月之暗面开放平台：platform.moonshot.cn/docs — Kimi 模型更新",
          "OpenClaw 官方网站：open-claw.org — 新 Skills、新功能",
          "Cursor 更新日志：cursor.com — 新功能、Agent 能力提升"
        ],
        fullContent: [
          { subtitle: "1. 模型进化速度", text: "以 OpenAI 为例：从 GPT-4o 到 GPT-5.4，上下文窗口从 128K 扩展到 1M，新增了网页搜索、文件搜索、计算机使用等能力。Anthropic 的 Claude 从 Sonnet 3.5 到 Opus 4.6，增加了扩展思维和自适应思维。DeepSeek V3.2 的思考模式提供了低成本深度推理。这些变化意味着你半年前的工作流可能已经可以大幅优化。" },
          { subtitle: "2. 建立信息获取习惯", text: "每周花 30 分钟浏览各官方文档的更新日志（Changelog）。重点关注：新模型发布（可能有更好的性价比）、新 API 功能（可能简化你的工作流）、定价变化（可能降低成本）。也可以关注少数派、InfoQ 中文等中文技术媒体的 AI 专栏。" },
          { subtitle: "3. 社群的力量", text: "加入 AI 相关社群，持续交流。你遇到的问题大概率别人也遇到过。社群的价值不仅是信息，更是人脉——很多合作和机会来自社群。从免费社群开始，找到志同道合的人，再考虑深度合作。" }
        ]
      }
    ],
    cta: { text: "完成路线后，从入门模块复盘迭代 → 返回 AI 超级个体入门", link: "/module/super-individual" }
  }
};
