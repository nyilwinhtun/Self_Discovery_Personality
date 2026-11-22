import { useRef, useState } from 'react'

const ACCENT_THEMES = {
  plum: {
    selectedDisagree: 'border-[#9a5f72] bg-[#9a5f72] text-white shadow-[0_6px_16px_rgba(154,95,114,0.22)]',
    ringDisagree: 'border-[#c8a9b3] bg-[#fffdf9] text-[#5c3e49] hover:border-[#9a5f72] hover:bg-[#faf3f5]',
    selectedNeutral: 'border-[#6f675f] bg-[#6f675f] text-white shadow-[0_6px_16px_rgba(111,103,95,0.2)]',
    ringNeutral: 'border-[#cfc7bc] bg-[#fffdf9] text-[#524b59] hover:border-[#8f867c] hover:bg-[#f6f3ee]',
    selectedAgree: 'border-[#6d547c] bg-[#6d547c] text-white shadow-[0_6px_16px_rgba(109,84,124,0.24)]',
    ringAgree: 'border-[#bba9c7] bg-[#fffdf9] text-[#4e3b59] hover:border-[#6d547c] hover:bg-[#f6f2f9]',
    feedbackSelected: 'border-[#d9cce0] bg-[#f7f3fa] text-[#4a3856]',
  },
  blue: {
    selectedDisagree: 'border-[#9a5f72] bg-[#9a5f72] text-white shadow-[0_6px_16px_rgba(154,95,114,0.22)]',
    ringDisagree: 'border-[#c8a9b3] bg-[#fffdf9] text-[#5c3e49] hover:border-[#9a5f72] hover:bg-[#faf3f5]',
    selectedNeutral: 'border-[#6f675f] bg-[#6f675f] text-white shadow-[0_6px_16px_rgba(111,103,95,0.2)]',
    ringNeutral: 'border-[#cfc7bc] bg-[#fffdf9] text-[#524b59] hover:border-[#8f867c] hover:bg-[#f6f3ee]',
    selectedAgree: 'border-[#3f648c] bg-[#3f648c] text-white shadow-[0_6px_16px_rgba(63,100,140,0.24)]',
    ringAgree: 'border-[#a7bfd8] bg-[#fffdf9] text-[#355373] hover:border-[#3f648c] hover:bg-[#f2f6fb]',
    feedbackSelected: 'border-[#c5d6e7] bg-[#f2f6fb] text-[#2f4b69]',
  },
  terracotta: {
    selectedDisagree: 'border-[#6f675f] bg-[#6f675f] text-white shadow-[0_6px_16px_rgba(111,103,95,0.22)]',
    ringDisagree: 'border-[#cfc7bc] bg-[#fffdf9] text-[#524b59] hover:border-[#8f867c] hover:bg-[#f6f3ee]',
    selectedNeutral: 'border-[#8a7568] bg-[#8a7568] text-white shadow-[0_6px_16px_rgba(138,117,104,0.2)]',
    ringNeutral: 'border-[#d6cabf] bg-[#fffdf9] text-[#524b59] hover:border-[#9c8779] hover:bg-[#f8f4f0]',
    selectedAgree: 'border-[#924433] bg-[#924433] text-white shadow-[0_6px_16px_rgba(146,68,51,0.24)]',
    ringAgree: 'border-[#d8b1a8] bg-[#fffdf9] text-[#662f23] hover:border-[#924433] hover:bg-[#fcf4f2]',
    feedbackSelected: 'border-[#e5c9c2] bg-[#fcf4f2] text-[#662f23]',
  },
  sage: {
    selectedDisagree: 'border-[#9a5f72] bg-[#9a5f72] text-white shadow-[0_6px_16px_rgba(154,95,114,0.22)]',
    ringDisagree: 'border-[#c8a9b3] bg-[#fffdf9] text-[#5c3e49] hover:border-[#9a5f72] hover:bg-[#faf3f5]',
    selectedNeutral: 'border-[#6f675f] bg-[#6f675f] text-white shadow-[0_6px_16px_rgba(111,103,95,0.2)]',
    ringNeutral: 'border-[#cfc7bc] bg-[#fffdf9] text-[#524b59] hover:border-[#8f867c] hover:bg-[#f6f3ee]',
    selectedAgree: 'border-[#3d6347] bg-[#3d6347] text-white shadow-[0_6px_16px_rgba(61,99,71,0.24)]',
    ringAgree: 'border-[#abc4b1] bg-[#fffdf9] text-[#2c4a34] hover:border-[#3d6347] hover:bg-[#f1f6f2]',
    feedbackSelected: 'border-[#c4d9c9] bg-[#f1f6f2] text-[#2c4a34]',
  },
}

const CIRCLE_SIZES = {
  1: 'h-11 w-11 sm:h-12 sm:w-12 text-sm',
  2: 'h-9 w-9 sm:h-10 sm:w-10 text-xs',
  3: 'h-8 w-8 sm:h-8 sm:w-8 text-xs',
  4: 'h-9 w-9 sm:h-10 sm:w-10 text-xs',
  5: 'h-11 w-11 sm:h-12 sm:w-12 text-sm',
}

function getToneClasses(value, isSelected, palette) {
  if (value <= 2) return isSelected ? palette.selectedDisagree : palette.ringDisagree
  if (value === 3) return isSelected ? palette.selectedNeutral : palette.ringNeutral
  return isSelected ? palette.selectedAgree : palette.ringAgree
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
  const palette = ACCENT_THEMES[accent] || ACCENT_THEMES.plum
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
    <div className="rounded-[1.5rem] border border-[#ebe5dc] bg-[#faf8f5] p-4 sm:p-5">
      <div className="mb-2 flex items-center justify-between gap-2 text-[11px] font-semibold text-[#524b59]">
        <span>{startLabel}</span>
        <span className="text-right">{endLabel}</span>
      </div>

      <div
        role="radiogroup"
        aria-label={ariaLabel}
        className="flex items-center justify-between gap-1.5 py-2 sm:gap-3"
      >
        {options.map((option, index) => {
          const isSelected = numericValue === option.value
          const circleSize = CIRCLE_SIZES[option.value] || CIRCLE_SIZES[3]
          const toneClasses = getToneClasses(option.value, isSelected, palette)

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
              className="answer-option group flex min-h-11 min-w-11 flex-1 items-center justify-center rounded-2xl py-1 focus-visible:outline-none"
            >
              <span
                className={`grid place-items-center rounded-full border-2 font-bold transition-all duration-150 group-focus-visible:ring-4 group-focus-visible:ring-[#7d648c]/35 ${circleSize} ${toneClasses} ${isSelected ? 'scale-105' : 'group-hover:scale-105'}`}
              >
                {option.value}
              </span>
            </button>
          )
        })}
      </div>

      <div
        aria-live="polite"
        className={`mt-2 flex min-h-11 items-center justify-center rounded-xl border px-3.5 py-2 text-center text-xs font-semibold transition-colors ${
          selectedOption || activeOption
            ? palette.feedbackSelected
            : 'border-[#ebe5dc] bg-[#fffdf9] text-[#524b59]'
        }`}
      >
        {activeOption ? (
          <span>
            {activeOption.value} · {activeOption.label}
          </span>
        ) : (
          <span>၁ မှ ၅ အတွင်း ကိုယ်နဲ့ ကိုက်ညီတဲ့ စက်ဝိုင်းကို ရွေးချယ်ပါ</span>
        )}
      </div>
    </div>
  )
}
