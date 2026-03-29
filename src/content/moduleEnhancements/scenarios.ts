import type { ModuleEnhancement } from '@/types/course';

export const scenariosEnhancement: ModuleEnhancement = {
  lastVerifiedOn: '2026-03-29',
  sources: [
    { label: 'Cursor', url: 'https://cursor.com/' },
    { label: 'OpenAI API Docs', url: 'https://developers.openai.com/api/docs/models' },
    { label: 'DeepSeek API Docs', url: 'https://api-docs.deepseek.com/' },
    { label: 'OpenClaw Docs', url: 'https://docs.openclaw.ai/' },
  ],
  blocks: [
    {
      type: 'sop-templates',
      title: '场景 SOP 模板（输入-步骤-输出-KPI）',
      description: '这些模板的意义不是照抄，而是帮你快速看到一个可复用流程长什么样。',
      items: [
        {
          title: '内容创作者 SOP（周更）',
          input: '主题方向、目标用户、平台、已有素材和本周目标',
          steps: [
            '抓取或整理本周素材并按主题聚类',
            '输出 3 个角度并确定一个主选题',
            '生成初稿、平台改写版本和 CTA',
            '发布后 24 小时记录数据与评论关键词',
          ],
          output: '1 篇主稿 + 1 组平台适配文案 + 1 份复盘记录',
          kpi: '单周稳定产出，且复盘记录持续回写到下一轮选题中',
        },
        {
          title: '独立开发者 SOP（MVP）',
          input: '目标用户、核心问题、主流程、验收标准和不做清单',
          steps: [
            '先写清需求边界和不做范围',
            '拆分核心流程并做最小实现',
            '补齐测试、说明文档和验收清单',
            '上线收集反馈并按优先级决定迭代',
          ],
          output: '可访问 MVP + 测试清单 + 反馈列表',
          kpi: '尽快拿到真实用户反馈，而不是无限扩功能',
        },
        {
          title: '电商 / 自由职业 SOP（日频）',
          input: 'FAQ、商品或服务说明、报价规则、当天咨询与交付信息',
          steps: [
            '咨询先分类，再草拟回复和升级条件',
            '生成素材初稿、报价说明和交付提示',
            '汇总当天问题、异议和成交影响因素',
            '把高频问题回写到 FAQ 和模板中',
          ],
          output: '咨询汇总 + 回复草稿 + 报价说明 + 日复盘',
          kpi: '减少重复沟通时间，同时保持承诺边界清晰',
        },
      ],
    },
  ],
};
