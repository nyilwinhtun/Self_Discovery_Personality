import { ArrowLeft, ArrowRight, ClipboardCheck, SkipForward } from 'lucide-react'

const accents = {
  plum: {
    primary: 'bg-[#80678f] hover:bg-[#725981] disabled:bg-[#cfc4d5]',
    soft: 'border-[#e5dce6] text-[#6e5a77] hover:bg-[#faf7fb]',
    link: 'text-[#80678f]',
  },
  blue: {
    primary: 'bg-[#446c96] hover:bg-[#385b80] disabled:bg-[#c5d4e3]',
    soft: 'border-[#d8e3ee] text-[#446c96] hover:bg-[#f4f8fc]',
    link: 'text-[#446c96]',
  },
  terracotta: {
    primary: 'bg-[#924433] hover:bg-[#7d3829] disabled:bg-[#dec2bc]',
    soft: 'border-[#ead5d0] text-[#71372b] hover:bg-[#fdf7f5]',
    link: 'text-[#843d2e]',
  },
  sage: {
    primary: 'bg-[#3d6347] hover:bg-[#31523a] disabled:bg-[#c3d5c7]',
    soft: 'border-[#d4e1d7] text-[#35573e] hover:bg-[#f5f9f6]',
    link: 'text-[#3d6347]',
  },
  teal: {
    primary: 'bg-[#2f6d73] hover:bg-[#24565b] disabled:bg-[#b8d1d4]',
    soft: 'border-[#cce0e2] text-[#1e4a4f] hover:bg-[#f4f9f9]',
    link: 'text-[#2f6d73]',
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
    <div className="no-print mobile-question-actions fixed inset-x-0 bottom-0 z-40 border-t border-[#e9e1eb] bg-white/95 px-3 pt-2 shadow-[0_-8px_28px_rgba(66,49,72,0.09)] backdrop-blur-xl sm:hidden">
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!canPrevious}
          className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border bg-white px-2.5 text-[13px] font-semibold disabled:cursor-not-allowed disabled:opacity-40 ${theme.soft}`}
        >
          <ArrowLeft size={15} /> အရင်မေးခွန်း
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-2.5 text-[13px] font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-50 ${theme.primary}`}
        >
          {isLast ? 'သုံးသပ်ရန်' : 'နောက်မေးခွန်း'}
          {isLast ? <ClipboardCheck size={15} /> : <ArrowRight size={15} />}
        </button>
      </div>
      <div className="mx-auto mt-1 flex max-w-3xl items-center justify-between gap-3 pb-[calc(0.45rem+env(safe-area-inset-bottom))]">
        {showSkip ? (
          <button type="button" onClick={onSkip} className={`inline-flex min-h-8 items-center gap-1 px-1 text-xs font-semibold ${theme.link}`}>
            <SkipForward size={13} /> ကျော်မယ်
          </button>
        ) : <span className="min-h-8" />}
        <button type="button" onClick={onReview} className={`min-h-8 px-1 text-xs font-semibold ${theme.link}`}>
          မေးခွန်းစာရင်း
        </button>
      </div>
    </div>
  )
}
