import { OVERSEAS_PATH } from './overseas';

export type TutorialVisual =
  | { kind: 'flow'; title: string; steps: string[]; caption?: string }
  | { kind: 'decision'; title: string; question: string; yes: string; no: string; caption: string }
  | { kind: 'sequence'; title: string; events: { from: string; to: string; text: string }[]; caption: string };

export interface TutorialLesson {
  id: string;
  title: string;
  question: string;
  result: string;
  steps: { title: string; text: string }[];
  visual: TutorialVisual;
  example: { title: string; columns: string[]; rows: string[][]; note?: string };
  snippets?: { title: string; text: string; note: string }[];
  exercise: string;
  template: string;
  checks: string[];
  troubleshooting: { problem: string; action: string }[];
  resources?: { title: string; url: string }[];
}

export interface TutorialTopic {
  id: string;
  title: string;
  subtitle: string;
  intro: string;
  outcome: string;
  stages: string[];
  lessons: TutorialLesson[];
}

export const TUTORIAL_REVIEWED = '2026-09-05';
export const NOVA_REVIEW_COMMIT = '808175e12503dfd6d5696e278134ff33040a9929';
const novaSource = `https://github.com/tianjiangqiji/nova-image-studio/tree/${NOVA_REVIEW_COMMIT}`;
const novaReadme = `${novaSource}/README.md`;
const note = '以下均为教学演示，换成你自己的真实记录后，再作判断。';

export const OVERSEAS_TUTORIALS: TutorialTopic[] = [
  {
    id: 'demand', title: '如何找需求', subtitle: '找到人，听懂问题，再验证',
    intro: '从一条具体抱怨开始，找到有同样问题的人，用一个小试验决定值不值得做。',
    outcome: '一份有来源的需求记录，以及继续、调整或暂停的决定。', stages: ['start', 'research', 'validate'],
    lessons: [
      {
        id: 'find-clues', title: '去哪里找，搜什么', question: '没有海外用户资源，怎么开始？', result: '收集一批能追溯来源的需求线索。',
        steps: [
          { title: '先选一个容易接触的人群', text: '填“哪类人 + 什么场景 + 想完成什么”。例如：卖手工饰品的独立网店卖家，需要节日商品图。先选一个语言和市场，别把所有海外用户放在一起。' },
          { title: '从三个入口找原话', text: 'Google 找相关讨论；Reddit 找这类人的社区；工具评价区找他们对现有办法的不满。先读社区介绍和发帖规则，再看近期讨论，不先发产品广告。' },
          { title: '用任务词搭配问题词搜索', text: '先搜 product photography background（商品摄影背景），再加 time consuming（费时）、inconsistent（不一致）或 how to（怎么做）。打开原帖看上下文，AI 翻译后再核对原句。' },
          { title: '每条线索记下六件事', text: '记录人群、原话、发生场景、现有办法、来源链接和日期。先找 10 条作为练习；同一帖子被转发不算多个独立需求。数量只是起点，还要访谈。' },
        ],
        visual: { kind: 'flow', title: '把一条抱怨变成可验证的问题', steps: ['找到原帖', '读场景与现有办法', '记录证据', '找同类人核实'] },
        example: { title: '需求线索长什么样', columns: ['看到的内容（演示）', '怎么处理'], rows: [['“AI tools are cool.”（AI 工具很酷）', '没有具体场景，暂不当作需求。'], ['“Changing backgrounds takes me an hour.”（换背景要一小时）', '追问上次处理多少张、怎么做、哪个步骤最慢。'], ['“The necklace color keeps changing.”（项链颜色总变）', '验证保持商品颜色是否是必须满足的条件。']], note },
        snippets: [{ title: '可以直接试的搜索词', text: 'site:reddit.com "product photography" "background"\n"jewelry photos" "time consuming"\n"AI product photos" "color" review', note: '搜索结果受地区、时间和个性化影响。搜不到时缩短关键词，或换成用户实际使用的说法。' }],
        exercise: '选一类用户，找 10 条线索。挑出最具体的 3 条，写下你还不知道什么。',
        template: '# 需求线索表\n目标人群 / 市场 / 语言：\n搜索词：\n\n## 线索 1（复制此段继续记录）\n原话与中文理解：\n发生场景：\n现在怎么解决：\n花费的时间或金钱：\n来源链接 / 日期：\n是否独立来源：\n仍需核实：',
        checks: ['至少一条线索能打开原始来源，明确说出谁在什么场景遇到什么问题。', '原话与自己的推测分开记录，没有把点赞或转发当作需求证据。'],
        troubleshooting: [{ problem: '只搜到广告和工具榜单', action: '加入具体任务词或社区域名，优先看实际求助和差评。' }, { problem: '看不懂英文', action: '保留原文，让 AI 逐句翻译；有歧义的地方标“待核实”，不要让它补写用户经历。' }],
        resources: [{ title: 'Reddit：搜索社区和讨论', url: 'https://www.reddit.com/' }],
      },
      {
        id: 'compare-options', title: '怎么看竞品，挑值得做的问题', question: '同类工具很多，我还能做什么？', result: '选出一个有证据、接触得到用户、做得起的问题。',
        steps: [
          { title: '列出三种现有办法', text: '找一个同类工具、一个手动办法、一个外包服务。用户可能在用 Photoshop 或摄影师，不一定在用另一个 AI 网站。' },
          { title: '用相同任务比较', text: '用你有权使用的同一张商品图，完成一次换背景。记录步骤、用时、效果、价格与限制；免费版无法测试的项目写“未测”。' },
          { title: '把差评改写成要求', text: '“颜色变了”改成“商品颜色保持一致”；“操作太多”改成“上传后少量步骤完成”。再问用户哪个最影响实际使用，别自己替他们排序。' },
          { title: '选一个先验证', text: '逐项判断：反复发生吗、后果明显吗、现在付出成本吗、能找到人试吗、你能在预算内做吗？每项写证据；遇到核心未知，先做小试验。' },
        ],
        visual: { kind: 'decision', title: '竞品多，下一步看什么？', question: '有具体的不满，而且能找到人试吗？', yes: '选一个不满，准备样例', no: '继续找场景和真实用户', caption: '有竞品说明存在解决办法，不直接证明你的版本有人买。' },
        example: { title: '用同一张图做对照', columns: ['办法', '本次演示观察', '待验证机会'], rows: [['手动修图', '20 分钟；商品颜色稳定', '卖家是否更看重省时间？'], ['AI 工具 A', '2 分钟；饰品颜色有偏差', '是否能在提速时保持颜色？'], ['摄影师', '效果好；要预约和寄送', '是否只有重要商品才值得拍？']], note: `${note} 用时和效果均是假设，不代表任何真实服务。` },
        exercise: '完成三种办法的对照，只选一个问题进入下一步。',
        template: '# 竞品与机会\n同一个测试任务：\n素材使用权限：\n\n| 办法 | 版本/日期/链接 | 步骤与用时 | 成本 | 效果与限制 |\n| --- | --- | --- | --- | --- |\n| | | | | |\n\n我选择的问题：\n用户证据：\n为什么先做它：\n做得起吗：\n哪些结论还没测：',
        checks: ['三种办法比较的是同一个任务，未知项明确标出。', '选中的问题有用户证据，而不只是“竞品没有这个按钮”。'],
        troubleshooting: [{ problem: '想做的功能越来越多', action: '只保留直接解决选中问题的功能，其他放进“以后再看”。' }, { problem: '完全找不到竞品', action: '先找用户现在的手工办法；连现有做法都找不到，就继续核实问题是否存在。' }],
      },
      {
        id: 'talk-to-users', title: '怎样找到人，开口问什么', question: '怕打扰别人，也不知道怎么访谈？', result: '拿到关于过去行为的记录，而非一句“挺好的”。',
        steps: [
          { title: '列出可接触的人', text: '从公开求助帖、卖家社区和认识的从业者中找符合人群的人。先约 3—5 位，记录是否回复；朋友也能帮忙，但要标明关系。' },
          { title: '发一条简短邀请', text: '说明你在研究什么、为什么找到他、需要约 15 分钟。先征得交流意愿；不群发、不反复追问。录音或引用前另问许可。' },
          { title: '先问上一次，不急着介绍产品', text: '依次问：上次是什么时候？能描述操作过程吗？哪里卡住？花了多久或多少钱？结果怎样？试过别的办法吗？用对方经历继续追问。' },
          { title: '结束后整理事实和未知', text: '保留具体行为与原话，单独写自己的解释。最后可以问是否愿意看样例、用自己的素材试；把实际提交和口头答应分开。' },
        ],
        visual: { kind: 'flow', title: '一次简短访谈的顺序', steps: ['征得交流意愿', '回忆上次经历', '追问代价与替代办法', '约定下一次小测试'] },
        example: { title: '把问题问具体', columns: ['少这样问', '换成这样问'], rows: [['你需要 AI 生图吗？', '你上次准备商品图时，具体怎么做？'], ['你觉得我的想法好吗？', '这组样例里，哪张能直接用，哪张不能？为什么？'], ['你愿意付多少钱？', '你现在为这件事花多少钱？这个明确套餐，你会在哪种情况下买？']], note },
        snippets: [{ title: '英文邀请示例', text: 'Hi, I saw your post about product photo backgrounds.\nI’m researching how small jewelry shops prepare their images.\nWould you be open to a 15-minute chat about your last experience?\nNo sales pitch. No worries if now isn’t a good time.', note: '意思是：说明来意，约一次短交流，并允许拒绝。只有确实看过对方相关帖子时，才用第一句。' }],
        exercise: '完成一次真实交流。把“用户做过的事”和“用户说可能会做的事”分开写。',
        template: '# 用户交流记录\n日期 / 匿名代号 / 如何认识：\n是否符合目标人群：\n是否同意记录和引用：\n\n上次任务与过程：\n最麻烦的一步：\n已付出的时间/金钱：\n试过的替代办法：\n原话：\n我的推测：\n实际后续行动：\n下一次要核实：',
        checks: ['记录包含一次真实发生的任务、处理办法和代价。', '没有把引导性提问得到的赞同当作结论，未回复也如实记录。'],
        troubleshooting: [{ problem: '没人回复', action: '检查人群和邀请是否具体；去允许调研的地方招募，缩短交流请求，不增加骚扰频次。' }, { problem: '对方一直夸想法', action: '回到最近一次实际操作，或请他用素材试样例。' }],
      },
      {
        id: 'test-demand', title: '不写完整产品，也能验证需求', question: '怎么判断值得投入开发？', result: '一份有实际行为和下一步决定的验证记录。',
        steps: [
          { title: '先写试验规则', text: '写清人群、问题、样本、预算、结束条件和观察信号。比如先约 5 位卖家，看是否提交商品图、能否采用结果、是否愿意按明确价格购买。这个样本不能代表整个市场。' },
          { title: '做输入与输出样例', text: '用允许处理的图片，手动生成几组前后对比。明确告知这是人工协助的早期试验，说明交付时间、适用范围和预计价格。' },
          { title: '让对方完成一个动作', text: '邀请上传自己的素材、选一张可用图或试用。若尚未具备收款条件，只记录询价或购买意向；有合法可用的交付与收款方式后，才做付费试验。' },
          { title: '按结果作决定', text: '有采用、复用或付费信号，就做小版本继续测；有人试但效果不行，先改样例；目标用户没人行动，就查人群、问题和表达，必要时暂停。' },
        ],
        visual: { kind: 'decision', title: '是否进入开发？', question: '用户采取行动，而且核心效果可用吗？', yes: '做最小版本，继续测付费与复用', no: '改样例、换场景，或暂停', caption: '不要把“有人问价”升级成“已经证明能赚钱”。' },
        example: { title: '五人试验怎么记', columns: ['行为（演示）', '可得出的结论'], rows: [['5 人受邀，2 人提交素材', '两人愿意试；其余拒绝或未回复要分开记。'], ['其中 1 人采用结果并询价', '效果有初步价值，价格接受度还没验证。'], ['0 人真实付款', '真实收入仍为 0；不能写成付费验证成功。']], note },
        exercise: '用样例跑一轮验证，写下继续、调整或暂停，以及理由。',
        template: '# 需求小试验\n人群 / 场景：\n样例与预期价格：\n开始/结束日期 / 预算上限：\n事先约定的判断信号：\n\n受邀 / 回复 / 提交素材 / 采用 / 再次使用 / 真实付款人数：\n拒绝与未回复：\n证据链接（脱敏）：\n决定：继续 / 调整 / 暂停\n理由与下一轮未知：',
        checks: ['结果包含实际行为、拒绝或未回复，并区分意向和真实付款。', '有证据支持的下一步决定，不因一次好评直接投入完整开发。'],
        troubleshooting: [{ problem: '样例很好看但没人用', action: '请用户指出是否符合真实工作要求，例如商品颜色、比例或分辨率。' }, { problem: '想无限调研下去', action: '到事先写下的结束条件就复盘，明确还缺哪条关键证据，下一轮只补它。' }],
      },
    ],
  },
  {
    id: 'product', title: '如何做产品与上线', subtitle: '从核心功能到用户能用、能买',
    intro: '用生图项目讲清开发、部署和收款。先在测试环境跑通，再向真实用户开放。',
    outcome: '一个可访问、可验收、可更新的产品，以及上线和支付记录。', stages: ['build', 'payment'],
    lessons: [
      {
        id: 'scope-and-build', title: '第一版做什么，怎样让 AI 帮你开发', question: '有了需求，怎样变成能写的功能？', result: '一份小版本任务单和一条通过验收的用户流程。',
        steps: [
          { title: '写一个明确的使用结果', text: '例如“卖家上传商品图，换成节日背景，下载可用图片”。第一版只围绕它，先不加社交、团队协作或批量管理。' },
          { title: '画四步页面流程', text: '每一步写输入、按钮、成功结果和失败提示。用纸、白板或简单网页都行；请一个目标用户说说下一步该点哪里。' },
          { title: '把开发拆成小任务', text: '先用固定样例接通页面，再接真实接口，再补异常。给 AI 提供现有项目、范围、验收和禁止暴露的内容，一次只改一条流程。' },
          { title: '自己操作验收，再保存版本', text: '逐个试正常图、错误格式、大文件、断网和重复点击。把预期与实际结果告诉 AI，要求定位原因、做最小修改并重测。通过后用 Git 提交代码；不提交密钥、用户图片和数据库。' },
        ],
        visual: { kind: 'flow', title: '第一版只让用户走通这一条', steps: ['上传商品图', '选择背景', '查看生成结果', '下载图片'], caption: '每一步都要有失败提示和返回办法。' },
        example: { title: '功能怎么取舍', columns: ['功能', '第一版处理'], rows: [['商品换背景、下载', '核心用途，先做好。'], ['等待进度、失败重试、用量限制', '保证能用、成本可控，随核心功能一起做。'], ['批量管理、邀请奖励', '先记需求，等证据充分再加。']], note },
        snippets: [{ title: '可复制给 AI 的开发任务单', text: '请先阅读项目结构，再实现“商品换背景”这条流程。\n先说明会改哪些文件。\n范围：上传一张图片、选背景、显示进度、下载结果。\n第一步用固定样例，确认交互后再接真实接口。\n服务器保管服务密钥；浏览器不得拿到密钥。\n验收：合法图片走通；错误格式有提示；重复点击不重复创建任务。\n失败时说明原因和恢复办法。\n完成后给出实际验证结果和仍未实现的部分。', note: '把“商品换背景”替换成自己的核心任务。AI 说完成之后，你仍要实际点一遍。' }],
        exercise: '写一张任务单，完成最小页面流程，并请一位目标用户独立试用。',
        template: '# 第一版任务单\n为谁 / 解决什么问题：\n四步使用流程：\n必须做 / 暂不做：\n每步的成功与失败表现：\n验收用例 / 预期 / 实际：\n用户卡在哪一步：\n代码版本：\n下一个最小修改：',
        checks: ['任务单能说清输入、输出、异常处理和不做的功能。', '有人独立完成核心操作，未通过的用例有记录。'],
        troubleshooting: [{ problem: 'AI 一次改很多东西', action: '回到任务单，要求先做固定样例的一条流程，检查差异后再推进。' }, { problem: '按钮能点，但没接真实服务', action: '标明演示状态；接真实接口后用自己的测试素材重新验收，不能沿用演示通过的结论。' }],
      },
      {
        id: 'run-reference', title: '检查开源项目，在本地跑起来', question: '参考仓库能直接变成我的收费产品吗？', result: '一份复用评估和本地运行记录。',
        steps: [
          { title: '先看用途与许可证', text: '本教程核对的 Nova v3.3.0 是自托管工作台，用 Next.js 做网页，Node.js 运行服务器，SQLite 存数据，WebSocket 传实时消息。许可证是 AGPL-3.0：可以商用，但修改版通过网络提供服务等情形有对应源码提供义务；复用前读 LICENSE，确认你能履行。' },
          { title: '在独立目录安装', text: '安装 Git、Node.js 22 和 npm。按下方命令下载固定版本，分别装根目录、前端和后端依赖。不要在当前学习网站目录里执行。原生数据库依赖若编译失败，先看 Node 版本与系统编译工具提示。' },
          { title: '复制配置，改用 3001 端口', text: '打开 backend/.env，设置 PORT=3001、HOSTNAME=127.0.0.1，保留 NODE_ENV=production 和示例数据路径。这样不占用学习网站的 3000 端口，也先只允许本机访问。已有配置先备份再改。' },
          { title: '配置模型并试一张图', text: '启动后访问 http://localhost:3001，在设置中按接口服务商文档填模型 ID、协议、地址与测试密钥，并选择默认图像模型和文本模型。用自己的样例测试生成、失败提示和下载，记录调用成本。' },
        ],
        visual: { kind: 'flow', title: '复用前先走这四步', steps: ['读许可证和架构', '固定代码版本', '本地配置与启动', '试功能，列缺口'] },
        example: { title: '参考工作台与收费产品的差距', columns: ['核对点', '怎么处理'], rows: [['工作台允许用户自行配置模型和密钥', '若由你提供额度，需改为服务器持有服务密钥。'], ['SQLite、图片文件、实时任务通知', '部署要支持持久磁盘与长连接，不能只上传静态页面。'], ['账户、订单、额度、退款', '逐项审查并补齐，不能假定开源工作台已具备在线收费软件的商业流程。']], note: `依据 ${TUTORIAL_REVIEWED} 核对的源码与 README；本教程没有代你运行或上线该产品。` },
        snippets: [{ title: '终端：下载并安装（新目录）', text: `git clone https://github.com/tianjiangqiji/nova-image-studio.git overseas-image-lab\ncd overseas-image-lab\ngit switch -c my-image-lab ${NOVA_REVIEW_COMMIT}\nnpm install\nnpm run install:all\ncp backend/.env.example backend/.env`, note: 'macOS / Linux 命令。Windows PowerShell 可用 Copy-Item 复制配置。这里固定版本便于对照；以后升级需重新验收。' }, { title: '编辑 backend/.env 后启动', text: 'npm run dev', note: '看到服务启动成功后打开 localhost:3001。这个脚本会先构建前端再启动后端，首次需要等待。用 Ctrl+C 停止本地服务。' }],
        exercise: '本地完成一次真实生成，记录版本、配置项名称和结果。不要在笔记中粘贴密钥。',
        template: '# 开源复用评估\n仓库 / 提交版本 / 日期：\n许可证要求与处理方式：\n本地 Node 版本 / 启动结果：\n测试模型与接口（不填密钥）：\n一次生成的结果 / 用时 / 成本：\n可复用能力：\n账户、额度、订单等缺口：\n下一步：',
        checks: ['许可证与版本已有记录，本地页面和一次真实生成的结果可检查。', '明确列出商业能力缺口，没有把本地运行写成线上经营完成。'],
        troubleshooting: [{ problem: '提示找不到 next 或后端依赖', action: '确认执行过 npm run install:all。该核对版本的根脚本会进入 frontend 和 backend 分别安装。' }, { problem: '启动提示端口占用', action: '检查 backend/.env 的 PORT 是否改成 3001，重启后按日志里的地址访问。' }, { problem: '401 或模型不存在', action: '核对服务商、协议、模型 ID、额度与密钥是否匹配；日志脱敏后再求助。' }],
        resources: [{ title: '本教程核对的 Nova 源码版本', url: novaSource }, { title: '原仓库运行说明', url: novaReadme }, { title: 'AGPL-3.0 许可证原文', url: `${novaSource}/LICENSE` }],
      },
      {
        id: 'server-and-data', title: '生图请求怎么走，数据放哪里', question: '为什么不能把接口密钥放在网页里？', result: '一份账户、任务、图片和额度的设计与验收表。',
        steps: [
          { title: '分清浏览器与服务器', text: '浏览器负责操作界面；服务器检查身份、额度和文件，调用生图接口。网页代码和请求可被用户查看，所以由你付费的服务密钥只能放服务器环境变量中。' },
          { title: '先写四类记录', text: '用户记录身份；任务记录 user_id、状态和结果；订单记录付款与交付；额度流水记录增加、预占、消耗与退回。字段名可调整，关键是能查清“谁的哪次操作发生了什么”。' },
          { title: '处理慢任务与重复请求', text: '提交后返回任务 ID，网页轮询状态或用 WebSocket 接收通知。服务器用请求标识去重，限制并发和每日成本；失败按规则释放预占额度，不能重复退回。' },
          { title: '明确图片的访问与删除', text: '上传限制类型、体积；图片只给有权限的人访问。说明保存期限与删除方式；第三方如需临时拉取素材，使用短时有效链接。日志不保存完整图片、提示词或密钥。' },
        ],
        visual: { kind: 'sequence', title: '一次生成：谁做哪件事', events: [{ from: '浏览器', to: '服务器', text: '上传素材，提交一次任务' }, { from: '服务器', to: '数据库', text: '核对身份与额度，创建任务并预占额度' }, { from: '服务器', to: '生图服务', text: '使用服务器密钥发起生成' }, { from: '生图服务', to: '服务器', text: '返回结果或失败原因' }, { from: '服务器', to: '数据库', text: '保存状态，确认消耗或释放预占' }, { from: '服务器', to: '浏览器', text: '返回状态和有权限的下载地址' }], caption: '这是待实现的收费产品设计，不代表参考仓库已实现这些检查。' },
        example: { title: '最容易漏测的情况', columns: ['操作', '应有结果'], rows: [['同一请求连续点两次', '只创建一个任务，不重复扣额度。'], ['用户 A 打开用户 B 的图片地址', '拒绝访问。'], ['生图失败后通知重复到达', '额度只释放一次，有失败记录。']], note },
        exercise: '画出自己的请求路径，再让 AI 按身份、任务状态和额度流水实现；用两个测试账户验收。',
        template: '# 任务与数据设计\n身份确认方式：\n用户/任务/订单/额度记录：\n密钥保存位置（只写位置）：\n重复请求标识：\n失败时额度如何处理：\n图片存储、权限、期限、删除：\n两个账户的隔离测试结果：\n成本上限与停止办法：',
        checks: ['浏览器源码和请求中没有服务密钥，两个账户不能读取对方的任务和图片。', '重复请求、生成失败和重复通知都经过测试，额度记录对得上。'],
        troubleshooting: [{ problem: '部署后图片或数据库消失', action: '检查是否写在临时文件系统；改用持久磁盘或对象存储，并做备份恢复测试。' }, { problem: '任务一直转圈', action: '按任务 ID 查服务器状态，补超时、失败提示和重试入口；不要只让网页无限等待。' }],
      },
      {
        id: 'deploy-domain', title: '部署到服务器，绑定域名和 HTTPS', question: '本地能用了，怎样让别人访问？', result: '一个通过域名访问的测试站点，以及上线检查记录。',
        steps: [
          { title: '按程序需要选部署方式', text: '纯介绍页可以静态托管；带数据库、图片磁盘和 WebSocket 的工作台需要持久运行的服务。本例选 Ubuntu 服务器 + Docker Compose + Caddy：Docker 运行应用，Caddy 把域名请求转给应用并办理 HTTPS 证书。' },
          { title: '准备服务器和测试域名', text: '选择目标用户访问方便、预算可承受的服务器。用服务商提供的用户名和地址通过 SSH 远程登录；按官方文档安装 Docker Engine、Compose 插件与 Caddy。在域名 DNS 管理中为 test 子域新增 A 记录，指向服务器公网 IPv4；已有记录先核对用途。' },
          { title: '把验收过的版本送到服务器', text: '先把代码保存到你自己的 Git 仓库，不包含密钥和用户数据。在服务器用 git clone 下载自己的仓库，git checkout 切到验收过的提交，再进入项目目录。不要直接用上游最新版替换自己的修改；记录本次提交编号。' },
          { title: '准备应用与持久目录', text: '按下方命令准备配置和 data 目录，编辑 .env 的用量限制与公开地址。构建前确认 .dockerignore 排除了 .env、backend/.env 和 backend/data/，防止配置和用户数据被打包。Compose 挂载目录让数据库和图片在应用重启后仍保留。' },
          { title: '只让反向代理入口公开', text: '使用下方 Compose 配置，将应用端口绑定 127.0.0.1:3001。服务器允许外部访问 80/443，SSH 入口按你的管理方式限制。先在服务器访问应用，再配置 Caddy 的测试域名；DNS 未生效或端口不通会影响证书签发。' },
          { title: '从外网完整试一次', text: '手机切换移动网络，打开 HTTPS 域名，完成生成和下载；再重启应用确认数据仍在。公开测试前完成账户隔离、用量限制和图片访问控制。若仍是原工作台，先限制测试访问，不能当作已完成的收费站。' },
        ],
        visual: { kind: 'flow', title: '访问你的域名时，发生了什么？', steps: ['DNS 找到服务器', 'Caddy 接收 HTTPS', '转发到本机应用', '应用访问数据库与生图接口'], caption: 'DNS 是域名与服务器地址的对应表；HTTPS 让访问过程加密。' },
        example: { title: '上线前先分清这些位置', columns: ['东西', '放在哪里'], rows: [['网页与服务代码', '镜像（打包好的程序）里，按版本启动容器（运行中的程序）。'], ['数据库和图片', '服务器持久目录 data，另外备份。'], ['配置与密钥', '服务器配置中，不能进入前端、镜像或公开仓库。'], ['域名指向', 'DNS 管理页面，A 记录填写服务器公网 IPv4。']], note },
        snippets: [{ title: '服务器：在已准备好的项目根目录运行', text: 'cp backend/.env.docker.example .env\ncp backend/blacklist.json blacklist.json\ncp backend/prompts.json prompts.json\nmkdir -p data plugins\n# 只需生图时，plugins 可先留空\ndocker build -t overseas-image-lab:v1 .', note: '首次创建配置时使用；已有文件先备份。镜像构建使用你已验收的代码，v1 是你自己的版本标签。' }, { title: '保存为 compose.preview.yml', text: 'services:\n  app:\n    image: overseas-image-lab:v1\n    ports:\n      - "127.0.0.1:3001:3000"\n    environment:\n      PORT: "3000"\n      HOSTNAME: "0.0.0.0"\n      NOVA_TASK_DB: backend/data/nova-tasks.sqlite\n      NOVA_IMAGE_DIR: backend/data/nova-images\n    volumes:\n      - ./data:/app/backend/data\n      - ./.env:/app/.env\n      - ./blacklist.json:/app/backend/blacklist.json\n      - ./prompts.json:/app/backend/prompts.json\n      - ./plugins:/app/backend/plugins\n    restart: unless-stopped', note: '对应本教程核对的 Nova Docker 布局；若改了代码或存储结构，先同步修改。服务器系统运行 Caddy，本例没有把 Caddy 放进容器。' }, { title: '启动应用，检查本机访问', text: 'docker compose -f compose.preview.yml up -d\ndocker compose -f compose.preview.yml ps\ncurl -I http://127.0.0.1:3001', note: 'ps 查看是否运行。若失败，执行 docker compose -f compose.preview.yml logs --tail=80 app 检查原因，分享日志前先脱敏。' }, { title: 'Caddy 配置片段', text: 'test.example.com {\n    reverse_proxy 127.0.0.1:3001\n}', note: '把 test.example.com 换成自己的测试域名。加入 /etc/caddy/Caddyfile，保留已有站点；先执行 sudo caddy validate --config /etc/caddy/Caddyfile，再执行 sudo systemctl reload caddy。' }],
        exercise: '按这条路径建立测试站。记录域名、部署版本、HTTPS、外网操作和重启后数据检查结果。',
        template: '# 上线检查\n测试域名 / 服务器地区：\n代码版本 / 镜像标签：\nDNS 记录 / HTTPS 检查：\n生成、下载、失败、权限与用量测试：\n重启后数据还在吗：\n备份位置与恢复办法：\n公开访问前仍缺什么：\n验收人 / 日期 / 证据：',
        checks: ['手机外网可通过 HTTPS 访问，并完整生成和下载；不能只凭首页打开就判定成功。', '应用重启后数据仍在，访问权限和成本限制有测试记录。'],
        troubleshooting: [{ problem: '域名打不开', action: '先查 DNS 指向，再查服务器 80/443 与 Caddy 日志。不要同时乱改域名、应用和防火墙。' }, { problem: '502（代理没有连上应用）', action: '先在服务器 curl 本机 3001，检查容器状态、端口映射和应用日志。' }, { problem: '能打开但生成中断', action: '查生图接口出站连通性、代理超时与实时连接；沿任务 ID 追踪，而不是反复刷新页面。' }],
        resources: [{ title: 'Nova 部署说明（核对版本）', url: novaReadme }, { title: 'Docker：Ubuntu 安装', url: 'https://docs.docker.com/engine/install/ubuntu/' }, { title: 'Caddy：安装为系统服务', url: 'https://caddyserver.com/docs/install' }, { title: 'Caddy：反向代理', url: 'https://caddyserver.com/docs/quick-starts/reverse-proxy' }],
      },
      {
        id: 'price-and-payment', title: '怎样定价，接通付款与交付', question: '付款按钮背后还要做什么？', result: '套餐成本表，以及测试付款、交付、退款的验收记录。',
        steps: [
          { title: '先核对可用的收款服务', text: '按所在地、经营主体、结算账户和产品类型查准入。Stripe 与第三方代售平台的责任范围不同，不能默认都支持你的情况；记录官方链接、费用、税务责任与查询日期，再选适用方案。' },
          { title: '把套餐和成本算清', text: '按成功交付估算生成与重试成本，加上支付、存储、退款等费用。写清货币、次数、有效期和退款条件；订阅还要说明续费与取消。小样本先测试价格，不把演示金额照搬成定价。' },
          { title: '先在测试模式接托管收银台', text: '以 Stripe Checkout 为接入示例：创建测试商品和价格；服务器依据允许的价格 ID 创建付款会话，关联内部订单与用户；浏览器只跳到返回的收银台地址。金额和额度由服务器决定。' },
          { title: '用服务器通知完成交付', text: '在测试后台登记 HTTPS 通知地址，使用官方 SDK 校验原始请求与签名，核实订单、金额、币种和已付款状态。把订单交付与额度增加放在同一数据库事务中，用唯一订单约束防止重复。延迟付款方式要等真正成功再交付。' },
          { title: '测异常，再切正式环境', text: '用服务商测试工具检查取消、失败、重复通知、延迟付款和退款；退款后记录额度与财务调整。正式环境重新配置商品、密钥和通知地址，按规则验证真实交易与结算，不能把测试订单当收入。' },
        ],
        visual: { kind: 'sequence', title: '付款成功不靠网页一句提示', events: [{ from: '用户', to: '你的服务器', text: '选择允许的套餐，创建内部订单' }, { from: '你的服务器', to: '支付服务', text: '创建收银台会话，关联内部订单' }, { from: '用户', to: '支付服务', text: '在托管收银台付款' }, { from: '支付服务', to: '你的服务器', text: '发送带签名的付款通知' }, { from: '你的服务器', to: '数据库', text: '确认已付款，只交付一次额度' }, { from: '你', to: '结算记录', text: '另行核对到账、手续费和退款' }], caption: '通知叫 Webhook；数据库事务表示相关修改一起成功或一起撤销。' },
        example: { title: '先算一笔演示账', columns: ['项目', '假设金额'], rows: [['卖出 50 次生成套餐', '$5.00'], ['含失败重试的生成成本', '$1.20'], ['支付费用（演示，非报价）', '$0.50'], ['暂余金额', '$3.30，仍未扣服务器、推广、退款、税费与时间。']], note },
        exercise: '选适用服务，做测试套餐，逐个验收成功、失败、重复通知与退款。',
        template: '# 支付接入与验收\n服务商 / 适用条件 / 官方来源 / 查询日期：\n商品 / 价格 / 币种 / 额度 / 有效期：\n成本、税费与退款规则：\n测试环境订单 ID（勿填密钥）：\n成功 / 取消 / 失败 / 延迟付款结果：\n重复通知是否重复交付：\n退款如何调整额度和账目：\n正式交易与结算（单独记录）：',
        checks: ['不信任浏览器传来的金额或付款结果；服务器验签、核对并防止重复交付。', '异常和退款有测试记录；正式收费条件明确，测试与真实交易分开记。'],
        troubleshooting: [{ problem: '付了钱却没额度', action: '先查服务商通知是否送达和服务器响应，再按内部订单查交付状态；使用同一订单重试，不能手工重复加。' }, { problem: '暂时没有适用的收款账户', action: '继续做免费样例与需求验证，记录未满足条件；不借用虚假地区或他人资料绕过准入。' }],
        resources: [{ title: 'Stripe 服务地区', url: 'https://stripe.com/global' }, { title: 'Checkout：付款后交付', url: 'https://docs.stripe.com/payments/checkout/fulfill-orders' }, { title: 'Webhook：签名与通知处理', url: 'https://docs.stripe.com/webhooks' }],
      },
      {
        id: 'release-and-recover', title: '更新版本，出问题怎样恢复', question: '上线后改坏了，怎么退回去？', result: '一份发布记录和一次测试环境恢复演练。',
        steps: [
          { title: '发布前留住旧版本', text: '记录 Git 提交和镜像标签，不覆盖唯一的可用版本。备份数据库、图片和配置；SQLite 可在短暂停止写入后备份完整数据目录，避免只拷主文件漏掉正在写入的内容。' },
          { title: '先在测试站验收', text: '用测试数据检查生成、下载、账户隔离、支付与退款。涉及数据库结构变更时，写明旧程序能否读取新结构，以及失败后的恢复步骤。' },
          { title: '发布一个小变更', text: '低流量时更新镜像版本，记录开始时间。查看失败率、生成用时和支付交付；约定触发回退的条件，例如付款无法交付，立即停止新收费并处理订单。' },
          { title: '先止损，再选择恢复办法', text: '代码问题且数据兼容时，切回旧镜像并重跑核心流程。数据结构不兼容时按迁移预案处理；恢复旧备份前先保留当前数据，核对期间的新订单，防止丢单或重复交付。' },
        ],
        visual: { kind: 'decision', title: '发布后核心流程失败怎么办？', question: '旧版本能安全读取现在的数据吗？', yes: '切回旧版本，验证生成和订单', no: '暂停相关操作，按数据恢复预案处理', caption: '镜像回退不等于数据库回退。先保护发布后新增的用户数据和订单。' },
        example: { title: '两类问题，两种恢复', columns: ['问题（演示）', '处理'], rows: [['新按钮导致下载失败，数据结构没变', '切回旧镜像，重新测试下载。'], ['升级改变了额度表，旧程序不兼容', '暂停写入，保留当前数据，按已验证的迁移或恢复预案处理。']], note },
        exercise: '在测试环境发布一个小修改，再退回旧版本；记录数据是否完整。',
        template: '# 发布与恢复记录\n日期 / 改动原因：\n新旧代码版本 / 镜像标签：\n数据变更与兼容性：\n备份位置 / 恢复验证：\n发布前后的核心流程结果：\n停止或回退条件：\n恢复步骤 / 新订单核对办法：\n下次改进：',
        checks: ['测试环境真实演练过恢复，能找到旧版本和可用备份。', '说明新订单与新图片如何保留，没有把覆盖旧备份当作通用回退方案。'],
        troubleshooting: [{ problem: '有备份但从没恢复过', action: '在隔离的测试环境恢复一次，确认数据库能读、图片能开、订单对得上。' }, { problem: '发布后不知道是否正常', action: '固定一组核心操作和观察指标，每次发布都检查同一组。' }],
      },
    ],
  },
  {
    id: 'growth', title: '如何做增长', subtitle: '找到用户，检查使用与付费',
    intro: '先做一轮能追踪结果的推广，再建设搜索流量；根据反馈改产品，按收支决定投入。',
    outcome: '一份渠道实验、一个有用的搜索页面，以及下一轮改进决定。', stages: ['acquire', 'seo', 'operate', 'review'],
    lessons: [
      {
        id: 'choose-channel', title: '第一批用户去哪里找', question: '产品上线了，要去哪些地方推广？', result: '选择 1—2 个有目标用户的渠道，写出一次实验。',
        steps: [
          { title: '回到找需求时的来源', text: '列出用户常去的社区、搜索词、创作者与工具目录。优先选你已经看到真实问题的地方；开发者多的平台未必有买商品图的卖家。' },
          { title: '先观察，再选渠道', text: '记录人群是否匹配、是否允许自荐、近期有没有讨论、能否追踪后续行为。找不到推广规则时先问管理员，不把“能发帖”当作“允许广告”。' },
          { title: '每个渠道只设计一个小实验', text: '写清针对谁、用什么样例、引导做什么、投入多少时间或钱、何时复盘。先测一次，别同时铺十个平台，导致不知道哪一步有效。' },
          { title: '把访问后的结果也留下', text: '记录访问、生成成功、购买和反馈。没人来先查渠道与表达；有人来但没用，回看页面和效果，不急着继续扩大曝光。' },
        ],
        visual: { kind: 'flow', title: '选渠道的顺序', steps: ['用户聚集在哪里', '核对规则与场景', '发一次具体样例', '记录访问后的行为'] },
        example: { title: '三个渠道怎么选', columns: ['渠道', '适合怎样试'], rows: [['允许自荐的卖家社区', '展示商品图前后对比，邀请用自己的素材试。'], ['相关垂直创作者', '先看受众，再商量一次标明合作关系的演示。'], ['产品发布平台', '可测试介绍是否清楚，但开发者反馈与卖家需求要分开。']], note },
        exercise: '选两个候选渠道，先在一个渠道完成一次符合规则的推广。',
        template: '# 渠道实验\n渠道 / 目标人群 / 规则链接：\n为什么选它：\n内容与唯一行动入口：\n推广链接与来源标记：\n日期 / 时间与预算上限：\n访问 / 生成成功 / 付费：\n用户反馈 / 下一步：',
        checks: ['选择理由基于目标人群和渠道规则，推广行为可追溯。', '记录使用或付费结果；没有结果也能说明下一步查哪里。'],
        troubleshooting: [{ problem: '帖子被删除', action: '先读删除原因和社区规则，必要时向管理员了解；不要换号重复发。' }, { problem: '带来很多同行，没有卖家', action: '调整人群聚集地，或把演示重点改成卖家的具体任务。' }],
      },
      {
        id: 'write-launch', title: '推广内容和产品介绍页怎么写', question: '怎么让陌生人看懂，并愿意试？', result: '一条推广内容和一个能接住访问的页面。',
        steps: [
          { title: '第一句说用户能完成什么', text: '用“为谁 + 完成什么”写标题。例如“给饰品商品图换节日背景”。少堆模型名、参数和“革命性”等空话。' },
          { title: '用一组样例证明用途', text: '放原图与结果，交代用了哪些操作、哪些地方可能失真。只展示自己有权使用的素材，不编造客户评价或成功数据。' },
          { title: '让页面接住承诺', text: '推广说换背景，点进去就应该看到同样的用途、样例和入口。写明步骤、价格、额度、等待时间、限制、退款与联系办法；第一屏只保留一个主要行动。' },
          { title: '发布前让人独立看一遍', text: '请目标用户看页面，说出它帮谁、能做什么、下一步点哪里；再用手机测一次。英文可先用 AI 翻译，再核对承诺、价格和自然表达。' },
        ],
        visual: { kind: 'flow', title: '一条介绍只引导一个动作', steps: ['说明具体用途', '展示前后对比', '交代价格与限制', '邀请试一张自己的图'] },
        example: { title: '一条英文推广示例', columns: ['部分', '示例'], rows: [['标题', 'Create holiday backgrounds for jewelry photos.'], ['说明', 'Upload a product photo, choose a scene, and review the result.'], ['限制', 'Check product details and colors before publishing.'], ['行动', 'Try it with one of your own photos.']], note: '中文意思：上传饰品图、选场景、检查结果，再决定采用。只有功能确实可用时才发布；试用是否收费要在入口说清。' },
        exercise: '写一条推广内容，做一组前后对比，确保点击后的页面兑现同一个承诺。',
        template: '# 推广与页面文案\n目标人群：\n一句话用途：\n原图与结果（使用权限）：\n操作步骤：\n价格、额度、限制：\n唯一主要行动：\n退款与联系办法：\n手机与英文检查结果：',
        checks: ['陌生用户能复述用途并找到下一步入口。', '样例、价格与功能一致，限制清楚，没有虚构评价和成果。'],
        troubleshooting: [{ problem: '大家说页面好看，但不知道干什么', action: '把标题改成具体任务，往前放样例和试用入口。' }, { problem: '点击很多，进入后立即离开', action: '先检查加载、手机布局，以及推广承诺与页面是否一致。' }],
      },
      {
        id: 'measure-channel', title: '怎样知道哪个渠道带来了用户', question: '只有访问量，怎么判断推广有效？', result: '一张同一口径的访问、使用、付费记录。',
        steps: [
          { title: '给链接加来源标记', text: 'UTM 是链接里的来源参数。统一小写：utm_source 写来源，utm_medium 写方式，utm_campaign 写本轮活动。标记中不要放姓名、邮箱或其他个人信息。' },
          { title: '给核心动作记事件', text: '接入适合你用户地区的统计方案，并处理所需告知和同意。记录 landing_view、generate_success；payment_paid 必须由服务器确认付款后记录，不能以成功页访问代替。' },
          { title: '让来源能跟到订单', text: '说明采用首次还是最近一次来源，把活动标记关联到允许使用的匿名访客标识，再在注册或订单时关联。按任务 ID、订单 ID 去重，标出自己的测试；跨设备或拒绝统计会造成缺失，不要强行补齐。' },
          { title: '比较人数与成本', text: '同一时间范围里看访客人数、成功使用人数、付费人数和推广支出。说明转化窗口，例如访问后 7 天内付款；分母为 0 时写“暂无数据”，不显示 0% 来冒充结论。' },
        ],
        visual: { kind: 'flow', title: '从一条推广链接追到订单', steps: ['带 UTM 的访问', '记来源与核心事件', '关联服务器付款订单', '按渠道比较结果'], caption: '这是可观测范围内的归因，不能保证追踪每一个用户。' },
        example: { title: '同一周、同一口径的演示数据', columns: ['渠道', '访客 / 成功使用 / 付费', '先看什么'], rows: [['卖家社区', '30 / 8 / 1', '使用率 8÷30≈26.7%；访客付费率 1÷30≈3.3%。'], ['泛工具目录', '100 / 2 / 0', '先查人群匹配和页面；访问多并不代表效果好。']], note: `${note} 样本很小，不能据此预测未来收入。` },
        snippets: [{ title: '带来源标记的链接示例', text: 'https://example.com/?utm_source=seller_community&utm_medium=community&utm_campaign=holiday_test', note: 'example.com 是示例域名，换成你的产品网址。先自己打开，检查来源是否进入统计，并把这次访问标为测试。' }],
        exercise: '用测试访问走通来源到订单，再记录一轮真实推广；两种数据分开。',
        template: '# 渠道效果记录\n统计日期 / 转化窗口 / 来源归属规则：\n渠道与 UTM 链接：\n访客人数 / 成功使用人数 / 真实付费人数：\n推广支出 / 投入时间：\n排除的测试 / 去重方式：\n缺失数据与原因：\n最早卡住的一步：\n下一轮只改什么：',
        checks: ['一次测试能追到来源、使用和已付款订单，重复事件不重复计数。', '真实数据写明时间、人数口径和缺失范围，不混用点击次数与用户人数。'],
        troubleshooting: [{ problem: '付款人数比订单后台多', action: '检查是否用网页访问记付款、重复上报，或混入测试订单；以核实后的真实订单对账。' }, { problem: '大量来源显示未知', action: '检查跳转是否丢参数、同意设置和归属规则；保留未知项，不猜渠道。' }],
      },
      {
        id: 'seo-page', title: 'SEO：从一个搜索问题做一页内容', question: '关键词怎么选，页面怎么做，怎么查收录？', result: '一个解决明确问题的页面和搜索观察记录。',
        steps: [
          { title: '收集用户真的会搜的词', text: '从访谈原话、Google 搜索建议与相关问题找 5 个候选词。逐个搜索，记录结果主要是工具、教程还是商品；搜索建议是线索，不是搜索量证明。' },
          { title: '选择你能满足的搜索意图', text: '搜索意图就是用户想完成的事。搜 jewelry background generator 可能想直接生成；搜 how to photograph jewelry 可能需要摄影方法。把不适合产品的词放后面，避免只追大流量。' },
          { title: '为一个问题写完整页面', text: '页面标题写明任务，正文放可用样例、步骤、限制、常见问题与产品入口。每页围绕一个用途，有清楚的内部链接；图片配描述内容的替代文字，不堆关键词。' },
          { title: '让搜索引擎能读到', text: '页面公开可访问，返回成功状态，正文优先随 HTML 返回或预渲染；检查没有误加 noindex，也没被 robots.txt 阻挡。站点地图只列希望收录的正式网址，不提交账户、订单和临时结果页。' },
          { title: '验证网站，提交并分层观察', text: '在 Google Search Console 添加资源：域名资源按提示加 DNS TXT 记录并验证；或选择网址前缀按可用方法验证。提交 sitemap.xml，用网址检查查看目标页，再在效果报告里看展示与点击。提交不保证收录或排名。' },
        ],
        visual: { kind: 'flow', title: '搜索没带来用户，从哪一层查？', steps: ['能访问和读取吗', '已收录吗', '有展示与点击吗', '点击后有人使用吗'], caption: '每一层解决后再往下查；SEO 需要持续观察，没有固定几天见效的保证。' },
        example: { title: '关键词与页面对应', columns: ['词（演示）', '页面应该提供'], rows: [['jewelry background generator（饰品背景生成器）', '直接试用入口、前后样例、价格和限制。'], ['how to keep product colors in AI photos（AI 图如何保留商品颜色）', '对比失败与可用样例，说明方法和能力边界。'], ['AI', '过于宽泛，暂不作为第一篇页面的目标。']], note },
        snippets: [{ title: '一个页面的 HTML 结构示例', text: '<title>Holiday backgrounds for jewelry photos | 你的品牌</title>\n<meta name="description" content="Create and review holiday scenes for jewelry photos. See examples, steps and limitations.">\n<h1>Create holiday backgrounds for jewelry photos</h1>\n<!-- 接着放真实样例、操作步骤、限制和试用入口 -->', note: '标题和描述只是基础，页面必须有对应内容。若网址有重复版本，再正确配置指向正式网址的 canonical（首选网址）标签。' }],
        exercise: '做一个真实可用页面，提交站点地图，记录首次检查结果和下一次检查时间。',
        template: '# SEO 页面计划与观察\n搜索词 / 语言 / 搜索日期：\n结果主要类型 / 用户想完成什么：\n页面网址 / 标题 / 样例与入口：\n可访问、正文、索引设置检查：\nSearch Console 验证与站点地图：\n观察日期 / 是否收录 / 展示 / 点击：\n带来的使用与付款（口径）：\n问题与下次检查日期：',
        checks: ['页面能解决选定搜索问题，正文、样例和入口实际可用。', '站点验证、提交和观察有记录；没有把提交成功写成排名成功。'],
        troubleshooting: [{ problem: '没有收录', action: '先查网址检查中的具体原因、访问状态和索引设置，再改善页面价值；不要重复提交代替排查。' }, { problem: '有展示没点击', action: '查看实际搜索词是否匹配，再调整标题和描述；不要承诺不存在的功能。' }, { problem: '有点击没使用', action: '检查页面是否满足搜索者任务，以及入口、速度和产品效果。' }],
        resources: [{ title: 'Google：SEO 入门指南', url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide' }, { title: 'Search Console：验证网站所有权', url: 'https://support.google.com/webmasters/answer/9008080' }, { title: '打开 Search Console', url: 'https://search.google.com/search-console/about' }],
      },
      {
        id: 'retain-and-budget', title: '让用户回来，决定要不要投广告', question: '有人用过了，怎样判断值得继续投入？', result: '一份复用、收支和下一轮预算决定。',
        steps: [
          { title: '按使用频率观察回来的人', text: '把同一周首次成功使用的人放在一组，再看下一周多少人回来。低频任务用更长周期；区分没需求、效果不满意和使用失败，不盲目要求每天活跃。' },
          { title: '找最影响使用的一个问题', text: '从失败任务、退款和愿意交流的用户中找原因。优先修核心效果、等待、下载等问题。联系与提醒遵循用户意愿，提供退出方式，不为了“唤回”群发打扰。' },
          { title: '算同一期间的完整收支', text: '收入扣退款、生成、支付、存储、服务器、推广和税费，另记时间。每位新付费用户的获客成本 = 本轮获客支出 ÷ 新付费人数；人数为 0 则写“尚未获得付费用户”。' },
          { title: '满足条件再做小额广告测试', text: '核心流程可用、付费统计可信、每单贡献可估算后，再选一个渠道、一个人群、一套素材。提前写总预算、结束条件和允许的获客成本；先限制总花费，数据不足时不因一天波动频繁改动。' },
        ],
        visual: { kind: 'decision', title: '现在扩大投放吗？', question: '产品能用、统计可信，而且成本算得清吗？', yes: '用可承受的小预算测试，再复盘', no: '先修体验、统计或成本问题', caption: '预算按你能承受的损失确定。不能靠尚未发生的续费，为当前亏损找理由。' },
        example: { title: '复用和广告账怎么读', columns: ['演示数据', '含义'], rows: [['10 位首次成功用户，次周 3 位回来', '这个样本的次周复用为 30%，还要问原因。'], ['广告花 $20，带来 2 位新付费用户', '本轮每位获客成本 $10。'], ['每位首单可贡献 $3.30，尚无复购证据', '首单贡献覆盖不了 $10 获客成本，先调整再扩大。']], note: `${note} $3.30 还需说明已扣哪些费用，不能直接叫净利润。` },
        exercise: '做一份同一期间的经营表，决定下一轮修产品、换渠道、做小额测试或暂停。',
        template: '# 复用与预算决定\n观察期间 / 用户分组 / 使用频率：\n首次成功人数 / 回来人数 / 原因：\n收入 / 退款 / 各项成本 / 税费：\n投入时间 / 未计入费用：\n获客支出 / 新付费人数 / 获客成本：\n是否具备广告测试条件：\n如测试：渠道 / 人群 / 素材 / 总预算 / 停止条件\n本轮决定与证据：',
        checks: ['复用周期符合任务频率，收支范围和未计入成本明确。', '扩大投入前有成本依据和预算上限，没有把假设复购当成已赚到的钱。'],
        troubleshooting: [{ problem: '用户没回来，但反馈还可以', action: '先查是否到了下一次使用时间；低频需求不要直接判失败。' }, { problem: '越卖越亏', action: '检查重试成本、额度和定价；先限住支出，别仅靠买更多流量解决。' }],
      },
      {
        id: 'review-and-share', title: '复盘一次实验，写成能分享的经历', question: '怎样让自己的实践帮到做其他项目的人？', result: '一篇有证据、有适用条件的分享提纲。',
        steps: [
          { title: '只选一个真实问题', text: '例如“有访问却没人生成，我怎么排查”。先交代当时的人群、版本、渠道和时间，不把整段创业经历塞进一篇文章。' },
          { title: '按前后变化整理证据', text: '写原问题、当时猜测、实际修改和观察结果。截图去除用户信息；没结果也照实写。样本很小或同时改了多件事，要说明无法确定因果。' },
          { title: '提炼别人能复用的操作', text: '给出排查顺序、模板和完成标准。把“我的具体结果”和“你可以尝试的方法”分开，说明适用的人群、条件与限制。' },
          { title: '回填网站，再整理公众号稿', text: '将过程记入生图项目实战，把新认识补回相应教程与模板。公众号按“问题—做法—结果—可用方法”写；实际发布后再补文章链接。' },
        ],
        visual: { kind: 'flow', title: '网站内容与公众号怎样一起积累', steps: ['留下实践记录', '整理证据与卡点', '补教程和模板', '写文章并关联原记录'] },
        example: { title: '同一段经历，怎样说得准确', columns: ['不宜这样写', '可以这样写'], rows: [['我改了按钮，转化率必涨', '本轮改了入口后，有 3 人开始生成；样本小，下一轮继续观察。'], ['这套方法适合所有出海产品', '对需要上传素材的工具，可先检查用户是否看懂示例与上传入口。']], note },
        exercise: '把本轮实践写成 5 段提纲，附一份读者可以使用的模板。',
        template: '# 实践分享提纲\n题目与一个具体问题：\n背景（人群/渠道/版本/日期）：\n我当时怎么判断：\n实际做了什么：\n观察结果与证据（脱敏）：\n未知、限制与其他可能原因：\n读者可以试的步骤：\n关联教程 / 模板：\n下一轮行动：\n公众号链接（发布后填写）：',
        checks: ['提纲有真实过程和可追溯证据，计划、推测与结果分开。', '读者知道可以尝试哪些操作，也知道方法的适用条件。'],
        troubleshooting: [{ problem: '结果不漂亮，觉得没法分享', action: '写清失败是如何被发现和排查的，这本身就能帮读者少走弯路。' }, { problem: '只有结论，没有过程', action: '回到当时的实验表和日志补证据；补不出来的部分就标为回忆或待核实。' }],
      },
    ],
  },
];

export function tutorialPath(topicId: string, lessonId?: string) {
  return `${OVERSEAS_PATH}/learn/${topicId}${lessonId ? `#${lessonId}` : ''}`;
}

export const OVERSEAS_TUTORIAL_SEARCH_ITEMS = OVERSEAS_TUTORIALS.flatMap(topic => [
  { title: topic.title, desc: topic.intro, href: tutorialPath(topic.id) },
  ...topic.lessons.map(lesson => ({ title: lesson.title, desc: `${lesson.question} ${lesson.result}`, href: tutorialPath(topic.id, lesson.id) })),
]);
