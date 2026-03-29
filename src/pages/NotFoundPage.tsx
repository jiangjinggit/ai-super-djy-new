import { Compass, Home } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export default function NotFoundPage() {
  useDocumentTitle('页面未找到');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-[70vh] px-6 pt-32 pb-24">
      <div className="max-w-3xl mx-auto rounded-[40px] border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-10 md:p-14">
        <div className="w-16 h-16 rounded-2xl bg-blue-500/15 text-blue-600 dark:text-blue-300 flex items-center justify-center mb-8">
          <Compass size={32} />
        </div>
        <p className="text-sm font-bold tracking-[0.2em] text-blue-600 dark:text-blue-300 mb-4">404</p>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-5 leading-tight">这个页面不存在</h1>
        <p className="text-lg text-slate-600 dark:text-gray-400 leading-relaxed mb-8">
          链接可能已经失效，或者内容已经迁移到新的模块结构里。你可以返回首页，或者直接进入六大模块继续学习。
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-slate-900 dark:text-white hover:bg-blue-500 transition-colors"
          >
            <Home size={18} />
            返回首页
          </Link>
          <Link
            to="/module/super-individual"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 dark:border-white/10 px-6 py-4 font-semibold text-slate-800 dark:text-gray-200 hover:bg-white/5 transition-colors"
          >
            从入门模块开始
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
