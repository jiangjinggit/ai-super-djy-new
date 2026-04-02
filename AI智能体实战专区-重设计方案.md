# AI 智能体模块重设计方案

> 实施文档，供 Kiro 执行。原 `agents` 单模块拆分为 3 个独立模块。

---

## 一、整体结构变更

### 变更前

```
agents（1 个模块，4 节课）
```

### 变更后

```
agent-intro（AI 智能体入门，2 节课）
openclaw（OpenClaw 实战，5 节课）
claude-agent（Claude 智能体实战，6 节课）
```

---

## 二、受影响文件清单

### 需要修改的文件

| 文件 | 变更类型 | 说明 |
|------|----------|------|
| `src/types/course.ts` | 修改 | `MODULE_IDS` 数组：删除 `agents`，新增 3 个 ID |
| `src/content/modules/index.ts` | 修改 | 更新 import、`BASE_MODULES`、`MODULE_METADATA` |
| `src/content/moduleCatalog.ts` | 修改 | 更新 `NAV_LABELS` 和 `MODULE_CARDS` |
| `src/content/moduleEnhancements/index.ts` | 修改 | 更新 import 和 `MODULE_ENHANCEMENTS` |
| `src/constants/moduleStyles.ts` | 修改 | 新增 3 个模块的颜色映射，删除 `agents` |

### 需要新建的文件

| 文件 | 说明 |
|------|------|
| `src/content/modules/agentIntro.ts` | 新模块定义 |
| `src/content/modules/openclaw.ts` | 新模块定义 |
| `src/content/modules/claudeAgent.ts` | 新模块定义 |
| `src/content/moduleEnhancements/agentIntro.ts` | 新模块增强块 |
| `src/content/moduleEnhancements/openclaw.ts` | 新模块增强块 |
| `src/content/moduleEnhancements/claudeAgent.ts` | 新模块增强块 |
| `src/content/lessons/agent-intro/what-is-agent.md` | 课程正文 |
| `src/content/lessons/agent-intro/agent-task-fit.md` | 课程正文 |
| `src/content/lessons/openclaw/openclaw-intro.md` | 课程正文 |
| `src/content/lessons/openclaw/openclaw-deploy.md` | 课程正文 |
| `src/content/lessons/openclaw/openclaw-soul.md` | 课程正文 |
| `src/content/lessons/openclaw/openclaw-profile.md` | 课程正文 |
| `src/content/lessons/openclaw/openclaw-skills.md` | 课程正文 |
| `src/content/lessons/openclaw/openclaw-proactive.md` | 课程正文 |
| `src/content/lessons/openclaw/openclaw-grow.md` | 课程正文 |
| `src/content/lessons/claude-agent/claude-code-install.md` | 课程正文 |
| `src/content/lessons/claude-agent/claude-code-workflow.md` | 课程正文 |
| `src/content/lessons/claude-agent/claude-md-memory.md` | 课程正文 |
| `src/content/lessons/claude-agent/claude-slash-commands.md` | 课程正文 |
| `src/content/lessons/claude-agent/claude-security.md` | 课程正文 |
| `src/content/lessons/claude-agent/claude-multi-agent.md` | 课程正文 |

### 需要删除的文件

| 文件 | 说明 |
|------|------|
| `src/content/modules/agents.ts` | 旧模块定义，被 3 个新文件替代 |
| `src/content/moduleEnhancements/agents.ts` | 旧增强块，被 3 个新文件替代 |
| `src/content/lessons/agents/agent-basics.md` | 旧课程，被新课程替代 |
| `src/content/lessons/agents/openclaw-style.md` | 旧课程，被新课程替代 |
| `src/content/lessons/agents/claude-code-style.md` | 旧课程，被新课程替代 |
| `src/content/lessons/agents/automation-boundary.md` | 旧课程，被新课程替代 |
| `src/content/lessons/agents/`（目录） | 旧目录，清空后删除 |

---

## 三、逐文件修改内容

### 3.1 `src/types/course.ts`

将 `MODULE_IDS` 中的 `'agents'` 替换为 3 个新 ID：

```ts
// 变更前
export const MODULE_IDS = [
  'super-individual',
  'llm',
  'agents',        // ← 删除
  'scenarios',
  'cases',
  'growth',
] as const;

// 变更后
export const MODULE_IDS = [
  'super-individual',
  'llm',
  'agent-intro',   // ← 新增
  'openclaw',      // ← 新增
  'claude-agent',  // ← 新增
  'scenarios',
  'cases',
  'growth',
] as const;
```

---

### 3.2 `src/content/moduleCatalog.ts`

**NAV_LABELS**（删除 `agents`，新增 3 条）：

```ts
export const NAV_LABELS: Record<ModuleId, string> = {
  'super-individual': '入门',
  llm: '大模型',
  'agent-intro': '智能体入门',   // ← 新增
  openclaw: 'OpenClaw',          // ← 新增
  'claude-agent': 'Claude',      // ← 新增
  scenarios: '场景库',
  cases: '案例',
  growth: '成长',
};
```

**MODULE_CARDS**（删除 `agents` 卡片，新增 3 张卡片，插入在 `llm` 后面）：

```ts
// 删除原 agents 卡片（id: 'agents'）

// 新增以下 3 张，按顺序插入 llm 之后：
{
  id: 'agent-intro',
  title: 'AI 智能体入门',
  desc: '5 分钟建立对智能体的正确认知，用判断表评估哪类任务真正值得做成智能体。',
  icon: Cpu,
  color: 'emerald',
},
{
  id: 'openclaw',
  title: 'OpenClaw 实战',
  desc: '从安装到记忆管理全流程：Skills 体系、安全边界、权限配置，带你把 OpenClaw 真正跑通。',
  icon: Bot,        // lucide-react 中的 Bot 图标
  color: 'orange',
},
{
  id: 'claude-agent',
  title: 'Claude 智能体实战',
  desc: 'Claude Code 核心工作流、CLAUDE.md 记忆系统、slash commands 到多智能体协作，一套完整实战路径。',
  icon: Terminal,   // lucide-react 中的 Terminal 图标
  color: 'purple',
},
```

> 注：`Bot` 和 `Terminal` 图标需要从 `lucide-react` 引入。

---

### 3.3 `src/content/modules/agentIntro.ts`（新建）

```ts
import { Cpu, Lightbulb, ListChecks } from 'lucide-react';
import type { BaseModuleContent } from '@/types/course';

export const agentIntroModule: BaseModuleContent = {
  title: 'AI 智能体入门',
  subtitle: '先搞清楚什么是智能体，再谈用什么工具',
  icon: Cpu,
  color: 'emerald',
  description:
    '两节课建立对智能体的正确认知：什么叫真正的智能体、哪类任务真正值得做成智能体。这是后续实战课的基础。',
  keyTakeaways: [
    '用 4 个核心能力判断一个产品是不是真智能体',
    '用任务适配评分表评估任何任务该不该做成智能体',
    '知道 OpenClaw、Claude Code、Coze 各自适合什么场景',
  ],
  sections: [
    {
      title: '感知 · 规划 · 行动 · 记忆',
      content: '真正的智能体必须同时具备这 4 个能力，缺一不可。少任何一个，就只是个聊天框。',
      icon: Cpu,
    },
    {
      title: '任务适配判断',
      content: '不是所有任务都适合做成智能体。用 5 维评分表，5 分钟判断该不该做。',
      icon: ListChecks,
    },
    {
      title: '工具选型速查',
      content: '信息汇总多渠道选 OpenClaw，代码文档命令行选 Claude Code，快速搭建选 Coze。',
      icon: Lightbulb,
    },
  ],
  lessons: [
    {
      title: '什么是 AI 智能体：感知、规划、行动、记忆',
      content: '5 分钟建立正确认知。能感知、能规划、能行动、能记忆——缺一个都不算真智能体。',
      image: 'cover://what-is-agent',
      details: [
        '智能体的 4 个核心能力（缺一不可）',
        '智能体 vs 普通 AI 对话的核心区别对比表',
        '判断一个产品是不是真智能体的速查清单',
        '3 个最常见的误区拆解',
      ],
      fullContent: [
        {
          subtitle: '1. 智能体的 4 个核心能力',
          text: '感知：能读取外部环境（文件、网页、数据库、消息）。规划：能把大任务拆成步骤并决定执行顺序。行动：能调用工具改变世界（写文件、发消息、执行命令）。记忆：能记住任务进度，下次继续。缺任何一个，稳定性都会大打折扣。',
        },
        {
          subtitle: '2. 对比：智能体 vs 普通 AI 对话',
          text: '普通 AI 对话：你输入、它输出、结束。智能体：它读取环境、制定计划、调用工具、记录结果，然后持续推进任务。一个聊天框再聪明，也只是聊天框。',
        },
        {
          subtitle: '3. 常见误区',
          text: '误区1：把 ChatGPT 聊天当智能体用——没有工具调用、没有状态记录，不是。误区2：智能体=全自动，人不用管——当前阶段所有智能体都需要人工监督。误区3：现在的智能体很可靠——它们强但不稳定，必须设安全边界。',
        },
      ],
    },
    {
      title: '哪类任务真正值得用智能体：5 维评分表',
      content: '不是所有任务都适合。用这张评分表，5 分钟判断该不该做，避免把精力浪费在不适合的任务上。',
      image: 'cover://agent-task-fit',
      details: [
        '5 维任务适配评分表（可直接复制使用）',
        '最适合起手的 3 类任务（信息汇总 / 内容整理 / 代码辅助）',
        '新手阶段不要碰的 3 类任务',
        'OpenClaw / Claude Code / Coze 选型速查',
      ],
      fullContent: [
        {
          subtitle: '1. 任务适配 5 维评分表',
          text: '输入来源是否固定？完成标准是否能写成规则？任务频率是否够高（每周至少 3 次）？出错风险是否可控？现有工具链是否能支撑？——5 分强烈建议做，3-4 分先做半自动，1-2 分先手动。',
        },
        {
          subtitle: '2. 最适合起手的 3 类任务',
          text: '信息汇总类（日报、摘要、监控巡检）、内容整理类（素材归档、文档补全、格式转换）、代码辅助类（Bug 修复、测试补全、注释生成）。共同特点：输入固定、规则明确、出错可见、低风险。',
        },
        {
          subtitle: '3. 工具选型',
          text: '信息汇总 + 多渠道接入选 OpenClaw，代码/文档/命令行辅助选 Claude Code，快速搭建、新手入门选 Coze，需要深度定制选 Claude API。',
        },
      ],
    },
  ],
  cta: {
    text: '认知建好了，去 OpenClaw 实战专区把第一个工作台跑通 →',
    link: '/module/openclaw',
  },
};
```

---

### 3.4 `src/content/modules/openclaw.ts`（新建）

> **设计原则**：完全独立的原创课程，不依赖外部教程。差异化核心：三件套配置文件深度写作（2 节独立课）+ 独有的长期迭代课。场景库模块负责"用 OpenClaw 做什么"，本模块专注"怎么用好 OpenClaw"。

```ts
import { Bot, FileText, Wrench, Zap, Shield, RefreshCw } from 'lucide-react';
import type { BaseModuleContent } from '@/types/course';

export const openclawModule: BaseModuleContent = {
  title: 'OpenClaw 实战',
  subtitle: '从部署到深度配置，打造真正懂你的私人 AI 助手',
  icon: Bot,
  color: 'orange',
  description:
    '7 节课打造完全独立的 OpenClaw 学习路径：从选型判断到 10 分钟部署，从三件套配置文件深度写作到技能体系搭建，从心跳机制到长期迭代调优——每节课有可直接使用的模板和落地动作。',
  keyTakeaways: [
    '用 4 维选型表判断 OpenClaw 是否适合你，10 分钟完成服务器部署',
    '深度写好 SOUL.md / USER.md / AGENTS.md，让助手性格稳定、真正了解你',
    '建立记忆迭代机制，掌握助手调优方法，让它越用越懂你',
  ],
  sections: [
    {
      title: '选型与部署',
      content: '先判断 OpenClaw 适不适合你，再用 10 分钟把它跑起来。',
      icon: Zap,
    },
    {
      title: '三件套深度配置',
      content: 'SOUL.md / USER.md / AGENTS.md 写法比装好更重要——两节课深度拆解，拿到可直接使用的模板。',
      icon: FileText,
    },
    {
      title: '技能、心跳与长期运营',
      content: '装对技能、配好心跳、建立迭代机制——让助手持续为你工作，而不是用几天就放弃。',
      icon: Wrench,
    },
  ],
  lessons: [
    {
      title: 'OpenClaw 适不适合你：4 维选型判断',
      content: '先判断值不值得学，再决定要不要装。5 分钟搞清楚你的场景适不适合 OpenClaw，避免装好之后发现用不起来。',
      image: 'cover://openclaw-intro',
      details: [
        'OpenClaw 六大核心能力与"主动性"的本质解释',
        '4 维选型判断表（输入来源 / 触发频率 / 渠道需求 / 配置门槛）——4 个都是才强烈推荐',
        '最适合 OpenClaw 的 5 类场景 vs 不建议用的 3 类场景（附判断理由）',
        'OpenClaw vs Claude Code vs Coze：三工具定位速查，以及三者如何协作',
      ],
      fullContent: [
        {
          subtitle: '1. 核心区别：主动 vs. 被动',
          text: '聊天机器人：你问它答，用完就停。OpenClaw：你不开口它也在工作——定时检查邮件、监控日历、主动推送摘要。这个"主动性"是最核心的区别，也是学习成本的来源。如果你的场景不需要主动触发，OpenClaw 的复杂度可能不值得。',
        },
        {
          subtitle: '2. 4 维选型判断',
          text: '你的任务有固定的信息来源吗？任务需要在固定时间主动触发，而不是你开口才执行吗？你需要通过 Telegram 等即时通讯渠道获取推送吗？你能接受在服务器上折腾 30-60 分钟的初始配置吗？——4 个都是，强烈推荐。2 个以下，先考虑 Claude Code 或 Coze。',
        },
        {
          subtitle: '3. 三工具协作定位',
          text: '多渠道信息汇总 + 定时主动触发 + Telegram 推送 → OpenClaw。本地文件 + 代码辅助 + 命令行集成 → Claude Code。快速搭建 + 低代码 + 新手入门 → Coze。三者不互斥：OpenClaw 收集，Claude Code 处理，Coze 作为前端入口，可以通过共享目录协作。',
        },
      ],
    },
    {
      title: '10 分钟部署：从服务器到收到第一条消息',
      content: '非常具体的部署流程，目标只有一个：在 Telegram 里给 Bot 发消息，它回你。跟着做就能完成。',
      image: 'cover://openclaw-deploy',
      details: [
        '服务器选择：Ubuntu 22.04 LTS，2核4GB，约 $5/月，3 个推荐厂商及各自适用场景',
        '一键安装命令与安装向导每一步的选择建议（为什么选 Standard / 为什么选 Claude Sonnet）',
        'Telegram Bot 创建全流程：@BotFather 取名获 token → @userinfobot 获用户 ID',
        '2 个验证成功检查点 + 5 条最常见安装失败原因与解决方法',
      ],
      fullContent: [
        {
          subtitle: '1. 服务器准备',
          text: '推荐：Ubuntu 22.04 LTS，2核4GB，约 $5/月。厂商：Hetzner（欧洲用户首选，性价比最高）/ AWS Lightsail（国内访问稳定）/ 腾讯云轻量服务器（国内用户最简单）。不建议本地电脑——OpenClaw 需要 24/7 运行，本地电脑关机或休眠就断了。',
        },
        {
          subtitle: '2. 一键安装与向导',
          text: 'SSH 进入服务器后运行：curl -fsSL https://openclaw.ai/install.sh | bash。向导每一步：Standard 模式（功能完整，新手首选）→ Claude Sonnet（与 ClawdHub 技能系统配合最稳定）→ 粘贴 Telegram Bot Token → 粘贴管理员用户 ID → 安装守护进程（确保断线后自动重启）。全程 5-10 分钟。',
        },
        {
          subtitle: '3. 验证与第一条消息',
          text: '运行 openclaw gateway status，显示 RUNNING 说明部署成功。在 Telegram 给 Bot 发："你好，简单介绍一下你自己。"——收到回复就完成了。此时助手在用默认配置运行，下一步写三件套让它真正了解你。',
        },
      ],
    },
    {
      title: 'SOUL.md：助手的性格、边界与决策权限',
      content: 'SOUL.md 是三件套里最重要、也最容易写差的文件。这节课解决"怎么写才有约束力"——带注释模板 + 逐条对比。',
      image: 'cover://openclaw-soul',
      details: [
        'SOUL.md 四大核心模块拆解：性格定位 / 语气风格 / 决策权限分层 / 绝对禁止项',
        '好写法 vs 差写法逐条对比（具体可执行 vs 泛泛形容词，10 组真实示例）',
        '决策权限三档配置：自主执行 / 执行前告知 / 必须等待确认（含判断标准）',
        '绝对禁止项模板（7 条，涵盖数据安全 / 文件操作 / 外发请求，可直接复制）',
        '完整 SOUL.md 开箱即用模板（带逐行注释）',
      ],
      fullContent: [
        {
          subtitle: '1. 为什么 SOUL.md 最重要',
          text: 'USER.md 告诉它你是谁，AGENTS.md 告诉它怎么运营，SOUL.md 告诉它它是谁——这个"是谁"决定了在没有明确指令时它会怎么行动。没有 SOUL.md，助手每次都从"友好的 AI 助手"这个默认人格出发：行为不稳定、边界不清晰、出错时你不知道从哪里修。',
        },
        {
          subtitle: '2. 好写法 vs 差写法',
          text: '差写法："你是一个聪明、友好、高效的助手。"——这不是约束，任何 AI 都符合，写了等于没写。好写法："收到不确定的指令时，必须先向用户复述你的理解并等待确认，再行动。不允许推断用户意图自行决定。"——行为具体，偏差可检测，出问题能定位。',
        },
        {
          subtitle: '3. 决策权限分层',
          text: '三档权限必须明确写出，不能让助手自己判断风险等级。自主执行（低风险）：查邮件摘要、查日历、搜索信息。执行前告知（中风险）：发送消息、创建事件、修改文件。必须等待确认（高风险）：删除任何内容、向第三方发送数据、访问敏感文件。',
        },
      ],
    },
    {
      title: 'USER.md + AGENTS.md：让助手真正了解你',
      content: '两个文件解决两个问题：USER.md 让它不用你每次重复交代背景，AGENTS.md 让它知道在不同情境下该怎么行动。',
      image: 'cover://openclaw-profile',
      details: [
        'USER.md 完整模板（背景 / 当前项目 / 沟通偏好 / 工作习惯 / 不打扰时间段）带逐行注释',
        'USER.md 三类常见错误：信息太泛 / 信息过期没更新 / 沟通偏好没写',
        'AGENTS.md 核心四模块：记忆写入规则 / 通知优先级策略 / 安全边界 / 场景交互协议',
        '通知频控三层配置：立即推 / 合并摘要 / 静默过滤（每类场景的判断标准）',
        '三件套协作关系与优先级：冲突时谁覆盖谁',
      ],
      fullContent: [
        {
          subtitle: '1. USER.md 的核心价值与维护要点',
          text: '助手每次启动都读取 USER.md，相当于给它看了你的简历——背景、项目、偏好，一次写好，以后不用重复。但 USER.md 是静态文件，需要你主动维护。常见错误：半年前写了之后再没更新，助手一直参考的是过时信息。建议每个月花 10 分钟对一次。',
        },
        {
          subtitle: '2. AGENTS.md 的核心价值',
          text: 'AGENTS.md 解决"在具体情境下该怎么做"。三件套分工：SOUL.md 是底层（它是谁），USER.md 是档案（它要服务谁），AGENTS.md 是操作规程（在这个场景下怎么行动）。示例规则：工作时间有重要邮件立即推送 / 非工作时间只推紧急事项 / 每天早 8:00 发送早报 / 发现日历冲突主动提醒。',
        },
        {
          subtitle: '3. 三件套优先级',
          text: 'SOUL.md 优先级最高，绝对禁止项不可被覆盖。AGENTS.md 覆盖 USER.md 的默认设置（场景规则比档案偏好更具体）。USER.md 设定全局默认值。冲突时遵循：禁止项 > 场景规则 > 档案偏好 > 默认行为。这个优先级要在 AGENTS.md 里明确写出来。',
        },
      ],
    },
    {
      title: '技能系统：你真正需要的是这 5 个',
      content: '5400+ 技能，但 80% 的用户只需要其中 5 个。这节课告诉你装哪 5 个、怎么装、什么时候才考虑加第 6 个。',
      image: 'cover://openclaw-skills',
      details: [
        '5 个核心技能深度解析：remind-me / 邮件 / 日历 / Web Search / 浏览器自动化',
        '每个技能：安装命令 + OAuth 授权流程 + 测试验证方法 + 常见授权失败处理',
        '什么时候加第 6 个：3 个判断标准（使用频率 / 现有技能无法覆盖 / 风险可控）',
        'SKILL.md 自定义技能格式说明 + 天气技能完整示例（description 字段写法重点）',
        '技能过多的实际影响：响应延迟测试数据 + token 消耗变化 + 调用错误率',
      ],
      fullContent: [
        {
          subtitle: '1. 为什么只推荐 5 个',
          text: '每增加一个技能，助手每次调用时都要多考虑一个选项——技能越多，决策树越深，响应越慢、越容易选错工具。从 5 个增加到 15 个，平均响应时间增加约 40%，工具选错率从 3% 上升到 11%（社区测试数据）。推荐策略：先装 5 个稳定运行 2-4 周，再根据实际缺口评估扩展。',
        },
        {
          subtitle: '2. 5 个核心技能',
          text: 'remind-me（提醒，最常用，0 配置风险，装完即用）。邮件：Gmail 用 gog 技能，其他邮箱用 imap-email（需要填 IMAP 配置）。Google Calendar：gog 技能包含日历，与邮件共用同一个 OAuth 授权。Web Search：需要 Brave Search API Key（免费额度足够日常使用）。浏览器自动化（Playwright）：处理需要登录才能访问的网页，安装最复杂但功能最强。',
        },
        {
          subtitle: '3. 自定义技能写法重点',
          text: 'SKILL.md 里 description 字段是核心：写得越具体，助手越能准确判断什么时候用这个技能。差写法："获取天气信息"——可能和 Web Search 技能混淆。好写法："当用户询问特定城市的当前天气或未来 3 天预报时，调用 wttr.in API 获取数据，返回温度、天气状况、风速。"',
        },
      ],
    },
    {
      title: '让助手主动工作：心跳、定时任务与通知策略',
      content: '这节课是 OpenClaw 和普通 AI 工具最大的区别所在。配好心跳和通知策略，它才真正开始 24/7 主动为你工作，而不是刷屏打扰你。',
      image: 'cover://openclaw-proactive',
      details: [
        '心跳机制工作原理与配置（heartbeat_tasks 字段 + 推送条件写法）',
        'Cron 表达式速查 + 3 个即装即用模板（早报 / 周报 / 定时监控）',
        '通知频控三层策略：立即推 / 合并摘要 / 静默过滤（含各类场景的推荐归属）',
        '常见误区：心跳检查项过多导致每 30 分钟刷屏的修复方法',
        '3 类用户画像的心跳清单模板（效率型 / 内容型 / 开发者型）',
      ],
      fullContent: [
        {
          subtitle: '1. 心跳机制配置重点',
          text: '心跳配置的最大误区：写"检查邮件"而不是"检查邮件，如果有来自 XXX 的邮件或主题包含「紧急」的邮件立即推送，其他的合并到早报"。推送条件越具体，噪音越少，助手越有价值。模糊的检查条件导致每次心跳都触发推送，一天刷几十条消息，很快就会关掉通知。',
        },
        {
          subtitle: '2. Cron 定时任务',
          text: '心跳负责实时监控，Cron 负责定时汇报，两者共存。3 个即装即用模板：0 8 * * *（每天早 8:00 早报，汇总昨晚至今的邮件+日历+监控结果）/ 0 9 * * 1（每周一 9:00 周报）/ 0 */4 * * *（每 4 小时状态检查，只在有异常时推送）。配置位置：AGENTS.md 的 scheduled_tasks 字段。',
        },
        {
          subtitle: '3. 通知频控策略',
          text: '每天超过 5 条推送就会产生消息疲劳，用户开始无视。分层：立即推（日历冲突、特定发件人邮件、系统告警）/ 合并摘要（例行信息并入早报或晚报）/ 静默过滤（低优先级信息只写入每日笔记，不推送）。每类信息归属哪一层，在 AGENTS.md 里逐条配置。',
        },
      ],
    },
    {
      title: '越用越懂你：记忆迭代与助手调优',
      content: '大多数教程在"装好"就结束了。这节课解决真正的难题：用了一段时间后助手开始犯错、变慢、重复问你已经说过的事——怎么系统性地修好。',
      image: 'cover://openclaw-grow',
      details: [
        '三层记忆系统写入时机：每日笔记 / MEMORY.md / 三件套——什么情况下该更新哪一层',
        '助手"变笨"的 4 类症状与逐一排查流程（行为退化 / 记忆失效 / 技能报错 / 响应变慢）',
        '三件套迭代节奏：第 1 周 / 第 1 个月 / 第 3 个月的更新重点',
        '月度回顾 checklist（哪些配置需要更新，哪些技能可以卸载）',
        '进阶：多设备节点系统（让助手访问手机摄像头、电脑截图）',
      ],
      fullContent: [
        {
          subtitle: '1. 三层记忆写入时机',
          text: '每日笔记（YYYY-MM-DD.md）：记录当天事件，任务后自动写入，短周期、高频变动的信息放这里。MEMORY.md：跨天的长期模式和新偏好，需要手动更新，发现"它又犯了上次的错"时就该写。SOUL.md/USER.md：配置层，只在行为模式出问题（不是偶尔出错）时才修改。误区：把所有东西都写进 USER.md，文件越来越长，助手读取效率下降，反而变笨。',
        },
        {
          subtitle: '2. 助手"变笨"的 4 类排查',
          text: '症状1：开始犯以前不犯的错 → 检查 SOUL.md，是否新增了冲突的规则。症状2：不记得之前说过的事 → 检查每日笔记是否正常写入，看 MEMORY.md 是否过期。症状3：技能调用频繁报错 → 检查对应技能的 OAuth token 是否过期（token.json），重新授权。症状4：回复越来越慢 → 数技能数量，超过 10 个就考虑卸载不常用的，检查心跳检查项是否过多。',
        },
        {
          subtitle: '3. 三件套迭代节奏',
          text: '第 1 周：写好基础版，各文件控制在 30 行以内，不追求完整，优先跑通。第 1 个月：每次发现助手行为和预期不符，立即更新对应文件并记录原因，积累 10-20 条调整记录。第 3 个月：整体回顾，删除过时内容，把反复验证有效的规则固化到 SOUL.md，精简 USER.md，AGENTS.md 场景覆盖趋于稳定。',
        },
      ],
    },
  ],
  cta: {
    text: 'OpenClaw 配置好了，去场景库找你的第一个落地场景 →',
    link: '/module/scenarios',
  },
};
```

---

### 3.5 `src/content/modules/claudeAgent.ts`（新建）

```ts
import { Terminal, FileText, Shield, Layers, GitBranch, Zap } from 'lucide-react';
import type { BaseModuleContent } from '@/types/course';

export const claudeAgentModule: BaseModuleContent = {
  title: 'Claude 智能体实战',
  subtitle: 'Claude Code 从上手到协作，一套完整实战路径',
  icon: Terminal,
  color: 'purple',
  description:
    '6 节课覆盖 Claude 智能体全流程：安装上手、5 步工作流、CLAUDE.md 记忆系统、slash commands、安全边界、多智能体协作。',
  keyTakeaways: [
    '用 5 步执行法让 Claude Code 一次通过率翻倍',
    '用 CLAUDE.md 把项目背景、规范和禁止事项固化，不用每次重新说',
    '把 Claude Code、Claude API 和 OpenClaw 组合起来处理复杂任务',
  ],
  sections: [
    {
      title: '安装与核心工作流',
      content: '30 分钟装好，用 5 步执行法跑通第一个真实任务。',
      icon: Zap,
    },
    {
      title: '记忆与命令系统',
      content: 'CLAUDE.md 固化项目上下文，slash commands 把高频操作变成一键触发。',
      icon: FileText,
    },
    {
      title: '安全与协作',
      content: '设好权限边界，再把 Claude Code 和其他工具组合起来处理复杂场景。',
      icon: Shield,
    },
  ],
  lessons: [
    {
      title: 'Claude Code 安装与快速上手',
      content: '5 分钟装好，30 分钟跑通第一个真实任务。比你想象的简单。',
      image: 'cover://claude-code-install',
      details: [
        'Claude Code 安装步骤（Mac / Windows / Linux）',
        '首次配置要点（API Key、工作目录、用量上限）',
        '验证安装成功的 2 个测试任务',
        '订阅和计费说明',
        '常见安装问题速查（Node 版本 / API Key / 网络问题）',
      ],
      fullContent: [
        {
          subtitle: '1. 安装',
          text: '前提：Node.js 18+。安装命令：npm install -g @anthropic-ai/claude-code。验证：claude --version。首次配置：claude config，填入 API Key 和基础设置。',
        },
        {
          subtitle: '2. 第一次启动',
          text: '进入项目目录 → 运行 claude → 它会扫描目录结构并读取 CLAUDE.md（如果有）→ 进入交互模式。验证任务1：让它描述当前目录结构。验证任务2：让它找出代码里的一个潜在问题。',
        },
        {
          subtitle: '3. 计费与用量',
          text: '需要 Anthropic API Key 或 Claude Pro 订阅，按 token 计费。建议在账户设置里配置月度用量上限，避免意外超额。',
        },
      ],
    },
    {
      title: 'Claude Code 核心工作流：5 步执行法',
      content: '正确的工作流让 Claude Code 一次通过率翻倍。这 5 步背下来，以后每个任务都用这个流程。',
      image: 'cover://claude-code-workflow',
      details: [
        '5 步执行流程（先读 → 出计划 → 执行 → 验证 → 总结）',
        '可直接复制的任务描述模板（含"不做什么"部分）',
        '"不做什么"清单的标准写法和 4 类常用禁止项',
        '完整实战案例：修复一个跨文件 Bug 的全程对话',
      ],
      fullContent: [
        {
          subtitle: '1. 5 步执行流程',
          text: 'Step 1 先读：让它阅读相关文件，总结现状，不要一上来就让它改。Step 2 出计划：让它列出要改哪些文件、改什么、为什么，你确认后再继续。Step 3 执行：按计划修改。Step 4 验证：跑测试、类型检查或编译，确认没引入新问题。Step 5 总结：输出变更说明和风险点。',
        },
        {
          subtitle: '2. 任务描述模板',
          text: '包含：任务（一句话）、背景（相关上下文）、范围（允许/不允许修改的文件）、不做什么（明确禁止项）、验收标准（可执行的验证步骤）、执行要求（先读再改，先计划后执行）。',
        },
        {
          subtitle: '3. "不做什么"的重要性',
          text: 'Claude Code 倾向于"顺便"优化它认为不好的地方。不写"不做什么"，它会做很多你没要求的事。常用禁止项：不重构整个模块 / 不引入新依赖 / 不改接口协议 / 不改代码风格。',
        },
      ],
    },
    {
      title: 'CLAUDE.md：项目级记忆与配置系统',
      content: 'CLAUDE.md 是 Claude Code 的"员工手册"。把它写好，等于你只需要说一次，它就记住了。',
      image: 'cover://claude-md-memory',
      details: [
        'CLAUDE.md 的标准结构和每个字段的用途',
        '3 类项目的模板（代码项目 / 文档项目 / 个人工作流）',
        '全局 CLAUDE.md vs 项目 CLAUDE.md vs 子目录 CLAUDE.md 的加载顺序',
        'CLAUDE.md 的维护习惯（发现问题就更新，每月回顾）',
      ],
      fullContent: [
        {
          subtitle: '1. CLAUDE.md 是什么',
          text: '放在项目根目录（或 ~/.claude/）的 Markdown 文件，Claude Code 每次启动都会自动读取。类比：就像员工入职拿到的手册，告诉它这个项目是什么、怎么工作、不能做什么。',
        },
        {
          subtitle: '2. 标准结构',
          text: '项目背景（一段话）、常用命令（直接能复制运行）、架构说明（重要目录和文件用途）、开发规范（风格、命名、注释要求）、禁止事项（越具体越好）、当前任务上下文（经常更新）。',
        },
        {
          subtitle: '3. 分层加载',
          text: '全局配置（~/.claude/CLAUDE.md）适用于所有项目。项目配置（项目根目录）覆盖全局。子目录配置（特定模块目录）覆盖项目配置。后加载的覆盖先加载的。',
        },
      ],
    },
    {
      title: 'Skills 与自定义命令：slash commands 实战',
      content: '自定义 slash commands 是 Claude Code 最被低估的功能。一个 /commit 命令能省掉每次写 git 提交信息的时间。',
      image: 'cover://claude-slash-commands',
      details: [
        '系统内置 slash commands 速查（/help / /clear / /compact / /memory 等）',
        '5 个开箱即用的自定义命令（/commit / /review / /doc / /daily / /debug）',
        '跟着做：写第一个自定义命令 /standup（每日站会汇报）',
        'Slash command 设计原则',
      ],
      fullContent: [
        {
          subtitle: '1. Slash Commands 是什么',
          text: '保存在 ~/.claude/skills/ 目录的 Markdown 文件，用 /命令名 触发。本质上是一段预设的指令模板 + 执行逻辑。写一次，以后每次用只需要一个命令。',
        },
        {
          subtitle: '2. 5 个开箱即用的命令',
          text: '/commit：查看 git diff，生成标准化提交信息，确认后执行。/review：读取文件或暂存区，列出问题和改进建议。/doc：读取代码，生成 API 文档或使用说明。/daily：读取 git log + 改动，生成今日工作摘要。/debug：分析错误，找根因，提出修复方向（不直接改代码）。',
        },
        {
          subtitle: '3. 设计原则',
          text: '一个命令只做一件事。先描述数据来源，再描述输出格式。加"不做什么"（比如：只生成建议，不直接修改代码）。加语言和风格要求（避免它用英文输出）。',
        },
      ],
    },
    {
      title: '安全边界：权限、审批与危险操作拦截',
      content: 'Claude Code 能执行 shell 命令，这是它最强大也最危险的能力。用好这一节，让它的能力在你的掌控之内。',
      image: 'cover://claude-security',
      details: [
        'Claude Code 能做哪些"危险"操作（删文件 / 推代码 / 安装包 / 发网络请求）',
        '必须永远人工确认的 5 类操作',
        '在 CLAUDE.md 里配置权限边界的写法',
        '意外操作的恢复方法（git checkout / git stash / git reset）',
        '黄金法则：每次任务结束先 git diff 再 commit',
      ],
      fullContent: [
        {
          subtitle: '1. 危险操作类型',
          text: 'Claude Code 可以执行：删除文件（rm）、修改系统配置、安装软件包、推送代码（git push）、发送网络请求。这些能力都需要在 CLAUDE.md 里明确设定边界。',
        },
        {
          subtitle: '2. 必须人工确认的 5 类操作',
          text: 'git push / git push --force（推代码）、rm 非临时文件（删文件）、安装新的 npm/pip 包（装依赖）、修改含密钥的文件（.env 等）、向外部 API 发送 POST 请求（外发数据）。在 CLAUDE.md 里明确写出，Claude Code 会遵守。',
        },
        {
          subtitle: '3. 意外操作恢复',
          text: '改了不该改的文件：git checkout <文件名>。改了一堆文件：git stash。删了文件（还没 commit）：git checkout HEAD~1 <文件名>。最好的保护：每次重要任务前先 git add + git stash 备份。',
        },
      ],
    },
    {
      title: 'Claude 多场景协作：Code + API + 多智能体',
      content: 'Claude Code 是单兵作战的高手。把它和 Claude API、OpenClaw 结合起来，才能处理真正复杂的任务。',
      image: 'cover://claude-multi-agent',
      details: [
        'Claude Code + Claude API 的 2 个组合场景',
        'Claude Code + OpenClaw 的协作方式（共享目录 + 触发机制）',
        '多智能体架构：主智能体 + 子智能体模式',
        '3 个可复现的协作场景（代码质量检查 / 每日摘要 / 文档同步）',
        '新手入门路径：5 个阶段，从单工具到多智能体协作',
      ],
      fullContent: [
        {
          subtitle: '1. Claude Code + Claude API 组合',
          text: '场景1：Claude Code 写代码，Claude API 做审查，审查结果反馈给 Claude Code 修正。场景2：Claude Code 执行任务，Claude API 把执行记录整理成报告。实现方式：Shell 脚本 + Claude API 调用。',
        },
        {
          subtitle: '2. Claude Code + OpenClaw 协作',
          text: 'OpenClaw 负责：多渠道信息收集、定时触发、对外推送。Claude Code 负责：本地文件处理、代码任务、复杂分析。协作方式：OpenClaw 把收集结果保存到共享目录，Claude Code 读取处理，OpenClaw 推送结果。',
        },
        {
          subtitle: '3. 新手入门路径',
          text: '阶段1：Claude Code 单独用好。阶段2：OpenClaw 单独用好。阶段3：共享目录 + 手动触发的简单组合。阶段4：接入自动化触发（Git hook / 定时任务）。阶段5：探索多智能体协作（Claude API tool_use）。不要跳步骤。',
        },
      ],
    },
  ],
  cta: {
    text: '智能体工具都掌握了，去超级个体场景库找你的落地场景 →',
    link: '/module/scenarios',
  },
};
```

---

### 3.6 `src/content/modules/index.ts`

需要修改的部分：

```ts
// 删除
import { agentsModule } from './agents';

// 新增
import { agentIntroModule } from './agentIntro';
import { openclawModule } from './openclaw';
import { claudeAgentModule } from './claudeAgent';

// BASE_MODULES 修改
// 删除：agents: agentsModule,
// 新增：
'agent-intro': agentIntroModule,
openclaw: openclawModule,
'claude-agent': claudeAgentModule,

// MODULE_METADATA 删除 agents，新增以下 3 条：
'agent-intro': {
  estimatedTime: '30 分钟',
  difficulty: 'beginner',
  audience: ['刚开始了解智能体的用户', '想系统建立认知框架的从业者'],
  tags: ['智能体入门', '认知框架', '工具选型'],
  prerequisites: ['了解基础的 AI 对话工具使用'],
},
openclaw: {
  estimatedTime: '2-3 周',
  difficulty: 'intermediate',
  audience: ['需要多渠道信息自动化的用户', '想搭建 24/7 运行私人 AI 助手的用户'],
  tags: ['OpenClaw', 'SOUL.md', 'ClawdHub', '心跳机制', '记忆迭代'],
  prerequisites: ['完成 AI 智能体入门模块', '有基础的命令行操作经验'],
},
'claude-agent': {
  estimatedTime: '1-2 周',
  difficulty: 'intermediate',
  audience: ['开发者', '需要代码文档命令行协作的用户'],
  tags: ['Claude Code', 'CLAUDE.md', 'slash commands', '多智能体'],
  prerequisites: ['完成 AI 智能体入门模块'],
},

// lessonEstimatedTime 函数：新增 3 个模块的时间配置
if (moduleId === 'agent-intro') return '15-20 分钟';
if (moduleId === 'openclaw') return '25-35 分钟';
if (moduleId === 'claude-agent') return '25-35 分钟';

// MODULE_CONTENT 修改
// 删除：agents: enrichModule('agents', BASE_MODULES.agents),
// 新增：
'agent-intro': enrichModule('agent-intro', BASE_MODULES['agent-intro']),
openclaw: enrichModule('openclaw', BASE_MODULES.openclaw),
'claude-agent': enrichModule('claude-agent', BASE_MODULES['claude-agent']),
```

---

### 3.7 `src/content/moduleEnhancements/agentIntro.ts`（新建）

```ts
import type { ModuleEnhancement } from '@/types/course';

export const agentIntroEnhancement: ModuleEnhancement = {
  lastVerifiedOn: '2026-04-02',
  sources: [],
  blocks: [
    {
      type: 'checklist',
      title: '智能体认知自检',
      description: '用这份清单确认你已经建立了正确的认知基础，再去学工具。',
      items: [
        { title: '4 个核心能力', detail: '能说出感知、规划、行动、记忆各自的含义，以及缺少哪个会有什么问题。' },
        { title: '与普通对话的区别', detail: '能解释为什么"每天用 ChatGPT 聊天"不等于在用智能体。' },
        { title: '任务适配判断', detail: '能用 5 维评分表评估一个任务该不该做成智能体。' },
        { title: '工具选型', detail: '遇到新任务，能在 30 秒内说出该用 OpenClaw 还是 Claude Code 还是 Coze。' },
      ],
    },
  ],
};
```

---

### 3.8 `src/content/moduleEnhancements/openclaw.ts`（新建）

```ts
import type { ModuleEnhancement } from '@/types/course';

export const openclawEnhancement: ModuleEnhancement = {
  lastVerifiedOn: '2026-04-02',
  sources: [
    {
      label: 'OpenClaw 101 官方中文教程',
      url: 'https://openclaw101.dev/zh',
    },
  ],
  blocks: [
    {
      type: 'checklist',
      title: 'OpenClaw 部署完成检查清单',
      description: '完成部署后逐项确认，再开始日常配置和使用。',
      items: [
        { title: '服务器部署成功', detail: 'openclaw gateway status 显示 RUNNING，Telegram Bot 可收发消息。' },
        { title: '灵魂三件套已配置', detail: 'SOUL.md 写明性格和禁止项，USER.md 填入背景和偏好，AGENTS.md 配置安全边界。' },
        { title: '核心技能已安装', detail: 'remind-me、邮件技能（Gmail 或 imap-email）、Web Search 至少各装好一个，OAuth 授权已通过。' },
        { title: '心跳或定时任务在运行', detail: '至少一个主动任务（心跳检查或 Cron 早报）已配置并在运行，收到过第一条主动推送消息。' },
        { title: '记忆系统已启用', detail: '每日笔记目录已创建，MEMORY.md 已初始化，助手可以自动写入记忆。' },
        { title: '安全配置到位', detail: 'SSH 密钥认证已启用，API Key 权限已最小化，SOUL.md 已写明绝对禁止项。' },
      ],
    },
  ],
};
```

---

### 3.9 `src/content/moduleEnhancements/claudeAgent.ts`（新建）

```ts
import type { ModuleEnhancement } from '@/types/course';

export const claudeAgentEnhancement: ModuleEnhancement = {
  lastVerifiedOn: '2026-04-02',
  sources: [],
  blocks: [
    {
      type: 'security-checklist',
      title: 'Claude Code 安全配置清单',
      description: '每次启动重要任务前，确认这些边界已经设好。',
      items: [
        { title: 'CLAUDE.md 已配置', detail: '项目的常用命令、架构说明、禁止事项都写进了 CLAUDE.md。' },
        { title: '禁止事项明确', detail: 'CLAUDE.md 里的禁止事项包含：不允许的文件操作、不允许引入的依赖、不允许的外发操作。' },
        { title: 'git push 需确认', detail: 'CLAUDE.md 里明确写了 git push 必须展示命令等人工确认。' },
        { title: '任务前备份', detail: '重要任务开始前已执行 git add + git stash 备份。' },
        { title: '任务后 diff', detail: '每次任务结束后先 git diff 检查所有改动，确认无意外修改再 commit。' },
        { title: '用量上限', detail: '账户已设置月度 token 用量上限，避免意外超额。' },
      ],
    },
  ],
};
```

---

### 3.10 `src/content/moduleEnhancements/index.ts`

```ts
// 删除
import { agentsEnhancement } from './agents';

// 新增
import { agentIntroEnhancement } from './agentIntro';
import { openclawEnhancement } from './openclaw';
import { claudeAgentEnhancement } from './claudeAgent';

// BASE_ENHANCEMENTS 修改
// 删除：agents: agentsEnhancement,
// 新增：
'agent-intro': agentIntroEnhancement,
openclaw: openclawEnhancement,
'claude-agent': claudeAgentEnhancement,

// MODULE_ENHANCEMENTS 同步修改
// 删除：agents: hydrateEnhancement(BASE_ENHANCEMENTS.agents),
// 新增：
'agent-intro': hydrateEnhancement(BASE_ENHANCEMENTS['agent-intro']),
openclaw: hydrateEnhancement(BASE_ENHANCEMENTS.openclaw),
'claude-agent': hydrateEnhancement(BASE_ENHANCEMENTS['claude-agent']),
```

---

### 3.11 `src/constants/moduleStyles.ts`

需要查看此文件的当前内容后修改，大致改动：
- 删除 `agents` 的颜色映射
- 新增 `agent-intro`（emerald）、`openclaw`（orange）、`claude-agent`（purple）的映射

---

## 四、课程正文文件（13 个 .md 文件）

按以下路径创建 Markdown 文件，正文内容参照**第五节**的每节课大纲展开写作：

```
src/content/lessons/agent-intro/what-is-agent.md
src/content/lessons/agent-intro/agent-task-fit.md

src/content/lessons/openclaw/openclaw-intro.md
src/content/lessons/openclaw/openclaw-deploy.md
src/content/lessons/openclaw/openclaw-soul.md
src/content/lessons/openclaw/openclaw-profile.md
src/content/lessons/openclaw/openclaw-skills.md
src/content/lessons/openclaw/openclaw-proactive.md
src/content/lessons/openclaw/openclaw-grow.md

src/content/lessons/claude-agent/claude-code-install.md
src/content/lessons/claude-agent/claude-code-workflow.md
src/content/lessons/claude-agent/claude-md-memory.md
src/content/lessons/claude-agent/claude-slash-commands.md
src/content/lessons/claude-agent/claude-security.md
src/content/lessons/claude-agent/claude-multi-agent.md
```

每个课程文件的写作规范（参照现有 `agent-basics.md` 的格式）：

```markdown
## 这节课你要拿到什么
- [3-4 条具体交付物，可截图或复制使用的]

## [第一个主要章节]
[正文内容]

## 跟着做：[具体操作]（⏱ X 分钟）
[步骤说明]

## 📋 案例：[人名]的故事
[真实场景对比表格]

## 常见翻车
### 翻车 1：[标题]
❌ 错误做法：
为什么错：
✅ 正确做法：

## ✅ 自检清单
- [ ] ...

## 🎯 本课落地动作
1. ...
2. ...
3. ...

> 🔗 [下一节课的引导语] →
```

---

## 五、每节课内容大纲（供写作参考）

### agent-intro / what-is-agent.md

```
章节1：从一个真实问题出发
  - "我每天都在用 ChatGPT，那我在用智能体吗？"（大多数情况下，不是）

章节2：智能体的 4 个核心能力
  - 感知：能读取外部环境
  - 规划：能拆步骤、决定执行顺序
  - 行动：能调用工具改变世界
  - 记忆：能记住任务进度、下次继续

章节3：对比表（智能体 vs 普通 AI 对话）
  - 维度：输入来源 / 工具调用 / 任务延续 / 出错处理 / 适合场景

章节4：3 个误区拆解
  - 误区1：把聊天框当智能体
  - 误区2：智能体 = 全自动
  - 误区3：现在的智能体很可靠

章节5：速查卡（判断是不是真智能体的 4 个问题）

落地动作：用判断清单评估你现在在用的 2 个 AI 工具
```

### agent-intro / agent-task-fit.md

```
章节1：为什么要先判断任务适配性

章节2：5 维评分表（完整表格，可直接复制）
  - 输入来源是否固定？
  - 完成标准是否能写成规则？
  - 任务频率是否够高？
  - 出错风险是否可控？
  - 现有工具链是否支撑？
  评分解读说明

章节3：最适合起手的 3 类任务（表格：任务类型 / 为什么适合 / 推荐工具）

章节4：新手阶段不要碰的 3 类任务（表格：任务类型 / 为什么不适合）

章节5：工具选型速查（OpenClaw / Claude Code / Coze / Claude API 各自适合什么）

落地动作：把手头最想自动化的 3 件事用评分表打分，选出分数最高的 1 件
```

### openclaw / openclaw-intro.md

> 对应第 1 节课："OpenClaw 适不适合你：4 维选型判断"
> **差异化**：以选型判断开篇，而不是功能介绍——帮用户先决定值不值得学

```
章节1：一个真实的反面案例
  - 某用户花了 2 小时装好 OpenClaw，用了 3 天就放弃了——为什么
  - "装好 ≠ 用起来"，用起来需要先判断场景适不适合

章节2：OpenClaw 的本质是什么
  - 核心特征：主动性（它找你，不是你找它）
  - 六大能力速览（多渠道通信 / 工具执行 / 技能系统 / 记忆管理 / 心跳机制 / 本地部署）
  - 类比：OpenClaw 是 24/7 在线的员工，ChatGPT 是你随时可以问的顾问——两种不同的关系

章节3：4 维选型判断表（可直接复制使用）
  - 维度1：你的信息来源是固定的吗？（邮件/日历/特定网站 vs 临时性查询）
  - 维度2：你需要定时主动触发，而不是你开口才执行吗？
  - 维度3：你需要通过 Telegram 等即时通讯渠道获取推送吗？
  - 维度4：你能接受 30-60 分钟的初始配置折腾吗？
  - 评分：4个都是 → 强烈推荐。3个 → 推荐。2个以下 → 先考虑 Claude Code 或 Coze

章节4：最适合 vs 不适合的场景对比表
  - 适合（5类）：邮件自动摘要 / 日历冲突提醒 / 内容监控 / 定时汇报 / 多渠道信息聚合
  - 不适合（3类）：一次性分析任务 / 需要复杂代码执行 / 对话式探索性任务

章节5：三工具协作定位速查
  - OpenClaw vs Claude Code vs Coze：各自适合什么，以及三者如何协作

落地动作：用 4 维判断表评估你最想自动化的 1 件事，得出结论：值得学，继续；不值得，去 Claude Code 模块
```

### openclaw / openclaw-deploy.md

> 对应第 2 节课："10 分钟部署：从服务器到收到第一条消息"
> **差异化**：极度具体，每一步都说明"选什么"和"为什么这么选"

```
章节1：为什么必须用服务器
  - 24/7 运行的硬性需求：本地电脑睡眠 = 助手离线
  - $5/月 vs 每天节省的时间：成本计算

章节2：服务器选择（3 个厂商，各有适用场景）
  - Hetzner：欧洲节点，性价比最高，国内访问延迟约 200ms（可接受）
  - AWS Lightsail：国内访问最稳定，但价格略高
  - 腾讯云轻量：国内用户最简单，支付宝付款，中文界面
  - 规格统一推荐：Ubuntu 22.04 LTS，2核4GB，约 $5/月
  - SSH 登录方式（Mac/Windows 各一种）

章节3：一键安装（⏱ 5-10 分钟）
  - 命令：curl -fsSL https://openclaw.ai/install.sh | bash
  - 向导每一步的选择 + 原因：
    · Standard 模式：功能完整，新手首选，不要选 Minimal
    · Claude Sonnet：与 ClawdHub 技能系统配合最稳定（不选 GPT 的原因：函数调用准确率差异）
    · Token 和用户 ID 从哪里拿（下一章节）
    · 守护进程：必须安装，否则服务器重启后 OpenClaw 不会自动恢复

章节4：Telegram Bot 创建（⏱ 3 分钟，跟着做）
  - 步骤1：搜索 @BotFather → /newbot → 取名（建议：「你的名字+助手」）→ 获取 token
  - 步骤2：搜索 @userinfobot → 发任意消息 → 获取你的用户 ID（纯数字）
  - 注意：token 不要截图发给别人，它相当于 Bot 的密码

章节5：验证 + 第一条消息
  - 验证命令：openclaw gateway status → 看到 RUNNING
  - 在 Telegram 给 Bot 发："你好，简单介绍一下你自己。"
  - 收到回复 = 部署成功，进入下一节写三件套

章节6：5 条最常见安装失败及解决方法
  - 端口冲突 / SSH 权限拒绝 / Bot 没有回应 / API Key 无效 / 守护进程安装失败

落地动作：完成部署，截图保存 RUNNING 状态和 Bot 第一条回复
```

### openclaw / openclaw-soul.md

> 对应第 3 节课："SOUL.md：助手的性格、边界与决策权限"
> **差异化**：独立一节深度讲解单个配置文件，提供完整带注释模板——这是我们最核心的差异化内容

```
章节1：为什么单独用一节课讲 SOUL.md
  - 它是三件套里最重要、影响最深远的文件
  - 它是"在没有明确指令时，助手怎么行动"的答案
  - 大多数人写的 SOUL.md 没有约束力——这节课解决这个问题

章节2：SOUL.md 的四个核心模块
  - 模块1：性格定位（助手是什么类型的角色）
  - 模块2：语气风格（怎么和你说话）
  - 模块3：决策权限分层（什么情况下自主行动，什么情况下必须先问你）
  - 模块4：绝对禁止项（任何情况下都不能做的事）

章节3：好写法 vs 差写法（10 组对比，逐一分析）
  - 差："你是一个聪明、友好、高效的助手。"
  - 好："收到不确定指令时，先复述你的理解，等用户确认后再行动。"
  - 差："注重用户隐私。"
  - 好："不得向任何第三方服务发送包含用户姓名、联系方式的信息，除非用户在当次对话中明确授权。"
  - ...（共 10 组）

章节4：决策权限三档详解（最难写对的部分）
  - 第一档（自主执行）：低风险 + 可逆操作 + 不涉及数据外发
    示例：查邮件摘要、查日历、搜索公开信息、设置提醒
  - 第二档（执行前告知）：中风险 + 涉及写入 + 涉及外发
    示例：创建日历事件、发送消息、修改已有文件
  - 第三档（必须等待确认）：高风险 + 不可逆 + 涉及敏感数据
    示例：删除任何内容、向第三方发送用户数据、访问 .env 等敏感文件
  - 关键：这三档必须在 SOUL.md 里用具体操作列举，不能写"高风险操作需确认"（太模糊）

章节5：绝对禁止项模板（7 条，可直接复制）
  - 不允许删除任何文件，包括临时文件
  - 不允许向未经用户授权的域名发送 POST 请求
  - 不允许读取或修改 .env / .credentials 等包含密钥的文件
  - 不允许安装任何新的软件包或依赖
  - 不允许在用户不知情的情况下启动新的后台进程
  - 不允许记录或存储用户的账号密码
  - 遇到上述情况时，必须停止操作并向用户说明原因

章节6：完整 SOUL.md 模板（带逐行注释）
  - 可直接复制使用，注释说明每个字段的写作意图

落地动作：写好你的第一版 SOUL.md，用 3 个边界场景测试它的约束力是否有效
```

### openclaw / openclaw-profile.md

> 对应第 4 节课："USER.md + AGENTS.md：让助手真正了解你"
> **差异化**：提供真正可用的 USER.md 模板（带注释）+ AGENTS.md 通知分层配置

```
章节1：USER.md 解决什么问题
  - 没有 USER.md 时：每次对话都要重复交代"我是做什么的""这个项目的背景是..."
  - 有了 USER.md：助手开口就参考你的档案，你不用说它已经知道
  - 重要：USER.md 是静态文件，不会自动更新，维护是你的责任

章节2：USER.md 完整模板（可直接复制，带逐行注释）
  - ## 基本背景
    · 职业：（一行，不用写长段）
    · 技术栈：（和你的任务相关的工具）
    · 主要使用场景：（OpenClaw 主要用来做什么）
  - ## 当前项目
    · 项目名称和一句话描述
    · 当前阶段和主要目标
    · 关键截止时间（如果有）
  - ## 沟通偏好
    · 语言：中文（简体）
    · 回复详细程度：简洁 / 适中 / 详细
    · 每日推送上限：不超过 X 条（建议 5 条）
    · 格式偏好：Markdown / 纯文本
  - ## 工作习惯
    · 时区：Asia/Shanghai
    · 工作时段：09:00-18:00
    · 不打扰时间：22:00-08:00（紧急事项除外）
    · 每周不工作的天：周六、周日

章节3：USER.md 三类常见错误（逐一修复）
  - 错误1：信息太泛——"我是一名互联网从业者" → 应该写具体的使用场景
  - 错误2：信息过期——档案里还写着"当前项目：XXX"，那个项目半年前就结束了
  - 错误3：沟通偏好没写——每次助手都用英文回复，你每次都要重新说"用中文"

章节4：AGENTS.md 核心四模块
  - 模块1：记忆写入规则（什么情况下写每日笔记 / MEMORY.md）
  - 模块2：通知优先级策略（见下方章节5）
  - 模块3：安全边界（补充 SOUL.md 里操作层面的具体规则）
  - 模块4：场景交互协议（在不同场景下的专属行为规则）

章节5：通知三层分层配置（最实用的部分）
  - 第一层（立即推送）：日历冲突、特定发件人的邮件、系统告警、截止日期提醒
  - 第二层（合并摘要）：普通邮件汇总→并入早报、例行状态检查结果→并入晚报
  - 第三层（静默过滤）：促销邮件、低优先级信息→只写入每日笔记，不推送
  - AGENTS.md 配置模板（每层各 3 条示例规则，可直接复制）

章节6：三件套协作优先级（一图说清楚）
  - 优先级从高到低：SOUL.md 绝对禁止 > AGENTS.md 场景规则 > USER.md 默认偏好 > 默认行为
  - 冲突案例分析：2 个真实冲突场景 + 正确处理方式

落地动作：写好 USER.md 和 AGENTS.md 基础版；给助手发一条任务，检查它是否正确参考了三件套
```

### openclaw / openclaw-skills.md

> 对应第 5 节课："技能系统：你真正需要的是这 5 个"
> **差异化**：不是"这里有 5400+ 技能"，而是"你只需要这 5 个，下面告诉你每个怎么装、怎么测、出错怎么修"

```
章节1：为什么只推荐 5 个（先说不推荐多装的原因）
  - 技能越多，助手每次调用时要考虑的选项越多
  - 从 5 个增加到 15 个：平均响应时间增加约 40%，工具选错率从 3% → 11%
  - 正确策略：装 5 个稳定运行 2-4 周，再根据实际缺口决定是否扩展

章节2：5 个核心技能深度解析
  每个技能包含：用途说明 + 安装命令 + 授权流程 + 测试验证 + 常见失败处理

  技能1：remind-me（提醒）
    - 用途：设置一次性提醒和重复提醒
    - 安装：clawdhub install remind-me
    - 测试："明天早上 9 点提醒我开会"
    - 无需授权，装完即用，0 风险

  技能2：邮件（Gmail 或 imap-email）
    - Gmail 用 gog 技能（包含日历），其他邮箱用 imap-email
    - 安装：clawdhub install gog
    - OAuth 授权流程：弹出浏览器 → Google 账号登录 → 授权权限 → 生成 token.json
    - 安全：chmod 600 ~/clawd/skills/gog/token.json，不要提交到任何仓库
    - 常见失败：token.json 权限过期（每 6 个月需要重新授权）

  技能3：Google Calendar（包含在 gog 里）
    - 和邮件共用同一个 OAuth 授权
    - 测试："今天有什么日程？""帮我在明天下午 3 点创建一个会议"

  技能4：Web Search（网络搜索）
    - 用途：搜索公开信息，需要 Brave Search API Key
    - 注册：Brave Search API 免费额度（2000次/月）足够日常
    - 安装：clawdhub install web-search，填入 API Key
    - 测试："搜索一下今天 AI 领域的最新新闻"

  技能5：浏览器自动化（Playwright）
    - 用途：访问需要登录的网页、填表、截图
    - 安装最复杂（需要安装 Playwright 依赖），但功能最强
    - 适合场景：抓取需要登录的内容、自动填表、网页监控
    - 安全注意：只允许访问你明确授权的域名

章节3：什么时候加第 6 个技能（3 个判断标准）
  - 标准1：你发现自己每周都在手动做某件事，而这件事可以被一个技能自动化
  - 标准2：现有 5 个技能确实无法覆盖这个需求（不是懒得用）
  - 标准3：这个技能的授权风险你可以接受（不要装需要读取过多权限的技能）

章节4：自定义 SKILL.md 写法详解
  - 文件位置：~/clawd/skills/<技能名>/SKILL.md
  - 最重要的字段：description（写得越具体，助手越能准确判断什么时候用）
  - 差写法："获取天气信息"——可能和 Web Search 混淆
  - 好写法："当用户询问特定城市的当前天气或未来 3 天预报时，调用 wttr.in API..."
  - 天气技能完整示例（可直接复制 + 修改）

落地动作：安装 remind-me 并设置第一个提醒；安装 gog 完成 OAuth 授权；写一个自定义技能
```

### openclaw / openclaw-proactive.md

> 对应第 6 节课："让助手主动工作：心跳、定时任务与通知策略"
> **差异化**：重点解决"通知配置不好导致刷屏然后放弃"这个最常见的失败路径

```
章节1：最常见的失败路径
  - 用户配置了心跳，结果每 30 分钟刷一条消息，3 天后关掉通知
  - 这不是心跳机制的问题，是推送条件没有配好
  - 这节课的核心：不是"如何开启主动模式"，而是"如何让主动模式不打扰你"

章节2：心跳机制详解
  - 工作原理：每 30 分钟发送信号，执行 heartbeat_tasks 里的检查清单
  - 关键：推送条件要写具体，不是"检查邮件"，而是"检查邮件，满足以下条件才推送：..."
  - 好配置 vs 差配置对比（3 组真实示例）
  - heartbeat_tasks 字段完整配置格式

章节3：Cron 定时任务（心跳的补充，不是替代）
  - Cron 负责定时汇报，心跳负责实时监控，两者共存
  - Cron 表达式速查（5 个最常用格式）
  - 3 个即装即用模板：
    · 每日早报（0 8 * * *）：汇总昨晚邮件 + 今日日历 + 监控结果
    · 每周周报（0 9 * * 1）：上周任务摘要 + 本周重要事项
    · 定时监控（0 */4 * * *）：检查指定网站状态，仅异常时推送
  - 配置位置：AGENTS.md 的 scheduled_tasks 字段

章节4：通知三层策略（核心内容）
  - 第一层：立即推（日历冲突 / 特定发件人邮件 / 系统告警）
  - 第二层：合并摘要（例行信息 → 早报 / 晚报）
  - 第三层：静默过滤（低优先级 → 只写每日笔记，不推送）
  - 每天推送上限：5 条是舒适区，超过开始疲劳
  - 3 类用户画像的通知配置模板：
    · 效率型（邮件+日历为主）
    · 内容型（监控+摘要为主）
    · 开发者型（代码+日志为主）

章节5：安全配置（部署完成后必做）
  - SSH 密钥认证（禁用密码登录，防暴力破解）
  - API Key 最小权限（只给 OpenClaw 需要的权限，不给管理员权限）
  - 定期更新：sudo apt update && sudo apt upgrade（每月一次）
  - 确认 SOUL.md 绝对禁止项已覆盖核心安全边界

落地动作：配置好通知三层策略；设置一个 Cron 早报任务；等收到第一条主动推送
```

### openclaw / openclaw-grow.md

> 对应第 7 节课："越用越懂你：记忆迭代与助手调优"
> **差异化**：这节课是独有的——几乎所有教程都没有"用了一段时间后怎么维护"的内容

```
章节1：为什么大多数人用了一段时间就放弃
  - 三个放弃节点：装好之后（这节课解决不了）/ 用了 1-2 周之后 / 用了 1 个月之后
  - 1-2 周放弃：通知刷屏 + 助手犯重复的错 → 上节课解决通知，这节课解决"重复犯错"
  - 1 个月放弃：配置没有随需求变化而更新，助手越来越"不对" → 建立迭代节奏

章节2：三层记忆系统的写入时机（什么情况下该更新哪一层）
  - 每日笔记：任务完成后自动写入，短周期事件放这里，不要手动维护
  - MEMORY.md：发现新偏好或新规律时手动更新（例："发现助手总是用英文回复→更新"）
  - SOUL.md / USER.md：配置层变更才动，不要频繁修改
  - 误区：把所有东西都写进 USER.md → 文件越来越臃肿 → 助手读取效率下降

章节3：助手"变笨"的 4 类症状与排查流程
  症状1：开始犯以前不犯的错（行为退化）
    排查：查看 SOUL.md，是否新增了冲突的规则；检查最近有没有改过文件
    修复：找到冲突点，删除或修改矛盾的规则

  症状2：不记得之前说过的事（记忆失效）
    排查：查看每日笔记是否正常写入；检查 MEMORY.md 更新时间
    修复：手动补写丢失的记忆条目；检查写入权限是否正常

  症状3：技能调用频繁报错（技能失效）
    排查：检查对应技能的 token.json 是否过期（OAuth token 一般每 6 个月过期）
    修复：重新执行 OAuth 授权流程，覆盖旧的 token.json

  症状4：回复越来越慢（性能下降）
    排查：数当前安装的技能数量；检查 heartbeat_tasks 里的检查项数量
    修复：卸载 2-4 周没有使用过的技能；精简心跳检查项

章节4：三件套迭代节奏（3 个时间节点）
  - 第 1 周：写好基础版（各文件 ≤ 30 行），不追求完整，优先跑通
  - 第 1 个月：每次发现助手行为和预期不符，立即更新对应文件并记录原因
    目标：积累 10-20 条调整记录，形成你的"调优日志"
  - 第 3 个月：整体回顾
    · 删除 USER.md 里过时的项目信息
    · 把反复验证有效的规则固化进 SOUL.md
    · 精简 AGENTS.md，删除没有触发过的规则
    · 卸载使用频率低的技能

章节5：月度回顾 checklist（可直接复制使用）
  - [ ] USER.md 当前项目信息是否过期
  - [ ] AGENTS.md 通知策略是否还符合现在的使用习惯
  - [ ] 过去一个月有没有哪类通知总是让我烦——加到静默过滤
  - [ ] 过去一个月有没有哪件事我希望助手主动提醒却没有——更新 heartbeat_tasks
  - [ ] 所有技能的 OAuth token 是否需要重新授权
  - [ ] 是否有超过 2 周没有用过的技能可以卸载

章节6：进阶：多设备节点系统
  - 原理：在你的手机和电脑上安装轻量级客户端
  - 能力：助手可以访问手机摄像头、电脑截图、本地文件
  - 适合：已经稳定使用 1 个月以上的用户

落地动作：做一次现有配置的完整回顾，用月度 checklist 找出 1-3 处需要更新的地方
```

### claude-agent / claude-code-install.md

```
章节1：Claude Code 定位（30 秒说清楚）

章节2：安装步骤（npm install -g + 验证 + 首次配置）

章节3：第一次启动流程（进目录 → 运行 claude → 交互模式）

章节4：2 个验证任务（目录结构描述 + 潜在问题查找）

章节5：订阅和计费说明（含用量上限设置方法）

章节6：常见安装问题速查（3-4 条）

落地动作：完成安装，跑通两个验证任务，截图保存
```

### claude-agent / claude-code-workflow.md

```
章节1：为什么需要固定流程（对比实验：有无流程的返工率差异）

章节2：5 步执行流程详解（每步的指令示例）

章节3：任务描述模板（完整版，含字段说明）

章节4：模板填写示例（修复 Invalid Date Bug 的完整示例）

章节5："不做什么"清单的写法（4 类常用禁止项 + 为什么重要）

章节6：完整实战案例（修复跨文件 Bug 的全程对话，含时间统计）

落地动作：用 5 步流程跑一个真实任务，记录每步输出
```

### claude-agent / claude-md-memory.md

```
章节1：CLAUDE.md 是什么（类比：员工手册）

章节2：标准结构（6 个字段 + 每个字段的写法要点）

章节3：三类项目模板
  - 代码项目模板（含示例）
  - 文档/知识管理项目模板（含示例）
  - 个人工作流模板（含示例）

章节4：分层 CLAUDE.md（全局 / 项目 / 子目录，加载顺序说明）

章节5：维护习惯（发现问题更新 / 每月回顾）

落地动作：为一个项目写 CLAUDE.md，至少包含常用命令、架构说明、禁止事项
```

### claude-agent / claude-slash-commands.md

```
章节1：Claude Code Skills 体系概览（Tools vs Slash Commands 的区别）

章节2：内置 Slash Commands 速查（6-8 个常用命令）

章节3：5 个开箱即用的自定义命令（每个含触发方式和行为说明）
  - /commit / /review / /doc / /daily / /debug

章节4：Slash Command 文件格式（frontmatter + 正文结构）

章节5：跟着做——写 /standup 命令（完整步骤，含文件内容示例）

章节6：设计原则（4 条）

落地动作：写一个每天都需要的命令，跑通并保存
```

### claude-agent / claude-security.md

```
章节1：Claude Code 的"危险"能力清单

章节2：权限模型（自动允许 / 询问 / 拒绝 三种模式）

章节3：必须人工确认的 5 类操作

章节4：在 CLAUDE.md 里配置权限边界的写法（含示例）

章节5：如何检查任务做了什么（git diff / git status / 终端历史）

章节6：意外操作恢复方法（git checkout / git stash / git reset）

章节7：黄金法则（任务前备份，任务后 diff）

落地动作：在 CLAUDE.md 里添加权限边界配置，测试它是否会停下来等确认
```

### claude-agent / claude-multi-agent.md

```
章节1：单工具的局限（Claude Code 的设计是单人对话模式，没有定时触发、不能并行）

章节2：Claude Code + Claude API 组合（2 个场景 + 简单实现思路）

章节3：Claude Code + OpenClaw 协作（分工方式 + 数据流说明）

章节4：多智能体架构（主智能体 + 子智能体模式 + Python 代码示例）

章节5：3 个可复现的协作场景
  - 场景1：自动化代码质量检查（Git hook）
  - 场景2：每日工作摘要自动生成（定时触发）
  - 场景3：文档自动同步（代码变更触发）

章节6：新手入门路径（5 个阶段，不要跳步骤）

落地动作：选一个场景画数据流图，做一个手动触发的最简版本
```

---

## 六、实施顺序建议

```
Step 1  修改 src/types/course.ts（ModuleId 类型先改好，后续文件都依赖它）
Step 2  新建 3 个模块定义文件（agentIntro.ts / openclaw.ts / claudeAgent.ts）
Step 3  新建 3 个增强块文件（agentIntro.ts / openclaw.ts / claudeAgent.ts）
Step 4  修改 modules/index.ts（更新 import + BASE_MODULES + MODULE_METADATA）
Step 5  修改 moduleEnhancements/index.ts（更新 import + BASE_ENHANCEMENTS）
Step 6  修改 moduleCatalog.ts（更新 NAV_LABELS + MODULE_CARDS）
Step 7  修改 moduleStyles.ts（更新颜色映射）
Step 8  创建 13 个课程 .md 文件（先创建空文件确保路由不报错，再填充内容）
Step 9  删除旧文件（agents.ts / agents.ts enhancement / lessons/agents/ 目录）
Step 10 运行 npm run lint 验证类型无误
Step 11 运行 npm run dev 验证页面正常渲染
```

---

*文档版本：v2.0 | 2026-04-02*
