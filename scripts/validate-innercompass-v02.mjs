import assert from 'node:assert/strict'
import {
  INNERCOMPASS_V02_ANSWER_OPTIONS,
  INNERCOMPASS_V02_DIMENSIONS,
  INNERCOMPASS_V02_PUBLICATION_STATUS,
  INNERCOMPASS_V02_QUESTIONS_30,
  INNERCOMPASS_V02_REVERSE_IDS,
  INNERCOMPASS_V02_STATUS,
  INNERCOMPASS_V02_VERSION,
} from '../src/data/innerCompassDraftV02.js'
import {
  scoreInnerCompassV02,
  validateInnerCompassV02Answers,
} from '../src/utils/innerCompassV02Scoring.js'

assert.equal(INNERCOMPASS_V02_VERSION, 'innercompass-draft-0.2.0')
assert.equal(INNERCOMPASS_V02_STATUS, 'pilot-mode-not-validated')
assert.equal(INNERCOMPASS_V02_DIMENSIONS.length, 6)
assert.equal(INNERCOMPASS_V02_QUESTIONS_30.length, 30)
assert.equal(new Set(INNERCOMPASS_V02_QUESTIONS_30.map((q) => q.id)).size, 30)
assert.equal(new Set(INNERCOMPASS_V02_QUESTIONS_30.map((q) => q.text.trim())).size, 30)
assert.deepEqual(INNERCOMPASS_V02_ANSWER_OPTIONS.map((option) => option.value), [1, 2, 3, 4, 5])
assert.equal(INNERCOMPASS_V02_REVERSE_IDS.length, 6)

const dimensionIds = new Set(INNERCOMPASS_V02_DIMENSIONS.map((dimension) => dimension.id))
for (const dimension of INNERCOMPASS_V02_DIMENSIONS) {
  const questions = INNERCOMPASS_V02_QUESTIONS_30.filter((q) => q.dimensionId === dimension.id)
  assert.equal(questions.length, 5, `${dimension.id} must contain five questions`)
  assert.equal(dimension.themes.length, 5, `${dimension.id} must contain five original themes`)
  assert.deepEqual(questions.map((q) => q.themeIndex).sort(), [0, 1, 2, 3, 4])
}
for (const question of INNERCOMPASS_V02_QUESTIONS_30) {
  assert.ok(dimensionIds.has(question.dimensionId), `${question.id} references a known area`)
  assert.ok(question.text.trim().length >= 24, `${question.id} has meaningful wording`)
  assert.equal(typeof question.reverse, 'boolean')
}

assert.deepEqual(
  INNERCOMPASS_V02_REVERSE_IDS,
  ['icv02-04', 'icv02-10', 'icv02-14', 'icv02-19', 'icv02-25', 'icv02-29'],
)

const neutral = Object.fromEntries(INNERCOMPASS_V02_QUESTIONS_30.map((q) => [q.id, 3]))
const neutralResult = scoreInnerCompassV02(neutral)
assert.equal(neutralResult.complete, true)
assert.equal(neutralResult.dimensions.length, 6)
assert.ok(neutralResult.dimensions.every((area) => area.index === 50))

for (const dimension of INNERCOMPASS_V02_DIMENSIONS) {
  const aligned = Object.fromEntries(INNERCOMPASS_V02_QUESTIONS_30.map((q) => [
    q.id,
    q.dimensionId === dimension.id ? (q.reverse ? 1 : 5) : 3,
  ]))
  const result = scoreInnerCompassV02(aligned)
  const target = result.dimensions.find((area) => area.id === dimension.id)
  assert.equal(target.index, 100, `${dimension.id} reverse-key alignment is correct`)
}

const incomplete = scoreInnerCompassV02({})
assert.equal(incomplete.complete, false)
assert.equal(incomplete.missingQuestionIds.length, 30)
assert.equal(incomplete.dimensions.length, 0, 'Do not emit final area scores for incomplete answers')
assert.equal(validateInnerCompassV02Answers(neutral), true)
assert.equal(validateInnerCompassV02Answers({ ...neutral, 'icv02-01': 8 }), false)
assert.equal(validateInnerCompassV02Answers({ ...neutral, unknown: 3 }), false)
assert.equal(INNERCOMPASS_V02_PUBLICATION_STATUS.pilotModeEnabledInApp, true)
assert.equal(INNERCOMPASS_V02_PUBLICATION_STATUS.formalPublicReleaseApproved, false)
assert.equal(INNERCOMPASS_V02_PUBLICATION_STATUS.expertReviewed, false)
assert.equal(INNERCOMPASS_V02_PUBLICATION_STATUS.cognitiveInterviewCompleted, false)
assert.equal(INNERCOMPASS_V02_PUBLICATION_STATUS.pilotCompleted, false)
assert.equal(INNERCOMPASS_V02_PUBLICATION_STATUS.psychometricallyValidated, false)

console.log('InnerCompass V0.2 validation passed: 30 unique versioned items, six areas with five themes each, reverse scoring, missing-answer protection, provisional index behavior, and pilot-only release gates.')
