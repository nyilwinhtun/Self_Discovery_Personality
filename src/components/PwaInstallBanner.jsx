import { useEffect, useState } from 'react'
import { Download, Share, X } from 'lucide-react'
import BrandLogo from './BrandLogo.jsx'

const DISMISS_STORAGE_KEY = 'self-discovery-pwa-install-dismissed-v1'

function isStandaloneMode() {
  if (typeof window === 'undefined') return true
  return (
    window.matchMedia?.('(display-mode: standalone)')?.matches ||
    window.navigator?.standalone === true
  )
}

function isIosSafari() {
  if (typeof window === 'undefined') return false
  const ua = window.navigator.userAgent || ''
  const isIos = /iPhone|iPad|iPod/i.test(ua)
  const isSafari = /Safari/i.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/i.test(ua)
  return isIos && isSafari
}

function readDismissed() {
  try {
    return window.localStorage.getItem(DISMISS_STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function writeDismissed() {
  try {
    window.localStorage.setItem(DISMISS_STORAGE_KEY, '1')
  } catch {
    // Ignore storage write errors in restricted browsing modes.
  }
}

export default function PwaInstallBanner({ hasBottomNav = false }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [iosHelperVisible, setIosHelperVisible] = useState(false)
  const [dismissed, setDismissed] = useState(() => readDismissed() || isStandaloneMode())

  useEffect(() => {
    if (dismissed || isStandaloneMode()) return undefined

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault()
      setDeferredPrompt(event)
    }

    const handleAppInstalled = () => {
      setDeferredPrompt(null)
      setIosHelperVisible(false)
      setDismissed(true)
      writeDismissed()
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    if (isIosSafari()) {
      setIosHelperVisible(true)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [dismissed])

  if (dismissed || (!deferredPrompt && !iosHelperVisible)) return null

  const handleDismiss = () => {
    writeDismissed()
    setDismissed(true)
    setDeferredPrompt(null)
    setIosHelperVisible(false)
  }

  const handleInstall = async () => {
    if (!deferredPrompt) return
    try {
      await deferredPrompt.prompt()
      const choice = await deferredPrompt.userChoice
      if (choice?.outcome === 'accepted') {
        writeDismissed()
        setDismissed(true)
      }
    } catch {
      // Ignore prompt cancellation errors.
    } finally {
      setDeferredPrompt(null)
    }
  }

  return (
    <aside
      role="region"
      aria-label="App ထည့်သွင်းရန် အကြံပြုချက်"
      className={`no-print fixed inset-x-3 z-30 mx-auto max-w-md rounded-2xl border border-[#1c1917]/20 bg-[#faf8f5]/95 p-4 text-[#1c1917] shadow-[0_14px_34px_rgba(28,25,23,0.12)] backdrop-blur-md sm:left-auto sm:right-6 sm:bottom-6 sm:w-[22rem] sm:max-w-[calc(100vw-3rem)] ${hasBottomNav ? 'bottom-[calc(4.9rem+env(safe-area-inset-bottom))] sm:bottom-6' : 'bottom-4 sm:bottom-6'}`}
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#e7e0d6] bg-[#faf8f5] text-[#1c1917]"
        >
          <BrandLogo size={24} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="text-xs font-bold leading-7 text-[#1c1917]">
              {deferredPrompt ? 'App အဖြစ် ထည့်သွင်းထားမယ်' : 'ဖုန်း Home Screen ပေါ် တင်ထားမယ်'}
            </p>
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="ပိတ်မယ်"
              className="-mr-1 -mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[#57534e] hover:bg-[#efeae2] hover:text-[#1c1917]"
            >
              <X size={16} strokeWidth={1.75} />
            </button>
          </div>
          {deferredPrompt ? (
            <>
              <p className="mt-0.5 text-xs leading-7 text-[#44403c]">
                အင်တာနက်မရှိချိန်မှာပါ အေးအေးဆေးဆေး ပြန်ဖတ်နိုင်ဖို့ App အဖြစ် ထည့်သွင်းထားနိုင်ပါတယ်။
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleInstall}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-xl bg-[#1c1917] px-3.5 py-2 text-xs font-semibold text-[#faf8f5] transition hover:bg-[#292524]"
                >
                  <Download size={14} strokeWidth={1.75} />
                  App အဖြစ် ထည့်သွင်းမယ်
                </button>
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="inline-flex min-h-10 items-center rounded-xl border border-[#d6cfc5] bg-white px-3 py-2 text-xs font-semibold text-[#44403c] hover:bg-[#f3efe8]"
                >
                  ပိတ်မယ်
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="mt-0.5 text-xs leading-7 text-[#44403c]">
                Safari အောက်ခြေက <span className="inline-flex items-center gap-1 font-semibold text-[#1c1917]"><Share size={12} strokeWidth={1.75} aria-hidden="true" /> Share</span> ခလုတ်ကို နှိပ်ပြီး <strong>Add to Home Screen</strong> ကို ရွေးပေးရင် ဖုန်း Home Screen ပေါ် တင်ထားနိုင်ပါတယ်။
              </p>
              <div className="mt-2.5 flex justify-end">
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="inline-flex min-h-10 items-center rounded-xl border border-[#d6cfc5] bg-white px-3 py-2 text-xs font-semibold text-[#44403c] hover:bg-[#f3efe8]"
                >
                  ပိတ်မယ်
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
