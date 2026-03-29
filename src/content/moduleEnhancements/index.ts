import type { ModuleEnhancement, ModuleEnhancementBlock, ModuleId } from '@/types/course';

import { agentsEnhancement } from './agents';
import { casesEnhancement } from './cases';
import { growthEnhancement } from './growth';
import { llmEnhancement } from './llm';
import { scenariosEnhancement } from './scenarios';
import { superIndividualEnhancement } from './superIndividual';

const BASE_ENHANCEMENTS: Record<ModuleId, ModuleEnhancement> = {
  'super-individual': superIndividualEnhancement,
  llm: llmEnhancement,
  agents: agentsEnhancement,
  scenarios: scenariosEnhancement,
  cases: casesEnhancement,
  growth: growthEnhancement,
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
  agents: hydrateEnhancement(BASE_ENHANCEMENTS.agents),
  scenarios: hydrateEnhancement(BASE_ENHANCEMENTS.scenarios),
  cases: hydrateEnhancement(BASE_ENHANCEMENTS.cases),
  growth: hydrateEnhancement(BASE_ENHANCEMENTS.growth),
};
