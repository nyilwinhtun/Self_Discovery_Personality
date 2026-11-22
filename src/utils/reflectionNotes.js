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
