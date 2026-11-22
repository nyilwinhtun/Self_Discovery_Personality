/**
 * ValueMap original Burmese pilot self-reflection questionnaire.
 *
 * This is an owner-created, non-diagnostic Pilot Reflection (စမ်းသပ်မူကြမ်း).
 * It is not clinically or scientifically validated and is not a substitute for
 * professional guidance.
 */

export const VALUEMAP_VERSION = 'valuemap-pilot-0.1.0'
export const VALUEMAP_STATUS = 'pilot-mode-not-validated'

export const VALUEMAP_ANSWER_OPTIONS = [
  { value: 1, label: 'လုံးဝ မကိုက်ညီပါ' },
  { value: 2, label: 'အနည်းငယ်သာ ကိုက်ညီသည်' },
  { value: 3, label: 'တစ်ခါတစ်ရံ ကိုက်ညီသည်' },
  { value: 4, label: 'အတော်အသင့် ကိုက်ညီသည်' },
  { value: 5, label: 'အလွန် ကိုက်ညီသည်' },
]

export const VALUEMAP_DIMENSIONS = [
  {
    id: 'autonomy-freedom',
    code: 'VM1',
    name: 'လွတ်လပ်မှုနှင့် ကိုယ်ပိုင်ဆုံးဖြတ်ခွင့်',
    shortName: 'လွတ်လပ်မှုနှင့် ဆုံးဖြတ်ခွင့်',
    description: 'ကိုယ်ပိုင်စဉ်းစားဆုံးဖြတ်ခွင့်၊ ကိုယ့်လမ်းကြောင်းကို ကိုယ်တိုင်ရွေးချယ်လိုစိတ်နှင့် အချိန်/နေထိုင်မှု လွတ်လပ်မှုကို တန်ဖိုးထားပုံကို ပြန်လည်သုံးသပ်ခြင်း။',
  },
  {
    id: 'stability-security',
    code: 'VM2',
    name: 'တည်ငြိမ်မှုနှင့် လုံခြုံမှု',
    shortName: 'တည်ငြိမ်မှုနှင့် လုံခြုံမှု',
    description: 'စိတ်ချရသော နေ့စဉ်စနစ်၊ ငွေကြေး/ဘဝအခြေအနေ ခိုင်မာမှုနှင့် ကြိုတင်စီစဉ်ထားနိုင်မှုကို တန်ဖိုးထားပုံကို ပြန်လည်သုံးသပ်ခြင်း။',
  },
  {
    id: 'growth-curiosity',
    code: 'VM3',
    name: 'တိုးတက်သင်ယူမှုနှင့် ဖန်တီးနိုင်စွမ်း',
    shortName: 'တိုးတက်သင်ယူမှု',
    description: 'အသစ်အဆန်းများ လေ့လာလိုစိတ်၊ ကိုယ်ပိုင်စွမ်းရည် မြှင့်တင်လိုစိတ်နှင့် စိတ်ကူးသစ်များ စမ်းသပ်ဖန်တီးလိုစိတ်ကို ပြန်လည်သုံးသပ်ခြင်း။',
  },
  {
    id: 'connection-contribution',
    code: 'VM4',
    name: 'မေတ္တာနှင့် အကျိုးပြုမှု',
    shortName: 'မေတ္တာနှင့် အကျိုးပြုမှု',
    description: 'မိသားစု၊ မိတ်ဆွေနှင့် ပတ်ဝန်းကျင်အပေါ် ဂရုစိုက်မှု၊ အတူတကွ မျှဝေကူညီမှုနှင့် အများအတွက် အကျိုးပြုလိုစိတ်ကို ပြန်လည်သုံးသပ်ခြင်း။',
  },
]

export const VALUEMAP_QUESTIONS_20 = [
  {
    id: 'vm-01',
    dimensionId: 'autonomy-freedom',
    reverse: false,
    text: 'ဘဝရဲ့ အရေးကြီးတဲ့ ဆုံးဖြတ်ချက်တွေကို သူများအလိုကျထက် ကိုယ့်စိတ်ကြိုက် ရွေးချယ်ဆုံးဖြတ်ရတာကို ပိုတန်ဖိုးထားပါတယ်။',
  },
  {
    id: 'vm-02',
    dimensionId: 'stability-security',
    reverse: false,
    text: 'မနက်ဖြန် ဘာဖြစ်မလဲ မသေချာတဲ့ အခြေအနေထက် စိတ်ချရပြီး တည်ငြိမ်တဲ့ နေ့စဉ်ပုံစံကို ပိုနှစ်သက်ပါတယ်။',
  },
  {
    id: 'vm-03',
    dimensionId: 'growth-curiosity',
    reverse: false,
    text: 'ကိုယ်မကျွမ်းကျင်သေးတဲ့ ပညာရပ် သို့မဟုတ် အတွေးအခေါ်အသစ်တွေကို စမ်းသပ်သင်ယူနေရရင် စိတ်အားတက်ကြွတတ်ပါတယ်။',
  },
  {
    id: 'vm-04',
    dimensionId: 'connection-contribution',
    reverse: false,
    text: 'ကိုယ့်လုပ်ဆောင်မှုတစ်ခုခုက အခြားသူတစ်ဦးအတွက် အထောက်အကူဖြစ်သွားရင် ကျေနပ်ပီတိ ဖြစ်မိပါတယ်။',
  },
  {
    id: 'vm-05',
    dimensionId: 'autonomy-freedom',
    reverse: true,
    text: 'ကိုယ်တိုင် ဆုံးဖြတ်ရတာထက် ယုံကြည်ရသူတစ်ဦးက လမ်းညွှန်သတ်မှတ်ပေးတဲ့အတိုင်း လိုက်လုပ်ရတာကို ပိုစိတ်အေးပါတယ်။',
  },
  {
    id: 'vm-06',
    dimensionId: 'stability-security',
    reverse: false,
    text: 'အလုပ် သို့မဟုတ် ဘဝအစီအစဉ် ရွေးချယ်တဲ့အခါ ရေရှည်ခိုင်မာမှုနဲ့ လုံခြုံမှုကို ဦးစားပေး စဉ်းစားတတ်ပါတယ်။',
  },
  {
    id: 'vm-07',
    dimensionId: 'growth-curiosity',
    reverse: true,
    text: 'လက်ရှိတတ်ထားပြီးသား နည်းလမ်းနဲ့ အဆင်ပြေနေရင် အသစ်ထပ်သင်ဖို့ သိပ်စိတ်မပါတတ်ပါဘူး။',
  },
  {
    id: 'vm-08',
    dimensionId: 'connection-contribution',
    reverse: false,
    text: 'ကိုယ်ပိုင်အောင်မြင်မှုထက် ချစ်ခင်ရသူတွေနဲ့ အချိန်အတူကုန်ဆုံးရတာ၊ နွေးထွေးစွာ ရှိနေရတာကို ပိုတန်ဖိုးထားပါတယ်။',
  },
  {
    id: 'vm-09',
    dimensionId: 'autonomy-freedom',
    reverse: false,
    text: 'အလုပ် သို့မဟုတ် နေ့စဉ်ဘဝမှာ ကိုယ့်အချိန်ကို ကိုယ်တိုင်စီမံခန့်ခွဲခွင့် ရှိတာဟာ ကျွန်တော့်/ကျွန်မအတွက် အလွန်အရေးကြီးပါတယ်။',
  },
  {
    id: 'vm-10',
    dimensionId: 'stability-security',
    reverse: true,
    text: 'အပြောင်းအလဲများပြီး ကြိုတင်ခန့်မှန်းရခက်တဲ့ အခြေအနေတွေမှာ နေရတာကို စိတ်လှုပ်ရှားစရာအဖြစ် ပိုသဘောကျပါတယ်။',
  },
  {
    id: 'vm-11',
    dimensionId: 'growth-curiosity',
    reverse: false,
    text: 'ပြဿနာတစ်ခုကို ဖြေရှင်းတဲ့အခါ ပုံမှန်နည်းလမ်းအပြင် ကိုယ်ပိုင်စိတ်ကူးသစ်နဲ့ ဖန်တီးဖြေရှင်းကြည့်ရတာကို နှစ်သက်ပါတယ်။',
  },
  {
    id: 'vm-12',
    dimensionId: 'connection-contribution',
    reverse: true,
    text: 'အများစုအချိန်တွေမှာ အခြားသူတွေနဲ့ တွဲဖက်လုပ်ဆောင်တာထက် ကိုယ့်ကိစ္စကိုယ် သီးသန့်အာရုံစိုက်ရတာကို ပိုနှစ်သက်ပါတယ်။',
  },
  {
    id: 'vm-13',
    dimensionId: 'autonomy-freedom',
    reverse: true,
    text: 'ပတ်ဝန်းကျင်ရဲ့ မျှော်လင့်ချက်နဲ့ စည်းမျဉ်းတွေကို မကျော်လွန်ဘဲ လိုက်လျောညီထွေ နေထိုင်ရတာကို ပိုအရေးထားပါတယ်။',
  },
  {
    id: 'vm-14',
    dimensionId: 'stability-security',
    reverse: false,
    text: 'အရေးပေါ်အခြေအနေအတွက် ကြိုတင်ပြင်ဆင်ထားနိုင်မှုနဲ့ စိတ်ချရတဲ့ အရန်အစီအစဉ်ရှိမှုက စိတ်ငြိမ်းချမ်းမှု ပေးပါတယ်။',
  },
  {
    id: 'vm-15',
    dimensionId: 'growth-curiosity',
    reverse: false,
    text: 'မနေ့ကထက် ဒီနေ့မှာ ကိုယ့်အရည်အချင်း သို့မဟုတ် နားလည်မှု တစ်ခုခု တိုးတက်လာအောင် အမြဲကြိုးစားချင်ပါတယ်။',
  },
  {
    id: 'vm-16',
    dimensionId: 'connection-contribution',
    reverse: false,
    text: 'ကိုယ့်ပတ်ဝန်းကျင် သို့မဟုတ် အသိုင်းအဝိုင်းအတွက် ကောင်းမွန်တဲ့ ပြောင်းလဲမှုတစ်ခုခုမှာ ပါဝင်ခွင့်ရရင် တန်ဖိုးရှိတယ်လို့ ခံစားရပါတယ်။',
  },
  {
    id: 'vm-17',
    dimensionId: 'autonomy-freedom',
    reverse: false,
    text: 'တခြားသူတွေနဲ့ မတူညီရင်တောင် ကိုယ်ယုံကြည်ရာ တန်ဖိုးအတိုင်း လွတ်လပ်စွာ ရပ်တည်ချင်စိတ် ရှိပါတယ်။',
  },
  {
    id: 'vm-18',
    dimensionId: 'stability-security',
    reverse: true,
    text: 'ရေရှည်တည်ငြိမ်မှုထက် လတ်တလော စိတ်ဝင်စားစရာ အတွေ့အကြုံအသစ်တွေ ရဖို့ကို ပိုဦးစားပေးတတ်ပါတယ်။',
  },
  {
    id: 'vm-19',
    dimensionId: 'growth-curiosity',
    reverse: true,
    text: 'အမှားဖြစ်နိုင်ခြေရှိတဲ့ အရာအသစ်တွေကို စမ်းကြည့်တာထက် သေချာပြီးသား အလုပ်ကိုပဲ ဆက်လုပ်ချင်ပါတယ်။',
  },
  {
    id: 'vm-20',
    dimensionId: 'connection-contribution',
    reverse: true,
    text: 'ကိုယ့်ဘဝရဲ့ ဦးတည်ချက်ကို စဉ်းစားတဲ့အခါ အခြားသူတွေရဲ့ လိုအပ်ချက်ထက် ကိုယ့်တစ်ဦးချင်း ရည်မှန်းချက်ကိုပဲ အဓိကထားတတ်ပါတယ်။',
  },
]
