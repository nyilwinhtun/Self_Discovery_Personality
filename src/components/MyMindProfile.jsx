import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  CircleHelp,
  ImageDown,
  Sparkles,
  Wind,
} from 'lucide-react'
import { TRAITS } from '../data/questions.js'
import { RIASEC_CATEGORIES } from '../data/careerQuestions.js'
import { getPersonalityProfile } from '../utils/scoring.js'
import { loadAppData } from '../utils/storage.js'
import {
  BondSenseLogo,
  InnerCompassLogo,
  TraitLensLogo,
  ValueMapLogo,
} from './AssessmentLogos.jsx'

const INNERCOMPASS_LABELS = {
  'trust-accountability': 'ယုံကြည်စိတ်ချရမှုနှင့် တာဝန်ခံမှု',
  'emotional-awareness-regulation': 'စိတ်ခံစားချက်ကို သိမြင်ကိုင်တွယ်မှု',
  'social-self-expression': 'လူမှုဆက်ဆံရေးတွင် ကိုယ့်ကိုယ်ကို ဖော်ပြပုံ',
  'disagreement-handling': 'အမြင်မတူမှုကို ကိုင်တွယ်ပုံ',
  'personal-organization': 'ကိုယ်ပိုင်စီမံမှုနှင့် လုပ်ငန်းဆက်လက်ဆောင်ရွက်မှု',
  'curiosity-open-thinking': 'စူးစမ်းလိုစိတ်နှင့် အတွေးအမြင်ဖွင့်လှစ်မှု',
}

const BONDSENSE_LABELS = {
  'trust-openness': 'ယုံကြည်မှုနှင့် ဖွင့်ဟပြောဆိုမှု',
  'healthy-boundaries': 'ကိုယ်ပိုင်နယ်နိမိတ် ထိန်းသိမ်းမှု',
  'empathy-listening': 'စာနာနားလည်မှုနှင့် နားထောင်ပေးမှု',
  'conflict-navigation': 'သဘောထားကွဲလွဲမှု ကိုင်တွယ်ပုံ',
}

const VALUEMAP_LABELS = {
  'autonomy-freedom': 'လွတ်လပ်မှုနှင့် ကိုယ်ပိုင်ဆုံးဖြတ်ခွင့်',
  'stability-security': 'တည်ငြိမ်မှုနှင့် လုံခြုံမှု',
  'growth-curiosity': 'တိုးတက်သင်ယူမှုနှင့် ဖန်တီးနိုင်စွမ်း',
  'connection-contribution': 'မေတ္တာနှင့် အကျိုးပြုမှု',
}

const EMOTIONLENS_LABELS = {
  'emotional-awareness': 'စိတ်ခံစားချက် သိမှတ်နိုင်စွမ်း',
  'calm-regulation': 'စိတ်ဖိစီးမှု ကိုင်တွယ်တည်ငြိမ်မှု',
  'self-compassion': 'ကိုယ့်ကိုယ်ကို ကြင်နာနားလည်မှု',
  'overthinking-release': 'အတွေးလွန်ခြင်းမှ လွတ်မြောက်နိုင်မှု',
}

function formatDate(value) {
  if (!value) return 'မသိရှိပါ'
  try {
    return new Intl.DateTimeFormat('my-MM', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(value))
  } catch {
    return new Date(value).toLocaleDateString()
  }
}

function getRecordType(record) {
  if (record?.assessmentType === 'innerCompass') return 'innerCompass'
  if (record?.assessmentType === 'bondSense') return 'bondSense'
  if (record?.assessmentType === 'valueMap') return 'valueMap'
  if (record?.assessmentType === 'emotionLens') return 'emotionLens'
  if (record?.assessmentType === 'careerInterest') return 'careerInterest'
  return 'personality'
}

function getTopDimension(record, labelMap) {
  if (!record) return null
  if (Array.isArray(record.dimensions) && record.dimensions.length > 0) {
    const sorted = [...record.dimensions].sort(
      (a, b) => Number(b.index ?? b.score ?? 0) - Number(a.index ?? a.score ?? 0),
    )
    const top = sorted[0]
    return {
      id: top.id,
      name: top.name || labelMap[top.id] || top.id,
      score: Math.round(Number(top.index ?? top.score ?? 0)),
    }
  }
  const entries = Object.entries(record.scores || {})
  if (entries.length === 0) return null
  entries.sort((a, b) => Number(b[1]?.score ?? 0) - Number(a[1]?.score ?? 0))
  const [id, data] = entries[0]
  return {
    id,
    name: data?.name || labelMap[id] || id,
    score: Math.round(Number(data?.score ?? 0)),
  }
}

function extractModuleSummaries(history) {
  const sorted = [...(history || [])].sort(
    (a, b) => Date.parse(b?.createdAt || '') - Date.parse(a?.createdAt || ''),
  )
  const latest = {}
  for (const record of sorted) {
    const type = getRecordType(record)
    if (!latest[type]) latest[type] = record
  }

  const summaries = []

  if (latest.personality?.scores) {
    const profile = getPersonalityProfile(latest.personality.scores)
    const top = profile.primary || TRAITS[0]
    summaries.push({
      id: 'personality',
      title: 'TraitLens · ပင်ကိုစရိုက်',
      subtitle: profile.title,
      topLabel: top.name,
      score: Math.round(Number(top.score ?? 0)),
      date: latest.personality.createdAt,
      record: latest.personality,
      toneBg: 'bg-[#f3edf5]',
      toneText: 'text-[#614b6b]',
      toneBorder: 'border-[#dfd2e4]',
      barColor: 'bg-[#80678f]',
      prose: `သင့်ပင်ကိုစရိုက်ထဲတွင် “${top.name}” (${Math.round(Number(top.score ?? 0))}/100) သည် လတ်တလော အထင်ရှားဆုံး အညွှန်းဖြစ်နေပါသည်။`,
    })
  }

  if (latest.innerCompass) {
    const top = getTopDimension(latest.innerCompass, INNERCOMPASS_LABELS)
    if (top) {
      summaries.push({
        id: 'innerCompass',
        title: 'InnerCompass · စိတ်နေသဘောထား',
        subtitle: 'ကိုယ်တိုင်သုံးသပ်မှု (Pilot)',
        topLabel: top.name,
        score: top.score,
        date: latest.innerCompass.createdAt,
        record: latest.innerCompass,
        toneBg: 'bg-[#eaf1fa]',
        toneText: 'text-[#355679]',
        toneBorder: 'border-[#cbd9e9]',
        barColor: 'bg-[#446c96]',
        prose: `စိတ်နေသဘောထားပိုင်းတွင် “${top.name}” (${top.score}/100) ဘက်သို့ ပိုမိုသက်ရောက်နေကြောင်း တွေ့ရပါသည်။`,
      })
    }
  }

  if (latest.bondSense) {
    const top = getTopDimension(latest.bondSense, BONDSENSE_LABELS)
    if (top) {
      summaries.push({
        id: 'bondSense',
        title: 'BondSense · ဆက်ဆံရေးပုံစံ',
        subtitle: 'ဆက်ဆံရေးသုံးသပ်မှု (Pilot)',
        topLabel: top.name,
        score: top.score,
        date: latest.bondSense.createdAt,
        record: latest.bondSense,
        toneBg: 'bg-[#fbeeea]',
        toneText: 'text-[#7c392b]',
        toneBorder: 'border-[#e5cbc5]',
        barColor: 'bg-[#924433]',
        prose: `ဆက်ဆံရေးကဏ္ဍတွင် “${top.name}” (${top.score}/100) သည် သင့်အတွက် အားသာသည့် အလေ့အကျင့်တစ်ခုအဖြစ် ပေါ်လွင်နေပါသည်။`,
      })
    }
  }

  if (latest.valueMap) {
    const top = getTopDimension(latest.valueMap, VALUEMAP_LABELS)
    if (top) {
      summaries.push({
        id: 'valueMap',
        title: 'ValueMap · ဘဝတန်ဖိုး',
        subtitle: 'ဘဝတန်ဖိုးသုံးသပ်မှု (Pilot)',
        topLabel: top.name,
        score: top.score,
        date: latest.valueMap.createdAt,
        record: latest.valueMap,
        toneBg: 'bg-[#eef4ef]',
        toneText: 'text-[#2c4a34]',
        toneBorder: 'border-[#cad9ce]',
        barColor: 'bg-[#3d6347]',
        prose: `ဘဝတန်ဖိုးပိုင်းတွင် “${top.name}” (${top.score}/100) ကို လက်ရှိအချိန်၌ အဓိကတန်ဖိုးထားနေကြောင်း ညွှန်ပြနေပါသည်။`,
      })
    }
  }

  if (latest.emotionLens) {
    const top = getTopDimension(latest.emotionLens, EMOTIONLENS_LABELS)
    if (top) {
      summaries.push({
        id: 'emotionLens',
        title: 'EmotionLens · စိတ်ခံစားချက်',
        subtitle: 'စိတ်ခံစားချက်သုံးသပ်မှု (Pilot)',
        topLabel: top.name,
        score: top.score,
        date: latest.emotionLens.createdAt,
        record: latest.emotionLens,
        toneBg: 'bg-[#eaf4f4]',
        toneText: 'text-[#1e4a4f]',
        toneBorder: 'border-[#cce0e2]',
        barColor: 'bg-[#2f6d73]',
        prose: `စိတ်ခံစားချက်ပိုင်းတွင် “${top.name}” (${top.score}/100) သည် လတ်တလော အားသာနေသည့် အလေ့အကျင့်တစ်ခု ဖြစ်နေပါသည်။`,
      })
    }
  }

  if (latest.careerInterest) {
    const careerScores = latest.careerInterest.careerScores || {}
    const ranked = [...RIASEC_CATEGORIES].sort(
      (a, b) => Number(careerScores[b.id]?.score ?? 0) - Number(careerScores[a.id]?.score ?? 0),
    )
    const topCat = ranked[0]
    const topScore = Math.round(Number(careerScores[topCat.id]?.score ?? 0))
    summaries.push({
      id: 'careerInterest',
      title: 'Career Interest · စိတ်ဝင်စားမှု',
      subtitle: latest.careerInterest.careerCode
        ? `စိတ်ဝင်စားမှုအတိုကောက် ${latest.careerInterest.careerCode}`
        : 'RIASEC စိတ်ဝင်စားမှု',
      topLabel: `${topCat.code} · ${topCat.name}`,
      score: topScore,
      date: latest.careerInterest.createdAt,
      record: latest.careerInterest,
      toneBg: 'bg-[#f8edf1]',
      toneText: 'text-[#733f53]',
      toneBorder: 'border-[#e8d2dc]',
      barColor: 'bg-[#865569]',
      prose: `အလုပ်အကိုင် စိတ်ဝင်စားမှုတွင် “${topCat.name}” (${topScore}/100) ဘက်ကို ပိုမိုစိတ်ဝင်စားကြောင်း တွေ့ရပါသည်။`,
    })
  }

  return { latest, summaries }
}

function buildCrossModulePrompts(latest) {
  const prompts = []
  if (latest.personality && latest.innerCompass) {
    prompts.push({
      id: 'trait-compass',
      title: 'ပင်ကိုစရိုက် နှင့် စိတ်နေသဘောထား ချိတ်ဆက်မှု',
      question: 'သင့် TraitLens ပင်ကိုစရိုက်ပုံစံနှင့် InnerCompass စိတ်နေသဘောထားတို့သည် နေ့စဉ်ဖိအားများကြုံလာချိန်တွင် မည်သို့ အပြန်အလှန် ပံ့ပိုးပေးနေသနည်း။',
    })
  }
  if (latest.bondSense && (latest.personality || latest.valueMap)) {
    prompts.push({
      id: 'bond-value',
      title: 'ဆက်ဆံရေး နှင့် ဘဝတန်ဖိုး ဟန်ချက်ညီမှု',
      question: 'BondSense တွင် ပေါ်လွင်နေသော ဆက်ဆံရေးပုံစံသည် သင်တန်ဖိုးထားသည့် ဘဝဦးစားပေးချက်များနှင့် ကိုက်ညီနေပါသလား။ ဘယ်နေရာတွင် နယ်နိမိတ်အနည်းငယ် ပြန်ညှိလိုသနည်း။',
    })
  }
  if (latest.valueMap && latest.careerInterest) {
    prompts.push({
      id: 'value-career',
      title: 'ဘဝတန်ဖိုး နှင့် လုပ်ငန်းစိတ်ဝင်စားမှု',
      question: 'Career Interest တွင် စိတ်ဝင်စားမှုမြင့်နေသော လုပ်ဆောင်မှုများသည် သင့် ValueMap ထဲက အဓိကတန်ဖိုးများကို ဖြည့်ဆည်းပေးနိုင်မည်ဟု ခံစားရပါသလား။',
    })
  }
  if (latest.emotionLens) {
    prompts.push({
      id: 'emotion-calm',
      title: 'စိတ်ခံစားချက် နှင့် ကိုယ့်ကိုယ်ကို ဂရုစိုက်မှု',
      question: 'EmotionLens ရလဒ်ကို ကြည့်ပြီး စိတ်ဖိစီးမှုများချိန် သို့မဟုတ် အတွေးလွန်ချိန်တွင် ကိုယ့်ကိုယ်ကို ပိုမိုနူးညံ့စွာ ပြန်ထိန်းညှိပေးနိုင်မည့် နည်းလမ်းတစ်ခုမှာ ဘာဖြစ်မလဲ။',
    })
  }
  if (prompts.length === 0) {
    prompts.push({
      id: 'starter-prompt',
      title: 'ကိုယ့်ကိုယ်ကို ညင်သာစွာ မေးမြန်းကြည့်ရန်',
      question: 'လက်ရှိပြီးဆုံးထားသော ရလဒ်ထဲမှ သင်ကိုယ်တိုင် “ဒါတော့ ငါနဲ့ တကယ်ကိုက်ညီတယ်” ဟု ခံစားရသည့်အချက်နှင့် မထင်မှတ်ထားဘဲ သတိပြုမိသွားသည့်အချက်မှာ အဘယ်နည်း။',
    })
  }
  prompts.push({
    id: 'gentle-step',
    title: 'လာမည့်ရက်သတ္တပတ်အတွက် အဆင့်ငယ်တစ်ခု',
    question: 'ဤစုစည်းမှုပုံရိပ်ကို ကြည့်ပြီးနောက် ကိုယ့်စိတ်အေးချမ်းမှု သို့မဟုတ် ဆက်ဆံရေးအတွက် ဒီအပတ်ထဲတွင် ပြောင်းလဲစမ်းကြည့်လိုသည့် သေးငယ်သော အလေ့အကျင့်တစ်ခုမှာ ဘာဖြစ်မလဲ။',
  })
  return prompts
}

export default function MyMindProfile({
  history: propHistory,
  onBack,
  onOpenRecord,
  onOpenJournal,
  onStartTraitLens,
  onStartInnerCompass,
  onStartBondSense,
  onStartValueMap,
  onStartEmotionLens,
  onStartCareer,
}) {
  const [busyPng, setBusyPng] = useState(false)
  const [pngError, setPngError] = useState('')

  const history = useMemo(() => {
    if (Array.isArray(propHistory)) return propHistory
    return loadAppData().history || []
  }, [propHistory])

  const { latest, summaries } = useMemo(() => extractModuleSummaries(history), [history])
  const completedCount = summaries.length
  const crossPrompts = useMemo(() => buildCrossModulePrompts(latest), [latest])

  const uncompletedModules = useMemo(() => {
    const items = []
    if (!latest.personality) {
      items.push({
        id: 'personality',
        name: 'TraitLens',
        desc: 'ပင်ကိုစရိုက် အချက် ၅ ချက်ကို လေ့လာရန် (~၅ မိနစ်)',
        logo: <TraitLensLogo size={38} />,
        bg: 'bg-[#f3edf5] text-[#80678f]',
        btn: 'bg-[#80678f] hover:bg-[#725981]',
        onStart: onStartTraitLens,
      })
    }
    if (!latest.innerCompass) {
      items.push({
        id: 'innerCompass',
        name: 'InnerCompass',
        desc: 'စိတ်နေသဘောထား ၆ ချက်ကို ပြန်လည်သုံးသပ်ရန် (~၅ မိနစ်)',
        logo: <InnerCompassLogo size={38} />,
        bg: 'bg-[#eaf1fa] text-[#446c96]',
        btn: 'bg-[#446c96] hover:bg-[#3a5d82]',
        onStart: onStartInnerCompass,
      })
    }
    if (!latest.bondSense) {
      items.push({
        id: 'bondSense',
        name: 'BondSense',
        desc: 'ဆက်ဆံရေး၊ နယ်နိမိတ်နှင့် စာနာမှုပုံစံကို လေ့လာရန် (~၄ မိနစ်)',
        logo: <BondSenseLogo size={38} />,
        bg: 'bg-[#fbeeea] text-[#924433]',
        btn: 'bg-[#924433] hover:bg-[#7d3829]',
        onStart: onStartBondSense,
      })
    }
    if (!latest.valueMap) {
      items.push({
        id: 'valueMap',
        name: 'ValueMap',
        desc: 'ဘဝတန်ဖိုးနှင့် ဦးစားပေးချက်များကို ရှာဖွေရန် (~၄ မိနစ်)',
        logo: <ValueMapLogo size={38} />,
        bg: 'bg-[#eef4ef] text-[#3d6347]',
        btn: 'bg-[#3d6347] hover:bg-[#31523a]',
        onStart: onStartValueMap,
      })
    }
    if (!latest.emotionLens && onStartEmotionLens) {
      items.push({
        id: 'emotionLens',
        name: 'EmotionLens',
        desc: 'စိတ်ခံစားချက် သိမှတ်မှုနှင့် စိတ်အေးချမ်းမှုကို လေ့လာရန် (~၄ မိနစ်)',
        logo: <Wind size={22} />,
        bg: 'bg-[#eaf4f4] text-[#2f6d73]',
        btn: 'bg-[#2f6d73] hover:bg-[#24565b]',
        onStart: onStartEmotionLens,
      })
    }
    if (!latest.careerInterest) {
      items.push({
        id: 'careerInterest',
        name: 'Career Interest',
        desc: 'စိတ်ဝင်စားသည့် လုပ်ငန်းနယ်ပယ် ၆ မျိုးကို လေ့လာရန် (~၅ မိနစ်)',
        logo: <BriefcaseBusiness size={22} />,
        bg: 'bg-[#f8edf1] text-[#865569]',
        btn: 'bg-[#80678f] hover:bg-[#725981]',
        onStart: onStartCareer,
      })
    }
    return items
  }, [
    latest,
    onStartTraitLens,
    onStartInnerCompass,
    onStartBondSense,
    onStartValueMap,
    onStartEmotionLens,
    onStartCareer,
  ])

  const handleSavePng = async () => {
    if (busyPng || completedCount === 0) return
    setBusyPng(true)
    setPngError('')
    try {
      const { downloadResultImageCard } = await import('../utils/resultImageCard.js')
      await downloadResultImageCard({
        filename: `my-mind-profile-${new Date().toISOString().slice(0, 10)}.png`,
        subtitle: 'SELF DISCOVERY · MY MIND PROFILE',
        title: 'ကျွန်ုပ်၏ စိတ်ပုံရိပ် (My Mind Profile)',
        metaLine: `ပြီးဆုံးထားသော အပိုင်း ${completedCount} / 6 · ${formatDate(new Date().toISOString())}`,
        highlightLine: summaries.map((s) => `${s.title.split('·')[0].trim()}: ${s.topLabel}`).join(' · '),
        items: summaries.map((s) => ({
          label: `${s.title.split('·')[0].trim()} · ${s.topLabel}`,
          score: s.score,
        })),
        accentColor: '#80678f',
        trackColor: '#efe8f1',
      })
    } catch {
      setPngError('ပုံသိမ်းရာတွင် အခက်အခဲရှိနေပါသည်။ ထပ်မံစမ်းကြည့်ပါ။')
    } finally {
      setBusyPng(false)
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 pb-28 sm:px-6 sm:py-10">
      <button
        type="button"
        onClick={onBack}
        className="mb-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#6b5e70] transition hover:text-[#44364a]"
      >
        <ArrowLeft size={16} /> ပင်မစာမျက်နှာသို့ ပြန်မယ်
      </button>

      <section className="relative overflow-hidden rounded-[2rem] border border-[#e7dce9] bg-gradient-to-br from-[#f4eff7] via-[#fffdf9] to-[#f8f2ef] p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e5d9e8] bg-white/85 px-3 py-1 text-xs font-bold tracking-wide text-[#614b6b]">
              <Sparkles size={13} /> MY MIND PROFILE · စုစည်းမှုပုံရိပ်
            </span>
            <h1 className="mt-3 text-2xl font-bold leading-snug text-[#44364a] sm:text-3xl">
              ကျွန်ုပ်၏ စိတ်ပုံရိပ် (My Mind Profile)
            </h1>
            <p className="mt-2 text-xs leading-7 text-[#5d5162] sm:text-sm">
              သင်ဖြေဆိုပြီးသား ဆန်းစစ်မှုအပိုင်းများမှ နောက်ဆုံးရလဒ်များကို တစ်နေရာတည်းတွင် ညင်သာစွာ ပေါင်းစည်းဖော်ပြပေးထားပါသည်။
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 sm:items-end">
            <div className="flex flex-wrap gap-2">
              {onOpenJournal && (
                <button
                  type="button"
                  onClick={onOpenJournal}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-[#d8c7df] bg-white px-4 py-2.5 text-xs font-semibold text-[#614b6b] shadow-xs transition hover:bg-[#faf7fb] sm:text-sm"
                >
                  <BookOpen size={16} />
                  ကိုယ်ပိုင် စိတ်မှတ်တမ်းစာအုပ်
                </button>
              )}
              <button
                type="button"
                onClick={handleSavePng}
                disabled={busyPng || completedCount === 0}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-[#d8c7df] bg-white px-5 py-2.5 text-sm font-semibold text-[#614b6b] shadow-xs transition hover:bg-[#faf7fb] disabled:cursor-not-allowed disabled:opacity-45"
              >
                <ImageDown size={16} />
                {busyPng ? 'ပုံထုတ်နေသည်...' : 'စုစည်းမှု ပုံသိမ်းမယ် (PNG)'}
              </button>
            </div>
            {pngError && (
              <p role="status" className="text-xs font-medium text-[#8b3a2b]">
                {pngError}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-[#ebe3ed] bg-white/85 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-[#514357]">
            <span>စုစည်းမှု ပြည့်စုံနှုန်း</span>
            <span>ပြီးဆုံးထားသော အပိုင်း {completedCount} / 6 ခု</span>
          </div>
          <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-[#efe8f1]">
            <div
              className="h-full rounded-full bg-[#80678f] transition-all duration-500"
              style={{ width: `${(completedCount / 6) * 100}%` }}
            />
          </div>
        </div>
      </section>

      {completedCount === 0 ? (
        <section className="mt-6 rounded-[2rem] border border-dashed border-[#dfd2e1] bg-[#fffdf9] px-6 py-12 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#f3edf5] text-[#80678f]">
            <Sparkles size={24} />
          </span>
          <h2 className="mt-4 text-lg font-bold text-[#44364a]">
            စုစည်းဖော်ပြရန် ရလဒ် မရှိသေးပါ
          </h2>
          <p className="mx-auto mt-2 max-w-md text-xs leading-7 text-[#5d5162]">
            အောက်ပါ ဆန်းစစ်မှုအပိုင်းများထဲမှ အနည်းဆုံး ၁ ခုကို ဖြေဆိုပြီးသည်နှင့် သင့်ကိုယ်ပိုင် စိတ်ပုံရိပ်စုစည်းမှုကို ဤနေရာတွင် ကြည့်ရှုနိုင်ပါမည်။
          </p>
        </section>
      ) : (
        <>
          <section className="mt-6 rounded-[2rem] border border-[#ebe5dc] bg-[#fffdf9] p-5 shadow-sm sm:p-6">
            <h2 className="text-base font-bold text-[#44364a] sm:text-lg">
              ထင်ရှားသော ကိုယ်ပိုင်လက္ခဏာများ အကျဉ်းချုပ်
            </h2>
            <p className="mt-2 text-xs leading-7 text-[#5d5162]">
              {summaries.map((item) => item.prose).join(' ')}
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {summaries.map((item) => (
                <article
                  key={item.id}
                  className={`flex flex-col justify-between rounded-2xl border bg-white p-4 shadow-xs ${item.toneBorder}`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.toneBg} ${item.toneText}`}>
                        {item.title}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#436b4f]">
                        <CheckCircle2 size={13} /> ပြီးဆုံးပြီး
                      </span>
                    </div>
                    <p className="mt-3 text-sm font-bold text-[#44364a]">{item.topLabel}</p>
                    <p className="mt-1 text-xs text-[#6b5e70]">
                      {item.subtitle} · {formatDate(item.date)}
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#f1ece6]">
                        <div
                          className={`h-full rounded-full ${item.barColor}`}
                          style={{ width: `${Math.max(4, Math.min(100, item.score))}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold tabular-nums text-[#514357]">
                        {item.score} / 100
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 pt-2">
                    <button
                      type="button"
                      onClick={() => onOpenRecord?.(item.record)}
                      className="inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-[#614b6b] hover:underline"
                    >
                      အသေးစိတ်ရလဒ် ကြည့်မယ် <ArrowRight size={14} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-6 rounded-[2rem] border border-[#e7dce9] bg-[#fbf8fc] p-5 shadow-sm sm:p-6">
            <h2 className="text-base font-bold text-[#44364a] sm:text-lg">
              အပိုင်းများအကြား ချိတ်ဆက်တွေးတောရန် မေးခွန်းများ
            </h2>
            <p className="mt-1 text-xs leading-6 text-[#5d5162]">
              အဖြေမှန်၊ အဖြေမှား မရှိပါ။ မိမိစိတ်ထဲ ပေါ်လာသည်များကို ညင်သာစွာ ပြန်လည်သုံးသပ်ကြည့်နိုင်ပါသည်။
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {crossPrompts.map((prompt) => (
                <article
                  key={prompt.id}
                  className="rounded-2xl border border-[#ece3ef] bg-white p-4"
                >
                  <h3 className="text-xs font-bold text-[#614b6b]">{prompt.title}</h3>
                  <p className="mt-2 text-xs leading-7 text-[#4c3d51]">{prompt.question}</p>
                </article>
              ))}
            </div>
          </section>
        </>
      )}

      {uncompletedModules.length > 0 && (
        <section className="mt-6 rounded-[2rem] border border-[#ebe5dc] bg-[#fffdf9] p-5 shadow-sm sm:p-6">
          <h2 className="text-base font-bold text-[#44364a] sm:text-lg">
            မဖြေဆိုရသေးသော အပိုင်းများကို ဆက်လက်စူးစမ်းမယ်
          </h2>
          <p className="mt-1 text-xs leading-6 text-[#5d5162]">
            ကျန်ရှိနေသော အပိုင်းများကို ဖြေဆိုပြီးပါက သင့်စိတ်ပုံရိပ် စုစည်းမှု ပိုမိုပြည့်စုံလာပါမည်။
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {uncompletedModules.map((mod) => (
              <article
                key={mod.id}
                className="flex flex-col justify-between rounded-2xl border border-[#ebe5dc] bg-white p-4 shadow-xs"
              >
                <div>
                  <span className={`grid h-12 w-12 place-items-center rounded-xl ${mod.bg}`}>
                    {mod.logo}
                  </span>
                  <h3 className="mt-3 text-sm font-bold text-[#44364a]">{mod.name}</h3>
                  <p className="mt-1.5 text-xs leading-6 text-[#5d5162]">{mod.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={mod.onStart}
                  className={`mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-white transition ${mod.btn}`}
                >
                  စတင်ဖြေဆိုမယ် <ArrowRight size={14} />
                </button>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="mt-6 rounded-2xl border border-[#eee4ed] bg-[#fbf8fb] p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <CircleHelp size={18} className="mt-0.5 shrink-0 text-[#6b5e70]" />
          <p className="text-xs leading-6 text-[#5d5162]">
            ဤစုစည်းမှုသည် ကိုယ်တိုင်ပြန်လည်သုံးသပ်ရန် အထောက်အကူပြုသည့် အညွှန်းသာဖြစ်ပြီး စိတ်ပညာရောဂါရှာဖွေခြင်း၊ ဆေးဘက်ဆိုင်ရာ အကြံဉာဏ် သို့မဟုတ် လူတစ်ဦးကို အပြီးသတ်သတ်မှတ်ခြင်း မဟုတ်ပါ။ အဖြေအားလုံးကို သင့်စက်၏ Browser ထဲတွင်သာ သိမ်းဆည်းထားပါသည်။
          </p>
        </div>
      </section>
    </main>
  )
}
