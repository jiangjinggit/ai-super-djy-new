import { Cloud, FileText, GitBranch, Shield, Terminal, Workflow } from 'lucide-react';

import type { BaseModuleContent } from '@/types/course';

export const codexAgentModule: BaseModuleContent = {
  title: 'Codex 智能体实战',
  subtitle: 'OpenAI 生态里的编码代理、CLI 与云端任务工作流',
  icon: Terminal,
  color: 'blue',
  description:
    '15 节课，5 个阶段：先看清 Codex 的 App、IDE、CLI、Cloud 四类入口，再用 AGENTS.md、沙箱审批、MCP 和 PR 协作建立可控工作流。课程重点不是背功能清单，而是把 Codex 用在真实仓库任务里：先读懂、再计划、再修改、再验证，最后沉淀成团队能复用的执行系统。',
  keyTakeaways: [
    '分清 Codex App、IDE extension、CLI、Cloud tasks 的适用边界，避免把本地即时协作和云端异步任务混在一起',
    '用 AGENTS.md、任务契约和 5 步执行法，把“帮我改一下”改造成可审计、可验证、可回退的仓库任务',
    '理解 sandbox 与 approvals 的配合方式，知道哪些操作必须人工确认，哪些低风险流程可以逐步放权',
    '把 Cloud tasks、PR、MCP 和团队规范接入真实研发流程，让 Codex 成为稳定的代码协作成员',
  ],
  sections: [
    {
      title: '选对入口',
      content: '从 App、IDE、CLI、Cloud 四类入口建立产品地图，判断什么任务适合本地实时协作，什么任务适合云端后台并行。',
      icon: Cloud,
    },
    {
      title: '写好上下文',
      content: '用 AGENTS.md、任务契约、配置文件和分支策略固定项目规则，让 Codex 每次都从同一套约束开始工作。',
      icon: FileText,
    },
    {
      title: '控住权限',
      content: '理解 sandbox、approvals、网络和高风险命令的边界，把可恢复成本放在第一位，而不是盲目信任一次模型输出。',
      icon: Shield,
    },
    {
      title: '接进团队',
      content: '把 Cloud tasks、PR review、MCP 和多任务并行接进研发流程，用验收标准和复盘模板保证质量。',
      icon: GitBranch,
    },
  ],
  lessons: [
    {
      title: 'Codex 是什么，它和聊天 AI、Claude Code 有什么区别',
      content: '先把 Codex 看成能理解仓库、执行任务、提交改动的编码代理，而不是更聪明的聊天框。',
      image: 'cover://lesson-01-what-is-codex',
      details: [
        'Codex App、IDE、CLI、Cloud 四类入口的共同点和差异',
        '聊天式问答、仓库级执行、云端并行任务的本质区别',
      ],
      fullContent: [
        { subtitle: '1. Codex 的核心定位', text: 'Codex 是 OpenAI 面向软件工程任务的编码代理体系。它可以在不同入口里阅读仓库上下文、给出计划、修改文件、运行验证，并把结果整理成可审查的交付物。' },
        { subtitle: '2. 和聊天 AI 的差异', text: '普通聊天 AI 更像顾问，输出建议和代码片段；Codex 更像执行代理，会围绕真实文件、命令、diff、测试和 PR 完成多步骤任务。' },
        { subtitle: '3. 和 Claude Code 的关系', text: '两者都适合做仓库级任务，但 Codex 的优势在于 OpenAI 生态入口、CLI 与 Cloud tasks 的组合。Claude Code 课程里的 5 步执行法、安全边界和上下文管理，仍然可以迁移到 Codex。' },
        { subtitle: '4. 本课产出', text: '写出 5 个你想交给 Codex 的任务，标注它们是否需要读仓库、改代码、跑测试、联网、开 PR。验收口径是能判断哪些任务只适合咨询，哪些适合交给 Codex 执行。' },
      ],
    },
    {
      title: '入口地图：App、IDE、CLI、Cloud 怎么选',
      content: '入口选错，任务会变慢也更容易失控。先用一张决策表把日常任务分流。',
      image: 'cover://lesson-02-entry-map',
      details: [
        'App / IDE / CLI / Cloud 的适用任务、风险点和协作方式',
        '个人学习、开发者日常、团队并行任务的起步路线',
      ],
      fullContent: [
        { subtitle: '1. 四类入口', text: 'Codex App 适合从产品化界面发起任务和跟踪结果；IDE 适合边写边改；CLI 适合本地仓库和终端工作流；Cloud 适合把任务交给云端环境后台处理并产出可审查结果。' },
        { subtitle: '2. 入口选择标准', text: '看三件事：任务是否依赖本地环境、是否需要你实时观察 diff、是否适合异步并行。依赖本机和即时反馈优先 CLI/IDE；低耦合、可描述、可验收的仓库任务适合 Cloud。' },
        { subtitle: '3. 新手起步顺序', text: '先用 CLI 或 IDE 做只读分析，再做小范围修改；确认任务契约和验证习惯稳定后，再把低风险任务交给 Cloud tasks 并行处理。' },
        { subtitle: '4. 本课产出', text: '完成一张入口决策表：任务、推荐入口、风险等级、是否需要人工确认、验证方式。验收口径是每个任务都能说出为什么不选其他入口。' },
      ],
    },
    {
      title: 'CLI 快速上手：从只读分析到第一处小改动',
      content: '不要第一天就让 Codex 大改项目。先让它读、解释、计划，再允许它改一个很小的地方。',
      image: 'cover://lesson-03-cli-quickstart',
      details: [
        '安装、登录、进入项目目录、发起只读任务的基础流程',
        '首次小改动的范围控制、diff 检查和验证记录',
      ],
      fullContent: [
        { subtitle: '1. 起手姿势', text: '在目标项目目录启动 Codex CLI，让它先读取仓库结构、说明技术栈和关键命令。第一条任务明确写“先不要修改文件”，观察它是否能基于真实文件回答。' },
        { subtitle: '2. 第一处小改动', text: '选择一个低风险任务，例如修正文案、补一个测试、调整一个局部样式。要求 Codex 先给计划，列出预计修改文件，确认后再执行。' },
        { subtitle: '3. 验证记录', text: '每次任务保留三样东西：原始指令、实际 diff、验证结果。这样你才能区分是指令问题、上下文问题，还是模型执行问题。' },
        { subtitle: '4. 本课产出', text: '完成一次只读分析和一次小范围改动。验收口径是 git diff 只包含计划内文件，验证命令或人工检查已记录，任务总结能说明残留风险。' },
      ],
    },
    {
      title: 'AGENTS.md：给 Codex 的项目说明书',
      content: '把重复约束写进仓库，而不是每次重新说。AGENTS.md 是稳定协作的第一块地基。',
      image: 'cover://lesson-04-agents-md',
      details: [
        'AGENTS.md 的层级、适用内容和维护节奏',
        '项目规则、常用命令、禁止事项、验收标准四段模板',
      ],
      fullContent: [
        { subtitle: '1. AGENTS.md 放什么', text: '放 Codex 每次进入项目都应该知道的事实：项目目标、目录结构、常用命令、编码规范、测试方式、安全禁令、提交要求。不要放会快速过期的临时计划。' },
        { subtitle: '2. 层级与范围', text: '仓库根目录可以放全局规则；如果子目录有特殊约定，可以放更局部的说明。关键是让规则范围清楚，避免多个文件互相冲突。' },
        { subtitle: '3. 维护习惯', text: '每次 Codex 犯了可复现的错，就把原因转成一条规则；每次规则过期，就删掉或改写。AGENTS.md 太长会降低执行质量。' },
        { subtitle: '4. 本课产出', text: '写出一份基础 AGENTS.md，至少包含常用命令、修改边界、验证方式和高风险操作清单。验收口径是新开会话后，Codex 能按同一套规则给出计划。' },
      ],
    },
    {
      title: 'Sandbox 与 approvals：把危险能力关进笼子',
      content: 'Codex 能读写文件、跑命令，也因此必须先理解沙箱和审批。权限不是体验开关，而是安全设计。',
      image: 'cover://lesson-05-sandbox-approvals',
      details: [
        '文件系统、网络、命令执行和人工审批的边界',
        '低风险、中风险、高风险任务的权限选择方法',
      ],
      fullContent: [
        { subtitle: '1. 两套控制', text: 'Sandbox 限制 Codex 能接触哪些文件、网络和系统资源；approvals 决定哪些操作需要你确认。两者配合使用，才能把风险控制在可恢复范围内。' },
        { subtitle: '2. 常见风险分层', text: '只读分析风险低；局部改文件风险中；删除文件、安装依赖、改配置、联网请求、数据库操作、git push 都需要明确人工确认和回退路径。' },
        { subtitle: '3. 放权顺序', text: '新项目先只读，再允许工作区内写入，再逐步放开已验证命令。不要在不熟悉的仓库里直接使用宽权限模式。' },
        { subtitle: '4. 本课产出', text: '给自己的项目写一张权限矩阵：哪些操作永远禁止、哪些需要确认、哪些可自动执行。验收口径是任何高风险动作都有确认点、diff 检查和恢复方式。' },
      ],
    },
    {
      title: '5 步执行法：让 Codex 按工程节奏工作',
      content: '读、计划、执行、验证、总结，是把 Codex 从“会改代码”变成“能交付任务”的关键。',
      image: 'cover://lesson-06-five-step-workflow',
      details: [
        '适用于 Codex CLI、IDE 和 Cloud 的统一任务节奏',
        '禁止事项、验收标准、回退路径的标准写法',
      ],
      fullContent: [
        { subtitle: '1. 第一步：读', text: '让 Codex 先读取相关文件、测试、报错和文档，输出它对问题的理解。此时不要允许修改，先检查它有没有读错。' },
        { subtitle: '2. 第二步：计划', text: '要求列出将修改的文件、不会触碰的范围、验证命令和可能风险。计划越具体，后续越容易审查。' },
        { subtitle: '3. 第三到五步', text: '确认计划后执行；执行后必须验证；最后输出变更摘要、验证结果、残留风险和回退方式。Cloud tasks 也要用同样的验收口径。' },
        { subtitle: '4. 本课产出', text: '把一个真实小任务改写成 5 步任务契约。验收口径是另一个人拿到这份契约，也能判断 Codex 是否完成任务。' },
      ],
    },
    {
      title: 'Prompt 与任务契约：别只说“帮我优化一下”',
      content: 'Codex 的质量很大程度取决于你是否定义了输入、边界、输出和验收。',
      image: 'cover://lesson-07-task-contract',
      details: [
        '背景、任务、范围、禁止、验收、输出格式六段式模板',
        'Bug 修复、功能开发、代码审查、文档补全四类范例',
      ],
      fullContent: [
        { subtitle: '1. 任务契约六段式', text: '背景说明问题为什么存在；任务说明要做什么；范围说明读写文件边界；禁止事项限制不该做什么；验收标准说明怎么判断完成；输出格式规定最终汇报。' },
        { subtitle: '2. 给 Codex 好输入', text: '最好提供复现步骤、报错、相关文件路径、期望行为和已有约束。不要只贴一大段日志，让它猜你的目标。' },
        { subtitle: '3. 常见坏指令', text: '“全面优化项目”“帮我重构一下”“把它做得更高级”都太泛。改成可验证目标，例如“只修改登录页，解决移动端按钮溢出，保留视觉风格，运行 lint”。' },
        { subtitle: '4. 本课产出', text: '把 3 条模糊指令改写成任务契约。验收口径是每条指令都包含范围、禁止事项和验证方式。' },
      ],
    },
    {
      title: 'Codex Cloud tasks：把低耦合任务交给云端并行',
      content: 'Cloud tasks 适合可描述、可验收、低耦合的仓库任务，不适合模糊探索和高风险生产操作。',
      image: 'cover://lesson-08-cloud-tasks',
      details: [
        '什么任务适合云端后台执行，什么任务应该留在本地',
        '任务拆分、环境设置、PR 验收和失败复盘方法',
      ],
      fullContent: [
        { subtitle: '1. Cloud 的优势', text: 'Cloud 可以在云端环境后台执行任务，适合并行处理多个相对独立的仓库改动，例如补测试、修局部 Bug、整理文档、做小型重构。' },
        { subtitle: '2. 适合与不适合', text: '适合：输入明确、验收清楚、依赖稳定、失败成本低。不适合：需求还没想清、必须实时交互、依赖本机私有环境、涉及生产秘钥或高风险外部操作。' },
        { subtitle: '3. 交付审查', text: '把 Cloud 结果当成一个同事开的 PR 来审查：看 diff、看测试、看说明、看是否超范围。不要因为是 AI 生成就跳过 review。' },
        { subtitle: '4. 本课产出', text: '把一个大任务拆成 3 个适合 Cloud 的小任务，分别写清输入、验收和风险。验收口径是每个任务失败时不会影响主线代码。' },
      ],
    },
    {
      title: 'IDE 与 PR 工作流：把 Codex 接进日常开发',
      content: 'IDE 适合即时上下文，PR 适合团队审查。两者组合，才像一个真实研发流程。',
      image: 'cover://lesson-09-ide-pr-workflow',
      details: [
        'IDE 中的小步修改、解释代码、生成测试和局部重构',
        'PR 描述、review checklist、人工确认和合并前验证',
      ],
      fullContent: [
        { subtitle: '1. IDE 使用重点', text: 'IDE 里最适合做小步任务：解释一段代码、补边界测试、修改局部组件、根据报错定位原因。保持一次只改一个目标，避免长时间发散。' },
        { subtitle: '2. PR 工作流', text: 'Codex 生成的改动要进入正常 review：描述问题、列出变更、附验证结果、标注风险点。合并前仍然需要人来判断产品语义和业务风险。' },
        { subtitle: '3. 团队规范', text: '把 PR 模板、测试命令、敏感目录、禁止事项写进 AGENTS.md 或项目文档，让 Codex 和团队成员遵守同一套规则。' },
        { subtitle: '4. 本课产出', text: '建立一个 Codex PR checklist，至少包含范围、测试、回归风险、安全风险和人工确认项。验收口径是每个 AI PR 都能被同一套清单审查。' },
      ],
    },
    {
      title: 'MCP 与外部工具：给 Codex 接上必要上下文',
      content: 'MCP 让 Codex 能接入更多工具和数据源，但接得越多，权限越要清楚。',
      image: 'cover://lesson-10-mcp-integrations',
      details: [
        'MCP 的价值、适用场景和最小权限原则',
        'GitHub、文档、浏览器、内部系统接入前的风险评估',
      ],
      fullContent: [
        { subtitle: '1. MCP 的价值', text: 'MCP 可以把外部工具、数据源或内部系统暴露给 Codex，让它不只依赖当前仓库。适合需要读取 issue、文档、设计资料或运行特定工具的任务。' },
        { subtitle: '2. 接入原则', text: '先接只读，后接写入；先接低敏数据，后接高敏系统；先定义撤销方式，再给 token。每个连接都要知道它能读什么、能写什么、谁负责维护。' },
        { subtitle: '3. 不该接什么', text: '生产数据库、支付后台、客户隐私库、无审计日志的内部工具，都不适合作为新手阶段的 Codex MCP 连接。' },
        { subtitle: '4. 本课产出', text: '选择一个低风险 MCP 场景，写出授权范围、使用任务、验证方式和撤销方式。验收口径是不用它时也知道怎么关掉它。' },
      ],
    },
    {
      title: '配置与 Profiles：把不同任务的默认行为分开',
      content: '同一个 Codex 不该用一套权限跑所有事。用配置和 profile 区分学习、开发、审查和自动化。',
      image: 'cover://lesson-11-config-profiles',
      details: [
        '常见配置项：模型偏好、审批策略、沙箱、MCP、项目规则',
        '只读审查、日常开发、隔离实验、云端任务四类 profile 思路',
      ],
      fullContent: [
        { subtitle: '1. 为什么要分 profile', text: '审查任务应该偏只读，开发任务允许工作区写入，实验任务应该放进隔离分支或临时目录。把它们混成一个默认配置，会让权限边界越来越模糊。' },
        { subtitle: '2. 配置项的原则', text: '配置不要追求一次写全。先固定项目规则和审批策略，再根据稳定流程逐步加入 MCP、默认命令和特定 profile。' },
        { subtitle: '3. 四类建议配置', text: 'readonly-review 用于代码审查；daily-dev 用于日常小改动；sandbox-lab 用于实验性依赖和脚本；cloud-ready 用于可交给 Cloud 的低耦合任务描述。' },
        { subtitle: '4. 本课产出', text: '写出你自己的 profile 设计表，不要求一次配置完。验收口径是每类任务都能说明默认权限、禁止事项和验证方式。' },
      ],
    },
    {
      title: '上下文、分支与回退：让每次改动都可恢复',
      content: 'AI 编程真正的安全感来自可恢复，而不是来自“它应该不会错”。',
      image: 'cover://lesson-12-context-branching',
      details: [
        '任务前上下文整理、分支命名、commit 粒度和 diff 审查',
        '上下文污染、超范围修改、验证失败时的停止规则',
      ],
      fullContent: [
        { subtitle: '1. 任务前准备', text: '先确认 git status、当前分支、相关文件、验证命令。仓库不干净时，告诉 Codex 哪些改动是已有的，不允许覆盖。' },
        { subtitle: '2. 分支与 commit 粒度', text: '一个任务一个分支或至少一个清晰 diff。Codex 很适合做小步提交，不适合把多个意图混在一个大改动里。' },
        { subtitle: '3. 停止规则', text: '发现上下文不一致、修改超范围、验证失败且原因不明、需要高风险权限时，要求 Codex 停下并汇报，而不是继续试。' },
        { subtitle: '4. 本课产出', text: '写一份任务前检查表和失败停止规则。验收口径是任何一次 Codex 任务失败后，都能回到明确的上一个状态。' },
      ],
    },
    {
      title: '安全治理：团队该怎样允许 Codex 改代码',
      content: '团队不是简单问“能不能用”，而是要定义哪些任务、哪些权限、哪些审查和哪些审计。',
      image: 'cover://lesson-13-security-governance',
      details: [
        '个人、团队、组织三层安全策略',
        '秘钥、依赖、外部请求、生产环境、合规数据的红线清单',
      ],
      fullContent: [
        { subtitle: '1. 个人层', text: '保护本机秘钥、确认权限模式、任务前看状态、任务后看 diff。个人安全习惯是团队治理的底座。' },
        { subtitle: '2. 团队层', text: '定义 AI 可处理任务白名单、PR 审查规则、自动化任务门槛、敏感目录和日志留存方式。AI 生成代码不能绕过团队工程流程。' },
        { subtitle: '3. 组织层', text: '涉及客户数据、生产配置、供应链安全和合规要求时，需要组织级政策。课程不替代法务和安全团队判断。' },
        { subtitle: '4. 本课产出', text: '写出一页 Codex 使用政策草案：允许任务、禁止任务、审批点、审计记录和责任人。验收口径是新人加入也能按政策执行。' },
      ],
    },
    {
      title: '实战案例 A：开发者用 Codex 修一个真实 Bug',
      content: '从复现问题到读代码、改动、测试、总结，把 Codex 当成结对工程师使用。',
      image: 'cover://lesson-14-case-bugfix',
      details: [
        'Bug 修复的任务契约、读取范围、验证命令和回退方式',
        '如何防止 Codex 顺手重构、改错文件或遗漏回归测试',
      ],
      fullContent: [
        { subtitle: '1. 输入准备', text: '给 Codex 复现步骤、实际行为、期望行为、相关文件路径、最近改动和测试命令。没有这些输入，Codex 很容易把时间花在猜测上。' },
        { subtitle: '2. 执行节奏', text: '先让它只读分析并提出 2 到 3 个可能原因；确认后选择最小修复路径；修改完成后运行测试并检查 diff。' },
        { subtitle: '3. 交付格式', text: '最终输出要包括根因、修改点、验证结果、未覆盖风险、建议补充测试。这个格式比一句“已修复”有价值得多。' },
        { subtitle: '4. 本课产出', text: '拿一个真实 Bug 跑完整流程。验收口径是修复可复现、测试可运行、diff 可解释，且没有无关重构。' },
      ],
    },
    {
      title: '实战案例 B：产品和研发一起用 Codex 做小功能',
      content: '产品负责验收语言，研发负责工程边界，Codex 负责把小功能拆成可审查改动。',
      image: 'cover://lesson-15-case-team-feature',
      details: [
        '需求澄清、任务拆分、Cloud 并行、PR 审查的协作链路',
        'Codex 与 Claude Code、Cursor 等工具的搭配和迁移方法',
      ],
      fullContent: [
        { subtitle: '1. 协作方式', text: '产品先写清用户故事和验收标准；研发补充技术边界和禁止事项；Codex 负责生成计划、局部实现和测试；最终由人审查业务语义和代码质量。' },
        { subtitle: '2. 工具搭配', text: 'Codex 可以承担 OpenAI 生态里的仓库任务，Claude Code 可以继续承担团队熟悉的 CLI、Cowork 或多智能体流程，Cursor/IDE 工具适合即时编辑。关键不是只选一个工具，而是把入口、权限和验收统一起来。' },
        { subtitle: '3. 迁移方法', text: '把 Claude Code 课程里的 CLAUDE.md 思路迁移成 AGENTS.md；把 5 步执行法迁移成 Codex task contract；把 Cowork 的文档整理结果转成 Codex 可执行的仓库任务。' },
        { subtitle: '4. 本课产出', text: '完成一个小功能的团队任务包：需求、技术边界、Codex 任务契约、PR checklist、验收记录。验收口径是团队成员能复用这套流程处理下一个小功能。' },
      ],
    },
  ],
  cta: {
    text: 'Codex 工作流跑通后，横向理解更多 AI 编程工具 → 探索 AI 编程实战',
    link: '/module/ai-programming',
  },
};
