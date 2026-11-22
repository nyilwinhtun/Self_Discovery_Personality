import {
  INNERCOMPASS_V02_DIMENSIONS,
  INNERCOMPASS_V02_QUESTIONS_30,
  INNERCOMPASS_V02_QUESTIONS_60,
  INNERCOMPASS_V02_QUESTIONS_60_EXTRA,
  getInnerCompassQuestionsForLevel,
} from '../data/innerCompassDraftV02.js'

function resolveQuestionSet(answers, level = null) {
  if (Number(level) === 60) return INNERCOMPASS_V02_QUESTIONS_60
  if (Number(level) === 30) return INNERCOMPASS_V02_QUESTIONS_30
  const hasExtendedItem = answers && typeof answers === 'object' && !Array.isArray(answers)
    ? INNERCOMPASS_V02_QUESTIONS_60_EXTRA.some((question) => Object.prototype.hasOwnProperty.call(answers, question.id))
    : false
  return hasExtendedItem ? INNERCOMPASS_V02_QUESTIONS_60 : INNERCOMPASS_V02_QUESTIONS_30
}

export function validateInnerCompassV02Answers(answers, level = null) {
  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) return false
  const allowedQuestions = Number(level) === 30
    ? INNERCOMPASS_V02_QUESTIONS_30
    : INNERCOMPASS_V02_QUESTIONS_60
  return Object.entries(answers).every(([id, value]) => {
    const knownQuestion = allowedQuestions.some((question) => question.id === id)
    return knownQuestion && Number.isInteger(value) && value >= 1 && value <= 5
  })
}

export function scoreInnerCompassV02(answers, level = null) {
  const safeAnswers = answers && typeof answers === 'object' && !Array.isArray(answers)
    ? answers
    : {}
  const activeQuestions = level ? getInnerCompassQuestionsForLevel(level) : resolveQuestionSet(safeAnswers)
  const missingQuestionIds = activeQuestions
    .filter((question) => !Number.isInteger(safeAnswers[question.id]) || safeAnswers[question.id] < 1 || safeAnswers[question.id] > 5)
    .map((question) => question.id)

  if (missingQuestionIds.length > 0 || !validateInnerCompassV02Answers(safeAnswers, activeQuestions.length)) {
    return {
      complete: false,
      questionCount: activeQuestions.length,
      missingQuestionIds,
      dimensions: [],
      note: 'မေးခွန်းအားလုံး မဖြေဆိုရသေးသောကြောင့် အပြီးသတ်ရလဒ် မတွက်ချက်ရသေးပါ။',
    }
  }

  const dimensions = INNERCOMPASS_V02_DIMENSIONS.map((dimension) => {
    const questions = activeQuestions
      .filter((question) => question.dimensionId === dimension.id)
    const keyedScores = questions.map((question) => {
      const response = safeAnswers[question.id]
      return question.reverse ? 6 - response : response
    })
    const average = keyedScores.reduce((sum, value) => sum + value, 0) / keyedScores.length
    const index = Math.round(((average - 1) / 4) * 100)

    return {
      id: dimension.id,
      code: dimension.code,
      name: dimension.name,
      shortName: dimension.shortName,
      average: Number(average.toFixed(2)),
      index,
      itemCount: questions.length,
      interpretation: 'ဤအညွှန်းသည် သင့်အဖြေများကို သတ်မှတ်ထားသော စကေးအတွင်း ပြောင်းလဲဖော်ပြခြင်းသာဖြစ်ပြီး လူဦးရေစံနှုန်း သို့မဟုတ် ရောဂါရှာဖွေမှု မဟုတ်ပါ။',
    }
  })

  return {
    complete: true,
    questionCount: activeQuestions.length,
    missingQuestionIds: [],
    dimensions,
    note: 'မူကြမ်းအဆင့် ကိုယ်တိုင်ပြန်လည်သုံးသပ်မှု အညွှန်းသာဖြစ်သည်။ စိတ်ပညာဆိုင်ရာ အတည်ပြုရမှတ် မဟုတ်ပါ။',
  }
}
