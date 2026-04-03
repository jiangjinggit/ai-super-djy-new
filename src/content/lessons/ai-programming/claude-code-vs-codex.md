## 学习目标

- 理解 Claude Code 与 Codex 都已是"本地 + 云端"混合形态，不再是简单二分
- 分清两者在安全模型、配置体系、模型绑定、生态集成上的核心差异
- 能根据团队实际情况选择默认入口
- 带走一份选型判断模板

## 适合谁

- 想搞清楚 Claude Code 和 Codex 到底差在哪的人
- 负责团队工具栈设计，需要做选型决策的人

## 前置条件

- 了解 Git、测试、分支、PR 的基本概念
- 最好已经体验过一次 Claude Code 或 Codex
- 已经读过本模块的"AI 编程工具全景"课

## 核心知识

### 1. 先纠正一个常见误解

很多早期文章把两者画成：

- Claude Code = 本地终端强监督
- Codex = 云端异步委托

这在 2025 年 5 月 Codex 刚发布时大致成立，但现在已经不准确了。

**Claude Code** 除了终端 CLI，还有 Claude Code on the web（云端并行任务）、Background Agents、GitHub Actions 集成、IDE 集成、Cron 定时任务。

**Codex** 除了云端 Agent，还有 Codex CLI（开源本地终端 Agent）、macOS 桌面 App、IDE 扩展、Slack 集成、Codex SDK。

**两者都同时具备本地终端和云端异步两种工作模式。** 真正值得比较的是下面这些维度。

### 2. 安全与沙箱模型

这是两者最深层的架构分歧。

**Codex：OS 内核层隔离。** macOS 用 Seatbelt，Linux 用 Landlock + seccomp。在操作系统层面限制文件系统、网络、进程。Agent 无法绕过，但控制粒度粗，主要是"能不能访问"的二元判断。三种沙箱模式：read-only / workspace-write / danger-full-access。

**Claude Code：应用层可编程治理。** 通过 Hooks 系统做安全控制，支持多种可编程事件。可以写任意验证逻辑，控制粒度更细，但 Hook 和 Agent 共享进程边界，隔离强度不如内核层。

一句话：Codex 的墙建在地基里，翻不过去但只有几种高度；Claude Code 的墙建在应用里，形状随意画但材质没那么硬。

### 3. 配置与上下文体系

**Claude Code** 走分层继承路线：`CLAUDE.md` + Memory + Steering Files，支持全局 → 仓库 → 目录的自动加载。根据你在哪个目录、读了什么文件，自动适配规则。

**Codex** 走 Profile 切换路线：`AGENTS.md` + config.toml Profiles，每个 Profile 独立设置模型、沙箱、审批级别。你主动选一个 Profile，所有设置一次到位。

上下文窗口两者都已达到 1M tokens 级别，不再构成选型差异。

### 4. 模型绑定与灵活度

两者默认都锁定自家模型：Claude Code 用 Claude 家族（Opus / Sonnet / Haiku），Codex 用 GPT / Codex 家族。

但都可以接其他模型：Claude Code 原生支持 Bedrock / Vertex 部署，也可通过 LLM Gateway（如 LiteLLM）路由到其他提供商；Codex CLI 开源且基于 OpenAI 兼容协议，接第三方模型或本地模型（Ollama 等）的门槛更低。

### 5. 生态集成

| 维度 | Claude Code | Codex |
| --- | --- | --- |
| 账号体系 | Anthropic（Pro / Max / Team / Enterprise） | ChatGPT（Plus / Pro / Business / Enterprise） |
| 云部署 | 原生 Bedrock / Vertex | ChatGPT 平台 |
| 团队协作 | GitHub PR + API 驱动 | Slack 集成 + SDK + macOS App |
| 多 Agent | 子代理编排 + Background Agents | macOS App + 云端并行 |
| 开源 | 部分开源 | CLI 完全开源（Rust） |

### 6. 选型判断模板

| 问题 | 如果"是" | 倾向 |
| --- | --- | --- |
| 需要内核级沙箱防止代码逃逸？ | 是 | Codex |
| 需要对不同操作写自定义治理规则？ | 是 | Claude Code |
| 团队已在用 ChatGPT + Slack？ | 是 | Codex |
| 已有 AWS Bedrock / GCP Vertex 环境？ | 是 | Claude Code |
| 有复杂的分层规范体系？ | 是 | Claude Code |
| 经常切换项目，需要 Profile 一键切换？ | 是 | Codex |
| 需要非技术成员也能委托编码任务？ | 是 | Codex（Slack） |
| 想接入本地模型或第三方模型？ | 是 | Codex CLI |

这不是二选一。成熟团队常见做法是两个都用，按任务特征分流。

## Demo

### 同一个任务，两条路径

任务：给已有 SaaS 项目增加"导出订单报表"功能。

**Claude Code 路径：** 终端启动 → 利用 CLAUDE.md 仓库规范出计划 → Hook 设置写操作前检查权限文件 → 审批执行 → 跑测试 → 周边任务用 Background Agent 异步处理。适合原因：权限改动需要细粒度治理，仓库有分层规范。

**Codex 路径：** Slack 频道 @Codex 描述任务 → 云端自动执行 → 本地 CLI 处理内网依赖部分 → Review PR → SDK 集成回归测试到 CI/CD。适合原因：团队已用 Slack + ChatGPT，子任务可并行。

## 作业

拿当前仓库里的 3 个真实任务，判断默认选择并补一句原因：

`这个任务更适合 ______，因为它在安全治理 / 生态集成 / 配置需求上呈现出 ______。`

## 常见误区

1. **以为 Claude Code 只能本地、Codex 只能云端。** 两者都已是混合形态。

2. **以为只能用自家模型。** 两者默认锁定自家模型，但都支持通过 Gateway 或兼容端点路由到其他模型。

3. **只比模型质量，不比治理模型。** 模型质量随版本快速变化，安全架构和治理机制才是更稳定的选型依据。

4. **忽略生态绑定成本。** 选 Codex 绑定 ChatGPT 体系，选 Claude Code 绑定 Anthropic 体系，切换成本不低。

## 验收标准

- 能说清两者都已是"本地 + 云端"混合形态
- 能解释安全模型核心差异：内核层隔离 vs 应用层 Hooks
- 能从安全治理、配置体系、模型绑定、生态集成做选型判断
- 能为自己当前仓库中的任务选出默认入口并说明理由
