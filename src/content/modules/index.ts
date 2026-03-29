import { MODULE_ENHANCEMENTS } from '@/content/moduleEnhancements';
import { createLessonCover } from '@/content/lessonCovers';
import type { BaseLesson, BaseModuleContent, ContentDifficulty, Lesson, ModuleContent, ModuleId, SourceLink } from '@/types/course';

import { agentsModule } from './agents';
import { casesModule } from './cases';
import { growthModule } from './growth';
import { llmModule } from './llm';
import { scenariosModule } from './scenarios';
import { superIndividualModule } from './superIndividual';

const lessonMarkdownFiles = import.meta.glob('../lessons/**/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>;

const BASE_MODULES: Record<ModuleId, BaseModuleContent> = {
  'super-individual': superIndividualModule,
  llm: llmModule,
  agents: agentsModule,
  scenarios: scenariosModule,
  cases: casesModule,
  growth: growthModule,
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
  agents: {
    estimatedTime: '2-4 周',
    difficulty: 'intermediate',
    audience: ['准备做自动化的个人用户', '需要跨工具执行链的开发与运营人员'],
    tags: ['智能体', 'OpenClaw', 'Claude Code', '权限治理'],
    prerequisites: ['理解模型选型和基础工作流概念'],
  },
  scenarios: {
    estimatedTime: '持续',
    difficulty: 'intermediate',
    audience: ['内容创作者', '独立开发者', '电商与自由职业从业者'],
    tags: ['场景库', 'SOP', '内容生产', 'MVP'],
    prerequisites: ['已能把 AI 用在至少一个真实流程中'],
  },
  cases: {
    estimatedTime: '随时',
    difficulty: 'beginner',
    audience: ['想通过案例理解 AI 落地路径的用户'],
    tags: ['案例拆解', '风险判断', '可复制性', '方法论'],
    prerequisites: ['建议先了解入门模块中的能力边界与工作流概念'],
  },
  growth: {
    estimatedTime: '3-12 月',
    difficulty: 'beginner',
    audience: ['想系统规划学习和验证节奏的用户'],
    tags: ['成长路径', 'MVP', '验证', '复盘'],
    prerequisites: [],
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
  if (moduleId === 'agents') return '20-30 分钟';
  if (moduleId === 'scenarios') return '18-25 分钟';
  if (moduleId === 'cases') return '12-18 分钟';
  if (moduleId === 'growth') return '15-20 分钟';
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
  agents: enrichModule('agents', BASE_MODULES.agents),
  scenarios: enrichModule('scenarios', BASE_MODULES.scenarios),
  cases: enrichModule('cases', BASE_MODULES.cases),
  growth: enrichModule('growth', BASE_MODULES.growth),
};
