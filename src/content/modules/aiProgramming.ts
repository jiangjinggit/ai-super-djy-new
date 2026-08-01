import { Code2, Cpu, GitBranch, Shield } from 'lucide-react';

import type { BaseModuleContent } from '@/types/course';

export const aiProgrammingModule: BaseModuleContent = {
  title: 'AI 编程工具与模型实战',
  subtitle: '先看清工具范式，再设计自己的默认工作栈',
  icon: Code2,
  color: 'blue',
  description:
    '8 节课把 AI 编程从工具清单改成可执行系统：先建立工具范式坐标，再比较 Claude Code 与 Codex，随后理解 Cursor / Gemini / Kiro 和国内 IDE Agent 路线，最后把模型分工、默认工作流、治理规则和 30 天落地计划接起来。',
  keyTakeaways: [
    '理解 AI 编程已经从补全和聊天，进入可计划、可执行、可验证的 Agentic Coding 阶段',
    '按 CLI、IDE、Cloud Agent、Spec-driven 四种入口给真实任务选工具，而不是追单一品牌',
    '先学 Claude Code / Codex 的代理差异，再学 Cursor / Gemini / Kiro 和国内工具的工作台路线',
    '给代码任务设计主力模型、回退模型和跑量模型，具体型号、价格和上下文以官方当前页面为准',
    '把 AI 接进需求、实现、测试、评审、文档和交付流程，形成可复用 SOP',
    '建立权限、数据、成本、审计和回退机制，避免无边界自动化',
  ],
  sections: [
    {
      title: '工具范式',
      content: '先理解不同产品到底在解决哪一段开发链路：终端执行、IDE 协作、云端委托、规范驱动。阶段产出是入口坐标图和同一任务的试用记录。',
      icon: Code2,
    },
    {
      title: '模型分工',
      content: '代码任务不是看排行榜选一个模型，而是按复杂主力、日常默认、低成本跑量、中文/企业约束和回退条件做角色分工。',
      icon: Cpu,
    },
    {
      title: '工作流与治理',
      content: '真正的差距不在单次生成，而在你能不能把需求、实现、评审、验证、安全边界和回退方案接成一条稳定流程。',
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
        {
          subtitle: '4. 本课产出',
          text: '用 3 个真实任务完成入口坐标图：每个任务标出推荐入口、验证方式、风险点和不适合的入口。验收口径是能解释为什么工具选择服务于任务流程，而不是服务于品牌偏好。',
        },
      ],
    },
    {
      title: 'Claude Code 与 Codex：两大编码代理的真实差异与选型',
      content: '两者都已是"本地 + 云端"混合形态。真正的差异在安全模型、配置体系、模型绑定和生态集成，而不是"谁在本地谁在云端"。',
      image: 'cover://claude-code-vs-codex',
      details: [
        '安全模型差异：权限 profile / 沙箱策略 vs 权限模式 / Hooks',
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
          text: '更稳定的差异维度包括安全策略、配置体系、模型绑定、第三方模型接入方式、生态入口和组织治理方式。具体入口、沙箱和集成能力变化很快，选型前回到官方当前文档核验。',
        },
        {
          subtitle: '3. 学这节课的目标',
          text: '不是判断谁更强，而是从安全治理、配置体系、生态绑定等稳定维度做出适合自己团队的选型。',
        },
        {
          subtitle: '4. 本课产出',
          text: '拿当前仓库的 3 个任务填写 Claude Code / Codex 选型表，包含默认入口、审批策略、验证命令和回退方式。验收口径是每个选择都能落到安全治理和交付流程，而不是一句“它更强”。',
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
        {
          subtitle: '4. 本课产出',
          text: '把同一个需求分别写成 IDE Agent 快速改动流程、Google 多入口协同流程、Spec-driven 流程。验收口径是能说出什么时候先写规格，什么时候直接结对改代码，什么时候只做低风险探索。',
        },
      ],
    },
    {
      title: 'Qoder CN / 通义灵码、Qoder、TRAE、CodeBuddy：国内 IDE Agent 怎么选',
      content: '国内工具都在走 IDE Agent 路线，但产品重心差异很大。选型时先核对官方能力边界，再用同一个真实仓库做小范围试点。',
      image: 'cover://china-coding-tools',
      details: [
        '阿里系入口：Qoder CN / 通义灵码与 Qoder 的边界',
        'TRAE、CodeBuddy、Qoder CN、Qoder 四条路线的真实差异',
        '官方能力、稳定性与团队推广三类判断',
        '一张国内 AI 编程工具选择表',
      ],
      fullContent: [
        {
          subtitle: '1. 国内工具正在收敛到 IDE Agent',
          text: '现在国内主流工具比的已经不只是补全质量，而是 IDE 里谁能把读仓库、改多文件、规则、知识库、Agent 和团队接入做成主工作台。',
        },
        {
          subtitle: '2. 阿里系入口要分清 Qoder CN / 通义灵码与 Qoder',
          text: 'Qoder CN / 通义灵码更偏中文环境、企业接入和团队普及；Qoder 更偏深度 Agentic IDE，强调 Quest、Repo Wiki、Rules、Hooks 和仓库级执行。具体名称和入口以阿里官方当前页面为准。',
        },
        {
          subtitle: '3. 学这节课的目标',
          text: '不是简单认为“国外更强”或“国产更方便”，而是结合官方能力和真实体验做判断：先看能力是否覆盖你的流程，再用同一个任务试稳定性、跨文件质量和团队治理。',
        },
        {
          subtitle: '4. 本课产出',
          text: '设计一张国内工具试点评分表：同一仓库、同一任务、同一验收标准，只记录跨文件质量、规则遵守、验证支持、团队治理和采购/合规约束。验收口径是不做静态排名，只给出适合你当前流程的结论。',
        },
      ],
    },
    {
      title: '编程模型选型：把模型家族分成角色，而不是背版本号',
      content: '这节课用国内 6 家作为练习样本：GLM、Kimi、MiniMax、豆包、DeepSeek、Qwen。重点不是追热度，而是按任务角色、可用成本和官方当前页面做选择。',
      image: 'cover://coding-model-selection',
      details: [
        '只比较 GLM、Kimi、MiniMax、豆包、DeepSeek、Qwen 六家',
        '默认模型、复杂主力、低成本跑量、回退模型怎么分工',
        '输入价、输出价、缓存价、长上下文阶梯价要怎么看',
        '基于官方核验入口维护自己的精简选型表',
      ],
      fullContent: [
        {
          subtitle: '1. 只看国内 6 家，不再泛泛聊“全模型宇宙”',
          text: '这节课直接聚焦 GLM、Kimi、MiniMax、豆包、DeepSeek、Qwen 六家作为样本，是为了训练选型方法：先把候选池缩小，再用同一组任务验证，而不是把所有模型都塞进一张大表。',
        },
        {
          subtitle: '2. 价格必须一起看',
          text: '代码模型不能只看 benchmark。输入价、输出价、缓存价、长上下文阶梯价都会影响真实成本，尤其是大仓库和多步 Agent 任务。具体型号、单价和上下文以官方当前页面为准。',
        },
        {
          subtitle: '3. 学这节课的目标',
          text: '你要拿到一套更短、更能落地的模型分工方案：默认模型、复杂主力、低成本跑量和回退模型分别怎么配。',
        },
        {
          subtitle: '4. 本课产出',
          text: '完成一张任务-模型角色表：每类任务都有主力、回退和跑量候选，并写清切换条件、官方核验链接和复评时间。验收口径是型号变化时仍能按角色重新选择。',
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
        {
          subtitle: '4. 本课产出',
          text: '把一条真实开发流程写成 SOP，至少包含读、计划、执行、验证、总结、Review 和回退。验收口径是另一名成员按 SOP 能完成同类任务，并知道何时停下来找人确认。',
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
        {
          subtitle: '4. 本课产出',
          text: '写出最小治理清单：任务分级、权限审批、Secrets 隔离、网络边界、日志审计、成本阈值和回退方式。验收口径是高风险任务不会被自动执行，所有主流程都有验证和恢复路径。',
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
        {
          subtitle: '4. 本课产出',
          text: '生成一份 30 天试运行计划：第 1 周选入口，第 2 周定模型角色，第 3 周跑流程，第 4 周补治理并复盘。验收口径是有第一个真实任务、负责人、成功标准和降级条件。',
        },
      ],
    },
  ],
  cta: {
    text: '工具与模型思路理顺后，建立智能体判断力 → 学习 AI 智能体入门',
    link: '/module/agent-intro',
  },
};
