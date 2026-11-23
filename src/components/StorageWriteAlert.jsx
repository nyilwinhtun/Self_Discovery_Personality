import { AlertTriangle, Download, X } from 'lucide-react'

/**
 * Accessible warning banner shown when LocalStorage writes fail
 * (e.g. Private/Incognito quota limits or disabled browser storage).
 */
export default function StorageWriteAlert({ visible, onExportBackup, onDismiss, className = '' }) {
  if (!visible) return null

  return (
    <div
      role="alert"
      className={`no-print mb-5 flex flex-col gap-3 rounded-2xl border border-[#e7b8b8] bg-[#fdf2f2] p-4 text-[#7c2d2d] shadow-sm sm:flex-row sm:items-start sm:justify-between ${className}`.trim()}
    >
      <div className="flex items-start gap-3">
        <AlertTriangle size={18} className="mt-0.5 shrink-0 text-[#b44444]" />
        <div className="text-sm leading-7">
          <p className="font-bold text-[#7c2d2d]">ဒီ Browser ထဲမှာ သိမ်းဆည်း၍ မရပါ</p>
          <p className="mt-0.5 text-[#8a3a3a]">
            Private Mode အသုံးပြုနေခြင်း၊ Browser နေရာလွတ် ပြည့်နေခြင်း သို့မဟုတ် သိမ်းဆည်းခွင့် ပိတ်ထားခြင်း ဖြစ်နိုင်ပါသည်။ အချက်အလက်မပျောက်စေရန် မှတ်တမ်းဖိုင် သို့မဟုတ် အစီရင်ခံစာ ထုတ်ယူသိမ်းဆည်းထားပါ။
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2 self-end sm:self-start">
        {onExportBackup && (
          <button
            type="button"
            onClick={onExportBackup}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-xl border border-[#dfb0b0] bg-white px-3 py-1.5 text-xs font-semibold text-[#7c2d2d] transition hover:bg-[#faf0f0]"
          >
            <Download size={14} /> မှတ်တမ်းဖိုင် သိမ်းမယ်
          </button>
        )}
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="သတိပေးချက်ကို ပိတ်မယ်"
            className="grid h-9 w-9 place-items-center rounded-xl text-[#8a3a3a] transition hover:bg-[#f7e2e2]"
          >
            <X size={15} />
          </button>
        )}
      </div>
    </div>
  )
}
