import assert from 'node:assert/strict'
import {
  INNERCOMPASS_V03_ANSWER_OPTIONS,
  INNERCOMPASS_V03_DIMENSIONS,
  INNERCOMPASS_V03_PUBLICATION_STATUS,
  INNERCOMPASS_V03_QUESTIONS_30,
  INNERCOMPASS_V03_REVERSE_IDS,
  INNERCOMPASS_V03_STATUS,
  INNERCOMPASS_V03_VERSION,
} from '../src/data/innerCompassDraftV03.js'

assert.equal(INNERCOMPASS_V03_VERSION, 'innercompass-draft-0.3.0')
assert.equal(INNERCOMPASS_V03_STATUS, 'internal-review-not-active')
assert.equal(INNERCOMPASS_V03_DIMENSIONS.length, 6)
assert.equal(INNERCOMPASS_V03_QUESTIONS_30.length, 30)
assert.equal(new Set(INNERCOMPASS_V03_QUESTIONS_30.map((q) => q.id)).size, 30)
assert.equal(new Set(INNERCOMPASS_V03_QUESTIONS_30.map((q) => q.text.trim())).size, 30)
assert.deepEqual(INNERCOMPASS_V03_ANSWER_OPTIONS.map((option) => option.value), [1, 2, 3, 4, 5])
assert.equal(INNERCOMPASS_V03_REVERSE_IDS.length, 6)

const dimensionIds = new Set(INNERCOMPASS_V03_DIMENSIONS.map((dimension) => dimension.id))
for (const dimension of INNERCOMPASS_V03_DIMENSIONS) {
  const questions = INNERCOMPASS_V03_QUESTIONS_30.filter((q) => q.dimensionId === dimension.id)
  assert.equal(questions.length, 5, `${dimension.id} must contain five questions`)
  assert.equal(dimension.themes.length, 5, `${dimension.id} must contain five themes`)
  assert.deepEqual(questions.map((q) => q.themeIndex).sort(), [0, 1, 2, 3, 4])
}
for (const question of INNERCOMPASS_V03_QUESTIONS_30) {
  assert.ok(dimensionIds.has(question.dimensionId), `${question.id} references a known dimension`)
  assert.ok(question.text.trim().length >= 16, `${question.id} has meaningful wording`)
  assert.ok(question.text.trim().length <= 100, `${question.id} is concise enough for review`)
  assert.equal(typeof question.reverse, 'boolean')
  assert.ok(question.id.startsWith('icv03-'), 'V0.3 IDs must not collide with archived drafts')
}

assert.deepEqual(
  INNERCOMPASS_V03_REVERSE_IDS,
  ['icv03-04', 'icv03-10', 'icv03-14', 'icv03-19', 'icv03-25', 'icv03-29'],
)
assert.equal(INNERCOMPASS_V03_PUBLICATION_STATUS.pilotModeEnabledInApp, false)
assert.equal(INNERCOMPASS_V03_PUBLICATION_STATUS.formalPublicReleaseApproved, false)
assert.equal(INNERCOMPASS_V03_PUBLICATION_STATUS.editorReviewed, false)
assert.equal(INNERCOMPASS_V03_PUBLICATION_STATUS.expertReviewed, false)
assert.equal(INNERCOMPASS_V03_PUBLICATION_STATUS.cognitiveInterviewCompleted, false)
assert.equal(INNERCOMPASS_V03_PUBLICATION_STATUS.pilotCompleted, false)
assert.equal(INNERCOMPASS_V03_PUBLICATION_STATUS.psychometricallyValidated, false)

console.log('InnerCompass V0.3 draft validation passed: 30 unique concise items, six dimensions with five themes each, versioned IDs, six reverse-keyed items, and release gates remain closed.')
