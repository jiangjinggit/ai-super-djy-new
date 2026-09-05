import assert from 'node:assert/strict';
import test from 'node:test';
import { OVERSEAS_PHASES, OVERSEAS_STAGES, OVERSEAS_TERMS, OVERSEAS_SEARCH_ITEMS, OVERSEAS_PATH } from '../src/content/overseas';
import { isStageComplete, parseOverseasProgress, stageProgressKeys } from '../src/hooks/useOverseasProgress';
import { OVERSEAS_TUTORIALS, OVERSEAS_TUTORIAL_SEARCH_ITEMS, tutorialPath } from '../src/content/overseasTutorials';
import { parseTutorialNote, tutorialNoteKey } from '../src/hooks/useTutorialNotes';

test('damaged or unrelated browser storage cannot mark practice complete', () => {
  for (const raw of [null, '', '{broken', 'null', '{}', '42', '"start"', '[null,12,"unrelated"]']) {
    assert.deepEqual(parseOverseasProgress(raw), []);
  }
  const firstKey = stageProgressKeys(OVERSEAS_STAGES[0])[0];
  assert.deepEqual(parseOverseasProgress(JSON.stringify([firstKey, firstKey, 'old-stage:task:0', false])), [firstKey]);
});

test('reading or completing tasks alone cannot satisfy the acceptance gate', () => {
  const stage = OVERSEAS_STAGES[0];
  const keys = stageProgressKeys(stage);
  assert.equal(isStageComplete(stage, []), false);
  assert.equal(isStageComplete(stage, keys.filter(key => key.includes(':task:'))), false);
  assert.equal(isStageComplete(stage, keys), true);
  for (const removed of keys) assert.equal(isStageComplete(stage, keys.filter(key => key !== removed)), false);
  assert.equal(isStageComplete(OVERSEAS_STAGES[1], keys), false);
});

test('every route phase covers each stage exactly once and knowledge links resolve', () => {
  const stageIds = OVERSEAS_STAGES.map(stage => stage.id);
  assert.equal(stageIds.length, 9);
  assert.equal(new Set(stageIds).size, stageIds.length);
  assert.deepEqual(OVERSEAS_PHASES.flatMap(phase => phase.stages), stageIds);
  const termIds = OVERSEAS_TERMS.map(term => term.id);
  for (const stage of OVERSEAS_STAGES) {
    for (const term of stage.terms) assert.ok(termIds.includes(term), `${stage.id}: missing term ${term}`);
    assert.ok(stage.template.includes('# '), `${stage.id}: template must be usable Markdown`);
  }
  for (const term of OVERSEAS_TERMS) assert.ok(stageIds.includes(term.stage));
  for (const item of OVERSEAS_SEARCH_ITEMS) {
    const route = item.href.slice(OVERSEAS_PATH.length);
    if (route.startsWith('/stage/')) assert.ok(stageIds.includes(route.slice('/stage/'.length)));
    else if (route.startsWith('/knowledge#')) assert.ok(termIds.includes(route.slice('/knowledge#'.length)));
    else assert.ok(['', '/journal', '/toolkit'].includes(route));
  }
});

test('tutorial search and stage entry links resolve to unique topics and lesson anchors', () => {
  const topicIds = OVERSEAS_TUTORIALS.map(topic => topic.id);
  assert.equal(new Set(topicIds).size, topicIds.length);
  const validRoutes = new Set<string>();
  const stageIds = OVERSEAS_STAGES.map(stage => stage.id);
  for (const topic of OVERSEAS_TUTORIALS) {
    validRoutes.add(tutorialPath(topic.id));
    const ids = topic.lessons.map(lesson => lesson.id);
    assert.equal(new Set(ids).size, ids.length, `${topic.id}: duplicate anchor`);
    for (const id of ids) {
      assert.match(id, /^[a-z][a-z0-9-]+$/);
      validRoutes.add(tutorialPath(topic.id, id));
    }
    for (const id of topic.stages) assert.ok(stageIds.includes(id), `missing stage: ${id}`);
    for (const lesson of topic.lessons) {
      for (const row of lesson.example.rows) assert.equal(row.length, lesson.example.columns.length, `broken table: ${lesson.id}`);
    }
  }
  for (const stageId of stageIds) assert.equal(OVERSEAS_TUTORIALS.filter(topic => topic.stages.includes(stageId)).length, 1);
  for (const item of OVERSEAS_TUTORIAL_SEARCH_ITEMS) assert.ok(validRoutes.has(item.href), `broken search result: ${item.href}`);
});

test('practice drafts preserve empty text and cannot mix lesson or topic keys', () => {
  const fallback = '# 我的练习';
  for (const raw of [null, '', '{broken', 'null', '42', '{}', '[]', '{"text":false}']) {
    assert.equal(parseTutorialNote(raw, fallback), fallback);
  }
  assert.equal(parseTutorialNote('{"text":""}', fallback), '');
  const text = '我的记录\n包含换行、$5 和 `示例`';
  assert.equal(parseTutorialNote(JSON.stringify({ text }), fallback), text);
  const keys = OVERSEAS_TUTORIALS.flatMap(topic => topic.lessons.map(lesson => tutorialNoteKey(topic.id, lesson.id)));
  assert.equal(keys.length, new Set(keys).size);
  assert.notEqual(tutorialNoteKey('demand', 'example'), tutorialNoteKey('product', 'example'));
});
