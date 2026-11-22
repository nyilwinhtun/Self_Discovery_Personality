import { useEffect, useRef, useState } from 'react'

const TONE_PALETTES = {
  plum: { active: 'border-[#d9c9e0] bg-[#f4eef6] text-[#725981]', idle: 'border-[#eee5ef] bg-white text-[#6b5e70]' },
  blue: { active: 'border-[#b9cce0] bg-[#edf4fb] text-[#456d97]', idle: 'border-[#e5edf5] bg-white text-[#4e6379]' },
  terracotta: { active: 'border-[#e0bfb8] bg-[#fbf0ed] text-[#7c392b]', idle: 'border-[#f0e1de] bg-white text-[#6d4b44]' },
  sage: { active: 'border-[#bfd3c4] bg-[#eef5f0] text-[#33573d]', idle: 'border-[#dce6de] bg-white text-[#475e4d]' },
  teal: { active: 'border-[#b5d2d5] bg-[#eaf4f4] text-[#1e4a4f]', idle: 'border-[#d8e8ea] bg-white text-[#3a5a5e]' },
}

export default function ReportSectionNavigation({ items, tone = 'plum' }) {
  const [activeId, setActiveId] = useState(items[0]?.id || '')
  const navRef = useRef(null)
  const palette = TONE_PALETTES[tone] || TONE_PALETTES.plum

  const itemKey = items.map((item) => item.id).join('|')

  useEffect(() => {
    if (!items.length) return undefined
    setActiveId((prev) => (items.some((item) => item.id === prev) ? prev : items[0].id))

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean)
    if (!elements.length) return undefined

    let observer
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          if (visible[0]?.target?.id) {
            setActiveId(visible[0].target.id)
          }
        },
        { rootMargin: '-22% 0px -60% 0px', threshold: 0.01 },
      )
      elements.forEach((el) => observer.observe(el))
    }

    const handleScroll = () => {
      const offset = 150
      let current = items[0].id
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= offset) {
          current = el.id
        }
      }
      setActiveId(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      observer?.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [itemKey])

  useEffect(() => {
    const activeButton = navRef.current?.querySelector(`[data-section-id="${activeId}"]`)
    activeButton?.scrollIntoView?.({ behavior: 'smooth', inline: 'nearest', block: 'nearest' })
  }, [activeId])

  const goTo = (id) => {
    setActiveId(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav aria-label="ရလဒ်အပိုင်းများ" className="no-print sticky top-[66px] z-20 -mx-4 mb-6 border-y border-[#eee5ed] bg-[#fbf9fa]/95 px-3 py-2 backdrop-blur sm:static sm:mx-0 sm:rounded-2xl sm:border sm:px-3">
      <div ref={navRef} className="flex gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const isActive = item.active ?? activeId === item.id
          return (
            <button
              key={item.id}
              type="button"
              data-section-id={item.id}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => goTo(item.id)}
              className={`min-h-10 shrink-0 rounded-full border px-3.5 text-[11px] font-semibold transition ${isActive ? palette.active : palette.idle} hover:opacity-80`}
            >
              {item.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
