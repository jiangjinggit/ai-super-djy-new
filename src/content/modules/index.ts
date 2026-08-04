import { MODULE_ENHANCEMENTS } from '@/content/moduleEnhancements';
import { createLessonCover } from '@/content/lessonCovers';
import type { BaseLesson, BaseModuleContent, ContentDifficulty, Lesson, ModuleContent, ModuleId, SourceLink } from '@/types/course';

import { apiGatewayModule } from './apiGateway';
import { agentIntroModule } from './agentIntro';
import { aiProgrammingModule } from './aiProgramming';
import { aiGroupModule } from './aiGroup';
import { casesModule } from './cases';
import { chatgptModule } from './chatgpt';
import { claudeAgentModule } from './claudeAgent';
import { codexAgentModule } from './codexAgent';
import { llmModule } from './llm';
import { openclawModule } from './openclaw';
import { superIndividualModule } from './superIndividual';
import { workBuddyModule } from './workBuddy';

const lessonMarkdownFiles = import.meta.glob('../lessons/**/*.md', {
  import: 'default',
  query: '?raw',
}) as Record<string, () => Promise<string>>;

const BASE_MODULES: Record<ModuleId, BaseModuleContent> = {
  'super-individual': superIndividualModule,
  llm: llmModule,
  'api-gateway': apiGatewayModule,
  'agent-intro': agentIntroModule,
  chatgpt: chatgptModule,
  workbuddy: workBuddyModule,
  openclaw: openclawModule,
  'claude-agent': claudeAgentModule,
  'codex-agent': codexAgentModule,
  'ai-programming': aiProgrammingModule,
  cases: casesModule,
  'ai-group': aiGroupModule,
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
    estimatedTime: '1 周',
    difficulty: 'beginner',
    audience: ['第一次把 AI 用进真实工作的零基础用户', '希望减少重复劳动的个人学习者'],
    tags: ['AI 入门', '真实任务', 'Prompt', '模板复用'],
    prerequisites: ['准备一个低风险小任务和一份真实材料'],
  },
  llm: {
    estimatedTime: '1-2 周',
    difficulty: 'intermediate',
    audience: ['需要做模型选型的用户', '准备接 API 或做多模型协作的用户'],
    tags: ['模型选型', 'API', '上下文', '成本控制'],
    prerequisites: ['完成入门模块，或已经能稳定使用 AI 完成真实任务'],
  },
  'api-gateway': {
    estimatedTime: '2-3 小时',
    difficulty: 'intermediate',
    audience: ['已经开始接模型 API 的个人用户', '需要把 Codex、Claude Code、OpenClaw 接到统一入口的用户', '希望给小团队设计默认接入方案的人'],
    tags: ['API 中转', '模型接入', 'Base URL', 'API Key', 'OpenAI 兼容', '回退治理'],
    prerequisites: ['建议先完成大模型实战库模块', '建议至少会修改环境变量或工具设置'],
  },
  'agent-intro': {
    estimatedTime: '2-3 小时',
    difficulty: 'beginner',
    audience: ['刚开始了解智能体的用户', '希望把 AI 协作真正用进日常工作的知识工作者'],
    tags: ['智能体入门', '任务判断', '人工确认', '任务契约', '工具边界'],
    prerequisites: ['了解基础的 AI 对话工具使用', '准备一个可用于练习的低风险真实任务'],
  },
  chatgpt: {
    estimatedTime: '2-3 小时',
    difficulty: 'beginner',
    audience: ['希望把 ChatGPT 用进日常工作的用户', '需要整理资料、写初稿、做研究和管理持续任务的知识工作者'],
    tags: ['ChatGPT', '任务表达', '文件协作', '深度研究', 'Projects', '核验'],
    prerequisites: ['完成入门模块，或已经有一个真实工作任务可以练习'],
  },
  workbuddy: {
    estimatedTime: '2-3 小时',
    difficulty: 'beginner',
    audience: ['需要用 AI 协作处理资料、会议、文档与项目任务的知识工作者', '希望建立可复用 AI 工作流的个人学习者'],
    tags: ['AI 协作', '任务拆解', '资料整理', '会议纪要', '工作流', '人工确认'],
    prerequisites: ['建议先完成 ChatGPT 高效工作模块，或已经能用 AI 产出基础初稿'],
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
  'codex-agent': {
    estimatedTime: '3-4 周',
    difficulty: 'intermediate',
    audience: ['开发者', '技术负责人', '产品经理', '希望用 OpenAI 编码代理处理仓库任务的人', '需要把 AI 编程接进团队协作流程的人'],
    tags: ['Codex', 'Codex CLI', 'Codex Cloud', 'AGENTS.md', 'Sandbox', 'Approvals', 'MCP', 'PR Review'],
    prerequisites: ['完成 AI 智能体入门模块', '建议了解基础 Git、命令行和代码仓库结构'],
  },
  'ai-programming': {
    estimatedTime: '2-3 周',
    difficulty: 'intermediate',
    audience: ['开发者', '技术负责人', '产品经理', '希望系统做 AI 编程选型的团队'],
    tags: ['AI 编程', 'Claude Code', 'Codex', 'Cursor', 'Gemini', 'Kiro', 'Qoder CN', '通义灵码', 'Qoder', 'TRAE', 'CodeBuddy'],
    prerequisites: ['完成 AI 智能体入门模块', '建议已了解基础的大模型选型逻辑'],
  },
  cases: {
    estimatedTime: '2-3 小时',
    difficulty: 'intermediate',
    audience: ['想从一个真实任务开始验证 AI 工作流的用户', '内容、运营、产品与独立开发者'],
    tags: ['场景练习', '最小闭环', '人工确认', '内容监控', '需求研究', 'Vibe Coding', '数据报告'],
    prerequisites: ['建议完成 AI 超级个体入门或 AI 智能体入门', '准备一个可在 60 分钟内手动验证的真实任务'],
  },
  'ai-group': {
    estimatedTime: '20-25 分钟',
    difficulty: 'beginner',
    audience: ['准备参加 AI 拼团的用户', '希望了解额度、倍率和拼团规则的团友'],
    tags: ['AI 拼团', '面板额度', '动态倍率', '额度转让', '隐私规则', '入团方式'],
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

const getLessonBody = (moduleId: ModuleId, slug: string, lesson: BaseLesson): (() => Promise<string>) => {
  const key = `../lessons/${moduleId}/${slug}.md`;
  const loader = lessonMarkdownFiles[key];

  if (loader) {
    return loader;
  }

  // 回退：从 fullContent 生成
  const fallback = lesson.fullContent.map((item) => `## ${item.subtitle}\n\n${item.text}`).join('\n\n');
  return () => Promise.resolve(fallback);
};

const lessonEstimatedTime = (moduleId: ModuleId, lesson: BaseLesson) => {
  if (moduleId === 'super-individual') return '12-18 分钟';
  if (moduleId === 'llm') return '18-25 分钟';
  if (moduleId === 'api-gateway') return '12-18 分钟';
  if (moduleId === 'agent-intro') return '12-18 分钟';
  if (moduleId === 'chatgpt') return '12-18 分钟';
  if (moduleId === 'workbuddy') return '12-18 分钟';
  if (moduleId === 'openclaw') return '25-35 分钟';
  if (moduleId === 'claude-agent') return '25-35 分钟';
  if (moduleId === 'codex-agent') return '25-35 分钟';
  if (moduleId === 'ai-programming') return '22-30 分钟';
  if (moduleId === 'cases') return '12-18 分钟';
  if (moduleId === 'ai-group') return '5-8 分钟';
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
  'api-gateway': enrichModule('api-gateway', BASE_MODULES['api-gateway']),
  'agent-intro': enrichModule('agent-intro', BASE_MODULES['agent-intro']),
  chatgpt: enrichModule('chatgpt', BASE_MODULES.chatgpt),
  workbuddy: enrichModule('workbuddy', BASE_MODULES.workbuddy),
  openclaw: enrichModule('openclaw', BASE_MODULES.openclaw),
  'claude-agent': enrichModule('claude-agent', BASE_MODULES['claude-agent']),
  'codex-agent': enrichModule('codex-agent', BASE_MODULES['codex-agent']),
  'ai-programming': enrichModule('ai-programming', BASE_MODULES['ai-programming']),
  cases: enrichModule('cases', BASE_MODULES.cases),
  'ai-group': enrichModule('ai-group', BASE_MODULES['ai-group']),
};
