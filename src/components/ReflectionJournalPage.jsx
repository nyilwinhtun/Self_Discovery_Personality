import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Edit3,
  LockKeyhole,
  Save,
  Search,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react'
import {
  deleteReflectionNote,
  listReflectionJournalEntries,
  saveReflectionNote,
} from '../utils/reflectionNotes.js'
import { loadAppData } from '../utils/storage.js'

function formatJournalDate(value) {
  if (!value) return ''
  try {
    const parsed = /^\d{4}-\d{2}-\d{2}$/.test(value)
      ? new Date(`${value}T00:00:00`)
      : new Date(value)
    return new Intl.DateTimeFormat('my-MM', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(parsed)
  } catch {
    return value
  }
}

function formatJournalDateTime(value) {
  if (!value) return ''
  try {
    return new Intl.DateTimeFormat('my-MM', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(value))
  } catch {
    return value
  }
}

const FILTER_OPTIONS = [
  { id: 'all', label: 'အားလုံး' },
  { id: 'daily', label: 'နေ့စဉ် စိတ်မှတ်စုများ' },
  { id: 'assessment', label: 'စမ်းသပ်မှု မှတ်စုများ' },
]

function JournalEntryCard({
  entry,
  editingId,
  draftText,
  onStartEdit,
  onChangeDraft,
  onCancelEdit,
  onSaveEdit,
  onDelete,
  onOpenRecord,
}) {
  const isEditing = editingId === entry.recordId
  const isDaily = entry.kind === 'daily'
  const inputId = `journal-edit-${entry.recordId}`

  return (
    <article className="rounded-2xl border border-[#e7dce9] bg-white p-4 shadow-xs sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${
              isDaily
                ? 'bg-[#f3edf5] text-[#614b6b]'
                : 'bg-[#eef4fa] text-[#355679]'
            }`}
          >
            {isDaily ? <CalendarDays size={12} /> : <ClipboardList size={12} />}
            {isDaily
              ? formatJournalDate(entry.dateKey)
              : entry.moduleLabel}
          </span>
          {isDaily && entry.prompt?.topic && (
            <span className="text-[11px] font-semibold text-[#5d5162]">
              {entry.prompt.topic}
            </span>
          )}
        </div>
        {entry.updatedAt && (
          <span className="text-[11px] text-[#5d5162]">
            {formatJournalDateTime(entry.updatedAt)}
          </span>
        )}
      </div>

      {isDaily && entry.prompt?.question && (
        <p className="mt-2.5 rounded-xl bg-[#faf7fb] px-3.5 py-2.5 text-xs font-medium leading-6 text-[#514357]">
          {entry.prompt.question}
        </p>
      )}

      {!isDaily && entry.record?.createdAt && (
        <p className="mt-2 text-[11px] text-[#5d5162]">
          စမ်းသပ်မှု ရက်စွဲ — {formatJournalDateTime(entry.record.createdAt)}
        </p>
      )}

      {isEditing ? (
        <div className="mt-3">
          <label htmlFor={inputId} className="block text-xs font-semibold text-[#493b50]">
            မှတ်စုကို ပြင်ဆင်ရန်
          </label>
          <textarea
            id={inputId}
            rows={4}
            value={draftText}
            onChange={(event) => onChangeDraft(event.target.value)}
            className="mt-2 w-full rounded-xl border border-[#d8c7df] bg-[#fcfafc] px-3.5 py-2.5 text-xs leading-6 text-[#3d3143] outline-none transition focus:border-[#6e557c]"
          />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onSaveEdit(entry.recordId)}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-[#6e557c] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#5d476a]"
            >
              <Save size={14} /> သိမ်းမယ်
            </button>
            <button
              type="button"
              onClick={onCancelEdit}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-[#e5dce6] bg-white px-4 py-2 text-xs font-semibold text-[#5d5162] transition hover:bg-[#faf7fb]"
            >
              မလုပ်တော့ပါ
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-3 whitespace-pre-wrap text-xs leading-7 text-[#3d3143] sm:text-[13px]">
          {entry.text}
        </p>
      )}

      {!isEditing && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#f3edf5] pt-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onStartEdit(entry)}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-[#e5dce6] bg-white px-3.5 py-2 text-xs font-semibold text-[#514357] transition hover:bg-[#faf7fb]"
            >
              <Edit3 size={14} /> ပြင်ဆင်မယ်
            </button>
            <button
              type="button"
              onClick={() => onDelete(entry.recordId)}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-[#e5dce6] bg-white px-3.5 py-2 text-xs font-semibold text-[#864254] transition hover:bg-[#fdf5f7]"
            >
              <Trash2 size={14} /> ဖျက်မယ်
            </button>
          </div>

          {!isDaily && entry.record && onOpenRecord && (
            <button
              type="button"
              onClick={() => onOpenRecord(entry.record)}
              className="inline-flex min-h-11 items-center gap-1.5 text-xs font-semibold text-[#614b6b] hover:underline"
            >
              ရလဒ်စာမျက်နှာ ကြည့်မယ် <ArrowRight size={14} />
            </button>
          )}
        </div>
      )}
    </article>
  )
}

export default function ReflectionJournalPage({ history: propHistory, onBack, onOpenRecord }) {
  const [refreshTick, setRefreshTick] = useState(0)
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [draftText, setDraftText] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const history = useMemo(() => {
    if (Array.isArray(propHistory)) return propHistory
    return loadAppData().history || []
  }, [propHistory])

  const { dailyEntries, assessmentEntries } = useMemo(
    () => listReflectionJournalEntries(history),
    [history, refreshTick],
  )

  const normalizedQuery = query.trim().toLowerCase()

  const filteredDaily = useMemo(() => {
    if (filter === 'assessment') return []
    if (!normalizedQuery) return dailyEntries
    return dailyEntries.filter((entry) => {
      const hay = [
        entry.text,
        entry.dateKey,
        entry.prompt?.topic || '',
        entry.prompt?.question || '',
      ]
        .join(' ')
        .toLowerCase()
      return hay.includes(normalizedQuery)
    })
  }, [dailyEntries, filter, normalizedQuery])

  const filteredAssessment = useMemo(() => {
    if (filter === 'daily') return []
    if (!normalizedQuery) return assessmentEntries
    return assessmentEntries.filter((entry) => {
      const hay = [
        entry.text,
        entry.moduleLabel,
        entry.updatedAt || '',
      ]
        .join(' ')
        .toLowerCase()
      return hay.includes(normalizedQuery)
    })
  }, [assessmentEntries, filter, normalizedQuery])

  const totalCount = dailyEntries.length + assessmentEntries.length
  const visibleCount = filteredDaily.length + filteredAssessment.length

  const handleStartEdit = (entry) => {
    setEditingId(entry.recordId)
    setDraftText(entry.text)
    setStatusMessage('')
    setErrorMessage('')
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setDraftText('')
    setErrorMessage('')
  }

  const handleSaveEdit = (recordId) => {
    const { ok, note } = saveReflectionNote(recordId, draftText)
    if (!ok) {
      setErrorMessage('Browser Storage ထဲသို့ မှတ်စုသိမ်းဆည်း၍ မရပါ။')
      return
    }
    setEditingId(null)
    setDraftText('')
    setErrorMessage('')
    setRefreshTick((t) => t + 1)
    setStatusMessage(note ? 'မှတ်စုကို ပြင်ဆင်သိမ်းဆည်းပြီးပါပြီ။' : 'မှတ်စုကို ရှင်းလင်းပြီးပါပြီ။')
  }

  const handleDelete = (recordId) => {
    if (!window.confirm('ဒီကိုယ်ပိုင်မှတ်စုကို ဖျက်မှာ သေချာပါသလား။')) return
    const { ok } = deleteReflectionNote(recordId)
    if (!ok) {
      setErrorMessage('မှတ်စုကို ဖျက်၍ မရပါ။')
      return
    }
    if (editingId === recordId) {
      setEditingId(null)
      setDraftText('')
    }
    setErrorMessage('')
    setRefreshTick((t) => t + 1)
    setStatusMessage('မှတ်စုကို ဖျက်ပြီးပါပြီ။')
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 pb-28 sm:px-6 sm:py-10">
      <button
        type="button"
        onClick={onBack}
        className="mb-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#5d5162] transition hover:text-[#44364a]"
      >
        <ArrowLeft size={16} /> ပင်မစာမျက်နှာသို့ ပြန်မယ်
      </button>

      <section className="rounded-[2rem] border border-[#e7dce9] bg-gradient-to-br from-[#f6f0f8] via-[#fffdf9] to-[#f8f3f1] p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e5d9e8] bg-white px-3 py-1 text-[11px] font-bold text-[#614b6b]">
              <BookOpen size={13} /> REFLECTION JOURNAL · ကိုယ်ပိုင်မှတ်တမ်း
            </span>
            <h1 className="mt-3 text-2xl font-bold leading-snug text-[#44364a] sm:text-3xl">
              ကိုယ်ပိုင် စိတ်မှတ်တမ်းစာအုပ်
            </h1>
            <p className="mt-2 text-xs leading-7 text-[#5d5162] sm:text-sm">
              သင်ရေးသားသိမ်းဆည်းထားသော နေ့စဉ်စိတ်မှတ်စုများနှင့် စမ်းသပ်မှုရလဒ် မှတ်စုများကို အချိန်အလိုက် ပြန်လည်ဖတ်ရှုနိုင်ပါသည်။
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-[#436b4f] shadow-xs">
            <LockKeyhole size={13} /> ဒီစက်ထဲမှာသာ သိမ်းဆည်း
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2.5 sm:gap-3">
          <div className="rounded-2xl border border-[#ebe3ed] bg-white/90 p-3 text-center">
            <p className="text-lg font-bold text-[#493b50]">{totalCount}</p>
            <p className="text-[11px] font-medium text-[#5d5162]">စုစုပေါင်း</p>
          </div>
          <div className="rounded-2xl border border-[#ebe3ed] bg-white/90 p-3 text-center">
            <p className="text-lg font-bold text-[#614b6b]">{dailyEntries.length}</p>
            <p className="text-[11px] font-medium text-[#5d5162]">နေ့စဉ်မှတ်စု</p>
          </div>
          <div className="rounded-2xl border border-[#ebe3ed] bg-white/90 p-3 text-center">
            <p className="text-lg font-bold text-[#355679]">{assessmentEntries.length}</p>
            <p className="text-[11px] font-medium text-[#5d5162]">စမ်းသပ်မှုမှတ်စု</p>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-[#ebe5dc] bg-white p-4 shadow-xs sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search
              size={15}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b5e70]"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="မှတ်စုများထဲတွင် ရှာဖွေရန်"
              placeholder="မှတ်စုစာသား၊ ခေါင်းစဉ် သို့မဟုတ် ရက်စွဲဖြင့် ရှာမယ်..."
              className="min-h-11 w-full rounded-xl border border-[#e3d7e6] bg-[#fcfafc] pl-9 pr-9 text-xs text-[#3d3143] outline-none transition focus:border-[#6e557c]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="ရှာဖွေမှု ရှင်းမယ်"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1 text-[#5d5162] hover:bg-[#f3edf5]"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5" role="group" aria-label="မှတ်စုအမျိုးအစား စစ်ထုတ်ရန်">
            {FILTER_OPTIONS.map((opt) => {
              const active = filter === opt.id
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setFilter(opt.id)}
                  className={`min-h-11 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                    active
                      ? 'bg-[#6e557c] text-white'
                      : 'border border-[#e5dce6] bg-[#fcfafc] text-[#5d5162] hover:bg-[#f3edf5]'
                  }`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>

        {statusMessage && (
          <p role="status" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#436b4f]">
            <CheckCircle2 size={14} /> {statusMessage}
          </p>
        )}
        {errorMessage && (
          <p role="alert" className="mt-3 text-xs font-semibold text-[#8b3a4b]">
            {errorMessage}
          </p>
        )}
      </section>

      {totalCount === 0 ? (
        <section className="mt-6 rounded-[2rem] border border-dashed border-[#dfd2e1] bg-[#fffdf9] px-6 py-12 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#f3edf5] text-[#614b6b]">
            <Sparkles size={24} />
          </span>
          <h2 className="mt-4 text-base font-bold text-[#44364a]">
            သိမ်းဆည်းထားသော မှတ်စု မရှိသေးပါ
          </h2>
          <p className="mx-auto mt-2 max-w-md text-xs leading-7 text-[#5d5162]">
            ပင်မစာမျက်နှာရှိ နေ့စဉ် စိတ်သတိပြု မေးခွန်းတွင်ဖြစ်စေ၊ စမ်းသပ်မှုရလဒ် စာမျက်နှာအောက်ခြေတွင်ဖြစ်စေ ကိုယ်ပိုင်မှတ်စုများ ရေးသားသိမ်းဆည်းနိုင်ပါသည်။
          </p>
        </section>
      ) : visibleCount === 0 ? (
        <section className="mt-6 rounded-2xl border border-[#ebe5dc] bg-[#fffdf9] px-6 py-10 text-center">
          <p className="text-sm font-bold text-[#44364a]">ရှာဖွေမှုနှင့် ကိုက်ညီသော မှတ်စု မတွေ့ပါ</p>
          <p className="mt-1.5 text-xs text-[#5d5162]">အခြားစကားလုံး သို့မဟုတ် အမျိုးအစားဖြင့် ထပ်မံရှာကြည့်ပါ။</p>
        </section>
      ) : (
        <div className="mt-6 space-y-8">
          {(filter === 'all' || filter === 'daily') && (
            <section aria-labelledby="journal-daily-heading">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 id="journal-daily-heading" className="text-base font-bold text-[#44364a]">
                  နေ့စဉ် စိတ်မှတ်စုများ (Daily Check-Ins)
                </h2>
                <span className="rounded-full bg-[#f3edf5] px-2.5 py-0.5 text-[11px] font-bold text-[#614b6b]">
                  {filteredDaily.length} ခု
                </span>
              </div>
              {filteredDaily.length === 0 ? (
                <p className="rounded-2xl border border-[#ebe5dc] bg-white p-4 text-xs text-[#5d5162]">
                  နေ့စဉ် စိတ်မှတ်စု မရှိသေးပါ။
                </p>
              ) : (
                <div className="space-y-3">
                  {filteredDaily.map((entry) => (
                    <JournalEntryCard
                      key={entry.recordId}
                      entry={entry}
                      editingId={editingId}
                      draftText={draftText}
                      onStartEdit={handleStartEdit}
                      onChangeDraft={setDraftText}
                      onCancelEdit={handleCancelEdit}
                      onSaveEdit={handleSaveEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </section>
          )}

          {(filter === 'all' || filter === 'assessment') && (
            <section aria-labelledby="journal-assessment-heading">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 id="journal-assessment-heading" className="text-base font-bold text-[#44364a]">
                  စမ်းသပ်မှု မှတ်စုများ (Assessment Notes)
                </h2>
                <span className="rounded-full bg-[#eef4fa] px-2.5 py-0.5 text-[11px] font-bold text-[#355679]">
                  {filteredAssessment.length} ခု
                </span>
              </div>
              {filteredAssessment.length === 0 ? (
                <p className="rounded-2xl border border-[#ebe5dc] bg-white p-4 text-xs text-[#5d5162]">
                  စမ်းသပ်မှု မှတ်စု မရှိသေးပါ။
                </p>
              ) : (
                <div className="space-y-3">
                  {filteredAssessment.map((entry) => (
                    <JournalEntryCard
                      key={entry.recordId}
                      entry={entry}
                      editingId={editingId}
                      draftText={draftText}
                      onStartEdit={handleStartEdit}
                      onChangeDraft={setDraftText}
                      onCancelEdit={handleCancelEdit}
                      onSaveEdit={handleSaveEdit}
                      onDelete={handleDelete}
                      onOpenRecord={onOpenRecord}
                    />
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      )}
    </main>
  )
}
