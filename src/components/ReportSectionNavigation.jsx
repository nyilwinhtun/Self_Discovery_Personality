export default function ReportSectionNavigation({ items, tone = 'plum' }) {
  const palette = tone === 'blue'
    ? { active: 'border-[#b9cce0] bg-[#edf4fb] text-[#456d97]', idle: 'border-[#e5edf5] bg-white text-[#71869b]' }
    : { active: 'border-[#d9c9e0] bg-[#f4eef6] text-[#725981]', idle: 'border-[#eee5ef] bg-white text-[#938698]' }

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav aria-label="ရလဒ်အပိုင်းများ" className="no-print sticky top-[66px] z-20 -mx-4 mb-6 border-y border-[#eee5ed] bg-[#fbf9fa]/95 px-3 py-2 backdrop-blur sm:static sm:mx-0 sm:rounded-2xl sm:border sm:px-3">
      <div className="flex gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => goTo(item.id)}
            className={`min-h-10 shrink-0 rounded-full border px-3.5 text-[11px] font-semibold transition ${item.active ? palette.active : palette.idle} hover:opacity-80`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
