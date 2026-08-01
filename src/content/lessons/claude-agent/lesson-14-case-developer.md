## 学习目标

- 学会为代码仓库编写完整的 CLAUDE.md 配置（项目背景/规则/技术债务）
- 掌握 code-review、doc、debt 三类审查与维护入口
- 完整走通周度维护工作流：debt→执行→doc→code-review→commit

## 学完能做什么

- 能为一个真实仓库建立维护用 CLAUDE.md 和本地 Commands
- 能按 debt→计划→执行→验证→doc→review→commit message 的顺序完成一次维护
- 能把 AI 审查作为自检，不把它当作替代人工 Review 的最终结论

## 适合谁

- 独立维护中型项目、面临文档缺失和技术债务积累的后端开发者
- 希望用 AI 提升 PR review 质量和代码维护效率的开发者
- 想建立可复用代码维护流程的技术负责人

## 前置条件

- 熟悉 CLAUDE.md 配置和 Skill/Command 编写（第 7-8 课）
- 掌握 5 步执行法（第 4 课）
- 有实际的代码仓库维护经验
- 了解 git 工作流、JSDoc、lint 等基本开发工具

## 核心知识

### 场景描述

你是一名后端开发者，独立维护一个中型 Node.js 项目，面临：代码文档缺失、技术债务积累、PR review 质量参差不齐。

### CLAUDE.md 配置（关键部分）

```markdown
# 项目背景
一个 Node.js RESTful API 服务，接 PostgreSQL，约 30 个接口，
无全职测试人员，靠代码审查保证质量。

# 最重要的规则
1. 每次修改前先读相关文件
2. 改动超过 3 个文件的任务，先给计划
3. 不能修改 src/db/migrations/ 里的文件
4. 不能改动 package-lock.json（除非专门升级依赖任务）

# 当前技术债务（持续更新）
- 用户模块缺少 JSDoc 注释
- tests/ 里的集成测试覆盖率 < 30%
- src/utils/ 有几个废弃函数没清理
```

### Skills / Commands 套装

**security-check-local.md —— 项目自定义安全检查**

```markdown
# .claude/commands/security-check-local.md
读取 `git diff main...HEAD`
进行安全导向审查，重点关注：
1. 是否有 SQL 注入风险（重点！）
2. 错误处理是否完整
3. 日志是否足够排查问题
输出：问题列表，按严重程度排序（阻断/警告/建议）
```

**doc.md —— 文档补全**

```markdown
# .claude/commands/doc.md
为 $ARGUMENTS 文件里所有导出的函数补全 JSDoc 注释。
要求：参数类型准确，返回值说明清晰，不超过 5 行。
改完后展示修改摘要，等我确认再写入文件。
```

**debt.md —— 技术债务评估**

```markdown
# .claude/commands/debt.md
读取 CLAUDE.md 里的"当前技术债务"列表，
结合代码现状，给出本周优先清理哪 1-2 项的建议，
说明理由（影响范围、清理难度、收益）。
```

### 周度维护工作流（每周五下午）

```
第一步：/debt → 选出本周要处理的技术债务项
第二步：先出计划，确认范围后用 5 步执行法完成清理任务
第三步：/doc [修改的文件] → 补充文档
第四步：/code-review 或 /security-check-local → 最终自检
第五步：生成 commit 消息草稿，人工确认后再提交/推送
```

这个流程的关键在于：
- `/debt` 帮你决定做什么（优先级判断）
- 5 步执行法帮你做好（质量保证）
- `/doc` 确保改动有文档（可维护性）
- `/code-review` 做通用代码审查；`/security-check-local` 按你的项目风险做安全兜底

## Demo

在你自己的项目中走一遍完整的周度维护流程：

1. 配置好 CLAUDE.md，写入项目背景、规则和当前技术债务
2. 创建三个 Commands 文件
3. 执行 `/debt`，选出一个技术债务项
4. 用 5 步执行法完成清理
5. 执行 `/doc` 补充文档
6. 执行 `/code-review` 或 `/security-check-local` 做最终自检
7. 生成 commit 消息

## 作业

1. 为你的项目编写完整的 CLAUDE.md，包含项目背景、最重要的规则（至少 4 条）、当前技术债务列表（至少 3 项）
2. 创建 `.claude/commands/` 目录，编写 security-check-local.md、doc.md、debt.md 三个 Commands
3. 根据你的项目特点，调整 security-check-local 的检查重点（比如 Python 项目关注不同的安全问题）
4. 完整走通一次周度维护工作流，记录每一步的输出和耗时
5. 维护 CLAUDE.md 中的技术债务列表——清理完的标记完成，发现新的及时补充

周度维护记录模板：

| 步骤 | 产出物 | 验收问题 |
|------|--------|----------|
| /debt | 本周 1-2 个债务候选 | 为什么它们优先级最高？ |
| 计划 | 修改文件、不会修改的范围、风险 | 是否需要人工确认？ |
| 执行 | diff | 是否只改了计划内文件？ |
| 验证 | test/lint/手工验证结果 | 是否有失败或跳过项？ |
| doc | 补充的注释或说明 | 是否跟改动同步？ |
| review | 问题清单 | 阻断项是否已处理？ |
| commit message | 提交信息草稿 | 是否准确描述改动？ |

## 常见误区

- **误区 1：CLAUDE.md 写了就不更新**。技术债务列表需要持续维护，清理完的标记完成，新发现的及时补充。
- **误区 2：security-review 替代人工审查**。AI 安全审查是辅助手段，不能完全替代人工 review，特别是业务逻辑层面的安全问题。
- **误区 3：/doc 一次性补全所有文件**。文档补全应该跟着改动走，改了哪些文件就补哪些，不要一次性全量补。
- **误区 4：跳过 /debt 直接清理**。没有优先级判断就动手清理，容易花大量时间在低收益的债务上。
- **误区 5：不用 5 步执行法就直接让 AI 改代码**。清理技术债务也是代码修改，必须走完整的执行流程。

## 验收标准

- [ ] 已为项目编写完整的 CLAUDE.md（项目背景 + 规则 + 技术债务）
- [ ] 已创建 security-check-local、doc、debt 三个 Commands
- [ ] 能用 `/debt` 获取本周优先清理建议
- [ ] 能用 `/doc [文件]` 为指定文件补全 JSDoc 注释
- [ ] 能用 `/code-review` 或 `/security-check-local` 完成代码安全自检
- [ ] 完整走通一次周度维护工作流（debt→计划→执行→验证→doc→review→commit message）
- [ ] 所有提交/推送动作都由人工确认，不由 AI 自动完成
