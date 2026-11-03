import { useEffect, useState } from 'react'
import { BookOpen, ExternalLink, Info, X } from 'lucide-react'
import glossary from '../data/knowledgeGlossaryDraftV01.json'
import { getKnowledgeTermsForQuestion } from '../utils/knowledgeQuestionLinks.js'

const THEME = {
  trait: {
    chip: 'border-[#ded1e4] bg-white text-[#765d82] hover:bg-[#f7f1f9]',
    accent: 'text-[#80678f]',
    panel: 'bg-[#f8f4fa]',
  },
  innerCompass: {
    chip: 'border-[#d2e0ef] bg-white text-[#527daa] hover:bg-[#f3f7fb]',
    accent: 'text-[#527daa]',
    panel: 'bg-[#f3f7fb]',
  },
}

export default function KnowledgeInlineHelp({ questionText, theme = 'trait' }) {
  const relatedTerms = getKnowledgeTermsForQuestion(questionText, glossary.terms)
  const [activeTermId, setActiveTermId] = useState(null)
  const activeTerm = relatedTerms.find((term) => term.id === activeTermId) || null
  const style = THEME[theme] || THEME.trait

  useEffect(() => {
    if (!activeTerm) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setActiveTermId(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeTerm])

  if (!relatedTerms.length) return null

  return (
    <>
      <div className="mt-4 flex flex-wrap items-center gap-2" aria-label="မေးခွန်းနှင့်ဆက်စပ်သော စကားလုံးရှင်းလင်းချက်များ">
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#9a8ea0]">
          <BookOpen size={12} /> စကားလုံးအဓိပ္ပာယ်
        </span>
        {relatedTerms.map((term) => (
          <button
            key={term.id}
            type="button"
            onClick={() => setActiveTermId(term.id)}
            aria-label={`${term.term_my} အဓိပ္ပာယ်ဖတ်ရန်`}
            aria-haspopup="dialog"
            aria-expanded={activeTermId === term.id}
            className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-semibold transition ${style.chip}`}
          >
            <Info size={13} /> {term.term_my}
          </button>
        ))}
      </div>

      {activeTerm && (
        <div
          className="no-print fixed inset-0 z-[70] flex items-end justify-center bg-[#2c2330]/45 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setActiveTermId(null)
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby={`knowledge-help-title-${activeTerm.id}`}
            className="max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-t-[1.75rem] border border-[#e8dfe9] bg-[#fffdfd] p-5 shadow-2xl sm:rounded-[1.75rem] sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span className={`inline-flex rounded-full px-3 py-1 text-[9px] font-bold ${style.panel} ${style.accent}`}>
                  {activeTerm.category_name_my}
                </span>
                <p className="mt-4 text-[10px] font-semibold tracking-wide text-[#a092a5]">{activeTerm.term_en}</p>
                <h3 id={`knowledge-help-title-${activeTerm.id}`} className="mt-1 text-xl font-bold leading-relaxed text-[#493b50]">
                  {activeTerm.term_my}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveTermId(null)}
                aria-label="ရှင်းလင်းချက်ပိတ်ရန်"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#eee6ef] bg-white text-[#897b8e] hover:bg-[#f8f4f8]"
              >
                <X size={18} />
              </button>
            </div>

            <div className={`mt-5 rounded-2xl p-4 ${style.panel}`}>
              <p className="text-[11px] font-bold text-[#6d5878]">အလွယ်နားလည်ရန်</p>
              <p className="mt-2 text-sm leading-8 text-[#625768]">{activeTerm.definition_simple}</p>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <section className="rounded-xl border border-[#e5eee7] bg-[#f8fbf8] p-3.5">
                <h4 className="text-[11px] font-bold text-[#58715c]">နေ့စဉ်ဘဝ ဥပမာ</h4>
                <p className="mt-2 text-xs leading-7 text-[#68766a]">{activeTerm.daily_example}</p>
              </section>
              <section className="rounded-xl border border-[#e7e4ee] bg-[#faf9fc] p-3.5">
                <h4 className="text-[11px] font-bold text-[#6d6281]">ဆင်တူစကားလုံးနဲ့ ကွာခြားချက်</h4>
                <p className="mt-2 text-xs leading-7 text-[#71697a]">{activeTerm.distinction}</p>
              </section>
            </div>

            <section className="mt-3 rounded-xl border border-[#f0e2d9] bg-[#fffaf7] p-3.5">
              <h4 className="text-[11px] font-bold text-[#956d57]">သတိပြုရန်</h4>
              <p className="mt-2 text-xs leading-7 text-[#806d63]">{activeTerm.caution}</p>
            </section>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#eee7ef] pt-4">
              <span className="rounded-full bg-[#fff5e6] px-3 py-1.5 text-[9px] font-bold text-[#98713a]">
                မူကြမ်း · {activeTerm.content_version}
              </span>
              <span className="text-[10px] text-[#9b8fa0]">ကျွမ်းကျင်သူ စစ်ဆေးမှု မပြီးသေးပါ</span>
            </div>

            {(activeTerm.sources || []).length > 0 && (
              <div className="mt-4">
                <p className="text-[10px] font-bold text-[#716477]">ကိုးကားရင်းမြစ်</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {activeTerm.sources.slice(0, 2).map((source) => (
                    <a
                      key={source.url}
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-9 items-center gap-1.5 rounded-xl border border-[#e9e1eb] bg-white px-3 py-2 text-[10px] font-semibold text-[#725d7d] hover:bg-[#faf7fb]"
                    >
                      {source.title} <ExternalLink size={12} />
                    </a>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setActiveTermId(null)}
              className={`mt-5 min-h-11 w-full rounded-xl px-4 py-2.5 text-xs font-bold text-white transition ${theme === 'innerCompass' ? 'bg-[#527daa] hover:bg-[#456d97]' : 'bg-[#80678f] hover:bg-[#725981]'}`}
            >
              မေးခွန်းသို့ ပြန်သွားမယ်
            </button>
          </section>
        </div>
      )}
    </>
  )
}
