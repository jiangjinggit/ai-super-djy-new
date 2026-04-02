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

const OPENCLAW_LESSON_GROUPS = [
  {
    stage: 'Stage 01',
    title: '先判断，再把基础盘起来',
    description: '这一段只做两件事：判断值不值得搭，以及把第一条结果跑出来。',
    lessonSlugs: ['openclaw-intro', 'openclaw-china-quickstart', 'openclaw-setup', 'openclaw-architecture'],
  },
  {
    stage: 'Stage 02',
    title: '把规则、记忆和能力配稳',
    description: '装上只是开始，真正稳定取决于边界、记忆结构和技能组合。',
    lessonSlugs: ['openclaw-rules', 'openclaw-memory', 'openclaw-skills', 'openclaw-proactive'],
  },
  {
    stage: 'Stage 03',
    title: '先落一个案例，再做治理',
    description: '选一个真实场景跑两周，最后再补安全边界和长期调优。',
    lessonSlugs: [
      'openclaw-feishu-daily-report',
      'openclaw-security',
      'openclaw-grow',
      'openclaw-resources',
    ],
  },
] as const;

const splitCta = (text: string) => {
  const [prefix, suffix] = text.split(' → ');
  return {
    prefix,
    suffix: suffix ?? '继续学习',
  };
};

const renderLessonCard = (
  lesson: (typeof MODULE_CONTENT)[keyof typeof MODULE_CONTENT]['lessons'][number],
  index: number,
  onOpen: () => void,
) => (
  <button
    key={lesson.slug}
    type="button"
    onClick={onOpen}
    className="card-scan relative text-left p-5 bg-white/50 dark:bg-white/5 rounded-2xl hover:border-cyan-500/30 transition-all group border border-slate-200 dark:border-cyan-500/10 overflow-hidden"
  >
    <div className="flex items-start gap-4">
      <div
        className="font-mono-tech w-8 h-8 bg-cyan-500/10 text-cyan-400 rounded-lg flex items-center justify-center text-xs font-bold group-hover:bg-cyan-500/20 transition-all shrink-0"
        style={{ textShadow: '0 0 8px rgba(34,211,238,0.5)' }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h4 className="text-base font-semibold text-slate-800 dark:text-gray-200 group-hover:text-white transition-colors leading-relaxed">
            {lesson.title}
          </h4>
          <span className="font-mono-tech text-[10px] text-slate-500 dark:text-gray-500 shrink-0 inline-flex items-center gap-1 tracking-wider">
            <Clock3 size={10} /> {lesson.estimatedTime}
          </span>
        </div>
        <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed mb-2">{lesson.content}</p>
        <div className="space-y-1">
          {lesson.details.slice(0, 2).map((detail) => (
            <p key={detail} className="text-xs text-slate-500 dark:text-gray-500 leading-relaxed">
              — {detail}
            </p>
          ))}
        </div>
      </div>
      <ChevronRight size={15} className="mt-1 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all shrink-0" />
    </div>
  </button>
);

export default function ModulePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const moduleId = id && isModuleId(id) ? id : null;

  const content = moduleId ? MODULE_CONTENT[moduleId] : null;
  const enhancement = moduleId ? MODULE_ENHANCEMENTS[moduleId] : null;
  const prioritizedBlocks =
    enhancement?.blocks.filter((block) => block.type === 'action-checklist' || block.type === 'tool-comparison') ?? [];
  const remainingBlocks =
    enhancement?.blocks.filter((block) => block.type !== 'action-checklist' && block.type !== 'tool-comparison') ?? [];
  const isOpenClaw = moduleId === 'openclaw';

  // OpenClaw 专用：按 type 拆分 blocks，分别插入合适位置
  const openclawWeeklyPlan = enhancement?.blocks.filter((b) => b.type === 'weekly-plan') ?? [];
  const openclawPostLessonBlocks = enhancement?.blocks.filter((b) => b.type !== 'weekly-plan') ?? [];

  useDocumentTitle(content?.title ?? '模块未找到');

  if (!content || !enhancement || !moduleId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-900 dark:text-white">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">模块未找到</h2>
          <button type="button" onClick={() => navigate('/')} className="text-cyan-400 hover:underline">
            返回首页
          </button>
        </div>
      </div>
    );
  }

  const accent = MODULE_COLOR_STYLES[content.color];
  const Icon = content.icon;
  const lessonLookup = new Map(content.lessons.map((lesson) => [lesson.slug, lesson] as const));
  const openclawLessonGroups = OPENCLAW_LESSON_GROUPS.map((group) => ({
    ...group,
    lessons: group.lessonSlugs
      .map((slug) => lessonLookup.get(slug))
      .filter((lesson): lesson is typeof content.lessons[number] => Boolean(lesson)),
  })).filter((group) => group.lessons.length > 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="pt-32 pb-24 px-6 max-w-5xl mx-auto"
    >
      <button
        type="button"
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-slate-500 dark:text-gray-500 hover:text-cyan-400 mb-12 transition-colors group font-mono-tech text-sm tracking-wide"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 返回首页
      </button>

      {/* 模块 Hero */}
      <div className="flex flex-col md:flex-row items-start gap-10 mb-16">
        <div
          className={`w-24 h-24 rounded-3xl flex items-center justify-center shrink-0 ${accent.iconWrap}`}
          style={{ boxShadow: '0 0 32px rgba(34,211,238,0.15)' }}
        >
          <Icon size={48} />
        </div>
        <div>
          <span className={`font-mono-tech text-xs font-bold uppercase tracking-[0.25em] mb-4 block ${accent.subtitle}`}>
            {content.subtitle}
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            {content.title}
          </h1>
          <p className="text-xl text-slate-600 dark:text-gray-400 leading-relaxed max-w-3xl">{content.description}</p>
        </div>
      </div>

      {/* Meta 信息卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {[
          { label: '学习难度', value: DIFFICULTY_LABELS[content.difficulty], icon: null },
          { label: '建议周期', value: content.estimatedTime, icon: <Clock3 size={15} className="text-cyan-500" /> },
          { label: '适合人群', value: content.audience[0], icon: <Users size={15} className="text-cyan-500" /> },
        ].map((meta) => (
          <div key={meta.label} className="card-scan card-hud relative rounded-2xl border border-slate-200 dark:border-cyan-500/10 bg-slate-100 dark:bg-white/5 px-5 py-4 hover:border-cyan-500/25 transition-colors">
            <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-gray-500 mb-2">{meta.label}</p>
            <p className="text-slate-900 dark:text-white font-semibold inline-flex items-center gap-2">
              {meta.icon}{meta.value}
            </p>
          </div>
        ))}
      </div>

      {!isOpenClaw &&
        prioritizedBlocks.map((block) => (
          <ModuleEnhancementBlockSection key={`${block.type}-${block.title}`} block={block} />
        ))}

      {!isOpenClaw &&
        remainingBlocks.map((block) => (
          <ModuleEnhancementBlockSection key={`${block.type}-${block.title}`} block={block} />
        ))}

      {(enhancement.lastVerifiedOn || enhancement.sources.length > 0) && (
        <ModuleReferencePanel lastVerifiedOn={enhancement.lastVerifiedOn} sources={enhancement.sources} />
      )}

      {/* 模块结构 */}
      <div className="mb-20">
        <div className="mb-8">
          <p className={`font-mono-tech text-xs font-bold uppercase tracking-[0.25em] mb-3 ${accent.subtitle}`}>模块结构</p>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            {isOpenClaw ? '从跑通到长期稳定使用的实战路径' : '这一模块主要解决 3 件事'}
          </h2>
          {isOpenClaw && (
            <p className="mt-3 text-sm text-slate-600 dark:text-gray-400 max-w-3xl leading-7">
              默认顺序很简单：先跑通最小闭环，再把规则、技能和主动策略配稳，最后用真实案例和治理动作把它长期用起来。
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.sections.map((section, index) => {
            const SectionIcon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card-scan card-hud relative p-8 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-cyan-500/10 rounded-3xl hover:border-cyan-500/25 transition-all overflow-hidden"
              >
                <div className="w-12 h-12 bg-slate-200 dark:bg-white/8 rounded-xl flex items-center justify-center text-slate-900 dark:text-white mb-6">
                  <SectionIcon size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{section.title}</h3>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed">{section.content}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 学完后你应该拿到 - OpenClaw 不展示，sections 已覆盖 */}
      {!isOpenClaw && content.keyTakeaways.length > 0 && (
        <div className="mb-20 p-10 bg-cyan-500/5 border border-cyan-500/20 rounded-3xl">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <Star className="text-yellow-400" size={22} /> 学完后你应该拿到
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {content.keyTakeaways.map((takeaway, index) => (
              <div key={takeaway} className="flex items-start gap-4">
                <div className="font-mono-tech w-6 h-6 rounded-full bg-cyan-500/15 flex items-center justify-center text-cyan-400 text-xs font-bold shrink-0 mt-0.5"
                  style={{ textShadow: '0 0 8px rgba(34,211,238,0.6)' }}>
                  {index + 1}
                </div>
                <p className="text-slate-700 dark:text-gray-300 leading-relaxed">{takeaway}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* OpenClaw：6 周路线放在课程大纲前，帮用户建立节奏感 */}
      {isOpenClaw &&
        openclawWeeklyPlan.map((block) => (
          <ModuleEnhancementBlockSection key={`${block.type}-${block.title}`} block={block} />
        ))}

      {/* 课程大纲 */}
      <div className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-cyan-500/10 rounded-3xl p-10">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-3">
          <BookOpen className="text-cyan-400" size={22} /> 课程大纲
        </h3>
        <p className="font-mono-tech text-xs text-slate-500 dark:text-gray-500 mb-8 tracking-wide">
          不要先通读，按顺序做。每节课先看目标，再立即完成 1 个动作。
        </p>
        {isOpenClaw ? (
          <div className="space-y-6">
            {openclawLessonGroups.map((group) => (
              <div key={group.title} className="rounded-[28px] border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-black/20 p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-5">
                  <div>
                    <p className={`font-mono-tech text-[10px] uppercase tracking-[0.24em] mb-2 ${accent.subtitle}`}>{group.stage}</p>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{group.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-gray-400 leading-7 max-w-2xl">{group.description}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 dark:border-cyan-500/10 bg-slate-100 dark:bg-white/5 px-4 py-3 shrink-0">
                    <p className="font-mono-tech text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-gray-500 mb-1">阶段规模</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{group.lessons.length} 节课</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {group.lessons.map((lesson) =>
                    renderLessonCard(lesson, content.lessons.findIndex((item) => item.slug === lesson.slug), () =>
                      navigate(`/module/${moduleId}/lesson/${lesson.slug}`),
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {content.lessons.map((lesson, index) =>
              renderLessonCard(lesson, index, () => navigate(`/module/${moduleId}/lesson/${lesson.slug}`)),
            )}
          </div>
        )}
      </div>

      {/* OpenClaw：治理清单 + 资源导航放在课程大纲后 */}
      {isOpenClaw &&
        openclawPostLessonBlocks.map((block) => (
          <ModuleEnhancementBlockSection key={`${block.type}-${block.title}`} block={block} />
        ))}

      {/* CTA */}
      {content.cta && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 p-8 bg-gradient-to-r from-cyan-500/10 to-sky-500/10 border border-cyan-500/25 rounded-3xl text-center"
        >
          <p className="text-lg text-cyan-700 dark:text-cyan-300 mb-6">{splitCta(content.cta.text).prefix}</p>
          <button
            type="button"
            onClick={() => navigate(content.cta?.link ?? '/')}
            className="px-8 py-4 bg-cyan-500 text-slate-950 font-bold rounded-2xl hover:bg-cyan-400 transition-all shadow-[0_0_24px_rgba(34,211,238,0.3)] flex items-center gap-2 mx-auto"
          >
            {splitCta(content.cta.text).suffix} <ArrowRight size={18} />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
