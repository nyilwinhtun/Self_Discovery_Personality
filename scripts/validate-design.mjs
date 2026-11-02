import fs from 'node:fs'
import assert from 'node:assert/strict'

const read = (path) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
const app = read('src/App.jsx')
const career = read('src/components/CareerInterestModule.jsx')
const logos = read('src/components/AssessmentLogos.jsx')
const methodology = read('docs/01-project/METHODOLOGY_AND_SOURCES.md')
const innerBlueprint = read('docs/03-innercompass/99-archive/INNERCOMPASS_BLUEPRINT_V0.md')
const innerGuide = read('docs/03-innercompass/01-current/INNERCOMPASS_BEFORE_YOU_BEGIN_DRAFT.md')
const innerModule = read('src/components/InnerCompassModule.jsx')

for (const name of ['TraitLens', 'InnerCompass', 'BondSense', 'ValueMap']) {
  assert.ok(app.includes(name), `Missing public assessment identity: ${name}`)
}
for (const logo of ['TraitLensLogo', 'InnerCompassLogo', 'BondSenseLogo', 'ValueMapLogo']) {
  assert.ok(logos.includes(`function ${logo}`), `Missing original SVG logo: ${logo}`)
}
for (const label of ['TraitLens logo', 'InnerCompass logo', 'BondSense logo', 'ValueMap logo']) {
  assert.ok(logos.includes(`aria-label="${label}"`), `Missing accessible SVG name: ${label}`)
}
assert.equal((logos.match(/viewBox="0 0 64 64"/g) || []).length, 4, 'All four SVG marks should use a shared 64x64 viewBox')
assert.equal((logos.match(/role="img"/g) || []).length, 4, 'All four SVG marks should expose an image role')

// Separate guide pages and acknowledgement gates.
assert.ok(app.includes('function InstructionsPage'), 'TraitLens guidance page is missing')
assert.ok(app.includes('checked={acknowledged}'), 'TraitLens guide acknowledgement checkbox is missing')
assert.ok(app.includes('disabled={!acknowledged}'), 'TraitLens start must require acknowledgement')
assert.ok(app.includes('skip') || app.includes('ကျော်'), 'TraitLens guide should explain skipping')
assert.ok(app.includes('JSON Backup'), 'TraitLens guide should explain backup')
assert.ok(app.includes('လူဦးရေနဲ့ နှိုင်းယှဉ်ထားတဲ့ အဆင့်သတ်မှတ်ချက် မဟုတ်'), 'TraitLens guide should explain that the index is not a norm/percentile')
assert.ok(career.includes('checked={acknowledged}'), 'Career Interest acknowledgement checkbox is missing')
assert.ok(career.includes('disabled={!acknowledged}'), 'Career Interest new attempt must require acknowledgement')
assert.ok(career.includes('လက်ရှိကျွမ်းကျင်မှုနဲ့ အတွေ့အကြုံကို စစ်ဆေးတာမဟုတ်ပါဘူး'), 'Career guide must distinguish interest from current ability/experience')
assert.ok(app.includes('<InnerCompassModule'), 'InnerCompass active pilot module route is missing')
assert.ok(innerModule.includes('function GuideView'), 'InnerCompass Before You Begin guide is missing')
assert.ok(innerModule.includes('function QuestionView'), 'InnerCompass question flow is missing')
assert.ok(innerModule.includes('function ReviewView'), 'InnerCompass review flow is missing')
assert.ok(innerModule.includes('function ResultView'), 'InnerCompass result flow is missing')
assert.ok(innerModule.includes('checked={acknowledged}'), 'InnerCompass must require guide acknowledgement')
assert.ok(innerModule.includes('Pilot · စမ်းသပ်အသုံးပြုမှု'), 'InnerCompass must be clearly labelled as a pilot')
assert.ok(innerModule.includes('တရားဝင်ဘာသာပြန်'), 'InnerCompass must clarify that it is not an official translated inventory')
for (const phrase of ['ဘယ်လိုဖြေဆိုသင့်သလဲ။', 'အဖြေရွေးချယ်ပုံ', 'ရလဒ်ကို ဘယ်လိုနားလည်ရမလဲ။', 'ကိုယ်ရေးအချက်အလက်']) {
  assert.ok(innerModule.includes(phrase), `InnerCompass guide missing: ${phrase}`)
}
assert.ok(app.includes('onOpenInnerCompass'), 'InnerCompass navigation callback is missing')
assert.ok(app.includes('ပင်ကိုစရိုက်ကို လေ့လာခြင်း'), 'TraitLens title should use simple Burmese wording')
assert.ok(app.includes('အဓိက အချက် ၅ ချက်'), 'TraitLens count label should be easy to understand')
assert.ok(innerModule.includes('အဓိက အချက် ၆ ချက်'), 'InnerCompass count label should be easy to understand')
assert.ok(!app.includes('ပင်ကိုစရိုက် ၅ ကဏ္ဍ ဆန်းစစ်မှု'), 'Old heavy TraitLens heading should not be displayed')
assert.ok(!innerModule.includes('ရှုထောင့် ၆ ခု'), 'Old heavy InnerCompass heading should not be displayed')

// Public copy must use project names rather than third-party test/publisher brands.
for (const [label, source] of [['App.jsx', app], ['CareerInterestModule.jsx', career]]) {
  for (const forbidden of ['Big Five', 'HEXACO', 'MBTI', 'Enneagram', 'O*NET']) {
    assert.ok(!source.includes(forbidden), `${label} contains public-facing external label: ${forbidden}`)
  }
}

// The InnerCompass blueprint must describe an original tool and not claim equivalence.
for (const phrase of ['not an official administration', 'does not reuse official questionnaire items', 'not a percentile', 'not a clinical diagnosis']) {
  assert.ok(innerBlueprint.toLowerCase().includes(phrase.toLowerCase()), `InnerCompass blueprint missing limitation: ${phrase}`)
}
assert.ok(innerGuide.includes('အဖြေမှန်၊ အဖြေမှား မရှိပါ'), 'InnerCompass draft guide must explain that there are no right/wrong answers')
assert.ok(innerGuide.includes('JSON Backup'), 'InnerCompass guide draft must explain backup')
assert.ok(methodology.includes('No official item wording'), 'Internal methodology must preserve originality safeguard')

// WCAG contrast check for normal-size text in the guide palettes.
function luminance(hex) {
  const values = hex.replace('#', '').match(/.{2}/g).map((value) => parseInt(value, 16) / 255)
  const linear = values.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2]
}
function contrastRatio(foreground, background) {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort((a, b) => b - a)
  return (lighter + 0.05) / (darker + 0.05)
}
const guidePairs = [
  ['#6f6276', '#faf7fb'],
  ['#74677b', '#ffffff'],
  ['#745b83', '#f2eaf5'],
  ['#596d83', '#f5f8fc'],
  ['#3f648c', '#eaf1fa'],
  ['#716679', '#faf7fa'],
  ['#6f6276', '#fbf7f6'],
]
for (const [fg, bg] of guidePairs) {
  assert.ok(contrastRatio(fg, bg) >= 4.5, `Guide text contrast is below 4.5:1: ${fg} on ${bg}`)
}

console.log('Design validation passed: accessible original SVG marks, separate guides, acknowledgement gates, InnerCompass pilot flow, originality safeguards, and guide text contrast.')
