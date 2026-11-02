import { CAREER_QUESTIONS, RIASEC_CATEGORIES } from '../data/careerQuestions.js'

export function buildCareerResult(answers, questions = CAREER_QUESTIONS) {
  const scores = {}
  for (const category of RIASEC_CATEGORIES) {
    const items = questions.filter((question) => question.categoryId === category.id)
    const values = items.map((question) => Number(answers[question.id])).filter((value) => Number.isFinite(value) && value >= 1 && value <= 5)
    const average = values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0
    scores[category.id] = {
      score: values.length ? Math.round(((average - 1) / 4) * 100) : 0,
      average: Number(average.toFixed(2)),
      answered: values.length,
      total: items.length,
    }
  }
  const ranked = [...RIASEC_CATEGORIES].sort((a, b) => {
    const diff = scores[b.id].score - scores[a.id].score
    return diff || RIASEC_CATEGORIES.findIndex((item) => item.id === a.id) - RIASEC_CATEGORIES.findIndex((item) => item.id === b.id)
  })
  return {
    scores,
    rankedIds: ranked.map((item) => item.id),
    topCategories: ranked.slice(0, 3).map((item) => item.id),
    code: ranked.slice(0, 3).map((item) => item.id).join(''),
    topScoresAreClose: ranked.length > 1 && (scores[ranked[0].id].score - scores[ranked[1].id].score) <= 5,
  }
}

export function getCareerScoreBand(score) {
  if (score >= 70) return 'စိတ်ဝင်စားမှု ပိုမိုမြင့်နေသည်'
  if (score >= 40) return 'အလယ်အလတ် စိတ်ဝင်စားမှု'
  return 'စိတ်ဝင်စားမှု နည်းနေသည်'
}
