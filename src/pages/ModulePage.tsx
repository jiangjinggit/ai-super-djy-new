import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Star,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { LessonModal } from '@/components/module-page/LessonModal';
import { ModuleEnhancementBlockSection } from '@/components/module-page/ModuleEnhancementBlockSection';
import { ModuleReferencePanel } from '@/components/module-page/ModuleReferencePanel';
import { MODULE_COLOR_STYLES } from '@/constants/moduleStyles';
import { MODULE_ENHANCEMENTS } from '@/content/moduleEnhancements';
import { MODULE_CONTENT } from '@/content/modules';
import type { Lesson } from '@/types/course';
import { isModuleId } from '@/types/course';

const splitCta = (text: string) => {
  const [prefix, suffix] = text.split(' → ');
  return {
    prefix,
    suffix: suffix ?? '继续学习',
  };
};

export default function ModulePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const moduleId = id && isModuleId(id) ? id : null;

  const content = moduleId ? MODULE_CONTENT[moduleId] : null;
  const enhancement = moduleId ? MODULE_ENHANCEMENTS[moduleId] : null;

  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  if (!content || !enhancement || !moduleId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">模块未找到</h2>
          <button type="button" onClick={() => navigate('/')} className="text-blue-500 hover:underline">
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const accent = MODULE_COLOR_STYLES[content.color];
  const Icon = content.icon;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
      <button
        type="button"
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-12 transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 返回首页
      </button>

      <div className="flex flex-col md:flex-row items-start gap-12 mb-20">
        <div className={`w-24 h-24 rounded-3xl flex items-center justify-center shrink-0 ${accent.iconWrap}`}>
          <Icon size={48} />
        </div>
        <div>
          <span className={`text-sm font-bold uppercase tracking-widest mb-4 block ${accent.subtitle}`}>{content.subtitle}</span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">{content.title}</h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">{content.description}</p>
        </div>
      </div>

      <ModuleReferencePanel lastVerifiedOn={enhancement.lastVerifiedOn} sources={enhancement.sources} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {content.sections.map((section, index) => {
          const SectionIcon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-white/5 border border-white/10 rounded-3xl"
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white mb-6">
                <SectionIcon size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{section.title}</h3>
              <p className="text-gray-400 leading-relaxed">{section.content}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="mb-20 p-12 bg-blue-600/5 border border-blue-500/20 rounded-[40px]">
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <Star className="text-yellow-500" /> 核心收获
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.keyTakeaways.map((takeaway, index) => (
            <div key={takeaway} className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold shrink-0 mt-1">
                {index + 1}
              </div>
              <p className="text-gray-300 leading-relaxed">{takeaway}</p>
            </div>
          ))}
        </div>
      </div>

      {enhancement.blocks.map((block) => (
        <ModuleEnhancementBlockSection key={`${block.type}-${block.title}`} block={block} />
      ))}

      <div className="bg-white/5 border border-white/10 rounded-[40px] p-12">
        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <BookOpen className="text-blue-500" /> 课程大纲
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.lessons.map((lesson, index) => (
            <button
              key={lesson.title}
              type="button"
              onClick={() => setSelectedLesson(lesson)}
              className="text-left flex items-center gap-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors group"
            >
              <div className="w-8 h-8 bg-blue-600/20 text-blue-400 rounded-lg flex items-center justify-center text-sm font-bold group-hover:bg-blue-600 group-hover:text-white transition-all">
                {index + 1}
              </div>
              <span className="text-gray-300 group-hover:text-white transition-colors">{lesson.title}</span>
              <ChevronRight size={16} className="ml-auto text-gray-600 group-hover:text-white transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {content.cta && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-12 p-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-[32px] text-center">
          <p className="text-lg text-blue-200 mb-6">{splitCta(content.cta.text).prefix}</p>
          <button
            type="button"
            onClick={() => navigate(content.cta?.link ?? '/')}
            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-all shadow-xl flex items-center gap-2 mx-auto"
          >
            {splitCta(content.cta.text).suffix} <ArrowRight size={20} />
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {selectedLesson && <LessonModal lesson={selectedLesson} onClose={() => setSelectedLesson(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}
