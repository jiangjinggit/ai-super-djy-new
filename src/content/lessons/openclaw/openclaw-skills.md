## 这节课你要拿到什么

- 技能安装、验证、管理的完整路径
- 按场景组合技能的推荐表
- 写自定义技能的最小模板
- Skill 和 Node 的区别及使用判断

## 本课项目产物

| 产物 | 完成标准 |
| --- | --- |
| 场景技能组合清单 | 为 1 个真实场景选出 3-5 个技能，并说明每个技能的用途 |
| 安装验证记录 | 每个技能至少用 `openclaw run --prompt` 做 1 次真实测试 |
| 自定义 SKILL.md 草案 | 写清 description、inputs 和 safety，避免只写能力宣传 |
| Node 判断记录 | 列出 1 个更适合 Node 的任务，并标出最小权限 |

## 技能的 4 类分法

| 类型 | 作用 | 典型技能 |
| --- | --- | --- |
| 输入类 | 获取外部信息 | email、calendar、web-search、rss |
| 动作类 | 执行外部操作 | send-message、create-event、browser |
| 整理类 | 处理和组织信息 | summarize、classify、extract |
| 自动化类 | 被 Heartbeat/Cron 触发后组合执行 | 自定义技能 |

> 技能市场：[ClawHub](https://clawhub.ai/)（官方 registry，安装前检查版本、源码、扫描状态和权限声明）
>
> 精选推荐：[Awesome OpenClaw Skills](https://github.com/voltAgent/awesome-openclaw-skills)（社区精选，分类清晰）
>
> 📖 [ClawHub 官方文档](https://docs.openclaw.ai/clawhub)（搜索、安装、发布、审核和 CLI 区别）

## 安装和验证

```bash
# 查看已安装技能
openclaw skills list

# 从 ClawHub 安装
openclaw skills install web-search
openclaw skills install email calendar reminder

# 安装完立刻验证
openclaw run --prompt "用 web-search 搜索今天的科技新闻"

# 报错时看日志
openclaw logs --follow
```

### 3 个安装位置

| 位置 | 路径 | 适合 |
| --- | --- | --- |
| OpenClaw 安装 | `openclaw skills install <slug>` | 安装到当前 OpenClaw workspace |
| ClawHub CLI | `clawhub install <slug>` | registry 直连工作流，默认下载到当前目录 `./skills` |
| 工作区目录 | `<workspace>/skills/` | 场景专用 |
| 全局目录 | `~/.openclaw/skills/` | 多工作区共用 |

原则：场景专用的放工作区，通用的放全局，不确定的先放工作区。

## 按场景选技能组合

| 场景 | 最小组合 | 安装命令 |
| --- | --- | --- |
| 每日早报 | email + calendar + reminder | `openclaw skills install email calendar reminder` |
| 内容监控 | web-search + browser + reminder | `openclaw skills install web-search browser reminder` |
| 客服/运营提醒 | web-search + reminder | `openclaw skills install web-search reminder` |

## 安全提醒

ClawHub 是开放 registry，第三方技能和插件的安全性不能只看名字或下载量。

安装前必须做的 4 件事：

1. 检查发布者、版本、最近更新时间和源码
2. 看 SKILL.md 里声明的权限是否合理
3. 查看 ClawHub 页面上的扫描状态和说明
4. 高风险能力先装到隔离 workspace 里测试

```bash
openclaw skills search <keyword> # 安装前搜索和对比
openclaw skills path <skill-name> # 安装后查看源码位置
```

> 安全事实以 [ClawHub 官方文档](https://docs.openclaw.ai/clawhub) 和 GitHub Security 入口为准；社区安全文章只能作为线索，不作为课程事实依据。

## 写自定义技能

同时满足 3 条再写：每周都在重复、现有技能覆盖不了、输入输出已经讲得清。

最小 SKILL.md 模板：

```markdown
# skills/feishu-daily-report/SKILL.md

## name
feishu_daily_report

## description
当系统需要把日报发送到飞书群时使用。
输入应包含标题、摘要、重点事项。
发送失败时返回明确错误，不自动重试超过 1 次。

## inputs
- title: 日报标题
- summary: 内容摘要
- highlights: 重点事项列表

## safety
- 只允许向授权飞书机器人或群发送
- 未明确目标群时必须确认
```

description 是最关键的字段，模型靠它决定什么时候调用。写成边界说明，不要写成广告词。

## 技能故障排查

| 症状 | 常见原因 |
| --- | --- |
| 完全不触发 | description 太模糊 |
| 被乱用 | 和其他技能的 description 职责重叠 |
| 执行报错 | 权限、环境变量、外部接口问题 |
| 能跑但结果不对 | 输入字段设计太弱 |

## Nodes：设备级扩展

### Skill 是工具，Node 是远程手脚

| | Skill | Node |
| --- | --- | --- |
| 类比 | 给 Agent 加一个工具 | 给 Agent 加一只远程手 |
| 适合 | 调用 API 接口 | 控制另一台设备或环境 |
| 例子 | 搜索、发消息、读日历 | 浏览器登录态操作、截图、文件访问 |

### 上 Node 之前先问 3 个问题

1. 这是不是设备能力，而不是普通接口调用？
2. 这台设备有没有必要和主服务器隔离？
3. 最小读写权限能不能说清？

答不清就别扩，先把 Skill 和工作区边界整理好。

### 节点设计原则

- 一个节点只承担一类主要能力
- 高风险节点单独隔离
- 先跑通单节点，再谈多节点协作
- 明确哪些动作只读、哪些能写

## ✅ 本课落地动作

- 按场景安装 1 组技能组合（3-5 个）
- 每个技能用 `openclaw run --prompt` 做 1 次真实测试
- 写 1 个最简单的自定义技能 SKILL.md
- 列出 1 个更适合 Node 而不是 Skill 的任务，标出最小权限
