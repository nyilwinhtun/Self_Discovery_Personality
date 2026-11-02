# Milestone 6 — InnerCompass Burmese wording refinement

## Goal

Make the existing 30-item InnerCompass pilot draft easier to read, reduce overlapping wording, and keep existing assessment data safe.

## Delivered

- Created InnerCompass V0.3.0 as a new, versioned question bank.
- Rewrote all 30 prompts in shorter, more everyday Burmese.
- Kept six original project-defined reflection areas with five questions each.
- Reworked several items that were too broad or overlapped in meaning.
- Added item-level notes describing intended meaning and remaining review risks.
- Added a cognitive-interview guide for testing how readers understand each item.
- Added a validation script for unique IDs, unique wording, item counts, reverse IDs, and release gates.
- Added `validate:innercompass-v03` to the full validation sequence.

## Preserved

- Active InnerCompass V0.2 pilot remains unchanged.
- V0.1 and V0.2 question banks remain archived.
- Existing Personality and Career flows remain unchanged.
- Existing LocalStorage, Drafts, History, Backup/Restore, and Print logic remain unchanged.
- V0.3 has IDs prefixed with `icv03-` to avoid collisions with older question versions.

## Validation results

`npm run validate:all` passed:
- Personality assessment validation
- Backup/Restore validation
- Career assessment validation
- Design validation
- InnerCompass V0.1 draft validation
- InnerCompass V0.2 pilot validation
- InnerCompass pilot-flow validation
- InnerCompass V0.3 draft validation

A full Vite production build is not claimed in this environment. Run `npm install` then `npm run build` locally.

## Not yet complete

- Burmese language editor review
- Qualified psychology/personality researcher review
- Cognitive interviews across varied age and education backgrounds
- Revision based on participant feedback
- Psychometric validation

## Release decision

V0.3 remains an internal draft and is not enabled as the active pilot in the UI. This avoids changing the meaning of any answer already saved under V0.2.
