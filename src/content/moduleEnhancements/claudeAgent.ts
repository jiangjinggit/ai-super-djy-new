import type { ModuleEnhancement } from '@/types/course';

export const claudeAgentEnhancement: ModuleEnhancement = {
  lastVerifiedOn: '2026-04-03',
  sources: [
    { label: 'Claude Code Overview', url: 'https://docs.anthropic.com/en/docs/claude-code/overview' },
    { label: 'Claude Code Getting Started', url: 'https://docs.anthropic.com/en/docs/claude-code/getting-started' },
    { label: 'Claude Code Common Workflows', url: 'https://docs.anthropic.com/en/docs/claude-code/common-workflows' },
    { label: 'Claude Code Memory', url: 'https://docs.anthropic.com/en/docs/claude-code/memory' },
    { label: 'Claude Code Settings', url: 'https://docs.anthropic.com/en/docs/claude-code/settings' },
    { label: 'Claude Code Slash Commands', url: 'https://docs.anthropic.com/en/docs/claude-code/slash-commands' },
    { label: 'Claude Code Subagents', url: 'https://docs.anthropic.com/en/docs/claude-code/sub-agents' },
    { label: 'Claude Code Hooks', url: 'https://docs.anthropic.com/en/docs/claude-code/hooks' },
    { label: 'Claude Code Hooks Guide', url: 'https://docs.anthropic.com/en/docs/claude-code/hooks-guide' },
    { label: 'Claude Code MCP', url: 'https://docs.anthropic.com/en/docs/claude-code/mcp' },
    { label: 'Prompt Engineering Overview', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview' },
    { label: 'Claude Code Auto Mode', url: 'https://www.anthropic.com/engineering/claude-code-auto-mode' },
    { label: 'Claude Code Sandboxing', url: 'https://www.anthropic.com/engineering/claude-code-sandboxing' },
    { label: 'Claude Code in Action', url: 'https://anthropic.skilljar.com/claude-code-in-action/312000' },
  ],
  blocks: [
    {
      type: 'tool-comparison',
      title: '五大入口全维度对比',
      description: '先判断你面对的是仓库、文档还是混合场景，再选入口。选错了，体验直接下降一个档次。',
      cliTitle: 'CLI / IDE',
      coworkTitle: 'Desktop / Cowork',
      items: [
        {
          aspect: '核心对象',
          cli: '代码仓库、脚本、命令行、diff、项目级文档、终端操作。',
          cowork: '本地文件夹、研究资料、表格、演示文稿、连接器与浏览器内容。',
        },
        {
          aspect: '典型起手任务',
          cli: '读项目结构、修 Bug、补文档、写命令化工作流、跑测试。',
          cowork: '整理资料、提炼报告、生成提纲、合并多份文件形成成品草稿。',
        },
        {
          aspect: '上下文系统',
          cli: 'CLAUDE.md + .claude/rules/ + Auto Memory，重点是命令、目录、规范、禁止事项。',
          cowork: 'Global / Project / Folder Instructions，重点是输出格式、资料边界和工作偏好。',
        },
        {
          aspect: '权限与安全',
          cli: '权限模式（default/plan/auto 等）+ allow/ask/deny + sandbox/worktree。',
          cowork: 'Instructions 里写操作边界 + 桌面端环境依赖 + 文件读写确认。',
        },
        {
          aspect: '最大风险',
          cli: '顺手多改文件、擅自引依赖、执行高风险命令、改了不该改的配置。',
          cowork: '把猜测写成结论、误整理本地文件、在桌面端环境不稳时执行长任务。',
        },
      ],
    },
    {
      type: 'sop-templates',
      title: '直接可用的 Claude 任务模板',
      description: '先套模板，再慢慢长出自己的版本。好用程度往往取决于你是否一开始就把任务说清。',
      items: [
        {
          title: '5 步执行法：小范围修复模板',
          input: '一个明确 Bug、相关文件路径、期望结果、禁止事项',
          steps: [
            '第 1 步（读）：让 Claude 阅读相关文件，总结现状和可能原因，先不要修改。',
            '第 2 步（计划）：要求给出执行计划，标出会改和不会改的文件。',
            '第 3 步（执行）：确认计划后允许修改，严格按计划做，不额外优化。',
            '第 4 步（验证）：修改后运行测试或给出验证步骤，读一遍改动确认正确。',
            '第 5 步（总结）：输出变更说明、残留风险和下一步建议。',
          ],
          output: '范围清晰的修复结果 + 验证结论 + 风险摘要',
          kpi: '改动文件数可控、验证完整、没有顺手引入额外重构',
        },
        {
          title: '产品经理：需求文档生产线',
          input: '用户反馈资料、竞品截图、会议纪要、需求文档模板',
          steps: [
            'Cowork 整理原始资料，确认读到了哪些文件。',
            '提炼高频问题、阻断问题、改进建议，每类最多 5 条。',
            '参照模板生成需求规划文档，标注"待研发确认"的需求。',
            'CLI 辅助研发评估技术复杂度，补充进文档。',
          ],
          output: '一份可直接交付的需求规划文档 + 技术评估',
          kpi: '整理反馈 20 分钟、生成初稿 15 分钟、研发对齐 30 分钟',
        },
        {
          title: '开发者：周度仓库维护',
          input: 'CLAUDE.md 中的技术债务列表、当前代码状态',
          steps: [
            '/debt 选出本周优先清理的技术债务项。',
            '5 步执行法完成清理任务。',
            '/doc [修改的文件] 补充文档。',
            '/security-review 最终安全自检。',
            '生成 commit 消息，推代码。',
          ],
          output: '清理完成的代码 + 补全的文档 + 安全审查报告',
          kpi: '技术债务持续减少、文档覆盖率提升、无安全隐患遗漏',
        },
      ],
    },
    {
      type: 'weekly-plan',
      title: '6 周路线：从认知到系统',
      description: '先建立正确认知，再跑通真实任务，最后系统化成可复用的个人工作流。不要同时学太多特性。',
      items: [
        {
          week: 1,
          goal: '认知建立 + 安装 + 选对入口',
          deliverable: '理解 Claude Code 不是聊天框而是执行代理，完成安装和 1 次最小验证任务，写下你最适合哪条路径的判断理由。',
          fallback: '如果还分不清 CLI 和 Cowork，就各做一个 10 分钟小任务，用真实体验来选。',
        },
        {
          week: 2,
          goal: '掌握 5 步执行法 + Prompt 技巧 + 建立上下文系统',
          deliverable: '用 5 步执行法完成 1 个真实任务，写出基础版 CLAUDE.md 或 Instructions，掌握结构化 Prompt 模板。',
          fallback: '如果不知道 CLAUDE.md 写什么，就先只写 3 条常用命令 + 3 条禁止事项。',
        },
        {
          week: 3,
          goal: '固化高频动作 + 接入 MCP + 管理上下文',
          deliverable: '写好 1 个 Skill/Command，接入 1 个 MCP，学会用 /clear 和 /compact 管理上下文。',
          fallback: '如果 MCP 接入有困难，先把 Skill 做稳，MCP 下周再补。',
        },
        {
          week: 4,
          goal: '多 Agent 初探 + 安全边界 + 自动化入门',
          deliverable: '用 Plan Mode 做一次复杂任务规划，写好安全边界模板，尝试配置 1 个 Hook 或 Schedule。',
          fallback: '如果多 Agent 还不需要，就把安全边界和自动化路径搞清楚。',
        },
        {
          week: 5,
          goal: '跑通 1 个真实场景',
          deliverable: '产品经理需求文档 / 开发者仓库维护 / 研究资料处理任选一个，完整跑通工作流。',
          fallback: '不稳就先优化单场景，别急着加第二个。',
        },
        {
          week: 6,
          goal: '工作流固化 + 资产沉淀',
          deliverable: '1 套可复用的工作流模板、1 份个人 CLAUDE.md 定稿、1 份自动化路径规划。',
          fallback: '流程还乱就先删低价值配置，保留核心工作流。',
        },
      ],
    },
    {
      type: 'security-checklist',
      title: 'Claude 工作台安全配置清单',
      description: '每次启动重要任务前，确认这些边界已经设好。',
      items: [
        {
          title: 'CLAUDE.md 已写清安全边界',
          detail: '必须人工确认的操作、禁止操作、操作前必须完成的检查都已写进 CLAUDE.md 或 Instructions。',
        },
        {
          title: '权限模式已选对',
          detail: '新手用 default，高风险用 plan，已验证流程用 acceptEdits，bypassPermissions 仅限隔离环境。',
        },
        {
          title: '危险操作有确认点',
          detail: '删除文件、安装依赖、对外发请求、改生产配置、执行 git push 等操作都设成必须人工确认。',
        },
        {
          title: '任务前后有可恢复机制',
          detail: '重要任务前做 git 备份分支，任务后先看 git diff 和 git status，再决定是否提交或回滚。',
        },
        {
          title: '上下文系统已分层',
          detail: '全局偏好在 ~/.claude/CLAUDE.md，项目规则在项目 CLAUDE.md，局部规则在 .claude/rules/，不互相冲突。',
        },
        {
          title: 'Cowork 的运行条件已考虑',
          detail: '如果使用 Cowork 的长任务，确认桌面端保持开启、电脑保持唤醒，不拿它处理受监管或高敏感工作。',
        },
      ],
    },
    {
      type: 'resource-links',
      title: '核心资源导航',
      description: '按类别整理的 Claude Code 官方资源，遇到问题先查官方文档。',
      items: [
        {
          title: 'Claude Code 官方文档',
          url: 'https://docs.anthropic.com/en/docs/claude-code/overview',
          label: '官方',
          description: '产品概览、安装指南、工作流、设置、权限等完整文档',
          category: '官方文档',
        },
        {
          title: 'Claude Code Memory',
          url: 'https://docs.anthropic.com/en/docs/claude-code/memory',
          label: '官方',
          description: 'CLAUDE.md、rules、Auto Memory 的官方说明',
          category: '官方文档',
        },
        {
          title: 'Claude Code Hooks',
          url: 'https://docs.anthropic.com/en/docs/claude-code/hooks',
          label: '官方',
          description: 'Hooks 配置、类型、使用场景的官方指南',
          category: '官方文档',
        },
        {
          title: 'Claude Code MCP',
          url: 'https://docs.anthropic.com/en/docs/claude-code/mcp',
          label: '官方',
          description: 'MCP 协议、配置方式、服务器列表',
          category: '官方文档',
        },
        {
          title: 'Prompt Engineering Overview',
          url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview',
          label: '官方',
          description: 'Anthropic 官方 Prompt 工程指南',
          category: '官方学习',
        },
        {
          title: 'Claude Code in Action',
          url: 'https://anthropic.skilljar.com/claude-code-in-action/312000',
          label: '课程',
          description: 'Anthropic 官方实战课程',
          category: '官方学习',
        },
        {
          title: 'Claude Code Auto Mode',
          url: 'https://www.anthropic.com/engineering/claude-code-auto-mode',
          label: '工程',
          description: 'Auto Mode 的设计原理和安全机制',
          category: '工程文章',
        },
        {
          title: 'Claude Code Sandboxing',
          url: 'https://www.anthropic.com/engineering/claude-code-sandboxing',
          label: '工程',
          description: '沙箱隔离的设计原理和实现',
          category: '工程文章',
        },
      ],
    },
  ],
};
