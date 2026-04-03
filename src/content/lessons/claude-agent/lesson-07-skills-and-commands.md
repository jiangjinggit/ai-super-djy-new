## 学习目标

- 理解五类控制工具的区别：Tools、Built-in Commands、Bundled Skills、自定义 Skills、Subagents
- 掌握常用内置命令和 bundled skills 的用途
- 学会从零创建一个 Skill，把高频动作封装成可复用能力

## 适合谁

已经能稳定使用 5 步执行法和 CLAUDE.md 的用户，想把重复性工作进一步自动化。

## 前置条件

- 完成第 4-6 课，已经建立了稳定的协作流程和项目级上下文
- 至少有一个反复执行的任务（比如每天写日报、每次提交前做检查）

## 核心知识

### 五类控制工具区别

| 工具 | 是什么 | 用来做什么 |
|------|--------|-----------|
| **Tools（工具）** | Claude 调用的能力单元 | 读文件、写文件、跑命令、连 MCP |
| **Built-in Commands（内置命令）** | 官方命令入口 | `/clear`、`/compact`、`/context`、`/mcp`、`/permissions` 等 |
| **Bundled Skills（内置技能）** | 官方随产品附带的 skill | `/debug`、`/loop`、`/batch`、`/simplify` 等 |
| **Custom Skills / Commands（自定义技能/命令）** | 你在 `.claude/skills/` 或 `.claude/commands/` 里定义的能力包 | 复用工作流、模板、检查逻辑、脚本 |
| **Subagents（子代理）** | 专注特定任务的子助手 | 复杂任务拆分与并行执行 |

Skills 比单个命令更强，因为一个 skill 往往包含：一个明确任务说明、一组输入输出约束、可复用模板/示例、必要时附带脚本和检查逻辑。当任务跨多步、需要模板、需要脚本、需要固定目录结构时，skill 比单一 slash command 更稳。

### 内置命令与 bundled skills 速查表

| 命令 | 作用 |
|------|------|
| `/help` | 查看帮助 |
| `/clear` | 清空当前对话上下文 |
| `/compact` | 手动触发上下文压缩 |
| `/context` | 可视化当前上下文占用情况 |
| `/memory` | 编辑 `CLAUDE.md`、查看和管理 auto-memory |
| `/agents` | 管理 agent 配置 |
| `/permissions` | 管理 allow / ask / deny 规则 |
| `/doctor` | 诊断环境问题 |
| `/init` | 初始化项目协作文件 |
| `/mcp` | 管理 MCP 连接和认证 |
| `/hooks` | 查看 Hook 配置 |
| `/plan` | 直接进入 plan mode |
| `/security-review` | 做安全导向的代码审查 |
| `/schedule` | 创建和管理 Cloud scheduled tasks |
| `/feedback`（`/bug`） | 提交产品反馈 |
| `/debug` | 官方 bundled skill，用于调试复杂问题 |
| `/loop` | 官方 bundled skill，用于会话内循环检查 |

> 说明：自定义 slash commands 仍然可用，但官方当前更推荐把复杂高频任务做成 skill。`/debug`、`/loop` 这些虽然也出现在 `/` 菜单里，但它们属于 bundled skills，不是 built-in commands。

### Skill 是什么，为什么比单个命令更强

一个 skill 往往至少包含四样东西：
- 一个明确任务说明
- 一组输入输出约束
- 可复用模板 / 示例
- 必要时附带脚本、资源文件、检查逻辑

当任务跨多步、需要模板、需要脚本、需要固定目录结构时，skill 比单一命令更稳。

### 从零做一个 standup skill

**场景**：每天早上 9 点，你需要整理一份站会消息——昨天做了什么、今天计划什么、有没有阻碍。

**创建方式**：在 `.claude/skills/standup/SKILL.md` 里写主说明。`SKILL.md` 是必需入口文件，`description` 前置说明推荐填写，便于 Claude 自动判断何时使用。

```markdown
---
name: standup
description: Generate a concise daily standup update from recent work
disable-model-invocation: true
---

生成今日站会消息。

## 昨天
读取最近 24 小时内的 git commit 记录（用 git log --since="24 hours ago"），
列出主要完成的内容，每条不超过一句话。

## 今天
读取 TODO.md（如果存在），列出今日计划，没有则提示我手动填写。

## 阻碍
询问我是否有阻碍，如果有，格式化成一条描述。

输出格式：纯文本，适合直接粘贴进钉钉/飞书。
禁止事项：不要发送消息，不要修改文件，只输出结果。
```

使用方式：
- 可以在会话里直接说"使用 standup skill"
- 也可以保留一个兼容入口，把它封装成 `/standup`

补充：
- `.claude/commands/` 仍然可用，且支持同样的 frontmatter
- 如果 skill 和 command 同名，skill 会优先

### 五个高频自定义 skill/命令范例

**1. `/commit-msg` — 生成 git commit 消息**

```markdown
读取 `git diff --staged`，生成一条 commit 消息。
格式：<类型>(<范围>): <描述>
类型：feat/fix/refactor/docs/chore
描述：中文，不超过 50 字，说清楚做了什么。
```

**2. `/doc` — 生成函数文档**

```markdown
读取 $ARGUMENTS 指定的文件，
为每个导出函数生成 JSDoc 注释。
要求：描述准确、参数类型正确、不超过 3 行。
```

**3. `/daily-summary` — 日报生成**

```markdown
读取今日 git 提交和 TODO.md，生成工作日报。
格式：
- 完成事项（来自 git log）
- 未完成事项（来自 TODO.md 的未勾选项）
- 明日计划（来自 TODO.md 的下一步标注）
中文输出，简洁，适合内部汇报。
```

**4. `/error-triage` — 报错分析**

```markdown
分析 $ARGUMENTS 里的报错信息。
输出：
1. 报错原因（一句话）
2. 可能触发的代码位置
3. 三个可能的修复方向，按可能性排序
不要直接修改代码，先让我选方向。
```

**5. `/security-check-local` — 本地安全检查**

```markdown
读取当前分支的 git diff，
检查敏感信息、命令注入、SQL 注入、权限绕过、危险默认值。
输出：按严重程度分级（阻断/警告/建议），不要自动修复。
```

## Demo

### 做一个 standup skill

完整演示流程：

**第一步**：创建目录和文件

```bash
mkdir -p .claude/skills/standup
```

**第二步**：写入 `SKILL.md`（内容见上方"从零做一个 standup skill"）

**第三步**：在 Claude Code 里测试

```
使用 standup skill，帮我生成今天的站会消息。
```

**第四步**：检查输出是否符合预期格式，根据实际情况调整 skill 说明

**第五步**：如果效果稳定，考虑封装成 `/standup` 命令方便日常使用

## 作业

把你最常重复描述的一个任务做成 skill 或 slash command：

1. 先列出你每周至少做 3 次的重复任务
2. 选一个最高频的，写出 skill 说明文件
3. 测试 3 次，根据输出调整说明
4. 如果任务很简单（单步、无模板），做成 `.claude/commands/` 里的 command 即可

## 常见误区

1. **一个命令塞太多能力**：一个 skill 应该做一件事做好，不要把"生成日报 + 提交代码 + 发通知"全塞进一个 skill。拆开来，每个 skill 职责清晰，组合使用更灵活。
2. **只写目标不写输入来源**：skill 说明里写了"生成日报"，但没说数据从哪来（git log？TODO.md？Jira？）。输入来源不明确，输出就不稳定。
3. **忽略"不做什么"**：和写 Prompt 一样，skill 里也需要禁止项。比如 `/commit` 应该写"不要自动执行 git commit，只生成消息"。
4. **自定义名字和官方内置能力撞车**：比如把自己的命令命名成 `/debug`、`/loop`。先查 `/` 菜单里已有啥，避免冲突。

## 验收标准

学员能把一个重复任务封装成 skill 或 command，包含明确的任务说明、输入来源、输出格式和禁止事项，并知道 `SKILL.md` 是 skill 的必需入口文件。
