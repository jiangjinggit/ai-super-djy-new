import { ArrowLeft, ShieldCheck, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export default function AboutPage() {
  const navigate = useNavigate();

  useDocumentTitle('关于 DJY');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <button type="button" onClick={() => navigate("/")} className="flex items-center gap-2 text-slate-600 dark:text-gray-400 hover:text-white mb-12 transition-colors group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 返回首页
      </button>
      <div className="flex items-center gap-6 mb-12">
        <div className="w-20 h-20 rounded-3xl bg-blue-600/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
          <User size={40} />
        </div>
        <div>
          <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-2">关于 DJY</h1>
          <p className="text-slate-600 dark:text-gray-400 text-lg">10年+小中大厂技术研发及负责人经验 · 独立开发者 · AI Superman DJY创始人 · OpenClaw深度用户 · 分享AI编程实战、探索和分享超级个体（OPC）经验、AI工具提效等</p>
        </div>
      </div>

      <div className="space-y-8 text-slate-700 dark:text-gray-300 leading-relaxed">
        <div className="p-8 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">为什么做这个项目？</h3>
          <p>AI 时代已经到来，但大多数人还停留在“听说过 ChatGPT”的阶段。面对海量且碎片化的信息，很多人容易陷入“收藏从未停止，学习从未开始”的困境。</p>
          <p className="mt-4">
            这个网站是我个人的学习与记录平台，核心初衷是为了实现 AI 知识的<strong>系统化</strong>梳理。我希望把零散的工具与技巧，整合为一套可落地、可复制的实战路径，让 AI 真正从“新鲜感”走向“生产力”。
          </p>
          <p className="mt-4">
            市场上并不缺信息，但缺的是诚实的实战逻辑。很多内容往往过度承诺收益，却忽略了真实的交付成本与技术边界。在这里，我坚持基于官方文档与真实案例，标注风险与边界。我更看重的是通过高质量的知识沉淀与社群共创，帮助每个人用 AI 成为超级个体。
          </p>
        </div>

        <div className="p-8 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">内容原则</h3>
          <div className="space-y-3">
            {[
              "高时效参数优先参考官方文档或公开原始来源，并标注整理日期",
              "案例重点拆解方法、前置条件与风险，不把个案包装成普遍结论",
              "作为个人记录平台，我更倾向于记录真实碰到的问题与解决方案",
              "不绑定单一工具，每个场景尽可能提供多平台方案",
              "不承诺收入，优先强调任务边界、成本意识和验证节奏",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <ShieldCheck size={18} className="text-emerald-600 dark:text-emerald-400 mt-1 shrink-0" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">联系方式</h3>
          <div className="space-y-2">
            <p>公众号：AI Superman DJY（获取最新实战案例与内容更新）</p>
            <p>个人微信号：AI-Superman-DJY（添加请备注，拉你进实战社群）</p>
          </div>
          <p className="mt-4">如果你有好的案例、工具推荐或内容建议，欢迎通过上述方式联系我。</p>
        </div>
      </div>
    </motion.div>
  );
}
