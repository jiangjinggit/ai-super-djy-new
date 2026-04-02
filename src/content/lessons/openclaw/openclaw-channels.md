## 这节课你要拿到什么

- 飞书接入的完整操作路径
- 双通道消息路由配置
- 渠道故障排查表

## 中国用户的渠道优先级

| 渠道 | 优先级 | 原因 |
| --- | --- | --- |
| 飞书 | 主渠道 | 消息 + 文档 + 知识库 + 多维表格 + 机器人，工作流最完整 |
| 钉钉 | 特定场景 | 阿里云生态用户、已有钉钉组织的团队 |
| 企业微信 | 特定场景 | 客户触达、销售场景 |
| Telegram | 补充渠道 | 仅用于少量强提醒 |

默认策略：先把飞书跑顺，再决定要不要补 Telegram。

## 飞书接入全流程

### 1. 创建飞书应用

1. [飞书开放平台](https://open.feishu.cn) -> 创建企业自建应用
2. 记下 App ID 和 App Secret

### 2. 启用机器人 + 配置事件

1. 添加「机器人」能力
2. 事件订阅选 Long connection（不要选 HTTP 推送，配置复杂且容易断）
3. 添加事件：`im.message.receive_v1`

### 3. 配置权限

```text
im:message              # 读取消息
im:message:send_as_bot  # 以机器人身份发消息
im:chat                 # 读取群信息
contact:user.id:readonly # 读取用户 ID
```

### 4. 发布并接入

发布应用 -> 等管理员审批 -> 在 OpenClaw 里接入：

```bash
openclaw channels add  # 选 Feishu，填 App ID 和 App Secret
openclaw gateway status  # feishu 状态应为 connected
```

### 5. 测试

- 私聊机器人发"你好"，确认收到回复
- 把机器人拉进测试群，@机器人发消息，确认群内也能回复

## 飞书接入检查清单

| 检查项 | 通过标准 |
| --- | --- |
| 应用已发布并审批通过 | 状态「已上线」 |
| 事件订阅包含 im.message.receive_v1 | 有 |
| 接收方式为 Long connection | 有 |
| 权限已全部授权 | 无待审批项 |
| openclaw gateway status 正常 | connected |
| 私聊和群聊都能收发 | 有 |

## 双通道消息路由（写进 AGENTS.md）

```markdown
## 消息路由

### 飞书承接
- 日报/周报/常规汇总
- 团队协作通知/项目提醒
- 需要文档沉淀或表格承接的内容

### Telegram 只做强提醒
- P1 级异常（系统不可用、重大客户投诉）
- 日历冲突且 30 分钟内开始
- 来自指定 VIP 联系人的紧急消息

### 静默规则
- 22:00-08:00 不发常规通知
- 周末默认只发 P1
- 重复提醒 2 次以上自动降级为摘要
```

## 飞书 Webhook 快速发消息

不走 OpenClaw 渠道，直接往飞书群发消息：

```bash
curl -X POST 'https://open.feishu.cn/open-apis/bot/v2/hook/你的webhook地址' \
  -H 'Content-Type: application/json' \
  -d '{"msg_type":"text","content":{"text":"测试消息"}}'
```

## 渠道故障排查

| 症状 | 排查命令 | 常见原因 |
| --- | --- | --- |
| 完全收不到消息 | `openclaw gateway status` | 应用未发布、事件未订阅 |
| 能收不能发 | `openclaw logs --follow` | 缺少 send_as_bot 权限 |
| 群里不回复 | 检查群权限 | 机器人未加入群 |
| 两个渠道都收不到 | `openclaw gateway status` | 先查主服务和模型 |

## 本课落地动作

- 完成飞书接入并通过检查清单
- 写出消息路由规则并写进 AGENTS.md
- 用 Webhook 成功发送 1 条测试消息
