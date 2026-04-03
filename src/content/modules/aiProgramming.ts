import { Code2, Cpu, GitBranch, Shield } from 'lucide-react';

import type { BaseModuleContent } from '@/types/course';

export const aiProgrammingModule: BaseModuleContent = {
  title: 'AI 编程工具与模型实战',
  subtitle: '先看清工具范式，再设计自己的默认工作栈',
  icon: Code2,
  color: 'blue',
  description:
    '8 节课帮你把 AI 编程这件事讲明白：不是追单个最火工具，而是理解 Claude Code、Codex、Cursor、Gemini、Kiro 这些国外前沿产品，以及通义灵码、TRAE、CodeBuddy 这些国内主流路线分别适合什么任务，再把模型、工作流和治理规则接成一套可执行系统。',
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
      title: 'Claude Code 与 Codex：本地终端 Agent vs 云端编码代理',
      content: '理解当前国际前沿里最值得对比的两条主线：本地、强监督、终端优先的 Claude Code；以及云端、异步、委托优先的 Codex。',
      image: 'cover://claude-code-vs-codex',
      details: [
        '本地执行和云端委托的本质差异',
        'CLAUDE.md、权限模式、异步任务、仓库连接各自解决什么问题',
        '什么时候要盯着 AI 做，什么时候适合丢给 AI 去做',
        '本地执行 / 云端委托判断模板',
      ],
      fullContent: [
        {
          subtitle: '1. Claude Code 的代表性',
          text: 'Claude Code 代表的是“在本地仓库内、强监督、逐步推进”的工作方式。它强调上下文文件、权限边界、工具调用和人在回路中的确认点。',
        },
        {
          subtitle: '2. Codex 的代表性',
          text: 'Codex 代表的是“把编码任务封装成委托，交给云端代理并行处理”的工作方式。它更适合等待成本高、可并行拆分、你不想一直盯着终端的任务。',
        },
        {
          subtitle: '3. 学这节课的目标',
          text: '不是判断谁更强，而是知道面对不同任务风险、等待成本和协作方式时，应该选哪条路径作为默认入口。',
        },
      ],
    },
    {
      title: 'Cursor、Gemini、Kiro：IDE Agent、开源 CLI 与 Spec-driven 路线',
      content: 'Cursor 代表编辑器原生 Agent，Gemini 代表开源 CLI 与 Google 生态，Kiro 代表先规格再实现的 Agentic IDE。三条路线各有最佳场景。',
      image: 'cover://cursor-gemini-kiro',
      details: [
        'Cursor 的 Rules、Background Agents、Bugbot 分别适合什么任务',
        'Gemini CLI 与 Gemini Code Assist 的开放路线',
        'Kiro 的 Specs、Steering、Hooks 为什么适合团队流程',
        'IDE Agent / 开源 CLI / Spec-driven 决策表',
      ],
      fullContent: [
        {
          subtitle: '1. Cursor 的代表性',
          text: 'Cursor 把 Agent 深度塞进了编辑器体验里，核心价值是让改代码、查上下文、开并行任务和做 Review 都在一个工作台完成。',
        },
        {
          subtitle: '2. Gemini 与 Kiro 的代表性',
          text: 'Gemini 强在开放入口、多模态和 Google 生态连接；Kiro 强在先写规格、再设规则、再触发自动化的流程化思维。',
        },
        {
          subtitle: '3. 学这节课的目标',
          text: '你要学会的不是 3 个品牌，而是 3 种产品设计逻辑：编辑器原生、开放终端、规格驱动。',
        },
      ],
    },
    {
      title: '通义灵码、TRAE、CodeBuddy：国内 AI 编程工具怎么选',
      content: '对中国用户来说，体验不只看能力上限，还要看中文表达、支付与采购、网络条件、企业合规和云生态。',
      image: 'cover://china-coding-tools',
      details: [
        '阿里、字节、腾讯三条国内工具路线的差异',
        '国内开发者最在意的中文、采购、合规与生态协同',
        '个人开发、小团队、企业接入的优先选择逻辑',
        '一张国内 AI 编程工具选择表',
      ],
      fullContent: [
        {
          subtitle: '1. 通义灵码的代表性',
          text: '通义灵码代表国内开发者最容易上手的一条路线：IDE 与企业工具集成成熟，适合中国团队做规范化接入和大规模推广。',
        },
        {
          subtitle: '2. TRAE 与 CodeBuddy 的代表性',
          text: 'TRAE 更强调 AI IDE、Builder、项目级能力和中文产品体验；CodeBuddy 更强调团队协作、腾讯云生态和企业治理接入。',
        },
        {
          subtitle: '3. 学这节课的目标',
          text: '不是简单认为“国外更强”或“国产更方便”，而是理解中国用户真正的落地约束，再按场景做选择。',
        },
      ],
    },
    {
      title: '编程模型选型：把模型家族分成角色，而不是背版本号',
      content: '真正稳定的 AI 编程配置，不是全仓库只用一个模型，而是给不同任务分配主力、回退和跑量角色。',
      image: 'cover://coding-model-selection',
      details: [
        '为什么代码任务不能只看 benchmark',
        'Claude、GPT/Codex、Gemini、Qwen、DeepSeek、混元等家族怎么分工',
        '高质量主力、低成本跑量、中文优先、企业内控四种角色',
        '一份代码任务评测表模板',
      ],
      fullContent: [
        {
          subtitle: '1. 工具和模型不要混为一谈',
          text: 'Cursor、Claude Code、CodeBuddy 这些是工作台；Claude、GPT、Gemini、Qwen 是底层模型。先分清这一层，你的选型讨论才不会乱。',
        },
        {
          subtitle: '2. 角色化分工',
          text: '高质量主力负责复杂变更和关键 PR；低成本模型负责批量分析和预处理；中文优先模型负责中文代码注释、文档和团队沟通；企业内控模型负责敏感环境和合规要求。',
        },
        {
          subtitle: '3. 学这节课的目标',
          text: '你要学会为不同任务指定默认模型和回退模型，而不是每有新版本就重写整套工作流。',
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
    text: '工具与模型思路理顺后，去场景库挑你的第一条落地路径 →',
    link: '/module/scenarios',
  },
};
