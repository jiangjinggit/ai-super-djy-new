import { Cpu, Menu, Search, X, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { MODULE_GROUPS, NAV_LABELS } from '@/content/moduleCatalog';
import { OVERSEAS_PATH } from '@/content/overseas';
import { ThemeToggle } from './ThemeToggle';

const showCommunityCTA = false;
const PRIMARY_NAV_GROUPS = MODULE_GROUPS.filter((group) => group.id !== 'practice' && group.id !== 'community');
const PRACTICE_MODULE_IDS = MODULE_GROUPS
  .filter((group) => group.id === 'practice' || group.id === 'community')
  .flatMap((group) => group.moduleIds);

export const Navbar = ({ onSearchClick }: { onSearchClick: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openGroupId, setOpenGroupId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const goHome = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleAction = () => {
    navigate('/module/super-individual');
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const closeWhenOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenGroupId(null);
      }
    };
    const closeWhenEscaped = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenGroupId(null);
    };

    document.addEventListener('mousedown', closeWhenOutside);
    window.addEventListener('keydown', closeWhenEscaped);
    return () => {
      document.removeEventListener('mousedown', closeWhenOutside);
      window.removeEventListener('keydown', closeWhenEscaped);
    };
  }, []);

  const navClassName = isScrolled
    ? 'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b bg-white/80 dark:bg-black/80 backdrop-blur-md border-slate-200 dark:border-white/10 py-4'
    : 'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b bg-transparent border-transparent py-4 md:py-6';

  return (
    <nav ref={navRef} className={navClassName}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        <button
          type="button"
          className="flex items-center gap-2 cursor-pointer shrink-0"
          onClick={goHome}
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
          <span className="text-base sm:text-lg md:text-xl font-bold tracking-tighter text-slate-900 dark:text-white whitespace-nowrap" style={{fontFamily: "'Syne', sans-serif"}}>
            AI Superman <span className="text-cyan-400" style={{textShadow: '0 0 12px rgba(34,211,238,0.5)'}}>DJY</span>
          </span>
        </button>

        <div className="hidden xl:flex items-center gap-5">
          <button type="button" onClick={goHome} className="text-sm font-medium text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:text-white transition-colors cursor-pointer">
            首页
          </button>
          {PRIMARY_NAV_GROUPS.map((group) => (
            <div key={group.id} className="relative">
              <button
                type="button"
                onClick={() => setOpenGroupId((current) => (current === group.id ? null : group.id))}
                className="text-sm font-medium text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                aria-expanded={openGroupId === group.id}
              >
                {group.id === 'foundation' ? '基础能力' : '智能体应用'}
              </button>
              {openGroupId === group.id && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                <div className="w-64 p-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#0d1117]/95 backdrop-blur-xl shadow-2xl">
                  <p className="px-3 pt-1 pb-2 text-[10px] font-mono-tech tracking-[0.16em] uppercase text-cyan-600 dark:text-cyan-400">{group.eyebrow}</p>
                  {group.moduleIds.map((id) => (
                    <Link key={id} to={`/module/${id}`} onClick={() => setOpenGroupId(null)} className="block px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">
                      {NAV_LABELS[id]}
                    </Link>
                  ))}
                </div>
                </div>
              )}
            </div>
          ))}
          {PRACTICE_MODULE_IDS.map((moduleId) => (
            <Link key={moduleId} to={`/module/${moduleId}`} className="text-sm font-medium text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              {NAV_LABELS[moduleId]}
            </Link>
          ))}
          <Link to={OVERSEAS_PATH} className="text-sm font-medium text-emerald-700 dark:text-emerald-300 hover:text-emerald-600 transition-colors">AI 出海</Link>
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

        <div className="flex items-center gap-0.5 sm:gap-2 xl:hidden">
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
            className="xl:hidden absolute top-full left-0 right-0 bg-white dark:bg-[#0d1117] border-b border-slate-200 dark:border-white/10 p-6 flex flex-col gap-4 shadow-2xl max-h-[calc(100dvh-80px)] overflow-y-auto"
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

            <button type="button" onClick={() => { setIsMobileMenuOpen(false); goHome(); }} className="text-lg font-medium text-slate-600 dark:text-gray-400 py-2 border-b border-slate-100 dark:border-white/5 text-left w-full cursor-pointer">
              首页
            </button>
            {PRIMARY_NAV_GROUPS.map((group) => (
              <div key={group.id} className="border-b border-slate-100 dark:border-white/5 pb-2">
                <p className="pt-2 pb-1 text-[10px] font-mono-tech tracking-[0.18em] uppercase text-cyan-600 dark:text-cyan-400">
                  {group.id === 'foundation' ? '基础能力' : '智能体应用'}
                </p>
                {group.moduleIds.map((id) => (
                  <Link
                    key={id}
                    to={`/module/${id}`}
                    className="block text-base font-medium text-slate-600 dark:text-gray-400 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {NAV_LABELS[id]}
                  </Link>
                ))}
              </div>
            ))}
            {PRACTICE_MODULE_IDS.map((moduleId) => (
              <Link
                key={moduleId}
                to={`/module/${moduleId}`}
                className="text-lg font-medium text-slate-600 dark:text-gray-400 py-2 border-b border-slate-100 dark:border-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {NAV_LABELS[moduleId]}
              </Link>
            ))}
            <Link to={OVERSEAS_PATH} className="text-lg font-medium text-emerald-700 dark:text-emerald-300 py-2 border-b border-slate-100 dark:border-white/5" onClick={() => setIsMobileMenuOpen(false)}>AI 出海</Link>
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
