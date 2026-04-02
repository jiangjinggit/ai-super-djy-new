import type { ModuleEnhancement } from '@/types/course';

export const claudeAgentEnhancement: ModuleEnhancement = {
  lastVerifiedOn: '2026-04-02',
  sources: [
    {
      label: 'Claude Code Overview',
      url: 'https://code.claude.com/docs/en/overview',
    },
    {
      label: 'Claude Code Common Workflows',
      url: 'https://code.claude.com/docs/en/common-workflows',
    },
    {
      label: 'Claude Code Memory',
      url: 'https://code.claude.com/docs/en/memory',
    },
    {
      label: 'Claude Code Permissions',
      url: 'https://code.claude.com/docs/en/permissions',
    },
    {
      label: 'Claude Code Slash Commands',
      url: 'https://code.claude.com/docs/en/slash-commands',
    },
    {
      label: 'Claude Code Subagents',
      url: 'https://code.claude.com/docs/en/sub-agents',
    },
    {
      label: 'Claude Code Best Practices',
      url: 'https://code.claude.com/docs/en/best-practices',
    },
    {
      label: 'Cowork Overview',
      url: 'https://claude.com/docs/cowork',
    },
    {
      label: 'Get Started with Cowork',
      url: 'https://support.claude.com/en/articles/13345190-get-started-with-cowork',
    },
  ],
  blocks: [
    {
      type: 'tool-comparison',
      title: 'Claude 双入口：先选对路，再深入',
      description: 'Claude 不是一条单线工具链。先判断你面对的是仓库，还是资料与文件空间，学习路径会清楚很多。',
      cliTitle: 'Claude Code CLI',
      coworkTitle: 'Cowork',
      items: [
        {
          aspect: '主要对象',
          cli: '代码仓库、脚本、命令行、diff、项目级文档。',
          cowork: '本地文件夹、研究资料、表格、演示文稿、连接器与浏览器内容。',
        },
        {
          aspect: '典型起手任务',
          cli: '修一个小 Bug、补一段文档、读项目结构、写一个命令化工作流。',
          cowork: '整理资料、提炼报告、生成提纲、合并多份文件形成成品草稿。',
        },
        {
          aspect: '最该写的上下文',
          cli: 'CLAUDE.md，重点是命令、目录、规范、禁止事项。',
          cowork: 'Global / Project / Folder Instructions，重点是输出格式、资料边界和工作偏好。',
        },
        {
          aspect: '最大风险',
          cli: '顺手多改文件、擅自引依赖、执行高风险命令。',
          cowork: '把猜测写成结论、误整理本地文件、在桌面端环境不稳时执行长任务。',
        },
        {
          aspect: '什么时候别先用它',
          cli: '你当前根本不在做仓库或工程任务时，不要为了“学工具”硬开终端。',
          cowork: '涉及高敏感、强监管或需要云端稳定后台执行的任务时，不要把它当默认方案。',
        },
      ],
    },
    {
      type: 'sop-templates',
      title: '直接可用的 Claude 任务模板',
      description: '先套模板，再慢慢长出自己的版本。CLI 和 Cowork 的好用程度，往往取决于你是否一开始就把任务说清。',
      items: [
        {
          title: 'CLI 小范围修复模板',
          input: '一个明确 Bug、相关文件路径、期望结果、禁止事项',
          steps: [
            '先让 Claude Code 阅读相关文件，总结现状和可能原因。',
            '要求它给出最多 5 条的执行计划，并标出会改和不会改的文件。',
            '确认计划后再允许修改，并要求修改后运行验证或给出明确验证步骤。',
            '最后输出变更说明、残留风险和下一步建议。',
          ],
          output: '一份范围清晰的修复结果 + 验证结论 + 风险摘要',
          kpi: '改动文件数可控、验证完整、没有顺手引入额外重构',
        },
        {
          title: 'Cowork 资料汇总模板',
          input: '一个文件夹或 Project、目标主题、目标读者、交付格式',
          steps: [
            '让 Cowork 先列出它实际读取了哪些文件和资料来源。',
            '要求它按主题整理信息，明确缺失点和不确定点，不要凭空补齐。',
            '指定输出格式，例如周报、研究摘要、对比表或汇报提纲。',
            '最后要求它列出建议保留、归档或继续跟进的材料。',
          ],
          output: '一份可直接继续编辑的成品草稿 + 来源清单 + 缺口说明',
          kpi: '资料引用准确、结构清晰、没有把猜测写成事实',
        },
        {
          title: 'Cowork 到 CLI 的交接模板',
          input: 'Cowork 产出的分析稿或需求整理、目标仓库路径、希望完成的下一步动作',
          steps: [
            '先由 Cowork 生成结构化交接稿，包含背景、目标、限制和待执行项。',
            '把交接稿交给 Claude Code CLI，要求它先读交接内容和仓库现状，再判断如何落地。',
            '要求 CLI 明确哪些部分已知、哪些部分仍需人工确认，不允许自行补假设。',
            '完成修改后，把最终结果回写成一份可复盘的交接记录。',
          ],
          output: '一条从资料整理到仓库执行的闭环路径',
          kpi: '交接信息无丢失、CLI 不重复探索、最终结果能回溯到原始输入',
        },
      ],
    },
    {
      type: 'weekly-plan',
      title: '7 天上手计划：先稳住一条 Claude 路径',
      description: '不要同时学太多特性。先把 CLI 或 Cowork 其中一条跑稳，再决定要不要接另一条。',
      items: [
        {
          week: 1,
          goal: '先选对入口：CLI 还是 Cowork',
          deliverable: '完成 1 次最小验证任务，并写下你当前最适合哪条路径的判断理由。',
          fallback: '如果还分不清，就各做一个 10 分钟小任务，用真实体验而不是感觉来选。',
        },
        {
          week: 2,
          goal: '把上下文系统建起来',
          deliverable: 'CLI 写出基础版 CLAUDE.md，或 Cowork 写出 Global / Folder Instructions。',
          fallback: '如果不知道写什么，就先只写 3 条常用命令或 3 条工作偏好。',
        },
        {
          week: 3,
          goal: '固化 1 个高频工作流',
          deliverable: 'CLI 跑通 1 次 5 步执行法，或 Cowork 跑通 1 次资料整理到成品输出的闭环。',
          fallback: '如果闭环太大，就把任务缩成“只分析不改”或“只整理不发布”。',
        },
        {
          week: 4,
          goal: '补边界和复用模板',
          deliverable: '写好 1 份安全边界规则，外加 1 个 slash command 或 1 个 Cowork 固定任务模板。',
          fallback: '如果命令或模板还不稳，就先记录 3 次手动成功案例，再反推模板。',
        },
      ],
    },
    {
      type: 'security-checklist',
      title: 'Claude 工作台安全配置清单',
      description: '每次启动重要任务前，确认 CLI 和 Cowork 各自的边界已经设好。',
      items: [
        {
          title: 'CLAUDE.md 已写清边界',
          detail: '常用命令、项目背景、禁止事项和高风险操作的确认规则都写进了 CLAUDE.md。',
        },
        {
          title: 'Cowork 的 Global / Folder Instructions 已收紧',
          detail: '明确输出格式、允许访问的文件范围，以及删除、外发、整理前需要确认的动作。',
        },
        {
          title: '危险操作需要确认',
          detail: '删除文件、安装依赖、对外发请求、改生产配置、执行 git push 等操作都设成必须人工确认。',
        },
        {
          title: '任务前后有可恢复机制',
          detail: '重要任务前做备份，任务后先看 git diff，再决定是否提交或回滚。',
        },
        {
          title: '用量和作用域被限制',
          detail: '默认工作目录、登录方式、额度提醒和访问权限都已经约束在当前项目所需范围内。',
        },
        {
          title: 'Cowork 的运行条件被考虑进去',
          detail: '如果使用 Cowork 的定时任务或长任务，确认桌面端保持开启、电脑保持唤醒，并避免拿它处理受监管或高敏感工作。',
        },
      ],
    },
  ],
};
