import {
  INNERCOMPASS_V02_DIMENSIONS,
  INNERCOMPASS_V02_QUESTIONS_30,
} from '../data/innerCompassDraftV02.js'

export function validateInnerCompassV02Answers(answers) {
  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) return false
  return Object.entries(answers).every(([id, value]) => {
    const knownQuestion = INNERCOMPASS_V02_QUESTIONS_30.some((question) => question.id === id)
    return knownQuestion && Number.isInteger(value) && value >= 1 && value <= 5
  })
}

export function scoreInnerCompassV02(answers) {
  const safeAnswers = answers && typeof answers === 'object' && !Array.isArray(answers)
    ? answers
    : {}
  const missingQuestionIds = INNERCOMPASS_V02_QUESTIONS_30
    .filter((question) => !Number.isInteger(safeAnswers[question.id]) || safeAnswers[question.id] < 1 || safeAnswers[question.id] > 5)
    .map((question) => question.id)

  if (missingQuestionIds.length > 0 || !validateInnerCompassV02Answers(safeAnswers)) {
    return {
      complete: false,
      missingQuestionIds,
      dimensions: [],
      note: 'မေးခွန်းအားလုံး မဖြေဆိုရသေးသောကြောင့် အပြီးသတ်ရလဒ် မတွက်ချက်ရသေးပါ။',
    }
  }

  const dimensions = INNERCOMPASS_V02_DIMENSIONS.map((dimension) => {
    const questions = INNERCOMPASS_V02_QUESTIONS_30
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
    missingQuestionIds: [],
    dimensions,
    note: 'မူကြမ်းအဆင့် ကိုယ်တိုင်ပြန်လည်သုံးသပ်မှု အညွှန်းသာဖြစ်သည်။ စိတ်ပညာဆိုင်ရာ အတည်ပြုရမှတ် မဟုတ်ပါ။',
  }
}
