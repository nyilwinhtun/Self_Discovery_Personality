# Changelog — V1.8.0

## InnerCompass V0.3 internal question draft

- Added a new versioned V0.3 question bank with shorter, more everyday Burmese wording.
- Preserved V0.1 and V0.2 question banks and their active pilot implementation.
- Added item-by-item editorial review and a cognitive interview guide.
- Added a dedicated structural validation script and included it in `validate:all`.
- Kept V0.3 inactive until language review, expert review, and cognitive interviews are completed.
- No changes to existing Personality, Career, Backup/Restore, History, or InnerCompass V0.2 pilot data flow.

## Validation

- `npm run validate:innercompass-v03`
- Existing validation scripts remain part of `npm run validate:all`.
- A full Vite production build is not claimed here unless separately run after dependency installation.
