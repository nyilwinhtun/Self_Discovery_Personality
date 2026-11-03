import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft, ArrowRight, Check, CheckCircle2, ChevronRight, Clock3, Download,
  History, LockKeyhole, PauseCircle, Printer, RotateCcw, ShieldCheck, Sparkles,
} from 'lucide-react'
import {
  PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart,
  ResponsiveContainer, Tooltip,
} from 'recharts'
import { InnerCompassLogo } from './AssessmentLogos.jsx'
import KnowledgeInlineHelp from './KnowledgeInlineHelp.jsx'
import MobileQuestionActions from './MobileQuestionActions.jsx'
import ReportSectionNavigation from './ReportSectionNavigation.jsx'
import {
  INNERCOMPASS_V02_ANSWER_OPTIONS,
  INNERCOMPASS_V02_DIMENSIONS,
  INNERCOMPASS_V02_QUESTIONS_30,
  INNERCOMPASS_V02_VERSION,
} from '../data/innerCompassDraftV02.js'
import { scoreInnerCompassV02 } from '../utils/innerCompassV02Scoring.js'
import { getInnerCompassReportInsight, REPORT_INTERPRETATION_NOTICE } from '../utils/resultInterpretations.js'
import { clearDraft, loadAppData, loadDraft, saveAssessment, saveDraft } from '../utils/storage.js'

const ASSESSMENT_TYPE = 'innerCompass'
const ASSESSMENT_LEVEL = 30
const ACCENT = '#527daa'

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

function formatDate(value) {
  if (!value) return 'မသိရှိပါ'
  try {
    return new Intl.DateTimeFormat('my-MM', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
    }).format(new Date(value))
  } catch {
    return new Date(value).toLocaleString()
  }
}

function PrimaryButton({ children, onClick, disabled = false, icon: Icon = ArrowRight }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#527daa] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(82,125,170,0.18)] transition hover:-translate-y-0.5 hover:bg-[#456d97] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0">
      {children}<Icon size={17}/>
    </button>
  )
}

function SecondaryButton({ children, onClick, icon: Icon, disabled = false, className = '' }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={cn('inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-[#d8e2ee] bg-white px-5 py-2.5 text-sm font-semibold text-[#4f6f91] transition hover:border-[#b8cadd] hover:bg-[#f7fafd] disabled:cursor-not-allowed disabled:opacity-40', className)}>
      {Icon && <Icon size={16} />}{children}
    </button>
  )
}

function GuideView({ draft, onBack, onBegin, onResume, onRestart }) {
  const [acknowledged, setAcknowledged] = useState(false)
  const answeredCount = Object.keys(draft?.answers || {}).length
  const skippedCount = (draft?.skippedQuestionIds || []).filter((id) => draft?.answers?.[id] === undefined).length
  const progress = Math.round((answeredCount / INNERCOMPASS_V02_QUESTIONS_30.length) * 100)

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <button onClick={onBack} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#6d8299] hover:text-[#3f5873]"><ArrowLeft size={16}/> ပင်မစာမျက်နှာ</button>
      <section className="overflow-hidden rounded-[2rem] border border-[#d4e0ef] bg-white card-shadow">
        <div className="bg-gradient-to-br from-[#eaf1fa] via-[#f8fbff] to-[#edf3f9] p-6 sm:p-9">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <span className="grid h-[68px] w-[68px] shrink-0 place-items-center rounded-2xl bg-white text-[#527daa] shadow-sm"><InnerCompassLogo size={52}/></span>
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] text-[#6d8eaf]">INNERCOMPASS</p>
                <h1 className="mt-1 text-xl font-bold text-[#3f5873] sm:text-2xl">စိတ်နေသဘောထားကို လေ့လာခြင်း</h1>
                <p className="mt-1 text-xs text-[#657c96]">မေးခွန်း ၃၀ · အချက် ၆ ချက်</p>
              </div>
            </div>
            <span className="rounded-full border border-[#cbd9e9] bg-white/80 px-3 py-1.5 text-[10px] font-semibold text-[#456d97]">Pilot · စမ်းသပ်အသုံးပြုမှု</span>
          </div>
          <p className="mt-6 text-sm leading-8 text-[#596d83]">ဒီမေးခွန်းတွေက သင့်ရဲ့ နေ့စဉ်အပြုအမူ၊ စိတ်ခံစားမှုကို ကိုင်တွယ်ပုံ၊ အခြားသူတွေနဲ့ ဆက်ဆံပုံနဲ့ ကိုယ်ပိုင်စီမံပုံတွေကို ပြန်လည်စဉ်းစားနိုင်ဖို့ ရေးဆွဲထားတဲ့ မေးခွန်းမူကြမ်းဖြစ်ပါတယ်။</p>
        </div>
        <div className="p-6 sm:p-9">
          <h2 className="text-base font-bold text-[#435a72]">ဒီဆန်းစစ်မှုမှာ လေ့လာမယ့် အဓိက အချက် ၆ ချက်</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {INNERCOMPASS_V02_DIMENSIONS.map((dimension, index) => (
              <article key={dimension.id} className="rounded-2xl border border-[#e5edf5] bg-[#f9fbfe] p-4">
                <div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-xs font-bold text-[#527daa]">{index + 1}</span><h3 className="text-sm font-bold text-[#4f6680]">{dimension.name}</h3></div>
                <p className="mt-2 text-xs leading-6 text-[#667b91]">{dimension.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-[#e2eaf3] bg-white p-4 sm:p-5">
            <h2 className="text-base font-bold text-[#435a72]">မစတင်မီ သိထားသင့်သော အချက်များ</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <article className="rounded-xl bg-[#f5f8fc] p-3.5"><p className="text-xs font-bold text-[#405f82]">ဘယ်လိုဖြေဆိုသင့်သလဲ။</p><p className="mt-1.5 text-xs leading-6 text-[#596d83]">ကိုယ်ဖြစ်ချင်တဲ့ပုံစံမဟုတ်ဘဲ လတ်တလော နေ့စဉ်ဘဝမှာ ပုံမှန်ပြုမူတတ်တဲ့ပုံစံကို စဉ်းစားပြီး ဖြေပါ။ အဖြေမှန်၊ အဖြေမှား မရှိပါ။</p></article>
              <article className="rounded-xl bg-[#f5f8fc] p-3.5"><p className="text-xs font-bold text-[#405f82]">အဖြေရွေးချယ်ပုံ</p><p className="mt-1.5 text-xs leading-6 text-[#596d83]">မေးခွန်းတစ်ခုစီအတွက် သင့်အတွေ့အကြုံနဲ့ ဘယ်လောက်ကိုက်ညီသလဲဆိုတာ ၅ ဆင့်ထဲက တစ်ခုကို ရွေးပါ။</p></article>
              <article className="rounded-xl bg-[#f5f8fc] p-3.5"><p className="text-xs font-bold text-[#405f82]">ကျော်ခြင်းနှင့် ပြန်ဆက်ခြင်း</p><p className="mt-1.5 text-xs leading-6 text-[#596d83]">မသေချာတဲ့မေးခွန်းကို ကျော်ထားနိုင်ပြီး နောက်မှ ပြန်ဖြေနိုင်ပါတယ်။ အဖြေရွေးတိုင်း ဒီ Browser ထဲမှာ အလိုအလျောက်သိမ်းပါတယ်။</p></article>
              <article className="rounded-xl bg-[#f5f8fc] p-3.5"><p className="text-xs font-bold text-[#405f82]">ရလဒ်ကို ဘယ်လိုနားလည်ရမလဲ။</p><p className="mt-1.5 text-xs leading-6 text-[#596d83]">ရမှတ်တွေဟာ ဒီမေးခွန်းမူကြမ်းအတွင်း သင့်အဖြေတွေကို စုစည်းပြသတဲ့ အညွှန်းသာဖြစ်ပြီး လူအများနဲ့ နှိုင်းယှဉ်တဲ့ ရမှတ်မဟုတ်ပါ။</p></article>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-[#f0dfc6] bg-[#fffaf2] p-4 sm:p-5">
            <div className="flex items-start gap-3"><ShieldCheck size={19} className="mt-0.5 shrink-0 text-[#a6793d]"/><div><p className="text-xs font-bold text-[#805b2d]">အရေးကြီးသော သတိပြုချက်</p><p className="mt-1.5 text-xs leading-7 text-[#806b52]">InnerCompass ဟာ ကိုယ်ပိုင်ရေးဆွဲထားတဲ့ စမ်းသပ်အဆင့် Self-Reflection မေးခွန်းမူကြမ်းဖြစ်ပြီး မူရင်းစံသတ်မှတ်စမ်းသပ်မှုတစ်ခု၏ တရားဝင်ဘာသာပြန် သို့မဟုတ် တူညီသောဗားရှင်း မဟုတ်ပါ။ စိတ်ကျန်းမာရေးရောဂါရှာဖွေခြင်း၊ ကိုယ်ကျင့်တရားအကဲဖြတ်ခြင်း၊ လူတစ်ယောက်ရဲ့ အရည်အချင်းကို အပြီးသတ်ဆုံးဖြတ်ခြင်း မပြုလုပ်ပါ။ ရလဒ်ကို အခြားသူတွေနဲ့ နှိုင်းယှဉ်ရန် မသုံးပါနှင့်။</p></div></div>
          </div>

          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#e2eaf3] bg-[#f7fafd] p-4">
            <LockKeyhole size={18} className="mt-0.5 shrink-0 text-[#527daa]"/>
            <div><p className="text-xs font-bold text-[#405f82]">ကိုယ်ရေးအချက်အလက်နှင့် သိမ်းဆည်းမှု</p><p className="mt-1 text-xs leading-6 text-[#596d83]">သင့်အဖြေတွေကို ဒီ Browser နဲ့ ဒီစက်ထဲမှာပဲ သိမ်းထားပါတယ်။ Browser Data ရှင်းလိုက်ရင် ပျောက်နိုင်တာကြောင့် JSON Backup ကို ပုံမှန်ထုတ်ထားပါ။</p></div>
          </div>

          {draft ? (
            <div className="mt-6 rounded-2xl border border-[#cddded] bg-[#f5f9fd] p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2"><p className="text-sm font-bold text-[#405f82]">မပြီးသေးတဲ့ ဖြေဆိုမှုရှိပါတယ်</p><span className="text-xs font-bold text-[#527daa]">{progress}%</span></div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e1eaf3]"><div className="h-full rounded-full bg-[#527daa]" style={{ width: `${progress}%` }}/></div>
              <p className="mt-2 text-xs text-[#71869c]">ဖြေပြီး {answeredCount} ခု · ကျော်ထား {skippedCount} ခု · နောက်ဆုံး {formatDate(draft.updatedAt)}</p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <PrimaryButton onClick={onResume} icon={ArrowRight}>အရင်နေရာက ဆက်ဖြေမယ်</PrimaryButton>
                <SecondaryButton onClick={onRestart} icon={RotateCcw}>အသစ်ပြန်စမယ်</SecondaryButton>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-[#dce6f0] bg-[#f8fbfe] p-4">
              <label className="flex cursor-pointer items-start gap-3">
                <input type="checkbox" checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#527daa]"/>
                <span className="text-xs leading-6 text-[#536b84]">ဒီမေးခွန်းမူကြမ်းရဲ့ ရည်ရွယ်ချက်နဲ့ ကန့်သတ်ချက်တွေကို ဖတ်ရှုပြီး နားလည်ပါသည်။ ရလဒ်ဟာ ကိုယ့်ကိုယ်ကို ပြန်လည်သုံးသပ်ရန်အတွက်သာ ဖြစ်ကြောင်း သိရှိပါသည်။</span>
              </label>
              <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><SecondaryButton onClick={onBack}>နောက်သို့</SecondaryButton><PrimaryButton onClick={onBegin} disabled={!acknowledged}>နားလည်ပါပြီ၊ စတင်မယ်</PrimaryButton></div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

function QuestionView({ answers, skippedQuestionIds, questionIndex, onAnswer, onPrevious, onNext, onSkip, onReview, onExit }) {
  const question = INNERCOMPASS_V02_QUESTIONS_30[questionIndex]
  const dimension = INNERCOMPASS_V02_DIMENSIONS.find((item) => item.id === question.dimensionId)
  const answeredCount = Object.keys(answers).length
  const skippedCount = skippedQuestionIds.filter((id) => answers[id] === undefined).length
  const progress = Math.round((answeredCount / INNERCOMPASS_V02_QUESTIONS_30.length) * 100)
  const isLast = questionIndex === INNERCOMPASS_V02_QUESTIONS_30.length - 1
  const selectedAnswer = answers[question.id]

  return (
    <main className="mx-auto max-w-3xl px-4 pb-36 pt-7 sm:px-6 sm:py-12">
      <div className="mb-7 flex items-center justify-between gap-3">
        <button onClick={onExit} className="inline-flex items-center gap-2 text-sm font-semibold text-[#6d8299] hover:text-[#3f5873]"><ArrowLeft size={16}/> ခဏရပ်ပြီး ထွက်မယ်</button>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-[#6d8299] shadow-sm"><LockKeyhole size={12}/> အလိုအလျောက် သိမ်းဆည်းနေသည်</span>
      </div>
      <section className="rounded-[2rem] border border-[#d4e0ef] bg-white p-5 card-shadow sm:p-9">
        <div className="flex items-end justify-between gap-3">
          <div><p className="text-xs font-semibold tracking-wide text-[#6d8eaf]">INNERCOMPASS · 30 QUESTIONS</p><h1 className="mt-2 text-xl font-bold text-[#3f5873] sm:text-2xl">မေးခွန်းဖြေဆိုခြင်း</h1></div>
          <div className="text-right"><div className="text-xl font-bold tabular-nums text-[#527daa]">{String(questionIndex + 1).padStart(2, '0')}<span className="text-sm font-medium text-[#9aabbc]"> / 30</span></div><p className="text-[10px] text-[#91a2b3]">ဖြေပြီး {answeredCount} · ကျော်ထား {skippedCount}</p></div>
        </div>
        <div className="mt-5 flex items-center justify-between text-[10px] text-[#91a2b3]"><span>ဖြေဆိုပြီးမှု</span><span>{progress}%</span></div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#edf2f7]"><div className="h-full rounded-full bg-gradient-to-r from-[#6b91ba] to-[#9cb8d4] transition-all" style={{ width: `${progress}%` }}/></div>
        <div className="mt-7 flex items-start gap-3 rounded-2xl bg-[#f3f7fb] p-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white text-xs font-bold text-[#527daa]">{dimension.code}</span><div><p className="text-xs font-bold text-[#405f82]">{dimension.name}</p><p className="mt-1 text-[11px] leading-5 text-[#748aa0]">{dimension.description}</p></div></div>
        <div className="my-7 min-h-32 rounded-[1.5rem] bg-gradient-to-br from-[#f5f8fc] to-[#f8fbff] px-5 py-7 sm:px-7 sm:py-8"><p className="text-[11px] font-semibold tracking-wide text-[#7f98b1]">မေးခွန်း {questionIndex + 1}</p><h2 className="mt-3 text-lg font-bold leading-[1.9] text-[#3d536c] sm:text-[1.35rem]">{question.text}</h2><KnowledgeInlineHelp questionText={question.text} theme="innerCompass" /></div>
        <div className="space-y-2.5" role="radiogroup" aria-label="အဖြေရွေးချယ်မှု">
          {INNERCOMPASS_V02_ANSWER_OPTIONS.map((option) => {
            const selected = Number(selectedAnswer) === option.value
            return <button key={option.value} type="button" role="radio" aria-checked={selected} onClick={() => onAnswer(question.id, option.value)} className={cn('answer-option flex min-h-[56px] w-full items-center justify-between rounded-2xl border px-4 py-3 text-left', selected ? 'border-[#7899bb] bg-[#f1f6fb] shadow-[0_4px_14px_rgba(82,125,170,0.09)]' : 'border-[#e5edf5] bg-white hover:border-[#c4d4e4] hover:bg-[#f9fbfe]')}>
              <span className="flex items-center gap-3"><span className={cn('grid h-8 w-8 place-items-center rounded-xl text-xs font-bold', selected ? 'bg-[#527daa] text-white' : 'bg-[#f0f4f8] text-[#7e91a5]')}>{option.value}</span><span className={cn('text-sm font-medium', selected ? 'text-[#3f648c]' : 'text-[#61758a]')}>{option.label}</span></span>
              <span className={cn('grid h-5 w-5 place-items-center rounded-full border', selected ? 'border-[#527daa] bg-[#527daa] text-white' : 'border-[#cfdae5] text-transparent')}><Check size={12} strokeWidth={3}/></span>
            </button>
          })}
        </div>
        <div className="no-print mt-8 hidden flex-wrap items-center justify-between gap-3 border-t border-[#edf2f7] pt-5 sm:flex">
          <SecondaryButton onClick={onPrevious} icon={ArrowLeft} disabled={questionIndex === 0}>ယခင်</SecondaryButton>
          <div className="flex flex-wrap items-center gap-2">
            {selectedAnswer === undefined && <button onClick={onSkip} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-dashed border-[#c5d6e7] bg-[#f8fbfe] px-4 py-2.5 text-sm font-semibold text-[#55799e] hover:bg-[#eff5fb]">ဒီမေးခွန်းကို ကျော်မယ် <ArrowRight size={15}/></button>}
            <PrimaryButton onClick={isLast ? onReview : onNext} disabled={selectedAnswer === undefined} icon={isLast ? CheckCircle2 : ArrowRight}>{isLast ? 'အဖြေတွေ ပြန်စစ်မယ်' : 'နောက်တစ်ခု'}</PrimaryButton>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#f7fafd] px-4 py-3"><p className="text-[11px] leading-5 text-[#7d91a5]">မသေချာသေးတဲ့မေးခွန်းကို ကျော်ပြီး နောက်မှ ပြန်ဖြေနိုင်ပါတယ်။</p><button onClick={onReview} className="text-xs font-semibold text-[#527daa] hover:text-[#3f648c]">မေးခွန်းစာရင်းကြည့်မယ်</button></div>
      </section>
      <MobileQuestionActions
        accent="blue"
        onPrevious={onPrevious}
        onNext={isLast ? onReview : onNext}
        onSkip={onSkip}
        onReview={onReview}
        canPrevious={questionIndex > 0}
        canNext={selectedAnswer !== undefined}
        showSkip={selectedAnswer === undefined}
        isLast={isLast}
      />
      <p className="mt-5 text-center text-[11px] leading-6 text-[#91a2b3]">အဖြေရွေးချယ်တာနဲ့ ဒီ Browser ထဲမှာ သိမ်းဆည်းပါတယ်။ Browser Data မရှင်းပါနဲ့။</p>
    </main>
  )
}

function ReviewView({ answers, skippedQuestionIds, onGoTo, onFinish, onBack }) {
  const [filter, setFilter] = useState('incomplete')
  const answered = INNERCOMPASS_V02_QUESTIONS_30.filter((question) => answers[question.id] !== undefined)
  const skipped = INNERCOMPASS_V02_QUESTIONS_30.filter((question) => answers[question.id] === undefined && skippedQuestionIds.includes(question.id))
  const unanswered = INNERCOMPASS_V02_QUESTIONS_30.filter((question) => answers[question.id] === undefined && !skippedQuestionIds.includes(question.id))
  const incomplete = [...skipped, ...unanswered]
  const visible = filter === 'answered' ? answered : filter === 'skipped' ? skipped : filter === 'unanswered' ? unanswered : incomplete
  const statusOf = (question) => answers[question.id] !== undefined ? 'ဖြေပြီး · ပြန်ပြင်နိုင်သည်' : skippedQuestionIds.includes(question.id) ? 'ကျော်ထား · ပြန်ဖြေနိုင်သည်' : 'မဖြေရသေး'

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <button onClick={onBack} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#6d8299] hover:text-[#3f5873]"><ArrowLeft size={16}/> မေးခွန်းသို့ ပြန်သွားမယ်</button>
      <section className="rounded-[2rem] border border-[#d4e0ef] bg-white p-5 card-shadow sm:p-8">
        <p className="text-xs font-semibold tracking-wide text-[#6d8eaf]">INNERCOMPASS · REVIEW</p>
        <h1 className="mt-2 text-2xl font-bold text-[#3f5873]">ဖြေဆိုမှုကို ပြန်စစ်ပါ</h1>
        <p className="mt-2 text-xs leading-6 text-[#7c90a5]">ကျော်ထားတဲ့မေးခွန်းနဲ့ မဖြေရသေးတဲ့မေးခွန်းကို ရွေးပြီး တိုက်ရိုက်ပြန်ဖြေနိုင်ပါတယ်။</p>
        <div className="mt-6 grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-[#edf6ef] p-3"><p className="text-2xl font-bold text-[#5d8d6e] tabular-nums">{answered.length}</p><p className="mt-1 text-[10px] text-[#73917b]">ဖြေပြီး</p></div>
          <div className="rounded-xl bg-[#fff7ed] p-3"><p className="text-2xl font-bold text-[#b98754] tabular-nums">{skipped.length}</p><p className="mt-1 text-[10px] text-[#a88768]">ကျော်ထား</p></div>
          <div className="rounded-xl bg-[#f2f6fa] p-3"><p className="text-2xl font-bold text-[#6f89a3] tabular-nums">{unanswered.length}</p><p className="mt-1 text-[10px] text-[#8297ab]">မဖြေရသေး</p></div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">{[['incomplete', `ပြန်ဖြေရန် (${incomplete.length})`], ['skipped', `ကျော်ထား (${skipped.length})`], ['unanswered', `မဖြေရသေး (${unanswered.length})`], ['answered', `ဖြေပြီး (${answered.length})`]].map(([value, label]) => <button key={value} onClick={() => setFilter(value)} className={cn('rounded-full px-3 py-2 text-[11px] font-semibold transition', filter === value ? 'bg-[#527daa] text-white' : 'bg-[#eef3f8] text-[#64809c] hover:bg-[#e4edf6]')}>{label}</button>)}</div>
        <div className="mt-4 rounded-2xl border border-[#edf2f7] p-3 sm:p-4">
          {visible.length === 0 ? <div className="py-8 text-center"><CheckCircle2 className="mx-auto text-[#6e9a79]" size={30}/><p className="mt-2 text-sm font-semibold text-[#5e7d66]">ဒီအမျိုးအစားမှာ မေးခွန်းမရှိပါ။</p></div> : <div className="grid gap-2 sm:grid-cols-2">{visible.map((question) => {
            const originalIndex = INNERCOMPASS_V02_QUESTIONS_30.findIndex((item) => item.id === question.id)
            return <button key={question.id} onClick={() => onGoTo(originalIndex)} className="flex min-w-0 items-start gap-3 rounded-xl border border-[#edf2f7] bg-white p-3 text-left transition hover:border-[#c5d6e7] hover:bg-[#f9fbfe]"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#f0f4f8] text-xs font-bold text-[#64809c]">{originalIndex + 1}</span><span className="min-w-0 flex-1"><span className="block text-[11px] font-semibold leading-5 text-[#536b84]">{question.text}</span><span className="mt-1 block text-[10px] text-[#91a2b3]">{statusOf(question)}</span></span><ChevronRight size={15} className="mt-1 shrink-0 text-[#9aacbd]"/></button>
          })}</div>}
        </div>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between"><SecondaryButton onClick={onBack}>မေးခွန်းဆက်ဖြေမယ်</SecondaryButton><PrimaryButton onClick={onFinish} icon={CheckCircle2}>အဖြေစစ်ပြီး ရလဒ်ကြည့်မယ်</PrimaryButton></div>
        {incomplete.length > 0 && <p className="mt-3 text-right text-[11px] leading-6 text-[#a47b4d]">မေးခွန်း {incomplete.length} ခု ကျန်နေသေးပါတယ်။ အားလုံးဖြေပြီးမှ အညွှန်းရလဒ်တွက်ချက်နိုင်ပါမယ်။</p>}
      </section>
    </main>
  )
}

function ResultView({ record, onHome, onRetake }) {
  const result = useMemo(() => scoreInnerCompassV02(record?.answers || {}), [record])
  if (!record || !result.complete) return null
  const chartData = result.dimensions.map((item) => ({ area: item.shortName, score: item.index }))
  const ordered = [...result.dimensions].sort((a, b) => b.index - a.index)
  const dimensionInsights = result.dimensions.map((dimension) => ({
    ...dimension,
    insight: getInnerCompassReportInsight(dimension.id, dimension.index),
  }))

  const downloadReport = () => {
    const lines = [
      'Self Discovery — InnerCompass ကိုယ်တိုင်ပြန်လည်သုံးသပ်မှုအစီရင်ခံစာ',
      `မေးခွန်းဗားရှင်း: ${record.questionBankVersion || INNERCOMPASS_V02_VERSION}`,
      `ဖြေဆိုသည့်နေ့: ${formatDate(record.createdAt)}`,
      'ဤရလဒ်သည် မူကြမ်းအဆင့် ကိုယ်တိုင်ပြန်လည်သုံးသပ်မှု အညွှန်းသာဖြစ်သည်။',
      '',
      ...dimensionInsights.flatMap((dimension) => [
        `${dimension.name}: ${dimension.index}/100 (ပျမ်းမျှ ${dimension.average}/5)`,
        dimension.insight?.label || '',
        dimension.insight?.interpretation || '',
        `နေ့စဉ်ဘဝ ဥပမာ: ${dimension.insight?.example || ''}`,
        `ပြန်လည်စဉ်းစားရန်: ${dimension.insight?.reflection || ''}`,
        `စမ်းကြည့်ရန်: ${dimension.insight?.tryThis || ''}`,
        '',
      ]),
      REPORT_INTERPRETATION_NOTICE,
      'InnerCompass သည် စမ်းသပ်အဆင့် ကိုယ်ပိုင်ရေးဆွဲထားသော reflection tool ဖြစ်ပြီး validated clinical/personality instrument သို့မဟုတ် ရောဂါရှာဖွေမှု မဟုတ်ပါ။',
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `innercompass-reflection-${new Date(record.createdAt).toISOString().slice(0, 10)}.txt`
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8">
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3"><button onClick={onHome} className="inline-flex items-center gap-2 text-sm font-semibold text-[#6d8299] hover:text-[#3f5873]"><ArrowLeft size={16}/> ပင်မစာမျက်နှာ</button><div className="flex flex-wrap gap-2"><SecondaryButton onClick={downloadReport} icon={Download}>အစီရင်ခံစာသိမ်းမယ်</SecondaryButton><SecondaryButton onClick={() => window.print()} icon={Printer}>Print</SecondaryButton></div></div>
      <ReportSectionNavigation tone="blue" items={[
        { id: 'inner-report-overview', label: 'အနှစ်ချုပ်' },
        { id: 'inner-report-areas', label: 'အချက် ၆ ချက်' },
        { id: 'inner-report-notes', label: 'ရလဒ်ဖတ်ရှုရန်' },
      ]} />
      <section id="inner-report-overview" className="scroll-mt-28 print-card overflow-hidden rounded-[2rem] border border-[#d4e0ef] bg-gradient-to-br from-[#eaf1fa] via-[#f8fbff] to-[#edf3f9] p-6 card-shadow sm:p-10">
        <div className="mx-auto max-w-3xl text-center"><span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#527daa]"><CheckCircle2 size={14}/> ဆန်းစစ်မှု ပြီးဆုံးပါပြီ</span><div className="mt-5 flex justify-center"><span className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-[#527daa] shadow-sm"><InnerCompassLogo size={50}/></span></div><p className="mt-4 text-xs font-semibold tracking-[0.15em] text-[#6d8eaf]">INNERCOMPASS · PILOT REFLECTION</p><h1 className="mt-3 text-2xl font-bold leading-relaxed text-[#3f5873] sm:text-3xl">သင့်ရဲ့ ဖြေဆိုမှုအကျဉ်းချုပ်</h1><p className="mt-2 text-xs text-[#8196aa]">မေးခွန်း ၃၀ · {formatDate(record.createdAt)}</p><p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-[#5f748b]">အောက်ပါရလဒ်တွေက ဒီမေးခွန်းမူကြမ်းအတွင်း သင်ရွေးချယ်ထားတဲ့ အဖြေတွေကို အချက် ၆ ချက်အလိုက် စုစည်းပြသထားပါတယ်။ ဒါတွေက သင့်ပင်ကိုစရိုက်ကို အပြီးသတ်သတ်မှတ်ပေးတာ မဟုတ်ပါ။</p></div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-[1.5rem] border border-white/90 bg-white/85 p-4 sm:p-6"><div className="flex items-center justify-between"><h2 className="text-sm font-bold text-[#4f6680]">အဓိက အချက် ၆ ချက်၏ ရမှတ်</h2><span className="text-[10px] text-[#8da0b3]">0–100</span></div><div className="mt-2 h-[300px] w-full"><ResponsiveContainer width="100%" height="100%"><RadarChart data={chartData} outerRadius="70%"><PolarGrid stroke="#e1eaf3"/><PolarAngleAxis dataKey="area" tick={{ fill: '#657f99', fontSize: 10, fontFamily: 'Noto Sans Myanmar' }}/><PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9aafc2', fontSize: 9 }} axisLine={false}/><Radar name="အညွှန်းရမှတ်" dataKey="score" stroke={ACCENT} fill="#9db9d5" fillOpacity={0.55} strokeWidth={2}/><Tooltip formatter={(value) => [`${value}/100`, 'အညွှန်းရမှတ်']} contentStyle={{ borderRadius: 12, borderColor: '#dce6f0', fontSize: 12 }}/></RadarChart></ResponsiveContainer></div><p className="text-center text-[10px] leading-5 text-[#8da0b3]">ဒီအညွှန်းဟာ ဖြေဆိုထားတဲ့အဖြေတွေကို စကေးအတွင်း ပြောင်းလဲဖော်ပြခြင်းသာ ဖြစ်ပါတယ်။</p></div>
          <div className="flex flex-col gap-3">
            {ordered.slice(0, 2).map((dimension, index) => <article key={dimension.id} className="rounded-[1.5rem] border border-white/90 bg-white/85 p-5"><p className="text-xs font-semibold text-[#7d94aa]">ဒီဖြေဆိုမှုအတွင်း အညွှန်းရမှတ် ပိုမြင့်နေသော အချက် {index + 1}</p><h3 className="mt-2 text-sm font-bold leading-6 text-[#3f5873]">{dimension.name}</h3><p className="mt-1 text-xl font-bold text-[#527daa]">{dimension.index} / 100</p><p className="mt-2 text-[11px] font-semibold leading-6 text-[#527daa]">{getInnerCompassReportInsight(dimension.id, dimension.index)?.label}</p><p className="mt-2 text-xs leading-7 text-[#70859a]">{INNERCOMPASS_V02_DIMENSIONS.find((item) => item.id === dimension.id)?.description}</p></article>)}
            <div className="rounded-[1.5rem] border border-[#dce6f0] bg-white/75 p-5"><p className="text-xs font-bold text-[#4f6680]">ရလဒ်ကို ဖတ်ရှုရာတွင်</p><p className="mt-2 text-xs leading-7 text-[#70859a]">ရမှတ်ပိုမြင့်ခြင်းဟာ ဒီမေးခွန်းအုပ်စုထဲက အပြုသဘောဖော်ပြထားတဲ့ အချက်တွေနဲ့ ပိုမိုကိုက်ညီတဲ့အဖြေတွေ ရှိတယ်လို့သာ အဓိပ္ပာယ်ရပါတယ်။ အခြားသူတွေနဲ့ နှိုင်းယှဉ်ထားတဲ့ ရမှတ်မဟုတ်သလို ကောင်းခြင်း၊ မကောင်းခြင်းကိုလည်း မဆုံးဖြတ်ပါ။</p></div>
          </div>
        </div>
      </section>
      <section id="inner-report-areas" className="mt-8 scroll-mt-28">
        <div className="mb-4"><p className="text-xs font-semibold tracking-wide text-[#7d94aa]">UNDERSTANDING YOUR SIX AREAS</p><h2 className="mt-1 text-xl font-bold text-[#3f5873]">အချက် ၆ ချက်ကို တစ်ခုချင်း နားလည်ကြည့်ရအောင်</h2><p className="mt-2 text-xs leading-7 text-[#7d90a4]">အညွှန်းရမှတ်တစ်ခုချင်းစီအတွက် အဓိပ္ပာယ်၊ နေ့စဉ်ဘဝ ဥပမာ၊ ကိုယ်တိုင်ပြန်မေးရန်နဲ့ စမ်းကြည့်နိုင်တဲ့ အဆင့်ငယ်တွေကို ဖော်ပြထားပါတယ်။ ဒီအချက်တွေဟာ မူကြမ်းအဆင့် ကိုယ်တိုင်ပြန်လည်သုံးသပ်ရန်သာ ဖြစ်ပါတယ်။</p></div>
        <div className="grid gap-4 lg:grid-cols-2">
          {dimensionInsights.map((dimension) => (
            <article key={dimension.id} className="rounded-2xl border border-[#e4edf5] bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="text-sm font-bold leading-6 text-[#4f6680]">{dimension.name}</p><p className="mt-1 text-[10px] leading-5 text-[#91a2b3]">{dimension.itemCount} မေးခွန်း · ပျမ်းမျှ {dimension.average}/5</p></div><span className="shrink-0 rounded-xl bg-[#eef4fa] px-3 py-2 text-sm font-bold tabular-nums text-[#527daa]">{dimension.index}/100</span></div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#edf2f7]"><div className="h-full rounded-full bg-gradient-to-r from-[#6e94bc] to-[#adc5dc]" style={{ width: `${dimension.index}%` }}/></div>
              {dimension.insight && <>
                <p className="mt-3 rounded-xl bg-[#f4f8fc] px-3 py-2 text-[11px] font-semibold leading-6 text-[#527daa]">{dimension.insight.label}</p>
                <div className="mt-4 space-y-3 text-xs leading-7 text-[#70859a]">
                  <div><p className="font-bold text-[#4f6680]">ဒီအဖြေတွေက ဘာကို ညွှန်းနိုင်သလဲ။</p><p>{dimension.insight.interpretation}</p></div>
                  <div className="rounded-xl bg-[#f7fafd] p-3"><p className="font-bold text-[#536f8b]">နေ့စဉ်ဘဝ ဥပမာ</p><p>{dimension.insight.example}</p></div>
                  <div><p className="font-bold text-[#4f6680]">ကိုယ့်ကိုယ်ကို ပြန်မေးကြည့်ရန်</p><p>{dimension.insight.reflection}</p></div>
                  <div className="rounded-xl border border-[#e4edf5] p-3"><p className="font-bold text-[#527daa]">စမ်းကြည့်နိုင်တဲ့ အဆင့်ငယ်</p><p>{dimension.insight.tryThis}</p></div>
                </div>
              </>}
            </article>
          ))}
        </div>
      </section>
      <section className="no-print mt-8 flex flex-wrap justify-center gap-3"><SecondaryButton onClick={onHome}>ပင်မစာမျက်နှာသို့ ပြန်မယ်</SecondaryButton><PrimaryButton onClick={onRetake} icon={RotateCcw}>ပြန်လည်ဖြေဆိုမယ်</PrimaryButton></section>
      <p id="inner-report-notes" className="mt-5 scroll-mt-28 text-center text-[11px] leading-6 text-[#91a2b3]">ဤမေးခွန်းအုပ်စုသည် စမ်းသပ်အဆင့် ကိုယ်တိုင်ပြန်လည်သုံးသပ်မှုဖြစ်ပြီး စိတ်ပညာဆိုင်ရာ အတည်ပြုစမ်းသပ်မှု သို့မဟုတ် ရောဂါရှာဖွေမှု မဟုတ်ပါ။ {REPORT_INTERPRETATION_NOTICE}</p>
    </main>
  )
}

export default function InnerCompassModule({ initialRecord = null, onHome, onDataChange, persistRef }) {
  const initialDraft = initialRecord ? null : loadDraft(ASSESSMENT_LEVEL, ASSESSMENT_TYPE)
  const [view, setView] = useState(initialRecord ? 'result' : 'guide')
  const [draft, setDraft] = useState(initialDraft)
  const [answers, setAnswers] = useState(initialRecord?.answers || initialDraft?.answers || {})
  const [skippedQuestionIds, setSkippedQuestionIds] = useState(initialRecord ? [] : (initialDraft?.skippedQuestionIds || []))
  const [questionIndex, setQuestionIndex] = useState(initialRecord ? 0 : Math.max(0, Math.min(Number(initialDraft?.currentIndex) || 0, INNERCOMPASS_V02_QUESTIONS_30.length - 1)))
  const [startedAt, setStartedAt] = useState(initialRecord?.startedAt || initialDraft?.startedAt || null)
  const [record, setRecord] = useState(initialRecord)
  const [toast, setToast] = useState('')

  const persistDraft = (override = {}) => {
    if (view !== 'question' && view !== 'review') return false
    if (!startedAt && !Object.keys(answers).length) return false
    const payload = {
      assessmentType: ASSESSMENT_TYPE,
      questionBankVersion: INNERCOMPASS_V02_VERSION,
      level: ASSESSMENT_LEVEL,
      answers,
      skippedQuestionIds,
      currentIndex: questionIndex,
      startedAt: startedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'in-progress',
      ...override,
    }
    const success = saveDraft(payload)
    setDraft(loadDraft(ASSESSMENT_LEVEL, ASSESSMENT_TYPE))
    onDataChange?.(loadAppData())
    return success
  }

  useEffect(() => {
    if (persistRef) persistRef.current = persistDraft
    return () => { if (persistRef) persistRef.current = null }
  })

  useEffect(() => {
    if (view === 'question' || view === 'review') persistDraft()
  }, [view, answers, skippedQuestionIds, questionIndex, startedAt])

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 2800)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    const flush = () => {
      if (view === 'question' || view === 'review') persistDraft()
    }
    window.addEventListener('beforeunload', flush)
    return () => window.removeEventListener('beforeunload', flush)
  }, [view, answers, skippedQuestionIds, questionIndex, startedAt])

  const startFresh = () => {
    if (draft && !window.confirm('မပြီးသေးတဲ့ InnerCompass အဖြေဟောင်းရှိပါတယ်။ အသစ်ပြန်စရင် အဲဒီ Draft ကို အစားထိုးပါမယ်။ ဆက်လုပ်မှာ သေချာပါသလား။')) return
    if (draft) clearDraft(ASSESSMENT_LEVEL, ASSESSMENT_TYPE)
    const now = new Date().toISOString()
    setAnswers({})
    setSkippedQuestionIds([])
    setQuestionIndex(0)
    setStartedAt(now)
    setRecord(null)
    const emptyDraft = {
      assessmentType: ASSESSMENT_TYPE,
      questionBankVersion: INNERCOMPASS_V02_VERSION,
      level: ASSESSMENT_LEVEL,
      answers: {}, skippedQuestionIds: [], currentIndex: 0,
      startedAt: now, updatedAt: now, status: 'in-progress',
    }
    saveDraft(emptyDraft)
    setDraft(emptyDraft)
    onDataChange?.(loadAppData())
    setView('question')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const resume = () => {
    const saved = loadDraft(ASSESSMENT_LEVEL, ASSESSMENT_TYPE)
    if (!saved) {
      setToast('ဆက်လက်ဖြေဆိုရန် သိမ်းထားတဲ့အဖြေ မတွေ့ပါ။')
      return
    }
    setAnswers(saved.answers || {})
    setSkippedQuestionIds(saved.skippedQuestionIds || [])
    setQuestionIndex(Math.max(0, Math.min(Number(saved.currentIndex) || 0, INNERCOMPASS_V02_QUESTIONS_30.length - 1)))
    setStartedAt(saved.startedAt || saved.updatedAt || new Date().toISOString())
    setDraft(saved)
    setRecord(null)
    setView('question')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const exit = () => {
    if (view === 'question' || view === 'review') persistDraft()
    onDataChange?.(loadAppData())
    onHome()
  }

  const answerQuestion = (questionId, value) => {
    const nextAnswers = { ...answers, [questionId]: value }
    const nextSkipped = skippedQuestionIds.filter((id) => id !== questionId)
    setAnswers(nextAnswers)
    setSkippedQuestionIds(nextSkipped)
    const payload = {
      assessmentType: ASSESSMENT_TYPE, questionBankVersion: INNERCOMPASS_V02_VERSION,
      level: ASSESSMENT_LEVEL, answers: nextAnswers, skippedQuestionIds: nextSkipped,
      currentIndex: questionIndex, startedAt: startedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(), status: 'in-progress',
    }
    saveDraft(payload)
    setDraft(payload)
    onDataChange?.(loadAppData())
  }

  const goPrevious = () => {
    setQuestionIndex((current) => Math.max(0, current - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goNext = () => {
    const currentQuestion = INNERCOMPASS_V02_QUESTIONS_30[questionIndex]
    if (answers[currentQuestion.id] === undefined) {
      setToast('အဖြေရွေးချယ်ပါ၊ ဒါမှမဟုတ် ဒီမေးခွန်းကို ကျော်ထားနိုင်ပါတယ်။')
      return
    }
    if (questionIndex < INNERCOMPASS_V02_QUESTIONS_30.length - 1) setQuestionIndex((current) => current + 1)
    else setView('review')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const skipQuestion = () => {
    const currentQuestion = INNERCOMPASS_V02_QUESTIONS_30[questionIndex]
    if (answers[currentQuestion.id] !== undefined) return
    const nextSkipped = [...new Set([...skippedQuestionIds, currentQuestion.id])]
    const nextIndex = Math.min(questionIndex + 1, INNERCOMPASS_V02_QUESTIONS_30.length - 1)
    setSkippedQuestionIds(nextSkipped)
    setQuestionIndex(nextIndex)
    const payload = {
      assessmentType: ASSESSMENT_TYPE, questionBankVersion: INNERCOMPASS_V02_VERSION,
      level: ASSESSMENT_LEVEL, answers, skippedQuestionIds: nextSkipped,
      currentIndex: nextIndex, startedAt: startedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(), status: 'in-progress',
    }
    saveDraft(payload)
    setDraft(payload)
    onDataChange?.(loadAppData())
    if (questionIndex === INNERCOMPASS_V02_QUESTIONS_30.length - 1) setView('review')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToQuestion = (index) => {
    setQuestionIndex(Math.max(0, Math.min(index, INNERCOMPASS_V02_QUESTIONS_30.length - 1)))
    setView('question')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const finish = () => {
    const missing = INNERCOMPASS_V02_QUESTIONS_30.filter((question) => answers[question.id] === undefined)
    if (missing.length) {
      setToast(`မဖြေရသေးတဲ့ မေးခွန်း ${missing.length} ခု ကျန်နေပါသေးတယ်။`)
      setView('review')
      return
    }
    const result = scoreInnerCompassV02(answers)
    if (!result.complete) {
      setToast('အဖြေတချို့ မမှန်ကန်ပါ။ မေးခွန်းစာရင်းကို ပြန်စစ်ပါ။')
      setView('review')
      return
    }
    const scores = Object.fromEntries(result.dimensions.map((dimension) => [dimension.id, {
      score: dimension.index,
      average: dimension.average,
      name: dimension.name,
    }]))
    const completed = {
      id: globalThis.crypto?.randomUUID?.() || `innercompass-${Date.now()}`,
      assessmentType: ASSESSMENT_TYPE,
      assessmentName: 'InnerCompass',
      questionBankVersion: INNERCOMPASS_V02_VERSION,
      level: ASSESSMENT_LEVEL,
      questionCount: INNERCOMPASS_V02_QUESTIONS_30.length,
      startedAt: startedAt || new Date().toISOString(),
      createdAt: new Date().toISOString(),
      answers: { ...answers },
      scores,
      dimensions: result.dimensions,
      resultNote: result.note,
    }
    saveAssessment(completed)
    clearDraft(ASSESSMENT_LEVEL, ASSESSMENT_TYPE)
    setRecord(completed)
    setDraft(null)
    onDataChange?.(loadAppData())
    setView('result')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const retake = () => {
    const existingDraft = loadDraft(ASSESSMENT_LEVEL, ASSESSMENT_TYPE)
    const warning = existingDraft
      ? 'အရင်ရလဒ်ကို History ထဲမှာ ထိန်းထားပါမယ်။ မပြီးသေးတဲ့ InnerCompass Draft ရှိနေတဲ့အတွက် အသစ်စတင်ပါက အဲဒီ Draft ကို အစားထိုးပါမယ်။ ဆက်လုပ်မှာ သေချာပါသလား။'
      : 'အရင်ရလဒ်ကို History ထဲမှာ ထိန်းထားပြီး စမ်းသပ်မှုအသစ် စတင်မှာဖြစ်ပါတယ်။ ဆက်လုပ်မှာ သေချာပါသလား။'
    if (!window.confirm(warning)) return
    clearDraft(ASSESSMENT_LEVEL, ASSESSMENT_TYPE)
    const now = new Date().toISOString()
    setAnswers({})
    setSkippedQuestionIds([])
    setQuestionIndex(0)
    setStartedAt(now)
    setRecord(null)
    const emptyDraft = {
      assessmentType: ASSESSMENT_TYPE, questionBankVersion: INNERCOMPASS_V02_VERSION,
      level: ASSESSMENT_LEVEL, answers: {}, skippedQuestionIds: [], currentIndex: 0,
      startedAt: now, updatedAt: now, status: 'in-progress',
    }
    saveDraft(emptyDraft)
    setDraft(emptyDraft)
    onDataChange?.(loadAppData())
    setView('question')
  }

  if (view === 'question') return <><QuestionView answers={answers} skippedQuestionIds={skippedQuestionIds} questionIndex={questionIndex} onAnswer={answerQuestion} onPrevious={goPrevious} onNext={goNext} onSkip={skipQuestion} onReview={() => setView('review')} onExit={exit}/>{toast && <div role="status" className="no-print fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#405f82] px-5 py-3 text-xs font-semibold text-white shadow-xl">{toast}</div>}</>
  if (view === 'review') return <><ReviewView answers={answers} skippedQuestionIds={skippedQuestionIds} onGoTo={goToQuestion} onFinish={finish} onBack={() => setView('question')}/>{toast && <div role="status" className="no-print fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#405f82] px-5 py-3 text-xs font-semibold text-white shadow-xl">{toast}</div>}</>
  if (view === 'result') return <ResultView record={record || initialRecord} onHome={onHome} onRetake={retake}/>
  return <GuideView draft={draft} onBack={onHome} onBegin={startFresh} onResume={resume} onRestart={startFresh}/>
}
