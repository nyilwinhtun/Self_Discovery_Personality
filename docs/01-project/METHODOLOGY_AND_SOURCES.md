# Internal Methodology and Originality Notes

This file is an internal development note. It is not public assessment copy.

## Public naming and artwork

- Public assessment names used in the interface are original working names: TraitLens, InnerCompass, BondSense, and ValueMap.
- Each assessment mark is custom geometric SVG artwork in `src/components/AssessmentLogos.jsx`.
- These names and marks are provisional product assets. Trademark, company-name, and domain clearance have not been completed.
- Do not use another publisher's official logo, proprietary assessment artwork, protected marketing copy, or official questionnaire layout.

## TraitLens

- The existing Burmese question set explores five broad personality areas commonly studied in personality research.
- Its wording, result narratives, scoring implementation, and topic-cluster descriptions are project-specific drafts.
- The public interface does not present the questionnaire as an official copy, translation, or validated edition of another publisher's assessment.
- The existing 30 / 60 / 120 question levels and score bands are product-design choices. They are not population norms or evidence of diagnostic accuracy.
- Before any claim of reliability or validity, conduct cognitive interviews, language review, pilot testing, internal-consistency checks where appropriate, and construct/criterion validation with qualified researchers.

## InnerCompass

- InnerCompass is a separate, original six-perspective self-reflection questionnaire.
- The six areas, 30 theme labels, Burmese prompts, scoring utility, and user-facing descriptions are project-created drafts, informed by broad personality research and the project design discussion. They are not claimed as entirely new psychological constructs.
- The draft is not an official administration, translation, equivalent form, or replacement for any named third-party questionnaire.
- The archived V0.1.0 question set remains unchanged. V0.2.0 is a separate editorial revision with version-specific IDs in `src/data/innerCompassDraftV02.js`; it remains internal-review-only and is not activated in the app.
- No official item wording, official facet labels, scoring keys, type names, publisher logo, or protected report layout should be copied. The official authors limit free downloadable instrument materials to non-profit academic research and ask non-academic users to contact them; this project therefore uses no official instrument items or scoring key. See https://www.hexaco.org/hexaco-inventory.
- The initial draft structure is six original reflection areas × five themes = 30 initial prompts. Future 60- and 120-item forms must add distinct prompts rather than repeat items.
- Keep InnerCompass unavailable in the public interface until language review, expert review, cognitive interviews, pilot testing, and a responsible interpretation plan are complete.
- The 0–100 value in the draft scoring utilities is a provisional descriptive index only; no population norms, cut-off labels, diagnosis, moral ranking, or career recommendation are supported.
- The V0.2.0 editor review and cognitive-interview guide are internal development materials. Automated checks confirm structure and code behaviour only; they do not establish comprehension, reliability, factor structure, fairness, or validity.

## Career Interest

- Career Interest remains an optional tool, not a personality assessment.
- Its existing Burmese activity-preference questions are project-written drafts. The internal question-bank identifiers are kept for backward compatibility with saved drafts and history.
- Public copy should explain that it explores preferences, not current skills, intelligence, job suitability, or future success.

## Interpretation and safety

- Do not call a score a percentile unless appropriate normative data has been collected.
- Do not infer a mental-health diagnosis, trauma history, moral worth, or fixed identity from questionnaire scores.
- Use neutral wording such as “area to explore” or “possible tendency,” not “weak person” or “bad trait.”
- Any AI-based personal guidance must be optional, must explain what information is sent, and must not send raw answers without informed consent.
