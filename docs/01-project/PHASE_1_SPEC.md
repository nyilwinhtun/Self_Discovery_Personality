# Self Discovery — Phase 1 Project Specification

**စာတမ်းအမျိုးအစား:** Product & Technical Specification  
**Version:** Phase 1 · Draft 1.0  
**Project:** Self Discovery (မြန်မာဘာသာ ကိုယ်ပိုင်ဆန်းစစ်မှုနှင့် ဖွံ့ဖြိုးတိုးတက်ရေး Platform)  
**နည်းပညာ:** React.js · Vite · Tailwind CSS · LocalStorage  
**လက်ရှိအခြေအနေ:** Local-first; Firebase မချိတ်ဆက်သေးပါ။

---

## 1. Project ရည်ရွယ်ချက်

Self Discovery သည် အသုံးပြုသူတစ်ဦးကို မိမိ၏ ပင်ကိုစရိုက်၊ အလုပ်အကိုင်ဆိုင်ရာ စိတ်ဝင်စားမှု၊ လက်တွေ့ကျွမ်းကျင်မှုနှင့် ကိုယ်ပိုင်ဖွံ့ဖြိုးတိုးတက်ရေး လိုအပ်ချက်များကို သီးခြားစီ ဆန်းစစ်ပြီး နောက်ဆုံးတွင် အချက်အလက်များကို ပေါင်းစပ်နားလည်နိုင်ရန် ကူညီပေးမည့် မြန်မာဘာသာ Web App ဖြစ်သည်။

App သည် လူတစ်ဦးကို Personality Type တစ်ခုတည်းဖြင့် သတ်မှတ်ခြင်း သို့မဟုတ် အလုပ်အကိုင်တစ်ခုကို အတင်းရွေးချယ်ပေးခြင်း မပြုရ။ ရလဒ်များကို ကိုယ်တိုင်ပြန်လည်သုံးသပ်ရန်၊ ရွေးချယ်စရာများကို စူးစမ်းရန်နှင့် တိုးတက်ရေးအစီအစဉ် ချမှတ်ရန် အထောက်အကူအဖြစ်သာ ဖော်ပြရမည်။

### 1.1 အဓိကရည်ရွယ်ချက်များ

1. မြန်မာဘာသာဖြင့် ဖတ်ရှုနားလည်ရလွယ်သော Assessment များ ပေးရန်။
2. Personality, Career Interest နှင့် Skills ကို မရောထွေးဘဲ သီးခြားတိုင်းတာရန်။
3. မေးခွန်းဖြေဆိုမှုများကို အလိုအလျောက်သိမ်းဆည်းပြီး နောက်မှ ဆက်ဖြေနိုင်ရန်။
4. LocalStorage အသုံးပြုသူအတွက် JSON Backup / Restore ပံ့ပိုးရန်။
5. နောင်တွင် Assessment သုံးမျိုး၏ ရလဒ်များကို ပေါင်းစပ်ကာ Personal Growth အကြံပြုချက်များ ထုတ်ပေးနိုင်ရန်။

---

## 2. အတည်ပြုထားသော Product ရွေးချယ်မှုများ

| အချက် | အတည်ပြုထားသောရွေးချယ်မှု |
|---|---|
| Home Page | Landing Page + Dashboard ပေါင်းစပ်ထားသောပုံစံ |
| Personality | မူလ Big Five Assessment ကို ဆက်လက်ထိန်းသိမ်းရန်; 30 / 60 / 120 မေးခွန်း |
| Career Interest | RIASEC အခြေခံ 30 မေးခွန်း |
| Skills Assessment | ကိုယ်တိုင်ဖြေဆိုသည့်မေးခွန်း + လက်တွေ့စမ်းသပ်မှု နှစ်မျိုးပေါင်းစပ်ရန် |
| Data Storage | LocalStorage |
| Backup / Restore | JSON Export + JSON Import |
| Backend | Phase 1 တွင် မပါဝင်ပါ |
| Firebase | မချိတ်ဆက်ရသေးပါ; လက်ရှိ Local-first ပုံစံကို ထိန်းသိမ်းရန် |
| AI Recommendation | Phase 1 တွင် မပါဝင်သေးပါ; အနာဂတ်အဆင့်တွင် Secure Backend မှတစ်ဆင့် ထည့်ရန် |
| Primary Language | မြန်မာဘာသာ |
| Responsive | Mobile, Tablet, Desktop |
| Visual Style | Soft Psychology — နူးညံ့သန့်ရှင်းပြီး ဖတ်ရှုရလွယ်သော UI |

---

## 3. Phase 1 ၏ Scope

Phase 1 သည် App တစ်ခုလုံး၏ အခြေခံဖွဲ့စည်းပုံ၊ Home/Dashboard၊ Local Data Layer နှင့် Backup/Restore ကို ခိုင်မာစေရန် ရည်ရွယ်သည်။ Career Interest နှင့် Skills Assessment ၏ အပြည့်အစုံမေးခွန်းများကို Phase 1 တွင် အကုန်မတည်ဆောက်သေးဘဲ နောက်ဆက်တွဲ Phase များတွင် Module တစ်ခုချင်းစီ အကောင်အထည်ဖော်မည်။

### 3.1 Phase 1 တွင် ပါဝင်မည့်အရာများ

- လက်ရှိ Personality Assessment ကို မပျက်မစီး ဆက်အသုံးပြုနိုင်ခြင်း။
- Home Page ကို Landing + Dashboard ပေါင်းစပ်ပုံစံအဖြစ် ပြင်ဆင်ခြင်း။
- Assessment သုံးမျိုးအတွက် Module Entry Card များ ဖန်တီးခြင်း။
- Personality, Career Interest, Skills တို့၏ Draft / History ကို သီးခြားစီ စီမံနိုင်မည့် Data Model တည်ဆောက်ခြင်း။
- LocalStorage Data Layer ကို တိုးချဲ့ခြင်း။
- JSON Backup Export ပြုလုပ်နိုင်ခြင်း။
- JSON Backup Import ပြုလုပ်ရာတွင် Validate, Preview, Confirm လုပ်နိုင်ခြင်း။
- ယခင် LocalStorage Data Structure ကို မဖျက်ဘဲ Migration ပြုလုပ်ခြင်း။
- Mobile Responsive Layout နှင့် မြန်မာစာဖတ်ရှုနိုင်မှု စစ်ဆေးခြင်း။

### 3.2 Phase 1 တွင် မပါဝင်သေးသောအရာများ

- Career Interest မေးခွန်း 30 ခု၏ အပြည့်အစုံ Assessment Engine။
- Skills Assessment မေးခွန်းနှင့် လက်တွေ့စမ်းသပ်မှုများ၏ အပြည့်အစုံ။
- AI API ချိတ်ဆက်မှု။
- Firebase Authentication / Firestore / Cloud Sync။
- Device အချင်းချင်း အလိုအလျောက် Data Sync။
- အလုပ်ခေါ်စာ၊ လစာနှင့် လက်ရှိ Job Market အချက်အလက်များကို Live ချိတ်ဆက်ခြင်း။

---

## 4. Home Page — Landing + Dashboard ပေါင်းစပ်ပုံ

### 4.1 ပထမမျက်နှာ၏ ဖွဲ့စည်းပုံ

1. **Header / Navigation**
   - App Logo / Self Discovery အမည်။
   - Home သို့ ပြန်သွားရန်။
   - ကျွန်ုပ်၏မှတ်တမ်း (History)။
   - Data Backup & Restore။

2. **Hero / Introduction Section**
   - ခေါင်းစဉ်: “ကိုယ့်ကိုယ်ကို ပိုမိုနားလည်ပြီး ကိုယ့်လမ်းကြောင်းကို ရှာဖွေလိုက်ပါ” ကဲ့သို့ သဘာဝကျသော မြန်မာစာ။
   - App ၏ ရည်ရွယ်ချက်ကို စာတိုဖြင့် ရှင်းပြရန်။
   - “စတင်လေ့လာမယ်” သို့မဟုတ် “ဆက်လက်ဖြေဆိုမယ်” ခလုတ်။
   - Hero သည် မျက်နှာပြင်တစ်ခုလုံးကို မယူဘဲ Assessment Cards များသို့ လျင်မြန်စွာ ရောက်နိုင်စေရန်။

3. **Assessment Dashboard**
   - Personality Assessment Card။
   - Career Interest Assessment Card။
   - Skills Assessment Card။
   - Card တစ်ခုစီတွင် ရည်ရွယ်ချက်၊ ခန့်မှန်းဖြေဆိုချိန် (သတ်မှတ်ပြီးမှ), လက်ရှိအခြေအနေ၊ စတင်/ဆက်ဖြေ ခလုတ် ပါဝင်ရန်။

4. **Continue / Resume Section**
   - မပြီးသေးသော Assessment များရှိမှသာ ပြသရန်။
   - နောက်ဆုံးဖြေဆိုခဲ့သည့်ရက်စွဲနှင့် ဖြေပြီး/ကျော်ထား/မဖြေရသေးသည့် အရေအတွက်ကို ပြရန်။
   - “ဆက်လက်ဖြေဆိုမယ်” ဖြင့် နောက်ဆုံးနေရာသို့ ပြန်ရောက်စေရန်။

5. **Recent Results / History Preview**
   - နောက်ဆုံးပြီးဆုံးထားသော Assessment များကို ပြရန်။
   - ရလဒ်အသေးစိတ်ကြည့်ရန်၊ Print/PDF ထုတ်ရန် သက်ဆိုင်ရာခလုတ်များ။

6. **Footer / Important Note**
   - Assessment များသည် ကိုယ်တိုင်ပြန်လည်သုံးသပ်ရေးအတွက် ဖြစ်ကြောင်း။
   - စိတ်ကျန်းမာရေးရောဂါ ခွဲခြားသတ်မှတ်ခြင်း သို့မဟုတ် အလုပ်အကိုင်အာမခံချက် မဟုတ်ကြောင်း ရှင်းလင်းရန်။

### 4.2 Home Page အပြုအမူ

- အသစ်ဝင်လာသူသည် Hero နှင့် Assessment မိတ်ဆက် Card များကို မြင်ရမည်။
- အရင် Draft ရှိသူသည် Resume Card ကိုလည်း မြင်ရမည်။
- မည်သည့် Assessment မှ ပြီးဆုံးထားခြင်းမရှိသေးလျှင် Empty State ကို အားပေးသည့် မြန်မာစာဖြင့် ပြရန်။
- Module မစတင်နိုင်သေးသည့်အချိန်တွင် “မကြာမီလာမည်” ဟု ဖော်ပြနိုင်သော်လည်း မလုပ်ဆောင်နိုင်သော ခလုတ်ကို Active ပုံစံဖြင့် မပြရ။

---

## 5. Assessment Module သုံးမျိုး၏ Product Definition

### 5.1 Personality Assessment — မူလ Module

- Big Five အခြေခံမေးခွန်း 30 / 60 / 120 အဆင့်များကို ဆက်လက်ထိန်းသိမ်းရန်။
- မေးခွန်းတစ်မျက်နှာတစ်ခု ပုံစံ။
- Auto Save, Skip, Previous, Resume, Review Skipped Questions။
- History နှင့် Print/PDF Report ကို ဆက်လက်ထိန်းသိမ်းရန်။
- Phase 1 အတွက် လက်ရှိမေးခွန်း ID နှင့် စာသားများကို မလိုအပ်ဘဲ မပြောင်းရန်။
- Scoring Logic ကို အတည်ပြုထားသော test cases များနှင့် စစ်ဆေးရန်။

### 5.2 Career Interest Assessment — Phase 2 ၏ အခြေခံသတ်မှတ်ချက်

**Model:** RIASEC (အလုပ်အကိုင်စိတ်ဝင်စားမှု အမျိုးအစား ၆ မျိုး)

| Code | မြန်မာအမည် | အဓိကစိတ်ဝင်စားမှု |
|---|---|---|
| R | လက်တွေ့လုပ်ဆောင်မှု | ပြုပြင်ခြင်း၊ တည်ဆောက်ခြင်း၊ လက်တွေ့ပစ္စည်းများနှင့် လုပ်ဆောင်ခြင်း |
| I | စူးစမ်းလေ့လာမှု | သုတေသန၊ ခွဲခြမ်းစိတ်ဖြာမှု၊ ပြဿနာဖြေရှင်းခြင်း |
| A | ဖန်တီးမှု | အနုပညာ၊ ဒီဇိုင်း၊ ရေးသားဖန်တီးခြင်း |
| S | လူမှုကူညီသင်ကြားမှု | သင်ကြားခြင်း၊ ကူညီခြင်း၊ အကြံပေးခြင်း |
| E | ဦးဆောင်စည်းရုံးမှု | စီးပွားရေး၊ ရောင်းဝယ်ရေး၊ ဦးဆောင်ခြင်း |
| C | စနစ်တကျစီမံမှု | စာရင်း၊ အချက်အလက်၊ လုပ်ငန်းစဉ် စီမံခြင်း |

**မေးခွန်းအရေအတွက်:** 30 ခု၊ အမျိုးအစားတစ်ခုလျှင် 5 ခုစီ။

**ဖြေဆိုပုံ:** “ဒီလုပ်ဆောင်မှုကို လုပ်ရတာ ဘယ်လောက်နှစ်သက်ပါသလဲ” ကို အခြေခံရမည်။ “ဒီအလုပ်ကို လုပ်တတ်ပါသလား” သို့မဟုတ် “ကျွမ်းကျင်ပါသလား” ဟု မေးခြင်းမပြုရ။ 5-point interest scale ကို အသုံးပြုရန်။

**Result:** RIASEC အမျိုးအစား ၆ ခု၏ အညွှန်းရမှတ်၊ ထိပ်ဆုံးစိတ်ဝင်စားမှု ၂–၃ ခု၊ သက်ဆိုင်ရာလုပ်ငန်းအမျိုးအစားများကို စူးစမ်းရန် အကြံပြုချက်။ ရမှတ်အမြင့်ဆုံး code ကိုသာ အခြေခံပြီး အလုပ်အကိုင်တစ်ခုတည်း သတ်မှတ်မပေးရ။

### 5.3 Skills Assessment — Phase 3 ၏ အခြေခံသတ်မှတ်ချက်

Skills Assessment ကို နည်းလမ်းနှစ်မျိုး ပေါင်းစပ်မည်။

**A. ကိုယ်တိုင်ဖြေဆိုသည့် မေးခွန်းများ (Self-Assessment)**

အကြံပြုထားသော Skill အုပ်စုများ —

1. Digital Skills — ကွန်ပျူတာနှင့် ဒစ်ဂျစ်တယ်ကိရိယာ အသုံးပြုနိုင်မှု။
2. Analytical Skills — အချက်အလက်နားလည်ခြင်း၊ တွက်ချက်ခြင်း၊ ခွဲခြမ်းစိတ်ဖြာခြင်း။
3. Communication — နားထောင်ခြင်း၊ ရှင်းပြခြင်း၊ ရေးသားပြောဆိုခြင်း။
4. Problem Solving — ပြဿနာကို ခွဲခြမ်းပြီး ဖြေရှင်းနိုင်မှု။
5. Creative Skills — စိတ်ကူးဖန်တီးခြင်း၊ ဒီဇိုင်းနှင့် အကြံသစ်ထုတ်နိုင်မှု။
6. Business / Organization — အလုပ်စီမံခြင်း၊ ဦးစားပေးခြင်း၊ စီးပွားရေးဆိုင်ရာ နားလည်မှု။
7. Teamwork — အဖွဲ့လိုက်လုပ်ဆောင်ခြင်း၊ ပူးပေါင်းညှိနှိုင်းခြင်း။

မေးခွန်းတစ်ခုစီသည် ကိုယ့်ယုံကြည်မှု၊ အတွေ့အကြုံ၊ လုပ်ဖူးမှုနှင့် စိတ်ဝင်စားမှုကို မရောထွေးစေရ။ သက်ဆိုင်ရာအချက်ကို တိတိကျကျ ရှင်းပြရမည်။

**B. လက်တွေ့စမ်းသပ်မှု (Practical Tasks)**

- Skill တစ်ခုချင်းစီအတွက် အတိုချုံး လုပ်ဆောင်ချက် သို့မဟုတ် Scenario တစ်ခုစီ ထည့်ရန်။
- စတင်သူလည်း ဖြေနိုင်သည့်အဆင့်ဖြစ်ရမည်။
- အဖြေမှန်တစ်ခုတည်း ရှိသည့်အရာနှင့် အတွေးအခေါ်/လုပ်ငန်းစဉ်ကို စစ်ဆေးသည့်အရာကို ခွဲခြားရန်။
- အကဲဖြတ်မှုအတွက် Rubric ကို ကြိုတင်သတ်မှတ်ရန်။
- လက်တွေ့စမ်းသပ်မှု မလုပ်နိုင်သေးသူများအတွက် “နောက်မှလုပ်မည်” သို့မဟုတ် “မစမ်းသပ်ရသေး” ရွေးချယ်ခွင့် ထားရန်။

**Result:** ကိုယ်တိုင်သတ်မှတ်ထားသော ကျွမ်းကျင်မှုအဆင့်နှင့် လက်တွေ့စမ်းသပ်မှုရလဒ်ကို သီးခြားပြရန်။ နှစ်ခုကို ပေါင်းစပ်သုံးသပ်သော်လည်း “အတည်ပြုထားသော ကျွမ်းကျင်မှု” ဟု အလွန်အကျွံ မဖော်ပြရ။

---

## 6. Local-first Data Architecture

### 6.1 အခြေခံမူ

- Backend မလိုဘဲ Browser ထဲတွင် အသုံးပြုနိုင်ရမည်။
- LocalStorage ကို အသုံးပြုမည်။
- Assessment တစ်မျိုးစီ၏ Draft နှင့် History ကို သီးခြားထားမည်။
- Save မအောင်မြင်ပါက အသုံးပြုသူကို မျက်နှာပြင်ပေါ်တွင် ရှင်းလင်းစွာ အသိပေးရမည်။
- Data ကို အလိုအလျောက်ဖျက်ခြင်း မပြုရ။
- လက်ရှိ Storage Key `self-discovery-personality-v1` နှင့် လက်ရှိ `{ drafts, history }` Data ကို ဖတ်နိုင်သော Migration လမ်းကြောင်း ထားရမည်။

### 6.2 အကြံပြု Data Structure

အောက်ပါသည် Target Structure ဖြစ်ပြီး လက်ရှိ Data ကို တန်းအစားထိုးရန် မဟုတ်ပါ။ Migration နှင့် validation ပြီးမှ သုံးရမည်။

```json
{
  "schemaVersion": 2,
  "appVersion": "phase-1",
  "drafts": {
    "personality": { "30": {}, "60": {}, "120": {} },
    "careerInterest": { "30": {} },
    "skills": { "selfAssessment": {}, "practical": {} }
  },
  "history": {
    "personality": [],
    "careerInterest": [],
    "skills": []
  },
  "growth": {
    "weeklyPlans": [],
    "progressEntries": []
  },
  "settings": {
    "language": "my",
    "theme": "soft-psychology"
  }
}
```

မှတ်ချက်: လက်ရှိ Storage Layer တွင် `history` သည် array ဖြစ်နေသည်။ Migration လုပ်ရာတွင် မူလ array ကို မပျောက်စေဘဲ `assessmentType` အလိုက် အုပ်စုခွဲမည် သို့မဟုတ် backward-compatible getter တစ်ခုမှတစ်ဆင့် ဖတ်မည်။ Data အပြောင်းအလဲကို backup မရှိဘဲ တိုက်ရိုက်မလုပ်ရ။

### 6.3 Save / Resume စည်းမျဉ်းများ

- အဖြေတစ်ခု ရွေးချယ်ပြီးချိန်တွင် သိမ်းရန်။
- Skip, Previous, Next, Exit တို့တွင်လည်း state ကို သိမ်းရန်။
- Browser ကို မတော်တဆပိတ်သွားလျှင် နောက်တစ်ကြိမ်ဝင်ချိန်တွင် ဆက်ဖြေနိုင်ရန်။
- Assessment Type + Level + Draft ID ဖြင့် Draft ကို သီးခြားခွဲခြားရန်။
- Test အသစ်စတင်ခြင်းကြောင့် ယခင် History မပျောက်ရ။
- အဟောင်း Draft ကို update လုပ်မည်ဆိုလျှင် တူညီသော ID နှင့် version ကို သေချာစစ်ရန်။

---

## 7. JSON Backup / Restore Specification

### 7.1 Backup Export

- “ဒေတာ Backup ထုတ်မယ်” ခလုတ်တစ်ခု ထားရန်။
- Assessment Drafts, History, Growth Data, App Settings တို့ကို JSON ဖိုင်တစ်ခုတည်းအဖြစ် ထုတ်ရန်။
- ဖိုင်အမည်တွင် ရက်စွဲပါဝင်ရန်၊ ဥပမာ `self-discovery-backup-YYYY-MM-DD.json`။
- Export ပြီးလျှင် Backup အောင်မြင်ကြောင်း အသိပေးရန်။
- ဖိုင်ထဲတွင် Password, API Key, Secret မည်သည့်အရာမျှ မပါဝင်စေရ။

### 7.2 Restore Import

Import ကို ချက်ချင်းအစားထိုးခြင်း မလုပ်ရ။ အဆင့်လိုက် လုပ်ဆောင်ရမည်။

1. အသုံးပြုသူ JSON ဖိုင်ရွေးချယ်ခြင်း။
2. JSON ဖွဲ့စည်းပုံနှင့် `schemaVersion` စစ်ဆေးခြင်း။
3. မထောက်ပံ့သော version သို့မဟုတ် ပျက်စီးနေသော JSON ဖြစ်ပါက မပြောင်းလဲဘဲ ရပ်တန့်ခြင်း။
4. Import Preview ပြခြင်း — Draft အရေအတွက်၊ History အရေအတွက်၊ Export Date စသည်။
5. လက်ရှိ Data ကို အရင် Backup ထုတ်ရန် သတိပေးခြင်း။
6. “လက်ရှိဒေတာကို အစားထိုးမည်” သို့မဟုတ် “အသစ်များကို ပေါင်းထည့်မည်” ရွေးချယ်ခွင့်ပေးခြင်း။
7. အစားထိုးမည်ဆိုလျှင် အတည်ပြုချက် ထပ်တောင်းခြင်း။
8. Import အောင်မြင်ပြီးမှ UI ကို ပြန်လည် Refresh လုပ်ခြင်း။

### 7.3 Restore Safety Rules

- JSON ဖိုင်မမှန်လျှင် လက်ရှိ Data ကို လုံးဝမထိရ။
- Restore မတိုင်မီ လက်ရှိ Data ကို Backup လုပ်ရန် အကြံပြုရမည်။
- ID တူနေသော History များကို Duplicate မဖြစ်စေရ။
- Import မအောင်မြင်ပါက ယခင် Data ကို ပြန်လည်ထိန်းသိမ်းရမည်။
- အသုံးပြုသူသဘောတူညီချက်မရှိဘဲ Merge/Replace မလုပ်ရ။

---

## 8. Suggested Source Code Structure

```text
self-discovery/
├── public/
├── src/
│   ├── app/
│   │   ├── App.jsx
│   │   └── navigation.js
│   ├── components/
│   │   ├── layout/
│   │   ├── assessment/
│   │   └── common/
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── HistoryPage.jsx
│   │   └── DataManagementPage.jsx
│   ├── modules/
│   │   ├── personality/
│   │   ├── career-interest/
│   │   ├── skills/
│   │   └── personal-growth/
│   ├── data/
│   ├── services/
│   │   ├── storage/
│   │   │   ├── storage.js
│   │   │   ├── migration.js
│   │   │   └── backup.js
│   │   └── reports/
│   ├── utils/
│   ├── styles/
│   └── main.jsx
├── scripts/
├── package.json
└── README.md
```

ဖွဲ့စည်းပုံကို တစ်ခါတည်း အကုန်ပြောင်းရန် မလိုပါ။ လက်ရှိ V4 ဖိုင်များကို စစ်ဆေးပြီး အဆင့်လိုက် ရွှေ့ပြောင်းရမည်။ အလုပ်လုပ်နေသော Component များကို မလိုအပ်ဘဲ Rewrite မလုပ်ရ။

---

## 9. Phase Roadmap

| Phase | အလုပ် | ပြီးစီးမှုစံနှုန်း |
|---|---|---|
| Phase 1 | Home/Dashboard, module structure, LocalStorage migration, JSON Backup/Restore | မူလ Personality data မပျောက်၊ Backup/Restore စမ်းသပ်မှုအောင်မြင် |
| Phase 2 | Career Interest RIASEC 30 questions | Code 6 ခု၏ မေးခွန်း 5 ခုစီ၊ scoring / result validation |
| Phase 3 | Skills Self-Assessment + Practical Tasks | Rubric, save/resume, result separation |
| Phase 4 | Combined Report | Personality + Interest + Skills တို့ကို ခွဲခြားပြီး ပေါင်းစပ်ဖော်ပြနိုင်ခြင်း |
| Phase 5 | Personal Growth Weekly Plan | Weekly actions, completion tracking, review |
| Phase 6 | Secure AI Recommendation | Consent, server-side API key, input minimization, output validation |
| Phase 7 | Final QA & Deployment | Mobile/desktop, backup/restore, print/PDF, release checks |

---

## 10. Phase 1 Acceptance Criteria

Phase 1 ကို ပြီးစီးပြီဟု သတ်မှတ်ရန် အောက်ပါအချက်အားလုံး စမ်းသပ်အောင်မြင်ရမည်။

### Home / Dashboard

- [ ] Landing Introduction နှင့် Dashboard တစ်မျက်နှာတည်းတွင် ရှိရမည်။
- [ ] Assessment Card သုံးခုလုံး မြင်ရမည်။
- [ ] Personality Assessment ကို လက်ရှိလုပ်ဆောင်ချက်များ မပျက်ဘဲ ဖွင့်နိုင်ရမည်။
- [ ] Career Interest နှင့် Skills Module များကို မပြီးသေးသည့်အခြေအနေတွင် “တည်ဆောက်နေဆဲ” ဟု သေချာဖော်ပြရမည်။
- [ ] မပြီးသေးသော Assessment ရှိလျှင် Resume Card ပြရမည်။
- [ ] Recent History ကို ပြသနိုင်ရမည်။

### Data Safety

- [ ] လက်ရှိ V4 LocalStorage Data ကို ဖတ်နိုင်ရမည်။
- [ ] အဟောင်း Draft နှင့် History မပျောက်ရ။
- [ ] Assessment တစ်မျိုး၏ Draft က အခြား Module Draft ကို မအစားထိုးရ။
- [ ] Page refresh / Browser restart ပြီးနောက် Draft ဆက်ရှိရမည်။
- [ ] JSON Backup Export အောင်မြင်ရမည်။
- [ ] မှန်ကန်သော JSON Restore အောင်မြင်ရမည်။
- [ ] ပျက်စီးနေသော JSON Import လုပ်ရာတွင် မူလ Data မပြောင်းလဲရ။
- [ ] Merge / Replace ရွေးချယ်မှုများကို Preview နှင့် Confirm ပြီးမှ လုပ်ရမည်။

### UI / Accessibility

- [ ] Mobile 360px အကျယ်တွင် Horizontal Overflow မဖြစ်ရ။
- [ ] Button နှင့် စာသားများ ဖတ်ရှုရလွယ်ရမည်။
- [ ] အရောင်တစ်ခုတည်းဖြင့် အခြေအနေ မခွဲခြားရ; Text Label ပါဝင်ရမည်။
- [ ] မြန်မာစာလုံးပေါင်းနှင့် စကားအသုံးအနှုန်းကို ပြန်လည်စစ်ဆေးရမည်။

### Technical QA

- [ ] `npm run validate:assessment` အောင်မြင်ရမည်။
- [ ] `npm run build` အောင်မြင်ရမည်။
- [ ] Browser Console တွင် မဖြေရှင်းရသေးသော Error မရှိရ။
- [ ] Backup / Restore ကို အမှန်တကယ် Browser တွင် စမ်းသပ်ရမည်။

---

## 11. Data Privacy နှင့် ကန့်သတ်ချက်များ

- Data များသည် လက်ရှိအသုံးပြုနေသော Browser/Device ထဲတွင်သာ သိမ်းဆည်းထားမည်။
- Browser Data ရှင်းလင်းခြင်း၊ Device ပြောင်းခြင်း သို့မဟုတ် Storage ပျက်ခြင်းကြောင့် Data ပျောက်နိုင်သည်။ ထို့ကြောင့် Backup ထုတ်ရန် အသုံးပြုသူအား သတိပေးရမည်။
- Phase 1 တွင် Data များကို Server သို့ မပို့ရ။
- AI Integration ထည့်သည့်နောက်ပိုင်းတွင်လည်း User Consent နှင့် Data Minimization လိုအပ်သည်။
- Personality / Career / Skills ရလဒ်များသည် ကိုယ်ပိုင်ပြန်လည်သုံးသပ်ရေးအတွက်သာ ဖြစ်ပြီး စိတ်ကျန်းမာရေး Diagnosis၊ အလုပ်ရနိုင်မှုအာမခံချက် သို့မဟုတ် ကျွမ်းကျင်မှုအတည်ပြုလက်မှတ် မဟုတ်ပါ။

---

## 12. Implementation Order — Phase 1

1. V4 Project ကို Backup Copy အဖြစ် သိမ်းထားရန်။
2. လက်ရှိ `storage.js` နှင့် Data Shape ကို စစ်ဆေးရန်။
3. Backward-compatible Migration နှင့် Storage Service ကို တည်ဆောက်ရန်။
4. JSON Backup Export ကို တည်ဆောက်ပြီး Test လုပ်ရန်။
5. JSON Import Preview / Validate / Merge / Replace ကို တည်ဆောက်ရန်။
6. Home Page ကို Landing + Dashboard ပေါင်းစပ်ပုံစံဖြင့် ပြင်ဆင်ရန်။
7. Assessment Card သုံးခုနှင့် Resume / History Preview ထည့်ရန်။
8. Mobile UI နှင့် မြန်မာစာအသုံးအနှုန်း စစ်ဆေးရန်။
9. Legacy Data ပါသည့် Browser တွင် Migration, Backup, Restore စမ်းသပ်ရန်။
10. `npm run validate:assessment`, `npm run build` နှင့် Manual Browser QA အောင်မြင်မှ Phase 1 ပြီးစီးကြောင်း သတ်မှတ်ရန်။

---

## 13. Change Control — မပြောင်းလဲရမည့် အချက်များ

- လက်ရှိ Personality Assessment မေးခွန်းများ၊ မေးခွန်း ID များ၊ Reverse Scoring နှင့် အတည်ပြုထားသော Scoring Logic ကို အကြောင်းပြချက်မရှိဘဲ မပြောင်းရ။
- Auto Save, Skip, Resume, Review Skipped Questions, History နှင့် Print/PDF လုပ်ဆောင်ချက်များ မပျောက်ရ။
- မူလ LocalStorage Key ကို Migration Strategy မစမ်းသပ်ဘဲ မပြောင်းရ။
- Data Migration မလုပ်ခင် V4 ZIP သို့မဟုတ် JSON Backup ကို အရင်သိမ်းရန်။
- Module အသစ်တစ်ခုထည့်ရာတွင် အခြား Module ၏ Draft / History ကို overwrite မလုပ်ရ။
- AI API Key ကို Frontend Code သို့မဟုတ် Public Repository ထဲ မထည့်ရ။

---

## 14. Phase 1 အတွက် နောက်ဆုံးဆုံးဖြတ်ချက်

Phase 1 သည် အရင်ဆုံး Platform Foundation ကို ခိုင်မာစေရန် ဖြစ်သည်။ Career Interest နှင့် Skills Assessment တို့ကို Home Page မှ ဝင်ရောက်နိုင်မည့် Module အဖြစ် ပြင်ဆင်ထားမည်ဖြစ်သော်လည်း ၎င်းတို့၏ မေးခွန်းများနှင့် Scoring Engine ကို သီးခြား Phase များတွင် တည်ဆောက်မည်။

**အဓိကအောင်မြင်မှုစံနှုန်း:** Home Page အသစ်ကို သုံးနိုင်ခြင်း၊ လက်ရှိ Personality Test မပျက်ခြင်း၊ အချက်အလက်များ Local မှာ လုံခြုံစွာ ဆက်ရှိခြင်း၊ JSON Backup/Restore ကို မှန်ကန်စွာ ပြုလုပ်နိုင်ခြင်း။
