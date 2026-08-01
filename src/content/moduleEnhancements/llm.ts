import type { ModuleEnhancement } from '@/types/course';

export const llmEnhancement: ModuleEnhancement = {
  lastVerifiedOn: '2026-06-08',
  sources: [
    { label: 'OpenAI Models', url: 'https://platform.openai.com/docs/models' },
    { label: 'OpenAI Pricing', url: 'https://platform.openai.com/docs/pricing/' },
    { label: 'Anthropic Models', url: 'https://docs.anthropic.com/en/docs/about-claude/models/overview' },
    { label: 'Anthropic Pricing', url: 'https://www.anthropic.com/pricing#api' },
    { label: 'DeepSeek Pricing', url: 'https://api-docs.deepseek.com/quick_start/pricing/' },
    { label: 'Kimi Model List', url: 'https://platform.kimi.ai/docs/models.md' },
    { label: 'MiniMax Pricing', url: 'https://platform.minimax.io/docs/guides/pricing-paygo' },
    { label: 'Zhipu GLM Pricing', url: 'https://docs.z.ai/guides/overview/pricing' },
    { label: 'Alibaba Qwen Models', url: 'https://www.alibabacloud.com/help/en/model-studio/models' },
  ],
  blocks: [
    {
      type: 'action-checklist',
      title: '模型选型不要背型号，先建任务矩阵',
      description:
        '把任务、质量标准、候选模型、预算和复评节奏放进同一张表。具体模型版本、上下文和单价变化很快，接入前只以官方当前页面为准。',
      hideMeta: true,
      items: [
        {
          title: '把任务写成可测试样本',
          timebox: '15 分钟',
          description:
            '不要写“写作”“分析”这种大词。写成“把 3 篇竞品文章整理成 6 列对比表”，并保留真实输入、期望输出和验收标准。',
          doneDefinition: '你至少有 3 个真实样本，每个样本都能被不同模型用同一份提示词复跑。',
        },
        {
          title: '给每类任务指定 3 个角色',
          timebox: '10 分钟',
          description:
            '每类任务都填默认模型、高质量备选、低成本备选。先填角色和选择理由，再回官方页面确认具体型号、上下文和价格。',
          doneDefinition: '每类高频任务都有默认、高质量、低成本三档候选，并写清切换条件。',
        },
        {
          title: '用一次可用成本做预算',
          timebox: '10 分钟',
          description:
            '不要只看输入输出单价。把调用费、重跑次数、人工返工时间和缓存/批处理规则一起算，得到单次可交付结果的成本。',
          doneDefinition: '你的选型表里有“跑几次能用”“返工量”“预算档”三列。',
        },
        {
          title: '把 API 记录接回选型表',
          timebox: '15 分钟',
          description:
            '调用记录不是只为了记账。把真实耗时、失败率、返工情况和超预算原因回填到模型地图里，作为下次换模型的证据。',
          doneDefinition: '至少连续记录 10 次真实调用，并能说出哪类任务最值得换模型或降档。',
        },
        {
          title: '写下复评触发条件',
          timebox: '5 分钟',
          description:
            '不用追着每个新版本跑。只有任务变化、返工率上升、成本结构变化或官方发布你明确想纳入候选的模型时，才启动复评。',
          doneDefinition: '你有一条复评规则：什么情况下重测、用哪些样本、谁做最后决定。',
        },
      ],
    },
    {
      type: 'tool-comparison',
      title: '快速选型 vs 系统评测',
      description:
        '这两件事不要混用。快速选型帮你先开工，系统评测帮你把默认模型、预算档和复评节奏固定下来。',
      cliTitle: '快速选型',
      coworkTitle: '系统评测',
      items: [
        {
          aspect: '使用时机',
          cli: '刚开始接模型、任务还不多，需要尽快选一个默认方案。',
          cowork: '已经用了 2-4 周，积累了真实调用、返工和成本记录。',
        },
        {
          aspect: '样本规模',
          cli: '1-3 个高频任务，每个任务 1 份真实输入即可开始。',
          cowork: '5-10 个真实样本，覆盖高频、中复杂度和高价值任务。',
        },
        {
          aspect: '核心指标',
          cli: '质量、速度、稳定性、单次可用成本。',
          cowork: '准确性、完整性、格式稳定性、返工量、失败率、预算消耗。',
        },
        {
          aspect: '产出物',
          cli: '默认模型、高质量备选、低成本备选。',
          cowork: '任务-模型配对表、预算档、回退方案和复评计划。',
        },
        {
          aspect: '避免误区',
          cli: '不要被榜单和热门型号牵着走。',
          cowork: '不要只看平均分，要看你的高频任务是否稳定可交付。',
        },
      ],
    },
    {
      type: 'sop-templates',
      title: '一套可复制的模型治理 SOP',
      description: '把模型选型从一次性判断变成日常机制。个人可以轻量做，团队再逐步补权限和审计。',
      hideMeta: true,
      items: [
        {
          title: '个人模型选型 SOP',
          input: '3 个真实任务样本、2-3 个候选模型、官方当前价格页、1 张调用记录表。',
          steps: [
            '先写任务、输入材料和验收标准，不先写模型名。',
            '所有候选模型用同一份提示词跑一遍，记录质量、返工量、速度和调用费。',
            '按默认、高质量、低成本三档给每类任务分配模型角色。',
            '每周回看 10 次真实调用，把失败率、返工和成本回填到模型地图。',
            '只有触发复评条件时，才拿 3 个代表样本做快速复测。',
          ],
          output: '一张能解释选择理由、预算边界和复评条件的个人模型地图。',
          kpi: '连续 2 周内，80% 高频任务有稳定默认模型，且超预算调用能被解释。',
        },
        {
          title: '小团队模型治理 SOP',
          input: '团队任务清单、允许模型白名单、预算档、调用记录、敏感数据边界。',
          steps: [
            '先按任务风险分层，标出哪些任务必须直连官方或走内部可控链路。',
            '为每类任务定义默认模型、回退模型和禁止使用的模型范围。',
            '把 Key、预算、调用记录和异常复盘绑定到同一张治理表。',
            '每月复评 1 次高频任务；新模型只进入候选池，不直接替换主流程。',
            '复评结论必须写成变更记录：为什么换、换到哪里、失败时怎么退回。',
          ],
          output: '一份团队可执行的任务-模型-预算-回退规则。',
          kpi: '30 天内，团队成员能按任务选择模型，账单、返工和异常调用都有记录可查。',
        },
      ],
    },
    {
      type: 'resource-links',
      title: '官方核验入口',
      description:
        '课程里的模型角色只是评估方法，不是固定推荐榜。具体版本、价格、上下文、地区差异和缓存规则，以官方当前页面为准。',
      hideMeta: true,
      items: [
        {
          title: 'OpenAI Models',
          url: 'https://platform.openai.com/docs/models',
          label: '官方',
          description: '核验 OpenAI 当前可用模型、能力边界和上下文说明。',
          category: '模型文档',
        },
        {
          title: 'OpenAI Pricing',
          url: 'https://platform.openai.com/docs/pricing/',
          label: '官方',
          description: '核验 API 单价、缓存、批处理和计费规则。',
          category: '价格',
        },
        {
          title: 'Anthropic Models',
          url: 'https://docs.anthropic.com/en/docs/about-claude/models/overview',
          label: '官方',
          description: '核验 Claude 模型列表、能力差异和上下文限制。',
          category: '模型文档',
        },
        {
          title: 'Anthropic Pricing',
          url: 'https://www.anthropic.com/pricing#api',
          label: '官方',
          description: '核验 Claude API 的最新价格与计费说明。',
          category: '价格',
        },
        {
          title: 'DeepSeek Pricing',
          url: 'https://api-docs.deepseek.com/quick_start/pricing/',
          label: '官方',
          description: '核验 DeepSeek API 的价格、缓存和模型说明。',
          category: '价格',
        },
        {
          title: 'Alibaba Qwen Models',
          url: 'https://www.alibabacloud.com/help/en/model-studio/models',
          label: '官方',
          description: '核验 Qwen 商业模型、上下文和区域说明。',
          category: '模型文档',
        },
      ],
    },
  ],
};
