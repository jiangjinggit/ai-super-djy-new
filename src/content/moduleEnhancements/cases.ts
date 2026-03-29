import type { ModuleEnhancement } from '@/types/course';

export const casesEnhancement: ModuleEnhancement = {
  lastVerifiedOn: '2026-03-29',
  sources: [
    { label: 'TEDxIITDelhi', url: 'https://www.ted.com/tedx/events/61966' },
    { label: '腾讯云开发者社区', url: 'https://cloud.tencent.com/developer/article/1884139' },
    { label: 'Every Master Plan', url: 'https://every.to/on-every/every-s-master-plan-part-ii' },
  ],
  blocks: [
    {
      type: 'case-evidence',
      title: '案例可信度与风险提示',
      description: '案例只能给你参考坐标，不能替你承诺结果。',
      items: [
        {
          title: '个人品牌内容团队的 AI 提效经验',
          sourceLabel: 'TEDxIITDelhi',
          sourceUrl: 'https://www.ted.com/tedx/events/61966',
          publishedOn: '2025-04-13',
          reproducibility: '低',
          riskWarning: '强个人品牌、分发能力和既有团队基础不可忽略，普通人更适合学习其流程分工。',
        },
        {
          title: '非技术背景转向开发的学习路径',
          sourceLabel: '腾讯云开发者社区',
          sourceUrl: 'https://cloud.tencent.com/developer/article/1884139',
          publishedOn: '2021-09-29',
          reproducibility: '中',
          riskWarning: '案例更适合借鉴“低门槛切入 + 快速交付”的路径，不适合外推出普遍收益预期。',
        },
        {
          title: 'AI-first 小团队的协作方法',
          sourceLabel: 'Every',
          sourceUrl: 'https://every.to/on-every/every-s-master-plan-part-ii',
          publishedOn: '2025-09-26',
          reproducibility: '中',
          riskWarning: '团队的内容能力、品牌和产品化基础很强，普通团队应优先学习其分工与组织方式。',
        },
      ],
    },
  ],
};
