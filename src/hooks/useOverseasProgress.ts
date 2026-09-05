import { useEffect, useState } from 'react';
import { OVERSEAS_STAGES, type OverseasStage } from '@/content/overseas';

export const OVERSEAS_PROGRESS_KEY = 'ai-overseas-progress-v1';
const progressEvent = 'ai-overseas-progress-change';
export const stageProgressKeys = (stage: OverseasStage) => [
  ...stage.tasks.map((_, index) => `${stage.id}:task:${index}`),
  ...stage.checks.map((_, index) => `${stage.id}:check:${index}`),
];
const validKeys = new Set(OVERSEAS_STAGES.flatMap(stageProgressKeys));

export function parseOverseasProgress(raw: string | null): string[] {
  try {
    const value: unknown = JSON.parse(raw || '[]');
    return Array.isArray(value) ? [...new Set(value.filter((key): key is string => typeof key === 'string' && validKeys.has(key)))] : [];
  } catch {
    return [];
  }
}

export const isStageComplete = (stage: OverseasStage, completed: string[]) => stageProgressKeys(stage).every(key => completed.includes(key));

function readProgress() {
  try { return parseOverseasProgress(localStorage.getItem(OVERSEAS_PROGRESS_KEY)); }
  catch { return []; }
}

export function useOverseasProgress() {
  const [completed, setCompleted] = useState<string[]>(readProgress);
  const [saveFailed, setSaveFailed] = useState(false);

  useEffect(() => {
    const sync = () => setCompleted(readProgress());
    const syncOtherTab = (event: StorageEvent) => { if (event.key === OVERSEAS_PROGRESS_KEY || event.key === null) sync(); };
    window.addEventListener('storage', syncOtherTab);
    window.addEventListener(progressEvent, sync);
    return () => {
      window.removeEventListener('storage', syncOtherTab);
      window.removeEventListener(progressEvent, sync);
    };
  }, []);

  const toggle = (key: string) => {
    if (!validKeys.has(key)) return;
    const current = saveFailed ? completed : readProgress();
    const next = current.includes(key) ? current.filter(item => item !== key) : [...current, key];
    setCompleted(next);
    try {
      localStorage.setItem(OVERSEAS_PROGRESS_KEY, JSON.stringify(next));
      setSaveFailed(false);
      window.dispatchEvent(new Event(progressEvent));
    } catch { setSaveFailed(true); }
  };

  return { completed, toggle, saveFailed, doneCount: OVERSEAS_STAGES.filter(stage => isStageComplete(stage, completed)).length };
}
