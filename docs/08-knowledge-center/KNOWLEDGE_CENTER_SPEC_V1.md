# Self Discovery — Knowledge Center Specification

**Document ID:** SD-KC-SPEC-001  
**Version:** 1.0  
**Date:** 1 November 2026  
**Status:** Draft for project approval  
**Product:** Self Discovery  
**Initial implementation:** Local-first React + Vite + Tailwind CSS; LocalStorage / local JSON content

---

## Beta Implementation Note — v1.10.0-beta.1

The first public Beta preview deliberately displays the 30 glossary entries in a read-only learning preview so testers can evaluate Burmese wording and comprehension. This is an explicit Beta-preview exception to the normal publication rule in Section 6: every entry remains `workflow_status: draft` and `published: false`, and the interface prominently says that both language and psychology reviews are pending. No reviewer identity, qualification, approval, or publication date is fabricated. Before the Knowledge Center is treated as a stable public resource, the content must complete the separate human language and psychology review steps; entries must remain excluded from the formal Published collection until then.

Because the GitHub Pages website is public, this preview is visible to anyone who can open the website; it is not an access-controlled reviewer workspace. A secure multi-person review workflow still requires a backend and authentication.

---

## 1. ရည်ရွယ်ချက်

Knowledge Center သည် စိတ်ပညာ၊ လူ့အတွေးအခေါ်၊ ခံစားချက်၊ အပြုအမူနှင့် လူမှုဆက်ဆံရေးဆိုင်ရာ စကားလုံးများကို မြန်မာဘာသာဖြင့် ရိုးရှင်း၊ တိကျ၊ နားလည်လွယ်စွာ ရှင်းပြပေးမည့် သီးခြား Knowledge Library ဖြစ်သည်။

၎င်းသည် စကားလုံးအဓိပ္ပာယ်စာရင်းတစ်ခုသာ မဟုတ်ဘဲ အကြောင်းအရာတစ်ခုချင်းစီအတွက်—

- မြန်မာလို ရိုးရှင်းသော အဓိပ္ပာယ်
- ပိုမိုတိကျသော ရှင်းလင်းချက်
- နေ့စဉ်ဘဝ ဥပမာ
- ဆင်တူစကားလုံးနှင့် ကွာခြားချက်
- မှားယွင်းနားလည်နိုင်သည့်အချက် / သတိပြုရန်
- ယုံကြည်စိတ်ချရသော ရင်းမြစ်များ
- ဘာသာစကားနှင့် စိတ်ပညာ စစ်ဆေးမှုအခြေအနေ
- အကြောင်းအရာ Version နှင့် ပြင်ဆင်မှုမှတ်တမ်း

တို့ကို တစ်နေရာတည်းတွင် စနစ်တကျ ထိန်းသိမ်းမည်။

### 1.1 အဓိကရည်မှန်းချက်များ

1. မြန်မာအသုံးပြုသူများ စိတ်ပညာဆိုင်ရာ ဝေါဟာရများကို မှန်ကန်စွာ နားလည်နိုင်ရန်။
2. Assessment မေးခွန်းများတွင် မရှင်းလင်းသော စကားလုံးကြောင့် အဖြေမှားရွေးချယ်မှု လျော့နည်းစေရန်။
3. TraitLens၊ InnerCompass နှင့် နောက်ပိုင်း Assessment များတွင် စကားလုံးရှင်းလင်းချက်ကို ပြန်လည်အသုံးပြုနိုင်ရန်။
4. AI အကူအညီဖြင့် ရေးသားထားသည့် မူကြမ်းနှင့် လူသားကျွမ်းကျင်သူ စစ်ဆေးပြီးသည့် အကြောင်းအရာကို ရှင်းလင်းစွာ ခွဲပြရန်။
5. အကြောင်းအရာတစ်ခုချင်းစီ၏ ရင်းမြစ်၊ စစ်ဆေးသူ၊ စစ်ဆေးသည့်ရက်စွဲနှင့် Version ကို မှတ်တမ်းတင်ရန်။

### 1.2 မလုပ်ဆောင်မည့်အရာများ

- Knowledge Center ကို ရောဂါရှာဖွေရေး သို့မဟုတ် ဆေးဘက်ဆိုင်ရာ Diagnosis စနစ်အဖြစ် မသုံးရ။
- စကားလုံးတစ်ခု၏ အဓိပ္ပာယ်ကို ဖတ်ရုံဖြင့် အသုံးပြုသူတွင် ရောဂါ သို့မဟုတ် စိတ်ပိုင်းဆိုင်ရာပြဿနာ ရှိသည်ဟု မသတ်မှတ်ရ။
- AI က ရေးသားထားသော အကြောင်းအရာကို ကျွမ်းကျင်သူ စစ်ဆေးပြီးသကဲ့သို့ မဖော်ပြရ။
- အခြားမော်ဒယ်များ၏ မေးခွန်း၊ Scoring Key၊ Logo သို့မဟုတ် ကာကွယ်ထားသော စာသားများကို ခွင့်ပြုချက်မရှိဘဲ ကူးယူမသုံးရ။

---

## 2. အသုံးပြုသူအုပ်စုနှင့် အသုံးပြုပုံ

### 2.1 အများပြည်သူအသုံးပြုသူ

- စကားလုံးရှာဖွေခြင်း၊ Category အလိုက် စစ်ထုတ်ခြင်း။
- အဓိပ္ပာယ်၊ ဥပမာ၊ ဆင်တူ/ကွဲပြားသည့် စကားလုံးများ ဖတ်ရှုခြင်း။
- Assessment မေးခွန်းထဲတွင် `ⓘ` ကိုနှိပ်၍ အတိုချုံးရှင်းလင်းချက် ဖတ်ခြင်း။
- အပြည့်အစုံစာမျက်နှာသို့ ဆက်သွားခြင်း။
- စစ်ဆေးမှုအခြေအနေနှင့် ရင်းမြစ်များကို ကြည့်ရှုခြင်း။

### 2.2 Content Editor

- စကားလုံးအသစ် ထည့်သွင်းခြင်း။
- ရှိပြီးသား စာသားကို ပြင်ဆင်ခြင်း။
- ရင်းမြစ်နှင့် သက်ဆိုင်ရာ Assessment Link ထည့်ခြင်း။
- Review အတွက် တင်ပြခြင်း။

### 2.3 ဘာသာစကားစစ်ဆေးသူ

- မြန်မာစကားလုံးရွေးချယ်မှု၊ စာလုံးပေါင်း၊ ဝါကျဖွဲ့စည်းပုံနှင့် နားလည်ရလွယ်မှုကို စစ်ဆေးခြင်း။
- မရှင်းလင်းသည့် စကားလုံးအတွက် ပိုမိုသင့်တော်သော ရွေးချယ်စရာ အဆိုပြုခြင်း။
- `Approved` သို့မဟုတ် `Changes requested` သတ်မှတ်ခြင်း။

### 2.4 စိတ်ပညာဆိုင်ရာ စစ်ဆေးသူ

- အဓိပ္ပာယ်ဖွင့်ဆိုချက်သည် သက်ဆိုင်ရာ သုတေသန/စာပေနှင့် ကိုက်ညီမှုရှိမရှိ စစ်ဆေးခြင်း။
- အရေးကြီးသော ကွာခြားချက်၊ ကန့်သတ်ချက်နှင့် သတိပြုရန်ကို စစ်ဆေးခြင်း။
- မူရင်းရင်းမြစ်များနှင့် ကိုက်ညီမှုကို စစ်ဆေးခြင်း။
- `Approved` သို့မဟုတ် `Changes requested` သတ်မှတ်ခြင်း။

> **သတိပြုရန်:** ပထမ Version သည် Local-first ဖြစ်သောကြောင့် Review မှတ်တမ်းများကို စက်တစ်လုံးတည်းတွင် စီမံနိုင်သည့် အခြေခံ Workflow သာ ပံ့ပိုးမည်။ လူအများ တစ်ပြိုင်နက် ဝင်ရောက် Review လုပ်နိုင်သော လုံခြုံသည့် Multi-user Workflow အတွက် နောင်တွင် Backend နှင့် Authentication လိုအပ်မည်။ LocalStorage ကို လုံခြုံသော User Account စနစ်ဟု မဖော်ပြရ။

---

## 3. Knowledge Category များ

ပထမ Version တွင် Category ၆ ခုနှင့် စကားလုံး ၃၀ ကို စတင်မည်။ Category တစ်ခုစီတွင် စကားလုံး ၅ ခု ပါဝင်မည်။ ဤစာရင်းသည် **စတင်စုစည်းရန် အဆိုပြုစာရင်း** သာဖြစ်ပြီး မြန်မာဘာသာအမည်များကို Review ပြီးမှ အတည်ပြုမည်။

| ID | Category အမည် | ရည်ရွယ်ချက် | အစပြု စကားလုံး ၅ ခု |
|---|---|---|---|
| KC-CAT-01 | စိတ်ခံစားမှုနှင့် စိတ်ဖိစီးမှု | ခံစားချက်၊ စိတ်ဖိစီးမှုနှင့် တုံ့ပြန်မှု | Stress, Anxiety, Frustration, Sadness, Emotional Regulation |
| KC-CAT-02 | အတွေးအခေါ်နှင့် စိတ်ပိုင်းဆိုင်ရာ ဖြစ်စဉ်များ | အာရုံစူးစိုက်မှု၊ မှတ်ဉာဏ်နှင့် အတွေးပုံစံ | Attention, Concentration, Memory, Cognitive Bias, Rumination |
| KC-CAT-03 | အပြုအမူနှင့် အလေ့အထများ | ပုံမှန်လုပ်ရပ်၊ အလေ့အထနှင့် လုပ်ဆောင်မှုပုံစံ | Habit, Avoidance, Procrastination, Persistence, Impulse Control |
| KC-CAT-04 | လူမှုဆက်ဆံရေး | အခြားသူများနှင့် ဆက်ဆံပုံ | Empathy, Trust, Personal Boundaries, Assertiveness, Conflict Resolution |
| KC-CAT-05 | မိမိကိုယ်ကို နားလည်ခြင်း | ကိုယ့်အမြင်၊ ကိုယ့်တန်ဖိုးနှင့် ကိုယ့်ကိုယ်ကို ဆက်ဆံပုံ | Self-esteem, Self-efficacy, Self-awareness, Identity, Self-compassion |
| KC-CAT-06 | စိတ်ပညာအခြေခံသဘောတရားများ | အခြေခံ စိတ်ပညာဝေါဟာရ | Personality, Temperament, Motivation, Resilience, Attachment |


### 3.1 Category စည်းမျဉ်း

- စကားလုံးတစ်ခုတွင် မူလ Category တစ်ခုသာ ရှိမည်။
- လိုအပ်ပါက အခြား Category များကို Related Category အဖြစ် ချိတ်နိုင်မည်။
- Category အမည်များကို အသုံးပြုသူဖတ်လွယ်သည့် မြန်မာစကားလုံးဖြင့် ဖော်ပြမည်။
- Category အမည်သည် စိတ်ပညာဆိုင်ရာ တရားဝင် Classification ဟု မဆိုလိုပါ။ Knowledge Center အတွက် စုစည်းပုံသာဖြစ်သည်။

---

## 4. စကားလုံးတစ်ခုချင်းစီ၏ Content Template

Knowledge Entry တစ်ခုချင်းစီသည် အောက်ပါ Standard Template ကို လိုက်နာရမည်။

### 4.1 မဖြစ်မနေပါဝင်ရမည့် Fields

1. **English Term** — မူရင်းအင်္ဂလိပ်ဝေါဟာရ။
2. **မြန်မာအမည်** — အကြံပြုထားသော မြန်မာအသုံးအနှုန်း။
3. **အခြားအသုံးအနှုန်းများ** — ရှိပါက အဓိပ္ပာယ်မလွဲစေသော အခြားဘာသာပြန်/အသုံးအနှုန်း။
4. **ရိုးရိုးရှင်းရှင်း အဓိပ္ပာယ်** — သာမန်ဖတ်ရှုသူ နားလည်နိုင်သည့် စာကြောင်း ၁–၃ ကြောင်း။
5. **အသေးစိတ်ရှင်းလင်းချက်** — လိုအပ်သည့်အတိုင်းအတာဖြင့် တိကျသော ရှင်းလင်းချက်။
6. **နေ့စဉ်ဘဝ ဥပမာ** — ပုံမှန်ဘဝအခြေအနေကို အခြေခံသော ဥပမာ ၁–၂ ခု။
7. **ဆင်တူစကားလုံးနှင့် ကွာခြားချက်** — အလွယ်တကူ ရောထွေးနိုင်သည့် ဝေါဟာရနှင့် ကွာခြားချက်။
8. **သတိပြုရန်** — မှားယွင်းကောက်ချက်ချနိုင်သည့် အချက်၊ ကန့်သတ်ချက်။
9. **ရင်းမြစ်များ** — အဓိပ္ပာယ်ဖွင့်ဆိုချက်ကို ထောက်ခံသည့် အရင်းအမြစ်များ။
10. **Assessment ချိတ်ဆက်မှု** — ဘယ် Assessment သို့မဟုတ် မေးခွန်းတွင် အသုံးပြုထားသလဲ။
11. **Review အခြေအနေ** — Draft / Review / Approved / Published။
12. **Version နှင့် ပြင်ဆင်ရက်စွဲ** — ပြောင်းလဲမှုမှတ်တမ်းနှင့်အတူ။

### 4.2 စာရေးသားမှု စံနှုန်း

- ပထမဆုံးဖတ်သူတစ်ယောက် နားလည်နိုင်မည့် ရိုးရှင်းသော မြန်မာစကားကို ဦးစားပေးရမည်။
- အင်္ဂလိပ်ဝေါဟာရကို လုံးဝဖျောက်မထားရ။ မြန်မာအမည်နှင့်အတူ ပြသရမည်။
- အဓိပ္ပာယ်ကို စက်ဘာသာပြန်သလို မရေးရ။
- လူကို အပြစ်တင်ခြင်း၊ အရှက်ရစေခြင်း သို့မဟုတ် အမျိုးအစားတစ်ခုအဖြစ် တံဆိပ်ကပ်ခြင်း မပြုရ။
- စကားလုံးတစ်ခု၏ အဓိပ္ပာယ်ကို အလွန်အကျွံ မချဲ့ကားရ။
- ဥပမာများသည် နေ့စဉ်ဘဝနှင့် ကိုက်ညီပြီး ယဉ်ကျေးမှုအရ သင့်လျော်ရမည်။
- Clinical term ဖြစ်ပါက သာမန်ခံစားချက်နှင့် ရောဂါသတ်မှတ်ချက်ကို သေချာခွဲပြရမည်။
- အထောက်အထားမရှိဘဲ “လူတိုင်း”, “အမြဲ”, “မဖြစ်မနေ” စသည့် အကြွင်းမဲ့စကားလုံးများ မသုံးရ။

---

## 5. Source & Evidence Policy

### 5.1 လက်ခံနိုင်သော ရင်းမြစ်ဦးစားပေးမှု

1. Peer-reviewed research papers နှင့် systematic reviews။
2. သက်ဆိုင်ရာ ပညာရှင်အဖွဲ့အစည်းများ၏ တရားဝင် Reference များ (ဥပမာ APA)။
3. WHO နှင့် အခြား သက်ဆိုင်ရာ ပြည်သူ့ကျန်းမာရေးအဖွဲ့အစည်းများ၏ သတင်းအချက်အလက်။
4. တက္ကသိုလ်/ပညာရေးအဖွဲ့အစည်းများ၏ သင်ရိုး၊ သုတေသနနှင့် စာတမ်းများ။
5. ယုံကြည်စိတ်ချရသော စိတ်ပညာအဘိဓာန်နှင့် သင်ရိုးစာအုပ်များ။

Blog၊ လူမှုကွန်ရက်ပို့စ်၊ ကြော်ငြာစာမျက်နှာများကို အဓိကသက်သေအဖြစ် မသုံးရ။ လိုအပ်ပါက ထပ်ဆင့်လေ့လာရန်သာ သုံးနိုင်သည်။

### 5.2 Source Record

ရင်းမြစ်တစ်ခုချင်းစီအတွက်—

- အမည် / ခေါင်းစဉ်
- ရေးသားသူ သို့မဟုတ် အဖွဲ့အစည်း
- ထုတ်ဝေသည့်နှစ် (သိရှိနိုင်ပါက)
- URL / DOI
- ဝင်ရောက်ကြည့်ရှုသည့် ရက်စွဲ
- ဘယ်အချက်ကို ထောက်ခံသလဲ
- ရင်းမြစ်အမျိုးအစား (research / professional body / textbook / dictionary / public health)
- Copyright / usage note

တို့ကို မှတ်တမ်းတင်ရမည်။

### 5.3 Copyright & Attribution

- ရင်းမြစ်မှ စာပိုဒ်အရှည်လိုက် ကူးယူမထားရ။ ကိုယ်ပိုင်စကားဖြင့် ပြန်လည်ရှင်းပြရမည်။
- ရင်းမြစ်ကို မှန်ကန်စွာ ညွှန်းဆိုရမည်။
- အဘိဓာန် သို့မဟုတ် အဖွဲ့အစည်းတစ်ခု၏ အကြောင်းအရာကို ဖတ်ရှုခွင့်ရှိခြင်းသည် အဲဒီစာသားကို ပြန်လည်ထုတ်ဝေခွင့် ရှိသည်ဟု မဆိုလိုပါ။
- သက်ဆိုင်ရာ Test Instrument ၏ မေးခွန်း၊ scoring key၊ logo နှင့် protected content များကို လိုင်စင်/ခွင့်ပြုချက်မရှိဘဲ မကူးယူရ။
- မော်ဒယ်အမည်ကို မသုံးခြင်းတစ်ခုတည်းဖြင့် မူရင်းအကြောင်းအရာ အသုံးပြုခွင့်ရသည်ဟု မယူဆရ။

---

## 6. Review & Approval Workflow

### 6.1 Status များ

| Status | အဓိပ္ပာယ် | Public UI |
|---|---|---|
| Draft | မူကြမ်းရေးသားနေဆဲ | မပြရ |
| Language Review | မြန်မာဘာသာ စစ်ဆေးရန်တင်ထား | မပြရ |
| Psychology Review | စိတ်ပညာဆိုင်ရာ စစ်ဆေးရန်တင်ထား | မပြရ |
| Changes Requested | စစ်ဆေးသူက ပြင်ဆင်ရန် ပြန်ပို့ထား | မပြရ |
| Approved | လိုအပ်သည့် Review အားလုံး အတည်ပြုပြီး | မပြရသေး; Publish လုပ်နိုင် |
| Published | အသုံးပြုသူများအတွက် ထုတ်ပြန်ပြီး | ပြရ |
| Archived | မသုံးတော့သည့် Version / Entry | ပုံမှန်ရှာဖွေမှုတွင် မပြရ |

### 6.2 Review Record တစ်ခုချင်းစီ

- Reviewer ၏ အမည် (သဘောတူညီချက်ရှိမှ Public ပြရန်)
- Reviewer Role: Language Reviewer / Psychology Reviewer
- Qualification / Professional Background (စစ်ဆေးအတည်ပြုနိုင်သည့် အချက်သာ)
- Review Date
- Reviewed Content Version
- Decision: Approved / Changes Requested
- Comments / Requested Changes
- Optional supporting references

### 6.3 အတည်ပြုခြင်း စည်းမျဉ်း

- AI က စာသားရေးသားခြင်းကို Human Review ဟု မသတ်မှတ်ရ။
- မြန်မာဘာသာစစ်ဆေးမှု ပြီးခြင်းနှင့် စိတ်ပညာဆိုင်ရာ စစ်ဆေးမှု ပြီးခြင်းကို သီးခြားဖော်ပြရမည်။
- နှစ်မျိုးလုံး အတည်ပြုပြီးမှ “ကျွမ်းကျင်သူများ စစ်ဆေးပြီး” ဟု ပြသနိုင်မည်။
- စစ်ဆေးသူအမည်၊ အရည်အချင်း၊ ရက်စွဲကို တကယ်မရရှိသေးပါက မဖန်တီးရ၊ မခန့်မှန်းရ။
- Content ကို ပြင်ဆင်ပြီး Version အသစ်ဖြစ်သွားပါက ယခင် Review အတည်ပြုချက်ကို Version အသစ်အတွက် အလိုအလျောက် ဆက်လက်အသုံးမပြုရ။ လိုအပ်သည့် Review ကို ပြန်လည်လုပ်ဆောင်ရမည်။
- Review မပြီးသေးသည့် အကြောင်းအရာကို Approved / Published ဟု မပြရ။

### 6.4 Public Status Label များ

Public UI တွင် အောက်ပါအတိုင်း ဖော်ပြမည်—

- “မူကြမ်း — မထုတ်ပြန်ရသေး” (Internal Preview တွင်သာ)
- “ဘာသာစကား စစ်ဆေးပြီး”
- “စိတ်ပညာဆိုင်ရာ စစ်ဆေးပြီး”
- “ဘာသာစကားနှင့် စိတ်ပညာဆိုင်ရာ စစ်ဆေးပြီး”
- “ပြင်ဆင်ထားသော Version”

မည်သည့် Review ကို မည်သူက ပြုလုပ်ခဲ့သည်ကို ဖော်ပြနိုင်သည့်အခါ အမှန်တကယ် ရရှိထားသော Review Record ကိုသာ သုံးရမည်။

---

## 7. Version Control & Change History

Content တစ်ခုချင်းစီတွင် `contentVersion` ရှိရမည်။

ဥပမာ:

- `0.1` — ပထမမူကြမ်း
- `0.2` — စာသားပြင်ဆင်မှု
- `1.0` — Review ပြီး ပထမဆုံး Publish
- `1.1` — အဓိပ္ပာယ်မပြောင်းသော ရှင်းလင်းချက်/စာလုံးပေါင်းပြင်ဆင်မှု
- `2.0` — အဓိပ္ပာယ်၊ ရင်းမြစ် သို့မဟုတ် အကြောင်းအရာအရေးကြီး ပြောင်းလဲမှု

Version တစ်ခုစီတွင်—

- version number
- createdAt / updatedAt
- changeSummary
- changedFields
- editor identity (ရှိပါက)
- review records
- publication status

တို့ကို ထိန်းသိမ်းရမည်။

**အရေးကြီး:** Published စာမူကို တိုက်ရိုက် overwrite မလုပ်ရ။ Version အသစ်ဖန်တီးပြီး Review Workflow ကို ပြန်ဖြတ်သန်းစေရမည်။ အဟောင်း Version ကို Audit History အဖြစ် ထိန်းသိမ်းရမည်။

---

## 8. Public User Interface Requirements

### 8.1 Knowledge Center Home

- Page title: `Knowledge Center`
- မြန်မာစာတန်း: `စိတ်ပညာနှင့် လူ့အပြုအမူဆိုင်ရာ အသိပညာများ`
- Search box
- Category cards ၆ ခု
- အသစ်ထည့်ထားသော / မကြာခဏဖတ်ရှုသော စကားလုံးများ (ဒေတာရှိမှသာ)
- ရင်းမြစ်နှင့် စစ်ဆေးမှုအခြေအနေအကြောင်း ရှင်းလင်းသော Note

### 8.2 Term Detail Page

- English term နှင့် မြန်မာအမည်
- အတိုချုံး အဓိပ္ပာယ်
- အသေးစိတ် ရှင်းလင်းချက်
- နေ့စဉ်ဘဝ ဥပမာ
- ဆင်တူစကားလုံးနှင့် ကွာခြားချက်
- သတိပြုရန်
- Related terms
- ဆက်စပ် Assessment များ
- References
- Review status / Version / Review date (ရရှိထားမှသာ)

### 8.3 Assessment Question Inline Help

မေးခွန်းထဲတွင် Knowledge Center Entry နှင့် ချိတ်ထားသည့် ဝေါဟာရရှိပါက `ⓘ` ခလုတ် ပြနိုင်မည်။

- နှိပ်သောအခါ အတိုချုံးအဓိပ္ပာယ် Popover / Dialog ပြရန်။
- “အသေးစိတ်ဖတ်ရန်” Link ဖြင့် Term Detail Page သို့ သွားနိုင်ရန်။
- ရှင်းလင်းချက်ဖွင့်ကြည့်ခြင်းကြောင့် ဖြေဆိုထားသည့်အဖြေ၊ လက်ရှိမေးခွန်း၊ Draft သို့မဟုတ် Progress မပြောင်းရ။
- Mobile screen တွင် ဖတ်ရှုလွယ်သော Dialog/Bottom Sheet အသုံးပြုရန်။
- Keyboard ဖြင့် ဝင်ရောက်အသုံးပြုနိုင်မှုနှင့် Focus ပြန်ရောက်မှုကို စစ်ဆေးရန်။

### 8.4 Search & Filter

- English term နှင့် မြန်မာအမည်ဖြင့် ရှာနိုင်ရန်။
- Category အလိုက် စစ်ထုတ်နိုင်ရန်။
- Related term များသို့ ဆက်သွားနိုင်ရန်။
- မတွေ့သည့်အခါ ရှင်းလင်းသော Empty State ပြရန်။
- Public search တွင် `Published` Entry များသာ ပြရန်။

---

## 9. Local-first Data Architecture

### 9.1 Initial Storage Choice

- React + Vite + Tailwind CSS ကို ဆက်သုံးမည်။
- Backend / Firebase / Cloud Sync ကို ယခုအဆင့်တွင် မထည့်သေး။
- Knowledge Entry များကို JSON data files အဖြစ် စီမံမည်။
- User-facing local reading state (ဥပမာ favorite / recently viewed) ကို လိုအပ်ပါက LocalStorage ထဲတွင် သီးခြား key ဖြင့် သိမ်းမည်။
- Review workflow data ကို ပထမ Version တွင် local development/editor environment အတွက်သာ ထားမည်။ အမှန်တကယ် Multi-user Review အဖြစ် မဖော်ပြရ။

### 9.2 Suggested Folder Structure

```text
src/
  features/
    knowledge-center/
      components/
      pages/
      data/
      utils/
      types/
      index.js

public/
  logos/

docs/
  knowledge-center/
    specification/
    terminology/
    review-guidelines/
    sources/
    version-history/
```

Project ၏ လက်ရှိ folder naming convention နှင့် မကိုက်ပါက မူလဖွဲ့စည်းပုံကို စစ်ဆေးပြီး တစ်သမတ်တည်းဖြစ်အောင် ရွေးချယ်ရမည်။ အဟောင်းဖိုင်များကို စစ်ဆေးမထားဘဲ မရွှေ့၊ မဖျက်ရ။

### 9.3 Suggested Knowledge Entry JSON Schema

```json
{
  "id": "KC-EMO-001",
  "slug": "stress",
  "termEn": "Stress",
  "termMy": "စိတ်ဖိစီးမှု",
  "alternateTermsMy": [],
  "categoryId": "KC-CAT-01",
  "plainMeaning": "မူကြမ်းအဓိပ္ပာယ်",
  "detailedMeaning": "အသေးစိတ်ရှင်းလင်းချက်",
  "examples": [],
  "relatedTerms": [],
  "differences": [],
  "cautions": [],
  "assessmentLinks": [],
  "sources": [],
  "contentVersion": "0.1",
  "status": "draft",
  "reviewRecords": [],
  "createdAt": "2026-11-01",
  "updatedAt": "2026-11-01",
  "changeSummary": "ပထမမူကြမ်း"
}
```

JSON အတွင်းရှိ အဓိပ္ပာယ်နှင့် ရက်စွဲများသည် Schema ဥပမာသာဖြစ်ပြီး Published Content အဖြစ် မယူဆရ။

### 9.4 Data Safety

- လက်ရှိ Personality / Career LocalStorage key များကို မပြောင်းရ။
- Knowledge Center အတွက် သီးခြား storage namespace သုံးရန်။
- Backup / Restore တွင် Knowledge Center local metadata ပါဝင်/မပါဝင်ကို format version ဖြင့် ရှင်းလင်းသတ်မှတ်ရန်။
- Import မလုပ်မီ schema validate လုပ်ရန်။
- မမှန်သော JSON ကို လက်မခံရန်။
- Replace လုပ်မည်ဆိုလျှင် ရှင်းလင်းသော confirmation လိုအပ်ရန်။
- Published content JSON ကို user draft data နှင့် မရောထွေးစေရန်။

---

## 10. Content Quality Checklist

Entry တစ်ခုကို Review တင်မီ အောက်ပါအချက်များကို စစ်ဆေးရမည်။

### Language Review

- [ ] မြန်မာအမည်က ရှင်းလင်းပြီး သဘာဝကျသလား။
- [ ] English term ကို မှန်ကန်စွာ ချိတ်ဆက်ထားသလား။
- [ ] အဓိပ္ပာယ်ကို သာမန်ဖတ်သူ နားလည်နိုင်သလား။
- [ ] စာလုံးပေါင်းနှင့် ဝါကျဖွဲ့စည်းပုံ မှန်ကန်သလား။
- [ ] နေ့စဉ်ဘဝ ဥပမာက ရှင်းလင်းသလား။
- [ ] ဆင်တူစကားလုံးများကို ရောထွေးမထားဘူးလား။

### Psychology / Evidence Review

- [ ] အဓိပ္ပာယ်ဖွင့်ဆိုချက်ကို ယုံကြည်စိတ်ချရသော ရင်းမြစ်က ထောက်ခံသလား။
- [ ] အဓိပ္ပာယ်နဲ့ ဥပမာတွေ အချင်းချင်း ကိုက်ညီသလား။
- [ ] သာမန်ခံစားချက်နဲ့ Clinical diagnosis ကို မရောထွေးထားဘူးလား။
- [ ] အလွန်အကျွံ အထွေထွေကောက်ချက် မပြုထားဘူးလား။
- [ ] ဆက်စပ်/ကွဲပြားသော စကားလုံးတွေကို မှန်ကန်စွာ ခွဲပြထားသလား။
- [ ] ကန့်သတ်ချက်နဲ့ သတိပြုရန်ကို လိုအပ်သလို ဖော်ပြထားသလား။

### Publication Review

- [ ] Reviewers နှစ်ဦး၏ မှတ်တမ်းများ မှန်ကန်သလား။
- [ ] Review လုပ်ထားသည့် Version သည် ထုတ်ပြန်မည့် Version နှင့် တူညီသလား။
- [ ] ရင်းမြစ်နှင့် အသုံးပြုခွင့် မှတ်တမ်း ပြည့်စုံသလား။
- [ ] Public Status Label မှန်ကန်သလား။
- [ ] အကြောင်းအရာတွင် ဆေးဘက်ဆိုင်ရာ Diagnosis ဟု မမှားယွင်းစေဘူးလား။

---

## 11. Milestones

### Milestone 1 — Specification & Taxonomy

- [ ] ဤ Specification ကို အတည်ပြုခြင်း။
- [ ] Category ၆ ခုကို အတည်ပြုခြင်း။
- [ ] ပထမဆုံး ဝေါဟာရ ၃၀ စာရင်းကို အတည်ပြုခြင်း။
- [ ] Entry JSON schema ကို အတည်ပြုခြင်း။

### Milestone 2 — Content Drafting

- [ ] စကားလုံး ၃၀ အတွက် မူကြမ်းရေးသားခြင်း။
- [ ] ရင်းမြစ် တစ်ခုချင်းစီ ချိတ်ဆက်ခြင်း။
- [ ] ဆင်တူစကားလုံးနှင့် ကွာခြားချက်များ ထည့်ခြင်း။
- [ ] Assessment link များထည့်ခြင်း။

### Milestone 3 — Review Workflow

- [ ] Review status များ အကောင်အထည်ဖော်ခြင်း။
- [ ] Reviewer record schema ထည့်ခြင်း။
- [ ] Version history စနစ် ထည့်ခြင်း။
- [ ] Content ပြင်လျှင် approval reset လုပ်ခြင်း။

### Milestone 4 — Knowledge Center UI

- [ ] Home page နှင့် Category cards။
- [ ] Search / Filter။
- [ ] Term detail page။
- [ ] Related terms navigation။
- [ ] Inline help dialog/popover။
- [ ] Mobile responsive နှင့် accessibility test။

### Milestone 5 — Assessment Integration

- [ ] InnerCompass ထဲရှိ စကားလုံးများနှင့် ချိတ်ဆက်ခြင်း။
- [ ] TraitLens ထဲရှိ လိုအပ်သည့် စကားလုံးများနှင့် ချိတ်ဆက်ခြင်း။
- [ ] `ⓘ` help ကိုဖွင့်/ပိတ်ရာတွင် draft နှင့် progress မပြောင်းကြောင်း စမ်းသပ်ခြင်း။

### Milestone 6 — Pilot & External Review

- [ ] အသုံးပြုသူ ၆–၁၀ ယောက်နှင့် နားလည်မှု စမ်းသပ်ခြင်း။
- [ ] မြန်မာဘာသာကျွမ်းကျင်သူ Review။
- [ ] စိတ်ပညာကျွမ်းကျင်သူ Review။
- [ ] Feedback အပေါ်မူတည်၍ Version အသစ် ထုတ်ခြင်း။
- [ ] Review အမှန်တကယ် ပြီးမှ သက်ဆိုင်ရာ Entry များ Publish လုပ်ခြင်း။

---

## 12. Acceptance Criteria

Knowledge Center V1 ကို ပြီးစီးသည်ဟု သတ်မှတ်ရန်—

1. Category ၆ ခုကို Home Page တွင် မှန်ကန်စွာ ပြသနိုင်ရမည်။
2. စကားလုံး ၃၀ ကို ID မထပ်ဘဲ JSON data အဖြစ် သိမ်းဆည်းထားနိုင်ရမည်။
3. English နှင့် မြန်မာစကားလုံးဖြင့် Search လုပ်နိုင်ရမည်။
4. Category filter မှန်ကန်စွာ အလုပ်လုပ်ရမည်။
5. Term detail တွင် အဓိပ္ပာယ်၊ ဥပမာ၊ ကွာခြားချက်၊ သတိပြုရန်၊ ရင်းမြစ်နှင့် status ကို ပြနိုင်ရမည်။
6. Public list တွင် `Published` entry များသာ ပေါ်ရမည်။
7. Draft / Review entry များကို Public result အဖြစ် မပြရ။
8. Version အသစ်ပြင်ဆင်ပါက ယခင် Review အတည်ပြုချက်ကို အလိုအလျောက် ဆက်မသုံးရ။
9. Assessment မေးခွန်းမှ `ⓘ` နှိပ်လျှင် သက်ဆိုင်ရာ entry ကို ပြနိုင်ရမည်။
10. Help dialog ဖွင့်ခြင်းကြောင့် ဖြေဆိုထားသောအဖြေ၊ လက်ရှိမေးခွန်းနှင့် progress မပြောင်းရ။
11. Mobile နှင့် Desktop တွင် ဖတ်ရှုရလွယ်ကူရမည်။
12. လက်ရှိ Personality, Career, LocalStorage, Backup/Restore နှင့် History data များကို မထိခိုက်စေရ။

---

## 13. Risk & Safeguards

| Risk | ကာကွယ်မည့်နည်းလမ်း |
|---|---|
| AI အဓိပ္ပာယ်မှားရေးနိုင်ခြင်း | ရင်းမြစ်မပါသည့် Entry ကို Publish မလုပ်ရန်; Human Review လိုအပ်ရန် |
| ဘာသာပြန်စကားလုံး မတူညီခြင်း | Preferred term နှင့် alternate terms သတ်မှတ်ရန်; glossary style guide ရှိရန် |
| Stress / Anxiety ကဲ့သို့ ဆင်တူဝေါဟာရ ရောထွေးခြင်း | Comparison section နှင့် source-based explanation ထည့်ရန် |
| မစစ်ဆေးရသေးသည့်အကြောင်းအရာကို အတည်ပြုပြီးဟု ပြခြင်း | Review status ကို သီးခြားသိမ်းရန်; Public UI တွင် status ကို တိကျစွာပြရန် |
| Version အသစ်တွင် ယခင် approval ဆက်ကျန်ခြင်း | Content hash/version ပြောင်းလဲလျှင် re-review လိုအပ်ရန် |
| LocalStorage ပျောက်ဆုံးခြင်း | သီးခြား Backup/Restore နှင့် Export လမ်းညွှန် |
| Multi-user reviewer လုပ်ဆောင်ချက်ကို LocalStorage ဖြင့် လုံခြုံသည်ဟု ယူဆခြင်း | ပထမ Version ကို local workflow ဟု သတ်မှတ်; multi-user အတွက် backend လိုအပ်ကြောင်း မှတ်သားရန် |
| အကြောင်းအရာကို ဆေးဘက်ဆိုင်ရာ အကြံပြုချက်ဟု မှားယူခြင်း | Non-diagnostic notice နှင့် appropriate safety wording ထည့်ရန် |

---

## 14. Reference Starting Points

အကြောင်းအရာရေးသားရာတွင် စတင်ကိုးကားလေ့လာနိုင်သည့် အရင်းအမြစ်များ။ ဤစာရင်းသည် စကားလုံးတိုင်းအတွက် အလိုအလျောက်အတည်ပြုချက် မဟုတ်ပါ။ Entry တစ်ခုချင်းစီအတွက် သီးခြားသက်ဆိုင်ရာ source ကို ရွေးချယ်ရမည်။

1. American Psychological Association — APA Dictionary of Psychology: https://dictionary.apa.org/  
   စိတ်ပညာဝေါဟာရများ၊ အဓိပ္ပာယ်နှင့် cross-reference များအတွက် အဓိကစတင်ရင်းမြစ်။ စာသားကို တိုက်ရိုက်ကူးယူမည့်အစား ကိုယ်ပိုင်စကားဖြင့် ပြန်လည်ရေးသားပြီး Source ကို ညွှန်းဆိုရန်။
2. World Health Organization — Mental health: https://www.who.int/health-topics/mental-health  
   စိတ်ကျန်းမာရေးနှင့် သက်ဆိုင်သည့် အခြေခံအသိပညာများအတွက် အဖွဲ့အစည်းဆိုင်ရာ ရင်းမြစ်။
3. National Institute of Mental Health: https://www.nimh.nih.gov/health  
   သက်ဆိုင်ရာ စိတ်ကျန်းမာရေးအကြောင်းအရာများအတွက် အစိုးရသုတေသနအဖွဲ့အစည်း ရင်းမြစ်။

---

## 15. ဒီ Specification အတွက် အတည်ပြုရန် ကျန်ရှိသောအချက်များ

- [ ] Category ၆ ခု၏ နောက်ဆုံး မြန်မာအမည်များ။
- [ ] စတင်ထည့်မည့် ဝေါဟာရ ၃၀ စာရင်း။
- [ ] Entry တစ်ခုချင်းစီ၏ စာသားအရှည်နှင့် ဖော်ပြပုံ။
- [ ] Reviewer အမည်/အရည်အချင်းကို Public UI တွင် မည်သို့ပြမည်။
- [ ] Knowledge Content JSON ကို Build-time data အဖြစ်ထားမည်လား၊ Local editable data အဖြစ်ထားမည်လား။
- [ ] Backup/Restore format ထဲတွင် Knowledge Center content ပါဝင်မည်လား၊ user preferences သာ ပါဝင်မည်လား။

**Current decision:** ပထမ Version တွင် Knowledge Entries ကို version-controlled JSON content အဖြစ် ထားပြီး user preferences ကို သီးခြား LocalStorage key ဖြင့် သိမ်းဆည်းရန် အကြံပြုသည်။ Reviewer workflow ကို internal/local prototype အဖြစ်သာ စတင်ပြီး တကယ့် multi-user review လိုအပ်လာသည့်အခါ backend ဖြင့် တိုးချဲ့မည်။

---

**Document end — Self Discovery Knowledge Center Specification V1.0**
