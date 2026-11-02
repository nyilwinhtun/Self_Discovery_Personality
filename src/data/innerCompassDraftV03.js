/**
 * InnerCompass original Burmese reflection questions V0.3.0.
 *
 * Internal review draft only. This is an original, non-diagnostic
 * self-reflection question set. It is not an official translation,
 * equivalent, or validated administration of HEXACO or another inventory.
 */

export const INNERCOMPASS_V03_VERSION = 'innercompass-draft-0.3.0'
export const INNERCOMPASS_V03_STATUS = 'internal-review-not-active'

export const INNERCOMPASS_V03_DIMENSIONS = [
  {
    id: 'trust-accountability',
    code: 'IC1',
    name: 'ရိုးသားစွာ ပြောဆိုမှုနှင့် တာဝန်ယူမှု',
    shortName: 'ရိုးသားမှုနှင့် တာဝန်ယူမှု',
    description: 'ကတိအကြောင်း ပွင့်လင်းစွာ ပြောဆိုပုံ၊ ကိုယ့်လုပ်ရပ်အတွက် တာဝန်ယူပုံနှင့် အခြားသူများ၏ ပါဝင်မှုကို အသိအမှတ်ပြုပုံကို ပြန်လည်သုံးသပ်ရန်။',
    color: '#80678f',
    themes: [
      'ကတိမတည်နိုင်သည့်အခါ ကြိုတင်ပြောဆိုမှု',
      'ကိုယ့်ဆုံးဖြတ်ချက်၏ သက်ရောက်မှုကို စဉ်းစားမှု',
      'ကိုယ့်အမှားကို ဝန်ခံမှု',
      'ကိုယ့်အကျိုးအတွက် အချက်အလက်ချန်ထားမှု',
      'အခြားသူများ၏ ပါဝင်မှုကို အသိအမှတ်ပြုမှု',
    ],
  },
  {
    id: 'emotional-awareness-regulation',
    code: 'IC2',
    name: 'စိတ်ခံစားချက်ကို သိရှိကိုင်တွယ်ပုံ',
    shortName: 'စိတ်ခံစားချက်ကို ကိုင်တွယ်ပုံ',
    description: 'ကိုယ့်ခံစားချက်ကို သတိထားမိပုံ၊ စိတ်ဖိစီးချိန် ကိုယ့်ကိုယ်ကို ကူညီပုံ၊ အကူအညီတောင်းပုံနှင့် စိတ်အနှောင့်အယှက်ပြီးနောက် အာရုံပြန်စိုက်ပုံကို ပြန်လည်သုံးသပ်ရန်။',
    color: '#b87969',
    themes: [
      'ကိုယ့်ခံစားချက်ကို သတိပြုမှု',
      'စိတ်ဖိစီးချိန် ခဏနားပြီး စိတ်ကို ပြန်ထိန်းညှိမှု',
      'လိုအပ်သည့်အခါ အကူအညီတောင်းမှု',
      'အခြားသူ၏ စိတ်အခြေအနေကို သတိပြုမှု',
      'စိတ်အနှောင့်အယှက်ပြီးနောက် အာရုံပြန်စိုက်မှု',
    ],
  },
  {
    id: 'social-self-expression',
    code: 'IC3',
    name: 'လူမှုအခြေအနေတွင် ကိုယ့်ကိုယ်ကို ဖော်ပြပုံ',
    shortName: 'လူမှုဆက်ဆံရေးနှင့် ဖော်ပြမှု',
    description: 'မရင်းနှီးသူများနှင့် စကားစတင်ပုံ၊ အုပ်စုအတွင်း ကိုယ့်အမြင်ပြောပုံနှင့် လူမှုအခြေအနေများတွင် ပါဝင်ပုံကို ပြန်လည်သုံးသပ်ရန်။',
    color: '#527daa',
    themes: [
      'မရင်းနှီးသူနှင့် စကားစတင်မှု',
      'အုပ်စုအတွင်း ကိုယ့်အမြင်ပြောဆိုမှု',
      'လူအများနှင့် အချိန်ဖြုန်းလိုမှု',
      'လူအများရှေ့ ပြောဆိုရသည့်အခါ တုံ့ပြန်မှု',
      'လူသစ်များနှင့် ကိုယ့်အကြောင်း မျှဝေမှု',
    ],
  },
  {
    id: 'disagreement-handling',
    code: 'IC4',
    name: 'အမြင်မတူမှုကို ကိုင်တွယ်ပုံ',
    shortName: 'အမြင်မတူမှုကို ကိုင်တွယ်ပုံ',
    description: 'အမြင်မတူသူကို နားထောင်ပုံ၊ အချက်အလက်အသစ်အပေါ် ကိုယ့်အမြင်ပြင်ပုံနှင့် သဘောမတူသည့်အခါ ပြောဆိုပုံကို ပြန်လည်သုံးသပ်ရန်။',
    color: '#78875c',
    themes: [
      'အခြားအမြင်ကို အရင်နားထောင်မှု',
      'အချက်အလက်အသစ်အပေါ် အမြင်ပြင်ဆင်မှု',
      'နှစ်ဖက်အတွက် အဆင်ပြေမည့်နည်းလမ်း ရှာဖွေမှု',
      'မတူသောအချက်အလက်ကို မစဉ်းစားဘဲ ပယ်ချမှု',
      'လူကိုမတိုက်ခိုက်ဘဲ ပြဿနာအကြောင်း ပြောဆိုမှု',
    ],
  },
  {
    id: 'personal-organization',
    code: 'IC5',
    name: 'ကိုယ်ပိုင်စီမံမှုနှင့် ဇွဲရှိမှု',
    shortName: 'ကိုယ်ပိုင်စီမံမှု',
    description: 'အလုပ်စီစဉ်ပုံ၊ စတင်ထားသည့်အလုပ်ကို ဆက်လုပ်ပုံ၊ အရေးကြီးသောအချက်များကို စစ်ဆေးပုံနှင့် ကိုယ်ပိုင်ပစ္စည်းများကို စနစ်တကျထားပုံကို ပြန်လည်သုံးသပ်ရန်။',
    color: '#9a7c54',
    themes: [
      'အလုပ်မစမီ အစီအစဉ်ဆွဲမှု',
      'စတင်ထားသောအလုပ်ကို အဆုံးသတ်ရန် ကြိုးစားမှု',
      'အလုပ်ပြီးနောက် အရေးကြီးသောအချက်များ ပြန်စစ်မှု',
      'သတ်မှတ်ထားသောအချိန်ကို လိုက်နာမှု',
      'အသုံးပြုပြီးသောပစ္စည်းများကို နေရာတကျ ပြန်ထားမှု',
    ],
  },
  {
    id: 'curiosity-open-thinking',
    code: 'IC6',
    name: 'စူးစမ်းလိုစိတ်နှင့် အတွေးသစ်များ',
    shortName: 'စူးစမ်းတွေးခေါ်မှု',
    description: 'မသိသေးသောအကြောင်းအရာကို လေ့လာလိုမှု၊ နည်းလမ်းအမျိုးမျိုး စဉ်းစားမှု၊ အနုပညာကို ခံစားမှုနှင့် အကြံသစ်များကို စမ်းကြည့်လိုမှုကို ပြန်လည်သုံးသပ်ရန်။',
    color: '#6e8790',
    themes: [
      'မသိသေးသောအကြောင်းအရာကို ရှာဖွေလေ့လာမှု',
      'ပြဿနာအတွက် နည်းလမ်းအမျိုးမျိုး စဉ်းစားမှု',
      'အနုပညာလက်ရာများကို ခံစားမှု',
      'မရင်းနှီးသောအတွေးအမြင်ကို မစူးစမ်းဘဲ ပယ်ချမှု',
      'နေ့စဉ်အရာများကို နည်းလမ်းသစ်ဖြင့် စမ်းကြည့်မှု',
    ],
  },
]

export const INNERCOMPASS_V03_QUESTIONS_30 = [
  // IC1 — honesty, openness in communication, accountability
  { id: 'icv03-01', dimensionId: 'trust-accountability', themeIndex: 0, text: 'ကတိမတည်နိုင်တော့ရင် သက်ဆိုင်သူကို ကြိုပြောတတ်တယ်။', reverse: false },
  { id: 'icv03-02', dimensionId: 'trust-accountability', themeIndex: 1, text: 'ကိုယ့်ဆုံးဖြတ်ချက်ကြောင့် တခြားသူတွေ ထိခိုက်နိုင်မလား စဉ်းစားတတ်တယ်။', reverse: false },
  { id: 'icv03-03', dimensionId: 'trust-accountability', themeIndex: 2, text: 'ကိုယ်မှားခဲ့ရင် ဝန်ခံတတ်တယ်။', reverse: false },
  { id: 'icv03-04', dimensionId: 'trust-accountability', themeIndex: 3, text: 'ကိုယ့်အကျိုးရှိအောင် ပြောတဲ့အခါ ကိုယ့်ဘက်က မကောင်းတဲ့အချက်ကို ချန်ထားတတ်တယ်။', reverse: true },
  { id: 'icv03-05', dimensionId: 'trust-accountability', themeIndex: 4, text: 'အဖွဲ့လိုက် အောင်မြင်ရင် ကူညီပေးခဲ့သူတွေကို ကျေးဇူးတင်ကြောင်း ပြောတတ်တယ်။', reverse: false },

  // IC2 — emotional awareness and self-regulation
  { id: 'icv03-06', dimensionId: 'emotional-awareness-regulation', themeIndex: 0, text: 'ကိုယ် ဘယ်လိုခံစားနေရတယ်ဆိုတာ သတိထားမိတတ်တယ်။', reverse: false },
  { id: 'icv03-07', dimensionId: 'emotional-awareness-regulation', themeIndex: 1, text: 'စိတ်ဖိစီးလာရင် ခဏနားပြီး စိတ်အေးအောင် ကြိုးစားတတ်တယ်။', reverse: false },
  { id: 'icv03-08', dimensionId: 'emotional-awareness-regulation', themeIndex: 2, text: 'တစ်ယောက်တည်း မဖြေရှင်းနိုင်တဲ့အခါ အကူအညီတောင်းတတ်တယ်။', reverse: false },
  { id: 'icv03-09', dimensionId: 'emotional-awareness-regulation', themeIndex: 3, text: 'တခြားသူ စိတ်မကောင်းဖြစ်နေတဲ့အခါ သတိထားမိတတ်တယ်။', reverse: false },
  { id: 'icv03-10', dimensionId: 'emotional-awareness-regulation', themeIndex: 4, text: 'စိတ်မကောင်းဖြစ်ပြီးနောက် လုပ်စရာတွေကို ပြန်အာရုံစိုက်ဖို့ ခက်တတ်တယ်။', reverse: true },

  // IC3 — social participation and self-expression
  { id: 'icv03-11', dimensionId: 'social-self-expression', themeIndex: 0, text: 'မရင်းနှီးသေးတဲ့သူနဲ့ စကားစပြောဖို့ လွယ်တယ်။', reverse: false },
  { id: 'icv03-12', dimensionId: 'social-self-expression', themeIndex: 1, text: 'အုပ်စုထဲမှာ ကိုယ့်အမြင်ကို ပြောပြတတ်တယ်။', reverse: false },
  { id: 'icv03-13', dimensionId: 'social-self-expression', themeIndex: 2, text: 'လူအများနဲ့ အချိန်ဖြုန်းရတာကို နှစ်သက်တယ်။', reverse: false },
  { id: 'icv03-14', dimensionId: 'social-self-expression', themeIndex: 3, text: 'လူအများရှေ့မှာ စကားပြောရမယ်ဆိုရင် ရှောင်ချင်တတ်တယ်။', reverse: true },
  { id: 'icv03-15', dimensionId: 'social-self-expression', themeIndex: 4, text: 'လူသစ်တွေနဲ့ တွေ့တဲ့အခါ ကိုယ့်အကြောင်းကို ပြောပြတတ်တယ်။', reverse: false },

  // IC4 — handling disagreement
  { id: 'icv03-16', dimensionId: 'disagreement-handling', themeIndex: 0, text: 'ကိုယ်နဲ့ အမြင်မတူသူ ပြောတာကို အရင်နားထောင်ပြီးမှ ပြန်ပြောတတ်တယ်။', reverse: false },
  { id: 'icv03-17', dimensionId: 'disagreement-handling', themeIndex: 1, text: 'အချက်အလက်အသစ်ကြောင့် ကိုယ့်အမြင်မှားနေတယ်လို့ သိရင် ပြင်တတ်တယ်။', reverse: false },
  { id: 'icv03-18', dimensionId: 'disagreement-handling', themeIndex: 2, text: 'သဘောမတူတဲ့အခါ နှစ်ဖက်လုံးအတွက် အဆင်ပြေမယ့်နည်းလမ်း ရှာတတ်တယ်။', reverse: false },
  { id: 'icv03-19', dimensionId: 'disagreement-handling', themeIndex: 3, text: 'ကိုယ့်အမြင်နဲ့ မတူရင် သေချာမစဉ်းစားဘဲ ငြင်းတတ်တယ်။', reverse: true },
  { id: 'icv03-20', dimensionId: 'disagreement-handling', themeIndex: 4, text: 'အမြင်မတူတဲ့အခါ လူကိုအပြစ်မတင်ဘဲ ပြဿနာကိုပဲ ပြောတတ်တယ်။', reverse: false },

  // IC5 — personal organisation and persistence
  { id: 'icv03-21', dimensionId: 'personal-organization', themeIndex: 0, text: 'အလုပ်မစခင် ဘာကိုအရင်လုပ်မလဲ စီစဉ်တတ်တယ်။', reverse: false },
  { id: 'icv03-22', dimensionId: 'personal-organization', themeIndex: 1, text: 'စလုပ်ထားတဲ့အလုပ်ကို အဆုံးထိလုပ်ဖို့ ကြိုးစားတတ်တယ်။', reverse: false },
  { id: 'icv03-23', dimensionId: 'personal-organization', themeIndex: 2, text: 'အလုပ်ပြီးရင် အရေးကြီးတဲ့အချက်တွေ မှန်မမှန် ပြန်စစ်တတ်တယ်။', reverse: false },
  { id: 'icv03-24', dimensionId: 'personal-organization', themeIndex: 3, text: 'သတ်မှတ်ထားတဲ့အချိန်အတွင်း အလုပ်ပြီးအောင် ကြိုးစားတတ်တယ်။', reverse: false },
  { id: 'icv03-25', dimensionId: 'personal-organization', themeIndex: 4, text: 'သုံးပြီးတဲ့ပစ္စည်းတွေကို နေရာတကျ ပြန်မထားမိတတ်ဘူး။', reverse: true },

  // IC6 — curiosity and open thinking
  { id: 'icv03-26', dimensionId: 'curiosity-open-thinking', themeIndex: 0, text: 'မသိသေးတဲ့အကြောင်းအရာကို ပိုသိဖို့ ကိုယ်တိုင်ရှာဖွေတတ်တယ်။', reverse: false },
  { id: 'icv03-27', dimensionId: 'curiosity-open-thinking', themeIndex: 1, text: 'ပြဿနာတစ်ခုအတွက် ဖြေရှင်းနည်း အမျိုးမျိုး စဉ်းစားတတ်တယ်။', reverse: false },
  { id: 'icv03-28', dimensionId: 'curiosity-open-thinking', themeIndex: 2, text: 'အနုပညာလက်ရာတွေကို ကြည့်ရှုခံစားရတာ ကြိုက်တယ်။', reverse: false },
  { id: 'icv03-29', dimensionId: 'curiosity-open-thinking', themeIndex: 3, text: 'ကိုယ်မကြားဖူးတဲ့ အယူအဆကို သေချာမသိခင် ငြင်းပယ်တတ်တယ်။', reverse: true },
  { id: 'icv03-30', dimensionId: 'curiosity-open-thinking', themeIndex: 4, text: 'နေ့စဉ်လုပ်နေကျအရာတွေကို နည်းလမ်းသစ်နဲ့ စမ်းလုပ်ကြည့်ရတာ စိတ်ဝင်စားတယ်။', reverse: false },
]

export const INNERCOMPASS_V03_ANSWER_OPTIONS = [
  { value: 1, label: 'လုံးဝ မကိုက်ညီပါ' },
  { value: 2, label: 'မကိုက်ညီပါ' },
  { value: 3, label: 'အလယ်အလတ်ပါ' },
  { value: 4, label: 'ကိုက်ညီပါသည်' },
  { value: 5, label: 'အလွန်ကိုက်ညီပါသည်' },
]

export const INNERCOMPASS_V03_REVERSE_IDS = INNERCOMPASS_V03_QUESTIONS_30
  .filter((question) => question.reverse)
  .map((question) => question.id)

export const INNERCOMPASS_V03_PUBLICATION_STATUS = {
  pilotModeEnabledInApp: false,
  formalPublicReleaseApproved: false,
  editorReviewed: false,
  expertReviewed: false,
  cognitiveInterviewCompleted: false,
  pilotCompleted: false,
  psychometricallyValidated: false,
}
