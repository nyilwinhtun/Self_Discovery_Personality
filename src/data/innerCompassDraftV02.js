/**
 * InnerCompass original Burmese reflection-question draft V0.2.0.
 *
 * This is an in-house, non-diagnostic self-reflection pilot. It is not an
 * official, translated, equivalent, or validated administration of any
 * third-party personality inventory. Keep it clearly labelled as a pilot; do
 * not describe its indices as validated personality scores until language
 * review, cognitive interviews, expert review, pilot testing, and psychometric
 * evaluation have been completed.
 */

export const INNERCOMPASS_V02_VERSION = 'innercompass-draft-0.2.0'
export const INNERCOMPASS_V02_STATUS = 'pilot-mode-not-validated'

export const INNERCOMPASS_V02_DIMENSIONS = [
  {
    id: 'trust-accountability',
    code: 'IC1',
    name: 'ယုံကြည်စိတ်ချရမှုနှင့် တာဝန်ခံမှု',
    shortName: 'ယုံကြည်စိတ်ချရမှု',
    description: 'ကတိနှင့် လုပ်ဆောင်ချက်ကိုက်ညီစေရန် ကြိုးစားပုံ၊ ကိုယ့်ဆုံးဖြတ်ချက်၏ သက်ရောက်မှုကို စဉ်းစားပုံ၊ အမှားအတွက် တာဝန်ယူပုံနှင့် အခြားသူများ၏ ပါဝင်မှုကို အသိအမှတ်ပြုပုံကို ပြန်လည်သုံးသပ်ခြင်း။',
    color: '#80678f',
    themes: [
      'ကတိနှင့်ပတ်သက်၍ ပွင့်လင်းစွာ ဆက်သွယ်မှု',
      'ဆုံးဖြတ်ချက်၏ သက်ရောက်မှုကို စဉ်းစားမှု',
      'ကိုယ့်ပါဝင်မှုအတွက် တာဝန်ယူမှု',
      'အရေးကြီးသောအချက်များကို ပွင့်လင်းစွာ ပြောဆိုမှု',
      'အခြားသူများ၏ ပါဝင်မှုကို အသိအမှတ်ပြုမှု',
    ],
  },
  {
    id: 'emotional-awareness-regulation',
    code: 'IC2',
    name: 'စိတ်ခံစားချက်ကို သိမြင်ကိုင်တွယ်မှု',
    shortName: 'စိတ်ခံစားမှုကို ကိုင်တွယ်ပုံ',
    description: 'ကိုယ့်ခံစားချက်ကို သတိပြုပုံ၊ ဖိအားများချိန်တွင် ကိုယ့်ကိုယ်ကို ထိန်းညှိပုံ၊ လိုအပ်သည့်အခါ အကူအညီရှာဖွေပုံနှင့် အခြားသူ၏ ခံစားချက်ကို နားလည်ရန် ကြိုးစားပုံကို ပြန်လည်သုံးသပ်ခြင်း။',
    color: '#b87969',
    themes: [
      'ကိုယ့်ခံစားချက်ကို သတိပြုမှု',
      'ဖိအားများချိန် ကိုယ့်ကိုယ်ကို ထိန်းညှိမှု',
      'လိုအပ်သည့်အခါ အကူအညီရှာဖွေမှု',
      'အခြားသူ၏ အခြေအနေကို နားလည်ရန် ကြိုးစားမှု',
      'စိတ်အနှောင့်အယှက်ပြီးနောက် အာရုံပြန်စိုက်မှု',
    ],
  },
  {
    id: 'social-self-expression',
    code: 'IC3',
    name: 'လူမှုဆက်ဆံရေးတွင် ကိုယ့်ကိုယ်ကို ဖော်ပြပုံ',
    shortName: 'လူမှုဆက်ဆံရေးနှင့် ဖော်ပြမှု',
    description: 'လူသစ်များနှင့် စကားစတင်ပုံ၊ အုပ်စုအတွင်း ပါဝင်ပုံ၊ ကိုယ့်အမြင်ကို မျှဝေပုံနှင့် အခြေအနေအလိုက် ကိုယ့်ကိုယ်ကို ဖော်ပြပုံကို ပြန်လည်သုံးသပ်ခြင်း။',
    color: '#527daa',
    themes: [
      'မရင်းနှီးသူနှင့် စကားစတင်မှု',
      'အုပ်စုအတွင်း ကိုယ့်အမြင်မျှဝေမှု',
      'အတူတကွ လုပ်ဆောင်ရာတွင် ပါဝင်မှု',
      'လူအများရှေ့တွင် ပြောဆိုရသည့်အခါ တုံ့ပြန်မှု',
      'အခြေအနေအလိုက် ကိုယ့်ကိုယ်ကို ဖော်ပြမှု',
    ],
  },
  {
    id: 'disagreement-handling',
    code: 'IC4',
    name: 'အမြင်မတူမှုကို ကိုင်တွယ်ပုံ',
    shortName: 'အမြင်ကွဲလွဲမှုကို ကိုင်တွယ်ပုံ',
    description: 'အမြင်မတူသူကို နားထောင်ပုံ၊ အချက်အလက်အသစ်အပေါ် မူတည်၍ အမြင်ပြင်ဆင်ပုံ၊ နှစ်ဖက်၏ လိုအပ်ချက်ကို စဉ်းစားပုံနှင့် တုံ့ပြန်မှုကို ခဏရပ်စဉ်းစားပုံကို ပြန်လည်သုံးသပ်ခြင်း။',
    color: '#78875c',
    themes: [
      'မတူညီသော အကြောင်းပြချက်ကို နားထောင်မှု',
      'အချက်အလက်အသစ်အပေါ် အမြင်ပြင်ဆင်မှု',
      'နှစ်ဖက်၏ လိုအပ်ချက်ကို စဉ်းစားမှု',
      'ဆန့်ကျင်သော အချက်အလက်ကို စဉ်းစားကြည့်မှု',
      'စိတ်လှုပ်ရှားချိန် တုံ့ပြန်မှုကို ခဏရပ်မှု',
    ],
  },
  {
    id: 'personal-organization',
    code: 'IC5',
    name: 'ကိုယ်ပိုင်စီမံမှုနှင့် လုပ်ငန်းဆက်လက်ဆောင်ရွက်မှု',
    shortName: 'ကိုယ်ပိုင်စီမံမှု',
    description: 'လုပ်ငန်းတစ်ခုကို စီစဉ်ပုံ၊ စတင်ထားသောအလုပ်ကို ဆက်လက်ဆောင်ရွက်ပုံ၊ အသေးစိတ်ကို ပြန်စစ်ပုံနှင့် ကိုယ်ပိုင်ပစ္စည်းများကို စနစ်တကျ ထားရှိပုံကို ပြန်လည်သုံးသပ်ခြင်း။',
    color: '#9a7c54',
    themes: [
      'အလုပ်မစမီ အဆင့်များကို စီစဉ်မှု',
      'စတင်ထားသောအလုပ်ကို ဆက်လက်ဆောင်ရွက်မှု',
      'အရေးကြီးသော အသေးစိတ်ကို ပြန်စစ်မှု',
      'ဆုံးဖြတ်ချက်၏ နောက်ဆက်တွဲကို စဉ်းစားမှု',
      'နေ့စဉ်သုံးပစ္စည်းများကို စနစ်တကျထားရှိမှု',
    ],
  },
  {
    id: 'curiosity-open-thinking',
    code: 'IC6',
    name: 'စူးစမ်းလိုစိတ်နှင့် အတွေးအမြင်ဖွင့်လှစ်မှု',
    shortName: 'စူးစမ်းတွေးခေါ်မှု',
    description: 'မသိသေးသောအကြောင်းအရာများကို ရှာဖွေလိုမှု၊ အခြားဖြစ်နိုင်ခြေများကို စဉ်းစားမှု၊ အနုပညာနှင့် သဘာဝအလှအပကို သတိပြုခံစားမှုနှင့် အကြံသစ်များကို စမ်းသပ်လိုမှုကို ပြန်လည်သုံးသပ်ခြင်း။',
    color: '#6e8790',
    themes: [
      'မသိသေးသောအကြောင်းအရာကို ရှာဖွေလေ့လာမှု',
      'အခြားဖြစ်နိုင်ခြေများကို စဉ်းစားမှု',
      'အနုပညာနှင့် သဘာဝအလှအပကို ခံစားမှု',
      'မရင်းနှီးသော အယူအဆကို စူးစမ်းမှု',
      'အကြံသစ်ကို အသေးစားစမ်းသပ်မှု',
    ],
  },
]

/**
 * Original project-written prompts. One item covers each reflection theme.
 * IDs are version-specific so this draft cannot collide with the archived V0.1 bank.
 */
export const INNERCOMPASS_V02_QUESTIONS_30 = [
  // IC1 — Trust and accountability
  { id: 'icv02-01', dimensionId: 'trust-accountability', themeIndex: 0, text: 'ကတိပေးထားတဲ့အရာကို မလုပ်နိုင်တော့တဲ့အခါ သက်ဆိုင်သူကို အကြောင်းအရာကို ရှင်းပြတတ်တယ်။', reverse: false },
  { id: 'icv02-02', dimensionId: 'trust-accountability', themeIndex: 1, text: 'ကိုယ့်ဆုံးဖြတ်ချက်တစ်ခုက အခြားသူတွေအပေါ် ဘယ်လိုသက်ရောက်မလဲဆိုတာကို စဉ်းစားတတ်တယ်။', reverse: false },
  { id: 'icv02-03', dimensionId: 'trust-accountability', themeIndex: 2, text: 'ကိုယ့်အမှားကြောင့် အဆင်မပြေမှုဖြစ်လာရင် ကိုယ့်ပါဝင်မှုကို ဝန်ခံတတ်တယ်။', reverse: false },
  { id: 'icv02-04', dimensionId: 'trust-accountability', themeIndex: 3, text: 'ကိုယ့်အကျိုးစီးပွားနဲ့ ဆိုင်တဲ့အကြောင်းကို ရှင်းပြတဲ့အခါ ကိုယ့်အတွက် မအဆင်ပြေတဲ့ အချက်တွေကို ချန်ထားမိတတ်တယ်။', reverse: true },
  { id: 'icv02-05', dimensionId: 'trust-accountability', themeIndex: 4, text: 'အဖွဲ့လိုက်လုပ်ဆောင်မှုမှာ အောင်မြင်မှုရတဲ့အခါ ပါဝင်ကူညီသူတွေကို အသိအမှတ်ပြုတတ်တယ်။', reverse: false },

  // IC2 — Emotional awareness and regulation
  { id: 'icv02-06', dimensionId: 'emotional-awareness-regulation', themeIndex: 0, text: 'ကိုယ် ဘာခံစားနေရသလဲဆိုတာကို ဖြစ်နေချိန်မှာ သတိထားမိတတ်တယ်။', reverse: false },
  { id: 'icv02-07', dimensionId: 'emotional-awareness-regulation', themeIndex: 1, text: 'စိတ်ဖိစီးလာတဲ့အခါ ခဏနားပြီး ကိုယ့်ကိုယ်ကို ပြန်တည်ငြိမ်စေဖို့ ကြိုးစားတတ်တယ်။', reverse: false },
  { id: 'icv02-08', dimensionId: 'emotional-awareness-regulation', themeIndex: 2, text: 'အခက်အခဲတစ်ခုကို တစ်ယောက်တည်း ဖြေရှင်းဖို့ မလွယ်တဲ့အခါ အကူအညီရနိုင်မယ့် နည်းလမ်းကို ရှာတတ်တယ်။', reverse: false },
  { id: 'icv02-09', dimensionId: 'emotional-awareness-regulation', themeIndex: 3, text: 'တစ်ဖက်လူရဲ့ အခြေအနေကို စဉ်းစားပြီး သူ့ခံစားချက်ကို နားလည်ဖို့ ကြိုးစားတတ်တယ်။', reverse: false },
  { id: 'icv02-10', dimensionId: 'emotional-awareness-regulation', themeIndex: 4, text: 'စိတ်အနှောင့်အယှက်ဖြစ်စရာတစ်ခု ကြုံပြီးနောက် ပုံမှန်လုပ်စရာတွေအပေါ် အာရုံပြန်စိုက်ဖို့ အချိန်ယူရတတ်တယ်။', reverse: true },

  // IC3 — Social self-expression
  { id: 'icv02-11', dimensionId: 'social-self-expression', themeIndex: 0, text: 'အခြေအနေသင့်တော်တဲ့အခါ မရင်းနှီးသေးသူတစ်ယောက်နဲ့ စကားစတင်ပြောနိုင်တယ်။', reverse: false },
  { id: 'icv02-12', dimensionId: 'social-self-expression', themeIndex: 1, text: 'အုပ်စုတစ်ခုမှာ ကိုယ့်အမြင်ကို မျှဝေဖို့ အခွင့်အရေးရရင် ပြောဆိုတတ်တယ်။', reverse: false },
  { id: 'icv02-13', dimensionId: 'social-self-expression', themeIndex: 2, text: 'အဖွဲ့လိုက်လုပ်ဆောင်တဲ့အခါ ကိုယ်ပါဝင်နိုင်မယ့် အခန်းကဏ္ဍကို ရှာဖွေတတ်တယ်။', reverse: false },
  { id: 'icv02-14', dimensionId: 'social-self-expression', themeIndex: 3, text: 'လူအများရှေ့မှာ ကိုယ့်အမြင်ကို ပြောရမယ့်အခါ စိတ်မသက်မသာဖြစ်လို့ ရှောင်တတ်တယ်။', reverse: true },
  { id: 'icv02-15', dimensionId: 'social-self-expression', themeIndex: 4, text: 'လူမှုအခြေအနေတစ်ခုချင်းစီအလိုက် ကိုယ့်အကြောင်းကို ဘယ်လောက်မျှဝေမလဲ ရွေးချယ်တတ်တယ်။', reverse: false },

  // IC4 — Handling disagreement
  { id: 'icv02-16', dimensionId: 'disagreement-handling', themeIndex: 0, text: 'အမြင်မတူသူတစ်ယောက်ရဲ့ အကြောင်းပြချက်ကို မတုံ့ပြန်ခင် အရင်နားထောင်တတ်တယ်။', reverse: false },
  { id: 'icv02-17', dimensionId: 'disagreement-handling', themeIndex: 1, text: 'အချက်အလက်အသစ်တစ်ခုက ကိုယ့်အမြင်ကို ပြန်စဉ်းစားစေတဲ့အခါ လိုအပ်သလို ပြင်ဆင်တတ်တယ်။', reverse: false },
  { id: 'icv02-18', dimensionId: 'disagreement-handling', themeIndex: 2, text: 'အမြင်မတူတဲ့အခါ တစ်ဖက်စီအတွက် ဘာကအရေးကြီးသလဲဆိုတာ မေးမြန်းတတ်တယ်။', reverse: false },
  { id: 'icv02-19', dimensionId: 'disagreement-handling', themeIndex: 3, text: 'ကိုယ့်အမြင်ကို ဆန့်ကျင်တဲ့ အချက်အလက်ကို ကြားရတဲ့အခါ သေချာမစဉ်းစားဘဲ ပယ်ချမိတတ်တယ်။', reverse: true },
  { id: 'icv02-20', dimensionId: 'disagreement-handling', themeIndex: 4, text: 'စိတ်တိုနေချိန်မှာ ချက်ချင်းပြန်မပြောဘဲ ခဏရပ်ပြီး စဉ်းစားတတ်တယ်။', reverse: false },

  // IC5 — Personal organisation
  { id: 'icv02-21', dimensionId: 'personal-organization', themeIndex: 0, text: 'အလုပ်တစ်ခုစမယ့်အခါ အရင်ဆုံး လုပ်ဆောင်ရမယ့် အဆင့်တွေကို စီစဉ်တတ်တယ်။', reverse: false },
  { id: 'icv02-22', dimensionId: 'personal-organization', themeIndex: 1, text: 'စတင်ထားတဲ့အလုပ်ကို ဆက်လုပ်နိုင်ဖို့ အချိန်သတ်မှတ်ပြီး ပြန်စတတ်တယ်။', reverse: false },
  { id: 'icv02-23', dimensionId: 'personal-organization', themeIndex: 2, text: 'အလုပ်တစ်ခု ပြီးဆုံးတဲ့အခါ အရေးကြီးတဲ့ အသေးစိတ်အချက်တွေကို ပြန်စစ်တတ်တယ်။', reverse: false },
  { id: 'icv02-24', dimensionId: 'personal-organization', themeIndex: 3, text: 'အရေးကြီးတဲ့ ဆုံးဖြတ်ချက်မချခင် ဖြစ်လာနိုင်တဲ့ နောက်ဆက်တွဲအကျိုးဆက်ကို စဉ်းစားတတ်တယ်။', reverse: false },
  { id: 'icv02-25', dimensionId: 'personal-organization', themeIndex: 4, text: 'နေ့စဉ်သုံးပစ္စည်းတွေကို သတ်မှတ်ထားတဲ့နေရာမှာ ပြန်ထားဖို့ မကြာခဏ မေ့တတ်တယ်။', reverse: true },

  // IC6 — Curiosity and open thinking
  { id: 'icv02-26', dimensionId: 'curiosity-open-thinking', themeIndex: 0, text: 'မသိသေးတဲ့ အကြောင်းအရာတစ်ခုကို တွေ့ရင် ပိုသိဖို့ ကိုယ်တိုင်ရှာဖွေလေ့လာတတ်တယ်။', reverse: false },
  { id: 'icv02-27', dimensionId: 'curiosity-open-thinking', themeIndex: 1, text: 'ပြဿနာတစ်ခုကို ဖြေရှင်းဖို့ နည်းလမ်းတစ်မျိုးထက်ပိုပြီး စဉ်းစားတတ်တယ်။', reverse: false },
  { id: 'icv02-28', dimensionId: 'curiosity-open-thinking', themeIndex: 2, text: 'အနုပညာလက်ရာတွေ ဒါမှမဟုတ် သဘာဝအလှအပတွေထဲက အသေးစိတ်အချက်တွေကို သတိထားမိတတ်တယ်။', reverse: false },
  { id: 'icv02-29', dimensionId: 'curiosity-open-thinking', themeIndex: 3, text: 'မရင်းနှီးတဲ့ အယူအဆတစ်ခုကို ကြားရင် ပိုမိုမသိခင်မှာပဲ ပယ်ချမိတတ်တယ်။', reverse: true },
  { id: 'icv02-30', dimensionId: 'curiosity-open-thinking', themeIndex: 4, text: 'အကြံသစ်တစ်ခုကို လက်တွေ့စမ်းကြည့်နိုင်မယ့် အခြေအနေရှိရင် အသေးစားပုံစံနဲ့ စမ်းသပ်ကြည့်တတ်တယ်။', reverse: false },
]

export const INNERCOMPASS_V02_ANSWER_OPTIONS = [
  { value: 1, label: 'လုံးဝ မကိုက်ညီပါ' },
  { value: 2, label: 'မကိုက်ညီပါ' },
  { value: 3, label: 'အလယ်အလတ်ပါ' },
  { value: 4, label: 'ကိုက်ညီပါသည်' },
  { value: 5, label: 'အလွန်ကိုက်ညီပါသည်' },
]

export const INNERCOMPASS_V02_REVERSE_IDS = INNERCOMPASS_V02_QUESTIONS_30
  .filter((question) => question.reverse)
  .map((question) => question.id)

export const INNERCOMPASS_V02_PUBLICATION_STATUS = {
  pilotModeEnabledInApp: true,
  formalPublicReleaseApproved: false,
  expertReviewed: false,
  cognitiveInterviewCompleted: false,
  pilotCompleted: false,
  psychometricallyValidated: false,
}
