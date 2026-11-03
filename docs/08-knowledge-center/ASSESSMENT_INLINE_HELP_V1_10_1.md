# Knowledge Center — Assessment Inline Help

**Version:** 1.10.1-beta.1  
**Date:** 2026-11-03  
**Status:** Beta implementation

## ရည်ရွယ်ချက်

TraitLens နှင့် InnerCompass မေးခွန်းအချို့တွင် မေးခွန်းနှင့် တိုက်ရိုက်သက်ဆိုင်သော Knowledge Center ဝေါဟာရများကို `ⓘ` ခလုတ်ဖြင့် ဖတ်ရှုနိုင်စေရန် ဖြစ်သည်။ အသုံးပြုသူသည် Assessment စာမျက်နှာမှ မထွက်ဘဲ အဓိပ္ပာယ်၊ နေ့စဉ်ဘဝ ဥပမာ၊ ဆင်တူစကားလုံးနှင့် ကွာခြားချက်၊ သတိပြုရန်နှင့် ရင်းမြစ်များကို ကြည့်နိုင်သည်။

## Implementation

- `src/components/KnowledgeInlineHelp.jsx` သည် မေးခွန်းအတွက် သက်ဆိုင်ရာ စကားလုံးများကို ပြသသည်။
- `src/utils/knowledgeQuestionLinks.js` တွင် မေးခွန်းစာသားနှင့် glossary ID များကို လက်ဖြင့် သတ်မှတ်ထားသည်။ Broad keyword matching မသုံးဘဲ မသက်ဆိုင်သော အဓိပ္ပာယ်မပေါ်စေရန် စည်းမျဉ်းများကို တိကျစွာ သတ်မှတ်ထားသည်။
- Help content သည် `src/data/knowledgeGlossaryDraftV01.json` ကို ပြန်လည်အသုံးပြုသည်။ အဓိပ္ပာယ်နှင့် ရင်းမြစ်များကို component ထဲတွင် ထပ်မံ hard-code မလုပ်ထားပါ။
- TraitLens နှင့် InnerCompass တို့တွင် သီးခြားအရောင်အသွေးဖြင့် ပြသထားသည်။
- မေးခွန်းတစ်ခုတွင် သက်ဆိုင်ရာ စကားလုံးမရှိပါက help control မပြပါ။
- မေးခွန်းတစ်ခုအတွက် အများဆုံး ဝေါဟာရ ၂ ခုကိုသာ ပြသသည်။

## Data safety and scoring

ဤ feature သည် ဖတ်ရှုရန် အကူအညီသာဖြစ်သည်။ အောက်ပါအရာများကို မပြောင်းလဲပါ။

- Question wording / IDs / order
- Answer options
- Scoring, reverse-scoring, score bands
- Draft and History storage
- LocalStorage keys
- JSON Backup / Restore format and merge behavior

## Content status

Glossary entries အားလုံးသည် Draft 0.1.0 ဖြစ်သည်။ မြန်မာဘာသာကျွမ်းကျင်သူနှင့် အရည်အချင်းပြည့်မီသော စိတ်ပညာပညာရှင်တို့၏ စစ်ဆေးမှု မပြီးသေးသဖြင့် `မူကြမ်း` နှင့် `ကျွမ်းကျင်သူစစ်ဆေးမှု မပြီးသေးပါ` ဟူသော သတိပေးချက်ကို Help dialog ထဲတွင် ပြသရမည်။

## Validation

`npm run validate:knowledge-links` သည်—

- Mapping ID များ glossary ထဲတွင် ရှိမရှိ
- Mapping တစ်ခုစီတွင် keyword ရှိမရှိ
- TraitLens 30/60/120 နှင့် InnerCompass တွင် help mapping အလုပ်လုပ်မလုပ်

တို့ကို စစ်ဆေးသည်။
