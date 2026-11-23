/**
 * Privacy-first GoatCounter analytics helpers.
 * Sends only anonymous route views and assessment completion counts.
 * Never transmits user answers, scores, or journal notes.
 * Silently no-ops when offline, ad-blocked, or in non-browser environments.
 */

let pendingPageView = null
let loadListenerAttached = false

function getGoatCounter() {
  if (typeof window === 'undefined') return null
  const gc = window.goatcounter
  if (!gc || typeof gc.count !== 'function') return null
  return gc
}

function safeCount(payload) {
  const gc = getGoatCounter()
  if (!gc) return false
  try {
    gc.count(payload)
    return true
  } catch {
    return false
  }
}

function queueInitialPageView(payload) {
  if (typeof document === 'undefined') return
  pendingPageView = payload
  if (loadListenerAttached) return
  const script = document.querySelector('script[data-goatcounter]')
  if (!script) return
  loadListenerAttached = true
  script.addEventListener(
    'load',
    () => {
      if (pendingPageView) {
        const toSend = pendingPageView
        pendingPageView = null
        safeCount(toSend)
      }
    },
    { once: true }
  )
}

export function trackPageView(path, title) {
  const payload = {
    path: path || '/',
    ...(title ? { title } : {}),
  }
  if (!safeCount(payload)) {
    queueInitialPageView(payload)
  } else {
    pendingPageView = null
  }
}

export function trackAssessmentCompleted(moduleId, questionCount) {
  const cleanId = String(moduleId || '').trim().toLowerCase()
  if (!cleanId) return
  const suffix = questionCount ? `-${Number(questionCount)}` : ''
  const eventPath = `complete/${cleanId}${suffix}`
  safeCount({
    path: eventPath,
    title: `Completed ${cleanId}${suffix}`,
    event: true,
  })
}
