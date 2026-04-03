import type { ModuleEnhancement, ModuleEnhancementBlock, ModuleId } from '@/types/course';

import { agentIntroEnhancement } from './agentIntro';
import { aiProgrammingEnhancement } from './aiProgramming';
import { casesEnhancement } from './cases';
import { claudeAgentEnhancement } from './claudeAgent';
import { llmEnhancement } from './llm';
import { openclawEnhancement } from './openclaw';
import { superIndividualEnhancement } from './superIndividual';

const BASE_ENHANCEMENTS: Record<ModuleId, ModuleEnhancement> = {
  'super-individual': superIndividualEnhancement,
  llm: llmEnhancement,
  'agent-intro': agentIntroEnhancement,
  openclaw: openclawEnhancement,
  'claude-agent': claudeAgentEnhancement,
  'ai-programming': aiProgrammingEnhancement,
  cases: casesEnhancement,
};

const hydrateBlockMeta = (enhancement: ModuleEnhancement): ModuleEnhancementBlock[] => {
  return enhancement.blocks.map((block) => ({
    ...block,
    updatedAt: block.updatedAt ?? enhancement.lastVerifiedOn,
    sources: block.sources ?? enhancement.sources,
  }));
};

const hydrateEnhancement = (enhancement: ModuleEnhancement): ModuleEnhancement => {
  return {
    ...enhancement,
    blocks: hydrateBlockMeta(enhancement),
  };
};

export const MODULE_ENHANCEMENTS: Record<ModuleId, ModuleEnhancement> = {
  'super-individual': hydrateEnhancement(BASE_ENHANCEMENTS['super-individual']),
  llm: hydrateEnhancement(BASE_ENHANCEMENTS.llm),
  'agent-intro': hydrateEnhancement(BASE_ENHANCEMENTS['agent-intro']),
  openclaw: hydrateEnhancement(BASE_ENHANCEMENTS.openclaw),
  'claude-agent': hydrateEnhancement(BASE_ENHANCEMENTS['claude-agent']),
  'ai-programming': hydrateEnhancement(BASE_ENHANCEMENTS['ai-programming']),
  cases: hydrateEnhancement(BASE_ENHANCEMENTS.cases),
};
