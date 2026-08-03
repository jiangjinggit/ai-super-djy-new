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
      type: 'tool-comparison',
      title: '先决定：直连还是网关',
      description: '没有统一入口、预算、权限或回退需求时，不必为了技术感增加中间层。',
      cliTitle: '官方直连',
      coworkTitle: '自建或团队网关',
      items: [
        {
          aspect: '更适合',
          cli: '单一模型、敏感任务、原生能力验证和关键生产链路。',
          cowork: '多个工具或调用方需要统一配置、预算、权限和回退。',
        },
        {
          aspect: '主要优势',
          cli: '链路短，官方特性和问题定位更直接。',
          cowork: '接入规则集中，模型映射、配额和回退更容易统一。',
        },
        {
          aspect: '主要代价',
          cli: '多个供应商和工具要分别管理配置。',
          cowork: '多一层故障、数据和运维责任，必须自己验收。',
        },
        {
          aspect: '默认原则',
          cli: '不确定是否需要网关时，先保持直连。',
          cowork: '只有收益大于新增复杂度时再引入。',
        },
      ],
    },
    {
      type: 'action-checklist',
      title: '完成这 5 步，接入才算结束',
      description: '一张最小检查表，替代重复的路线图、周计划和多套 SOP。',
      hideMeta: true,
      items: [
        {
          title: '选路线',
          timebox: '5 分钟',
          description: '根据任务敏感度和统一管理需求，选择官方直连、自建网关或暂不增加中间层。',
          doneDefinition: '能解释为什么选择这条链路，以及哪些数据不能经过第三方。',
        },
        {
          title: '写清四项配置',
          timebox: '10 分钟',
          description: '记录 Base URL、凭据归属、API 类型和模型名/映射。',
          doneDefinition: '遇到问题时知道应该先查地址、权限、端点还是模型映射。',
        },
        {
          title: '跑三类验证',
          timebox: '15 分钟',
          description: '依次运行最小请求、代表性输入和真实任务，不把返回 200 当成最终验收。',
          doneDefinition: '关键格式、工具调用、上下文和耗时满足真实任务要求。',
        },
        {
          title: '演练一次失败',
          timebox: '10 分钟',
          description: '在非生产环境验证有限重试、备用路线或直连基线。',
          doneDefinition: '知道哪些错误可重试、哪些必须先修配置或人工处理。',
        },
        {
          title: '写下四条底线',
          timebox: '10 分钟',
          description: '明确敏感任务、凭据隔离、日志最小化和模型/预算白名单。',
          doneDefinition: '接入层的数据、权限和暂停条件都有明确规则。',
        },
      ],
    },
    {
      type: 'resource-links',
      title: '需要核验时查官方文档',
      description: '课程只讲稳定原则；具体端点、参数、限额和兼容范围以当前官方说明为准。',
      hideMeta: true,
      items: [
        {
          title: 'OpenAI API Reference',
          url: 'https://platform.openai.com/docs/api-reference/introduction',
          label: '官方',
          description: '查看当前鉴权、端点和请求结构。',
          category: '官方文档',
        },
        {
          title: 'Anthropic OpenAI SDK Compatibility',
          url: 'https://docs.anthropic.com/en/api/openai-sdk',
          label: '官方',
          description: '核验 Anthropic 的 OpenAI SDK 兼容范围。',
          category: '官方文档',
        },
        {
          title: 'Gemini OpenAI Compatibility',
          url: 'https://ai.google.dev/gemini-api/docs/openai',
          label: '官方',
          description: '核验 Gemini 的 OpenAI 兼容接入方式。',
          category: '官方文档',
        },
        {
          title: 'LiteLLM Proxy Reliability',
          url: 'https://docs.litellm.ai/docs/proxy/reliability',
          label: '项目',
          description: '查看重试、回退和可靠性配置。',
          category: '代理项目',
        },
      ],
    },
  ],
};
