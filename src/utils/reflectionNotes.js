const REFLECTION_NOTES_KEY = 'self-discovery-reflection-notes-v1'

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function safeReadNotes() {
  if (typeof window === 'undefined' || !window.localStorage) return {}
  try {
    const raw = window.localStorage.getItem(REFLECTION_NOTES_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return isPlainObject(parsed) ? parsed : {}
  } catch (error) {
    console.warn('Reflection notes read failed:', error)
    return {}
  }
}

function safeWriteNotes(notes) {
  if (typeof window === 'undefined' || !window.localStorage) return false
  try {
    window.localStorage.setItem(REFLECTION_NOTES_KEY, JSON.stringify(notes))
    return true
  } catch (error) {
    console.warn('Reflection notes write failed:', error)
    return false
  }
}

export function getReflectionNote(recordId) {
  if (!recordId) return null
  const notes = safeReadNotes()
  const entry = notes[recordId]
  if (!isPlainObject(entry) || typeof entry.text !== 'string') return null
  return entry
}

export function saveReflectionNote(recordId, text) {
  if (!recordId) return { ok: false, note: null }
  const trimmed = String(text || '').trim()
  const notes = safeReadNotes()
  if (!trimmed) {
    delete notes[recordId]
    const ok = safeWriteNotes(notes)
    return { ok, note: null }
  }
  const note = {
    text: trimmed,
    updatedAt: new Date().toISOString(),
  }
  notes[recordId] = note
  const ok = safeWriteNotes(notes)
  return { ok, note: ok ? note : getReflectionNote(recordId) }
}

export function deleteReflectionNote(recordId) {
  if (!recordId) return { ok: false }
  const notes = safeReadNotes()
  if (!(recordId in notes)) return { ok: true }
  delete notes[recordId]
  const ok = safeWriteNotes(notes)
  return { ok }
}

function noteTimestampOf(value) {
  const parsed = Date.parse(value || '')
  return Number.isFinite(parsed) ? parsed : 0
}

export function normalizeReflectionNotes(rawNotes) {
  if (!isPlainObject(rawNotes)) return {}
  const normalized = {}
  for (const [recordId, entry] of Object.entries(rawNotes)) {
    if (!recordId || !isPlainObject(entry) || typeof entry.text !== 'string') continue
    const trimmed = entry.text.trim()
    if (!trimmed) continue
    normalized[recordId] = {
      text: trimmed,
      updatedAt: typeof entry.updatedAt === 'string' && entry.updatedAt.trim() ? entry.updatedAt : '',
    }
  }
  return normalized
}

export function loadAllReflectionNotes() {
  return normalizeReflectionNotes(safeReadNotes())
}

export function validateReflectionNotes(rawNotes) {
  if (rawNotes === undefined) return null
  if (!isPlainObject(rawNotes)) return 'ကိုယ်ပိုင်မှတ်စု (reflectionNotes) အချက်အလက်ပုံစံ မမှန်ပါ။'
  for (const [recordId, entry] of Object.entries(rawNotes)) {
    if (!recordId || !isPlainObject(entry) || typeof entry.text !== 'string') {
      return 'ကိုယ်ပိုင်မှတ်စုတစ်ခု၏ ပုံစံ မမှန်ပါ။'
    }
    if (entry.updatedAt !== undefined && typeof entry.updatedAt !== 'string') {
      return 'ကိုယ်ပိုင်မှတ်စု၏ ရက်စွဲပုံစံ မမှန်ပါ။'
    }
  }
  return null
}

export const DAILY_REFLECTION_PREFIX = 'daily-'

export const DAILY_MIND_PROMPTS = [
  {
    id: 'daily-01',
    topic: 'စိတ်အခြေအနေ သတိပြုခြင်း',
    question: 'ဒီနေ့ စိတ်ထဲမှာ အများဆုံး ခံစားနေရတဲ့ ခံစားချက်တစ်ခုက ဘာလဲ၊ ဘယ်အချိန်မှာ ပိုသိသာလာသလဲ။',
    hint: 'အကောင်းအဆိုး ခွဲခြားမဆုံးဖြတ်ဘဲ ကိုယ့်ခံစားချက်ကို အမည်တပ်ကြည့်ရုံပါပဲ။',
  },
  {
    id: 'daily-02',
    topic: 'စွမ်းအင်နှင့် အနားယူမှု',
    question: 'ဒီနေ့ ကိုယ့်စိတ်စွမ်းအင်ကို အားဖြည့်ပေးတဲ့အရာနဲ့ စွမ်းအင်ကုန်စေတဲ့အရာက ဘာတွေဖြစ်မလဲ။',
    hint: 'သေးငယ်တဲ့ နေ့စဉ်အခိုက်အတန့်လေးတွေကိုပါ ထည့်စဉ်းစားနိုင်ပါတယ်။',
  },
  {
    id: 'daily-03',
    topic: 'ကိုယ်ပိုင်နယ်နိမိတ်',
    question: 'ဒီရက်ပိုင်းမှာ ကိုယ့်အတွက် အချိန်နဲ့ စိတ်အေးချမ်းမှုကို ကာကွယ်ပေးဖို့ ဘယ်နေရာမှာ နယ်နိမိတ်လေးတစ်ခု လိုအပ်နေသလဲ။',
    hint: 'အလုပ်၊ မိသားစု ဒါမှမဟုတ် ဖုန်းသုံးချိန်လိုမျိုး နေ့စဉ်အကြောင်းအရာတစ်ခုခု ဖြစ်နိုင်ပါတယ်။',
  },
  {
    id: 'daily-04',
    topic: 'အတွေးပုံစံ',
    question: 'ဒီနေ့ ကိုယ့်ကိုယ်ကို အလိုမကျဖြစ်မိတာ ဒါမှမဟုတ် တင်းကျပ်မိတာ ရှိခဲ့ရင် ကိုယ့်ကိုယ်ကို ဘယ်လို နူးနူးညံ့ညံ့ ပြန်ပြောပေးနိုင်မလဲ။',
    hint: 'ရင်းနှီးတဲ့ မိတ်ဆွေတစ်ယောက်ကို အားပေးသလိုမျိုး စဉ်းစားကြည့်ပါ။',
  },
  {
    id: 'daily-05',
    topic: 'ဆက်ဆံရေးနှင့် နားထောင်မှု',
    question: 'မကြာသေးမီက တစ်စုံတစ်ယောက်နဲ့ စကားပြောခဲ့ရာမှာ ကိုယ့်စိတ်ထဲ စွဲကျန်နေတဲ့ အခိုက်အတန့်တစ်ခု ရှိပါသလား။',
    hint: 'အဲဒီအခိုက်အတန့်က ကိုယ်တန်ဖိုးထားတဲ့ ဘယ်အရာနဲ့ ဆက်စပ်နေမလဲ။',
  },
  {
    id: 'daily-06',
    topic: 'တန်ဖိုးထားမှု',
    question: 'ဒီနေ့ ကိုယ်လုပ်ခဲ့တဲ့ ရွေးချယ်မှုသေးသေးလေးတစ်ခုဟာ ကိုယ်တန်ဖိုးထားတဲ့ ဘယ်အရာနဲ့ ကိုက်ညီနေသလဲ။',
    hint: 'ကြီးမားတဲ့ ဆုံးဖြတ်ချက်ဖြစ်စရာ မလိုပါဘူး။',
  },
  {
    id: 'daily-07',
    topic: 'စိတ်ဖိစီးမှု တုံ့ပြန်ပုံ',
    question: 'စိတ်ရှုပ်ထွေးလာတဲ့အခါ ကိုယ့်ခန္ဓာကိုယ်နဲ့ အပြုအမူမှာ ဘယ်လိုအချက်ပြမှုတွေ အရင်ဆုံး ပေါ်လာတတ်သလဲ။',
    hint: 'ပုခုံးတင်းတာ၊ စကားနည်းသွားတာ ဒါမှမဟုတ် အာရုံစိုက်ရခက်တာမျိုး ဖြစ်နိုင်ပါတယ်။',
  },
  {
    id: 'daily-08',
    topic: 'ကျေးဇူးတင်စိတ်',
    question: 'ဒီနေ့အတွက် စိတ်သက်သာရာရစေခဲ့တဲ့ ဒါမှမဟုတ် ကျေးဇူးတင်မိတဲ့ အသေးအမွှားအရာတစ်ခုက ဘာလဲ။',
    hint: 'ကော်ဖီတစ်ခွက်၊ လေအေးလေးတစ်ချက် ဒါမှမဟုတ် အလုပ်တစ်ခု ပြီးသွားတာမျိုး ဖြစ်နိုင်ပါတယ်။',
  },
  {
    id: 'daily-09',
    topic: 'စူးစမ်းလိုစိတ်',
    question: 'ဒီရက်ပိုင်းမှာ ကိုယ်ပိုပြီး စိတ်ဝင်တစား လေ့လာချင်နေတဲ့ ဒါမှမဟုတ် စမ်းကြည့်ချင်နေတဲ့ အရာတစ်ခု ရှိပါသလား။',
    hint: 'အသစ်သင်ယူချင်စိတ်က ကိုယ့်စိတ်ဝင်စားရာကို ပြောပြတတ်ပါတယ်။',
  },
  {
    id: 'daily-10',
    topic: 'တိတ်ဆိတ်အေးချမ်းမှု',
    question: 'ဒီနေ့ ကိုယ့်စိတ်အတွက် ၅ မိနစ်လောက် ခဏနားခွင့်ပေးရမယ်ဆိုရင် ဘာလုပ်ရင် အသင့်တော်ဆုံး ဖြစ်မလဲ။',
    hint: 'အသက်ပြင်းပြင်းရှူတာ၊ လမ်းခဏလျှောက်တာ ဒါမှမဟုတ် ဘာမှမလုပ်ဘဲ နားနေတာမျိုး ဖြစ်နိုင်ပါတယ်။',
  },
  {
    id: 'daily-11',
    topic: 'အပြောင်းအလဲနှင့် လိုက်လျောညီထွေမှု',
    question: 'မမျှော်လင့်ထားတဲ့ အပြောင်းအလဲတစ်ခုနဲ့ ကြုံရတဲ့အခါ ကိုယ်အရင်ဆုံး ဘယ်လိုတုံ့ပြန်လေ့ရှိသလဲ။',
    hint: 'အဲဒီတုံ့ပြန်ပုံက ကိုယ့်ကို ဘယ်လိုကာကွယ်ပေးဖို့ ကြိုးစားနေတာလဲ။',
  },
  {
    id: 'daily-12',
    topic: 'ကိုယ့်ကိုယ်ကို သိမြင်မှု',
    question: 'အရင်လတွေနဲ့ နှိုင်းယှဉ်ရင် အခုအချိန်မှာ ကိုယ့်စိတ်နေသဘောထား ဘယ်အပိုင်းလေး ပိုနားလည်လာသလဲ။',
    hint: 'သေးငယ်တဲ့ ပြောင်းလဲမှုလေးတွေကိုပါ အသိအမှတ်ပြုကြည့်ပါ။',
  },
  {
    id: 'daily-13',
    topic: 'ပူးပေါင်းဆောင်ရွက်မှု',
    question: 'သူများနဲ့ အတူတူ လုပ်ဆောင်ရတဲ့အခါ ကိုယ်အသက်သာဆုံး ပါဝင်တတ်တဲ့ အခန်းကဏ္ဍက ဘာဖြစ်မလဲ။',
    hint: 'ဦးဆောင်တာ၊ နားထောင်ညှိနှိုင်းပေးတာ ဒါမှမဟုတ် စနစ်တကျ ပံ့ပိုးပေးတာမျိုး ဖြစ်နိုင်ပါတယ်။',
  },
  {
    id: 'daily-14',
    topic: 'မနက်ဖြန်အတွက် ခြေလှမ်းငယ်',
    question: 'မနက်ဖြန်အတွက် ကိုယ့်စိတ်ကို ဝန်မပိစေဘဲ လုပ်ကြည့်ချင်တဲ့ အသေးဆုံး ခြေလှမ်းတစ်ခုက ဘာလဲ။',
    hint: 'တကယ်လုပ်နိုင်မယ့် ရိုးရှင်းတဲ့ အရာတစ်ခုကိုပဲ ရွေးကြည့်ပါ။',
  },
]

function padTwo(value) {
  return String(value).padStart(2, '0')
}

export function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear()
  const month = padTwo(date.getMonth() + 1)
  const day = padTwo(date.getDate())
  return `${year}-${month}-${day}`
}

export function getDailyReflectionRecordId(date = new Date()) {
  return `${DAILY_REFLECTION_PREFIX}${getLocalDateKey(date)}`
}

export function getDailyMindPrompt(date = new Date()) {
  const dayNumber = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000)
  const index = ((dayNumber % DAILY_MIND_PROMPTS.length) + DAILY_MIND_PROMPTS.length) % DAILY_MIND_PROMPTS.length
  const prompt = DAILY_MIND_PROMPTS[index]
  return {
    ...prompt,
    index,
    total: DAILY_MIND_PROMPTS.length,
    dateKey: getLocalDateKey(date),
    recordId: getDailyReflectionRecordId(date),
  }
}

export function countDailyReflectionNotes() {
  const all = loadAllReflectionNotes()
  return Object.keys(all).filter((key) => key.startsWith(DAILY_REFLECTION_PREFIX)).length
}

export function restoreReflectionNotes(importedNotes, mode = 'merge') {
  if (importedNotes === undefined) {
    return { ok: true, notes: loadAllReflectionNotes() }
  }
  const validationError = validateReflectionNotes(importedNotes)
  if (validationError) return { ok: false, error: validationError, notes: loadAllReflectionNotes() }

  const incoming = normalizeReflectionNotes(importedNotes)
  if (mode === 'replace') {
    const ok = safeWriteNotes(incoming)
    return { ok, notes: ok ? incoming : loadAllReflectionNotes() }
  }

  const current = loadAllReflectionNotes()
  const merged = { ...current }
  for (const [recordId, incomingNote] of Object.entries(incoming)) {
    const currentNote = merged[recordId]
    if (!currentNote || noteTimestampOf(incomingNote.updatedAt) > noteTimestampOf(currentNote.updatedAt)) {
      merged[recordId] = incomingNote
    }
  }
  const ok = safeWriteNotes(merged)
  return { ok, notes: ok ? merged : current }
}
