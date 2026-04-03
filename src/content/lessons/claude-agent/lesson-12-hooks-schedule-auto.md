## 学习目标

- 理解 Hooks 是事件系统，而不只是一两个前后置回调
- 学会配置 Hook（以钉钉通知为例）
- 分清 `/schedule`、Desktop scheduled tasks、`/loop` 三种调度方式
- 了解四个可落地的自动化场景及其实现方式
- 理解 Auto Mode 的适用边界
- 规划从手动到自动的四阶段路径

## 适合谁

- 已经能稳定使用 Claude Code 完成任务，想减少重复操作的开发者
- 希望建立自动化巡检、通知、审查流程的团队
- 想让 Claude Code 在后台自动完成低风险重复任务的效率追求者

## 前置条件

- 已完成安全边界配置（第 11 课），理解权限控制
- 熟悉 Skill/Command 编写
- 有至少一个已验证可靠的重复性工作流程
- 了解基本的 bash 脚本和 JSON 配置

## 核心知识

### Hooks：把关键节点自动化

Hooks 是官方公开能力，允许你在特定时机自动插入检查、通知、后处理。

常用事件先记这几类：

| 事件 | 触发时机 | 使用场景 |
|------|---------|---------|
| `SessionStart` | 会话开始或恢复时 | 注入启动上下文、设置环境变量 |
| `UserPromptSubmit` | 用户提交 prompt 后、Claude 处理前 | 拦截危险请求、补上下文 |
| `PreToolUse` | 工具调用前 | 权限检查、危险操作拦截 |
| `PostToolUse` | 工具成功后 | 结果验证、通知发送、后处理 |
| `Notification` | Claude 发送通知时 | 转发到钉钉/飞书/Slack |

真正要点：
- Hook 输入不是靠环境变量拼字符串，而是 Claude Code 把 JSON 通过 `stdin` 传给你的脚本
- 能不能拦截，取决于事件本身是否支持 decision control；`PreToolUse` 可以拦，`PostToolUse` 更适合记录和通知

**配置 Hook 示例（钉钉通知）：**

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{
          "type": "command",
          "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/notify-dingtalk.sh"
        }]
      }
    ]
  }
}
```

```bash
#!/bin/bash
# .claude/hooks/notify-dingtalk.sh
payload=$(cat)
tool_name=$(printf '%s' "$payload" | jq -r '.tool_name')
command=$(printf '%s' "$payload" | jq -r '.tool_input.command // ""')

node scripts/notify-dingtalk.js "$tool_name" "$command"
```

### `/schedule`、Desktop Scheduled Tasks、`/loop`：三种调度层

适合被调度的任务有三个特征：
- 输入来源稳定
- 输出格式固定
- 失败代价可控

三者不要混用概念：

| 方式 | 跑在哪 | 是否跨重启保留 | 更适合什么 |
|------|------|---------------|-----------|
| `/schedule` | Anthropic Cloud | 是 | 云端仓库、长任务、你电脑关机也要继续跑 |
| Desktop scheduled tasks | 你的机器 | 是 | 需要本地文件、桌面端工具、Cowork 工作区 |
| `/loop` | 当前 Claude Code 会话 | 否 | 会话内轮询、短期观察、临时提醒 |

优先考虑这几类任务：
- PR / Issue 巡检
- 周报 / 日报生成
- 文档一致性检查
- 依赖更新预审
- 长任务状态轮询

### 四个可落地的自动化场景

**场景 A：会话内轮询长任务（`/loop`）**

```text
/loop 20m 检查当前部署是否完成；如果完成，告诉我结果和下一步建议
```

适合：
- 等部署完成
- 等长测试结束
- 临时盯一个 PR / 工单状态

不适合：
- 你关掉会话后还要继续跑的任务

**场景 B：云端定时任务（`/schedule`）**

```text
/schedule 每个工作日早上 9 点检查 github 上这个仓库新增的 issue，
按严重程度总结并发我一份优先级清单
```

适合：
- GitHub / Jira / Slack / Connector 型输入
- 需要跨重启保留
- 不依赖你本机私有文件的任务

注意：
- `/schedule` 是 Cloud scheduled tasks，不是本地 CLI 里的循环器
- 它更接近“长期后台任务”，不是“当前终端里每 5 分钟跑一次”

**场景 C：Desktop / Cowork 定时任务**

场景：你需要每周五整理本地 `reports/`、`docs/`、`meeting-notes/` 目录，生成一份周总结。

这类任务更适合 Desktop scheduled tasks，因为它要访问：
- 你机器上的本地文件
- 桌面端配置过的工具和连接器
- Cowork Project 里的持续上下文

前提约束：
- 电脑保持唤醒
- Claude Desktop 保持打开
- 输出要定期复查

**场景 D：Auto Mode 处理长任务**

当任务经过验证、权限边界清楚、你又不想频繁点确认时，可以尝试 Auto Mode。

适合 Auto Mode：
- 大量安全读操作
- 已验证过的重构套路
- 标准化日报、巡检、整理任务

不适合 Auto Mode：
- 首次尝试的新流程
- 涉及生产环境、数据库、敏感配置
- 你还没准备好 diff review 和回退机制的时候

### 新手自动化四阶段路径

| 阶段 | 做什么 | 关键点 |
|------|--------|--------|
| 阶段 1 | 手动触发，自己输入命令 | 验证任务流程可靠 |
| 阶段 2 | 做成 skill 或 slash command | 一句话触发已验证流程 |
| 阶段 3 | 交给 `/loop`、`/schedule` 或 Desktop scheduled tasks | 根据“是否需要本地文件、是否要跨重启”选调度层 |
| 阶段 4 | 低风险重复任务尝试 auto mode | 前提是已有 diff review 和回退机制 |

**永远不要**：跳过手动验证阶段直接搞全自动化。没有验证过的流程自动化后出问题，排查成本是手动的十倍。

## Demo

选一个你每周都手动做的重复任务，先做成 skill，再决定它更适合 `/loop`、`/schedule` 还是 Desktop scheduled tasks。

示例：把"每周五检查 lint 警告"做成自动化

```text
# 第一步：手动验证流程
读取当前 lint 报告，列出所有警告，按文件分组

# 第二步：做成 command
# .claude/commands/lint-check.md
# 读取当前项目的 lint 报告，列出所有警告，按文件分组，输出到 reports/lint-$(date +%Y%m%d).md

# 第三步：选调度层
# 只在当前会话盯着看：/loop 1h /lint-check
# 需要长期后台跑且不依赖本地文件：/schedule ...
# 需要本地 reports/ 目录：放到 Desktop scheduled tasks
```

## 作业

1. 为你的项目配置一个 `PostToolUse` Hook，在 Bash 命令执行后记录日志到文件；注意从 `stdin` 读取 JSON
2. 列出你工作中符合"输入稳定、输出固定、失败代价可控"的 3 个重复任务
3. 选其中一个，按四阶段路径完成阶段 1（手动验证）和阶段 2（做成 skill）
4. 判断这个任务更适合 `/loop`、`/schedule`，还是 Desktop scheduled tasks，并写出理由

## 常见误区

- **误区 1：跳过手动验证直接自动化**。没验证过的流程自动化后出问题，排查成本是手动的十倍。
- **误区 2：把 Auto Mode 用在新流程上**。Auto Mode 只适合已验证、低风险、有回退机制的任务。
- **误区 3：Hooks 配太多导致干扰**。每个 Hook 都有执行成本，只在真正需要的节点加。
- **误区 4：把 `/schedule` 当成一切调度能力的总称**。Cloud、Desktop、`/loop` 的边界不同，选错了就会发现拿不到本地文件，或关掉会话任务就消失。
- **误区 5：认为自动化 = 不用管了**。自动化是减少重复操作，不是消除监督。定期检查输出质量。

## 验收标准

- [ ] 能说出至少 4 个常用 Hook 事件及其使用场景
- [ ] 能写出一个完整的 Hook 配置 JSON，并知道输入从 `stdin` 读取
- [ ] 能说出 `/schedule`、Desktop scheduled tasks、`/loop` 的区别
- [ ] 能描述四个自动化场景（轮询/云端调度/桌面定时/Auto Mode）的实现思路
- [ ] 能说出 Auto Mode 适合和不适合的场景
- [ ] 理解四阶段自动化路径，能说出自己当前处于哪个阶段
- [ ] 已将至少一个重复任务做成 skill 或 command
