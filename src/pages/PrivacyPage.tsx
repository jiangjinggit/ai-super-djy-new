import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ShieldCheck, EyeOff, MessageSquare } from 'lucide-react';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export default function PrivacyPage() {
  useDocumentTitle('隐私政策');

  const sections = [
    {
      title: "数据收集说明",
      content: "本站作为一个 AI 知识分享平台，主要提供内容展示服务。我们不会在页面中主动收集您的身份证号、银行卡号等敏感个人信息。目前本站不设账号系统，因此不存储您的个人资料。",
      icon: <EyeOff size={24} className="text-cyan-500" />
    },
    {
      title: "联系与沟通",
      content: "如果您通过公众号（AI Superman DJY）或个人微信（AI-Superman-DJY）与我们联系，您提供的沟通信息仅用于解答疑问、收集反馈或案例交流，我们承诺不将此类信息用于营销、转售或提供给任何第三方。",
      icon: <MessageSquare size={24} className="text-cyan-500" />
    },
    {
      title: "第三方链接",
      content: "本站包含大量指向官方文档、第三方工具或资源的链接。点击这些链接将离开本站。我们无法控制这些外部站点的隐私实践，建议您在访问时查看其各自的隐私政策。",
      icon: <ShieldCheck size={24} className="text-cyan-500" />
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="pt-32 pb-24 px-6 max-w-4xl mx-auto"
    >
      <Link to="/" className="flex items-center gap-2 text-slate-500 dark:text-gray-400 hover:text-cyan-400 mb-10 transition-colors group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 返回首页
      </Link>

      <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">隐私政策</h1>
      <p className="text-slate-600 dark:text-gray-400 mb-12 text-lg">
        AI Superman DJY 致力于保护您的隐私并确保您在本站的访问体验是安全且透明的。
      </p>

      <div className="space-y-6 mb-16">
        {sections.map((section) => (
          <div key={section.title} className="p-8 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl">
            <div className="flex items-center gap-4 mb-4">
              {section.icon}
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{section.title}</h3>
            </div>
            <p className="text-slate-700 dark:text-gray-300 leading-relaxed">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      <div className="p-8 bg-cyan-500/5 border border-cyan-500/20 rounded-3xl">
        <p className="text-sm text-slate-600 dark:text-gray-400">
          * 随着本站功能的完善（如未来可能引入的评论系统或会员功能），本隐私政策将相应更新。重大变更会通过公众号或本页面醒目位置告知。
          <br /><br />
          生效日期：2026年4月3日
        </p>
      </div>
    </motion.div>
  );
}
