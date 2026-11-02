/**
 * InnerCompass original Burmese reflection-question draft.
 *
 * This is an in-house, non-diagnostic self-reflection draft. It is not an
 * official or equivalent administration of any third-party personality test.
 * Do not publish this question bank as psychometrically validated until it has
 * undergone language review, expert review, pilot testing, and psychometric study.
 */

export const INNERCOMPASS_DRAFT_VERSION = 'innercompass-draft-0.1.0'

export const INNERCOMPASS_DIMENSIONS = [
  {
    id: 'integrity',
    code: 'IC1',
    name: 'ရိုးသားပွင့်လင်းစွာ ရပ်တည်မှု',
    shortName: 'ရိုးသားပွင့်လင်းမှု',
    description: 'စကားနဲ့ လုပ်ရပ်ညီညွတ်မှု၊ မျှတစွာ ဆုံးဖြတ်မှုနဲ့ ကိုယ့်တာဝန်ကို ဝန်ခံပုံကို ပြန်လည်သုံးသပ်ခြင်း။',
    color: '#80678f',
    themes: ['စကားနှင့် လုပ်ရပ်ညီညွတ်မှု', 'မျှတစွာ ဆုံးဖြတ်မှု', 'အမှားကို တာဝန်ယူမှု', 'အကျိုးစီးပွားပဋိပက္ခကို ကိုင်တွယ်မှု', 'အခြားသူ၏ ပါဝင်မှုကို အသိအမှတ်ပြုမှု'],
  },
  {
    id: 'emotional-awareness',
    code: 'IC2',
    name: 'စိတ်ခံစားချက်ကို သိမြင်ကိုင်တွယ်ခြင်း',
    shortName: 'စိတ်ခံစားမှုကို ကိုင်တွယ်ပုံ',
    description: 'ကိုယ့်ခံစားချက်ကို သတိပြုမှု၊ ဖိအားကို ကိုင်တွယ်မှု၊ အကူအညီတောင်းနိုင်မှုနဲ့ စာနာနားလည်မှုကို လေ့လာခြင်း။',
    color: '#b87969',
    themes: ['ခံစားချက်ကို သတိပြုမှု', 'ဖိအားကို ကိုင်တွယ်မှု', 'လိုအပ်ချိန် အကူအညီတောင်းမှု', 'အခြားသူ၏ ခံစားချက်ကို နားလည်မှု', 'စိတ်အနှောင့်အယှက်ပြီးနောက် ပြန်လည်ထူထောင်မှု'],
  },
  {
    id: 'social-expression',
    code: 'IC3',
    name: 'လူမှုယုံကြည်မှုနှင့် ကိုယ့်အမြင်ဖော်ပြမှု',
    shortName: 'လူမှုယုံကြည်မှု',
    description: 'လူသစ်တွေနဲ့ ဆက်သွယ်ပုံ၊ အုပ်စုထဲ ပါဝင်ပုံနဲ့ ကိုယ့်အမြင်ကို ဖော်ပြနိုင်ပုံကို လေ့လာခြင်း။',
    color: '#527daa',
    themes: ['လူသစ်နှင့် စကားစတင်မှု', 'အုပ်စုထဲတွင် အမြင်ဖော်ပြမှု', 'အတူတကွ လုပ်ဆောင်မှုတွင် ပါဝင်မှု', 'လူအများရှေ့တွင် ပြောဆိုမှု', 'မတူညီသော လူမှုအခြေအနေတွင် ကိုယ့်ကိုယ်ကို ဖော်ပြမှု'],
  },
  {
    id: 'conflict-flexibility',
    code: 'IC4',
    name: 'သဘောထားမတူမှုကို ကိုင်တွယ်ပုံ',
    shortName: 'သဘောထားကွဲလွဲမှုကို ကိုင်တွယ်ပုံ',
    description: 'အမြင်မတူမှုကို နားထောင်ပုံ၊ အချက်အလက်အသစ်အပေါ် ပြန်လည်စဉ်းစားပုံနဲ့ ညှိနှိုင်းဖြေရှင်းပုံကို လေ့လာခြင်း။',
    color: '#78875c',
    themes: ['မတူညီသော အမြင်ကို နားထောင်မှု', 'အချက်အလက်အပေါ် မူတည်၍ အမြင်ပြင်ဆင်မှု', 'နှစ်ဖက်လက်ခံနိုင်သော ဖြေရှင်းနည်းရှာဖွေမှု', 'ကိုယ့်အမြင်ကို ပြန်လည်သုံးသပ်မှု', 'စိတ်တိုချိန် တုံ့ပြန်မှုကို ထိန်းညှိမှု'],
  },
  {
    id: 'self-management',
    code: 'IC5',
    name: 'ကိုယ်ပိုင်စီမံခန့်ခွဲမှု',
    shortName: 'ကိုယ်ပိုင်စီမံမှု',
    description: 'အချိန်စီမံမှု၊ လုပ်ငန်းပြီးမြောက်အောင် ဆောင်ရွက်မှု၊ အသေးစိတ်ဂရုစိုက်မှုနဲ့ ဆုံးဖြတ်ချက်ချမှုပုံစံကို လေ့လာခြင်း။',
    color: '#9a7c54',
    themes: ['အလုပ်မစမီ အစီအစဉ်ချမှု', 'စတင်ထားသောအလုပ်ကို ပြီးမြောက်စေမှု', 'အသေးစိတ်အချက်များကို စစ်ဆေးမှု', 'အကျိုးဆက်ကို စဉ်းစားပြီး ဆုံးဖြတ်မှု', 'ပစ္စည်းနှင့် လုပ်ငန်းနေရာကို စနစ်တကျထားမှု'],
  },
  {
    id: 'curiosity-creativity',
    code: 'IC6',
    name: 'စူးစမ်းလိုစိတ်နှင့် ဖန်တီးတွေးခေါ်မှု',
    shortName: 'စူးစမ်းဖန်တီးမှု',
    description: 'မသိသေးသောအရာများကို ရှာဖွေမှု၊ နည်းလမ်းသစ်စဉ်းစားမှုနဲ့ အတွေ့အကြုံသစ်ကို စမ်းသပ်လိုစိတ်ကို လေ့လာခြင်း။',
    color: '#6e8790',
    themes: ['မသိသေးသောအကြောင်းအရာကို ရှာဖွေမှု', 'ဖြေရှင်းနည်းအမျိုးမျိုး စဉ်းစားမှု', 'အလှအပနှင့် ဖန်တီးမှုကို ခံစားမှု', 'မတူညီသော အယူအဆကို စဉ်းစားကြည့်မှု', 'အကြံသစ်ကို လက်တွေ့စမ်းသပ်မှု'],
  },
]

/** 30-item exploratory draft: one original item for each of 30 reflection themes. */
export const INNERCOMPASS_QUESTIONS_30 = [
  { id: 'ic01', dimensionId: 'integrity', themeIndex: 0, text: 'ကိုယ်ပြောထားတဲ့ ကတိနဲ့ လုပ်ဆောင်ချက် မကိုက်ညီသွားတဲ့အခါ အကြောင်းရင်းကို ဖုံးကွယ်မထားဘဲ ရှင်းပြတတ်တယ်။', reverse: false },
  { id: 'ic02', dimensionId: 'integrity', themeIndex: 1, text: 'ကိုယ့်အတွက် အကျိုးရှိပေမယ့် တခြားသူအပေါ် မမျှတတဲ့ ဆုံးဖြတ်ချက်ဖြစ်နေတယ်ဆိုရင် ပြန်စဉ်းစားတတ်တယ်။', reverse: false },
  { id: 'ic03', dimensionId: 'integrity', themeIndex: 2, text: 'ကိုယ့်အမှားကို သတိပြုမိတဲ့အခါ အကြောင်းပြချက်ရှာမနေဘဲ ကိုယ့်တာဝန်ကို ဝန်ခံတတ်တယ်။', reverse: false },
  { id: 'ic04', dimensionId: 'integrity', themeIndex: 3, text: 'ကိုယ့်အတွက် အဆင်ပြေစေဖို့ အရေးကြီးတဲ့အချက်တချို့ကို မပြောဘဲ ချန်ထားမိတတ်တယ်။', reverse: true },
  { id: 'ic05', dimensionId: 'integrity', themeIndex: 4, text: 'အောင်မြင်မှုတစ်ခု ရလာတဲ့အခါ ကူညီပေးခဲ့သူတွေရဲ့ ပါဝင်မှုကို အသိအမှတ်ပြုတတ်တယ်။', reverse: false },

  { id: 'ic06', dimensionId: 'emotional-awareness', themeIndex: 0, text: 'ကိုယ်ဘာခံစားနေရတယ်ဆိုတာကို သတိထားမိပြီး စကားနဲ့ ဖော်ပြနိုင်တတ်တယ်။', reverse: false },
  { id: 'ic07', dimensionId: 'emotional-awareness', themeIndex: 1, text: 'ဖိအားများတဲ့အချိန်မှာ ကိုယ့်ကို တည်ငြိမ်စေမယ့် နည်းလမ်းတစ်ခုခုကို ရှာဖွေတတ်တယ်။', reverse: false },
  { id: 'ic08', dimensionId: 'emotional-awareness', themeIndex: 2, text: 'အကူအညီလိုအပ်တဲ့အခါ ယုံကြည်ရသူတစ်ယောက်ကို ပြောပြဖို့ ဝန်မလေးဘူး။', reverse: false },
  { id: 'ic09', dimensionId: 'emotional-awareness', themeIndex: 3, text: 'တခြားသူတစ်ယောက် ဘာကြောင့် အဲဒီလိုခံစားနေရသလဲဆိုတာ သူ့အခြေအနေကနေ စဉ်းစားကြည့်တတ်တယ်။', reverse: false },
  { id: 'ic10', dimensionId: 'emotional-awareness', themeIndex: 4, text: 'စိတ်အနှောင့်အယှက်ဖြစ်စရာတစ်ခု ကြုံပြီးနောက် ပုံမှန်လုပ်ငန်းတွေကို ပြန်စနိုင်ဖို့ အချိန်ကြာကြာ ခက်ခဲနေတတ်တယ်။', reverse: true },

  { id: 'ic11', dimensionId: 'social-expression', themeIndex: 0, text: 'မရင်းနှီးသေးတဲ့ လူတစ်ယောက်နဲ့ စကားစပြောဖို့ အတော်လေး အဆင်ပြေတယ်။', reverse: false },
  { id: 'ic12', dimensionId: 'social-expression', themeIndex: 1, text: 'အုပ်စုထဲမှာ ကိုယ့်အမြင်ကို ပြောဖို့ အခွင့်အရေးရရင် ပါဝင်ပြောဆိုတတ်တယ်။', reverse: false },
  { id: 'ic13', dimensionId: 'social-expression', themeIndex: 2, text: 'အတူတကွ လုပ်ဆောင်ရတဲ့အခါ ကိုယ်ပါဝင်ကူညီနိုင်မယ့် အခန်းကဏ္ဍကို ရှာတတ်တယ်။', reverse: false },
  { id: 'ic14', dimensionId: 'social-expression', themeIndex: 3, text: 'လူအများရှေ့မှာ ကိုယ့်အမြင်ကို ပြောဖို့ မကြာခဏ ရှောင်နေတတ်တယ်။', reverse: true },
  { id: 'ic15', dimensionId: 'social-expression', themeIndex: 4, text: 'မတူညီတဲ့ လူမှုအခြေအနေတွေမှာ ကိုယ့်ကိုယ်ကို သဘာဝအတိုင်း ဖော်ပြနိုင်တယ်။', reverse: false },

  { id: 'ic16', dimensionId: 'conflict-flexibility', themeIndex: 0, text: 'ကိုယ့်အမြင်နဲ့ မတူတဲ့သူရဲ့ အကြောင်းပြချက်ကို အဆုံးထိ နားထောင်တတ်တယ်။', reverse: false },
  { id: 'ic17', dimensionId: 'conflict-flexibility', themeIndex: 1, text: 'အချက်အလက်အသစ်တွေကြောင့် ကိုယ့်အမြင်ကို ပြင်သင့်တယ်လို့ မြင်ရင် ပြင်ဆင်တတ်တယ်။', reverse: false },
  { id: 'ic18', dimensionId: 'conflict-flexibility', themeIndex: 2, text: 'သဘောထားမတူမှုဖြစ်တဲ့အခါ နှစ်ဖက်လုံး လက်ခံနိုင်မယ့် ဖြေရှင်းနည်းကို ရှာတတ်တယ်။', reverse: false },
  { id: 'ic19', dimensionId: 'conflict-flexibility', themeIndex: 3, text: 'အကြောင်းပြချက်အသစ်တွေ ကြားရပေမယ့် ကိုယ့်အမြင်ကို ပြန်စဉ်းစားဖို့ မလွယ်ကူတတ်ဘူး။', reverse: true },
  { id: 'ic20', dimensionId: 'conflict-flexibility', themeIndex: 4, text: 'စိတ်တိုနေချိန်မှာ ချက်ချင်းတုံ့ပြန်မယ့်အစား ခဏရပ်ပြီး ပြောသင့်တာကို စဉ်းစားတတ်တယ်။', reverse: false },

  { id: 'ic21', dimensionId: 'self-management', themeIndex: 0, text: 'အလုပ်တစ်ခုမစခင် လုပ်ဆောင်ရမယ့် အဆင့်တွေကို အကြမ်းဖျဉ်း စီစဉ်တတ်တယ်။', reverse: false },
  { id: 'ic22', dimensionId: 'self-management', themeIndex: 1, text: 'စတင်ထားတဲ့အလုပ်ကို အခက်အခဲရှိလာရင်တောင် ပြီးမြောက်အောင် ဆက်လုပ်တတ်တယ်။', reverse: false },
  { id: 'ic23', dimensionId: 'self-management', themeIndex: 2, text: 'အလုပ်ပြီးပြီလို့ မသတ်မှတ်ခင် အရေးကြီးတဲ့ အသေးစိတ်အချက်တွေကို ပြန်စစ်တတ်တယ်။', reverse: false },
  { id: 'ic24', dimensionId: 'self-management', themeIndex: 3, text: 'အရေးကြီးတဲ့ ဆုံးဖြတ်ချက်မချခင် ဖြစ်လာနိုင်တဲ့ အကျိုးဆက်တွေကို စဉ်းစားတတ်တယ်။', reverse: false },
  { id: 'ic25', dimensionId: 'self-management', themeIndex: 4, text: 'ကိုယ်အသုံးပြုတဲ့ ပစ္စည်းတွေကို ဘယ်နေရာမှာ ထားခဲ့သလဲဆိုတာ မကြာခဏ မေ့တတ်တယ်။', reverse: true },

  { id: 'ic26', dimensionId: 'curiosity-creativity', themeIndex: 0, text: 'မသိသေးတဲ့ အကြောင်းအရာတစ်ခုကို သိချင်လာရင် ကိုယ်တိုင် ရှာဖွေလေ့လာတတ်တယ်။', reverse: false },
  { id: 'ic27', dimensionId: 'curiosity-creativity', themeIndex: 1, text: 'ပြဿနာတစ်ခုကို ဖြေရှင်းရာမှာ နည်းလမ်းတစ်မျိုးထက်ပိုပြီး စဉ်းစားတတ်တယ်။', reverse: false },
  { id: 'ic28', dimensionId: 'curiosity-creativity', themeIndex: 2, text: 'ဂီတ၊ ပန်းချီ၊ သဘာဝရှုခင်းလို အလှအပတွေကို သတိထားခံစားတတ်တယ်။', reverse: false },
  { id: 'ic29', dimensionId: 'curiosity-creativity', themeIndex: 3, text: 'ကိုယ့်အမြင်နဲ့ မတူတဲ့ အယူအဆတွေကို စဉ်းစားကြည့်ဖို့ သိပ်စိတ်မဝင်စားဘူး။', reverse: true },
  { id: 'ic30', dimensionId: 'curiosity-creativity', themeIndex: 4, text: 'အကြံသစ်တစ်ခုကို သေးငယ်တဲ့ စမ်းသပ်မှုအဖြစ် လက်တွေ့စမ်းကြည့်ရတာ နှစ်သက်တယ်။', reverse: false },
]

export const INNERCOMPASS_ANSWER_OPTIONS = [
  { value: 1, label: 'လုံးဝ မကိုက်ညီပါ' },
  { value: 2, label: 'မကိုက်ညီပါ' },
  { value: 3, label: 'အလယ်အလတ်ပါ' },
  { value: 4, label: 'ကိုက်ညီပါသည်' },
  { value: 5, label: 'အလွန်ကိုက်ညီပါသည်' },
]

export const INNERCOMPASS_LEVEL_PLAN = [
  { value: 30, label: 'အခြေခံ', questionsPerTheme: 1, questionsPerDimension: 5 },
  { value: 60, label: 'အသေးစိတ်', questionsPerTheme: 2, questionsPerDimension: 10 },
  { value: 120, label: 'နက်ရှိုင်း', questionsPerTheme: 4, questionsPerDimension: 20 },
]

export const INNERCOMPASS_REVERSE_IDS = INNERCOMPASS_QUESTIONS_30
  .filter((question) => question.reverse)
  .map((question) => question.id)
