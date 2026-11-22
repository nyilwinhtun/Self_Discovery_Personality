# Self Discovery — Competitor Comparison Matrix (Phase 4)

**ရက်စွဲ:** 2026-11-22  
**အဆင့်သတ်မှတ်ချက် စံနှုန်းများ (Status Labels):** `Strong` · `Adequate` · `Weak` · `Missing` · `Not verified`  
*(Live interactive browser testing မပြုလုပ်နိုင်ခဲ့သော Competitor UI behaviors များကို `Not verified` သို့မဟုတ် Documentation/Search-verified evidence ဖြင့် ပိုင်းခြားဖော်ပြထားသည်။)*

---

## 1. နှိုင်းယှဉ်ဇယား (15-Criteria Comparison Table)

| # | Evaluation Criterion | Self Discovery (`1.11.1-beta.1`) | 16Personalities | Truity | Understand Myself | HEXACO (`hexaco.org`) | BigFive-Test (`bigfive-test.com`) | PrinciplesYou | O*NET Interest Profiler |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **Homepage clarity** | **Weak** | **Strong** | **Strong** | **Adequate** | **Weak** | **Strong** | **Strong** | **Strong** |
| 2 | **Assessment onboarding** | **Adequate** | **Strong** | **Adequate** | **Weak** | **Weak** | **Strong** | **Strong** | **Strong** |
| 3 | **Question experience** | **Adequate** | **Strong** | **Adequate** | **Not verified** | **Weak** | **Strong** | **Adequate** | **Strong** |
| 4 | **Burmese language support** | **Strong** | **Missing** | **Missing** | **Missing** | **Missing** | **Missing** | **Missing** | **Missing** |
| 5 | **Assessment variety** | **Adequate** | **Weak** | **Strong** | **Weak** | **Weak** | **Weak** | **Adequate** | **Weak** |
| 6 | **Result explanations** | **Adequate** | **Strong** | **Adequate** *(paywalled)* | **Strong** *(paid)* | **Weak** | **Adequate** | **Strong** | **Adequate** |
| 7 | **Personalized recommendations** | **Weak** | **Adequate** | **Adequate** *(paywalled)* | **Adequate** | **Missing** | **Weak** | **Strong** | **Strong** *(career)* |
| 8 | **Knowledge Center** | **Adequate** *(Draft)* | **Strong** | **Strong** | **Weak** | **Adequate** *(academic)* | **Adequate** | **Adequate** | **Adequate** |
| 9 | **Mobile usability** | **Adequate** *(needs device QA)* | **Strong** | **Adequate** | **Not verified** | **Weak** | **Strong** | **Adequate** | **Strong** |
| 10 | **Accessibility** | **Weak** *(contrast/modals)* | **Not verified** | **Not verified** | **Not verified** | **Not verified** | **Adequate** | **Not verified** | **Strong** *(Sec 508)* |
| 11 | **Privacy and data control** | **Strong** | **Weak** | **Weak** | **Adequate** | **Adequate** | **Strong** | **Adequate** | **Strong** |
| 12 | **Export and report features** | **Adequate** | **Adequate** *(paid/account)* | **Adequate** *(PDF paid)* | **Weak** *(print only)* | **Weak** | **Adequate** *(compare link)* | **Adequate** *(account)* | **Adequate** *(print/code)* |
| 13 | **Free access & pricing transparency** | **Strong** | **Adequate** *(freemium)* | **Weak** *(late paywall)* | **Strong** *(upfront $9.95)* | **Adequate** *(academic free)* | **Strong** | **Strong** *(free B2C)* | **Strong** |
| 14 | **Scientific evidence & limitations** | **Adequate** *(honest limits, unvalidated)* | **Adequate** *(NERIS hybrid)* | **Adequate** *(FFM/RIASEC)* | **Strong** *(BFAS peer-reviewed)* | **Strong** *(HEXACO-PI-R)* | **Strong** *(IPIP-NEO)* | **Strong** *(psychometric docs)* | **Strong** *(DOL/O*NET)* |
| 15 | **Overall user experience** | **Adequate** | **Strong** | **Adequate** | **Weak** | **Weak** | **Strong** | **Strong** | **Strong** |

---

## 2. Criterion-by-Criterion Evidence & Rationale

### 1. Homepage clarity
- **Self Discovery (`Weak`):** Beta warning 4-card block ([App.jsx](file:///Users/user/Documents/GitHub/Self_Discovery_Personality/src/App.jsx#L142-L172)) သည် Hero section အထက်တွင် နေရာအများကြီးယူထားပြီး Coming-soon cards (`BondSense`, `ValueMap`, `Skills`) နှင့် TraitLens level selector (`#personality-levels`) များ ဝေးကွာနေသဖြင့် ပထမဆုံးသုံးသူအတွက် Primary action မထင်ရှားပါ။
- **16Personalities / Truity / BigFive-Test / PrinciplesYou / O*NET (`Strong`):** Hero headline နှင့် Single primary CTA ("Take the Test" / "Start") ကို Above-the-fold တွင် ချက်ချင်းပြသထားသည်။
- **Understand Myself (`Adequate`):** Paid landing page ဖြစ်၍ ရည်ရွယ်ချက်ရှင်းသော်လည်း visual hierarchy နှင့် interactive preview မရှိ။
- **HEXACO (`Weak`):** Academic resource directory ဖြစ်ပြီး Consumer homepage onboarding design မရှိ။

### 2. Assessment onboarding
- **Self Discovery (`Adequate`):** TraitLens, InnerCompass, Career Interest အားလုံးတွင် ကျင့်ဝတ်နှင့် နည်းလမ်း ရှင်းလင်းသော Pre-test guide + Checkbox acknowledgement ပါဝင်သည်။ သို့သော် **Estimated completion time (မိနစ်)** မပါခြင်းနှင့် Career Interest တွင် `IntroView` + `InstructionsPage` နှစ်ဆင့်ထပ်နေခြင်းတို့က Friction ဖြစ်စေသည်။
- **16Personalities / BigFive-Test / PrinciplesYou / O*NET (`Strong`):** ခန့်မှန်းကြာချိန်၊ အဖြေပေးပုံနှင့် 0-friction start (သို့မဟုတ် clear optional profile) ပေးထားသည်။
- **Truity (`Adequate`):** စတင်ရန်လွယ်သော်လည်း Full report အခကြေးငွေကျမည်ကို အစပိုင်းတွင် ထင်ထင်ရှားရှား မမြင်ရတတ်ပါ။
- **Understand Myself / HEXACO (`Weak`):** Paywall upfront (သို့) Academic download instructions များသာ ဖြစ်သည်။

### 3. Question experience
- **Self Discovery (`Adequate`):** 1-question/screen, auto-save, skip, review list, inline `ⓘ` help (TraitLens/InnerCompass) တို့ ကောင်းမွန်သည်။ သို့သော် **Blocked trait order + Visible trait/dimension name on every question**, **Auto-advance option မပါခြင်း**, နှင့် **Reverse-item imbalance** တို့ကြောင့် `Strong` အဆင့် မရသေးပါ။
- **16Personalities / BigFive-Test / O*NET (`Strong`):** Mobile-friendly clean pagination, rapid selection (auto-advance on 16Personalities), balanced scales။
- **Understand Myself (`Not verified`):** Paid gate ကြောင့် Live question UI ကို တိုက်ရိုက်မစစ်ဆေးနိုင်ခဲ့ပါ။

### 4. Burmese language support
- **Self Discovery (`Strong`):** Native Burmese-first UI, questions, glossary, reports, local explanations — ပြိုင်ဘက် ၇ ခုလုံးတွင် Burmese ဘာသာစကား **လုံးဝ မရှိပါ (`Missing`)**။

### 5. Assessment variety
- **Truity (`Strong`):** Big Five, Holland Code, Enneagram, DISC, TypeFinder စသည်ဖြင့် များပြားစွာ ရှိသည်။
- **Self Discovery (`Adequate`):** Active 3 မျိုး (TraitLens Big-Five style, InnerCompass 6-dimension pilot, Career Interest RIASEC) ရှိပြီး Knowledge Center ပါ တွဲပေးထားသည်။ (`PrinciplesYou` မှာ 1 multi-dimensional core test + team tools ဖြစ်၍ `Adequate`, ကျန် 1-test platforms များမှာ `Weak` ဖြစ်သည်။)

### 6. Result explanations
- **Self Discovery (`Adequate`):** 3-band descriptions + everyday examples + reflection prompts ပါဝင်ပြီး Non-labelling tone ကောင်းသည်။ သို့သော် TraitLens 120 ၏ 30 facets တွင် Score bar သာရှိပြီး Explanation မပါခြင်း၊ Cross-trait synthesis မပါခြင်း၊ Career Interest explanation အားနည်းခြင်းတို့ကြောင့် `Strong` မဖြစ်သေးပါ။
- **16Personalities / PrinciplesYou (`Strong`):** Rich narrative sections across work, relationships, strengths/blind spots; PrinciplesYou တွင် Multi-archetype + 36 facets ပါသည်။
- **Understand Myself (`Strong`):** 15–20 page aspect-level nuance ရှိသော်လည်း Paid-only။
- **Truity (`Adequate`):** Free summary မှာ အတိုချုံးသာဖြစ်ပြီး Deep explanation မှာ Paid။
- **BigFive-Test / O*NET (`Adequate`):** Domain/Facet scores နှင့် basic text descriptions ပါသည်။
- **HEXACO (`Weak`):** Academic scale definitions များသာ ဖြစ်ပြီး Consumer storytelling report မပါ။

### 7. Personalized recommendations
- **Self Discovery (`Weak`):** "စမ်းကြည့်နိုင်တဲ့ အဆင့်ငယ်" (tryThis) မှာ 3 bands အလိုက် Static template ၁ ခုစီသာ ရှိပြီး Cross-trait interaction, Career/Life stage context, သို့မဟုတ် User's own goals နှင့် ချိတ်ဆက်မှု မပါသေးပါ။
- **PrinciplesYou (`Strong`):** Archetype matches + facet interactions အပေါ်မူတည်၍ Communication/Collaboration tips ပေးသည်။
- **O*NET (`Strong` for career):** RIASEC profile + Job Zone preparation level အလိုက် 900+ careers match လုပ်ပေးသည်။
- **16Personalities / Truity / Understand Myself (`Adequate`):** အသေးစိတ်အကြံပြုချက်များ ပါသော်လည်း အများစုမှာ Paid tiers (သို့) Type templates များ ဖြစ်သည်။

### 8. Knowledge Center
- **Self Discovery (`Adequate`):** 30 terms × 6 categories, simple definition, daily example, distinction, caution, academic sources, inline question help (`ⓘ`) ရှိခြင်းမှာ ဖွဲ့စည်းပုံကောင်းသည်။ သို့သော် Draft 0.1.0 ဖြစ်နေခြင်း၊ Expert review မပြီးသေးခြင်း၊ Related term links မပါခြင်းတို့ကြောင့် `Adequate` သာ ပေးနိုင်သည်။
- **16Personalities / Truity (`Strong`):** Articles & trait guides ရာနှင့်ချီ ရှိသည်။

### 9. Mobile usability
- **Self Discovery (`Adequate`):** v1.11.1 တွင် Mobile bottom nav, fixed question actions, sticky report section nav, `viewport-fit=cover` ထည့်ထားသော်လည်း Real device QA မပြီးသေးခြင်း၊ 9–10px text size များခြင်းနှင့် 997 kB JS bundle ကြောင့် `Adequate` ဖြစ်သည်။
- **16Personalities / BigFive-Test / O*NET (`Strong`):** Lightweight responsive mobile web experiences (Verified from official documentation & search summaries)။
- **Understand Myself (`Not verified`):** Paid account လိုသဖြင့် Mobile UI မစစ်နိုင်ခဲ့ပါ။

### 10. Accessibility
- **Self Discovery (`Weak`):** `role="radiogroup"`, `aria-label`, `focus-visible` ပါသော်လည်း WCAG AA contrast (<4.5:1) failures အများအပြား ရှိနေခြင်း (`#b0a6b2` 2.35:1, `#9aa9b8` 2.40:1, `#8b808e` 3.77:1)၊ Modal focus trap မပါခြင်း၊ `BackupRestoreDialog` တွင် `Escape` key မပါခြင်းတို့ကြောင့် `Weak` ဖြစ်သည်။
- **O*NET (`Strong`):** U.S. Federal Section 508 compliance ဖြင့် တည်ဆောက်ထားသည်။
- **BigFive-Test (`Adequate`):** Minimalist clean HTML/high-contrast design (Automated/doc observation)။
- **Commercial sites (16Personalities, Truity, Understand Myself, PrinciplesYou, HEXACO) (`Not verified`):** Live keyboard/screen-reader/contrast audit မလုပ်နိုင်ခဲ့ပါ။

### 11. Privacy and data control
- **Self Discovery (`Strong`):** 100% LocalStorage, zero tracking/analytics/ads/accounts, full JSON export, preview-before-restore, merge/replace, delete history။ (Data-loss risk ဖြစ်စေသော `saveAssessment` `.slice(0,50)` bug ပြင်ရန်သာ လိုသည်။)
- **BigFive-Test / O*NET (`Strong`):** Account မလို၊ Anonymous client/session handling။
- **16Personalities / Truity (`Weak`):** Truity တွင် ad networks/pixels များစွာပါပြီး 16Personalities တွင် server retention & research analytics ပါသည်။

### 12. Export and report features
- **Self Discovery (`Adequate`):** `.txt` export + Browser print ပါသော်လည်း Styled PDF export, Shareable visual summary card, သို့မဟုတ် History comparison view မပါ။ `App.jsx` & `CareerInterestModule.jsx` `.txt` download တွင် Mobile Safari reliability issue ရှိနိုင်သည်။
- **Understand Myself (`Weak`):** Native PDF export မပါ၊ Browser Print-to-PDF သာ သုံးရသည်။

### 13. Free access & pricing transparency
- **Self Discovery / BigFive-Test / PrinciplesYou (B2C) / O*NET (`Strong`):** 100% Free, Paywall မရှိ။
- **Truity (`Weak`):** Free test ဟု ဆိုသော်လည်း အရေးကြီးသော 30-facet report အတွက် ~$29 paywall ရှိပြီး Guest free results မှာ ရက်အကန့်အသတ်ဖြင့် ပျောက်နိုင်သည်။

### 14. Scientific evidence & limitations
- **Self Discovery (`Adequate`):** **Honesty/Ethics အပိုင်းတွင် Strong ဖြစ်သော်လည်း Evidence အပိုင်းတွင် Weak ဖြစ်နေသည်** (ပျမ်းမျှ `Adequate`): App ကိုယ်တိုင်က "validated မဟုတ်ပါ၊ diagnostic မဟုတ်ပါ" ဟု ရိုးသားစွာ ဖော်ပြထားသော်လည်း Reliability, Factor validity နှင့် Myanmar norms မရှိသေးပါ။
- **Understand Myself / HEXACO / BigFive-Test / PrinciplesYou / O*NET (`Strong`):** Peer-reviewed psychometrics (BFAS, HEXACO-PI-R, IPIP-NEO, DOL technical reports) ကို အခြေခံထားသည်။

### 15. Overall user experience
- **Self Discovery (`Adequate`):** မြန်မာဘာသာနှင့် Ethical safety ပိုင်း အလွန်ကောင်းသော်လည်း Homepage clutter, contrast/font-size issues, TraitLens 120 facet interpretation gap, နှင့် 997 kB bundle တို့ကို ပြင်ဆင်မှသာ `Strong` အဆင့် ရောက်မည်။
