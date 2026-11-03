import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const checks = []
const assert = (condition, message) => {
  checks.push({ condition: Boolean(condition), message })
}

const app = read('src/App.jsx')
const inner = read('src/components/InnerCompassModule.jsx')
const career = read('src/components/CareerInterestModule.jsx')
const bottomNav = read('src/components/MobileBottomNavigation.jsx')
const questionActions = read('src/components/MobileQuestionActions.jsx')
const reportNav = read('src/components/ReportSectionNavigation.jsx')
const html = read('index.html')
const pkg = JSON.parse(read('package.json'))

assert(pkg.version === '1.11.1-beta.1', 'package version is 1.11.1-beta.1')
assert(['home', 'assessment', 'knowledge', 'history'].every((id) => bottomNav.includes(`id: '${id}'`)), 'mobile bottom navigation has four expected destinations')
assert(app.includes('<MobileBottomNavigation') && app.includes('showMobileNavigation'), 'bottom navigation is mounted on top-level app pages')
assert(app.includes("getElementById('assessment-dashboard')") && app.includes('setPendingHomeSection'), 'Assessment navigation returns to the dashboard section')
assert(app.includes('<MobileQuestionActions') && inner.includes('<MobileQuestionActions') && career.includes('<MobileQuestionActions'), 'mobile question actions are used by TraitLens, InnerCompass, and Career Interest')
assert(questionActions.includes('canNext') && questionActions.includes('canPrevious') && questionActions.includes('showSkip'), 'mobile question actions honor answer and navigation states')
assert(app.includes("id: 'trait-report-overview'") && app.includes("id: 'trait-report-areas'") && inner.includes("id: 'inner-report-overview'") && inner.includes("id: 'inner-report-areas'"), 'TraitLens and InnerCompass report navigation anchors exist')
assert(reportNav.includes('scrollIntoView') && reportNav.includes('overflow-x-auto'), 'report navigation is horizontally scrollable and jumps to sections')
assert(html.includes('viewport-fit=cover'), 'viewport enables safe-area insets')
assert(app.includes('hidden flex-wrap items-center justify-between') && inner.includes('hidden flex-wrap items-center justify-between') && career.includes('hidden flex-wrap items-center justify-between'), 'desktop in-card question controls remain available at sm breakpoint')

const failed = checks.filter((item) => !item.condition)
for (const item of checks) console.log(`${item.condition ? 'PASS' : 'FAIL'} ${item.message}`)
if (failed.length) {
  console.error(`\n${failed.length} mobile navigation validation check(s) failed.`)
  process.exit(1)
}
console.log(`\nAll ${checks.length} mobile navigation validation checks passed.`)
