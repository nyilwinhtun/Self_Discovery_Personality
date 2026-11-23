const DEFAULT_POLES = {
  openness: ['ရင်းနှီးပြီးသား လက်တွေ့နည်းလမ်း', 'စိတ်ကူးသစ်နှင့် စူးစမ်းလိုမှု'],
  conscientiousness: ['အခြေအနေအလိုက် လွတ်လပ်စွာ', 'စနစ်တကျ ကြိုတင်စီစဉ်မှု'],
  extraversion: ['တစ်ကိုယ်တော် တိတ်ဆိတ်အားဖြည့်မှု', 'လူမှုဆက်ဆံရေးနှင့် တက်ကြွမှု'],
  agreeableness: ['တိုက်ရိုက်အမြင်နှင့် ကိုယ်ပိုင်ရပ်တည်မှု', 'စာနာနားလည်မှုနှင့် ပူးပေါင်းမှု'],
  emotionalStability: ['ခံစားချက် နက်ရှိုင်းစွာ တုံ့ပြန်မှု', 'ဖိအားအောက် စိတ်တည်ငြိမ်မှု'],
}

const TONES = {
  plum: {
    track: 'bg-[#f1ebf2]',
    fill: 'bg-gradient-to-r from-[#8f749e] to-[#b88b9e]',
    dot: 'bg-[#725981]',
    center: 'bg-[#bdb0c4]',
    activeText: 'font-bold text-[#5b4b60]',
    mutedText: 'text-[#6b5e70]',
  },
  blue: {
    track: 'bg-[#ebf1f7]',
    fill: 'bg-gradient-to-r from-[#5a84b0] to-[#8cb0d4]',
    dot: 'bg-[#446c96]',
    center: 'bg-[#afc2d6]',
    activeText: 'font-bold text-[#3f5873]',
    mutedText: 'text-[#4e6379]',
  },
  teal: {
    track: 'bg-[#e6f1f2]',
    fill: 'bg-gradient-to-r from-[#2f6d73] to-[#68a3a8]',
    dot: 'bg-[#24565b]',
    center: 'bg-[#9fc4c7]',
    activeText: 'font-bold text-[#1e4a4f]',
    mutedText: 'text-[#3a5a5e]',
  },
}

/**
 * Balanced two-pole spectrum bar expanding left or right from a 50% center midpoint.
 * Helps lower scores read visually as an authentic tendency rather than an empty/failing bar.
 */
export default function BalancedSpectrumBar({
  score = 50,
  poleId,
  leftLabel,
  rightLabel,
  tone = 'plum',
  ariaLabel,
}) {
  const palette = TONES[tone] || TONES.plum
  const resolvedLeft = leftLabel || DEFAULT_POLES[poleId]?.[0] || 'နိမ့်ပိုင်း'
  const resolvedRight = rightLabel || DEFAULT_POLES[poleId]?.[1] || 'မြင့်ပိုင်း'
  const clamped = Math.max(0, Math.min(100, Math.round(Number(score) || 0)))
  const leftPct = clamped < 50 ? clamped : 50
  const widthPct = Math.abs(clamped - 50)
  const dotLeft = `clamp(7px, ${clamped}%, calc(100% - 7px))`

  return (
    <div
      className="mt-3"
      role="meter"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      aria-valuetext={`${clamped} / 100 (${resolvedLeft} ↔ ${resolvedRight})`}
      aria-label={ariaLabel || `${resolvedLeft} နှင့် ${resolvedRight} မျှခြေပြစကေး`}
    >
      <div className={`relative h-2.5 w-full rounded-full ${palette.track}`}>
        <div
          aria-hidden="true"
          className={`absolute top-0 h-full rounded-full transition-all duration-300 ${palette.fill}`}
          style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
        />
        <span
          aria-hidden="true"
          className={`absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 ${palette.center}`}
        />
        <span
          aria-hidden="true"
          className={`absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm transition-all duration-300 ${palette.dot}`}
          style={{ left: dotLeft }}
        />
      </div>
      <div className="mt-2 flex items-start justify-between gap-3 text-xs leading-5">
        <span className={`max-w-[46%] text-left ${clamped < 45 ? palette.activeText : palette.mutedText}`}>
          {resolvedLeft}
        </span>
        <span className={`max-w-[46%] text-right ${clamped > 55 ? palette.activeText : palette.mutedText}`}>
          {resolvedRight}
        </span>
      </div>
    </div>
  )
}
