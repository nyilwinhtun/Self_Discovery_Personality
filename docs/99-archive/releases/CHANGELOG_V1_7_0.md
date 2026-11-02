# 1.7.0 — InnerCompass Pilot Assessment

- Enabled InnerCompass as a clearly labelled pilot self-reflection module rather than a preview-only card.
- Added a dedicated Before You Begin page with six area descriptions, response instructions, data/privacy notes, limitations, and a required acknowledgement.
- Added 30-question, one-question-per-screen flow using the versioned V0.2 question bank.
- Added five-point response options, skip, previous/next, question review, unanswered protection, autosave, resume, and restart confirmation.
- Added separate `innerCompass / 30` draft storage so Personality and Career drafts remain unchanged.
- Added completion records to general History and integrated records with existing JSON Backup / Restore.
- Added six-area provisional index result, Radar Chart, descriptive notes, text report export, and browser print.
- Added validation for scoring, missing-answer guards, separate storage, backup/restore merge, history save, and draft cleanup.
- Kept InnerCompass explicitly marked as pilot-only and not psychometrically validated. It is an original self-reflection tool, not an official translation or equivalent of a third-party inventory.
- Preserved the existing TraitLens questions, scoring, LocalStorage key, Career Interest data, and backup format.

## Validation

- All seven `scripts/validate-*.mjs` scripts passed.
- TypeScript transpile/parse check passed for all 14 JS/JSX source files.
- Full Vite production build and live browser testing were not run because frontend dependencies were not installed in this environment.
