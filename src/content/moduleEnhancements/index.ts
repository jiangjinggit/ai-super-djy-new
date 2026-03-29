import type { ModuleEnhancement, ModuleId } from '@/types/course';

import { agentsEnhancement } from './agents';
import { casesEnhancement } from './cases';
import { growthEnhancement } from './growth';
import { llmEnhancement } from './llm';
import { scenariosEnhancement } from './scenarios';
import { superIndividualEnhancement } from './superIndividual';

export const MODULE_ENHANCEMENTS: Record<ModuleId, ModuleEnhancement> = {
  'super-individual': superIndividualEnhancement,
  llm: llmEnhancement,
  agents: agentsEnhancement,
  scenarios: scenariosEnhancement,
  cases: casesEnhancement,
  growth: growthEnhancement,
};
