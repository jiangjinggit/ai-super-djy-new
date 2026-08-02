import { createLessonCover } from '@/content/lessonCovers';
import { aiGroupEnhancement } from '@/content/moduleEnhancements/aiGroup';
import { aiGroupModule } from '@/content/modules/aiGroup';
import type { Lesson, ModuleContent, ModuleEnhancement } from '@/types/course';

const audience = ['准备参加 AI 拼团的用户', '希望了解额度、倍率和拼团规则的团友'];
const tags = ['AI 拼团', '面板额度', '动态倍率', '额度转让', '隐私规则', '入团方式'];
const prerequisites: string[] = [];

const enhancement: ModuleEnhancement = {
  ...aiGroupEnhancement,
  blocks: aiGroupEnhancement.blocks.map((block) => ({
    ...block,
    updatedAt: block.updatedAt ?? aiGroupEnhancement.lastVerifiedOn,
    sources: block.sources ?? aiGroupEnhancement.sources,
  })),
};

const lessons: Lesson[] = aiGroupModule.lessons.map((lesson) => {
  const slug = lesson.image.startsWith('cover://') ? lesson.image.replace('cover://', '') : lesson.image;
  const fallback = lesson.fullContent.map((item) => `## ${item.subtitle}\n\n${item.text}`).join('\n\n');

  return {
    slug,
    title: lesson.title,
    content: lesson.content,
    image: createLessonCover('ai-group', lesson.title, lesson.content, slug),
    details: lesson.details,
    body: () => Promise.resolve(fallback),
    estimatedTime: '5-8 分钟',
    difficulty: 'beginner',
    audience,
    tags: [...new Set([...tags, slug.replace(/-/g, ' '), lesson.title])],
    prerequisites,
    updatedAt: enhancement.lastVerifiedOn,
    sources: enhancement.sources,
  };
});

const content: ModuleContent = {
  ...aiGroupModule,
  estimatedTime: '20-25 分钟',
  difficulty: 'beginner',
  audience,
  tags,
  prerequisites,
  updatedAt: enhancement.lastVerifiedOn,
  lessons,
};

export const AI_GROUP_BUNDLE = { content, enhancement };
