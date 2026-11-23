import { Component } from 'react'
import { createBackupSnapshot } from '../utils/storage.js'

export default class AppErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      backupStatus: '',
      backupError: '',
    }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('AppErrorBoundary caught a rendering error:', error?.message || error, info?.componentStack || '')
  }

  handleReload = () => {
    window.location.reload()
  }

  handleEmergencyBackup = () => {
    try {
      const snapshot = createBackupSnapshot()
      const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      const dateStamp = new Date().toISOString().slice(0, 10)
      anchor.href = url
      anchor.download = `self-discovery-emergency-backup-${dateStamp}.json`
      anchor.rel = 'noopener'
      anchor.style.display = 'none'
      document.body.appendChild(anchor)
      anchor.click()
      anchor.remove()
      window.setTimeout(() => URL.revokeObjectURL(url), 1500)
      this.setState({
        backupError: '',
        backupStatus: `မှတ်တမ်းဖိုင် ထုတ်သိမ်းပြီးပါပြီ (မပြီးသေးတဲ့ အဖြေ ${snapshot.summary.draftCount} ခု၊ မှတ်တမ်း ${snapshot.summary.historyCount} ခု၊ ကိုယ်ပိုင်မှတ်စု ${snapshot.summary.noteCount} ခု)။`,
      })
    } catch {
      this.setState({
        backupStatus: '',
        backupError: 'မှတ်တမ်းဖိုင် ထုတ်ယူရာတွင် အခက်အခဲ ဖြစ်နေပါသည်။ Browser ထဲက အချက်အလက်ကို မရှင်းဘဲ စာမျက်နှာကို ပြန်ဖွင့်ကြည့်ပါ။',
      })
    }
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children
    }

    return (
      <main
        role="alert"
        className="soft-grid flex min-h-screen items-center justify-center bg-[#f8f5f6] px-4 py-10 text-[#403747]"
      >
        <section className="w-full max-w-lg rounded-[2rem] border border-[#e7dce9] bg-[#fffdfd] p-6 shadow-sm sm:p-8">
          <span className="inline-flex items-center rounded-full bg-[#f3edf5] px-3 py-1 text-xs font-bold text-[#6e557c]">
            ယာယီအမှား တွေ့ရှိပါသည်
          </span>
          <h1 className="mt-4 text-xl font-bold leading-snug text-[#493b50]">
            စာမျက်နှာ ပြသရာတွင် မမျှော်လင့်ထားသော အမှား ဖြစ်ပွားနေပါသည်
          </h1>
          <p className="mt-3 text-sm leading-7 text-[#5e5163]">
            စိတ်မပူပါနှင့် — သင့်အဖြေများ၊ မပြီးသေးသော အဖြေများနှင့် ကိုယ်ပိုင်မှတ်စုများသည် ဒီဖုန်းရဲ့ Browser ထဲမှာပဲ ဆက်လက်သိမ်းဆည်းထားဆဲ ဖြစ်နိုင်ပါသည်။ စိတ်ချရစေရန် အောက်ပါခလုတ်မှ မှတ်တမ်းဖိုင် အရင်သိမ်းပြီး စာမျက်နှာကို ပြန်ဖွင့်နိုင်ပါသည်။
          </p>

          {this.state.backupStatus && (
            <p className="mt-4 rounded-2xl border border-[#d6e5d8] bg-[#f4faf5] px-4 py-3 text-xs leading-7 text-[#2f5d38]">
              {this.state.backupStatus}
            </p>
          )}

          {this.state.backupError && (
            <p className="mt-4 rounded-2xl border border-[#e8c6cc] bg-[#fff5f6] px-4 py-3 text-xs leading-7 text-[#8b3d4a]">
              {this.state.backupError}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={this.handleReload}
              className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-2xl bg-[#80678f] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#725981] sm:text-sm"
            >
              စာမျက်နှာ ပြန်ဖွင့်မယ်
            </button>
            <button
              type="button"
              onClick={this.handleEmergencyBackup}
              className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-2xl border border-[#d9c8de] bg-[#faf6fb] px-4 py-3 text-xs font-bold text-[#5f486d] transition hover:bg-[#f2ebf5] sm:text-sm"
            >
              မှတ်တမ်းဖိုင် သိမ်းမယ်
            </button>
          </div>
        </section>
      </main>
    )
  }
}
