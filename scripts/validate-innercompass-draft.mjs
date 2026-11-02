import assert from 'node:assert/strict'
import {
  INNERCOMPASS_ANSWER_OPTIONS,
  INNERCOMPASS_DIMENSIONS,
  INNERCOMPASS_DRAFT_VERSION,
  INNERCOMPASS_LEVEL_PLAN,
  INNERCOMPASS_QUESTIONS_30,
  INNERCOMPASS_REVERSE_IDS,
} from '../src/data/innerCompassDraft.js'
import { scoreInnerCompassDraft, validateInnerCompassAnswers } from '../src/utils/innerCompassDraftScoring.js'

assert.equal(INNERCOMPASS_DRAFT_VERSION, 'innercompass-draft-0.1.0')
assert.equal(INNERCOMPASS_DIMENSIONS.length, 6, 'InnerCompass must define six original reflection dimensions')
assert.equal(INNERCOMPASS_QUESTIONS_30.length, 30, 'Initial InnerCompass draft must contain 30 questions')
assert.equal(new Set(INNERCOMPASS_QUESTIONS_30.map((q) => q.id)).size, 30, 'Question IDs must be unique')
assert.equal(new Set(INNERCOMPASS_QUESTIONS_30.map((q) => q.text.trim())).size, 30, 'Question wording must be unique')
assert.deepEqual(INNERCOMPASS_ANSWER_OPTIONS.map((option) => option.value), [1, 2, 3, 4, 5])
assert.deepEqual(INNERCOMPASS_LEVEL_PLAN.map((level) => level.value), [30, 60, 120])

const dimensionIds = new Set(INNERCOMPASS_DIMENSIONS.map((item) => item.id))
for (const dimension of INNERCOMPASS_DIMENSIONS) {
  const questions = INNERCOMPASS_QUESTIONS_30.filter((item) => item.dimensionId === dimension.id)
  assert.equal(questions.length, 5, `${dimension.id} must have five initial questions`)
  assert.equal(dimension.themes.length, 5, `${dimension.id} must define five original themes`)
  assert.deepEqual(questions.map((item) => item.themeIndex).sort(), [0, 1, 2, 3, 4])
  assert.ok(dimension.name.trim().length >= 8, `${dimension.id} needs a clear Burmese label`)
  assert.ok(dimension.description.trim().length >= 30, `${dimension.id} needs a useful description`)
}

for (const question of INNERCOMPASS_QUESTIONS_30) {
  assert.ok(dimensionIds.has(question.dimensionId), `${question.id} references an unknown dimension`)
  assert.ok(question.text.trim().length >= 20, `${question.id} is too short`)
  assert.equal(typeof question.reverse, 'boolean')
}
assert.equal(INNERCOMPASS_REVERSE_IDS.length, 6, 'Draft should contain six reverse-keyed items for review')

// All neutral responses should return a middle descriptive index.
const neutralAnswers = Object.fromEntries(INNERCOMPASS_QUESTIONS_30.map((question) => [question.id, 3]))
const neutralResult = scoreInnerCompassDraft(neutralAnswers)
assert.equal(neutralResult.complete, true)
assert.equal(neutralResult.dimensions.length, 6)
assert.ok(neutralResult.dimensions.every((item) => item.index === 50))

// Reverse scoring is checked dimension-by-dimension: agree with positive items,
// disagree with reverse-keyed items -> 100 on this provisional index.
for (const dimension of INNERCOMPASS_DIMENSIONS) {
  const answers = Object.fromEntries(INNERCOMPASS_QUESTIONS_30.map((question) => [
    question.id,
    question.dimensionId === dimension.id ? (question.reverse ? 1 : 5) : 3,
  ]))
  const result = scoreInnerCompassDraft(answers)
  const score = result.dimensions.find((item) => item.id === dimension.id)
  assert.equal(score.index, 100, `${dimension.id} reverse scoring should be positive-key aligned`)
}

const missingResult = scoreInnerCompassDraft({})
assert.equal(missingResult.complete, false)
assert.equal(missingResult.missingQuestionIds.length, 30)
assert.equal(validateInnerCompassAnswers(neutralAnswers), true)
assert.equal(validateInnerCompassAnswers({ ...neutralAnswers, ic01: 9 }), false)

console.log('InnerCompass draft validation passed: 30 unique original prompts, six dimensions with five themes each, balanced 1–5 scale, reverse scoring, 30/60/120 expansion plan, and provisional index behavior.')
