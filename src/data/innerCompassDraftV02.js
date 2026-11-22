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

/**
 * Additional 30 original reflection prompts for the 60-item (~10 min) mode.
 * Balanced at 5 items per dimension (1 per theme, 1 reverse-scored per dimension).
 */
export const INNERCOMPASS_V02_QUESTIONS_60_EXTRA = [
  // IC1 — Trust and accountability
  { id: 'icv02-31', dimensionId: 'trust-accountability', themeIndex: 0, text: 'အချိန်မီ မပြီးစီးနိုင်တော့မယ့် အခြေအနေဖြစ်လာရင် နောက်ဆုံးအချိန်ထိ မစောင့်ဘဲ ကြိုတင်အသိပေးတတ်တယ်။', reverse: false },
  { id: 'icv02-32', dimensionId: 'trust-accountability', themeIndex: 1, text: 'ကိုယ်ပြောလိုက်တဲ့ စကားတစ်ခွန်းက တစ်ဖက်လူရဲ့ စိတ်ခံစားမှုအပေါ် ဘယ်လိုသက်ရောက်နိုင်မလဲ ကြိုစဉ်းစားတတ်တယ်။', reverse: false },
  { id: 'icv02-33', dimensionId: 'trust-accountability', themeIndex: 2, text: 'အလုပ်တစ်ခု အဆင်မပြေဖြစ်သွားတဲ့အခါ ကိုယ့်ဘက်က လိုအပ်ချက်ကို စဉ်းစားမယ့်အစား အခြားအကြောင်းအရာတွေကိုပဲ အရင်အပြစ်တင်မိတတ်တယ်။', reverse: true },
  { id: 'icv02-34', dimensionId: 'trust-accountability', themeIndex: 3, text: 'အတူလုပ်ဆောင်နေသူတွေ သိထားသင့်တဲ့ အရေးကြီးအချက်တစ်ခုရှိရင် မေ့မသွားအောင် ပွင့်ပွင့်လင်းလင်း မျှဝေတတ်တယ်။', reverse: false },
  { id: 'icv02-35', dimensionId: 'trust-accountability', themeIndex: 4, text: 'တစ်စုံတစ်ယောက်က ကိုယ့်ကို ကူညီပေးခဲ့ရင် သူ့ရဲ့ ကြိုးစားမှုကို ကျေးဇူးတင်စကားနဲ့ ပြန်လည်အသိအမှတ်ပြုတတ်တယ်။', reverse: false },

  // IC2 — Emotional awareness and regulation
  { id: 'icv02-36', dimensionId: 'emotional-awareness-regulation', themeIndex: 0, text: 'စိတ်ပင်ပန်းလာတာ ဒါမှမဟုတ် စိတ်မကြည်မလင် ဖြစ်လာတာကို ကိုယ့်ကိုယ်ကို စောစောသတိထားမိတတ်တယ်။', reverse: false },
  { id: 'icv02-37', dimensionId: 'emotional-awareness-regulation', themeIndex: 1, text: 'စိတ်ဖိစီးမှု များလာတဲ့အခါ အသက်ပြင်းပြင်းရှူတာ ဒါမှမဟုတ် ခဏလမ်းလျှောက်တာလိုမျိုး စိတ်တည်ငြိမ်စေမယ့် နည်းလမ်းကို သုံးတတ်တယ်။', reverse: false },
  { id: 'icv02-38', dimensionId: 'emotional-awareness-regulation', themeIndex: 2, text: 'စိတ်ထဲမှာ လေးလံနေတဲ့အခါ ယုံကြည်ရတဲ့သူတစ်ယောက်ကို ဖွင့်ပြောဖို့ထက် တစ်ယောက်တည်းပဲ ကြိတ်မှိတ်သိမ်းထားမိတတ်တယ်။', reverse: true },
  { id: 'icv02-39', dimensionId: 'emotional-awareness-regulation', themeIndex: 3, text: 'တစ်စုံတစ်ယောက် စိတ်ဆိုးနေတာ ဒါမှမဟုတ် တိတ်ဆိတ်နေတာကို တွေ့ရင် သူဘာကြောင့် အဲဒီလိုခံစားနေရသလဲ နားလည်ဖို့ ကြိုးစားတတ်တယ်။', reverse: false },
  { id: 'icv02-40', dimensionId: 'emotional-awareness-regulation', themeIndex: 4, text: 'စိတ်မကောင်းစရာတစ်ခု ကြုံပြီးတဲ့အခါ ကိုယ့်စိတ်ကို ခဏအနားပေးပြီးမှ လုပ်စရာရှိတာတွေကို ပြန်အာရုံစိုက်တတ်တယ်။', reverse: false },

  // IC3 — Social self-expression
  { id: 'icv02-41', dimensionId: 'social-self-expression', themeIndex: 0, text: 'ပတ်ဝန်းကျင်အသစ်တစ်ခုကို ရောက်တဲ့အခါ အနားကလူတွေနဲ့ ရင်းနှီးမှုရအောင် ရိုးရိုးရှင်းရှင်း နှုတ်ဆက်စကား စတင်တတ်တယ်။', reverse: false },
  { id: 'icv02-42', dimensionId: 'social-self-expression', themeIndex: 1, text: 'အစည်းအဝေး ဒါမှမဟုတ် စကားဝိုင်းတစ်ခုမှာ ကိုယ့်မှာ အကြံကောင်းရှိပေမယ့် ထုတ်မပြောဘဲ ငြိမ်နေမိတတ်တယ်။', reverse: true },
  { id: 'icv02-43', dimensionId: 'social-self-expression', themeIndex: 2, text: 'သူငယ်ချင်းတွေ ဒါမှမဟုတ် လုပ်ဖော်ကိုင်ဖက်တွေနဲ့ အတူတူ စီစဉ်ရတဲ့အခါ ကိုယ်လည်း တက်တက်ကြွကြွ ပါဝင်ကူညီတတ်တယ်။', reverse: false },
  { id: 'icv02-44', dimensionId: 'social-self-expression', themeIndex: 3, text: 'လူအများရှေ့မှာ ကိုယ့်အကြောင်း ဒါမှမဟုတ် ကိုယ့်အမြင်ကို ပြောပြရတဲ့အခါ အဆင်ပြေပြေ ဖော်ပြနိုင်တယ်။', reverse: false },
  { id: 'icv02-45', dimensionId: 'social-self-expression', themeIndex: 4, text: 'တစ်ဖက်လူနဲ့ ရင်းနှီးမှုအတိုင်းအတာပေါ် မူတည်ပြီး ဘယ်လိုစကားမျိုး ပြောဆိုမလဲဆိုတာ သတိထားရွေးချယ်တတ်တယ်။', reverse: false },

  // IC4 — Handling disagreement
  { id: 'icv02-46', dimensionId: 'disagreement-handling', themeIndex: 0, text: 'တစ်ဖက်လူက ကိုယ်နဲ့မတူတဲ့ အမြင်ကို ပြောလာတဲ့အခါ ကြားဖြတ်မပြောဘဲ ဆုံးအောင် နားထောင်ပေးတတ်တယ်။', reverse: false },
  { id: 'icv02-47', dimensionId: 'disagreement-handling', themeIndex: 1, text: 'ကိုယ်ယူဆထားတာထက် ပိုသင့်တော်တဲ့ အချက်အလက်အသစ်ကို တွေ့ရင် ကိုယ့်အမြင်ကို ပြောင်းလဲဖို့ ဝန်မလေးတတ်ဘူး။', reverse: false },
  { id: 'icv02-48', dimensionId: 'disagreement-handling', themeIndex: 2, text: 'သဘောထားကွဲလွဲမှု ဖြစ်တဲ့အခါ နှစ်ဖက်စလုံး အဆင်ပြေနိုင်မယ့် အလယ်အလတ်နည်းလမ်းကို ရှာဖွေတတ်တယ်။', reverse: false },
  { id: 'icv02-49', dimensionId: 'disagreement-handling', themeIndex: 3, text: 'ကိုယ့်အယူအဆနဲ့ ဆန့်ကျင်တဲ့ အမြင်ကို ကြားရတဲ့အခါ ကိုယ့်ဘက်က မှန်တယ်ဆိုတာကိုပဲ သက်သေပြဖို့ အားစိုက်မိတတ်တယ်။', reverse: true },
  { id: 'icv02-50', dimensionId: 'disagreement-handling', themeIndex: 4, text: 'စကားများမယ့် အခြေအနေဖြစ်လာရင် စိတ်လိုက်မာန်ပါ မတုံ့ပြန်မိအောင် ခဏရပ်ပြီး အေးအေးဆေးဆေး ပြန်စဉ်းစားတတ်တယ်။', reverse: false },

  // IC5 — Personal organisation
  { id: 'icv02-51', dimensionId: 'personal-organization', themeIndex: 0, text: 'တစ်နေ့တာ လုပ်စရာတွေ များလာတဲ့အခါ ဘယ်အရာကို အရင်လုပ်မလဲဆိုတာ ဦးစားပေးအစီအစဉ် ဆွဲတတ်တယ်။', reverse: false },
  { id: 'icv02-52', dimensionId: 'personal-organization', themeIndex: 1, text: 'အလုပ်တစ်ခုကို စတင်ပြီးနောက် ပျင်းရိတာ ဒါမှမဟုတ် စိတ်ရှုပ်တာကြောင့် တစ်ဝက်တစ်ပျက်နဲ့ ရပ်ထားမိတတ်တယ်။', reverse: true },
  { id: 'icv02-53', dimensionId: 'personal-organization', themeIndex: 2, text: 'စာရင်းဇယား ဒါမှမဟုတ် အရေးကြီးတဲ့ စာရွက်စာတမ်းတွေကို မပေးပို့မီ အမှားအယွင်းမရှိအောင် သေချာပြန်စစ်တတ်တယ်။', reverse: false },
  { id: 'icv02-54', dimensionId: 'personal-organization', themeIndex: 3, text: 'အချိန်ကုန်မယ့် ဆုံးဖြတ်ချက်တစ်ခု မချခင် ရေရှည်မှာ ဘာတွေဖြစ်လာနိုင်မလဲ ကြိုတင်စဉ်းစားတတ်တယ်။', reverse: false },
  { id: 'icv02-55', dimensionId: 'personal-organization', themeIndex: 4, text: 'ဖိုင်တွေ၊ မှတ်စုတွေ ဒါမှမဟုတ် ကိုယ်ပိုင်ပစ္စည်းတွေကို နောက်တစ်ခါ ပြန်ရှာရလွယ်အောင် စနစ်တကျ သိမ်းဆည်းတတ်တယ်။', reverse: false },

  // IC6 — Curiosity and open thinking
  { id: 'icv02-56', dimensionId: 'curiosity-open-thinking', themeIndex: 0, text: 'နေ့စဉ်တွေ့ကြုံရတဲ့ အကြောင်းအရာအသစ်တွေအကြောင်း ဘာကြောင့် ဒီလိုဖြစ်ရသလဲဆိုတာ စိတ်ဝင်တစား မေးမြန်းလေ့လာတတ်တယ်။', reverse: false },
  { id: 'icv02-57', dimensionId: 'curiosity-open-thinking', themeIndex: 1, text: 'အခက်အခဲတစ်ခု ကြုံလာရင် ပုံမှန်လုပ်နေကျ နည်းလမ်းတစ်ခုတည်းမဟုတ်ဘဲ အခြားဖြစ်နိုင်ခြေတွေကိုပါ စဉ်းစားတတ်တယ်။', reverse: false },
  { id: 'icv02-58', dimensionId: 'curiosity-open-thinking', themeIndex: 2, text: 'သီချင်း၊ စာပေ ဒါမှမဟုတ် သဘာဝပတ်ဝန်းကျင်ထဲက လှပမှုတွေကို ခံစားကြည့်ရှုဖို့ အချိန်ပေးတတ်တယ်။', reverse: false },
  { id: 'icv02-59', dimensionId: 'curiosity-open-thinking', themeIndex: 3, text: 'ကိုယ်နဲ့ မရင်းနှီးတဲ့ ဓလေ့ ဒါမှမဟုတ် အတွေးအခေါ်အသစ်တစ်ခုကို တွေ့ရင် စိတ်ဝင်စားဖို့ထက် ရှောင်ဖယ်ချင်စိတ် ဖြစ်မိတတ်တယ်။', reverse: true },
  { id: 'icv02-60', dimensionId: 'curiosity-open-thinking', themeIndex: 4, text: 'နေ့စဉ်လုပ်ငန်းတွေကို ပိုကောင်းအောင် လုပ်နိုင်မယ့် နည်းလမ်းအသစ်တစ်ခု တွေ့ရင် ကိုယ်တိုင် အသေးစား စမ်းသုံးကြည့်တတ်တယ်။', reverse: false },
]

export const INNERCOMPASS_V02_QUESTIONS_60 = [
  ...INNERCOMPASS_V02_QUESTIONS_30,
  ...INNERCOMPASS_V02_QUESTIONS_60_EXTRA,
]

/**
 * Additional 60 original reflection prompts for the 120-item (~20 min) mode.
 * Balanced at 10 items per dimension (2 per theme, 2 reverse-scored per dimension).
 */
export const INNERCOMPASS_V02_QUESTIONS_120_EXTRA = [
  // IC1 — Trust and accountability (10 items: 2 per theme, 2 reverse)
  { id: 'icv02-61', dimensionId: 'trust-accountability', themeIndex: 0, text: 'တစ်စုံတစ်ယောက်ကို ပေးထားတဲ့ ကတိသေးသေးလေးပဲဖြစ်ဖြစ် မမေ့မလျော့ ဖြည့်ဆည်းပေးဖို့ ဂရုစိုက်တတ်တယ်။', reverse: false },
  { id: 'icv02-62', dimensionId: 'trust-accountability', themeIndex: 0, text: 'ကိုယ်မလုပ်နိုင်မှန်း သိနေတဲ့ အလုပ်တစ်ခုကို အားနာတာကြောင့် လုပ်ပေးမယ်လို့ လွယ်လွယ်ကတိပေးမိတတ်တယ်။', reverse: true },
  { id: 'icv02-63', dimensionId: 'trust-accountability', themeIndex: 1, text: 'မိသားစု ဒါမှမဟုတ် အဖွဲ့အစည်းနဲ့ ဆိုင်တဲ့ ရွေးချယ်မှုလုပ်တဲ့အခါ အခြားသူတွေရဲ့ အဆင်ပြေမှုကိုပါ ထည့်သွင်းစဉ်းစားတတ်တယ်။', reverse: false },
  { id: 'icv02-64', dimensionId: 'trust-accountability', themeIndex: 1, text: 'ကိုယ့်အတွက် အကျိုးရှိမယ့် ဆုံးဖြတ်ချက်တစ်ခုကြောင့် အခြားသူတွေ ဘယ်လိုအခက်အခဲ ကြုံနိုင်မလဲ ပြန်သုံးသပ်တတ်တယ်။', reverse: false },
  { id: 'icv02-65', dimensionId: 'trust-accountability', themeIndex: 2, text: 'အမှားတစ်ခု ဖြစ်သွားတဲ့အခါ ဆင်ခြေပေးဖို့ထက် ဘယ်နေရာမှာ ကိုယ့်ဘက်က ပြင်ဆင်နိုင်မလဲ အရင်ကြည့်တတ်တယ်။', reverse: false },
  { id: 'icv02-66', dimensionId: 'trust-accountability', themeIndex: 2, text: 'ကိုယ့်တာဝန်ပိုင်းမှာ လစ်ဟင်းမှု ရှိသွားရင်တောင် အခြားသူတွေ သတိမထားမိသေးသရွေ့ ငြိမ်နေမိတတ်တယ်။', reverse: true },
  { id: 'icv02-67', dimensionId: 'trust-accountability', themeIndex: 3, text: 'အတူလုပ်နေတဲ့ အလုပ်မှာ ပြဿနာအရိပ်အယောင် စတွေ့တာနဲ့ သက်ဆိုင်သူတွေကို ပွင့်ပွင့်လင်းလင်း အသိပေးတတ်တယ်။', reverse: false },
  { id: 'icv02-68', dimensionId: 'trust-accountability', themeIndex: 3, text: 'ကိုယ်နားမလည်သေးတဲ့ အချက်တစ်ခုရှိရင် သိသလို ဟန်ဆောင်မနေဘဲ မေးမြန်းအတည်ပြုတတ်တယ်။', reverse: false },
  { id: 'icv02-69', dimensionId: 'trust-accountability', themeIndex: 4, text: 'နောက်ကွယ်ကနေ တိတ်တဆိတ် ကူညီပေးခဲ့သူတွေရဲ့ ကြိုးစားမှုကိုလည်း မေ့မထားဘဲ ဖော်ပြအသိအမှတ်ပြုတတ်တယ်။', reverse: false },
  { id: 'icv02-70', dimensionId: 'trust-accountability', themeIndex: 4, text: 'တစ်စုံတစ်ယောက်ရဲ့ အကြံဉာဏ်ကို ယူသုံးဖြစ်တဲ့အခါ သူ့ရဲ့ ပါဝင်မှုကို ထုတ်ဖော်ပြောဆိုတတ်တယ်။', reverse: false },

  // IC2 — Emotional awareness and regulation (10 items: 2 per theme, 2 reverse)
  { id: 'icv02-71', dimensionId: 'emotional-awareness-regulation', themeIndex: 0, text: 'စိတ်တိုနေတာလား၊ ဝမ်းနည်းနေတာလား၊ စိုးရိမ်နေတာလားဆိုတာကို ကိုယ့်စိတ်ထဲမှာ ခွဲခြားသိမြင်တတ်တယ်။', reverse: false },
  { id: 'icv02-72', dimensionId: 'emotional-awareness-regulation', themeIndex: 0, text: 'တစ်နေ့တာအတွင်း ကိုယ့်စိတ်ခံစားချက် ဘာကြောင့် ပြောင်းလဲသွားသလဲဆိုတာ ပြန်သတိထားမိတတ်တယ်။', reverse: false },
  { id: 'icv02-73', dimensionId: 'emotional-awareness-regulation', themeIndex: 1, text: 'အရေးပေါ်အခြေအနေ ဒါမှမဟုတ် ဖိအားများတဲ့အချိန်မှာ စိတ်လောပြီး မလုပ်မိအောင် ကိုယ့်ကိုယ်ကို ထိန်းနိုင်တယ်။', reverse: false },
  { id: 'icv02-74', dimensionId: 'emotional-awareness-regulation', themeIndex: 1, text: 'စိတ်ရှုပ်ထွေးလာတဲ့အခါ ခံစားချက်တွေကို မထိန်းနိုင်ဘဲ အနီးအနားကလူတွေအပေါ် စိတ်တိုတိုနဲ့ တုံ့ပြန်မိတတ်တယ်။', reverse: true },
  { id: 'icv02-75', dimensionId: 'emotional-awareness-regulation', themeIndex: 2, text: 'ကိုယ့်စိတ်ထဲမှာ မနိုင်မနင်း ခံစားရတဲ့အခါ မိတ်ဆွေ ဒါမှမဟုတ် မိသားစုဆီက အားပေးစကားနဲ့ အကြံဉာဏ် တောင်းတတ်တယ်။', reverse: false },
  { id: 'icv02-76', dimensionId: 'emotional-awareness-regulation', themeIndex: 2, text: 'အခက်အခဲ ကြုံနေချိန်မှာ အကူအညီတောင်းရင် အားနည်းရာကျမယ်ထင်ပြီး တစ်ယောက်တည်း ကြိတ်ခံနေမိတတ်တယ်။', reverse: true },
  { id: 'icv02-77', dimensionId: 'emotional-awareness-regulation', themeIndex: 3, text: 'တစ်ဖက်လူရဲ့ လေသံနဲ့ မျက်နှာအမူအရာကို ကြည့်ပြီး သူ့စိတ်အခြေအနေကို သတိထားနားလည်တတ်တယ်။', reverse: false },
  { id: 'icv02-78', dimensionId: 'emotional-awareness-regulation', themeIndex: 3, text: 'အခြားသူတစ်ယောက် ခံစားနေရချိန်မှာ ချက်ချင်းဆုံးမစကားပြောဖို့ထက် သူ့ခံစားချက်ကို အရင်နားလည်ပေးတတ်တယ်။', reverse: false },
  { id: 'icv02-79', dimensionId: 'emotional-awareness-regulation', themeIndex: 4, text: 'မမျှော်လင့်ထားတဲ့ အနှောင့်အယှက်တစ်ခု ကြုံပြီးနောက် ကိုယ့်စိတ်ကို ပြန်စုစည်းပြီး အလုပ်ဆက်လုပ်နိုင်တယ်။', reverse: false },
  { id: 'icv02-80', dimensionId: 'emotional-awareness-regulation', themeIndex: 4, text: 'စိတ်အနှောင့်အယှက် ဖြစ်စရာတစ်ခု ပြီးသွားပေမယ့် ကျန်တဲ့တစ်နေ့လုံး ဘာမှဆက်မလုပ်နိုင်အောင် စိတ်ထဲစွဲနေတတ်တယ်။', reverse: false },

  // IC3 — Social self-expression (10 items: 2 per theme, 2 reverse)
  { id: 'icv02-81', dimensionId: 'social-self-expression', themeIndex: 0, text: 'ပွဲလမ်းသဘင် ဒါမှမဟုတ် သင်တန်းလို နေရာမျိုးမှာ လူသစ်တွေနဲ့ မိတ်ဆက်စကားပြောရတာ သက်သောင့်သက်သာ ရှိတယ်။', reverse: false },
  { id: 'icv02-82', dimensionId: 'social-self-expression', themeIndex: 0, text: 'မရင်းနှီးတဲ့ လူအုပ်စုထဲ ရောက်သွားတဲ့အခါ တစ်ယောက်တည်းပဲ ဘေးနားမှာ တိတ်တိတ်နေမိတတ်တယ်။', reverse: true },
  { id: 'icv02-83', dimensionId: 'social-self-expression', themeIndex: 1, text: 'ဆွေးနွေးပွဲတစ်ခုမှာ ကိုယ့်အတွေးအမြင်က အထောက်အကူ ဖြစ်မယ်ထင်ရင် ယုံကြည်မှုရှိရှိ မျှဝေတတ်တယ်။', reverse: false },
  { id: 'icv02-84', dimensionId: 'social-self-expression', themeIndex: 1, text: 'ကိုယ်သဘောမတူတဲ့ အကြောင်းအရာတစ်ခု ဆွေးနွေးနေရင်တောင် ယဉ်ယဉ်ကျေးကျေးနဲ့ ကိုယ့်အမြင်ကို ထည့်ပြောတတ်တယ်။', reverse: false },
  { id: 'icv02-85', dimensionId: 'social-self-expression', themeIndex: 2, text: 'အများနဲ့ စုပေါင်းလုပ်ရတဲ့ အလုပ်တွေမှာ အားလုံးအဆင်ပြေအောင် ကိုယ်တတ်နိုင်တဲ့ဘက်က ဝင်ကူတတ်တယ်။', reverse: false },
  { id: 'icv02-86', dimensionId: 'social-self-expression', themeIndex: 2, text: 'အဖွဲ့အစည်းထဲမှာ လူတွေ စကားဝိုင်းဖွဲ့နေတဲ့အခါ ကိုယ်လည်း သဘာဝကျကျ ဝင်ရောနှောတတ်တယ်။', reverse: false },
  { id: 'icv02-87', dimensionId: 'social-self-expression', themeIndex: 3, text: 'လူအများရှေ့မှာ ရှင်းလင်းတင်ပြရမယ့် အလှည့်ရောက်ရင် စိတ်လှုပ်ရှားပေမယ့် ကိုယ်ပြောချင်တာကို ပြီးဆုံးအောင် ပြောနိုင်တယ်။', reverse: false },
  { id: 'icv02-88', dimensionId: 'social-self-expression', themeIndex: 3, text: 'လူများတဲ့အခါ ကိုယ့်အမြင်ကို ထုတ်ပြောရမှာ စိုးရိမ်လို့ အရေးကြီးတဲ့အချက်တွေကိုတောင် မပြောဘဲ ချန်ထားမိတတ်တယ်။', reverse: true },
  { id: 'icv02-89', dimensionId: 'social-self-expression', themeIndex: 4, text: 'ပေါ့ပေါ့ပါးပါး စကားဝိုင်းနဲ့ တရားဝင်အခြေအနေတွေမှာ ကိုယ့်ပြောဆိုပုံကို သင့်တော်သလို ချိန်ညှိတတ်တယ်။', reverse: false },
  { id: 'icv02-90', dimensionId: 'social-self-expression', themeIndex: 4, text: 'ကိုယ့်ကိုယ်ပိုင်နယ်နိမိတ်နဲ့ သင့်တော်သလောက်ပဲ ကိုယ်ရေးကိုယ်တာ အကြောင်းတွေကို မျှဝေတတ်တယ်။', reverse: false },

  // IC4 — Handling disagreement (10 items: 2 per theme, 2 reverse)
  { id: 'icv02-91', dimensionId: 'disagreement-handling', themeIndex: 0, text: 'တစ်ဖက်လူရဲ့ အမြင်ကို သဘောမတူရင်တောင် သူဘာကြောင့် အဲဒီလိုမြင်ရသလဲဆိုတာ နားလည်အောင် နားထောင်တတ်တယ်။', reverse: false },
  { id: 'icv02-92', dimensionId: 'disagreement-handling', themeIndex: 0, text: 'ဆွေးနွေးနေတုန်း တစ်ဖက်လူ စကားမဆုံးသေးခင်မှာပဲ ကိုယ့်ဘက်က ပြန်ချေပဖို့ စိတ်စောနေမိတတ်တယ်။', reverse: true },
  { id: 'icv02-93', dimensionId: 'disagreement-handling', themeIndex: 1, text: 'ကိုယ်မှားနေကြောင်း ခိုင်လုံတဲ့ အထောက်အထား တွေ့ရင် မာနမထားဘဲ ကိုယ့်အမြင်ကို ပြန်ပြင်တတ်တယ်။', reverse: false },
  { id: 'icv02-94', dimensionId: 'disagreement-handling', themeIndex: 1, text: 'အချိန်ကြာလာတာနဲ့အမျှ အတွေ့အကြုံအသစ်တွေပေါ် မူတည်ပြီး ကိုယ့်အယူအဆဟောင်းတွေကို ပြန်သုံးသပ်တတ်တယ်။', reverse: false },
  { id: 'icv02-95', dimensionId: 'disagreement-handling', themeIndex: 2, text: 'အမြင်မတူမှု ဖြစ်တဲ့အခါ ဘယ်သူနိုင်မလဲဆိုတာထက် နှစ်ဖက်စလုံးအတွက် အကျိုးရှိမယ့် အဖြေကို ဦးစားပေးတတ်တယ်။', reverse: false },
  { id: 'icv02-96', dimensionId: 'disagreement-handling', themeIndex: 2, text: 'သဘောထားကွဲလွဲနေတဲ့ ကိစ္စတစ်ခုမှာ နှစ်ဖက်စလုံး တူညီတဲ့အချက်လေးတွေကို အရင်ရှာဖွေတတ်တယ်။', reverse: false },
  { id: 'icv02-97', dimensionId: 'disagreement-handling', themeIndex: 3, text: 'ကိုယ့်အတွေးအမြင်နဲ့ မတူတဲ့ ရှုထောင့်တစ်ခုကို ကြားရတဲ့အခါ အဲဒီအမြင်မှာ ဘယ်အချက်တွေ မှန်နိုင်မလဲ စဉ်းစားကြည့်တတ်တယ်။', reverse: false },
  { id: 'icv02-98', dimensionId: 'disagreement-handling', themeIndex: 3, text: 'တစ်စုံတစ်ယောက်က ကိုယ့်အကြံကို ဝေဖန်လာရင် အကြောင်းအရာကို စဉ်းစားဖို့ထက် ကိုယ့်ကို တိုက်ခိုက်တယ်လို့ပဲ ခံစားမိတတ်တယ်။', reverse: true },
  { id: 'icv02-99', dimensionId: 'disagreement-handling', themeIndex: 4, text: 'စကားပြောရင်း တင်းမာလာတဲ့အခါ အခြေအနေ ပိုဆိုးမသွားအောင် ခဏနားပြီးမှ ပြန်ဆွေးနွေးဖို့ အကြံပြုတတ်တယ်။', reverse: false },
  { id: 'icv02-100', dimensionId: 'disagreement-handling', themeIndex: 4, text: 'စိတ်လှုပ်ရှားနေချိန်မှာ မက်ဆေ့ချ် ဒါမှမဟုတ် စကားပြန်ဖို့ အလျင်စလို မလုပ်ဘဲ စိတ်အေးမှ ပြန်ပြောတတ်တယ်။', reverse: false },

  // IC5 — Personal organisation (10 items: 2 per theme, 2 reverse)
  { id: 'icv02-101', dimensionId: 'personal-organization', themeIndex: 0, text: 'အလုပ်ကြီးတစ်ခု ရလာတဲ့အခါ လုပ်ရလွယ်အောင် အပိုင်းငယ်လေးတွေ ခွဲပြီး အဆင့်လိုက် စီစဉ်တတ်တယ်။', reverse: false },
  { id: 'icv02-102', dimensionId: 'personal-organization', themeIndex: 0, text: 'တစ်ပတ်စာ ဒါမှမဟုတ် တစ်နေ့စာ အဓိကလုပ်စရာတွေကို မှတ်စုထဲမှာ ကြိုတင်ချရေးထားတတ်တယ်။', reverse: false },
  { id: 'icv02-103', dimensionId: 'personal-organization', themeIndex: 1, text: 'စိတ်ပါဝင်စားမှု လျော့သွားတဲ့အခါမျိုးမှာတောင် ပြီးဆုံးရမယ့်အလုပ်ကို အပြီးသတ်နိုင်အောင် ဆက်ကြိုးစားတတ်တယ်။', reverse: false },
  { id: 'icv02-104', dimensionId: 'personal-organization', themeIndex: 1, text: 'အလုပ်တစ်ခုကို စတင်ဖို့ အချိန်ရွှေ့ဆိုင်းနေမိပြီး နောက်ဆုံးအချိန်ရောက်မှ အလောသုံးဆယ် လုပ်မိတတ်တယ်။', reverse: true },
  { id: 'icv02-105', dimensionId: 'personal-organization', themeIndex: 2, text: 'အရေးကြီးတဲ့ အချိန်းအချက်၊ ရက်စွဲနဲ့ အချက်အလက်တွေကို နှစ်ခါပြန်စစ်ဆေးပြီးမှ အတည်ပြုတတ်တယ်။', reverse: false },
  { id: 'icv02-106', dimensionId: 'personal-organization', themeIndex: 2, text: 'အလုပ်တစ်ခု ပြီးသွားတာနဲ့ စိတ်ချပြီး အသေးစိတ်အမှားလေးတွေ ကျန်မကျန် ပြန်မစစ်ဘဲ ထားလိုက်မိတတ်တယ်။', reverse: true },
  { id: 'icv02-107', dimensionId: 'personal-organization', themeIndex: 3, text: 'ငွေကြေး ဒါမှမဟုတ် အချိန်ကုန်ကျမယ့် ကိစ္စတွေမှာ လတ်တလော အဆင်ပြေမှုထက် ရေရှည်အကျိုးဆက်ကို ကြည့်တတ်တယ်။', reverse: false },
  { id: 'icv02-108', dimensionId: 'personal-organization', themeIndex: 3, text: 'အစီအစဉ်တစ်ခု မစခင် မမျှော်လင့်ထားတဲ့ အခက်အခဲဖြစ်လာရင် ဘယ်လိုဖြေရှင်းမလဲဆိုတာပါ ကြိုတွေးထားတတ်တယ်။', reverse: false },
  { id: 'icv02-109', dimensionId: 'personal-organization', themeIndex: 4, text: 'ဖုန်းနဲ့ ကွန်ပျူတာထဲက ဖိုင်တွေ၊ ဓာတ်ပုံတွေကို ရှာရလွယ်အောင် အုပ်စုခွဲပြီး သိမ်းတတ်တယ်။', reverse: false },
  { id: 'icv02-110', dimensionId: 'personal-organization', themeIndex: 4, text: 'ကိုယ်နေထိုင်တဲ့ အခန်း ဒါမှမဟုတ် အလုပ်စားပွဲကို သပ်သပ်ရပ်ရပ်ဖြစ်အောင် ပုံမှန်ပြန်ရှင်းလင်းတတ်တယ်။', reverse: false },

  // IC6 — Curiosity and open thinking (10 items: 2 per theme, 2 reverse)
  { id: 'icv02-111', dimensionId: 'curiosity-open-thinking', themeIndex: 0, text: 'စိတ်ဝင်စားစရာ အကြောင်းအရာအသစ်တစ်ခု ကြားရရင် အသေးစိတ်သိရအောင် စာဖတ်တာ ဒါမှမဟုတ် ရှာဖွေကြည့်တာ လုပ်တတ်တယ်။', reverse: false },
  { id: 'icv02-112', dimensionId: 'curiosity-open-thinking', themeIndex: 0, text: 'ကိုယ်နဲ့ မဆိုင်သေးတဲ့ ပညာရပ် ဒါမှမဟုတ် ဗဟုသုတအသစ်တွေကိုလည်း သိချင်စိတ်နဲ့ လေ့လာကြည့်တတ်တယ်။', reverse: false },
  { id: 'icv02-113', dimensionId: 'curiosity-open-thinking', themeIndex: 1, text: 'ကိစ္စတစ်ခုကို ရှုထောင့်တစ်ခုတည်းကနေ မကြည့်ဘဲ အခြားသူတွေရဲ့ အမြင်ကနေပါ စဉ်းစားကြည့်တတ်တယ်။', reverse: false },
  { id: 'icv02-114', dimensionId: 'curiosity-open-thinking', themeIndex: 1, text: 'ပုံမှန်လုပ်နေကျ နည်းလမ်းက အလုပ်ဖြစ်နေသရွေ့ အခြားပိုကောင်းနိုင်တဲ့ နည်းလမ်းအသစ်တွေကို စဉ်းစားဖို့ စိတ်မဝင်စားတတ်ဘူး။', reverse: true },
  { id: 'icv02-115', dimensionId: 'curiosity-open-thinking', themeIndex: 2, text: 'ကောင်းကင်အရောင်ပြောင်းတာ၊ သစ်ပင်ပန်းမန်တွေ ဒါမှမဟုတ် ဖန်တီးမှုလက်ရာတွေကို ကြည့်ပြီး စိတ်ချမ်းသာမှု ခံစားရတတ်တယ်။', reverse: false },
  { id: 'icv02-116', dimensionId: 'curiosity-open-thinking', themeIndex: 2, text: 'စာအုပ်ကောင်းတစ်အုပ်၊ ရုပ်ရှင် ဒါမှမဟုတ် အနုပညာတစ်ခုထဲက အတွေးအခေါ်တွေကို ပြန်လည်ခံစားတွေးတောတတ်တယ်။', reverse: false },
  { id: 'icv02-117', dimensionId: 'curiosity-open-thinking', themeIndex: 3, text: 'မတူညီတဲ့ လူနေမှုပုံစံနဲ့ ယဉ်ကျေးမှုတွေအကြောင်း ကြားရရင် အကဲဖြတ်ဖို့ထက် နားလည်ချင်စိတ် ပိုများတယ်။', reverse: false },
  { id: 'icv02-118', dimensionId: 'curiosity-open-thinking', themeIndex: 3, text: 'ကိုယ်နဲ့ အမြင်မတူတဲ့ အယူအဆအသစ်တွေကို နားထောင်ရတာ အချိန်ကုန်တယ်လို့ ခံစားမိတတ်တယ်။', reverse: true },
  { id: 'icv02-119', dimensionId: 'curiosity-open-thinking', themeIndex: 4, text: 'မချက်ဖူးသေးတဲ့ ဟင်းတစ်မျိုး ဒါမှမဟုတ် မလုပ်ဖူးသေးတဲ့ ဝါသနာအသစ်တစ်ခုကို စမ်းကြည့်ရတာ ပျော်တတ်တယ်။', reverse: false },
  { id: 'icv02-120', dimensionId: 'curiosity-open-thinking', themeIndex: 4, text: 'နေ့စဉ်ဘဝမှာ အသုံးဝင်နိုင်မယ့် နည်းပညာ ဒါမှမဟုတ် အလေ့အကျင့်အသစ်တွေကို လက်တွေ့စမ်းသပ်သင်ယူတတ်တယ်။', reverse: false },
]

export const INNERCOMPASS_V02_QUESTIONS_120 = [
  ...INNERCOMPASS_V02_QUESTIONS_60,
  ...INNERCOMPASS_V02_QUESTIONS_120_EXTRA,
]

export const INNERCOMPASS_V02_LEVELS = [
  {
    value: 30,
    title: 'အခြေခံ ၃၀ မေးခွန်း',
    subtitle: 'အဓိက အချက် ၆ ချက်ကို အကျဉ်းချုပ် ပြန်လည်သုံးသပ်ရန်',
    duration: '~၅ မိနစ်',
    label: 'အခြေခံ',
    recommended: true,
  },
  {
    value: 60,
    title: 'အသေးစိတ် ၆၀ မေးခွန်း',
    subtitle: 'အချက် ၆ ချက်ကို မေးခွန်းပိုများဖြင့် ပိုမိုစုံလင်စွာ သုံးသပ်ရန်',
    duration: '~၁၀ မိနစ်',
    label: 'အသေးစိတ်',
    recommended: false,
  },
  {
    value: 120,
    title: 'အနက်ရှိုင်းဆုံး ၁၂၀ မေးခွန်း',
    subtitle: 'အချက် ၆ ချက်ကို ရှုထောင့်စုံမှ အနက်ရှိုင်းဆုံး ပြန်လည်သုံးသပ်ရန်',
    duration: '~၂၀ မိနစ်',
    label: 'အနက်ရှိုင်းဆုံး',
    recommended: false,
  },
]

export function getInnerCompassQuestionsForLevel(level = 30) {
  if (Number(level) === 120) return INNERCOMPASS_V02_QUESTIONS_120
  if (Number(level) === 60) return INNERCOMPASS_V02_QUESTIONS_60
  return INNERCOMPASS_V02_QUESTIONS_30
}

export const INNERCOMPASS_V02_PUBLICATION_STATUS = {
  pilotModeEnabledInApp: true,
  formalPublicReleaseApproved: false,
  expertReviewed: false,
  cognitiveInterviewCompleted: false,
  pilotCompleted: false,
  psychometricallyValidated: false,
}
