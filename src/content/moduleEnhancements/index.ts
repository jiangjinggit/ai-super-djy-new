import type { ModuleEnhancement, ModuleEnhancementBlock, ModuleId } from '@/types/course';

import { apiGatewayEnhancement } from './apiGateway';
import { agentIntroEnhancement } from './agentIntro';
import { aiProgrammingEnhancement } from './aiProgramming';
import { aiGroupEnhancement } from './aiGroup';
import { casesEnhancement } from './cases';
import { chatgptEnhancement } from './chatgpt';
import { claudeAgentEnhancement } from './claudeAgent';
import { codexAgentEnhancement } from './codexAgent';
import { llmEnhancement } from './llm';
import { openclawEnhancement } from './openclaw';
import { superIndividualEnhancement } from './superIndividual';
import { workBuddyEnhancement } from './workBuddy';

const BASE_ENHANCEMENTS: Record<ModuleId, ModuleEnhancement> = {
  'super-individual': superIndividualEnhancement,
  llm: llmEnhancement,
  'api-gateway': apiGatewayEnhancement,
  'agent-intro': agentIntroEnhancement,
  chatgpt: chatgptEnhancement,
  workbuddy: workBuddyEnhancement,
  openclaw: openclawEnhancement,
  'claude-agent': claudeAgentEnhancement,
  'codex-agent': codexAgentEnhancement,
  'ai-programming': aiProgrammingEnhancement,
  cases: casesEnhancement,
  'ai-group': aiGroupEnhancement,
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
  'api-gateway': hydrateEnhancement(BASE_ENHANCEMENTS['api-gateway']),
  'agent-intro': hydrateEnhancement(BASE_ENHANCEMENTS['agent-intro']),
  chatgpt: hydrateEnhancement(BASE_ENHANCEMENTS.chatgpt),
  workbuddy: hydrateEnhancement(BASE_ENHANCEMENTS.workbuddy),
  openclaw: hydrateEnhancement(BASE_ENHANCEMENTS.openclaw),
  'claude-agent': hydrateEnhancement(BASE_ENHANCEMENTS['claude-agent']),
  'codex-agent': hydrateEnhancement(BASE_ENHANCEMENTS['codex-agent']),
  'ai-programming': hydrateEnhancement(BASE_ENHANCEMENTS['ai-programming']),
  cases: hydrateEnhancement(BASE_ENHANCEMENTS.cases),
  'ai-group': hydrateEnhancement(BASE_ENHANCEMENTS['ai-group']),
};
