import { useEffect, useState } from 'react'
import { CheckCircle2, Edit3, LockKeyhole, Save, Trash2 } from 'lucide-react'
import { deleteReflectionNote, getReflectionNote, saveReflectionNote } from '../utils/reflectionNotes.js'

const THEME = {
  trait: {
    border: 'border-[#e7dce9]',
    bg: 'bg-[#fcf9fc]',
    badgeBg: 'bg-[#f3edf5]',
    badgeText: 'text-[#6e557c]',
    heading: 'text-[#493b50]',
    body: 'text-[#5e5163]',
    muted: 'text-[#6b5e70]',
    primaryBtn: 'bg-[#80678f] hover:bg-[#725981] text-white',
    secondaryBtn: 'border-[#e5dce6] text-[#6e5a77] hover:bg-[#faf7fb]',
    focusRing: 'focus:border-[#9c82aa]',
  },
  innerCompass: {
    border: 'border-[#d4e0ef]',
    bg: 'bg-[#f6f9fd]',
    badgeBg: 'bg-[#e8f0f9]',
    badgeText: 'text-[#3d6087]',
    heading: 'text-[#3f5873]',
    body: 'text-[#4e6379]',
    muted: 'text-[#4e6379]',
    primaryBtn: 'bg-[#446c96] hover:bg-[#385b80] text-white',
    secondaryBtn: 'border-[#d2e0ef] text-[#446c96] hover:bg-[#f0f5fb]',
    focusRing: 'focus:border-[#6e94bc]',
  },
  bondSense: {
    border: 'border-[#ebd6d1]',
    bg: 'bg-[#fcf7f5]',
    badgeBg: 'bg-[#f8eae6]',
    badgeText: 'text-[#7c392b]',
    heading: 'text-[#662f23]',
    body: 'text-[#6a4840]',
    muted: 'text-[#6a4840]',
    primaryBtn: 'bg-[#924433] hover:bg-[#7d3829] text-white',
    secondaryBtn: 'border-[#e5cbc5] text-[#7c392b] hover:bg-[#fbf1ee]',
    focusRing: 'focus:border-[#b57263]',
  },
  valueMap: {
    border: 'border-[#d4e1d7]',
    bg: 'bg-[#f6faf7]',
    badgeBg: 'bg-[#e8f2eb]',
    badgeText: 'text-[#33573d]',
    heading: 'text-[#2c4a34]',
    body: 'text-[#465e4c]',
    muted: 'text-[#465e4c]',
    primaryBtn: 'bg-[#3d6347] hover:bg-[#31523a] text-white',
    secondaryBtn: 'border-[#cad9ce] text-[#33573d] hover:bg-[#eef5f0]',
    focusRing: 'focus:border-[#6a9174]',
  },
}

function formatNoteDate(value) {
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
    return new Date(value).toLocaleString()
  }
}

export default function ReflectionNotesSection({ recordId, theme = 'trait' }) {
  const style = THEME[theme] || THEME.trait
  const [savedNote, setSavedNote] = useState(() => getReflectionNote(recordId))
  const [draftText, setDraftText] = useState(() => getReflectionNote(recordId)?.text || '')
  const [isEditing, setIsEditing] = useState(() => !getReflectionNote(recordId))
  const [statusMessage, setStatusMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const existing = getReflectionNote(recordId)
    setSavedNote(existing)
    setDraftText(existing?.text || '')
    setIsEditing(!existing)
    setStatusMessage('')
    setErrorMessage('')
  }, [recordId])

  if (!recordId) return null

  const handleSave = () => {
    const { ok, note } = saveReflectionNote(recordId, draftText)
    if (!ok) {
      setErrorMessage('Browser Storage ထဲသို့ မှတ်စုသိမ်းဆည်း၍ မရပါ။')
      return
    }
    setErrorMessage('')
    setSavedNote(note)
    setDraftText(note?.text || '')
    setIsEditing(!note)
    setStatusMessage(note ? 'မှတ်စုကို သိမ်းဆည်းပြီးပါပြီ။' : 'မှတ်စုကို ရှင်းလင်းပြီးပါပြီ။')
  }

  const handleDelete = () => {
    if (!window.confirm('ဒီကိုယ်ပိုင်မှတ်စုကို ဖျက်မှာ သေချာပါသလား။')) return
    const { ok } = deleteReflectionNote(recordId)
    if (!ok) {
      setErrorMessage('မှတ်စုကို ဖျက်၍ မရပါ။')
      return
    }
    setErrorMessage('')
    setSavedNote(null)
    setDraftText('')
    setIsEditing(true)
    setStatusMessage('မှတ်စုကို ဖျက်ပြီးပါပြီ။')
  }

  const inputId = `reflection-note-${recordId}`

  return (
    <section
      aria-label="ကိုယ်ပိုင်ပြန်လည်သုံးသပ်ချက် မှတ်စု"
      className={`no-print mt-6 rounded-[1.5rem] border ${style.border} ${style.bg} p-5 sm:p-6`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold ${style.badgeBg} ${style.badgeText}`}>
            <LockKeyhole size={12} /> ကိုယ်ပိုင်မှတ်စု (Local Only)
          </span>
          <h3 className={`mt-2.5 text-base font-bold ${style.heading}`}>
            ကိုယ်ပိုင်ပြန်လည်သုံးသပ်ချက် မှတ်စု
          </h3>
        </div>
        {savedNote?.updatedAt && !isEditing && (
          <span className={`text-[11px] ${style.muted}`}>
            နောက်ဆုံးသိမ်းချိန် · {formatNoteDate(savedNote.updatedAt)}
          </span>
        )}
      </div>

      <p className={`mt-2 text-xs leading-7 ${style.body}`}>
        ဒီရလဒ်ကို ဖတ်ပြီး စိတ်ထဲပေါ်လာတဲ့ အတွေး၊ ခံစားချက် ဒါမှမဟုတ် မှတ်ထားချင်တာလေးတွေကို လွတ်လပ်စွာ ရေးသားနိုင်ပါတယ်။ မရေးဘဲလည်း ကျော်သွားနိုင်ပါတယ်။
      </p>

      <p className={`mt-2 text-[11px] leading-6 ${style.muted}`}>
        ကိုယ်ရေးလုံခြုံမှု: ဤမှတ်စုကို သင့်လက်ရှိ Browser နှင့် စက်ထဲတွင်သာ သီးသန့်သိမ်းဆည်းထားပြီး မည်သည့် Server သို့မျှ မပို့ပါ။
      </p>

      {isEditing ? (
        <div className="mt-4">
          <label htmlFor={inputId} className={`block text-xs font-semibold ${style.heading}`}>
            သင့်မှတ်စု
          </label>
          <textarea
            id={inputId}
            rows={4}
            value={draftText}
            onChange={(event) => {
              setDraftText(event.target.value)
              if (statusMessage) setStatusMessage('')
            }}
            placeholder="ဥပမာ — ဒီနေ့ ကိုယ့်အကြောင်း ဘာတွေ သတိထားမိသလဲ..."
            className={`mt-2 w-full rounded-2xl border ${style.border} bg-white px-4 py-3 text-xs leading-7 ${style.heading} outline-none transition ${style.focusRing}`}
          />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${style.primaryBtn}`}
            >
              <Save size={14} /> မှတ်စုသိမ်းမယ်
            </button>
            {savedNote && (
              <button
                type="button"
                onClick={() => {
                  setDraftText(savedNote.text)
                  setIsEditing(false)
                  setErrorMessage('')
                }}
                className={`inline-flex min-h-11 items-center gap-2 rounded-xl border bg-white px-4 py-2 text-xs font-semibold transition ${style.secondaryBtn}`}
              >
                မပြင်တော့ပါ
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-[#ece4ee] bg-white p-4">
          <p className={`whitespace-pre-wrap text-xs leading-7 ${style.body}`}>{savedNote?.text}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setIsEditing(true)
                setStatusMessage('')
              }}
              className={`inline-flex min-h-11 items-center gap-2 rounded-xl border bg-white px-4 py-2 text-xs font-semibold transition ${style.secondaryBtn}`}
            >
              <Edit3 size={14} /> ပြင်ဆင်မယ်
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#ecd4d4] bg-white px-4 py-2 text-xs font-semibold text-[#8c3b3b] transition hover:bg-[#fdf5f5]"
            >
              <Trash2 size={14} /> ဖျက်မယ်
            </button>
          </div>
        </div>
      )}

      {statusMessage && (
        <p role="status" className={`mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold ${style.badgeText}`}>
          <CheckCircle2 size={13} /> {statusMessage}
        </p>
      )}
      {errorMessage && (
        <p role="alert" className="mt-3 text-[11px] font-semibold text-[#9a3b3b]">
          {errorMessage}
        </p>
      )}
    </section>
  )
}
