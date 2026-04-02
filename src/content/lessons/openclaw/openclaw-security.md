## 这节课你要拿到什么

- 长期在线系统的 4 类风险边界
- 确认矩阵模板
- 每周巡检框架

## 长期在线 ≠ 短期实验

短期实验出错损失一次时间。长期在线系统出错，可能持续刷屏、持续烧钱、持续外发错误信息、持续暴露敏感数据。

> 安全必读：
> - [Adversa AI — OpenClaw Security 101](https://adversa.ai/blog/openclaw-security-101-vulnerabilities-hardening-2026/)（CVE、供应链风险、加固建议）
> - [Microsoft Security Blog — 安全运行 OpenClaw](https://www.microsoft.com/en-us/security/blog/2026/02/19/running-openclaw-safely-identity-isolation-runtime-risk/)（身份、隔离、运行时风险）
> - [Kaspersky — OpenClaw 漏洞曝光](https://www.kaspersky.com/blog/openclaw-vulnerabilities-exposed/55263/)（512 个漏洞审计报告）

## 守住 4 类边界

| 边界 | 要求 |
| --- | --- |
| 密钥 | 渠道 Token、模型 Key、服务器登录信息分开管理 |
| 行为 | 删除、外发、改配置、写数据库必须确认 |
| 能力 | 共享技能和场景专用技能隔离 |
| 成本 | 日志、额度、失败任务、闲置节点定期看 |

## 确认矩阵

```text
必须确认：删除文件、对外发送、修改生产配置、新增高权限技能
先告知再执行：新建日程、修改内部文档、发飞书群常规日报
可自主执行：公开信息搜索、摘要整理、daily notes 记录
```

## 每周巡检

| 巡检项 | 频率 |
| --- | --- |
| 模型成本和调用量 | 每周 |
| 失败任务和报错日志 | 每周 |
| 闲置技能和闲置节点 | 每两周 |
| 密钥和管理员权限 | 每月 |

## 本课落地动作

- 写出 1 份必须确认动作清单
- 检查密钥和管理员信息有没有混放
- 做 1 次日志和额度巡检
