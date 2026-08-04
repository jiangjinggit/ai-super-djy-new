# AI Superman EVOLVE

一个面向中文用户的 AI 超级个体学习平台，覆盖从入门认知到智能体实战的完整成长路径。

> 不讲概念神话，只帮你把 AI 变成更稳、更可执行的工作能力。

## 在线访问

- <https://ai-superman-djy.me/>
- <https://www.ai-superman-djy.me/>

## 核心模块

| 模块 | 内容 |
|------|------|
| AI 超级个体入门 | 从一个低风险真实任务开始，学会提需求、查结果和保存模板 |
| 大模型实战库 | 按任务、成本、延迟和上下文做模型选型 |
| API 中转与模型接入 | 判断是否需要中转，并配置可控的模型接入层 |
| AI 智能体入门 | 写清输入、交付、权限和人工确认点，完成最小试跑 |
| ChatGPT 高效工作 | 从定义交付到资料协作、核验和归档 |
| WorkBuddy 工作协作 | 把资料、初稿、待办和复盘接进可复用工作流 |
| 场景与案例 | 用 4 类真实工作流练习最小闭环与人工关口 |
| AI 拼团 | 了解额度、倍率、转让、安全规则和入团方式 |

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

微信群已超过 200 人，请添加微信并备注“进群”，通过后邀请加入学习交流群。

- 公众号：**AI Superman DJY**（获取最新实战案例与内容更新）
- 微信号：**AI-Superman-DJY**（添加请备注“进群”）

## License

MIT
