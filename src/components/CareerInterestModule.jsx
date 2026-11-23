import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AlertTriangle, ArrowLeft, ArrowRight, Check, CheckCircle2, ChevronRight, ClipboardCheck,
  Download, Home, LockKeyhole, PauseCircle, RotateCcw, ShieldCheck,
} from 'lucide-react'
import {
  PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip,
} from 'recharts'
import { CAREER_ANSWER_OPTIONS, CAREER_QUESTIONS, RIASEC_BANK_VERSION, RIASEC_CATEGORIES } from '../data/careerQuestions.js'
import { buildCareerResult, getCareerScoreBand } from '../utils/careerScoring.js'
import { trackAssessmentCompleted } from '../utils/analytics.js'
import { downloadTextFile } from '../utils/download.js'
import { clearDraft, loadAppData, loadDraft, saveAssessmentWithStatus, saveDraft } from '../utils/storage.js'
import KnowledgeInlineHelp from './KnowledgeInlineHelp.jsx'
import LikertScaleSelector from './LikertScaleSelector.jsx'
import MobileQuestionActions from './MobileQuestionActions.jsx'
import { CareerInterestEmblem } from './ModuleEmblems.jsx'
import ReportSectionNavigation from './ReportSectionNavigation.jsx'
import ResultShareCardButton from './ResultShareCardButton.jsx'
import StorageWriteAlert from './StorageWriteAlert.jsx'
import { useAutoAdvance } from '../hooks/useAutoAdvance.js'

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

function CareerPolarTick({ payload, x, y, textAnchor }) {
  return (
    <text x={x} y={y} dy={4} textAnchor={textAnchor} fill="#5b4b60" fontSize={11} fontFamily="Noto Sans Myanmar">
      {payload?.value}
    </text>
  )
}

function IntroView({ draft, onResume, onStart, onHome, storageAlertVisible, onExportBackup, onDismissStorageError }) {
  const [acknowledged, setAcknowledged] = useState(false)
  const answered = Object.keys(draft?.answers || {}).length
  const progress = Math.round((answered / LEVEL) * 100)
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <button onClick={onHome} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#716679] hover:text-[#614b6b]"><ArrowLeft size={16} /> ပင်မစာမျက်နှာ</button>
      <StorageWriteAlert visible={storageAlertVisible} onExportBackup={onExportBackup} onDismiss={onDismissStorageError} />
      <section className="overflow-hidden rounded-[2rem] border border-[#e7dfd6] bg-[#fffdf9] card-shadow">
        <div className="bg-gradient-to-br from-[#f6f1eb] via-[#faf8f5] to-[#f4efe7] px-6 py-8 sm:px-9 sm:py-10">
          <div className="flex items-center gap-4">
            <span className="grid h-[68px] w-[68px] shrink-0 place-items-center rounded-2xl border border-[#e8dccb] bg-[#faf8f5] text-[#7c5324]"><CareerInterestEmblem size={38} /></span>
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-[#7c5324]">CAREER INTEREST</p>
              <h1 className="mt-1 text-xl font-bold text-[#1c1917] sm:text-2xl">သင် ဘယ်လိုလုပ်ဆောင်မှုမျိုးကို ပိုနှစ်သက်ပါသလဲ။</h1>
            </div>
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-[#44403c]">ဒီဆန်းစစ်မှုက သင်လုပ်ရတာကို စိတ်ဝင်စားပြီး ပျော်ရွှင်နိုင်မယ့် အလုပ်ဆိုင်ရာလုပ်ဆောင်မှုတွေကို ရှာဖွေပေးပါတယ်။ လက်ရှိကျွမ်းကျင်မှုနဲ့ အတွေ့အကြုံကို စစ်ဆေးတာမဟုတ်ပါဘူး။</p>
        </div>
        <div className="p-6 sm:p-9">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-[#faf7fa] p-4"><p className="text-xs text-[#74677b]">မေးခွန်း</p><p className="mt-1 text-2xl font-bold text-[#80678f]">၃၀ ခု</p></div>
            <div className="rounded-2xl bg-[#faf7fa] p-4"><p className="text-xs text-[#74677b]">စိတ်ဝင်စားမှု အမျိုးအစား</p><p className="mt-1 text-2xl font-bold text-[#80678f]">၆ မျိုး</p></div>
            <div className="rounded-2xl bg-[#faf7fa] p-4"><p className="text-xs text-[#74677b]">ကြာချိန် · ဖြေဆိုမှု</p><p className="mt-1 text-sm font-bold leading-6 text-[#80678f]">~၅ မိနစ် · ခဏရပ်၊ ပြန်ဆက်နိုင်</p></div>
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
          <div className="mt-6 rounded-2xl border border-[#eee4ed] bg-[#fcfafb] p-4">
            <h2 className="text-sm font-bold text-[#5c4c62]">အဖြေရွေးချယ်ပုံ (၁ မှ ၅ အထိ)</h2>
            <p className="mt-1 text-xs leading-6 text-[#716679]">လုပ်ဆောင်မှုတစ်ခုကို ကိုယ်တိုင်လုပ်ရမယ်ဆိုရင် ဘယ်လောက်နှစ်သက်မလဲဆိုတာ ရွေးပါ။ လုပ်ဖူး/မလုပ်ဖူး၊ တတ်/မတတ်ဆိုတာကို မစဉ်းစားပါနဲ့။</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-5">
              {CAREER_ANSWER_OPTIONS.map((item) => (
                <div key={item.value} className="flex items-center gap-2 rounded-xl bg-white p-2.5 shadow-xs sm:flex-col sm:items-start">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#faf7fa] text-xs font-bold text-[#80678f]">{item.value}</span>
                  <span className="text-[11px] leading-5 text-[#6f6274]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-[#eee4ed] bg-[#fcfafb] p-4"><div className="flex gap-3"><ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#6b5e70]"/><p className="text-xs leading-7 text-[#716679]">{STORAGE_HINT} ရလဒ်ရမှတ်များသည် သင်ဖြေဆိုထားသည့် အဖြေများကို အညွှန်းအဖြစ် ဖော်ပြခြင်းသာဖြစ်ပြီး လူအများနှင့် နှိုင်းယှဉ်ထားခြင်း မဟုတ်ပါ။</p></div></div>
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

function QuestionView({ answers, skipped, index, onAnswer, onPrevious, onNext, onSkip, onReview, onExit, storageError, storageAlertVisible, onExportBackup, onDismissStorageError, onOpenKnowledgeTerm }) {
  const question = CAREER_QUESTIONS[index]
  const selected = answers[question.id]
  const answered = Object.keys(answers).length
  const skippedCount = skipped.filter((id) => answers[id] === undefined).length
  const progress = (answered / CAREER_QUESTIONS.length) * 100
  const isLast = index === CAREER_QUESTIONS.length - 1
  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col justify-between px-3.5 pb-28 pt-3 sm:block sm:min-h-0 sm:px-6 sm:py-12">
      <div className="sm:hidden">
        <div className="mb-2 flex items-center justify-between gap-2">
          <button onClick={onExit} className="inline-flex min-h-10 items-center gap-1.5 text-xs font-semibold text-[#6b5e70] hover:text-[#614b6b]"><ArrowLeft size={15}/> ခဏရပ်</button>
          <div className="flex items-center gap-2">
            {storageError && <AlertTriangle size={14} className="text-[#9a3b3b]" aria-label="သိမ်းဆည်းမှု မအောင်မြင်ပါ" />}
            <span className="rounded-full bg-[#f5eff7] px-2.5 py-1 text-xs font-bold tabular-nums text-[#6f5879]">
              {index + 1} / ၃၀
            </span>
          </div>
        </div>
        <div className="mb-2.5 h-1.5 overflow-hidden rounded-full bg-[#efe9df]">
          <div className="progress-fill h-full rounded-full bg-gradient-to-r from-[#9c82aa] to-[#c59aab]" style={{ width: `${progress}%` }}/>
        </div>
      </div>
      <div className="mb-7 hidden items-center justify-between gap-3 sm:flex"><button onClick={onExit} className="inline-flex items-center gap-2 text-sm font-semibold text-[#6b5e70] hover:text-[#614b6b]"><ArrowLeft size={16}/> ခဏရပ်မယ်</button>{storageError ? <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e7b8b8] bg-[#fdf2f2] px-3 py-1.5 text-[11px] font-semibold text-[#9a3b3b] shadow-sm"><AlertTriangle size={12}/> သိမ်းဆည်းမှု မအောင်မြင်ပါ</span> : <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-[#6b5e70] shadow-sm"><LockKeyhole size={12}/> အလိုအလျောက် သိမ်းဆည်းနေသည်</span>}</div>
      <StorageWriteAlert visible={storageAlertVisible} onExportBackup={onExportBackup} onDismiss={onDismissStorageError} />
      <section className="rounded-2xl border border-[#ebe5dc] bg-[#fffdf9] p-3.5 card-shadow sm:rounded-[2rem] sm:p-9">
        <div className="hidden items-end justify-between gap-3 sm:flex"><div><p className="text-xs font-semibold tracking-wide text-[#524b59]">CAREER INTEREST</p><h1 className="mt-2 text-xl font-bold text-[#242029] sm:text-2xl">စိတ်ဝင်စားမှုကို ရွေးချယ်ပါ</h1></div><div className="text-right"><div className="text-xl font-bold tabular-nums text-[#80678f]">{String(index + 1).padStart(2, '0')}<span className="text-sm font-medium text-[#524b59]"> / ၃၀</span></div><p className="text-[11px] text-[#524b59]">ဖြေပြီး {answered} · ကျော်ထား {skippedCount}</p></div></div>
        <div className="mt-5 hidden items-center justify-between text-[11px] text-[#524b59] sm:flex"><span>စုစုပေါင်း ဖြေဆိုမှု</span><span>{Math.round(progress)}%</span></div><div className="mt-2 hidden h-2 overflow-hidden rounded-full bg-[#efe9df] sm:block"><div className="progress-fill h-full rounded-full bg-gradient-to-r from-[#9c82aa] to-[#c59aab]" style={{ width: `${progress}%` }}/></div>
        <div key={question.id} className="question-card-enter">
          <div className="my-2.5 min-h-[5.25rem] rounded-2xl border border-[#ebe5dc] bg-gradient-to-br from-[#faf6f1] to-[#fcf9f5] px-4 py-4 sm:my-7 sm:min-h-36 sm:rounded-[1.5rem] sm:px-7 sm:py-8"><p className="text-[11px] font-semibold tracking-wide text-[#524b59]">မေးခွန်း {index + 1}</p><h2 className="mt-1.5 text-base font-bold leading-[1.7] text-[#242029] sm:mt-3 sm:text-[1.35rem] sm:leading-[1.9]">{question.text}</h2><KnowledgeInlineHelp questionText={question.text} theme="trait" onOpenKnowledgeTerm={onOpenKnowledgeTerm} /></div>
          <p className="mb-2 hidden text-xs font-semibold text-[#524b59] sm:mb-3 sm:block">ဒီလုပ်ဆောင်မှုကို လုပ်ရမယ်ဆိုရင် ဘယ်လောက်နှစ်သက်မလဲ။</p>
          <LikertScaleSelector
            options={CAREER_ANSWER_OPTIONS}
            value={selected}
            onChange={(val) => onAnswer(question.id, val)}
            accent="plum"
            ariaLabel="နှစ်သက်မှု အဖြေရွေးချယ်မှု"
            startLabel="လုံးဝ မနှစ်သက်ပါ"
            endLabel="အလွန်နှစ်သက်ပါသည်"
          />
        </div>
        <div className="no-print mt-8 hidden flex-wrap items-center justify-between gap-3 border-t border-[#f0eaf0] pt-5 sm:flex"><Button secondary onClick={onPrevious} icon={ArrowLeft} disabled={index === 0}>ယခင်</Button><div className="flex flex-wrap items-center gap-2">{!selected && <button onClick={onSkip} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-dashed border-[#d8c8dc] bg-[#fcf9fc] px-4 py-2.5 text-sm font-semibold text-[#866d90] hover:bg-[#f7f1f8]">ကျော်ထားမယ် <ArrowRight size={15}/></button>}<Button onClick={isLast ? onReview : onNext} disabled={!selected} icon={isLast ? ClipboardCheck : ArrowRight}>{isLast ? 'အဖြေတွေ ပြန်စစ်မယ်' : 'နောက်တစ်ခု'}</Button></div></div>
        <div className="mt-4 hidden flex-wrap items-center justify-between gap-2 rounded-xl bg-[#faf7fa] px-4 py-3 sm:flex"><p className="text-[11px] leading-5 text-[#6b5e70]">မသေချာသေးတဲ့မေးခွန်းကို ကျော်ထားပြီး နောက်မှ ပြန်ဖြေနိုင်ပါတယ်။</p><button onClick={onReview} className="text-xs font-semibold text-[#80678f] hover:text-[#654e70]">မေးခွန်းစာရင်းကြည့်မယ်</button></div>
      </section>
      <MobileQuestionActions
        onPrevious={onPrevious}
        onNext={isLast ? onReview : onNext}
        onSkip={onSkip}
        onReview={onReview}
        canPrevious={index > 0}
        canNext={selected !== undefined}
        showSkip={selected === undefined}
        isLast={isLast}
      />
      <p className="mt-5 hidden text-center text-[11px] leading-6 text-[#6b5e70] sm:block">{STORAGE_HINT}</p>
    </main>
  )
}

function ReviewView({ answers, skipped, onGoTo, onFinish, onBack, storageAlertVisible, onExportBackup, onDismissStorageError }) {
  const [filter, setFilter] = useState('incomplete')
  const answered = CAREER_QUESTIONS.filter((question) => answers[question.id] !== undefined)
  const skippedItems = CAREER_QUESTIONS.filter((question) => answers[question.id] === undefined && skipped.includes(question.id))
  const unanswered = CAREER_QUESTIONS.filter((question) => answers[question.id] === undefined && !skipped.includes(question.id))
  const complete = unanswered.length === 0 && skippedItems.length === 0
  const visible = filter === 'answered' ? answered : filter === 'skipped' ? skippedItems : filter === 'unanswered' ? unanswered : [...skippedItems, ...unanswered]
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12"><button onClick={onBack} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#6b5e70]"><ArrowLeft size={16}/> မေးခွန်းသို့ ပြန်သွားမယ်</button><StorageWriteAlert visible={storageAlertVisible} onExportBackup={onExportBackup} onDismiss={onDismissStorageError} /><section className="rounded-[2rem] border border-[#eee4ed] bg-white p-5 card-shadow sm:p-8"><p className="text-xs font-semibold tracking-wide text-[#6b5e70]">CAREER INTEREST REVIEW</p><h1 className="mt-2 text-2xl font-bold text-[#4c3d51]">ဖြေဆိုထားတာတွေကို ပြန်စစ်ပါ</h1><p className="mt-2 text-xs leading-6 text-[#6b5e70]">ကျော်ထားတဲ့ မေးခွန်းနဲ့ မဖြေရသေးတဲ့ မေးခွန်းတွေကို ရွေးပြီး တိုက်ရိုက်ပြန်ဖြေနိုင်ပါတယ်။</p>
      <div className="mt-6 grid grid-cols-3 gap-2"><div className="rounded-xl bg-[#f1f7f2] p-3"><p className="text-2xl font-bold text-[#436b4f]">{answered.length}</p><p className="mt-1 text-[11px] text-[#436b4f]">ဖြေပြီး</p></div><div className="rounded-xl bg-[#fff7ed] p-3"><p className="text-2xl font-bold text-[#825824]">{skippedItems.length}</p><p className="mt-1 text-[11px] text-[#825824]">ကျော်ထား</p></div><div className="rounded-xl bg-[#f7f3f8] p-3"><p className="text-2xl font-bold text-[#6b5e70]">{unanswered.length}</p><p className="mt-1 text-[11px] text-[#6b5e70]">မဖြေရသေး</p></div></div>
      <div className="mt-6 flex flex-wrap gap-2">{[['incomplete','မဖြေရသေး'],['skipped','ကျော်ထား'],['unanswered','မရောက်သေး'],['answered','ဖြေပြီး']].map(([value,label]) => <button key={value} onClick={() => setFilter(value)} className={`rounded-full px-3 py-2 text-xs font-semibold ${filter === value ? 'bg-[#80678f] text-white' : 'bg-[#f4eff5] text-[#80678f]'}`}>{label}</button>)}</div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">{visible.length ? visible.map((question) => { const category = categoryFor(question); const done = answers[question.id] !== undefined; return <button key={question.id} onClick={() => onGoTo(CAREER_QUESTIONS.findIndex((item) => item.id === question.id))} className="flex items-start gap-3 rounded-xl border border-[#eee5ed] p-3 text-left hover:bg-[#fcf9fc]"><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-bold ${done ? 'bg-[#edf6ef] text-[#436b4f]' : 'bg-[#fff4e8] text-[#825824]'}`}>{question.id}</span><span><span className="block text-[11px] font-semibold text-[#6b5e70]">{category.name}</span><span className="mt-1 block text-xs leading-6 text-[#6f6274]">{question.text}</span><span className="mt-1 block text-[11px] text-[#6b5e70]">{done ? `ဖြေထားသောအဖြေ ${answers[question.id]}` : 'မဖြေရသေးပါ · နှိပ်ပြီးပြန်ဖြေပါ'}</span></span></button> }) : <p className="col-span-full rounded-xl bg-[#faf7fa] p-5 text-center text-xs text-[#6b5e70]">ဒီအမျိုးအစားထဲမှာ မေးခွန်းမရှိပါ။</p>}</div>
      <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><Button secondary onClick={onBack}>မေးခွန်းပြန်ကြည့်မယ်</Button><Button onClick={onFinish} disabled={!complete} icon={CheckCircle2}>ရလဒ်တွက်ချက်မယ်</Button></div>{!complete && <p className="mt-3 text-right text-[11px] text-[#865569]">ရလဒ်ကြည့်ရန် မေးခွန်းအားလုံး ဖြေဆိုပါ။</p>}
    </section></main>
  )
}

function CareerResultView({ record, onHome, onRetake, storageAlertVisible, onExportBackup, onDismissStorageError }) {
  const result = useMemo(() => record ? buildCareerResult(record.answers || CAREER_QUESTIONS.reduce((acc, item) => ({ ...acc, [item.id]: 3 }), {})) : null, [record])
  if (!record || !result) return null
  const topCategories = result.topCategories.map((id) => RIASEC_CATEGORIES.find((item) => item.id === id))
  const ranked = result.rankedIds.map((id) => RIASEC_CATEGORIES.find((item) => item.id === id))
  const chartData = RIASEC_CATEGORIES.map((category) => ({
    area: category.shortName,
    score: result.scores[category.id].score,
    fullMark: 100,
  }))
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
    downloadTextFile(
      `career-interest-report-${new Date(record.createdAt).toISOString().slice(0, 10)}.txt`,
      lines.join('\n'),
    )
  }
  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8">
      <StorageWriteAlert visible={storageAlertVisible} onExportBackup={onExportBackup} onDismiss={onDismissStorageError} />
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3"><button onClick={onHome} className="inline-flex items-center gap-2 text-sm font-semibold text-[#6b5e70]"><ArrowLeft size={16}/> ပင်မစာမျက်နှာ</button><div className="flex flex-wrap gap-2"><Button secondary onClick={downloadReport} icon={Download}>အစီရင်ခံစာ သိမ်းမယ်</Button><ResultShareCardButton tone="plum" getCardConfig={() => ({ filename: `career-interest-result-${new Date(record.createdAt).toISOString().slice(0, 10)}.png`, subtitle: 'CAREER INTEREST · RIASEC REFLECTION', title: 'အလုပ်အကိုင်စိတ်ဝင်စားမှု ၆ မျိုး အကျဉ်းချုပ်', metaLine: `မေးခွန်း ${record.questionCount || 30} · ${formatDate(record.createdAt)}`, highlightLine: `အဓိကစိတ်ဝင်စားမှု အတိုကောက်: ${result.code}`, items: ranked.map((c) => ({ label: `${c.name} (${c.id})`, score: result.scores[c.id].score })), accentColor: '#80678f', trackColor: '#efe8f1', footerNote: 'ရလဒ်များသည် လုပ်ဆောင်မှုအပေါ် စိတ်ဝင်စားမှုကိုသာ ဖော်ပြပြီး လက်ရှိကျွမ်းကျင်မှု သို့မဟုတ် အလုပ်အကိုင်သင့်တော်မှုကို တိုက်ရိုက်မဆုံးဖြတ်ပါ။' })} /><Button secondary onClick={() => window.print()} icon={ClipboardCheck}>Print</Button></div></div>
      <ReportSectionNavigation tone="plum" items={[
        { id: 'career-report-overview', label: 'အနှစ်ချုပ်' },
        { id: 'career-report-scores', label: 'စိတ်ဝင်စားမှု ၆ မျိုး' },
        { id: 'career-report-next', label: 'နောက်တစ်ဆင့်' },
        { id: 'career-report-notes', label: 'ရလဒ်ဖတ်ရှုရန်' },
      ]} />
      <section id="career-report-overview" className="scroll-mt-28 print-card overflow-hidden rounded-[2rem] border border-[#eee4ed] bg-gradient-to-br from-[#f0e9f3] via-[#fbf7f6] to-[#f7edf0] p-6 card-shadow sm:p-10"><div className="mx-auto max-w-3xl text-center"><span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-3 py-1.5 text-xs font-semibold text-[#80678f]"><CheckCircle2 size={14}/> ဆန်းစစ်မှု ပြီးဆုံးပါပြီ</span><p className="mt-5 text-xs font-semibold tracking-[0.15em] text-[#6b5e70]">YOUR CAREER INTEREST PROFILE</p><h1 className="mt-3 text-3xl font-bold tracking-[0.18em] text-[#493a4e] sm:text-4xl">{result.code}</h1><p className="mt-2 text-sm font-semibold text-[#725f7a]">သင့်ရဲ့ အဓိကစိတ်ဝင်စားမှု ၃ မျိုး</p><p className="mt-2 text-xs text-[#6b5e70]">{record.questionCount || 30} မေးခွန်း · {formatDate(record.createdAt)}</p><p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-[#6b5e70]">ဒီအတိုကောက်ဟာ သင့်အဖြေတွေထဲမှာ အညွှန်းရမှတ်အမြင့်ဆုံး ရရှိတဲ့ စိတ်ဝင်စားမှု အမျိုးအစား ၃ ခုကို အစဉ်လိုက်ဖော်ပြတာပါ။ ဒါဟာ သင့်အလုပ်အကိုင်ကို သတ်မှတ်ပေးတာ မဟုတ်ဘဲ ဆက်လက်စူးစမ်းကြည့်ဖို့ လမ်းညွှန်ချက်တစ်ခု ဖြစ်ပါတယ်။ {result.topScoresAreClose ? 'ထိပ်ဆုံး အမျိုးအစားတွေမှာ အမှတ်ကွာခြားမှု နည်းနေတဲ့အတွက် အဲဒီကဏ္ဍတွေကို နီးစပ်တဲ့ စိတ်ဝင်စားမှုများအဖြစ် အတူတကွ စဉ်းစားပါ။' : ''}</p></div>
        <div className="mt-8 grid gap-3 md:grid-cols-3">{topCategories.map((category, index) => <article key={category.id} className="rounded-2xl border border-white/90 bg-white/85 p-5"><div className="flex items-center justify-between"><span className="text-2xl">{category.icon}</span><span className="rounded-full bg-[#f3edf5] px-2.5 py-1 text-[11px] font-semibold text-[#80678f]">အဆင့် {index + 1}</span></div><h2 className="mt-3 text-sm font-bold text-[#5b4b60]">{category.name}</h2><p className="mt-1 text-[11px] text-[#6b5e70]">{category.en}</p><p className="mt-3 text-xs leading-7 text-[#6b5e70]">{category.description}</p></article>)}</div>
      </section>
      <section id="career-report-scores" className="mt-8 scroll-mt-28 rounded-[1.75rem] border border-[#eee4ed] bg-white p-5 sm:p-7"><div className="mb-5"><p className="text-xs font-semibold tracking-wide text-[#6b5e70]">YOUR SIX INTEREST AREAS</p><h2 className="mt-1 text-xl font-bold text-[#514357]">စိတ်ဝင်စားမှု အမျိုးအစား ၆ မျိုး၏ ရမှတ်</h2><p className="mt-2 text-xs leading-6 text-[#6b5e70]">အညွှန်းရမှတ်များကို အမြင့်မှ အနိမ့်သို့ စီထားပါတယ်။ ဒီရမှတ်တွေဟာ သင့်အဖြေများကိုသာ အခြေခံပြီး လူဦးရေစံနှုန်း သို့မဟုတ် Percentile မဟုတ်ပါ။</p></div>
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.15fr] lg:items-center">
          <div className="rounded-[1.5rem] border border-[#eee4ed] bg-[#fcf9fc] p-4 sm:p-5">
            <div className="flex items-center justify-between"><h3 className="text-sm font-bold text-[#5b4b60]">စိတ်ဝင်စားမှု ၆ မျိုး ပုံကြမ်း</h3><span className="text-[11px] text-[#6b5e70]">0–100</span></div>
            <div className="mt-2 h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={chartData} outerRadius="58%" margin={{ top: 18, right: 34, bottom: 18, left: 34 }}>
                  <PolarGrid stroke="#e8dfe9" />
                  <PolarAngleAxis dataKey="area" tick={<CareerPolarTick />} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b5e70', fontSize: 11 }} axisLine={false} />
                  <Radar name="အညွှန်းရမှတ်" dataKey="score" stroke="#8c719b" fill="#bda9c8" fillOpacity={0.55} strokeWidth={2} />
                  <Tooltip formatter={(value) => [`${value}/100`, 'ရမှတ်']} contentStyle={{ borderRadius: 12, borderColor: '#eee4ed', fontSize: 12 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-[11px] leading-5 text-[#6b5e70]">ဂရပ်သည် သင့်နှစ်သက်မှု အဖြေများမှ တွက်ချက်ထားသော အညွှန်းရမှတ်များကို ပြထားခြင်းဖြစ်သည်။</p>
          </div>
          <div className="space-y-5">{ranked.map((category) => { const score = result.scores[category.id].score; return <div key={category.id}><div className="flex items-start justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f5eff6] text-lg">{category.icon}</span><div><p className="text-sm font-bold text-[#58495e]">{category.name}</p><p className="mt-0.5 text-[11px] text-[#6b5e70]">{category.en} · {category.id}</p></div></div><div className="shrink-0 text-right"><p className="text-lg font-bold tabular-nums text-[#80678f]">{score}<span className="text-[11px] font-medium text-[#6b5e70]"> / 100</span></p><p className="text-[11px] text-[#6b5e70]">{getCareerScoreBand(score)}</p></div></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-[#f2edf3]"><div className="h-full rounded-full bg-gradient-to-r from-[#9c82aa] to-[#c59aab]" style={{ width: `${score}%` }}/></div></div>})}</div>
        </div>
      </section>
      <section id="career-report-next" className="mt-8 scroll-mt-28 rounded-[1.75rem] border border-[#eee4ed] bg-white p-5 sm:p-7"><div className="flex items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#f4edf6] text-[#80678f]"><PauseCircle size={18}/></span><div><p className="text-xs font-semibold text-[#6b5e70]">NEXT EXPLORATION</p><h2 className="mt-1 text-lg font-bold text-[#514357]">နောက်တစ်ဆင့် ဘာလုပ်ကြည့်နိုင်မလဲ။</h2></div></div><div className="mt-4 grid gap-3 md:grid-cols-3">{topCategories.map((category) => <article key={category.id} className="rounded-2xl bg-[#faf7fa] p-4"><h3 className="text-sm font-bold text-[#65556a]">{category.name}</h3><p className="mt-2 text-xs leading-7 text-[#6b5e70]">{category.examples}</p></article>)}</div></section>
      <section id="career-report-notes" className="mt-6 scroll-mt-28 rounded-2xl border border-[#eee4ed] bg-[#fbf8fb] p-5"><p className="text-xs font-bold text-[#66576b]">ရလဒ်ကို ဘယ်လိုနားလည်ရမလဲ။</p><p className="mt-2 text-xs leading-7 text-[#6b5e70]">ဤဆန်းစစ်မှုသည် စိတ်ဝင်စားမှု အမျိုးအစား ၆ ခုကို လေ့လာရန် မြန်မာဘာသာဖြင့် ကိုယ်ပိုင်ရေးဆွဲထားသော မေးခွန်းများကို အသုံးပြုထားသည်။ တရားဝင်မေးခွန်းစာရင်း သို့မဟုတ် စမ်းသပ်အတည်ပြုပြီးသော ဘာသာပြန်မူ မဟုတ်ပါ။ ရလဒ်သည် သင်နှစ်သက်နိုင်သော လုပ်ဆောင်မှုအမျိုးအစားများကိုသာ ဖော်ပြပြီး လက်ရှိကျွမ်းကျင်မှု၊ ပညာရေး၊ အလုပ်အကိုင်သင့်တော်မှု သို့မဟုတ် အနာဂတ်အောင်မြင်မှုကို တိုက်ရိုက်မဆုံးဖြတ်ပါ။ Personality Assessment နှင့် Skills Assessment တို့ကိုပါ ပေါင်းစပ်စဉ်းစားပြီးမှ အလုပ်အကိုင်လမ်းကြောင်းများကို လေ့လာသင့်ပါတယ်။</p></section>
      <div className="no-print mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Button onClick={onRetake} icon={RotateCcw}>ထပ်မံဖြေဆိုမယ်</Button><Button secondary onClick={onHome} icon={Home}>ပင်မစာမျက်နှာသို့</Button></div>
    </main>
  )
}

export default function CareerInterestModule({
  onHome,
  onDataChange,
  record: initialRecord = null,
  persistRef,
  onExportBackup,
  storageError: sharedStorageError,
  storageAlertVisible: sharedStorageAlertVisible,
  onStorageWriteResult,
  onDismissStorageError,
  onOpenKnowledgeTerm,
}) {
  const initialDraft = loadDraft(LEVEL, ASSESSMENT_TYPE)
  const [page, setPage] = useState(initialRecord ? 'result' : 'intro')
  const [draft, setDraft] = useState(initialDraft)
  const [answers, setAnswers] = useState(initialRecord?.answers || {})
  const [skipped, setSkipped] = useState([])
  const [index, setIndex] = useState(0)
  const [startedAt, setStartedAt] = useState(initialRecord?.startedAt || null)
  const [activeRecord, setActiveRecord] = useState(initialRecord)
  const [toast, setToast] = useState('')
  const [localStorageError, setLocalStorageError] = useState(false)
  const [localAlertDismissed, setLocalAlertDismissed] = useState(false)
  const storageError = sharedStorageError ?? localStorageError
  const storageAlertVisible = sharedStorageAlertVisible ?? (storageError && !localAlertDismissed)
  const latestStateRef = useRef(null)

  const reportStorageWrite = (ok) => {
    if (onStorageWriteResult) {
      onStorageWriteResult(ok)
      return
    }
    if (ok) {
      setLocalStorageError(false)
      setLocalAlertDismissed(false)
    } else {
      setLocalStorageError(true)
      setLocalAlertDismissed(false)
    }
  }

  const dismissStorageError = () => {
    if (onDismissStorageError) {
      onDismissStorageError()
      return
    }
    setLocalAlertDismissed(true)
  }

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
    reportStorageWrite(ok)
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
    const cleared = clearDraft(LEVEL, ASSESSMENT_TYPE)
    if (!cleared) reportStorageWrite(false)
    const now = new Date().toISOString()
    const empty = { assessmentType: ASSESSMENT_TYPE, questionBankVersion: RIASEC_BANK_VERSION, level: LEVEL, questionCount: 30, answers: {}, skippedQuestionIds: [], currentIndex: 0, startedAt: now, updatedAt: now, status: 'in-progress' }
    setDraft(empty)
    setAnswers({})
    setSkipped([])
    setIndex(0)
    setStartedAt(now)
    setActiveRecord(null)
    const saved = saveDraft(empty)
    reportStorageWrite(saved)
    onDataChange?.(loadAppData())
    setPage('assessment')
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

  const { scheduleAutoAdvance, cancelAutoAdvance } = useAutoAdvance({ delayMs: 260, isActive: page === 'assessment' })

  const answer = (questionId, value) => {
    const nextAnswers = { ...answers, [questionId]: value }
    const nextSkipped = skipped.filter((id) => id !== questionId)
    setAnswers(nextAnswers)
    setSkipped(nextSkipped)
    const saved = saveDraft({ assessmentType: ASSESSMENT_TYPE, questionBankVersion: RIASEC_BANK_VERSION, level: LEVEL, questionCount: 30, answers: nextAnswers, skippedQuestionIds: nextSkipped, currentIndex: index, startedAt, updatedAt: new Date().toISOString(), status: 'in-progress' })
    reportStorageWrite(saved)
    setDraft(loadDraft(LEVEL, ASSESSMENT_TYPE))
    onDataChange?.(loadAppData())
    const activeIndex = index
    scheduleAutoAdvance(activeIndex, () => {
      if (activeIndex < CAREER_QUESTIONS.length - 1) {
        setIndex((current) => (current === activeIndex ? current + 1 : current))
      } else {
        setPage('review')
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }
  const previous = () => { cancelAutoAdvance(); setIndex((current) => Math.max(0, current - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const next = () => {
    cancelAutoAdvance()
    const question = CAREER_QUESTIONS[index]
    if (answers[question.id] === undefined) { setToast('အဖြေရွေးချယ်ပါ၊ ဒါမှမဟုတ် ဒီမေးခွန်းကို ကျော်ထားနိုင်ပါတယ်။'); return }
    if (index < CAREER_QUESTIONS.length - 1) setIndex((current) => current + 1)
    else setPage('review')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const skip = () => {
    cancelAutoAdvance()
    const question = CAREER_QUESTIONS[index]
    if (answers[question.id] !== undefined) { setToast('ဒီမေးခွန်းကို ဖြေပြီးသားပါ။'); return }
    const nextSkipped = [...new Set([...skipped, question.id])]
    const nextIndex = Math.min(index + 1, CAREER_QUESTIONS.length - 1)
    setSkipped(nextSkipped)
    setIndex(nextIndex)
    const saved = saveDraft({ assessmentType: ASSESSMENT_TYPE, questionBankVersion: RIASEC_BANK_VERSION, level: LEVEL, questionCount: 30, answers, skippedQuestionIds: nextSkipped, currentIndex: nextIndex, startedAt, updatedAt: new Date().toISOString(), status: 'in-progress' })
    reportStorageWrite(saved)
    setDraft(loadDraft(LEVEL, ASSESSMENT_TYPE))
    onDataChange?.(loadAppData())
    if (index === CAREER_QUESTIONS.length - 1) setPage('review')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const goTo = (nextIndex) => { cancelAutoAdvance(); setIndex(Math.max(0, Math.min(nextIndex, CAREER_QUESTIONS.length - 1))); setPage('assessment'); window.scrollTo({ top: 0, behavior: 'smooth' }) }
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
    const { ok } = saveAssessmentWithStatus(record)
    reportStorageWrite(ok)
    trackAssessmentCompleted('career')
    if (!ok) {
      setToast('သတိပေးချက်: Browser Storage ထဲသို့ ရလဒ်သိမ်းဆည်း၍ မရပါ။')
    }
    setActiveRecord(record)
    setPage('result')
    onDataChange?.(loadAppData())
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const exit = () => { cancelAutoAdvance(); persistDraft(); onHome() }
  const retake = () => { cancelAutoAdvance(); setActiveRecord(null); startNew() }

  return (
    <>
      {page === 'intro' && <IntroView draft={draft} onResume={resume} onStart={startNew} onHome={onHome} storageAlertVisible={storageAlertVisible} onExportBackup={onExportBackup} onDismissStorageError={dismissStorageError}/>}
      {page === 'assessment' && <QuestionView answers={answers} skipped={skipped} index={index} onAnswer={answer} onPrevious={previous} onNext={next} onSkip={skip} onReview={() => { cancelAutoAdvance(); setPage('review') }} onExit={exit} storageError={storageError} storageAlertVisible={storageAlertVisible} onExportBackup={onExportBackup} onDismissStorageError={dismissStorageError} onOpenKnowledgeTerm={onOpenKnowledgeTerm}/>}
      {page === 'review' && <ReviewView answers={answers} skipped={skipped} onGoTo={goTo} onFinish={finish} onBack={() => setPage('assessment')} storageAlertVisible={storageAlertVisible} onExportBackup={onExportBackup} onDismissStorageError={dismissStorageError}/>}
      {page === 'result' && <CareerResultView record={activeRecord} onHome={onHome} onRetake={retake} storageAlertVisible={storageAlertVisible} onExportBackup={onExportBackup} onDismissStorageError={dismissStorageError}/>}
      {toast && <div role="status" className="no-print fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#514357] px-5 py-3 text-xs font-semibold text-white shadow-xl">{toast}</div>}
    </>
  )
}
