# Self Discovery — Phase 1 Implementation Plan

**ရက်စွဲ:** 2026-11-22  
**အခြေခံဗားရှင်း:** `1.11.1-beta.1` ([package.json](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/package.json)) · Commit `8ace982` (`main...origin/main`)  
**အခြေအနေ:** **Draft for Owner Approval** (Source code မပြင်ရသေးပါ · Owner ခွင့်ပြုချက် စောင့်ဆိုင်းနေသည်)  
**အခြေခံအစီရင်ခံစာ ၆ စောင်:** `FULL_PRODUCT_AUDIT.md`, `COMPETITOR_RESEARCH.md`, `COMPETITOR_COMPARISON_MATRIX.md`, `PRODUCT_GAP_ANALYSIS.md`, `PRODUCT_ROADMAP_RECOMMENDATION.md`, `RESEARCH_SOURCES.md`

---

## 1. မဖြစ်မနေ ထိန်းသိမ်းရမည့် စည်းမျဉ်းများ (Protected Invariants & Scope Guardrails)

Phase 1 ပြင်ဆင်မှုအားလုံးတွင် အောက်ပါအချက်များကို **လုံးဝ မထိခိုက်စေရ** (`AGENTS.md` §3–§4, §8):

1. **Question Banks & Scoring:** TraitLens (30/60/120), InnerCompass V0.2 (30 items), Career Interest RIASEC (30 items) တို့၏ မေးခွန်းစာသား၊ Question IDs၊ အစီအစဉ်၊ Answer options၊ Reverse-scoring flags နှင့် Scoring တွက်ချက်ပုံများကို **လုံးဝ မပြောင်းလဲပါ**။
2. **Reverse-Scoring & Psychometrics:** Reverse-scoring item အသစ်များကို အလိုအလျောက် မထည့်သွင်းပါ။ Psychometric အထောက်အထားနှင့် Owner ခွင့်ပြုချက်မရှိဘဲ မေးခွန်းများကို မပြောင်းလဲပါ။
3. **LocalStorage & Backup Compatibility:** LocalStorage key (`self-discovery-personality-v1`), Draft/History record schemas, JSON Backup format (`self-discovery-backup`, version `1`), နှင့် Merge/Replace semantics များကို **မပြောင်းလဲပါ** (Legacy `draft` နှင့် `emotionalSensitivity` migration များ ဆက်လက်အလုပ်လုပ်ရမည်)။
4. **Local-First Privacy:** External API, Telemetry, Analytics, Firebase, Login, Ads မထည့်သွင်းပါ။
5. **Human Specialist Boundary:** Psychology Reviewer နှင့် Burmese Language Expert လိုအပ်သော အကြောင်းအရာများကို AI က `Approved` သို့မဟုတ် `Published` အဖြစ် မသတ်မှတ်ပါ။

---

## 2. Priority Overview, Dependencies & Implementation Order

### 2.1 Priority Tiers Summary

| ID | Title | Priority | Effort | Dependencies | Target Files (Planned) |
|---|---|---|---|---|---|
| **P1-C1** | History 50-Record Silent Truncation Fix | **Critical** | Low | None | `src/utils/storage.js`, `scripts/validate-backup.mjs` |
| **P1-C2** | LocalStorage Write-Failure Detection & Alert UI | **Critical** | Low–Med | P1-C1 | `src/utils/storage.js`, `src/App.jsx`, `src/components/InnerCompassModule.jsx`, `src/components/CareerInterestModule.jsx` |
| **P1-C3** | WCAG AA Color Contrast & Minimum Burmese Font Size | **Critical** | Medium | None | `src/App.jsx`, `src/components/InnerCompassModule.jsx`, `src/components/CareerInterestModule.jsx`, `src/components/KnowledgeCenter.jsx`, `src/components/KnowledgeInlineHelp.jsx`, `src/components/ReportSectionNavigation.jsx`, `scripts/validate-design.mjs` |
| **P1-C4** | Homepage First-Impression & Assessment Entry Flow | **Critical** | Medium | P1-C3 | `src/App.jsx` |
| **P1-H1** | Header Active Tab Bug & `.txt` Download Reliability | **High** | Low | None | `src/App.jsx`, `src/components/CareerInterestModule.jsx`, `src/utils/download.js` (new helper) |
| **P1-H2** | Modal Keyboard Accessibility (Escape + Focus Trap + Restore) | **High** | Low–Med | None | `src/App.jsx`, `src/components/KnowledgeInlineHelp.jsx` |
| **P1-H3** | Career Interest Intro/Instructions Double-Step Consolidation | **High** | Low | None | `src/components/CareerInterestModule.jsx` |
| **P1-H4** | Estimated Time Labels & Question Screen Framing Neutrality | **High** | Low | None | `src/App.jsx`, `src/components/InnerCompassModule.jsx`, `src/components/CareerInterestModule.jsx` |
| **P1-H5** | Top-Level React ErrorBoundary + Emergency JSON Export | **High** | Low | P1-C1 | `src/components/ErrorBoundary.jsx` (new), `src/main.jsx` |
| **P1-M1** | Code Splitting (`Recharts` & Secondary Modules Lazy Load) | **Medium** | Medium | P1-H5 | `src/App.jsx`, `src/components/InnerCompassModule.jsx`, `vite.config.js` (verify only) |
| **P1-M2** | Report Section Navigation Scrollspy & Narrow-Mobile Radar Fit | **Medium** | Low | P1-C3 | `src/components/ReportSectionNavigation.jsx`, `src/App.jsx`, `src/components/InnerCompassModule.jsx` |
| **P1-M3** | Knowledge Inline Help "Read Full Entry" Navigation & Duplicate Draft-Write Cleanup | **Medium** | Low | None | `src/components/KnowledgeInlineHelp.jsx`, `src/App.jsx` |
| **P1-L1** | Pin Dependency Versions & Legacy Config Audit (`tailwind.config.js`) | **Low** | Low | P1-M1 | `package.json`, `tailwind.config.js` (comment/verify only) |

### 2.2 Recommended Implementation Order (Dependency-Driven)

```text
Wave 1 (Data Safety — အရေးကြီးဆုံး)
  └─ P1-C1 (History 500-limit consistency) ──▶ P1-C2 (Write-failure UI alerts) ──▶ P1-H5 (ErrorBoundary + Emergency Backup)

Wave 2 (Core Bugs & Accessibility Foundation)
  ├─ P1-H1 (Header active bug + shared download helper)
  ├─ P1-H2 (Modal Escape + Focus trap + Focus restore)
  └─ P1-C3 (WCAG AA contrast >= 4.5:1 & min font size >= 12px)

Wave 3 (First-Impression & Assessment UX — Depends on Wave 2 palette)
  ├─ P1-C4 (Homepage Hero-first + compact Beta notice + direct TraitLens levels)
  ├─ P1-H3 (Career Interest single-step intro)
  └─ P1-H4 (Time estimates + neutral question screen without trait/dimension disclosure)

Wave 4 (Performance & Polish)
  ├─ P1-M2 (Report scrollspy + 320px/360px Radar chart fit)
  ├─ P1-M3 (KnowledgeInlineHelp -> Knowledge Center detail link + double-write cleanup)
  ├─ P1-M1 (React.lazy code splitting to reduce 997 kB bundle)
  └─ P1-L1 (Dependency semver pinning & unused config cleanup)
```

---

## 3. Detailed Task Specifications (Critical → High → Medium → Low)

---

### CRITICAL PRIORITY

#### P1-C1: History 50-Record Silent Truncation Fix
- **Problem:** ပြီးဆုံးထားသော Assessment မှတ်တမ်း ၅၀ ခုကျော်ရှိသူသည် Assessment အသစ်တစ်ခု ထပ်ဖြေဆိုပြီးချိန်တွင် အဟောင်းမှတ်တမ်းများ အသိပေးချက်မရှိဘဲ အလိုအလျောက် ပျက်သွားနိုင်သည်။
- **Root Cause (Source Evidence):**
  - [src/utils/storage.js#L4](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/src/utils/storage.js#L4): `const MAX_HISTORY_ENTRIES = 500` ဟု သတ်မှတ်ထားသည်။
  - [src/utils/storage.js#L231](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/src/utils/storage.js#L231): `mergeData()` တွင် `.slice(0, MAX_HISTORY_ENTRIES)` (500) ကို အသုံးပြုထားသည်။
  - [src/utils/storage.js#L136](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/src/utils/storage.js#L136): `saveAssessment(record)` တွင်မူ `.slice(0, 50)` ဟု Hardcode ဖြစ်နေသဖြင့် Merge လုပ်၍ 51–500 ခု ရှိနေသူများပင် Assessment အသစ်သိမ်းလိုက်သည်နှင့် 50 ခုသို့ ဖြတ်ချခံရသည်။
  - ထို့အပြင် [src/utils/storage.js#L146](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/src/utils/storage.js#L146), `#L153`, `#L159` တို့တွင် `safeWrite(...)` ၏ boolean return value ကို မစစ်ဆေးဘဲ `history` / `[]` ကို တိုက်ရိုက်ပြန်ပေးနေသည်။
- **Proposed Fix:**
  1. `saveAssessment()` ([storage.js#L136](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/src/utils/storage.js#L136)) တွင် `.slice(0, 50)` အစား `.slice(0, MAX_HISTORY_ENTRIES)` ကို ပြောင်းလဲအသုံးပြုရန်။
  2. `saveAssessment()` ၏ return contract (`history` array) ကို Backward-compatible ဖြစ်အောင် ထိန်းသိမ်းလျက် write status ကိုပါ သိရှိနိုင်ရန် `getLastStorageError()` သို့မဟုတ် `saveAssessmentWithStatus()` helper အသစ်တစ်ခု ထပ်တိုးရန် (သို့မဟုတ် existing callers များကို မပျက်စေဘဲ status စစ်နိုင်ရန်)။
- **Risk to Existing Data:** **အလွန်နည်း (Very Low)** — ရှိပြီးသား 50 ခုအောက် History များ လုံးဝ မပြောင်းလဲပါ။ LocalStorage key (`self-discovery-personality-v1`) နှင့် Record format မပြောင်းပါ။
- **Test Plan:**
  - `scripts/validate-backup.mjs` တွင် History 55 ခု (သို့မဟုတ် 505 ခု) ဖြင့် `saveAssessment()` ကို စမ်းသပ်ပြီး 55 ခုလုံး မပျောက်ဘဲ 500 အထိ ထိန်းသိမ်းနိုင်ကြောင်း Unit test ထည့်သွင်းစစ်ဆေးရန်။
  - `npm run validate:backup` နှင့် `npm run validate:all` run ရန်။
- **Acceptance Criteria:**
  - History 50+ ခု ရှိနေချိန် Assessment အသစ်တစ်ခု ပြီးဆုံးသိမ်းဆည်းပါက အဟောင်းမှတ်တမ်းများ မပျက်ဘဲ 500 ခုအထိ ထိန်းသိမ်းနိုင်ရမည်။
  - Existing backup import/merge/replace tests အားလုံး Pass ဖြစ်ရမည်။

---

#### P1-C2: LocalStorage Write-Failure Detection & User Alert UI
- **Problem:** Private mode, Storage quota full (`QuotaExceededError`), သို့မဟုတ် Browser write block ဖြစ်နေချိန်တွင် Draft နှင့် Completed Assessment သိမ်းဆည်းမှု ကျရှုံးသော်လည်း အသုံးပြုသူကို မည်သည့်သတိပေးချက်မျှ မပြဘဲ Silent fail ဖြစ်နေသည်။
- **Root Cause (Source Evidence):**
  - `safeWrite` ([src/utils/storage.js#L20-L28](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/src/utils/storage.js#L20-L28)) သည် error ဖြစ်လျှင် `false` ပြန်ပေးသည်။
  - [src/App.jsx#L824-L826](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/src/App.jsx#L824-L826) (`persistDraft`), `#L831`, `#L926`, `#L957`, `#L991`, `#L1023` တို့တွင် `saveDraft`/`saveAssessment` return value ကို UI error state သို့ မချိတ်ထားပါ။
  - [src/components/InnerCompassModule.jsx#L341-L343](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/src/components/InnerCompassModule.jsx#L341-L343), `#L386`, `#L426`, `#L460`, `#L505`, `#L532` တို့တွင်လည်း အလားတူ ignore လုပ်ထားသည်။
  - [src/components/CareerInterestModule.jsx#L201-L204](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/src/components/CareerInterestModule.jsx#L201-L204), `#L247`, `#L275`, `#L294`, `#L318` တို့တွင်လည်း ignore လုပ်ထားသည်။
- **Proposed Fix:**
  1. `storage.js` တွင် Write failure ဖြစ်ပွားပါက UI မှ ဖတ်ယူပြသနိုင်ရန် Shared write-status callback / helper (`saveAssessmentRecord` returning `{ ok, history }` သို့မဟုတ် `onStorageWriteError` listener) ထည့်သွင်းရန် (Existing `saveAssessment()` export ကို မဖျက်ဘဲ ထိန်းသိမ်းထားမည်)။
  2. `App.jsx`, `InnerCompassModule.jsx`, `CareerInterestModule.jsx` ၃ ခုလုံးတွင် `saveDraft()` မှ `false` ပြန်လာလျှင် သို့မဟုတ် `saveAssessment` write fail ဖြစ်လျှင် Dismissible Burmese Warning Banner ("သင့် Browser Storage ထဲသို့ သိမ်းဆည်း၍ မရပါ — Private Mode သို့မဟုတ် Storage ပြည့်နေခြင်း ဖြစ်နိုင်ပါသည်။ အချက်အလက်မပျောက်စေရန် JSON Backup ထုတ်ယူထားပါ။") + Quick Backup Export button ကို ပြသရန်။
  3. Question screen ရှိ "အလိုအလျောက် သိမ်းဆည်းနေသည်" badge ကို Write fail ဖြစ်နေချိန်တွင် "သိမ်းဆည်းမှု မအောင်မြင်ပါ" warning state သို့ ပြောင်းပြရန်။
- **Risk to Existing Data:** **မရှိ (None)** — Write failure ဖြစ်ချိန် UI feedback ထည့်ခြင်းသာ ဖြစ်ပြီး LocalStorage schema သို့မဟုတ် Data write payload ကို မပြောင်းလဲပါ။
- **Test Plan:**
  - `validate-backup.mjs` တွင် `localStorage.setItem` ကို `QuotaExceededError` throw အောင် Mock လုပ်ပြီး `saveDraft` နှင့် `saveAssessment` failure status တိကျစွာ ပြန်ပေးကြောင်း စစ်ဆေးရန်။
  - Browser DevTools Console တွင် `localStorage.setItem` ကို temporary override လုပ်၍ Assessment ဖြေဆို/ပြီးဆုံးချိန် Warning banner နှင့် Emergency Backup button ပေါ်လာခြင်းကို Manual test လုပ်ရန်။
- **Acceptance Criteria:**
  - LocalStorage write fail ဖြစ်တိုင်း Module ၃ ခုလုံးတွင် ရှင်းလင်းသော မြန်မာသတိပေးစာနှင့် Backup ထုတ်နိုင်သည့် ခလုတ် ပေါ်လာရမည်။
  - Personal answers/data များကို Console သို့ log မထုတ်ရ (`console.warn('LocalStorage write failed:', error)` တွင် answer payload မပါစေရ)။

---

#### P1-C3: WCAG AA Color Contrast (>= 4.5:1) & Minimum Burmese Font Size
- **Problem:** App တစ်ခုလုံးရှိ Muted gray text colors များသည် WCAG AA (4.5:1 for normal text) အောက် ရောက်နေပြီး `9px–10px` Burmese text များမှာ Android ဖုန်းငယ်များတွင် ဖတ်ရခက်ခဲသည်။
- **Root Cause (Source Evidence):**
  - `src/App.jsx`, `CareerInterestModule.jsx`, `KnowledgeInlineHelp.jsx`, `KnowledgeCenter.jsx`, `ReportSectionNavigation.jsx` တို့တွင် White/Near-white background ပေါ်၌ `#b0a6b2` (**2.35:1**), `#9aa9b8` (**2.40:1**), `#a69ba8` (**2.67:1**), `#a196a5` (**2.83:1**), `#a18fa7` (**3.00:1**), `#97899b` (**3.30:1**), `#95889a` (**3.35:1**), `#8e8192` (**3.68:1**), `#8b808e` (**3.77:1**) တို့ကို အသုံးပြုထားသည်။
  - `text-[9px]`, `text-[10px]`, `text-[11px]` များကို Burmese labels, captions, facet descriptions, footer နှင့် beta badges များတွင် အသုံးပြုထားသည် (ဥပမာ `App.jsx` L66, L68, L148, L156, L209, L220, L494, L708, L1119)။
  - [scripts/validate-design.mjs#L78-L80](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/scripts/validate-design.mjs#L78-L80) သည် Guide palette အနည်းငယ်ကိုသာ စစ်ဆေးထားသည်။
- **Proposed Fix:**
  1. Design palette ၏ soft-plum/slate-blue aesthetic ကို မပျက်စေဘဲ Muted text colors များကို WCAG AA (>= 4.5:1 on `#ffffff` / `#faf7fa`) ဝင်သော Shades များ (ဥပမာ `#6f6276` = 5.6:1, `#63566a` = 6.9:1, `#5e5263` = 7.4:1, blue theme `#4b6785` = 5.7:1) သို့ စနစ်တကျ အစားထိုးရန်။
  2. Burmese prose/label/description များတွင် `text-[9px]` နှင့် `text-[10px]` များကို အနည်းဆုံး `text-xs` (`12px`) သို့မဟုတ် `text-[11px]` (short uppercase English tags/badges များအတွက်သာ minimum `11px`) သို့ မြှင့်တင်ရန်။
  3. `scripts/validate-design.mjs` တွင် UI muted text tokens များ၏ Contrast ratio >= 4.5:1 ရှိမရှိ automated check တိုးချဲ့ထည့်သွင်းရန်။
- **Risk to Existing Data:** **မရှိ (None)** — Visual styling tokens များသာ ဖြစ်သည်။
- **Test Plan:**
  - `npm run validate:design` နှင့် `npm run validate:all` run ရန်။
  - Node script ဖြင့် `src/` ထဲရှိ text hex colors အားလုံး Background (`#ffffff`, `#faf7fa`, `#fbf9fa`) အပေါ် 4.5:1 ရှိမရှိ စစ်ဆေးရန်။
  - Mobile 360px နှင့် Desktop 1280px တွင် Text wrapping နှင့် Overflow မဖြစ်ကြောင်း Manual visual check လုပ်ရန်။
- **Acceptance Criteria:**
  - UI text colors အားလုံး WCAG AA >= 4.5:1 ရှိရမည်။
  - Burmese body/caption/helper text များတွင် `9px`/`10px` မရှိစေရ (Burmese text minimum `11px–12px`)။

---

#### P1-C4: Homepage First-Impression & Assessment Entry Flow
- **Problem:** Mobile 360px တွင် ပထမဆုံးဝင်လာသူသည် App ၏ Hero headline နှင့် Primary CTA ကို မမြင်ရမီ Beta warning 4-card block ကြီးကို ကျော်ဆင်းနေရပြီး၊ TraitLens Card မှ "စတင်လေ့လာမယ်" နှိပ်လျှင် Coming-soon/Optional tools များကို ကျော်၍ Page အောက်ဆုံးရှိ `#personality-levels` သို့ Scroll ဆင်းနေရသည်။
- **Root Cause (Source Evidence):**
  - [src/App.jsx#L142-L172](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/src/App.jsx#L142-L172): 4-card Beta notice block ကို `<main>` ထိပ်ဆုံးတွင် ထားရှိထားသည်။
  - [src/App.jsx#L198-L207](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/src/App.jsx#L198-L207): Hero illustration တွင် မဖွင့်ရသေးသော "ဆက်ဆံရေး" နှင့် "ဘဝတန်ဖိုး" ကို "လေ့လာမှု ၄ ပိုင်း" အဖြစ် ဖော်ပြထားသည်။
  - [src/App.jsx#L262](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/src/App.jsx#L262): TraitLens CTA က `#personality-levels` သို့ Scroll လုပ်သော်လည်း ကြားထဲတွင် Coming-soon (`BondSense`, `ValueMap` L289-305) နှင့် Optional tools (`Career Interest`, `Skills Assessment` L313-337) များ ကြားခံနေသည်။
- **Proposed Fix:**
  1. **Hero-First Layout:** Hero section + Primary CTA ("TraitLens ဖြင့် စတင်မယ်") နှင့် Resume card (draft ရှိလျှင်) ကို Homepage ထိပ်ဆုံးတွင် ထားရှိရန်။
  2. **Compact Collapsible Beta Notice:** Beta warning ကို Hero အောက် (သို့) ထိပ်ဆုံးတွင် ၁–၂ ကြောင်းစာ Compact banner ("BETA စမ်းသပ်ဗားရှင်း — ရောဂါရှာဖွေရေး မဟုတ်ပါ · ဒီစက်ထဲတွင်သာ သိမ်းသည် · အသေးစိတ်ကြည့်ရန်") အဖြစ် ထားပြီး နှိပ်မှ 4-card အပြည့်အစုံ ဖွင့်ကြည့်နိုင်အောင် ပြုလုပ်ရန် (Safety disclaimers များ မပျောက်စေဘဲ First-fold ရှင်းလင်းစေရန်)။
  3. **Direct TraitLens Level Selection:** `#personality-levels` (30 / 60 / 120) ကို TraitLens Card ၏ အောက်တိုက်ရိုက် (Coming-soon & Optional tools များ၏ အပေါ်) သို့ ရွှေ့ရန် သို့မဟုတ် TraitLens Card ထဲတွင် 30/60/120 quick-start buttons များ တိုက်ရိုက်ထည့်ရန်။
  4. **Clear Starting Recommendation:** "ပထမဆုံး စတင်သူများအတွက် TraitLens 30 မေးခွန်း (~၅ မိနစ်) ကို အကြံပြုပါသည်" ဟူသော ရှင်းလင်းချက် ထည့်ရန်။
- **Risk to Existing Data:** **မရှိ (None)** — Homepage UI layout စီစဉ်မှုသာ ဖြစ်သည်။
- **Test Plan:**
  - `npm run validate:design` နှင့် `npm run validate:mobile-navigation` run ရန် (`validate-design.mjs` ရှိ Public copy & TraitLens/InnerCompass/BondSense/ValueMap assertions များ မပျက်စေရန် စစ်ဆေးရန်)။
  - 360×800 Mobile viewport တွင် Hero headline, Primary CTA, နှင့် Compact Beta badge ကို Scroll မဆင်းဘဲ First fold တွင် မြင်ရကြောင်း စစ်ဆေးရန်။
- **Acceptance Criteria:**
  - 360×800 Mobile screen တွင် Page load ပြီးသည်နှင့် Hero headline နှင့် Primary CTA တိုက်ရိုက်မြင်ရမည်။
  - Beta safety disclaimers 4 ချက်လုံး Collapsible panel မှတစ်ဆင့် အပြည့်အစုံ ဖတ်ရှုနိုင်ဆဲ ဖြစ်ရမည်။
  - TraitLens 30/60/120 စတင်ရန် Coming-soon cards များကို ကျော်ဖြတ်စရာ မလိုတော့ပါ။

---

### HIGH PRIORITY

#### P1-H1: Header Active Tab Bug & `.txt` Report Download Reliability
- **Problem:** Desktop Header တွင် Knowledge Center ဖွင့်ထားချိန်၌ "ပင်မစာမျက်နှာ" ခလုတ်ပါ Active white highlight ဖြစ်နေသည်။ ထို့အပြင် TraitLens နှင့် Career Interest `.txt` report download တွင် Mobile Safari / Android browser အချို့၌ Download မစတင်မီ Blob URL revoke ဖြစ်နိုင်သည့် Risk ရှိနေသည်။
- **Root Cause (Source Evidence):**
  - [src/App.jsx#L80](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/src/App.jsx#L80): `active !== 'history'` ဟု စစ်ထားသဖြင့် `active === 'knowledge'` ဖြစ်ချိန်တွင် True ဖြစ်နေသည်။
  - [src/App.jsx#L661-L665](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/src/App.jsx#L661-L665) နှင့် [src/components/CareerInterestModule.jsx#L153-L157](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/src/components/CareerInterestModule.jsx#L153-L157) တို့တွင် `link` ကို `document.body.appendChild` မလုပ်ဘဲ `URL.revokeObjectURL(url)` ကို `link.click()` ပြီးသည်နှင့် ချက်ချင်းခေါ်ထားသည် (`InnerCompassModule.jsx#L265-L268` တွင်မူ `appendChild` + `setTimeout(..., 1000)` သုံးထားပြီး မှန်ကန်သည်)။
- **Proposed Fix:**
  1. `App.jsx#L80` တွင် `active !== 'history'` ကို `active === 'home'` (သို့မဟုတ် `active !== 'history' && active !== 'knowledge'`) ဟု ပြင်ဆင်ရန်။
  2. `src/utils/download.js` Shared helper (`downloadTextFile(filename, content)`) တည်ဆောက်ပြီး `document.body.appendChild(link)` -> `link.click()` -> `link.remove()` -> `window.setTimeout(() => URL.revokeObjectURL(url), 1000)` ပုံစံဖြင့် Module ၃ ခုလုံးတွင် တူညီစွာ သုံးစွဲရန်။
- **Risk to Existing Data:** **မရှိ (None)** — Navigation highlight နှင့် Client-side `.txt` file export mechanics သာ ဖြစ်သည်။
- **Test Plan:**
  - Desktop viewport (`>= 640px`) တွင် Home, History, Knowledge tabs တစ်ခုချင်းစီနှိပ်ပြီး Tab ၁ ခုတည်းသာ Active pill ဖြစ်ကြောင်း စစ်ဆေးရန်။
  - TraitLens, InnerCompass, Career Interest ၃ ခုလုံးမှ `.txt` report download လုပ်ပြီး ဖိုင်အပြည့်အစုံ ရရှိကြောင်း စစ်ဆေးရန်။
- **Acceptance Criteria:**
  - Knowledge Center ဖွင့်ထားချိန် "အသိပညာ" tab ၁ ခုတည်းသာ Highlight ဖြစ်ရမည်။
  - Assessment ၃ ခုလုံး၏ `.txt` download သည် Shared helper ကို အသုံးပြုရမည်။

---

#### P1-H2: Modal Keyboard Accessibility (`Escape`, Focus Trap & Focus Restore)
- **Problem:** `BackupRestoreDialog` တွင် `Escape` key ဖြင့် ပိတ်၍မရသည့်အပြင် Modals နှစ်ခုလုံး (`BackupRestoreDialog`, `KnowledgeInlineHelp`) တွင် `Tab` focus trap နှင့် Modal ပိတ်ပြီးနောက် မူလ Trigger button သို့ Focus ပြန်ပို့ခြင်း မပါဝင်ပါ။
- **Root Cause (Source Evidence):**
  - [src/App.jsx#L744-L781](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/src/App.jsx#L744-L781): `BackupRestoreDialog` တွင် `keydown` (`Escape`), backdrop click, focus trap, focus restore မရှိပါ။
  - [src/components/KnowledgeInlineHelp.jsx#L25-L32](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/src/components/KnowledgeInlineHelp.jsx#L25-L32): `Escape` နှင့် backdrop click ပါသော်လည်း Focus trap နှင့် Focus restore မပါဝင်ပါ။
- **Proposed Fix:**
  1. Reusable `useDialogAccessibility(isOpen, onClose, dialogRef)` hook (သို့မဟုတ် Shared helper) ရေးသား၍:
     - `Escape` key ဖြင့် ပိတ်နိုင်ခြင်း
     - Modal ဖွင့်ချိန် Previous `document.activeElement` ကို မှတ်သားပြီး Dialog အတွင်း ပထမဆုံး focusable element သို့ Focus ရွှေ့ခြင်း
     - `Tab` / `Shift+Tab` ကို Dialog အတွင်း၌သာ Trap လုပ်ခြင်း
     - Modal ပိတ်ချိန် Trigger element သို့ Focus ပြန်ပို့ခြင်း
  2. `BackupRestoreDialog` နှင့် `KnowledgeInlineHelp` နှစ်ခုလုံးတွင် အသုံးပြုရန် (Backdrop click to close ကိုပါ `BackupRestoreDialog` တွင် ထည့်သွင်းရန်)။
- **Risk to Existing Data:** **မရှိ (None)** — UI modal keyboard interaction သာ ဖြစ်သည်။
- **Test Plan:**
  - Keyboard (`Tab`, `Shift+Tab`, `Escape`) ဖြင့် Backup Restore dialog နှင့် Inline Help dialog နှစ်ခုလုံးကို ဖွင့်/လှည့်/ပိတ် စမ်းသပ်ရန်။
- **Acceptance Criteria:**
  - Modal ဖွင့်ထားချိန် `Tab` နှိပ်ပါက Background page elements များသို့ Focus မထွက်ရ။
  - `Escape` နှိပ်၍ ပိတ်နိုင်ပြီး ပိတ်ပြီးသည်နှင့် မူလ Trigger button သို့ Focus ပြန်ရောက်ရမည်။

---

#### P1-H3: Career Interest Intro/Instructions Double-Step Consolidation
- **Problem:** Career Interest စတင်ရာတွင် `IntroView` ၌ လမ်းညွှန် ၅ ချက်နှင့် Acknowledgement checkbox ဖြည့်ပြီးသော်လည်း "စတင်ဖြေဆိုမယ်" နှိပ်လိုက်လျှင် `page === 'instructions'` ("BEFORE YOU BEGIN · အဖြေရွေးချယ်ပုံ") နောက်ထပ် screen တစ်ခု ထပ်တက်လာသဖြင့် Click ၂ ဆင့် ထပ်နေသည်။
- **Root Cause (Source Evidence):**
  - [src/components/CareerInterestModule.jsx#L32-L81](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/src/components/CareerInterestModule.jsx#L32-L81): `IntroView` တွင် လမ်းညွှန်နှင့် Acknowledgement ပါပြီးဖြစ်သည်။
  - [src/components/CareerInterestModule.jsx#L249](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/src/components/CareerInterestModule.jsx#L249) နှင့် `#L330`: `startNew()` က `setPage('instructions')` သို့ ပို့ပြီး `#L330` တွင် ဒုတိယ Guide screen ထပ်ပြနေသည်။
- **Proposed Fix:**
  - `CAREER_ANSWER_OPTIONS` (1–5 scale preview) ကို `IntroView` ထဲတွင် ကျစ်လျစ်စွာ ပေါင်းထည့်ပြီး `startNew()` မှ တိုက်ရိုက် `setPage('assessment')` သို့ ဝင်ရောက်နိုင်အောင် ပြင်ဆင်ရန် (`validate-design.mjs` ရှိ `checked={acknowledged}`, `disabled={!acknowledged}`, `လက်ရှိကျွမ်းကျင်မှုနဲ့ အတွေ့အကြုံကို စစ်ဆေးတာမဟုတ်ပါဘူး` checks များ ဆက်လက်အောင်မြင်စေရမည်)။
- **Risk to Existing Data:** **မရှိ (None)** — `startNew()` သည် Draft အသစ်စတင်ချိန် state transition တစ်ခုသာ ဖြစ်သည်။
- **Test Plan:**
  - `npm run validate:career` နှင့် `npm run validate:design` run ရန်။
  - Career Interest ကို အသစ်စတင်၍ Intro -> Acknowledge -> Start နှိပ်လျှင် မေးခွန်း ၁ သို့ တိုက်ရိုက်ရောက်ကြောင်း စစ်ဆေးရန်။
- **Acceptance Criteria:**
  - Career Interest စတင်ရာတွင် Guide screen ၁ ခုတည်းသာ ဖြတ်သန်းရမည်။

---

#### P1-H4: Estimated Time Labels & Question Screen Framing Neutrality
- **Problem:**
  1. Assessment cards များတွင် ခန့်မှန်းကြာချိန် (မိနစ်) မပါသဖြင့် အသုံးပြုသူများ အချိန်မခန့်မှန်းနိုင်ပါ။
  2. မေးခွန်းတိုင်း၏ အပေါ်တွင် Scoring Trait / Dimension / Category အမည် (`trait.name`, `dimension.name`, `category.name`) ကို တိုက်ရိုက်ပြသထားသဖြင့် ဖြေဆိုသူများ မေးခွန်းကို သဘာဝအတိုင်း မဖြေဘဲ ကိုယ်မြင်ချင်သည့် Trait အပေါ် ဘက်လိုက်ဖြေမိနိုင်သည် (Framing / Social desirability bias)။
- **Root Cause (Source Evidence):**
  - `src/App.jsx#L498`: `{trait.name}` နှင့် `ပင်ကိုစရိုက် အချက် X / ၅` ကို မေးခွန်းတိုင်းအပေါ်၌ ပြထားသည်။
  - `src/components/InnerCompassModule.jsx#L160`: `{dimension.name}` နှင့် `{dimension.description}` ကို ပြထားသည်။
  - `src/components/CareerInterestModule.jsx#L97`: `{category.name}` နှင့် `{category.en}` ကို ပြထားသည်။
- **Proposed Fix:**
  1. Homepage နှင့် Assessment Intro/Level selector များတွင် ခန့်မှန်းကြာချိန် (`~၅ မိနစ်` for 30, `~၁၀ မိနစ်` for 60, `~၂၀ မိနစ်` for 120; `~၅–၇ မိနစ်` for InnerCompass/Career 30) ထည့်သွင်းရန်။
  2. Assessment question screen ၃ ခုလုံးတွင် Scoring Trait/Dimension/Category banner ကို ပုံသေဖွင့်မထားဘဲ ဖယ်ရှား/ဝှက်ထားပြီး မေးခွန်းနံပါတ် (`မေးခွန်း 01 / 30`) နှင့် Progress bar ကိုသာ ရှင်းလင်းစွာ ပြသရန်။ *(Question wording, question IDs, order, နှင့် scoring logic ကို လုံးဝ မထိပါ။)*
- **Risk to Existing Data:** **မရှိ (None)** — UI presentation change သာ ဖြစ်ပြီး Question bank နှင့် Scoring ကို မထိပါ။
- **Test Plan:**
  - `npm run validate:assessment`, `npm run validate:innercompass-flow`, `npm run validate:career`, `npm run validate:all` run ရန်။
  - Question screens ၃ ခုလုံးတွင် Trait/Dimension/Category label မပေါ်ဘဲ `KnowledgeInlineHelp` (`ⓘ`) ပုံမှန်အလုပ်လုပ်ကြောင်း စစ်ဆေးရန်။
- **Acceptance Criteria:**
  - Assessment level/module အားလုံးတွင် ခန့်မှန်းကြာချိန် ပါဝင်ရမည်။
  - မေးခွန်းဖြေဆိုနေစဉ် Trait/Dimension/Category scoring label မမြင်ရစေရ။

---

#### P1-H5: Top-Level React ErrorBoundary + Emergency JSON Backup Export
- **Problem:** Runtime rendering error တစ်ခုခု ဖြစ်ပွားပါက App တစ်ခုလုံး White screen ဖြစ်သွားပြီး အသုံးပြုသူသည် မိမိ၏ LocalStorage data ကို Backup ထုတ်ယူ၍ပင် မရနိုင်ပါ။
- **Root Cause (Source Evidence):**
  - [src/main.jsx](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/src/main.jsx) နှင့် [src/App.jsx](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/src/App.jsx) တို့တွင် React `ErrorBoundary` component မပါဝင်ပါ။
- **Proposed Fix:**
  - `src/components/ErrorBoundary.jsx` (Class component with `getDerivedStateFromError`) ဖန်တီးပြီး `src/main.jsx` တွင် `<App />` ကို Wrap လုပ်ရန်။
  - Fallback UI တွင် ယဉ်ကျေးသော မြန်မာစာတို ("စာမျက်နှာပြသရာတွင် အမှားတစ်ခု ဖြစ်ပွားသွားပါသည်"), "စာမျက်နှာ ပြန်ဖွင့်မယ်" (reload button), နှင့် `createBackupSnapshot()` ကို ခေါ်၍ **Emergency JSON Backup ထုတ်ယူနိုင်သော ခလုတ်** ထည့်သွင်းရန်။
- **Risk to Existing Data:** **မရှိ (None)** — Crash recovery UI ဖြစ်ပြီး ရှိပြီးသား Data ကို Readonly export သာ လုပ်နိုင်သည်။
- **Test Plan:**
  - Development mode တွင် Temporary simulated render error ဖြင့် ErrorBoundary UI ပေါ်လာပြီး Emergency Backup JSON export အလုပ်လုပ်ကြောင်း စစ်ဆေးရန် (စစ်ဆေးပြီးနောက် test throw ကို ပြန်ဖယ်ရန်)။
- **Acceptance Criteria:**
  - Unhandled React render error ဖြစ်ချိန် White screen မဖြစ်ဘဲ Burmese Fallback UI နှင့် Working JSON Backup Export button ပေါ်လာရမည်။

---

### MEDIUM PRIORITY

#### P1-M1: Code Splitting (`Recharts` & Secondary Modules Lazy Load)
- **Problem:** Production JS bundle (`dist/assets/index-wZ457GkF.js`) သည် **997.17 kB** (gzip **243.27 kB**) ရှိနေပြီး Vite မှ >500 kB chunk warning ထွက်နေသဖြင့် မြန်မာနိုင်ငံရှိ Low-bandwidth / 3G mobile users များအတွက် Initial load နှေးစေနိုင်သည်။
- **Root Cause (Source Evidence):**
  - `src/App.jsx` တွင် `InnerCompassModule`, `CareerInterestModule`, `KnowledgeCenter`, နှင့် `Recharts` (`RadarChart` etc.) တို့ကို Eagerly import လုပ်ထားသဖြင့် Homepage ဖွင့်ရုံဖြင့် အားလုံး Download/Parse လုပ်နေရသည်။
- **Proposed Fix:**
  1. `InnerCompassModule`, `CareerInterestModule`, `KnowledgeCenter` တို့ကို `React.lazy()` + `<Suspense>` (Burmese loading state ဖြင့်) ပြောင်းလဲရန်။
  2. `Recharts` RadarChart ကို `src/components/ScoreRadarChart.jsx` သီးခြား lazy component အဖြစ် ခွဲထုတ်ပြီး Result report ဖွင့်ချိန်မှသာ Load လုပ်ရန်။
  3. *(Validation check)* `scripts/validate-design.mjs` နှင့် `scripts/validate-mobile-navigation.mjs` တို့သည် source string checks များပါဝင်သဖြင့် Lazy import လုပ်ပြီးနောက် `npm run validate:all` အပြည့်အစုံ အောင်မြင်ကြောင်း သေချာစစ်ဆေးရန်။
- **Risk to Existing Data:** **မရှိ (None)** — Bundle loading optimization သာ ဖြစ်သည်။
- **Test Plan:**
  - `npm run build` run ၍ Initial entry JS chunk < 350 kB (uncompressed) ဖြစ်ပြီး Vite >500 kB warning ပျောက်ကြောင်း (သို့မဟုတ် Recharts vendor chunk သာ lazy-loaded ဖြစ်ကြောင်း) စစ်ဆေးရန်။
  - `npm run validate:all` run ရန်။
- **Acceptance Criteria:**
  - Initial entry JS chunk သိသိသာသာ လျော့ကျပြီး Homepage load တွင် `Recharts` နှင့် Secondary modules များ Eagerly load မဖြစ်စေရ။
  - Offline/slow network တွင် Lazy chunk fail ဖြစ်ပါက Retry button ပါသော Suspense/ErrorBoundary fallback ပြနိုင်ရမည်။

---

#### P1-M2: Report Section Navigation Scrollspy & Narrow-Mobile Radar Chart Fit
- **Problem:** `ReportSectionNavigation` တွင် Scroll လုပ်ချိန် Active tab highlight မပြောင်းဘဲ ရှိနေပြီး၊ 320px–360px ဖုန်းများတွင် Radar chart labels များ ဘေးကပ်/ပြတ်နိုင်ခြေရှိသည်။
- **Root Cause (Source Evidence):**
  - [src/components/ReportSectionNavigation.jsx#L18](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/src/components/ReportSectionNavigation.jsx#L18): `item.active` styling ပါသော်လည်း [src/App.jsx#L671-L676](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/src/App.jsx#L671-L676) နှင့် [src/components/InnerCompassModule.jsx#L274-L279](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/src/components/InnerCompassModule.jsx#L274-L279) တို့မှ `active` prop မပို့ထားပါ။
  - [src/App.jsx#L680](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/src/App.jsx#L680) တွင် `outerRadius="73%"` နှင့် `InnerCompassModule.jsx#L282` တွင် `outerRadius="70%"` သုံးထားပြီး Narrow mobile margin/tick wrapping မပါပါ။
- **Proposed Fix:**
  1. `ReportSectionNavigation.jsx` တွင် `IntersectionObserver` ဖြင့် လက်ရှိမြင်နေရသော Section ID ကို Track လုပ်ပြီး Active pill highlight ပြောင်းပေးရန်။
  2. Radar chart container တွင် Narrow viewport (`< 380px`) အတွက် `outerRadius="62%"` သို့မဟုတ် SVG margin/custom tick word-wrap (2-line Burmese label wrap) ထည့်သွင်းရန်။
- **Risk to Existing Data:** **မရှိ (None)**
- **Test Plan:**
  - 320px, 360px, 390px, 1280px viewports များတွင် TraitLens နှင့် InnerCompass reports များကို Scroll လုပ်၍ Active pill ပြောင်းခြင်းနှင့် Radar labels မပြတ်/overflow မဖြစ်ခြင်းကို Manual check လုပ်ရန်။
- **Acceptance Criteria:**
  - Report section scroll လုပ်တိုင်း Sticky nav ရှိ Active pill မှန်ကန်စွာ ပြောင်းလဲရမည်။
  - 320px တွင် Horizontal overflow (`scrollWidth <= innerWidth`) မဖြစ်ရ။

---

#### P1-M3: Knowledge Inline Help "Read Full Entry" Link & Double-Write Cleanup
- **Problem:**
  1. `KnowledgeInlineHelp` dialog မှ Knowledge Center full detail page သို့ ဆက်လက်ဖတ်ရှုရန် Link မပါသေးပါ (`KNOWLEDGE_CENTER_SPEC_V1.md` §8.3)။
  2. `src/App.jsx` တွင် `handleAnswer` / `handleSkip` နှင့် `useEffect` နှစ်ခုလုံးက `saveDraft` + `loadAppData` ကို ခေါ်နေသဖြင့် မလိုအပ်ဘဲ Double LocalStorage write/read ဖြစ်နေသည်။
- **Root Cause (Source Evidence):**
  - [src/components/KnowledgeInlineHelp.jsx#L139-L145](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/src/components/KnowledgeInlineHelp.jsx#L139-L145): "မေးခွန်းသို့ ပြန်သွားမယ်" button သာ ပါဝင်ပြီး Knowledge Center link မပါပါ။
  - [src/App.jsx#L829-L833](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/src/App.jsx#L829-L833) နှင့် `#L957`, `#L991`: `saveDraft` ကို Event handler နှင့် `useEffect` နှစ်နေရာစလုံးတွင် ခေါ်ထားသည်။
- **Proposed Fix:**
  1. `KnowledgeInlineHelp` တွင် Optional `onOpenKnowledgeTerm(term.id)` callback ထည့်ပြီး "Knowledge Center တွင် အပြည့်အစုံဖတ်မယ်" button ထည့်ရန် (Draft ကို မပျက်စေဘဲ Knowledge Center သို့ ကူးပြီး ပြန်လာနိုင်ရန်)။
  2. `App.jsx` တွင် `persistDraft` ကို Single deterministic path (`useEffect` သို့မဟုတ် synchronous handler ၁ ခုတည်း) ဖြင့်သာ write လုပ်ရန် (Unmount/beforeunload flush ကို ထိန်းသိမ်းလျက်)။
- **Risk to Existing Data:** **နည်း (Low)** — Draft autosave timing ကို Single-write ဖြစ်အောင် ရှင်းလင်းခြင်းဖြစ်၍ Answer state မပျောက်စေရန် `beforeunload` နှင့် Immediate state sync ကို သေချာစစ်ဆေးရမည်။
- **Test Plan:**
  - `npm run validate:knowledge-links` နှင့် `npm run validate:all` run ရန်။
  - Question ဖြေနေစဉ် Refresh လုပ်ခြင်း၊ Inline help မှ Knowledge Center သို့ သွားပြီး ပြန်လာခြင်းတို့တွင် Draft answers မပျောက်ကြောင်း စစ်ဆေးရန်။
- **Acceptance Criteria:**
  - Inline help dialog မှ Knowledge Center term detail သို့ သွားနိုင်ပြီး Draft answers အပြည့်အစုံ ကျန်ရှိနေရမည်။

---

### LOW PRIORITY

#### P1-L1: Pin Dependency Versions & Legacy Config Audit
- **Problem:** `package.json` တွင် dependencies များကို `"latest"` ဟု ရေးထားသဖြင့် Fresh `npm install` တွင် Breaking version ဝင်နိုင်ပြီး၊ Unused `tailwind.config.js` ဖိုင်ဟောင်း ကျန်နေသည်။
- **Root Cause (Source Evidence):**
  - [package.json#L25-L36](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/package.json#L25-L36): `"latest"` ဟု သတ်မှတ်ထားသည်။
  - [tailwind.config.js](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/tailwind.config.js): Tailwind v4 `@tailwindcss/vite` တွင် အသုံးမပြုသော legacy v3 config ဖြစ်နေသည်။
- **Proposed Fix:**
  1. `package-lock.json` / `node_modules` ထဲတွင် လက်ရှိ Verified installed versions (`react@^19.3.1`, `vite@^8.3.5`, `@tailwindcss/vite@^4.3.3`, `recharts@^3.10.1`, `lucide-react@^1.66.0` စသည်) ကို `package.json` တွင် Exact/Caret semver ranges ဖြင့် Pin လုပ်ရန် (**Owner approval ဖြင့်သာ `package.json` ပြင်မည်; `package-lock.json` ကို မလိုအပ်ဘဲ regenerate မလုပ်ပါ**)။
  2. `tailwind.config.js` ကို ဖျက်ခြင်း/ပြင်ခြင်းမပြုမီ `validate-*.mjs` သို့မဟုတ် build tools များ မှီခိုမှုရှိမရှိ စစ်ဆေးပြီး Owner ခွင့်ပြုချက်ဖြင့် Archive/Comment လုပ်ရန်။
- **Risk to Existing Data:** **မရှိ (None)**
- **Test Plan:** `npm run validate:all && npm run build`
- **Acceptance Criteria:** `package.json` တွင် `"latest"` wildcard မရှိတော့ဘဲ Build နှင့် Validators အားလုံး Pass ဖြစ်ရမည်။

---

## 4. Phase 1 တွင် မပါဝင်သေးသော (Human Specialist & Psychometric Gate လိုအပ်သည့်) အလုပ်များ

> **အရေးကြီးသော စည်းမျဉ်း:** အောက်ပါအလုပ်များကို **AI က `Approved` သို့မဟုတ် `Published` အဖြစ် လုံးဝ မသတ်မှတ်ရပါ**။ အမှန်တကယ် **Psychologist** နှင့် **Burmese Language Expert** တို့၏ လူသားစစ်ဆေးမှုနှင့် Owner Approval ရရှိမှသာ နောက်အဆင့်များတွင် ဆောင်ရွက်ရမည်။

| Item | Current Status (Verified) | Required Human Specialist Gate | Why Excluded from Phase 1 Code Edits |
|---|---|---|---|
| **Knowledge Center 30 Terms Review & Publish** | `knowledgeGlossaryDraftV01.json` တွင် 30/30 terms လုံး `workflow_status: "draft"`, `published: false`, `language_review.status: "pending"`, `psychology_review.status: "pending"` | **1. Burmese Language Reviewer** (ဘာသာစကား ရှင်းလင်းမှု/ယဉ်ကျေးမှု)<br>**2. Psychology Reviewer** (စိတ်ပညာ တိကျမှု/ကျင့်ဝတ်) | `AGENTS.md` §7 အရ AI review တစ်ခုတည်းဖြင့် Approved/Published မလုပ်ရ။ |
| **InnerCompass V0.3 Activation** | `src/data/innerCompassDraftV03.js` သည် `internal-review-not-active` ဖြစ်နေပြီး V0.2.0 ကိုသာ UI တွင် ဖွင့်ထားသည် | **1. Burmese Language Editor**<br>**2. Psychology Reviewer**<br>**3. Cognitive Interviews (6–10 Myanmar users)** (`INNERCOMPASS_V03_RELEASE_CHECKLIST.md`) | မေးခွန်းစာသားနှင့် V0.2 -> V0.3 migration မပြီးသေးဘဲ Pilot data compatibility ထိန်းသိမ်းရန်။ |
| **TraitLens 11-Item Wording Fixes (`QUESTION_REVIEW.md`)** | IDs `30, 52, 85, 87, 88, 101, 108, 113, 115, 118, 119` တွင် double-barreled / double-negative issues မှတ်တမ်းတင်ထားပြီး Version lock ဖြစ်နေသည် | **Psychologist + Burmese Language Expert + Owner Approval** (New versioned question bank `2.0.0` + Legacy `1.1.0` read-only support) | `AGENTS.md` §3 အရ TraitLens wording/IDs ကို Owner migration approval မရှိဘဲ မပြောင်းရ။ |
| **TraitLens 60/120 Reverse-Scoring Balance & Item Interleaving** | Standard 30 (0/30 reverse), Openness 120 (2/24 reverse), Blocked trait order | **Psychometrician / Psychologist + Pilot Reliability Study (Cronbach's alpha, Factor check)** | Psychometric အထောက်အထားမရှိဘဲ Reverse-scoring items များကို အလိုအလျောက် မထည့်ရ။ |
| **TraitLens 120 Facet Interpretations (30 Facets)** | 30 facets × 3 bands စာသားများ မရှိသေး | **Psychology Reviewer + Burmese Language Editor** | Unreviewed psychological claims များ မထည့်မိစေရန် Content review ပြီးမှ UI ထဲ ထည့်သင့်သည်။ |

---

## 5. Competitor Research မှ အတည်မပြုရသေးသော အချက်များ (Verification Backlog)

`COMPETITOR_RESEARCH.md`, `COMPETITOR_COMPARISON_MATRIX.md`, နှင့် `RESEARCH_SOURCES.md` တို့တွင် Live Chrome DevTools rendering မရရှိခြင်းနှင့် Paywall/Account gate များကြောင့် **တိုက်ရိုက် Browser ဖြင့် အတည်မပြုရသေးသော (Unverified / Needs Live Check)** အချက်များကို သီးခြားစာရင်းပြုစုထားပါသည်-

1. **Understand Myself (`understandmyself.com`):**
   - Paywalled ($9.95 upfront) ဖြစ်သဖြင့် Live question pagination UX, Mobile responsiveness (320px–390px), နှင့် 15–20 page full report layout ကို ကိုယ်တိုင် မစစ်ဆေးရသေးပါ (`Not verified`)။
   - Print-to-PDF output formatting နှင့် Accessibility (WCAG contrast / keyboard navigation) ကို Live check လုပ်ရန် လိုအပ်သည်။
2. **Truity (`truity.com`):**
   - Big Five 30-facet paid report ($29) ၏ Interactive circumplex chart layout နှင့် Paid vs Free boundary experience ကို Account/Paywall နောက်ကွယ်မှ တိုက်ရိုက်မစစ်ဆေးရသေးပါ။
   - Live keyboard/screen-reader accessibility နှင့် Ad-network/cookie load impact on mobile 3G ကို မစစ်ဆေးရသေးပါ (`Not verified`)။
3. **16Personalities (`16personalities.com`):**
   - Live mobile DOM rendering, 7-point auto-advance timing/undo behavior, နှင့် Keyboard/Screen-reader accessibility (`Not verified`) တို့ကို Browser ဖြင့် တိုက်ရိုက်စစ်ဆေးရန် လိုအပ်သည်။
4. **PrinciplesYou (`principlesyou.com`):**
   - Account-gated Pause/Resume flow, 28-archetype interactive report tabs, နှင့် Accessibility (`Not verified`) တို့ကို Live browser တွင် မစစ်ဆေးရသေးပါ။
5. **HEXACO (`hexaco.org`):**
   - Redirected survey portal ၏ Mobile usability နှင့် Accessibility (`Not verified`) ကို Live check မလုပ်ရသေးပါ။
6. **BigFive-Test (`bigfive-test.com`):**
   - Side-by-side Compare link UI, 30-facet chart mobile wrapping, နှင့် Screen-reader accessibility ကို Live DOM တွင် ထပ်မံအတည်ပြုရန် လိုအပ်သည်။
7. **မြန်မာဘာသာ ပြည်တွင်း Quizzes (`wizzdo.org`, `openjung.org`, `thinyanant.com`):**
   - Search-indexed snippets များအရ MBTI 16-type format ဖြစ်ကြောင်းသာ သိရှိရပြီး Individual live UI/Privacy/Mobile QA မပြုလုပ်ရသေးပါ။
8. **Self Discovery ကိုယ်တိုင်၏ Live Browser Checks (Chrome DevTools unavailable ဖြစ်ခဲ့သည့်အပိုင်း):**
   - `127.0.0.1:4173` (သို့) GitHub Pages live URL ပေါ်တွင် Real Android/iOS Safari ဖြင့် `MOBILE_NAVIGATION_SPEC_V1_11_1.md` checklist 10 ချက်လုံး၊ 320px Radar chart text wrapping၊ နှင့် `.txt` / `.json` download behavior တို့ကို လက်တွေ့စစ်ဆေးရန် လိုအပ်သည်။

---

## 6. Owner Approval Gate (နောက်တစ်ဆင့် ဆောင်ရွက်ရန်)

ဤ `PHASE_1_IMPLEMENTATION_PLAN.md` ကို Owner မှ စစ်ဆေးပြီး **ခွင့်ပြုချက် (Approval)** ပေးပြီးမှသာ:
1. Wave 1 (`P1-C1`, `P1-C2`, `P1-H5`) မှ စတင်၍ Minimal, targeted code edits များကို အဆင့်လိုက် ဆောင်ရွက်ပါမည်။
2. Wave တစ်ခုစီ ပြီးဆုံးတိုင်း `npm run validate:all`, `npm run build`, နှင့် Mobile/Desktop manual checklist များဖြင့် စစ်ဆေးအတည်ပြုပါမည်။
3. Phase 1 ပြီးစီးသည့်တိုင် Git commit / push ကို Owner ၏ တိုက်ရိုက်ညွှန်ကြားချက်မရှိဘဲ ပြုလုပ်မည် မဟုတ်ပါ။
