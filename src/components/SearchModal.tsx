import { Search, Command, X, BookOpen, Hash, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { MODULE_CONTENT } from '@/content/modules';
import { NAV_LABELS } from '@/content/moduleCatalog';
import type { ModuleId } from '@/types/course';

interface SearchItem {
  type: 'module' | 'lesson';
  moduleId: ModuleId;
  slug?: string;
  title: string;
  desc: string;
  moduleTitle: string;
}

export const SearchModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const searchItems = useMemo(() => {
    const items: SearchItem[] = [];
    Object.entries(MODULE_CONTENT).forEach(([id, module]) => {
      const moduleId = id as ModuleId;
      // 添加模块
      items.push({
        type: 'module',
        moduleId,
        title: module.title,
        desc: module.description,
        moduleTitle: NAV_LABELS[moduleId],
      });
      // 添加课程
      module.lessons.forEach((lesson) => {
        items.push({
          type: 'lesson',
          moduleId,
          slug: lesson.slug,
          title: lesson.title,
          desc: lesson.content,
          moduleTitle: NAV_LABELS[moduleId],
        });
      });
    });
    return items;
  }, []);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return searchItems.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.desc.toLowerCase().includes(lowerQuery) ||
        item.moduleTitle.toLowerCase().includes(lowerQuery)
    ).slice(0, 8);
  }, [query, searchItems]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex]);

  const handleSelect = (item: SearchItem) => {
    if (item.type === 'module') {
      navigate(`/module/${item.moduleId}`);
    } else {
      navigate(`/module/${item.moduleId}/lesson/${item.slug}`);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4 md:px-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/40 dark:bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-cyan-500/20 rounded-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.3)] overflow-hidden"
          >
            <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-200 dark:border-white/5">
              <Search size={20} className="text-slate-400 dark:text-cyan-400/50" />
              <input
                ref={inputRef}
                type="text"
                placeholder="搜索课程、工具或场景 (Cmd + K)"
                className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-600 font-medium text-lg"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
              />
              <div className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-bold text-slate-500 dark:text-gray-500 uppercase tracking-widest">
                <Command size={10} /> Esc
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-3">
              {filteredItems.length > 0 ? (
                <div className="space-y-1">
                  {filteredItems.map((item, index) => (
                    <button
                      key={`${item.type}-${item.moduleId}-${item.slug}`}
                      type="button"
                      onMouseEnter={() => setSelectedIndex(index)}
                      onClick={() => handleSelect(item)}
                      className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all text-left ${
                        index === selectedIndex
                          ? 'bg-blue-500/10 dark:bg-cyan-500/10 border border-blue-500/20 dark:border-cyan-500/20'
                          : 'bg-transparent border border-transparent hover:bg-slate-50 dark:hover:bg-white/[0.02]'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        index === selectedIndex ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-400'
                      }`}>
                        {item.type === 'module' ? <BookOpen size={18} /> : <Hash size={18} />}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-sm font-bold truncate ${index === selectedIndex ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-gray-300'}`}>
                            {item.title}
                          </span>
                          <span className="px-1.5 py-0.5 rounded-md bg-slate-200 dark:bg-white/5 text-[9px] font-bold text-slate-500 dark:text-gray-500 uppercase tracking-tighter shrink-0">
                            {item.moduleTitle}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-gray-500 truncate">{item.desc}</p>
                      </div>

                      {index === selectedIndex && (
                        <ArrowRight size={16} className="text-cyan-400 animate-in slide-in-from-left-2 duration-300" />
                      )}
                    </button>
                  ))}
                </div>
              ) : query ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <X size={24} className="text-slate-300 dark:text-gray-700" />
                  </div>
                  <p className="text-slate-500 dark:text-gray-500 text-sm">未找到与 “{query}” 相关的结果</p>
                </div>
              ) : (
                <div className="p-4">
                  <p className="text-[10px] font-bold text-slate-400 dark:text-gray-600 uppercase tracking-[0.2em] mb-4 px-2">快速导航</p>
                  <div className="grid grid-cols-2 gap-2">
                    {searchItems.filter(i => i.type === 'module').map(module => (
                      <button
                        key={module.moduleId}
                        onClick={() => handleSelect(module)}
                        className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all text-left group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-gray-500 group-hover:text-cyan-400 transition-colors">
                          <BookOpen size={14} />
                        </div>
                        <span className="text-xs font-bold text-slate-600 dark:text-gray-400 group-hover:text-white transition-colors">{module.moduleTitle}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-3 bg-slate-50 dark:bg-white/[0.02] border-t border-slate-200 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-gray-600">
                  <span className="px-1 py-0.5 rounded bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 font-mono text-slate-600 dark:text-gray-400">↑↓</span> 选择
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-gray-600">
                  <span className="px-1 py-0.5 rounded bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 font-mono text-slate-600 dark:text-gray-400">Enter</span> 跳转
                </div>
              </div>
              <p className="text-[9px] font-mono-tech text-cyan-400/40 uppercase tracking-widest">ai-superman search v1.0</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
