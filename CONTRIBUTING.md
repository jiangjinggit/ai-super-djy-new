# 贡献指南

感谢你对 AI Superman EVOLVE 的关注！无论是修复错别字、补充课程内容，还是改进代码，我们都非常欢迎。

## 如何参与

### 1. 内容贡献（最容易上手）

- **纠错**：发现课程中的错误信息、过时内容或错别字，直接提 Issue 或 PR
- **补充课程**：在 `src/content/lessons/<模块目录>/` 下新增 `.md` 文件，并在对应的 `src/content/modules/<module>.ts` 中注册
- **更新时效信息**：模型参数、API 定价等变化较快，欢迎帮忙更新

### 2. 代码贡献

- 修复 Bug
- 优化性能或交互体验
- 新增功能组件

## 贡献流程

1. **Fork** 本仓库
2. 创建你的分支：`git checkout -b feat/你的功能描述` 或 `fix/你的修复描述`
3. 本地开发并测试：
   ```bash
   npm install
   npm run dev
   ```
4. 确保构建通过：`npm run build`
5. 提交你的改动，commit message 请使用中文，格式参考：
   - `feat: 新增 XXX 课程`
   - `fix: 修复 XXX 页面显示问题`
   - `docs: 更新 XXX 课程内容`
   - `style: 调整 XXX 样式`
6. 推送到你的 Fork：`git push origin feat/你的功能描述`
7. 发起 **Pull Request**，填写 PR 模板中的信息

## 分支命名规范

| 前缀 | 用途 |
|------|------|
| `feat/` | 新功能 |
| `fix/` | Bug 修复 |
| `docs/` | 文档/课程内容更新 |
| `style/` | 样式调整 |
| `refactor/` | 代码重构 |

## 内容编写规范

- 课程 Markdown 文件放在 `src/content/lessons/<模块目录>/` 下
- 使用中文撰写，技术术语首次出现时附英文原文
- 高时效信息（模型参数、定价等）请标注更新日期
- 避免主观评价，以事实和实测数据为准

## 开发环境

- Node.js 20+
- 包管理器：npm

## 行为准则

- 尊重每一位贡献者
- 就事论事，友善沟通
- 不发布与项目无关的内容

有任何问题，欢迎在 Issue 中讨论，或通过微信联系：AI-Superman-DJY
