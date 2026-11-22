# Self Discovery — Product Strategy & Roadmap Recommendation (Phase 6)

**ရက်စွဲ:** 2026-11-22  
**လက်ရှိဗားရှင်း:** `1.11.1-beta.1`

---

## 1. Product Strategy & Scope Boundaries

Self Discovery ၏ ဗဟိုမဏ္ဍိုင်မှာ **မြန်မာအသုံးပြုသူများ မိမိ၏ ပင်ကိုစရိုက် (TraitLens)၊ စိတ်နေသဘောထား (InnerCompass) နှင့် စိတ်ပညာအခြေခံအသိပညာ (Knowledge Center) တို့မှတစ်ဆင့် ကိုယ့်ကိုယ်ကို နားလည်သုံးသပ်နိုင်စေရန်** ဖြစ်သည်။

- **Core Product:** `TraitLens` · `InnerCompass` · `Knowledge Center`
- **Separate Optional Modules:** `Career Interest` (ရှိပြီး) · `BondSense`, `ValueMap`, `Skills Assessment` (အနာဂတ် — တစ်ခုချင်း Review/Validation ပြီးမှ ဖွင့်လှစ်ရန်)
- **Strategic Guardrails:**
  - Local-first & Privacy-first ကို Primary differentiator အဖြစ် ဆက်လက်ထိန်းသိမ်းမည်။
  - Question banks, LocalStorage keys, နှင့် Legacy JSON backups များ၏ Backward compatibility ကို မထိခိုက်စေဘဲ Versioned migrations ဖြင့်သာ ပြောင်းလဲမည် (`AGENTS.md` §3)။
  - Clinical diagnosis, Type-boxing, Job-portal expansion, Ads/Trackers များကို ရှောင်ကြဉ်မည်။

---

## 2. 6-Phase Practical Roadmap

### Phase 1: Essential Fixes (Data Safety, Core Bugs & Contrast)

| Item | Problem | Proposed Improvement | User Benefit | Priority | Complexity | Dependencies | Acceptance Criteria |
|---|---|---|---|---|---|---|---|
| **P1-1: History Truncation Bug Fix** | `storage.js` L136 `saveAssessment()` တွင် `.slice(0, 50)` ဖြစ်နေပြီး `mergeData()` L231 တွင် `MAX_HISTORY_ENTRIES = 500` ဖြစ်နေသဖြင့် 50 ကျော်လျှင် မှတ်တမ်းပျက်နိုင်သည်။ | `saveAssessment()` တွင် `MAX_HISTORY_ENTRIES` (500) ကို တူညီစွာ သုံးရန်။ | မှတ်တမ်းများစွာ သိမ်းထားသူများ Data မပျောက်ခြင်း။ | **Critical** | **Low** | None | History 51+ ခုရှိချိန် Assessment အသစ်ပြီးဆုံးပါက အဟောင်းမှတ်တမ်းများ မပျက်ဘဲ 500 အထိ ထိန်းသိမ်းနိုင်ကြောင်း `validate-backup.mjs` / unit test ဖြင့် အတည်ပြုနိုင်ရမည်။ |
| **P1-2: Storage Write-Failure Alert** | `saveDraft()` မှ `false` ပြန်လာသော်လည်း UI က မစစ်ဆေးဘဲ Silent fail ဖြစ်နေသည် (`PHASE_1_SPEC.md` §6.1 ချိုးဖောက်)။ | `App.jsx`, `InnerCompassModule.jsx`, `CareerInterestModule.jsx` တွင် `saveDraft`/`saveAssessment` result ကို စစ်ပြီး မအောင်မြင်ပါက Burmese warning banner/toast + JSON Backup အကြံပြုချက် ပြရန်။ | Storage ပြည့်/ပိတ်နေချိန် အဖြေပျောက်မည့်အန္တရာယ်ကို ချက်ချင်းသိရှိနိုင်ခြင်း။ | **Critical** | **Low** | None | LocalStorage write mock `throw` ဖြစ်ချိန် UI တွင် ရှင်းလင်းသော သတိပေးစာ ပေါ်လာရမည်။ |
| **P1-3: WCAG Contrast & Min Font Size Fix** | Muted gray text များ (`2.35:1` – `3.77:1`) WCAG AA (4.5:1) မမီခြင်းနှင့် `9px–10px` Burmese text သေးလွန်းခြင်း။ | Secondary/muted text colors ကို contrast ≥4.5:1 (ဥပမာ `#6f6276` / `#5e5263`) သို့ မြှင့်တင်ပြီး Body/Label text များကို အနည်းဆုံး `11px–12px` ထားရန်။ | ဖုန်းမျက်နှာပြင်ငယ်နှင့် နေရောင်အောက်တွင် မြန်မာစာ ဖတ်ရလွယ်ကူခြင်း။ | **Critical** | **Low** | None | UI palette စစ်ဆေးချက်အားလုံး ≥4.5:1 ရှိပြီး `npm run validate:design` အောင်မြင်ရမည်။ |
| **P1-4: Header Bug & Download Reliability** | `Header` (`App.jsx` L80) တွင် `active !== 'history'` ကြောင့် Knowledge tab တွင် Home ပါ Active ဖြစ်နေခြင်း။ `App.jsx`/`CareerInterestModule.jsx` `.txt` download တွင် DOM attach/timeout revoke မပါခြင်း။ | `active === 'home'` ဟု တိကျစွာ စစ်ရန်။ Shared `downloadTextFile()` helper ဖြင့် `document.body.appendChild` + `setTimeout(revokeObjectURL, 1000)` သုံးရန်။ | Navigation ရှင်းလင်းပြီး Mobile Safari/Android တွင် Report download စိတ်ချရခြင်း။ | **High** | **Low** | None | Desktop header တွင် တစ်ကြိမ်လျှင် tab ၁ ခုသာ highlight ဖြစ်ပြီး `.txt` download 3 module လုံး Shared helper သုံးရမည်။ |
| **P1-5: Modal Accessibility & Unused Config Cleanup** | `BackupRestoreDialog` တွင် `Escape` key မပါ၊ Modals တွင် Focus trap မပါ။ `tailwind.config.js` legacy ဖိုင် ကျန်နေသည်။ | Modals နှစ်ခုလုံးတွင် `Escape` handler, Focus trap နှင့် Close ပြီးနောက် Focus return ထည့်ရန်။ `tailwind.config.js` ကို ရှင်းလင်း/မှတ်ချက်ပြုရန် (Owner approval ဖြင့်)။ | Keyboard & Screen reader အသုံးပြုသူများ Modal ထဲတွင် ပိတ်မိ/လမ်းပျောက်မနေခြင်း။ | **High** | **Medium** | None | Modals ဖွင့်ချိန် Tab သည် Modal အတွင်းသာ လည်ပတ်ပြီး Escape ဖြင့် ပိတ်နိုင်ရမည်။ |

---

### Phase 2: User Experience Improvements (Onboarding, IA & Mobile Polish)

| Item | Problem | Proposed Improvement | User Benefit | Priority | Complexity | Dependencies | Acceptance Criteria |
|---|---|---|---|---|---|---|---|
| **P2-1: Homepage Hierarchy & Beta Banner Streamlining** | Beta 4-card notice က Hero အထက်တွင် နေရာယူထားပြီး `#personality-levels` မှာ Coming-soon cards များအောက်တွင် ဝေးကွာနေသည်။ | Hero + Primary CTA ("TraitLens ဖြင့် စတင်မယ်") ကို ထိပ်ဆုံးတင်ပြီး Beta notice ကို Compact collapsible banner/footer summary သို့ ပြောင်းရန်။ TraitLens levels ကို TraitLens Card အတွင်း/တိုက်ရိုက်အောက်တွင် ထားရန်။ | First-time user သည် ၃၀ စက္ကန့်အတွင်း App ရည်ရွယ်ချက်ကို နားလည်ပြီး စတင်နိုင်ခြင်း။ | **Critical** | **Medium** | P1-3 | Mobile 360×800 first fold တွင် Hero headline နှင့် Primary CTA တိုက်ရိုက်မြင်ရမည်။ |
| **P2-2: Assessment Selector Guide & Time Estimates** | TraitLens vs InnerCompass vs Career Interest ကွာခြားချက်နှင့် ကြာချိန် (မိနစ်) မပါဝင်ပါ။ | Card တစ်ခုစီတွင် ခန့်မှန်းကြာချိန် (~5 / ~10 / ~20 min) နှင့် "ဘယ်သူတွေ စသင့်သလဲ" 1-line guide ထည့်ရန်။ | မိမိအချိန်နှင့် လိုအပ်ချက်အလိုက် မှန်ကန်သော စမ်းသပ်မှုကို ရွေးနိုင်ခြင်း။ | **High** | **Low** | P2-1 | 30/60/120 levels နှင့် InnerCompass/Career cards အားလုံးတွင် ခန့်မှန်းကြာချိန် ပါဝင်ရမည်။ |
| **P2-3: Career Interest Intro Consolidation & Parity** | `CareerInterestModule` တွင် `IntroView` နှင့် `InstructionsPage` နှစ်ဆင့်ထပ်နေပြီး `ReportSectionNavigation` မပါပါ။ | `IntroView` နှင့် `InstructionsPage` ကို Single clear guide screen အဖြစ် ပေါင်းစည်းရန်။ `ReportSectionNavigation` နှင့် Bar/Radar chart ထည့်ရန်။ | စတင်ရန် Click အရေအတွက် လျော့ကျပြီး Report ဖတ်ရလွယ်ကူခြင်း။ | **High** | **Medium** | P1-4 | Career Interest စတင်ရာတွင် Guide screen ၁ ခုသာ ဖြတ်သန်းရပြီး Report navigation ပါဝင်ရမည်။ |
| **P2-4: Shared UI Components & URL Hash/History Support** | `App.jsx` 1,126 lines ကြီးမားနေပြီး Code duplication များခြင်း၊ Browser Back button နှိပ်လျှင် App ထဲမှ ထွက်သွားခြင်း။ | `App.jsx` ကို Page components များအဖြစ် ခွဲထုတ်ပြီး Shared `Button`, `ReviewView`, `formatDate` helpers သုံးရန်။ `window.location.hash` / `popstate` sync ထည့်ရန်။ | Browser/Android Back button အလုပ်လုပ်ပြီး Code ထိန်းသိမ်းရလွယ်ခြင်း။ | **Medium** | **Medium** | P1-1..P1-5 | Home -> Knowledge -> Back နှိပ်လျှင် Home သို့ ပြန်ရောက်ပြီး `App.jsx` < 400 lines ဖြစ်ရမည်။ |
| **P2-5: Report Scrollspy & Radar Chart Mobile Fit** | `ReportSectionNavigation` တွင် Active pill highlight မရှိ၊ 320px–360px တွင် Radar labels ကပ်နိုင်ခြေရှိသည်။ | `IntersectionObserver` ဖြင့် Active section pill highlight လုပ်ရန်။ Narrow mobile (`<380px`) တွင် Radar chart label wrapping/padding ညှိရန်။ | Report ရှည်များတွင် မိမိရောက်နေသည့်အပိုင်းကို သိနိုင်ပြီး ဂရပ်စာသား မပြတ်ခြင်း။ | **Medium** | **Low** | None | Scroll လုပ်ချိန် Active tab ပြောင်းပြီး 320px/360px တွင် Horizontal overflow (0px) မဖြစ်ရ။ |

---

### Phase 3: Assessment & Result Quality

| Item | Problem | Proposed Improvement | User Benefit | Priority | Complexity | Dependencies | Acceptance Criteria |
|---|---|---|---|---|---|---|---|
| **P3-1: Remove Trait/Dimension Disclosure During Answering** | မေးခွန်းတိုင်းအပေါ်တွင် Trait/Dimension အမည်ကို တိုက်ရိုက်ပြသထားသဖြင့် Framing bias ဖြစ်စေနိုင်သည်။ | Assessment question screen တွင် Trait/Dimension banner ကို မပြဘဲ Question number နှင့် Progress ကိုသာ ပြရန် (သို့ Optional hidden/neutral label)။ | ဖြေဆိုသူများ မေးခွန်းအပေါ် ပိုမိုသဘာဝကျကျ ဖြေနိုင်ခြင်း။ | **High** | **Low** | None | Question screens ၃ ခုလုံးတွင် Scoring trait/dimension label မပါဘဲ `validate:all` အောင်မြင်ရမည်။ |
| **P3-2: TraitLens 120 Facet Interpretations** | 120-item ဖြေသူများသည် 30 facets အတွက် Score bars သာ မြင်ရပြီး ရှင်းလင်းချက် မပါပါ။ | 30 facets တစ်ခုချင်းစီအတွက် Lower/Middle/Higher 1–2 ကြောင်းစာ Burmese interpretation နှင့် Balance note ထည့်ရန်။ | မေးခွန်း ၁၂၀ ဖြေဆိုရကျိုးနပ်ပြီး အသေးစိတ် ကိုယ့်ကိုယ်ကို နားလည်နိုင်ခြင်း။ | **High** | **Medium** | None | `FACETS` 30 ခု × 3 bands စလုံးအတွက် Validation script passing text ပါဝင်ရမည်။ |
| **P3-3: InnerCompass V0.3 Language Review & Pilot Transition Plan** | V0.2 သည် စကားလုံးလေးလံမှုရှိပြီး V0.3 မှာ Inactive ဖြစ်နေဆဲ။ | Burmese language editor နှင့် Psychology reviewer စစ်ဆေးပြီး Cognitive interviews (6–10 users) ပြုလုပ်ကာ Owner approval ဖြင့် Versioned V0.3 pilot သို့ ကူးပြောင်းရန် (V0.2 records compatibility ထိန်းသိမ်းလျက်)။ | မြန်မာစာပိုမိုရှင်းလင်းပြီး နားလည်မှုလွဲမှားခြင်း လျော့နည်းစေခြင်း။ | **High** | **High** | External human reviewers | `INNERCOMPASS_V03_RELEASE_CHECKLIST.md` ပါ Gate ၇ ချက်လုံး ပြီးစီးရမည်။ |
| **P3-4: TraitLens Question Bank v2.0 (Owner-Approved) & Interleaved Order** | `QUESTION_REVIEW.md` ပါ 11 items double-barreled/negative issues နှင့် 60/120 reverse-item imbalance + blocked order။ | Owner approval ဖြင့် Version `2.0.0` question bank (balanced reverse items + interleaved order + simplified 11 items) ပြင်ဆင်ပြီး Old `1.1.0` drafts/records ကို Versioned read-only ဖြင့် ထိန်းသိမ်းရန်။ | Acquiescence bias လျော့နည်းပြီး မေးခွန်းနားလည်မှု တိကျလာခြင်း။ | **Medium** | **High** | P3-3, Owner approval | `1.1.0` legacy drafts/history မပျက်ဘဲ `2.0.0` structural & reliability pilot pass ဖြစ်ရမည်။ |
| **P3-5: History Self-Comparison & Life-Domain Report Summary** | မှတ်တမ်းများကို နှိုင်းယှဉ်မကြည့်နိုင်ဘဲ Report တွင် Life-domain summary မပါ။ | History တွင် Assessment type filter နှင့် 2-attempt comparison view ထည့်ရန်။ TraitLens/InnerCompass report ထိပ်တွင် Life-domain reflection summary (အလုပ်/လေ့လာမှု၊ ဆက်ဆံရေး၊ စိတ်ဖိစီးမှု) ထည့်ရန်။ | အချိန်အလိုက် ကိုယ့်ပြောင်းလဲမှုကို ပြန်သုံးသပ်နိုင်ခြင်း။ | **Medium** | **Medium** | P2-4 | တူညီသော Assessment ၂ ခုကို Side-by-side score delta ဖြင့် ကြည့်နိုင်ရမည်။ |

---

### Phase 4: Knowledge Center Development

| Item | Problem | Proposed Improvement | User Benefit | Priority | Complexity | Dependencies | Acceptance Criteria |
|---|---|---|---|---|---|---|---|
| **P4-1: Complete 30-Term Human Review Workflow** | 30 terms လုံး `draft` / `pending` ဖြစ်နေသည်။ | Language reviewer နှင့် Psychology reviewer တို့မှ တစ်ခုချင်း စစ်ဆေးပြီး Reviewer metadata (`reviewer_name`, `qualification`, `reviewed_at`, `approved`) မှတ်တမ်းတင်၍ Version `1.0.0` Publish လုပ်ရန်။ | အသုံးပြုသူများ ယုံကြည်စိတ်ချရသော စိတ်ပညာဗဟုသုတ ဖတ်ရှုနိုင်ခြင်း။ | **High** | **High** | Human specialists | Review ပြီးသော Terms များသာ `Published` badge ရရှိပြီး Edit လုပ်လျှင် Re-review reset ဖြစ်ရမည်။ |
| **P4-2: Link Remaining 10 Terms + Inline "Read Full Entry" & Related Terms** | Term 10 ခု မေးခွန်းနှင့် မချိတ်ရသေး၊ Inline dialog မှ Knowledge Center full page သို့ သွားမရ၊ Related terms cross-links မပါ။ | Remaining 10 terms ကို TraitLens/InnerCompass/Career questions များနှင့် ချိတ်ရန်။ `KnowledgeInlineHelp` တွင် "Knowledge Center တွင် အပြည့်အစုံဖတ်မယ်" button နှင့် Term detail တွင် Related terms chips ထည့်ရန်။ | မေးခွန်းဖြေရင်း ဆက်စပ်အသိပညာများကို ဆက်တိုက်လေ့လာနိုင်ခြင်း။ | **Medium** | **Medium** | P2-4 | 30/30 terms တွင် Related terms links ပါပြီး Inline dialog မှ Detail page သို့ Draft မပျောက်ဘဲ ကူးနိုင်ရမည်။ |
| **P4-3: Myanmar Search Normalization** | Direct `.includes()` သည် Space နှင့် Unicode sequence ကွဲလွဲမှုတွင် ရှာမတွေ့နိုင်။ | `NFC` normalization, whitespace-insensitive matching နှင့် English/Burmese keyword aliases (`alternate_terms_my`) ထည့်ရန်။ | မြန်မာစာရိုက်ပုံ အနည်းငယ်ကွဲသော်လည်း စကားလုံး ရှာတွေ့နိုင်ခြင်း။ | **Low** | **Low** | None | Space ပါ/မပါ ရှာဖွေမှုများ တူညီစွာ Match ဖြစ်ရမည်။ |

---

### Phase 5: Privacy, Reliability & Performance

| Item | Problem | Proposed Improvement | User Benefit | Priority | Complexity | Dependencies | Acceptance Criteria |
|---|---|---|---|---|---|---|---|
| **P5-1: Code Splitting & Bundle Reduction** | Single JS chunk **997.17 kB** ရှိပြီး Low-bandwidth users များအတွက် Load နှေးသည်။ | `React.lazy` + `Suspense` ဖြင့် `InnerCompassModule`, `CareerInterestModule`, `KnowledgeCenter`, နှင့် `Recharts` result charts များကို Route/View-level split လုပ်ရန်။ | Initial page load 50%+ မြန်ဆန်ပြီး Mobile data သက်သာခြင်း။ | **High** | **Medium** | P2-4 | `npm run build` တွင် Initial entry JS chunk < 300 kB (uncompressed) ဖြစ်ပြီး Vite >500 kB warning မရှိစေရ။ |
| **P5-2: Error Boundary & Pin Dependency Versions** | Unhandled runtime error တွင် White screen ဖြစ်နိုင်ခြင်း၊ `package.json` တွင် `"latest"` သုံးထားခြင်း။ | Top-level React ErrorBoundary (Burmese fallback + JSON Backup export emergency button ပါဝင်သော) ထည့်ရန်။ `package.json` dependency versions များကို Verified semver ranges ဖြင့် Pin လုပ်ရန်။ | Unexpected error ဖြစ်လျှင်ပင် User data ကို Backup ထုတ်ကယ်တင်နိုင်ခြင်း။ | **High** | **Low** | None | Simulated component error ဖြစ်ချိန် Backup ထုတ်နိုင်သော Fallback UI ပေါ်လာရမည်။ |
| **P5-3: PWA Support & Offline Readiness** | `manifest.json` နှင့် Service Worker မရှိ၊ Google Fonts ကို online မှ ခေါ်နေသည်။ | Vite PWA plugin (or clean `manifest.webmanifest` + static asset caching SW) နှင့် Optional local Noto Sans Myanmar WOFF2 subset / fallback stack ထည့်ရန် (GitHub Pages `/Self_Discovery_Personality/` subpath နှင့် ကိုက်ညီစွာ)။ | ဖုန်း Home Screen တွင် Install လုပ်ပြီး Offline အခြေအနေတွင်ပါ ဖြေဆိုနိုင်ခြင်း။ | **Medium** | **Medium** | P5-1 | Lighthouse PWA / Offline test တွင် Subpath `/Self_Discovery_Personality/` ၌ Offline load အောင်မြင်ရမည်။ |
| **P5-4: Backup Encryption Option & Reminder UX** | JSON backup သည် Unencrypted plain text ဖြစ်နေပြီး အသစ်ဖြေပြီးသူများ Backup မထုတ်ဘဲ ထွက်သွားနိုင်သည်။ | Assessment ပြီးချိန်/History များလာချိန် Gentle backup reminder ပြရန်။ Optional Web Crypto API (AES-GCM passphrase) encrypted backup option (Plain JSON backward compatibility မပျက်ဘဲ) ထည့်ရန်။ | ဖုန်းပျောက်/မျှဝေမိလျှင် ကိုယ်ရေးကိုယ်တာ အဖြေများ ပိုမိုလုံခြုံခြင်း။ | **Low** | **Medium** | None | Plain v1 JSON နှင့် Encrypted backup နှစ်မျိုးလုံး Import preview/restore အလုပ်လုပ်ရမည်။ |

---

### Phase 6: Beta Testing & Release Readiness

| Item | Problem | Proposed Improvement | User Benefit | Priority | Complexity | Dependencies | Acceptance Criteria |
|---|---|---|---|---|---|---|---|
| **P6-1: Real-Device & Automated E2E/Browser QA** | Live browser DOM, mobile 320–430px, iOS Safari safe-area နှင့် Print/Download တို့ကို မစစ်ဆေးရသေး။ | Playwright (or real Android/iOS browser matrix) ဖြင့် `MOBILE_NAVIGATION_SPEC_V1_11_1.md` checklist 10 ချက်လုံး + Backup/Restore E2E စစ်ဆေးရန်။ | စက်အမျိုးမျိုးတွင် Layout/Download error ကင်းစင်ခြင်း။ | **Critical** | **Medium** | P1, P2, P5 | Mobile (320px/360px/390px) နှင့် Desktop (1280px) E2E checks 100% Pass ဖြစ်ရမည်။ |
| **P6-2: Cognitive Interviews & Pilot Reliability Study** | TraitLens နှင့် InnerCompass မေးခွန်းများအပေါ် Myanmar users (အသက်/ပညာရေးစုံ) နားလည်မှုနှင့် Cronbach's alpha မစစ်ရသေး။ | `INNERCOMPASS_COGNITIVE_INTERVIEW_GUIDE_V0_3.md` အတိုင်း လူ 10–15 ဦး Cognitive interviews + Anonymous pilot sample (n ≥ 100–200) ဖြင့် Internal consistency စစ်ဆေးရန်။ | မေးခွန်းများ တကယ်နားလည်လွယ်ပြီး စိတ်ချရကြောင်း သက်သေရရှိခြင်း။ | **High** | **High** | P3-3, P4-1 | Item comprehension issues ပြင်ဆင်ပြီး Pilot reliability metrics မှတ်တမ်းတင်နိုင်ရမည်။ |
| **P6-3: Pre-1.0.0 Release Gate Review** | Beta label ဖယ်ရှားရန် Release criteria မသတ်မှတ်ရသေး။ | Data safety, WCAG AA, Bundle target, Specialist review records, Pilot QA တို့ ပြည့်စုံမှသာ `1.0.0` Stable tag သတ်မှတ်ရန်။ | အသုံးပြုသူများထံ ယုံကြည်စိတ်ချရသော Version 1.0 ပေးပို့နိုင်ခြင်း။ | **High** | **Low** | P6-1, P6-2 | Release gate checklist 100% verified & Owner signed off ဖြစ်ရမည်။ |
