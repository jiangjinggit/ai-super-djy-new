import { Mail, MessageSquareText, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="max-w-sm">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="text-blue-500 fill-blue-500" size={20} />
            <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tighter">AI Superman DJY</span>
          </div>
          <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
            一个围绕 AI 学习、工作流、模型选型与真实落地场景持续整理的内容站。
          </p>
          <p className="text-sm text-slate-500 dark:text-gray-500 mt-3">© {currentYear} AI Superman DJY. 让每个人成为超级个体。</p>
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-5 py-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-gray-500 mb-3">保持联系</p>
          <div className="space-y-3 text-sm text-slate-700 dark:text-gray-300">
            <p className="inline-flex items-center gap-2">
              <MessageSquareText size={16} className="text-blue-600 dark:text-blue-300" />
              公众号：AI Superman DJY
            </p>
            <a href="mailto:hello@aisupermandjy.com" className="inline-flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={16} className="text-blue-600 dark:text-blue-300" />
              hello@aisupermandjy.com
            </a>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 text-sm font-medium text-slate-500 dark:text-gray-500">
          <Link to="/about" className="hover:text-white transition-colors">
            关于 DJY
          </Link>
          <Link to="/faq" className="hover:text-white transition-colors">
            常见问题
          </Link>
          <Link to="/privacy" className="hover:text-white transition-colors">
            隐私政策
          </Link>
          <Link to="/terms" className="hover:text-white transition-colors">
            服务条款
          </Link>
          <Link to="/module/super-individual" className="hover:text-white transition-colors">
            从入门开始
          </Link>
        </div>
      </div>
    </footer>
  );
};
