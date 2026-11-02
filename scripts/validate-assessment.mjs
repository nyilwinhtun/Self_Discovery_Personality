import assert from 'node:assert/strict'
import { QUESTIONS_30, QUESTIONS_60, QUESTIONS_120, QUESTION_BANK_VERSION, TRAITS, FACETS, getQuestionsForLevel } from '../src/data/questions.js'
import { buildResult, getPersonalityProfile, getScoreBand } from '../src/utils/scoring.js'
import { loadAppData, loadDraft, saveDraft } from '../src/utils/storage.js'

const levels = [
  [30, QUESTIONS_30],
  [60, QUESTIONS_60],
  [120, QUESTIONS_120],
]

for (const [level, questions] of levels) {
  assert.equal(questions.length, level, `${level}-question set length`)
  assert.ok(questions.every((question) => typeof question.text === 'string' && question.text.trim().length > 0), `${level}-question set must contain readable question text`)
  assert.equal(new Set(questions.map((question) => question.text.trim())).size, level, `${level}-question wording must not contain exact duplicates`)
  assert.equal(getQuestionsForLevel(level).length, level, `${level}-question selector`)
  assert.equal(new Set(questions.map((question) => question.id)).size, level, `${level}-question IDs must be unique`)
  for (const trait of TRAITS) {
    assert.equal(questions.filter((question) => question.trait === trait.id).length, level / 5, `${trait.id} should have ${level / 5} questions in ${level}-question set`)
  }
}

// The deepest version contains 30 custom, exploratory topic clusters.
assert.equal(FACETS.length, 30, 'There should be 6 topic clusters under each of the 5 broad traits')
assert.equal(new Set(FACETS.map((facet) => facet.id)).size, 30, 'Facet IDs must be unique')
const allFacetQuestionIds = FACETS.flatMap((facet) => {
  const items = QUESTIONS_120.filter((question) => question.facetId === facet.id)
  assert.equal(items.length, 4, `${facet.id} must contain exactly four questions in the 120-question set`)
  assert.ok(items.every((question) => question.trait === facet.traitId), `${facet.id} must only include questions from its parent trait`)
  return items.map((question) => question.id)
})
assert.equal(allFacetQuestionIds.length, 120, 'All 120 questions must belong to one topic cluster')
assert.equal(new Set(allFacetQuestionIds).size, 120, 'A question cannot belong to more than one topic cluster')
assert.deepEqual(QUESTIONS_60.map((question) => question.id), QUESTIONS_120.slice(0, 60).map((question) => question.id), 'The existing 60-question order must remain stable for saved drafts')
assert.deepEqual(QUESTIONS_30.map((question) => question.id), QUESTIONS_120.slice(0, 30).map((question) => question.id), 'The existing 30-question order must remain stable for saved drafts')
assert.ok(QUESTIONS_120.every((question) => question.facetId), 'Every question must have a topic cluster')

const neutralAnswers = Object.fromEntries(QUESTIONS_120.map((question) => [question.id, 3]))
const neutral = buildResult(neutralAnswers, QUESTIONS_120)
for (const trait of TRAITS) assert.equal(neutral.scores[trait.id].score, 50, `${trait.id} neutral score`)
assert.equal(Object.keys(neutral.facetScores).length, 30, 'The deep result should contain all 30 topic-cluster scores')
assert.equal(getScoreBand(20), 'အညွှန်းရမှတ် နိမ့်')
assert.equal(getScoreBand(50), 'အညွှန်းရမှတ် အလယ်အလတ်')
assert.equal(getScoreBand(80), 'အညွှန်းရမှတ် မြင့်')
assert.equal(getPersonalityProfile(neutral.scores).topScoresAreClose, true, 'Tied or near-tied top scores should not be presented as a distinct dominant type')
for (const facet of FACETS) assert.equal(neutral.facetScores[facet.id].score, 50, `${facet.id} neutral score`)

const maxScoringAnswers = Object.fromEntries(QUESTIONS_120.map((question) => [question.id, question.reverse ? 1 : 5]))
const maximum = buildResult(maxScoringAnswers, QUESTIONS_120)
for (const trait of TRAITS) assert.equal(maximum.scores[trait.id].score, 100, `${trait.id} maximum score`)
for (const facet of FACETS) assert.equal(maximum.facetScores[facet.id].score, 100, `${facet.id} maximum score`)
assert.equal(getPersonalityProfile(maximum.scores).topScoresAreClose, true, 'Equal maximum trait scores should be presented as near-tied')
const unevenAnswers = Object.fromEntries(QUESTIONS_120.map((question) => [question.id, question.reverse ? 5 : 1]))
for (const question of QUESTIONS_120.filter((item) => item.trait === 'openness')) unevenAnswers[question.id] = question.reverse ? 1 : 5
const unevenScores = buildResult(unevenAnswers, QUESTIONS_120).scores
assert.equal(getPersonalityProfile(unevenScores).topScoresAreClose, false, 'A clearly separated top score should be presented as the leading trait')

// Question 57 is phrased positively: agreeing that a person prefers to plan
// before starting a task should increase, not decrease, conscientiousness.
const planningQuestion = QUESTIONS_120.find((question) => question.id === 57)
assert.equal(Boolean(planningQuestion.reverse), false, 'Question 57 must be positively keyed')
const q57Answers = Object.fromEntries(QUESTIONS_120.map((question) => [question.id, 3]))
q57Answers[57] = 5
const q57Result = buildResult(q57Answers, QUESTIONS_120)
assert.ok(q57Result.scores.conscientiousness.score > 50, 'Agreeing with positively worded planning item 57 should increase conscientiousness')

// Exercise resumable draft storage using a minimal LocalStorage mock.
const memory = new Map()
globalThis.window = {
  localStorage: {
    getItem: (key) => memory.has(key) ? memory.get(key) : null,
    setItem: (key, value) => memory.set(key, String(value)),
  },
}
const draft30 = { assessmentType: 'personality', questionBankVersion: QUESTION_BANK_VERSION, level: 30, answers: { 1: 4 }, skippedQuestionIds: [2], currentIndex: 4, updatedAt: new Date().toISOString() }
const draft60 = { assessmentType: 'personality', questionBankVersion: QUESTION_BANK_VERSION, level: 60, answers: { 1: 3 }, skippedQuestionIds: [], currentIndex: 7, updatedAt: new Date().toISOString() }
assert.equal(saveDraft(draft30), true)
assert.equal(saveDraft(draft60), true)
assert.deepEqual(loadDraft(30).answers, { 1: 4 })
assert.equal(loadDraft(30).questionBankVersion, QUESTION_BANK_VERSION)
assert.equal(loadDraft(60).currentIndex, 7)
assert.ok(loadAppData().drafts.personality['30'])
assert.ok(loadAppData().drafts.personality['60'])

// Confirm migration of the previous single-draft format and old sensitivity score direction.
memory.set('self-discovery-personality-v1', JSON.stringify({
  draft: { answers: { 25: 4 }, currentIndex: 5, updatedAt: new Date().toISOString() },
  history: [{ id: 'old-result', createdAt: new Date().toISOString(), scores: { emotionalSensitivity: { score: 80, average: 4.2, answered: 6 } } }],
}))
const migrated = loadAppData()
assert.equal(migrated.drafts.personality['30'].currentIndex, 5)
assert.equal(migrated.drafts.personality['30'].answers[25], 4)
assert.equal(migrated.history[0].scores.emotionalStability.score, 20)

console.log('Assessment validation passed: 30 / 60 / 120 questions, unique wording, 30 four-item topic clusters, reverse scoring, score bands, tied-score interpretation, and resumable drafts.')
