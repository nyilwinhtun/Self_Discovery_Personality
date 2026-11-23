import { useRef, useState } from 'react'

const SHORT_LABELS = {
  1: 'လုံးဝမတူ',
  2: 'မတူပါ',
  3: 'မသေချာ',
  4: 'တူပါတယ်',
  5: 'အပြည့်အဝ',
}

const ACCENT_FEEDBACK = {
  plum: 'border-[#d9cce0] bg-[#f7f3fa] text-[#4a3856]',
  blue: 'border-[#c5d6e7] bg-[#f2f6fb] text-[#2f4b69]',
  terracotta: 'border-[#e5c9c2] bg-[#fcf4f2] text-[#662f23]',
  sage: 'border-[#c4d9c9] bg-[#f1f6f2] text-[#2c4a34]',
  teal: 'border-[#bfd8da] bg-[#eef6f6] text-[#1e4a4f]',
}

function getButtonToneClasses(value, isSelected) {
  if (!isSelected) {
    return 'border-[#ddd5ca] bg-[#fffdf9] text-[#595149] hover:border-[#b7aca0] hover:bg-[#f6f2ec]'
  }
  if (value <= 2) {
    return 'border-[#b86674] bg-[#fbf1f3] text-[#7a3342] shadow-[0_6px_14px_rgba(122,51,66,0.12)]'
  }
  if (value === 3) {
    return 'border-[#b39463] bg-[#f9f3e7] text-[#5b4a31] shadow-[0_6px_14px_rgba(91,74,49,0.12)]'
  }
  return 'border-[#4d8464] bg-[#eef6f1] text-[#26523a] shadow-[0_6px_14px_rgba(38,82,58,0.12)]'
}

function FaceIcon({ value }) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-7 w-7 shrink-0"
    >
      <circle cx="14" cy="14" r="10.5" />
      {value === 1 && (
        <>
          <path d="M8.6 9.8l2.8 1.2" />
          <path d="M19.4 9.8l-2.8 1.2" />
          <path d="M10.2 12.8v.1" strokeWidth="2.1" />
          <path d="M17.8 12.8v.1" strokeWidth="2.1" />
          <path d="M9.8 18.6c1.1-1.5 2.5-2.2 4.2-2.2s3.1.7 4.2 2.2" />
        </>
      )}
      {value === 2 && (
        <>
          <path d="M10.2 11.7v.1" strokeWidth="2.1" />
          <path d="M17.8 11.7v.1" strokeWidth="2.1" />
          <path d="M10.2 17.6c1.2-.5 2.5-.7 3.8-.6 1.3.1 2.5.5 3.8 1.1" />
        </>
      )}
      {value === 3 && (
        <>
          <path d="M10.2 11.7v.1" strokeWidth="2.1" />
          <path d="M17.8 11.7v.1" strokeWidth="2.1" />
          <path d="M10.2 17.2h7.6" />
        </>
      )}
      {value === 4 && (
        <>
          <path d="M10.2 11.7v.1" strokeWidth="2.1" />
          <path d="M17.8 11.7v.1" strokeWidth="2.1" />
          <path d="M9.8 16.2c1.1 1.4 2.5 2.1 4.2 2.1s3.1-.7 4.2-2.1" />
        </>
      )}
      {value === 5 && (
        <>
          <path d="M8.7 12.2c.5-.9 1.2-1.3 1.9-1.3s1.4.4 1.9 1.3" />
          <path d="M15.5 12.2c.5-.9 1.2-1.3 1.9-1.3s1.4.4 1.9 1.3" />
          <path d="M9.4 15.6c1.2 2 2.7 2.9 4.6 2.9s3.4-.9 4.6-2.9" />
        </>
      )}
    </svg>
  )
}

export default function LikertScaleSelector({
  options,
  value,
  onChange,
  accent = 'plum',
  ariaLabel = 'အဖြေရွေးချယ်မှု',
  startLabel = 'လုံးဝမကိုက်ညီပါ',
  endLabel = 'အလွန်ကိုက်ညီပါတယ်',
}) {
  const [hoveredValue, setHoveredValue] = useState(null)
  const buttonRefs = useRef([])
  const feedbackSelectedClass = ACCENT_FEEDBACK[accent] || ACCENT_FEEDBACK.plum
  const numericValue = value !== undefined && value !== null ? Number(value) : null

  const activePreviewValue = hoveredValue ?? numericValue
  const activeOption = options.find((item) => item.value === activePreviewValue) || null
  const selectedOption = options.find((item) => item.value === numericValue) || null

  const handleKeyDown = (event, index) => {
    let nextIndex = null
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (index + 1) % options.length
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (index - 1 + options.length) % options.length
    } else if (event.key >= '1' && event.key <= '5') {
      const targetIndex = options.findIndex((item) => item.value === Number(event.key))
      if (targetIndex !== -1) nextIndex = targetIndex
    }
    if (nextIndex === null) return
    event.preventDefault()
    const targetOption = options[nextIndex]
    onChange(targetOption.value)
    buttonRefs.current[nextIndex]?.focus()
  }

  return (
    <div className="rounded-2xl border border-[#ebe5dc] bg-[#faf8f5] p-2.5 sm:rounded-[1.5rem] sm:p-5">
      <div className="mb-1.5 flex items-center justify-between gap-2 px-0.5 text-xs font-semibold text-[#524b59] sm:mb-2.5">
        <span>{startLabel}</span>
        <span className="text-right">{endLabel}</span>
      </div>

      <div
        role="radiogroup"
        aria-label={ariaLabel}
        className="grid grid-cols-5 gap-1.5 py-0.5 sm:gap-2.5 sm:py-1"
      >
        {options.map((option, index) => {
          const isSelected = numericValue === option.value
          const toneClasses = getButtonToneClasses(option.value, isSelected)
          const shortLabel = SHORT_LABELS[option.value] || option.label

          return (
            <button
              key={option.value}
              ref={(node) => { buttonRefs.current[index] = node }}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={`${option.value} — ${option.label}`}
              onClick={() => onChange(option.value)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              onMouseEnter={() => setHoveredValue(option.value)}
              onMouseLeave={() => setHoveredValue(null)}
              onFocus={() => setHoveredValue(option.value)}
              onBlur={() => setHoveredValue(null)}
              className={`answer-option group flex min-h-[60px] min-w-0 flex-col items-center justify-center gap-1 rounded-xl border-[1.5px] px-1 py-1.5 text-center transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b5b4e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#faf8f5] sm:min-h-[68px] sm:gap-1.5 sm:rounded-2xl sm:py-2 ${toneClasses} ${isSelected ? 'scale-105' : 'hover:scale-[1.03]'}`}
            >
              <FaceIcon value={option.value} />
              <span className="w-full break-words text-xs font-semibold leading-[1.3]">
                {shortLabel}
              </span>
            </button>
          )
        })}
      </div>

      <div
        aria-live="polite"
        className={`mt-2 flex min-h-9 items-center justify-center rounded-xl border px-3 py-1.5 text-center text-xs font-semibold transition-colors sm:mt-2.5 sm:min-h-11 sm:px-3.5 sm:py-2 ${
          selectedOption || activeOption
            ? feedbackSelectedClass
            : 'border-[#ebe5dc] bg-[#fffdf9] text-[#524b59]'
        }`}
      >
        {activeOption ? (
          <span>
            {activeOption.value} · {activeOption.label}
          </span>
        ) : (
          <span>ကိုယ်နဲ့ ကိုက်ညီတဲ့ မျက်နှာပုံစံတစ်ခုကို ရွေးချယ်ပါ</span>
        )}
      </div>
    </div>
  )
}
