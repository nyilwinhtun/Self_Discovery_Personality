import { useState } from 'react'
import { CheckCircle2, Edit3, LockKeyhole, Save, Sparkles, Trash2 } from 'lucide-react'
import {
  countDailyReflectionNotes,
  deleteReflectionNote,
  getDailyMindPrompt,
  getReflectionNote,
  saveReflectionNote,
} from '../utils/reflectionNotes.js'

function formatDisplayDate(date = new Date()) {
  try {
    return new Intl.DateTimeFormat('my-MM', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date)
  } catch {
    return date.toLocaleDateString()
  }
}

function formatSavedTime(value) {
  if (!value) return ''
  try {
    return new Intl.DateTimeFormat('my-MM', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(value))
  } catch {
    return ''
  }
}

export default function DailyMindPromptCard() {
  const todayPrompt = getDailyMindPrompt()
  const { recordId } = todayPrompt
  const [savedNote, setSavedNote] = useState(() => getReflectionNote(recordId))
  const [draftText, setDraftText] = useState(() => getReflectionNote(recordId)?.text || '')
  const [isEditing, setIsEditing] = useState(() => !getReflectionNote(recordId))
  const [dailyCount, setDailyCount] = useState(() => countDailyReflectionNotes())
  const [statusMessage, setStatusMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

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
    setDailyCount(countDailyReflectionNotes())
    setStatusMessage(note ? 'ဒီနေ့အတွက် မှတ်စုကို သိမ်းဆည်းပြီးပါပြီ။' : 'မှတ်စုကို ရှင်းလင်းပြီးပါပြီ။')
  }

  const handleDelete = () => {
    if (!window.confirm('ဒီနေ့အတွက် ကိုယ်ပိုင်မှတ်စုကို ဖျက်မှာ သေချာပါသလား။')) return
    const { ok } = deleteReflectionNote(recordId)
    if (!ok) {
      setErrorMessage('မှတ်စုကို ဖျက်၍ မရပါ။')
      return
    }
    setErrorMessage('')
    setSavedNote(null)
    setDraftText('')
    setIsEditing(true)
    setDailyCount(countDailyReflectionNotes())
    setStatusMessage('မှတ်စုကို ဖျက်ပြီးပါပြီ။')
  }

  const inputId = `daily-mind-note-${recordId}`

  return (
    <article
      aria-labelledby="daily-mind-prompt-title"
      className="flex h-full flex-col justify-between rounded-2xl border border-[#e7dce9] bg-gradient-to-br from-[#fcf9fc] via-white to-[#f8f3f9] p-5 shadow-sm sm:p-6"
    >
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f3edf5] px-3 py-1 text-[11px] font-bold text-[#6e557c]">
            <Sparkles size={12} /> နေ့စဉ် စိတ်သတိပြု မေးခွန်း
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#6b5e70]">
            <LockKeyhole size={12} /> {formatDisplayDate()} · Local Only
          </span>
        </div>

        <p className="mt-3 text-[11px] font-semibold text-[#6e5570]">{todayPrompt.topic}</p>
        <h3 id="daily-mind-prompt-title" className="mt-1 text-base font-bold leading-7 text-[#493b50]">
          {todayPrompt.question}
        </h3>
        <p className="mt-1.5 text-xs leading-6 text-[#6b5e70]">{todayPrompt.hint}</p>
      </div>

      <div className="mt-4">
        {isEditing ? (
          <div>
            <label htmlFor={inputId} className="block text-xs font-semibold text-[#493b50]">
              ဒီနေ့အတွက် ကိုယ်ပိုင်မှတ်စု (မရေးဘဲ ကျော်သွားနိုင်ပါသည်)
            </label>
            <textarea
              id={inputId}
              rows={3}
              value={draftText}
              onChange={(event) => {
                setDraftText(event.target.value)
                if (statusMessage) setStatusMessage('')
              }}
              placeholder="စိတ်ထဲပေါ်လာတာလေးတွေကို အတိုချုပ် ရေးမှတ်နိုင်ပါတယ်..."
              className="mt-2 w-full rounded-xl border border-[#e3d7e6] bg-white px-3.5 py-2.5 text-xs leading-6 text-[#493b50] outline-none transition focus:border-[#9c82aa]"
            />
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#80678f] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#725981]"
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
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#e5dce6] bg-white px-4 py-2 text-xs font-semibold text-[#6e5a77] transition hover:bg-[#faf7fb]"
                >
                  မလုပ်တော့ပါ
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-[#eadfe9] bg-white p-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-semibold text-[#6e557c]">ဒီနေ့အတွက် သိမ်းထားသော မှတ်စု</span>
              {savedNote?.updatedAt && (
                <span className="text-[11px] text-[#6b5e70]">
                  {formatSavedTime(savedNote.updatedAt)}
                </span>
              )}
            </div>
            <p className="mt-2 whitespace-pre-wrap text-xs leading-6 text-[#493b50]">
              {savedNote?.text}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setDraftText(savedNote?.text || '')
                  setIsEditing(true)
                  setStatusMessage('')
                }}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-[#e5dce6] bg-white px-3.5 py-2 text-xs font-semibold text-[#6e5a77] transition hover:bg-[#faf7fb]"
              >
                <Edit3 size={14} /> ပြင်ဆင်မယ်
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-[#e5dce6] bg-white px-3.5 py-2 text-xs font-semibold text-[#865569] transition hover:bg-[#faf7fb]"
              >
                <Trash2 size={14} /> ဖျက်မယ်
              </button>
            </div>
          </div>
        )}

        {statusMessage && (
          <p className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#436b4f]">
            <CheckCircle2 size={14} /> {statusMessage}
          </p>
        )}
        {errorMessage && (
          <p className="mt-2.5 text-xs font-semibold text-[#8b3a4b]">{errorMessage}</p>
        )}

        <p className="mt-3 text-[11px] leading-5 text-[#6b5e70]">
          {dailyCount > 0
            ? `သိမ်းဆည်းထားသော နေ့စဉ်မှတ်စု ${dailyCount} ခုရှိပြီး JSON Backup ထဲတွင် အလိုအလျောက် ပါဝင်ပါမည်။`
            : 'ဒီစက်ထဲရှိ Browser Storage ထဲတွင်သာ သီးသန့်သိမ်းဆည်းပြီး JSON Backup ထဲတွင် ပါဝင်ပါမည်။'}
        </p>
      </div>
    </article>
  )
}
