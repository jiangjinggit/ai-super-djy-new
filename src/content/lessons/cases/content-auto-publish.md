## 学习目标

- 搭出一套 OpenClaw 驱动的内容自动化流水线：定时选题 → AI 写稿 → 推送审核 → 发布
- 掌握 Cron 任务配置、web-search skill 接入、飞书频道推送的完整配置
- 知道哪些平台可以自动发布（微信公众号），哪些不行（小红书），以及替代方案

## 适合谁

- 有固定内容方向的自媒体创作者（公众号、行业资讯、知识博主）
- 想把"每天选题、写稿、发布"这条重复链路自动化的内容运营
- 已完成 OpenClaw 实战模块，想用到真实场景的人

## 前置条件

- OpenClaw 已部署并能正常运行（服务器 + 国内模型已配置）
- 飞书已接入 OpenClaw（飞书机器人可以收发消息）
- 有至少一个内容方向（主题垂类），不要求有大量粉丝

---

## 主工具路径

| 环节 | 工具 | 说明 |
|------|------|------|
| 定时触发 | OpenClaw Cron | 每天固定时间触发内容生产 |
| 选题素材搜集 | OpenClaw web-search skill | 抓取竞品、热词、近期评论 |
| AI 写稿 | OpenClaw + DeepSeek/Kimi | 基于素材生成初稿 |
| 内容推送审核 | 飞书频道机器人 | 初稿推送到审核频道，人工确认 |
| 最终发布 | 微信公众号 API（可选） | 确认后通过 HTTP skill 发布 |

**平台说明**：
- 微信公众号：有官方 API，可自动发布，但需要认证服务号（粉丝 ≥ 2000 或已认证）
- 小红书：无官方 API，不能自动发布，只能生成内容后手动复制发布
- 飞书频道：全流程最顺，推荐作为内容中转和团队协作的核心

---

## 完整操作步骤

### Step 1：安装 web-search skill

在服务器上执行：

```bash
# 进入 OpenClaw 技能目录
cd ~/.openclaw/skills/

# 从 ClawHub 安装 web-search
openclaw skill install web-search

# 验证安装
openclaw skill list | grep web-search
```

验证方式：在飞书或 Telegram 里@机器人发"搜索今天 AI 热点"，看是否能返回结果。

---

### Step 2：配置 SOUL.md（内容创作角色）

打开 `~/.openclaw/SOUL.md`，添加内容创作相关的规则：

```markdown
## 内容创作规则

### 内容定位
我的内容垂类是：[填写你的垂类，如：AI 工具、职场效率、电商运营]
目标读者：[描述你的读者，如：25-35 岁互联网从业者，关注工作效率]
内容风格：[描述你的风格，如：实用干货、有案例、不说废话]

### 内容生产规范
- 选题：优先来自近 48 小时内的热点或评论区高频问题
- 标题：必须有具体数字或结论，不能用纯疑问句
- 正文：先给结论，后给依据；每段不超过 100 字
- 禁止：AI 味过重的表达（"首先、其次、综上所述"）、纯理论没有案例

### 初稿输出格式
每次生成内容按以下格式输出：
---
【选题】（一句话）
【目标读者】（一句话）
【标题选项】（3 个备选）
【正文初稿】（600-1000 字）
【公众号推文建议标签】（3-5 个）
---
```

---

### Step 3：配置 AGENTS.md（内容生产工作流）

打开 `~/.openclaw/AGENTS.md`，添加内容生产流程：

```markdown
## 内容自动化流程

### 每日选题搜集（Cron 触发）

**信息源清单**（无翻墙可访问）：
- 36氪（https://36kr.com/）：商业和科技热点
- 少数派（https://sspai.com/）：效率工具新品
- 虎嗅（https://www.huxiu.com/）：深度行业分析
- 微信指数（通过搜索接口）：热词趋势

**选题过滤规则**：
- 保留：发布 48 小时内、与[你的垂类]相关、有具体数据或案例
- 过滤：广告软文、纯转载无新意、与垂类无关

**内容生产后输出**：
- 推送到飞书"内容审核"频道
- 消息格式：包含选题 + 初稿 + 3 个标题备选
- 同时在 daily notes 记录本次选题角度

### 发布确认规则
- 人工在飞书里回复"发布"：触发微信公众号 API 发布
- 人工回复"修改"+ 意见：AI 重新修改后再推送
- 未回复超过 6 小时：不自动发布，记录到 daily notes 待处理
```

---

### Step 4：配置 Cron 定时任务

打开 `~/.openclaw/openclaw.json`，添加 Cron 配置：

```json
{
  "cron": [
    {
      "pattern": "0 8 * * 1-5",
      "prompt": "执行内容选题：根据 AGENTS.md 的信息源清单，搜集今日相关热点，按过滤规则筛选，然后基于最优选题生成内容初稿，推送到飞书内容审核频道",
      "timezone": "Asia/Shanghai"
    }
  ]
}
```

**说明**：
- `0 8 * * 1-5`：周一到周五，每天上午 8:00 触发
- `timezone: Asia/Shanghai`：必须设置，否则按 UTC 会变成 16:00 触发
- 周末不触发，如需周末生产内容改为 `0 8 * * *`

---

### Step 5：配置微信公众号自动发布（可选）

> 前提：必须是已认证的微信服务号，或粉丝数 ≥ 2000 的订阅号（申请认证）

**Step 5.1：获取公众号 API 凭证**
1. 登录微信公众平台（mp.weixin.qq.com）
2. 开发 → 基本配置 → 获取 AppID 和 AppSecret
3. 在 OpenClaw 里配置环境变量：
```bash
openclaw env set WECHAT_APP_ID "你的AppID"
openclaw env set WECHAT_APP_SECRET "你的AppSecret"
```

**Step 5.2：创建发布 skill**

在 `~/.openclaw/skills/wechat-publish/` 目录下创建：

```javascript
// index.js
const axios = require('axios');

async function getAccessToken() {
  const res = await axios.get(
    `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${process.env.WECHAT_APP_ID}&secret=${process.env.WECHAT_APP_SECRET}`
  );
  return res.data.access_token;
}

async function publishDraft(content, title, author = '') {
  const token = await getAccessToken();
  // 先创建草稿
  const draftRes = await axios.post(
    `https://api.weixin.qq.com/cgi-bin/draft/add?access_token=${token}`,
    {
      articles: [{
        title,
        content,
        author,
        need_open_comment: 1
      }]
    }
  );
  return draftRes.data.media_id;
}

module.exports = { publishDraft };
```

> 注意：微信公众号 API 发布会先创建草稿，需要在公众平台手动审核后才能群发，这是平台规则，无法绕过。

**如果不想配微信 API**：把 Step 4 的 Cron 内容改为只推送到飞书频道，人工手动复制到各平台发布即可。这是更稳定的方案。

---

### Step 6：验证整个流程

**手动触发测试**：

```bash
# 手动触发一次内容生产（不等 Cron）
openclaw run --prompt "执行内容选题：按照 AGENTS.md 配置生成今日内容初稿，推送到飞书审核频道" --once
```

**验收清单**：
- [ ] 飞书审核频道收到内容推送，格式包含：选题 + 初稿 + 标题备选
- [ ] 内容符合 SOUL.md 里定义的风格（无 AI 模板味，有具体案例）
- [ ] Cron 在设定时间触发（第二天 8:00 确认）
- [ ] 回复"修改 + 意见"后，AI 能重新生成修改版

---

## 关键配置模板

### SOUL.md 内容创作段落（可直接复制）

```markdown
## 内容创作规则
- 垂类：[你的垂类]
- 读者：[你的目标读者]
- 风格：[你的内容风格]
- 禁止用语：首先/其次/综上所述/总的来说/不言而喻
- 输出格式：标题 3 个备选 + 正文 600-1000 字 + 标签 3-5 个
```

### Cron 常用时间表达式

| 需求 | 表达式 |
|------|--------|
| 工作日 8:00 | `0 8 * * 1-5` |
| 每天 8:00 | `0 8 * * *` |
| 工作日 8:00 + 14:00 | 配两条，第二条 `0 14 * * 1-5` |
| 每周一 9:00 | `0 9 * * 1` |

---

## 常见问题与调试

**问题 1：Cron 没有在预定时间触发**

检查：
```bash
openclaw logs --follow | grep cron
```
最常见原因：timezone 没配置，按 UTC 执行了（中国比 UTC 快 8 小时，所以 8:00 变成了 0:00）

**问题 2：web-search 搜到的内容不相关**

原因：搜索关键词太泛。在 AGENTS.md 里改信息源，加具体网站 URL 而不是靠搜索词。

**问题 3：内容风格不对，AI 味很重**

解决：在 SOUL.md 里加"参考文章示例"，把你之前写得好的文章段落贴进去，让 AI 模仿风格。

**问题 4：飞书频道没收到推送**

检查：
```bash
openclaw gateway status
# 确认 feishu 状态是 connected
```

---

## 下一步行动

1. 今天：在 SOUL.md 里填写你的内容垂类和风格定义
2. 明天：配置一个测试用的 Cron（测试时间可以设成 5 分钟后），手动触发一次，看初稿质量
3. 本周：跑 3 天，根据实际效果调整信息源和过滤规则
4. 下周：决定是否接入微信公众号 API，或维持"飞书推送 + 人工发布"方案
