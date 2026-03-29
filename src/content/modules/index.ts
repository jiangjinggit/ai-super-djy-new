import type { ModuleContent, ModuleId } from '@/types/course';

import { agentsModule } from './agents';
import { llmModule } from './llm';
import { superIndividualModule } from './superIndividual';

import { casesModule } from './cases';
import { growthModule } from './growth';
import { scenariosModule } from './scenarios';

export const MODULE_CONTENT: Record<ModuleId, ModuleContent> = {
  'super-individual': superIndividualModule,
  llm: llmModule,
  agents: agentsModule,
  scenarios: scenariosModule,
  cases: casesModule,
  growth: growthModule,
};
