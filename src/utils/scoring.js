import { FACETS, TRAITS } from '../data/questions.js'

function scoreItems(answers, items) {
  const values = items.map((question) => {
    const selected = Number(answers[question.id])
    if (!Number.isFinite(selected) || selected < 1 || selected > 5) return null
    return question.reverse ? 6 - selected : selected
  }).filter((value) => value !== null)

  const average = values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0
  const score = values.length ? Math.round(((average - 1) / 4) * 100) : 0
  return {
    score,
    average: Number(average.toFixed(2)),
    answered: values.length,
    total: items.length,
  }
}

export function calculateScores(answers, questions) {
  return TRAITS.reduce((result, trait) => {
    const items = questions.filter((question) => question.trait === trait.id)
    result[trait.id] = scoreItems(answers, items)
    return result
  }, {})
}

export function calculateFacetScores(answers, questions) {
  const includedIds = new Set(questions.map((question) => question.id))
  const availableQuestions = questions.filter((question) => question.facetId)

  return FACETS.reduce((result, facet) => {
    const items = availableQuestions.filter((question) => question.facetId === facet.id)
    if (items.length === 0) return result
    result[facet.id] = {
      ...scoreItems(answers, items),
      traitId: facet.traitId,
      facetId: facet.id,
      name: facet.name,
      description: facet.description,
      questionIds: items.map((question) => question.id).filter((id) => includedIds.has(id)),
    }
    return result
  }, {})
}

export function getScoreBand(score) {
  // These are descriptive bands on this questionnaire's 0–100 index, not
  // percentiles or comparisons against a population norm.
  if (score <= 39) return 'အညွှန်းရမှတ် နိမ့်'
  if (score <= 60) return 'အညွှန်းရမှတ် အလယ်အလတ်'
  return 'အညွှန်းရမှတ် မြင့်'
}

const PROFILE_NAMES = {
  'openness+conscientiousness': 'စူးစမ်းတတ်ပြီး စနစ်တကျလုပ်ဆောင်သူ',
  'conscientiousness+openness': 'စနစ်တကျလုပ်ဆောင်ပြီး စူးစမ်းတတ်သူ',
  'openness+extraversion': 'အတွေးသစ်ဖန်တီးပြီး တက်ကြွသူ',
  'extraversion+openness': 'တက်ကြွပြီး စူးစမ်းတတ်သူ',
  'openness+agreeableness': 'စူးစမ်းတတ်ပြီး စာနာနားလည်သူ',
  'agreeableness+openness': 'စာနာတတ်ပြီး အတွေးသစ်ကို လက်ခံသူ',
  'openness+emotionalStability': 'စူးစမ်းတတ်ပြီး စိတ်တည်ငြိမ်သူ',
  'emotionalStability+openness': 'စိတ်တည်ငြိမ်ပြီး စူးစမ်းတတ်သူ',
  'conscientiousness+extraversion': 'တာဝန်ယူတတ်ပြီး တက်ကြွသူ',
  'extraversion+conscientiousness': 'တက်ကြွပြီး စနစ်တကျလုပ်ဆောင်သူ',
  'conscientiousness+agreeableness': 'တာဝန်ယူတတ်ပြီး ပူးပေါင်းဆောင်ရွက်သူ',
  'agreeableness+conscientiousness': 'စာနာတတ်ပြီး ယုံကြည်အားထားရသူ',
  'conscientiousness+emotionalStability': 'တာဝန်ယူတတ်ပြီး စိတ်တည်ငြိမ်သူ',
  'emotionalStability+conscientiousness': 'စိတ်တည်ငြိမ်ပြီး တာဝန်ယူတတ်သူ',
  'extraversion+agreeableness': 'လူမှုဆက်ဆံရေးကောင်းပြီး စာနာတတ်သူ',
  'agreeableness+extraversion': 'စာနာတတ်ပြီး လူမှုဆက်ဆံရေးကို နှစ်သက်သူ',
  'extraversion+emotionalStability': 'တက်ကြွပြီး စိတ်တည်ငြိမ်သူ',
  'emotionalStability+extraversion': 'စိတ်တည်ငြိမ်ပြီး လူမှုဆက်ဆံရေးကို နှစ်သက်သူ',
  'agreeableness+emotionalStability': 'စာနာတတ်ပြီး စိတ်တည်ငြိမ်သူ',
  'emotionalStability+agreeableness': 'စိတ်တည်ငြိမ်ပြီး နားလည်ပေးတတ်သူ',
}

export function getPersonalityProfile(scores) {
  const ranked = TRAITS
    .map((trait) => ({ ...trait, score: scores[trait.id]?.score ?? 0 }))
    .sort((a, b) => b.score - a.score)
  const first = ranked[0]
  const second = ranked[1]
  const key = `${first.id}+${second.id}`
  const scoreGap = Math.abs(first.score - second.score)
  const topScoresAreClose = scoreGap <= 5
  return {
    // Avoid implying that a tiny score difference creates a definite type.
    title: topScoresAreClose
      ? `${first.name} နှင့် ${second.name} ရမှတ်နီးစပ်သူ`
      : PROFILE_NAMES[key] || `${first.name} အားကောင်းသူ`,
    primary: first,
    secondary: second,
    ranked,
    scoreGap,
    topScoresAreClose,
  }
}

export function buildResult(answers, questions) {
  const scores = calculateScores(answers, questions)
  const profile = getPersonalityProfile(scores)
  const facetScores = calculateFacetScores(answers, questions)
  return { scores, profile, facetScores }
}
