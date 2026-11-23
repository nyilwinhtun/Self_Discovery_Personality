import { useMemo, useState } from 'react'
import { ArrowRight, ChevronRight, History, Sparkles, Trash2 } from 'lucide-react'
import { TRAITS } from '../data/questions.js'
import { getPersonalityProfile } from '../utils/scoring.js'

const STORAGE_HINT = 'သင့်အဖြေများကို ဒီ Browser နဲ့ ဒီစက်ထဲမှာပဲ သိမ်းထားပါတယ်။ Browser Data ရှင်းလိုက်ရင် အဖြေတွေ ပျောက်နိုင်ပါတယ်။'

function formatDate(value) {
  if (!value) return 'မသိရှိပါ'
  try {
    return new Intl.DateTimeFormat('my-MM', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(value))
  } catch {
    return new Date(value).toLocaleString()
  }
}

function getRecordAssessmentType(record) {
  if (record?.assessmentType === 'careerInterest') return 'careerInterest'
  if (record?.assessmentType === 'innerCompass') return 'innerCompass'
  if (record?.assessmentType === 'bondSense') return 'bondSense'
  if (record?.assessmentType === 'valueMap') return 'valueMap'
  if (record?.assessmentType === 'emotionLens') return 'emotionLens'
  return 'personality'
}

function getRecordComparisonKey(record) {
  const type = getRecordAssessmentType(record)
  if (type === 'personality') return `personality:${record?.level || record?.questionCount || 30}`
  if (type === 'innerCompass') return `innerCompass:${record?.questionCount || record?.level || 30}`
  if (type === 'bondSense') return `bondSense:${record?.questionCount || record?.level || 20}`
  if (type === 'valueMap') return `valueMap:${record?.questionCount || record?.level || 20}`
  if (type === 'emotionLens') return `emotionLens:${record?.questionCount || record?.level || 20}`
  return type
}

const INNERCOMPASS_COMPARE_AREAS = [
  { id: 'trust-accountability', name: 'ယုံကြည်စိတ်ချရမှုနှင့် တာဝန်ခံမှု' },
  { id: 'emotional-awareness-regulation', name: 'စိတ်ခံစားချက်ကို သိမြင်ကိုင်တွယ်မှု' },
  { id: 'social-self-expression', name: 'လူမှုဆက်ဆံရေးတွင် ကိုယ့်ကိုယ်ကို ဖော်ပြပုံ' },
  { id: 'disagreement-handling', name: 'အမြင်မတူမှုကို ကိုင်တွယ်ပုံ' },
  { id: 'personal-organization', name: 'ကိုယ်ပိုင်စီမံမှုနှင့် လုပ်ငန်းဆက်လက်ဆောင်ရွက်မှု' },
  { id: 'curiosity-open-thinking', name: 'စူးစမ်းလိုစိတ်နှင့် အတွေးအမြင်ဖွင့်လှစ်မှု' },
]

const CAREER_COMPARE_AREAS = [
  { id: 'R', name: 'R · လက်တွေ့လုပ်ဆောင်မှု (Realistic)' },
  { id: 'I', name: 'I · စူးစမ်းလေ့လာမှု (Investigative)' },
  { id: 'A', name: 'A · ဖန်တီးမှု (Artistic)' },
  { id: 'S', name: 'S · လူမှုကူညီမှု (Social)' },
  { id: 'E', name: 'E · ဦးဆောင်စည်းရုံးမှု (Enterprising)' },
  { id: 'C', name: 'C · စနစ်တကျစီမံမှု (Conventional)' },
]

const BONDSENSE_COMPARE_AREAS = [
  { id: 'trust-openness', name: 'ယုံကြည်မှုနှင့် ဖွင့်ဟပြောဆိုမှု' },
  { id: 'healthy-boundaries', name: 'ကိုယ်ပိုင်နယ်နိမိတ် ထိန်းသိမ်းမှု' },
  { id: 'empathy-listening', name: 'စာနာနားလည်မှုနှင့် နားထောင်ပေးမှု' },
  { id: 'conflict-navigation', name: 'သဘောထားကွဲလွဲမှု ကိုင်တွယ်ပုံ' },
]

const VALUEMAP_COMPARE_AREAS = [
  { id: 'autonomy-freedom', name: 'လွတ်လပ်မှုနှင့် ကိုယ်ပိုင်ဆုံးဖြတ်ခွင့်' },
  { id: 'stability-security', name: 'တည်ငြိမ်မှုနှင့် လုံခြုံမှု' },
  { id: 'growth-curiosity', name: 'တိုးတက်သင်ယူမှုနှင့် ဖန်တီးနိုင်စွမ်း' },
  { id: 'connection-contribution', name: 'မေတ္တာနှင့် အကျိုးပြုမှု' },
]

const EMOTIONLENS_COMPARE_AREAS = [
  { id: 'emotional-awareness', name: 'စိတ်ခံစားချက် သိမှတ်နိုင်စွမ်း' },
  { id: 'calm-regulation', name: 'စိတ်ဖိစီးမှု ကိုင်တွယ်တည်ငြိမ်မှု' },
  { id: 'self-compassion', name: 'ကိုယ့်ကိုယ်ကို ကြင်နာနားလည်မှု' },
  { id: 'overthinking-release', name: 'အတွေးလွန်ခြင်းမှ လွတ်မြောက်နိုင်မှု' },
]

function buildComparisonRows(earlier, later) {
  const type = getRecordAssessmentType(earlier)
  if (type === 'innerCompass') {
    return INNERCOMPASS_COMPARE_AREAS.map((dim) => {
      const before = earlier?.scores?.[dim.id]?.score ?? 0
      const after = later?.scores?.[dim.id]?.score ?? 0
      return { id: dim.id, label: dim.name, before, after, delta: after - before }
    })
  }
  if (type === 'bondSense') {
    return BONDSENSE_COMPARE_AREAS.map((dim) => {
      const before = earlier?.scores?.[dim.id]?.score ?? 0
      const after = later?.scores?.[dim.id]?.score ?? 0
      return { id: dim.id, label: dim.name, before, after, delta: after - before }
    })
  }
  if (type === 'valueMap') {
    return VALUEMAP_COMPARE_AREAS.map((dim) => {
      const before = earlier?.scores?.[dim.id]?.score ?? 0
      const after = later?.scores?.[dim.id]?.score ?? 0
      return { id: dim.id, label: dim.name, before, after, delta: after - before }
    })
  }
  if (type === 'emotionLens') {
    return EMOTIONLENS_COMPARE_AREAS.map((dim) => {
      const before = earlier?.scores?.[dim.id]?.score ?? 0
      const after = later?.scores?.[dim.id]?.score ?? 0
      return { id: dim.id, label: dim.name, before, after, delta: after - before }
    })
  }
  if (type === 'careerInterest') {
    return CAREER_COMPARE_AREAS.map((cat) => {
      const before = earlier?.careerScores?.[cat.id]?.score ?? 0
      const after = later?.careerScores?.[cat.id]?.score ?? 0
      return { id: cat.id, label: cat.name, before, after, delta: after - before }
    })
  }
  return TRAITS.map((trait) => {
    const before = earlier?.scores?.[trait.id]?.score ?? 0
    const after = later?.scores?.[trait.id]?.score ?? 0
    return { id: trait.id, label: trait.name, before, after, delta: after - before }
  })
}

const HISTORY_FILTERS = [
  { id: 'all', label: 'အားလုံး' },
  { id: 'personality', label: 'TraitLens' },
  { id: 'innerCompass', label: 'InnerCompass' },
  { id: 'bondSense', label: 'BondSense' },
  { id: 'valueMap', label: 'ValueMap' },
  { id: 'emotionLens', label: 'EmotionLens' },
  { id: 'careerInterest', label: 'Career Interest' },
]

export default function HistoryPage({ history, onOpen, onDelete, onClear, onStart, onOpenMindProfile }) {
  const [filterType, setFilterType] = useState('all')
  const [selectedIds, setSelectedIds] = useState([])

  const filteredHistory = useMemo(() => {
    if (filterType === 'all') return history
    return history.filter((record) => getRecordAssessmentType(record) === filterType)
  }, [history, filterType])

  const activeSelectedIds = useMemo(
    () => selectedIds.filter((id) => history.some((record) => record.id === id)),
    [selectedIds, history],
  )

  const selectedRecords = useMemo(
    () => activeSelectedIds.map((id) => history.find((record) => record.id === id)).filter(Boolean),
    [activeSelectedIds, history],
  )

  const firstKey = selectedRecords[0] ? getRecordComparisonKey(selectedRecords[0]) : null

  const toggleSelect = (record) => {
    setSelectedIds((prev) => {
      const valid = prev.filter((id) => history.some((item) => item.id === id))
      if (valid.includes(record.id)) return valid.filter((id) => id !== record.id)
      if (valid.length >= 2) return [valid[1], record.id]
      if (valid.length === 1) {
        const first = history.find((item) => item.id === valid[0])
        if (first && getRecordComparisonKey(first) !== getRecordComparisonKey(record)) return valid
      }
      return [...valid, record.id]
    })
  }

  const comparison = useMemo(() => {
    if (selectedRecords.length !== 2) return null
    const sorted = [...selectedRecords].sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0))
    const [earlier, later] = sorted
    return {
      earlier,
      later,
      rows: buildComparisonRows(earlier, later),
    }
  }, [selectedRecords])

  return (
    <main className="mx-auto max-w-4xl px-4 py-9 pb-28 sm:px-6 sm:py-12">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-wide text-[#6b5e70]">YOUR SAVED RESULTS</p>
          <h1 className="mt-2 text-2xl font-bold text-[#4c3d51]">စမ်းသပ်မှုမှတ်တမ်း</h1>
          <p className="mt-2 text-xs leading-6 text-[#6b5e70]">ဒီ Browser ထဲမှာ သိမ်းထားတဲ့ ပြီးဆုံးသွားသော ရလဒ်များ</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {onOpenMindProfile && (
            <button
              type="button"
              onClick={onOpenMindProfile}
              className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-[#d8c7df] bg-[#f7f2f9] px-4 py-2 text-xs font-semibold text-[#614b6b] transition hover:bg-[#efe6f3]"
            >
              <Sparkles size={15} /> ကျွန်ုပ်၏ စိတ်ပုံရိပ် (My Mind Profile)
            </button>
          )}
          <span className="rounded-full bg-white px-3 py-2 text-xs font-semibold text-[#6b5e70] shadow-sm">{history.length} ခု</span>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-[#ded2e1] bg-white/70 px-6 py-14 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#f4edf6] text-[#80678f]"><History size={24} /></span>
          <h2 className="mt-4 text-lg font-bold text-[#57485c]">မှတ်တမ်း မရှိသေးပါ</h2>
          <p className="mx-auto mt-2 max-w-sm text-xs leading-6 text-[#6b5e70]">ဆန်းစစ်မှုတစ်ခုပြီးဆုံးတဲ့အခါ သင့်ရလဒ်ကို ဒီနေရာမှာ ပြန်ကြည့်နိုင်ပါတယ်။</p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => onStart(30, false)}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#80678f] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(128,103,143,0.2)] transition hover:bg-[#725981]"
            >
              စတင်ဖြေဆိုမယ် <ArrowRight size={17} />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="ဆန်းစစ်မှုအမျိုးအစား စစ်ထုတ်ရန်">
            {HISTORY_FILTERS.map((item) => {
              const count = item.id === 'all' ? history.length : history.filter((record) => getRecordAssessmentType(record) === item.id).length
              const active = filterType === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilterType(item.id)}
                  className={`min-h-10 rounded-full border px-3.5 text-xs font-semibold transition ${active ? 'border-[#80678f] bg-[#80678f] text-white' : 'border-[#e8dde9] bg-white text-[#5b4b60] hover:bg-[#faf7fb]'}`}
                >
                  {item.label} ({count})
                </button>
              )
            })}
          </div>

          {history.length >= 2 && (
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#eee5ed] bg-[#faf7fb] px-4 py-3">
              <p className="text-xs leading-6 text-[#5b4b60]">
                {activeSelectedIds.length === 0 && 'အချိန်ကာလအလိုက် ကိုယ်တိုင်ပြန်လည်နှိုင်းယှဉ်ရန် တူညီသော ဆန်းစစ်မှု ၂ ခုကို ရွေးချယ်နိုင်ပါသည်။'}
                {activeSelectedIds.length === 1 && 'နောက်ထပ် တူညီသော ဆန်းစစ်မှု ၁ ခုကို ရွေးချယ်ပါ (၁/၂ ရွေးထားသည်)။'}
                {activeSelectedIds.length === 2 && 'ရလဒ် ၂ ခုကို ရွေးချယ်ထားပါသည် (၂/၂)။'}
              </p>
              {activeSelectedIds.length > 0 && (
                <button type="button" onClick={() => setSelectedIds([])} className="text-xs font-semibold text-[#725981] hover:underline">
                  ရွေးချယ်မှု ရှင်းမယ်
                </button>
              )}
            </div>
          )}

          {comparison && (
            <section aria-label="ရလဒ် ၂ ခု နှိုင်းယှဉ်ချက်" className="mb-6 rounded-[1.5rem] border border-[#dfd2e4] bg-white p-4 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-2 border-b border-[#f1ebf2] pb-3">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-[#725981]">ATTEMPT COMPARISON</p>
                  <h2 className="mt-1 text-base font-bold text-[#4c3d51]">အစောပိုင်းနှင့် နောက်ပိုင်း ရလဒ်နှိုင်းယှဉ်ချက်</h2>
                </div>
                <button type="button" onClick={() => setSelectedIds([])} className="text-xs font-semibold text-[#6b5e70] hover:text-[#4c3d51]">ပိတ်မယ်</button>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-[#5b4b60]">
                <div className="rounded-xl bg-[#f8f5f9] p-3">
                  <p className="font-bold text-[#6b5e70]">အစောပိုင်း</p>
                  <p className="mt-1 leading-5">{formatDate(comparison.earlier.createdAt)}</p>
                </div>
                <div className="rounded-xl bg-[#f4eef6] p-3">
                  <p className="font-bold text-[#725981]">နောက်ပိုင်း</p>
                  <p className="mt-1 leading-5">{formatDate(comparison.later.createdAt)}</p>
                </div>
              </div>
              <div className="mt-4 divide-y divide-[#f3edf4]">
                {comparison.rows.map((row) => {
                  const deltaText = row.delta > 0 ? `+${row.delta}` : `${row.delta}`
                  const deltaColor = row.delta > 0 ? 'text-[#2f6b45] bg-[#edf6ef]' : row.delta < 0 ? 'text-[#865569] bg-[#fbf0f2]' : 'text-[#5b4b60] bg-[#f4f1f5]'
                  return (
                    <div key={row.id} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs font-semibold leading-5 text-[#4c3d51]">{row.label}</p>
                      <div className="flex items-center justify-between gap-3 sm:justify-end">
                        <span className="text-xs tabular-nums text-[#6b5e70]">{row.before} → <strong className="text-[#4c3d51]">{row.after}</strong></span>
                        <span className={`min-w-[3.25rem] rounded-full px-2.5 py-1 text-center text-xs font-bold tabular-nums ${deltaColor}`}>{deltaText}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
              <p className="mt-3 text-xs leading-6 text-[#6b5e70]">အမှတ်ကွာခြားချက်သည် အချိန်ကာလ ၂ ခုအကြား သင့်အဖြေရွေးချယ်မှု ပြောင်းလဲပုံကိုသာ ဖော်ပြခြင်းဖြစ်ပြီး အကောင်းအဆိုး တိုင်းတာချက် မဟုတ်ပါ။</p>
            </section>
          )}

          {filteredHistory.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#ded2e1] bg-white/70 px-5 py-10 text-center">
              <p className="text-xs font-semibold text-[#5b4b60]">ရွေးချယ်ထားသော အမျိုးအစားအတွက် မှတ်တမ်း မရှိသေးပါ။</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredHistory.map((record) => {
                const isCareer = record.assessmentType === 'careerInterest'
                const isInnerCompass = record.assessmentType === 'innerCompass'
                const isBondSense = record.assessmentType === 'bondSense'
                const isValueMap = record.assessmentType === 'valueMap'
                const isEmotionLens = record.assessmentType === 'emotionLens'
                const profile = !isCareer && !isInnerCompass && !isBondSense && !isValueMap && !isEmotionLens && record.scores ? getPersonalityProfile(record.scores) : null
                const isSelected = activeSelectedIds.includes(record.id)
                const incompatible = Boolean(firstKey && !isSelected && getRecordComparisonKey(record) !== firstKey)
                return (
                  <article key={record.id} className={`flex flex-col gap-4 rounded-2xl border bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5 ${isSelected ? 'border-[#80678f] ring-1 ring-[#80678f]/30' : 'border-[#eee5ed]'}`}>
                    <button onClick={() => onOpen(record)} className="flex min-w-0 flex-1 items-center gap-3 text-left">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#f3edf5] text-[#80678f]"><Sparkles size={19} /></span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-bold text-[#594a5e]">{isCareer ? `Career Interest · ${record.careerCode || 'စိတ်ဝင်စားမှု'}` : isInnerCompass ? 'InnerCompass · စိတ်နေသဘောထားသုံးသပ်မှု' : isBondSense ? 'BondSense · ဆက်ဆံရေးသုံးသပ်မှု' : isValueMap ? 'ValueMap · ဘဝတန်ဖိုးသုံးသပ်မှု' : isEmotionLens ? 'EmotionLens · စိတ်ခံစားချက်သုံးသပ်မှု' : (profile?.title || 'TraitLens · ပင်ကိုစရိုက်ဆန်းစစ်မှု')}</span>
                        <span className="mt-1 block text-xs text-[#6b5e70]">{formatDate(record.createdAt)}</span>
                        <span className="mt-1 block text-xs text-[#6b5e70]">{record.questionCount || record.level || (isBondSense || isValueMap || isEmotionLens ? 20 : 30)} မေးခွန်း · {isCareer ? 'အလုပ်အကိုင် စိတ်ဝင်စားမှု' : isInnerCompass ? 'ကိုယ်တိုင်ပြန်လည်သုံးသပ်မှု' : isBondSense ? 'ဆက်ဆံရေး Pilot' : isValueMap ? 'ဘဝတန်ဖိုး Pilot' : isEmotionLens ? 'စိတ်ခံစားချက် Pilot' : `အဓိကကဏ္ဍ: ${profile?.primary?.name || 'TraitLens'}`}</span>
                      </span>
                    </button>
                    <div className="flex flex-wrap items-center justify-between gap-2 sm:justify-end">
                      {history.length >= 2 && (
                        <button
                          type="button"
                          disabled={incompatible}
                          onClick={() => toggleSelect(record)}
                          aria-pressed={isSelected}
                          title={incompatible ? 'တူညီသော ဆန်းစစ်မှုအမျိုးအစား (နှင့် မေးခွန်းအရေအတွက်) ကိုသာ နှိုင်းယှဉ်နိုင်ပါသည်' : undefined}
                          className={`min-h-10 rounded-xl border px-3 text-xs font-semibold transition ${isSelected ? 'border-[#80678f] bg-[#f4eef6] text-[#5b4b60]' : 'border-[#e6dce8] bg-white text-[#5b4b60] hover:bg-[#faf7fb]'} ${incompatible ? 'cursor-not-allowed opacity-45' : ''}`}
                        >
                          {isSelected ? 'ရွေးထားသည်' : 'နှိုင်းယှဉ်ရန်'}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => onOpen(record)}
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-[#e5dce6] bg-white px-5 py-2.5 text-sm font-semibold text-[#6e5a77] transition hover:border-[#cdbdd2] hover:bg-[#faf7fb]"
                      >
                        ရလဒ်ကြည့်မယ် <ChevronRight size={16} />
                      </button>
                      <button onClick={() => onDelete(record.id)} aria-label="မှတ်တမ်းဖျက်ရန်" className="grid h-10 w-10 place-items-center rounded-xl text-[#865569] transition hover:bg-[#fbf0f2] hover:text-[#a65f79]"><Trash2 size={17} /></button>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </>
      )}
      {history.length > 0 && (
        <div className="mt-5 flex flex-col justify-between gap-3 rounded-2xl bg-[#f3edf4] p-4 sm:flex-row sm:items-center">
          <p className="text-xs leading-6 text-[#6b5e70]">{STORAGE_HINT}</p>
          <button onClick={onClear} className="inline-flex items-center gap-2 text-xs font-semibold text-[#865569] hover:text-[#8e4f68]"><Trash2 size={14} /> မှတ်တမ်းအားလုံးဖျက်မယ်</button>
        </div>
      )}
    </main>
  )
}
