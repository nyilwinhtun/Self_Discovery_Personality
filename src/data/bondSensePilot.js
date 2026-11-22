/**
 * BondSense original Burmese pilot self-reflection questionnaire.
 *
 * This is an owner-created, non-diagnostic Pilot Reflection (စမ်းသပ်မူကြမ်း).
 * It is not clinically or scientifically validated and is not a substitute for
 * professional mental-health or relationship care.
 */

export const BONDSENSE_VERSION = 'bondsense-pilot-0.1.0'
export const BONDSENSE_STATUS = 'pilot-mode-not-validated'

export const BONDSENSE_ANSWER_OPTIONS = [
  { value: 1, label: 'လုံးဝ မကိုက်ညီပါ' },
  { value: 2, label: 'အနည်းငယ်သာ ကိုက်ညီသည်' },
  { value: 3, label: 'တစ်ခါတစ်ရံ ကိုက်ညီသည်' },
  { value: 4, label: 'အတော်အသင့် ကိုက်ညီသည်' },
  { value: 5, label: 'အလွန် ကိုက်ညီသည်' },
]

export const BONDSENSE_DIMENSIONS = [
  {
    id: 'trust-openness',
    code: 'BS1',
    name: 'ယုံကြည်မှုနှင့် ဖွင့်ဟပြောဆိုမှု',
    shortName: 'ယုံကြည်မှုနှင့် ဖွင့်ဟမှု',
    description: 'ရင်းနှီးသူများနှင့် စိတ်ချလက်ချ ဆက်ဆံနိုင်ပုံ၊ ခံစားချက်နှင့် အတွေးများကို ရိုးသားပွင့်လင်းစွာ မျှဝေပုံကို ပြန်လည်သုံးသပ်ခြင်း။',
  },
  {
    id: 'healthy-boundaries',
    code: 'BS2',
    name: 'ကိုယ်ပိုင်နယ်နိမိတ် ထိန်းသိမ်းမှု',
    shortName: 'ကိုယ်ပိုင်နယ်နိမိတ်',
    description: 'ကိုယ့်စိတ်အားအင်နှင့် အချိန်ကို လေးစားပုံ၊ မဖြစ်နိုင်သည့်အရာကို ယဉ်ကျေးစွာ ငြင်းဆိုနိုင်ပုံနှင့် သူတစ်ပါး၏ နယ်နိမိတ်ကို လေးစားပုံကို ပြန်လည်သုံးသပ်ခြင်း။',
  },
  {
    id: 'empathy-listening',
    code: 'BS3',
    name: 'စာနာနားလည်မှုနှင့် နားထောင်ပေးမှု',
    shortName: 'စာနာနားထောင်မှု',
    description: 'အခြားသူပြောစကားကို အာရုံစိုက်နားထောင်ပုံ၊ ချက်ချင်း အကဲဖြတ်မပစ်ဘဲ သူ့အမြင်နှင့် ခံစားချက်ကို နားလည်ရန် ကြိုးစားပုံကို ပြန်လည်သုံးသပ်ခြင်း။',
  },
  {
    id: 'conflict-navigation',
    code: 'BS4',
    name: 'သဘောထားကွဲလွဲမှု ကိုင်တွယ်ပုံ',
    shortName: 'သဘောထားကွဲလွဲမှု ကိုင်တွယ်ပုံ',
    description: 'စိတ်အနှောင့်အယှက်ဖြစ်ချိန် သို့မဟုတ် အမြင်မတူချိန်တွင် စိတ်ငြိမ်အောင် ထိန်းညှိပုံ၊ ပြဿနာကို ရှောင်လွှဲမနေဘဲ ညှိနှိုင်းဖြေရှင်းပုံကို ပြန်လည်သုံးသပ်ခြင်း။',
  },
]

export const BONDSENSE_QUESTIONS_20 = [
  {
    id: 'bs-01',
    dimensionId: 'trust-openness',
    reverse: false,
    text: 'စိတ်ထဲမှာ ခံစားနေရတာတွေကို ယုံကြည်ရသူတစ်ဦးထံ ရိုးရိုးသားသား ဖွင့်ပြောနိုင်ပါတယ်။',
  },
  {
    id: 'bs-02',
    dimensionId: 'healthy-boundaries',
    reverse: false,
    text: 'ကိုယ်တကယ် မလုပ်နိုင်တဲ့ အကူအညီကို တောင်းခံလာရင် အားမနာဘဲ ယဉ်ကျေးစွာ ငြင်းဆိုနိုင်ပါတယ်။',
  },
  {
    id: 'bs-03',
    dimensionId: 'empathy-listening',
    reverse: false,
    text: 'တစ်ဖက်သား စကားပြောနေချိန်မှာ ကြားဖြတ်မပြောဘဲ သူပြောချင်တာကို အဆုံးထိ နားထောင်ပေးတတ်ပါတယ်။',
  },
  {
    id: 'bs-04',
    dimensionId: 'conflict-navigation',
    reverse: false,
    text: 'အမြင်မတူလို့ စကားများရတဲ့အခါ ဘယ်သူမှန်သလဲဆိုတာထက် နှစ်ဖက်အဆင်ပြေမယ့် နည်းလမ်းကို ရှာတတ်ပါတယ်။',
  },
  {
    id: 'bs-05',
    dimensionId: 'trust-openness',
    reverse: true,
    text: 'အကူအညီ သို့မဟုတ် အားပေးမှု လိုအပ်နေချိန်မှာတောင် အခြားသူကို ဖွင့်ပြောဖို့ တွန့်ဆုတ်နေတတ်ပါတယ်။',
  },
  {
    id: 'bs-06',
    dimensionId: 'healthy-boundaries',
    reverse: true,
    text: 'တစ်ဖက်သား စိတ်မကောင်းဖြစ်မှာစိုးလို့ ကိုယ်မနှစ်သက်တဲ့ ကိစ္စတွေကို မငြင်းဘဲ လက်ခံလိုက်ရတာ များပါတယ်။',
  },
  {
    id: 'bs-07',
    dimensionId: 'empathy-listening',
    reverse: false,
    text: 'တစ်စုံတစ်ယောက် စိတ်ညစ်နေချိန်မှာ ချက်ချင်း အကြံဉာဏ်ပေးတာထက် သူ့ခံစားချက်ကို အရင်နားလည်ပေးဖို့ ကြိုးစားပါတယ်။',
  },
  {
    id: 'bs-08',
    dimensionId: 'conflict-navigation',
    reverse: true,
    text: 'စိတ်ဆိုးစရာ သို့မဟုတ် မကျေနပ်စရာ ရှိလာတဲ့အခါ မပြောဘဲ ရက်အတော်ကြာ စိတ်ထဲသိမ်းထားတတ်ပါတယ်။',
  },
  {
    id: 'bs-09',
    dimensionId: 'trust-openness',
    reverse: false,
    text: 'ရင်းနှီးတဲ့ ဆက်ဆံရေးတစ်ခုမှာ ကိုယ့်ရဲ့ အားနည်းချက်နဲ့ စိုးရိမ်ပူပန်မှုတွေကို ဖုံးကွယ်မထားဘဲ မျှဝေနိုင်ပါတယ်။',
  },
  {
    id: 'bs-10',
    dimensionId: 'healthy-boundaries',
    reverse: false,
    text: 'ကိုယ်ပိုင်အချိန်နဲ့ အနားယူချိန် လိုအပ်တဲ့အခါ အခြားသူတွေကို ပွင့်ပွင့်လင်းလင်း အသိပေးတတ်ပါတယ်။',
  },
  {
    id: 'bs-11',
    dimensionId: 'empathy-listening',
    reverse: true,
    text: 'တခြားသူရဲ့ အခက်အခဲကို နားထောင်နေရင်း ကိုယ့်အတွေ့အကြုံ သို့မဟုတ် ကိုယ့်အမြင်ကိုပဲ ဦးစားပေး ပြောမိတတ်ပါတယ်။',
  },
  {
    id: 'bs-12',
    dimensionId: 'conflict-navigation',
    reverse: false,
    text: 'စိတ်လှုပ်ရှားနေချိန်မှာ စကားကြမ်းကြမ်း မပြောမိအောင် ခဏနားပြီး စိတ်ငြိမ်မှ ပြန်ဆွေးနွေးတတ်ပါတယ်။',
  },
  {
    id: 'bs-13',
    dimensionId: 'trust-openness',
    reverse: true,
    text: 'ရင်းနှီးသူတွေအပေါ်မှာတောင် သူတို့ စိတ်ပြောင်းသွားမလားဆိုပြီး အပြည့်အဝ ယုံကြည်ဖို့ ခက်ခဲတတ်ပါတယ်။',
  },
  {
    id: 'bs-14',
    dimensionId: 'healthy-boundaries',
    reverse: false,
    text: 'တစ်ဖက်သားက တစ်ယောက်တည်း နေချင်တယ်လို့ ပြောတဲ့အခါ ကိုယ့်ကို မခင်လို့ဟု မယူဆဘဲ လေးစားပေးနိုင်ပါတယ်။',
  },
  {
    id: 'bs-15',
    dimensionId: 'empathy-listening',
    reverse: false,
    text: 'အခြားသူတစ်ဦးရဲ့ လုပ်ရပ်ကို ချက်ချင်း အပြစ်မတင်ခင် သူဘာကြောင့် ဒီလိုလုပ်ရသလဲဆိုတာ တွေးကြည့်တတ်ပါတယ်။',
  },
  {
    id: 'bs-16',
    dimensionId: 'conflict-navigation',
    reverse: true,
    text: 'သဘောထားကွဲလွဲမှု ဖြစ်လာရင် ငြင်းခုံရမှာ ကြောက်လို့ ကိုယ့်အမြင်ကို လုံးဝ မပြောတော့ဘဲ လက်လျှော့လိုက်တတ်ပါတယ်။',
  },
  {
    id: 'bs-17',
    dimensionId: 'trust-openness',
    reverse: false,
    text: 'ဆက်ဆံရေးမှာ အထင်လွဲစရာ ရှိလာရင် ထင်ကြေးပေးမနေဘဲ တိုက်ရိုက်မေးမြန်း ရှင်းလင်းတတ်ပါတယ်။',
  },
  {
    id: 'bs-18',
    dimensionId: 'healthy-boundaries',
    reverse: true,
    text: 'ရင်းနှီးသူတွေ ပျော်ရွှင်ဖို့အတွက် ကိုယ့်စိတ်ကျန်းမာရေးနဲ့ အချိန်ကို အမြဲတမ်း နောက်ဆုံးမှာ ထားမိတတ်ပါတယ်။',
  },
  {
    id: 'bs-19',
    dimensionId: 'empathy-listening',
    reverse: true,
    text: 'စကားပြောနေချိန်မှာ ဖုန်းကြည့်နေမိတာမျိုး သို့မဟုတ် တခြားအရာကို အာရုံရောက်နေတတ်တာမျိုး ဖြစ်တတ်ပါတယ်။',
  },
  {
    id: 'bs-20',
    dimensionId: 'conflict-navigation',
    reverse: false,
    text: 'ကိုယ်တိုင် အမှားလုပ်မိတဲ့အခါ ဆင်ခြေမပေးဘဲ ရိုးရိုးသားသား တောင်းပန်ပြီး ပြန်ပြင်ဆင်နိုင်ပါတယ်။',
  },
]

export const BONDSENSE_QUESTIONS_40_EXTRA = [
  {
    id: 'bs-21',
    dimensionId: 'trust-openness',
    reverse: false,
    text: 'ကိုယ့်စိတ်ထဲက စိုးရိမ်မှုတစ်ခုကို ရင်းနှီးသူတစ်ဦးနဲ့ မျှဝေပြီးနောက် စိတ်ပေါ့ပါးသွားတယ်လို့ ခံစားရတတ်ပါတယ်။',
  },
  {
    id: 'bs-22',
    dimensionId: 'healthy-boundaries',
    reverse: false,
    text: 'သူတစ်ပါးရဲ့ ကိစ္စတွေကို ကိုယ်တိုင်တာဝန်ယူ ဖြေရှင်းပေးမယ့်အစား သူတို့ကိုယ်တိုင် ဖြေရှင်းနိုင်ဖို့ နေရာပေးတတ်ပါတယ်။',
  },
  {
    id: 'bs-23',
    dimensionId: 'empathy-listening',
    reverse: false,
    text: 'တစ်ဖက်သား ပြောနေတဲ့ စကားလုံးတွေအပြင် သူ့မျက်နှာအမူအရာနဲ့ လေသံကနေ ခံစားချက်ကို သတိထားမိတတ်ပါတယ်။',
  },
  {
    id: 'bs-24',
    dimensionId: 'conflict-navigation',
    reverse: false,
    text: 'ပြဿနာတစ်ခုကို ဆွေးနွေးတဲ့အခါ အရင်တုန်းက အမှားဟောင်းတွေကို ပြန်မဖော်ဘဲ လက်ရှိအကြောင်းအရာကိုပဲ အာရုံစိုက်တတ်ပါတယ်။',
  },
  {
    id: 'bs-25',
    dimensionId: 'trust-openness',
    reverse: true,
    text: 'ကိုယ်တကယ် ခံစားနေရတာကို ဖွင့်ပြောလိုက်ရင် အထင်သေးခံရမလားလို့ စိုးရိမ်ပြီး ဟန်ဆောင်ပြုံးနေမိတတ်ပါတယ်။',
  },
  {
    id: 'bs-26',
    dimensionId: 'healthy-boundaries',
    reverse: true,
    text: 'မိသားစု သို့မဟုတ် မိတ်ဆွေတွေက ကိုယ့်ကိုယ်ရေးကိုယ်တာ ကိစ္စတွေမှာ ဝင်ရောက်ဆုံးဖြတ်ပေးတဲ့အခါ မကြိုက်ပေမယ့် မပြောဘဲ နေမိတတ်ပါတယ်။',
  },
  {
    id: 'bs-27',
    dimensionId: 'empathy-listening',
    reverse: true,
    text: 'တစ်ဖက်သား ရင်ဖွင့်နေချိန်မှာ “အဲဒါ ဘာမှမဟုတ်ပါဘူး” လို့ အလွယ်တကူ နှစ်သိမ့်မိပြီး သူ့ခံစားချက်ကို လျှော့တွက်မိတတ်ပါတယ်။',
  },
  {
    id: 'bs-28',
    dimensionId: 'conflict-navigation',
    reverse: true,
    text: 'စိတ်ဆိုးနေချိန်မှာ နှုတ်ဆိတ်သွားပြီး တစ်ဖက်သား ဘာဖြစ်မှန်းမသိအောင် အေးစက်စက် ဆက်ဆံမိတတ်ပါတယ်။',
  },
  {
    id: 'bs-29',
    dimensionId: 'trust-openness',
    reverse: false,
    text: 'ရင်းနှီးသူတစ်ဦးဆီက စိတ်ပျက်စရာတစ်ခု ကြုံရရင်တောင် တစ်ခါတည်း အဆက်အသွယ်ဖြတ်မပစ်ဘဲ ပြန်လည်ဆွေးနွေးဖို့ အခွင့်အရေးပေးတတ်ပါတယ်။',
  },
  {
    id: 'bs-30',
    dimensionId: 'healthy-boundaries',
    reverse: false,
    text: 'ကိုယ့်အတွက် အဆင်မပြေတဲ့ စကားအသုံးအနှုန်း သို့မဟုတ် အပြုအမူမျိုးကို ယဉ်ကျေးပြီး တည်ငြိမ်စွာ သတိပေးပြောဆိုနိုင်ပါတယ်။',
  },
  {
    id: 'bs-31',
    dimensionId: 'empathy-listening',
    reverse: false,
    text: 'ကိုယ်နဲ့ အမြင်မတူတဲ့သူ ပြောတာကိုတောင် သူ့ဘက်က အခြေအနေကို နားလည်အောင် စိတ်ရှည်ရှည် နားထောင်ပေးနိုင်ပါတယ်။',
  },
  {
    id: 'bs-32',
    dimensionId: 'conflict-navigation',
    reverse: false,
    text: 'သဘောထားကွဲလွဲမှု ပြီးသွားတဲ့နောက် တစ်ဖက်သားအပေါ် စိတ်ထဲမှာ အငြိုးအတေး မထားဘဲ ပုံမှန်အတိုင်း ပြန်ဆက်ဆံနိုင်ပါတယ်။',
  },
  {
    id: 'bs-33',
    dimensionId: 'trust-openness',
    reverse: true,
    text: 'လူတွေကို ယုံကြည်မိလိုက်ရင် နောက်ဆုံးမှာ စိတ်ထိခိုက်ရမယ်လို့ တွေးပြီး ခပ်ခွာခွာပဲ နေတတ်ပါတယ်။',
  },
  {
    id: 'bs-34',
    dimensionId: 'healthy-boundaries',
    reverse: true,
    text: 'တစ်ဖက်သား စိတ်ဆိုးမှာစိုးလို့ ကိုယ်မပေးနိုင်တဲ့ ကတိတွေကို အလွယ်တကူ ပေးမိတတ်ပါတယ်။',
  },
  {
    id: 'bs-35',
    dimensionId: 'empathy-listening',
    reverse: true,
    text: 'တစ်စုံတစ်ယောက် စကားပြောနေချိန်မှာ ကိုယ်ဘာပြန်ပြောရမလဲဆိုတာကိုပဲ ကြိုတွေးနေမိလို့ သူ့စကားအချို့ကို လွတ်သွားတတ်ပါတယ်။',
  },
  {
    id: 'bs-36',
    dimensionId: 'conflict-navigation',
    reverse: true,
    text: 'အငြင်းပွားမှု ဖြစ်လာရင် တစ်ဖက်သားကို အပြစ်တင်တဲ့ စကားလုံးတွေ အရင်ထွက်သွားမိတတ်ပါတယ်။',
  },
  {
    id: 'bs-37',
    dimensionId: 'trust-openness',
    reverse: true,
    text: 'ကိုယ့်လိုအပ်ချက်ကို တိုက်ရိုက်မပြောဘဲ တစ်ဖက်သားက အလိုလို နားလည်ပေးစေချင်တဲ့ စိတ်မျိုး ဖြစ်တတ်ပါတယ်။',
  },
  {
    id: 'bs-38',
    dimensionId: 'healthy-boundaries',
    reverse: true,
    text: 'အခြားသူတွေရဲ့ စိတ်ခံစားချက် မကောင်းဖြစ်နေတာကို မြင်ရင် ကိုယ့်ကြောင့်လားဆိုပြီး မလိုအပ်ဘဲ အပြစ်ရှိသလို ခံစားရတတ်ပါတယ်။',
  },
  {
    id: 'bs-39',
    dimensionId: 'empathy-listening',
    reverse: true,
    text: 'ကိုယ်နဲ့ မတူတဲ့ အတွေ့အကြုံကို တစ်ဖက်သား ပြောပြတဲ့အခါ နားလည်ပေးဖို့ထက် ဘာကြောင့် မှားနေသလဲဆိုတာကိုပဲ မြင်မိတတ်ပါတယ်။',
  },
  {
    id: 'bs-40',
    dimensionId: 'conflict-navigation',
    reverse: true,
    text: 'ဆက်ဆံရေးမှာ အဆင်မပြေမှုလေးတစ်ခု ဖြစ်လာရင် ပြန်ညှိနှိုင်းဖို့ထက် ဒီတိုင်းပဲ ဝေးသွားလိုက်ချင်စိတ် ပေါ်လာတတ်ပါတယ်။',
  },
]

export const BONDSENSE_QUESTIONS_40 = [
  ...BONDSENSE_QUESTIONS_20,
  ...BONDSENSE_QUESTIONS_40_EXTRA,
]

export const BONDSENSE_LEVELS = [
  {
    value: 20,
    title: 'အခြေခံ ၂၀ မေးခွန်း',
    subtitle: 'ဆက်ဆံရေးပုံစံ အဓိက အချက် ၄ ချက်ကို အကျဉ်းချုပ် သုံးသပ်ရန်',
    duration: '~၄ မိနစ်',
    label: 'အခြေခံ',
    recommended: true,
  },
  {
    value: 40,
    title: 'အသေးစိတ် ၄၀ မေးခွန်း',
    subtitle: 'အချက် ၄ ချက်ကို မေးခွန်းပိုများဖြင့် ပိုမိုစုံလင်စွာ သုံးသပ်ရန်',
    duration: '~၈ မိနစ်',
    label: 'အသေးစိတ်',
    recommended: false,
  },
]

export function getBondSenseQuestionsForLevel(level = 20) {
  return Number(level) === 40 ? BONDSENSE_QUESTIONS_40 : BONDSENSE_QUESTIONS_20
}
