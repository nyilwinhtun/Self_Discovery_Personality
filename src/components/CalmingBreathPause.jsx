import { useEffect, useState } from 'react'
import { CheckCircle2, Play, RotateCcw, Square, Wind } from 'lucide-react'

const PHASES = [
  { id: 'inhale', label: 'အသက်ကို ညင်သာစွာ ရှူသွင်းပါ', seconds: 4 },
  { id: 'hold', label: 'ခဏ ထိန်းထားပါ', seconds: 4 },
  { id: 'exhale', label: 'ဖြည်းညင်းစွာ ရှူထုတ်ပါ', seconds: 4 },
]

const TOTAL_ROUNDS = 4 // 4 * 12s = 48 seconds

const THEME = {
  trait: {
    border: 'border-[#e7dce9]',
    bg: 'bg-[#fcf9fc]',
    badgeBg: 'bg-[#f3edf5]',
    badgeText: 'text-[#614b6b]',
    heading: 'text-[#493b50]',
    body: 'text-[#5d5162]',
    orbBg: 'bg-[#ede3f1]',
    orbRing: 'border-[#c8b2d1]',
    btnPrimary: 'bg-[#6e557c] hover:bg-[#5d476a] text-white',
    btnSecondary: 'border-[#dfd2e4] text-[#5d476a] hover:bg-[#f3edf5]',
  },
  innerCompass: {
    border: 'border-[#d4e0ef]',
    bg: 'bg-[#f7fafd]',
    badgeBg: 'bg-[#e8f0f9]',
    badgeText: 'text-[#355679]',
    heading: 'text-[#3f5873]',
    body: 'text-[#4e6379]',
    orbBg: 'bg-[#e1ecf8]',
    orbRing: 'border-[#9ebbd9]',
    btnPrimary: 'bg-[#3d6087] hover:bg-[#314f70] text-white',
    btnSecondary: 'border-[#cbd9e9] text-[#355679] hover:bg-[#eaf1fa]',
  },
  bondSense: {
    border: 'border-[#ebd6d1]',
    bg: 'bg-[#fdf8f7]',
    badgeBg: 'bg-[#f8eae6]',
    badgeText: 'text-[#7c392b]',
    heading: 'text-[#662f23]',
    body: 'text-[#6a4840]',
    orbBg: 'bg-[#f7e5e0]',
    orbRing: 'border-[#d9aba0]',
    btnPrimary: 'bg-[#7c392b] hover:bg-[#662f23] text-white',
    btnSecondary: 'border-[#e5cbc5] text-[#7c392b] hover:bg-[#fbeeea]',
  },
  valueMap: {
    border: 'border-[#d4e1d7]',
    bg: 'bg-[#f6faf7]',
    badgeBg: 'bg-[#e8f2eb]',
    badgeText: 'text-[#2c4a34]',
    heading: 'text-[#2c4a34]',
    body: 'text-[#465e4c]',
    orbBg: 'bg-[#e1efe5]',
    orbRing: 'border-[#9ec1a7]',
    btnPrimary: 'bg-[#33573d] hover:bg-[#27452f] text-white',
    btnSecondary: 'border-[#cad9ce] text-[#2c4a34] hover:bg-[#eef4ef]',
  },
  emotionLens: {
    border: 'border-[#cce0e2]',
    bg: 'bg-[#f4f9f9]',
    badgeBg: 'bg-[#e4f1f2]',
    badgeText: 'text-[#1e4a4f]',
    heading: 'text-[#1e4a4f]',
    body: 'text-[#3a5a5e]',
    orbBg: 'bg-[#dceced]',
    orbRing: 'border-[#96bfc3]',
    btnPrimary: 'bg-[#2f6d73] hover:bg-[#24565b] text-white',
    btnSecondary: 'border-[#bfd8da] text-[#1e4a4f] hover:bg-[#eaf4f4]',
  },
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (event) => setReduced(event.matches)
    media.addEventListener?.('change', onChange)
    return () => media.removeEventListener?.('change', onChange)
  }, [])

  return reduced
}

export default function CalmingBreathPause({ theme = 'trait' }) {
  const style = THEME[theme] || THEME.trait
  const prefersReducedMotion = usePrefersReducedMotion()
  const [status, setStatus] = useState('idle') // 'idle' | 'running' | 'done'
  const [round, setRound] = useState(1)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(PHASES[0].seconds)

  useEffect(() => {
    if (status !== 'running') return undefined
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) return prev - 1
        setPhaseIndex((prevPhase) => {
          const nextPhase = prevPhase + 1
          if (nextPhase < PHASES.length) {
            setSecondsLeft(PHASES[nextPhase].seconds)
            return nextPhase
          }
          setRound((prevRound) => {
            if (prevRound < TOTAL_ROUNDS) {
              setSecondsLeft(PHASES[0].seconds)
              return prevRound + 1
            }
            setStatus('done')
            return prevRound
          })
          return 0
        })
        return prev
      })
    }, 1000)

    return () => window.clearInterval(timer)
  }, [status])

  const handleStart = () => {
    setRound(1)
    setPhaseIndex(0)
    setSecondsLeft(PHASES[0].seconds)
    setStatus('running')
  }

  const handleStop = () => {
    setStatus('idle')
    setRound(1)
    setPhaseIndex(0)
    setSecondsLeft(PHASES[0].seconds)
  }

  const currentPhase = PHASES[phaseIndex] || PHASES[0]
  const orbScaleClass =
    prefersReducedMotion || status !== 'running'
      ? 'scale-100'
      : currentPhase.id === 'inhale'
        ? 'scale-110'
        : currentPhase.id === 'hold'
          ? 'scale-110'
          : 'scale-90'

  return (
    <section
      aria-label="စိတ်အေးချမ်းစေရန် အသက်ရှူလေ့ကျင့်ခန်း (ရွေးချယ်နိုင်)"
      className={`rounded-2xl border p-4 sm:p-5 ${style.border} ${style.bg}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold ${style.badgeBg} ${style.badgeText}`}>
          <Wind size={13} /> စိတ်အေးဆေးတည်ငြိမ်စေရန် ခဏနားခြင်း (ရွေးချယ်နိုင်)
        </span>
        <span className={`text-[11px] font-semibold ${style.body}`}>
          ၄-၄-၄ စည်းချက် · ၄၈ စက္ကန့်
        </span>
      </div>

      <p className={`mt-2.5 text-xs leading-6 ${style.body}`}>
        မေးခွန်းများ မစတင်မီ အလျင်စလိုမဖြစ်ဘဲ အေးချမ်းတည်ငြိမ်စွာ ဖြေဆိုနိုင်ရန် စက္ကန့် ၄၀–၅၀ ခန့် အသက်ရှူလေ့ကျင့်ခန်း ခဏပြုလုပ်နိုင်ပါသည် (မလုပ်ဘဲ တိုက်ရိုက်စတင်နိုင်ပါသည်)။
      </p>

      {status === 'running' && (
        <div className="mt-4 flex flex-col items-center rounded-2xl border border-white/80 bg-white/90 px-4 py-5 text-center">
          {prefersReducedMotion ? (
            <div className={`flex h-20 w-20 items-center justify-center rounded-full border-2 ${style.orbBg} ${style.orbRing}`}>
              <span className={`text-lg font-bold tabular-nums ${style.heading}`}>
                {secondsLeft}
              </span>
            </div>
          ) : (
            <div
              className={`flex h-24 w-24 items-center justify-center rounded-full border-2 transition-transform duration-[4000ms] ease-in-out ${style.orbBg} ${style.orbRing} ${orbScaleClass}`}
            >
              <span className={`text-xl font-bold tabular-nums ${style.heading}`}>
                {secondsLeft}
              </span>
            </div>
          )}

          <p className={`mt-3 text-sm font-bold ${style.heading}`} aria-live="polite">
            {currentPhase.label}
          </p>
          <p className={`mt-1 text-[11px] font-semibold ${style.body}`}>
            အကျော့ {round} / {TOTAL_ROUNDS}
          </p>
        </div>
      )}

      {status === 'done' && (
        <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-[#cad9ce] bg-white px-4 py-3 text-xs font-semibold text-[#2c4a34]">
          <CheckCircle2 size={16} className="shrink-0" />
          <span>ကောင်းပါပြီ — စိတ်အေးဆေးတည်ငြိမ်သွားပြီဆိုလျှင် အောက်ပါမေးခွန်းများကို စတင်ဖြေဆိုနိုင်ပါပြီ။</span>
        </div>
      )}

      <div className="mt-3.5 flex flex-wrap items-center gap-2">
        {status === 'idle' && (
          <button
            type="button"
            onClick={handleStart}
            className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${style.btnPrimary}`}
          >
            <Play size={14} /> ၄၈ စက္ကန့် အသက်ရှူလေ့ကျင့်ခန်း စမယ်
          </button>
        )}
        {status === 'running' && (
          <button
            type="button"
            onClick={handleStop}
            className={`inline-flex min-h-11 items-center gap-2 rounded-xl border bg-white px-4 py-2 text-xs font-semibold transition ${style.btnSecondary}`}
          >
            <Square size={14} /> ရပ်နားမယ်
          </button>
        )}
        {status === 'done' && (
          <button
            type="button"
            onClick={handleStart}
            className={`inline-flex min-h-11 items-center gap-2 rounded-xl border bg-white px-4 py-2 text-xs font-semibold transition ${style.btnSecondary}`}
          >
            <RotateCcw size={14} /> ထပ်မံပြုလုပ်မယ်
          </button>
        )}
      </div>
    </section>
  )
}
