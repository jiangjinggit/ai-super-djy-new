import { X } from 'lucide-react';
import { motion } from 'motion/react';

import type { Lesson } from '@/types/course';

interface LessonModalProps {
  lesson: Lesson;
  onClose: () => void;
}

export const LessonModal = ({ lesson, onClose }: LessonModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-3xl bg-[#121212] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 bg-black/40 backdrop-blur-md hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors z-20"
          aria-label="关闭"
        >
          <X size={20} />
        </button>

        <div className="overflow-y-auto custom-scrollbar">
          <div className="h-80 overflow-hidden relative">
            <img src={lesson.image} alt={lesson.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/20 to-transparent" />
          </div>

          <div className="p-10 -mt-24 relative">
            <h2 className="text-4xl font-black text-white mb-6 leading-tight">{lesson.title}</h2>
            <p className="text-gray-300 text-xl leading-relaxed mb-12 font-medium">{lesson.content}</p>

            {lesson.details.length > 0 && (
              <div className="mb-12">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300 mb-4">要点速览</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {lesson.details.map((detail) => (
                    <div key={detail} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300">
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-12 mb-12">
              {lesson.fullContent.map((item) => (
                <div key={item.subtitle} className="group">
                  <h4 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-3">
                    <span className="w-8 h-px bg-blue-500/30 group-hover:w-12 transition-all" />
                    {item.subtitle}
                  </h4>
                  <p className="text-gray-400 text-lg leading-relaxed pl-11 border-l border-white/5">{item.text}</p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-5 bg-blue-600 text-white font-black text-lg rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20"
            >
              完成学习，返回大纲
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
