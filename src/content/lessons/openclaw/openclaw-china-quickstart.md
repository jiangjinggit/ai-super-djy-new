## 这节课你要拿到什么

- 服务器 + 模型 + 渠道的选型决策表（含国内/国外模型怎么选）
- 一条 30 分钟从零到环境就绪的最短路径
- 踩坑清单和社区资源

## 为什么需要单独一课

OpenClaw 官方默认 Telegram + OpenAI + DigitalOcean，国内用户直接照搬会踩三个坑：海外 API 不稳定、飞书/钉钉才是工作入口、国内模型更便宜且免翻墙。

## 推荐技术栈

| 组件 | 首选 | 备选 |
| --- | --- | --- |
| 服务器 | 阿里云轻量 / 腾讯云 Lighthouse | 自有 Mac Mini（合盖就断，慎用笔记本） |
| 主渠道 | 飞书 | 企业微信 / 钉钉 |

> 📖 [阿里云 — 轻量服务器部署 OpenClaw](https://help.aliyun.com/zh/simple-application-server/use-cases/quickly-deploy-and-use-openclaw)（一键部署 + 钉钉接入）
>
> 📖 [腾讯云 — Lighthouse 部署 OpenClaw 接入飞书](https://cloud.tencent.com/developer/article/2625073)（保姆级全流程）

## 模型怎么选

### 普通用户（无翻墙）→ 国内模型

免折腾、直连稳定，以下几个都是主流选择：

| 模型 | API Base URL | 适合 | 成本参考 |
| --- | --- | --- | --- |
| DeepSeek Chat | `https://api.deepseek.com/v1` | 日常首选，最便宜 | ¥1/百万 token 输入 |
| 通义千问 Qwen-Plus | `https://dashscope.aliyuncs.com/compatible-mode/v1` | 阿里云生态 | ¥0.8/千 token 输入 |
| Kimi (Moonshot) | `https://api.moonshot.cn/v1` | 长文本场景 | ¥12/百万 token |
| 豆包 | `https://ark.cn-beijing.volces.com/api/v3` | 中文对话流畅 | 按量计费 |

各模型在真实任务上的效果对比，见「大模型实战库」模块。

> 📖 [阿里云百炼 — OpenClaw 接入指南](https://help.aliyun.com/zh/model-studio/openclaw)（Qwen / DeepSeek / Kimi 多模型配置）

### 有翻墙 / 追求效果上限 → 国外顶尖模型

效果天花板目前是 Claude Opus 4.6 和 GPT-5.4，复杂推理、长文档分析、对外发布内容明显更强。

不想自己管海外支付的，可以用**国内中转站**（如 API2D、OpenRouter 国内镜像等），支持国内支付方式调用 Claude / GPT，配置方式和直连一样，填中转站的 Base URL 即可。

## 配置不用自己手写

OpenClaw 的配置文件（SOUL.md、AGENTS.md 等）看起来很多，但普通用户不需要从零手写。有两种更省力的方式：

**方式一：直接跟 OpenClaw 聊天**，用自然语言告诉它你要什么，它会自动写进配置文件：

```
"我想每天早上 8 点收到一条 AI 热点日报，推送到飞书，帮我配置好"
"把你的角色设定为我的工作助手，回答要简洁，不要废话"
"记住：我在上海，工作日是周一到周五，22 点之后不要打扰我"
```

**方式二：用 Claude Code 帮你配**，打开 OpenClaw 的配置文件夹，让 Claude Code 读取现有结构直接帮你写：

```bash
claude ~/Library/Application\ Support/OpenClaw  # macOS
claude %APPDATA%\OpenClaw                        # Windows
claude ~/.config/openclaw                        # Linux
```

然后告诉 Claude Code："帮我写一个 SOUL.md，我是独立开发者，需要监控 AI 行业动态，删除和外发操作必须先确认"。

> 后面每节课涉及配置的地方，都可以用这两种方式完成，不需要照着模板一行一行手写。

## 30 分钟快速路径

### 第 1 步：买服务器（5 分钟）

2 核 2G 轻量服务器即可。阿里云/腾讯云镜像市场搜 "OpenClaw" 可能有预装镜像，开机即用。

手动安装：

```bash
# 先配国内镜像，否则大概率超时
npm config set registry https://registry.npmmirror.com

npm install -g openclaw@latest
openclaw --version
```

### 第 2 步：配模型（5 分钟）

```bash
openclaw onboard --install-daemon
```

选 `Custom OpenAI-compatible`，填入上方任一模型的 Base URL 和 API Key。

### 第 3 步：接渠道（10 分钟）

按你的实际工作环境选一个：

**飞书（推荐，文档/多维表格联动最完整）**

1. [飞书开放平台](https://open.feishu.cn) → 创建企业自建应用
2. 添加「机器人」能力
3. 事件订阅选 Long connection，添加 `im.message.receive_v1`
4. 权限勾选：`im:message`、`im:message:send_as_bot`、`im:chat`
5. 发布应用，等审批通过

```bash
openclaw channels add
# 选 Feishu，填 App ID 和 App Secret
```

> 📖 [博客园 — 保姆级飞书对接教程](https://www.cnblogs.com/catchadmin/p/19556552)

**企业微信（腾讯云生态首选）**

```bash
openclaw skills install openclaw-wecom-channel
openclaw channels add
# 选 WeCom，填 Corp ID、Agent ID 和 Secret
```

> 📖 [腾讯云 — 企业微信接入全流程](https://www.tencentcloud.com/techpedia/139960)

**钉钉（阿里云生态）**

```bash
openclaw channels add
# 选 DingTalk，填 AppKey 和 AppSecret
```

> 没有企业账号的个人用户，可以先用 Telegram 验证流程跑通，再迁移到飞书/企微/钉钉。

### 第 4 步：验证（3 分钟）

```bash
openclaw gateway status  # 渠道状态应为 connected
```

在渠道里给机器人发"你好"，收到回复就算成功。

### 第 5 步：配第一个定时任务（5 分钟）

```json
{
  "cron": [{
    "pattern": "0 8 * * 1-5",
    "prompt": "按 AI 热点日报规则，抓取今日信息源，过滤整理后推送到飞书。",
    "timezone": "Asia/Shanghai"
  }]
}
```

手动触发测试：

```bash
openclaw run --prompt "按 AI 热点日报规则，抓取今日信息源，过滤整理后推送到飞书"
```

## 国内网络踩坑清单

| 问题 | 解法 |
| --- | --- |
| npm install 卡住 | `npm config set registry https://registry.npmmirror.com` |
| 模型 API 报错 | 检查 Base URL 是否填对，别直连 OpenAI |
| 飞书 Webhook 不通 | 检查安全组 443 端口出站规则 |
| ClawHub 技能装不上 | `git clone` 手动装，或挂代理 |

## 国内社区资源

| 资源 | 说明 |
| --- | --- |
| [OpenClaw 汉化版](https://github.com/1186258278/OpenClawChineseTranslation) | 中文 CLI + Dashboard，每小时同步官方仓库 |
| [DataWhale「哈喽！龙虾」](https://github.com/datawhalechina/hello-claw) | 体系化中文开源教程，从入门到架构 |
| [阿里云百炼接入指南](https://help.aliyun.com/zh/model-studio/openclaw) | 百炼 OpenAI 兼容接口 + 多模型配置 |
| [菜鸟教程 — OpenClaw](https://www.runoob.com/ai-agent/openclaw-clawdbot-tutorial.html) | 从 git clone 到 pnpm build 全流程 |
| [B站 — 保姆级部署教程](https://www.bilibili.com/video/BV1kH6nBFEPq/) | 多个视频，小白友好 |
| [36氪 — OpenClaw 深度分析](https://36kr.com/p/3671941309260675) | 国内开发者视角 |

## ✅ 本课落地动作

- 用国内模型跑通第一条回复
- 渠道接入成功（飞书/企微/钉钉 任选一个）
- 手动触发一次测试推送
