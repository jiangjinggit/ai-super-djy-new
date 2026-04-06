import { FileText, Shield, Terminal, Zap } from 'lucide-react';

import type { BaseModuleContent } from '@/types/course';

export const claudeAgentModule: BaseModuleContent = {
  title: 'Claude 智能体实战',
  subtitle: '能读文件、跑命令、调工具的 AI 执行代理',
  icon: Terminal,
  color: 'purple',
  description:
    '15 节课，6 个阶段：认知建立看清边界 → 快速上手跑通首任务 → 核心工作流建立稳定产出 → 进阶能力逐层叠加 → Agent 架构与安全治理 → 三大真实场景串联全链路。拿走模板和配置，不讲空话。',
  keyTakeaways: [
    '先用一个小任务跑通首个真实闭环，不靠运气靠流程',
    '5 步执行法 + 结构化 Prompt + CLAUDE.md 模板，拿走即用',
    'Skills、MCP、Subagents、Hooks 逐层叠加，从单工具到多智能体',
    '安全边界 + 回退机制 + 自动化路径：先手动验证，再逐步放权',
  ],
  sections: [
    {
      title: '跑起来',
      content: '认知建立 + 快速上手：分清 CLI 和 Cowork，选对入口，先用一个只读分析任务跑通第一条工作链路。',
      icon: Zap,
    },
    {
      title: '配好它',
      content: '核心工作流 + 进阶能力：5 步执行法、结构化 Prompt、CLAUDE.md 七段式、Skills 封装、MCP 接通、上下文管理。',
      icon: FileText,
    },
    {
      title: '稳住它',
      content: 'Agent 架构 + 真实场景：Subagents 拆分复杂任务、安全边界四层叠加、Hooks 自动化，三个场景跑通全链路。',
      icon: Shield,
    },
  ],
  lessons: [
    // ===== 第一阶段：认知建立（为什么这个工具值得学） =====
    {
      title: 'Claude Code 是什么，它和聊天 AI 有什么本质区别',
      content: '它不是聊天框，而是能读文件、跑命令、调工具的执行代理。先建立这个认知，后面所有课才有意义。',
      image: 'cover://lesson-01-what-is-claude-code',
      details: [
        '聊天 AI vs Claude Code vs Cowork 本质差异',
        '适合人群与入口对照表 + 三个自检问题',
      ],
      fullContent: [
        { subtitle: '1. 两种 AI 工具的本质差异', text: '普通聊天 AI 是"顾问"——你说一句它回一句，没有手，不能读你的文件、改你的代码、跑命令。Claude Code 和 Cowork 是"执行者"——能读真实文件、执行终端命令、调用外部工具、在多步骤间保持上下文。' },
        { subtitle: '2. Claude Code 的工作原理', text: '每次处理任务都在做四件事：读取当前上下文（提示词、目录、CLAUDE.md、规则、可用工具）、判断要不要调用工具、在权限模式约束下执行动作、把结果写回会话并在必要时更新 memory。' },
        { subtitle: '3. 适合谁', text: '开发者用 CLI，产品经理用 Cowork，运营/市场用 Cowork，研究人员用 Cowork + CLI，创业者用 CLI + Cowork 组合。选错入口，体验直接下降一个档次。' },
      ],
    },
    // ===== 第二阶段：快速上手（第一天就能用起来） =====
    {
      title: '安装、登录与环境配置',
      content: '安装不难，难的是把正确的上下文配好。两条路径 + 权限模式速查 + 两个 10 分钟验证任务。',
      image: 'cover://lesson-02-install-and-setup',
      details: [
        'CLI（native install / Homebrew / WinGet）+ Desktop/Web/Cowork 入口区分',
        '权限模式速查 + 两个 10 分钟验证任务',
      ],
      fullContent: [
        { subtitle: '1. 两条安装路径', text: 'CLI 当前优先用官方 native install，Homebrew / WinGet 作为备选。Desktop 与 Web 是 Claude Code 的两个表面；Cowork 则是 Desktop 里的研究预览能力，不要混成一个入口。' },
        { subtitle: '2. 三件事先做好', text: '设置工作目录（进项目目录再启动）、先用小目录验证权限边界、理解权限模式差异（default / acceptEdits / plan / auto / dontAsk / bypassPermissions）。' },
        { subtitle: '3. 验证任务', text: 'CLI：让它读项目结构并说出理解，先别改。Cowork：让它读文件夹整理要点清单。观察它读文件是否准确、分析是否具体、有没有瞎猜。' },
      ],
    },
    {
      title: '平台地图——CLI、Desktop、Web、IDE、Cowork 怎么选',
      content: '入口选错了，体验直接下降一个档次。一张决策表 + 两个典型错误 + 一条组合路径。',
      image: 'cover://lesson-03-platform-map',
      details: [
        '8 类任务 × 5 个入口的适配度决策表',
        '两个典型错误 + 成熟的组合路径',
      ],
      fullContent: [
        { subtitle: '1. 五个入口', text: 'CLI 控制力最强脚本化最好；IDE 最适合边改边看；Desktop 是 Claude Code 的桌面形态；Web 是云端形态；Cowork 则是 Desktop 里的任务模式，别混成一类。' },
        { subtitle: '2. 典型错误', text: '把 Cowork 当成 Claude Code Web 版；或者把仓库级重构放进纯文档入口。前者是产品边界没分清，后者会在读目录、跑测试、看 diff 时吃亏。' },
        { subtitle: '3. 组合路径', text: 'Cowork 先整理需求文档和研究输入 → 沉淀到共享目录 → CLI/IDE/Desktop/Web 实现代码或脚本 → Cowork 或 Desktop 再生成面向业务的交付材料。' },
      ],
    },
    // ===== 第三阶段：核心工作流（从"能跑"到"好用"） =====
    {
      title: '5 步执行法——显著降低返工率的关键',
      content: '读→计划→执行→验证→总结，把自由度锁在正确的位置。附通用禁止清单和完整 Bug 修复案例。',
      image: 'cover://lesson-04-five-step-workflow',
      details: [
        '五步执行法 + 通用禁止清单（可直接复制）',
        '完整案例：修复登录跳转 Bug 的全流程',
      ],
      fullContent: [
        { subtitle: '1. 为什么需要固定流程', text: '脑子里有个任务，直接说"帮我做 XXX"，它做到一半方向不对，你打断重来，反复几次花了 2 小时。问题不是模型不行，是指挥方式不对。' },
        { subtitle: '2. 五步执行法', text: '先读文件理解上下文，再给计划确定范围，然后执行修改，接着验证结果，最后输出总结和风险点。缺前两步，返工率通常会明显上升。' },
        { subtitle: '3. "不做什么"清单', text: '不重构不相关的代码、不引入新依赖、不修改接口签名、不删除文件、不修改配置文件、不发外部请求、遇到不确定先问。把上次"它改错了"的地方加进禁止清单。' },
      ],
    },
    {
      title: 'Prompt 写法——Claude 听得懂的话，和你平时说的不一样',
      content: '清晰、结构化、有上下文的指令，比聪明的措辞更重要。五个技巧 + 烂 Prompt 改法表 + 可复制模板。',
      image: 'cover://lesson-05-prompt-engineering',
      details: [
        'XML 标签 / Few-shot / 长文档顺序 / 先思考再输出',
        '烂 Prompt 改法对照表 + 结构化模板',
      ],
      fullContent: [
        { subtitle: '1. XML 标签组织结构', text: 'Claude 对 XML 标签有很好的理解，用标签把任务、代码、要求、禁止分开，可以大幅减少歧义。' },
        { subtitle: '2. 给动机和示例', text: '解释你为什么要这样做，它会理解得更准。如果有特定输出格式要求，给一个例子比描述一百遍都有效。' },
        { subtitle: '3. 结构化模板', text: '背景 → 任务 → 输入 → 要求 → 禁止 → 示例，这个模板可以直接复制用于大多数任务。' },
      ],
    },
    {
      title: 'CLAUDE.md、Rules、Auto Memory——给 AI 装上员工手册',
      content: '把固定信息写进配置，是从"能用"到"好用"最重要的一步。四种载体分工 + 七段标准结构 + Cowork Instructions 模板。',
      image: 'cover://lesson-06-claude-md-and-memory',
      details: [
        'CLAUDE.md 七段标准结构 + .claude/rules/ 拆分策略',
        'Cowork Global/Project Instructions 配置模板',
      ],
      fullContent: [
        { subtitle: '1. 四种载体', text: '全局 CLAUDE.md 放语言偏好和通用禁令；项目 CLAUDE.md 放架构、命令、禁止事项；.claude/rules/ 放某类文件的专门规则；Auto Memory 放 Claude 自己总结的经验。它们都是 context，不是硬编码开关。' },
        { subtitle: '2. 标准结构', text: '项目背景、常用命令、目录结构、编码规范、禁止事项、当前重点、协作约定——七类信息已经足够。' },
        { subtitle: '3. 维护习惯', text: '发现问题立刻更新，每月回顾清掉过期内容，把信息放对地方，避免互相冲突。' },
      ],
    },
    // ===== 第四阶段：进阶能力（效率再翻倍） =====
    {
      title: 'Skills 与内置命令——把高频动作变成一句话能力',
      content: 'Built-in commands + bundled skills + custom skills + subagents。内置能力速查 + standup skill 实战 + 五个高频范例。',
      image: 'cover://lesson-07-skills-and-commands',
      details: [
        'Tools / Commands / Bundled Skills / Custom Skills / Subagents 五层区别',
        '从零做一个 standup skill + 五个高频范例',
      ],
      fullContent: [
        { subtitle: '1. 五层能力', text: 'Tools 是基础能力；Built-in Commands 是官方命令；Bundled Skills 是官方附带技能，如 /debug、/loop；Custom Skills 是你在 .claude/skills/ 或 .claude/commands/ 里定义的能力包；Subagents 则负责拆分复杂任务。' },
        { subtitle: '2. Skill 的优势', text: '当任务跨多步、需要模板、需要脚本、需要固定目录结构时，skill 比单一命令更稳。skill 的入口文件是 SKILL.md，还可以配 frontmatter、辅助文件、脚本和模板。' },
        { subtitle: '3. 高频范例', text: '/commit-msg 生成 commit 消息、/doc 生成函数文档、/daily-summary 日报生成、/error-triage 报错分析，再配合官方 /security-review、/debug、/loop 使用。' },
      ],
    },
    {
      title: 'MCP 工具链——打通你常用的那些工具',
      content: 'Claude 的工具接入协议。HTTP / stdio / SSE 三种 transport，Filesystem / GitHub / Browser 三个最值得先接的 MCP。',
      image: 'cover://lesson-08-mcp-toolchain',
      details: [
        'MCP 原理 + 官方/社区服务器列表',
        '`claude mcp add` / `/mcp` 配置方式 + 最值得先接入的 3 个',
      ],
      fullContent: [
        { subtitle: '1. MCP 是什么', text: 'MCP（Model Context Protocol）是开放协议，不等于“只能本地跑的插件”。当前优先记住三种 transport：HTTP 推荐用于远程服务，stdio 适合本地工具，SSE 还能用但已是过渡方案。' },
        { subtitle: '2. 最值得先接入的 3 个', text: 'Filesystem MCP 让 Claude 读写指定目录；GitHub MCP 直接完成 PR review 和 Issue 整理；Browser/Playwright MCP 让 Claude 打开网页、截图、提取内容。' },
        { subtitle: '3. 注意事项', text: '优先用 `claude mcp add` 和 `/mcp` 管理连接；权限要最小化；Access Token 妥善保管；远程服务优先 HTTP，本地工具再用 stdio。' },
      ],
    },
    {
      title: '上下文与记忆管理——不让 AI 越跑越忘事',
      content: '上下文窗口有限，压缩天然有损。四个主动管理技巧 + 上下文重置的四个信号。',
      image: 'cover://lesson-09-context-management',
      details: [
        '/clear + /compact + 分段交付模式',
        '上下文污染的四个信号和应对方法',
      ],
      fullContent: [
        { subtitle: '1. 为什么会被吃满', text: '每次读大文件、报错堆栈、测试输出都会迅速占用上下文。任务越长，早期信息越容易被压缩、摘要化。Claude Code 会自动整理上下文，但这个过程天然是有损的。' },
        { subtitle: '2. 四个管理技巧', text: '一个任务一个对话；重复 3 次以上的约束写进 CLAUDE.md；大任务切成多个里程碑用总结接续；用 /compact 主动压缩、/context 检查加载状态。' },
        { subtitle: '3. 重置信号', text: '它开始重复之前的分析、忘记你确认的约束、建议和之前矛盾、回复质量明显下降——出现这些情况就该 /clear。' },
      ],
    },
    // ===== 第五阶段：Agent 架构（专家级用法） =====
    {
      title: 'Subagents 与 Agent Teams——一个人指挥多个 AI 分工干活',
      content: 'Plan Mode / Subagents / Agent Teams 三种用法 + 主从、流水线、写作+质检三种架构。',
      image: 'cover://lesson-10-subagents-and-teams',
      details: [
        '什么时候需要多 Agent：判断标准',
        '三种架构 + 四阶段新手路径',
      ],
      fullContent: [
        { subtitle: '1. 判断标准', text: '不需要：任务线性、范围在一个目录内、还在熟悉阶段。适合：可拆成独立子任务并行处理、上下文装不下、需要质检员角色、有明确分工边界。' },
        { subtitle: '2. 三种架构', text: '主从——协调者拆分任务分发给执行者再汇总；流水线——任务在 Agent 间顺序流转；写作+质检——一个生成内容另一个专门检查。' },
        { subtitle: '3. 新手路径', text: '前两周用好单 Agent → 第三四周加 CLAUDE.md 和 skill → 第二个月接 MCP → 稳定后再引入 subagents 和 agent teams。不要跳级。' },
      ],
    },
    {
      title: '安全边界——危险能力怎么放权又不失控',
      content: '权限四层叠加 + CLAUDE.md 安全模板 + 黄金操作习惯。核心原则：不靠信任模型，靠最小化可恢复成本。',
      image: 'cover://lesson-11-security-boundaries',
      details: [
        '危险能力清单 + 四层权限控制体系',
        '安全边界模板 + 备份/diff/恢复习惯',
      ],
      fullContent: [
        { subtitle: '1. 危险能力清单', text: '删除文件（高）、git push（高）、写入生产数据库（高）、修改环境配置（高）、发送外部请求（中高）、安装依赖包（中）、批量重命名（中）。' },
        { subtitle: '2. 四层权限控制', text: '权限模式（default/plan/auto 等）→ allow/ask/deny 规则 → sandbox/worktree 隔离 → 你自己的 CLAUDE.md、rules、hooks。' },
        { subtitle: '3. 核心原则', text: '不靠信任模型，靠最小化可恢复成本。真正稳定的 AI 编程习惯，是确保每一步操作都可以回退。' },
      ],
    },
    {
      title: 'Hooks、Schedule 与 Auto Mode——让 Claude 在后台替你盯着事',
      content: '常用 Hook 事件 + `/schedule`、Desktop scheduled tasks、`/loop` 三种调度层 + Auto Mode。附四个可落地场景。',
      image: 'cover://lesson-12-hooks-schedule-auto',
      details: [
        'Hook 配置示例 + 三种调度方式的选择标准',
        '四个自动化场景 + 手动→自动四阶段路径',
      ],
      fullContent: [
        { subtitle: '1. Hooks', text: 'Hooks 是事件系统，不只是前后置回调。常用的有 SessionStart、UserPromptSubmit、PreToolUse、PostToolUse、Notification。命令型 Hook 的输入 JSON 通过 stdin 传给脚本。' },
        { subtitle: '2. Schedule', text: '现在要分三层：`/schedule` 是 Cloud scheduled tasks，Desktop scheduled tasks 跑在你机器上，`/loop` 只在当前 Claude Code 会话里循环。选哪种，取决于你是否需要本地文件、是否要跨重启保留。' },
        { subtitle: '3. 自动化路径', text: '先手动验证 → 做成 skill → 选择合适调度层（/loop、/schedule、Desktop）→ 低风险任务再试 auto mode。永远不要跳过手动验证阶段直接搞全自动化。' },
      ],
    },
    // ===== 第六阶段：真实场景实战（把所有能力串起来） =====
    {
      title: '实战案例 A——产品经理的需求文档生产线',
      content: '从原始资料到需求文档到研发对齐，四步工作流帮助你明显缩短需求文档产出周期。附 Project 结构和 Instructions 模板。',
      image: 'cover://lesson-13-case-product-manager',
      details: [
        'Cowork 工作区结构 + Project Instructions',
        '四步工作流 + 效率对比表',
      ],
      fullContent: [
        { subtitle: '1. 工作空间设计', text: '产品工作/ 下分原始资料、周会纪要、需求文档、模板四个目录。Cowork Project Instructions 里写清输出目录、参照模板、不修改原始资料。' },
        { subtitle: '2. 四步工作流', text: '第一步 Cowork 整理原始资料；第二步提炼高频问题、阻断问题、改进建议；第三步参照模板生成需求规划文档；第四步 CLI 辅助研发评估技术复杂度。' },
        { subtitle: '3. 效率对比', text: '在资料结构清晰、模板稳定的情况下，整理和成稿时间通常能明显缩短；但缩短幅度取决于资料质量、模板成熟度和团队协作方式。' },
      ],
    },
    {
      title: '实战案例 B——开发者的代码仓库维护流程',
      content: 'CLAUDE.md + security-review/doc/debt 三个 Commands，每周五下午跑一遍维护工作流。',
      image: 'cover://lesson-14-case-developer',
      details: [
        '开发者 CLAUDE.md 配置模板',
        '三个 Commands + 周度维护工作流',
      ],
      fullContent: [
        { subtitle: '1. CLAUDE.md 配置', text: '项目背景写清技术栈和质量保证方式；最重要的规则包括先读文件、超过 3 文件先给计划、不改 migrations、不改 package-lock；当前技术债务持续更新。' },
        { subtitle: '2. 命令套装', text: '/security-review 做安全导向审查重点关注 SQL 注入；/doc 为导出函数补全 JSDoc；/debt 读取技术债务列表给出本周优先清理建议。' },
        { subtitle: '3. 周度维护', text: '每周五下午：/debt 选出本周要处理的项 → 5 步执行法完成清理 → /doc 补充文档 → /security-review 最终自检 → 生成 commit 消息推代码。' },
      ],
    },
    {
      title: '实战案例 C——知识工作者的研究资料处理系统',
      content: '用 Cowork 搭一套可复用的研究系统：资料入库→批量摘要→生成周报→知识沉淀，三个月后知识库自己就是培训材料。',
      image: 'cover://lesson-15-case-researcher',
      details: [
        '文件结构 + Global Instructions 配置',
        '四阶段周工作流 + 三个月效果',
      ],
      fullContent: [
        { subtitle: '1. 文件结构', text: '市场研究/ 下分原始资料（按周归档）、简报（周报和专题）、模板、知识库四个目录。' },
        { subtitle: '2. 工作流', text: '每天随手把资料放进本周目录；周五上午批量摘要；基于摘要参照模板生成周报；最后提炼长期洞察追加到知识库。' },
        { subtitle: '3. 长期效果', text: '三个月后知识库积累了大量提炼过的行业洞察，每周周报质量越来越稳定，新员工接手时系统本身就是最好的培训材料。' },
      ],
    },
  ],
  cta: {
    text: '15 课跑完了？下一步看 AI 编程工具怎么选 → 探索 AI 编程实战',
    link: '/module/ai-programming',
  },
};
