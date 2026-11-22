# Self Discovery — Antigravity သို့ ပြောင်းရွှေ့အသုံးပြုရန်

ဒီ Kit ထဲမှာ ဖိုင် ၃ ခု ပါဝင်ပါတယ်။

1. `AGENTS.md` — Antigravity အတွက် အဓိက Project Rules ဖြစ်ပါတယ်။ Project Root မှာ ထည့်ထားပါ။
2. `.cursorrules` — Cursor နဲ့ အခြား editor compatibility အတွက် ထိန်းထားတဲ့ legacy rules ဖိုင်ပါ။ Antigravity ရဲ့ အဓိက rules ဖိုင် မဟုတ်ပါ။
3. `ANTIGRAVITY_START_PROMPT.md` — Antigravity Agent အသစ်ဖွင့်ပြီး ပထမဆုံး ပေးရမယ့် read-only audit prompt ပါ။

## အရေးကြီးတဲ့ မှတ်ချက်

Google Antigravity ရဲ့ လက်ရှိ Documentation အရ workspace rules အတွက် `AGENTS.md`, `GEMINI.md`, သို့မဟုတ် `.agents/rules/*.md` ကို အသုံးပြုနိုင်ပါတယ်။ ဒါကြောင့် Antigravity အတွက် `AGENTS.md` ကို အဓိကအသုံးပြုပါ။ `.cursorrules` ကို Antigravity က အလိုအလျောက်ဖတ်မယ်လို့ မယူဆပါနဲ့။

Cursor Documentation မှာလည်း `.cursorrules` ကို legacy format အဖြစ် သတ်မှတ်ပြီး `.cursor/rules/` သို့မဟုတ် `AGENTS.md` ကို အသုံးပြုဖို့ အကြံပြုထားပါတယ်။

## ဘယ်လိုထည့်မလဲ

1. GitHub Desktop မှာ Current Repository ကို `Self_Discovery_Personality` လို့ စစ်ပါ။
2. `Repository → Show in Finder` ကိုနှိပ်ပြီး မှန်ကန်တဲ့ repository folder ကို ဖွင့်ပါ။
3. အရင်ဆုံး လက်ရှိအခြေအနေကို Backup လုပ်ထားပါ။
4. ဒီ Kit ထဲက `AGENTS.md` နဲ့ `.cursorrules` ကို repository root ထဲ ထည့်ပါ။
5. Antigravity ကိုဖွင့်ပြီး အဲဒီ `Self_Discovery_Personality` root folder ကို Open လုပ်ပါ။
6. Agent panel မှာ `ANTIGRAVITY_START_PROMPT.md` ကိုဖွင့်ပြီး prompt အပိုင်းကို ကူးထည့်ပါ။
7. ပထမအကြိမ်မှာ audit/read-only task သာ လုပ်ခိုင်းပါ။ Audit ရလဒ်ကို owner က စစ်ပြီးမှ Code ပြင်ခွင့်ပေးပါ။

## မလုပ်သင့်တာ

- `Restaurant`, `expense-tracker`, ZIP extract folder, `_BACKUP` folder ကို workspace အဖြစ် မဖွင့်ပါနဲ့။
- ပထမဆုံး audit မပြီးမချင်း ZIP အသစ်တွေကူးထည့်ခြင်း၊ code ပြင်ခြင်း၊ Commit/Push လုပ်ခြင်း မလုပ်ပါနဲ့။
- `AGENTS.md` နဲ့ `.cursorrules` ထည့်ခြင်းက app code ကို မပြင်ပါ။ ဒါပေမဲ့ repository ထဲမှာ ထည့်လိုက်ရင် GitHub Desktop မှာ new files အဖြစ် ပေါ်လာနိုင်ပါတယ်။ Owner ခွင့်ပြုမှသာ commit/push လုပ်ပါ။
