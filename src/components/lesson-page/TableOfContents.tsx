import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ListTree, ChevronRight } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export const TableOfContents = ({ body }: { body: string }) => {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // 解析 Markdown 标题 (## 和 ###)
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0% -70% 0%' }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (toc.length === 0) return null;

  return (
    <div className="hidden lg:block fixed left-[max(2rem,calc(50vw-42rem))] top-32 w-64 max-h-[calc(100vh-12rem)] overflow-y-auto custom-scrollbar pr-4">
      <div className="flex items-center gap-2 mb-6 px-2">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
          <ListTree size={16} />
        </div>
        <p className="font-mono-tech text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-gray-500">本课导航</p>
      </div>

      <nav className="relative space-y-1">
        {/* 活动指示器线条 */}
        <div className="absolute left-3 top-0 bottom-0 w-px bg-slate-200 dark:bg-white/5" />
        
        {toc.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`group relative flex items-start gap-3 w-full py-2 pl-3 text-left transition-all ${
                isActive ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {/* 活动点 */}
              {isActive && (
                <motion.div
                  layoutId="toc-indicator"
                  className="absolute left-[11px] top-4 w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,1)] z-10"
                />
              )}
              
              <div className={`mt-2 shrink-0 ${item.level === 3 ? 'ml-4 opacity-40' : 'opacity-20 group-hover:opacity-100 transition-opacity'}`}>
                <ChevronRight size={12} className={`${isActive ? 'rotate-90' : ''} transition-transform`} />
              </div>
              
              <span className={`text-xs font-medium leading-relaxed ${item.level === 3 ? 'text-[11px] opacity-80' : ''}`}>
                {item.text}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
