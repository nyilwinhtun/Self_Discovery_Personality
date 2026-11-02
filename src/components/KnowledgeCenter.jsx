import { useMemo, useState } from 'react'
import {
  AlertTriangle, ArrowLeft, BookOpen, Brain, CheckCircle2, ChevronRight,
  ExternalLink, HeartHandshake, Lightbulb, Search, ShieldAlert, Sparkles, X,
} from 'lucide-react'
import glossary from '../data/knowledgeGlossaryDraftV01.json'

const CATEGORY_ICONS = {
  'emotions-stress': HeartHandshake,
  'thinking-cognition': Brain,
  'behavior-habits': Sparkles,
  relationships: HeartHandshake,
  'self-understanding': Lightbulb,
  'psychology-growth': BookOpen,
}

export default function KnowledgeCenter({ onBack }) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedId, setSelectedId] = useState(null)

  const selectedTerm = glossary.terms.find((term) => term.id === selectedId) || null
  const filteredTerms = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    return glossary.terms.filter((term) => {
      const matchesCategory = activeCategory === 'all' || term.category_id === activeCategory
      const searchable = [term.term_en, term.term_my, term.definition_simple, term.daily_example, term.distinction]
        .join(' ')
        .toLocaleLowerCase()
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery))
    })
  }, [query, activeCategory])

  const openList = () => setSelectedId(null)

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8 lg:px-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button onClick={selectedTerm ? openList : onBack} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#e8dfe9] bg-white px-3 py-2 text-xs font-semibold text-[#6d5a74] hover:bg-[#faf7fb]">
          <ArrowLeft size={15} /> {selectedTerm ? 'စကားလုံးစာရင်းသို့ ပြန်သွားမယ်' : 'ပင်မစာမျက်နှာသို့ ပြန်သွားမယ်'}
        </button>
        <span className="rounded-full border border-[#eadfc9] bg-[#fff7e8] px-3 py-1.5 text-[10px] font-bold text-[#98713a]">BETA · မူကြမ်းအကြောင်းအရာ</span>
      </div>

      <section className="overflow-hidden rounded-[2rem] border border-[#e9e0ed] bg-gradient-to-br from-[#f1ebf6] via-[#fbf8fb] to-[#f7edf0] p-5 shadow-sm sm:p-8">
        <div className="flex items-start gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white text-[#80678f] shadow-sm"><BookOpen size={27} /></span>
          <div className="min-w-0">
            <p className="text-[10px] font-bold tracking-[0.16em] text-[#9a86a2]">KNOWLEDGE CENTER</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#493b50] sm:text-3xl">စိတ်ပညာနဲ့ လူ့အပြုအမူဆိုင်ရာ အသိပညာများ</h1>
            <p className="mt-3 max-w-3xl text-xs leading-7 text-[#786d7d] sm:text-sm">စိတ်ခံစားမှု၊ အတွေးအခေါ်၊ အပြုအမူနဲ့ လူမှုဆက်ဆံရေးဆိုင်ရာ စကားလုံးတွေကို နေ့စဉ်ဘဝ ဥပမာတွေနဲ့ လေ့လာနိုင်ပါတယ်။</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2 sm:max-w-md">
          <div className="rounded-xl border border-white/80 bg-white/75 p-3"><p className="text-xl font-bold text-[#80678f]">{glossary.terms.length}</p><p className="mt-1 text-[10px] text-[#8e8292]">လေ့လာရန် စကားလုံး</p></div>
          <div className="rounded-xl border border-white/80 bg-white/75 p-3"><p className="text-xl font-bold text-[#80678f]">{glossary.categories.length}</p><p className="mt-1 text-[10px] text-[#8e8292]">အကြောင်းအရာ အုပ်စု</p></div>
        </div>
      </section>

      <section role="note" aria-label="မူကြမ်းသတိပေးချက်" className="mt-5 rounded-2xl border border-[#ead8b9] bg-[#fffaf1] p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#f8edd8] text-[#9a743e]"><ShieldAlert size={19} /></span>
          <div>
            <div className="flex flex-wrap items-center gap-2"><h2 className="text-sm font-bold text-[#715832]">အရေးကြီးသော သတိပြုရန်</h2><span className="rounded-full bg-[#f8edd8] px-2 py-0.5 text-[9px] font-bold text-[#98713a]">DRAFT 0.1.0</span></div>
            <p className="mt-1.5 text-[11px] leading-6 text-[#806f58]">ဒီစာမျက်နှာရှိ စကားလုံး ၃၀ သည် စမ်းသပ်ဖတ်ရှုနိုင်ရန် ထည့်ထားသော မူကြမ်းများသာ ဖြစ်ပါတယ်။ မြန်မာဘာသာကျွမ်းကျင်သူနဲ့ အရည်အချင်းပြည့်မီတဲ့ စိတ်ပညာပညာရှင်တို့ရဲ့ ပြန်လည်စစ်ဆေးမှု မပြီးသေးပါ။ ထို့ကြောင့် အတည်ပြုထားသော ပညာရေးအကြောင်းအရာအဖြစ် မယူဆပါနှင့်။ ဒီအကြောင်းအရာများသည် ရောဂါရှာဖွေခြင်း သို့မဟုတ် ကုသမှုအတွက် မဟုတ်ပါ။</p>
          </div>
        </div>
        <div className="mt-3 grid gap-2 text-[10px] text-[#806f58] sm:grid-cols-2">
          <div className="flex items-center gap-2 rounded-lg bg-white/70 px-3 py-2"><AlertTriangle size={14} /> ဘာသာစကား စစ်ဆေးမှု — မပြီးသေးပါ</div>
          <div className="flex items-center gap-2 rounded-lg bg-white/70 px-3 py-2"><AlertTriangle size={14} /> စိတ်ပညာ စစ်ဆေးမှု — မပြီးသေးပါ</div>
        </div>
      </section>

      {selectedTerm ? (
        <article className="mt-6 space-y-4">
          <div className="rounded-2xl border border-[#eae2eb] bg-white p-5 shadow-sm sm:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#f3edf5] px-3 py-1 text-[10px] font-semibold text-[#80678f]">{selectedTerm.category_name_my}</span>
              <span className="rounded-full bg-[#fff5e6] px-3 py-1 text-[10px] font-semibold text-[#98713a]">မူကြမ်း · {selectedTerm.content_version}</span>
            </div>
            <p className="mt-5 text-xs font-semibold tracking-wide text-[#a18fa7]">{selectedTerm.term_en}</p>
            <h2 className="mt-1 text-2xl font-bold leading-relaxed text-[#493b50]">{selectedTerm.term_my}</h2>
            <div className="mt-5 rounded-xl bg-[#f8f4fa] p-4">
              <h3 className="text-xs font-bold text-[#725c7d]">အလွယ်နားလည်ရန်</h3>
              <p className="mt-2 text-sm leading-8 text-[#63586a]">{selectedTerm.definition_simple}</p>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <section className="rounded-xl border border-[#e5eee7] bg-[#f8fbf8] p-4">
                <h3 className="text-xs font-bold text-[#58715c]">နေ့စဉ်ဘဝ ဥပမာ</h3>
                <p className="mt-2 text-xs leading-7 text-[#68766a]">{selectedTerm.daily_example}</p>
              </section>
              <section className="rounded-xl border border-[#e7e4ee] bg-[#faf9fc] p-4">
                <h3 className="text-xs font-bold text-[#6d6281]">ဆင်တူစကားလုံးနဲ့ ကွာခြားချက်</h3>
                <p className="mt-2 text-xs leading-7 text-[#71697a]">{selectedTerm.distinction}</p>
              </section>
            </div>
            <section className="mt-4 rounded-xl border border-[#f0e2d9] bg-[#fffaf7] p-4">
              <h3 className="text-xs font-bold text-[#956d57]">သတိပြုရန်</h3>
              <p className="mt-2 text-xs leading-7 text-[#806d63]">{selectedTerm.caution}</p>
            </section>
          </div>

          <section className="rounded-2xl border border-[#eae2eb] bg-white p-5 shadow-sm sm:p-6">
            <h3 className="text-sm font-bold text-[#514357]">ကိုးကားရင်းမြစ်များ</h3>
            <p className="mt-1 text-[10px] leading-5 text-[#9a8f9e]">အဓိပ္ပာယ်မူကြမ်းရေးရာတွင် ကိုးကားထားသော အရင်းအမြစ်များ။ အရင်းအမြစ်တစ်ခုစီကို အကြောင်းအရာတစ်ခုလုံးအတွက် အတည်ပြုချက်ဟု မယူဆပါနှင့်။</p>
            <div className="mt-3 space-y-2">
              {(selectedTerm.sources || []).map((source) => (
                <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="flex min-h-11 items-center justify-between gap-3 rounded-xl border border-[#eee7ef] px-3 py-2 text-xs font-medium text-[#6f5a78] hover:bg-[#faf7fb]">
                  <span>{source.title}</span><ExternalLink size={14} className="shrink-0" />
                </a>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#eadfc9] bg-[#fffaf1] p-4">
            <h3 className="text-xs font-bold text-[#715832]">အကြောင်းအရာ စစ်ဆေးမှုအခြေအနေ</h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <div className="rounded-lg bg-white/75 p-3"><p className="text-[10px] text-[#9a8667]">မြန်မာဘာသာ စစ်ဆေးမှု</p><p className="mt-1 text-xs font-semibold text-[#856d45]">စစ်ဆေးရန် ကျန်ရှိ</p></div>
              <div className="rounded-lg bg-white/75 p-3"><p className="text-[10px] text-[#9a8667]">စိတ်ပညာဆိုင်ရာ စစ်ဆေးမှု</p><p className="mt-1 text-xs font-semibold text-[#856d45]">စစ်ဆေးရန် ကျန်ရှိ</p></div>
            </div>
            <p className="mt-3 text-[10px] leading-5 text-[#8a795f]">စစ်ဆေးသူအမည်၊ အရည်အချင်းနဲ့ ရက်စွဲတွေကို တကယ်စစ်ဆေးပြီးမှသာ ထည့်သွင်းဖော်ပြပါမယ်။</p>
          </section>
        </article>
      ) : (
        <section className="mt-7">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="text-[10px] font-bold tracking-[0.15em] text-[#a18fa7]">EXPLORE TERMS</p><h2 className="mt-1 text-lg font-bold text-[#514357]">စကားလုံးများကို ရှာဖွေပါ</h2><p className="mt-1 text-[11px] text-[#938796]">မြန်မာ သို့မဟုတ် အင်္ဂလိပ်စကားလုံးနဲ့ ရှာနိုင်ပါတယ်။</p></div>
            <span className="text-[11px] font-semibold text-[#8c7e90]">တွေ့ရှိမှု {filteredTerms.length} ခု</span>
          </div>
          <label className="flex min-h-12 items-center gap-3 rounded-2xl border border-[#e7dfe8] bg-white px-4 shadow-sm focus-within:border-[#bba8c4]">
            <Search size={18} className="shrink-0 text-[#9b8ba0]" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ဥပမာ — Stress, စိတ်ဖိစီးမှု, ကိုယ့်ကိုယ်ကို..." className="min-w-0 flex-1 bg-transparent text-xs text-[#514357] outline-none placeholder:text-[#b0a6b2]" />
            {query && <button onClick={() => setQuery('')} aria-label="ရှာဖွေမှုရှင်းရန်" className="rounded-lg p-1 text-[#95889a] hover:bg-[#f5f0f6]"><X size={15}/></button>}
          </label>

          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <button onClick={() => setActiveCategory('all')} className={`min-h-11 rounded-xl border px-3 py-2 text-left text-xs font-semibold transition ${activeCategory === 'all' ? 'border-[#bba8c4] bg-[#f4eef6] text-[#705b7a]' : 'border-[#eae2eb] bg-white text-[#817487] hover:bg-[#faf7fb]'}`}>
              အမျိုးအစားအားလုံး <span className="ml-1 text-[10px] opacity-70">{glossary.terms.length}</span>
            </button>
            {glossary.categories.map((category) => {
              const Icon = CATEGORY_ICONS[category.id] || BookOpen
              const count = glossary.terms.filter((term) => term.category_id === category.id).length
              return (
                <button key={category.id} onClick={() => setActiveCategory(category.id)} className={`flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs font-semibold transition ${activeCategory === category.id ? 'border-[#bba8c4] bg-[#f4eef6] text-[#705b7a]' : 'border-[#eae2eb] bg-white text-[#817487] hover:bg-[#faf7fb]'}`}>
                  <Icon size={15} className="shrink-0"/><span className="min-w-0 flex-1">{category.name_my}</span><span className="text-[10px] opacity-70">{count}</span>
                </button>
              )
            })}
          </div>

          {filteredTerms.length ? (
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {filteredTerms.map((term) => (
                <button key={term.id} onClick={() => { setSelectedId(term.id); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="group flex min-h-[132px] flex-col rounded-2xl border border-[#eae2eb] bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#cdbdd2] hover:shadow-md sm:p-5">
                  <div className="flex w-full items-start justify-between gap-2"><span className="text-[10px] font-semibold text-[#9b8da0]">{term.term_en}</span><span className="rounded-full bg-[#fff5e6] px-2 py-1 text-[9px] font-semibold text-[#98713a]">မူကြမ်း</span></div>
                  <h3 className="mt-2 text-base font-bold leading-relaxed text-[#514357]">{term.term_my}</h3>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-6 text-[#8b808e]">{term.definition_simple}</p>
                  <div className="mt-auto flex items-center justify-between gap-2 pt-3"><span className="text-[9px] text-[#a18fa7]">{term.category_name_my}</span><span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#80678f]">ဖတ်ရန် <ChevronRight size={13}/></span></div>
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-[#dcd1df] bg-white p-8 text-center"><Search size={24} className="mx-auto text-[#b2a4b8]"/><p className="mt-3 text-sm font-semibold text-[#6b5a72]">ရှာဖွေထားတဲ့ စကားလုံး မတွေ့ပါ</p><p className="mt-1 text-xs text-[#9a8d9e]">စာလုံးပေါင်းကို ပြန်စစ်ပါ၊ ဒါမှမဟုတ် အခြားစကားလုံးနဲ့ ရှာကြည့်ပါ။</p><button onClick={() => { setQuery(''); setActiveCategory('all') }} className="mt-4 rounded-xl bg-[#80678f] px-4 py-2.5 text-xs font-semibold text-white">ရှာဖွေမှု ပြန်စမယ်</button></div>
          )}
        </section>
      )}

      <footer className="mt-10 border-t border-[#eae2eb] pt-5 text-center">
        <p className="text-[10px] font-semibold text-[#8e8192]">Knowledge Center · Draft Content 0.1.0</p>
        <p className="mt-1 text-[10px] leading-5 text-[#a49aa7]">အကြောင်းအရာကို ပြန်လည်သုံးသပ်ပြီး အတည်ပြုမှုများ ပြည့်စုံလာသည်နှင့် Version အသစ်များ ထုတ်ပြန်သွားပါမည်။</p>
      </footer>
    </main>
  )
}
