## 这节课你要拿到什么

一份按分类整理的 OpenClaw 核心资源合集。命令、配置、路径、权限、安装方式以官方文档和 GitHub 为准；社区内容只作为延伸阅读。

## 本课项目产物

| 产物 | 完成标准 |
| --- | --- |
| 官方核验清单 | 安装、渠道、Cron、Heartbeat、Skills、ClawHub、安全都能找到官方入口 |
| 社区资料分级 | 区分官方事实、云厂商教程、社区经验和个人文章，避免把经验当事实 |
| 问题排查入口 | 遇到失败时知道先查 FAQ、logs、status、GitHub Issues 还是平台官方文档 |

## 官方资源

| 资源 | 说明 |
| --- | --- |
| [OpenClaw 官方文档](https://docs.openclaw.ai/) | API 参考、配置指南、架构说明，遇到问题先查这里 |
| [GitHub 主仓库](https://github.com/openclaw/openclaw) | 源码、Issues、Release Notes |
| [ClawHub](https://clawhub.ai/) | 官方 registry，查看 skill/plugin 详情、版本、扫描状态 |
| [ClawHub 文档](https://docs.openclaw.ai/clawhub) | 搜索、安装、发布、审核和 CLI 区别 |
| [Discord 社区](https://discord.com/invite/clawd) | 官方交流、问题反馈 |

## 国内部署教程

| 资源 | 说明 |
| --- | --- |
| [阿里云 — 轻量服务器部署](https://help.aliyun.com/zh/simple-application-server/use-cases/quickly-deploy-and-use-openclaw) | 阿里云官方，含钉钉接入 |
| [腾讯云 — Lighthouse + 飞书全流程](https://cloud.tencent.com/developer/article/2625073) | 保姆级，含飞书机器人配置 |
| [阿里云百炼 — 国内模型接入](https://help.aliyun.com/zh/model-studio/openclaw) | Qwen / DeepSeek / Kimi 多模型配置 |
| [OpenClaw 安装文档](https://docs.openclaw.ai/install) | 官方安装器、Node 要求、npm/pnpm/bun 备选路径 |
| [OpenClaw Feishu 文档](https://docs.openclaw.ai/channels/feishu) | 飞书/Lark 接入命令、WebSocket、排错 |

## 中文社区资源

| 资源 | 说明 |
| --- | --- |
| [OpenClaw 汉化版](https://github.com/1186258278/OpenClawChineseTranslation) | 中文 CLI + Dashboard，每小时同步官方 |
| [DataWhale「哈喽！龙虾」](https://github.com/datawhalechina/hello-claw) | 体系化中文开源教程，从入门到架构 |

## 国际教程

| 资源 | 说明 |
| --- | --- |
| [OpenClaw Gateway](https://docs.openclaw.ai/gateway) | Gateway 控制平面、状态与运维入口 |
| [OpenClaw Multi-agent](https://docs.openclaw.ai/concepts/multi-agent) | 多 Agent 路由和分工概念 |
| [OpenClaw FAQ](https://docs.openclaw.ai/help/faq) | 状态检查、日志、doctor、常见问题 |

## 深度阅读

| 资源 | 说明 |
| --- | --- |
| [OpenClaw FAQ](https://docs.openclaw.ai/help/faq) | workspace、skills、memory、diagnostics 的官方口径 |
| [ClawHub Skill format](https://docs.openclaw.ai/clawhub/skill-format) | skill 包格式和元数据 |
| [ClawHub CLI](https://docs.openclaw.ai/clawhub/cli) | registry 直连 CLI 的命令与适用边界 |

## 安全资源

> ⚠️ OpenClaw 作为长期在线系统，安全问题不容忽视。以下资源对理解风险边界有帮助。

| 资源 | 说明 |
| --- | --- |
| [ClawHub 文档](https://docs.openclaw.ai/clawhub) | 扫描状态、报告、下架和审核机制 |
| [OpenClaw GitHub Security](https://github.com/openclaw/openclaw#security) | 官方安全模型与问题报告入口 |
| [OpenClaw FAQ](https://docs.openclaw.ai/help/faq) | 日志、状态、doctor、gateway 排错路径 |

## ✅ 使用建议

- 遇到问题：先查官方 FAQ / GitHub Issues，再查社区教程
- 安装技能前：先看 ClawHub 页面、源码、扫描状态、权限说明
- 部署国内环境：优先看 OpenClaw 官方安装文档、飞书文档和云厂商官方教程
- 深入架构：先看 Gateway / Multi-agent 官方文档，再看社区文章做补充
