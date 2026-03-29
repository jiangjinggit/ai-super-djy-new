# AI Superman DJY

一个以中文内容为主的 AI 学习站，重点覆盖六个模块：

- AI 超级个体入门
- 大模型实战库
- AI 智能体实战专区
- 超级个体场景库
- 真实案例库
- 成长路径

当前内容架构已经拆成“模块配置 + 增强区配置 + Markdown 课程正文”的长期维护形态。

## 本地运行

前置条件：Node.js 20+

1. 安装依赖：`npm install`
2. 启动开发环境：`npm run dev`
3. 构建生产包：`npm run build`
4. 类型检查：`npm run lint`

## 内容结构

- `src/content/modules/*`
  每个模块的基础结构、摘要、课程列表。
- `src/content/moduleEnhancements/*`
  每个模块的增强区内容，例如执行清单、模型选型、案例证据。
- `src/content/lessons/**/*.md`
  每节课的 Markdown 正文。
- `src/types/course.ts`
  内容 schema 定义，包含模块、课程、来源和增强区 block。

## 当前实现重点

- lesson 已支持独立 URL：`/module/:id/lesson/:lessonSlug`
- 课程正文已从 TS 对象拆到 Markdown 文件
- 模块与 block 已支持 `updatedAt` / `sources`
- 页面使用路由懒加载，后续便于继续拆分内容和做 SEO

## 维护建议

- 高时效信息优先回官方文档复核
- 课程内容优先更新对应 Markdown 文件
- 如果新增增强区，先在 `src/types/course.ts` 增加 block 类型，再实现渲染组件
