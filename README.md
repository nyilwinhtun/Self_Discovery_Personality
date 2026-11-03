# POS & Restaurant Analytics (React + Vite + Tailwind CSS + PWA)

React.js, Tailwind CSS, Vite တို့ဖြင့် တည်ဆောက်ထားသော စားသောက်ဆိုင်သုံး POS & Sales Analysis စနစ်ဖြစ်ပါသည်။

## 🌟 အသစ်ထည့်သွင်းပေးထားသော အဓိက လုပ်ဆောင်ချက်များ (New Features)

1. **စိတ်ကြိုက် ဆိုင်အမည် သတ်မှတ်နိုင်ခြင်း (Custom Store Name):**
   - မူရင်း သတ်မှတ်ထားသော အမည်များ မဟုတ်ဘဲ မိမိဆိုင်အမည်ကို Header ရှိ ခဲတံပုံစံ (✏️) icon ကို နှိပ်၍သော်လည်းကောင်း၊ ဆက်တင် (Settings) tab မှသော်လည်းကောင်း အချိန်မရွေး လွတ်လပ်စွာ ပြောင်းလဲနိုင်ပါသည်။
   - ဘောက်ချာပြေစာ၊ Header နှင့် App နေရာတိုင်းတွင် သင့်ဆိုင်အမည်ဖြင့်သာ ပြသပေးပါမည်။

2. **တစ်ရက်စာ ရောင်းအား ခွဲခြမ်းစိတ်ဖြာမှု (Daily Sales & Time Analysis):**
   - **Date Filter:** ယနေ့ (Today)၊ မနေ့က (Yesterday)၊ ပြီးခဲ့သည့် ၇ ရက်၊ ဤလ (This Month) သို့မဟုတ် ပြက္ခဒိန်မှ ရက်စွဲရွေးချယ်ပြီး ထိုရက်အတွက် ရောင်းအားကို သီးသန့်ကြည့်ရှုနိုင်ခြင်း။
   - **ထိုနေ့တွင် အရောင်းရဆုံး မီနူးများ (Top Best Sellers):** မည်သည့်မီနူးသည် မည်မျှအရေအတွက်နှင့် မည်မျှတန်ဖိုး ရောင်းချခဲ့ရသည်ကို ရာခိုင်နှုန်း bar များဖြင့် ပြသပေးခြင်း။
   - **အချိန်အလိုက် ရောင်းအား (Time of Day Breakdown):** မနက်ခင်း (6AM-12PM)၊ နေ့လယ် (12PM-5PM)၊ ညနေ (5PM-10PM)၊ ည (10PM-6AM) မည်သည့်အချိန်တွင် ရောင်းအားအကောင်းဆုံးဖြစ်သည်ကို ခွဲခြမ်းစိတ်ဖြာပေးခြင်း။
   - **ရက်အလိုက် စာရင်း (Daily Summary Table):** ရက်စွဲတစ်ခုချင်းစီအလိုက် ဘောက်ချာအရေအတွက်နှင့် ရောင်းရငွေ အနှစ်ချုပ်။

3. **Demo Data အားလုံးကို ဖျက်ပစ်နိုင်ခြင်း (Clean Slate / Clear Demo Data):**
   - မီနူးစီမံရန် (Menu) tab တွင် **"Demo Data အားလုံးဖျက်မည်"** ခလုတ်ပါဝင်ပြီး မူလပါရှိသော demo မီနူးများကို ၁ ချက်နှိပ်ရုံဖြင့် အကုန်ဖျက်ကာ သင့်စိတ်ကြိုက် မီနူးအသစ်များကို စတင်ထည့်သွင်းနိုင်ပါသည်။
   - မလိုအပ်သော Category နှင့် Menu Item များကိုလည်း အချိန်မရွေး အလွယ်တကူ ဖျက်ပစ်နိုင်ပါသည်။

4. **GitHub Pages White Screen Fix ပါဝင်ပြီးဖြစ်ခြင်း:**
   - `vite.config.js` တွင် `base: './'` သတ်မှတ်ပေးထားပြီး `.github/workflows/deploy.yml` ပါဝင်သောကြောင့် GitHub သို့ push လိုက်ရုံဖြင့် စာမျက်နှာအဖြူမဖြစ်ဘဲ အလိုအလျောက် သပ်ရပ်စွာ ပေါ်လာမည်ဖြစ်ပါသည်။

5. **အခြား စွမ်းဆောင်ရည်များ:**
   - Mobile-First Bottom Navigation (အောက်ခြေမှ အလွယ်တကူနှိပ်နိုင်သော စနစ်)
   - Custom PWA Install Banner (အင်တာနက်မလိုဘဲ ဖုန်းထဲသို့ App အဖြစ် သွင်းယူနိုင်ခြင်း)
   - 58mm Thermal Receipt Printing & Web Bluetooth ESC/POS ပရင်တာ ချိတ်ဆက်မှု
   - Light, Dark, Warm, Green Theme ၄ မျိုးနှင့် မြန်မာ/English ၂ ဘာသာ

---

## 🚀 VS Code တွင် စတင်အသုံးပြုနည်း

1. ဒေါင်းလုဒ်လုပ်ထားသော Zip ဖိုင်ကို ဖြည် (Extract) ပါ။
2. VS Code ဖြင့် Folder ကို ဖွင့်ပြီး Terminal တွင် အောက်ပါ command များကို ရိုက်ပါ-
   ```bash
   npm install
   npm run dev
   ```
3. Browser တွင် `http://localhost:3000` ဖြင့် စတင်အသုံးပြုနိုင်ပါပြီ။

---

## 🌐 GitHub Pages သို့ အလွယ်တကူ တင်နည်း

1. VS Code Terminal တွင် အောက်ပါအတိုင်း push လုပ်ပါ-
   ```bash
   git add .
   git commit -m "Updated POS with customizable name, daily analysis and demo clearing"
   git push
   ```
2. GitHub Repository သို့ သွားပါ > **Settings** > **Pages** သို့ သွားပါ။
3. **Build and deployment** အောက်ရှိ **Source** တွင် **`GitHub Actions`** ကို ရွေးချယ်ပေးလိုက်ရုံဖြင့် အလိုအလျောက် Build လုပ်ပြီး Online ပေါ်သို့ တင်ပေးသွားပါမည်။
