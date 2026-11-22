import assert from 'node:assert/strict'
import { downloadTextFile } from '../src/utils/download.js'
import {
  clearDraft,
  clearHistoryWithStatus,
  createBackupSnapshot,
  deleteAssessmentWithStatus,
  inspectBackupSnapshot,
  loadAppData,
  loadDraft,
  MAX_HISTORY_ENTRIES,
  restoreBackupData,
  saveAssessment,
  saveAssessmentWithStatus,
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

// P1-C1: saveAssessment must retain >50 records up to MAX_HISTORY_ENTRIES (500).
assert.equal(MAX_HISTORY_ENTRIES, 500)
memory.clear()
for (let i = 1; i <= 55; i += 1) {
  saveAssessment({
    id: `history-cap-test-${i}`,
    assessmentType: 'personality',
    level: 30,
    createdAt: new Date(Date.now() + i * 1000).toISOString(),
    answers: { 1: 3 },
  })
}
const after55 = loadAppData()
assert.equal(after55.history.length, 55, 'Expected all 55 history records to be preserved without 50-record truncation')
assert.equal(after55.history[0].id, 'history-cap-test-55')
assert.equal(after55.history[54].id, 'history-cap-test-1')

for (let i = 56; i <= 505; i += 1) {
  saveAssessment({
    id: `history-cap-test-${i}`,
    assessmentType: 'personality',
    level: 30,
    createdAt: new Date(Date.now() + i * 1000).toISOString(),
    answers: { 1: 3 },
  })
}
const after505 = loadAppData()
assert.equal(after505.history.length, MAX_HISTORY_ENTRIES, 'Expected history to cap at MAX_HISTORY_ENTRIES (500)')
assert.equal(after505.history[0].id, 'history-cap-test-505')
assert.equal(after505.history[499].id, 'history-cap-test-6')

// P1-C2: LocalStorage write failure detection (QuotaExceededError / SecurityError).
const originalSetItem = globalThis.window.localStorage.setItem
const originalWarn = console.warn
console.warn = () => {}
try {
  globalThis.window.localStorage.setItem = () => {
    const err = new Error('QuotaExceededError')
    err.name = 'QuotaExceededError'
    throw err
  }
  assert.equal(saveDraft({ assessmentType: 'personality', level: 30, answers: { 1: 2 }, skippedQuestionIds: [], currentIndex: 0 }), false)
  assert.equal(clearDraft(30, 'personality'), false)
  assert.equal(saveAssessmentWithStatus({ id: 'fail-write-1', assessmentType: 'personality', level: 30, createdAt: now }).ok, false)
  assert.equal(deleteAssessmentWithStatus('history-cap-test-505').ok, false)
  assert.equal(clearHistoryWithStatus().ok, false)
  assert.equal(restoreBackupData(replacement, 'replace').success, false)

  globalThis.window.localStorage.setItem = () => {
    const err = new Error('SecurityError')
    err.name = 'SecurityError'
    throw err
  }
  assert.equal(saveDraft({ assessmentType: 'personality', level: 30, answers: { 1: 2 }, skippedQuestionIds: [], currentIndex: 0 }), false)
  assert.equal(saveAssessmentWithStatus({ id: 'fail-write-2', assessmentType: 'personality', level: 30, createdAt: now }).ok, false)
} finally {
  globalThis.window.localStorage.setItem = originalSetItem
  console.warn = originalWarn
}
assert.equal(saveAssessmentWithStatus({ id: 'recover-write-1', assessmentType: 'personality', level: 30, createdAt: now }).ok, true)

// P1-H5: TXT download helper attaches anchor to DOM, clicks, removes, and defers URL revocation.
const appended = []
const removed = []
let clicked = false
let revokedUrl = null
let scheduledRevoke = null
const originalDocument = globalThis.document
const originalCreateObjectURL = URL.createObjectURL
const originalRevokeObjectURL = URL.revokeObjectURL
const originalSetTimeout = globalThis.window.setTimeout

try {
  globalThis.document = {
    createElement: (tag) => ({
      tagName: tag.toUpperCase(),
      style: {},
      click: () => { clicked = true },
      remove: () => { removed.push('removed') },
    }),
    body: {
      appendChild: (node) => { appended.push(node) },
    },
  }
  URL.createObjectURL = () => 'blob:mock-txt-url'
  URL.revokeObjectURL = (url) => { revokedUrl = url }
  globalThis.window.setTimeout = (fn, delay) => {
    scheduledRevoke = { fn, delay }
    return 1
  }

  downloadTextFile('sample-report.txt', 'မြန်မာစာ အစီရင်ခံစာ')
  assert.equal(appended.length, 1)
  assert.equal(appended[0].download, 'sample-report.txt')
  assert.equal(appended[0].href, 'blob:mock-txt-url')
  assert.equal(clicked, true)
  assert.equal(removed.length, 1)
  assert.equal(revokedUrl, null, 'Object URL must not be revoked synchronously before download starts')
  assert.ok(scheduledRevoke && scheduledRevoke.delay >= 500)
  scheduledRevoke.fn()
  assert.equal(revokedUrl, 'blob:mock-txt-url')
} finally {
  globalThis.document = originalDocument
  URL.createObjectURL = originalCreateObjectURL
  URL.revokeObjectURL = originalRevokeObjectURL
  globalThis.window.setTimeout = originalSetTimeout
}

console.log('Backup validation passed: versioned export, file validation, invalid-answer rejection, safe merge, latest-draft conflict resolution, history de-duplication, 500-entry retention, write-failure detection, TXT download helper, and explicit replace mode.')
