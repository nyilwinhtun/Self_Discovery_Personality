import { useCallback, useEffect, useRef } from 'react'

/**
 * Schedules a single delayed auto-advance after an answer is selected,
 * guarding against rapid double-taps and cancelling on unmount or manual navigation.
 */
export function useAutoAdvance({ delayMs = 260, isActive = true } = {}) {
  const timerRef = useRef(null)
  const pendingIndexRef = useRef(null)

  const cancelAutoAdvance = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
    pendingIndexRef.current = null
  }, [])

  const scheduleAutoAdvance = useCallback((currentIndex, advanceFn) => {
    cancelAutoAdvance()
    pendingIndexRef.current = currentIndex
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null
      if (pendingIndexRef.current !== currentIndex) return
      pendingIndexRef.current = null
      advanceFn()
    }, delayMs)
  }, [cancelAutoAdvance, delayMs])

  useEffect(() => {
    if (!isActive) cancelAutoAdvance()
  }, [isActive, cancelAutoAdvance])

  useEffect(() => cancelAutoAdvance, [cancelAutoAdvance])

  return { scheduleAutoAdvance, cancelAutoAdvance }
}
