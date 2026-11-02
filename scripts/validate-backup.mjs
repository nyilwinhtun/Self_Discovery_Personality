import assert from 'node:assert/strict'
import {
  createBackupSnapshot,
  inspectBackupSnapshot,
  loadAppData,
  loadDraft,
  restoreBackupData,
  saveAssessment,
  saveDraft,
} from '../src/utils/storage.js'

const memory = new Map()
globalThis.window = {
  localStorage: {
    getItem: (key) => memory.has(key) ? memory.get(key) : null,
    setItem: (key, value) => memory.set(key, String(value)),
  },
}

const now = new Date().toISOString()
assert.equal(saveDraft({
  assessmentType: 'personality', level: 30, answers: { 1: 4, 2: 2 },
  skippedQuestionIds: [3], currentIndex: 4, updatedAt: now, status: 'in-progress',
}), true)
saveAssessment({
  id: 'history-local-1', assessmentType: 'careerInterest', level: 30,
  createdAt: now, answers: { 1: 4 }, scores: { openness: { score: 75 } },
})

const snapshot = createBackupSnapshot()
assert.equal(snapshot.format, 'self-discovery-backup')
assert.equal(snapshot.version, 1)
assert.equal(snapshot.summary.draftCount, 1)
assert.equal(snapshot.summary.historyCount, 1)
const inspected = inspectBackupSnapshot(JSON.parse(JSON.stringify(snapshot)))
assert.equal(inspected.valid, true)
assert.equal(inspected.summary.draftCount, 1)
assert.equal(inspected.data.drafts.personality['30'].answers[1], 4)

const invalidFormat = inspectBackupSnapshot({ ...snapshot, format: 'unknown-backup' })
assert.equal(invalidFormat.valid, false)
const invalidAnswer = structuredClone(snapshot)
invalidAnswer.data.drafts.personality['30'].answers[1] = 9
assert.equal(inspectBackupSnapshot(invalidAnswer).valid, false)

// Merge restores additional assessment modules without removing current personality data.
const additional = structuredClone(snapshot)
additional.data.drafts.careerInterest = {
  30: { assessmentType: 'careerInterest', level: 30, answers: { R1: 5 }, skippedQuestionIds: [], currentIndex: 1, updatedAt: now },
}
additional.data.history.push({ id: 'history-import-1', assessmentType: 'careerInterest', level: 30, createdAt: now, answers: { R1: 5 } })
const validAdditional = inspectBackupSnapshot(additional)
assert.equal(validAdditional.valid, true)
const mergeResult = restoreBackupData(validAdditional.data, 'merge')
assert.equal(mergeResult.success, true)
assert.ok(mergeResult.data.drafts.personality['30'])
assert.ok(mergeResult.data.drafts.careerInterest['30'])
assert.equal(mergeResult.data.history.length, 2)
assert.equal(loadDraft(30, 'personality').answers[1], 4)

// A newer backup draft wins when the same assessment draft exists in both places.
const newerDraftBackup = structuredClone(additional)
newerDraftBackup.data.drafts.personality['30'].answers[1] = 5
newerDraftBackup.data.drafts.personality['30'].updatedAt = new Date(Date.now() + 60_000).toISOString()
const newerInspected = inspectBackupSnapshot(newerDraftBackup)
assert.equal(restoreBackupData(newerInspected.data, 'merge').success, true)
assert.equal(loadDraft(30, 'personality').answers[1], 5)

// Replace mode intentionally replaces the existing local data with the selected backup.
const replacement = {
  drafts: { skills: { 10: { assessmentType: 'skills', level: 10, answers: { S1: 3 }, skippedQuestionIds: [], currentIndex: 0 } } },
  history: [{ id: 'replacement-history', assessmentType: 'skills', level: 10, createdAt: now }],
}
assert.equal(restoreBackupData(replacement, 'replace').success, true)
const afterReplace = loadAppData()
assert.deepEqual(Object.keys(afterReplace.drafts), ['skills'])
assert.equal(afterReplace.history.length, 1)
assert.equal(afterReplace.history[0].id, 'replacement-history')

console.log('Backup validation passed: versioned export, file validation, invalid-answer rejection, safe merge, latest-draft conflict resolution, history de-duplication, and explicit replace mode.')
