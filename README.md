# AI Superman EVOLVE

一个面向中文用户的 AI 超级个体学习平台，覆盖从入门认知到智能体实战的完整成长路径。

> 不讲概念神话，只帮你把 AI 变成更稳、更可执行的工作能力。

## 在线访问

部署后填写你的域名地址。

## 核心模块

| 模块 | 内容 |
|------|------|
| 超级个体入门 | AI 工具矩阵、Prompt 核心方法、初始工具链搭建 |
| 大模型实战库 | 主流模型对比、选型判断、实际使用技巧 |
| AI 智能体实战 | 智能体基础概念与任务适配 |
| OpenClaw 深度使用 | 工作流自动化、AI 编程提效 |
| Claude Agent 实战 | Claude 系列深度用法、Agent 搭建 |
| AI 编程 | 从零用 AI 写代码，真实项目实战 |
| 场景与案例库 | 真实变现路径、独立产品案例 |

## 技术栈

- **框架**：React 19 + TypeScript + Vite 6
- **路由**：React Router 7（懒加载）
- **样式**：Tailwind CSS 4
- **动画**：Motion (Framer Motion)
- **内容**：Markdown 文件，编译期通过 `import.meta.glob()` 导入，无运行时 API 调用

## 本地运行

前置条件：Node.js 20+

```bash
git clone <repo-url>
cd ai-super-djy-new
npm install
npm run dev        # 开发服务器 http://localhost:3000
```

其他命令：

```bash
npm run build      # 生产构建，输出至 dist/
npm run preview    # 本地预览构建产物
npm run lint       # TypeScript 类型检查
npm run clean      # 清空 dist/
```

## 项目结构

```
src/
├── content/
│   ├── modules/          # 模块定义（标题、课程列表、摘要）
│   ├── moduleEnhancements/  # 增强区内容（清单、模型选型、案例证据）
│   └── lessons/**/*.md   # 课程 Markdown 正文
├── pages/                # 页面组件（懒加载）
├── components/           # 共享组件
├── types/course.ts       # 内容 Schema 定义
└── constants/            # 样式常量
```

## 添加内容

**新增课程**：在 `src/content/lessons/<module-dir>/` 创建 `.md` 文件，然后在对应的 `src/content/modules/<module>.ts` 里注册。

**新增增强区 Block**：先在 `src/types/course.ts` 增加 block 类型（discriminated union），再实现对应渲染组件。

## 维护建议

- 高时效信息（模型参数、API 定价等）优先回官方文档复核
- 课程内容只需更新对应 Markdown 文件，无需改动组件

## 参与贡献

欢迎任何形式的贡献！无论是纠正一个错别字还是新增一篇课程，都非常有价值。

- 📖 阅读 [贡献指南](CONTRIBUTING.md) 了解参与方式
- 🐛 发现问题？[提交 Issue](../../issues/new/choose)
- 💡 有想法？欢迎 Fork 后发起 PR

## 致谢

本项目在 [LINUX DO](https://linux.do/) 社区推广，感谢 LINUX DO 社区对开源项目的支持与认可。

## 社区与联系

扫码加入微信学习交流群，与更多 AI 超级个体一起成长：

<div align="center">
  <img src="public/群二维码.jpg" alt="AI超级个体学习交流群" width="220" />
  <p><sub>二维码有效期有限，过期可通过以下方式联系获取最新群码</sub></p>
</div>

- 公众号：**AI Superman DJY**（获取最新实战案例与内容更新）
- 微信号：**AI-Superman-DJY**（添加请备注来源，拉你进实战社群）

## License

MIT
