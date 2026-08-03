import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Star,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ModuleEnhancementBlockSection } from '@/components/module-page/ModuleEnhancementBlockSection';
import { ModuleReferencePanel } from '@/components/module-page/ModuleReferencePanel';
import { MODULE_COLOR_STYLES } from '@/constants/moduleStyles';
import { AI_GROUP_BUNDLE } from '@/content/aiGroupBundle';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { isModuleId, type Lesson, type ModuleContent, type ModuleEnhancement, type ModuleId } from '@/types/course';

type ModuleBundle = {
  content: ModuleContent;
  enhancement: ModuleEnhancement;
};

type LoadedModuleBundle = ModuleBundle & {
  moduleId: ModuleId;
};

const loadModuleBundle = async (moduleId: ModuleId): Promise<ModuleBundle> => {
  const [{ MODULE_CONTENT }, { MODULE_ENHANCEMENTS }] = await Promise.all([
    import('@/content/modules'),
    import('@/content/moduleEnhancements'),
  ]);

  return {
    content: MODULE_CONTENT[moduleId],
    enhancement: MODULE_ENHANCEMENTS[moduleId],
  };
};

const getModuleId = (id: string | undefined) => (id && isModuleId(id) ? id : null);

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

const CLAUDE_AGENT_LESSON_GROUPS = [
  {
    stage: 'Stage 01',
    title: '认知建立：为什么这个工具值得学',
    description: '先建立正确认知——Claude Code 不是聊天框，而是能读文件、跑命令、调工具的执行代理。',
    lessonSlugs: ['lesson-01-what-is-claude-code'],
  },
  {
    stage: 'Stage 02',
    title: '快速上手：第一天就能用起来',
    description: '安装环境、选对入口、跑通第一个真实任务，建立最小可用的工作习惯。',
    lessonSlugs: ['lesson-02-install-and-setup', 'lesson-03-platform-map'],
  },
  {
    stage: 'Stage 03',
    title: '核心工作流：从"能跑"到"好用"',
    description: '5 步执行法、结构化 Prompt、CLAUDE.md 配置——把一次通过率和产出质量拉上来。',
    lessonSlugs: ['lesson-04-five-step-workflow', 'lesson-05-prompt-engineering', 'lesson-06-claude-md-and-memory'],
  },
  {
    stage: 'Stage 04',
    title: '进阶能力：效率再翻倍',
    description: 'Skills 封装高频动作、MCP 接通外部工具、上下文管理防止长任务失忆。',
    lessonSlugs: ['lesson-07-skills-and-commands', 'lesson-08-mcp-toolchain', 'lesson-09-context-management'],
  },
  {
    stage: 'Stage 05',
    title: 'Agent 架构：专家级用法',
    description: 'Subagents 拆分复杂任务、安全边界四层叠加、Hooks + Schedule 做自动化。',
    lessonSlugs: ['lesson-10-subagents-and-teams', 'lesson-11-security-boundaries', 'lesson-12-hooks-schedule-auto'],
  },
  {
    stage: 'Stage 06',
    title: '真实场景实战：把所有能力串起来',
    description: '产品经理、开发者、知识工作者三个真实场景，跑通从输入到交付的完整链路。',
    lessonSlugs: ['lesson-13-case-product-manager', 'lesson-14-case-developer', 'lesson-15-case-researcher'],
  },
] as const;

const CODEX_AGENT_LESSON_GROUPS = [
  {
    stage: 'Stage 01',
    title: '认知与入口：先选对使用表面',
    description: '先理解 Codex 不是聊天框，再分清 App、IDE、CLI、Cloud 的任务边界。',
    lessonSlugs: ['lesson-01-what-is-codex', 'lesson-02-entry-map'],
  },
  {
    stage: 'Stage 02',
    title: '本地上手：读懂仓库再小步修改',
    description: '用 CLI 完成只读分析和第一处小改动，再用 AGENTS.md 和权限矩阵稳住项目规则。',
    lessonSlugs: ['lesson-03-cli-quickstart', 'lesson-04-agents-md', 'lesson-05-sandbox-approvals'],
  },
  {
    stage: 'Stage 03',
    title: '核心工作流：把任务变成契约',
    description: '用 5 步执行法和任务契约约束 Codex 的自由度，让每次改动可审查、可验证、可回退。',
    lessonSlugs: ['lesson-06-five-step-workflow', 'lesson-07-task-contract'],
  },
  {
    stage: 'Stage 04',
    title: '云端与协作：从本地执行到团队 PR',
    description: '把低耦合任务交给 Cloud，并通过 IDE、PR 和 MCP 接入真实研发协作。',
    lessonSlugs: ['lesson-08-cloud-tasks', 'lesson-09-ide-pr-workflow', 'lesson-10-mcp-integrations'],
  },
  {
    stage: 'Stage 05',
    title: '配置与治理：让默认行为可控',
    description: '用 profile、分支、回退和团队政策把安全边界制度化，而不是靠临时提醒。',
    lessonSlugs: ['lesson-11-config-profiles', 'lesson-12-context-branching', 'lesson-13-security-governance'],
  },
  {
    stage: 'Stage 06',
    title: '真实场景实战：把流程迁移到团队',
    description: '用 Bug 修复和小功能协作两个案例，把 Codex 与 Claude Code、IDE 工具放进同一套验收体系。',
    lessonSlugs: ['lesson-14-case-bugfix', 'lesson-15-case-team-feature'],
  },
] as const;

const AI_PROGRAMMING_LESSON_GROUPS = [
  {
    stage: 'Stage 01',
    title: '工具范式：先搭坐标系',
    description: '从 Autocomplete 到 Agentic Coding，先理解 AI 编程的演进线和四种主流入口，后面每个工具才能准确落位。',
    lessonSlugs: ['ai-coding-landscape'],
  },
  {
    stage: 'Stage 02',
    title: '国际前沿工具：三条主线',
    description: 'Claude Code 与 Codex 的安全模型、配置体系与生态差异，Cursor、Gemini、Kiro 的 IDE/Google 多入口/Spec-driven 路线。理解产品设计逻辑，而不只是背品牌。',
    lessonSlugs: ['claude-code-vs-codex', 'cursor-gemini-kiro'],
  },
  {
    stage: 'Stage 03',
    title: '国内落地工具：中国用户的真实约束',
    description: '通义灵码、TRAE、CodeBuddy 三条国内路线，从中文体验、采购合规和云生态协同出发做选择。',
    lessonSlugs: ['china-coding-tools'],
  },
  {
    stage: 'Stage 04',
    title: '模型选型：按角色分工，不背版本号',
    description: '高质量主力、低成本跑量、中文优先、企业内控——给不同任务指定默认模型和回退模型。',
    lessonSlugs: ['coding-model-selection'],
  },
  {
    stage: 'Stage 05',
    title: '工作流与治理：从单兵到团队',
    description: '把 AI 接进需求、实现、验证、评审的完整链路，再用权限、隐私、成本和回退规则兜底。',
    lessonSlugs: ['ai-coding-workflows', 'ai-coding-governance'],
  },
  {
    stage: 'Stage 06',
    title: '30 天落地：选出你的默认方案',
    description: '海外优先、国内优先、混合栈三条路线，按个人、团队、企业身份收口成可执行计划。',
    lessonSlugs: ['china-rollout-playbook'],
  },
] as const;

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
  const moduleId = getModuleId(id);

  const [completedSlugs, setCompletedSlugs] = useState<string[]>([]);
  const [bundle, setBundle] = useState<LoadedModuleBundle | null>(() =>
    moduleId === 'ai-group' ? { moduleId, ...AI_GROUP_BUNDLE } : null,
  );
  const [isLoading, setIsLoading] = useState(Boolean(moduleId && moduleId !== 'ai-group'));

  useEffect(() => {
    if (!moduleId) {
      setBundle(null);
      setIsLoading(false);
      return;
    }

    if (moduleId === 'ai-group') {
      setBundle({ moduleId, ...AI_GROUP_BUNDLE });
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setBundle(null);
    setIsLoading(true);

    loadModuleBundle(moduleId)
      .then((nextBundle) => {
        if (!cancelled) setBundle({ moduleId, ...nextBundle });
      })
      .catch((error) => {
        console.error(`Failed to load module: ${moduleId}`, error);
        if (!cancelled) setBundle(null);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [moduleId]);

  useEffect(() => {
    const loadProgress = () => {
      const completed = JSON.parse(localStorage.getItem('completed-lessons') || '[]');
      setCompletedSlugs(completed);
    };

    loadProgress();
    window.addEventListener('storage', loadProgress);
    return () => window.removeEventListener('storage', loadProgress);
  }, []);

  const renderLessonCard = (lesson: Lesson, index: number, onOpen: () => void) => {
    const isCompleted = completedSlugs.includes(lesson.slug);
    
    return (
      <button
        key={lesson.slug}
        type="button"
        onClick={onOpen}
        className={`card-scan relative text-left p-5 rounded-2xl transition-all group border overflow-hidden ${
          isCompleted 
            ? 'bg-emerald-500/[0.03] dark:bg-emerald-500/[0.05] border-emerald-500/20 hover:border-emerald-500/40' 
            : 'bg-white/50 dark:bg-white/5 border-slate-200 dark:border-cyan-500/10 hover:border-cyan-500/30'
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`font-mono-tech w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
              isCompleted 
                ? 'bg-emerald-500/20 text-emerald-500' 
                : 'bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20'
            }`}
            style={{ textShadow: isCompleted ? 'none' : '0 0 8px rgba(34,211,238,0.5)' }}
          >
            {isCompleted ? <CheckCircle2 size={16} /> : String(index + 1).padStart(2, '0')}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h4 className={`text-base font-semibold transition-colors leading-relaxed ${
                isCompleted ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-800 dark:text-gray-200 group-hover:text-white'
              }`}>
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
          <ChevronRight size={15} className={`mt-1 transition-all shrink-0 ${
            isCompleted ? 'text-emerald-500' : 'text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5'
          }`} />
        </div>
      </button>
    );
  };

  const activeBundle = bundle?.moduleId === moduleId ? bundle : null;
  const content = activeBundle?.content ?? null;
  const enhancement = activeBundle?.enhancement ?? null;
  const prioritizedBlocks =
    enhancement?.blocks.filter((block) => block.type === 'action-checklist' || block.type === 'tool-comparison') ?? [];
  const remainingBlocks =
    enhancement?.blocks.filter((block) => block.type !== 'action-checklist' && block.type !== 'tool-comparison') ?? [];
  const isSuperIndividual = moduleId === 'super-individual';
  const isOpenClaw = moduleId === 'openclaw';
  const isAgentIntro = moduleId === 'agent-intro';
  const isAiGroup = moduleId === 'ai-group';
  const isClaudeAgent = moduleId === 'claude-agent';
  const isCodexAgent = moduleId === 'codex-agent';
  const isAiProgramming = moduleId === 'ai-programming';
  const isCases = moduleId === 'cases';

  // OpenClaw 专用：按 type 拆分 blocks，分别插入合适位置
  const openclawWeeklyPlan = enhancement?.blocks.filter((b) => b.type === 'weekly-plan') ?? [];
  const openclawPostLessonBlocks = enhancement?.blocks.filter((b) => b.type !== 'weekly-plan') ?? [];

  // Claude Agent 专用：tool-comparison + weekly-plan 放课程前，其余放课程后
  const claudeAgentPreLessonBlocks = enhancement?.blocks.filter((b) => b.type === 'tool-comparison' || b.type === 'weekly-plan') ?? [];
  const claudeAgentPostLessonBlocks = enhancement?.blocks.filter((b) => b.type !== 'tool-comparison' && b.type !== 'weekly-plan') ?? [];

  // Codex Agent 专用：tool-comparison + weekly-plan 放课程前，其余放课程后
  const codexAgentPreLessonBlocks = enhancement?.blocks.filter((b) => b.type === 'tool-comparison' || b.type === 'weekly-plan') ?? [];
  const codexAgentPostLessonBlocks = enhancement?.blocks.filter((b) => b.type !== 'tool-comparison' && b.type !== 'weekly-plan') ?? [];

  // AI Programming 专用：tool-comparison + weekly-plan 放课程前，其余放课程后
  const aiProgrammingPreLessonBlocks = enhancement?.blocks.filter((b) => b.type === 'tool-comparison' || b.type === 'weekly-plan') ?? [];
  const aiProgrammingPostLessonBlocks = enhancement?.blocks.filter((b) => b.type !== 'tool-comparison' && b.type !== 'weekly-plan') ?? [];

  const superIndividualPreLessonBlocks = enhancement?.blocks.filter((block) => block.title.startsWith('开始前')) ?? [];
  const superIndividualPostLessonBlocks = enhancement?.blocks.filter((block) => !block.title.startsWith('开始前')) ?? [];
  const agentIntroPostLessonBlocks = enhancement?.blocks ?? [];
  const aiGroupPostLessonBlocks = enhancement?.blocks ?? [];

  const isCustomLayout = isSuperIndividual || isOpenClaw || isAgentIntro || isAiGroup || isClaudeAgent || isCodexAgent || isAiProgramming;

  useDocumentTitle(content?.title ?? (isLoading ? '正在加载模块' : '模块未找到'));

  if (isLoading && moduleId) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-slate-500 dark:text-gray-400">
        <div className="inline-flex items-center gap-3 font-mono-tech text-sm tracking-wide">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
          正在加载模块内容...
        </div>
      </div>
    );
  }

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

  const claudeAgentLessonGroups = CLAUDE_AGENT_LESSON_GROUPS.map((group) => ({
    ...group,
    lessons: group.lessonSlugs
      .map((slug) => lessonLookup.get(slug))
      .filter((lesson): lesson is typeof content.lessons[number] => Boolean(lesson)),
  })).filter((group) => group.lessons.length > 0);

  const codexAgentLessonGroups = CODEX_AGENT_LESSON_GROUPS.map((group) => ({
    ...group,
    lessons: group.lessonSlugs
      .map((slug) => lessonLookup.get(slug))
      .filter((lesson): lesson is typeof content.lessons[number] => Boolean(lesson)),
  })).filter((group) => group.lessons.length > 0);

  const aiProgrammingLessonGroups = AI_PROGRAMMING_LESSON_GROUPS.map((group) => ({
    ...group,
    lessons: group.lessonSlugs
      .map((slug) => lessonLookup.get(slug))
      .filter((lesson): lesson is typeof content.lessons[number] => Boolean(lesson)),
  })).filter((group) => group.lessons.length > 0);

  return (
    <motion.div
      initial={isAiGroup ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={isAiGroup ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}
      className="pt-24 md:pt-32 pb-24 px-5 md:px-6 max-w-5xl mx-auto"
    >
      <button
        type="button"
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-slate-500 dark:text-gray-500 hover:text-cyan-400 mb-8 md:mb-12 transition-colors group font-mono-tech text-sm tracking-wide"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 返回首页
      </button>

      {/* 模块 Hero */}
      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10 mb-12 md:mb-16">
        <div
          className={`w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-3xl flex items-center justify-center shrink-0 ${accent.iconWrap}`}
          style={{ boxShadow: '0 0 32px rgba(34,211,238,0.15)' }}
        >
          <Icon size={32} className="md:hidden" />
          <Icon size={48} className="hidden md:block" />
        </div>
        <div>
          <span className={`font-mono-tech text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] mb-3 md:mb-4 block ${accent.subtitle}`}>
            {content.subtitle}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-7xl font-black text-slate-900 dark:text-white mb-4 md:mb-6 leading-tight break-words" style={{ fontFamily: "'Syne', sans-serif" }}>
            {content.title}
          </h1>
          <p className="text-base md:text-xl text-slate-600 dark:text-gray-400 leading-relaxed max-w-3xl">{content.description}</p>
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

      {!isCustomLayout &&
        prioritizedBlocks.map((block) => (
          <ModuleEnhancementBlockSection key={`${block.type}-${block.title}`} block={block} />
        ))}

      {!isCustomLayout &&
        remainingBlocks.map((block) => (
          <ModuleEnhancementBlockSection key={`${block.type}-${block.title}`} block={block} />
        ))}

      {!isCustomLayout && !isCases && (enhancement.lastVerifiedOn || enhancement.sources.length > 0) && (
        <ModuleReferencePanel lastVerifiedOn={enhancement.lastVerifiedOn} sources={enhancement.sources} />
      )}

      {/* 超级个体入门：先展示学习成果，再进入学习路径 */}
      {isSuperIndividual && content.keyTakeaways.length > 0 && (
        <div className="mb-20 p-6 md:p-10 bg-cyan-500/5 border border-cyan-500/20 rounded-3xl">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
            <Star className="text-yellow-400" size={22} /> 学完后你应该拿到
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {content.keyTakeaways.map((takeaway, index) => (
              <div key={takeaway} className="flex items-start gap-4">
                <div
                  className="font-mono-tech w-6 h-6 rounded-full bg-cyan-500/15 flex items-center justify-center text-cyan-400 text-xs font-bold shrink-0 mt-0.5"
                  style={{ textShadow: '0 0 8px rgba(34,211,238,0.6)' }}
                >
                  {index + 1}
                </div>
                <p className="text-slate-700 dark:text-gray-300 leading-relaxed">{takeaway}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 模块结构 */}
      <div className="mb-20">
        <div className="mb-8">
          <p className={`font-mono-tech text-xs font-bold uppercase tracking-[0.25em] mb-3 ${accent.subtitle}`}>模块结构</p>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            {isOpenClaw
              ? '从跑通到长期稳定使用的实战路径'
              : isClaudeAgent
                ? '从跑起来到稳住它的实战路径'
                : isCodexAgent
                  ? '从入口判断到团队协作的 Codex 实战路径'
                    : isAiProgramming
                      ? '先看清工具范式，再设计自己的默认工作栈'
                      : isAiGroup
                        ? '看懂规则，再决定是否入团'
                      : isCases
                      ? '这一模块主要给你 6 个可直接复用的落地场景'
                      : '这一模块主要解决 3 件事'}
          </h2>
          {(isOpenClaw || isClaudeAgent || isCodexAgent || isAiProgramming || isAiGroup || isCases) && (
            <p className="mt-3 text-sm text-slate-600 dark:text-gray-400 max-w-3xl leading-7">
              {isOpenClaw
                ? '默认顺序很简单：先跑通最小闭环，再把规则、技能和主动策略配稳，最后用真实案例和治理动作把它长期用起来。'
                : isClaudeAgent
                  ? '先选对入口跑通首任务，再用 CLAUDE.md、Skills、MCP 把工作流配稳，最后用安全边界、多智能体和自动化把它长期用起来。'
                  : isCodexAgent
                    ? '先选对 App、IDE、CLI、Cloud 入口，再用 AGENTS.md、任务契约、沙箱审批和 Cloud tasks 把 Codex 接进真实仓库协作。'
                    : isAiProgramming
                      ? '先理解不同产品解决哪段开发链路，再横向比较国内外工具路线，然后把模型、工作流和治理规则接成一套可执行系统。'
                      : isAiGroup
                        ? '先了解拼团优势、额度倍率和使用规则；确认这些条件适合你后，再按最后一节的联系方式申请入团。'
                      : '不要把这 6 个案例当故事看，而是按你的行业、现有工具和可用资源去挑一个最接近的场景，先跑通一个最小闭环。'}
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
                className="card-scan card-hud relative p-6 md:p-8 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-cyan-500/10 rounded-3xl hover:border-cyan-500/25 transition-all overflow-hidden"
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

      {/* 学完后你应该拿到 - OpenClaw / Claude Agent 不展示 */}
      {!isSuperIndividual && !isOpenClaw && !isClaudeAgent && !isCodexAgent && !isAiProgramming && !isAiGroup && !isCases && content.keyTakeaways.length > 0 && (
        <div className="mb-20 p-6 md:p-10 bg-cyan-500/5 border border-cyan-500/20 rounded-3xl">
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

      {/* 超级个体入门：看完目标与结构后，只做最小准备，再进入课程 */}
      {isSuperIndividual &&
        superIndividualPreLessonBlocks.map((block) => (
          <ModuleEnhancementBlockSection key={`${block.type}-${block.title}`} block={block} />
        ))}

      {/* OpenClaw：6 周路线放在课程大纲前，帮用户建立节奏感 */}
      {isOpenClaw &&
        openclawWeeklyPlan.map((block) => (
          <ModuleEnhancementBlockSection key={`${block.type}-${block.title}`} block={block} />
        ))}

      {/* Claude Agent：tool-comparison 放在课程大纲前做入口引导 */}
      {isClaudeAgent &&
        claudeAgentPreLessonBlocks.map((block) => (
          <ModuleEnhancementBlockSection key={`${block.type}-${block.title}`} block={block} />
        ))}

      {/* Codex Agent：tool-comparison + weekly-plan 放在课程大纲前 */}
      {isCodexAgent &&
        codexAgentPreLessonBlocks.map((block) => (
          <ModuleEnhancementBlockSection key={`${block.type}-${block.title}`} block={block} />
        ))}

      {/* AI Programming：tool-comparison + weekly-plan 放在课程大纲前 */}
      {isAiProgramming &&
        aiProgrammingPreLessonBlocks.map((block) => (
          <ModuleEnhancementBlockSection key={`${block.type}-${block.title}`} block={block} />
        ))}

      {/* 课程大纲 */}
      <div className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-cyan-500/10 rounded-3xl p-6 md:p-10">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-3">
          <BookOpen className="text-cyan-400" size={22} /> {isAiGroup ? '拼团说明' : '课程大纲'}
        </h3>
        <p className="font-mono-tech text-xs text-slate-500 dark:text-gray-500 mb-8 tracking-wide">
          {isAiGroup ? '按顺序看完 4 部分：先看优势，再算倍率、确认规则，最后查看入团方式。' : '不要先通读，按顺序做。每节课先看目标，再立即完成 1 个动作。'}
        </p>
        {isOpenClaw || isClaudeAgent || isCodexAgent || isAiProgramming ? (
          <div className="space-y-6">
            {(isOpenClaw ? openclawLessonGroups : isClaudeAgent ? claudeAgentLessonGroups : isCodexAgent ? codexAgentLessonGroups : aiProgrammingLessonGroups).map((group) => (
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

      {/* 超级个体入门：课程完成标准放在大纲之后，避免开场堆叠清单 */}
      {isSuperIndividual &&
        superIndividualPostLessonBlocks.map((block) => (
          <ModuleEnhancementBlockSection key={`${block.type}-${block.title}`} block={block} />
        ))}

      {/* 智能体入门：核心结构与课程优先，行动清单和延伸阅读放到课程之后 */}
      {isAgentIntro &&
        agentIntroPostLessonBlocks.map((block) => (
          <ModuleEnhancementBlockSection key={`${block.type}-${block.title}`} block={block} />
        ))}

      {/* AI 拼团：行动清单、治理底线、团长模板和来源放在课程大纲后 */}
      {isAiGroup &&
        aiGroupPostLessonBlocks.map((block) => (
          <ModuleEnhancementBlockSection key={`${block.type}-${block.title}`} block={block} />
        ))}

      {/* OpenClaw：治理清单 + 资源导航放在课程大纲后 */}
      {isOpenClaw &&
        openclawPostLessonBlocks.map((block) => (
          <ModuleEnhancementBlockSection key={`${block.type}-${block.title}`} block={block} />
        ))}

      {/* Claude Agent：SOP 模板、周计划、安全清单、资源导航放在课程大纲后 */}
      {isClaudeAgent &&
        claudeAgentPostLessonBlocks.map((block) => (
          <ModuleEnhancementBlockSection key={`${block.type}-${block.title}`} block={block} />
        ))}

      {/* Codex Agent：SOP 模板、安全清单、资源导航放在课程大纲后 */}
      {isCodexAgent &&
        codexAgentPostLessonBlocks.map((block) => (
          <ModuleEnhancementBlockSection key={`${block.type}-${block.title}`} block={block} />
        ))}

      {/* AI Programming：模型角色表、安全清单、资源导航放在课程大纲后 */}
      {isAiProgramming &&
        aiProgrammingPostLessonBlocks.map((block) => (
          <ModuleEnhancementBlockSection key={`${block.type}-${block.title}`} block={block} />
        ))}

      {/* 超级个体入门：参考来源统一放到所有学习内容之后 */}
      {isSuperIndividual && (enhancement.lastVerifiedOn || enhancement.sources.length > 0) && (
        <ModuleReferencePanel lastVerifiedOn={enhancement.lastVerifiedOn} sources={enhancement.sources} />
      )}

      {/* 场景与案例：参考资料放到课程大纲后，再接 CTA */}
      {isCases && (enhancement.lastVerifiedOn || enhancement.sources.length > 0) && (
        <ModuleReferencePanel lastVerifiedOn={enhancement.lastVerifiedOn} sources={enhancement.sources} />
      )}

      {/* Claude Agent：参考资料放最后 */}
      {isClaudeAgent && (enhancement.lastVerifiedOn || enhancement.sources.length > 0) && (
        <ModuleReferencePanel lastVerifiedOn={enhancement.lastVerifiedOn} sources={enhancement.sources} />
      )}

      {/* Codex Agent：参考资料放最后 */}
      {isCodexAgent && (enhancement.lastVerifiedOn || enhancement.sources.length > 0) && (
        <ModuleReferencePanel lastVerifiedOn={enhancement.lastVerifiedOn} sources={enhancement.sources} />
      )}

      {/* AI Programming：参考资料放最后 */}
      {isAiProgramming && (enhancement.lastVerifiedOn || enhancement.sources.length > 0) && (
        <ModuleReferencePanel lastVerifiedOn={enhancement.lastVerifiedOn} sources={enhancement.sources} />
      )}

      {/* 智能体入门：官方参考资料放在所有课程与练习之后 */}
      {isAgentIntro && (enhancement.lastVerifiedOn || enhancement.sources.length > 0) && (
        <ModuleReferencePanel lastVerifiedOn={enhancement.lastVerifiedOn} sources={enhancement.sources} />
      )}

      {/* AI 拼团：官方与项目参考资料放在所有课程与模板之后 */}
      {isAiGroup && (enhancement.lastVerifiedOn || enhancement.sources.length > 0) && (
        <ModuleReferencePanel lastVerifiedOn={enhancement.lastVerifiedOn} sources={enhancement.sources} />
      )}

      {/* CTA */}
      {content.cta && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 p-6 md:p-8 bg-gradient-to-r from-cyan-500/10 to-sky-500/10 border border-cyan-500/25 rounded-3xl text-center"
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
