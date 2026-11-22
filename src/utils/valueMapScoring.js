import {
  VALUEMAP_DIMENSIONS,
  VALUEMAP_QUESTIONS_20,
  VALUEMAP_QUESTIONS_40,
  VALUEMAP_QUESTIONS_40_EXTRA,
  getValueMapQuestionsForLevel,
} from '../data/valueMapPilot.js'

function resolveQuestionSet(answers, level = null) {
  if (Number(level) === 40) return VALUEMAP_QUESTIONS_40
  if (Number(level) === 20) return VALUEMAP_QUESTIONS_20
  const hasExtendedItem = answers && typeof answers === 'object' && !Array.isArray(answers)
    ? VALUEMAP_QUESTIONS_40_EXTRA.some((question) => Object.prototype.hasOwnProperty.call(answers, question.id))
    : false
  return hasExtendedItem ? VALUEMAP_QUESTIONS_40 : VALUEMAP_QUESTIONS_20
}

export function validateValueMapAnswers(answers, level = null) {
  if (!answers || typeof answers !== 'object' || Array.isArray(answers)) return false
  const allowedQuestions = Number(level) === 20
    ? VALUEMAP_QUESTIONS_20
    : VALUEMAP_QUESTIONS_40
  return Object.entries(answers).every(([id, value]) => {
    const knownQuestion = allowedQuestions.some((question) => question.id === id)
    return knownQuestion && Number.isInteger(value) && value >= 1 && value <= 5
  })
}

export function scoreValueMap(answers, level = null) {
  const safeAnswers = answers && typeof answers === 'object' && !Array.isArray(answers)
    ? answers
    : {}
  const activeQuestions = level ? getValueMapQuestionsForLevel(level) : resolveQuestionSet(safeAnswers)
  const missingQuestionIds = activeQuestions
    .filter((question) => !Number.isInteger(safeAnswers[question.id]) || safeAnswers[question.id] < 1 || safeAnswers[question.id] > 5)
    .map((question) => question.id)

  if (missingQuestionIds.length > 0 || !validateValueMapAnswers(safeAnswers, activeQuestions.length)) {
    return {
      complete: false,
      questionCount: activeQuestions.length,
      missingQuestionIds,
      dimensions: [],
      note: 'မေးခွန်းအားလုံး မဖြေဆိုရသေးသောကြောင့် အပြီးသတ်ရလဒ် မတွက်ချက်ရသေးပါ။',
    }
  }

  const dimensions = VALUEMAP_DIMENSIONS.map((dimension) => {
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
    }
  })

  return {
    complete: true,
    questionCount: activeQuestions.length,
    missingQuestionIds: [],
    dimensions,
    note: 'စမ်းသပ်မူကြမ်း (Pilot Reflection) အဆင့် ကိုယ်တိုင်ပြန်လည်သုံးသပ်မှု အညွှန်းသာဖြစ်ပြီး စိတ်ပညာဆိုင်ရာ အတည်ပြုရမှတ် မဟုတ်ပါ။',
  }
}

function bandOf(score) {
  if (score >= 70) return 'high'
  if (score >= 40) return 'balanced'
  return 'low'
}

const VALUEMAP_INSIGHTS = {
  'autonomy-freedom': {
    high: {
      label: 'ကိုယ်ပိုင်ဆုံးဖြတ်ခွင့်ကို အလေးထားသော ပုံစံ',
      interpretation: 'ကိုယ့်ဘဝလမ်းကြောင်း၊ အချိန်နှင့် ရွေးချယ်မှုများကို ကိုယ်တိုင်ဆုံးဖြတ်ခွင့်ရခြင်းက သင့်အတွက် အဓိက စွမ်းအင်ဖြစ်ကြောင်း ညွှန်ပြနေပါသည်။',
      example: 'တင်းကျပ်သော စည်းမျဉ်းများထက် ကိုယ်ပိုင်နည်းလမ်းဖြင့် တာဝန်ယူလုပ်ဆောင်ခွင့်ရသည့် အလုပ်ကို ပိုနှစ်သက်ခြင်း။',
      reflection: 'လွတ်လပ်မှုကို ထိန်းသိမ်းရင်း အခြားသူများနှင့် ပူးပေါင်းဆောင်ရွက်ရတဲ့အခါ ဘယ်အရာက အထောက်အကူဖြစ်သလဲ။',
      tryThis: 'ဒီတစ်ပတ်မှာ ကိုယ်တိုင်စိတ်ကြိုက် စီမံခန့်ခွဲနိုင်မယ့် ကိုယ်ပိုင်အချိန် ၁ နာရီ သတ်မှတ်ကြည့်ပါ။',
    },
    balanced: {
      label: 'လွတ်လပ်မှုနှင့် လမ်းညွှန်မှု မျှတသော ပုံစံ',
      interpretation: 'ကိုယ်တိုင်ဆုံးဖြတ်လိုစိတ် ရှိသကဲ့သို့ လိုအပ်သည့်အခါ အခြားသူများ၏ အကြံဉာဏ်နှင့် စည်းစနစ်များကိုလည်း လက်ခံနိုင်သည့် မျှတမှု ရှိပါသည်။',
      example: 'ပုံမှန်စည်းမျဉ်းများကို လိုက်နာနိုင်သော်လည်း အရေးကြီးဆုံးဖြတ်ချက်များတွင် ကိုယ့်သဘောထားကို ထည့်သွင်းစဉ်းစားခြင်း။',
      reflection: 'ဘယ်ကဏ္ဍတွေမှာ ကိုယ်ပိုင်ဆုံးဖြတ်ခွင့် ပိုလိုအပ်နေတယ်လို့ ခံစားရသလဲ။',
      tryThis: 'သေးငယ်တဲ့ နေ့စဉ်ရွေးချယ်မှုတစ်ခုကို သူများအမြင်မစောင့်ဘဲ ကိုယ်တိုင်စိတ်ချလက်ချ ဆုံးဖြတ်ကြည့်ပါ။',
    },
    low: {
      label: 'စုပေါင်းသဘောတူညီမှုနှင့် လမ်းညွှန်မှုကို တန်ဖိုးထားသော ပုံစံ',
      interpretation: 'တစ်ဦးတည်း ဆုံးဖြတ်ရခြင်းထက် ယုံကြည်ရသူများ၊ မိသားစု သို့မဟုတ် အဖွဲ့အစည်း၏ လမ်းညွှန်မှုနှင့် ညီညွတ်မှုကို ပိုမိုစိတ်ချအားကိုးတတ်ကြောင်း ဖော်ပြနေပါသည်။',
      example: 'အရေးကြီးကိစ္စတစ်ခု မဆုံးဖြတ်မီ မိသားစု သို့မဟုတ် ယုံကြည်ရသူများနှင့် တိုင်ပင်ပြီးမှ စိတ်အေးနိုင်ခြင်း။',
      reflection: 'သူတစ်ပါးရဲ့ မျှော်လင့်ချက်မပါဘဲ ကိုယ်တိုင်တကယ် လိုချင်တဲ့အရာက ဘာဖြစ်မလဲ။',
      tryThis: 'ဒီနေ့မှာ ကိုယ်တိုင်နှစ်သက်ရာ အစားအစာ သို့မဟုတ် အားလပ်ချိန် အစီအစဉ်တစ်ခုကို ကိုယ့်သဘောနဲ့ကိုယ် ရွေးချယ်ကြည့်ပါ။',
    },
  },
  'stability-security': {
    high: {
      label: 'တည်ငြိမ်မှုနှင့် ကြိုတင်ပြင်ဆင်မှုကို အလေးထားသော ပုံစံ',
      interpretation: 'စိတ်ချရသော အခြေအနေ၊ ရေရှည်ခိုင်မာမှုနှင့် ကြိုတင်စီစဉ်ထားနိုင်မှုတို့က သင့်စိတ်ငြိမ်းချမ်းမှုအတွက် အရေးပါကြောင်း ညွှန်ပြနေပါသည်။',
      example: 'အရေးပေါ်အခြေအနေအတွက် ကြိုတင်စုဆောင်းထားခြင်းနှင့် အစီအစဉ်တကျ နေထိုင်ခြင်း။',
      reflection: 'မမျှော်လင့်တဲ့ အပြောင်းအလဲတွေ ကြုံလာတဲ့အခါ စိတ်တည်ငြိမ်အောင် ဘယ်လိုပြန်ထိန်းသလဲ။',
      tryThis: 'လုံခြုံမှုကို ထိန်းထားရင်း အသေးစား အပြောင်းအလဲတစ်ခု (ဥပမာ- လမ်းကြောင်းအသစ်တစ်ခု) ကို စမ်းကြည့်ပါ။',
    },
    balanced: {
      label: 'တည်ငြိမ်မှုနှင့် ပြောင်းလွယ်ပြင်လွယ်မှု မျှတသော ပုံစံ',
      interpretation: 'အခြေခံလုံခြုံမှုကို တန်ဖိုးထားသကဲ့သို့ လိုအပ်လာသည့်အခါ အပြောင်းအလဲအသစ်များကိုလည်း လက်ခံနိုင်စွမ်း ရှိပါသည်။',
      example: 'အခြေခံစီမံချက် ရှိထားသော်လည်း အခွင့်အလမ်းအသစ် ပေါ်လာပါက ချိန်ဆစဉ်းစားနိုင်ခြင်း။',
      reflection: 'လက်ရှိဘဝမှာ ဘယ်အပိုင်းက တည်ငြိမ်နေပြီး ဘယ်အပိုင်းက ပိုခိုင်မာဖို့ လိုနေသလဲ။',
      tryThis: 'ဒီလအတွက် အရေးကြီးဆုံး အခြေခံအစီအစဉ် ၂ ခုကို စာရွက်ပေါ်မှာ ချရေးကြည့်ပါ။',
    },
    low: {
      label: 'ပြောင်းလဲမှုနှင့် လတ်တလော အတွေ့အကြုံကို နှစ်သက်သော ပုံစံ',
      interpretation: 'ပုံသေတည်ငြိမ်နေခြင်းထက် အသစ်အဆန်းများ၊ စွန့်စားမှုများနှင့် ပြောင်းလဲနေသော ပတ်ဝန်းကျင်ကို ပိုမိုစိတ်ဝင်စားတတ်ကြောင်း ဖော်ပြနေပါသည်။',
      example: 'ပုံမှန်လုပ်ရိုးလုပ်စဉ်ထက် စိတ်လှုပ်ရှားစရာ အတွေ့အကြုံအသစ်များကို ဦးစားပေး ရွေးချယ်တတ်ခြင်း။',
      reflection: 'အပြောင်းအလဲများကြားမှာ ကိုယ့်စိတ်အတွက် အခြေခံလုံခြုံမှုပေးတဲ့အရာက ဘာဖြစ်မလဲ။',
      tryThis: 'အပြောင်းအလဲများကြား စိတ်အေးချမ်းစေဖို့ နေ့စဉ်ပုံမှန်လုပ်ဖြစ်တဲ့ အလေ့အကျင့်သေးသေးလေးတစ်ခု ထားကြည့်ပါ။',
    },
  },
  'growth-curiosity': {
    high: {
      label: 'သင်ယူမှုနှင့် ဖန်တီးနိုင်စွမ်းကို မြတ်နိုးသော ပုံစံ',
      interpretation: 'အသစ်အဆန်းများ လေ့လာခြင်း၊ ကိုယ့်ကိုယ်ကို မြှင့်တင်ခြင်းနှင့် စိတ်ကူးသစ်များ ဖန်တီးခြင်းတို့က သင့်ဘဝကို အဓိပ္ပာယ်ရှိစေကြောင်း ညွှန်ပြနေပါသည်။',
      example: 'အားလပ်ချိန်များတွင် စာအုပ်အသစ်ဖတ်ခြင်း၊ ကျွမ်းကျင်မှုအသစ် သင်ယူခြင်း သို့မဟုတ် နည်းလမ်းသစ် စမ်းကြည့်ခြင်း။',
      reflection: 'တစ်ချိန်တည်းမှာ အများကြီးသင်ယူချင်စိတ်ကြောင့် ကိုယ့်ကိုယ်ကို ဖိအားပေးမိတာမျိုး ရှိတတ်သလား။',
      tryThis: 'လက်ရှိသင်ယူနေတဲ့အရာတွေထဲက တစ်ခုတည်းကိုပဲ ရွေးပြီး ပျော်ပျော်ရွှင်ရွှင် အချိန်ပေးကြည့်ပါ။',
    },
    balanced: {
      label: 'လက်တွေ့ကျကျ သင်ယူတိုးတက်သော ပုံစံ',
      interpretation: 'လိုအပ်သည့်အခါ အသစ်သင်ယူရန် စိတ်အားထက်သန်သကဲ့သို့ လက်ရှိတတ်ထားသည့် ကျွမ်းကျင်မှုများကိုလည်း စနစ်တကျ အသုံးချတတ်ပါသည်။',
      example: 'အလုပ် သို့မဟုတ် ဘဝမှာ လိုအပ်လာတဲ့အခါ စနစ်တကျ လေ့လာပြီး လက်တွေ့ပြန်သုံးခြင်း။',
      reflection: 'မကြာသေးမီက ကိုယ်စိတ်ဝင်စားခဲ့ပေမယ့် မစဖြစ်သေးတဲ့ အကြောင်းအရာတစ်ခု ရှိသလား။',
      tryThis: 'စိတ်ဝင်စားတဲ့ အကြောင်းအရာတစ်ခုကို ဒီနေ့မှာ ၁၀ မိနစ်ခန့် ရှာဖွေဖတ်ရှုကြည့်ပါ။',
    },
    low: {
      label: 'လက်တွေ့ခိုင်မာမှုနှင့် ကျွမ်းကျင်ပြီးသားကို အားပြုသော ပုံစံ',
      interpretation: 'မသေချာသော အသစ်အဆန်းများထက် ကိုယ်တိုင်ကျွမ်းကျင်ပြီးသား၊ စိတ်ချရပြီးသား နည်းလမ်းများကို ပိုမိုယုံကြည်အားကိုးတတ်ကြောင်း ဖော်ပြနေပါသည်။',
      example: 'စမ်းသပ်မှုအသစ်များထက် အောင်မြင်ပြီးသား ပုံမှန်နည်းလမ်းအတိုင်း တည်ငြိမ်စွာ လုပ်ဆောင်ခြင်း။',
      reflection: 'အမှားဖြစ်မှာ မကြောက်ရတဲ့ အခြေအနေမျိုးဆိုရင် ဘာကို စမ်းသပ်သင်ယူကြည့်ချင်သလဲ။',
      tryThis: 'ဖိအားမရှိတဲ့ ဝါသနာတစ်ခုခုမှာ နည်းလမ်းအသစ်တစ်ခုကို အပျော်သဘော စမ်းကြည့်ပါ။',
    },
  },
  'connection-contribution': {
    high: {
      label: 'မေတ္တာနှင့် အများအကျိုးကို အလေးထားသော ပုံစံ',
      interpretation: 'ချစ်ခင်ရသူများနှင့် နွေးထွေးစွာ ရှိနေခြင်း၊ အခြားသူများကို ကူညီပေးခြင်းနှင့် ပတ်ဝန်းကျင်အတွက် အကျိုးပြုခြင်းတို့ကို အဓိကတန်ဖိုးထားကြောင်း ညွှန်ပြနေပါသည်။',
      example: 'သူတစ်ပါးအခက်အခဲရှိချိန် ဝိုင်းဝန်းကူညီရခြင်းနှင့် မိသားစု/မိတ်ဆွေများနှင့် အချိန်ပေးရခြင်းကို တန်ဖိုးထားခြင်း။',
      reflection: 'သူတစ်ပါးကို ဂရုစိုက်ရင်း ကိုယ့်ကိုယ်ကို ဂရုစိုက်ဖို့ အချိန်ရော ကျန်နေသေးရဲ့လား။',
      tryThis: 'သူတစ်ပါးကို ကူညီသကဲ့သို့ ဒီနေ့မှာ ကိုယ့်ကိုယ်ကိုလည်း ကြင်နာတဲ့စကားတစ်ခွန်း ပြန်ပြောပေးပါ။',
    },
    balanced: {
      label: 'ကိုယ်ပိုင်ရည်မှန်းချက်နှင့် လူမှုအကျိုးပြုမှု မျှတသော ပုံစံ',
      interpretation: 'မိသားစု၊ မိတ်ဆွေများကို ဂရုစိုက်သကဲ့သို့ ကိုယ်ပိုင်အချိန်နှင့် တစ်ဦးချင်း ရည်မှန်းချက်များကိုလည်း မျှတစွာ ထိန်းသိမ်းတတ်ပါသည်။',
      example: 'ကိုယ့်အလုပ်ကို အာရုံစိုက်လုပ်ဆောင်သလို လိုအပ်သည့်အခါ အများအတွက် ပါဝင်ကူညီခြင်း။',
      reflection: 'ချစ်ခင်ရသူတွေနဲ့ ဆက်ဆံရေးမှာ ဘယ်အရာက အပျော်ရွှင်ဆုံး ခံစားချက်ကို ပေးသလဲ။',
      tryThis: 'ကျေးဇူးတင်ကြောင်း သို့မဟုတ် သတိရကြောင်း မက်ဆေ့ချ်တိုလေးတစ်စောင် ရင်းနှီးသူတစ်ဦးထံ ပို့ကြည့်ပါ။',
    },
    low: {
      label: 'တစ်ဦးချင်း အာရုံစိုက်မှုနှင့် ကိုယ်ပိုင်လမ်းကြောင်းကို ဦးစားပေးသော ပုံစံ',
      interpretation: 'လူမှုရေးဆက်ဆံမှုများထက် ကိုယ်ပိုင်အာရုံစိုက်မှု၊ တိတ်ဆိတ်အေးချမ်းမှုနှင့် တစ်ဦးချင်း ရည်မှန်းချက်များကို ပိုမိုဦးစားပေးတတ်ကြောင်း ဖော်ပြနေပါသည်။',
      example: 'အဖွဲ့လိုက် လှုပ်ရှားမှုများထက် တစ်ဦးတည်း အေးအေးဆေးဆေး လုပ်ဆောင်ရသည့်အခါ ပိုမိုအာရုံစိုက်နိုင်ခြင်း။',
      reflection: 'ကိုယ့်ကိုယ်ပိုင်အချိန်ကို မထိခိုက်စေဘဲ အဓိပ္ပာယ်ရှိတဲ့ ဆက်ဆံရေးတစ်ခုကို ဘယ်လိုထိန်းသိမ်းနိုင်မလဲ။',
      tryThis: 'အများကြီး မဟုတ်ဘဲ ကိုယ်နဲ့စိတ်သဘောထားတိုက်ဆိုင်သူ တစ်ဦးတည်းနှင့် အေးအေးဆေးဆေး စကားစမြည် ပြောကြည့်ပါ။',
    },
  },
}

export function getValueMapInsight(dimensionId, index) {
  const band = bandOf(index)
  return VALUEMAP_INSIGHTS[dimensionId]?.[band] || null
}
