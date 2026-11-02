# Career Interest Assessment — RIASEC

## Scope

- 30 original Burmese activity-preference questions.
- Six interest areas: Realistic (R), Investigative (I), Artistic (A), Social (S), Enterprising (E), Conventional (C).
- Five questions per area.
- Five response options from `လုံးဝ မနှစ်သက်ပါ` (1) to `အလွန်နှစ်သက်ပါသည်` (5).
- No reverse-scored items: every prompt asks how much the user would enjoy doing the activity.

## User guidance

Answer based on how interesting or enjoyable the activity would feel. Do not base the answer on current skill, prior experience, education, salary, or perceived social status. There are no right or wrong responses.

## Scoring

Each area uses the average of its five item responses. The app converts the mean to a 0–100 descriptive index:

`index = ((mean - 1) / 4) * 100`

The index is calculated only from the user's answers. It is not a percentile, population norm, ability score, or probability of success. The three highest areas are shown as an exploratory RIASEC code. Near-tied scores should be interpreted as similarly strong interests, not as a precise ranking.

## Storage and navigation

- Storage type: `careerInterest`, level: `30`.
- Draft is separate from `personality` drafts.
- Supports autosave, resume, skip, answer revision, review-before-submit, and history.
- Career history is included in the existing versioned JSON backup because it uses the shared storage envelope.

## Interpretation safeguards

RIASEC results describe preferences for types of activities. They do not establish current skill, qualification, or a single best job. Career exploration should later combine these results with Skills Assessment, education, experience, constraints, and the user's own goals.

## Validation

Run `npm run validate:career`. The validation covers item uniqueness, six balanced categories, scoring boundaries and neutrality, top-code ordering, independent local drafts, and backup compatibility.

## Research basis

The structure is informed by the RIASEC interest framework and the O*NET Interest Profiler's description of six occupational interest areas and activity-preference response format. These app questions are original Burmese drafts; they are not the official O*NET items or a validated translation.
