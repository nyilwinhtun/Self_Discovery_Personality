import { useState } from 'react'
import { ImageDown } from 'lucide-react'

const TONE_CLASSES = {
  plum: 'border-[#e5dce6] text-[#6e5a77] hover:border-[#cdbdd2] hover:bg-[#faf7fb]',
  blue: 'border-[#d4e0ef] text-[#446c96] hover:border-[#b7cde6] hover:bg-[#f4f8fc]',
  terracotta: 'border-[#ebd6d1] text-[#7c392b] hover:border-[#d9b4ab] hover:bg-[#fcf6f4]',
  sage: 'border-[#d4e1d7] text-[#33573d] hover:border-[#b4cbb9] hover:bg-[#f3f8f4]',
  teal: 'border-[#cce0e2] text-[#1e4a4f] hover:border-[#9fc4c7] hover:bg-[#f4f9f9]',
}

/**
 * Lazy-loads the zero-dependency Canvas PNG generator on click so the initial
 * entry JS bundle remains small.
 */
export default function ResultShareCardButton({ getCardConfig, tone = 'plum' }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const handleClick = async () => {
    if (busy) return
    setBusy(true)
    setError('')
    try {
      const config = getCardConfig()
      const { downloadResultImageCard } = await import('../utils/resultImageCard.js')
      await downloadResultImageCard(config)
    } catch {
      setError('ပုံသိမ်းရာတွင် အခက်အခဲရှိနေပါသည်။ ထပ်မံစမ်းကြည့်ပါ။')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="inline-flex flex-col items-start">
      <button
        type="button"
        onClick={handleClick}
        disabled={busy}
        className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border bg-white px-5 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${TONE_CLASSES[tone] || TONE_CLASSES.plum}`}
      >
        <ImageDown size={16} />
        {busy ? 'ပုံထုတ်နေသည်...' : 'ရလဒ်ပုံ သိမ်းမယ် (PNG)'}
      </button>
      {error && (
        <p role="status" className="mt-1.5 text-[11px] font-medium text-[#8b3a2b]">
          {error}
        </p>
      )}
    </div>
  )
}
