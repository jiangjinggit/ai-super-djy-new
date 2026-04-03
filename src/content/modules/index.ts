import { MODULE_ENHANCEMENTS } from '@/content/moduleEnhancements';
import { createLessonCover } from '@/content/lessonCovers';
import type { BaseLesson, BaseModuleContent, ContentDifficulty, Lesson, ModuleContent, ModuleId, SourceLink } from '@/types/course';

import { agentIntroModule } from './agentIntro';
import { aiProgrammingModule } from './aiProgramming';
import { casesModule } from './cases';
import { claudeAgentModule } from './claudeAgent';
import { llmModule } from './llm';
import { openclawModule } from './openclaw';
import { superIndividualModule } from './superIndividual';

const lessonMarkdownFiles = import.meta.glob('../lessons/**/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>;

const BASE_MODULES: Record<ModuleId, BaseModuleContent> = {
  'super-individual': superIndividualModule,
  llm: llmModule,
  'agent-intro': agentIntroModule,
  openclaw: openclawModule,
  'claude-agent': claudeAgentModule,
  'ai-programming': aiProgrammingModule,
  cases: casesModule,
};

const MODULE_METADATA: Record<
  ModuleId,
  {
    estimatedTime: string;
    difficulty: ContentDifficulty;
    audience: string[];
    tags: string[];
    prerequisites: string[];
  }
> = {
  'super-individual': {
    estimatedTime: '1-2 周',
    difficulty: 'beginner',
    audience: ['零基础用户', '希望建立 AI 工作流的个人学习者'],
    tags: ['AI 入门', 'Prompt', '工作流', '工具栈'],
    prerequisites: [],
  },
  llm: {
    estimatedTime: '1-2 周',
    difficulty: 'intermediate',
    audience: ['需要做模型选型的用户', '准备接 API 或做多模型协作的用户'],
    tags: ['模型选型', 'API', '上下文', '成本控制'],
    prerequisites: ['完成入门模块，或已经能稳定使用 AI 完成真实任务'],
  },
  'agent-intro': {
    estimatedTime: '30 分钟',
    difficulty: 'beginner',
    audience: ['刚开始了解智能体的用户', '想系统建立认知框架的从业者'],
    tags: ['智能体入门', '认知框架', '工具选型'],
    prerequisites: ['了解基础的 AI 对话工具使用'],
  },
  openclaw: {
    estimatedTime: '2-3 周',
    difficulty: 'intermediate',
    audience: ['需要多渠道信息自动化的用户', '想搭建 24/7 运行私人 AI 助手的用户'],
    tags: ['OpenClaw', 'SOUL.md', 'USER.md', 'AGENTS.md', '心跳机制', '记忆迭代'],
    prerequisites: ['完成 AI 智能体入门模块', '有基础的命令行操作经验'],
  },
  'claude-agent': {
    estimatedTime: '3-4 周',
    difficulty: 'intermediate',
    audience: ['对 AI 提效感兴趣的任何人', '开发者', '产品经理', '运营与市场人员', '研究人员与分析师', '创业者与独立开发者', '自由职业者', '学生与求职者', '希望用 AI 减少重复劳动的知识工作者'],
    tags: ['Claude Code', 'Cowork', 'CLAUDE.md', 'MCP', 'Skills', 'Subagents', 'Hooks', '安全边界'],
    prerequisites: ['完成 AI 智能体入门模块'],
  },
  'ai-programming': {
    estimatedTime: '2-3 周',
    difficulty: 'intermediate',
    audience: ['开发者', '技术负责人', '产品经理', '希望系统做 AI 编程选型的团队'],
    tags: ['AI 编程', 'Claude Code', 'Codex', 'Cursor', 'Gemini', 'Kiro', '通义灵码', 'Qoder', 'TRAE', 'CodeBuddy'],
    prerequisites: ['完成 AI 智能体入门模块', '建议已了解基础的大模型选型逻辑'],
  },
  cases: {
    estimatedTime: '随时',
    difficulty: 'intermediate',
    audience: ['各行各业的从业者', '想通过案例理解 AI 落地路径的用户', '希望把 AI 真的接进业务流程的人'],
    tags: ['场景库', 'SOP', '内容生产', 'MVP', '案例拆解', '风险判断', '可复制性'],
    prerequisites: ['建议已完成入门模块，并理解 AI 工作流和能力边界', '建议至少熟悉其中一项：命令行、机器人配置、表格数据处理、云端定时任务'],
  },
};

const extractLessonSlug = (image: string) => {
  if (image.startsWith('cover://')) {
    return image.replace('cover://', '');
  }

  const match = image.match(/\/seed\/([^/]+)\//);
  return match?.[1] ?? image;
};

const getLessonBody = (moduleId: ModuleId, slug: string, lesson: BaseLesson) => {
  const key = `../lessons/${moduleId}/${slug}.md`;
  const body = lessonMarkdownFiles[key];

  if (body) {
    return body;
  }

  return lesson.fullContent.map((item) => `## ${item.subtitle}\n\n${item.text}`).join('\n\n');
};

const lessonEstimatedTime = (moduleId: ModuleId, lesson: BaseLesson) => {
  if (moduleId === 'super-individual') return '15-20 分钟';
  if (moduleId === 'llm') return '18-25 分钟';
  if (moduleId === 'agent-intro') return '15-20 分钟';
  if (moduleId === 'openclaw') return '25-35 分钟';
  if (moduleId === 'claude-agent') return '25-35 分钟';
  if (moduleId === 'ai-programming') return '22-30 分钟';
  if (moduleId === 'cases') return '15-25 分钟';
  return `${lesson.details.length * 5} 分钟`;
};

const lessonTags = (moduleId: ModuleId, lesson: BaseLesson, moduleTags: string[]) => {
  const slugTag = extractLessonSlug(lesson.image).replace(/-/g, ' ');
  return [...new Set([...moduleTags, slugTag, lesson.title])];
};

const lessonSources = (moduleId: ModuleId): SourceLink[] => {
  return MODULE_ENHANCEMENTS[moduleId].sources;
};

const enrichLesson = (
  moduleId: ModuleId,
  lesson: BaseLesson,
  difficulty: ContentDifficulty,
  audience: string[],
  tags: string[],
  prerequisites: string[],
  updatedAt: string,
): Lesson => {
  const slug = extractLessonSlug(lesson.image);

  return {
    slug,
    title: lesson.title,
    content: lesson.content,
    image: createLessonCover(moduleId, lesson.title, lesson.content, slug),
    details: lesson.details,
    body: getLessonBody(moduleId, slug, lesson),
    estimatedTime: lessonEstimatedTime(moduleId, lesson),
    difficulty,
    audience,
    tags: lessonTags(moduleId, lesson, tags),
    prerequisites,
    updatedAt,
    sources: lessonSources(moduleId),
  };
};

const enrichModule = (moduleId: ModuleId, moduleContent: BaseModuleContent): ModuleContent => {
  const metadata = MODULE_METADATA[moduleId];
  const updatedAt = MODULE_ENHANCEMENTS[moduleId].lastVerifiedOn;

  return {
    ...moduleContent,
    estimatedTime: metadata.estimatedTime,
    difficulty: metadata.difficulty,
    audience: metadata.audience,
    tags: metadata.tags,
    prerequisites: metadata.prerequisites,
    updatedAt,
    lessons: moduleContent.lessons.map((lesson) =>
      enrichLesson(moduleId, lesson, metadata.difficulty, metadata.audience, metadata.tags, metadata.prerequisites, updatedAt),
    ),
  };
};

export const MODULE_CONTENT: Record<ModuleId, ModuleContent> = {
  'super-individual': enrichModule('super-individual', BASE_MODULES['super-individual']),
  llm: enrichModule('llm', BASE_MODULES.llm),
  'agent-intro': enrichModule('agent-intro', BASE_MODULES['agent-intro']),
  openclaw: enrichModule('openclaw', BASE_MODULES.openclaw),
  'claude-agent': enrichModule('claude-agent', BASE_MODULES['claude-agent']),
  'ai-programming': enrichModule('ai-programming', BASE_MODULES['ai-programming']),
  cases: enrichModule('cases', BASE_MODULES.cases),
};
