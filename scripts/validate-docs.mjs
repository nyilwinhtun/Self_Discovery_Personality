import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'

const root = process.cwd()
const rootMarkdown = fs.readdirSync(root).filter((name) => name.toLowerCase().endsWith('.md')).sort()
assert.deepEqual(rootMarkdown, ['CHANGELOG.md', 'README.md'], 'Only README.md and CHANGELOG.md should remain at project root')

const expected = [
  'docs/README.md',
  'docs/01-project/PHASE_1_SPEC.md',
  'docs/01-project/METHODOLOGY_AND_SOURCES.md',
  'docs/02-traitlens/QUESTION_REVIEW.md',
  'docs/03-innercompass/01-current/INNERCOMPASS_QUESTION_DRAFT_V0_3.md',
  'docs/03-innercompass/99-archive/INNERCOMPASS_QUESTION_DRAFT_V0.md',
  'docs/04-career/CAREER_INTEREST_GUIDE.md',
  'docs/05-data-safety/BACKUP_RESTORE_GUIDE.md',
  'docs/07-quality-review/DESIGN_QA_REPORT_V2.md',
  'docs/99-archive/releases/CHANGELOG_V1_7_0.md',
]
for (const file of expected) assert.ok(fs.existsSync(path.join(root, file)), `Missing organized documentation: ${file}`)

const entries = fs.readdirSync(path.join(root, 'docs/03-innercompass/01-current'))
assert.ok(entries.includes('INNERCOMPASS_QUESTION_PREVIEW_V0_3.html'), 'InnerCompass HTML preview must be kept with its current draft documents')
assert.ok(fs.existsSync(path.join(root, 'docs/07-quality-review/assets/logo-scale-review.png')), 'Logo QA image must be present in docs assets')
console.log('Documentation validation passed: root is clean, documents are grouped, and review assets are retained.')
