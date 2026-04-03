# AI 编程模块设计方案

> 实施文档，供 Kiro / Codex 执行。目标：新增一个「AI 编程」模块，横向覆盖国内外前沿编程工具与模型，帮助中国用户建立“工具认知 -> 模型选型 -> 协作工作流 -> 安全治理 -> 场景落地”的完整路径。
>
> 设计参考：`claude-code-cowork-course.md` 的“课程蓝图 + 实施约束 + 逐课 Spec”写法。

---

## 一、模块定位

### 1. 为什么现在值得加这个模块

AI 编程已经不是“代码补全插件”时代，而是进入了明显的 **Agentic Coding** 阶段：

- 用户要选的不只是模型，还要选入口：`CLI Agent / IDE Agent / Cloud Agent / Review Bot / Spec-driven IDE`
- 同一个“写代码”任务，越来越依赖上下文管理、权限边界、工作流拆分，而不是单次生成能力
- 中国用户还必须额外考虑：中文体验、支付和网络环境、国内云生态、企业合规、私有化与数据边界

仓库当前已经有两个相关模块，但还缺一个“跨厂商 AI 编程地图”：

- `llm`：偏通用模型选型与治理
- `claude-agent`：偏 Claude Code 单工具深挖
- **新模块**：偏 AI 编程工具与模型的横向比较、组合策略、落地路径

### 2. 这个模块解决什么问题

这个模块不是教用户“背工具名单”，而是解决下面四个现实问题：

1. 我应该先学哪类 AI 编程工具，而不是先追哪家最火
2. 国外工具和国内工具到底差在哪，什么时候该优先用哪条栈
3. 编程模型到底怎么选，是看跑分、看价格，还是看工作流适配
4. 如何把多个工具和模型接成稳定流程，而不是今天用这个、明天换那个

### 3. 建议模块元信息

- `moduleId`: `ai-programming`
- `title`: `AI 编程工具与模型实战`
- `subtitle`: `从前沿工具地图到中国用户落地路径，建立一套可执行的 AI 编程工作栈`
- `icon`: 建议 `Code2`
- `color`: 建议 `blue`
- `estimatedTime`: `2-3 周`
- `difficulty`: `intermediate`
- `audience`:
  - 希望系统选型 AI 编程工具的开发者
  - 想建立团队 AI 编程规范的技术负责人
  - 需要理解国内外工具差异的产品经理 / 创业者
- `tags`:
  - `AI 编程`
  - `Claude Code`
  - `Codex`
  - `Cursor`
  - `Gemini`
  - `Kiro`
  - `通义灵码`
  - `TRAE`
  - `CodeBuddy`
  - `模型选型`
- `prerequisites`:
  - 完成 `AI 智能体入门`
  - 建议完成 `大模型实战库`
  - 对代码仓库、命令行、Git 有基本认识

### 4. 这个模块不做什么

- 不做“谁是最强 AI 编程工具”的排行榜课
- 不把短期免费额度、短期价格战、短期榜单名次当主知识
- 不把未被官方公开确认的内部实现写成产品能力
- 不重复讲 `claude-agent` 已经深讲过的安装入门细节

---

## 二、实施上下文（给 Kiro / Codex）

这份文档不是灵感草稿，而是模块实施蓝图。后续如果正式落仓库，优先遵守下面这些原则。

### 1. 内容优先级

1. **第一优先级：官方产品文档、官方功能页、官方 release notes**
2. **第二优先级：官方模型文档、官方 GitHub、官方 API / 平台文档**
3. **第三优先级：官方案例、官方博客、官方教程**
4. **最低优先级：社区跑分、社区传闻、未核实的“内部机制拆解”**

### 2. 哪些内容能讲成主知识，哪些只能当旁注

可以讲成主知识的内容：

- 官方明确存在的能力：`agent mode / background agents / rules / MCP / hooks / CLI / code review / spec workflow`
- 官方公开命名的模型家族与产品入口
- 官方明确支持的工作方式：本地执行、云端异步、IDE 集成、权限审批、企业接入

只能讲成旁注的内容：

- 非官方 benchmark 得分和“谁碾压谁”的结论
- 对内部路由、策略、调度、提示词结构的猜测
- 价格、免费额度、排队策略这类高时效信息
- 对“哪家未来一定赢”的判断

### 3. 实施目标

Kiro / Codex 在把这个模块落成正式课程时，应该至少产出：

1. 一份模块定义文件
2. 一份模块增强块文件
3. 8 份课时 Markdown
4. 一套工具对比表、模型选型表、风险矩阵
5. 一份“中国用户默认工具栈建议”
6. 一份“团队 AI 编程治理清单”

### 4. 实施约束

- 不要把“工具能力”与“模型能力”混为一谈
- 不要把“某工具当前默认模型”写成长期不变事实
- 模型表述优先用“家族 + 角色”写法，少用很快过时的微版本当课标题
- 讲国外产品时要补“中国用户使用现实”；讲国内产品时要补“国际能力边界”
- 所有明显高时效内容都要带核对日期
- 课程以中文叙述，但产品名、功能名、文件名保留官方英文原名

### 5. 当资料出现分歧时的处理原则

- 如果是“这个能力官方是否存在”，查官方文档
- 如果是“这个模型现在官方怎么命名”，查官方模型页或官方发布页
- 如果是“教学结构怎么更顺”，以本课纲的叙事结构为准
- 如果是“哪个版本号是否保留进正文”，默认降级为注释或资源区

### 6. 本模块的核对基准日期

本设计文档按 **2026-04-03** 可公开访问的官方资料整理。

为了减少后续维护成本，课程正文建议按下面方式处理版本波动：

- 工具正文以“产品家族 + 工作流能力”写法为主
- 模型正文以“模型家族 + 任务角色”写法为主
- 具体价格、版本号、免费额度、上下文窗口，放进增强块或资源区，不写死进主叙事

---

## 三、模块核心叙事

这门课的主线不是“背工具”，而是建立一套判断框架：

1. **先分工具范式**：CLI、IDE、Cloud Agent、Spec-driven、Review Bot
2. **再分模型角色**：高质量主力、低成本跑量、中文优先、企业内控
3. **再做场景映射**：个人开发、团队协作、企业治理、国内环境
4. **最后做组合**：不是选唯一工具，而是给不同任务配默认栈

一句话概括这门课的价值：

> 学完后，用户不只是知道有哪些 AI 编程工具，而是能为自己的真实开发环境设计一条稳定的 AI 编程路线。

---

## 四、课程地图

```text
第一阶段：认知建立（先看清 2026 年 AI 编程到底变成了什么）
  └── 第 1 课：AI 编程进入 Agentic 时代——工具范式、入口与判断框架

第二阶段：国外主线（理解国际前沿工具为什么这样设计）
  ├── 第 2 课：Claude Code 与 Codex——CLI Agent 与 Cloud Agent 的两条主线
  └── 第 3 课：Cursor、Gemini、Kiro——IDE Agent、开源 CLI 与 Spec-driven 工作流

第三阶段：国内主线（理解中国用户真正会落地哪几条栈）
  ├── 第 4 课：通义灵码、TRAE、CodeBuddy——国内 AI 编程工具怎么选
  └── 第 5 课：编程模型选型——国外模型家族与中国模型家族的能力分工

第四阶段：系统化落地（从会用工具到能设计流程）
  ├── 第 6 课：工作流设计——单兵开发、结对编程、PR 评审与多 Agent 协作
  ├── 第 7 课：安全与治理——权限、成本、隐私、企业合规
  └── 第 8 课：中国用户落地路线——个人、团队、企业三种默认方案
```

---

## 五、覆盖范围：工具与模型矩阵

> 这张表不是“最终排行榜”，而是课程覆盖边界。后续实施时只要产品仍存在且官方能力未变，课程结构就不需要重写。

| 线别 | 公司 | 工具 | 在课中扮演的角色 | 模型家族 | 在课中扮演的角色 |
|------|------|------|------------------|----------|------------------|
| 国外 | Anthropic | Claude Code | 本地终端 Agent 基线、权限与上下文管理基线 | Claude 4 家族 | 高质量代码推理、长链路工程任务 |
| 国外 | OpenAI | Codex / Codex CLI | 云端异步 Agent、仓库委托执行、远程任务基线 | GPT-5 / GPT-5-Codex 家族 | OpenAI 编程主力与代码代理主线 |
| 国外 | Google | Gemini CLI / Gemini Code Assist | 开源 CLI Agent 与 Google 生态协同 | Gemini 2.5 / 3 家族 | 多模态、长上下文、搜索/云生态协同 |
| 国外 | Cursor | Cursor | IDE 原生 Agent、Rules、Background Agents、Bugbot | 多模型路由 | 编辑器原生体验与多模型切换代表 |
| 国外 | Kiro | Kiro | Spec-driven IDE、Hooks、Steering、从需求到实现 | 官方支持模型与自动路由 | 以规范驱动开发流程，而非单轮对话 |
| 国内 | 阿里 | 通义灵码 / Qwen Code | 国内开发者默认入口、IDE 与 CLI 双线代表 | Qwen3 / Qwen3-Coder 家族 | 中文编程、开源生态、企业接入 |
| 国内 | 字节 | TRAE 中国版 / 豆包 MarsCode 体系 | 国内 AI IDE、中文界面、产品化开发流代表 | 豆包模型家族 / 代码能力模型 | 字节系中文开发体验与火山生态协同 |
| 国内 | 腾讯 | CodeBuddy / CodeBuddy CLI | 企业代码助手、团队治理、腾讯云协同代表 | 腾讯混元家族 | 企业内控、腾讯云生态、团队级接入 |

### 设计原则

- 国外工具重点讲“范式创新”
- 国内工具重点讲“中文体验 + 企业落地 + 云生态”
- 模型部分重点讲“角色分工”，不重点讲跑分

---

## 六、课程交付 Spec

### 1. 最终交付物

Kiro / Codex 后续正式实施时，至少应产出：

1. 一份正式模块总纲
2. 8 份课时文档
3. 一份工具对比表
4. 一份模型选型表
5. 一份安全治理清单
6. 一份中国用户默认路线图

### 2. 建议的文件级交付结构

```text
src/content/modules/
  aiProgramming.ts

src/content/moduleEnhancements/
  aiProgramming.ts

src/content/lessons/ai-programming/
  ai-coding-landscape.md
  claude-code-vs-codex.md
  cursor-gemini-kiro.md
  china-coding-tools.md
  coding-model-selection.md
  ai-coding-workflows.md
  ai-coding-governance.md
  china-rollout-playbook.md
```

### 3. 每一课必须采用的统一结构

每一课都必须有这 8 个固定区块：

1. `学习目标`
2. `适合谁`
3. `前置条件`
4. `核心知识`
5. `Demo`
6. `作业`
7. `常见误区`
8. `验收标准`

### 4. 每一课的最小交付标准

每一课至少包含：

- 1 个真实任务导向 demo
- 1 张判断表 / 对比表 / 流程图
- 1 个可复制模板
- 3 个以上常见误区
- 1 份明确验收标准

### 5. 模块增强块建议

`src/content/moduleEnhancements/aiProgramming.ts` 建议至少包含这 4 类 block：

- `tool-comparison`
  - 各工具按 `入口 / 权限 / 多 Agent / 云端能力 / 企业适配 / 中文体验` 做横向对比
- `model-options`
  - 各模型按 `质量 / 成本 / 上下文 / 中文 / 代码任务类型` 做角色化对比
- `security-checklist`
  - 适用于 AI 编程的权限、数据、审计、回退规则
- `resource-links`
  - 官方文档、官方 GitHub、官方产品页、官方 release notes

---

## 七、8 课逐课交付 Spec

### 第 1 课 Spec

- 目标：建立“AI 编程已经从补全工具进入 Agentic 工作流”的整体认知
- 必须讲清：
  - `Autocomplete -> Chat -> Agent -> Cloud Agent -> Spec-driven` 的演进
  - `CLI / IDE / Cloud / Review Bot` 四种入口分别适合什么任务
  - 为什么“选工具”不再等于“选模型”
- 必须有 demo：
  - 同一个任务分别用聊天式提问、IDE Agent、CLI Agent 的差异对比
- 必须产出：
  - 一张 `AI 编程工具坐标图`
  - 一张 `入口选择决策表`
- 验收标准：
  - 学员能给 `Claude Code / Codex / Cursor / Gemini / Kiro` 正确归类

### 第 2 课 Spec

- 目标：理解 Claude Code 与 Codex 代表的两条前沿主线
- 必须讲清：
  - 本地终端 Agent vs 云端异步 Agent 的区别
  - `CLAUDE.md`、`AGENTS.md`、权限审批、仓库委托的角色
  - 哪些任务更适合“本地盯着做”，哪些更适合“丢给云端做”
- 必须有 demo：
  - 同一个代码仓库任务分别设计 Claude Code 路径和 Codex 路径
- 必须产出：
  - 一张 `Claude Code vs Codex` 对比表
  - 一份 `本地执行 / 云端委托` 判断模板
- 验收标准：
  - 学员能根据任务风险和等待成本选对入口

### 第 3 课 Spec

- 目标：理解 Cursor、Gemini、Kiro 代表的三种工作流思路
- 必须讲清：
  - Cursor 的 IDE 原生 Agent、Rules、Background Agents、Bugbot 代表什么
  - Gemini CLI / Gemini Code Assist 为什么是“开放入口 + Google 生态”路线
  - Kiro 的 `Specs / Hooks / Steering` 为什么是“先规格，再执行”的路线
- 必须有 demo：
  - 一个功能需求分别走 `Cursor Agent` 与 `Kiro Specs` 的思路对比
- 必须产出：
  - 一张 `IDE Agent / 开源 CLI / Spec-driven` 决策表
- 验收标准：
  - 学员能说清这三条路线各自最适合什么团队

### 第 4 课 Spec

- 目标：建立国内 AI 编程工具的判断框架，而不是简单认为“国外一定更强”
- 必须讲清：
  - 通义灵码的 IDE/企业路线
  - TRAE 中国版 / 豆包 MarsCode 体系的产品路线
  - CodeBuddy 的团队协作、CLI、SDK、企业接入路线
  - 中国用户常见约束：网络、支付、文档语言、企业采购、数据边界
- 必须有 demo：
  - 同一个中文业务需求，分别设计阿里、字节、腾讯三条落地方案
- 必须产出：
  - 一张 `国内 AI 编程工具选择表`
- 验收标准：
  - 学员能根据个人开发 / 团队协作 / 企业合规做出初步选型

### 第 5 课 Spec

- 目标：建立 AI 编程模型的“角色分工”认知
- 必须讲清：
  - 为什么代码任务不能只看 benchmark
  - `高质量主力 / 低成本跑量 / 中文优先 / 企业内控` 四种模型角色
  - 国外模型家族：
    - `Claude 4`
    - `GPT-5 / GPT-5-Codex`
    - `Gemini 2.5 / 3`
  - 国内模型家族：
    - `Qwen3 / Qwen3-Coder`
    - `豆包模型家族 / 代码能力模型`
    - `腾讯混元家族`
- 必须有 demo：
  - 用同一份代码任务 brief，设计“主力模型 + 备选模型 + 跑量模型”三档方案
- 必须产出：
  - 一张 `AI 编程模型分工表`
  - 一份 `代码任务评测表`
- 验收标准：
  - 学员能为至少 3 类代码任务指定默认模型和回退模型

### 第 6 课 Spec

- 目标：从“会用工具”升级到“会设计工作流”
- 必须讲清：
  - 单兵开发流：阅读、计划、编码、验证、总结
  - 结对编程流：人负责目标与验收，Agent 负责探索与执行
  - 团队协作流：需求、实现、PR、Review、回归、文档同步
  - 多 Agent 不是越多越好，关键是分工和上下文边界
- 必须有 demo：
  - 设计一条 `需求 -> 实现 -> 测试 -> PR -> Review` 的 AI 编程流水线
- 必须产出：
  - 3 套默认 SOP：个人版 / 小团队版 / 企业版
- 验收标准：
  - 学员能把自己的真实开发流程替换成一条可执行 AI 工作流

### 第 7 课 Spec

- 目标：建立 AI 编程的安全、成本与治理框架
- 必须讲清：
  - 权限审批、网络访问、写操作、Git 操作、Secrets 的边界
  - 本地执行与云端执行的风险差异
  - 企业最关心的审计、数据驻留、账号与权限隔离
  - 成本不只看 token 单价，还要看返工率、等待成本和人工兜底成本
- 必须有 demo：
  - 为一条 AI 编程流程补齐 `权限规则 + 回退机制 + 审核点`
- 必须产出：
  - 一份 `AI 编程治理清单`
  - 一张 `风险分级矩阵`
- 验收标准：
  - 学员能为自己的主流程写出一版最小治理规则

### 第 8 课 Spec

- 目标：把前 7 课收口成中国用户可直接执行的路线图
- 必须讲清：
  - 个人开发者的默认路线
  - 小团队 / 创业团队的默认路线
  - 企业技术管理者的默认路线
  - 海外工具优先、国内工具优先、混合栈三种方案的优缺点
- 必须有 demo：
  - 针对 3 种身份分别给出 `30 天落地计划`
- 必须产出：
  - 一张 `中国用户 AI 编程路线图`
  - 一份 `按人群划分的默认工具栈建议`
- 验收标准：
  - 学员能为自己选出一条未来 30 天可执行路线，而不是停留在工具收藏阶段

---

## 八、建议模块定义草案

如果后续要把它直接接进站点，模块定义建议采用下面这个方向：

```ts
export const aiProgrammingModule: BaseModuleContent = {
  title: 'AI 编程工具与模型实战',
  subtitle: '先理解工具范式，再完成模型选型与工作流落地',
  icon: Code2,
  color: 'blue',
  description:
    '8 节课带你建立一套面向中国用户的 AI 编程判断框架：既看 Claude Code、Codex、Cursor、Gemini、Kiro，也看通义灵码、TRAE、CodeBuddy 与对应模型家族，最终落到真实开发流程和治理规则。',
  keyTakeaways: [
    '理解 AI 编程从补全工具到 Agentic 工作流的演进',
    '分清 CLI、IDE、Cloud Agent、Spec-driven 四种主流入口',
    '会比较国外与国内 AI 编程工具，不再只盯单个品牌',
    '会给代码任务设计主力模型、备选模型和跑量模型',
    '能把 AI 编程接进个人和团队的真实开发流程',
    '建立权限、成本、隐私和回退机制的治理底线',
  ],
};
```

建议三个 section：

1. `工具范式`
2. `模型分工`
3. `工作流与治理`

---

## 九、后续实施时的受影响文件清单

### 需要修改的文件

| 文件 | 变更类型 | 说明 |
|------|----------|------|
| `src/types/course.ts` | 修改 | 在 `MODULE_IDS` 中新增 `ai-programming` |
| `src/content/modules/index.ts` | 修改 | 注册新模块与元信息 |
| `src/content/moduleCatalog.ts` | 修改 | 新增模块卡片和导航文案 |
| `src/content/moduleEnhancements/index.ts` | 修改 | 注册新模块增强块 |
| `src/content/lessonCovers.ts` | 修改 | 为新模块增加 cover theme |

### 需要新建的文件

| 文件 | 说明 |
|------|------|
| `src/content/modules/aiProgramming.ts` | 模块定义 |
| `src/content/moduleEnhancements/aiProgramming.ts` | 模块增强块 |
| `src/content/lessons/ai-programming/ai-coding-landscape.md` | 第 1 课 |
| `src/content/lessons/ai-programming/claude-code-vs-codex.md` | 第 2 课 |
| `src/content/lessons/ai-programming/cursor-gemini-kiro.md` | 第 3 课 |
| `src/content/lessons/ai-programming/china-coding-tools.md` | 第 4 课 |
| `src/content/lessons/ai-programming/coding-model-selection.md` | 第 5 课 |
| `src/content/lessons/ai-programming/ai-coding-workflows.md` | 第 6 课 |
| `src/content/lessons/ai-programming/ai-coding-governance.md` | 第 7 课 |
| `src/content/lessons/ai-programming/china-rollout-playbook.md` | 第 8 课 |

### 建议插入位置

建议把新模块插在 `claude-agent` 后面、`scenarios` 前面。

原因：

- 它比 `claude-agent` 更横向，适合放在单工具深讲之后
- 它又比 `scenarios` 更偏方法和工具层，适合在场景课之前完成

---

## 十、Kiro / Codex 可直接执行的实施顺序

建议按这个顺序推进：

1. 先创建 `ai-programming` 模块骨架和入口注册
2. 先写模块总纲和第 1、2、5 课
3. 再补第 3、4 课，把国内外工具线闭环
4. 最后补第 6、7、8 课，把工作流、治理、路线图收口
5. 再统一补增强块：工具表、模型表、治理表、资源链接
6. 最后复核所有官方来源与日期，去掉过时版本号和临时价格

---

## 十一、建议优先使用的官方来源

> 后续正式实施时，优先从这些官方来源补证据，不要先看社区二手解读。

### 国外工具与模型

- Anthropic Claude Code:
  - https://code.claude.com/docs/en/overview
- Anthropic Claude Models:
  - https://platform.claude.com/docs/en/about-claude/models/overview
- OpenAI Codex:
  - https://developers.openai.com/codex
- OpenAI Codex CLI:
  - https://developers.openai.com/codex/cli
- OpenAI API Models:
  - https://platform.openai.com/docs/models
- Gemini CLI:
  - https://github.com/google-gemini/gemini-cli
- Gemini Code Assist:
  - https://developers.google.com/gemini-code-assist
- Gemini API Models:
  - https://ai.google.dev/gemini-api/docs/models
- Cursor Docs:
  - https://docs.cursor.com/
- Cursor Background Agents:
  - https://docs.cursor.com/background-agent/overview
- Cursor Bugbot:
  - https://docs.cursor.com/bugbot
- Kiro:
  - https://kiro.dev/
- Kiro Docs:
  - https://kiro.dev/docs/

### 国内工具与模型

- 通义灵码：
  - https://lingma.aliyun.com/
- 通义灵码产品文档：
  - https://help.aliyun.com/zh/lingma/
- Qwen 官方：
  - https://qwenlm.github.io/
- Qwen3-Coder 官方仓库：
  - https://github.com/QwenLM/Qwen3-Coder
- TRAE 中国版：
  - https://www.trae.cn/
- 豆包 MarsCode：
  - https://www.marscode.com/
- 火山引擎：
  - https://www.volcengine.com/
- 腾讯云代码助手 CodeBuddy：
  - https://copilot.tencent.com/docs/ide/Introduction
- CodeBuddy CLI 文档：
  - https://copilot.tencent.com/docs/cli/quickstart
- 腾讯混元：
  - https://hunyuan.tencent.com/
- 腾讯混元产品页：
  - https://cloud.tencent.com/product/hunyuan

---

## 十二、最终验收标准

这个模块设计如果要算完成，至少应满足下面 6 条：

1. 与现有 `llm`、`claude-agent` 的边界清晰，不重复
2. 同时覆盖国外与国内主流 AI 编程工具，不偏一边
3. 同时覆盖工具与模型，不只讲入口、不只讲模型
4. 能回答“中国用户到底怎么选”这个核心问题
5. 能产出可实施的文件结构和逐课 Spec，而不是停留在概念层
6. 后续实施时，Kiro / Codex 可以直接按本文拆文件、写课程、补资源
