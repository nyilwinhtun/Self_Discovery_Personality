import { useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle, ArrowLeft, ArrowRight, Check, CheckCircle2, ChevronRight, Clock3, Download,
  LockKeyhole, Printer, RotateCcw, ShieldCheck, Sparkles,
} from 'lucide-react'
import {
  PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart,
  ResponsiveContainer, Tooltip,
} from 'recharts'
import { ValueMapLogo } from './AssessmentLogos.jsx'
import { ValueMapEmblem } from './ModuleEmblems.jsx'
import CalmingBreathPause from './CalmingBreathPause.jsx'
import LikertScaleSelector from './LikertScaleSelector.jsx'
import ReflectionNotesSection from './ReflectionNotesSection.jsx'
import MobileQuestionActions from './MobileQuestionActions.jsx'
import ReportSectionNavigation from './ReportSectionNavigation.jsx'
import ResultShareCardButton from './ResultShareCardButton.jsx'
import StorageWriteAlert from './StorageWriteAlert.jsx'
import { useAutoAdvance } from '../hooks/useAutoAdvance.js'
import {
  VALUEMAP_ANSWER_OPTIONS,
  VALUEMAP_DIMENSIONS,
  VALUEMAP_LEVELS,
  VALUEMAP_VERSION,
  getValueMapQuestionsForLevel,
} from '../data/valueMapPilot.js'
import { trackAssessmentCompleted } from '../utils/analytics.js'
import { downloadTextFile } from '../utils/download.js'
import { getValueMapInsight, scoreValueMap } from '../utils/valueMapScoring.js'
import { clearDraft, loadAppData, loadDraft, saveAssessmentWithStatus, saveDraft } from '../utils/storage.js'

const ASSESSMENT_TYPE = 'valueMap'
const ACCENT = '#3d6347'

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
    <button type="button" onClick={onClick} disabled={disabled} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#3d6347] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(61,99,71,0.18)] transition hover:-translate-y-0.5 hover:bg-[#31523a] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0">
      {children}<Icon size={17} />
    </button>
  )
}

function SecondaryButton({ children, onClick, icon: Icon, disabled = false, className = '' }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={cn('inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-[#cad9ce] bg-white px-5 py-2.5 text-sm font-semibold text-[#33573d] transition hover:border-[#adc5b3] hover:bg-[#f5f9f6] disabled:cursor-not-allowed disabled:opacity-40', className)}>
      {Icon && <Icon size={16} />}{children}
    </button>
  )
}

function GuideView({ level, onSelectLevel, questionCount, draft, onBack, onBegin, onResume, onRestart, storageAlertVisible, onExportBackup, onDismissStorageError }) {
  const [guideOpen, setGuideOpen] = useState(false)
  const answeredCount = Object.keys(draft?.answers || {}).length
  const skippedCount = (draft?.skippedQuestionIds || []).filter((id) => draft?.answers?.[id] === undefined).length
  const progress = questionCount ? Math.round((answeredCount / questionCount) * 100) : 0

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
      <button onClick={onBack} className="mb-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#475e4d] hover:text-[#2c4a34]"><ArrowLeft size={16} /> ပင်မစာမျက်နှာ</button>
      <StorageWriteAlert visible={storageAlertVisible} onExportBackup={onExportBackup} onDismiss={onDismissStorageError} />
      <section className="overflow-hidden rounded-[2rem] border border-[#d4e1d7] bg-white card-shadow">
        <div className="bg-gradient-to-br from-[#eef4ef] via-[#f9fcf9] to-[#eaf2ec] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <span className="grid h-[68px] w-[68px] shrink-0 place-items-center rounded-2xl border border-[#d5e0d7] bg-[#faf8f5] text-[#36593f]"><ValueMapEmblem size={38} /></span>
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] text-[#475e4d]">VALUEMAP</p>
                <h1 className="mt-1 text-xl font-bold text-[#2c4a34] sm:text-2xl">ဘဝမှာ ကိုယ်တန်ဖိုးထားတဲ့အရာတွေကို ရှာဖွေခြင်း</h1>
                <p className="mt-1 text-xs text-[#475e4d]">မေးခွန်း {level === 120 ? '၁၂၀' : level === 80 ? '၈၀' : level === 40 ? '၄၀' : '၂၀'} · အချက် ၄ ချက် · {level === 120 ? '~၂၀ မိနစ်' : level === 80 ? '~၁၅ မိနစ်' : level === 40 ? '~၈ မိနစ်' : '~၄ မိနစ်'}</p>
              </div>
            </div>
            <span className="rounded-full border border-[#c6d8ca] bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#33573d]">ကိုယ်တိုင်သုံးသပ်မှု</span>
          </div>
          <p className="mt-4 text-sm leading-7 text-[#465e4c]">ဆုံးဖြတ်ချက်များ ချမှတ်ရာတွင် ကိုယ့်စိတ်ထဲ အလေးထားမိတတ်သည့် လွတ်လပ်မှု၊ တည်ငြိမ်မှု၊ တိုးတက်သင်ယူမှုနှင့် မေတ္တာ/အကျိုးပြုမှုတို့ကို ပြန်လည်သုံးသပ်နိုင်ရန် ရေးဆွဲထားပါသည်။</p>
        </div>
        <div className="p-6 sm:p-8">
          <div className="mb-5">
            <h2 className="text-base font-bold text-[#2c4a34]">ဖြေဆိုမည့် မေးခွန်းအဆင့် ရွေးချယ်ပါ</h2>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4" role="radiogroup" aria-label="ValueMap မေးခွန်းအဆင့် ရွေးချယ်မှု">
              {VALUEMAP_LEVELS.map((option) => {
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
                      selected ? 'border-[#3d6347] bg-[#f5f9f6] ring-1 ring-[#3d6347]/30' : 'border-[#d4e1d7] bg-white hover:border-[#adc5b3] hover:bg-[#f7faf8]',
                    )}
                  >
                    <div className="flex w-full items-center justify-between gap-2">
                      <span className={cn('rounded-full px-2.5 py-1 text-xs font-semibold', selected ? 'bg-[#3d6347] text-white' : 'bg-[#eef5f0] text-[#33573d]')}>{option.label}</span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#475e4d]"><Clock3 size={12} /> {option.duration}</span>
                    </div>
                    <p className="mt-3 text-sm font-bold text-[#2c4a34]">{option.title}</p>
                    <p className="mt-1 text-sm leading-7 text-[#465e4c]">{option.subtitle}</p>
                    {levelDraft && (
                      <p className="mt-2 text-xs font-semibold text-[#3d6347]">မပြီးသေးသော အဖြေ ({levelAnswered}/{option.value})</p>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-[#d4e1d7] bg-[#f5f9f6] p-4">
            <Sparkles size={18} className="mt-0.5 shrink-0 text-[#3d6347]" />
            <p className="text-sm leading-7 text-[#2c4a34]">အဖြေမှန်၊ အဖြေမှား မရှိပါ — လက်ရှိဘဝမှာ ကိုယ်တကယ် အလေးထားရွေးချယ်တတ်တဲ့ ဦးစားပေးမှုအတိုင်း ဖြေဆိုနိုင်ပါတယ်။</p>
          </div>

          {draft ? (
            <div className="rounded-2xl border border-[#cad9ce] bg-[#f5f9f6] p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2"><p className="text-sm font-bold text-[#2c4a34]">မပြီးသေးတဲ့ ဖြေဆိုမှုရှိပါတယ်</p><span className="text-xs font-bold text-[#3d6347]">{progress}%</span></div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#dce7df]"><div className="h-full rounded-full bg-[#3d6347]" style={{ width: `${progress}%` }} /></div>
              <p className="mt-2 text-xs text-[#475e4d]">ဖြေပြီး {answeredCount} ခု · ကျော်ထား {skippedCount} ခု · နောက်ဆုံး {formatDate(draft.updatedAt)}</p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <PrimaryButton onClick={onResume} icon={ArrowRight}>အရင်နေရာက ဆက်ဖြေမယ်</PrimaryButton>
                <SecondaryButton onClick={onRestart} icon={RotateCcw}>အသစ်ပြန်စမယ်</SecondaryButton>
              </div>
            </div>
          ) : (
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <SecondaryButton onClick={onBack}>နောက်သို့</SecondaryButton>
              <PrimaryButton onClick={onBegin}>မေးခွန်း ၁ မှ စတင်မယ်</PrimaryButton>
            </div>
          )}

          <div className="mt-6 border-t border-[#dce6de] pt-4">
            <button
              type="button"
              aria-expanded={guideOpen}
              onClick={() => setGuideOpen((open) => !open)}
              className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-[#33573d] hover:text-[#2c4a34]"
            >
              <span>{guideOpen ? 'ဖြေဆိုနည်းအသေးစိတ် ပိတ်ရန်' : 'ဖြေဆိုနည်းနှင့် လေ့လာမည့် အချက် ၄ ချက် ကြည့်ရန်'}</span>
              <ChevronRight size={15} className={cn('transition-transform', guideOpen && 'rotate-90')} />
            </button>

            {guideOpen && (
              <div className="mt-4 space-y-5">
                <div>
                  <h2 className="text-base font-bold text-[#2c4a34]">ဒီဆန်းစစ်မှုမှာ လေ့လာမယ့် အဓိက အချက် ၄ ချက်</h2>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {VALUEMAP_DIMENSIONS.map((dimension, index) => (
                      <article key={dimension.id} className="rounded-2xl border border-[#dce6de] bg-[#f7faf8] p-4">
                        <div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-xs font-bold text-[#3d6347]">{index + 1}</span><h3 className="text-sm font-bold text-[#2c4a34]">{dimension.name}</h3></div>
                        <p className="mt-2 text-sm leading-7 text-[#465e4c]">{dimension.description}</p>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-[#dce6de] bg-white p-4 sm:p-5">
                  <h2 className="text-base font-bold text-[#2c4a34]">မစတင်မီ သိထားသင့်သော အချက်များ</h2>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <article className="rounded-xl bg-[#f3f8f4] p-3.5"><p className="text-xs font-bold text-[#2c4a34]">ဘယ်လိုဖြေဆိုသင့်သလဲ။</p><p className="mt-1.5 text-sm leading-7 text-[#465e4c]">သူများမျှော်လင့်ထားသည့် ပုံစံထက် လက်ရှိဘဝတွင် ကိုယ်တကယ် ရွေးချယ်တတ်သည့် ဦးစားပေးမှုများကို စဉ်းစား၍ ဖြေပါ။ အဖြေမှန်၊ အဖြေမှား မရှိပါ။</p></article>
                    <article className="rounded-xl bg-[#f3f8f4] p-3.5"><p className="text-xs font-bold text-[#2c4a34]">အဖြေရွေးချယ်ပုံ</p><p className="mt-1.5 text-sm leading-7 text-[#465e4c]">မေးခွန်းတစ်ခုစီအတွက် သင့်အမြင်နှင့် ကိုက်ညီမှုအတိုင်းအတာကို ၅ ဆင့်ထဲမှ တစ်ခု ရွေးချယ်ပါ။</p></article>
                    <article className="rounded-xl bg-[#f3f8f4] p-3.5"><p className="text-xs font-bold text-[#2c4a34]">ကျော်ခြင်းနှင့် ပြန်ဆက်ခြင်း</p><p className="mt-1.5 text-sm leading-7 text-[#465e4c]">မသေချာသေးသော မေးခွန်းကို ကျော်ထားနိုင်ပြီး နောက်မှ ပြန်ဖြေနိုင်ပါသည်။ အဖြေရွေးတိုင်း ဒီဖုန်းရဲ့ Browser ထဲတွင် အလိုအလျောက် သိမ်းဆည်းပါသည်။</p></article>
                    <article className="rounded-xl bg-[#f3f8f4] p-3.5"><p className="text-xs font-bold text-[#2c4a34]">ရလဒ်ကို ဘယ်လိုနားလည်ရမလဲ။</p><p className="mt-1.5 text-sm leading-7 text-[#465e4c]">ဘဝတန်ဖိုးများသည် အချိန်နှင့် အခြေအနေအလိုက် ပြောင်းလဲနိုင်ပါသည်။ ရမှတ်များသည် လက်ရှိဦးစားပေးပုံကို ပြန်လည်သုံးသပ်ရန် အညွှန်းသာ ဖြစ်ပါသည်။</p></article>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#f0dfc6] bg-[#fffaf2] p-4 sm:p-5">
                  <div className="flex items-start gap-3"><ShieldCheck size={19} className="mt-0.5 shrink-0 text-[#825824]" /><div><p className="text-xs font-bold text-[#805b2d]">အရေးကြီးသော သတိပြုချက်</p><p className="mt-1.5 text-sm leading-7 text-[#6f5e47]">ValueMap သည် ကိုယ်ပိုင်ရေးဆွဲထားသည့် ကိုယ်တိုင်သုံးသပ်မှုသာ ဖြစ်ပါသည်။ စိတ်ပညာဆိုင်ရာ အတည်ပြုစမ်းသပ်မှု၊ ရောဂါရှာဖွေမှု သို့မဟုတ် ဘဝဆုံးဖြတ်ချက်အတွက် ပညာရှင်အကြံဉာဏ်အစားထိုး မဟုတ်ပါ။</p></div></div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-[#dce6de] bg-[#f7faf8] p-4">
                  <LockKeyhole size={18} className="mt-0.5 shrink-0 text-[#3d6347]" />
                  <div><p className="text-xs font-bold text-[#2c4a34]">ကိုယ်ရေးအချက်အလက်နှင့် သိမ်းဆည်းမှု</p><p className="mt-1 text-sm leading-7 text-[#465e4c]">သင့်အဖြေများကို ဒီဖုန်းရဲ့ Browser ထဲမှာပဲ သိမ်းထားပါတယ်။ Browser အချက်အလက် မရှင်းမီ မှတ်တမ်းဖိုင် သိမ်းထားနိုင်ပါတယ်။</p></div>
                </div>

                <CalmingBreathPause theme="valueMap" />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

function QuestionView({ activeQuestions, answers, skippedQuestionIds, questionIndex, onAnswer, onPrevious, onNext, onSkip, onReview, onExit, storageError, storageAlertVisible, onExportBackup, onDismissStorageError }) {
  const question = activeQuestions[questionIndex]
  const totalQuestions = activeQuestions.length
  const answeredCount = Object.keys(answers).length
  const skippedCount = skippedQuestionIds.filter((id) => answers[id] === undefined).length
  const progress = Math.round((answeredCount / totalQuestions) * 100)
  const isLast = questionIndex === totalQuestions - 1
  const selectedAnswer = answers[question.id]

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col justify-between px-3.5 pb-28 pt-3 sm:block sm:min-h-0 sm:px-6 sm:py-12">
      <div className="sm:hidden">
        <div className="mb-2 flex items-center justify-between gap-2">
          <button onClick={onExit} className="inline-flex min-h-10 items-center gap-1.5 text-xs font-semibold text-[#475e4d] hover:text-[#2c4a34]"><ArrowLeft size={15} /> ခဏရပ်</button>
          <div className="flex items-center gap-2">
            {storageError && <AlertTriangle size={14} className="text-[#9a3b3b]" aria-label="သိမ်းဆည်းမှု မအောင်မြင်ပါ" />}
            <span className="rounded-full bg-[#eef5f0] px-2.5 py-1 text-xs font-bold tabular-nums text-[#2c4a34]">
              {questionIndex + 1} / {totalQuestions}
            </span>
          </div>
        </div>
        <div className="mb-2.5 h-1.5 overflow-hidden rounded-full bg-[#e8ede7]">
          <div className="progress-fill h-full rounded-full bg-gradient-to-r from-[#3d6347] to-[#74a07f]" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="mb-7 hidden items-center justify-between gap-3 sm:flex">
        <button onClick={onExit} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#475e4d] hover:text-[#2c4a34]"><ArrowLeft size={16} /> ခဏရပ်ပြီး ထွက်မယ်</button>
        {storageError ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e7b8b8] bg-[#fdf2f2] px-3 py-1.5 text-xs font-semibold text-[#9a3b3b] shadow-sm"><AlertTriangle size={12} /> သိမ်းဆည်းမှု မအောင်မြင်ပါ</span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#475e4d] shadow-sm"><LockKeyhole size={12} /> အလိုအလျောက် သိမ်းဆည်းနေသည်</span>
        )}
      </div>
      <StorageWriteAlert visible={storageAlertVisible} onExportBackup={onExportBackup} onDismiss={onDismissStorageError} />
      <section className="rounded-2xl border border-[#ebe5dc] bg-[#fffdf9] p-3.5 card-shadow sm:rounded-[2rem] sm:p-9">
        <div className="hidden items-end justify-between gap-3 sm:flex">
          <div><p className="text-xs font-semibold tracking-wide text-[#524b59]">VALUEMAP · PILOT {totalQuestions}</p><h1 className="mt-2 text-xl font-bold text-[#242029] sm:text-2xl">မေးခွန်းဖြေဆိုခြင်း</h1></div>
          <div className="text-right"><div className="text-xl font-bold tabular-nums text-[#3d6347]">{String(questionIndex + 1).padStart(2, '0')}<span className="text-sm font-medium text-[#524b59]"> / {totalQuestions}</span></div><p className="text-xs text-[#524b59]">ဖြေပြီး {answeredCount} · ကျော်ထား {skippedCount}</p></div>
        </div>
        <div className="mt-5 hidden items-center justify-between text-xs text-[#524b59] sm:flex"><span>ဖြေဆိုပြီးမှု</span><span>{progress}%</span></div>
        <div className="mt-2 hidden h-2 overflow-hidden rounded-full bg-[#e8ede7] sm:block"><div className="progress-fill h-full rounded-full bg-gradient-to-r from-[#3d6347] to-[#74a07f]" style={{ width: `${progress}%` }} /></div>
        <div key={question.id} className="question-card-enter">
          <div className="my-2.5 min-h-[5.25rem] rounded-2xl border border-[#ebe5dc] bg-gradient-to-br from-[#f3f8f4] to-[#faf8f5] px-4 py-4 sm:my-7 sm:min-h-32 sm:rounded-[1.5rem] sm:px-7 sm:py-8">
            <p className="text-xs font-semibold tracking-wide text-[#524b59]">မေးခွန်း {questionIndex + 1}</p>
            <h2 className="mt-1.5 text-base font-bold leading-[1.7] text-[#242029] sm:mt-3 sm:text-[1.35rem] sm:leading-[1.9]">{question.text}</h2>
          </div>
          <LikertScaleSelector
            options={VALUEMAP_ANSWER_OPTIONS}
            value={selectedAnswer}
            onChange={(val) => onAnswer(question.id, val)}
            accent="sage"
          />
        </div>
        <div className="no-print mt-8 hidden flex-wrap items-center justify-between gap-3 border-t border-[#e8f0ea] pt-5 sm:flex">
          <SecondaryButton onClick={onPrevious} icon={ArrowLeft} disabled={questionIndex === 0}>ယခင်</SecondaryButton>
          <div className="flex flex-wrap items-center gap-2">
            {selectedAnswer === undefined && <button onClick={onSkip} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-dashed border-[#b5cbb9] bg-[#f7faf8] px-4 py-2.5 text-sm font-semibold text-[#3d6347] hover:bg-[#edf5ef]">ဒီမေးခွန်းကို ကျော်မယ် <ArrowRight size={15} /></button>}
            <PrimaryButton onClick={isLast ? onReview : onNext} disabled={selectedAnswer === undefined} icon={isLast ? CheckCircle2 : ArrowRight}>{isLast ? 'အဖြေတွေ ပြန်စစ်မယ်' : 'နောက်တစ်ခု'}</PrimaryButton>
          </div>
        </div>
        <div className="mt-4 hidden flex-wrap items-center justify-between gap-2 rounded-xl bg-[#f3f8f4] px-4 py-3 sm:flex"><p className="text-xs leading-5 text-[#475e4d]">မသေချာသေးတဲ့မေးခွန်းကို ကျော်ပြီး နောက်မှ ပြန်ဖြေနိုင်ပါတယ်။</p><button onClick={onReview} className="min-h-11 text-xs font-semibold text-[#3d6347] hover:text-[#2c4a34]">မေးခွန်းစာရင်းကြည့်မယ်</button></div>
      </section>
      <MobileQuestionActions
        accent="sage"
        onPrevious={onPrevious}
        onNext={isLast ? onReview : onNext}
        onSkip={onSkip}
        onReview={onReview}
        canPrevious={questionIndex > 0}
        canNext={selectedAnswer !== undefined}
        showSkip={selectedAnswer === undefined}
        isLast={isLast}
      />
      <p className="mt-5 hidden text-center text-xs leading-6 text-[#475e4d] sm:block">အဖြေရွေးချယ်တာနဲ့ ဒီ Browser ထဲမှာ သိမ်းဆည်းပါတယ်။ Browser Data မရှင်းပါနဲ့။</p>
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
      <button onClick={onBack} className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#475e4d] hover:text-[#2c4a34]"><ArrowLeft size={16} /> မေးခွန်းသို့ ပြန်သွားမယ်</button>
      <StorageWriteAlert visible={storageAlertVisible} onExportBackup={onExportBackup} onDismiss={onDismissStorageError} />
      <section className="rounded-[2rem] border border-[#d4e1d7] bg-white p-5 card-shadow sm:p-8">
        <p className="text-xs font-semibold tracking-wide text-[#475e4d]">VALUEMAP · REVIEW</p>
        <h1 className="mt-2 text-2xl font-bold text-[#2c4a34]">ဖြေဆိုမှုကို ပြန်စစ်ပါ</h1>
        <p className="mt-2 text-xs leading-6 text-[#475e4d]">ကျော်ထားတဲ့မေးခွန်းနဲ့ မဖြေရသေးတဲ့မေးခွန်းကို ရွေးပြီး တိုက်ရိုက်ပြန်ဖြေနိုင်ပါတယ်။</p>
        <div className="mt-6 grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-[#edf6ef] p-3"><p className="text-2xl font-bold text-[#3d6347] tabular-nums">{answered.length}</p><p className="mt-1 text-xs text-[#3d6347]">ဖြေပြီး</p></div>
          <div className="rounded-xl bg-[#fff7ed] p-3"><p className="text-2xl font-bold text-[#825824] tabular-nums">{skipped.length}</p><p className="mt-1 text-xs text-[#825824]">ကျော်ထား</p></div>
          <div className="rounded-xl bg-[#f3f8f4] p-3"><p className="text-2xl font-bold text-[#475e4d] tabular-nums">{unanswered.length}</p><p className="mt-1 text-xs text-[#475e4d]">မဖြေရသေး</p></div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">{[['incomplete', `ပြန်ဖြေရန် (${incomplete.length})`], ['skipped', `ကျော်ထား (${skipped.length})`], ['unanswered', `မဖြေရသေး (${unanswered.length})`], ['answered', `ဖြေပြီး (${answered.length})`]].map(([value, label]) => <button key={value} onClick={() => setFilter(value)} className={cn('min-h-10 rounded-full px-3.5 py-2 text-xs font-semibold transition', filter === value ? 'bg-[#3d6347] text-white' : 'bg-[#eaf2ec] text-[#475e4d] hover:bg-[#dce8df]')}>{label}</button>)}</div>
        <div className="mt-4 rounded-2xl border border-[#dce6de] p-3 sm:p-4">
          {visible.length === 0 ? <div className="py-8 text-center"><CheckCircle2 className="mx-auto text-[#3d6347]" size={30} /><p className="mt-2 text-sm font-semibold text-[#3d6347]">ဒီအမျိုးအစားမှာ မေးခွန်းမရှိပါ။</p></div> : <div className="grid gap-2 sm:grid-cols-2">{visible.map((question) => {
            const originalIndex = activeQuestions.findIndex((item) => item.id === question.id)
            return <button key={question.id} onClick={() => onGoTo(originalIndex)} className="flex min-w-0 items-start gap-3 rounded-xl border border-[#dce6de] bg-white p-3 text-left transition hover:border-[#b5cbb9] hover:bg-[#f7faf8]"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#edf3ee] text-xs font-bold text-[#475e4d]">{originalIndex + 1}</span><span className="min-w-0 flex-1"><span className="block text-xs font-semibold leading-5 text-[#2c4a34]">{question.text}</span><span className="mt-1 block text-xs text-[#475e4d]">{statusOf(question)}</span></span><ChevronRight size={15} className="mt-1 shrink-0 text-[#475e4d]" /></button>
          })}</div>}
        </div>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between"><SecondaryButton onClick={onBack}>မေးခွန်းဆက်ဖြေမယ်</SecondaryButton><PrimaryButton onClick={onFinish} icon={CheckCircle2}>အဖြေစစ်ပြီး ရလဒ်ကြည့်မယ်</PrimaryButton></div>
        {incomplete.length > 0 && <p className="mt-3 text-right text-xs leading-6 text-[#825824]">မေးခွန်း {incomplete.length} ခု ကျန်နေသေးပါတယ်။ အားလုံးဖြေပြီးမှ အညွှန်းရလဒ်တွက်ချက်နိုင်ပါမယ်။</p>}
      </section>
    </main>
  )
}

function wrapValueMapLabel(value) {
  const text = String(value || '')
  if (text.length <= 12) return [text]
  const spaceIndex = text.indexOf(' ', Math.floor(text.length / 3))
  if (spaceIndex > 0 && spaceIndex < text.length - 2) {
    return [text.slice(0, spaceIndex), text.slice(spaceIndex + 1)]
  }
  const mid = Math.ceil(text.length / 2)
  return [text.slice(0, mid), text.slice(mid)]
}

function ValueMapPolarTick({ payload, x, y, textAnchor }) {
  const lines = wrapValueMapLabel(payload?.value)
  const startDy = lines.length > 1 ? -4 : 4
  return (
    <text x={x} y={y} textAnchor={textAnchor} fill="#475e4d" fontSize={11} fontFamily="Noto Sans Myanmar">
      {lines.map((line, index) => (
        <tspan key={index} x={x} dy={index === 0 ? startDy : 13}>
          {line}
        </tspan>
      ))}
    </text>
  )
}

function ResultView({ record, onHome, onRetake, storageAlertVisible, onExportBackup, onDismissStorageError }) {
  const answerCount = Object.keys(record?.answers || {}).length
  const rawLevel = Number(record?.questionCount || record?.level || (answerCount > 80 ? 120 : answerCount > 40 ? 80 : answerCount > 20 ? 40 : 20))
  const resolvedLevel = rawLevel === 120 ? 120 : rawLevel === 80 ? 80 : rawLevel === 40 ? 40 : 20
  const result = useMemo(() => scoreValueMap(record?.answers || {}, resolvedLevel), [record, resolvedLevel])
  if (!record || !result.complete) return null
  const questionCountLabel = resolvedLevel === 120 ? '၁၂၀' : resolvedLevel === 80 ? '၈၀' : resolvedLevel === 40 ? '၄၀' : '၂၀'
  const chartData = result.dimensions.map((item) => ({ area: item.shortName, score: item.index }))
  const ordered = [...result.dimensions].sort((a, b) => b.index - a.index)
  const dimensionInsights = result.dimensions.map((dimension) => ({
    ...dimension,
    insight: getValueMapInsight(dimension.id, dimension.index),
  }))

  const downloadReport = () => {
    const lines = [
      'Self Discovery — ValueMap ကိုယ်တိုင်ပြန်လည်သုံးသပ်မှုအစီရင်ခံစာ (Pilot Reflection)',
      `မေးခွန်းဗားရှင်း: ${record.questionBankVersion || VALUEMAP_VERSION}`,
      `မေးခွန်းအရေအတွက်: ${resolvedLevel} ခု`,
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
      'ValueMap သည် စမ်းသပ်မူကြမ်းအဆင့် ကိုယ်ပိုင်ရေးဆွဲထားသော reflection tool ဖြစ်ပြီး စိတ်ပညာဆိုင်ရာ အတည်ပြုစမ်းသပ်မှု မဟုတ်ပါ။',
    ]
    downloadTextFile(
      `valuemap-reflection-${new Date(record.createdAt).toISOString().slice(0, 10)}.txt`,
      lines.join('\n'),
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8">
      <StorageWriteAlert visible={storageAlertVisible} onExportBackup={onExportBackup} onDismiss={onDismissStorageError} />
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3"><button onClick={onHome} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#475e4d] hover:text-[#2c4a34]"><ArrowLeft size={16} /> ပင်မစာမျက်နှာ</button><div className="flex flex-wrap gap-2"><SecondaryButton onClick={downloadReport} icon={Download}>အစီရင်ခံစာသိမ်းမယ်</SecondaryButton><ResultShareCardButton tone="sage" getCardConfig={() => ({ filename: `valuemap-result-${new Date(record.createdAt).toISOString().slice(0, 10)}.png`, subtitle: 'VALUEMAP · PILOT REFLECTION', title: 'ဘဝတန်ဖိုးမြေပုံ အချက် ၄ ချက် အကျဉ်းချုပ်', metaLine: `မေးခွန်း ${questionCountLabel} · ${formatDate(record.createdAt)}`, items: dimensionInsights.map((d) => ({ label: d.name, score: d.index })), accentColor: '#3d6347', trackColor: '#e4efe7', footerNote: 'ValueMap သည် စမ်းသပ်မူကြမ်းအဆင့် ကိုယ်တိုင်ပြန်လည်သုံးသပ်မှု reflection tool ဖြစ်ပြီး ရောဂါရှာဖွေမှု မဟုတ်ပါ။' })} /><SecondaryButton onClick={() => window.print()} icon={Printer}>Print</SecondaryButton></div></div>
      <ReportSectionNavigation tone="sage" items={[
        { id: 'valuemap-report-overview', label: 'အနှစ်ချုပ်' },
        { id: 'valuemap-report-areas', label: 'အချက် ၄ ချက်' },
        { id: 'valuemap-report-notes', label: 'ရလဒ်ဖတ်ရှုရန်' },
      ]} />
      <section id="valuemap-report-overview" className="scroll-mt-28 print-card overflow-hidden rounded-[2rem] border border-[#d4e1d7] bg-gradient-to-br from-[#eef4ef] via-[#f9fcf9] to-[#eaf2ec] p-6 card-shadow sm:p-10">
        <div className="mx-auto max-w-3xl text-center"><span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/85 px-3 py-1.5 text-xs font-semibold text-[#33573d]"><CheckCircle2 size={14} /> ဆန်းစစ်မှု ပြီးဆုံးပါပြီ</span><div className="mt-5 flex justify-center"><span className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-[#3d6347] shadow-sm"><ValueMapLogo size={50} /></span></div><p className="mt-4 text-xs font-semibold tracking-[0.15em] text-[#475e4d]">VALUEMAP · PILOT REFLECTION</p><h1 className="mt-3 text-2xl font-bold leading-relaxed text-[#2c4a34] sm:text-3xl">သင့်ရဲ့ ဘဝတန်ဖိုးမြေပုံ အကျဉ်းချုပ်</h1><p className="mt-2 text-xs text-[#475e4d]">မေးခွန်း {questionCountLabel} · {formatDate(record.createdAt)}</p><p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-[#465e4c]">အောက်ပါရလဒ်များသည် ဤစမ်းသပ်မူကြမ်းအတွင်း သင်ရွေးချယ်ထားသော အဖြေများကို အချက် ၄ ချက်အလိုက် စုစည်းပြသထားခြင်းသာ ဖြစ်ပါသည်။ ဘဝတန်ဖိုးများသည် အချိန်နှင့်အမျှ ပြောင်းလဲနိုင်ပါသည်။</p></div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-[1.5rem] border border-white/90 bg-white/90 p-4 sm:p-6"><div className="flex items-center justify-between"><h2 className="text-sm font-bold text-[#2c4a34]">အဓိက တန်ဖိုး ၄ ခု၏ ရမှတ်</h2><span className="text-xs text-[#475e4d]">0–100</span></div><div className="mt-2 h-[300px] w-full"><ResponsiveContainer width="100%" height="100%"><RadarChart data={chartData} outerRadius="56%" margin={{ top: 22, right: 44, bottom: 22, left: 44 }}><PolarGrid stroke="#dce6de" /><PolarAngleAxis dataKey="area" tick={<ValueMapPolarTick />} /><PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#475e4d', fontSize: 11 }} axisLine={false} /><Radar name="အညွှန်းရမှတ်" dataKey="score" stroke={ACCENT} fill="#88b393" fillOpacity={0.55} strokeWidth={2} /><Tooltip formatter={(value) => [`${value}/100`, 'အညွှန်းရမှတ်']} contentStyle={{ borderRadius: 12, borderColor: '#d4e1d7', fontSize: 12 }} /></RadarChart></ResponsiveContainer></div><p className="text-center text-xs leading-5 text-[#475e4d]">ဤအညွှန်းသည် ဖြေဆိုထားသည့်အဖြေများကို စကေးအတွင်း ပြောင်းလဲဖော်ပြခြင်းသာ ဖြစ်ပါသည်။</p></div>
          <div className="flex flex-col gap-3">
            {ordered.slice(0, 2).map((dimension, index) => <article key={dimension.id} className="rounded-[1.5rem] border border-white/90 bg-white/90 p-5"><p className="text-xs font-semibold text-[#475e4d]">လက်ရှိတွင် ပိုမိုအလေးထားနေသော တန်ဖိုး {index + 1}</p><h3 className="mt-2 text-sm font-bold leading-6 text-[#2c4a34]">{dimension.name}</h3><p className="mt-1 text-xl font-bold text-[#3d6347]">{dimension.index} / 100</p><p className="mt-2 text-xs font-semibold leading-6 text-[#33573d]">{getValueMapInsight(dimension.id, dimension.index)?.label}</p><p className="mt-2 text-xs leading-7 text-[#465e4c]">{VALUEMAP_DIMENSIONS.find((item) => item.id === dimension.id)?.description}</p></article>)}
            <div className="rounded-[1.5rem] border border-[#d4e1d7] bg-white/80 p-5"><p className="text-xs font-bold text-[#2c4a34]">ရလဒ်ကို ဖတ်ရှုရာတွင်</p><p className="mt-2 text-xs leading-7 text-[#465e4c]">တန်ဖိုးတစ်ခု အမှတ်မြင့်ခြင်းသည် လက်ရှိအချိန်တွင် ထိုအရာကို ပိုမိုဦးစားပေးနေကြောင်းသာ ပြသခြင်းဖြစ်ပြီး အခြားတန်ဖိုးများ မရှိဟု မဆိုလိုပါ။</p></div>
          </div>
        </div>
      </section>
      <section id="valuemap-report-areas" className="mt-8 scroll-mt-28">
        <div className="mb-4"><p className="text-xs font-semibold tracking-wide text-[#475e4d]">UNDERSTANDING YOUR FOUR PILLARS</p><h2 className="mt-1 text-xl font-bold text-[#2c4a34]">တန်ဖိုး ၄ ခုကို တစ်ခုချင်း နားလည်ကြည့်ရအောင်</h2><p className="mt-2 text-xs leading-7 text-[#475e4d]">အညွှန်းရမှတ်တစ်ခုချင်းစီအတွက် အဓိပ္ပာယ်၊ နေ့စဉ်ဘဝ ဥပမာ၊ ကိုယ်တိုင်ပြန်မေးရန်နှင့် စမ်းကြည့်နိုင်သည့် အဆင့်ငယ်များကို ဖော်ပြထားပါသည်။</p></div>
        <div className="grid gap-4 lg:grid-cols-2">
          {dimensionInsights.map((dimension) => (
            <article key={dimension.id} className="rounded-2xl border border-[#dce6de] bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="text-sm font-bold leading-6 text-[#2c4a34]">{dimension.name}</p><p className="mt-1 text-xs leading-5 text-[#475e4d]">{dimension.itemCount} မေးခွန်း · ပျမ်းမျှ {dimension.average}/5</p></div><span className="shrink-0 rounded-xl bg-[#eef5f0] px-3 py-2 text-sm font-bold tabular-nums text-[#3d6347]">{dimension.index}/100</span></div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e8f0ea]"><div className="h-full rounded-full bg-gradient-to-r from-[#3d6347] to-[#74a07f]" style={{ width: `${dimension.index}%` }} /></div>
              {dimension.insight && (
                <>
                  <p className="mt-3 rounded-xl bg-[#f3f8f4] px-3 py-2 text-xs font-semibold leading-6 text-[#33573d]">{dimension.insight.label}</p>
                  <div className="mt-4 space-y-3 text-xs leading-7 text-[#465e4c]">
                    <div><p className="font-bold text-[#2c4a34]">ဒီအဖြေတွေက ဘာကို ညွှန်းနိုင်သလဲ။</p><p>{dimension.insight.interpretation}</p></div>
                    <div className="rounded-xl bg-[#f7faf8] p-3"><p className="font-bold text-[#33573d]">နေ့စဉ်ဘဝ ဥပမာ</p><p>{dimension.insight.example}</p></div>
                    <div><p className="font-bold text-[#2c4a34]">ကိုယ့်ကိုယ်ကို ပြန်မေးကြည့်ရန်</p><p>{dimension.insight.reflection}</p></div>
                    <div className="rounded-xl border border-[#dce6de] p-3"><p className="font-bold text-[#3d6347]">စမ်းကြည့်နိုင်တဲ့ အဆင့်ငယ်</p><p>{dimension.insight.tryThis}</p></div>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      </section>
      <ReflectionNotesSection recordId={record.id} theme="valueMap" />
      <section className="no-print mt-8 flex flex-wrap justify-center gap-3"><SecondaryButton onClick={onHome}>ပင်မစာမျက်နှာသို့ ပြန်မယ်</SecondaryButton><PrimaryButton onClick={onRetake} icon={RotateCcw}>ပြန်လည်ဖြေဆိုမယ်</PrimaryButton></section>
      <p id="valuemap-report-notes" className="mt-5 scroll-mt-28 text-center text-xs leading-6 text-[#475e4d]">ဤမေးခွန်းအုပ်စုသည် စမ်းသပ်မူကြမ်း (Pilot Reflection) အဆင့် ကိုယ်တိုင်ပြန်လည်သုံးသပ်မှုဖြစ်ပြီး စိတ်ပညာဆိုင်ရာ အတည်ပြုစမ်းသပ်မှု သို့မဟုတ် ရောဂါရှာဖွေမှု မဟုတ်ပါ။</p>
    </main>
  )
}

export default function ValueMapModule({
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
  const rawInitialLevel = Number(
    initialRecord
      ? (initialRecord.questionCount || initialRecord.level || (Object.keys(initialRecord.answers || {}).length > 80 ? 120 : Object.keys(initialRecord.answers || {}).length > 40 ? 80 : Object.keys(initialRecord.answers || {}).length > 20 ? 40 : 20))
      : initialLevel,
  )
  const resolvedInitialLevel = rawInitialLevel === 120 ? 120 : rawInitialLevel === 80 ? 80 : rawInitialLevel === 40 ? 40 : 20
  const [level, setLevel] = useState(resolvedInitialLevel)
  const activeQuestions = useMemo(() => getValueMapQuestionsForLevel(level), [level])
  const initialDraft = initialRecord ? null : loadDraft(resolvedInitialLevel, ASSESSMENT_TYPE)
  const [view, setView] = useState(initialRecord ? 'result' : 'guide')
  const [draft, setDraft] = useState(initialDraft)
  const [answers, setAnswers] = useState(initialRecord?.answers || initialDraft?.answers || {})
  const [skippedQuestionIds, setSkippedQuestionIds] = useState(initialRecord ? [] : (initialDraft?.skippedQuestionIds || []))
  const [questionIndex, setQuestionIndex] = useState(initialRecord ? 0 : Math.max(0, Math.min(Number(initialDraft?.currentIndex) || 0, getValueMapQuestionsForLevel(resolvedInitialLevel).length - 1)))
  const [startedAt, setStartedAt] = useState(initialRecord?.startedAt || initialDraft?.startedAt || null)
  const [record, setRecord] = useState(initialRecord)
  const [toast, setToast] = useState('')
  const [localStorageError, setLocalStorageError] = useState(false)
  const [localAlertDismissed, setLocalAlertDismissed] = useState(false)
  const storageError = sharedStorageError ?? localStorageError
  const storageAlertVisible = sharedStorageAlertVisible ?? (storageError && !localAlertDismissed)

  const handleSelectLevel = (nextLevel) => {
    const normalized = Number(nextLevel) === 120 ? 120 : Number(nextLevel) === 80 ? 80 : Number(nextLevel) === 40 ? 40 : 20
    const nextQuestions = getValueMapQuestionsForLevel(normalized)
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
      questionBankVersion: VALUEMAP_VERSION,
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
    if (draft && !window.confirm('မပြီးသေးတဲ့ ValueMap အဖြေဟောင်းရှိပါတယ်။ အသစ်ပြန်စရင် အဲဒီ Draft ကို အစားထိုးပါမယ်။ ဆက်လုပ်မှာ သေချာပါသလား။')) return
    if (draft && !clearDraft(level, ASSESSMENT_TYPE)) reportStorageWrite(false)
    const now = new Date().toISOString()
    setAnswers({})
    setSkippedQuestionIds([])
    setQuestionIndex(0)
    setStartedAt(now)
    setRecord(null)
    const emptyDraft = {
      assessmentType: ASSESSMENT_TYPE,
      questionBankVersion: VALUEMAP_VERSION,
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

  const { scheduleAutoAdvance, cancelAutoAdvance } = useAutoAdvance({ delayMs: 260, isActive: view === 'question' })

  const exit = () => {
    cancelAutoAdvance()
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
      assessmentType: ASSESSMENT_TYPE, questionBankVersion: VALUEMAP_VERSION,
      level, answers: nextAnswers, skippedQuestionIds: nextSkipped,
      currentIndex: questionIndex, startedAt: startedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(), status: 'in-progress',
    }
    const saved = saveDraft(payload)
    reportStorageWrite(saved)
    setDraft(payload)
    onDataChange?.(loadAppData())
    const activeIndex = questionIndex
    scheduleAutoAdvance(activeIndex, () => {
      if (activeIndex < activeQuestions.length - 1) {
        setQuestionIndex((current) => (current === activeIndex ? current + 1 : current))
      } else {
        setView('review')
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  const goPrevious = () => {
    cancelAutoAdvance()
    setQuestionIndex((current) => Math.max(0, current - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goNext = () => {
    cancelAutoAdvance()
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
    cancelAutoAdvance()
    const currentQuestion = activeQuestions[questionIndex]
    if (answers[currentQuestion.id] !== undefined) return
    const nextSkipped = [...new Set([...skippedQuestionIds, currentQuestion.id])]
    const nextIndex = Math.min(questionIndex + 1, activeQuestions.length - 1)
    setSkippedQuestionIds(nextSkipped)
    setQuestionIndex(nextIndex)
    const payload = {
      assessmentType: ASSESSMENT_TYPE, questionBankVersion: VALUEMAP_VERSION,
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
    cancelAutoAdvance()
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
    const result = scoreValueMap(answers, level)
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
      id: globalThis.crypto?.randomUUID?.() || `valuemap-${Date.now()}`,
      assessmentType: ASSESSMENT_TYPE,
      assessmentName: 'ValueMap',
      questionBankVersion: VALUEMAP_VERSION,
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
    trackAssessmentCompleted('valuemap', activeQuestions.length)
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
      ? 'အရင်ရလဒ်ကို History ထဲမှာ ထိန်းထားပါမယ်။ မပြီးသေးတဲ့ ValueMap Draft ရှိနေတဲ့အတွက် အသစ်စတင်ပါက အဲဒီ Draft ကို အစားထိုးပါမယ်။ ဆက်လုပ်မှာ သေချာပါသလား။'
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
      assessmentType: ASSESSMENT_TYPE, questionBankVersion: VALUEMAP_VERSION,
      level, answers: {}, skippedQuestionIds: [], currentIndex: 0,
      startedAt: now, updatedAt: now, status: 'in-progress',
    }
    const saved = saveDraft(emptyDraft)
    reportStorageWrite(saved)
    setDraft(emptyDraft)
    onDataChange?.(loadAppData())
    setView('question')
  }

  if (view === 'question') return <><QuestionView activeQuestions={activeQuestions} answers={answers} skippedQuestionIds={skippedQuestionIds} questionIndex={questionIndex} onAnswer={answerQuestion} onPrevious={goPrevious} onNext={goNext} onSkip={skipQuestion} onReview={() => { cancelAutoAdvance(); setView('review') }} onExit={exit} storageError={storageError} storageAlertVisible={storageAlertVisible} onExportBackup={onExportBackup} onDismissStorageError={dismissStorageError} />{toast && <div role="status" className="no-print fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#2c4a34] px-5 py-3 text-xs font-semibold text-white shadow-xl sm:bottom-5">{toast}</div>}</>
  if (view === 'review') return <><ReviewView activeQuestions={activeQuestions} answers={answers} skippedQuestionIds={skippedQuestionIds} onGoTo={goToQuestion} onFinish={finish} onBack={() => setView('question')} storageAlertVisible={storageAlertVisible} onExportBackup={onExportBackup} onDismissStorageError={dismissStorageError} />{toast && <div role="status" className="no-print fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#2c4a34] px-5 py-3 text-xs font-semibold text-white shadow-xl sm:bottom-5">{toast}</div>}</>
  if (view === 'result') return <ResultView record={record || initialRecord} onHome={onHome} onRetake={retake} storageAlertVisible={storageAlertVisible} onExportBackup={onExportBackup} onDismissStorageError={dismissStorageError} />
  return <GuideView level={level} onSelectLevel={handleSelectLevel} questionCount={activeQuestions.length} draft={draft} onBack={onHome} onBegin={startFresh} onResume={resume} onRestart={startFresh} storageAlertVisible={storageAlertVisible} onExportBackup={onExportBackup} onDismissStorageError={dismissStorageError} />
}
