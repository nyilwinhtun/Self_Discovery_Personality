import { useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle, ArrowLeft, BookOpen, Brain, ChevronRight,
  ExternalLink, HeartHandshake, Lightbulb, Search, ShieldAlert, Sparkles, X,
} from 'lucide-react'
import glossary from '../data/knowledgeGlossaryDraftV01.json'
import { KNOWLEDGE_QUESTION_CONCEPTS } from '../data/knowledgeQuestionConcepts.js'

const CATEGORY_ICONS = {
  'emotions-stress': HeartHandshake,
  'thinking-cognition': Brain,
  'behavior-habits': Sparkles,
  relationships: HeartHandshake,
  'self-understanding': Lightbulb,
  'psychology-growth': BookOpen,
}

function normalizeForSearch(value) {
  return String(value || '')
    .normalize('NFC')
    .toLocaleLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
}

function stripSearchWhitespace(value) {
  return value.replace(/[\s\u200B-\u200D\uFEFF]+/g, '')
}

function getRelatedTerms(term, allTerms) {
  if (!term) return []
  const haystacks = [term.distinction, term.definition_simple].join(' ').toLocaleLowerCase()
  const mentioned = allTerms.filter((candidate) => {
    if (candidate.id === term.id) return false
    const en = (candidate.term_en || '').toLocaleLowerCase()
    const my = (candidate.term_my || '').toLocaleLowerCase()
    return (en && haystacks.includes(en)) || (my && haystacks.includes(my))
  })
  const sameCategory = allTerms.filter(
    (candidate) => candidate.id !== term.id && candidate.category_id === term.category_id && !mentioned.some((m) => m.id === candidate.id),
  )
  return [...mentioned, ...sameCategory].slice(0, 4)
}

export default function KnowledgeCenter({ onBack, initialTermId = null, returnLabel = null }) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [onlyQuestionConcepts, setOnlyQuestionConcepts] = useState(false)
  const [expandedIds, setExpandedIds] = useState(() => new Set())
  const [selectedId, setSelectedId] = useState(initialTermId)

  const allTerms = useMemo(
    () => [...KNOWLEDGE_QUESTION_CONCEPTS, ...(glossary.terms || [])],
    [],
  )

  useEffect(() => {
    if (initialTermId) {
      setSelectedId(initialTermId)
    }
  }, [initialTermId])

  const selectedTerm = allTerms.find((term) => term.id === selectedId) || null
  const relatedTerms = useMemo(() => getRelatedTerms(selectedTerm, allTerms), [selectedTerm, allTerms])

  const filteredTerms = useMemo(() => {
    const normalizedQuery = normalizeForSearch(query)
    const compactQuery = stripSearchWhitespace(normalizedQuery)
    return allTerms.filter((term) => {
      if (onlyQuestionConcepts && !term.isQuestionConcept) return false
      const matchesCategory = activeCategory === 'all' || term.category_id === activeCategory
      const searchable = normalizeForSearch(
        [
          term.term_en,
          term.term_my,
          term.summary_short,
          term.definition_simple,
          term.daily_example,
          term.distinction,
          term.assessment_context,
        ].join(' '),
      )
      const compactSearchable = stripSearchWhitespace(searchable)
      const matchesQuery =
        !normalizedQuery ||
        searchable.includes(normalizedQuery) ||
        compactSearchable.includes(compactQuery)
      return matchesCategory && matchesQuery
    })
  }, [allTerms, query, activeCategory, onlyQuestionConcepts])

  const toggleExpand = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const openList = () => setSelectedId(null)

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8 lg:px-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button onClick={selectedTerm ? openList : onBack} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#e8dfe9] bg-white px-3 py-2 text-xs font-semibold text-[#57495e] hover:bg-[#faf7fb]">
          <ArrowLeft size={15} strokeWidth={1.75} /> {selectedTerm ? 'စကားလုံးစာရင်းသို့ ပြန်သွားမယ်' : (returnLabel || 'ပင်မစာမျက်နှာသို့ ပြန်သွားမယ်')}
        </button>
        <div className="flex flex-wrap items-center gap-2">
          {selectedTerm && returnLabel && (
            <button onClick={onBack} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#ded1e4] bg-[#f8f4fa] px-3 py-2 text-xs font-semibold text-[#5e466b] hover:bg-[#f1e9f5]">
              <ArrowLeft size={14} strokeWidth={1.75} /> {returnLabel}
            </button>
          )}
          <span className="rounded-full border border-[#eadfc9] bg-[#fff7e8] px-3 py-1.5 text-xs font-bold text-[#744d1b]">BETA · မူကြမ်းအကြောင်းအရာ</span>
        </div>
      </div>

      <section className="overflow-hidden rounded-[2rem] border border-[#e7dfd3] bg-gradient-to-br from-[#faf8f5] via-[#fbf9f6] to-[#f4eef6] p-5 shadow-sm sm:p-8">
        <div className="flex items-start gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-[#e7dfd3] bg-white text-[#5d476b] shadow-sm">
            <BookOpen size={26} strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-bold tracking-[0.16em] text-[#5c5350]">KNOWLEDGE CENTER</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#1c1917] sm:text-3xl">စိတ်ပညာနဲ့ လူ့အပြုအမူဆိုင်ရာ အသိပညာများ</h1>
            <p className="mt-3 max-w-3xl text-xs leading-7 text-[#57534e] sm:text-sm">စိတ်ခံစားမှု၊ အတွေးအခေါ်၊ အပြုအမူ၊ လူမှုဆက်ဆံရေးနဲ့ မေးခွန်းများထဲက အဓိက စကားလုံးတွေကို နေ့စဉ်ဘဝ ဥပမာတွေနဲ့ လေ့လာနိုင်ပါတယ်။</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2 sm:max-w-md">
          <div className="rounded-xl border border-[#e7dfd3] bg-white/85 p-3">
            <p className="text-xl font-bold text-[#5d476b]">{allTerms.length}</p>
            <p className="mt-1 text-xs text-[#57534e]">လေ့လာရန် စကားလုံး</p>
          </div>
          <div className="rounded-xl border border-[#e7dfd3] bg-white/85 p-3">
            <p className="text-xl font-bold text-[#5d476b]">{glossary.categories.length}</p>
            <p className="mt-1 text-xs text-[#57534e]">အကြောင်းအရာ အုပ်စု</p>
          </div>
        </div>
      </section>

      <section role="note" aria-label="မူကြမ်းသတိပေးချက်" className="mt-5 rounded-2xl border border-[#ead8b9] bg-[#fffaf1] p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#f8edd8] text-[#744d1b]"><ShieldAlert size={19} strokeWidth={1.75} /></span>
          <div>
            <div className="flex flex-wrap items-center gap-2"><h2 className="text-sm font-bold text-[#5f4723]">အရေးကြီးသော သတိပြုရန်</h2><span className="rounded-full bg-[#f8edd8] px-2 py-0.5 text-xs font-bold text-[#744d1b]">DRAFT 0.1.0</span></div>
            <p className="mt-1.5 text-xs leading-7 text-[#6b5a42]">ဒီစာမျက်နှာရှိ အကြောင်းအရာများသည် စမ်းသပ်ဖတ်ရှုနိုင်ရန် ထည့်ထားသော မူကြမ်းများသာ ဖြစ်ပါတယ်။ မြန်မာဘာသာကျွမ်းကျင်သူနဲ့ အရည်အချင်းပြည့်မီတဲ့ စိတ်ပညာပညာရှင်တို့ရဲ့ ပြန်လည်စစ်ဆေးမှု မပြီးသေးပါ။ ထို့ကြောင့် အတည်ပြုထားသော ပညာရေးအကြောင်းအရာအဖြစ် မယူဆပါနှင့်။ ဒီအကြောင်းအရာများသည် ရောဂါရှာဖွေခြင်း သို့မဟုတ် ကုသမှုအတွက် မဟုတ်ပါ။</p>
          </div>
        </div>
        <div className="mt-3 grid gap-2 text-xs text-[#6b5a42] sm:grid-cols-2">
          <div className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2"><AlertTriangle size={14} strokeWidth={1.75} /> ဘာသာစကား စစ်ဆေးမှု — မပြီးသေးပါ</div>
          <div className="flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2"><AlertTriangle size={14} strokeWidth={1.75} /> စိတ်ပညာ စစ်ဆေးမှု — မပြီးသေးပါ</div>
        </div>
      </section>

      {selectedTerm ? (
        <article className="mt-6 space-y-4">
          <div className="rounded-2xl border border-[#e7dfd3] bg-white p-5 shadow-sm sm:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#f3edf5] px-3 py-1 text-xs font-semibold text-[#5d476b]">{selectedTerm.category_name_my}</span>
              {selectedTerm.assessment_context && (
                <span className="rounded-full bg-[#faf8f5] border border-[#e7dfd3] px-3 py-1 text-xs font-semibold text-[#57534e]">{selectedTerm.assessment_context}</span>
              )}
              <span className="rounded-full bg-[#fff5e6] px-3 py-1 text-xs font-semibold text-[#744d1b]">မူကြမ်း · {selectedTerm.content_version}</span>
            </div>
            <p className="mt-5 text-xs font-semibold tracking-wide text-[#57534e]">{selectedTerm.term_en}</p>
            <h2 className="mt-1 text-2xl font-bold leading-relaxed text-[#1c1917]">{selectedTerm.term_my}</h2>
            <div className="mt-5 rounded-xl bg-[#f8f4fa] p-4">
              <h3 className="text-xs font-bold text-[#5d476b]">အလွယ်နားလည်ရန်</h3>
              <p className="mt-2 text-sm leading-8 text-[#292524]">{selectedTerm.definition_simple}</p>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <section className="rounded-xl border border-[#e5eee7] bg-[#f8fbf8] p-4">
                <h3 className="text-xs font-bold text-[#3d5741]">နေ့စဉ်ဘဝ ဥပမာ</h3>
                <p className="mt-2 text-xs leading-7 text-[#435145]">{selectedTerm.daily_example}</p>
              </section>
              <section className="rounded-xl border border-[#e7e4ee] bg-[#faf9fc] p-4">
                <h3 className="text-xs font-bold text-[#534966]">ဆင်တူစကားလုံးနဲ့ ကွာခြားချက်</h3>
                <p className="mt-2 text-xs leading-7 text-[#4c4557]">{selectedTerm.distinction}</p>
              </section>
            </div>
            <section className="mt-4 rounded-xl border border-[#f0e2d9] bg-[#fffaf7] p-4">
              <h3 className="text-xs font-bold text-[#7c533e]">သတိပြုရန်</h3>
              <p className="mt-2 text-xs leading-7 text-[#5e4a40]">{selectedTerm.caution}</p>
            </section>
          </div>

          {relatedTerms.length > 0 && (
            <section className="rounded-2xl border border-[#e7dfd3] bg-white p-5 shadow-sm sm:p-6">
              <h3 className="text-sm font-bold text-[#1c1917]">ဆက်စပ်ဝေါဟာရများ</h3>
              <p className="mt-1 text-xs leading-6 text-[#57534e]">ဆက်စပ်နေသော စိတ်ပညာဆိုင်ရာ စကားလုံးများကို ဆက်လက်ဖတ်ရှုနိုင်ပါသည်။</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {relatedTerms.map((term) => (
                  <button
                    key={term.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(term.id)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-[#ded1e4] bg-[#f8f4fa] px-3.5 py-2 text-xs font-semibold text-[#5d476b] transition hover:border-[#c8b5d2] hover:bg-[#f1e9f5]"
                  >
                    <span>{term.term_my}</span>
                    <span className="text-xs text-[#57534e]">({term.term_en})</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          <section className="rounded-2xl border border-[#e7dfd3] bg-white p-5 shadow-sm sm:p-6">
            <h3 className="text-sm font-bold text-[#1c1917]">ကိုးကားရင်းမြစ်များ</h3>
            <p className="mt-1 text-xs leading-6 text-[#57534e]">အဓိပ္ပာယ်မူကြမ်းရေးရာတွင် ကိုးကားထားသော အရင်းအမြစ်များ။ အရင်းအမြစ်တစ်ခုစီကို အကြောင်းအရာတစ်ခုလုံးအတွက် အတည်ပြုချက်ဟု မယူဆပါနှင့်။</p>
            <div className="mt-3 space-y-2">
              {(selectedTerm.sources || []).map((source) => (
                <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="flex min-h-11 items-center justify-between gap-3 rounded-xl border border-[#eee7ef] px-3 py-2 text-xs font-medium text-[#5d476b] hover:bg-[#faf7fb]">
                  <span>{source.title}</span><ExternalLink size={14} strokeWidth={1.75} className="shrink-0" />
                </a>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#eadfc9] bg-[#fffaf1] p-4">
            <h3 className="text-xs font-bold text-[#5f4723]">အကြောင်းအရာ စစ်ဆေးမှုအခြေအနေ</h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <div className="rounded-lg bg-white/80 p-3"><p className="text-xs text-[#744d1b]">မြန်မာဘာသာ စစ်ဆေးမှု</p><p className="mt-1 text-xs font-semibold text-[#5f4723]">စစ်ဆေးရန် ကျန်ရှိ</p></div>
              <div className="rounded-lg bg-white/80 p-3"><p className="text-xs text-[#744d1b]">စိတ်ပညာဆိုင်ရာ စစ်ဆေးမှု</p><p className="mt-1 text-xs font-semibold text-[#5f4723]">စစ်ဆေးရန် ကျန်ရှိ</p></div>
            </div>
            <p className="mt-3 text-xs leading-6 text-[#744d1b]">စစ်ဆေးသူအမည်၊ အရည်အချင်းနဲ့ ရက်စွဲတွေကို တကယ်စစ်ဆေးပြီးမှသာ ထည့်သွင်းဖော်ပြပါမယ်။</p>
          </section>
        </article>
      ) : (
        <section className="mt-7">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold tracking-[0.15em] text-[#57534e]">EXPLORE TERMS</p>
              <h2 className="mt-1 text-lg font-bold text-[#1c1917]">စကားလုံးများကို ရှာဖွေပါ</h2>
              <p className="mt-1 text-xs leading-6 text-[#57534e]">ကတ်တစ်ခုချင်းစီကို နှိပ်၍ ရှင်းလင်းချက်နှင့် ဥပမာများကို ဖွင့်ကြည့်နိုင်ပါသည်။</p>
            </div>
            <span className="text-xs font-semibold text-[#57534e]">တွေ့ရှိမှု {filteredTerms.length} ခု</span>
          </div>

          <label className="flex min-h-12 items-center gap-3 rounded-2xl border border-[#dfd6ca] bg-white px-4 shadow-sm focus-within:border-[#725981]">
            <Search size={18} strokeWidth={1.75} className="shrink-0 text-[#57534e]" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ဥပမာ — Rumination, စိတ်ဖိစီးမှု, Boundaries..." className="min-w-0 flex-1 bg-transparent text-xs text-[#1c1917] outline-none placeholder:text-[#78716c]" />
            {query && <button onClick={() => setQuery('')} aria-label="ရှာဖွေမှုရှင်းရန်" className="rounded-lg p-1.5 text-[#57534e] hover:bg-[#f5f0f6]"><X size={15} strokeWidth={1.75} /></button>}
          </label>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setOnlyQuestionConcepts(false)}
              className={`min-h-10 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${!onlyQuestionConcepts ? 'border-[#725981] bg-[#f4eef6] text-[#5d476b]' : 'border-[#e7dfd3] bg-white text-[#57534e] hover:bg-[#faf8f5]'}`}
            >
              အားလုံး ({allTerms.length})
            </button>
            <button
              type="button"
              onClick={() => setOnlyQuestionConcepts(true)}
              className={`min-h-10 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${onlyQuestionConcepts ? 'border-[#725981] bg-[#f4eef6] text-[#5d476b]' : 'border-[#e7dfd3] bg-white text-[#57534e] hover:bg-[#faf8f5]'}`}
            >
              မေးခွန်းဆိုင်ရာ အယူအဆများ ({KNOWLEDGE_QUESTION_CONCEPTS.length})
            </button>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <button onClick={() => setActiveCategory('all')} className={`min-h-11 rounded-xl border px-3 py-2 text-left text-xs font-semibold transition ${activeCategory === 'all' ? 'border-[#bba8c4] bg-[#f4eef6] text-[#5d476b]' : 'border-[#e7dfd3] bg-white text-[#57534e] hover:bg-[#faf8f5]'}`}>
              အမျိုးအစားအားလုံး <span className="ml-1 text-xs opacity-75">{allTerms.length}</span>
            </button>
            {glossary.categories.map((category) => {
              const Icon = CATEGORY_ICONS[category.id] || BookOpen
              const count = allTerms.filter((term) => term.category_id === category.id).length
              return (
                <button key={category.id} onClick={() => setActiveCategory(category.id)} className={`flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs font-semibold transition ${activeCategory === category.id ? 'border-[#bba8c4] bg-[#f4eef6] text-[#5d476b]' : 'border-[#e7dfd3] bg-white text-[#57534e] hover:bg-[#faf8f5]'}`}>
                  <Icon size={15} strokeWidth={1.75} className="shrink-0" /><span className="min-w-0 flex-1">{category.name_my}</span><span className="text-xs opacity-75">{count}</span>
                </button>
              )
            })}
          </div>

          {filteredTerms.length ? (
            <div className="mt-5 space-y-3">
              {filteredTerms.map((term) => {
                const isExpanded = expandedIds.has(term.id)
                const summary = term.summary_short || term.definition_simple
                return (
                  <div
                    key={term.id}
                    className={`overflow-hidden rounded-2xl border bg-white transition-colors ${isExpanded ? 'border-[#bba8c4] shadow-sm' : 'border-[#e7dfd3] hover:border-[#d5cad9]'}`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleExpand(term.id)}
                      aria-expanded={isExpanded}
                      className="flex w-full items-start justify-between gap-3 p-4 text-left sm:p-5"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold text-[#57534e]">{term.term_en}</span>
                          <span className="rounded-full bg-[#faf8f5] border border-[#e7dfd3] px-2.5 py-0.5 text-xs font-medium text-[#57534e]">
                            {term.assessment_context || term.category_name_my}
                          </span>
                        </div>
                        <h3 className="mt-1.5 text-base font-bold leading-relaxed text-[#1c1917]">{term.term_my}</h3>
                        <p className={`mt-1 text-xs leading-7 text-[#57534e] ${isExpanded ? '' : 'line-clamp-2'}`}>
                          {summary}
                        </p>
                      </div>
                      <span
                        aria-hidden="true"
                        className={`mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#e7dfd3] bg-[#faf8f5] text-[#5d476b] transition-transform duration-200 ${isExpanded ? 'rotate-90 bg-[#f4eef6] border-[#bba8c4]' : ''}`}
                      >
                        <ChevronRight size={16} strokeWidth={1.75} />
                      </span>
                    </button>

                    {isExpanded && (
                      <div className="border-t border-[#f0eae1] bg-[#faf8f5]/60 px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
                        <div className="space-y-3">
                          <div className="rounded-xl border border-[#eae2eb] bg-white p-3.5">
                            <p className="text-xs font-bold text-[#5d476b]">အလွယ်နားလည်ရန်</p>
                            <p className="mt-1.5 text-xs leading-7 text-[#292524] sm:text-sm sm:leading-7">{term.definition_simple}</p>
                          </div>

                          <div className="grid gap-3 sm:grid-cols-2">
                            <div className="rounded-xl border border-[#e5eee7] bg-[#f8fbf8] p-3.5">
                              <p className="text-xs font-bold text-[#3d5741]">နေ့စဉ်ဘဝ ဥပမာ</p>
                              <p className="mt-1.5 text-xs leading-7 text-[#435145]">{term.daily_example}</p>
                            </div>
                            <div className="rounded-xl border border-[#e7e4ee] bg-white p-3.5">
                              <p className="text-xs font-bold text-[#534966]">
                                {term.assessment_context ? `ဆက်စပ်ဆန်းစစ်မှု · ${term.assessment_context}` : 'ဆင်တူစကားလုံးနဲ့ ကွာခြားချက်'}
                              </p>
                              <p className="mt-1.5 text-xs leading-7 text-[#4c4557]">{term.distinction}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                            <p className="text-xs leading-6 text-[#6b5a42]">{term.caution}</p>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedId(term.id)
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                              }}
                              className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-xl border border-[#ded1e4] bg-white px-3.5 py-2 text-xs font-semibold text-[#5d476b] hover:bg-[#f4eef6]"
                            >
                              အသေးစိတ်နှင့် ကိုးကားရင်းမြစ် <ChevronRight size={14} strokeWidth={1.75} />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-[#dcd1df] bg-white p-8 text-center">
              <Search size={24} strokeWidth={1.75} className="mx-auto text-[#57534e]" />
              <p className="mt-3 text-sm font-semibold text-[#1c1917]">ရှာဖွေထားတဲ့ စကားလုံး မတွေ့ပါ</p>
              <p className="mt-1 text-xs leading-6 text-[#57534e]">စာလုံးပေါင်းကို ပြန်စစ်ပါ၊ ဒါမှမဟုတ် အခြားစကားလုံးနဲ့ ရှာကြည့်ပါ။</p>
              <button onClick={() => { setQuery(''); setActiveCategory('all'); setOnlyQuestionConcepts(false) }} className="mt-4 rounded-xl bg-[#5d476b] px-4 py-2.5 text-xs font-semibold text-white">ရှာဖွေမှု ပြန်စမယ်</button>
            </div>
          )}
        </section>
      )}

      <footer className="mt-10 border-t border-[#eae2eb] pt-5 text-center">
        <p className="text-xs font-semibold text-[#57534e]">Knowledge Center · Draft Content 0.1.0</p>
        <p className="mt-1 text-xs leading-6 text-[#57534e]">အကြောင်းအရာကို ပြန်လည်သုံးသပ်ပြီး အတည်ပြုမှုများ ပြည့်စုံလာသည်နှင့် Version အသစ်များ ထုတ်ပြန်သွားပါမည်။</p>
      </footer>
    </main>
  )
}
