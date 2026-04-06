import { Code2, Cpu, GitBranch, Shield } from 'lucide-react';

import type { BaseModuleContent } from '@/types/course';

export const aiProgrammingModule: BaseModuleContent = {
  title: 'AI 编程工具与模型实战',
  subtitle: '先看清工具范式，再设计自己的默认工作栈',
  icon: Code2,
  color: 'blue',
  description:
    '8 节课帮你把 AI 编程这件事讲明白：不是追单个最火工具，而是理解 Claude Code、Codex、Cursor、Gemini、Kiro 这些国外前沿产品，以及通义灵码、Qoder、TRAE、CodeBuddy 这些国内主流路线分别适合什么任务，再把模型、工作流和治理规则接成一套可执行系统。',
  keyTakeaways: [
    '理解 AI 编程已经从补全工具进入 Agentic Coding 阶段',
    '分清 CLI、IDE、Cloud Agent、Spec-driven 四种主流入口',
    '会比较国外与国内 AI 编程工具，不再只盯着单一品牌',
    '会给代码任务设计主力模型、回退模型和跑量模型',
    '把 AI 接进真实开发流程，而不是停留在单轮对话层',
    '建立权限、成本、隐私和回退机制的治理底线',
  ],
  sections: [
    {
      title: '工具范式',
      content: '先理解不同产品到底在解决哪一段开发链路：终端执行、IDE 协作、云端委托、规范驱动，入口不同，最佳场景也不同。',
      icon: Code2,
    },
    {
      title: '模型分工',
      content: '代码任务不是看排行榜选一个最强模型，而是按高质量主力、低成本跑量、中文优先和企业内控做角色分工。',
      icon: Cpu,
    },
    {
      title: '工作流与治理',
      content: '真正的差距不在单次生成，而在你能不能把需求、实现、评审、验证和安全边界接成一条稳定流程。',
      icon: Shield,
    },
  ],
  lessons: [
    {
      title: 'AI 编程进入 Agentic 时代：先看清工具范式',
      content: '从 Autocomplete 到 Chat，再到 Agent、Cloud Agent 和 Spec-driven IDE。先把坐标系搭好，再谈具体工具怎么选。',
      image: 'cover://ai-coding-landscape',
      details: [
        'Autocomplete、Chat、Agent、Cloud Agent、Spec-driven 的演进关系',
        'CLI、IDE、Cloud、Review Bot 四种主流入口的任务边界',
        '为什么选工具不再等于选模型',
        '一张 AI 编程工具坐标图',
      ],
      fullContent: [
        {
          subtitle: '1. AI 编程的范式变化',
          text: '过去的 AI 编程主要解决补全和局部问答；现在越来越多产品开始接管阅读代码、拆计划、执行改动、跑测试、提交总结这条完整链路。理解这条演进线，才知道为什么今天的工具差异已经不只是“模型强弱”。',
        },
        {
          subtitle: '2. 四类主流入口',
          text: 'CLI Agent 适合明确、可控、需要盯着推进的工程任务；IDE Agent 适合在编辑器内边看边改；Cloud Agent 适合并行委托和异步等待；Spec-driven IDE 适合需求明确、希望先写规范再落代码的团队流程。',
        },
        {
          subtitle: '3. 学这节课的目标',
          text: '这节课不是背产品列表，而是先把 AI 编程的基础判断框架建立起来。坐标系搭好之后，后面每个工具都能准确落位。',
        },
      ],
    },
    {
      title: 'Claude Code 与 Codex：两大编码代理的真实差异与选型',
      content: '两者都已是"本地 + 云端"混合形态。真正的差异在安全模型、配置体系、模型绑定和生态集成，而不是"谁在本地谁在云端"。',
      image: 'cover://claude-code-vs-codex',
      details: [
        '安全模型差异：内核层沙箱 vs 应用层 Hooks',
        '配置体系差异：Profile 切换 vs 分层继承',
        '模型绑定与第三方模型接入方式',
        '基于真实差异维度的选型判断模板',
      ],
      fullContent: [
        {
          subtitle: '1. 不再是“本地 vs 云端”',
          text: 'Claude Code 和 Codex 都已演化成本地终端 + 云端异步的混合形态。用“本地 vs 云端”做选型依据会导致误判。',
        },
        {
          subtitle: '2. 真正的差异维度',
          text: '安全模型（内核隔离 vs 应用层 Hooks）、配置体系（Profile 切换 vs 分层继承）、模型绑定（都可通过 Gateway 接其他模型）、生态集成（ChatGPT+Slack vs Anthropic+Bedrock/Vertex）。',
        },
        {
          subtitle: '3. 学这节课的目标',
          text: '不是判断谁更强，而是从安全治理、配置体系、生态绑定等稳定维度做出适合自己团队的选型。',
        },
      ],
    },
    {
      title: 'Cursor、Gemini、Kiro：IDE Agent、Google 多入口与 Spec-driven 路线',
      content: 'Cursor 代表编辑器原生 Agent，Google 这条线不只 Gemini CLI，还包括 Code Assist 与 Antigravity；Kiro 也支持 vibe coding，但它真正拉开差异的是 spec-driven。三条路线各有最佳场景。',
      image: 'cover://cursor-gemini-kiro',
      details: [
        'Cursor 的 Rules、Background Agents、Bugbot 分别适合什么任务',
        'Gemini CLI、Gemini Code Assist、Antigravity 的 Google 路线',
        'Kiro 为什么不是只能 vibe，也不是只能 Spec',
        'IDE Agent / Google 多入口 / Spec-driven 决策表',
      ],
      fullContent: [
        {
          subtitle: '1. Cursor 的代表性',
          text: 'Cursor 把 Agent 深度塞进了编辑器体验里，核心价值是让改代码、查上下文、开并行任务和做 Review 都在一个工作台完成。',
        },
        {
          subtitle: '2. Gemini 与 Kiro 的代表性',
          text: 'Google 这条线强在多入口、多模态和生态连接；Gemini CLI 只是其中的终端入口，Antigravity 则把 agent-first 的异步编排继续往前推；Kiro 则是既支持 vibe coding，又把 Specs、Steering、Hooks 做成了更完整的流程化能力。',
        },
        {
          subtitle: '3. 学这节课的目标',
          text: '你要学会的不是 3 个品牌，而是 3 种产品设计逻辑：编辑器原生、开放终端、规格驱动。',
        },
      ],
    },
    {
      title: '通义灵码、Qoder、TRAE、CodeBuddy：国内 IDE Agent 怎么选',
      content: '国内工具都在走 IDE Agent 路线，但成熟度和产品重心差异很大。TRAE 当前更成熟，CodeBuddy 更适合先小范围试点。',
      image: 'cover://china-coding-tools',
      details: [
        '阿里双路线：通义灵码与 Qoder 的边界',
        'TRAE、CodeBuddy、通义灵码、Qoder 四条路线的真实差异',
        '成熟度、稳定性与团队推广三类判断',
        '一张国内 AI 编程工具选择表',
      ],
      fullContent: [
        {
          subtitle: '1. 国内工具正在收敛到 IDE Agent',
          text: '现在国内主流工具比的已经不只是补全质量，而是 IDE 里谁能把读仓库、改多文件、规则、知识库、Agent 和团队接入做成主工作台。',
        },
        {
          subtitle: '2. 阿里要拆成通义灵码与 Qoder 两条线',
          text: '通义灵码更像低摩擦普及和企业接入入口；Qoder 更像深度 Agentic IDE，强调 Quest、Repo Wiki、Rules、Hooks 和仓库级执行。',
        },
        {
          subtitle: '3. 学这节课的目标',
          text: '不是简单认为“国外更强”或“国产更方便”，而是结合官方能力和真实体验做判断：TRAE 当前更成熟，CodeBuddy 更适合先试点验证。',
        },
      ],
    },
    {
      title: '编程模型选型：把模型家族分成角色，而不是背版本号',
      content: '这节课只看国内 6 家：GLM、Kimi、MiniMax、豆包、DeepSeek、Qwen。重点不是追热度，而是按任务角色和官网价格做选择。',
      image: 'cover://coding-model-selection',
      details: [
        '只比较 GLM、Kimi、MiniMax、豆包、DeepSeek、Qwen 六家',
        '默认模型、复杂主力、低成本跑量、回退模型怎么分工',
        '输入价、输出价、长上下文阶梯价要怎么看',
        '基于最新官网数据整理的精简选型表',
      ],
      fullContent: [
        {
          subtitle: '1. 只看国内 6 家，不再泛泛聊“全模型宇宙”',
          text: '这节课直接聚焦 GLM、Kimi、MiniMax、豆包、DeepSeek、Qwen 六家，去掉混元这类当前没有明显编程优势的候选，减少无效比较。',
        },
        {
          subtitle: '2. 价格必须一起看',
          text: '代码模型不能只看 benchmark。输入价、输出价、缓存价、长上下文阶梯价都会影响真实成本，尤其是大仓库和多步 Agent 任务。',
        },
        {
          subtitle: '3. 学这节课的目标',
          text: '你要拿到一套更短、更能落地的模型分工方案：默认模型、复杂主力、低成本跑量和回退模型分别怎么配。',
        },
      ],
    },
    {
      title: 'AI 编程工作流设计：从单兵提效到团队协作',
      content: '从“让 AI 改一个文件”升级到“让 AI 参与整条开发链路”。这节课讲的是工作流，而不是单条 Prompt。',
      image: 'cover://ai-coding-workflows',
      details: [
        '单兵开发、结对编程、PR 评审、多 Agent 协作四类流程',
        '读、计划、执行、验证、总结的稳定节奏',
        '需求到实现的多工具协作方式',
        '三套默认 SOP：个人版、小团队版、企业版',
      ],
      fullContent: [
        {
          subtitle: '1. 单工具不等于完整工作流',
          text: 'AI 编程真正产生复利，不在于一次把代码写出来，而在于它能接进需求、实现、验证、评审和文档同步这条完整链路。',
        },
        {
          subtitle: '2. 多种流程并存',
          text: '单兵开发强调速度和可控；结对编程强调人在回路中的高频决策；PR 评审强调质量门槛；多 Agent 协作强调异步并行和职责拆分。',
        },
        {
          subtitle: '3. 学这节课的目标',
          text: '你需要得到一套能直接替换自己当前开发节奏的默认流程，而不是收藏十几个工具名却没有一条可执行线路。',
        },
      ],
    },
    {
      title: 'AI 编程的安全与治理：权限、隐私、成本、回退',
      content: '真正决定能不能长期用下去的，不是模型分数，而是你有没有把权限、网络、Secrets、审计和回退规则设清楚。',
      image: 'cover://ai-coding-governance',
      details: [
        '本地执行、云端执行、企业接入三种风险结构',
        '权限审批、Secrets、网络访问、PR 审核和日志留痕',
        '成本不是单价，而是单价 + 返工 + 等待 + 审核',
        '一张 AI 编程治理清单',
      ],
      fullContent: [
        {
          subtitle: '1. 安全是默认能力，不是附录',
          text: 'AI 编程工具能够读仓库、改代码、跑命令、发请求、提 PR。能力越强，越需要把权限和回退机制做成默认配置，而不是出了问题再补。',
        },
        {
          subtitle: '2. 治理的四条主线',
          text: '第一条是权限和审批，第二条是数据和隐私，第三条是成本和审计，第四条是异常回退和人工兜底。',
        },
        {
          subtitle: '3. 学这节课的目标',
          text: '你要能够为自己的主流程写出一版最小治理规则，保证 AI 编程能稳定推广，而不是只适合一个高手单兵使用。',
        },
      ],
    },
    {
      title: '中国用户 30 天落地路线：个人、团队、企业三套默认方案',
      content: '前面讲的是地图，这节课把地图收口成路线。你最后需要带走的不是认知，而是一条未来 30 天可执行的落地计划。',
      image: 'cover://china-rollout-playbook',
      details: [
        '海外优先、国内优先、混合栈三种默认路线',
        '个人开发者、小团队、企业技术管理者的配置建议',
        '什么时候该继续加码，什么时候该降级回手动流程',
        '30 天路线图模板',
      ],
      fullContent: [
        {
          subtitle: '1. 不同身份需要不同默认栈',
          text: '个人开发者最看重速度和学习成本；小团队最看重协作和评审；企业管理者最看重治理、采购和可审计性。路线不同，默认栈就不同。',
        },
        {
          subtitle: '2. 三种默认路线',
          text: '国际优先栈适合追求前沿能力上限；国内优先栈适合中文环境、企业接入和稳定采购；混合栈适合在中国环境下同时兼顾效率、成本和能力上限。',
        },
        {
          subtitle: '3. 学这节课的目标',
          text: '你需要在这节课结束时，为自己选出一条未来 30 天就能执行的方案，而不是继续停留在“先收藏再说”的状态。',
        },
      ],
    },
  ],
  cta: {
    text: '工具与模型思路理顺后，建立智能体判断力 → 学习 AI 智能体入门',
    link: '/module/agent-intro',
  },
};
