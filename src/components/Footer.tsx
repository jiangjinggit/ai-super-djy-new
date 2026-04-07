import { Cpu, MessageSquareText, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-200 dark:border-white/8 py-12 px-6">
      {/* 顶部 cyan 发光线 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        {/* 品牌区 */}
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <div
              className="w-7 h-7 flex items-center justify-center"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                background: 'linear-gradient(135deg, #0EA5E9, #22D3EE)',
              }}
            >
              <Cpu size={13} className="text-slate-950" strokeWidth={2.5} />
            </div>
            <span className="text-base font-bold text-slate-900 dark:text-white tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              AI Superman <span className="text-cyan-400">DJY</span>
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
            一个围绕 AI 入门、大模型选型、智能体开发、AI 编程及真实落地案例持续整理的内容站。
          </p>
          <p className="font-mono-tech text-xs text-slate-400 dark:text-gray-600 mt-3 tracking-wider">
            © {currentYear} AI Superman DJY
          </p>
          <p className="font-mono-tech text-xs text-slate-400 dark:text-gray-600 mt-1 tracking-wider">
            超能个体成长笔记
          </p>
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-tech text-xs text-slate-400 dark:text-gray-600 mt-1 tracking-wider hover:text-cyan-400 transition-colors"
          >
            湘ICP备2026010800号-1
          </a>
        </div>

        {/* 联系卡片 */}
        <div className="card-scan card-hud relative rounded-2xl border border-slate-200 dark:border-cyan-500/10 bg-slate-100 dark:bg-white/5 px-5 py-4 hover:border-cyan-500/20 transition-colors overflow-hidden">
          <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-gray-500 mb-3">保持联系</p>
          <div className="space-y-3 text-sm text-slate-700 dark:text-gray-300">
            <p className="inline-flex items-center gap-2">
              <MessageSquareText size={15} className="text-cyan-500" />
              公众号：AI Superman DJY
            </p>
            <p className="inline-flex items-center gap-2">
              <User size={15} className="text-cyan-500" />
              微信号：AI-Superman-DJY
            </p>
          </div>
        </div>

        {/* 导航链接 */}
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-500 dark:text-gray-500">
          {[
            { to: '/about', label: '关于 DJY' },
            { to: '/faq', label: '常见问题' },
            { to: '/privacy', label: '隐私政策' },
            { to: '/terms', label: '服务条款' },
            { to: '/module/super-individual', label: '从入门开始' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="hover:text-cyan-400 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
