import { ArrowLeft, ChevronDown, HelpCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FAQ_DATA = [
  { q: "我完全零基础，能学吗？", a: "完全可以。阶段 0 专门为零基础设计，所有工具都有免费版本，跟着步骤操作即可。不需要编程基础，不需要英语基础。" },
  { q: "需要花多少钱？", a: "阶段 0 完全免费（$0）。阶段 1 月成本约 $5-15（主要是 DeepSeek API）。阶段 2 月成本约 $35-55（Cursor Pro + API 费用）。你可以根据自己的节奏控制投入。" },
  { q: "和其他 AI 课程有什么区别？", a: "我们不卖课，所有内容免费开放。我们基于各厂商官方文档，标注数据来源，拒绝泛泛而谈。每个场景提供多平台方案，不绑定单一工具。" },
  { q: "学完能赚钱吗？", a: "我们不承诺任何收入。真实案例库中的数据都标注了来源和风险提示。AI 是工具，不是印钞机。你的收入取决于你的行业知识、执行力和市场判断。" },
  { q: "我不是程序员，能用 Cursor/Kiro 开发产品吗？", a: "可以尝试，但要有合理预期。AI 编程工具大幅降低了技术门槛，但做出有竞争力的产品仍需要一定的技术理解。建议从简单的工具类产品开始。" },
  { q: "内容多久更新一次？", a: "我们持续跟进各厂商官方文档更新。每个模块都标注了\"数据验证日期\"，确保信息时效性。关注公众号可以第一时间获取更新通知。" },
  { q: "OpenClaw / Claude Code / Manus 选哪个？", a: "取决于你的需求：数据隐私优先选 OpenClaw（开源本地部署），编程场景选 Claude Code（终端原生 Agent），全自主任务选 Manus AI（给目标自动执行）。非技术用户想快速体验可以先试 Manus 或 Coze。详见智能体实战专区的对比。" },
  { q: "如何加入社区？", a: "关注公众号「AI Superman DJY」，回复\"社群\"即可获取加入方式。社群内有实战交流、工具推荐、案例分享等内容。" },
];

export default function FAQPage() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <button type="button" onClick={() => navigate("/")} className="flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 返回首页
      </button>
      <div className="flex items-center gap-6 mb-12">
        <div className="w-20 h-20 rounded-3xl bg-purple-600/20 flex items-center justify-center text-purple-400">
          <HelpCircle size={40} />
        </div>
        <div>
          <h1 className="text-5xl font-black text-white mb-2">常见问题</h1>
          <p className="text-gray-400 text-lg">关于 AI Superman EVOLUTION 的常见疑问</p>
        </div>
      </div>
      <div className="space-y-3">
        {FAQ_DATA.map((faq, i) => (
          <div key={faq.q} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <button type="button" onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors">
              <span className="text-white font-medium pr-4">{faq.q}</span>
              <ChevronDown size={20} className={`text-gray-400 shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <p className="px-6 pb-6 text-gray-400 leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
