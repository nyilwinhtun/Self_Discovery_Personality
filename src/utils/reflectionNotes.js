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
