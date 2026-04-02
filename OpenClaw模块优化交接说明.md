# OpenClaw 模块优化交接说明

## 这份文档是干什么的

给下一个会话直接接手 `OpenClaw 实战` 模块优化用。目标不是重新判断方向，而是沿着已经确认的课程思路继续打磨。

---

## 当前已确认的课程方向

### 1. 模块拆分已经完成，不要再回退

原来的 `agents` 单模块已经拆成 3 个模块：

- `AI 智能体入门`
- `OpenClaw 实战`
- `Claude 智能体实战`

这条结构已经确认，不再回到“大杂烩智能体模块”。

### 2. `AI 智能体入门` 先停在当前状态

这一模块用户已经明确说“先这样了”，下一轮不要再优先改它，除非用户新提要求。

### 3. 智能体相关模块的整体语气要统一

已经收过一轮，当前统一原则是：

- 先判断，再上手
- 少讲空概念，多讲任务和动作
- 标题尽量直白，不要一眼看不出这节在解决什么
- 模块页不要堆太多重复区块

### 4. 用户明确不喜欢重复表达

之前已经删掉或压缩过一些重复区块，原因是这些内容容易换个标题讲同一件事：

- `智能体认知自检`
- `学完后你应该拿到`
- 部分与顶部导览重复的 checklist

后续优化 OpenClaw 时，也要继续遵守这个原则：

- 一块信息只保留一个最有用的表达方式
- 不要同时出现“模块解决什么”“你会拿到什么”“开始前检查什么”三套高度重复的预热内容

### 5. 课程是“实战模块”，不是资料搬运

可以参考外部资料，但不能照抄结构和文案。

对 OpenClaw，已经明确允许参考：

- [OpenClaw 101 中文](https://openclaw101.dev/zh)

但只能做事实校准和灵感参考，不能照着写。课程必须保留我们自己的主线和判断框架。

---

## OpenClaw 模块已经确定的主线

这一条很重要，后续优化不要偏掉。

OpenClaw 模块不是单纯“安装教程”，而是这条路径：

`选型 -> 部署 -> SOUL.md -> USER.md / AGENTS.md -> 技能 -> 主动策略 -> 长期调优`

也就是说，这个模块最核心的价值不是：

- 教用户把 OpenClaw 装上

而是：

- 教用户把 OpenClaw 长期稳定用起来

---

## 用户偏好的表达方式

从前几轮反馈看，用户更认可下面这种写法：

- 任务导向
- 判断导向
- 明确告诉读者“什么时候该用、什么时候不该用”
- 尽量少用抽象词，少用泛泛总结
- 同一个页面不要啰嗦重复

不太适合的写法：

- 很像宣传页的夸张表达
- 很像提纲汇总的空泛块
- 明明是 1 个意思，却拆成 3 个模块页区块重复说

---

## OpenClaw 模块当前状态

### 当前主文件

- [src/content/modules/openclaw.ts](/Users/daipeiyuan/ai-super-djy-new/src/content/modules/openclaw.ts)
- [src/content/moduleEnhancements/openclaw.ts](/Users/daipeiyuan/ai-super-djy-new/src/content/moduleEnhancements/openclaw.ts)

### 当前 lesson 文件

- [src/content/lessons/openclaw/openclaw-intro.md](/Users/daipeiyuan/ai-super-djy-new/src/content/lessons/openclaw/openclaw-intro.md)
- [src/content/lessons/openclaw/openclaw-deploy.md](/Users/daipeiyuan/ai-super-djy-new/src/content/lessons/openclaw/openclaw-deploy.md)
- [src/content/lessons/openclaw/openclaw-soul.md](/Users/daipeiyuan/ai-super-djy-new/src/content/lessons/openclaw/openclaw-soul.md)
- [src/content/lessons/openclaw/openclaw-profile.md](/Users/daipeiyuan/ai-super-djy-new/src/content/lessons/openclaw/openclaw-profile.md)
- [src/content/lessons/openclaw/openclaw-skills.md](/Users/daipeiyuan/ai-super-djy-new/src/content/lessons/openclaw/openclaw-skills.md)
- [src/content/lessons/openclaw/openclaw-proactive.md](/Users/daipeiyuan/ai-super-djy-new/src/content/lessons/openclaw/openclaw-proactive.md)
- [src/content/lessons/openclaw/openclaw-grow.md](/Users/daipeiyuan/ai-super-djy-new/src/content/lessons/openclaw/openclaw-grow.md)

### 当前模块页已经做过的事

- `keyTakeaways` 已经清空，避免重复
- 模块副标题和描述已经统一到“先判断，再上手”的口径
- 模块页目前只保留了一个高价值增强块：`OpenClaw 部署完成检查清单`

### 当前模块页还可能继续优化的方向

下一轮优先考虑的，不是再加很多内容，而是让 OpenClaw 模块页更像一个独立专题页，同时保持简洁。

可以考虑的方向：

- 把“适不适合你”做成更直白的判断区块
- 把“三件套”做成更清楚的分工说明，而不是只在正文里讲
- 把“主动模式”和“长期调优”拉成 OpenClaw 的差异化亮点
- 保留少量高价值模板或检查清单，但不要堆太多

不建议的方向：

- 模仿 Claude 模块做完全一样的页面结构
- 一口气增加太多 enhancement blocks
- 把页面重新变回“模块导览 + 你会拿到 + 检查清单”三重重复结构

---

## 可参考的 Claude 模块经验

`Claude 智能体实战` 这一轮已经被打磨得更成熟，可以参考它的“专题化”思路，但不要机械照搬。

Claude 模块当前大致结构是：

- 一个真正有区分度的顶部入口块
- 少量可直接用的模板
- 一份明确的上手路径
- 一份安全边界清单

OpenClaw 可以借鉴的是：

- 页面需要有明显主线
- 模块页应该帮助用户更快判断和开工

OpenClaw 不应该照搬的是：

- `CLI vs Cowork` 那种双入口结构

因为 OpenClaw 的核心不是双入口分流，而是：

- 先判断值不值得装
- 装完后怎么不烂尾

---

## 已经确定的课程边界

### 1. 不要把概念层和工具层混在一起

之前已经做过一次清理，典型例子是：

- `Claude API` 已从工具入口里拿掉

同理，OpenClaw 模块里也要避免把“技术底座”“产品入口”“学习路线”讲成同一层东西。

### 2. 术语如果可能让读者混淆，要尽早解释

比如之前已经明确补过：

- `智能体 = Agent`

OpenClaw 这边如果有容易误解的术语，也应优先前置澄清。

### 3. 课程重点是“稳定落地”

不追求百科全书式覆盖，也不追求罗列一堆能力点。
优先级应该是：

1. 先帮用户做正确判断
2. 再帮用户跑通最小闭环
3. 最后再讲长期优化

---

## 下一会话建议的工作顺序

如果新会话要继续优化 OpenClaw，建议按这个顺序：

1. 先读这份文档
2. 再读 [src/content/modules/openclaw.ts](/Users/daipeiyuan/ai-super-djy-new/src/content/modules/openclaw.ts)
3. 再读 [src/content/moduleEnhancements/openclaw.ts](/Users/daipeiyuan/ai-super-djy-new/src/content/moduleEnhancements/openclaw.ts)
4. 判断模块页是否需要增加 1 到 2 个真正有辨识度的新区块
5. 再决定要不要补 lesson 正文，而不是反过来

优先优化模块页结构和模块页表达，再看 lesson 细化。

---

## 交接时最重要的一句话

OpenClaw 这一模块要做成的，不是“安装文档合集”，而是“一条让用户知道该不该学、装完后怎么长期稳定用下去的实战路径”。
