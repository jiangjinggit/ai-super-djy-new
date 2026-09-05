import { useState } from 'react';

export const tutorialNoteKey = (topicId: string, lessonId: string) => `ai-overseas-note-v1:${topicId}:${lessonId}`;

function decodeTutorialNote(raw: string | null): { text: string } | null {
  if (raw === null) return null;
  try {
    const value: unknown = JSON.parse(raw);
    if (value && typeof value === 'object' && 'text' in value && typeof value.text === 'string') return { text: value.text };
  } catch { /* Use the blank exercise when a saved record cannot be read. */ }
  return null;
}

export function parseTutorialNote(raw: string | null, fallback: string): string {
  return decodeTutorialNote(raw)?.text ?? fallback;
}

// Mount one editor per lesson key so navigating between topics cannot reuse another lesson's draft.
export function useTutorialNotes(topicId: string, lessonId: string, template: string) {
  const key = tutorialNoteKey(topicId, lessonId);
  const [initial] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      const note = decodeTutorialNote(raw);
      return { text: note?.text ?? template, status: raw === null ? 'empty' : note ? 'loaded' : 'invalid' };
    } catch { return { text: template, status: 'failed' }; }
  });
  const [text, setText] = useState(initial.text);
  const [status, setStatus] = useState(initial.status);
  function edit(value: string) {
    setText(value);
    try { window.localStorage.setItem(key, JSON.stringify({ text: value })); setStatus('saved'); }
    catch { setStatus('failed'); }
  }
  return { text, edit, status };
}
