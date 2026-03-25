import { Menu, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { NAV_LABELS } from '@/content/moduleCatalog';
import { MODULE_IDS } from '@/types/course';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAction = () => {
    toast.success('即将开启您的超级个体之旅！', {
      description: '该功能正在开发中，敬请期待。',
    });
  };

  const navClassName = isScrolled
    ? 'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b bg-black/80 backdrop-blur-md border-white/10 py-4'
    : 'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b bg-transparent border-transparent py-6';

  return (
    <nav className={navClassName}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button
          type="button"
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
          aria-label="返回首页"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)]">
            <Zap className="text-white fill-white" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">
            AI Superman <span className="text-blue-500">DJY</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
            首页
          </Link>
          {MODULE_IDS.map((id) => (
            <Link key={id} to={`/module/${id}`} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              {NAV_LABELS[id]}
            </Link>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAction}
            className="px-5 py-2 bg-white text-black text-sm font-bold rounded-full hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
            type="button"
          >
            开启超级个体
          </motion.button>
        </div>

        <button
          type="button"
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label={isMobileMenuOpen ? '关闭菜单' : '打开菜单'}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-black border-b border-white/10 p-6 flex flex-col gap-4"
          >
            <Link to="/" className="text-lg font-medium text-gray-400" onClick={() => setIsMobileMenuOpen(false)}>
              首页
            </Link>
            {MODULE_IDS.map((id) => (
              <Link
                key={id}
                to={`/module/${id}`}
                className="text-lg font-medium text-gray-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {NAV_LABELS[id]}
              </Link>
            ))}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleAction}
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl"
              type="button"
            >
              开启超级个体
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
