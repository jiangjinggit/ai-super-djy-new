import type { ModuleEnhancement } from '@/types/course';

export const apiGatewayEnhancement: ModuleEnhancement = {
  lastVerifiedOn: '2026-06-08',
  sources: [
    { label: 'OpenAI API Pricing', url: 'https://openai.com/api/pricing/' },
    { label: 'Anthropic API Overview', url: 'https://docs.anthropic.com/en/api/getting-started' },
    { label: 'Anthropic OpenAI SDK Compatibility', url: 'https://docs.anthropic.com/en/api/openai-sdk' },
    { label: 'Google Gemini OpenAI Compatibility', url: 'https://ai.google.dev/gemini-api/docs/openai' },
    { label: 'LiteLLM Docs', url: 'https://docs.litellm.ai/docs/' },
    { label: 'LiteLLM Proxy Reliability', url: 'https://docs.litellm.ai/docs/proxy/reliability' },
  ],
  blocks: [
    {
      type: 'weekly-plan',
      title: '4 阶段路线：从个人直连到团队网关',
      description:
        '不要一上来就做“中转平台”。先保留官方直连底线，再逐步补代理、验收和团队治理。',
      hideMeta: true,
      items: [
        {
          week: 1,
          goal: '个人官方直连',
          deliverable: '为 1 个常用工具配置官方 Base URL、API Key 和默认模型，并跑通最小请求。',
          fallback: '如果官方直连都不稳定，先不要加网关，优先排查账号、额度、模型名和本地工具配置。',
        },
        {
          week: 2,
          goal: '个人最小网关',
          deliverable: '搭出一个可解释的代理入口，完成模型映射、测试 Key、日常 Key 和官方回退路径。',
          fallback: '如果代理层排查成本太高，先保留官方直连作为主链路，只把低风险实验放进代理层。',
        },
        {
          week: 3,
          goal: '个人稳定版',
          deliverable: '跑完最小请求、长上下文请求、真实任务请求和一次人工失败演练，形成配置验收表。',
          fallback: '如果真实任务输出格式不稳定，不要接入长期工作流，先修模型映射、提示词和超时设置。',
        },
        {
          week: 4,
          goal: '小团队网关',
          deliverable: '补成员 Key、配额、模型白名单、日志策略、敏感任务边界和回退说明。',
          fallback: '如果团队规则写不清，先停在个人稳定版，不要把同一个 Key 发给多人共用。',
        },
      ],
    },
    {
      type: 'action-checklist',
      title: '先把接入层画清楚，再决定怎么搭',
      description:
        '别先找现成站点，先把你自己的问题、任务分流和验收物写出来。下面这 7 步做完，再去选工具、选代理或选部署方式。',
      hideMeta: true,
      items: [
        {
          title: '写清你到底在解决什么问题',
          timebox: '5 分钟',
          description: '支付绕路、统一入口、成本分流、多人共享、还是治理和回退？先写清目标，后面的架构才不会乱长。',
          doneDefinition: '你能用一句话说明自己为什么需要 API 中转，而不是只说“想省钱”。',
        },
        {
          title: '保留一条官方直连底线',
          timebox: '10 分钟',
          description:
            '先确认官方直连能跑通，记录官方 Base URL、Key、模型名和账单入口。它是你排查和回退时的基准线。',
          doneDefinition: '你能在不经过网关的情况下跑通一次最小请求，并知道失败时查哪里。',
        },
        {
          title: '先分出哪些任务可以过代理',
          timebox: '10 分钟',
          description:
            '把私有仓库、客户数据、支付动作、生产写入这类高敏感任务先剔出来，默认别走第三方代理。',
          doneDefinition: '你有一份允许过代理、必须直连官方、必须完全自控的任务列表。',
        },
        {
          title: '画出上游、代理层、管理层、下游工具',
          timebox: '10 分钟',
          description: '别急着写配置。先把模型来源、代理层、管理后台和最终调用工具画在同一张图里。',
          doneDefinition: '你能说清每一层负责什么，以及故障时先查哪一层。',
        },
        {
          title: '用测试 Key 跑 3 个验证请求',
          timebox: '15 分钟',
          description: '最小聊天请求、长上下文请求、真实工具请求各跑一次，不要把“返回 200”当成验证完成。',
          doneDefinition: '你至少完成 3 次不同类型的验证，并记录了模型名、耗时和报错情况。',
        },
        {
          title: '人工制造一次失败并演练回退',
          timebox: '10 分钟',
          description:
            '临时换错模型名、关掉某条路由或降低额度，确认你能按文档切到回退模型或官方直连。',
          doneDefinition: '你知道默认模型、回退模型、官方直连三层分别怎么切，恢复后怎么切回来。',
        },
        {
          title: '预先准备一条官方回退路径',
          timebox: '10 分钟',
          description: '接入层再稳也会挂。提前准备一个官方直连或备用网关，才能避免工作流在最忙的时候一起停摆。',
          doneDefinition: '你已经写好回退地址、回退 Key 和切换条件。',
        },
      ],
    },
    {
      type: 'tool-comparison',
      title: '个人直连 vs 团队网关',
      description:
        '这不是优劣榜，而是两个成熟度阶段。个人直连是准确性和排查基线，团队网关是可管理和可复用的控制面。',
      cliTitle: '个人直连',
      coworkTitle: '团队网关',
      items: [
        {
          aspect: '默认收益',
          cli: '链路最短，模型真实性和官方特性最确定，定位问题最简单。',
          cowork: '统一入口、多工具共享、成员 Key、配额、白名单、日志和回退都能集中治理。',
        },
        {
          aspect: '主要代价',
          cli: '支付、采购、多个模型 Key 管理和多工具配置都更分散。',
          cowork: '你要承担代理层稳定性、配置复杂度、成员支持和治理责任。',
        },
        {
          aspect: '适合谁',
          cli: '个人刚开始接 API、高敏感任务、生产关键链路、还没有能力维护接入层的人。',
          cowork: '3-10 人共享入口、多个工具需要统一配置、必须有配额和回退规则的小团队。',
        },
        {
          aspect: '准确性基线',
          cli: '最容易确认“我到底连的是谁”，适合作为验收对照。',
          cowork: '必须用白名单、模型映射和真实任务验收来防止模型错配。',
        },
        {
          aspect: '故障处理',
          cli: '排查路径短，问题通常集中在官方状态、Key、额度或本地工具配置。',
          cowork: '除了上游，还要检查代理层、管理层、模型映射、限速、成员 Key 和回退逻辑。',
        },
        {
          aspect: '长期价值',
          cli: '简单、硬朗、风险清楚，适合作为底线方案长期保留。',
          cowork: '一旦规则写稳，会变成多个工具和成员共享的模型接入底座。',
        },
      ],
    },
    {
      type: 'security-checklist',
      title: '接入层最小治理清单',
      description: '真正该怕的不是“搭不起来”，而是搭起来后默认把所有请求和数据都交给一层你自己都解释不清的代理。',
      hideMeta: true,
      items: [
        {
          title: '敏感任务默认不走第三方代理',
          detail: '生产仓库、客户资料、商业合同、支付流程和包含 secrets 的上下文，默认只走官方直连或你完全可控的自建链路。',
        },
        {
          title: '日志默认关闭或做脱敏',
          detail: '如果代理层或管理层会留请求日志，至少要先决定保留多久、谁能看、是否脱敏，别把完整 Prompt 和上下文长期裸奔。',
        },
        {
          title: '模型映射要写成白名单',
          detail: '只允许工具调用你明确验证过的模型名和路由，不要让“兼容层自动猜”变成默认机制。',
        },
        {
          title: '回退路径必须单独演练',
          detail: '有备用地址和真正能在 5 分钟内切过去，是两回事。回退方案至少要实际演练一次。',
        },
        {
          title: '测试 Key 和正式 Key 分开',
          detail: '测试请求、实验模型和高频重试更容易把额度打穿。把 test、daily、team 或 prod 分开，出问题才好定位。',
        },
        {
          title: '便宜到反常的服务默认不可信',
          detail: '超低价、匿名卖家、无文档、无版本说明、无错误提示机制，通常意味着后面会用掺水、灰色号源或极差运维来补。',
        },
      ],
    },
    {
      type: 'sop-templates',
      title: '两套默认 SOP：个人版和团队版',
      description: '不是所有人都该一上来做“多人共享平台”。先套用对应模板，把默认流程写下来，再决定要不要扩张复杂度。',
      hideMeta: true,
      items: [
        {
          title: '个人自用中转接入 SOP',
          input: '1 个主要工具、1 个备用工具、1 组默认模型与回退模型、1 条官方直连回退路径。',
          steps: [
            '先在本地或服务器上部署最小代理层，不急着上完整管理后台。',
            '创建 test 与 daily 两套 Key，所有新工具先走 test。',
            '验证最小请求、长上下文请求和真实任务请求各 1 次。',
            '把 Base URL、API Key、模型名和回退地址整理成一页配置说明。',
            '每周回看一次限速、报错和总成本，决定是否继续扩展。',
          ],
          output: '一套自己能解释、能切换、能回退的个人接入层。',
          kpi: '7 天内，至少 2 个常用工具可稳定接入，且你知道故障时先查哪一层。',
        },
        {
          title: '小团队共享接入 SOP',
          input: '多位使用者、角色边界、预算上限、允许模型列表、敏感任务边界和审计要求。',
          steps: [
            '先定义哪些任务允许共享入口，哪些任务必须保留官方直连。',
            '为不同成员或小组分配独立 Key、额度和默认模型白名单。',
            '管理层记录请求量、失败率、限速和异常模型切换。',
            '给每条主流程配置备用模型和官方回退路径。',
            '每周固定复盘 1 次，检查日志策略、掺水风险和支持负担。',
          ],
          output: '一套可以给 3-10 人稳定使用的共享接入层规则。',
          kpi: '30 天内，请求可追溯、额度可解释、故障可切换，而不是“有人能用就算成功”。',
        },
      ],
    },
    {
      type: 'resource-links',
      title: '继续深挖时先看这些入口',
      description: '官方文档负责核验兼容性和价格，项目文档负责看具体代理能力。第三方观察材料不适合作为价格、模型能力或兼容性依据。',
      hideMeta: true,
      items: [
        {
          title: 'OpenAI API Pricing',
          url: 'https://openai.com/api/pricing/',
          label: '官方',
          description: '核验官方 API 单价、缓存、批处理和不同模型档位时先看这里。',
          category: '官方文档',
        },
        {
          title: 'Anthropic API Getting Started',
          url: 'https://docs.anthropic.com/en/api/getting-started',
          label: '官方',
          description: 'Claude API 的请求方式、鉴权和错误处理总入口。',
          category: '官方文档',
        },
        {
          title: 'Anthropic OpenAI SDK Compatibility',
          url: 'https://docs.anthropic.com/en/api/openai-sdk',
          label: '官方',
          description: '理解“OpenAI 兼容”在 Anthropic 这边具体兼容到什么程度。',
          category: '官方文档',
        },
        {
          title: 'Gemini OpenAI Compatibility',
          url: 'https://ai.google.dev/gemini-api/docs/openai',
          label: '官方',
          description: 'Google 的 OpenAI 兼容接口说明，适合拿来对照模型名、请求格式差异，以及何时应改用原生 Gemini API。',
          category: '官方文档',
        },
        {
          title: 'LiteLLM Docs',
          url: 'https://docs.litellm.ai/docs/',
          label: '项目',
          description: '一类典型代理层文档入口，适合理解路由、模型映射和网关层能力。',
          category: '代理项目',
        },
        {
          title: 'LiteLLM Proxy Reliability',
          url: 'https://docs.litellm.ai/docs/proxy/reliability',
          label: '项目',
          description: '看回退、重试、熔断和稳定性策略时很有参考价值。',
          category: '代理项目',
        },
      ],
    },
  ],
};
