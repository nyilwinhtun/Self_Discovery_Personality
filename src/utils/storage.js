const STORAGE_KEY = 'self-discovery-personality-v1'
const BACKUP_FORMAT = 'self-discovery-backup'
const BACKUP_VERSION = 1
const MAX_HISTORY_ENTRIES = 500

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function safeRead() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { drafts: {}, history: [] }
  } catch (error) {
    console.warn('LocalStorage read failed:', error)
    return { drafts: {}, history: [] }
  }
}

function safeWrite(data) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    return true
  } catch (error) {
    console.warn('LocalStorage write failed:', error)
    return false
  }
}

function normalizeScores(scores = {}) {
  if (scores.emotionalStability) return scores
  if (!scores.emotionalSensitivity) return scores
  const { emotionalSensitivity, ...rest } = scores
  return {
    ...rest,
    emotionalStability: {
      ...emotionalSensitivity,
      score: Math.max(0, Math.min(100, 100 - Number(emotionalSensitivity.score || 0))),
      average: Number.isFinite(Number(emotionalSensitivity.average))
        ? Number((6 - Number(emotionalSensitivity.average)).toFixed(2))
        : emotionalSensitivity.average,
    },
  }
}

function normalizeRecord(record) {
  if (!record || typeof record !== 'object') return null
  return { ...record, scores: normalizeScores(record.scores || {}) }
}

function normalizeData(raw) {
  const source = isPlainObject(raw) ? raw : {}
  const drafts = isPlainObject(source.drafts) ? { ...source.drafts } : {}
  // Migrate the original single-draft structure without discarding saved answers.
  if (source.draft && !drafts.personality) {
    drafts.personality = { 30: { assessmentType: 'personality', level: 30, skippedQuestionIds: [], ...source.draft } }
  } else if (source.draft && !drafts.personality?.[30]) {
    drafts.personality = { ...(drafts.personality || {}), 30: { assessmentType: 'personality', level: 30, skippedQuestionIds: [], ...source.draft } }
  }
  const history = Array.isArray(source.history) ? source.history.map(normalizeRecord).filter(Boolean) : []
  // Preserve future module data and settings when reading/writing the same storage envelope.
  return { ...source, drafts, history }
}

function countDrafts(data) {
  return Object.values(data?.drafts || {}).reduce((total, levels) => {
    return total + (isPlainObject(levels) ? Object.keys(levels).length : 0)
  }, 0)
}

function validateDrafts(drafts) {
  if (!isPlainObject(drafts)) return 'Draft အချက်အလက်ပုံစံ မမှန်ပါ။'
  for (const [type, levels] of Object.entries(drafts)) {
    if (!type || !isPlainObject(levels)) return 'Assessment Draft အုပ်စုတစ်ခု၏ ပုံစံ မမှန်ပါ။'
    for (const [level, draft] of Object.entries(levels)) {
      if (!isPlainObject(draft)) return `${type} / ${level} Draft ပုံစံ မမှန်ပါ။`
      if (draft.answers !== undefined && !isPlainObject(draft.answers)) return `${type} / ${level} အဖြေစာရင်း ပုံစံ မမှန်ပါ။`
      if (draft.skippedQuestionIds !== undefined && !Array.isArray(draft.skippedQuestionIds)) return `${type} / ${level} ကျော်ထားသောမေးခွန်းစာရင်း ပုံစံ မမှန်ပါ။`
      if (draft.currentIndex !== undefined && (!Number.isInteger(Number(draft.currentIndex)) || Number(draft.currentIndex) < 0)) return `${type} / ${level} လက်ရှိမေးခွန်းနံပါတ် မမှန်ပါ။`
      for (const value of Object.values(draft.answers || {})) {
        if (!Number.isFinite(Number(value)) || Number(value) < 1 || Number(value) > 5) {
          return `${type} / ${level} အဖြေတန်ဖိုး ၁ မှ ၅ အတွင်း မရှိပါ။`
        }
      }
    }
  }
  return null
}

function validateHistory(history) {
  if (!Array.isArray(history)) return 'History အချက်အလက်သည် စာရင်းပုံစံ မဟုတ်ပါ။'
  for (const record of history) {
    if (!isPlainObject(record) || typeof record.id !== 'string' || !record.id.trim()) {
      return 'History ထဲမှာ ID မပါသော သို့မဟုတ် ပုံစံမမှန်သော မှတ်တမ်း ရှိနေပါတယ်။'
    }
    if (record.scores !== undefined && !isPlainObject(record.scores)) return 'History ရလဒ်အမှတ် ပုံစံ မမှန်ပါ။'
    if (record.answers !== undefined && !isPlainObject(record.answers)) return 'History အဖြေစာရင်း ပုံစံ မမှန်ပါ။'
  }
  return null
}

export function loadAppData() {
  return normalizeData(safeRead())
}

export function loadDraft(level = 30, assessmentType = 'personality') {
  const data = loadAppData()
  return data.drafts?.[assessmentType]?.[String(level)] || null
}

export function saveDraft(draft) {
  const data = loadAppData()
  const assessmentType = draft.assessmentType || 'personality'
  const level = String(draft.level || 30)
  const nextDrafts = {
    ...data.drafts,
    [assessmentType]: {
      ...(data.drafts[assessmentType] || {}),
      [level]: { ...draft, assessmentType, level: Number(level) },
    },
  }
  return safeWrite({ ...data, drafts: nextDrafts, history: data.history })
}

export function clearDraft(level = 30, assessmentType = 'personality') {
  const data = loadAppData()
  const typeDrafts = { ...(data.drafts[assessmentType] || {}) }
  delete typeDrafts[String(level)]
  const nextDrafts = { ...data.drafts, [assessmentType]: typeDrafts }
  if (Object.keys(typeDrafts).length === 0) delete nextDrafts[assessmentType]
  return safeWrite({ ...data, drafts: nextDrafts, history: data.history })
}

export function saveAssessment(record) {
  const data = loadAppData()
  const history = [normalizeRecord(record), ...data.history.filter((item) => item.id !== record.id)].slice(0, 50)
  const drafts = { ...data.drafts }
  const assessmentType = record.assessmentType || 'personality'
  const level = String(record.level || 30)
  if (drafts[assessmentType]) {
    const typeDrafts = { ...drafts[assessmentType] }
    delete typeDrafts[level]
    if (Object.keys(typeDrafts).length) drafts[assessmentType] = typeDrafts
    else delete drafts[assessmentType]
  }
  safeWrite({ ...data, drafts, history })
  return history
}

export function deleteAssessment(id) {
  const data = loadAppData()
  const history = data.history.filter((item) => item.id !== id)
  safeWrite({ ...data, history })
  return history
}

export function clearHistory() {
  const data = loadAppData()
  safeWrite({ ...data, history: [] })
  return []
}

/** Create a portable JSON backup. The envelope is versioned for future compatibility. */
export function createBackupSnapshot() {
  const data = loadAppData()
  return {
    format: BACKUP_FORMAT,
    version: BACKUP_VERSION,
    app: 'Self Discovery',
    exportedAt: new Date().toISOString(),
    summary: {
      draftCount: countDrafts(data),
      historyCount: data.history.length,
    },
    data,
  }
}

/** Validate and normalize an imported backup before showing it to the user. */
export function inspectBackupSnapshot(snapshot) {
  if (!isPlainObject(snapshot)) return { valid: false, error: 'JSON ဖိုင်အတွင်းရှိ အချက်အလက်ပုံစံ မမှန်ပါ။' }
  if (snapshot.format !== BACKUP_FORMAT) return { valid: false, error: 'ဒီဖိုင်ဟာ Self Discovery Backup ဖိုင် မဟုတ်ပါ။' }
  if (snapshot.version !== BACKUP_VERSION) return { valid: false, error: `ဒီ Backup Version (${snapshot.version ?? 'မသိရှိ'}) ကို မထောက်ပံ့သေးပါ။` }
  if (!isPlainObject(snapshot.data)) return { valid: false, error: 'Backup ထဲမှာ ပြန်လည်သိမ်းဆည်းရန် Data မတွေ့ပါ။' }

  const draftsError = validateDrafts(snapshot.data.drafts || {})
  if (draftsError) return { valid: false, error: draftsError }
  const historyError = validateHistory(snapshot.data.history || [])
  if (historyError) return { valid: false, error: historyError }

  const data = normalizeData(snapshot.data)
  return {
    valid: true,
    data,
    exportedAt: snapshot.exportedAt || null,
    summary: {
      draftCount: countDrafts(data),
      historyCount: data.history.length,
    },
  }
}

function timestampOf(value) {
  const parsed = Date.parse(value || '')
  return Number.isFinite(parsed) ? parsed : 0
}

function mergeData(currentData, importedData) {
  const current = normalizeData(currentData)
  const incoming = normalizeData(importedData)
  const drafts = { ...current.drafts }

  for (const [type, importedLevels] of Object.entries(incoming.drafts)) {
    const currentLevels = { ...(drafts[type] || {}) }
    for (const [level, importedDraft] of Object.entries(importedLevels || {})) {
      const currentDraft = currentLevels[level]
      if (!currentDraft || timestampOf(importedDraft.updatedAt) > timestampOf(currentDraft.updatedAt)) {
        currentLevels[level] = importedDraft
      }
    }
    drafts[type] = currentLevels
  }

  const byId = new Map()
  for (const record of [...current.history, ...incoming.history]) {
    const existing = byId.get(record.id)
    if (!existing || timestampOf(record.createdAt) > timestampOf(existing.createdAt)) byId.set(record.id, record)
  }
  const history = [...byId.values()]
    .sort((a, b) => timestampOf(b.createdAt) - timestampOf(a.createdAt))
    .slice(0, MAX_HISTORY_ENTRIES)

  // Current settings/data win on key collisions; new backup-only fields are retained.
  const extras = { ...incoming, ...current }
  return { ...extras, drafts, history }
}

/** Restore validated backup data. Merge is the safe default; replace is explicit. */
export function restoreBackupData(importedData, mode = 'merge') {
  if (!isPlainObject(importedData)) return { success: false, error: 'ပြန်လည်သိမ်းဆည်းမည့် Data ပုံစံ မမှန်ပါ။' }
  const draftsError = validateDrafts(importedData.drafts || {})
  if (draftsError) return { success: false, error: draftsError }
  const historyError = validateHistory(importedData.history || [])
  if (historyError) return { success: false, error: historyError }

  const nextData = mode === 'replace'
    ? normalizeData(importedData)
    : mergeData(loadAppData(), importedData)
  const success = safeWrite(nextData)
  return success
    ? { success: true, data: loadAppData() }
    : { success: false, error: 'Browser Storage ပြည့်နေခြင်း သို့မဟုတ် သိမ်းဆည်းခွင့်မရှိခြင်းကြောင့် Restore မလုပ်နိုင်ပါ။' }
}
