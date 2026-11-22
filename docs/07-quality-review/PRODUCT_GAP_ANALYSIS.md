# Self Discovery — Product Gap Analysis (Phase 5)

**ရက်စွဲ:** 2026-11-22  
**အခြေခံ:** Phase 1–2 Audit + Phase 3–4 Competitor Research (7 established platforms)

---

## A. ပြိုင်ဘက်များတွင် ရှိပြီး Self Discovery တွင် မရှိသေးသော အင်္ဂါရပ်များ (Competitor Features Lacking in Self Discovery)

1. **TraitLens 120 Facet-Level Interpretations & Trade-offs (Understand Myself, Truity, BigFive-Test, PrinciplesYou):**
   - လက်ရှိ TraitLens 120 တွင် 30 topic clusters အတွက် Score bars သာ ပြထားပြီး High/Low အဓိပ္ပာယ်ဖွင့်ဆိုချက် မပါပါ။
2. **Life-Domain Narrative Structure (16Personalities, PrinciplesYou):**
   - ရလဒ်များကို "အလုပ်ခွင်နှင့် စီမံခန့်ခွဲမှု", "ဆက်ဆံရေးနှင့် ဆက်သွယ်ပြောဆိုမှု", "စိတ်ဖိစီးမှုတုံ့ပြန်ပုံ" ကဲ့သို့ လက်တွေ့ကဏ္ဍများအလိုက် ခွဲခြမ်းပြသမှု မပါသေးပါ။
3. **Cross-Trait / Combined Insights (PrinciplesYou, Truity):**
   - Trait ၅ ခု သို့မဟုတ် TraitLens + InnerCompass + Career Interest ရလဒ်များ ပေါင်းစပ်စဉ်းစားသည့် Pattern summary မရှိသေးပါ (`PHASE_1_SPEC.md` တွင် Phase 4 အဖြစ် မှတ်တမ်းတင်ထားသော်လည်း မတည်ဆောက်ရသေး)။
4. **History Progress / Side-by-Side Comparison (BigFive-Test):**
   - မိမိ၏ အဟောင်းရလဒ်နှင့် အသစ်ရလဒ်ကို အချိန်အလိုက် နှိုင်းယှဉ်ကြည့်ရှုခြင်း (Self-reflection over time) သို့မဟုတ် Filter/Search လုပ်ခြင်း မရှိပါ။
5. **Estimated Time & Clear Recommended Starting Path (16Personalities, O*NET):**
   - မေးခွန်းအရေအတွက်အလိုက် ကြာချိန်ခန့်မှန်းချက် (~၅ မိနစ် / ~၁၀ မိနစ် / ~၂၀ မိနစ်) နှင့် ပထမဆုံးဝင်လာသူအတွက် "ဘယ်စမ်းသပ်မှုကို အရင်စသင့်သလဲ" လမ်းညွှန် မပါပါ။
6. **Psychometric Evidence Base & Cognitive Interview Validation (HEXACO, IPIP, BFAS, PrinciplesYou, O*NET):**
   - Reliability (Cronbach's alpha), Factor structure, Reverse-item comprehension နှင့် Pilot sample data မရှိသေးပါ။

---

## B. Self Discovery တွင် ရှိပြီးဖြစ်သော်လည်း ထိရောက်မှုအားနည်းနေသည့် အပိုင်းများ (Existing Features Implemented Less Effectively)

1. **Homepage First-Time Onboarding & Hierarchy (`src/App.jsx` L142-L367):**
   - Beta notice 4-card block က Hero section အထက်တွင် နေရာယူထားခြင်း၊ TraitLens levels ကို Page အောက်ဆုံးတွင် ထားခြင်း၊ Coming-soon cards (`BondSense`, `ValueMap`, `Skills`) ကို Active choices များကြား ညှပ်ထားခြင်းတို့ကြောင့် ပထမဆုံးသုံးသူ လမ်းပျောက်နိုင်သည်။
2. **Assessment Neutrality During Testing (`App.jsx` L498, `InnerCompassModule.jsx` L160, `CareerInterestModule.jsx` L97):**
   - မေးခွန်းတိုင်း၏ အပေါ်တွင် Trait/Dimension/Category အမည်နှင့် ရှင်းလင်းချက်ကို တိုက်ရိုက်ပြသထားပြီး မေးခွန်းများကို Trait အုပ်စုအလိုက် စီထားခြင်းကြောင့် ဖြေဆိုသူအပေါ် Framing bias ဖြစ်စေနိုင်သည်။
3. **TraitLens Reverse-Scoring Balance (`src/data/questions.js`):**
   - 60 နှင့် 120 levels တွင် Reverse-keyed items မလုံလောက်ခြင်း (Standard 30 တွင် 0 ခု၊ Openness 120 တွင် 2/24 သာ) ကြောင့် Acquiescence bias (အကုန် "ကိုက်ညီပါသည်" နှိပ်တတ်သူများတွင် အမှတ်တက်ခြင်း) ဖြစ်နိုင်သည်။
4. **Knowledge Center Cross-Linking & Search (`KnowledgeCenter.jsx`, `KnowledgeInlineHelp.jsx`):**
   - Glossary terms 10/30 ကို မေးခွန်းများနှင့် မချိတ်ရသေးခြင်း၊ Inline help dialog မှ Knowledge Center detail page သို့ ဆက်သွားရန် link မပါခြင်း၊ Term detail page တွင် Related terms links မပါခြင်း။
5. **Career Interest Module Parity (`CareerInterestModule.jsx`):**
   - `IntroView` + `InstructionsPage` နှစ်ဆင့်ထပ်နေခြင်း၊ `ReportSectionNavigation` မပါခြင်း၊ `KnowledgeInlineHelp` မပါခြင်း၊ Radar/Visual breakdown နှင့် Actionable Myanmar examples နည်းပါးခြင်း။
6. **Print / Export & History Data Safety:**
   - `saveAssessment()` တွင် `.slice(0, 50)` truncation bug ရှိခြင်း၊ `saveDraft()` failure ကို UI တွင် သတိမပေးခြင်း၊ `ResultsPage` & `CareerInterestModule` `.txt` download တွင် DOM attach / delayed revoke မပါခြင်း။
7. **Accessibility & Performance:**
   - WCAG contrast failures (2.35:1 – 3.77:1 on white), `9px–10px` Burmese font sizes, `Header` active state bug on Knowledge tab, `BackupRestoreDialog` `Escape` key missing, 997 kB monolithic JS chunk။

---

## C. Self Discovery ၏ ထူးခြားသော အားသာချက်များ (Unique Competitive Advantages)

1. **Burmese-First, Culturally Aware Language:** ပြိုင်ဘက် ၇ ခုလုံးတွင် မြန်မာဘာသာ မပါဝင်ပါ။ Self Discovery သည် မြန်မာအသုံးပြုသူများ နားလည်လွယ်စေရန် နေ့စဉ်သုံးစကား၊ Inline glossary help (`ⓘ`) နှင့် ယဉ်ကျေးမှုဆိုင်ရာ ဂရုစိုက်မှုတို့ဖြင့် တည်ဆောက်ထားသည်။
2. **Zero-Tracking, Local-First Privacy + Portable JSON Backup:** 16Personalities/Truity ကဲ့သို့ Account, Cookies, Ad pixels, Cloud profiling မရှိဘဲ Browser LocalStorage + Previewable JSON Backup (Merge/Replace) ပေးထားခြင်းမှာ Privacy အတွက် ထူးခြားသော အားသာချက်ဖြစ်သည်။
3. **Ethical Non-Labelling, Non-Diagnostic Stance:** 16Personalities ကဲ့သို့ Type-box ထဲ မထည့်ဘဲ၊ "အမှတ်နိမ့်ခြင်းသည် အားနည်းချက်မဟုတ်" ဟူသော Balanced framing နှင့် Pilot/Draft status ကို ပွင့်လင်းစွာ ဖော်ပြထားသည်။
4. **Integrated Psychology Glossary (`Knowledge Center`):** မေးခွန်းဖြေဆိုနေစဉ်အတွင်း ခက်ခဲသော စိတ်ပညာဝေါဟာရကို `ⓘ` နှိပ်၍ ချက်ချင်းလေ့လာနိုင်ခြင်းမှာ Self Discovery ၏ ထူးခြားသော Learning-first innovation ဖြစ်သည်။

---

## D. ပြိုင်ဘက်များတွင် တွေ့ရပြီး Self Discovery ရှောင်ကြဉ်ရမည့် ပြဿနာများ (Competitor Pitfalls to Avoid)

1. **Paywall Frustration (Truity):** မေးခွန်းအားလုံး ဖြေခိုင်းပြီးမှ အဓိကရလဒ်ကို ငွေတောင်းခြင်း၊ Guest results ကို ရက်အကန့်အသတ်ဖြင့် ဖျက်ပစ်ခြင်း။
2. **Ad-Tech & Behavioral Profiling (Truity, commercial quizzes):** Facebook/Google ad pixels နှင့် third-party trackers များ ထည့်သွင်းခြင်း။
3. **Rigid Type Boxing & Overclaiming Validity (16Personalities, pop-MBTI):** လူတစ်ဦးကို အမျိုးအစားတစ်ခုအဖြစ် တံဆိပ်ကပ်ခြင်း သို့မဟုတ် Unvalidated score ကို Scientific norm/diagnosis အဖြစ် ဟန်ဆောင်ဖော်ပြခြင်း။
4. **Retake Lockout (Understand Myself, PrinciplesYou):** Self-reflection tool တွင် တစ်ကြိမ်သာ ဖြေခွင့်ပေးခြင်းသည် အချိန်အလိုက် ကိုယ့်ကိုယ်ကို ပြန်လည်သုံးသပ်လိုသူများအတွက် အတားအဆီး ဖြစ်စေသည်။
5. **Wall-of-Text Reports & Long Unbreakable Tests (Understand Myself, PrinciplesYou 30–40 min):** Mobile screen ငယ်များနှင့် Low-bandwidth users များအတွက် စာပိုဒ်ရှည်ကြီးများနှင့် အချိန်အလွန်ကြာသော မေးခွန်းတန်းများသည် Drop-off ဖြစ်စေသည်။

---

## E. Self Discovery ထဲသို့ မထည့်သင့်သော အရာများ (Features That Should NOT Be Added)

- **Live Job Board / Salary Rankings / Employer Matching:** Career Interest ကို Job-search portal အဖြစ် မပြောင်းလဲရ။
- **Social Feed, Public Ranking, Leaderboards, Gamified Streaks:** ကိုယ်ပိုင်စိတ်ပိုင်းဆိုင်ရာ ပြန်လည်သုံးသပ်မှုကို ပြိုင်ဆိုင်မှု/လူမှုဖိအား ဖြစ်စေမည်။
- **Automated Mental-Health Risk Labels / Clinical Screening / AI Therapy Advice:** ကျင့်ဝတ်နှင့် ဘေးကင်းရေးအရ အန္တရာယ်ရှိပြီး App ၏ Scope ပြင်ပဖြစ်သည်။
- **Mandatory Login, Cloud Telemetry, Ad Networks:** Local-first privacy advantage ကို ဖျက်ဆီးမည်။
- **Dozens of Unrelated Viral Quizzes ("Which character are you?"):** Core mission ဖြစ်သော Self-understanding ကို အားနည်းစေမည်။

---

## F. ဦးစားပေးအဆင့်အလိုက် Gap Classification (Myanmar Users Perspective)

### Critical Gaps (ချက်ချင်းပြင်သင့်သော အရေးကြီးကွာဟချက်များ)
1. **History 50-record silent truncation bug (`storage.js` L136) & silent `saveDraft` write failures:** မြန်မာနိုင်ငံရှိ Storage နည်းသော/Data reset မကြာခဏဖြစ်တတ်သော ဖုန်းများတွင် ဖြေထားသည့် မှတ်တမ်းများ မပျောက်စေရန် အရေးကြီးဆုံးဖြစ်သည်။
2. **WCAG Contrast & Small Burmese Font Sizes (9–11px at 2.35:1–3.77:1):** Android ဖုန်းမျက်နှာပြင်ငယ်များနှင့် နေရောင်အောက်တွင် မြန်မာစာကို သက်တောင့်သက်သာ ဖတ်နိုင်ရန် မဖြစ်မနေ ပြင်ရမည်။
3. **Homepage First-Impression & Assessment Entry Flow:** First-time user များ မရှုပ်ထွေးဘဲ ၃၀ စက္ကန့်အတွင်း TraitLens ကို စတင်နိုင်စေရန် Hero + Clear CTA + Beta notice collapse/reposition လုပ်ရန် လိုသည်။
4. **Bundle Size (997 kB JS) & Mobile Download Bug Risk:** မြန်မာနိုင်ငံ၏ Mobile data ကုန်ကျစရိတ်နှင့် နှေးကွေးသော ကွန်ရက်များအတွက် Code-splitting (`Recharts` lazy load) နှင့် Mobile Safari `.txt` download fix အရေးကြီးသည်။

### High-Priority Improvements
5. **Header Active Tab Bug (`App.jsx` L80) & Career Intro Double-Step Removal.**
6. **Human Language & Psychology Review Execution** (TraitLens Q-review 11 items, InnerCompass V0.3 activation pathway, Knowledge Center 30 terms review & publish workflow)။
7. **TraitLens 120 Facet Explanations & Career Interest Report Parity** (Charts, daily Myanmar examples, inline help)။
8. **Assessment Bias Mitigation:** Question screen တွင် Trait/Dimension label ပြသမှုကို ဖယ်ရှား/Optional toggle ထားခြင်း၊ ခန့်မှန်းကြာချိန် (မိနစ်) ဖော်ပြခြင်း။ *(မေးခွန်းအစီအစဉ်/wording ပြောင်းလဲခြင်းကိုမူ Owner approval နှင့် New bank version ဖြင့်သာ လုပ်ဆောင်ရမည်။)*

### Medium-Priority Improvements
9. **PWA & Offline Support (Manifest, Icons, Service Worker, Local/Subset Font fallback):** Data/Internet ပြတ်တောက်တတ်သော ဒေသများတွင် Install လုပ်ပြီး Offline ဖြေဆိုနိုင်စေရန်။
10. **History Filtering, Search & Self-Comparison Over Time:** ယခင်နှင့် ယခု ကိုယ့်ရလဒ် ပြောင်းလဲမှုကို ကိုယ်တိုင်ပြန်သုံးသပ်နိုင်စေရန်။
11. **Knowledge Center Cross-Links & Missing 10-Term Question Links + Inline "Read Full Entry" Link.**
12. **Styled Printable / Save-as-PDF Card & Modal Accessibility (Focus trap, Escape key, Report scrollspy).**

### Optional Future Features (Core Stabilization ပြီးမှသာ)
13. **Combined Reflection Summary** (TraitLens + InnerCompass + Career Interest ကို မရောထွေးဘဲ ယှဉ်ပြသည့် Summary)။
14. **Private Local Reflection Journal Prompts** (Report ထဲရှိ Reflection question များကို ကိုယ့်စက်ထဲတွင်သာ စာရေးသိမ်းနိုင်ခြင်း + Encrypted/Password-protected JSON export option)။
15. **BondSense, ValueMap, Skills Assessment** (တစ်ခုချင်းစီ Cognitive interview & Pilot validation ပြီးမှ ဖွင့်လှစ်ရန်)။
