## 这节课你要拿到什么

- 6 项部署验证清单
- 飞书 + 双通道路由的可执行配置
- 渠道故障排查速查表

> 安装命令和服务器配置在「中国用户快速上手」里，这节课只讲**验证部署完成**和**接入渠道**。

## 第一步：过 6 项验证清单

第一条回复不等于部署完成，至少要过这 6 项：

| 检查项 | 通过标准 | 命令 |
| --- | --- | --- |
| 进程存活 | 状态 running | `openclaw gateway status` |
| 模型可用 | 能收到回复 | 在渠道里发测试消息 |
| 渠道通畅 | 能收能发 | 双向测试 |
| 重启恢复 | 重启后仍正常 | `openclaw daemon restart` |
| 日志可见 | 能看到消息记录 | `openclaw logs --follow` |
| 控制台可用 | 能打开 | `openclaw dashboard` |

重启恢复这关特别容易漏：`openclaw daemon restart`，等 10 秒再发消息，还能回复才算过。

> 📖 macOS 用户：[Zilliz — How to Install OpenClaw on Mac](https://medium.com/@zilliz_learn/how-to-install-and-run-openclaw-on-mac-9cb6adb64eef)
>
> 📖 树莓派用户：[Raspberry Pi 官方 — 部署 OpenClaw](https://www.raspberrypi.com/news/turn-your-raspberry-pi-into-an-ai-agent-with-openclaw/)

## 第二步：接入渠道

### 渠道优先级

| 渠道 | 优先级 | 原因 |
| --- | --- | --- |
| 飞书 | 主渠道 | 消息 + 文档 + 多维表格，工作流最完整 |
| Telegram | 补充渠道 | 只用于少量强提醒 |
| 钉钉 | 特定场景 | 阿里云生态或已有钉钉组织的团队 |

先把飞书跑顺，再决定要不要补 Telegram。

### 飞书接入

飞书的完整接入流程（创建应用、事件订阅、权限、发布审批）在「中国用户快速上手」里已讲，这里只列关键命令：

```bash
openclaw channels add
# 选择 Feishu，填 App ID 和 App Secret

openclaw gateway status   # feishu 应为 connected
openclaw logs --follow    # 发消息后确认日志有收到
```

**测试双向通信**：私聊机器人发"你好"确认收到回复；再把机器人拉进测试群，@ 它发消息确认群内也能回。

### 飞书接入检查清单

| 检查项 | 通过标准 |
| --- | --- |
| 应用已发布并审批通过 | 状态显示「已上线」 |
| 事件订阅含 `im.message.receive_v1` | 事件列表里能看到 |
| 接收方式为 Long connection | 不是 HTTP 推送 |
| `openclaw gateway status` 正常 | feishu 状态为 connected |
| 私聊能收发 | 双向测试通过 |
| 群聊能收发 | @机器人后能回复 |

### 双通道路由（写进 AGENTS.md）

```markdown
## 消息路由

### 飞书承接
- 日报/周报/常规汇总
- 团队协作通知、项目提醒
- 需要文档或表格承接的内容

### Telegram 只做强提醒
- P1 级异常
- 日历冲突且 30 分钟内开始
- 来自指定 VIP 联系人的紧急消息

### 静默规则
- 22:00-08:00 不发常规通知
- 周末默认只发 P1
- 同一事项 2 次以上降级为摘要
```

### Telegram 接入

```bash
openclaw channels add
# 选择 Telegram，填入 Bot Token（从 @BotFather 获取）
```

### 钉钉接入要点

在[钉钉开放平台](https://open.dingtalk.com)创建企业内部应用 → 启用机器人 → 配置 Stream 模式 → `openclaw channels add` 选 DingTalk。

## 渠道故障排查

| 症状 | 先查 |
| --- | --- |
| 飞书完全收不到消息 | 应用未发布 / 事件未订阅 / Long connection 未启用 |
| 飞书能收不能发 | 缺 `im:message:send_as_bot` 权限 |
| 飞书群里不回复 | 机器人未加入群或群设置禁止机器人发言 |
| 两个渠道都收不到 | 先查进程和模型，不要先怪渠道 |

## ✅ 本课落地动作

- 6 项验证清单全部通过
- 飞书渠道接入成功，双向通信测试通过
- 把消息路由规则写进 AGENTS.md
