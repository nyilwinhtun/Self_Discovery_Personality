import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowLeft, ArrowRight, Check, CheckCircle2, ChevronRight, ClipboardCheck,
  Download, Home, LockKeyhole, PauseCircle, RotateCcw, ShieldCheck,
} from 'lucide-react'
import { CAREER_ANSWER_OPTIONS, CAREER_QUESTIONS, RIASEC_BANK_VERSION, RIASEC_CATEGORIES } from '../data/careerQuestions.js'
import { buildCareerResult, getCareerScoreBand } from '../utils/careerScoring.js'
import { clearDraft, loadAppData, loadDraft, saveAssessment, saveDraft } from '../utils/storage.js'

const ASSESSMENT_TYPE = 'careerInterest'
const LEVEL = 30
const STORAGE_HINT = 'သင့်အဖြေများကို ဒီ Browser နဲ့ ဒီစက်ထဲမှာပဲ သိမ်းထားပါတယ်။ Browser Data ရှင်းလိုက်ရင် အဖြေတွေ ပျောက်နိုင်ပါတယ်။ JSON Backup ကို ပုံမှန်ထုတ်ထားပါ။'

function formatDate(value) {
  if (!value) return 'မသိရှိပါ'
  try {
    return new Intl.DateTimeFormat('my-MM', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(value))
  } catch {
    return new Date(value).toLocaleString()
  }
}

function Button({ children, onClick, secondary = false, disabled = false, icon: Icon = ArrowRight }) {
  return <button type="button" onClick={onClick} disabled={disabled} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${secondary ? 'border border-[#e5dce6] bg-white text-[#6e5a77] hover:bg-[#faf7fb]' : 'bg-[#80678f] text-white shadow-sm hover:bg-[#725981]'}`}>{children}<Icon size={16} /></button>
}

function categoryFor(question) {
  return RIASEC_CATEGORIES.find((item) => item.id === question?.categoryId) || RIASEC_CATEGORIES[0]
}

function IntroView({ draft, onResume, onStart, onHome }) {
  const [acknowledged, setAcknowledged] = useState(false)
  const answered = Object.keys(draft?.answers || {}).length
  const progress = Math.round((answered / LEVEL) * 100)
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <button onClick={onHome} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#716679] hover:text-[#614b6b]"><ArrowLeft size={16} /> ပင်မစာမျက်နှာ</button>
      <section className="overflow-hidden rounded-[2rem] border border-[#eee4ed] bg-white card-shadow">
        <div className="bg-gradient-to-br from-[#f0e9f3] via-[#fbf7f6] to-[#f7edf0] px-6 py-8 sm:px-9 sm:py-10">
          <span className="inline-flex rounded-full border border-white/80 bg-white/75 px-3 py-1.5 text-xs font-semibold text-[#80678f]">CAREER INTEREST</span>
          <h1 className="mt-4 text-2xl font-bold leading-relaxed text-[#493a4e] sm:text-3xl">သင် ဘယ်လိုလုပ်ဆောင်မှုမျိုးကို ပိုနှစ်သက်ပါသလဲ။</h1>
          <p className="mt-3 max-w-2xl text-sm leading-8 text-[#6f6276]">ဒီဆန်းစစ်မှုက သင်လုပ်ရတာကို စိတ်ဝင်စားပြီး ပျော်ရွှင်နိုင်မယ့် အလုပ်ဆိုင်ရာလုပ်ဆောင်မှုတွေကို ရှာဖွေပေးပါတယ်။ လက်ရှိကျွမ်းကျင်မှုနဲ့ အတွေ့အကြုံကို စစ်ဆေးတာမဟုတ်ပါဘူး။</p>
        </div>
        <div className="p-6 sm:p-9">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-[#faf7fa] p-4"><p className="text-xs text-[#74677b]">မေးခွန်း</p><p className="mt-1 text-2xl font-bold text-[#80678f]">၃၀ ခု</p></div>
            <div className="rounded-2xl bg-[#faf7fa] p-4"><p className="text-xs text-[#74677b]">စိတ်ဝင်စားမှု အမျိုးအစား</p><p className="mt-1 text-2xl font-bold text-[#80678f]">၆ မျိုး</p></div>
            <div className="rounded-2xl bg-[#faf7fa] p-4"><p className="text-xs text-[#74677b]">ဖြေဆိုမှု</p><p className="mt-1 text-sm font-bold leading-6 text-[#80678f]">ခဏရပ်၊ ပြန်ဆက်နိုင်</p></div>
          </div>
          <div className="mt-6 space-y-3">
            {[
              ['နှစ်သက်မှုကိုပဲ အခြေခံဖြေပါ', 'ဒီလုပ်ဆောင်မှုကို လုပ်ခွင့်ရရင် ဘယ်လောက်နှစ်သက်မလဲဆိုတာကို စဉ်းစားပါ။ လုပ်တတ်ခြင်း၊ အတွေ့အကြုံရှိခြင်း၊ ဝင်ငွေဘယ်လောက်ရမလဲဆိုတာကို မစဉ်းစားပါနဲ့။'],
              ['အဖြေမှန်၊ မှား မရှိပါ', 'ကိုယ့်ရဲ့ တကယ့်စိတ်ဝင်စားမှုကို ရွေးချယ်ပါ။ ကိုယ်ဖြစ်ချင်တဲ့ပုံစံနဲ့ မဖြေဘဲ လက်ရှိခံစားချက်ကို အခြေခံပါ။'],
              ['ကျော်ပြီး နောက်မှပြန်ဖြေနိုင်ပါတယ်', 'မသေချာတဲ့မေးခွန်းကို ကျော်ထားနိုင်ပြီး နောက်ဆုံးမှာ စာရင်းနဲ့ ပြန်စစ်နိုင်ပါတယ်။'],
              ['ဒီစစ်ဆေးမှုက ဘာကို မတိုင်းတာသလဲ', 'လက်ရှိကျွမ်းကျင်မှု၊ ဉာဏ်ရည်၊ အလုပ်ရရှိနိုင်မှု၊ အောင်မြင်မှု သို့မဟုတ် အနာဂတ်ကို ခန့်မှန်းတာ မဟုတ်ပါ။'],
              ['အဖြေတွေ အလိုအလျောက်သိမ်းမယ်', 'ခဏရပ်သွားရင် နောက်တစ်ကြိမ် ဒီစက်နဲ့ Browser ကို ပြန်ဖွင့်ပြီး အရင်နေရာကနေ ဆက်ဖြေနိုင်ပါတယ်။'],
            ].map(([title, body]) => <div key={title} className="flex gap-3 rounded-2xl bg-[#faf7fa] p-4"><span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white text-[#80678f] shadow-sm"><Check size={16}/></span><div><h2 className="text-sm font-bold text-[#5c4c62]">{title}</h2><p className="mt-1 text-xs leading-6 text-[#716679]">{body}</p></div></div>)}
          </div>
          <div className="mt-6 rounded-2xl border border-[#eee4ed] bg-[#fcfafb] p-4"><div className="flex gap-3"><ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#90789c]"/><p className="text-xs leading-7 text-[#716679]">{STORAGE_HINT} ရလဒ်ရမှတ်များသည် သင်ဖြေဆိုထားသည့် အဖြေများကို အညွှန်းအဖြစ် ဖော်ပြခြင်းသာဖြစ်ပြီး လူအများနှင့် နှိုင်းယှဉ်ထားခြင်း မဟုတ်ပါ။</p></div></div>
          <div className="mt-5 rounded-2xl border border-[#eadfe9] bg-[#fbf7fb] p-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input type="checkbox" checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#80678f]" />
              <span className="text-xs leading-6 text-[#66576b]">အထက်ပါအချက်များကို ဖတ်ရှုပြီး နားလည်ပါသည်။ ဒီစစ်ဆေးမှုဟာ စိတ်ဝင်စားမှုကိုသာ လေ့လာတာဖြစ်ပြီး လက်ရှိကျွမ်းကျင်မှု သို့မဟုတ် အလုပ်အကိုင်သင့်တော်မှုကို အပြီးသတ်ဆုံးဖြတ်တာ မဟုတ်ကြောင်း သိရှိပါသည်။</span>
            </label>
          </div>
          {draft && (
            <div className="mt-6 rounded-2xl border border-[#d8c7df] bg-[#faf6fb] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2"><p className="text-sm font-bold text-[#725f7a]">မပြီးသေးတဲ့ ဖြေဆိုမှုရှိပါတယ်</p><span className="text-xs font-semibold text-[#80678f]">{progress}%</span></div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e9e1eb]"><div className="h-full rounded-full bg-[#9c82aa]" style={{ width: `${progress}%` }} /></div>
              <p className="mt-2 text-[11px] text-[#74677b]">ဖြေပြီး {answered} ခု · ကျော်ထား {(draft.skippedQuestionIds || []).filter((id) => draft.answers?.[id] === undefined).length} ခု · နောက်ဆုံး {formatDate(draft.updatedAt)}</p>
              <div className="mt-4 flex flex-wrap gap-2"><Button onClick={onResume}>အရင်နေရာက ဆက်ဖြေမယ်</Button><Button secondary icon={RotateCcw} onClick={onStart} disabled={!acknowledged}>အသစ်ပြန်စမယ်</Button></div>
            </div>
          )}
          {!draft && <div className="mt-7 flex flex-wrap justify-end gap-3"><Button secondary onClick={onHome}>နောက်မှလုပ်မယ်</Button><Button onClick={onStart} disabled={!acknowledged}>နားလည်ပါပြီ၊ စတင်ဖြေဆိုမယ်</Button></div>}
        </div>
      </section>
      <p className="mt-5 text-center text-[11px] leading-6 text-[#74677b]">ဤမေးခွန်းများသည် အလုပ်ဆိုင်ရာ စိတ်ဝင်စားမှု အမျိုးအစားများကို လေ့လာရန် မြန်မာဘာသာဖြင့် ကိုယ်ပိုင်ရေးဆွဲထားသော မူကြမ်းဖြစ်သည်။</p>
    </main>
  )
}

function QuestionView({ answers, skipped, index, onAnswer, onPrevious, onNext, onSkip, onReview, onExit }) {
  const question = CAREER_QUESTIONS[index]
  const category = categoryFor(question)
  const selected = answers[question.id]
  const answered = Object.keys(answers).length
  const skippedCount = skipped.filter((id) => answers[id] === undefined).length
  const progress = (answered / CAREER_QUESTIONS.length) * 100
  const isLast = index === CAREER_QUESTIONS.length - 1
  return (
    <main className="mx-auto max-w-3xl px-4 py-7 sm:px-6 sm:py-12">
      <div className="mb-7 flex items-center justify-between gap-3"><button onClick={onExit} className="inline-flex items-center gap-2 text-sm font-semibold text-[#8b7d90] hover:text-[#614b6b]"><ArrowLeft size={16}/> ခဏရပ်မယ်</button><span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-[#8b7d90] shadow-sm"><LockKeyhole size={12}/> အလိုအလျောက် သိမ်းဆည်းနေသည်</span></div>
      <section className="rounded-[2rem] border border-[#eee4ed] bg-white p-5 card-shadow sm:p-9">
        <div className="flex items-end justify-between gap-3"><div><p className="text-xs font-semibold tracking-wide text-[#a094a4]">CAREER INTEREST</p><h1 className="mt-2 text-xl font-bold text-[#4b3d50] sm:text-2xl">စိတ်ဝင်စားမှုကို ရွေးချယ်ပါ</h1></div><div className="text-right"><div className="text-xl font-bold tabular-nums text-[#80678f]">{String(index + 1).padStart(2, '0')}<span className="text-sm font-medium text-[#b1a6b5]"> / ၃၀</span></div><p className="text-[10px] text-[#a196a5]">ဖြေပြီး {answered} · ကျော်ထား {skippedCount}</p></div></div>
        <div className="mt-5 flex items-center justify-between text-[10px] text-[#9b8e9f]"><span>စုစုပေါင်း ဖြေဆိုမှု</span><span>{Math.round(progress)}%</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-[#f1ebf2]"><div className="h-full rounded-full bg-gradient-to-r from-[#9c82aa] to-[#c59aab] transition-all" style={{ width: `${progress}%` }}/></div>
        <div className="mt-7 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f4eef6] text-lg">{category.icon}</span><div><p className="text-xs font-bold text-[#725f7a]">{category.name}</p><p className="text-[10px] text-[#a296a6]">{category.en} · စိတ်ဝင်စားမှု အမျိုးအစား</p></div></div>
        <div className="my-7 min-h-36 rounded-[1.5rem] bg-gradient-to-br from-[#faf6fb] to-[#fcf7f6] px-5 py-7 sm:px-7 sm:py-8"><p className="text-[11px] font-semibold tracking-wide text-[#a293a8]">မေးခွန်း {index + 1}</p><h2 className="mt-3 text-lg font-bold leading-[1.9] text-[#493b4d] sm:text-[1.35rem]">{question.text}</h2></div>
        <p className="mb-3 text-xs font-semibold text-[#887990]">ဒီလုပ်ဆောင်မှုကို လုပ်ရမယ်ဆိုရင် ဘယ်လောက်နှစ်သက်မလဲ။</p>
        <div className="space-y-2.5" role="radiogroup" aria-label="နှစ်သက်မှု အဖြေရွေးချယ်မှု">{CAREER_ANSWER_OPTIONS.map((option) => { const isSelected = Number(selected) === option.value; return <button key={option.value} type="button" role="radio" aria-checked={isSelected} onClick={() => onAnswer(question.id, option.value)} className={`answer-option flex min-h-[56px] w-full items-center justify-between rounded-2xl border px-4 py-3 text-left ${isSelected ? 'border-[#9c82aa] bg-[#f6f0f8] shadow-[0_4px_14px_rgba(128,103,143,0.09)]' : 'border-[#eee8ef] bg-white hover:border-[#d9cadf] hover:bg-[#fcf9fc]'}`}><span className="flex items-center gap-3"><span className={`grid h-8 w-8 place-items-center rounded-xl text-xs font-bold ${isSelected ? 'bg-[#80678f] text-white' : 'bg-[#f5f1f5] text-[#95879a]'}`}>{option.value}</span><span className={`text-sm font-medium ${isSelected ? 'text-[#634c6e]' : 'text-[#746879]'}`}>{option.label}</span></span><span className={`grid h-5 w-5 place-items-center rounded-full border ${isSelected ? 'border-[#80678f] bg-[#80678f] text-white' : 'border-[#d9d0dc] text-transparent'}`}><Check size={12} strokeWidth={3}/></span></button> })}</div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#f0eaf0] pt-5"><Button secondary onClick={onPrevious} icon={ArrowLeft} disabled={index === 0}>ယခင်</Button><div className="flex flex-wrap items-center gap-2">{!selected && <button onClick={onSkip} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-dashed border-[#d8c8dc] bg-[#fcf9fc] px-4 py-2.5 text-sm font-semibold text-[#866d90] hover:bg-[#f7f1f8]">ကျော်ထားမယ် <ArrowRight size={15}/></button>}<Button onClick={isLast ? onReview : onNext} disabled={!selected} icon={isLast ? ClipboardCheck : ArrowRight}>{isLast ? 'အဖြေတွေ ပြန်စစ်မယ်' : 'နောက်တစ်ခု'}</Button></div></div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#faf7fa] px-4 py-3"><p className="text-[11px] leading-5 text-[#8f8292]">မသေချာသေးတဲ့မေးခွန်းကို ကျော်ထားပြီး နောက်မှ ပြန်ဖြေနိုင်ပါတယ်။</p><button onClick={onReview} className="text-xs font-semibold text-[#80678f] hover:text-[#654e70]">မေးခွန်းစာရင်းကြည့်မယ်</button></div>
      </section>
      <p className="mt-5 text-center text-[11px] leading-6 text-[#a69ba8]">{STORAGE_HINT}</p>
    </main>
  )
}

function ReviewView({ answers, skipped, onGoTo, onFinish, onBack }) {
  const [filter, setFilter] = useState('incomplete')
  const answered = CAREER_QUESTIONS.filter((question) => answers[question.id] !== undefined)
  const skippedItems = CAREER_QUESTIONS.filter((question) => answers[question.id] === undefined && skipped.includes(question.id))
  const unanswered = CAREER_QUESTIONS.filter((question) => answers[question.id] === undefined && !skipped.includes(question.id))
  const complete = unanswered.length === 0 && skippedItems.length === 0
  const visible = filter === 'answered' ? answered : filter === 'skipped' ? skippedItems : filter === 'unanswered' ? unanswered : [...skippedItems, ...unanswered]
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12"><button onClick={onBack} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#887990]"><ArrowLeft size={16}/> မေးခွန်းသို့ ပြန်သွားမယ်</button><section className="rounded-[2rem] border border-[#eee4ed] bg-white p-5 card-shadow sm:p-8"><p className="text-xs font-semibold tracking-wide text-[#a18fa7]">CAREER INTEREST REVIEW</p><h1 className="mt-2 text-2xl font-bold text-[#4c3d51]">ဖြေဆိုထားတာတွေကို ပြန်စစ်ပါ</h1><p className="mt-2 text-xs leading-6 text-[#938796]">ကျော်ထားတဲ့ မေးခွန်းနဲ့ မဖြေရသေးတဲ့ မေးခွန်းတွေကို ရွေးပြီး တိုက်ရိုက်ပြန်ဖြေနိုင်ပါတယ်။</p>
      <div className="mt-6 grid grid-cols-3 gap-2"><div className="rounded-xl bg-[#f1f7f2] p-3"><p className="text-2xl font-bold text-[#5d8d6e]">{answered.length}</p><p className="mt-1 text-[10px] text-[#73917b]">ဖြေပြီး</p></div><div className="rounded-xl bg-[#fff7ed] p-3"><p className="text-2xl font-bold text-[#b98754]">{skippedItems.length}</p><p className="mt-1 text-[10px] text-[#a88768]">ကျော်ထား</p></div><div className="rounded-xl bg-[#f7f3f8] p-3"><p className="text-2xl font-bold text-[#887393]">{unanswered.length}</p><p className="mt-1 text-[10px] text-[#95869e]">မဖြေရသေး</p></div></div>
      <div className="mt-6 flex flex-wrap gap-2">{[['incomplete','မဖြေရသေး'],['skipped','ကျော်ထား'],['unanswered','မရောက်သေး'],['answered','ဖြေပြီး']].map(([value,label]) => <button key={value} onClick={() => setFilter(value)} className={`rounded-full px-3 py-2 text-xs font-semibold ${filter === value ? 'bg-[#80678f] text-white' : 'bg-[#f4eff5] text-[#80678f]'}`}>{label}</button>)}</div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">{visible.length ? visible.map((question) => { const category = categoryFor(question); const done = answers[question.id] !== undefined; return <button key={question.id} onClick={() => onGoTo(CAREER_QUESTIONS.findIndex((item) => item.id === question.id))} className="flex items-start gap-3 rounded-xl border border-[#eee5ed] p-3 text-left hover:bg-[#fcf9fc]"><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-bold ${done ? 'bg-[#edf6ef] text-[#5d8d6e]' : 'bg-[#fff4e8] text-[#a87a4d]'}`}>{question.id}</span><span><span className="block text-[10px] font-semibold text-[#8e7c96]">{category.name}</span><span className="mt-1 block text-xs leading-6 text-[#6f6274]">{question.text}</span><span className="mt-1 block text-[10px] text-[#a196a5]">{done ? `ဖြေထားသောအဖြေ ${answers[question.id]}` : 'မဖြေရသေးပါ · နှိပ်ပြီးပြန်ဖြေပါ'}</span></span></button> }) : <p className="col-span-full rounded-xl bg-[#faf7fa] p-5 text-center text-xs text-[#96899b]">ဒီအမျိုးအစားထဲမှာ မေးခွန်းမရှိပါ။</p>}</div>
      <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><Button secondary onClick={onBack}>မေးခွန်းပြန်ကြည့်မယ်</Button><Button onClick={onFinish} disabled={!complete} icon={CheckCircle2}>ရလဒ်တွက်ချက်မယ်</Button></div>{!complete && <p className="mt-3 text-right text-[11px] text-[#a77c8d]">ရလဒ်ကြည့်ရန် မေးခွန်းအားလုံး ဖြေဆိုပါ။</p>}
    </section></main>
  )
}

function CareerResultView({ record, onHome, onRetake }) {
  const result = useMemo(() => record ? buildCareerResult(record.answers || CAREER_QUESTIONS.reduce((acc, item) => ({ ...acc, [item.id]: 3 }), {})) : null, [record])
  if (!record || !result) return null
  const topCategories = result.topCategories.map((id) => RIASEC_CATEGORIES.find((item) => item.id === id))
  const ranked = result.rankedIds.map((id) => RIASEC_CATEGORIES.find((item) => item.id === id))
  const downloadReport = () => {
    const lines = [
      'ကိုယ့်ကိုယ်ကို ရှာဖွေခြင်း — အလုပ်အကိုင်စိတ်ဝင်စားမှုအစီရင်ခံစာ',
      `ဖြေဆိုသည့်နေ့: ${formatDate(record.createdAt)}`,
      `မေးခွန်းအရေအတွက်: ${record.questionCount || 30}`,
      `စိတ်ဝင်စားမှုအတိုကောက်: ${result.code}`,
      '',
      ...ranked.map((category) => `${category.name} (${category.en}): ${result.scores[category.id].score}/100`),
      '', 'မှတ်ချက်: ရလဒ်များသည် လုပ်ဆောင်မှုအပေါ် စိတ်ဝင်စားမှုကိုသာ ဖော်ပြသည်။ လက်ရှိကျွမ်းကျင်မှု၊ အရည်အချင်း၊ အလုပ်အကိုင်သင့်တော်မှု သို့မဟုတ် အနာဂတ်အောင်မြင်မှုကို တိုက်ရိုက်မဆုံးဖြတ်ပါ။',
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `career-interest-report-${new Date(record.createdAt).toISOString().slice(0, 10)}.txt`
    anchor.click()
    URL.revokeObjectURL(url)
  }
  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12 lg:px-8">
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3"><button onClick={onHome} className="inline-flex items-center gap-2 text-sm font-semibold text-[#897b8e]"><ArrowLeft size={16}/> ပင်မစာမျက်နှာ</button><div className="flex flex-wrap gap-2"><Button secondary onClick={downloadReport} icon={Download}>အစီရင်ခံစာ သိမ်းမယ်</Button><Button secondary onClick={() => window.print()} icon={ClipboardCheck}>Print</Button></div></div>
      <section className="print-card overflow-hidden rounded-[2rem] border border-[#eee4ed] bg-gradient-to-br from-[#f0e9f3] via-[#fbf7f6] to-[#f7edf0] p-6 card-shadow sm:p-10"><div className="mx-auto max-w-3xl text-center"><span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-3 py-1.5 text-xs font-semibold text-[#80678f]"><CheckCircle2 size={14}/> ဆန်းစစ်မှု ပြီးဆုံးပါပြီ</span><p className="mt-5 text-xs font-semibold tracking-[0.15em] text-[#a18fa7]">YOUR CAREER INTEREST PROFILE</p><h1 className="mt-3 text-3xl font-bold tracking-[0.18em] text-[#493a4e] sm:text-4xl">{result.code}</h1><p className="mt-2 text-sm font-semibold text-[#725f7a]">သင့်ရဲ့ အဓိကစိတ်ဝင်စားမှု ၃ မျိုး</p><p className="mt-2 text-xs text-[#9a8d9e]">{record.questionCount || 30} မေးခွန်း · {formatDate(record.createdAt)}</p><p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-[#76697b]">ဒီအတိုကောက်ဟာ သင့်အဖြေတွေထဲမှာ အညွှန်းရမှတ်အမြင့်ဆုံး ရရှိတဲ့ စိတ်ဝင်စားမှု အမျိုးအစား ၃ ခုကို အစဉ်လိုက်ဖော်ပြတာပါ။ ဒါဟာ သင့်အလုပ်အကိုင်ကို သတ်မှတ်ပေးတာ မဟုတ်ဘဲ ဆက်လက်စူးစမ်းကြည့်ဖို့ လမ်းညွှန်ချက်တစ်ခု ဖြစ်ပါတယ်။ {result.topScoresAreClose ? 'ထိပ်ဆုံး အမျိုးအစားတွေမှာ အမှတ်ကွာခြားမှု နည်းနေတဲ့အတွက် အဲဒီကဏ္ဍတွေကို နီးစပ်တဲ့ စိတ်ဝင်စားမှုများအဖြစ် အတူတကွ စဉ်းစားပါ။' : ''}</p></div>
        <div className="mt-8 grid gap-3 md:grid-cols-3">{topCategories.map((category, index) => <article key={category.id} className="rounded-2xl border border-white/90 bg-white/85 p-5"><div className="flex items-center justify-between"><span className="text-2xl">{category.icon}</span><span className="rounded-full bg-[#f3edf5] px-2.5 py-1 text-[10px] font-semibold text-[#80678f]">အဆင့် {index + 1}</span></div><h2 className="mt-3 text-sm font-bold text-[#5b4b60]">{category.name}</h2><p className="mt-1 text-[10px] text-[#9b8ba0]">{category.en}</p><p className="mt-3 text-xs leading-7 text-[#827585]">{category.description}</p></article>)}</div>
      </section>
      <section className="mt-8 rounded-[1.75rem] border border-[#eee4ed] bg-white p-5 sm:p-7"><div className="mb-5"><p className="text-xs font-semibold tracking-wide text-[#a18fa7]">YOUR SIX INTEREST AREAS</p><h2 className="mt-1 text-xl font-bold text-[#514357]">စိတ်ဝင်စားမှု အမျိုးအစား ၆ မျိုး၏ ရမှတ်</h2><p className="mt-2 text-xs leading-6 text-[#938796]">အညွှန်းရမှတ်များကို အမြင့်မှ အနိမ့်သို့ စီထားပါတယ်။ ဒီရမှတ်တွေဟာ သင့်အဖြေများကိုသာ အခြေခံပြီး လူဦးရေစံနှုန်း သို့မဟုတ် Percentile မဟုတ်ပါ။</p></div>
        <div className="space-y-5">{ranked.map((category, index) => { const score = result.scores[category.id].score; return <div key={category.id}><div className="flex items-start justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f5eff6] text-lg">{category.icon}</span><div><p className="text-sm font-bold text-[#58495e]">{category.name}</p><p className="mt-0.5 text-[10px] text-[#a297a6]">{category.en} · {category.id}</p></div></div><div className="shrink-0 text-right"><p className="text-lg font-bold tabular-nums text-[#80678f]">{score}<span className="text-[10px] font-medium text-[#aa9eae]"> / 100</span></p><p className="text-[10px] text-[#96899a]">{getCareerScoreBand(score)}</p></div></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-[#f2edf3]"><div className="h-full rounded-full bg-gradient-to-r from-[#9c82aa] to-[#c59aab]" style={{ width: `${score}%` }}/></div></div>})}</div>
      </section>
      <section className="mt-8 rounded-[1.75rem] border border-[#eee4ed] bg-white p-5 sm:p-7"><div className="flex items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#f4edf6] text-[#80678f]"><PauseCircle size={18}/></span><div><p className="text-xs font-semibold text-[#a18fa7]">NEXT EXPLORATION</p><h2 className="text-lg font-bold text-[#514357]">နောက်တစ်ဆင့် ဘာလုပ်ကြည့်နိုင်မလဲ။</h2></div></div><div className="mt-4 grid gap-3 md:grid-cols-3">{topCategories.map((category) => <article key={category.id} className="rounded-2xl bg-[#faf7fa] p-4"><h3 className="text-sm font-bold text-[#65556a]">{category.name}</h3><p className="mt-2 text-xs leading-7 text-[#8b7f8f]">{category.examples}</p></article>)}</div></section>
      <section className="mt-6 rounded-2xl border border-[#eee4ed] bg-[#fbf8fb] p-5"><p className="text-xs font-bold text-[#66576b]">ရလဒ်ကို ဘယ်လိုနားလည်ရမလဲ။</p><p className="mt-2 text-xs leading-7 text-[#918595]">ဤဆန်းစစ်မှုသည် စိတ်ဝင်စားမှု အမျိုးအစား ၆ ခုကို လေ့လာရန် မြန်မာဘာသာဖြင့် ကိုယ်ပိုင်ရေးဆွဲထားသော မေးခွန်းများကို အသုံးပြုထားသည်။ တရားဝင်မေးခွန်းစာရင်း သို့မဟုတ် စမ်းသပ်အတည်ပြုပြီးသော ဘာသာပြန်မူ မဟုတ်ပါ။ ရလဒ်သည် သင်နှစ်သက်နိုင်သော လုပ်ဆောင်မှုအမျိုးအစားများကိုသာ ဖော်ပြပြီး လက်ရှိကျွမ်းကျင်မှု၊ ပညာရေး၊ အလုပ်အကိုင်သင့်တော်မှု သို့မဟုတ် အနာဂတ်အောင်မြင်မှုကို တိုက်ရိုက်မဆုံးဖြတ်ပါ။ Personality Assessment နှင့် Skills Assessment တို့ကိုပါ ပေါင်းစပ်စဉ်းစားပြီးမှ အလုပ်အကိုင်လမ်းကြောင်းများကို လေ့လာသင့်ပါတယ်။</p></section>
      <div className="no-print mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Button onClick={onRetake} icon={RotateCcw}>ထပ်မံဖြေဆိုမယ်</Button><Button secondary onClick={onHome} icon={Home}>ပင်မစာမျက်နှာသို့</Button></div>
    </main>
  )
}

export default function CareerInterestModule({ onHome, onDataChange, record: initialRecord = null, persistRef }) {
  const initialDraft = loadDraft(LEVEL, ASSESSMENT_TYPE)
  const [page, setPage] = useState(initialRecord ? 'result' : 'intro')
  const [draft, setDraft] = useState(initialDraft)
  const [answers, setAnswers] = useState(initialRecord?.answers || {})
  const [skipped, setSkipped] = useState([])
  const [index, setIndex] = useState(0)
  const [startedAt, setStartedAt] = useState(initialRecord?.startedAt || null)
  const [activeRecord, setActiveRecord] = useState(initialRecord)
  const [toast, setToast] = useState('')
  const latestStateRef = useRef(null)

  const persistDraft = (override = {}) => {
    const next = {
      assessmentType: ASSESSMENT_TYPE,
      questionBankVersion: RIASEC_BANK_VERSION,
      level: LEVEL,
      questionCount: CAREER_QUESTIONS.length,
      answers,
      skippedQuestionIds: skipped,
      currentIndex: index,
      startedAt: startedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'in-progress',
      ...override,
    }
    const ok = saveDraft(next)
    setDraft(loadDraft(LEVEL, ASSESSMENT_TYPE))
    onDataChange?.(loadAppData())
    return ok
  }

  useEffect(() => {
    if (page === 'assessment' || page === 'review') persistDraft()
  }, [answers, skipped, index, page])

  latestStateRef.current = { page, persistDraft }

  useEffect(() => {
    if (!persistRef) return undefined
    persistRef.current = () => {
      const latest = latestStateRef.current
      if (latest && (latest.page === 'assessment' || latest.page === 'review')) latest.persistDraft()
    }
    return () => { persistRef.current = null }
  }, [persistRef])

  useEffect(() => {
    const flush = () => {
      if (page === 'assessment' || page === 'review') persistDraft()
    }
    window.addEventListener('beforeunload', flush)
    return () => window.removeEventListener('beforeunload', flush)
  }, [page, answers, skipped, index, startedAt])

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 2800)
    return () => window.clearTimeout(timer)
  }, [toast])

  const startNew = () => {
    if (loadDraft(LEVEL, ASSESSMENT_TYPE) && !window.confirm('မပြီးသေးတဲ့ Career Interest Draft ရှိပါတယ်။ အသစ်ပြန်စရင် အဲဒီ Draft ကို အစားထိုးပါမယ်။ ဆက်လုပ်မှာ သေချာပါသလား။')) return
    clearDraft(LEVEL, ASSESSMENT_TYPE)
    const now = new Date().toISOString()
    const empty = { assessmentType: ASSESSMENT_TYPE, questionBankVersion: RIASEC_BANK_VERSION, level: LEVEL, questionCount: 30, answers: {}, skippedQuestionIds: [], currentIndex: 0, startedAt: now, updatedAt: now, status: 'in-progress' }
    setDraft(empty)
    setAnswers({})
    setSkipped([])
    setIndex(0)
    setStartedAt(now)
    setActiveRecord(null)
    saveDraft(empty)
    onDataChange?.(loadAppData())
    setPage('instructions')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const resume = () => {
    const stored = loadDraft(LEVEL, ASSESSMENT_TYPE)
    if (!stored) { setToast('ဆက်လက်ဖြေဆိုရန် သိမ်းထားတဲ့ အဖြေမတွေ့ပါ။'); return }
    if (stored.questionBankVersion && stored.questionBankVersion !== RIASEC_BANK_VERSION) {
      setToast('မေးခွန်းဗားရှင်း မတူညီပါ။ Backup ထုတ်ပြီးနောက် အသစ်စတင်ဖို့ လိုအပ်နိုင်ပါတယ်။')
      return
    }
    setDraft(stored)
    setAnswers(stored.answers || {})
    setSkipped(stored.skippedQuestionIds || [])
    setIndex(Math.max(0, Math.min(Number(stored.currentIndex) || 0, CAREER_QUESTIONS.length - 1)))
    setStartedAt(stored.startedAt || stored.updatedAt || new Date().toISOString())
    setPage('assessment')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const begin = () => { setPage('assessment'); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const answer = (questionId, value) => {
    const nextAnswers = { ...answers, [questionId]: value }
    const nextSkipped = skipped.filter((id) => id !== questionId)
    setAnswers(nextAnswers)
    setSkipped(nextSkipped)
    saveDraft({ assessmentType: ASSESSMENT_TYPE, questionBankVersion: RIASEC_BANK_VERSION, level: LEVEL, questionCount: 30, answers: nextAnswers, skippedQuestionIds: nextSkipped, currentIndex: index, startedAt, updatedAt: new Date().toISOString(), status: 'in-progress' })
    setDraft(loadDraft(LEVEL, ASSESSMENT_TYPE))
    onDataChange?.(loadAppData())
  }
  const previous = () => { setIndex((current) => Math.max(0, current - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const next = () => {
    const question = CAREER_QUESTIONS[index]
    if (answers[question.id] === undefined) { setToast('အဖြေရွေးချယ်ပါ၊ ဒါမှမဟုတ် ဒီမေးခွန်းကို ကျော်ထားနိုင်ပါတယ်။'); return }
    if (index < CAREER_QUESTIONS.length - 1) setIndex((current) => current + 1)
    else setPage('review')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const skip = () => {
    const question = CAREER_QUESTIONS[index]
    if (answers[question.id] !== undefined) { setToast('ဒီမေးခွန်းကို ဖြေပြီးသားပါ။'); return }
    const nextSkipped = [...new Set([...skipped, question.id])]
    const nextIndex = Math.min(index + 1, CAREER_QUESTIONS.length - 1)
    setSkipped(nextSkipped)
    setIndex(nextIndex)
    saveDraft({ assessmentType: ASSESSMENT_TYPE, questionBankVersion: RIASEC_BANK_VERSION, level: LEVEL, questionCount: 30, answers, skippedQuestionIds: nextSkipped, currentIndex: nextIndex, startedAt, updatedAt: new Date().toISOString(), status: 'in-progress' })
    setDraft(loadDraft(LEVEL, ASSESSMENT_TYPE))
    onDataChange?.(loadAppData())
    if (index === CAREER_QUESTIONS.length - 1) setPage('review')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const goTo = (nextIndex) => { setIndex(Math.max(0, Math.min(nextIndex, CAREER_QUESTIONS.length - 1))); setPage('assessment'); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const finish = () => {
    const unanswered = CAREER_QUESTIONS.filter((question) => answers[question.id] === undefined)
    if (unanswered.length) { setToast(`မဖြေရသေးတဲ့ မေးခွန်း ${unanswered.length} ခု ကျန်နေပါသေးတယ်။`); setPage('review'); return }
    const result = buildCareerResult(answers)
    const record = {
      id: globalThis.crypto?.randomUUID?.() || `career-interest-${Date.now()}`,
      assessmentType: ASSESSMENT_TYPE,
      questionBankVersion: RIASEC_BANK_VERSION,
      level: LEVEL,
      questionCount: CAREER_QUESTIONS.length,
      createdAt: new Date().toISOString(),
      startedAt,
      answers,
      careerScores: result.scores,
      careerCode: result.code,
      topCategories: result.topCategories,
    }
    saveAssessment(record)
    setActiveRecord(record)
    setPage('result')
    onDataChange?.(loadAppData())
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const exit = () => { persistDraft(); onHome() }
  const retake = () => { setActiveRecord(null); startNew() }

  return (
    <>
      {page === 'intro' && <IntroView draft={draft} onResume={resume} onStart={startNew} onHome={onHome}/>}
      {page === 'instructions' && <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6"><section className="rounded-[2rem] border border-[#eee4ed] bg-white p-6 card-shadow sm:p-9"><p className="text-xs font-semibold tracking-wide text-[#a18fa7]">BEFORE YOU BEGIN</p><h1 className="mt-2 text-2xl font-bold text-[#4c3d51]">အဖြေရွေးချယ်ပုံ</h1><p className="mt-3 text-sm leading-8 text-[#827585]">လုပ်ဆောင်မှုတစ်ခုကို ကိုယ်တိုင်လုပ်ရမယ်ဆိုရင် ဘယ်လောက်နှစ်သက်မလဲဆိုတာ ရွေးပါ။ လုပ်ဖူး/မလုပ်ဖူး၊ တတ်/မတတ်ဆိုတာကို မစဉ်းစားပါနဲ့။</p><div className="mt-5 space-y-2">{CAREER_ANSWER_OPTIONS.map((item) => <div key={item.value} className="flex items-center gap-3 rounded-xl bg-[#faf7fa] p-3"><span className="grid h-8 w-8 place-items-center rounded-lg bg-white text-sm font-bold text-[#80678f]">{item.value}</span><span className="text-sm text-[#6f6274]">{item.label}</span></div>)}</div><div className="mt-7 flex flex-wrap justify-end gap-2"><Button secondary onClick={() => setPage('intro')}>နောက်သို့</Button><Button onClick={begin}>မေးခွန်း စတင်ဖြေမယ်</Button></div></section></main>}
      {page === 'assessment' && <QuestionView answers={answers} skipped={skipped} index={index} onAnswer={answer} onPrevious={previous} onNext={next} onSkip={skip} onReview={() => setPage('review')} onExit={exit}/>}
      {page === 'review' && <ReviewView answers={answers} skipped={skipped} onGoTo={goTo} onFinish={finish} onBack={() => setPage('assessment')}/>}
      {page === 'result' && <CareerResultView record={activeRecord} onHome={onHome} onRetake={retake}/>}
      {toast && <div role="status" className="no-print fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#514357] px-5 py-3 text-xs font-semibold text-white shadow-xl">{toast}</div>}
    </>
  )
}
