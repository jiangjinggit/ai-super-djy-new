import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Clock3,
  Star,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate, useParams } from 'react-router-dom';

import { ModuleEnhancementBlockSection } from '@/components/module-page/ModuleEnhancementBlockSection';
import { ModuleReferencePanel } from '@/components/module-page/ModuleReferencePanel';
import { MODULE_COLOR_STYLES } from '@/constants/moduleStyles';
import { MODULE_ENHANCEMENTS } from '@/content/moduleEnhancements';
import { MODULE_CONTENT } from '@/content/modules';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { isModuleId } from '@/types/course';

const DIFFICULTY_LABELS = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '高级',
} as const;

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
  const prioritizedBlocks = enhancement?.blocks.filter((block) => block.type === 'action-checklist') ?? [];
  const remainingBlocks = enhancement?.blocks.filter((block) => block.type !== 'action-checklist') ?? [];

  useDocumentTitle(content?.title ?? '模块未找到');

  if (!content || !enhancement || !moduleId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-900 dark:text-white">
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
        className="flex items-center gap-2 text-slate-600 dark:text-gray-400 hover:text-white mb-12 transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 返回首页
      </button>

      <div className="flex flex-col md:flex-row items-start gap-12 mb-20">
        <div className={`w-24 h-24 rounded-3xl flex items-center justify-center shrink-0 ${accent.iconWrap}`}>
          <Icon size={48} />
        </div>
        <div>
          <span className={`text-sm font-bold uppercase tracking-widest mb-4 block ${accent.subtitle}`}>{content.subtitle}</span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-tight">{content.title}</h1>
          <p className="text-xl text-slate-600 dark:text-gray-400 leading-relaxed max-w-3xl">{content.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-5 py-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-gray-500 mb-2">学习难度</p>
          <p className="text-slate-900 dark:text-white font-semibold">{DIFFICULTY_LABELS[content.difficulty]}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-5 py-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-gray-500 mb-2">建议周期</p>
          <p className="text-slate-900 dark:text-white font-semibold inline-flex items-center gap-2">
            <Clock3 size={16} className="text-blue-600 dark:text-blue-300" /> {content.estimatedTime}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-5 py-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-gray-500 mb-2">适合人群</p>
          <p className="text-slate-900 dark:text-white font-semibold inline-flex items-center gap-2">
            <Users size={16} className="text-blue-600 dark:text-blue-300" /> {content.audience[0]}
          </p>
        </div>
      </div>

      {prioritizedBlocks.map((block) => (
        <ModuleEnhancementBlockSection key={`${block.type}-${block.title}`} block={block} />
      ))}

      {(enhancement.lastVerifiedOn || enhancement.sources.length > 0) && (
        <ModuleReferencePanel lastVerifiedOn={enhancement.lastVerifiedOn} sources={enhancement.sources} />
      )}

      <div className="mb-20">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300 mb-3">模块结构</p>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">这一模块主要解决 3 件事</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {content.sections.map((section, index) => {
          const SectionIcon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl"
            >
              <div className="w-12 h-12 bg-slate-200 dark:bg-white/10 rounded-xl flex items-center justify-center text-slate-900 dark:text-white mb-6">
                <SectionIcon size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{section.title}</h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed">{section.content}</p>
            </motion.div>
          );
        })}
        </div>
      </div>

      {content.keyTakeaways.length > 0 && (
        <div className="mb-20 p-12 bg-blue-600/5 border border-blue-500/20 rounded-[40px]">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <Star className="text-yellow-500" /> 学完后你应该拿到
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.keyTakeaways.map((takeaway, index) => (
              <div key={takeaway} className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-bold shrink-0 mt-1">
                  {index + 1}
                </div>
                <p className="text-slate-700 dark:text-gray-300 leading-relaxed">{takeaway}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {remainingBlocks.map((block) => (
        <ModuleEnhancementBlockSection key={`${block.type}-${block.title}`} block={block} />
      ))}

      <div className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[40px] p-12">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
          <BookOpen className="text-blue-500" /> 课程大纲
        </h3>
        <p className="text-sm text-slate-600 dark:text-gray-400 mb-8">不要先通读，按顺序做。每节课先看目标，再立即完成 1 个动作。</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.lessons.map((lesson, index) => (
            <button
              key={lesson.slug}
              type="button"
              onClick={() => navigate(`/module/${moduleId}/lesson/${lesson.slug}`)}
              className="text-left p-5 bg-slate-100 dark:bg-white/5 rounded-2xl hover:bg-white/10 transition-colors group border border-slate-200 dark:border-white/10"
            >
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-600/20 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center text-sm font-bold group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="text-base font-semibold text-slate-800 dark:text-gray-200 group-hover:text-white transition-colors leading-relaxed">
                      {lesson.title}
                    </h4>
                    <span className="text-xs text-slate-500 dark:text-gray-500 shrink-0 inline-flex items-center gap-1">
                      <Clock3 size={12} className="text-blue-600 dark:text-blue-300" /> {lesson.estimatedTime}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed mb-3">{lesson.content}</p>
                  <div className="space-y-1.5">
                    {lesson.details.slice(0, 2).map((detail) => (
                      <p key={detail} className="text-xs text-slate-500 dark:text-gray-500 leading-relaxed">
                        - {detail}
                      </p>
                    ))}
                  </div>
                </div>
                <ChevronRight size={16} className="ml-2 mt-1 text-gray-600 group-hover:text-white transition-colors shrink-0" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {content.cta && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-12 p-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-[32px] text-center">
          <p className="text-lg text-blue-700 dark:text-blue-200 mb-6">{splitCta(content.cta.text).prefix}</p>
          <button
            type="button"
            onClick={() => navigate(content.cta?.link ?? '/')}
            className="px-8 py-4 bg-blue-600 text-slate-900 dark:text-white font-bold rounded-2xl hover:bg-blue-500 transition-all shadow-xl flex items-center gap-2 mx-auto"
          >
            {splitCta(content.cta.text).suffix} <ArrowRight size={20} />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
