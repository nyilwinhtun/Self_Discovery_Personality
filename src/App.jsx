import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import {
  AlertTriangle, ArrowLeft, ArrowRight, BookOpen, Brain, BriefcaseBusiness, Check, CheckCircle2,
  ChevronRight, CircleHelp, ClipboardCheck, Clock3, Download, Heart, History,
  Home, LockKeyhole, PauseCircle, RotateCcw, ShieldCheck, Sparkles,
  Target, Trash2, Users, Wind, X, Upload, FileJson,
} from 'lucide-react'
import { ANSWER_OPTIONS, FACETS, getQuestionsForLevel, QUESTION_BANK_VERSION, TRAITS } from './data/questions.js'
import { buildResult, getPersonalityProfile, getScoreBand } from './utils/scoring.js'
import {
  getTraitLifeDomainSummary, getTraitReportInsight, REPORT_INTERPRETATION_NOTICE,
} from './utils/resultInterpretations.js'
import MobileBottomNavigation from './components/MobileBottomNavigation.jsx'
import MobileQuestionActions from './components/MobileQuestionActions.jsx'
import ReportSectionNavigation from './components/ReportSectionNavigation.jsx'
import StorageWriteAlert from './components/StorageWriteAlert.jsx'
import { TraitLensLogo, InnerCompassLogo, BondSenseLogo, ValueMapLogo } from './components/AssessmentLogos.jsx'
import { downloadTextFile } from './utils/download.js'
import {
  clearDraft, clearHistoryWithStatus, createBackupSnapshot, deleteAssessmentWithStatus, inspectBackupSnapshot,
  loadAppData, loadDraft, restoreBackupData, saveAssessmentWithStatus, saveDraft,
} from './utils/storage.js'

const BalancedSpectrumBar = lazy(() => import('./components/BalancedSpectrumBar.jsx'))
const BondSenseModule = lazy(() => import('./components/BondSenseModule.jsx'))
const CalmingBreathPause = lazy(() => import('./components/CalmingBreathPause.jsx'))
const CareerInterestModule = lazy(() => import('./components/CareerInterestModule.jsx'))
const DailyMindPromptCard = lazy(() => import('./components/DailyMindPromptCard.jsx'))
const EmotionLensModule = lazy(() => import('./components/EmotionLensModule.jsx'))
const HistoryPage = lazy(() => import('./components/HistoryPage.jsx'))
const InnerCompassModule = lazy(() => import('./components/InnerCompassModule.jsx'))
const KnowledgeCenter = lazy(() => import('./components/KnowledgeCenter.jsx'))
const KnowledgeInlineHelp = lazy(() => import('./components/KnowledgeInlineHelp.jsx'))
const LikertScaleSelector = lazy(() => import('./components/LikertScaleSelector.jsx'))
const MyMindProfile = lazy(() => import('./components/MyMindProfile.jsx'))
const ReflectionJournalPage = lazy(() => import('./components/ReflectionJournalPage.jsx'))
const ReflectionNotesSection = lazy(() => import('./components/ReflectionNotesSection.jsx'))
const ResultShareCardButton = lazy(() => import('./components/ResultShareCardButton.jsx'))
const TraitRadarChart = lazy(() => import('./components/TraitRadarChart.jsx'))
const ValueMapModule = lazy(() => import('./components/ValueMapModule.jsx'))

function ModuleLoadingFallback() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 text-center">
      <div className="rounded-[2rem] border border-[#ebe5dc] bg-[#fffdf9]/95 p-8 shadow-sm">
        <p className="text-sm font-semibold text-[#5b4b60]">စာမျက်နှာကို ဖွင့်နေပါသည်...</p>
        <p className="mt-2 text-xs text-[#6b5e70]">ခဏစောင့်ပေးပါ။</p>
      </div>
    </main>
  )
}

const STORAGE_HINT = 'သင့်အဖြေများကို ဒီ Browser နဲ့ ဒီစက်ထဲမှာပဲ သိမ်းထားပါတယ်။ Browser Data ရှင်းလိုက်ရင် အဖြေတွေ ပျောက်နိုင်ပါတယ်။'
const LEVELS = [
  { value: 30, title: 'အခြေခံဆန်းစစ်မှု', subtitle: 'ပင်ကိုစရိုက် အချက် ၅ ချက်ကို အကျဉ်းချုပ် လေ့လာရန်', duration: '~၅ မိနစ်', time: 'ခဏရပ်ပြီး ပြန်ဆက်နိုင်', label: 'အခြေခံ', recommended: true },
  { value: 60, title: 'အသေးစိတ်ဆန်းစစ်မှု', subtitle: 'ပင်ကိုစရိုက် အချက် ၅ ချက်ကို မေးခွန်းပိုများဖြင့် အသေးစိတ် လေ့လာရန်', duration: '~၁၀ မိနစ်', time: 'ခဏရပ်ပြီး ပြန်ဆက်နိုင်', label: 'အသေးစိတ်' },
  { value: 120, title: 'နက်ရှိုင်းစွာ ဆန်းစစ်မှု', subtitle: 'ပင်ကိုစရိုက် အချက် ၅ ချက်နဲ့ အသေးစိတ် အချက် ၃၀ ကို လေ့လာရန်', duration: '~၂၀ မိနစ်', time: 'ခဏရပ်ပြီး ပြန်ဆက်နိုင်', label: 'နက်ရှိုင်း' },
]

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

function TraitIcon({ id, size = 19 }) {
  const common = { size, strokeWidth: 1.8 }
  if (id === 'openness') return <Sparkles {...common} />
  if (id === 'conscientiousness') return <ClipboardCheck {...common} />
  if (id === 'extraversion') return <Users {...common} />
  if (id === 'agreeableness') return <Heart {...common} />
  return <Brain {...common} />
}

function Brand({ onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-3 text-left" aria-label="ပင်မစာမျက်နှာ">
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#80678f] text-white shadow-sm"><Sparkles size={20} /></span>
      <span>
        <span className="flex items-center gap-2">
          <span className="text-[15px] font-bold tracking-tight text-[#45384a]">Self Discovery</span>
          <span className="rounded-full border border-[#e8d8b8] bg-[#fff7e8] px-2 py-0.5 text-[11px] font-bold tracking-wide text-[#825824]">BETA</span>
        </span>
        <span className="block text-[11px] text-[#6b5e70]">ကိုယ့်ကိုယ်ကို ရှာဖွေခြင်း · စမ်းသပ်ဆဲ</span>
      </span>
    </button>
  )
}

function Header({ onHome, onHistory, onKnowledge, active }) {
  return (
    <header className="no-print sticky top-0 z-30 border-b border-[#ebe5dc] bg-[#faf8f5]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Brand onClick={onHome} />
        <nav className="hidden items-center gap-1 rounded-full bg-[#f2edf2] p-1 sm:flex">
          <button onClick={onHome} className={cn('flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition sm:text-sm', active === 'home' ? 'bg-white text-[#614b6b] shadow-sm' : 'text-[#6b5e70] hover:text-[#614b6b]')}>
            <Home size={15} /> <span className="hidden sm:inline">ပင်မစာမျက်နှာ</span>
          </button>
          <button onClick={onHistory} className={cn('flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition sm:text-sm', active === 'history' ? 'bg-white text-[#614b6b] shadow-sm' : 'text-[#6b5e70] hover:text-[#614b6b]')}>
            <History size={15} /> <span className="hidden sm:inline">မှတ်တမ်း</span>
          </button>
          <button onClick={onKnowledge} className={cn('flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold transition sm:text-sm', active === 'knowledge' ? 'bg-white text-[#614b6b] shadow-sm' : 'text-[#6b5e70] hover:text-[#614b6b]')}>
            <BookOpen size={15} /> <span className="hidden sm:inline">အသိပညာ</span>
          </button>
        </nav>
      </div>
    </header>
  )
}

function PrimaryButton({ children, onClick, icon: Icon = ArrowRight, disabled = false, type = 'button' }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#80678f] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(128,103,143,0.2)] transition hover:-translate-y-0.5 hover:bg-[#725981] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0">
      {children}<Icon size={17} />
    </button>
  )
}

function SecondaryButton({ children, onClick, icon: Icon, disabled = false, className = '' }) {
  return (
    <button onClick={onClick} disabled={disabled} className={cn('inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-[#e5dce6] bg-white px-5 py-2.5 text-sm font-semibold text-[#6e5a77] transition hover:border-[#cdbdd2] hover:bg-[#faf7fb] disabled:cursor-not-allowed disabled:opacity-40', className)}>
      {Icon && <Icon size={16} />}{children}
    </button>
  )
}

function getDraftStats(draft, level) {
  const total = Number(level)
  const answers = draft?.answers || {}
  const answered = Object.keys(answers).length
  const skipped = (draft?.skippedQuestionIds || []).filter((id) => !answers[id]).length
  return { total, answered, skipped, remaining: Math.max(0, total - answered), progress: total ? Math.round((answered / total) * 100) : 0 }
}

function HomePage({ history, drafts, onStart, onResume, onStartCareer, onHistory, onOpenRecord, onExportBackup, onImportBackup, onOpenInnerCompass, onOpenBondSense, onOpenValueMap, onOpenEmotionLens, onOpenKnowledge, onOpenMindProfile, onOpenJournal, storageAlertVisible, onDismissStorageError }) {
  const [betaDetailsOpen, setBetaDetailsOpen] = useState(false)
  const completedCount = history.length
  const draftCount = Object.values(drafts || {}).reduce((sum, group) => {
    return sum + (group && typeof group === 'object' ? Object.keys(group).length : 0)
  }, 0)
  const personalityDrafts = Object.entries(drafts?.personality || {})
    .filter(([, draft]) => draft && draft.status !== 'completed')
    .sort((a, b) => new Date(b[1]?.updatedAt || 0).getTime() - new Date(a[1]?.updatedAt || 0).getTime())
  const latestPersonalityDraft = personalityDrafts[0]
  const careerDraft = drafts?.careerInterest?.['30'] || null
  const careerAnswered = Object.keys(careerDraft?.answers || {}).length
  const careerProgress = Math.round((careerAnswered / 30) * 100)
  const innerCompassDraft30 = drafts?.innerCompass?.['30'] || null
  const innerCompassDraft60 = drafts?.innerCompass?.['60'] || null
  const innerCompassDraft120 = drafts?.innerCompass?.['120'] || null
  const bondSenseDraft20 = drafts?.bondSense?.['20'] || null
  const bondSenseDraft40 = drafts?.bondSense?.['40'] || null
  const bondSenseDraft80 = drafts?.bondSense?.['80'] || null
  const valueMapDraft20 = drafts?.valueMap?.['20'] || null
  const valueMapDraft40 = drafts?.valueMap?.['40'] || null
  const emotionLensDraft20 = drafts?.emotionLens?.['20'] || null
  const emotionLensDraft40 = drafts?.emotionLens?.['40'] || null
  const emotionLensDraft80 = drafts?.emotionLens?.['80'] || null
  const emotionLensDraft120 = drafts?.emotionLens?.['120'] || null
  const recentPersonalityHistory = history.slice(0, 3)

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8 lg:px-8">
      <StorageWriteAlert visible={storageAlertVisible} onExportBackup={onExportBackup} onDismiss={onDismissStorageError} />

      <section className="relative overflow-hidden rounded-[2rem] border border-[#eee4ed] bg-gradient-to-br from-[#f0e9f3] via-[#fbf7f6] to-[#f4e9ed] px-6 py-8 card-shadow sm:px-10 sm:py-12 lg:px-14">
        <div className="soft-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-[#e0d2e8]/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-[#f1d9e1]/60 blur-3xl" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-3 py-1.5 text-xs font-semibold text-[#6f587a] shadow-sm"><Sparkles size={14} /> ကိုယ့်ကိုယ်ကို နားလည်ဖို့ ခရီးစဉ်ငယ်တစ်ခု</span>
            <h1 className="text-3xl font-bold leading-[1.45] tracking-tight text-[#44364a] sm:text-4xl lg:text-[2.8rem]">ကိုယ့်ပင်ကိုစရိုက်နဲ့<br className="hidden sm:block" /> အတွင်းစိတ်ကို ပိုမိုနားလည်ပါ</h1>
            <p className="mt-4 max-w-xl text-sm leading-8 text-[#5d5162] sm:text-base">မိမိရဲ့ အတွေးအခေါ်၊ စိတ်ခံစားမှု၊ အပြုအမူနဲ့ ဆက်ဆံရေးပုံစံတွေကို အဆင့်ဆင့် လေ့လာပြီး ကိုယ့်ကိုယ်ကို ပိုမိုနားလည်လာစေဖို့ ရည်ရွယ်ပါတယ်။</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#5d5162]">
              <span className="inline-flex items-center gap-1.5"><Clock3 size={14} /> ၅ မိနစ်မှ စတင်နိုင်</span>
              <span className="inline-flex items-center gap-1.5"><PauseCircle size={14} /> ခဏရပ်ပြီး ပြန်ဆက်နိုင်</span>
              <span className="inline-flex items-center gap-1.5"><LockKeyhole size={14} /> ဒီစက်ထဲမှာသာ သိမ်းဆည်း</span>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <PrimaryButton onClick={() => scrollTo('personality-levels')}>TraitLens ဖြင့် စတင်လေ့လာမယ်</PrimaryButton>
              {latestPersonalityDraft && (
                <SecondaryButton onClick={() => onResume(Number(latestPersonalityDraft[0]))} icon={ArrowRight}>အရင်ဖြေထားတာ ဆက်မယ်</SecondaryButton>
              )}
              <SecondaryButton onClick={onOpenMindProfile} icon={Sparkles}>ကျွန်ုပ်၏ စိတ်ပုံရိပ်</SecondaryButton>
            </div>
            <p className="mt-3 text-xs leading-6 text-[#6b5e70]">ပထမဆုံးအကြိမ် စတင်သူများအတွက် အခြေခံ ၃၀ မေးခွန်း (~၅ မိနစ်) ဖြင့် စတင်ရန် အကြံပြုပါသည်။</p>
          </div>
          <div className="relative mx-auto hidden w-full max-w-sm lg:block">
            <div className="absolute inset-4 rounded-[2rem] bg-[#d8c6df]/50 blur-2xl" />
            <div className="relative rounded-[2rem] border border-white/90 bg-white/80 p-5 shadow-[0_22px_70px_rgba(91,68,96,0.13)] backdrop-blur">
              <div className="flex items-center justify-between"><span className="text-xs font-semibold text-[#6b5e70]">သင့်ရဲ့ ကိုယ်ပိုင်မြေပုံ</span><span className="rounded-full bg-[#f3edf5] px-2.5 py-1 text-[11px] font-semibold text-[#6f587a]">လေ့လာမှု ၄ ပိုင်း</span></div>
              <div className="relative mt-5 grid aspect-square place-items-center rounded-[1.5rem] bg-gradient-to-br from-[#f8f3fa] to-[#fdf7f5]">
                <div className="absolute h-[75%] w-[75%] rounded-full border border-[#e8dfea]" /><div className="absolute h-[55%] w-[55%] rounded-full border border-[#e8dfea]" /><div className="absolute h-[34%] w-[34%] rounded-full border border-[#e8dfea]" />
                <div className="absolute h-px w-[78%] bg-[#e8dfea]" /><div className="absolute h-[78%] w-px bg-[#e8dfea]" />
                <div className="relative grid h-24 w-24 place-items-center rounded-full border border-white bg-white text-[#80678f] shadow-lg"><div className="text-center"><Sparkles className="mx-auto mb-1" size={23} /><span className="text-[11px] font-bold">YOU</span></div></div>
                <span className="absolute left-1/2 top-3 -translate-x-1/2 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-[#6b5e70] shadow-sm">ပင်ကိုစရိုက်</span>
                <span className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-[#865569] shadow-sm">စိတ်နေသဘောထား</span>
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-[#6b5e70] shadow-sm">ဆက်ဆံရေး</span>
                <span className="absolute left-1 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-[#865569] shadow-sm">ဘဝတန်ဖိုး</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-[#f7f1f8] p-2.5 text-center"><span className="block text-lg font-bold text-[#80678f]">30</span><span className="text-[11px] text-[#6b5e70]">~၅ မိနစ်</span></div>
                <div className="rounded-xl bg-[#fbf1f3] p-2.5 text-center"><span className="block text-lg font-bold text-[#865569]">60</span><span className="text-[11px] text-[#6b5e70]">~၁၀ မိနစ်</span></div>
                <div className="rounded-xl bg-[#f4f3ed] p-2.5 text-center"><span className="block text-lg font-bold text-[#825824]">120</span><span className="text-[11px] text-[#6b5e70]">~၂၀ မိနစ်</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="beta-notice-title" className="mt-5 rounded-2xl border border-[#eadfc9] bg-[#fffaf1] px-4 py-3 shadow-sm sm:px-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#f8edd8] text-[#825824]"><CircleHelp size={18} /></span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 id="beta-notice-title" className="text-xs font-bold text-[#715832] sm:text-sm">Beta စမ်းသပ်ဗားရှင်း · ကိုယ်တိုင်သုံးသပ်ရန်သာ</h2>
                <span className="rounded-full bg-[#f8edd8] px-2 py-0.5 text-[11px] font-bold tracking-wide text-[#825824]">BETA</span>
              </div>
              <p className="mt-1 text-[11px] leading-6 text-[#6f5e47]">ရောဂါရှာဖွေခြင်းနှင့် ဆေးဘက်ဆိုင်ရာ ဆုံးဖြတ်ချက် မဟုတ်ပါ။ အဖြေများကို ဒီ Browser ထဲတွင်သာ သိမ်းဆည်းထားပါသည်။</p>
            </div>
          </div>
          <button
            type="button"
            aria-expanded={betaDetailsOpen}
            aria-controls="beta-notice-details"
            onClick={() => setBetaDetailsOpen((open) => !open)}
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-[#e6d6b8] bg-white/85 px-3.5 py-2 text-xs font-semibold text-[#715832] transition hover:bg-white"
          >
            <span>{betaDetailsOpen ? 'အသေးစိတ်ပိတ်ရန်' : 'အသေးစိတ်ကြည့်ရန်'}</span>
            <ChevronRight size={14} className={cn('transition-transform', betaDetailsOpen && 'rotate-90')} />
          </button>
        </div>
        {betaDetailsOpen && (
          <div id="beta-notice-details" className="mt-4 border-t border-[#efe4cf] pt-4">
            <p className="text-xs leading-7 text-[#6f5e47]">ဤ App ကို အသုံးပြုသူများထံမှ အကြံပြုချက်ရယူပြီး ပိုမိုကောင်းမွန်လာစေရန် စမ်းသပ်ပြင်ဆင်နေဆဲ ဖြစ်ပါသည်။ ထို့ကြောင့် မေးခွန်း၊ မြန်မာစာအသုံးအနှုန်း၊ ရလဒ်ရှင်းလင်းချက်နှင့် လုပ်ဆောင်ချက်အချို့ ပြောင်းလဲနိုင်သလို မမျှော်လင့်ထားသော အမှားများလည်း ဖြစ်ပေါ်နိုင်ပါသည်။</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[#f0e6d4] bg-white/80 p-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#715832]"><BookOpen size={15} /> ရလဒ်များကို သတိထားဖတ်ပါ</div>
                <p className="mt-1.5 text-[11px] leading-6 text-[#6f5e47]">ရလဒ်များသည် မိမိကိုယ်ကို ပြန်လည်သုံးသပ်ရန် အထောက်အကူပေးသည့် အညွှန်းများသာ ဖြစ်ပါသည်။ သင့်ကို အမျိုးအစားတစ်ခုတည်းဖြင့် အပြီးသတ်သတ်မှတ်ခြင်း သို့မဟုတ် အခြားသူများနှင့် အဆင့်ချင်းနှိုင်းယှဉ်ခြင်း မဟုတ်ပါ။ Career Interest ရလဒ်သည် အလုပ်ရရှိမှု သို့မဟုတ် အောင်မြင်မှုကို အာမမခံပါ။</p>
              </div>
              <div className="rounded-xl border border-[#f0e6d4] bg-white/80 p-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#715832]"><ShieldCheck size={15} /> ပညာရှင်၏ ဆုံးဖြတ်ချက်အစား မသုံးပါနှင့်</div>
                <p className="mt-1.5 text-[11px] leading-6 text-[#6f5e47]">ဤ App သည် စိတ်ကျန်းမာရေးဆိုင်ရာ ရောဂါရှာဖွေခြင်း၊ ကုသမှု၊ ဆေးဝါးသုံးစွဲမှု သို့မဟုတ် အရေးကြီးသော ဆုံးဖြတ်ချက်များအတွက် မဟုတ်ပါ။ လိုအပ်ပါက သက်ဆိုင်ရာ ပညာရှင်နှင့် တိုင်ပင်ပါ။</p>
              </div>
              <div className="rounded-xl border border-[#f0e6d4] bg-white/80 p-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#715832]"><LockKeyhole size={15} /> အဖြေများကို ဒီ Browser ထဲတွင် သိမ်းထားပါသည်</div>
                <p className="mt-1.5 text-[11px] leading-6 text-[#6f5e47]">အဖြေများ၊ Draft နှင့် မှတ်တမ်းများကို လက်ရှိ Browser/စက်၏ LocalStorage ထဲတွင်သာ သိမ်းဆည်းထားပြီး Cloud Sync မရှိသေးပါ။ Browser Data ရှင်းခြင်း၊ Private/Incognito အသုံးပြုခြင်း သို့မဟုတ် Browser/စက်ပြောင်းခြင်းကြောင့် Data ပျောက်နိုင်ပါသည်။</p>
              </div>
              <div className="rounded-xl border border-[#f0e6d4] bg-white/80 p-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#715832]"><FileJson size={15} /> Backup ကို လုံခြုံစွာ သိမ်းပါ</div>
                <p className="mt-1.5 text-[11px] leading-6 text-[#6f5e47]">Browser Data မရှင်းမီ JSON Backup ထုတ်ယူထားပါ။ Backup ဖိုင်ထဲတွင် ကိုယ်ရေးကိုယ်တာ အဖြေများနှင့် ရလဒ်များ ပါဝင်နိုင်သောကြောင့် အခြားသူများထံ မမျှဝေပါနှင့်။</p>
              </div>
            </div>
            <p className="mt-3 rounded-xl bg-[#f8f0e3] px-3 py-2 text-[11px] leading-6 text-[#6f5e47]">စမ်းသပ်ရာတွင် Error သို့မဟုတ် နားမလည်သောအချက်တွေ့ပါက အသုံးပြုနေသည့် ဖုန်း/ကွန်ပျူတာ၊ Browser အမျိုးအစားနှင့် ဖြစ်ပွားပုံကို မှတ်သားပြီး အကြံပြုချက်ပေးနိုင်ပါသည်။ မဖြေလိုသော မေးခွန်းရှိပါက ဆက်မဖြေဘဲ စမ်းသပ်မှုကို ရပ်နားနိုင်ပါသည်။</p>
          </div>
        )}
      </section>

      <section className="mt-6 grid grid-cols-3 gap-2 sm:gap-4" aria-label="လက်ရှိအသုံးပြုမှု အကျဉ်းချုပ်">
        <article className="rounded-2xl border border-[#eee5ed] bg-white p-3 shadow-sm sm:p-4">
          <span className="text-[11px] font-medium text-[#6b5e70] sm:text-xs">ပြီးဆုံးထားသော မှတ်တမ်း</span>
          <p className="mt-1 text-xl font-bold tabular-nums text-[#80678f] sm:text-2xl">{completedCount}</p>
        </article>
        <article className="rounded-2xl border border-[#eee5ed] bg-white p-3 shadow-sm sm:p-4">
          <span className="text-[11px] font-medium text-[#6b5e70] sm:text-xs">မပြီးသေးသော Draft</span>
          <p className="mt-1 text-xl font-bold tabular-nums text-[#865569] sm:text-2xl">{draftCount}</p>
        </article>
        <article className="rounded-2xl border border-[#eee5ed] bg-white p-3 shadow-sm sm:p-4">
          <span className="text-[11px] font-medium text-[#6b5e70] sm:text-xs">ယခုအသုံးပြုနိုင်သော စမ်းသပ်မှု</span>
          <p className="mt-1 text-xl font-bold tabular-nums text-[#825824] sm:text-2xl">၆ မျိုး</p>
        </article>
      </section>

      <section id="assessment-dashboard" className="mt-9 scroll-mt-24">
        <div className="mb-5">
          <p className="text-xs font-semibold tracking-wide text-[#6b5e70]">CORE SELF-DISCOVERY MODULES</p>
          <h2 className="mt-1 text-xl font-bold text-[#514357]">အဓိက ကိုယ့်ကိုယ်ကို လေ့လာရေး အပိုင်းများ</h2>
          <p className="mt-2 max-w-3xl text-xs leading-6 text-[#6b5e70]">ဆန်းစစ်မှုတစ်ခုချင်းစီမှာ ကိုယ်ပိုင်ရည်ရွယ်ချက်၊ မေးခွန်းနဲ့ ရလဒ်ရှိပါတယ်။ အဖြေတစ်ခုတည်းနဲ့ သင့်ကို အပြီးသတ်သတ်မှတ်မှာ မဟုတ်ဘဲ ကိုယ့်ကိုယ်ကို ပြန်လည်သုံးသပ်နိုင်ဖို့ ကူညီပေးမှာပါ။</p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
          <section id="personality-levels" className="scroll-mt-24 rounded-2xl border border-[#d8c7df] bg-white p-5 shadow-sm ring-1 ring-[#eee5f0] sm:p-6 md:col-span-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="grid h-[72px] w-[72px] shrink-0 place-items-center rounded-2xl bg-[#f3edf5] text-[#80678f]"><TraitLensLogo size={54}/></span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-bold tracking-tight text-[#514357]">TraitLens</h3>
                  <span className="rounded-full bg-[#eef5ed] px-2.5 py-1 text-[11px] font-semibold text-[#436b4f]">စတင်နိုင်ပါပြီ</span>
                </div>
                <p className="mt-1 text-sm font-semibold text-[#6f587a]">ပင်ကိုစရိုက်ကို လေ့လာခြင်း</p>
                <p className="mt-2 max-w-2xl text-xs leading-6 text-[#6b5e70]">နေ့စဉ်ဘဝမှာ သင်တွေးခေါ်ပုံ၊ ပြုမူပုံ၊ လူမှုဆက်ဆံရေးနဲ့ စိတ်ခံစားမှုတုံ့ပြန်ပုံတွေကို အဓိက အချက် ၅ ချက်ကို အခြေခံပြီး လေ့လာနိုင်ပါတယ်။ ပထမဆုံးအကြိမ် စတင်သူများအတွက် ၃၀ မေးခွန်း (~၅ မိနစ်) ဖြင့် စတင်ရန် အကြံပြုပါတယ်။</p>
              </div>
            </div>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {LEVELS.map((level) => {
              const draft = drafts?.personality?.[String(level.value)] || null
              const stats = draft ? getDraftStats(draft, level.value) : null
              return (
                <article key={level.value} className={cn('flex flex-col rounded-2xl border bg-[#fcfafc] p-4 sm:p-5', level.recommended ? 'border-[#ccb8d6] ring-1 ring-[#e8dcea]' : 'border-[#eee5ed]')}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-[#f3edf5] px-3 py-1 text-[11px] font-semibold text-[#6f587a]">{level.label}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#5d5162] shadow-xs"><Clock3 size={12} /> {level.duration}</span>
                  </div>
                  {level.recommended && (
                    <span className="mt-2.5 inline-flex w-fit rounded-full bg-[#eef5ed] px-2.5 py-0.5 text-[11px] font-semibold text-[#436b4f]">ပထမဆုံး စတင်သူများအတွက် အကြံပြု</span>
                  )}
                  <h4 className="mt-3 text-base font-bold text-[#514357]">{level.title}</h4>
                  <p className="mt-1.5 min-h-11 text-xs leading-6 text-[#6b5e70]">{level.subtitle}</p>
                  <div className="mt-3 flex items-end justify-between gap-2">
                    <div className="flex items-end gap-2"><strong className="text-3xl text-[#80678f]">{level.value}</strong><span className="pb-1 text-xs text-[#6b5e70]">မေးခွန်း</span></div>
                    <span className="text-[11px] text-[#6b5e70]">{level.time}</span>
                  </div>
                  {draft ? (
                    <div className="mt-4 rounded-xl bg-white p-3 shadow-xs">
                      <div className="flex items-center justify-between text-[11px]"><span className="font-semibold text-[#725f7a]">ဖြေဆိုမှု ဆက်လက်လုပ်ဆောင်ရန်</span><span className="text-[#6b5e70]">{stats.progress}%</span></div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e9e1eb]"><div className="h-full rounded-full bg-[#9c82aa]" style={{ width: `${stats.progress}%` }} /></div>
                      <p className="mt-2 text-[11px] text-[#6b5e70]">ဖြေပြီး {stats.answered} ခု · ကျော်ထား {stats.skipped} ခု · နောက်ဆုံး {formatDate(draft.updatedAt)}</p>
                      <div className="mt-3"><PrimaryButton onClick={() => onResume(level.value)} icon={ArrowRight}>ဆက်လက်ဖြေဆိုမယ်</PrimaryButton></div>
                      <button onClick={() => onStart(level.value, true)} className="mt-2 w-full py-2 text-[11px] font-semibold text-[#865569] hover:text-[#8d5f72]">အစကနေ အသစ်ပြန်စမယ်</button>
                    </div>
                  ) : (
                    <div className="mt-auto pt-4"><PrimaryButton onClick={() => onStart(level.value, false)}>စတင်ဖြေဆိုမယ်</PrimaryButton></div>
                  )}
                </article>
              )
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-[#d4e0ef] bg-white p-5 shadow-sm sm:p-6 md:col-span-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="grid h-[72px] w-[72px] shrink-0 place-items-center rounded-2xl bg-[#eaf1fa] text-[#446c96]"><InnerCompassLogo size={54}/></span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-bold tracking-tight text-[#3f5873]">InnerCompass</h3>
                  <span className="rounded-full bg-[#eef3f9] px-2.5 py-1 text-[11px] font-semibold text-[#3f648c]">စမ်းသပ်အသုံးပြုရန် (Pilot)</span>
                </div>
                <p className="mt-1 text-sm font-semibold text-[#3f648c]">အတွင်းစိတ်နှင့် စိတ်နေသဘောထားကို လေ့လာခြင်း</p>
                <p className="mt-2 max-w-2xl text-xs leading-6 text-[#596d83]">ကိုယ့်ရဲ့ ယုံကြည်စိတ်ချရမှု၊ စိတ်ခံစားချက်ကို သိမြင်ကိုင်တွယ်ပုံ၊ လူမှုဆက်ဆံရေး၊ အမြင်မတူမှုကို ကိုင်တွယ်ပုံ၊ ကိုယ်ပိုင်စီမံမှုနဲ့ စူးစမ်းတွေးခေါ်ပုံတွေကို အဓိက အချက် ၆ ချက်ဖြင့် ပြန်လည်သုံးသပ်နိုင်ပါတယ်။</p>
              </div>
            </div>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              {
                levelValue: 30,
                badge: 'အခြေခံ',
                duration: '~၅ မိနစ်',
                title: 'အခြေခံ ၃၀ မေးခွန်း',
                subtitle: 'အဓိက အချက် ၆ ချက်ကို အကျဉ်းချုပ် ပြန်လည်သုံးသပ်ရန်',
                recommended: true,
                draft: innerCompassDraft30,
              },
              {
                levelValue: 60,
                badge: 'အသေးစိတ်',
                duration: '~၁၀ မိနစ်',
                title: 'အသေးစိတ် ၆၀ မေးခွန်း',
                subtitle: 'အချက် ၆ ချက်ကို မေးခွန်းပိုများဖြင့် ပိုမိုစုံလင်စွာ သုံးသပ်ရန်',
                recommended: false,
                draft: innerCompassDraft60,
              },
              {
                levelValue: 120,
                badge: 'အနက်ရှိုင်းဆုံး',
                duration: '~၂၀ မိနစ်',
                title: 'အနက်ရှိုင်းဆုံး ၁၂၀ မေးခွန်း',
                subtitle: 'အချက် ၆ ချက်ကို ရှုထောင့်စုံမှ အနက်ရှိုင်းဆုံး ပြန်လည်သုံးသပ်ရန်',
                recommended: false,
                draft: innerCompassDraft120,
              },
            ].map((item) => {
              const answered = Object.keys(item.draft?.answers || {}).length
              const skipped = (item.draft?.skippedQuestionIds || []).filter((id) => item.draft?.answers?.[id] === undefined).length
              const progress = Math.round((answered / item.levelValue) * 100)
              return (
                <article key={item.levelValue} className={cn('flex flex-col rounded-2xl border bg-[#f9fbfe] p-4 sm:p-5', item.recommended ? 'border-[#b9cde2] ring-1 ring-[#e2ecf6]' : 'border-[#dce6f0]')}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-[#eaf1fa] px-3 py-1 text-[11px] font-semibold text-[#3f648c]">{item.badge}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#4e6379] shadow-xs"><Clock3 size={12} /> {item.duration}</span>
                  </div>
                  {item.recommended && (
                    <span className="mt-2.5 inline-flex w-fit rounded-full bg-[#eef5ed] px-2.5 py-0.5 text-[11px] font-semibold text-[#436b4f]">ပထမဆုံး စတင်သူများအတွက် အကြံပြု</span>
                  )}
                  <h4 className="mt-3 text-base font-bold text-[#3f5873]">{item.title}</h4>
                  <p className="mt-1.5 min-h-10 text-xs leading-6 text-[#596d83]">{item.subtitle}</p>
                  <div className="mt-3 flex items-end justify-between gap-2">
                    <div className="flex items-end gap-2"><strong className="text-3xl text-[#446c96]">{item.levelValue}</strong><span className="pb-1 text-xs text-[#4e6379]">မေးခွန်း</span></div>
                    <span className="text-[11px] text-[#4e6379]">အချက် ၆ ချက်</span>
                  </div>
                  {item.draft ? (
                    <div className="mt-4 rounded-xl bg-white p-3 shadow-xs">
                      <div className="flex items-center justify-between text-[11px]"><span className="font-semibold text-[#405f82]">ဖြေဆိုမှု ဆက်လက်လုပ်ဆောင်ရန်</span><span className="text-[#4e6379]">{progress}%</span></div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e1eaf3]"><div className="h-full rounded-full bg-[#527daa]" style={{ width: `${progress}%` }}/></div>
                      <p className="mt-2 text-[11px] text-[#4e6379]">ဖြေပြီး {answered} ခု · ကျော်ထား {skipped} ခု</p>
                      <button onClick={() => onOpenInnerCompass(item.levelValue)} className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#446c96] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#3a5d82]">ဆက်လက်ဖြေဆိုမယ် <ArrowRight size={15}/></button>
                    </div>
                  ) : (
                    <button onClick={() => onOpenInnerCompass(item.levelValue)} className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#cbd9e9] bg-white px-4 py-2.5 text-xs font-semibold text-[#3f648c] transition hover:bg-[#edf3fa]">လမ်းညွှန်ဖတ်ပြီး စတင်မယ် <ArrowRight size={15}/></button>
                  )}
                </article>
              )
            })}
          </div>
          <p className="mt-3 text-[11px] leading-5 text-[#4e6379]">စမ်းသပ်အဆင့် ကိုယ်တိုင်ပြန်လည်သုံးသပ်မှုသာ ဖြစ်ပြီး အတည်ပြုထားသော စိတ်ပညာစမ်းသပ်မှု မဟုတ်ပါ။</p>
        </section>

        <div className="md:col-span-12">
          <div className="mb-3">
            <p className="text-xs font-semibold tracking-wide text-[#6b5e70]">MIND &amp; LIFE REFLECTION PILOTS</p>
            <h3 className="mt-1 text-lg font-bold text-[#514357]">ဆက်ဆံရေး၊ ဘဝတန်ဖိုးနှင့် စိတ်ခံစားချက် ဆိုင်ရာ လေ့လာမှုများ</h3>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
            <article className="flex flex-col rounded-2xl border border-[#ebd6d1] bg-white p-5 shadow-sm md:col-span-4">
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-[#fbeeea] text-[#924433]"><BondSenseLogo size={44} /></span>
                <span className="rounded-full bg-[#fdf3f0] px-2.5 py-1 text-[11px] font-semibold text-[#7c392b]">စမ်းသပ်မူကြမ်း (Pilot)</span>
              </div>
              <h3 className="mt-4 text-base font-bold text-[#662f23]">BondSense</h3>
              <p className="mt-1 text-xs font-semibold text-[#7c392b]">ဆက်ဆံရေးအတွင်း ကိုယ့်တုံ့ပြန်ပုံကို လေ့လာခြင်း</p>
              <p className="mt-2 flex-1 text-xs leading-6 text-[#6a4840]">ယုံကြည်မှု၊ ကိုယ်ပိုင်နယ်နိမိတ်၊ စာနာနားထောင်ပေးမှုနှင့် သဘောထားကွဲလွဲမှု ကိုင်တွယ်ပုံတို့ကို ပြန်လည်သုံးသပ်ပါ။</p>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold text-[#7c392b]">
                <span className="rounded-full bg-[#fdf3f0] px-2.5 py-1">မေးခွန်း ၂၀ / ၄၀ / ၈၀</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#fdf3f0] px-2.5 py-1"><Clock3 size={11} /> ~၄–၁၅ မိနစ်</span>
                <span className="rounded-full bg-[#fdf3f0] px-2.5 py-1">အချက် ၄ ချက်</span>
              </div>
              <div className="mt-4 grid gap-2.5">
                {[
                  {
                    levelValue: 20,
                    title: 'အခြေခံ ၂၀ မေးခွန်း',
                    duration: '~၄ မိနစ်',
                    draft: bondSenseDraft20,
                  },
                  {
                    levelValue: 40,
                    title: 'အသေးစိတ် ၄၀ မေးခွန်း',
                    duration: '~၈ မိနစ်',
                    draft: bondSenseDraft40,
                  },
                  {
                    levelValue: 80,
                    title: 'အသေးစိတ် ၈၀ မေးခွန်း',
                    duration: '~၁၅ မိနစ်',
                    draft: bondSenseDraft80,
                  },
                ].map((item) => {
                  const answered = Object.keys(item.draft?.answers || {}).length
                  const skipped = (item.draft?.skippedQuestionIds || []).filter((id) => item.draft?.answers?.[id] === undefined).length
                  const progress = Math.round((answered / item.levelValue) * 100)
                  if (item.draft) {
                    return (
                      <div key={item.levelValue} className="rounded-xl border border-[#ebd6d1] bg-[#fdf7f5] p-3">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-[#7c392b]">{item.title} · ဆက်လက်ဖြေဆိုရန်</span>
                          <span className="text-[#6d4b44]">{progress}%</span>
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#f0dfdb]"><div className="h-full rounded-full bg-[#924433]" style={{ width: `${progress}%` }} /></div>
                        <p className="mt-1.5 text-[11px] text-[#6d4b44]">ဖြေပြီး {answered}/{item.levelValue} · ကျော်ထား {skipped} ခု</p>
                        <button onClick={() => onOpenBondSense(item.levelValue)} className="mt-2.5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#924433] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#7d3829]">ဆက်လက်ဖြေဆိုမယ် ({item.levelValue}) <ArrowRight size={14} /></button>
                      </div>
                    )
                  }
                  return (
                    <button key={item.levelValue} onClick={() => onOpenBondSense(item.levelValue)} className="flex min-h-11 w-full items-center justify-between gap-2 rounded-xl border border-[#e5cbc5] bg-[#fdf7f5] px-3.5 py-2.5 text-left text-xs font-semibold text-[#7c392b] transition hover:bg-[#faeae5]">
                      <span>{item.title}</span>
                      <span className="inline-flex shrink-0 items-center gap-1.5 text-[11px] text-[#924433]">{item.duration} <ArrowRight size={14} /></span>
                    </button>
                  )
                })}
              </div>
            </article>

            <article className="flex flex-col rounded-2xl border border-[#d4e1d7] bg-white p-5 shadow-sm md:col-span-4">
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-[#eef4ef] text-[#3d6347]"><ValueMapLogo size={44} /></span>
                <span className="rounded-full bg-[#eef5f0] px-2.5 py-1 text-[11px] font-semibold text-[#33573d]">စမ်းသပ်မူကြမ်း (Pilot)</span>
              </div>
              <h3 className="mt-4 text-base font-bold text-[#2c4a34]">ValueMap</h3>
              <p className="mt-1 text-xs font-semibold text-[#33573d]">ဘဝမှာ ကိုယ်တန်ဖိုးထားတဲ့အရာတွေကို ရှာဖွေခြင်း</p>
              <p className="mt-2 flex-1 text-xs leading-6 text-[#465e4c]">လွတ်လပ်မှု၊ တည်ငြိမ်မှု၊ တိုးတက်သင်ယူမှုနှင့် မေတ္တာ/အကျိုးပြုမှုတို့ထဲမှ ကိုယ်အလေးထားရာကို ပြန်လည်သုံးသပ်ပါ။</p>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold text-[#33573d]">
                <span className="rounded-full bg-[#eef5f0] px-2.5 py-1">မေးခွန်း ၂၀ / ၄၀</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#eef5f0] px-2.5 py-1"><Clock3 size={11} /> ~၄–၈ မိနစ်</span>
                <span className="rounded-full bg-[#eef5f0] px-2.5 py-1">အချက် ၄ ချက်</span>
              </div>
              <div className="mt-4 grid gap-2.5">
                {[
                  {
                    levelValue: 20,
                    title: 'အခြေခံ ၂၀ မေးခွန်း',
                    duration: '~၄ မိနစ်',
                    draft: valueMapDraft20,
                  },
                  {
                    levelValue: 40,
                    title: 'အသေးစိတ် ၄၀ မေးခွန်း',
                    duration: '~၈ မိနစ်',
                    draft: valueMapDraft40,
                  },
                ].map((item) => {
                  const answered = Object.keys(item.draft?.answers || {}).length
                  const skipped = (item.draft?.skippedQuestionIds || []).filter((id) => item.draft?.answers?.[id] === undefined).length
                  const progress = Math.round((answered / item.levelValue) * 100)
                  if (item.draft) {
                    return (
                      <div key={item.levelValue} className="rounded-xl border border-[#d4e1d7] bg-[#f5f9f6] p-3">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-[#33573d]">{item.title} · ဆက်လက်ဖြေဆိုရန်</span>
                          <span className="text-[#475e4d]">{progress}%</span>
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#dce7df]"><div className="h-full rounded-full bg-[#3d6347]" style={{ width: `${progress}%` }} /></div>
                        <p className="mt-1.5 text-[11px] text-[#475e4d]">ဖြေပြီး {answered}/{item.levelValue} · ကျော်ထား {skipped} ခု</p>
                        <button onClick={() => onOpenValueMap(item.levelValue)} className="mt-2.5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#3d6347] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#31523a]">ဆက်လက်ဖြေဆိုမယ် ({item.levelValue}) <ArrowRight size={14} /></button>
                      </div>
                    )
                  }
                  return (
                    <button key={item.levelValue} onClick={() => onOpenValueMap(item.levelValue)} className="flex min-h-11 w-full items-center justify-between gap-2 rounded-xl border border-[#cad9ce] bg-[#f5f9f6] px-3.5 py-2.5 text-left text-xs font-semibold text-[#33573d] transition hover:bg-[#e8f2eb]">
                      <span>{item.title}</span>
                      <span className="inline-flex shrink-0 items-center gap-1.5 text-[11px] text-[#3d6347]">{item.duration} <ArrowRight size={14} /></span>
                    </button>
                  )
                })}
              </div>
            </article>

            <article className="flex flex-col rounded-2xl border border-[#cce0e2] bg-white p-5 shadow-sm md:col-span-4">
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-[#eaf4f4] text-[#2f6d73]"><Wind size={28} /></span>
                <span className="rounded-full bg-[#eaf4f4] px-2.5 py-1 text-[11px] font-semibold text-[#1e4a4f]">စမ်းသပ်မူကြမ်း (Pilot)</span>
              </div>
              <h3 className="mt-4 text-base font-bold text-[#1e4a4f]">EmotionLens</h3>
              <p className="mt-1 text-xs font-semibold text-[#2f6d73]">စိတ်ခံစားချက် သိမှတ်မှုနှင့် စိတ်အေးချမ်းမှု</p>
              <p className="mt-2 flex-1 text-xs leading-6 text-[#3a5a5e]">ခံစားချက်သိမှတ်မှု၊ စိတ်ဖိစီးမှုတည်ငြိမ်မှု၊ ကိုယ့်ကိုယ်ကို ကြင်နာမှုနှင့် အတွေးလွန်လွတ်မြောက်မှုတို့ကို သုံးသပ်ပါ။</p>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold text-[#1e4a4f]">
                <span className="rounded-full bg-[#eaf4f4] px-2.5 py-1">မေးခွန်း ၂၀ / ၄၀ / ၈၀ / ၁၂၀</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#eaf4f4] px-2.5 py-1"><Clock3 size={11} /> ~၄–၂၀ မိနစ်</span>
                <span className="rounded-full bg-[#eaf4f4] px-2.5 py-1">အချက် ၄ ချက်</span>
              </div>
              <div className="mt-4 grid gap-2.5">
                {[
                  {
                    levelValue: 20,
                    title: 'အခြေခံ ၂၀ မေးခွန်း',
                    duration: '~၄ မိနစ်',
                    draft: emotionLensDraft20,
                  },
                  {
                    levelValue: 40,
                    title: 'အသေးစိတ် ၄၀ မေးခွန်း',
                    duration: '~၈ မိနစ်',
                    draft: emotionLensDraft40,
                  },
                  {
                    levelValue: 80,
                    title: 'အသေးစိတ် ၈၀ မေးခွန်း',
                    duration: '~၁၅ မိနစ်',
                    draft: emotionLensDraft80,
                  },
                  {
                    levelValue: 120,
                    title: 'အနက်ရှိုင်းဆုံး ၁၂၀ မေးခွန်း',
                    duration: '~၂၀ မိနစ်',
                    draft: emotionLensDraft120,
                  },
                ].map((item) => {
                  const answered = Object.keys(item.draft?.answers || {}).length
                  const skipped = (item.draft?.skippedQuestionIds || []).filter((id) => item.draft?.answers?.[id] === undefined).length
                  const progress = Math.round((answered / item.levelValue) * 100)
                  if (item.draft) {
                    return (
                      <div key={item.levelValue} className="rounded-xl border border-[#cce0e2] bg-[#f4f9f9] p-3">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-[#1e4a4f]">{item.title} · ဆက်လက်ဖြေဆိုရန်</span>
                          <span className="text-[#3a5a5e]">{progress}%</span>
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#d8e8ea]"><div className="h-full rounded-full bg-[#2f6d73]" style={{ width: `${progress}%` }} /></div>
                        <p className="mt-1.5 text-[11px] text-[#3a5a5e]">ဖြေပြီး {answered}/{item.levelValue} · ကျော်ထား {skipped} ခု</p>
                        <button onClick={() => onOpenEmotionLens(item.levelValue)} className="mt-2.5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#2f6d73] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#24565b]">ဆက်လက်ဖြေဆိုမယ် ({item.levelValue}) <ArrowRight size={14} /></button>
                      </div>
                    )
                  }
                  return (
                    <button key={item.levelValue} onClick={() => onOpenEmotionLens(item.levelValue)} className="flex min-h-11 w-full items-center justify-between gap-2 rounded-xl border border-[#bfd8da] bg-[#f4f9f9] px-3.5 py-2.5 text-left text-xs font-semibold text-[#1e4a4f] transition hover:bg-[#e5f1f2]">
                      <span>{item.title}</span>
                      <span className="inline-flex shrink-0 items-center gap-1.5 text-[11px] text-[#2f6d73]">{item.duration} <ArrowRight size={14} /></span>
                    </button>
                  )
                })}
              </div>
            </article>
          </div>
        </div>

        <div className="md:col-span-7">
          <Suspense fallback={<div className="h-full min-h-48 rounded-2xl border border-[#e7dce9] bg-[#fcf9fc] p-5 text-xs text-[#6b5e70]">နေ့စဉ်မေးခွန်းကို ဖွင့်နေပါသည်...</div>}>
            <DailyMindPromptCard onOpenJournal={onOpenJournal} />
          </Suspense>
        </div>

        <article className="flex flex-col justify-between rounded-2xl border border-[#e4d9e8] bg-gradient-to-br from-[#f8f3fa] via-white to-[#f6eff5] p-5 shadow-sm sm:p-6 md:col-span-5">
          <div>
            <div className="flex items-start justify-between gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#f1e7f5] text-[#6f587a]"><Brain size={24} /></span>
              <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[#6f587a] shadow-xs">ပေါင်းစည်းမြင်ကွင်း</span>
            </div>
            <h3 className="mt-4 text-lg font-bold tracking-tight text-[#493b50]">ကျွန်ုပ်၏ စိတ်ပုံရိပ် (My Mind Profile)</h3>
            <p className="mt-2 text-xs leading-6 text-[#5d5162]">TraitLens၊ InnerCompass၊ BondSense နဲ့ ValueMap တို့မှ ရလဒ်များကို တစ်နေရာတည်းမှာ ပေါင်းစည်းကြည့်ရှုပြီး ကိုယ့်ပုံရိပ်ကို ခြုံငုံသုံးသပ်နိုင်ပါတယ်။</p>
          </div>
          <button onClick={onOpenMindProfile} className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#80678f] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#725981]">
            စိတ်ပုံရိပ်ကို ကြည့်မယ် <ArrowRight size={15} />
          </button>
        </article>

        <article className="flex flex-col justify-between gap-4 rounded-2xl border border-[#e6dce9] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-6 md:col-span-12">
          <div className="flex items-start gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#f3edf5] text-[#80678f]"><BookOpen size={26}/></span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold tracking-tight text-[#514357]">Knowledge Center</h3>
                <span className="rounded-full bg-[#fff5e6] px-2.5 py-0.5 text-[11px] font-bold text-[#825824]">မူကြမ်း 0.1.0</span>
              </div>
              <p className="mt-1 text-xs font-semibold text-[#6f587a]">စိတ်ပညာနဲ့ လူ့အပြုအမူဆိုင်ရာ အသိပညာများ · စကားလုံး ၃၀</p>
              <p className="mt-1 text-xs leading-6 text-[#6b5e70]">ခက်ခဲတဲ့ စိတ်ပညာဆိုင်ရာ စကားလုံးတွေကို မြန်မာလို အဓိပ္ပာယ်၊ နေ့စဉ်ဘဝ ဥပမာနဲ့ ကွာခြားချက်တွေကို ဖတ်ရှုနိုင်ပါတယ်။</p>
            </div>
          </div>
          <button onClick={onOpenKnowledge} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-[#d9cce0] bg-[#f7f2f8] px-5 py-2.5 text-xs font-semibold text-[#6f587a] transition hover:bg-[#eee6f1]">စကားလုံးများ လေ့လာမယ် <ArrowRight size={15}/></button>
        </article>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-[#eee5ed] bg-[#fcfafd] p-5 sm:p-6">
        <div className="mb-4">
          <p className="text-xs font-semibold tracking-wide text-[#6b5e70]">SECONDARY TOOLS</p>
          <h2 className="mt-1 text-lg font-bold text-[#514357]">အခြား လေ့လာရေး ကိရိယာများ (Secondary Tools)</h2>
          <p className="mt-1 text-xs leading-6 text-[#6b5e70]">အလုပ်အကိုင် စိတ်ဝင်စားမှုနှင့် အနာဂတ်တွင် ထပ်မံထည့်သွင်းမည့် ကိရိယာများကို သီးခြားစုစည်းထားပါသည်။</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="flex flex-col rounded-2xl border border-[#e9dce7] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-2"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#f8edf1] text-[#865569]"><BriefcaseBusiness size={20}/></span><span className="rounded-full bg-[#eef5ed] px-2.5 py-1 text-[11px] font-semibold text-[#436b4f]">စတင်နိုင်ပါပြီ</span></div>
            <h3 className="mt-4 text-base font-bold text-[#514357]">Career Interest</h3>
            <p className="mt-2 flex-1 text-xs leading-6 text-[#6b5e70]">ဘယ်လိုလုပ်ဆောင်မှုတွေကို ပိုနှစ်သက်သလဲ၊ ဘယ်လိုအလုပ်ပတ်ဝန်းကျင်တွေကို စိတ်ဝင်စားသလဲဆိုတာ သီးခြားလေ့လာပါ။</p>
            <p className="mt-4 inline-flex flex-wrap items-center gap-2 text-[11px] font-semibold text-[#865569]"><span>မေးခွန်း ၃၀ · စိတ်ဝင်စားမှု အမျိုးအစား ၆ မျိုး</span><span className="inline-flex items-center gap-1 rounded-full bg-[#f8edf1] px-2 py-0.5"><Clock3 size={11} /> ~၅ မိနစ်</span></p>
            {careerDraft ? (
              <div className="mt-3 rounded-xl bg-[#faf6fb] p-3">
                <div className="flex items-center justify-between text-[11px]"><span className="font-semibold text-[#725f7a]">ဖြေဆိုမှု ဆက်လက်လုပ်ဆောင်ရန်</span><span className="text-[#6b5e70]">{careerProgress}%</span></div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e9e1eb]"><div className="h-full rounded-full bg-[#9c82aa]" style={{ width: `${careerProgress}%` }} /></div>
                <p className="mt-2 text-[11px] text-[#6b5e70]">ဖြေပြီး {careerAnswered} ခု · နောက်ဆုံး {formatDate(careerDraft.updatedAt)}</p>
                <button onClick={onStartCareer} className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#80678f] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#725981]">ဆက်လက်ဖြေဆိုမယ် <ArrowRight size={15}/></button>
              </div>
            ) : (
              <button onClick={onStartCareer} className="mt-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#80678f] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#725981]">စတင်ဖြေဆိုမယ် <ArrowRight size={15}/></button>
            )}
          </article>
          <article className="flex flex-col rounded-2xl border border-[#eee5ed] bg-white/90 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-2"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#f1f4e9] text-[#436b4f]"><Target size={20}/></span><span className="rounded-full bg-[#f1f4e9] px-2.5 py-1 text-[11px] font-semibold text-[#436b4f]">ပြင်ဆင်နေဆဲ</span></div>
            <h3 className="mt-4 text-base font-bold text-[#514357]">Skills Assessment</h3>
            <p className="mt-2 flex-1 text-xs leading-6 text-[#6b5e70]">ကိုယ်တိုင်အကဲဖြတ်တဲ့ မေးခွန်းတွေနဲ့ လက်တွေ့လေ့ကျင့်ခန်းတွေကို ပေါင်းစပ်ပြီး ကိုယ့်ကျွမ်းကျင်မှုကို သီးခြားလေ့လာနိုင်ဖို့ ပြင်ဆင်နေပါတယ်။</p>
            <p className="mt-4 text-[11px] font-semibold text-[#436b4f]">မေးခွန်း + လက်တွေ့စမ်းသပ်မှု</p>
            <span className="mt-3 inline-flex min-h-11 items-center justify-center rounded-xl border border-[#e3e9d9] bg-[#f8faf5] px-4 py-2.5 text-xs font-semibold text-[#436b4f]">နောက်အဆင့်တွင် ဖွင့်လှစ်မည်</span>
          </article>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-[#eee5ed] bg-white/80 p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div><div className="flex items-center gap-2 text-sm font-bold text-[#514357]"><History size={17} className="text-[#80678f]" /> မကြာသေးမီက ပြီးဆုံးထားသော ဆန်းစစ်မှုများ</div><p className="mt-1 text-xs text-[#6b5e70]">ကိုယ်တိုင်ဖြေဆိုပြီး သိမ်းဆည်းထားသော ရလဒ်များကို ပြန်ကြည့်နိုင်ပါတယ်။</p></div>
          <SecondaryButton onClick={onHistory} icon={ChevronRight}>မှတ်တမ်းအားလုံးကြည့်မယ်</SecondaryButton>
        </div>
        {recentPersonalityHistory.length > 0 ? (
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {recentPersonalityHistory.map((record) => {
              const isCareer = record.assessmentType === 'careerInterest'
              const isInnerCompass = record.assessmentType === 'innerCompass'
              const isBondSense = record.assessmentType === 'bondSense'
              const isValueMap = record.assessmentType === 'valueMap'
              const isEmotionLens = record.assessmentType === 'emotionLens'
              const profile = !isCareer && !isInnerCompass && !isBondSense && !isValueMap && !isEmotionLens && record.scores ? getPersonalityProfile(record.scores) : null
              return (
                <button key={record.id} onClick={() => onOpenRecord(record)} className="rounded-xl border border-[#eee5ed] bg-[#fcfafc] p-4 text-left transition hover:border-[#d8c7df] hover:bg-[#faf6fb]">
                  <div className="flex items-center justify-between gap-2"><span className="rounded-full bg-[#f3edf5] px-2.5 py-1 text-[11px] font-semibold text-[#80678f]">{isCareer ? 'Career Interest' : isInnerCompass ? 'InnerCompass' : isBondSense ? 'BondSense' : isValueMap ? 'ValueMap' : isEmotionLens ? 'EmotionLens' : `${record.level || record.questionCount || 30} မေးခွန်း`}</span><ArrowRight size={14} className="text-[#6b5e70]" /></div>
                  <p className="mt-3 text-sm font-bold text-[#5b4b60]">{isCareer ? `စိတ်ဝင်စားမှုအတိုကောက် ${record.careerCode || ''}` : isInnerCompass ? 'InnerCompass · ကိုယ်တိုင်သုံးသပ်မှု' : isBondSense ? 'BondSense · ဆက်ဆံရေးသုံးသပ်မှု' : isValueMap ? 'ValueMap · ဘဝတန်ဖိုးသုံးသပ်မှု' : isEmotionLens ? 'EmotionLens · စိတ်ခံစားချက်သုံးသပ်မှု' : (profile?.title || 'TraitLens')}</p>
                  <p className="mt-1 text-[11px] text-[#6b5e70]">{formatDate(record.createdAt)}</p>
                  <p className="mt-3 text-[11px] font-semibold text-[#80678f]">ရလဒ်ကြည့်မယ်</p>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="mt-4 rounded-xl bg-[#faf7fa] px-4 py-5 text-center">
            <p className="text-sm font-semibold text-[#6f5e76]">စမ်းသပ်မှုမှတ်တမ်း မရှိသေးပါ။</p>
            <p className="mt-1 text-xs leading-6 text-[#6b5e70]">ဆန်းစစ်မှုတစ်ခုခု ပြီးဆုံးသွားတဲ့အခါ ရလဒ်ကို ဒီနေရာမှာ အလွယ်တကူ ပြန်ကြည့်နိုင်ပါမယ်။</p>
          </div>
        )}
      </section>

      <section className="mt-6 rounded-2xl border border-[#e9e0eb] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#f3edf5] text-[#80678f]"><ShieldCheck size={19} /></span>
            <h2 className="mt-3 text-base font-bold text-[#514357]">သင့်ရဲ့ အချက်အလက်တွေကို အရန်သိမ်းထားပါ</h2>
            <p className="mt-2 text-xs leading-7 text-[#6b5e70]">ဖြေဆိုထားတဲ့ အဖြေတွေ၊ မပြီးသေးတဲ့ Draft တွေနဲ့ ရလဒ်မှတ်တမ်းတွေကို JSON ဖိုင်အဖြစ် သိမ်းနိုင်ပါတယ်။ Browser Data ရှင်းမိတာ၊ ဖုန်းပြောင်းတာမျိုးရှိရင် Backup ဖိုင်ကနေ ပြန်လည်ထည့်သွင်းနိုင်ပါတယ်။</p>
          </div>
          <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-[#f1f6ef] px-3 py-1.5 text-[11px] font-semibold text-[#436b4f]"><LockKeyhole size={12} /> ဒီစက်ထဲမှာသာ သိမ်းဆည်း</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <button onClick={onExportBackup} className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#80678f] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#725981]"><Download size={16} /> JSON Backup ထုတ်ယူမယ်</button>
          <button onClick={onImportBackup} className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#e5dce6] bg-[#fcfafc] px-4 py-3 text-sm font-semibold text-[#6e5a77] transition hover:bg-[#f7f1f8]"><Upload size={16} /> Backup ဖိုင် ပြန်ထည့်မယ်</button>
        </div>
        <div className="mt-3 flex gap-2 rounded-xl bg-[#fbf6f2] p-3 text-[11px] leading-6 text-[#825824]"><FileJson size={15} className="mt-0.5 shrink-0" /><p>Backup ဖိုင်ထဲမှာ သင်ဖြေဆိုထားတဲ့ ကိုယ်ရေးကိုယ်တာအဖြေများနဲ့ ရလဒ်တွေ ပါဝင်နိုင်ပါတယ်။ ကိုယ်ယုံကြည်ရတဲ့နေရာမှာသာ သိမ်းဆည်းပြီး အခြားသူထံ မမျှဝေပါနဲ့။</p></div>
      </section>
      <p className="mx-auto mt-7 max-w-3xl text-center text-[11px] leading-6 text-[#6b5e70]">ဤစမ်းသပ်မှုသည် ကိုယ့်ကိုယ်ကို ပြန်လည်သုံးသပ်ရန်အတွက်သာ ဖြစ်ပြီး စိတ်ကျန်းမာရေးဆိုင်ရာ ရောဂါရှာဖွေခြင်း သို့မဟုတ် အလုပ်အကိုင်အာမခံချက် ပေးခြင်း မဟုတ်ပါ။</p>
    </main>
  )
}

function InstructionsPage({ level, onBack, onBegin, storageAlertVisible, onExportBackup, onDismissStorageError }) {
  const selected = LEVELS.find((item) => item.value === Number(level)) || LEVELS[0]
  const [acknowledged, setAcknowledged] = useState(false)
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <button onClick={onBack} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#716679] hover:text-[#614b6b]"><ArrowLeft size={16} /> နောက်သို့</button>
      <StorageWriteAlert visible={storageAlertVisible} onExportBackup={onExportBackup} onDismiss={onDismissStorageError} />
      <section className="overflow-hidden rounded-[2rem] border border-[#e5d8e9] bg-white card-shadow">
        <div className="bg-gradient-to-br from-[#f2eaf5] via-[#fbf8fb] to-[#f8eff2] p-6 sm:p-9">
          <div className="flex items-center gap-4">
            <span className="grid h-[76px] w-[76px] shrink-0 place-items-center rounded-2xl bg-white/90 text-[#80678f] shadow-sm"><TraitLensLogo size={58}/></span>
            <div>
              <p className="text-xs font-semibold tracking-[0.12em] text-[#745b83]">TRAITLENS</p>
              <h1 className="mt-1 text-xl font-bold text-[#493c4d] sm:text-2xl">ပင်ကိုစရိုက်ကို လေ့လာခြင်း</h1>
              <p className="mt-1 text-xs text-[#6f6276]">အချက် ၅ ချက် · {selected.value} မေးခွန်း · {selected.label}</p>
            </div>
          </div>
          <h2 className="mt-7 text-2xl font-bold leading-relaxed text-[#493c4d] sm:text-3xl">မစတင်မီ သိထားသင့်သော အချက်များ</h2>
          <p className="mt-3 text-sm leading-8 text-[#716679]">ဒီဆန်းစစ်မှုဟာ သင့်ရဲ့ ပုံမှန်အတွေးအခေါ်၊ စိတ်ခံစားမှုနဲ့ အပြုအမူပုံစံတွေကို ပြန်လည်လေ့လာဖို့ ရည်ရွယ်ပါတယ်။ သင့်ကို အမျိုးအစားတစ်ခုတည်းနဲ့ အပြီးသတ်သတ်မှတ်ဖို့ မဟုတ်ပါဘူး။</p>
        </div>
        <div className="space-y-5 p-6 sm:p-9">
          <div className="grid gap-3 sm:grid-cols-2">
            <article className="rounded-2xl bg-[#faf7fb] p-4"><p className="text-xs font-bold text-[#6f5879]">ဘာကို လေ့လာပေးသလဲ။</p><p className="mt-2 text-xs leading-7 text-[#6f6276]">အတွေးအခေါ်သစ်ကို လက်ခံပုံ၊ စနစ်တကျလုပ်ဆောင်ပုံ၊ လူမှုဆက်ဆံရေး၊ ပူးပေါင်းဆောင်ရွက်ပုံနဲ့ စိတ်ခံစားမှုတုံ့ပြန်ပုံတို့ကို အဓိက အချက် ၅ ချက်အဖြစ် လေ့လာပါတယ်။</p></article>
            <article className="rounded-2xl bg-[#faf7fb] p-4"><p className="text-xs font-bold text-[#6f5879]">ဘာကို မဆုံးဖြတ်ပေးသလဲ။</p><p className="mt-2 text-xs leading-7 text-[#6f6276]">ဉာဏ်ရည်၊ ကိုယ်ကျင့်တရား၊ စိတ်ကျန်းမာရေးရောဂါ၊ အလုပ်အကိုင်အောင်မြင်မှု သို့မဟုတ် သင့်အနာဂတ်ကို အာမခံပြီး မဆုံးဖြတ်ပေးပါ။</p></article>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#5c4c62]">ဘယ်လိုဖြေဆိုသင့်သလဲ။</h3>
            <div className="mt-3 space-y-2.5">
              {[
                ['ကိုယ့်ရဲ့ ပုံမှန်အပြုအမူကို အခြေခံပါ', 'ဖြစ်ချင်တဲ့ပုံစံကို မရွေးဘဲ နေ့စဉ်ဘဝမှာ အများအားဖြင့် ဘယ်လိုပြုမူတတ်သလဲကို စဉ်းစားပါ။'],
                ['အဖြေမှန်၊ အဖြေမှား မရှိပါ', 'အခြားသူတွေ ဘယ်လိုဖြေမလဲဆိုတာ မစဉ်းစားဘဲ ကိုယ့်အတွေ့အကြုံနဲ့ အနီးစပ်ဆုံး အဖြေကို ရွေးပါ။'],
                ['လက်ရှိစိတ်အခြေအနေတစ်ခုတည်းနဲ့ မဆုံးဖြတ်ပါနဲ့', 'မကြာသေးမီက အတွေ့အကြုံအပြင် ပုံမှန်ဖြစ်နေတတ်တဲ့ အပြုအမူကိုပါ စဉ်းစားပါ။'],
                ['မေးခွန်းကို ကျော်ပြီး ပြန်ဖြေနိုင်ပါတယ်', 'ကျော်ထားတဲ့ မေးခွန်းတွေကို နောက်ဆုံးမှာ ပြန်စစ်နိုင်ပြီး မဖြေသေးတာတွေကို အချိန်မရွေး ပြန်ဖြေနိုင်ပါတယ်။'],
                ['အချိန်မရွေး ခဏရပ်နိုင်ပါတယ်', 'အဖြေတွေကို ဒီ Browser ထဲမှာ အလိုအလျောက်သိမ်းထားပြီး ပြန်ဝင်တဲ့အခါ အရင်နေရာကနေ ဆက်ဖြေနိုင်ပါတယ်။'],
              ].map(([title, body]) => <div key={title} className="flex gap-3 rounded-2xl border border-[#f0eaf1] bg-white p-3.5"><span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-[#f3edf5] text-[#80678f]"><Check size={16}/></span><div><p className="text-xs font-bold text-[#5c4c62]">{title}</p><p className="mt-1 text-xs leading-6 text-[#716679]">{body}</p></div></div>)}
            </div>
          </div>
          <div className="rounded-2xl border border-[#eee4ed] bg-[#fcfafb] p-4">
            <p className="text-xs font-bold text-[#6f5879]">ဖြေဆိုမှုနဲ့ ရလဒ်အကြောင်း</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-xs leading-6 text-[#6f6276]">
              <li>မေးခွန်းတစ်ခုစီမှာ အဖြေ ၁ မှ ၅ အထိ ရွေးချယ်နိုင်ပါတယ်။</li>
              <li>ရလဒ်ရမှတ်ဟာ သင့်အဖြေများကို အညွှန်းအဖြစ် ပြောင်းလဲဖော်ပြခြင်းသာဖြစ်ပြီး လူဦးရေနဲ့ နှိုင်းယှဉ်ထားတဲ့ အဆင့်သတ်မှတ်ချက် မဟုတ်ပါ။</li>
              <li>ဒီမေးခွန်းအစုကို မြန်မာဘာသာအတွက် ကိုယ်ပိုင်ရေးဆွဲထားပြီး စမ်းသပ်အတည်ပြုမှု ဆက်လက်လုပ်ဆောင်ရန် လိုအပ်ပါတယ်။</li>
            </ul>
          </div>
          <div className="flex gap-3 rounded-2xl border border-[#e7e0e9] bg-[#f8f5f8] p-4"><ShieldCheck size={19} className="mt-0.5 shrink-0 text-[#6b5e70]"/><div><p className="text-xs font-bold text-[#66576b]">ကိုယ်ရေးအချက်အလက်နဲ့ သိမ်းဆည်းမှု</p><p className="mt-1 text-xs leading-6 text-[#716679]">{STORAGE_HINT} အရေးကြီးတဲ့အဖြေတွေ မပျောက်စေဖို့ JSON Backup ကို ပုံမှန်ထုတ်ထားပါ။ ဒီဆန်းစစ်မှုကို အချိန်မရွေး ရပ်နိုင်ပါတယ်။</p></div></div>
          <Suspense fallback={null}>
            <CalmingBreathPause theme="trait" />
          </Suspense>
          <div className="rounded-2xl border border-[#eadfe9] bg-[#fbf7fb] p-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input type="checkbox" checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#80678f]" />
              <span className="text-xs leading-6 text-[#66576b]">အထက်ပါအချက်များကို ဖတ်ရှုပြီး နားလည်ပါသည်။ ဒီဆန်းစစ်မှုကို ကိုယ့်ကိုယ်ကို ပြန်လည်သုံးသပ်ရန်အတွက်သာ အသုံးပြုမည်ဖြစ်ကြောင်း သိရှိပါသည်။</span>
            </label>
          </div>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><SecondaryButton onClick={onBack}>ပင်မစာမျက်နှာ</SecondaryButton><PrimaryButton onClick={onBegin} disabled={!acknowledged}>နားလည်ပါပြီ၊ မေးခွန်းစမယ်</PrimaryButton></div>
        </div>
      </section>
    </main>
  )
}

function AssessmentPage({ questions, answers, skippedQuestionIds, questionIndex, onAnswer, onPrevious, onNext, onSkip, onReview, onExit, storageError, storageAlertVisible, onExportBackup, onDismissStorageError, onOpenKnowledgeTerm }) {
  const question = questions[questionIndex]
  const selectedAnswer = answers[question.id]
  const answeredCount = questions.filter((item) => answers[item.id] !== undefined).length
  const skippedCount = skippedQuestionIds.filter((id) => answers[id] === undefined).length
  const progress = questions.length ? (answeredCount / questions.length) * 100 : 0
  const isLast = questionIndex === questions.length - 1

  return (
    <main className="mx-auto max-w-3xl px-4 pb-36 pt-7 sm:px-6 sm:py-12">
      <div className="mb-7 flex items-center justify-between gap-3">
        <button onClick={onExit} className="inline-flex items-center gap-2 text-sm font-semibold text-[#6b5e70] hover:text-[#614b6b]"><ArrowLeft size={16} /> ခဏရပ်မယ်</button>
        {storageError ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e7b8b8] bg-[#fdf2f2] px-3 py-1.5 text-[11px] font-semibold text-[#9a3b3b] shadow-sm"><AlertTriangle size={12} /> သိမ်းဆည်းမှု မအောင်မြင်ပါ</span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-[#6b5e70] shadow-sm"><LockKeyhole size={12} /> အလိုအလျောက် သိမ်းဆည်းနေသည်</span>
        )}
      </div>
      <StorageWriteAlert visible={storageAlertVisible} onExportBackup={onExportBackup} onDismiss={onDismissStorageError} />
      <section className="rounded-[2rem] border border-[#ebe5dc] bg-[#fffdf9] p-5 card-shadow sm:p-9">
        <div className="flex items-end justify-between gap-3">
          <div><p className="text-xs font-semibold tracking-wide text-[#524b59]">PERSONALITY ASSESSMENT · {questions.length} QUESTIONS</p><h1 className="mt-2 text-xl font-bold text-[#242029] sm:text-2xl">မေးခွန်းဖြေဆိုခြင်း</h1></div>
          <div className="text-right"><div className="text-xl font-bold tabular-nums text-[#80678f]">{String(questionIndex + 1).padStart(2, '0')}<span className="text-sm font-medium text-[#524b59]"> / {questions.length}</span></div><p className="text-[11px] text-[#524b59]">ဖြေပြီး {answeredCount} · ကျော်ထား {skippedCount}</p></div>
        </div>
        <div className="mt-5 flex items-center justify-between text-[11px] text-[#524b59]"><span>စုစုပေါင်း ဖြေဆိုမှု</span><span>{Math.round(progress)}%</span></div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#efe9df]"><div className="progress-fill h-full rounded-full bg-gradient-to-r from-[#9c82aa] to-[#c59aab]" style={{ width: `${progress}%` }} /></div>
        <div key={question.id} className="question-card-enter">
          <div className="my-7 min-h-32 rounded-[1.5rem] border border-[#ebe5dc] bg-gradient-to-br from-[#faf6f1] to-[#fcf9f5] px-5 py-7 sm:px-7 sm:py-8"><p className="text-[11px] font-semibold tracking-wide text-[#524b59]">မေးခွန်း {questionIndex + 1}</p><h2 className="mt-3 text-lg font-bold leading-[1.9] text-[#242029] sm:text-[1.35rem]">{question.text}</h2><Suspense fallback={null}><KnowledgeInlineHelp questionText={question.text} theme="trait" onOpenKnowledgeTerm={onOpenKnowledgeTerm} /></Suspense></div>
          <Suspense fallback={<div className="h-36 rounded-[1.5rem] border border-[#ebe5dc] bg-[#faf8f5]" />}>
            <LikertScaleSelector
              options={ANSWER_OPTIONS}
              value={selectedAnswer}
              onChange={(val) => onAnswer(question.id, val)}
              accent="plum"
            />
          </Suspense>
        </div>
        <div className="no-print mt-8 hidden flex-wrap items-center justify-between gap-3 border-t border-[#f0eaf0] pt-5 sm:flex">
          <SecondaryButton onClick={onPrevious} icon={ArrowLeft} disabled={questionIndex === 0}>ယခင်</SecondaryButton>
          <div className="flex flex-wrap items-center gap-2">
            {!selectedAnswer && <button onClick={onSkip} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-dashed border-[#d8c8dc] bg-[#fcf9fc] px-4 py-2.5 text-sm font-semibold text-[#866d90] hover:bg-[#f7f1f8]">ဒီမေးခွန်းကို ကျော်မယ် <ArrowRight size={15} /></button>}
            <PrimaryButton onClick={isLast ? onReview : onNext} disabled={!selectedAnswer} icon={isLast ? ClipboardCheck : ArrowRight}>{isLast ? 'အဖြေတွေ ပြန်စစ်မယ်' : 'နောက်တစ်ခု'}</PrimaryButton>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[#faf7fa] px-4 py-3"><p className="text-[11px] leading-5 text-[#6b5e70]">မသေချာသေးတဲ့ မေးခွန်းကို ကျော်ပြီး နောက်မှ ပြန်ဖြေနိုင်ပါတယ်။</p><button onClick={onReview} className="text-xs font-semibold text-[#80678f] hover:text-[#654e70]">မေးခွန်းစာရင်းကြည့်မယ်</button></div>
      </section>
      <MobileQuestionActions
        onPrevious={onPrevious}
        onNext={isLast ? onReview : onNext}
        onSkip={onSkip}
        onReview={onReview}
        canPrevious={questionIndex > 0}
        canNext={selectedAnswer !== undefined}
        showSkip={selectedAnswer === undefined}
        isLast={isLast}
      />
      <p className="mt-5 text-center text-[11px] leading-6 text-[#6b5e70]">{STORAGE_HINT}</p>
    </main>
  )
}

function ReviewPage({ questions, answers, skippedQuestionIds, onGoTo, onFinish, onBack, storageAlertVisible, onExportBackup, onDismissStorageError }) {
  const [filter, setFilter] = useState('incomplete')
  const answered = questions.filter((question) => answers[question.id] !== undefined)
  const skipped = questions.filter((question) => answers[question.id] === undefined && skippedQuestionIds.includes(question.id))
  const unanswered = questions.filter((question) => answers[question.id] === undefined && !skippedQuestionIds.includes(question.id))
  const complete = unanswered.length === 0 && skipped.length === 0
  const visibleQuestions = filter === 'answered' ? answered : filter === 'skipped' ? skipped : filter === 'unanswered' ? unanswered : [...skipped, ...unanswered]

  const statusFor = (question) => {
    if (answers[question.id] !== undefined) return 'answered'
    if (skippedQuestionIds.includes(question.id)) return 'skipped'
    return 'unanswered'
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <button onClick={onBack} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#6b5e70] hover:text-[#614b6b]"><ArrowLeft size={16} /> မေးခွန်းသို့ ပြန်သွားမယ်</button>
      <StorageWriteAlert visible={storageAlertVisible} onExportBackup={onExportBackup} onDismiss={onDismissStorageError} />
      <section className="rounded-[2rem] border border-[#eee4ed] bg-white p-5 card-shadow sm:p-8">
        <p className="text-xs font-semibold tracking-wide text-[#6b5e70]">ASSESSMENT REVIEW</p>
        <h1 className="mt-2 text-2xl font-bold text-[#4c3d51]">ဖြေဆိုထားတာတွေကို ပြန်စစ်ပါ</h1>
        <p className="mt-2 text-xs leading-6 text-[#6b5e70]">ကျော်ထားတဲ့ မေးခွန်းနဲ့ မဖြေရသေးတဲ့ မေးခွန်းတွေကို ရွေးပြီး တိုက်ရိုက်ပြန်ဖြေနိုင်ပါတယ်။</p>
        <div className="mt-6 grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-[#f1f7f2] p-3"><p className="text-2xl font-bold text-[#436b4f] tabular-nums">{answered.length}</p><p className="mt-1 text-[11px] text-[#436b4f]">ဖြေပြီး</p></div>
          <div className="rounded-xl bg-[#fff7ed] p-3"><p className="text-2xl font-bold text-[#825824] tabular-nums">{skipped.length}</p><p className="mt-1 text-[11px] text-[#825824]">ကျော်ထား</p></div>
          <div className="rounded-xl bg-[#f7f3f8] p-3"><p className="text-2xl font-bold text-[#6b5e70] tabular-nums">{unanswered.length}</p><p className="mt-1 text-[11px] text-[#6b5e70]">မဖြေရသေး</p></div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            ['incomplete', `ပြန်ဖြေရန် (${skipped.length + unanswered.length})`],
            ['skipped', `ကျော်ထား (${skipped.length})`],
            ['unanswered', `မဖြေရသေး (${unanswered.length})`],
            ['answered', `ဖြေပြီး (${answered.length})`],
          ].map(([value, label]) => <button key={value} onClick={() => setFilter(value)} className={cn('rounded-full px-3 py-2 text-[11px] font-semibold transition', filter === value ? 'bg-[#80678f] text-white' : 'bg-[#f5f0f6] text-[#826e8a] hover:bg-[#eee6f0]')}>{label}</button>)}
        </div>
        <div className="mt-4 rounded-2xl border border-[#f0eaf0] p-3 sm:p-4">
          {visibleQuestions.length === 0 ? (
            <div className="py-8 text-center"><CheckCircle2 className="mx-auto text-[#436b4f]" size={30} /><p className="mt-2 text-sm font-semibold text-[#5e7d66]">ဒီအမျိုးအစားမှာ မေးခွန်းမရှိပါဘူး။</p></div>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2">
              {visibleQuestions.map((question) => {
                const status = statusFor(question)
                return (
                  <button key={question.id} onClick={() => onGoTo(questions.findIndex((item) => item.id === question.id))} className="flex min-w-0 items-start gap-3 rounded-xl border border-[#f0eaf0] bg-white p-3 text-left transition hover:border-[#d8c8dc] hover:bg-[#fcf9fc]">
                    <span className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-bold', status === 'answered' ? 'bg-[#edf6ef] text-[#436b4f]' : status === 'skipped' ? 'bg-[#fff4e8] text-[#825824]' : 'bg-[#f5f0f6] text-[#6b5e70]')}>{questions.findIndex((item) => item.id === question.id) + 1}</span>
                    <span className="min-w-0 flex-1"><span className="block text-[11px] font-semibold leading-5 text-[#66566c]">{question.text}</span><span className="mt-1 block text-[11px] text-[#6b5e70]">{status === 'answered' ? 'ဖြေပြီး · ပြန်ပြင်နိုင်သည်' : status === 'skipped' ? 'ကျော်ထား · ပြန်ဖြေနိုင်သည်' : 'မဖြေရသေး'}</span></span>
                    <ChevronRight size={15} className="mt-1 shrink-0 text-[#6b5e70]" />
                  </button>
                )
              })}
            </div>
          )}
        </div>
        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-[#f0eaf0] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] leading-5 text-[#6b5e70]">{complete ? 'မေးခွန်းအားလုံး ဖြေပြီးပါပြီ။ ရလဒ်တွက်ချက်နိုင်ပါပြီ။' : 'ရလဒ်ကြည့်ရန် မေးခွန်းအားလုံးကို ဖြေဆိုပြီးမှ ဆက်လုပ်နိုင်ပါတယ်။'}</p>
          <PrimaryButton onClick={onFinish} disabled={!complete} icon={CheckCircle2}>ရလဒ်တွက်ချက်မယ်</PrimaryButton>
        </div>
      </section>
    </main>
  )
}

function TraitReportCard({ trait, score }) {
  const insight = getTraitReportInsight(trait.id, score)
  return (
    <article className="rounded-2xl border border-[#eee5ed] bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#f5eff6] text-[#80678f]"><TraitIcon id={trait.id} size={18} /></span>
          <div className="min-w-0"><h3 className="text-sm font-bold leading-6 text-[#58495e]">{trait.name}</h3><p className="mt-0.5 text-[11px] text-[#6b5e70]">{trait.en}</p></div>
        </div>
        <div className="shrink-0 text-right"><div className="text-lg font-bold tabular-nums text-[#80678f]">{score}<span className="text-[11px] font-medium text-[#6b5e70]"> / 100</span></div><div className="text-[11px] text-[#6b5e70]">{getScoreBand(score)}</div></div>
      </div>
      <Suspense fallback={null}><BalancedSpectrumBar score={score} poleId={trait.id} /></Suspense>
      {insight && <>
        <p className="mt-3 rounded-xl bg-[#faf7fb] px-3 py-2 text-[11px] font-semibold leading-6 text-[#80678f]">{insight.label}</p>
        <div className="mt-4 space-y-3 text-xs leading-7 text-[#6b5e70]">
          <div><p className="font-bold text-[#625368]">ဒီအဖြေတွေက ဘာကို ညွှန်းနိုင်သလဲ။</p><p>{insight.interpretation}</p></div>
          <div className="rounded-xl bg-[#fbf8f6] p-3"><p className="font-bold text-[#8b7162]">နေ့စဉ်ဘဝ ဥပမာ</p><p>{insight.example}</p></div>
          <div><p className="font-bold text-[#625368]">ကိုယ့်ကိုယ်ကို ပြန်မေးကြည့်ရန်</p><p>{insight.reflection}</p></div>
          <div className="rounded-xl border border-[#eee7ef] p-3"><p className="font-bold text-[#80678f]">စမ်းကြည့်နိုင်တဲ့ အဆင့်ငယ်</p><p>{insight.tryThis}</p></div>
        </div>
      </>}
    </article>
  )
}

function ResultsPage({ record, onHome, onRetake, storageAlertVisible, onExportBackup, onDismissStorageError }) {
  const [facetInsightLoader, setFacetInsightLoader] = useState(null)
  const result = useMemo(() => {
    if (!record) return null
    return { scores: record.scores, profile: getPersonalityProfile(record.scores), facetScores: record.facetScores || null }
  }, [record])

  useEffect(() => {
    if ((record?.level ?? 0) >= 120 && !facetInsightLoader) {
      import('./utils/facetInterpretations.js').then((mod) => setFacetInsightLoader(() => mod.getFacetReportInsight))
    }
  }, [record?.level, facetInsightLoader])

  if (!record || !result) return null

  const { scores, profile, facetScores } = result
  const chartNames = { openness: 'စူးစမ်းမှု', conscientiousness: 'တာဝန်ယူမှု', extraversion: 'တက်ကြွမှု', agreeableness: 'စာနာမှု', emotionalStability: 'စိတ်တည်ငြိမ်မှု' }
  const chartData = TRAITS.map((trait) => ({ trait: chartNames[trait.id], score: scores[trait.id]?.score ?? 0 }))
  const primaryInsight = getTraitReportInsight(profile.primary.id, scores[profile.primary.id]?.score ?? 0)
  const secondaryInsight = getTraitReportInsight(profile.secondary.id, scores[profile.secondary.id]?.score ?? 0)
  const lifeDomains = getTraitLifeDomainSummary(scores)
  const narrative = profile.topScoresAreClose
    ? `သင့်အဖြေတွေထဲမှာ ${profile.primary.name} နဲ့ ${profile.secondary.name} ဆိုင်ရာ အညွှန်းရမှတ်တွေ နီးစပ်နေပါတယ်။ ဒီအချက်နှစ်ခုကို သင့်အတွေ့အကြုံနဲ့ ဆက်စပ်ပြီး လေ့လာကြည့်နိုင်ပါတယ်။ ရလဒ်က သင့်ကို အမျိုးအစားတစ်ခုတည်းအဖြစ် အပြီးသတ်သတ်မှတ်တာ မဟုတ်ပါ။`
    : `ဒီဆန်းစစ်မှုရဲ့ အချက် ၅ ချက်အတွင်း နှိုင်းယှဉ်ကြည့်တဲ့အခါ ${profile.primary.name} နဲ့ ${profile.secondary.name} ဆိုင်ရာ အညွှန်းရမှတ်တွေ ပိုမြင့်နေပါတယ်။ ဒီအချက်တွေက သင့်ရဲ့ လက်ရှိအဖြေရွေးချယ်မှုပုံစံကို ဖော်ပြတာဖြစ်ပြီး အမြဲတမ်းတူညီနေမယ်လို့ မဆိုလိုပါ။`

  const downloadReport = () => {
    const lines = [
      'ကိုယ့်ကိုယ်ကို ရှာဖွေခြင်း — ပင်ကိုစရိုက်အစီရင်ခံစာ',
      `ဖြေဆိုသည့်နေ့: ${formatDate(record.createdAt)}`,
      `ဆန်းစစ်မှုအဆင့်: ${record.level || record.questionCount || 30} မေးခွန်း`,
      'အကျဉ်းချုပ်: သင့်အဖြေများအတွင်း ပိုမိုထင်ရှားနေသော အချက်များ',
      narrative,
      '', 'ပင်ကိုစရိုက် အချက် ၅ ချက်၏ ရလဒ်နှင့် ရှင်းလင်းချက်:',
      ...TRAITS.flatMap((trait) => {
        const score = scores[trait.id]?.score ?? 0
        const insight = getTraitReportInsight(trait.id, score)
        return [
          `${trait.name}: ${score}/100 (${getScoreBand(score)})`,
          insight?.label || '', insight?.interpretation || '',
          `နေ့စဉ်ဘဝ ဥပမာ: ${insight?.example || ''}`,
          `ပြန်လည်စဉ်းစားရန်: ${insight?.reflection || ''}`,
          `စမ်းကြည့်ရန်: ${insight?.tryThis || ''}`, '',
        ]
      }),
      'နေ့စဉ်ဘဝ ကဏ္ဍ ၃ ခုအလိုက် ပြန်လည်သုံးသပ်ချက်:',
      ...lifeDomains.flatMap((domain) => [
        `${domain.title} (${domain.subtitle}): ${domain.summary}`,
        `ပြန်လည်စဉ်းစားရန်: ${domain.prompt}`,
        '',
      ]),
      ...(record.level >= 120 && facetScores ? ['', 'အသေးစိတ် အချက် ၃၀ ၏ အညွှန်းရမှတ်:', ...FACETS.map((facet) => {
        const score = facetScores[facet.id]?.score ?? 0
        const facetInsight = facetInsightLoader?.(facet.id, score)
        return `${facet.name}: ${score}/100${facetInsight?.text ? ` — ${facetInsight.text}` : ''}`
      })] : []),
      '', REPORT_INTERPRETATION_NOTICE,
    ]
    downloadTextFile(
      `self-discovery-report-${new Date(record.createdAt).toISOString().slice(0, 10)}.txt`,
      lines.join('\n'),
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-28 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8">
      <StorageWriteAlert visible={storageAlertVisible} onExportBackup={onExportBackup} onDismiss={onDismissStorageError} />
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3"><button onClick={onHome} className="inline-flex items-center gap-2 text-sm font-semibold text-[#6b5e70] hover:text-[#614b6b]"><ArrowLeft size={16} /> ပင်မစာမျက်နှာ</button><div className="flex flex-wrap gap-2"><SecondaryButton onClick={downloadReport} icon={Download}>အစီရင်ခံစာ သိမ်းမယ်</SecondaryButton><Suspense fallback={null}><ResultShareCardButton getCardConfig={() => ({ preset: 'traitLens', record, scores })} /></Suspense><SecondaryButton onClick={() => window.print()} icon={BookOpen}>Print</SecondaryButton></div></div>
      <ReportSectionNavigation items={[
        { id: 'trait-report-overview', label: 'အနှစ်ချုပ်' },
        { id: 'trait-report-areas', label: 'အချက် ၅ ချက်' },
        { id: 'trait-report-domains', label: 'နေ့စဉ်ဘဝ ကဏ္ဍ ၃ ခု' },
        ...(record.level >= 120 && facetScores ? [{ id: 'trait-report-facets', label: 'အသေးစိတ် ၃၀ ချက်' }] : []),
        { id: 'trait-report-notes', label: 'ရလဒ်ဖတ်ရှုရန်' },
      ]} />
      <section id="trait-report-overview" className="scroll-mt-28 print-card overflow-hidden rounded-[2rem] border border-[#eee4ed] bg-gradient-to-br from-[#f0e9f3] via-[#fbf7f6] to-[#f7edf0] p-6 card-shadow sm:p-10">
        <div className="mx-auto max-w-3xl text-center"><span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-3 py-1.5 text-xs font-semibold text-[#80678f]"><CheckCircle2 size={14} /> ဆန်းစစ်မှု ပြီးဆုံးပါပြီ</span><p className="mt-5 text-xs font-semibold tracking-[0.15em] text-[#6b5e70]">TRAITLENS · PERSONALITY PROFILE</p><h1 className="mt-3 text-2xl font-bold leading-relaxed text-[#493a4e] sm:text-3xl">သင့်အဖြေများအတွင်း ပိုမိုထင်ရှားနေသော အချက်များ</h1><p className="mt-2 text-xs text-[#6b5e70]">{record.level || record.questionCount || 30} မေးခွန်း · {formatDate(record.createdAt)}</p><p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-[#76697b]">{narrative}</p></div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-[1.5rem] border border-white/90 bg-white/85 p-4 sm:p-6"><div className="flex items-center justify-between"><h2 className="text-sm font-bold text-[#5b4b60]">ပင်ကိုစရိုက် အချက် ၅ ချက်၏ ရမှတ်</h2><span className="text-[11px] text-[#6b5e70]">0–100</span></div><div className="mt-2 h-[290px] w-full"><Suspense fallback={<div className="grid h-full place-items-center text-xs text-[#6b5e70]">ဂရပ်ကို ပြင်ဆင်နေပါသည်...</div>}><TraitRadarChart data={chartData} /></Suspense></div><p className="text-center text-[11px] leading-5 text-[#6b5e70]">ဂရပ်သည် သင့်ဖြေဆိုချက်များမှ တွက်ချက်ထားသော အညွှန်းရမှတ်များကို ပြထားခြင်းဖြစ်သည်။</p></div>
          <div className="flex flex-col gap-3">
            <div className="rounded-[1.5rem] border border-white/90 bg-white/85 p-5"><p className="text-xs font-semibold text-[#6b5e70]">{profile.topScoresAreClose ? 'အမှတ်နီးစပ်နေသော အချက် (၁)' : 'အမှတ်အမြင့်ဆုံး အချက်'}</p><div className="mt-3 flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#f2eaf5] text-[#80678f]"><TraitIcon id={profile.primary.id} size={21} /></span><div><h3 className="text-sm font-bold leading-6 text-[#5b4b60]">{profile.primary.name}</h3><p className="mt-0.5 text-xs text-[#6b5e70]">{scores[profile.primary.id]?.score ?? 0} / 100</p></div></div><p className="mt-3 text-xs font-semibold leading-6 text-[#80678f]">{primaryInsight?.label}</p><p className="mt-2 text-xs leading-7 text-[#6b5e70]">{profile.primary.short}</p></div>
            <div className="rounded-[1.5rem] border border-white/90 bg-white/85 p-5"><p className="text-xs font-semibold text-[#6b5e70]">{profile.topScoresAreClose ? 'အမှတ်နီးစပ်နေသော အချက် (၂)' : 'ဒုတိယ အမှတ်အမြင့်ဆုံး အချက်'}</p><div className="mt-3 flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#f9edf0] text-[#865569]"><TraitIcon id={profile.secondary.id} size={21} /></span><div><h3 className="text-sm font-bold leading-6 text-[#5b4b60]">{profile.secondary.name}</h3><p className="mt-0.5 text-xs text-[#6b5e70]">{scores[profile.secondary.id]?.score ?? 0} / 100</p></div></div><p className="mt-3 text-xs font-semibold leading-6 text-[#865569]">{secondaryInsight?.label}</p><p className="mt-2 text-xs leading-7 text-[#6b5e70]">{profile.secondary.short}</p></div>
          </div>
        </div>
      </section>
      <section id="trait-report-areas" className="mt-8 scroll-mt-28">
        <div className="mb-4"><p className="text-xs font-semibold tracking-wide text-[#6b5e70]">UNDERSTANDING YOUR FIVE AREAS</p><h2 className="mt-1 text-xl font-bold text-[#514357]">အချက် ၅ ချက်ကို တစ်ခုချင်း နားလည်ကြည့်ရအောင်</h2><p className="mt-2 text-xs leading-7 text-[#6b5e70]">ရမှတ်တစ်ခုချင်းစီအတွက် အဓိပ္ပာယ်၊ နေ့စဉ်ဘဝ ဥပမာ၊ ကိုယ်တိုင်ပြန်မေးရန်နဲ့ စမ်းကြည့်နိုင်တဲ့ အဆင့်ငယ်တွေကို ဖော်ပြထားပါတယ်။ ရမှတ်နိမ့်ခြင်း၊ မြင့်ခြင်းဟာ ကောင်းခြင်း၊ ဆိုးခြင်းကို မဆိုလိုပါ။</p></div>
        <div className="grid gap-4 lg:grid-cols-2">{TRAITS.map((trait) => <TraitReportCard key={trait.id} trait={trait} score={scores[trait.id]?.score ?? 0} />)}</div>
      </section>
      <section id="trait-report-domains" className="mt-8 scroll-mt-28">
        <div className="mb-4">
          <p className="text-xs font-semibold tracking-wide text-[#6b5e70]">EVERYDAY LIFE REFLECTION</p>
          <h2 className="mt-1 text-xl font-bold text-[#514357]">နေ့စဉ်ဘဝ ကဏ္ဍ ၃ ခုအလိုက် ပြန်လည်သုံးသပ်ချက်</h2>
          <p className="mt-2 text-xs leading-7 text-[#6b5e70]">သင့်အဖြေများမှ ပေါ်လွင်သော လက်ရှိအလေ့အထများကို နေ့စဉ်ဘဝအခြေအနေ ၃ ခုနှင့် ဆက်စပ်ပြီး စဉ်းစားနိုင်ရန် ဖော်ပြထားပါသည်။ ယင်းတို့သည် အပြီးသတ်သတ်မှတ်ချက်များ မဟုတ်ပါ။</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {lifeDomains.map((domain) => (
            <article key={domain.id} className="rounded-2xl border border-[#eee5ed] bg-white p-5 shadow-sm">
              <p className="text-[11px] font-semibold tracking-wide text-[#725981]">{domain.subtitle}</p>
              <h3 className="mt-1 text-sm font-bold leading-6 text-[#514357]">{domain.title}</h3>
              <p className="mt-3 text-xs leading-7 text-[#5b4b60]">{domain.summary}</p>
              <div className="mt-4 rounded-xl bg-[#faf7fb] p-3">
                <p className="text-[11px] font-bold text-[#625368]">ကိုယ့်ကိုယ်ကို ပြန်မေးကြည့်ရန်</p>
                <p className="mt-1 text-[11px] leading-6 text-[#6b5e70]">{domain.prompt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      {record.level >= 120 && facetScores && (
        <section id="trait-report-facets" className="mt-8 scroll-mt-28">
          <div className="mb-4">
            <p className="text-xs font-semibold tracking-wide text-[#6b5e70]">30 EXPLORATORY TOPIC CLUSTERS</p>
            <h2 className="mt-1 text-xl font-bold text-[#514357]">ပင်ကိုစရိုက်ကို အသေးစိတ်ဖော်ပြတဲ့ အချက် ၃၀</h2>
            <p className="mt-2 text-xs leading-6 text-[#6b5e70]">အချက်တစ်ခုစီမှာ မေးခွန်း ၄ ခုကို အခြေခံထားတဲ့ အညွှန်းရမှတ်ကို ပြထားပါတယ်။ ဒီအသေးစိတ်အချက်တွေဟာ ကိုယ့်ကိုယ်ကို ပြန်လည်လေ့လာရန် ရေးဆွဲထားတဲ့ စမ်းသပ်အုပ်စုများဖြစ်ပြီး သီးခြားအတည်ပြုထားတဲ့ စိတ်ပညာစံနှုန်းများ မဟုတ်သေးပါ။</p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {TRAITS.map((trait) => (
              <article key={trait.id} className="rounded-2xl border border-[#eee5ed] bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-2"><span className="grid h-9 w-9 place-items-center rounded-xl bg-[#f4eef6] text-[#80678f]"><TraitIcon id={trait.id} size={17} /></span><h3 className="text-sm font-bold leading-6 text-[#5b4b60]">{trait.name}</h3></div>
                <div className="space-y-4">
                  {FACETS.filter((facet) => facet.traitId === trait.id).map((facet) => {
                    const item = facetScores[facet.id]
                    const score = item?.score ?? 0
                    const facetInsight = facetInsightLoader?.(facet.id, score)
                    return (
                      <div key={facet.id}>
                        <div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="text-xs font-semibold leading-5 text-[#68596f]">{facet.name}</p><p className="mt-0.5 text-[11px] leading-5 text-[#6b5e70]">{facet.description}</p></div><span className="shrink-0 text-xs font-bold tabular-nums text-[#725981]">{score}/100</span></div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#f1ebf2]"><div className="h-full rounded-full bg-gradient-to-r from-[#9c82aa] to-[#c59aab]" style={{ width: `${score}%` }} /></div>
                        {facetInsight?.text && <p className="mt-2 text-[11px] leading-5 text-[#5b4b60]">{facetInsight.text}</p>}
                      </div>
                    )
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
      <Suspense fallback={null}>
        <ReflectionNotesSection recordId={record.id} theme="trait" />
      </Suspense>
      <section id="trait-report-notes" className="mt-6 scroll-mt-28 rounded-2xl border border-[#eee4ed] bg-[#fbf8fb] p-5"><div className="flex items-start gap-3"><CircleHelp size={18} className="mt-0.5 shrink-0 text-[#6b5e70]" /><div><h3 className="text-sm font-bold text-[#66576b]">ရလဒ်ကို ဘယ်လိုနားလည်ရမလဲ။</h3><p className="mt-2 text-xs leading-7 text-[#6b5e70]">ဤဆန်းစစ်မှုသည် မြန်မာဘာသာဖြင့် ကိုယ်ပိုင်ရေးဆွဲထားသော မေးခွန်းများကို အသုံးပြုထားသည်။ 0–100 ရမှတ်သည် သင်ရွေးချယ်ထားသော အဖြေများကို အညွှန်းအဖြစ် ပြောင်းလဲဖော်ပြခြင်းသာဖြစ်ပြီး လူဦးရေအဆင့် သို့မဟုတ် အခြားသူများနှင့် နှိုင်းယှဉ်ထားသော ရလဒ် မဟုတ်ပါ။ {REPORT_INTERPRETATION_NOTICE}</p></div></div></section>
      <div className="no-print mt-8 flex flex-col justify-center gap-3 sm:flex-row"><PrimaryButton onClick={onRetake} icon={RotateCcw}>ထပ်မံဖြေဆိုမယ်</PrimaryButton><SecondaryButton onClick={onHome} icon={Home}>ပင်မစာမျက်နှာသို့</SecondaryButton></div>
    </main>
  )
}

function BackupRestoreDialog({ preview, mode, onModeChange, onCancel, onConfirm }) {
  const dialogRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (!preview) return undefined
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const frame = window.requestAnimationFrame(() => {
      dialogRef.current?.focus()
    })
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onCancel()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus?.()
    }
  }, [preview, onCancel])

  if (!preview) return null
  return (
    <div className="no-print fixed inset-0 z-[60] flex items-center justify-center bg-[#302735]/40 p-4 backdrop-blur-sm" role="presentation">
      <section ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="backup-dialog-title" className="w-full max-w-lg rounded-[1.75rem] border border-[#eee5ed] bg-[#fffdfd] p-5 shadow-2xl outline-none sm:p-7">
        <div className="flex items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#f3edf5] text-[#80678f]"><FileJson size={20} /></span>
          <div className="min-w-0 flex-1">
            <h2 id="backup-dialog-title" className="text-lg font-bold text-[#514357]">Backup ဖိုင်ကို ပြန်လည်ထည့်သွင်းမယ်</h2>
            <p className="mt-1 break-all text-xs leading-6 text-[#6b5e70]">{preview.fileName}</p>
          </div>
          <button onClick={onCancel} aria-label="ပိတ်ရန်" className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-[#6b5e70] hover:bg-[#f5eff5]"><X size={18} /></button>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2.5 sm:gap-3">
          <div className="rounded-xl bg-[#f7f2f8] p-3"><p className="text-[11px] text-[#6b5e70]">မပြီးသေးသော Draft</p><p className="mt-1 text-2xl font-bold text-[#80678f]">{preview.summary.draftCount}</p></div>
          <div className="rounded-xl bg-[#fbf1f3] p-3"><p className="text-[11px] text-[#865569]">ပြီးဆုံးမှတ်တမ်း</p><p className="mt-1 text-2xl font-bold text-[#865569]">{preview.summary.historyCount}</p></div>
          <div className="rounded-xl bg-[#f3f6fa] p-3"><p className="text-[11px] text-[#3d6087]">ကိုယ်ပိုင်မှတ်စု</p><p className="mt-1 text-2xl font-bold text-[#3d6087]">{preview.summary.noteCount ?? 0}</p></div>
        </div>
        <p className="mt-3 text-[11px] leading-6 text-[#6b5e70]">Backup ထုတ်ယူခဲ့သည့်အချိန် - {preview.exportedAt ? formatDate(preview.exportedAt) : 'မဖော်ပြထားပါ'}</p>
        <div className="mt-5 space-y-3">
          <p className="text-xs font-bold text-[#5f5064]">ဘယ်လိုပြန်ထည့်ချင်ပါသလဲ။</p>
          <label className={cn('flex cursor-pointer gap-3 rounded-xl border p-3.5 transition', mode === 'merge' ? 'border-[#bba7c5] bg-[#faf6fb]' : 'border-[#eee5ed] bg-white')}>
            <input type="radio" name="restore-mode" value="merge" checked={mode === 'merge'} onChange={() => onModeChange('merge')} className="mt-1 accent-[#80678f]" />
            <span><span className="block text-xs font-bold text-[#5f5064]">လက်ရှိ Data နဲ့ ပေါင်းထည့်မယ် (အကြံပြု)</span><span className="mt-1 block text-[11px] leading-6 text-[#6b5e70]">လက်ရှိမှတ်တမ်းတွေကို မဖျက်ပါ။ Draft တစ်ခုတည်း ထပ်နေပါက နောက်ဆုံးပြင်ဆင်ထားတဲ့အရာကို ဦးစားပေးပြီး History ကို ID အလိုက် ပေါင်းစည်းမယ်။</span></span>
          </label>
          <label className={cn('flex cursor-pointer gap-3 rounded-xl border p-3.5 transition', mode === 'replace' ? 'border-[#d8a8ae] bg-[#fff8f8]' : 'border-[#eee5ed] bg-white')}>
            <input type="radio" name="restore-mode" value="replace" checked={mode === 'replace'} onChange={() => onModeChange('replace')} className="mt-1 accent-[#a66d7d]" />
            <span><span className="block text-xs font-bold text-[#79515d]">လက်ရှိ Data အားလုံးကို အစားထိုးမယ်</span><span className="mt-1 block text-[11px] leading-6 text-[#865569]">လက်ရှိ Browser ထဲက Draft နဲ့ History တွေကို အစားထိုးပါမယ်။ Backup ဖိုင်ထဲမပါတဲ့ လက်ရှိအချက်အလက်တွေ ပျောက်သွားနိုင်ပါတယ်။</span></span>
          </label>
        </div>
        {mode === 'replace' && <p className="mt-3 rounded-xl bg-[#fff1f2] p-3 text-[11px] leading-6 text-[#a15d6b]">သတိပြုရန် - အစားထိုးပြီးသွားလျှင် ယခင် Local Data ကို ဒီလုပ်ဆောင်ချက်ကနေ ပြန်ယူလို့မရပါ။ အရင်ဆုံး Backup အသစ်တစ်ခု ထုတ်ထားပါ။</p>}
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <SecondaryButton onClick={onCancel}>မလုပ်တော့ပါ</SecondaryButton>
          <PrimaryButton onClick={onConfirm} icon={Upload}>ပြန်လည်ထည့်သွင်းမယ်</PrimaryButton>
        </div>
      </section>
    </div>
  )
}

const PAGE_TO_HASH = {
  home: '#home',
  knowledge: '#knowledge',
  history: '#history',
  mindProfile: '#mind-profile',
  journal: '#journal',
  instructions: '#instructions',
  assessment: '#assessment',
  review: '#review',
  result: '#results',
  innerCompass: '#innercompass',
  bondSense: '#bondsense',
  valueMap: '#valuemap',
  emotionLens: '#emotionlens',
  careerInterest: '#career',
}

const HASH_TO_PAGE = {
  '': 'home',
  '#': 'home',
  '#home': 'home',
  '#knowledge': 'knowledge',
  '#history': 'history',
  '#mind-profile': 'mindProfile',
  '#journal': 'journal',
  '#instructions': 'instructions',
  '#assessment': 'assessment',
  '#review': 'review',
  '#results': 'result',
  '#innercompass': 'innerCompass',
  '#bondsense': 'bondSense',
  '#valuemap': 'valueMap',
  '#emotionlens': 'emotionLens',
  '#career': 'careerInterest',
}

const HOME_ANCHOR_HASHES = new Set(['#assessment-dashboard', '#personality-levels'])

function getInitialPageFromHash() {
  if (typeof window === 'undefined') return 'home'
  const rawHash = window.location.hash || ''
  if (HOME_ANCHOR_HASHES.has(rawHash)) return 'home'
  const mapped = HASH_TO_PAGE[rawHash]
  if (!mapped || mapped === 'assessment' || mapped === 'review' || mapped === 'instructions' || mapped === 'result') {
    return 'home'
  }
  return mapped
}

function getInitialHomeSectionFromHash() {
  if (typeof window === 'undefined') return null
  const rawHash = window.location.hash || ''
  return HOME_ANCHOR_HASHES.has(rawHash) ? rawHash.slice(1) : null
}

export default function App() {
  const [appData, setAppData] = useState(() => loadAppData())
  const [page, setPage] = useState(getInitialPageFromHash)
  const [level, setLevel] = useState(30)
  const [answers, setAnswers] = useState({})
  const [skippedQuestionIds, setSkippedQuestionIds] = useState([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [startedAt, setStartedAt] = useState(null)
  const [activeRecord, setActiveRecord] = useState(null)
  const [toast, setToast] = useState('')
  const [backupPreview, setBackupPreview] = useState(null)
  const [restoreMode, setRestoreMode] = useState('merge')
  const [pendingHomeSection, setPendingHomeSection] = useState(getInitialHomeSectionFromHash)
  const [knowledgeTermId, setKnowledgeTermId] = useState(null)
  const [knowledgeReturnPage, setKnowledgeReturnPage] = useState(null)
  const [storageError, setStorageError] = useState(false)
  const [storageAlertDismissed, setStorageAlertDismissed] = useState(false)
  const isHashNavigationRef = useRef(false)
  const latestNavRef = useRef({ page: 'home', persistDraft: null, activeRecord: null })
  const isStorageAlertVisible = storageError && !storageAlertDismissed
  const reportStorageWriteResult = (ok) => {
    if (ok) {
      setStorageError(false)
      setStorageAlertDismissed(false)
    } else {
      setStorageError(true)
      setStorageAlertDismissed(false)
    }
  }
  const dismissStorageAlert = () => setStorageAlertDismissed(true)
  const fileInputRef = useRef(null)
  const careerPersistRef = useRef(null)
  const innerCompassPersistRef = useRef(null)
  const bondSensePersistRef = useRef(null)
  const valueMapPersistRef = useRef(null)
  const emotionLensPersistRef = useRef(null)
  const [innerCompassLevel, setInnerCompassLevel] = useState(30)
  const [bondSenseLevel, setBondSenseLevel] = useState(20)
  const [valueMapLevel, setValueMapLevel] = useState(20)
  const [emotionLensLevel, setEmotionLensLevel] = useState(20)
  const questions = useMemo(() => getQuestionsForLevel(level), [level])
  const currentDraft = appData.drafts?.personality?.[String(level)] || null

  useEffect(() => {
    if (page !== 'home' || !pendingHomeSection) return undefined
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(pendingHomeSection)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setPendingHomeSection(null)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [page, pendingHomeSection])

  const persistDraft = (override = {}) => {
    const draft = {
      assessmentType: 'personality',
      questionBankVersion: QUESTION_BANK_VERSION,
      level,
      answers,
      skippedQuestionIds,
      currentIndex: questionIndex,
      startedAt: startedAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'in-progress',
      ...override,
    }
    const success = saveDraft(draft)
    reportStorageWriteResult(success)
    setAppData(loadAppData())
    return success
  }

  latestNavRef.current = { page, persistDraft, activeRecord }

  useEffect(() => {
    if (typeof window === 'undefined') return
    const targetHash = PAGE_TO_HASH[page]
    if (!targetHash) return
    if (isHashNavigationRef.current) {
      isHashNavigationRef.current = false
      return
    }
    const currentHash = window.location.hash
    if (page === 'home' && (currentHash === '' || currentHash === '#home' || HOME_ANCHOR_HASHES.has(currentHash))) {
      return
    }
    if ((page === 'result' || page === 'innerCompass' || page === 'bondSense' || page === 'valueMap' || page === 'emotionLens' || page === 'careerInterest') && currentHash && !HASH_TO_PAGE[currentHash]) {
      return
    }
    if (currentHash !== targetHash) {
      window.history.pushState(null, '', targetHash)
    }
  }, [page])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const syncFromLocation = () => {
      const rawHash = window.location.hash || ''
      const { page: currentPage, persistDraft: flushTraitDraft, activeRecord: currentRecord } = latestNavRef.current

      if (HOME_ANCHOR_HASHES.has(rawHash)) {
        if (currentPage !== 'home') {
          if (currentPage === 'assessment' || currentPage === 'review') flushTraitDraft?.()
          if (currentPage === 'careerInterest') careerPersistRef.current?.()
          if (currentPage === 'innerCompass') innerCompassPersistRef.current?.()
          if (currentPage === 'bondSense') bondSensePersistRef.current?.()
          if (currentPage === 'valueMap') valueMapPersistRef.current?.()
          if (currentPage === 'emotionLens') emotionLensPersistRef.current?.()
          setAppData(loadAppData())
          isHashNavigationRef.current = true
          setPendingHomeSection(rawHash.slice(1))
          setPage('home')
        }
        return
      }

      const nextPage = HASH_TO_PAGE[rawHash]
      if (!nextPage || nextPage === currentPage) return

      if (currentPage === 'assessment' || currentPage === 'review') flushTraitDraft?.()
      if (currentPage === 'careerInterest') careerPersistRef.current?.()
      if (currentPage === 'innerCompass') innerCompassPersistRef.current?.()
      if (currentPage === 'bondSense') bondSensePersistRef.current?.()
      if (currentPage === 'valueMap') valueMapPersistRef.current?.()
      if (currentPage === 'emotionLens') emotionLensPersistRef.current?.()

      if (nextPage === 'result' && !currentRecord) {
        isHashNavigationRef.current = true
        setAppData(loadAppData())
        setPage('home')
        window.history.replaceState(null, '', '#home')
        return
      }

      if (nextPage === 'home') {
        setActiveRecord(null)
      }
      setAppData(loadAppData())
      isHashNavigationRef.current = true
      setPage(nextPage)
    }

    window.addEventListener('hashchange', syncFromLocation)
    window.addEventListener('popstate', syncFromLocation)
    return () => {
      window.removeEventListener('hashchange', syncFromLocation)
      window.removeEventListener('popstate', syncFromLocation)
    }
  }, [])

  useEffect(() => {
    if (page !== 'assessment' && page !== 'review') return
    persistDraft()
    // State changes are intentionally persisted synchronously to localStorage.
  }, [answers, skippedQuestionIds, questionIndex, level, startedAt, page])

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 2800)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    const flushBeforeClose = () => {
      if (page === 'assessment' || page === 'review') persistDraft()
    }
    window.addEventListener('beforeunload', flushBeforeClose)
    return () => window.removeEventListener('beforeunload', flushBeforeClose)
  }, [page, level, answers, skippedQuestionIds, questionIndex, startedAt])

  const handleExportBackup = () => {
    try {
      const snapshot = createBackupSnapshot()
      const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      const dateStamp = new Date().toISOString().slice(0, 10)
      anchor.href = url
      anchor.download = `self-discovery-backup-${dateStamp}.json`
      document.body.appendChild(anchor)
      anchor.click()
      anchor.remove()
      window.setTimeout(() => URL.revokeObjectURL(url), 1500)
      setToast(`Backup ဖိုင် ထုတ်ယူရန် ပြင်ဆင်ပြီးပါပြီ။ Draft ${snapshot.summary.draftCount} ခု၊ History ${snapshot.summary.historyCount} ခု၊ မှတ်စု ${snapshot.summary.noteCount} ခု ပါဝင်ပါတယ်။`)
    } catch (error) {
      console.error('Backup export failed:', error)
      setToast('Backup ထုတ်ယူရာမှာ ပြဿနာရှိနေပါတယ်။ ထပ်မံကြိုးစားပါ။')
    }
  }

  const handleChooseBackup = () => fileInputRef.current?.click()

  const handleBackupFileSelected = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (file.size > 10 * 1024 * 1024) {
      setToast('Backup ဖိုင်အရွယ်အစား 10 MB ထက် မကျော်သင့်ပါ။')
      return
    }
    try {
      const parsed = JSON.parse(await file.text())
      const inspected = inspectBackupSnapshot(parsed)
      if (!inspected.valid) {
        setToast(inspected.error || 'Backup ဖိုင်ကို ဖတ်မရပါ။')
        return
      }
      setBackupPreview({ ...inspected, fileName: file.name })
      setRestoreMode('merge')
    } catch (error) {
      console.error('Backup import preview failed:', error)
      setToast('JSON ဖိုင်ကို ဖတ်မရပါ။ မှန်ကန်တဲ့ Self Discovery Backup ကို ရွေးပေးပါ။')
    }
  }

  const handleConfirmRestore = () => {
    if (!backupPreview?.data) return
    const result = restoreBackupData(backupPreview.data, restoreMode, backupPreview.reflectionNotes)
    if (!result.success) {
      reportStorageWriteResult(false)
      setToast(result.error || 'Backup ပြန်ထည့်သွင်းရာမှာ မအောင်မြင်ပါ။')
      return
    }
    reportStorageWriteResult(true)
    setAppData(result.data)
    setBackupPreview(null)
    setPage('home')
    setToast(restoreMode === 'replace' ? 'Backup ထဲက Data ကို ပြန်လည်အစားထိုးသိမ်းဆည်းပြီးပါပြီ။' : 'Backup Data ကို လက်ရှိ Data နဲ့ ပေါင်းထည့်ပြီးပါပြီ။')
  }

  const handleStart = (nextLevel, forceNew = false) => {
    const existing = loadDraft(nextLevel)
    if (existing && !forceNew) {
      handleResume(nextLevel)
      return
    }
    if (existing && forceNew) {
      const confirmed = window.confirm(`${nextLevel} မေးခွန်းအတွက် မပြီးသေးတဲ့ အဖြေဟောင်းရှိပါတယ်။ အသစ်ပြန်စရင် အဲဒီ Draft ကို အစားထိုးပါမယ်။ ဆက်လုပ်မှာ သေချာပါသလား။`)
      if (!confirmed) return
      const cleared = clearDraft(nextLevel)
      if (!cleared) reportStorageWriteResult(false)
    }
    const now = new Date().toISOString()
    setLevel(Number(nextLevel))
    setAnswers({})
    setSkippedQuestionIds([])
    setQuestionIndex(0)
    setStartedAt(now)
    setActiveRecord(null)
    setPage('instructions')
    const saved = saveDraft({ assessmentType: 'personality', questionBankVersion: QUESTION_BANK_VERSION, level: Number(nextLevel), answers: {}, skippedQuestionIds: [], currentIndex: 0, startedAt: now, updatedAt: now, status: 'in-progress' })
    reportStorageWriteResult(saved)
    setAppData(loadAppData())
  }

  const handleResume = (resumeLevel) => {
    const draft = loadDraft(resumeLevel)
    if (!draft) {
      setToast('ဆက်လက်ဖြေဆိုရန် သိမ်းထားတဲ့ အဖြေမတွေ့ပါ။')
      return
    }
    const resumeQuestions = getQuestionsForLevel(resumeLevel)
    setLevel(Number(resumeLevel))
    setAnswers(draft.answers || {})
    setSkippedQuestionIds(Array.isArray(draft.skippedQuestionIds) ? draft.skippedQuestionIds : [])
    setQuestionIndex(Math.max(0, Math.min(Number(draft.currentIndex) || 0, resumeQuestions.length - 1)))
    setStartedAt(draft.startedAt || draft.updatedAt || new Date().toISOString())
    setAppData(loadAppData())
    setPage('assessment')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBegin = () => {
    setPage('assessment')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAnswer = (questionId, value) => {
    const nextAnswers = { ...answers, [questionId]: value }
    const nextSkipped = skippedQuestionIds.filter((id) => id !== questionId)
    setAnswers(nextAnswers)
    setSkippedQuestionIds(nextSkipped)
    const saved = saveDraft({ assessmentType: 'personality', questionBankVersion: QUESTION_BANK_VERSION, level, answers: nextAnswers, skippedQuestionIds: nextSkipped, currentIndex: questionIndex, startedAt, updatedAt: new Date().toISOString(), status: 'in-progress' })
    reportStorageWriteResult(saved)
    setAppData(loadAppData())
  }

  const handlePrevious = () => {
    setQuestionIndex((current) => Math.max(0, current - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNext = () => {
    const currentQuestion = questions[questionIndex]
    if (answers[currentQuestion.id] === undefined) {
      setToast('အဖြေရွေးချယ်ပါ၊ ဒါမှမဟုတ် ဒီမေးခွန်းကို ကျော်ထားနိုင်ပါတယ်။')
      return
    }
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((current) => current + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setPage('review')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSkip = () => {
    const currentQuestion = questions[questionIndex]
    if (answers[currentQuestion.id] !== undefined) {
      setToast('ဒီမေးခွန်းကို ဖြေပြီးသားပါ။ နောက်မေးခွန်းသို့ ဆက်သွားနိုင်ပါတယ်။')
      return
    }
    const nextSkipped = [...new Set([...skippedQuestionIds, currentQuestion.id])]
    setSkippedQuestionIds(nextSkipped)
    const nextIndex = Math.min(questionIndex + 1, questions.length - 1)
    setQuestionIndex(nextIndex)
    const saved = saveDraft({ assessmentType: 'personality', questionBankVersion: QUESTION_BANK_VERSION, level, answers, skippedQuestionIds: nextSkipped, currentIndex: nextIndex, startedAt, updatedAt: new Date().toISOString(), status: 'in-progress' })
    reportStorageWriteResult(saved)
    setAppData(loadAppData())
    if (questionIndex === questions.length - 1) setPage('review')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleGoToQuestion = (index) => {
    setQuestionIndex(Math.max(0, Math.min(index, questions.length - 1)))
    setPage('assessment')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleFinish = () => {
    const unanswered = questions.filter((question) => answers[question.id] === undefined)
    if (unanswered.length > 0) {
      setToast(`မဖြေရသေးတဲ့ မေးခွန်း ${unanswered.length} ခု ကျန်နေပါသေးတယ်။`)
      setPage('review')
      return
    }
    const { scores, facetScores } = buildResult(answers, questions)
    const record = {
      id: globalThis.crypto?.randomUUID?.() || `assessment-${Date.now()}`,
      assessmentType: 'personality',
      questionBankVersion: QUESTION_BANK_VERSION,
      level,
      questionCount: questions.length,
      createdAt: new Date().toISOString(),
      startedAt,
      answers,
      scores,
      facetScores,
    }
    const { ok, history } = saveAssessmentWithStatus(record)
    reportStorageWriteResult(ok)
    if (!ok) {
      setToast('သတိပေးချက်: Browser Storage ထဲသို့ ရလဒ်သိမ်းဆည်း၍ မရပါ။')
    }
    setAppData({ ...loadAppData(), history })
    setActiveRecord(record)
    setPage('result')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleRetake = () => handleStart(activeRecord?.level || 30, true)

  const handleDeleteRecord = (id) => {
    if (!window.confirm('ဒီမှတ်တမ်းကို ဖျက်မှာ သေချာပါသလား။')) return
    const { ok, history } = deleteAssessmentWithStatus(id)
    reportStorageWriteResult(ok)
    if (!ok) {
      setToast('Browser Storage ထဲသို့ ပြောင်းလဲမှု သိမ်းဆည်း၍ မရပါ။')
      return
    }
    setAppData((current) => ({ ...current, history }))
  }

  const handleClearHistory = () => {
    if (!window.confirm('သိမ်းထားတဲ့ မှတ်တမ်းအားလုံးကို ဖျက်မှာ သေချာပါသလား။')) return
    const { ok, history } = clearHistoryWithStatus()
    reportStorageWriteResult(ok)
    if (!ok) {
      setToast('Browser Storage ထဲသို့ ပြောင်းလဲမှု သိမ်းဆည်း၍ မရပါ။')
      return
    }
    setAppData((current) => ({ ...current, history }))
  }

  const handleExitAssessment = () => {
    persistDraft()
    setAppData(loadAppData())
    setPage('home')
  }

  const openHistoryRecord = (record) => {
    setActiveRecord(record)
    setPage(
      record.assessmentType === 'careerInterest'
        ? 'careerInterest'
        : record.assessmentType === 'innerCompass'
          ? 'innerCompass'
          : record.assessmentType === 'bondSense'
            ? 'bondSense'
            : record.assessmentType === 'valueMap'
              ? 'valueMap'
              : record.assessmentType === 'emotionLens'
                ? 'emotionLens'
                : 'result',
    )
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleStartCareer = () => {
    setActiveRecord(null)
    setAppData(loadAppData())
    setPage('careerInterest')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const flushActiveModuleDraft = () => {
    if (page === 'assessment' || page === 'review') persistDraft()
    if (page === 'careerInterest') careerPersistRef.current?.()
    if (page === 'innerCompass') innerCompassPersistRef.current?.()
    if (page === 'bondSense') bondSensePersistRef.current?.()
    if (page === 'valueMap') valueMapPersistRef.current?.()
    if (page === 'emotionLens') emotionLensPersistRef.current?.()
  }

  const handleNavigateHome = () => {
    flushActiveModuleDraft()
    setActiveRecord(null)
    setAppData(loadAppData())
    setPage('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavigateHistory = () => {
    flushActiveModuleDraft()
    setAppData(loadAppData())
    setPage('history')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavigateKnowledge = () => {
    flushActiveModuleDraft()
    setKnowledgeTermId(null)
    setKnowledgeReturnPage(null)
    setAppData(loadAppData())
    setPage('knowledge')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavigateMindProfile = () => {
    flushActiveModuleDraft()
    setActiveRecord(null)
    setAppData(loadAppData())
    setPage('mindProfile')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNavigateJournal = () => {
    flushActiveModuleDraft()
    setActiveRecord(null)
    setAppData(loadAppData())
    setPage('journal')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenKnowledgeTerm = (termId) => {
    if (page === 'assessment' || page === 'review') {
      persistDraft()
      setKnowledgeReturnPage(page)
    } else if (page === 'innerCompass') {
      innerCompassPersistRef.current?.()
      setKnowledgeReturnPage('innerCompass')
    } else {
      setKnowledgeReturnPage(null)
    }
    setAppData(loadAppData())
    setKnowledgeTermId(termId || null)
    setPage('knowledge')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleKnowledgeBack = () => {
    if (knowledgeReturnPage) {
      const target = knowledgeReturnPage
      setKnowledgeReturnPage(null)
      setKnowledgeTermId(null)
      setAppData(loadAppData())
      setPage(target)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    handleNavigateHome()
  }

  const handleNavigateAssessment = () => {
    if (page === 'home') {
      document.getElementById('assessment-dashboard')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    flushActiveModuleDraft()
    setActiveRecord(null)
    setAppData(loadAppData())
    setPendingHomeSection('assessment-dashboard')
    setPage('home')
  }

  const showMobileNavigation = ['home', 'history', 'knowledge', 'mindProfile', 'journal'].includes(page)

  return (
    <div className={cn('min-h-screen bg-[#faf8f5] text-[#242029]', showMobileNavigation && 'pb-[calc(5.25rem+env(safe-area-inset-bottom))] sm:pb-0')}>
      <Header onHome={handleNavigateHome} onHistory={handleNavigateHistory} onKnowledge={handleNavigateKnowledge} active={page === 'history' ? 'history' : page === 'knowledge' ? 'knowledge' : 'home'} />
      {page === 'home' && <HomePage history={appData.history} drafts={appData.drafts} onStart={handleStart} onResume={handleResume} onStartCareer={handleStartCareer} onHistory={() => setPage('history')} onOpenRecord={openHistoryRecord} onExportBackup={handleExportBackup} onImportBackup={handleChooseBackup} onOpenInnerCompass={(selectedLevel = 30) => { setActiveRecord(null); setInnerCompassLevel(selectedLevel === 120 ? 120 : selectedLevel === 60 ? 60 : 30); setPage('innerCompass') }} onOpenBondSense={(selectedLevel = 20) => { setActiveRecord(null); setBondSenseLevel(selectedLevel === 80 ? 80 : selectedLevel === 40 ? 40 : 20); setPage('bondSense') }} onOpenValueMap={(selectedLevel = 20) => { setActiveRecord(null); setValueMapLevel(selectedLevel === 40 ? 40 : 20); setPage('valueMap') }} onOpenEmotionLens={(selectedLevel = 20) => { setActiveRecord(null); setEmotionLensLevel(selectedLevel === 120 ? 120 : selectedLevel === 80 ? 80 : selectedLevel === 40 ? 40 : 20); setPage('emotionLens') }} onOpenKnowledge={handleNavigateKnowledge} onOpenMindProfile={handleNavigateMindProfile} onOpenJournal={handleNavigateJournal} storageAlertVisible={isStorageAlertVisible} onDismissStorageError={dismissStorageAlert} />}
      {page === 'mindProfile' && (
        <Suspense fallback={<ModuleLoadingFallback />}>
          <MyMindProfile
            history={appData.history}
            onBack={handleNavigateHome}
            onOpenRecord={openHistoryRecord}
            onOpenJournal={handleNavigateJournal}
            onStartTraitLens={() => handleStart(30, false)}
            onStartInnerCompass={() => { setActiveRecord(null); setInnerCompassLevel(30); setPage('innerCompass') }}
            onStartBondSense={() => { setActiveRecord(null); setPage('bondSense') }}
            onStartValueMap={() => { setActiveRecord(null); setPage('valueMap') }}
            onStartEmotionLens={() => { setActiveRecord(null); setPage('emotionLens') }}
            onStartCareer={handleStartCareer}
          />
        </Suspense>
      )}
      {page === 'journal' && (
        <Suspense fallback={<ModuleLoadingFallback />}>
          <ReflectionJournalPage
            history={appData.history}
            onBack={handleNavigateHome}
            onOpenRecord={openHistoryRecord}
          />
        </Suspense>
      )}
      {page === 'knowledge' && <Suspense fallback={<ModuleLoadingFallback />}><KnowledgeCenter onBack={handleKnowledgeBack} initialTermId={knowledgeTermId} returnLabel={knowledgeReturnPage ? 'မေးခွန်းသို့ ပြန်သွားမယ်' : null} /></Suspense>}
      {page === 'careerInterest' && <Suspense fallback={<ModuleLoadingFallback />}><CareerInterestModule key={activeRecord?.id || 'career-new'} record={activeRecord?.assessmentType === 'careerInterest' ? activeRecord : null} onHome={handleNavigateHome} onDataChange={setAppData} persistRef={careerPersistRef} onExportBackup={handleExportBackup} storageError={storageError} storageAlertVisible={isStorageAlertVisible} onStorageWriteResult={reportStorageWriteResult} onDismissStorageError={dismissStorageAlert} onOpenKnowledgeTerm={handleOpenKnowledgeTerm} /></Suspense>}
      {page === 'instructions' && <InstructionsPage level={level} onBack={() => setPage('home')} onBegin={handleBegin} storageAlertVisible={isStorageAlertVisible} onExportBackup={handleExportBackup} onDismissStorageError={dismissStorageAlert} />}
      {page === 'innerCompass' && <Suspense fallback={<ModuleLoadingFallback />}><InnerCompassModule key={activeRecord?.id || `inner-compass-${innerCompassLevel}`} initialRecord={activeRecord?.assessmentType === 'innerCompass' ? activeRecord : null} initialLevel={innerCompassLevel} onHome={() => { setActiveRecord(null); setAppData(loadAppData()); setPage('home') }} onDataChange={setAppData} persistRef={innerCompassPersistRef} onExportBackup={handleExportBackup} storageError={storageError} storageAlertVisible={isStorageAlertVisible} onStorageWriteResult={reportStorageWriteResult} onDismissStorageError={dismissStorageAlert} onOpenKnowledgeTerm={handleOpenKnowledgeTerm} /></Suspense>}
      {page === 'bondSense' && <Suspense fallback={<ModuleLoadingFallback />}><BondSenseModule key={activeRecord?.id || `bondsense-${bondSenseLevel}`} initialRecord={activeRecord?.assessmentType === 'bondSense' ? activeRecord : null} initialLevel={bondSenseLevel} onHome={() => { setActiveRecord(null); setAppData(loadAppData()); setPage('home') }} onDataChange={setAppData} persistRef={bondSensePersistRef} onExportBackup={handleExportBackup} storageError={storageError} storageAlertVisible={isStorageAlertVisible} onStorageWriteResult={reportStorageWriteResult} onDismissStorageError={dismissStorageAlert} /></Suspense>}
      {page === 'valueMap' && <Suspense fallback={<ModuleLoadingFallback />}><ValueMapModule key={activeRecord?.id || `valuemap-${valueMapLevel}`} initialRecord={activeRecord?.assessmentType === 'valueMap' ? activeRecord : null} initialLevel={valueMapLevel} onHome={() => { setActiveRecord(null); setAppData(loadAppData()); setPage('home') }} onDataChange={setAppData} persistRef={valueMapPersistRef} onExportBackup={handleExportBackup} storageError={storageError} storageAlertVisible={isStorageAlertVisible} onStorageWriteResult={reportStorageWriteResult} onDismissStorageError={dismissStorageAlert} /></Suspense>}
      {page === 'emotionLens' && <Suspense fallback={<ModuleLoadingFallback />}><EmotionLensModule key={activeRecord?.id || `emotionlens-${emotionLensLevel}`} initialRecord={activeRecord?.assessmentType === 'emotionLens' ? activeRecord : null} initialLevel={emotionLensLevel} onHome={() => { setActiveRecord(null); setAppData(loadAppData()); setPage('home') }} onDataChange={setAppData} persistRef={emotionLensPersistRef} onExportBackup={handleExportBackup} storageError={storageError} storageAlertVisible={isStorageAlertVisible} onStorageWriteResult={reportStorageWriteResult} onDismissStorageError={dismissStorageAlert} /></Suspense>}
      {page === 'assessment' && <AssessmentPage questions={questions} answers={answers} skippedQuestionIds={skippedQuestionIds} questionIndex={questionIndex} onAnswer={handleAnswer} onPrevious={handlePrevious} onNext={handleNext} onSkip={handleSkip} onReview={() => setPage('review')} onExit={handleExitAssessment} storageError={storageError} storageAlertVisible={isStorageAlertVisible} onExportBackup={handleExportBackup} onDismissStorageError={dismissStorageAlert} onOpenKnowledgeTerm={handleOpenKnowledgeTerm} />}
      {page === 'review' && <ReviewPage questions={questions} answers={answers} skippedQuestionIds={skippedQuestionIds} onGoTo={handleGoToQuestion} onFinish={handleFinish} onBack={() => setPage('assessment')} storageAlertVisible={isStorageAlertVisible} onExportBackup={handleExportBackup} onDismissStorageError={dismissStorageAlert} />}
      {page === 'result' && <ResultsPage record={activeRecord} onHome={() => { setAppData(loadAppData()); setPage('home') }} onRetake={handleRetake} storageAlertVisible={isStorageAlertVisible} onExportBackup={handleExportBackup} onDismissStorageError={dismissStorageAlert} />}
      {page === 'history' && (
        <>
          <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 lg:px-8">
            <StorageWriteAlert visible={isStorageAlertVisible} onExportBackup={handleExportBackup} onDismiss={dismissStorageAlert} className="mb-0" />
          </div>
          <Suspense fallback={<ModuleLoadingFallback />}>
            <HistoryPage history={appData.history} onOpen={openHistoryRecord} onDelete={handleDeleteRecord} onClear={handleClearHistory} onStart={handleStart} onOpenMindProfile={handleNavigateMindProfile} />
          </Suspense>
        </>
      )}
      <footer className="no-print border-t border-[#ebe5dc] bg-[#faf8f5] px-4 py-6 text-center"><p className="text-[11px] font-semibold text-[#524b59]">Self Discovery · ကိုယ့်ကိုယ်ကို ရှာဖွေခြင်း</p><p className="mt-1 text-[11px] text-[#524b59]">ပိုမိုနားလည်လာခြင်းက ကိုယ့်ကိုယ်ကို ဂရုစိုက်ခြင်းရဲ့ အစဖြစ်ပါတယ်။</p></footer>
      {showMobileNavigation && <MobileBottomNavigation active={page === 'history' ? 'history' : page === 'knowledge' ? 'knowledge' : 'home'} onHome={handleNavigateHome} onAssessment={handleNavigateAssessment} onKnowledge={handleNavigateKnowledge} onHistory={handleNavigateHistory} />}
      <input ref={fileInputRef} type="file" accept=".json,application/json" className="hidden" onChange={handleBackupFileSelected} />
      <BackupRestoreDialog preview={backupPreview} mode={restoreMode} onModeChange={setRestoreMode} onCancel={() => setBackupPreview(null)} onConfirm={handleConfirmRestore} />
      {toast && <div role="status" className="no-print fixed bottom-24 left-1/2 z-50 max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-full bg-[#514357] px-5 py-3 text-center text-xs font-semibold text-white shadow-xl sm:bottom-5">{toast}</div>}
    </div>
  )
}
