import { ArrowLeft, ShieldCheck, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <button type="button" onClick={() => navigate("/")} className="flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 返回首页
      </button>
      <div className="flex items-center gap-6 mb-12">
        <div className="w-20 h-20 rounded-3xl bg-blue-600/20 flex items-center justify-center text-blue-400">
          <User size={40} />
        </div>
        <div>
          <h1 className="text-5xl font-black text-white mb-2">关于 DJY</h1>
          <p className="text-gray-400 text-lg">AI Superman EVOLUTION 创始人</p>
        </div>
      </div>

      <div className="space-y-8 text-gray-300 leading-relaxed">
        <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
          <h3 className="text-xl font-bold text-white mb-4">为什么做这个项目？</h3>
          <p>AI 时代已经到来，但大多数人还停留在"听说过 ChatGPT"的阶段。市面上的 AI 课程要么太贵，要么太水，要么过度承诺"月入 10 万"。</p>
          <p className="mt-4">我想做一个不一样的东西：所有内容免费开放，基于官方文档而非道听途说，标注数据来源和风险提示，不画大饼只讲事实。帮助每个人用 AI 成为超级个体——不是替代你，而是放大你。</p>
        </div>

        <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
          <h3 className="text-xl font-bold text-white mb-4">内容原则</h3>
          <div className="space-y-3">
            {[
              "高时效参数优先参考官方文档或公开原始来源，并标注整理日期",
              "案例重点拆方法、前置条件与风险，不把个案包装成普遍结论",
              "不绑定单一工具，每个场景提供多平台方案",
              "不承诺收入，优先强调任务边界、成本意识和验证节奏",
              "持续更新，但鼓励用户对价格、版本和能力边界自行复核官方页面",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <ShieldCheck size={18} className="text-emerald-400 mt-1 shrink-0" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
          <h3 className="text-xl font-bold text-white mb-4">联系方式</h3>
          <p>公众号：AI Superman DJY（获取最新内容和社群入口）</p>
          <p className="mt-2">如果你有好的案例、工具推荐或内容建议，欢迎通过公众号联系我。</p>
        </div>
      </div>
    </motion.div>
  );
}
