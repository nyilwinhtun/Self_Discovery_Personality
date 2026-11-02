import assert from 'node:assert/strict'
import {
  INNERCOMPASS_V02_DIMENSIONS,
  INNERCOMPASS_V02_QUESTIONS_30,
} from '../src/data/innerCompassDraftV02.js'
import {
  scoreInnerCompassV02,
  validateInnerCompassV02Answers,
} from '../src/utils/innerCompassV02Scoring.js'

// Minimal in-memory localStorage shim for testing the existing storage module.
const memory = new Map()
globalThis.window = {
  localStorage: {
    getItem: (key) => memory.has(key) ? memory.get(key) : null,
    setItem: (key, value) => memory.set(key, String(value)),
    removeItem: (key) => memory.delete(key),
  },
}

const storage = await import('../src/utils/storage.js')

const allNeutral = Object.fromEntries(INNERCOMPASS_V02_QUESTIONS_30.map((question) => [question.id, 3]))
assert.equal(validateInnerCompassV02Answers(allNeutral), true)
const neutralResult = scoreInnerCompassV02(allNeutral)
assert.equal(neutralResult.complete, true)
assert.equal(neutralResult.dimensions.length, 6)
assert.ok(neutralResult.dimensions.every((dimension) => dimension.index === 50))

for (const dimension of INNERCOMPASS_V02_DIMENSIONS) {
  const dimensionAnswers = Object.fromEntries(INNERCOMPASS_V02_QUESTIONS_30.map((question) => [
    question.id,
    question.dimensionId === dimension.id ? (question.reverse ? 1 : 5) : 3,
  ]))
  const result = scoreInnerCompassV02(dimensionAnswers)
  assert.equal(result.dimensions.find((item) => item.id === dimension.id).index, 100)
}

const incomplete = { ...allNeutral }
delete incomplete[INNERCOMPASS_V02_QUESTIONS_30[0].id]
assert.equal(scoreInnerCompassV02(incomplete).complete, false)
assert.equal(validateInnerCompassV02Answers({ 'not-a-question': 4 }), false)

// Make sure the new assessment uses its own storage namespace and leaves old data intact.
assert.equal(storage.saveDraft({
  assessmentType: 'personality', level: 30, answers: { 'legacy-personality-q1': 4 },
  skippedQuestionIds: [], currentIndex: 1, startedAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:10:00.000Z', status: 'in-progress',
}), true)
assert.equal(storage.saveDraft({
  assessmentType: 'innerCompass', level: 30, questionBankVersion: 'innercompass-draft-0.2.0',
  answers: { [INNERCOMPASS_V02_QUESTIONS_30[0].id]: 4, [INNERCOMPASS_V02_QUESTIONS_30[1].id]: 2 },
  skippedQuestionIds: [INNERCOMPASS_V02_QUESTIONS_30[2].id], currentIndex: 3,
  startedAt: '2026-10-31T00:00:00.000Z', updatedAt: '2026-10-31T00:10:00.000Z', status: 'in-progress',
}), true)
assert.equal(storage.loadDraft(30, 'personality').answers['legacy-personality-q1'], 4)
assert.equal(storage.loadDraft(30, 'innerCompass').currentIndex, 3)

const snapshot = storage.createBackupSnapshot()
const inspected = storage.inspectBackupSnapshot(snapshot)
assert.equal(inspected.valid, true)
assert.equal(inspected.summary.draftCount, 2)
assert.equal(inspected.data.drafts.innerCompass['30'].answers[INNERCOMPASS_V02_QUESTIONS_30[0].id], 4)

// Restoring a backup merges data while retaining current unrelated assessment drafts.
assert.equal(storage.saveDraft({
  assessmentType: 'careerInterest', level: 30, answers: { 'career-item-1': 5 },
  skippedQuestionIds: [], currentIndex: 1, startedAt: '2026-10-31T00:20:00.000Z',
  updatedAt: '2026-10-31T00:20:00.000Z', status: 'in-progress',
}), true)
const restored = storage.restoreBackupData(inspected.data, 'merge')
assert.equal(restored.success, true)
assert.equal(restored.data.drafts.personality['30'].answers['legacy-personality-q1'], 4)
assert.equal(restored.data.drafts.innerCompass['30'].currentIndex, 3)
assert.equal(restored.data.drafts.careerInterest['30'].answers['career-item-1'], 5)

const completeRecord = {
  id: 'innercompass-test-record-1',
  assessmentType: 'innerCompass',
  questionBankVersion: 'innercompass-draft-0.2.0',
  level: 30,
  questionCount: 30,
  createdAt: '2026-10-31T01:00:00.000Z',
  answers: allNeutral,
  scores: Object.fromEntries(neutralResult.dimensions.map((dimension) => [dimension.id, { score: dimension.index }])),
  dimensions: neutralResult.dimensions,
}
const history = storage.saveAssessment(completeRecord)
assert.equal(history[0].assessmentType, 'innerCompass')
assert.equal(storage.loadDraft(30, 'innerCompass'), null)
assert.equal(storage.loadDraft(30, 'personality').answers['legacy-personality-q1'], 4)
assert.equal(storage.loadDraft(30, 'careerInterest').answers['career-item-1'], 5)

const finalSnapshot = storage.createBackupSnapshot()
const finalInspection = storage.inspectBackupSnapshot(finalSnapshot)
assert.equal(finalInspection.valid, true)
assert.ok(finalInspection.data.history.some((record) => record.id === completeRecord.id))

console.log('InnerCompass pilot flow validation passed: scoring, reverse items, missing-answer guard, separate draft storage, JSON backup/restore merge, history save, and draft cleanup.')
