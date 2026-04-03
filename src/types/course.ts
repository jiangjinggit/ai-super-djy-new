import type { LucideIcon } from 'lucide-react';

export const MODULE_IDS = [
  'super-individual',
  'llm',
  'agent-intro',
  'openclaw',
  'claude-agent',
  'ai-programming',
  'cases',
] as const;

export type ModuleId = (typeof MODULE_IDS)[number];

export type ModuleColor = 'blue' | 'purple' | 'emerald' | 'orange';
export type ContentDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface ModuleSection {
  title: string;
  content: string;
  icon: LucideIcon;
}

export interface LessonDetail {
  subtitle: string;
  text: string;
}

export interface Lesson {
  slug: string;
  title: string;
  content: string;
  image: string;
  details: string[];
  body: string;
  estimatedTime: string;
  difficulty: ContentDifficulty;
  audience: string[];
  tags: string[];
  prerequisites: string[];
  updatedAt: string;
  sources: SourceLink[];
}

export interface BaseLesson {
  title: string;
  content: string;
  image: string;
  details: string[];
  fullContent: LessonDetail[];
}

export interface ModuleCta {
  text: string;
  link: string;
}

export interface BaseModuleContent {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: ModuleColor;
  description: string;
  keyTakeaways: string[];
  sections: ModuleSection[];
  lessons: BaseLesson[];
  cta?: ModuleCta;
}

export interface ModuleContent extends Omit<BaseModuleContent, 'lessons'> {
  estimatedTime: string;
  difficulty: ContentDifficulty;
  audience: string[];
  tags: string[];
  prerequisites: string[];
  updatedAt: string;
  lessons: Lesson[];
}

export interface ModuleCardData {
  id: ModuleId;
  title: string;
  desc: string;
  icon: LucideIcon;
  color: ModuleColor;
}

export interface SourceLink {
  label: string;
  url: string;
}

export interface ActionChecklistItem {
  title: string;
  description: string;
  timebox: string;
  doneDefinition: string;
}

export interface ModelOption {
  name: string;
  vendor: string;
  contextWindow: string;
  inputPerMTok: number;
  outputPerMTok: number;
  latency: '低' | '中' | '高';
  bestFor: string;
  tier: '低预算' | '均衡' | '高质量';
}

export interface SecurityRule {
  title: string;
  detail: string;
}

export interface SopTemplate {
  title: string;
  input: string;
  steps: string[];
  output: string;
  kpi: string;
}

export interface CaseEvidence {
  title: string;
  sourceLabel: string;
  sourceUrl: string;
  publishedOn: string;
  reproducibility: '高' | '中' | '低';
  riskWarning: string;
}

export interface WeeklyPlan {
  week: number;
  goal: string;
  deliverable: string;
  fallback: string;
}

export interface ToolComparisonRow {
  aspect: string;
  cli: string;
  cowork: string;
}

export interface BaseEnhancementBlock {
  title: string;
  description?: string;
  updatedAt?: string;
  sources?: SourceLink[];
  hideMeta?: boolean;
}

export interface ActionChecklistBlock extends BaseEnhancementBlock {
  type: 'action-checklist';
  items: ActionChecklistItem[];
}

export interface ModelOptionsBlock extends BaseEnhancementBlock {
  type: 'model-options';
  items: ModelOption[];
  footer?: string;
}

export interface SecurityChecklistBlock extends BaseEnhancementBlock {
  type: 'security-checklist';
  items: SecurityRule[];
}

export interface SopTemplatesBlock extends BaseEnhancementBlock {
  type: 'sop-templates';
  items: SopTemplate[];
}

export interface CaseEvidenceBlock extends BaseEnhancementBlock {
  type: 'case-evidence';
  items: CaseEvidence[];
}

export interface WeeklyPlanBlock extends BaseEnhancementBlock {
  type: 'weekly-plan';
  items: WeeklyPlan[];
}

export interface ToolComparisonBlock extends BaseEnhancementBlock {
  type: 'tool-comparison';
  cliTitle: string;
  coworkTitle: string;
  items: ToolComparisonRow[];
}

export interface ResourceLinkItem {
  title: string;
  url: string;
  label: string;
  description: string;
  category: string;
}

export interface ResourceLinksBlock extends BaseEnhancementBlock {
  type: 'resource-links';
  items: ResourceLinkItem[];
}

export type ModuleEnhancementBlock =
  | ActionChecklistBlock
  | ModelOptionsBlock
  | SecurityChecklistBlock
  | SopTemplatesBlock
  | CaseEvidenceBlock
  | WeeklyPlanBlock
  | ToolComparisonBlock
  | ResourceLinksBlock;

export interface ModuleEnhancement {
  lastVerifiedOn: string;
  sources: SourceLink[];
  blocks: ModuleEnhancementBlock[];
}

export const isModuleId = (value: string): value is ModuleId =>
  MODULE_IDS.includes(value as ModuleId);
