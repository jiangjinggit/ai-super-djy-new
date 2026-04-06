import { Cpu, Menu, Search, X, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { NAV_LABELS } from '@/content/moduleCatalog';
import { MODULE_IDS } from '@/types/course';
import { ThemeToggle } from './ThemeToggle';

const showCommunityCTA = false;

export const Navbar = ({ onSearchClick }: { onSearchClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClassName = isScrolled
    ? 'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b bg-white/80 dark:bg-black/80 backdrop-blur-md border-slate-200 dark:border-white/10 py-4'
    : 'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b bg-transparent border-transparent py-4 md:py-6';

  return (
    <nav className={navClassName}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        <button
          type="button"
          className="flex items-center gap-2 cursor-pointer shrink-0"
          onClick={() => navigate('/')}
          aria-label="返回首页"
        >
          {/* 六边形 Logo 容器 */}
          <div
            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center relative shrink-0"
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              background: 'linear-gradient(135deg, #0EA5E9, #22D3EE)',
              boxShadow: '0 0 18px rgba(34,211,238,0.5)',
            }}
          >
            <Cpu size={16} className="text-slate-950" strokeWidth={2} />
          </div>
          <span className="text-lg md:text-xl font-bold tracking-tighter text-slate-900 dark:text-white whitespace-nowrap" style={{fontFamily: "'Syne', sans-serif"}}>
            AI Superman <span className="text-cyan-400" style={{textShadow: '0 0 12px rgba(34,211,238,0.5)'}}>DJY</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:text-white transition-colors">
            首页
          </Link>
          {MODULE_IDS.map((id) => (
            <Link key={id} to={`/module/${id}`} className="text-sm font-medium text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:text-white transition-colors">
              {NAV_LABELS[id]}
            </Link>
          ))}
          <Link to="/about" className="text-sm font-medium text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:text-white transition-colors">
            关于
          </Link>
          <Link to="/faq" className="text-sm font-medium text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:text-white transition-colors">
            FAQ
          </Link>
          
          <div className="w-px h-4 bg-slate-200 dark:bg-white/10 mx-1" />

          {/* 搜索按钮 */}
          <button
            onClick={onSearchClick}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all group cursor-pointer"
          >
            <Search size={14} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
            <div className="hidden lg:flex items-center gap-1.5">
              <span className="text-xs font-medium text-slate-400 group-hover:text-slate-600 dark:group-hover:text-gray-300 transition-colors">搜索</span>
              <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[9px] font-bold text-slate-400 dark:text-gray-500">
                <Command size={8} /> K
              </div>
            </div>
          </button>

          <ThemeToggle />

          {showCommunityCTA && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAction}
              className="px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-black text-sm font-bold rounded-full hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
              type="button"
            >
              开启超级个体
            </motion.button>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onSearchClick}
            className="p-2 text-slate-500 dark:text-gray-400 hover:text-cyan-400 transition-colors"
            aria-label="搜索"
          >
            <Search size={20} />
          </button>
          <ThemeToggle />
          <button
            type="button"
            className="p-2 text-slate-900 dark:text-white"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? '关闭菜单' : '打开菜单'}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-[#0d1117] border-b border-slate-200 dark:border-white/10 p-6 flex flex-col gap-4 shadow-2xl"
          >
            {/* 移动端菜单搜索入口 */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onSearchClick();
              }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500"
            >
              <Search size={18} />
              <span className="text-sm font-medium">搜索课程、工具或场景...</span>
            </button>

            <Link to="/" className="text-lg font-medium text-slate-600 dark:text-gray-400 py-2 border-b border-slate-100 dark:border-white/5" onClick={() => setIsMobileMenuOpen(false)}>
              首页
            </Link>
            {MODULE_IDS.map((id) => (
              <Link
                key={id}
                to={`/module/${id}`}
                className="text-lg font-medium text-slate-600 dark:text-gray-400 py-2 border-b border-slate-100 dark:border-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {NAV_LABELS[id]}
              </Link>
            ))}
            <Link to="/about" className="text-lg font-medium text-slate-600 dark:text-gray-400 py-2 border-b border-slate-100 dark:border-white/5" onClick={() => setIsMobileMenuOpen(false)}>
              关于
            </Link>
            <Link to="/faq" className="text-lg font-medium text-slate-600 dark:text-gray-400 py-2 border-b border-slate-100 dark:border-white/5" onClick={() => setIsMobileMenuOpen(false)}>
              FAQ
            </Link>
            {showCommunityCTA && (
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleAction}
                className="w-full py-3 bg-blue-600 text-slate-900 dark:text-white font-bold rounded-xl"
                type="button"
              >
                开启超级个体
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
