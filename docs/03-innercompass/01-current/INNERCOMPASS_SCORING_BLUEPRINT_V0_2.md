# InnerCompass — Provisional Scoring Blueprint V0.2.0

## Status

Internal development specification only. The score has not been validated. Do not publish low/medium/high labels or compare users against one another.

## Response scale

Responses are integers from 1 to 5, matching the visible Burmese labels in `src/data/innerCompassDraftV02.js`.

## Reverse-keyed items

- `icv02-04`
- `icv02-10`
- `icv02-14`
- `icv02-19`
- `icv02-25`
- `icv02-29`

For these items: `keyedResponse = 6 - rawResponse`.

## Area index

Each area currently has five items. For a complete response set:

1. Convert reverse-keyed answers.
2. Calculate the mean of the five keyed responses in that area.
3. Convert the mean to an internal 0–100 display index:

`index = ((mean - 1) / 4) * 100`

The index represents only the respondent's answer pattern on this provisional draft. It is not a percentile, norm-referenced score, ranking, diagnosis, probability, or measure of personal worth.

## Missing answers

- Skipped questions remain unanswered in the draft.
- An incomplete area should not receive a final score.
- The full assessment result should be generated only after the user has answered all required items, or after a future, explicitly designed missing-data rule has been reviewed and implemented.
- Do not silently treat a skipped item as neutral.

## Interpretation

Do not assign “good/bad”, “strong/weak”, or “healthy/unhealthy” labels based only on these indices. Use cautious language such as “သင့်အဖြေများတွင် ဒီအပြုအမူပုံစံကို ပိုမိုသဘောတူထားသည်” and include the possibility of situational variation.

## Automated development checks

The V0.2 validation script checks:

- 30 unique question IDs;
- 30 unique question strings;
- six areas with five items each;
- all five theme indices represented per area;
- response values 1–5;
- reverse scoring behavior;
- missing-response behavior;
- neutral response index equals 50.

These are code and structure checks only, not psychometric evidence.
