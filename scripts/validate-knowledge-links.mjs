import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { KNOWLEDGE_QUESTION_LINKS, getKnowledgeTermsForQuestion } from '../src/utils/knowledgeQuestionLinks.js'
import { QUESTIONS_30, QUESTIONS_60, QUESTIONS_120 } from '../src/data/questions.js'
import { INNERCOMPASS_V02_QUESTIONS_30 } from '../src/data/innerCompassDraftV02.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const glossary = JSON.parse(fs.readFileSync(path.join(root, 'src/data/knowledgeGlossaryDraftV01.json'), 'utf8'))
const errors = []
const termIds = new Set((glossary.terms || []).map((term) => term.id))

for (const link of KNOWLEDGE_QUESTION_LINKS) {
  if (!termIds.has(link.termId)) errors.push(`Unknown Knowledge Center term ID: ${link.termId}`)
  if (!Array.isArray(link.keywords) || link.keywords.length === 0) errors.push(`${link.termId} has no match keywords`)
}

const assessmentSets = [
  ['TraitLens 30', QUESTIONS_30],
  ['TraitLens 60', QUESTIONS_60],
  ['TraitLens 120', QUESTIONS_120],
  ['InnerCompass', INNERCOMPASS_V02_QUESTIONS_30],
]
const coverage = []
for (const [name, questions] of assessmentSets) {
  const matched = questions.filter((question) => getKnowledgeTermsForQuestion(question.text, glossary.terms).length > 0)
  coverage.push(`${name}: ${matched.length}/${questions.length} questions have relevant help`)
  if (matched.length === 0) errors.push(`${name} has no linked Knowledge Center help`)
}

for (const expectedTerm of ['kc-001', 'kc-002', 'kc-004', 'kc-005', 'kc-007', 'kc-010', 'kc-015', 'kc-016', 'kc-018', 'kc-020', 'kc-025', 'kc-029']) {
  if (!KNOWLEDGE_QUESTION_LINKS.some((link) => link.termId === expectedTerm)) errors.push(`Expected question help mapping is missing: ${expectedTerm}`)
}

if (errors.length) {
  console.error('Knowledge question-link validation failed:')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log('Knowledge question-link validation passed.')
for (const line of coverage) console.log(`- ${line}`)
console.log(`- ${KNOWLEDGE_QUESTION_LINKS.length} explicit term mappings checked.`)
