# Self Discovery — Result Report Improvements

**Version:** 1.11.0-beta.1  
**Date:** 3 November 2026  
**Status:** Beta implementation; language and specialist review still pending

## Purpose

Improve the usefulness and clarity of TraitLens and InnerCompass result reports without changing assessment instruments, question wording, question IDs, score calculations, stored records, LocalStorage keys, History, or Backup/Restore formats.

## TraitLens report

For each of the five broad areas, the report now presents:

- Existing 0–100 index and existing descriptive band.
- A plain-language description matched to the current index band.
- An everyday-life example.
- A question for personal reflection.
- One small optional activity to try.

The report no longer treats the two highest areas as a fixed personality type. It describes them as the areas with relatively higher indices among the five areas in that person's answers.

## InnerCompass report

For each of the six pilot dimensions, the report now presents:

- Existing 0–100 index and the number of answered items.
- A plain-language description matched to the current index band.
- An everyday-life example.
- A question for personal reflection.
- One small optional activity to try.

InnerCompass remains an in-house pilot reflection tool. The added language does not validate its questionnaire or indices.

## Descriptive bands

The implementation reuses the existing descriptive cut points:

- 0–39: lower index band
- 40–60: middle index band
- 61–100: higher index band

These are internal descriptive labels for the current questionnaire version. They are not population norms, percentile ranks, clinical cutoffs, or validated thresholds. The same cut points are used for report wording only; scoring calculations are unchanged.

## Interpretation safeguards

- A lower score is not a defect, failure, or evidence of a disorder.
- A higher score does not prove that a person always behaves in a certain way.
- Each description uses cautious language such as “may reflect” and refers to the answers in this questionnaire.
- Everyday examples are illustrations, not predictions about the user.
- Suggested activities are optional reflection prompts, not treatment advice.
- Results should be considered alongside context, recent circumstances, opportunities, and the user's own experience.
- InnerCompass continues to display its pilot/non-validated notice.

## Technical preservation requirements

The implementation changes only report presentation/content and adds a report-content validator. It must not change:

- `src/data/questions.js`
- `src/utils/scoring.js`
- `src/utils/storage.js`
- `src/data/innerCompassDraftV02.js`
- `src/utils/innerCompassV02Scoring.js`
- LocalStorage key names or record schemas
- Existing backup/restore formats

## Review status

All new interpretation text is draft content. It has not yet been approved by a Burmese language specialist or a qualified psychology specialist. Before a stable public release, both reviews should be completed and documented separately for each content version.
