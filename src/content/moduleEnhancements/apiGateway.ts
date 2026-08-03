import type { ModuleEnhancement } from '@/types/course';

export const apiGatewayEnhancement: ModuleEnhancement = {
  lastVerifiedOn: '2026-08-03',
  sources: [
    { label: 'OpenAI API Reference', url: 'https://platform.openai.com/docs/api-reference/introduction' },
    { label: 'OpenAI Responses API', url: 'https://platform.openai.com/docs/api-reference/responses' },
    { label: 'OpenAI Rate Limits Guide', url: 'https://platform.openai.com/docs/guides/rate-limits' },
    { label: 'Anthropic API Overview', url: 'https://docs.anthropic.com/en/api/overview' },
    { label: 'Anthropic OpenAI SDK Compatibility', url: 'https://docs.anthropic.com/en/api/openai-sdk' },
    { label: 'Google Gemini OpenAI Compatibility', url: 'https://ai.google.dev/gemini-api/docs/openai' },
    { label: 'LiteLLM Virtual Keys', url: 'https://docs.litellm.ai/docs/proxy/virtual_keys' },
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
          deliverable: '搭出一个可解释的代理入口，完成模型映射、测试/正式调用隔离和直连基线。',
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
          deliverable: '补调用方独立凭据、配额、模型白名单、最小化日志、敏感任务边界和回退说明。',
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
          title: '用隔离的测试凭据跑 3 个验证请求',
          timebox: '15 分钟',
          description: '先确认工具使用 Chat Completions、Responses API 还是供应商原生接口，再跑最小请求、长上下文请求和真实工具请求。',
          doneDefinition: '你完成了 3 类验证，并记录 API 类型、模型名、耗时、响应元数据和报错情况。',
        },
        {
          title: '人工制造一次失败并演练回退',
          timebox: '10 分钟',
          description:
            '在非生产环境制造可控的暂时性失败，确认有限重试、备用路由或直连基线按预期工作；不要用真实写入动作做破坏性演练。',
          doneDefinition: '你知道哪些错误允许重试或回退、哪些必须先修配置，并能恢复到主路由。',
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
          cowork: '出现多个调用方、共享预算、权限差异，或多个工具必须统一配置与回退规则的团队。',
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
          title: '测试与正式调用必须真正隔离',
          detail: '优先使用供应商项目、工作区、服务账号或网关虚拟 Key 隔离环境和调用方；只改 Key 名称但仍共享同一权限与预算，不算完成隔离。',
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
            '按平台能力使用项目、工作区、服务账号或虚拟 Key 隔离测试与正式调用。',
            '确认 API 类型后，验证最小请求、长上下文请求和真实任务请求。',
            '把 Base URL、API 类型、凭据归属、模型名和回退条件整理成一页配置说明。',
            '按调用量和风险回看限速、报错和总成本；异常时立即复查。',
          ],
          output: '一套自己能解释、能切换、能回退的个人接入层。',
          kpi: '至少 1 条真实主流程通过成功路径与失败路径验收，且你知道故障时先查哪一层。',
        },
        {
          title: '小团队共享接入 SOP',
          input: '多位使用者、角色边界、预算上限、允许模型列表、敏感任务边界和审计要求。',
          steps: [
            '先定义哪些任务允许共享入口，哪些任务必须保留官方直连。',
            '为不同成员或小组分配独立 Key、额度和默认模型白名单。',
            '管理层记录请求量、失败率、限速和异常模型切换。',
            '给每条主流程配置备用模型和官方回退路径。',
            '按调用量和风险复盘日志策略、模型错配信号、异常账单和支持负担。',
          ],
          output: '一套适用于多个调用方的共享接入层规则。',
          kpi: '请求可追溯、预算可解释、权限可区分、故障可切换，而不是“有人能用就算成功”。',
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
          title: 'OpenAI API Reference',
          url: 'https://platform.openai.com/docs/api-reference/introduction',
          label: '官方',
          description: '核验鉴权、请求结构、响应头和当前 API 端点时先看这里。',
          category: '官方文档',
        },
        {
          title: 'OpenAI Responses API',
          url: 'https://platform.openai.com/docs/api-reference/responses',
          label: '官方',
          description: '确认下游工具是否依赖 Responses API，避免把 Chat Completions 示例误当成唯一兼容标准。',
          category: '官方文档',
        },
        {
          title: 'OpenAI Rate Limits Guide',
          url: 'https://platform.openai.com/docs/guides/rate-limits',
          label: '官方',
          description: '核验 429、限额维度和退避策略时使用，不要对所有错误无上限重试。',
          category: '官方文档',
        },
        {
          title: 'Anthropic API Getting Started',
          url: 'https://docs.anthropic.com/en/api/overview',
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
          title: 'LiteLLM Virtual Keys',
          url: 'https://docs.litellm.ai/docs/proxy/virtual_keys',
          label: '项目',
          description: '理解网关如何按调用方隔离凭据、预算与模型权限；具体字段以当前项目版本为准。',
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
