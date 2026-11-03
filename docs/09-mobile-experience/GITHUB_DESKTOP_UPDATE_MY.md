# v1.11.1 Mobile Update ကို GitHub Desktop မှ တင်သွင်းရန်

ဤ ZIP သည် Self Discovery Project ၏ Full Merged Update ဖြစ်သည်။ အတွင်းရှိ `src`, `docs`, `scripts`, `public` နှင့် Root ဖိုင်များကို v1.11.1 အဖြစ် ပေါင်းစည်းထားသည်။

## မပြောင်းရမည့်အရာများ

- လက်ရှိ Repository ၏ `.git` folder
- လက်ရှိ Repository ၏ `.github` folder (GitHub Actions workflow)
- `node_modules`
- `package-lock.json`
- သင့်စက်ထဲရှိ JSON Backup ဖိုင်များ

ဤ ZIP ထဲတွင် `.git`, `.github`, `node_modules`, `package-lock.json` မပါဝင်ပါ။

## Update လုပ်နည်း

1. မူလ `Self_Discovery_Personality` folder ကို Backup ပြုလုပ်ပါ။
2. ZIP ကို ဖြည်ပြီး အတွင်းဆုံး `Self_Discovery_Personality_v1.11.1` folder ကို ဖွင့်ပါ။
3. အတွင်းရှိ Project ဖိုင်/Folder အားလုံးကို ရွေးပြီး Copy လုပ်ပါ။
4. GitHub Desktop → Repository → Show in Finder မှ မူလ `Self_Discovery_Personality` folder ကို ဖွင့်ပြီး Paste လုပ်ပါ။
5. Finder က `docs`, `src`, `scripts`, `public` သို့မဟုတ် Root ဖိုင်များ အစားထိုးမလား မေးလျှင် ဤ Full Merged ZIP သည် v1.11.0 မှ ဆက်လက်တည်ဆောက်ထားသည့် Project ဖြစ်သောကြောင့် Replace လုပ်နိုင်သည်။
6. `.git` သို့မဟုတ် `.github` ကို အစားထိုးရန် မေးလာပါက Stop လုပ်ပါ။ ဤ ZIP တွင် မပါသင့်သော Folder များဖြစ်သည်။
7. GitHub Desktop → Changes တွင် ပြောင်းလဲထားသောဖိုင်များကို စစ်ဆေးပါ။
8. `npm run validate:all` နှင့် `npm run build` ကို Local တွင် ရနိုင်လျှင် စမ်းပါ။ ထို့နောက် Commit / Push လုပ်ပြီး GitHub Actions အစိမ်းရောင်ဖြစ်ကြောင်း အတည်ပြုပါ။

## Version 1.11.1 တွင် ပါဝင်သည့် Mobile UX

- Home / Assessment / Knowledge Center / History အောက်ခြө Navigation
- TraitLens, InnerCompass, Career Interest မေးခွန်းဖြေဆိုရာတွင် fixed Previous / Next / Skip / Question List controls
- TraitLens နှင့် InnerCompass Report အပိုင်းလိုက် Navigation
- iPhone/Android safe-area inset ပံ့ပိုးမှု
