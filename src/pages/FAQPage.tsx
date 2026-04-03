import { ArrowLeft, ChevronDown, HelpCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const FAQ_DATA = [
  { q: "我完全零基础，能学吗？", a: "完全可以。我为零基础同学专门设计了阶段 0，所有工具都有免费版本，你只需要跟着我的步骤操作即可。不需要编程基础，也不需要英语基础。" },
  { q: "需要花多少钱？", a: "你可以先从免费额度和低成本工具开始。我的建议是阶段 0 完全可以先不付费；进入高频使用后，再根据任务量决定是否订阅或接入 API。对我来说，重点不是你一开始花多少钱，而是先确认 AI 是否真的帮你省下了时间。" },
  { q: "和其他 AI 课程有什么区别？", a: "我更重视方法、边界和执行节奏，而不是堆砌热点名词。我会带你回到官方文档或公开原始来源，我的案例也会强调前置条件和风险，我从不承诺“复制就能赚钱”。" },
  { q: "学完能赚钱吗？", a: "我不承诺任何收入。在我的案例库中，所有数据都标注了来源和风险提示。对我而言，AI 是工具，不是印钞机。你的收入最终取决于你的行业知识、执行力和市场判断。" },
  { q: "我不是程序员，能用 Cursor/Kiro 开发产品吗？", a: "你可以尝试，但我建议你要有合理的预期。虽然 AI 编程工具大幅降低了技术门槛，但做出有竞争力的产品仍需要一定的技术理解。我建议你先从简单的工具类产品开始尝试。" },
  { q: "内容多久更新一次？", a: "我会持续整理和更新内容，但对于价格、版本、上下文窗口这类变化很快的信息，我仍建议你在使用前点开官方页面再确认一次。我在模块页保留了整理日期和核心参考来源。" },
  { q: "OpenClaw / Claude Code 选哪个？", a: "这两个工具我都在深度使用，它们并不冲突，建议你根据当前的具体需求来选择。如果你需要本地部署、多渠道接入（如飞书/微信）和长期的自动化任务，OpenClaw 是核心；如果你更侧重于代码开发、文档协作和极速的任务迭代，Claude Code 则效率更高。我建议你分别进入「OpenClaw」和「Claude Agent」模块详细了解它们的特性，先跑通一个最小闭环。" },
  { q: "如何加入社区？", a: "你可以关注我的公众号「AI Superman DJY」并添加我的个人微信（AI-Superman-DJY），我会拉你进社群。社群内会有实战交流、工具推荐、案例分享等内容。" },
];

export default function FAQPage() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useDocumentTitle('常见问题');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <button type="button" onClick={() => navigate("/")} className="flex items-center gap-2 text-slate-600 dark:text-gray-400 hover:text-white mb-12 transition-colors group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 返回首页
      </button>
      <div className="flex items-center gap-6 mb-12">
        <div className="w-20 h-20 rounded-3xl bg-purple-600/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
          <HelpCircle size={40} />
        </div>
        <div>
          <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-2">常见问题</h1>
          <p className="text-slate-600 dark:text-gray-400 text-lg">关于 AI Superman DJY 的常见疑问</p>
        </div>
      </div>
      <div className="space-y-3">
        {FAQ_DATA.map((faq, i) => (
          <div key={faq.q} className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden">
            <button type="button" onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors">
              <span className="text-slate-900 dark:text-white font-medium pr-4">{faq.q}</span>
              <ChevronDown size={20} className={`text-slate-600 dark:text-gray-400 shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <p className="px-6 pb-6 text-slate-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
