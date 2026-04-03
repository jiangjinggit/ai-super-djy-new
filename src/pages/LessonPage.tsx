import { ArrowLeft, ArrowRight, Clock3, Layers3, Target } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { LessonMarkdown } from '@/components/lesson-page/LessonMarkdown';
import { LessonVisualGuide } from '@/components/lesson-page/LessonVisualGuide';
import { ContentMetaNote } from '@/components/module-page/ContentMetaNote';
import { MODULE_COLOR_STYLES } from '@/constants/moduleStyles';
import { MODULE_CONTENT } from '@/content/modules';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { isModuleId } from '@/types/course';

const DIFFICULTY_LABELS = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '高级',
} as const;


export default function LessonPage() {
  const { id, lessonSlug } = useParams();
  const navigate = useNavigate();
  const moduleId = id && isModuleId(id) ? id : null;
  const moduleContent = moduleId ? MODULE_CONTENT[moduleId] : null;
  const lessonIndex = moduleContent?.lessons.findIndex((lesson) => lesson.slug === lessonSlug) ?? -1;
  const lesson = lessonIndex >= 0 && moduleContent ? moduleContent.lessons[lessonIndex] : null;

  useDocumentTitle(lesson?.title ?? '课程未找到');

  if (!moduleContent || !lesson || !moduleId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-900 dark:text-white px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">课程未找到</h2>
          <button type="button" onClick={() => navigate('/')} className="text-cyan-400 hover:underline">
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const accent = MODULE_COLOR_STYLES[moduleContent.color];
  const prevLesson = lessonIndex > 0 ? moduleContent.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < moduleContent.lessons.length - 1 ? moduleContent.lessons[lessonIndex + 1] : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="pt-32 pb-24 px-6 max-w-4xl mx-auto"
    >
      <button
        type="button"
        onClick={() => navigate(`/module/${moduleId}`)}
        className="flex items-center gap-2 text-slate-500 dark:text-gray-500 hover:text-cyan-400 mb-10 transition-colors group font-mono-tech text-sm tracking-wide"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 返回模块
      </button>

      {/* 标题区 */}
      <div className="mb-8">
        <p className={`font-mono-tech text-xs font-bold uppercase tracking-[0.25em] mb-3 ${accent.subtitle}`}>
          {moduleContent.title}
        </p>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-5" style={{ fontFamily: "'Syne', sans-serif" }}>
          {lesson.title}
        </h1>
      </div>

      {/* Meta 信息卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card-scan card-hud relative rounded-2xl border border-slate-200 dark:border-cyan-500/10 bg-slate-100 dark:bg-white/5 px-5 py-4 hover:border-cyan-500/20 transition-colors">
          <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-gray-500 mb-2">难度</p>
          <p className="text-slate-900 dark:text-white font-semibold">{DIFFICULTY_LABELS[lesson.difficulty]}</p>
        </div>
        <div className="card-scan card-hud relative rounded-2xl border border-slate-200 dark:border-cyan-500/10 bg-slate-100 dark:bg-white/5 px-5 py-4 hover:border-cyan-500/20 transition-colors">
          <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-gray-500 mb-2">预计时长</p>
          <p className="text-slate-900 dark:text-white font-semibold inline-flex items-center gap-2">
            <Clock3 size={15} className="text-cyan-500" /> {lesson.estimatedTime}
          </p>
        </div>
        <div className="card-scan card-hud relative rounded-2xl border border-slate-200 dark:border-cyan-500/10 bg-slate-100 dark:bg-white/5 px-5 py-4 hover:border-cyan-500/20 transition-colors">
          <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-gray-500 mb-2">课程进度</p>
          <p className="text-slate-900 dark:text-white font-semibold inline-flex items-center gap-2">
            <Layers3 size={15} className="text-cyan-500" />
            <span className="font-mono-tech">
              {String(lessonIndex + 1).padStart(2, '0')} / {String(moduleContent.lessons.length).padStart(2, '0')}
            </span>
          </p>
        </div>
      </div>

      {/* 本课目标 */}
      <div className="mb-10 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 px-6 py-5"
        style={{ boxShadow: '0 0 20px rgba(34,211,238,0.06)' }}>
        <p className="font-mono-tech text-[10px] uppercase tracking-[0.25em] text-cyan-500/70 mb-3">本课目标</p>
        <p className="text-lg text-slate-800 dark:text-gray-200 leading-relaxed inline-flex items-start gap-3">
          <Target size={18} className="text-cyan-400 shrink-0 mt-1" />
          <span>{lesson.content}</span>
        </p>
      </div>



      <LessonVisualGuide moduleId={moduleId} lessonSlug={lesson.slug} />

      <LessonMarkdown body={lesson.body} />

      <ContentMetaNote updatedAt={lesson.updatedAt} sources={lesson.sources} />

      {/* 上一课 / 下一课 导航 */}
      <div className="mt-12 rounded-3xl border border-slate-200 dark:border-cyan-500/10 bg-slate-100 dark:bg-white/5 p-6 md:p-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-gray-500 mb-6 font-mono-tech tracking-wider">
          <Layers3 size={14} className="text-cyan-500" />
          第 <span className="text-cyan-400">{String(lessonIndex + 1).padStart(2, '0')}</span> / {String(moduleContent.lessons.length).padStart(2, '0')} 课
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prevLesson ? (
            <Link
              to={`/module/${moduleId}/lesson/${prevLesson.slug}`}
              className="group rounded-2xl border border-slate-200 dark:border-cyan-500/10 bg-slate-200 dark:bg-black/20 px-5 py-4 hover:border-cyan-500/30 hover:bg-white/5 transition-all"
            >
              <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-gray-500 mb-2">上一课</p>
              <p className="text-slate-900 dark:text-white font-semibold inline-flex items-center gap-2 group-hover:text-cyan-400 transition-colors">
                <ArrowLeft size={15} /> {prevLesson.title}
              </p>
            </Link>
          ) : (
            <div className="rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-black/10 px-5 py-4 text-slate-400 dark:text-gray-600 font-mono-tech text-xs tracking-wider">
              已是第一课
            </div>
          )}

          {nextLesson ? (
            <Link
              to={`/module/${moduleId}/lesson/${nextLesson.slug}`}
              className="group rounded-2xl border border-slate-200 dark:border-cyan-500/10 bg-slate-200 dark:bg-black/20 px-5 py-4 hover:border-cyan-500/30 hover:bg-white/5 transition-all text-left"
            >
              <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-gray-500 mb-2">下一课</p>
              <p className="text-slate-900 dark:text-white font-semibold inline-flex items-center gap-2 group-hover:text-cyan-400 transition-colors">
                {nextLesson.title} <ArrowRight size={15} />
              </p>
            </Link>
          ) : (
            <div className="rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-black/10 px-5 py-4 text-slate-400 dark:text-gray-600 font-mono-tech text-xs tracking-wider">
              已是最后一课
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
