import { BookOpen, ClipboardCheck, History, Home } from 'lucide-react'

const items = [
  { id: 'home', label: 'ပင်မ', Icon: Home },
  { id: 'assessment', label: 'ဆန်းစစ်မှု', Icon: ClipboardCheck },
  { id: 'knowledge', label: 'အသိပညာ', Icon: BookOpen },
  { id: 'history', label: 'မှတ်တမ်း', Icon: History },
]

export default function MobileBottomNavigation({ active, onHome, onAssessment, onKnowledge, onHistory }) {
  const handlers = { home: onHome, assessment: onAssessment, knowledge: onKnowledge, history: onHistory }
  return (
    <nav aria-label="အဓိက လမ်းညွှန်" className="no-print mobile-app-navigation fixed inset-x-0 bottom-0 z-40 border-t border-[#e9e1eb] bg-white/95 px-2 pt-2 shadow-[0_-8px_28px_rgba(66,49,72,0.08)] backdrop-blur-xl sm:hidden">
      <div className="mx-auto grid max-w-xl grid-cols-4 gap-1 pb-[calc(0.45rem+env(safe-area-inset-bottom))]">
        {items.map(({ id, label, Icon }) => {
          const selected = active === id
          return (
            <button
              key={id}
              type="button"
              onClick={handlers[id]}
              aria-current={selected ? 'page' : undefined}
              className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[10px] font-semibold transition ${selected ? 'bg-[#f4eef6] text-[#725981]' : 'text-[#968a9a] hover:bg-[#faf7fb] hover:text-[#725981]'}`}
            >
              <Icon size={19} strokeWidth={selected ? 2.3 : 1.8} />
              <span>{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
