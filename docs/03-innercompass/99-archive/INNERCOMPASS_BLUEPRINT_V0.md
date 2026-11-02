# InnerCompass — Question Blueprint V0.1

## 1. Product position

**Public product name:** InnerCompass  
**Public description:** A Burmese-language self-reflection experience about six everyday patterns in how a person relates to themselves, other people, decisions, and new ideas.

InnerCompass is an original project-created reflection tool. It is not an official administration, translation, replacement, or equivalent form of any third-party personality inventory. It does not reuse official questionnaire items, official facet labels, scoring keys, type names, or publisher branding.

The six broad areas are informed by general personality research, but the public tool uses its own Burmese names, theme definitions, item wording, and provisional scoring. It must not be marketed as a validated psychological test until research and validation are completed.

## 2. Six original reflection areas

| Code | Public name | What it invites the user to reflect on |
|---|---|---|
| IC1 | ရိုးသားပွင့်လင်းစွာ ရပ်တည်မှု | Consistency between words and actions, fairness, owning mistakes, honest handling of competing interests, and acknowledging others' contributions. |
| IC2 | စိတ်ခံစားချက်ကို သိမြင်ကိုင်တွယ်ခြင်း | Recognising feelings, responding to pressure, seeking support when useful, understanding others' feelings, and regaining balance after upsetting events. |
| IC3 | လူမှုယုံကြည်မှုနှင့် ကိုယ့်အမြင်ဖော်ပြမှု | Starting conversations, speaking in groups, participating with others, expressing one's view, and adapting self-expression to social settings. |
| IC4 | သဘောထားမတူမှုကို ကိုင်တွယ်ပုံ | Listening to different views, revising opinions when evidence changes, finding workable compromises, reconsidering one's stance, and pausing before reacting. |
| IC5 | ကိုယ်ပိုင်စီမံခန့်ခွဲမှု | Planning, following through, checking important details, considering consequences, and keeping work materials organised. |
| IC6 | စူးစမ်းလိုစိတ်နှင့် ဖန်တီးတွေးခေါ်မှု | Learning about unfamiliar topics, considering alternatives, noticing beauty, examining unfamiliar ideas, and trying small experiments. |

Each area has five original reflection themes. These themes are not presented as official facet scales from another instrument.

## 3. Question-count plan

| Level | Total items | Per area | Per reflection theme |
|---|---:|---:|---:|
| Quick | 30 | 5 | 1 |
| Standard | 60 | 10 | 2 |
| Deep | 120 | 20 | 4 |

The first draft contains only the 30-item Quick version: one question for each of the 30 themes. The 60- and 120-item versions must be written as additional, distinct items; do not duplicate or simply rephrase the 30-item set to inflate length.

## 4. Response instructions

Proposed response scale:

1. လုံးဝ မကိုက်ညီပါ
2. မကိုက်ညီပါ
3. အလယ်အလတ်ပါ
4. ကိုက်ညီပါသည်
5. အလွန်ကိုက်ညီပါသည်

Ask the user to consider what is generally true in their everyday life, rather than their ideal self or a single unusual event. There are no morally correct answers. The user may skip a question, return later, pause, and resume. The application should save each response locally and offer JSON backup before public release.

## 5. Provisional score calculation

- Each item is scored from 1 to 5.
- Reverse-keyed items are transformed using `6 - answer`.
- The five keyed responses in each area are averaged.
- A descriptive 0–100 index may be calculated as `(average - 1) / 4 * 100`.
- The index is a transformation of the user's own responses. It is not a percentile, norm score, ranking, probability, or comparison with other people.
- Do not set public low / medium / high labels before pilot data and expert review.
- A higher score is not inherently better. It means stronger endorsement of the pattern described by that area.

The scoring helper included in this milestone is a draft-development utility only. It does not make the item set validated.

## 6. Draft content inventory

`src/data/innerCompassDraft.js` contains 30 original Burmese items:

- IC1: `ic01`–`ic05`
- IC2: `ic06`–`ic10`
- IC3: `ic11`–`ic15`
- IC4: `ic16`–`ic20`
- IC5: `ic21`–`ic25`
- IC6: `ic26`–`ic30`

Reverse-keyed draft items: `ic04`, `ic10`, `ic14`, `ic19`, `ic25`, `ic29`.

The current validator checks IDs, wording uniqueness, area balance, theme coverage, answer bounds, reverse scoring, and neutral-response behaviour. It does not assess psychological validity or whether every item is free of cultural bias.

## 7. InnerCompass Before You Begin — planned content

Before the first question, show a dedicated guide page with:

1. **Purpose:** This is a self-reflection exercise about everyday patterns, not a final definition of the person.
2. **How to answer:** Answer from typical behaviour, not from what one wishes to be.
3. **No right or wrong answers:** Avoid trying to guess a desirable profile.
4. **Scale:** Explain all five response options in plain Burmese.
5. **Skip and resume:** Explain skip, review, pause, automatic saving, and resuming from the last position.
6. **Privacy:** Explain that the initial version stores data in this browser/device; local data can be lost if browser storage is cleared. Provide backup/restore.
7. **Limitations:** Not a clinical diagnosis, moral judgement, intelligence measure, prediction, or career recommendation.
8. **Emotional comfort:** The user may skip any item that feels uncomfortable and does not need to disclose a personal story.
9. **Acknowledgement:** A required checkbox before a new attempt. Resuming an existing draft should not reset its answers.

Do not show a start button in the current preview until the guide, question bank, scoring, and storage flows pass their own checks.

## 8. Validation and research plan before release

1. **Content review:** Have Burmese-language and psychology reviewers examine clarity, double-barrelled wording, moral loading, cultural interpretation, and item-to-theme fit.
2. **Cognitive interviews:** Ask a small, varied group of Burmese readers to explain how they understand each item. Revise confusing phrases.
3. **Pilot:** Run a consent-based pilot to check completion, missing responses, response distribution, and confusing items. A small pilot is for usability and item diagnostics, not proof of validity.
4. **Psychometric study:** Before claiming a validated scale, obtain suitable sample design and specialist analysis, including internal consistency, factor structure, test–retest stability, and cross-group fairness as appropriate.
5. **Versioning:** If an item changes, increment the question-bank version. Existing drafts should retain the exact version and question wording used when they started; do not silently change a live draft's item text.
6. **Public claims:** Until validated, label results as exploratory self-reflection indices.

## 9. Ethical interpretation

- Never describe a lower score as a defect or moral failure.
- Do not equate social quietness with poor social ability.
- Do not encourage suppressing emotion or tolerating harmful treatment.
- Do not infer a mental-health condition, trauma history, honesty in a legal sense, or future behaviour from this questionnaire.
- Avoid a single fixed “type” unless later evidence supports a transparent and useful interpretation. Prefer dimension-by-dimension descriptions.
- Keep career guidance outside this module. Personality reflection alone is not enough to recommend a career.

## 10. Module status

**Status: Draft content and design blueprint only.**  
The current application shows an informational preview. The 30 draft questions and provisional scoring helper are included for internal review and automated validation, but the test is not activated in the UI.
