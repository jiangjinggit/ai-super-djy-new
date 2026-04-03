## 学习目标

- 理解 MCP 是什么：Anthropic 推动的开放协议，不等于“只能本地跑的插件”
- 了解已有的官方/社区 MCP 服务器生态
- 掌握配置 MCP 的基本步骤，能独立接入一个 MCP 并验证

## 适合谁

已经能稳定使用 Claude Code 完成任务的用户，想把 Claude 接入自己常用的外部工具（GitHub、Slack、数据库、浏览器等）。

## 前置条件

- 完成第 4-7 课，已经掌握核心工作流和 skill 封装
- 知道自己最常用的工具栈（第 1 课作业里写过）

## 核心知识

### MCP 是什么

MCP（Model Context Protocol）是 Anthropic 开发的开放协议，让 Claude 可以通过标准化接口连接外部工具和数据源。

你可以把它理解成：**Claude 的工具接入协议**。它有多种 transport：
- **HTTP**：当前官方推荐，适合远程云服务
- **stdio**：本地进程，适合文件系统、数据库、脚本工具
- **SSE**：还支持，但已是过渡方案，能用 HTTP 就优先 HTTP

### 已有官方/社区 MCP 服务器列表

| 工具 | 能做什么 |
|------|---------|
| Filesystem | 读写指定路径的文件（超越默认工作目录） |
| GitHub | 读 PR、Issues、代码，评论或创建事项 |
| Slack | 读写消息频道，发送通知 |
| Notion | 读写 Notion 页面和数据库 |
| 飞书/钉钉 | 读写消息、文档（社区实现） |
| Browser（Playwright） | 打开网页、截图、操作浏览器 |
| PostgreSQL / MySQL | 执行 SQL 查询 |
| Google Drive / Sheets | 读写云端文件 |

### 配置 MCP 的基本步骤

1. 确认你想接入的工具有 MCP 服务器（搜索 `mcp server [工具名]`）
2. 先判断 transport：远程服务优先 HTTP；本地工具再用 stdio；SSE 只有在服务器只提供 SSE 时才用
3. 在 Claude Code 里用 `claude mcp add ...` 添加服务器
4. 如果需要认证，用 `/mcp` 完成 OAuth 或检查状态
5. 用 `claude mcp list` 或 `/mcp` 验证连接

**配置示例（Claude Code CLI）：**

```bash
# 远程 HTTP server（官方推荐）
claude mcp add --transport http notion https://mcp.notion.com/mcp

# 本地 stdio server
claude mcp add --transport stdio filesystem -- \
  npx -y @modelcontextprotocol/server-filesystem /你/的/工作目录

# 查看当前已配置的 server
claude mcp list

# 在 Claude Code 会话内检查状态 / 完成认证
/mcp
```

### 最值得先接入的 3 个 MCP

**1. Filesystem MCP（开发者和知识工作者都推荐）**

最实用的第一步，让 Claude 可以读写你指定目录里的所有文件，不再受单一工作目录限制。它通常走本地 stdio transport。

**2. GitHub MCP（开发者必装）**

直接在 Claude 里完成 PR review、Issue 整理、代码搜索，不用来回切换界面。当前官方示例也优先用远程 HTTP 方式接 GitHub。

**3. Browser/Playwright MCP（研究和运营人员推荐）**

让 Claude 可以打开网页、截图、提取内容，用于竞品调研、数据采集、自动化测试。

### MCP 使用注意事项

- **不要把所有 MCP 都理解成“本地插件”**：远程 HTTP server 很常见，也是当前官方推荐 transport
- **stdio 和 HTTP 的运行方式不同**：stdio server 作为本地进程运行；HTTP server 则依赖远端服务可用
- **权限最小化**：给 MCP 服务器的权限要最小化，只开放你真正需要的目录/资源
- **Token 保管**：连接外部服务（GitHub、Slack）的 MCP 需要 Access Token，妥善保管，不要明文放在代码仓库里
- **SSE 已过渡**：如果服务同时支持 HTTP 和 SSE，优先选 HTTP

## Demo

### 接入 1 个最常用 MCP 并完成小任务

以 Filesystem MCP 为例：

**第一步**：添加配置

```bash
claude mcp add --transport stdio filesystem -- \
  npx -y @modelcontextprotocol/server-filesystem /Users/你的用户名/Documents/工作文件夹
```

**第二步**：确认 server 已添加

```bash
claude mcp list
```

**第三步**：在 Claude Code 里验证连接

```
请列出我工作文件夹里的所有文件和目录。
```

如果它能正确列出文件，说明 MCP 已经生效。

**第四步**：完成一个小任务

```
读取工作文件夹里的"会议纪要"目录，
把本周的所有会议纪要整理成一份要点清单。
```

## 作业

选一个你最常用的工具，找到对应 MCP 服务器，尝试接入并完成一个小任务验证：

1. 确认你想接入的工具（GitHub、Slack、Notion、文件系统等）
2. 搜索对应的 MCP 服务器，阅读安装文档
3. 按步骤配置并验证（CLI 用 `claude mcp add`，认证用 `/mcp`）
4. 用一个简单任务验证是否生效
5. 记录遇到的问题和解决方法

## 常见误区

1. **给 MCP 过大权限**：Filesystem MCP 只开放你需要的目录，不要开放整个硬盘。GitHub MCP 的 Token 只给必要的 scope，不要给 admin 权限。权限最小化是安全底线。
2. **Token 明文放在代码里**：Access Token 不要写在项目代码仓库里，用环境变量或专门的密钥管理工具。一旦 Token 泄漏，立即撤销并重新生成。
3. **把 transport 选反了**：远程服务硬接 stdio，或者明明有 HTTP 还去用 SSE。先看服务器支持什么，再选最稳的 transport。
4. **以为 MCP 只有一种运行方式**：有些 server 跑在你本机，有些是远程 HTTP 服务。别把“本地要保持进程运行”和“远程服务可用”混成一个概念。

## 验收标准

学员能独立接入 1 个 MCP 并验证是否生效：能说出配置步骤、能完成一个通过 MCP 执行的小任务、能解释权限最小化的原则。
