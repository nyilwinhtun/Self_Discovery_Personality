# Milestone 5 — InnerCompass Pilot Test Engine

## Delivered

- [x] Replaced the preview-only InnerCompass route with a functioning 30-question pilot module.
- [x] Kept the module clearly labelled as a pilot self-reflection tool, not a validated personality test.
- [x] Added a dedicated Before You Begin guide and mandatory acknowledgement before a new attempt.
- [x] Added six project-defined reflection areas with five questions per area.
- [x] Added one-question-per-screen layout and five-point response scale.
- [x] Added Previous / Next, Skip, review list, direct return to skipped questions, and unanswered protection.
- [x] Added separate `innerCompass / 30` LocalStorage draft, autosave, resume, and restart confirmation.
- [x] Added InnerCompass result records to the existing History list.
- [x] Added six-area descriptive index, radar chart, area summaries, text report, and print view.
- [x] Kept the existing Personality and Career draft/history namespaces unchanged.
- [x] Verified that generic JSON Backup / Restore includes InnerCompass drafts and records.
- [x] Added automated flow validation for score calculation, reverse items, incomplete answers, separate storage, backup merge, history save, and draft cleanup.

## Important conceptual boundary

InnerCompass V0.2 is a project-written reflection tool. Its six areas are not the six HEXACO dimensions and it must not be described as HEXACO or an equivalent instrument. Its 0–100 values are descriptive indices based on five items per area, not norms, percentiles, diagnoses, or validated personality scores.

The pilot may be used to test the interface and learn whether Burmese readers understand the questions. Before broad public release or stronger psychological claims, the question set still needs independent language review, cognitive interviews, expert review, a suitable pilot sample, and psychometric evaluation.

## Validation commands

```bash
npm run validate:all
npm run build
```

`npm run validate:all` runs the automated data, scoring, backup, design, and InnerCompass flow checks. Full Vite production build and live browser testing still need to be completed on a machine where npm dependencies can be installed.
