import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft, ArrowRight, Check, CheckCircle2, ChevronRight, Clock3, Download,
  LockKeyhole, Printer, RotateCcw, ShieldCheck,
} from 'lucide-react'
import {
  PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart,
  ResponsiveContainer, Tooltip,
} from 'recharts'
import BalancedSpectrumBar from './BalancedSpectrumBar.jsx'
import CalmingBreathPause from './CalmingBreathPause.jsx'
import LikertScaleSelector from './LikertScaleSelector.jsx'
import MobileQuestionActions from './MobileQuestionActions.jsx'
import ReflectionNotesSection from './ReflectionNotesSection.jsx'
import ReportSectionNavigation from './ReportSectionNavigation.jsx'
import ResultShareCardButton from './ResultShareCardButton.jsx'
import StorageWriteAlert from './StorageWriteAlert.jsx'
import {
  EMOTIONLENS_ANSWER_OPTIONS,
  EMOTIONLENS_DIMENSIONS,
  EMOTIONLENS_LEVELS,
  EMOTIONLENS_VERSION,
  getEmotionLensQuestionsForLevel,
} from '../data/emotionLensPilot.js'
import { downloadTextFile } from '../utils/download.js'
import { getEmotionLensInsight, scoreEmotionLens } from '../utils/emotionLensScoring.js'
import { clearDraft, loadAppData, loadDraft, saveAssessmentWithStatus, saveDraft } from '../utils/storage.js'

const ASSESSMENT_TYPE = 'emotionLens'
const ACCENT = '#2f6d73'

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

function EmotionLensLogo({ size = 52, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="EmotionLens logo" className={className} fill="none">
      <circle cx="32" cy="32" r="27" stroke="currentColor" strokeOpacity=".22" strokeWidth="1.5" />
      <path d="M32 13c7.5 8.5 13 15.2 13 22.5a13 13 0 0 1-26 0C19 28.2 24.5 21.5 32 13Z" fill="currentColor" fillOpacity=".12" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M23.5 35.5c2.2 2.4 5.2 3.8 8.5 3.8s6.3-1.4 8.5-3.8" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
      <circle cx="32" cy="30" r="2.4" fill="currentColor" />
    </svg>
  )
}

function PrimaryButton({ children, onClick, disabled = false, icon: Icon = ArrowRight }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#2f6d73] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(47,109,115,0.18)] transition hover:-translate-y-0.5 hover:bg-[#24565b] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0">
      {children}<Icon size={17} />
    </button>
  )
}

function SecondaryButton({ children, onClick, icon: Icon, disabled = false, className = '' }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={cn('inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-[#bfd8da] bg-white px-5 py-2.5 text-sm font-semibold text-[#1e4a4f] transition hover:border-[#96bfc3] hover:bg-[#f4f9f9] disabled:cursor-not-allowed disabled:opacity-40', className)}>
      {Icon && <Icon size={16} />}{children}
    </button>
  )
}

function GuideView({ level, onSelectLevel, questionCount, draft, onBack, onBegin, onResume, onRestart, storageAlertVisible, onExportBackup, onDismissStorageError }) {
  const [acknowledged, setAcknowledged] = useState(false)
  const answeredCount = Object.keys(draft?.answers || {}).length
  const skippedCount = (draft?.skippedQuestionIds || []).filter((id) => draft?.answers?.[id] === undefined).length
  const progress = questionCount ? Math.round((answeredCount / questionCount) * 100) : 0

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <button onClick={onBack} className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#3a5a5e] hover:text-[#1e4a4f]"><ArrowLeft size={16} /> ပင်မစာမျက်နှာ</button>
      <StorageWriteAlert visible={storageAlertVisible} onExportBackup={onExportBackup} onDismiss={onDismissStorageError} />
      <section className="overflow-hidden rounded-[2rem] border border-[#cce0e2] bg-white card-shadow">
        <div className="bg-gradient-to-br from-[#eaf4f4] via-[#f9fcfc] to-[#e4f0f1] p-6 sm:p-9">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <span className="grid h-[68px] w-[68px] shrink-0 place-items-center rounded-2xl bg-white text-[#2f6d73] shadow-sm"><EmotionLensLogo size={52} /></span>
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] text-[#3a5a5e]">EMOTIONLENS</p>
                <h1 className="mt-1 text-xl font-bold text-[#1e4a4f] sm:text-2xl">စိတ်ခံစားချက် သိမှတ်မှုနှင့် စိတ်အေးချမ်းမှုကို လေ့လာခြင်း</h1>
                <p className="mt-1 text-xs text-[#3a5a5e]">မေးခွန်း {level === 40 ? '၄၀' : '၂၀'} · အချက် ၄ ချက် · {level === 40 ? '~၈ မိနစ်' : '~၄ မိနစ်'}</p>
              </div>
            </div>
            <span className="rounded-full border border-[#bfd8da] bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-[#1e4a4f]">Pilot Reflection · စမ်းသပ်မူကြမ်း</span>
          </div>
          <p className="mt-6 text-sm leading-8 text-[#3a5a5e]">နေ့စဉ်ဘဝတွင် ကိုယ့်စိတ်ခံစားချက်များကို သတိပြုမိပုံ၊ စိတ်ဖိစီးမှုကို ကိုင်တွယ်တည်ငြိမ်ပုံ၊ ကိုယ့်ကိုယ်ကို ကြင်နာနားလည်ပုံနှင့် အတွေးလွန်ခြင်းမှ ပြန်လည်စုစည်းနိုင်ပုံတို့ကို ညင်သာစွာ ပြန်လည်သုံးသပ်နိုင်ရန် ရေးဆွဲထားသည့် စမ်းသပ်မူကြမ်း ဖြစ်ပါသည်။</p>
        </div>

        <div className="p-6 sm:p-9">
          <div className="mb-6">
            <h2 className="text-base font-bold text-[#1e4a4f]">ဖြေဆိုမည့် မေးခွန်းအဆင့် ရွေးချယ်ပါ</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="EmotionLens မေးခွန်းအဆင့် ရွေးချယ်မှု">
              {EMOTIONLENS_LEVELS.map((option) => {
                const selected = level === option.value
                const levelDraft = loadDraft(option.value, ASSESSMENT_TYPE)
                const levelAnswered = Object.keys(levelDraft?.answers || {}).length
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => onSelectLevel(option.value)}
                    className={cn(
                      'flex flex-col rounded-2xl border p-4 text-left transition',
                      selected ? 'border-[#2f6d73] bg-[#f4f9f9] ring-1 ring-[#2f6d73]/30' : 'border-[#dcebed] bg-white hover:border-[#9fc4c7] hover:bg-[#f8fcfc]',
                    )}
                  >
                    <div className="flex w-full items-center justify-between gap-2">
                      <span className={cn('rounded-full px-2.5 py-1 text-[11px] font-semibold', selected ? 'bg-[#2f6d73] text-white' : 'bg-[#eaf4f4] text-[#1e4a4f]')}>{option.label}</span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#3a5a5e]"><Clock3 size={12} /> {option.duration}</span>
                    </div>
                    <p className="mt-3 text-sm font-bold text-[#1e4a4f]">{option.title}</p>
                    <p className="mt-1 text-xs leading-6 text-[#3a5a5e]">{option.subtitle}</p>
                    {levelDraft && (
                      <p className="mt-2 text-[11px] font-semibold text-[#2f6d73]">မပြီးသေးသော Draft ({levelAnswered}/{option.value})</p>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          <h2 className="text-base font-bold text-[#1e4a4f]">ဒီဆန်းစစ်မှုမှာ လေ့လာမယ့် အဓိက အချက် ၄ ချက်</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {EMOTIONLENS_DIMENSIONS.map((dimension, index) => (
              <article key={dimension.id} className="rounded-2xl border border-[#dcebed] bg-[#f6fbfb] p-4">
                <div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-xs font-bold text-[#2f6d73]">{index + 1}</span><h3 className="text-sm font-bold text-[#1e4a4f]">{dimension.name}</h3></div>
                <p className="mt-2 text-xs leading-6 text-[#3a5a5e]">{dimension.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-[#dcebed] bg-white p-4 sm:p-5">
            <h2 className="text-base font-bold text-[#1e4a4f]">မစတင်မီ သိထားသင့်သော အချက်များ</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <article className="rounded-xl bg-[#f4f9f9] p-3.5"><p className="text-xs font-bold text-[#1e4a4f]">ဘယ်လိုဖြေဆိုသင့်သလဲ။</p><p className="mt-1.5 text-xs leading-6 text-[#3a5a5e]">အကောင်းဆုံးအဖြေကို ရှာမနေဘဲ လတ်တလော နေ့စဉ်ဘဝတွင် ကိုယ်တကယ် ခံစားတုံ့ပြန်တတ်ပုံအတိုင်း ရိုးသားစွာ ဖြေပါ။ အဖြေမှန်၊ အဖြေမှား မရှိပါ။</p></article>
              <article className="rounded-xl bg-[#f4f9f9] p-3.5"><p className="text-xs font-bold text-[#1e4a4f]">အဖြေရွေးချယ်ပုံ</p><p className="mt-1.5 text-xs leading-6 text-[#3a5a5e]">မေးခွန်းတစ်ခုစီအတွက် သင့်အတွေ့အကြုံနှင့် ကိုက်ညီမှုအတိုင်းအတာကို ၅ ဆင့်ထဲမှ တစ်ခု ရွေးချယ်ပါ။</p></article>
              <article className="rounded-xl bg-[#f4f9f9] p-3.5"><p className="text-xs font-bold text-[#1e4a4f]">ကျော်ခြင်းနှင့် ပြန်ဆက်ခြင်း</p><p className="mt-1.5 text-xs leading-6 text-[#3a5a5e]">မသေချာသေးသော မေးခွန်းကို ကျော်ထားနိုင်ပြီး နောက်မှ ပြန်ဖြေနိုင်ပါသည်။ အဖြေရွေးတိုင်း ဒီ Browser ထဲတွင် အလိုအလျောက် သိမ်းဆည်းပါသည်။</p></article>
              <article className="rounded-xl bg-[#f4f9f9] p-3.5"><p className="text-xs font-bold text-[#1e4a4f]">ရလဒ်ကို ဘယ်လိုနားလည်ရမလဲ။</p><p className="mt-1.5 text-xs leading-6 text-[#3a5a5e]">ရမှတ်များသည် ကိုယ်တိုင်ပြန်လည်သုံးသပ်ရန် အညွှန်းသာဖြစ်ပြီး အကောင်းအဆိုး အဆင့်သတ်မှတ်ချက် မဟုတ်ပါ။</p></article>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-[#f0dfc6] bg-[#fffaf2] p-4 sm:p-5">
            <div className="flex items-start gap-3"><ShieldCheck size={19} className="mt-0.5 shrink-0 text-[#825824]" /><div><p className="text-xs font-bold text-[#805b2d]">အရေးကြီးသော သတိပြုချက် (စမ်းသပ်မူကြမ်း)</p><p className="mt-1.5 text-xs leading-7 text-[#6f5e47]">EmotionLens သည် ကိုယ်ပိုင်ရေးဆွဲထားသည့် စမ်းသပ်မူကြမ်း (Pilot Reflection) သာ ဖြစ်ပါသည်။ စိတ်ကျန်းမာရေး ရောဂါရှာဖွေမှု၊ ဆေးဘက်ဆိုင်ရာ စစ်ဆေးမှု သို့မဟုတ် ပညာရှင်အကြံဉာဏ်အစားထိုး မဟုတ်ပါ။</p></div></div>
          </div>

          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#dcebed] bg-[#f6fbfb] p-4">
            <LockKeyhole size={18} className="mt-0.5 shrink-0 text-[#2f6d73]" />
            <div><p className="text-xs font-bold text-[#1e4a4f]">ကိုယ်ရေးအချက်အလက်နှင့် သိမ်းဆည်းမှု</p><p className="mt-1 text-xs leading-6 text-[#3a5a5e]">သင့်အဖြေများကို ဒီ Browser နှင့် ဒီစက်ထဲတွင်သာ သိမ်းဆည်းထားပါသည်။ Browser Data မရှင်းမီ JSON Backup ထုတ်ယူထားပါ။</p></div>
          </div>

          <div className="mt-5">
            <CalmingBreathPause theme="emotionLens" />
          </div>

          {draft ? (
            <div className="mt-6 rounded-2xl border border-[#bfd8da] bg-[#f4f9f9] p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-[#1e4a4f]">
                <span>မပြီးသေးသော ဖြေဆိုမှု ရှိနေပါသည်</span>
                <span>{progress}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#d8e8ea]"><div className="h-full rounded-full bg-[#2f6d73]" style={{ width: `${progress}%` }} /></div>
              <p className="mt-2 text-xs text-[#3a5a5e]">ဖြေပြီး {answeredCount} ခု · ကျော်ထား {skippedCount} ခု</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <PrimaryButton onClick={onResume}>ဆက်လက်ဖြေဆိုမယ်</PrimaryButton>
                <SecondaryButton onClick={onRestart}>အစကနေ အသစ်ပြန်စမယ်</SecondaryButton>
              </div>
            </div>
          ) : (
            <div className="mt-6">
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#dcebed] bg-[#f8fcfc] p-4 text-xs leading-6 text-[#3a5a5e]">
                <input
                  type="checkbox"
                  checked={acknowledged}
                  onChange={(event) => setAcknowledged(event.target.checked)}
                  className="mt-1 h-4 w-4 shrink-0 rounded border-[#9fc4c7] accent-[#2f6d73]"
                />
                <span>ဤ EmotionLens သည် စမ်းသပ်မူကြမ်း (Pilot Reflection) အဆင့် ကိုယ်တိုင်ပြန်လည်သုံးသပ်မှုသာ ဖြစ်ပြီး ဆေးဘက်ဆိုင်ရာ သို့မဟုတ် စိတ်ပညာဆိုင်ရာ ရောဂါရှာဖွေမှု မဟုတ်ကြောင်း နားလည်သဘောတူပါသည်။</span>
              </label>
              <div className="mt-5 flex flex-wrap justify-between gap-3">
                <SecondaryButton onClick={onBack} icon={ArrowLeft}>နောက်သို့</SecondaryButton>
                <PrimaryButton onClick={onBegin} disabled={!acknowledged}>မေးခွန်းများ စတင်မယ်</PrimaryButton>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

function QuestionView({
  activeQuestions,
  answers,
  skippedQuestionIds,
  questionIndex,
  onAnswer,
  onPrevious,
  onNext,
  onSkip,
  onReview,
  onExit,
  storageError,
  storageAlertVisible,
  onExportBackup,
  onDismissStorageError,
}) {
  const question = activeQuestions[questionIndex]
  const total = activeQuestions.length
  const answeredCount = Object.keys(answers).length
  const progress = Math.round((answeredCount / total) * 100)
  const selectedAnswer = answers[question.id]
  const isSkipped = selectedAnswer === undefined && skippedQuestionIds.includes(question.id)
  const isLast = questionIndex === total - 1

  return (
    <main className="mx-auto max-w-3xl px-4 pb-36 pt-6 sm:px-6 sm:pb-14 sm:pt-10">
      <div className="no-print mb-4 flex items-center justify-between gap-3">
        <button onClick={onExit} className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-[#3a5a5e] hover:text-[#1e4a4f] sm:text-sm"><ArrowLeft size={16} /> ခဏနားပြီး ထွက်မယ်</button>
        <span className="rounded-full border border-[#cce0e2] bg-white px-3 py-1 text-[11px] font-semibold text-[#1e4a4f]">EmotionLens · Pilot</span>
      </div>
      <StorageWriteAlert visible={storageAlertVisible} onExportBackup={onExportBackup} onDismiss={onDismissStorageError} />
      {storageError && !storageAlertVisible && (
        <p className="mb-3 text-center text-[11px] font-medium text-[#8b3a2b]">သိမ်းဆည်းမှု သတိပေးချက်: JSON Backup ထုတ်ထားရန် အကြံပြုပါသည်။</p>
      )}
      <section className="rounded-[2rem] border border-[#cce0e2] bg-white p-5 card-shadow sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#3a5a5e]">
          <span className="font-semibold text-[#1e4a4f]">မေးခွန်း {questionIndex + 1} / {total}</span>
          <span>ဖြေပြီး {answeredCount} / {total} ({progress}%)</span>
        </div>
        <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-[#e6f1f2]">
          <div className="h-full rounded-full bg-[#2f6d73] transition-all duration-300" style={{ width: `${Math.max(4, progress)}%` }} />
        </div>
        {isSkipped && (
          <p className="mt-3 inline-flex rounded-full bg-[#fff7ed] px-3 py-1 text-[11px] font-semibold text-[#825824]">ကျော်ထားသော မေးခွန်း · ယခုပြန်ဖြေနိုင်ပါသည်</p>
        )}
        <h1 className="mt-6 text-lg font-bold leading-relaxed text-[#1e4a4f] sm:text-xl">{question.text}</h1>
        <div className="mt-6">
          <LikertScaleSelector
            options={EMOTIONLENS_ANSWER_OPTIONS}
            value={selectedAnswer}
            onChange={(val) => onAnswer(question.id, val)}
            accent="teal"
          />
        </div>
        <div className="no-print mt-8 hidden flex-wrap items-center justify-between gap-3 border-t border-[#e8f2f3] pt-5 sm:flex">
          <SecondaryButton onClick={onPrevious} icon={ArrowLeft} disabled={questionIndex === 0}>ယခင်</SecondaryButton>
          <div className="flex flex-wrap items-center gap-2">
            {selectedAnswer === undefined && <button onClick={onSkip} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-dashed border-[#9fc4c7] bg-[#f4f9f9] px-4 py-2.5 text-sm font-semibold text-[#1e4a4f] hover:bg-[#e8f3f4]">ဒီမေးခွန်းကို ကျော်မယ် <ArrowRight size={15} /></button>}
            <PrimaryButton onClick={isLast ? onReview : onNext} disabled={selectedAnswer === undefined} icon={isLast ? CheckCircle2 : ArrowRight}>{isLast ? 'အဖြေတွေ ပြန်စစ်မယ်' : 'နောက်တစ်ခု'}</PrimaryButton>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#f4f9f9] px-4 py-3"><p className="text-[11px] leading-5 text-[#3a5a5e]">မသေချာသေးတဲ့မေးခွန်းကို ကျော်ပြီး နောက်မှ ပြန်ဖြေနိုင်ပါတယ်။</p><button onClick={onReview} className="min-h-11 text-xs font-semibold text-[#2f6d73] hover:text-[#1e4a4f]">မေးခွန်းစာရင်းကြည့်မယ်</button></div>
      </section>
      <MobileQuestionActions
        accent="teal"
        onPrevious={onPrevious}
        onNext={isLast ? onReview : onNext}
        onSkip={onSkip}
        onReview={onReview}
        canPrevious={questionIndex > 0}
        canNext={selectedAnswer !== undefined}
        showSkip={selectedAnswer === undefined}
        isLast={isLast}
      />
      <p className="mt-5 text-center text-[11px] leading-6 text-[#3a5a5e]">အဖြေရွေးချယ်တာနဲ့ ဒီ Browser ထဲမှာ သိမ်းဆည်းပါတယ်။ Browser Data မရှင်းပါနဲ့။</p>
    </main>
  )
}

function ReviewView({ activeQuestions, answers, skippedQuestionIds, onGoTo, onFinish, onBack, storageAlertVisible, onExportBackup, onDismissStorageError }) {
  const [filter, setFilter] = useState('incomplete')
  const answered = activeQuestions.filter((question) => answers[question.id] !== undefined)
  const skipped = activeQuestions.filter((question) => answers[question.id] === undefined && skippedQuestionIds.includes(question.id))
  const unanswered = activeQuestions.filter((question) => answers[question.id] === undefined && !skippedQuestionIds.includes(question.id))
  const incomplete = [...skipped, ...unanswered]
  const visible = filter === 'answered' ? answered : filter === 'skipped' ? skipped : filter === 'unanswered' ? unanswered : incomplete
  const statusOf = (question) => answers[question.id] !== undefined ? 'ဖြေပြီး · ပြန်ပြင်နိုင်သည်' : skippedQuestionIds.includes(question.id) ? 'ကျော်ထား · ပြန်ဖြေနိုင်သည်' : 'မဖြေရသေး'

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <button onClick={onBack} className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#3a5a5e] hover:text-[#1e4a4f]"><ArrowLeft size={16} /> မေးခွန်းသို့ ပြန်သွားမယ်</button>
      <StorageWriteAlert visible={storageAlertVisible} onExportBackup={onExportBackup} onDismiss={onDismissStorageError} />
      <section className="rounded-[2rem] border border-[#cce0e2] bg-white p-5 card-shadow sm:p-8">
        <p className="text-xs font-semibold tracking-wide text-[#3a5a5e]">EMOTIONLENS · REVIEW</p>
        <h1 className="mt-2 text-2xl font-bold text-[#1e4a4f]">ဖြေဆိုမှုကို ပြန်စစ်ပါ</h1>
        <p className="mt-2 text-xs leading-6 text-[#3a5a5e]">ကျော်ထားတဲ့မေးခွန်းနဲ့ မဖြေရသေးတဲ့မေးခွန်းကို ရွေးပြီး တိုက်ရိုက်ပြန်ဖြေနိုင်ပါတယ်။</p>
        <div className="mt-6 grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-[#edf6ef] p-3"><p className="text-2xl font-bold text-[#436b4f] tabular-nums">{answered.length}</p><p className="mt-1 text-[11px] text-[#436b4f]">ဖြေပြီး</p></div>
          <div className="rounded-xl bg-[#fff7ed] p-3"><p className="text-2xl font-bold text-[#825824] tabular-nums">{skipped.length}</p><p className="mt-1 text-[11px] text-[#825824]">ကျော်ထား</p></div>
          <div className="rounded-xl bg-[#f4f9f9] p-3"><p className="text-2xl font-bold text-[#3a5a5e] tabular-nums">{unanswered.length}</p><p className="mt-1 text-[11px] text-[#3a5a5e]">မဖြေရသေး</p></div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">{[['incomplete', `ပြန်ဖြေရန် (${incomplete.length})`], ['skipped', `ကျော်ထား (${skipped.length})`], ['unanswered', `မဖြေရသေး (${unanswered.length})`], ['answered', `ဖြေပြီး (${answered.length})`]].map(([value, label]) => <button key={value} onClick={() => setFilter(value)} className={cn('min-h-10 rounded-full px-3.5 py-2 text-[11px] font-semibold transition', filter === value ? 'bg-[#2f6d73] text-white' : 'bg-[#eaf4f4] text-[#3a5a5e] hover:bg-[#dcebed]')}>{label}</button>)}</div>
        <div className="mt-4 rounded-2xl border border-[#dcebed] p-3 sm:p-4">
          {visible.length === 0 ? <div className="py-8 text-center"><CheckCircle2 className="mx-auto text-[#436b4f]" size={30} /><p className="mt-2 text-sm font-semibold text-[#436b4f]">ဒီအမျိုးအစားမှာ မေးခွန်းမရှိပါ။</p></div> : <div className="grid gap-2 sm:grid-cols-2">{visible.map((question) => {
            const originalIndex = activeQuestions.findIndex((item) => item.id === question.id)
            return <button key={question.id} onClick={() => onGoTo(originalIndex)} className="flex min-w-0 items-start gap-3 rounded-xl border border-[#dcebed] bg-white p-3 text-left transition hover:border-[#9fc4c7] hover:bg-[#f6fbfb]"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#eaf4f4] text-xs font-bold text-[#1e4a4f]">{originalIndex + 1}</span><span className="min-w-0 flex-1"><span className="block text-[11px] font-semibold leading-5 text-[#1e4a4f]">{question.text}</span><span className="mt-1 block text-[11px] text-[#3a5a5e]">{statusOf(question)}</span></span><ChevronRight size={15} className="mt-1 shrink-0 text-[#3a5a5e]" /></button>
          })}</div>}
        </div>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between"><SecondaryButton onClick={onBack}>မေးခွန်းဆက်ဖြေမယ်</SecondaryButton><PrimaryButton onClick={onFinish} icon={CheckCircle2}>အဖြေစစ်ပြီး ရလဒ်ကြည့်မယ်</PrimaryButton></div>
        {incomplete.length > 0 && <p className="mt-3 text-right text-[11px] leading-6 text-[#825824]">မေးခွန်း {incomplete.length} ခု ကျန်နေသေးပါတယ်။ အားလုံးဖြေပြီးမှ အညွှန်းရလဒ်တွက်ချက်နိုင်ပါမယ်။</p>}
      </section>
    </main>
  )
}

function wrapEmotionLensLabel(value) {
  const text = String(value || '')
  if (text.length <= 12) return [text]
  const spaceIndex = text.indexOf(' ', Math.floor(text.length / 3))
  if (spaceIndex > 0 && spaceIndex < text.length - 2) {
    return [text.slice(0, spaceIndex), text.slice(spaceIndex + 1)]
  }
  const mid = Math.ceil(text.length / 2)
  return [text.slice(0, mid), text.slice(mid)]
}

function EmotionLensPolarTick({ payload, x, y, textAnchor }) {
  const lines = wrapEmotionLensLabel(payload?.value)
  const startDy = lines.length > 1 ? -4 : 4
  return (
    <text x={x} y={y} textAnchor={textAnchor} fill="#3a5a5e" fontSize={11} fontFamily="Noto Sans Myanmar">
      {lines.map((line, index) => (
        <tspan key={index} x={x} dy={index === 0 ? startDy : 13}>
          {line}
        </tspan>
      ))}
    </text>
  )
}

function ResultView({ record, onHome, onRetake, storageAlertVisible, onExportBackup, onDismissStorageError }) {
  const questionCount = record?.questionCount || record?.level || (Object.keys(record?.answers || {}).length > 20 ? 40 : 20)
  const questionCountLabel = questionCount === 40 ? '၄၀' : '၂၀'
  const result = useMemo(() => scoreEmotionLens(record?.answers || {}, questionCount), [record, questionCount])
  if (!record || !result.complete) return null
  const chartData = result.dimensions.map((item) => ({ area: item.shortName, score: item.index }))
  const ordered = [...result.dimensions].sort((a, b) => b.index - a.index)
  const dimensionInsights = result.dimensions.map((dimension) => {
    const meta = EMOTIONLENS_DIMENSIONS.find((item) => item.id === dimension.id)
    return {
      ...dimension,
      leftLabel: meta?.leftLabel,
      rightLabel: meta?.rightLabel,
      insight: getEmotionLensInsight(dimension.id, dimension.index),
    }
  })

  const downloadReport = () => {
    const lines = [
      'Self Discovery — EmotionLens ကိုယ်တိုင်ပြန်လည်သုံးသပ်မှုအစီရင်ခံစာ (Pilot Reflection)',
      `မေးခွန်းဗားရှင်း: ${record.questionBankVersion || EMOTIONLENS_VERSION}`,
      `မေးခွန်းအရေအတွက်: ${questionCount} မေးခွန်း`,
      `ဖြေဆိုသည့်နေ့: ${formatDate(record.createdAt)}`,
      'ဤရလဒ်သည် စမ်းသပ်မူကြမ်း (Pilot Reflection) အဆင့် ကိုယ်တိုင်ပြန်လည်သုံးသပ်မှု အညွှန်းသာဖြစ်ပါသည်။',
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
      'EmotionLens သည် စမ်းသပ်မူကြမ်းအဆင့် ကိုယ်ပိုင်ရေးဆွဲထားသော reflection tool ဖြစ်ပြီး ဆေးဘက်ဆိုင်ရာ သို့မဟုတ် စိတ်ပညာဆိုင်ရာ အတည်ပြုစမ်းသပ်မှု မဟုတ်ပါ။',
    ]
    downloadTextFile(
      `emotionlens-reflection-${new Date(record.createdAt).toISOString().slice(0, 10)}.txt`,
      lines.join('\n'),
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8">
      <StorageWriteAlert visible={storageAlertVisible} onExportBackup={onExportBackup} onDismiss={onDismissStorageError} />
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
        <button onClick={onHome} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#3a5a5e] hover:text-[#1e4a4f]"><ArrowLeft size={16} /> ပင်မစာမျက်နှာ</button>
        <div className="flex flex-wrap gap-2">
          <SecondaryButton onClick={downloadReport} icon={Download}>အစီရင်ခံစာသိမ်းမယ်</SecondaryButton>
          <ResultShareCardButton
            tone="teal"
            getCardConfig={() => ({
              filename: `emotionlens-result-${new Date(record.createdAt).toISOString().slice(0, 10)}.png`,
              subtitle: 'EMOTIONLENS · PILOT REFLECTION',
              title: 'စိတ်ခံစားချက်နှင့် စိတ်အေးချမ်းမှု အချက် ၄ ချက် အကျဉ်းချုပ်',
              metaLine: `မေးခွန်း ${questionCountLabel} · ${formatDate(record.createdAt)}`,
              items: dimensionInsights.map((d) => ({ label: d.name, score: d.index })),
              accentColor: '#2f6d73',
              trackColor: '#e6f1f2',
              footerNote: 'EmotionLens သည် စမ်းသပ်မူကြမ်းအဆင့် ကိုယ်တိုင်ပြန်လည်သုံးသပ်မှု reflection tool ဖြစ်ပြီး ရောဂါရှာဖွေမှု မဟုတ်ပါ။',
            })}
          />
          <SecondaryButton onClick={() => window.print()} icon={Printer}>Print</SecondaryButton>
        </div>
      </div>

      <ReportSectionNavigation tone="teal" items={[
        { id: 'emotionlens-report-overview', label: 'အနှစ်ချုပ်' },
        { id: 'emotionlens-report-areas', label: 'အချက် ၄ ချက်' },
        { id: 'emotionlens-report-notes', label: 'ရလဒ်ဖတ်ရှုရန်' },
      ]} />

      <section id="emotionlens-report-overview" className="scroll-mt-28 print-card overflow-hidden rounded-[2rem] border border-[#cce0e2] bg-gradient-to-br from-[#eaf4f4] via-[#f9fcfc] to-[#e4f0f1] p-6 card-shadow sm:p-10">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/85 px-3 py-1.5 text-xs font-semibold text-[#1e4a4f]"><CheckCircle2 size={14} /> ဆန်းစစ်မှု ပြီးဆုံးပါပြီ</span>
          <div className="mt-5 flex justify-center"><span className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-[#2f6d73] shadow-sm"><EmotionLensLogo size={50} /></span></div>
          <p className="mt-4 text-xs font-semibold tracking-[0.15em] text-[#3a5a5e]">EMOTIONLENS · PILOT REFLECTION</p>
          <h1 className="mt-3 text-2xl font-bold leading-relaxed text-[#1e4a4f] sm:text-3xl">သင့်ရဲ့ စိတ်ခံစားချက်နှင့် တည်ငြိမ်မှု အကျဉ်းချုပ်</h1>
          <p className="mt-2 text-xs text-[#3a5a5e]">မေးခွန်း {questionCountLabel} · {formatDate(record.createdAt)}</p>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-[#3a5a5e]">အောက်ပါရလဒ်များသည် ဤစမ်းသပ်မူကြမ်းအတွင်း သင်ရွေးချယ်ထားသော အဖြေများကို အချက် ၄ ချက်အလိုက် စုစည်းပြသထားခြင်းသာ ဖြစ်ပါသည်။ ဤအရာသည် အပြီးသတ် အကဲဖြတ်ချက် သို့မဟုတ် ရောဂါရှာဖွေမှု မဟုတ်ပါ။</p>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-[1.5rem] border border-white/90 bg-white/90 p-4 sm:p-6">
            <div className="flex items-center justify-between"><h2 className="text-sm font-bold text-[#1e4a4f]">အဓိက အချက် ၄ ချက်၏ ရမှတ်</h2><span className="text-[11px] text-[#3a5a5e]">0–100</span></div>
            <div className="mt-2 h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={chartData} outerRadius="56%" margin={{ top: 22, right: 44, bottom: 22, left: 44 }}>
                  <PolarGrid stroke="#d4e6e8" />
                  <PolarAngleAxis dataKey="area" tick={<EmotionLensPolarTick />} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#3a5a5e', fontSize: 11 }} axisLine={false} />
                  <Radar name="အညွှန်းရမှတ်" dataKey="score" stroke={ACCENT} fill="#76b0b5" fillOpacity={0.55} strokeWidth={2} />
                  <Tooltip formatter={(value) => [`${value}/100`, 'အညွှန်းရမှတ်']} contentStyle={{ borderRadius: 12, borderColor: '#cce0e2', fontSize: 12 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-[11px] leading-5 text-[#3a5a5e]">ဤအညွှန်းသည် ဖြေဆိုထားသည့်အဖြေများကို စကေးအတွင်း ပြောင်းလဲဖော်ပြခြင်းသာ ဖြစ်ပါသည်။</p>
          </div>
          <div className="flex flex-col gap-3">
            {ordered.slice(0, 2).map((dimension, index) => (
              <article key={dimension.id} className="rounded-[1.5rem] border border-white/90 bg-white/90 p-5">
                <p className="text-xs font-semibold text-[#3a5a5e]">ဒီဖြေဆိုမှုအတွင်း ပိုမိုပေါ်လွင်နေသော အချက် {index + 1}</p>
                <h3 className="mt-2 text-sm font-bold leading-6 text-[#1e4a4f]">{dimension.name}</h3>
                <p className="mt-1 text-xl font-bold text-[#2f6d73]">{dimension.index} / 100</p>
                <p className="mt-2 text-[11px] font-semibold leading-6 text-[#1e4a4f]">{getEmotionLensInsight(dimension.id, dimension.index)?.label}</p>
                <p className="mt-2 text-xs leading-7 text-[#3a5a5e]">{EMOTIONLENS_DIMENSIONS.find((item) => item.id === dimension.id)?.description}</p>
              </article>
            ))}
            <div className="rounded-[1.5rem] border border-[#cce0e2] bg-white/80 p-5">
              <p className="text-xs font-bold text-[#1e4a4f]">ရလဒ်ကို ဖတ်ရှုရာတွင်</p>
              <p className="mt-2 text-xs leading-7 text-[#3a5a5e]">အမှတ်မြင့်ခြင်းသည် အပြုသဘော ဖော်ပြချက်များနှင့် ပိုမိုကိုက်ညီကြောင်းသာ ညွှန်ပြပြီး အမှတ်နိမ့်ခြင်းသည်လည်း ချို့ယွင်းချက် မဟုတ်ပါ။ မိမိစိတ်အခြေအနေကို နားလည်ရန်သာ အသုံးပြုပါ။</p>
            </div>
          </div>
        </div>
      </section>

      <section id="emotionlens-report-areas" className="mt-8 scroll-mt-28">
        <div className="mb-4"><p className="text-xs font-semibold tracking-wide text-[#3a5a5e]">UNDERSTANDING YOUR FOUR AREAS</p><h2 className="mt-1 text-xl font-bold text-[#1e4a4f]">အချက် ၄ ချက်ကို တစ်ခုချင်း နားလည်ကြည့်ရအောင်</h2><p className="mt-2 text-xs leading-7 text-[#3a5a5e]">အညွှန်းရမှတ်တစ်ခုချင်းစီအတွက် အဓိပ္ပာယ်၊ နေ့စဉ်ဘဝ ဥပမာ၊ ကိုယ်တိုင်ပြန်မေးရန်နှင့် စမ်းကြည့်နိုင်သည့် အဆင့်ငယ်များကို ဖော်ပြထားပါသည်။</p></div>
        <div className="grid gap-4 lg:grid-cols-2">
          {dimensionInsights.map((dimension) => (
            <article key={dimension.id} className="rounded-2xl border border-[#dcebed] bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="text-sm font-bold leading-6 text-[#1e4a4f]">{dimension.name}</p><p className="mt-1 text-[11px] leading-5 text-[#3a5a5e]">{dimension.itemCount} မေးခွန်း · ပျမ်းမျှ {dimension.average}/5</p></div><span className="shrink-0 rounded-xl bg-[#eaf4f4] px-3 py-2 text-sm font-bold tabular-nums text-[#2f6d73]">{dimension.index}/100</span></div>
              <BalancedSpectrumBar
                score={dimension.index}
                leftLabel={dimension.leftLabel}
                rightLabel={dimension.rightLabel}
                tone="teal"
                ariaLabel={`${dimension.name} မျှခြေပြစကေး`}
              />
              {dimension.insight && (
                <>
                  <p className="mt-3 rounded-xl bg-[#f4f9f9] px-3 py-2 text-[11px] font-semibold leading-6 text-[#1e4a4f]">{dimension.insight.label}</p>
                  <div className="mt-4 space-y-3 text-xs leading-7 text-[#3a5a5e]">
                    <div><p className="font-bold text-[#1e4a4f]">ဒီအဖြေတွေက ဘာကို ညွှန်းနိုင်သလဲ။</p><p>{dimension.insight.interpretation}</p></div>
                    <div className="rounded-xl bg-[#f6fbfb] p-3"><p className="font-bold text-[#1e4a4f]">နေ့စဉ်ဘဝ ဥပမာ</p><p>{dimension.insight.example}</p></div>
                    <div><p className="font-bold text-[#1e4a4f]">ကိုယ့်ကိုယ်ကို ပြန်မေးကြည့်ရန်</p><p>{dimension.insight.reflection}</p></div>
                    <div className="rounded-xl border border-[#dcebed] p-3"><p className="font-bold text-[#2f6d73]">စမ်းကြည့်နိုင်တဲ့ အဆင့်ငယ်</p><p>{dimension.insight.tryThis}</p></div>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      </section>

      <ReflectionNotesSection recordId={record.id} theme="emotionLens" />
      <section className="no-print mt-8 flex flex-wrap justify-center gap-3"><SecondaryButton onClick={onHome}>ပင်မစာမျက်နှာသို့ ပြန်မယ်</SecondaryButton><PrimaryButton onClick={onRetake} icon={RotateCcw}>ပြန်လည်ဖြေဆိုမယ်</PrimaryButton></section>
      <p id="emotionlens-report-notes" className="mt-5 scroll-mt-28 text-center text-[11px] leading-6 text-[#3a5a5e]">ဤမေးခွန်းအုပ်စုသည် စမ်းသပ်မူကြမ်း (Pilot Reflection) အဆင့် ကိုယ်တိုင်ပြန်လည်သုံးသပ်မှုဖြစ်ပြီး စိတ်ပညာဆိုင်ရာ အတည်ပြုစမ်းသပ်မှု သို့မဟုတ် ရောဂါရှာဖွေမှု မဟုတ်ပါ။</p>
    </main>
  )
}

export default function EmotionLensModule({
  initialRecord = null,
  initialLevel = 20,
  onHome,
  onDataChange,
  persistRef,
  onExportBackup,
  storageError: sharedStorageError,
  storageAlertVisible: sharedStorageAlertVisible,
  onStorageWriteResult,
  onDismissStorageError,
}) {
  const resolvedInitialLevel = initialRecord
    ? (Number(initialRecord.questionCount || initialRecord.level) === 40 ? 40 : 20)
    : (Number(initialLevel) === 40 ? 40 : 20)
  const [level, setLevel] = useState(resolvedInitialLevel)
  const activeQuestions = useMemo(() => getEmotionLensQuestionsForLevel(level), [level])
  const initialDraft = initialRecord ? null : loadDraft(resolvedInitialLevel, ASSESSMENT_TYPE)
  const [view, setView] = useState(initialRecord ? 'result' : 'guide')
  const [draft, setDraft] = useState(initialDraft)
  const [answers, setAnswers] = useState(initialRecord?.answers || initialDraft?.answers || {})
  const [skippedQuestionIds, setSkippedQuestionIds] = useState(initialRecord ? [] : (initialDraft?.skippedQuestionIds || []))
  const [questionIndex, setQuestionIndex] = useState(initialRecord ? 0 : Math.max(0, Math.min(Number(initialDraft?.currentIndex) || 0, getEmotionLensQuestionsForLevel(resolvedInitialLevel).length - 1)))
  const [startedAt, setStartedAt] = useState(initialRecord?.startedAt || initialDraft?.startedAt || null)
  const [record, setRecord] = useState(initialRecord)
  const [toast, setToast] = useState('')
  const [localStorageError, setLocalStorageError] = useState(false)
  const [localAlertDismissed, setLocalAlertDismissed] = useState(false)
  const storageError = sharedStorageError ?? localStorageError
  const storageAlertVisible = sharedStorageAlertVisible ?? (storageError && !localAlertDismissed)

  const handleSelectLevel = (nextLevel) => {
    const normalized = Number(nextLevel) === 40 ? 40 : 20
    const nextQuestions = getEmotionLensQuestionsForLevel(normalized)
    const nextDraft = loadDraft(normalized, ASSESSMENT_TYPE)
    setLevel(normalized)
    setDraft(nextDraft)
    setAnswers(nextDraft?.answers || {})
    setSkippedQuestionIds(nextDraft?.skippedQuestionIds || [])
    setQuestionIndex(Math.max(0, Math.min(Number(nextDraft?.currentIndex) || 0, nextQuestions.length - 1)))
    setStartedAt(nextDraft?.startedAt || null)
  }

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
    if (view !== 'question' && view !== 'review') return false
    if (!startedAt && !Object.keys(answers).length) return false
    const payload = {
      assessmentType: ASSESSMENT_TYPE,
      questionBankVersion: EMOTIONLENS_VERSION,
      level,
      answers,
      skippedQuestionIds,
      currentIndex: questionIndex,
      startedAt: startedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'in-progress',
      ...override,
    }
    const success = saveDraft(payload)
    reportStorageWrite(success)
    setDraft(loadDraft(level, ASSESSMENT_TYPE))
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
    if (draft && !window.confirm('မပြီးသေးတဲ့ EmotionLens အဖြေဟောင်းရှိပါတယ်။ အသစ်ပြန်စရင် အဲဒီ Draft ကို အစားထိုးပါမယ်။ ဆက်လုပ်မှာ သေချာပါသလား။')) return
    if (draft && !clearDraft(level, ASSESSMENT_TYPE)) reportStorageWrite(false)
    const now = new Date().toISOString()
    setAnswers({})
    setSkippedQuestionIds([])
    setQuestionIndex(0)
    setStartedAt(now)
    setRecord(null)
    const emptyDraft = {
      assessmentType: ASSESSMENT_TYPE,
      questionBankVersion: EMOTIONLENS_VERSION,
      level,
      answers: {}, skippedQuestionIds: [], currentIndex: 0,
      startedAt: now, updatedAt: now, status: 'in-progress',
    }
    const saved = saveDraft(emptyDraft)
    reportStorageWrite(saved)
    setDraft(emptyDraft)
    onDataChange?.(loadAppData())
    setView('question')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const resume = () => {
    const saved = loadDraft(level, ASSESSMENT_TYPE)
    if (!saved) {
      setToast('ဆက်လက်ဖြေဆိုရန် သိမ်းထားတဲ့အဖြေ မတွေ့ပါ။')
      return
    }
    setAnswers(saved.answers || {})
    setSkippedQuestionIds(saved.skippedQuestionIds || [])
    setQuestionIndex(Math.max(0, Math.min(Number(saved.currentIndex) || 0, activeQuestions.length - 1)))
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
      assessmentType: ASSESSMENT_TYPE, questionBankVersion: EMOTIONLENS_VERSION,
      level, answers: nextAnswers, skippedQuestionIds: nextSkipped,
      currentIndex: questionIndex, startedAt: startedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(), status: 'in-progress',
    }
    const saved = saveDraft(payload)
    reportStorageWrite(saved)
    setDraft(payload)
    onDataChange?.(loadAppData())
  }

  const goPrevious = () => {
    setQuestionIndex((current) => Math.max(0, current - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goNext = () => {
    const currentQuestion = activeQuestions[questionIndex]
    if (answers[currentQuestion.id] === undefined) {
      setToast('အဖြေရွေးချယ်ပါ၊ ဒါမှမဟုတ် ဒီမေးခွန်းကို ကျော်ထားနိုင်ပါတယ်။')
      return
    }
    if (questionIndex < activeQuestions.length - 1) setQuestionIndex((current) => current + 1)
    else setView('review')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const skipQuestion = () => {
    const currentQuestion = activeQuestions[questionIndex]
    if (answers[currentQuestion.id] !== undefined) return
    const nextSkipped = [...new Set([...skippedQuestionIds, currentQuestion.id])]
    const nextIndex = Math.min(questionIndex + 1, activeQuestions.length - 1)
    setSkippedQuestionIds(nextSkipped)
    setQuestionIndex(nextIndex)
    const payload = {
      assessmentType: ASSESSMENT_TYPE, questionBankVersion: EMOTIONLENS_VERSION,
      level, answers, skippedQuestionIds: nextSkipped,
      currentIndex: nextIndex, startedAt: startedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(), status: 'in-progress',
    }
    const saved = saveDraft(payload)
    reportStorageWrite(saved)
    setDraft(payload)
    onDataChange?.(loadAppData())
    if (questionIndex === activeQuestions.length - 1) setView('review')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToQuestion = (index) => {
    setQuestionIndex(Math.max(0, Math.min(index, activeQuestions.length - 1)))
    setView('question')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const finish = () => {
    const missing = activeQuestions.filter((question) => answers[question.id] === undefined)
    if (missing.length) {
      setToast(`မဖြေရသေးတဲ့ မေးခွန်း ${missing.length} ခု ကျန်နေပါသေးတယ်။`)
      setView('review')
      return
    }
    const result = scoreEmotionLens(answers, level)
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
      id: globalThis.crypto?.randomUUID?.() || `emotionlens-${Date.now()}`,
      assessmentType: ASSESSMENT_TYPE,
      assessmentName: 'EmotionLens',
      questionBankVersion: EMOTIONLENS_VERSION,
      level,
      questionCount: activeQuestions.length,
      startedAt: startedAt || new Date().toISOString(),
      createdAt: new Date().toISOString(),
      answers: { ...answers },
      scores,
      dimensions: result.dimensions,
      resultNote: result.note,
    }
    const { ok } = saveAssessmentWithStatus(completed)
    reportStorageWrite(ok)
    if (!ok) {
      setToast('သတိပေးချက်: Browser Storage ထဲသို့ ရလဒ်သိမ်းဆည်း၍ မရပါ။')
    }
    const cleared = clearDraft(level, ASSESSMENT_TYPE)
    if (!cleared) reportStorageWrite(false)
    setRecord(completed)
    setDraft(null)
    onDataChange?.(loadAppData())
    setView('result')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const retake = () => {
    const existingDraft = loadDraft(level, ASSESSMENT_TYPE)
    const warning = existingDraft
      ? 'အရင်ရလဒ်ကို History ထဲမှာ ထိန်းထားပါမယ်။ မပြီးသေးတဲ့ EmotionLens Draft ရှိနေတဲ့အတွက် အသစ်စတင်ပါက အဲဒီ Draft ကို အစားထိုးပါမယ်။ ဆက်လုပ်မှာ သေချာပါသလား။'
      : 'အရင်ရလဒ်ကို History ထဲမှာ ထိန်းထားပြီး စမ်းသပ်မှုအသစ် စတင်မှာဖြစ်ပါတယ်။ ဆက်လုပ်မှာ သေချာပါသလား။'
    if (!window.confirm(warning)) return
    const cleared = clearDraft(level, ASSESSMENT_TYPE)
    if (!cleared) reportStorageWrite(false)
    const now = new Date().toISOString()
    setAnswers({})
    setSkippedQuestionIds([])
    setQuestionIndex(0)
    setStartedAt(now)
    setRecord(null)
    const emptyDraft = {
      assessmentType: ASSESSMENT_TYPE, questionBankVersion: EMOTIONLENS_VERSION,
      level, answers: {}, skippedQuestionIds: [], currentIndex: 0,
      startedAt: now, updatedAt: now, status: 'in-progress',
    }
    const saved = saveDraft(emptyDraft)
    reportStorageWrite(saved)
    setDraft(emptyDraft)
    onDataChange?.(loadAppData())
    setView('question')
  }

  if (view === 'question') return <><QuestionView activeQuestions={activeQuestions} answers={answers} skippedQuestionIds={skippedQuestionIds} questionIndex={questionIndex} onAnswer={answerQuestion} onPrevious={goPrevious} onNext={goNext} onSkip={skipQuestion} onReview={() => setView('review')} onExit={exit} storageError={storageError} storageAlertVisible={storageAlertVisible} onExportBackup={onExportBackup} onDismissStorageError={dismissStorageError} />{toast && <div role="status" className="no-print fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#1e4a4f] px-5 py-3 text-xs font-semibold text-white shadow-xl sm:bottom-5">{toast}</div>}</>
  if (view === 'review') return <><ReviewView activeQuestions={activeQuestions} answers={answers} skippedQuestionIds={skippedQuestionIds} onGoTo={goToQuestion} onFinish={finish} onBack={() => setView('question')} storageAlertVisible={storageAlertVisible} onExportBackup={onExportBackup} onDismissStorageError={dismissStorageError} />{toast && <div role="status" className="no-print fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#1e4a4f] px-5 py-3 text-xs font-semibold text-white shadow-xl sm:bottom-5">{toast}</div>}</>
  if (view === 'result') return <ResultView record={record || initialRecord} onHome={onHome} onRetake={retake} storageAlertVisible={storageAlertVisible} onExportBackup={onExportBackup} onDismissStorageError={dismissStorageError} />
  return <GuideView level={level} onSelectLevel={handleSelectLevel} questionCount={activeQuestions.length} draft={draft} onBack={onHome} onBegin={startFresh} onResume={resume} onRestart={startFresh} storageAlertVisible={storageAlertVisible} onExportBackup={onExportBackup} onDismissStorageError={dismissStorageError} />
}
