import {
  INNERCOMPASS_ANSWER_OPTIONS,
  INNERCOMPASS_DIMENSIONS,
  INNERCOMPASS_QUESTIONS_30,
} from '../data/innerCompassDraft.js'

/**
 * Provisional descriptive index for the original InnerCompass question draft.
 * It is not a norm-referenced score or a validated psychological scale.
 */
export function scoreInnerCompassDraft(answers) {
  const missing = INNERCOMPASS_QUESTIONS_30.filter((question) => {
    const value = Number(answers?.[question.id])
    return !Number.isInteger(value) || value < 1 || value > 5
  })

  if (missing.length) {
    return {
      complete: false,
      missingQuestionIds: missing.map((question) => question.id),
      dimensions: [],
    }
  }

  const dimensions = INNERCOMPASS_DIMENSIONS.map((dimension) => {
    const items = INNERCOMPASS_QUESTIONS_30.filter((question) => question.dimensionId === dimension.id)
    const scored = items.map((question) => {
      const raw = Number(answers[question.id])
      return question.reverse ? 6 - raw : raw
    })
    const average = scored.reduce((sum, value) => sum + value, 0) / scored.length
    const index = Math.round(((average - 1) / 4) * 100)
    return {
      id: dimension.id,
      code: dimension.code,
      name: dimension.name,
      average: Number(average.toFixed(2)),
      index,
      itemCount: items.length,
    }
  })

  return {
    complete: true,
    questionCount: INNERCOMPASS_QUESTIONS_30.length,
    answeredCount: INNERCOMPASS_QUESTIONS_30.length,
    scoringType: 'provisional-descriptive-index',
    dimensions,
  }
}

export function validateInnerCompassAnswers(answers) {
  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) return false
  return INNERCOMPASS_QUESTIONS_30.every((question) => {
    const value = Number(answers[question.id])
    return Number.isInteger(value) && INNERCOMPASS_ANSWER_OPTIONS.some((option) => option.value === value)
  })
}
