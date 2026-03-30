import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { MODULE_COLOR_STYLES } from '@/constants/moduleStyles';
import type { ModuleCardData } from '@/types/course';

interface ModuleCardProps extends ModuleCardData {
  index: number;
}

export const ModuleCard = ({ title, desc, icon: Icon, color, index, id }: ModuleCardProps) => {
  const navigate = useNavigate();
  const colorStyles = MODULE_COLOR_STYLES[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, backgroundColor: 'rgba(255,255,255,0.08)' }}
      whileTap={{ scale: 0.98 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      onClick={() => {
        toast.success(`已进入: ${title}`, { description: '正在加载学习资源...' });
        navigate(`/module/${id}`);
      }}
      className="card-scan card-hud group relative p-8 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-cyan-500/10 rounded-3xl transition-all cursor-pointer overflow-hidden hover:border-cyan-500/25"
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          navigate(`/module/${id}`);
        }
      }}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl transition-all ${colorStyles.glow}`} />

      <div className={`w-14 h-14 mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform ${colorStyles.iconWrap}`}>
        <Icon size={28} />
      </div>

      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{title}</h3>
      <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-6">{desc}</p>

      <div className="flex items-center text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-400 transition-colors">
        进入模块 <ChevronRight size={16} className="ml-2 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
};
