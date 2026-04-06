import { CheckCircle2, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MODULE_COLOR_STYLES } from '@/constants/moduleStyles';
import { MODULE_CONTENT } from '@/content/modules';
import type { ModuleCardData } from '@/types/course';

interface ModuleCardProps extends ModuleCardData {
  index: number;
}

export const ModuleCard = ({ title, desc, icon: Icon, color, index, id }: ModuleCardProps) => {
  const navigate = useNavigate();
  const colorStyles = MODULE_COLOR_STYLES[color];
  const [progress, setProgress] = useState({ completed: 0, total: 0 });

  useEffect(() => {
    const loadProgress = () => {
      const moduleLessons = MODULE_CONTENT[id]?.lessons || [];
      const completedSlugs = JSON.parse(localStorage.getItem('completed-lessons') || '[]');
      const completedCount = moduleLessons.filter(lesson => completedSlugs.includes(lesson.slug)).length;
      setProgress({ completed: completedCount, total: moduleLessons.length });
    };

    loadProgress();
    window.addEventListener('storage', loadProgress);
    return () => window.removeEventListener('storage', loadProgress);
  }, [id]);

  const progressPercent = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0;
  const isAllDone = progress.total > 0 && progress.completed === progress.total;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.98 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      onClick={() => navigate(`/module/${id}`)}
      className={`card-scan card-hud group relative p-6 md:p-8 hover:bg-slate-200/80 dark:hover:bg-white/[0.08] border rounded-3xl transition-all cursor-pointer overflow-hidden ${
        isAllDone 
          ? 'bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40' 
          : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-cyan-500/10 hover:border-cyan-500/25'
      }`}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          navigate(`/module/${id}`);
        }
      }}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl transition-all ${isAllDone ? 'bg-emerald-500/10' : colorStyles.glow}`} />

      <div className="flex items-start justify-between mb-6">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform ${isAllDone ? 'bg-emerald-500/20 text-emerald-500' : colorStyles.iconWrap}`}>
          <Icon size={28} />
        </div>
        {progress.total > 0 && (
          <div className="text-right">
            <div className={`font-mono-tech text-xs font-bold mb-1 ${isAllDone ? 'text-emerald-500' : 'text-slate-500 dark:text-cyan-400/70'}`}>
              {progressPercent}%
            </div>
            <div className="text-[10px] font-mono-tech text-slate-400 dark:text-gray-500">
              {progress.completed}/{progress.total} DONE
            </div>
          </div>
        )}
      </div>

      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        {title}
        {isAllDone && <CheckCircle2 size={18} className="text-emerald-500" />}
      </h3>
      <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-8">{desc}</p>

      <div className="mt-auto">
        {progress.total > 0 && (
          <div className="mb-6 h-1 w-full bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full rounded-full ${isAllDone ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]'}`}
            />
          </div>
        )}
        <div className={`flex items-center text-sm font-bold transition-colors ${isAllDone ? 'text-emerald-500 hover:text-emerald-400' : 'text-slate-900 dark:text-white group-hover:text-cyan-400'}`}>
          {isAllDone ? '查看模块详情' : '进入模块'} <ChevronRight size={16} className="ml-2 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};
