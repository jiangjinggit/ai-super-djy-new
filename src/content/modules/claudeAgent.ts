import { FileText, Shield, Terminal, Zap } from 'lucide-react';

import type { BaseModuleContent } from '@/types/course';

export const claudeAgentModule: BaseModuleContent = {
  title: 'Claude 智能体实战',
  subtitle: '先分清 CLI 与 Cowork，再建立稳定执行流程',
  icon: Terminal,
  color: 'purple',
  description:
    '6 节课先分清 Claude Code CLI 和 Cowork 的边界，再掌握执行流程、上下文配置、命令系统、安全边界和多工具协作，建立一条稳定可复用的 Claude 工作路径。',
  keyTakeaways: [],
  sections: [
    {
      title: '入口与核心工作流',
      content: '先分清 CLI 和 Cowork 的入口差别，再跑通第一个真实任务和固定执行流程。',
      icon: Zap,
    },
    {
      title: '记忆与命令系统',
      content: 'CLAUDE.md、Cowork Projects / Instructions 固化上下文，slash commands 与子助手把高频动作标准化。',
      icon: FileText,
    },
    {
      title: '安全与协作',
      content: '设好 CLI 和 Cowork 的权限边界，再把它们与其他工具组合起来处理复杂场景。',
      icon: Shield,
    },
  ],
  lessons: [
    {
      title: 'Claude Code CLI 与 Cowork：安装、定位与快速上手',
      content: '先分清 CLI 和 Cowork 的适用场景，再各自跑通一个最小任务，避免一开始就选错入口。',
      image: 'cover://claude-code-install',
      details: [
        'Claude Code CLI vs Cowork：适用人群、交互方式、输出类型',
        'CLI 的安装与首次进入项目，Cowork 的 Desktop / Project / Folder 启动路径',
        '两个验证任务：代码项目扫描 vs 文档文件夹整理',
        '当前限制与排查入口：Cowork 需桌面端运行，CLI 更适合仓库任务',
      ],
      fullContent: [
        {
          subtitle: '1. 先选对入口：CLI vs Cowork',
          text: 'Claude Code CLI 适合开发者和终端用户：你要读仓库、改代码、跑命令、写 CLAUDE.md。Cowork 适合知识工作：你要处理文档、表格、演示文稿、研究资料和本地文件夹，而且不想打开终端。两者底层能力相近，但交互方式和最适合的任务完全不同。',
        },
        {
          subtitle: '2. 首次配置要点',
          text: 'CLI 的关键是登录、工作目录和权限边界；Cowork 的关键是桌面端、Project、文件夹权限、Global Instructions 和连接器。前者围绕仓库协作，后者围绕文件与工具空间协作。第一天就把默认作用域收紧，后面会省掉很多误操作。',
        },
        {
          subtitle: '3. 新手验证任务',
          text: 'CLI 的最小验证是“描述项目结构 + 找一个潜在问题，但先别改”；Cowork 的最小验证是“读取一个工作文件夹，整理要点并产出一份成品草稿”。这样你可以快速判断自己到底更需要哪条路径，而不是把 Cowork 当代码工具，或者把 CLI 当通用办公代理。',
        },
      ],
    },
    {
      title: 'Claude Code 工作流：5 步执行法',
      content: '正确的工作流让 Claude Code 一次通过率大幅提升。这 5 步应该成为默认习惯。',
      image: 'cover://claude-code-workflow',
      details: [
        '先读、出计划、执行、验证、总结',
        '可复制的任务描述模板',
        '“不做什么”清单的写法和常见禁止项',
        '跨文件 Bug 修复的完整案例',
      ],
      fullContent: [
        {
          subtitle: '1. 为什么需要固定流程',
          text: 'Claude Code 的问题往往不是能力不够，而是用户在任务一开始就给了过宽的自由度。固定流程的价值，就是把自由度锁在正确的位置。',
        },
        {
          subtitle: '2. 5 步执行法',
          text: '先读文件理解上下文，再给计划确定范围，然后执行修改，接着验证结果，最后输出总结和风险点。缺前两步，返工率通常会明显上升。',
        },
        {
          subtitle: '3. “不做什么”同样重要',
          text: '明确不重构、不引入依赖、不改接口协议、不动无关文件，往往比目标本身更能决定任务是否稳。',
        },
      ],
    },
    {
      title: 'CLAUDE.md 与 Cowork 上下文：项目级记忆与配置系统',
      content: 'CLI 用 CLAUDE.md 固化仓库上下文，Cowork 用 Projects、Context Files 和 Global Instructions 固化工作方式。',
      image: 'cover://claude-md-memory',
      details: [
        'CLAUDE.md 的标准结构，以及它与 Cowork Project / Instructions 的对应关系',
        '代码项目、文档项目、个人工作流三类模板',
        'CLI 的全局 / 项目 / 子目录层级，Cowork 的 Global / Project / Folder 上下文',
        '维护习惯：发现问题就更新，每月回顾',
      ],
      fullContent: [
        {
          subtitle: '1. 两套上下文系统分别解决什么',
          text: '在 Claude Code CLI 里，CLAUDE.md 是默认项目上下文；在 Cowork 里，Project、Context Files 和 Global Instructions 承担类似角色。前者更偏工程仓库，后者更偏文件空间和知识工作。你可以把它们理解成两种不同形态的“员工手册”。',
        },
        {
          subtitle: '2. 标准结构',
          text: 'CLI 场景里，背景、命令、目录、规范、禁止事项、当前上下文这六类信息已经足够。Cowork 场景里，则应该把“默认输出格式、工作角色、常用资料位置、删除前先确认”等偏工作方式的信息写进 Global 或 Project Instructions。',
        },
        {
          subtitle: '3. 分层加载',
          text: 'CLI 通常按全局、项目、子目录逐层收紧；Cowork 则按 Global Instructions、Project Instructions 和文件夹里的上下文资料逐层补充。理解了这层区别，你就不会把 CLAUDE.md 生搬硬套到 Cowork，或者把 Cowork 的工作习惯错误地塞回代码仓库。',
        },
      ],
    },
    {
      title: 'Slash Commands：自定义命令实战',
      content: '把高频操作做成 slash commands，能显著减少重复描述和错误启动方式。',
      image: 'cover://claude-slash-commands',
      details: [
        'Tools、slash commands、subagents 的职责区别',
        '内置命令速查',
        '5 个高频自定义命令范例',
        '从零写一个 /standup 命令',
      ],
      fullContent: [
        {
          subtitle: '1. 为什么 slash commands 值得学',
          text: '很多高频任务并不难，只是每次重新描述很耗时间。把这些动作收敛成命令，等于给团队建立了一层轻量 SOP。',
        },
        {
          subtitle: '2. 常见命令范例',
          text: '/commit、/review、/doc、/daily、/debug 这类命令都适合做成模板化入口，因为它们的输入来源和输出格式相对稳定。',
        },
        {
          subtitle: '3. 设计原则',
          text: '一个命令只做一件事，先写清数据来源，再写清输出格式和禁止事项，这样命令越多越不会互相污染。',
        },
      ],
    },
    {
      title: '安全边界：权限、审批与危险操作拦截',
      content: 'Claude Code 的强项之一是能执行命令，这也是最需要主动管理的风险来源。',
      image: 'cover://claude-security',
      details: [
        'Claude Code 的危险能力清单',
        '必须人工确认的 5 类操作',
        '在 CLAUDE.md 里写权限边界',
        'git diff、stash、恢复流程的日常习惯',
      ],
      fullContent: [
        {
          subtitle: '1. 危险能力不是坏事，失控才是',
          text: '删文件、装依赖、推代码、发请求，这些都是高价值能力。关键不是关闭它们，而是把触发条件和确认点写清楚。',
        },
        {
          subtitle: '2. 必须人工确认的操作',
          text: '写生产数据、向外发请求、安装依赖、删除非临时文件、执行 git push 等操作，都应该默认停在人工确认点上。',
        },
        {
          subtitle: '3. 黄金法则',
          text: '任务前做备份，任务后看 diff。真正稳定的 AI 编程习惯，不靠信任模型，而靠最小化可恢复成本。',
        },
      ],
    },
    {
      title: '多工具协作：CLI + Cowork + OpenClaw',
      content: 'Claude Code CLI、Cowork 各自擅长不同一段，复杂流程需要把它们和 OpenClaw、共享目录或外部自动化组合起来。',
      image: 'cover://claude-multi-agent',
      details: [
        'Claude Code CLI + Cowork + OpenClaw 的三段式分工',
        'Cowork 处理文档资料，CLI 处理仓库，OpenClaw 负责触发和推送',
        '主智能体 + 子智能体的任务拆分模式',
        '3 个可复现的协作场景与新手路径',
      ],
      fullContent: [
        {
          subtitle: '1. 单工具的边界',
          text: 'Claude Code CLI 擅长在当前工作目录内推进工程任务，Cowork 擅长围绕文件、连接器和浏览器处理知识工作，但它们都不天然负责长期监控和跨渠道触发。这就是组合式架构的起点。',
        },
        {
          subtitle: '2. 组合式协作思路',
          text: '比较稳的分工是：Cowork 先处理研究资料、表格、会议纪要和成品草稿；Claude Code CLI 接手本地仓库、脚本和自动化修订；OpenClaw 负责定时收集和结果推送；必要时再用子助手拆分更细的任务。这样每个工具都做自己最擅长的一段。',
        },
        {
          subtitle: '3. 新手路径',
          text: '先单独用好 Claude Code CLI 或 Cowork 中的一条，再补各自的上下文系统，然后才引入 slash commands、subagents、外部触发和多工具协作。不要在单工具都没跑稳的时候直接上多智能体。',
        },
      ],
    },
  ],
  cta: {
    text: '智能体工具都掌握了，去超级个体场景库找你的落地场景 →',
    link: '/module/scenarios',
  },
};
