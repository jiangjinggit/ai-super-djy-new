## 学习目标

- 用 Claude Code 写一个数据报告脚本：从数据源读取数据 → 生成文字报告 → 定时发送到飞书
- 掌握向 AI 描述脚本需求的方法、飞书 Webhook 的接入方式、定时执行的设置
- 不需要会编程，只需要会描述你想要的结果

## 适合谁

- 每周手动整理数据、写周报、汇报报告占用大量时间的人
- 有固定的报告格式和数据来源，想把这个流程自动化的团队负责人
- 已完成 AI 编程模块，想做第一个实用自动化脚本的人

## 前置条件

- 有明确的数据来源（飞书多维表格、Excel、CSV、或某个系统有导出功能）
- 有飞书账号（发送报告用）
- 安装了 Python（系统自带或 python.org 下载，3.9 以上）
- 能使用 Claude Code 或 Cursor
- （可选）如果希望用 AI 生成报告摘要，需要 Anthropic API Key（[console.anthropic.com](https://console.anthropic.com) 注册获取，按用量计费，单次报告通常不到 ¥0.1）。不配置也可以，脚本会用 Python 字符串拼接生成报告

---

## 主工具路径

| 环节 | 工具 | 说明 |
|------|------|------|
| 需求描述 | Claude Code / Cursor | 用自然语言描述脚本功能 |
| 脚本生成 | Claude Code | 生成 Python 脚本 |
| 数据读取 | Python + 飞书 API / pandas | 从数据源读取数据 |
| 报告生成 | Python 字符串格式化（或可选 Claude API） | 拼接成文字报告；如需 AI 润色摘要，可接入 Claude API |
| 发送 | 飞书 Webhook | 推送到飞书群 |
| 定时执行 | crontab / GitHub Actions | 自动定期运行 |

---

## 完整操作步骤

### Step 1：配置飞书 Webhook（5 分钟）

这是最简单的飞书接入方式，不需要开发者账号。

1. 打开飞书，进入你要接收报告的群（或创建一个专用群）
2. 点击右上角设置 → 群机器人 → 添加机器人 → 自定义机器人
3. 填写机器人名称（如"周报机器人"）→ 确认
4. 复制弹出的 **Webhook URL**（格式：`https://open.feishu.cn/open-apis/bot/v2/hook/xxx`）

**测试 Webhook**（在终端执行）：
```bash
curl -X POST "https://open.feishu.cn/open-apis/bot/v2/hook/你的WEBHOOK后缀" \
  -H "Content-Type: application/json" \
  -d '{"msg_type": "text", "content": {"text": "测试消息，如果你看到这条，说明 Webhook 配置成功"}}'
```

如果飞书群收到了"测试消息"，说明 Webhook 配置成功。

---

### Step 2：整理你的数据需求

在找 Claude Code 写代码之前，先把需求写清楚：

**需求模板**：

```
数据来源：[飞书多维表格 / Excel 文件 / CSV 文件 / 某系统导出的文件]
具体位置：[文件路径 / 飞书表格链接 / 哪个系统的哪个导出功能]

需要统计的指标：
1. [指标1，如：本周新增用户数]
2. [指标2，如：本周总销售额]
3. [指标3，如：各渠道的销售占比]

报告格式要求：
[描述你希望报告长什么样，例如：
"标题+本周总结+各项指标数字+与上周对比+下周重点"
或者把你现在手动写的报告贴进来]

发送时间：[例如：每周一早上 9:00 / 每天下午 6:00]
发送到飞书群：[群名]（Webhook URL 见下方配置）
```

---

### Step 3：用 Claude Code 生成脚本

打开 Claude Code（终端输入 `claude`），把你的需求描述贴进去，用以下 Prompt：

```
我需要一个 Python 脚本，自动生成数据报告并发送到飞书。

需求如下：
[粘贴你的需求模板内容]

飞书 Webhook URL：[你的 Webhook URL]

要求：
- 所有敏感信息（Webhook URL、App ID、App Secret、API Key）从环境变量读取，不要硬编码
- 用 .env 文件管理本地开发的环境变量，配合 python-dotenv 加载

请生成脚本，并告诉我：
1. 如何安装所需的依赖包
2. 如何运行脚本测试
3. 如何配置每周一早上 9:00 自动运行
```

> 为什么要强调"从环境变量读取"？因为后面配置 GitHub Actions 时，敏感信息必须通过 Secrets 注入环境变量。如果脚本里硬编码了这些值，本地能跑但云端会失败。提前在 Prompt 里说清楚，Claude Code 生成的代码就会自带 `os.environ.get()` 的写法。

Claude Code 会生成：
- 完整的 Python 脚本
- `requirements.txt`（依赖清单）
- 安装和运行说明
- crontab 配置

---

### Step 4：测试脚本

先创建虚拟环境（避免依赖包和系统其他项目冲突），再安装依赖：

```bash
# 创建虚拟环境（只需执行一次）
python3 -m venv venv

# 激活虚拟环境（每次打开新终端都要执行）
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt
```

运行一次测试：

```bash
python report.py
```

**检查结果**：
- 飞书群是否收到了报告消息？
- 数字是否准确（和你手动核对的数据一致）？
- 格式是否符合预期？

**出现错误时**：

把终端里的完整错误信息复制给 Claude Code：

```
我运行了你给的脚本，出现了以下错误：
[复制完整错误信息]

我的数据文件路径是：[路径]
请帮我分析错误原因并修复。
```

---

### Step 5：接入飞书多维表格数据（如果用飞书数据）

如果数据在飞书多维表格里，需要额外配置飞书 API：

> 建议先用 CSV 或 Excel 本地文件跑通整个流程，确认报告格式和发送都没问题后，再接飞书 API。飞书 API 的权限审批可能需要 1-2 个工作日，不要让它阻塞你的进度。

**获取飞书 App ID 和 App Secret**：
1. 打开 [open.feishu.cn](https://open.feishu.cn) → 创建企业自建应用（如果还没有）
2. 应用凭证 → 复制 App ID 和 App Secret
3. 进入"权限管理" → 搜索并申请 `bitable:app:readonly` 权限
4. 进入"版本管理与发布" → 创建版本 → 提交审核（需要飞书管理员审批）

⚠️ 注意：创建企业自建应用和审批权限通常需要飞书管理员操作。如果你不是管理员，需要找管理员协助，整个流程可能需要 1-2 个工作日。

**需要的权限**：
- `bitable:app:readonly`（读取多维表格）
- 在"数据权限"中，还需要指定该应用可以访问哪些多维表格（不是给了权限就能读所有表）

**告诉 Claude Code**：

```
数据在飞书多维表格里，我有以下凭证：
- App ID：xxx
- App Secret：xxx
- 多维表格 URL：https://xxx.feishu.cn/base/xxx（或表格 ID）

请更新脚本，通过飞书 API 读取数据，而不是读本地文件。
```

---

### Step 6：设置定时执行

**方案 A：Mac 上用 crontab（本地运行）**

```bash
# 编辑定时任务
crontab -e

# 在编辑器里添加一行（例：每周一 9:00 运行）
# 注意：这里用虚拟环境里的 Python，才能加载 pip 安装的依赖包
0 9 * * 1 /你的文件路径/venv/bin/python3 /你的文件路径/report.py >> /你的文件路径/report.log 2>&1
```

注意：
- 电脑必须开着且没有睡眠才能触发，适合白天要开着电脑的情况
- Python 路径必须用虚拟环境里的（`venv/bin/python3`），不要用 `/usr/bin/python3`，否则找不到安装的依赖包
- 如果不确定路径，激活虚拟环境后运行 `which python3` 查看

**方案 B：GitHub Actions（云端免费运行，推荐）**

1. 把脚本上传到 GitHub 仓库
2. 在仓库里创建 `.github/workflows/report.yml`：

```yaml
name: 自动周报

on:
  schedule:
    - cron: '0 1 * * 1'  # UTC 时间 1:00 = 北京时间 9:00，每周一（实际触发可能延迟 5-30 分钟）
  workflow_dispatch:  # 允许手动触发测试

jobs:
  send-report:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
      - run: pip install -r requirements.txt
      - run: python report.py
        env:
          FEISHU_WEBHOOK: ${{ secrets.FEISHU_WEBHOOK }}
          FEISHU_APP_ID: ${{ secrets.FEISHU_APP_ID }}
          FEISHU_APP_SECRET: ${{ secrets.FEISHU_APP_SECRET }}
```

3. 在 GitHub 仓库的 Settings → Secrets 里配置飞书的 API 凭证
4. 每次到时间，GitHub Actions 会自动运行脚本

**优点**：不需要自己的服务器，完全免费，可靠性高。

⚠️ GitHub Actions 的定时任务有 5-30 分钟的延迟（官方文档明确说明），不保证准时触发。如果你的报告对发送时间精度要求高（比如必须 9:00 准时），考虑腾讯云函数或自建服务器。对于周报场景，这个延迟通常可以接受。

**方案 C：腾讯云函数（有服务器，国内稳定）**

适合已有腾讯云账号、对云函数有基础了解的人。让 Claude Code 帮你生成腾讯云函数的部署配置。

---

## 关键配置模板

### 飞书消息格式（可直接复制到脚本需求里）

**纯文字格式**（最简单）：
```
本周数据报告 (2026-04-07)
───────────────────
📊 核心数据
新增用户：XXX人（环比上周 ↑XX%）
总销售额：XXX元（环比上周 ↑XX%）
───────────────────
📈 本周亮点
[内容]
⚠️ 待关注
[内容]
```

**富文本格式**（可选）：告诉 Claude Code "使用飞书富文本消息格式，可以加粗标题和分隔线"，它会生成对应的 JSON 消息结构。

---

## 常见问题

**问题 1：脚本能在本地运行，但 GitHub Actions 上失败**

最常见原因：敏感信息（API Key、Webhook URL）直接写在代码里，而不是从环境变量读取。

解决：让 Claude Code 把所有敏感信息改成从环境变量读取，然后在 GitHub Secrets 里配置。

**问题 2：数字对不上，报告数据有误**

不要直接信任 AI 生成的脚本，第一次运行后必须手动核对数字。找出偏差后，把错误情况描述给 Claude Code。

**问题 3：飞书群没收到消息，也没有报错**

检查：
1. Webhook URL 是否配置正确（复制时有没有遗漏字符）
2. 飞书群机器人是否已被踢出群
3. 运行 `curl` 测试（Step 1 里的命令），确认 Webhook 本身是否正常

**问题 4：crontab 设置了但不执行**

常见原因：
- Mac 系统睡眠了
- Python 路径不对（用虚拟环境里的路径 `venv/bin/python3`，不要用 `/usr/bin/python3`）
- 时区问题（crontab 默认用系统时区，确认系统时区是 Asia/Shanghai）
- 没有用虚拟环境的 Python，导致 import 依赖包失败（日志里会有 `ModuleNotFoundError`）

**问题 5：飞书 Webhook 调试时被限流**

飞书自定义机器人 Webhook 有频率限制（每分钟约 100 条）。正常使用不会触发，但调试时如果在循环里连续发送，可能会被临时限流。调试时建议每次只发一条测试消息。

---

## 下一步行动

1. 今天：配置飞书 Webhook，用 curl 测试能否收到消息
2. 明天：整理你的数据需求，用模板写清楚，然后让 Claude Code 生成脚本
3. 本周：手动运行测试，核对数字准确性，确认报告格式满意
4. 下周：配置 GitHub Actions 或 crontab，实现全自动定时推送
