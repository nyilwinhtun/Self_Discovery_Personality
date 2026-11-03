# Changelog

## v1.10.1-beta.1 — 2026-11-03

### Added
- Added contextual Knowledge Center term-help buttons to matching TraitLens and InnerCompass assessment questions.
- Added a mobile-friendly explanation dialog with simple meaning, everyday example, related-term distinction, caution, and source links.
- Added explicit question-to-glossary mappings and a dedicated validation script.

### Preserved
- No changes to assessment question wording, question IDs, scoring calculations, LocalStorage keys, History, or Backup/Restore logic.
- Knowledge glossary entries remain drafts and are visibly labelled as not yet reviewed by language and psychology specialists.

### Validation
- Run `npm run validate:all` before deployment.
- Production build must also complete successfully in GitHub Actions before sharing the updated public link.

## v1.10.0-beta.1 — Knowledge Center Beta Draft

- Added a standalone Knowledge Center page accessible from the main navigation and home page.
- Added search by English term, Burmese term, definition, example, and distinction.
- Added six category filters and detail views for the initial 30 glossary terms.
- Added visible Draft 0.1.0 notices, separate pending language/psychology review notices, cautions, and source links.
- Kept all glossary entries unpublished and reviewer fields empty until actual qualified human reviews are completed.
- Preserved existing TraitLens/InnerCompass questions, scoring modules, LocalStorage logic, History, and Backup/Restore implementation.
- Added `validate:knowledge-center` and included it in `validate:all`.

## 1.9.2 — GitHub Pages deployment setup
  * Added a GitHub Actions workflow to validate, build, and deploy the Vite `dist/` output to GitHub Pages.
  * Configured the Vite base path for the `Self_Discovery_Personality` repository.
  * Added a deployment guide and kept assessment, scoring, and browser-storage implementation unchanged.

## 1.9.1 — Public Beta notice and tester guidance

- Added a visible BETA label to the app header.
- Added a home-page notice explaining the beta status, possible changes, assessment limitations, local-only storage, backup safety, and feedback guidance.
- Expanded README with beta tester warnings and added a dedicated Beta Test Guide under `docs/01-project/`.
- Updated the app package version to 1.9.1.
- Preserved assessment questions, scoring, LocalStorage keys, draft/history formats, and JSON Backup / Restore behavior.


## 1.3.0 — Career Interest Assessment (RIASEC)

- Enabled the Career Interest Dashboard card.
- Added 30 original Burmese work-activity preference questions, balanced at five items per RIASEC area.
- Added the five-point like/dislike response scale and guidance to answer based on interest rather than skill or experience.
- Added separate Career draft storage, autosave, pause/resume, skip-and-return, review, and completion flow.
- Added six-area score calculation, descriptive 0–100 index, top-three interest code, and interpretation safeguards.
- Added Career result history, text report export, and browser print support.
- Extended the Home page recent-results area and general History list to recognize Career results.
- Added `validate:career` and `validate:all` scripts.
- Preserved the existing Personality Assessment question bank, IDs, scoring logic, LocalStorage key, and JSON backup format.

## Validation notes

- `npm run validate:assessment`: passed.
- `npm run validate:backup`: passed.
- `npm run validate:career`: passed.
- TypeScript parser check of the edited JSX files: passed.
- Full Vite production build and interactive browser test: not run because dependencies are not installed in this environment.

## 1.4.0 — Design implementation V1

- Added original SVG marks for TraitLens, InnerCompass, BondSense, and ValueMap.
- Refocused the home page on personality and inner self-discovery.
- Separated personality assessments from optional career and skills tools.
- Added an InnerCompass information page that clearly states the questionnaire is still in development.
- Expanded TraitLens Before You Begin guidance and added a required acknowledgement checkbox.
- Added a required acknowledgement checkbox to the Career Interest introduction before starting a new attempt.
- Removed external framework/publisher names from public assessment copy while retaining internal storage identifiers for compatibility.
- Preserved existing question banks, scores, drafts, history, JSON backup/restore, and print flows.


## V9 / 1.5.0 — Logo and Guide QA + InnerCompass Draft

- Reviewed the original assessment SVG marks at 24 / 32 / 56 / 76 px and kept each identity distinct.
- Improved small guide text contrast and added contrast validation.
- Expanded the InnerCompass preview with a separate pre-assessment guide preview; the test remains unavailable in the UI.
- Added an original InnerCompass 30-question draft with six project-defined reflection areas and five themes per area.
- Added provisional draft scoring utility and structural validation.
- Added question-by-question editorial review notes and safeguards for moral, emotional, and cultural interpretation.
- Preserved existing Personality and Career data/storage flows; no InnerCompass storage namespace is activated yet.

## 1.6.0 — InnerCompass Question Review V0.2.0

- Added a separate, inactive V0.2.0 InnerCompass question bank with version-specific IDs.
- Preserved the previous V0.1.0 draft unchanged for comparison and auditability.
- Revised Burmese wording and domain labels to reduce moral judgement, ambiguity, and context assumptions.
- Added item-level editorial review, cognitive interview guidance, and provisional scoring notes.
- Added a dedicated validator for area balance, unique IDs/text, reverse scoring, missing-answer handling, and inactive release gates.
- Did not activate InnerCompass in the public application.
- Did not change existing TraitLens, Career Interest, LocalStorage, history, print, or backup/restore functionality in this milestone.


## 1.7.0 — InnerCompass Pilot Assessment

- Replaced the preview-only route with a 30-question InnerCompass pilot reflection flow.
- Added a dedicated Before You Begin guide and acknowledgement gate.
- Added one-question-per-screen response UI, five-point scale, skip, review, resume, autosave, and restart protection.
- Added a separate `innerCompass / 30` draft namespace with no change to the existing Personality or Career storage.
- Added six-area descriptive results, radar chart, History, TXT report, and print.
- Verified that JSON Backup / Restore preserves InnerCompass drafts and records.
- Kept the module explicitly labelled as pilot-only; it is not a HEXACO test, official translation, diagnosis, or validated personality instrument.
- Added `validate:innercompass-flow` and included it in `validate:all`.

## 1.9.0 — Burmese labels and documentation organization

- Simplified public Burmese headings: TraitLens now uses “ပင်ကိုစရိုက်ကို လေ့လာခြင်း” and “အဓိက အချက် ၅ ချက်”; InnerCompass uses “စိတ်နေသဘောထားကို လေ့လာခြင်း” and “အဓိက အချက် ၆ ချက်”.
- Updated the InnerCompass guide, result chart headings, result summary, and standalone question preview to use simpler wording.
- Grouped project documentation under `docs/` by project, TraitLens, InnerCompass, Career, data safety, quality review, and archive.
- Kept only `README.md` and `CHANGELOG.md` at project root for easier navigation.
- Updated design validation to read the new documentation paths and added `validate:docs` to check the folder organization.
- Preserved assessment question IDs, scoring logic, LocalStorage keys, draft/history formats, Career module, and JSON Backup / Restore behavior.
