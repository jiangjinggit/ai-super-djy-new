import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ListTree, X, ChevronRight } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export const MobileTableOfContents = ({ body }: { body: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    const lines = body.split('\n');
    const items: TocItem[] = [];
    
    lines.forEach((line) => {
      const match = line.match(/^(#{2,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].replace(/[`*_~]/g, '').trim();
        const id = text
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[!"#$%&'()*+,./:;<=>?@[\\\]^_{|}~]/g, '');
        items.push({ id, text, level });
      }
    });
    
    setToc(items);
  }, [body]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setIsOpen(false);
    }
  };

  if (toc.length === 0) return null;

  return (
    <>
      {/* 悬浮触发按钮 - 支持全屏自由拖拽 */}
      <motion.div
        drag
        dragMomentum={false}
        className="lg:hidden fixed bottom-10 left-6 z-[60] touch-none"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9, opacity: 1 }}
          onClick={() => setIsOpen(true)}
          className="w-8 h-8 flex items-center justify-center relative shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-opacity opacity-80 active:opacity-100 cursor-pointer"
          style={{
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            background: 'linear-gradient(135deg, #0EA5E9, #22D3EE)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
          <ListTree size={14} className="text-slate-950 relative z-10" strokeWidth={2.5} />
        </motion.button>
      </motion.div>

      {/* 目录抽屉 */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[150]"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 z-[160] bg-white dark:bg-[#0d1117] border-t border-slate-200 dark:border-cyan-500/20 rounded-t-[32px] max-h-[75vh] overflow-hidden flex flex-col shadow-[0_-12px_48px_rgba(0,0,0,0.3)]"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                    <ListTree size={16} />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white tracking-tight">内容导航</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                <div className="space-y-1">
                  {toc.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center gap-3 py-3 px-4 rounded-xl transition-all text-left group ${
                        item.level === 3 ? 'pl-8' : ''
                      } hover:bg-slate-50 dark:hover:bg-white/[0.03] border border-transparent hover:border-slate-200 dark:hover:border-cyan-500/10`}
                    >
                      <div className={`shrink-0 opacity-30 group-hover:opacity-100 group-hover:text-cyan-400 transition-all`}>
                        <ChevronRight size={14} />
                      </div>
                      <span className={`text-sm font-medium leading-relaxed ${
                        item.level === 3 ? 'text-slate-500 dark:text-gray-500 text-xs' : 'text-slate-700 dark:text-gray-300'
                      }`}>
                        {item.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="px-6 py-4 bg-slate-50 dark:bg-white/[0.02] border-t border-slate-100 dark:border-white/5">
                <p className="text-[9px] font-mono-tech text-center text-slate-400 dark:text-gray-600 uppercase tracking-[0.2em]">
                  select a section to jump
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
