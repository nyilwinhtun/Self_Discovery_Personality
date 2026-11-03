import { ArrowLeft, ArrowRight, ClipboardCheck, SkipForward } from 'lucide-react'

const accents = {
  plum: {
    primary: 'bg-[#80678f] hover:bg-[#725981] disabled:bg-[#cfc4d5]',
    soft: 'border-[#e5dce6] text-[#6e5a77] hover:bg-[#faf7fb]',
    link: 'text-[#80678f]',
  },
  blue: {
    primary: 'bg-[#527daa] hover:bg-[#456d97] disabled:bg-[#c5d4e3]',
    soft: 'border-[#d8e3ee] text-[#55799e] hover:bg-[#f4f8fc]',
    link: 'text-[#527daa]',
  },
}

export default function MobileQuestionActions({
  onPrevious,
  onNext,
  onSkip,
  onReview,
  canPrevious,
  canNext,
  showSkip,
  isLast,
  accent = 'plum',
}) {
  const theme = accents[accent] || accents.plum
  return (
    <div className="no-print mobile-question-actions fixed inset-x-0 bottom-0 z-40 border-t border-[#e9e1eb] bg-white/95 px-3 pt-3 shadow-[0_-8px_28px_rgba(66,49,72,0.09)] backdrop-blur-xl sm:hidden">
      <div className="mx-auto grid max-w-3xl grid-cols-[0.82fr_1.18fr] gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!canPrevious}
          className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border bg-white px-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40 ${theme.soft}`}
        >
          <ArrowLeft size={16} /> ယခင်
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-50 ${theme.primary}`}
        >
          {isLast ? 'အဖြေတွေ ပြန်စစ်မယ်' : 'နောက်တစ်ခု'}
          {isLast ? <ClipboardCheck size={16} /> : <ArrowRight size={16} />}
        </button>
      </div>
      <div className="mx-auto mt-2 flex max-w-3xl items-center justify-between gap-3 pb-[calc(0.65rem+env(safe-area-inset-bottom))]">
        {showSkip ? (
          <button type="button" onClick={onSkip} className={`inline-flex min-h-9 items-center gap-1.5 px-1 text-xs font-semibold ${theme.link}`}>
            <SkipForward size={14} /> ဒီမေးခွန်းကို ကျော်မယ်
          </button>
        ) : <span className="min-h-9" />}
        <button type="button" onClick={onReview} className={`min-h-9 px-1 text-xs font-semibold ${theme.link}`}>
          မေးခွန်းစာရင်းကြည့်မယ်
        </button>
      </div>
    </div>
  )
}
