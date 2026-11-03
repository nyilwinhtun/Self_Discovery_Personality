import assert from 'node:assert/strict'
import { TRAITS } from '../src/data/questions.js'
import { INNERCOMPASS_V02_DIMENSIONS } from '../src/data/innerCompassDraftV02.js'
import {
  getInnerCompassReportInsight,
  getReportBand,
  getTraitReportInsight,
  REPORT_INTERPRETATION_NOTICE,
} from '../src/utils/resultInterpretations.js'

const bands = [0, 40, 61]
assert.equal(getReportBand(0), 'lower')
assert.equal(getReportBand(40), 'middle')
assert.equal(getReportBand(61), 'higher')
assert.ok(REPORT_INTERPRETATION_NOTICE.length > 40)

for (const trait of TRAITS) {
  for (const score of bands) {
    const insight = getTraitReportInsight(trait.id, score)
    assert.ok(insight, `Missing TraitLens insight: ${trait.id} / ${score}`)
    for (const field of ['label', 'interpretation', 'example', 'reflection', 'tryThis']) {
      assert.ok(typeof insight[field] === 'string' && insight[field].trim(), `Missing ${field}: ${trait.id} / ${score}`)
    }
  }
}

for (const dimension of INNERCOMPASS_V02_DIMENSIONS) {
  for (const score of bands) {
    const insight = getInnerCompassReportInsight(dimension.id, score)
    assert.ok(insight, `Missing InnerCompass insight: ${dimension.id} / ${score}`)
    for (const field of ['label', 'interpretation', 'example', 'reflection', 'tryThis']) {
      assert.ok(typeof insight[field] === 'string' && insight[field].trim(), `Missing ${field}: ${dimension.id} / ${score}`)
    }
  }
}

console.log(`Report validation passed: ${TRAITS.length} TraitLens traits × 3 bands; ${INNERCOMPASS_V02_DIMENSIONS.length} InnerCompass dimensions × 3 bands.`)
