/**
 * Curated links between assessment question wording and Knowledge Center terms.
 * Keep this mapping explicit: broad substring matching can attach misleading help.
 * These links do not affect assessment answers, scoring, or saved data.
 */
export const KNOWLEDGE_QUESTION_LINKS = [
  { termId: 'kc-001', keywords: ['စိတ်ဖိစီး', 'ဖိအားများတဲ့အချိန်', 'ဖိအားများ'] },
  { termId: 'kc-002', keywords: ['စိုးရိမ်', 'စိတ်ပူ'] },
  { termId: 'kc-003', keywords: ['ကိုယ် ဘာခံစားနေရသလဲ', 'သူ့ခံစားချက်', 'ကိုယ့်ခံစားချက်', 'စိတ်မကောင်းစရာ', 'ဝမ်းနည်း', 'ပျော်ရွှင်တဲ့အခါ'] },
  { termId: 'kc-004', keywords: ['စိတ်တို', 'ဒေါသ'] },
  { termId: 'kc-005', keywords: ['စိတ်တည်ငြိမ်', 'ပြန်တည်ငြိမ်စေဖို့', 'ပြန်တည်ငြိမ်နိုင်', 'စိတ်အေးသွားအောင်', 'ခဏနားပြီး', 'ခဏရပ်ပြီး', 'ခဏအချိန်ယူ', 'ချက်ချင်းမတုံ့ပြန်'] },
  { termId: 'kc-006', keywords: ['နည်းလမ်းတစ်မျိုးထက်ပိုပြီး စဉ်းစား', 'အမြင်ကို ပြန်စဉ်းစားစေတဲ့', 'သေချာမစဉ်းစားဘဲ', 'နည်းလမ်းအသစ်တွေ စမ်းသပ်'] },
  { termId: 'kc-007', keywords: ['အာရုံပြန်စိုက်', 'အာရုံစိုက်', 'အသေးစိတ်အချက်အလက်တွေကို', 'အသေးစိတ်အချက်တွေကို သတိထားမိ', 'အသေးစိတ်အချက်တွေကို ပြန်စစ်'] },
  { termId: 'kc-010', keywords: ['ဆုံးဖြတ်ချက်', 'ဆုံးဖြတ်နိုင်', 'ဦးစားပေးအစီအစဉ်'] },
  { termId: 'kc-011', keywords: ['နေ့စဉ်လုပ်နေကျ', 'နေ့စဉ်သုံးပစ္စည်းတွေကို သတ်မှတ်ထားတဲ့နေရာ', 'ပုံမှန်လုပ်နေကျ နည်းလမ်း'] },
  { termId: 'kc-013', keywords: ['ကိုယ့်အပြုအမူကို ကိုယ်တိုင်', 'ကိုယ့်လုပ်ရပ်ကြောင့်', 'အစီအစဉ်ဆွဲထားပေမယ့် မကြာခဏ မလိုက်နာ'] },
  { termId: 'kc-014', keywords: ['စိတ်မပါရင် လက်ခံထားတဲ့ တာဝန်ကို နောက်ရွှေ့'] },
  { termId: 'kc-015', keywords: ['ပြီးဆုံးအောင် ဆက်လုပ်', 'ဆက်လုပ်နိုင်', 'ဆက်ကြိုးစား', 'လက်လျှော့'] },
  { termId: 'kc-016', keywords: ['သူ့ခံစားချက်ကို နားလည်', 'ဘာကြောင့် အဲဒီလိုခံစားရ', 'ခံစားချက်ကို နားလည်', 'ပြောတာကို အဆုံးထိ နားထောင်'] },
  { termId: 'kc-018', keywords: ['ကူညီပေးချင်စိတ်', 'အခက်အခဲကို ကူညီ', 'ကူညီဖြေရှင်းပေး'] },
  { termId: 'kc-019', keywords: ['ယုံကြည်', 'မကောင်းဘက်ကနေ ခန့်မှန်း'] },
  { termId: 'kc-020', keywords: ['တစ်ဖက်လူရဲ့ အမြင်', 'တစ်ဖက်လူရဲ့ အကြောင်းပြချက်', 'အမြင်မတူသူတစ်ယောက်ရဲ့ အကြောင်းပြချက်', 'တစ်ဖက်လူရဲ့ အခြေအနေ', 'တစ်ဖက်လူရဲ့ ရည်ရွယ်ချက်', 'တစ်ဖက်စီအတွက် ဘာကအရေးကြီး', 'ကိုယ့်အမြင်နဲ့ မတူတဲ့ အယူအဆ'] },
  { termId: 'kc-025', keywords: ['ကိုယ် ဘာခံစားနေရသလဲ', 'ဖြစ်နေချိန်မှာ သတိထားမိ', 'စိုးရိမ်စိတ်ကို သတိထား'] },
  { termId: 'kc-027', keywords: ['စိတ်အားထက်သန်', 'လုပ်ဆောင်ဖို့ အားအင်ရှိ'] },
  { termId: 'kc-029', keywords: ['ဘာလုပ်လို့ရမလဲ', 'အကူအညီရနိုင်မယ့် နည်းလမ်း', 'လုပ်ဆောင်ရမယ့်အရာကို ခွဲစဉ်းစား'] },
  { termId: 'kc-030', keywords: ['ပုံမှန်အခြေအနေကို ပြန်ရောက်', 'အခြေအနေအသစ်နဲ့ ကိုက်ညီ'] },
]

export function getKnowledgeTermsForQuestion(questionText, glossaryTerms, limit = 2) {
  if (typeof questionText !== 'string' || !questionText.trim()) return []
  const normalizedText = questionText.normalize('NFC').toLocaleLowerCase()
  const termById = new Map((glossaryTerms || []).map((term) => [term.id, term]))

  return KNOWLEDGE_QUESTION_LINKS
    .filter((link) => link.keywords.some((keyword) => normalizedText.includes(keyword.normalize('NFC').toLocaleLowerCase())))
    .map((link) => termById.get(link.termId))
    .filter(Boolean)
    .slice(0, limit)
}
