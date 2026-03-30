import type { ModuleEnhancement } from '@/types/course';

export const growthEnhancement: ModuleEnhancement = {
  lastVerifiedOn: '',
  sources: [],
  blocks: [
    {
      type: 'weekly-plan',
      title: '12 周执行路线（带回退策略）',
      description: '先把任务感知和模板化做好，再逐步推向验证和对外输出。',
      items: [
        { week: 1, goal: '列出重复任务并做优先级判断', deliverable: '任务清单 + 3 个优先优化对象', fallback: '至少选出 1 个高频低风险任务' },
        { week: 2, goal: '为 3 个任务写出最小模板', deliverable: '3 个可复用模板', fallback: '先固化 1 个最好用的模板' },
        { week: 3, goal: '完成第一批真实交付', deliverable: '至少 5 个真实任务结果', fallback: '先完成 3 个并写复盘' },
        { week: 4, goal: '建立知识库与案例归档', deliverable: '模板库 + 失败案例记录', fallback: '先把有效模板集中到一个地方' },
        { week: 5, goal: '识别可模板化流程', deliverable: '3 条候选流程', fallback: '先明确 1 条最值得模板化的流程' },
        { week: 6, goal: '把 1 条流程升级为半自动', deliverable: '可重复执行的流程说明', fallback: '保留手动触发，但先跑顺结构' },
        { week: 7, goal: '为流程补充质量门禁', deliverable: '检查清单 + 失败处理策略', fallback: '先保留人工抽检和确认点' },
        { week: 8, goal: '开始公开分享或内部沉淀', deliverable: '1 篇方法总结或 1 份内部说明', fallback: '至少整理出 1 份案例文档' },
        { week: 9, goal: '确定一个验证方向', deliverable: 'MVP / 服务 / 内容产品方向说明', fallback: '先写出 1 页方向说明' },
        { week: 10, goal: '做最小版本并开始收反馈', deliverable: '可演示版本或服务页面', fallback: 'Landing page + 收集表单先上线' },
        { week: 11, goal: '根据反馈做第一次迭代', deliverable: '反馈分类 + 优先级调整', fallback: '先完成 5 条真实反馈整理' },
        { week: 12, goal: '完成一次小规模验证', deliverable: '首批反馈、预约、试点或首单', fallback: '先完成一次可复盘的免费试点' },
      ],
    },
  ],
};
