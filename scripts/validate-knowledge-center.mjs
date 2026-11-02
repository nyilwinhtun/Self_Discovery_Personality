import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dataPath = path.join(root, 'src/data/knowledgeGlossaryDraftV01.json')
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
const errors = []
const categories = data.categories || []
const terms = data.terms || []
const ids = terms.map((term) => term.id)

if (categories.length !== 6) errors.push(`Expected 6 categories, received ${categories.length}`)
if (terms.length !== 30) errors.push(`Expected 30 terms, received ${terms.length}`)
if (new Set(ids).size !== ids.length) errors.push('Term IDs must be unique')

for (const category of categories) {
  const count = terms.filter((term) => term.category_id === category.id).length
  if (count !== 5) errors.push(`${category.id} should contain 5 terms; received ${count}`)
}

for (const term of terms) {
  for (const field of ['id', 'term_en', 'term_my', 'category_id', 'definition_simple', 'daily_example', 'distinction', 'caution']) {
    if (!String(term[field] || '').trim()) errors.push(`${term.id || 'unknown'} is missing ${field}`)
  }
  if (!Array.isArray(term.sources) || term.sources.length === 0) errors.push(`${term.id} must include at least one source`)
  for (const source of term.sources || []) {
    if (!/^https:\/\//.test(source.url || '')) errors.push(`${term.id} has a source URL that is not HTTPS`)
  }
  if (term.workflow_status !== 'draft' || term.published !== false) errors.push(`${term.id} must remain draft and unpublished until real reviews are complete`)
  if (term.language_review?.status !== 'pending' || term.psychology_review?.status !== 'pending') errors.push(`${term.id} review status must remain pending`)
  if (term.language_review?.reviewer_name || term.psychology_review?.reviewer_name || term.psychology_review?.reviewer_qualification) errors.push(`${term.id} must not contain invented reviewer information`)
}

const componentPath = path.join(root, 'src/components/KnowledgeCenter.jsx')
const component = fs.readFileSync(componentPath, 'utf8')
for (const requiredText of ['မူကြမ်းအကြောင်းအရာ', 'မြန်မာဘာသာ စစ်ဆေးမှု', 'စိတ်ပညာ စစ်ဆေးမှု', 'ကိုးကားရင်းမြစ်များ']) {
  if (!component.includes(requiredText)) errors.push(`Knowledge Center UI is missing required notice: ${requiredText}`)
}

if (errors.length) {
  console.error('Knowledge Center validation failed:')
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`Knowledge Center validation passed: ${terms.length} draft terms across ${categories.length} categories; all remain unpublished pending expert review.`)
