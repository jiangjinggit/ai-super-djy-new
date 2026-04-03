## 学习目标

- 在自己的环境里完成 Claude Code 安装
- 配好工作目录、Project 权限和权限模式
- 跑通第一个真实验证任务

## 适合谁

所有准备开始使用 Claude Code 或 Cowork 的用户。

## 前置条件

完成第 1 课，已经知道自己应该先学 CLI 还是 Cowork。

## 核心知识

### 路径 A：Claude Code CLI

前提条件：macOS / Linux / Windows，Claude 订阅账号或 Anthropic Console 账号。Windows 还需要先安装 Git for Windows。

```bash
# macOS / Linux / WSL（官方推荐）
curl -fsSL https://claude.ai/install.sh | bash

# Windows PowerShell（官方推荐）
irm https://claude.ai/install.ps1 | iex

# Homebrew 备选
brew install --cask claude-code

# Windows（官方推荐之一）
winget install Anthropic.ClaudeCode

# 启动
claude
```

说明：
- Native install 是当前官方推荐路径，会自动更新
- Homebrew / WinGet 可以用，但需要你自己定期升级
- 旧的 npm 全局安装路径已经不是当前默认推荐方案

第一次启动后：完成登录 → 进入你的项目目录 → 运行 `claude` 进入交互模式。

### 路径 B：Desktop / Web / Cowork

先把三个入口分清：

1. **Claude Desktop**：本地桌面端，适合本地仓库、可视化 diff、桌面端调度
2. **Claude Code on the Web (`claude.ai/code`)**：云端会话，适合远程仓库和长任务，不等于 Cowork
3. **Cowork**：运行在 Claude Desktop 里的研究预览功能，偏知识工作流，不在普通 Web 入口里

如果你要用 Cowork，先确认两件事：
- 你在用最新版 Claude Desktop
- 你的账号计划支持 Cowork（当前是付费计划研究预览）

### 三件事先做好

**配置 1：设置工作目录（CLI）**

```bash
# 好习惯：进项目目录后再启动
cd /your/project/path
claude
```

**配置 2：设置 Project 和文件夹权限（Cowork / Desktop）**

第一次设置建议：先用一个不重要的测试文件夹练手；Global Instructions 里写"没有我的确认，不要删除任何文件"；第一周只做读取和分析任务。

**配置 3：理解权限模式**

| 模式 | 行为 | 适合谁 |
|------|------|--------|
| `default` | 可直接读文件；编辑、命令、网络等会继续询问 | 新手第一周、敏感任务 |
| `acceptEdits` | 自动接受普通文件编辑；受保护目录仍不会自动通过 | 已验证的日常改动 |
| `plan` | 只调研、读文件、给方案；不会改源码 | 高风险改动前 |
| `auto` | 大多数动作可自动执行，并带后台安全检查 | 长任务、已验证流程 |
| `dontAsk` | 只有预先放行的工具能运行，其他一律拒绝 | 严格受控环境 |
| `bypassPermissions` | 几乎所有动作都可执行，但受保护目录仍有限制 | 仅限隔离环境 |

补充：
- `auto` 需要显式启用，而且并非所有计划/模型都可用
- Claude Code on the Web 的云端会话，当前可选模式比本地 CLI/桌面更少，不要把本地权限经验直接套过去

## Demo

### CLI 验证任务（⏱ 10 分钟）

进入你自己的一个真实项目目录，输入：

```
帮我读一下这个项目的结构，告诉我：
1. 主要目录有什么
2. 入口文件在哪
3. 你觉得这个项目在做什么
先别改任何东西，只是告诉我你的理解。
```

### Desktop / Cowork 验证任务（⏱ 10 分钟）

找一个包含 5-10 个文档的真实工作文件夹，让它：

```
读取这个文件夹里的文件，整理成一份要点清单：
每个文件的核心内容是什么，不要超过 3 句话。
先报告你读到了哪些文件，再给出汇总。
```

观察：它读文件准确吗？分析结果具体吗？有没有"瞎猜"的内容？

## 作业

完成上面任意一个验证任务，截图保存，记下你觉得"它做得很好"和"它不太对"的地方各一条。

## 常见误区

1. **还没分清 CLI、本地桌面、云端 web session 的差别**就开始用
2. **一上来就开高权限或 auto mode**，没建立回退习惯
3. **在错误目录里启动 Claude**，导致它读了不该读的项目
4. **不看额度就拿大仓库硬跑**，一开始优先用小任务验证

## 验收标准

学员能在真实目录里完成一次只读分析任务，并说出权限模式的基本区别。
