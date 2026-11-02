import assert from 'node:assert/strict'
import { CAREER_ANSWER_OPTIONS, CAREER_QUESTIONS, RIASEC_BANK_VERSION, RIASEC_CATEGORIES } from '../src/data/careerQuestions.js'
import { buildCareerResult, getCareerScoreBand } from '../src/utils/careerScoring.js'
import { loadAppData, loadDraft, saveAssessment, saveDraft, createBackupSnapshot, inspectBackupSnapshot } from '../src/utils/storage.js'

assert.equal(CAREER_QUESTIONS.length, 30, 'Career Interest test must contain 30 questions')
assert.equal(RIASEC_CATEGORIES.length, 6, 'RIASEC must contain six interest areas')
assert.deepEqual(CAREER_ANSWER_OPTIONS.map((item) => item.value), [1, 2, 3, 4, 5])
assert.equal(new Set(CAREER_QUESTIONS.map((item) => item.id)).size, 30, 'Career question IDs must be unique')
assert.equal(new Set(CAREER_QUESTIONS.map((item) => item.text.trim())).size, 30, 'Career question wording must be unique')
for (const category of RIASEC_CATEGORIES) {
  const items = CAREER_QUESTIONS.filter((question) => question.categoryId === category.id)
  assert.equal(items.length, 5, `${category.id} must contain five questions`)
  assert.ok(items.every((item) => item.text.length > 25), `${category.id} question wording should be meaningful`)
}
assert.ok(CAREER_QUESTIONS.every((item) => RIASEC_CATEGORIES.some((category) => category.id === item.categoryId)))

const neutralAnswers = Object.fromEntries(CAREER_QUESTIONS.map((question) => [question.id, 3]))
const neutral = buildCareerResult(neutralAnswers)
for (const category of RIASEC_CATEGORIES) assert.equal(neutral.scores[category.id].score, 50, `${category.id} neutral score should be 50`)
assert.equal(neutral.code.length, 3)
assert.equal(getCareerScoreBand(75), 'စိတ်ဝင်စားမှု ပိုမိုမြင့်နေသည်')

const maxRAnswers = Object.fromEntries(CAREER_QUESTIONS.map((question) => [question.id, question.categoryId === 'R' ? 5 : 1]))
const maxR = buildCareerResult(maxRAnswers)
assert.equal(maxR.scores.R.score, 100)
assert.equal(maxR.scores.I.score, 0)
assert.equal(maxR.code[0], 'R', 'The highest interest score should lead the RIASEC code')

const memory = new Map()
globalThis.window = { localStorage: { getItem: (key) => memory.has(key) ? memory.get(key) : null, setItem: (key, value) => memory.set(key, String(value)) } }
const now = new Date().toISOString()
assert.equal(saveDraft({ assessmentType: 'personality', level: 30, answers: { 1: 4 }, skippedQuestionIds: [], currentIndex: 1, updatedAt: now }), true)
assert.equal(saveDraft({ assessmentType: 'careerInterest', questionBankVersion: RIASEC_BANK_VERSION, level: 30, answers: { R1: 5 }, skippedQuestionIds: ['R2'], currentIndex: 2, updatedAt: now }), true)
assert.equal(loadDraft(30, 'careerInterest').answers.R1, 5)
assert.equal(loadDraft(30, 'personality').answers[1], 4, 'Career draft must not overwrite personality draft')
saveAssessment({ id: 'career-result-1', assessmentType: 'careerInterest', level: 30, questionCount: 30, createdAt: now, answers: neutralAnswers, careerScores: neutral.scores, careerCode: neutral.code })
assert.equal(loadDraft(30, 'careerInterest'), null, 'Completing career test should clear only its own draft')
assert.ok(loadDraft(30, 'personality'), 'Completing career test must preserve personality draft')
const snapshot = createBackupSnapshot()
const inspected = inspectBackupSnapshot(JSON.parse(JSON.stringify(snapshot)))
assert.equal(inspected.valid, true, 'Backup must preserve Career data')
assert.ok(inspected.data.history.some((item) => item.assessmentType === 'careerInterest'))
assert.ok(inspected.data.drafts.personality?.['30'])

console.log('Career Interest validation passed: 30 unique questions, six balanced RIASEC areas, 5-point preference scale, scoring, RIASEC code, separate resumable draft, history, and JSON backup compatibility.')
