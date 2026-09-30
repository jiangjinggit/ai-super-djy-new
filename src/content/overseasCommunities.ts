import type { TutorialLesson } from './overseasTutorials';

// 整理自用户提供的 7 张截图。动态统计与未核实的推荐排名不收录。
export const communityLesson: TutorialLesson = {
  id: 'communities',
  title: '出海社区怎么选、怎么参与',
  question: 'Indie Hackers、Reddit、V2EX、X 和发布平台，先用哪个？',
  result: '选出一个交流入口和一个目标用户渠道，留下规则、反馈与下一步记录。',
  steps: [
    { title: '先分清你要找谁', text: '找同行讨论定价、开发和经营，可以从 Indie Hackers 或 V2EX 开始；找需求和试用者，要去目标用户讨论工作任务的地方。开发者工具的用户可能就是同行，商品生图工具的用户则可能是卖家。先选 1—2 个入口，够用再增加。' },
    { title: '按任务选择社区', text: '下表是用途对照，不是流量或效果排名。SaaS 是通过网络提供的软件服务；Micro SaaS 是聚焦小范围需求的软件服务；MRR 指每月经常性收入，不等于利润。不要因为有人晒收入，就认定其产品或方法适合你。' },
    { title: '先读近期讨论和规则', text: '打开社区介绍、置顶帖和规则，查看与你相关的近期讨论是否有人认真回复。记录是否允许自荐、指定发帖区、账号限制和链接要求。Reddit 各子社区规则独立；不确定时先问管理员。规则和活跃度会变化，执行当天再核对。' },
    { title: '用具体问题参与，说明自己的身份', text: '先回答你确实懂的问题。有可用样例后，再按规则说明“我是开发者”、适用人群、能做什么、当前限制和一个具体反馈问题。公开开发（Build in Public）是分享制作过程、取舍和真实观察，不要求每天发帖或公开收入；标签只是发现讨论的入口。' },
    { title: '可体验后再考虑发布平台', text: 'Show HN 适合展示自己制作、别人能实际尝试的作品，应降低试用门槛，发布前阅读官方说明。Product Hunt 可用于产品发布与发现，也有交流功能；是否投入取决于受众和准备程度。两者都不保证曝光、用户或收入，不用拉票、互赞替代真实反馈。' },
    { title: '分别记录同行建议和用户行为', text: '给不同渠道设置来源标记，记录统计周期、访客、完成核心任务和付费人数。同行说“界面不错”是体验建议；目标用户提交自己的素材、完成任务或回来再用，才是进一步验证需求的线索。无回复、拒绝和删除原因也要记录。' },
  ],
  visual: {
    kind: 'decision', title: '先去哪个社区？', question: '这次主要想了解目标用户的问题吗？',
    yes: '去人群或行业社区，读求助帖并交流', no: '去同行社区，带一个具体问题讨论',
    caption: '有了可体验作品，再增加发布渠道。同行建议和目标用户的使用结果分开记录。',
  },
  example: {
    title: '社区用途对照', columns: ['入口', '适合做什么', '先做什么 / 注意什么'],
    rows: [
      ['Indie Hackers', '独立开发、定价、经营和获客经验交流', '找同类产品讨论；收入自述需看日期、成本和证据。'],
      ['Reddit · r/indiehackers', '同行交流、开发过程与经验讨论', '先看本版规则；同行的兴趣不代表目标客户愿意买。'],
      ['Reddit · r/SideProject', '展示小项目，征求具体体验反馈', '规则允许时提供可试样例，问“你在哪一步卡住”。'],
      ['Reddit · r/SaaS', '软件服务的定价、经营与增长讨论', '带具体问题和背景，不把讨论区当广告目录。'],
      ['Reddit · r/microsaas、r/buildinpublic', '小型软件服务、公开开发相关讨论的补充入口', '按当前相关讨论和规则判断，暂不必全部加入。'],
      ['目标用户所在的行业社区', '了解工作流程、现有做法和真实困难', '先确认人群匹配；行业社区不一定允许产品推广。'],
      ['V2EX · 分享创造', '用中文交流作品、实现方法和体验', '说明作品用途和限制；不能据此推断海外市场需求。'],
      ['X · #buildinpublic、#indiehackers', '发现创作者，持续交流产品进展', '关注具体的人和讨论，少量相关标签即可；无须堆 #AI 等泛标签。'],
      ['Hacker News · Show HN', '展示可体验作品，讨论技术与产品取舍', '先读 Show HN 说明和站规，准备回答实现与限制。'],
      ['Product Hunt', '产品发布、发现和反馈', '准备演示、介绍和反馈入口；榜单成绩不等于付费验证。'],
    ],
    note: '用途建议不代表当前活跃度或获客效果。整理日期：2026-09-28；未逐一核实实时发帖门槛，不收录截图中的星级、主题数和“必用”结论。',
  },
  snippets: [
    { title: '征求反馈的英文示例', text: 'I’m building [product] for [specific users] who need to [task].\nHere is a working example: [link, only if allowed].\nIt currently supports [scope], but does not yet handle [limitation].\nIf you try it, where do you get stuck?', note: '中文意思：说明你为谁解决什么任务，给出可用样例和限制，询问使用卡点。方括号请换成真实信息；仅在允许自荐时使用。' },
    { title: '公开开发记录示例', text: 'This week I changed [feature] because [observed problem].\nI tested it with [actual sample and method].\nWhat I observed: [result, including failures].\nStill unknown: [question]. Next I’ll test [one change].', note: '中文意思：写改动原因、实际测试、观察结果、未知和下一步。没有数据就写尚未测试，不补造用户数或收入。' },
  ],
  exercise: '以自己的产品选 2 个候选入口：一个用于交流，一个用于接触目标用户。各读 3 条相关讨论并保存规则链接；选择其中一个，完成一次符合规则的提问或回复。不允许推广时，用正常交流了解问题。数量仅是起步练习。',
  template: '# 我的社区参与记录\n日期 / 产品 / 目标人群：\n本轮目的：同行建议 / 需求调研 / 试用反馈 / 发布\n社区与相关讨论链接：\n规则链接 / 核对日期 / 自荐与链接限制：\n为什么这里有我要找的人：\n本轮提问或回复 / 自己的开发者身份说明：\n样例与限制（如适用）：\n反馈来源：同行 / 目标用户 / 尚不确定\n反馈原话（匿名）/ 实际行为：\n如做推广：来源标记 / 统计周期 / 访客 / 完成任务 / 付费人数\n投入时间 / 费用 / 未回复或删帖原因：\n决定：继续 / 换入口 / 改产品\n依据与下一步：',
  checks: ['选择理由能对应具体人群和任务，规则链接与核对日期已保存。', '完成了一次合规参与，记录真实反馈或暂无反馈；没有把阅读、点赞和上榜当作需求验证。'],
  troubleshooting: [
    { problem: '只收到同行点赞', action: '保留体验建议，另找目标用户验证；例如 AI PDF 工具，应先确定是学生读论文还是财务处理票据，再找对应人群的讨论。' },
    { problem: '帖子被删或无法发链接', action: '读提示和规则，必要时询问管理员；不要换号重发、伪装用户推荐或群发私信。' },
    { problem: '发了一次没人回应', action: '检查讨论是否相关、问题是否具体、样例是否可用。一次无回应不证明没有市场；设时间上限，再决定换入口。' },
    { problem: '看到漂亮的收入截图，想直接照做', action: '核对时间、收入定义、退款与成本、用户来源和可复现条件。无法核实就当线索，不当经营事实。' },
  ],
  resources: [
    { title: 'Indie Hackers', url: 'https://www.indiehackers.com/' },
    { title: 'Reddit · r/indiehackers', url: 'https://www.reddit.com/r/indiehackers/' },
    { title: 'Reddit · r/SideProject', url: 'https://www.reddit.com/r/SideProject/' },
    { title: 'Reddit · r/SaaS', url: 'https://www.reddit.com/r/SaaS/' },
    { title: 'Reddit · r/microsaas', url: 'https://www.reddit.com/r/microsaas/' },
    { title: 'Reddit · r/buildinpublic', url: 'https://www.reddit.com/r/buildinpublic/' },
    { title: 'V2EX · 分享创造', url: 'https://www.v2ex.com/go/create' },
    { title: 'X · #buildinpublic', url: 'https://x.com/hashtag/buildinpublic' },
    { title: 'Hacker News · Show HN 官方说明', url: 'https://news.ycombinator.com/showhn.html' },
    { title: 'Hacker News · 社区规则', url: 'https://news.ycombinator.com/newsguidelines.html' },
    { title: 'Product Hunt', url: 'https://www.producthunt.com/' },
  ],
};
