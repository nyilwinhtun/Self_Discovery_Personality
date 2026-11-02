# Self Discovery — Logo & Guide Design QA V2

## Scope

This review covers the four project-created SVG identity marks, the TraitLens pre-test guide, the Career Interest introduction/guide, and the InnerCompass informational preview. It is a source and static-render review; it is not a full live-browser accessibility audit.

## 1. Logo review

| Identity | Visual metaphor | Primary accent | QA observation |
|---|---|---|---|
| TraitLens | Intersecting lens / viewing forms around a centre point | Plum `#80678f` | Reads as looking inward; remains distinguishable at 24 px. |
| InnerCompass | Six-direction compass with central pointer | Blue `#527daa` | Clearly signals orientation and reflection; separate from TraitLens. |
| BondSense | Two linked circles | Rose `#b87969` | Communicates connection; the overlap remains recognisable at small sizes. |
| ValueMap | Compass-like directional star | Sage `#78875c` | Suggests values and personal direction; distinct from the six-ray InnerCompass mark. |

### Technical checks

- Each SVG uses a 64×64 viewBox and scales proportionally.
- Each logo has `role="img"` and an accessible `aria-label`.
- The marks are drawn from original project-created SVG paths and basic geometric forms.
- Parent cards apply the corresponding identity colour; SVG strokes use `currentColor` to inherit that colour in the application.
- Static scale review was prepared at 24, 32, 56, and 76 px. All four silhouettes remain distinguishable; 24 px is acceptable for compact UI, while 56–76 px is preferred for main cards and guide headers.
- A mobile-width preview of the InnerCompass guide was rendered. The long return label was shortened to “နောက်သို့” so it does not crowd the top row on narrow screens.

## 2. Guide content audit

### TraitLens

The guide explains:
- what it reflects on;
- what it does not measure or diagnose;
- answering from typical behaviour rather than an ideal self;
- the absence of right/wrong answers;
- skip, review, pause, and resume;
- automatic local saving and the need for JSON backup;
- the difference between a descriptive index and a population percentile;
- acknowledgement before starting a new attempt.

### Career Interest

The guide explains:
- interest/preference rather than ability or experience;
- the absence of right/wrong answers;
- skip and return;
- local auto-save and resume;
- the limits of the result as a descriptive interest index, not a guarantee of career fit;
- acknowledgement before a new attempt.

### InnerCompass

The preview now uses six original, project-defined reflection areas and includes a guide preview covering purpose, typical-behaviour responses, the five-point scale, result limitations, local storage, and user comfort. It remains preview-only; no test can be started yet.

## 3. Readability and contrast adjustments

Small supporting text on the light guide backgrounds was darkened. The following foreground/background combinations were checked using the WCAG relative-luminance contrast formula:

| Foreground | Background | Contrast ratio | Result for normal-size text |
|---|---|---:|---|
| `#6f6276` | `#faf7fb` | 5.36:1 | Pass |
| `#74677b` | `#ffffff` | 5.29:1 | Pass |
| `#745b83` | `#f2eaf5` | 5.01:1 | Pass |
| `#596d83` | `#f5f8fc` | 5.00:1 | Pass |
| `#3f648c` | `#eaf1fa` | 5.41:1 | Pass |
| `#716679` | `#faf7fa` | 5.09:1 | Pass |

These checks apply to the listed combinations only. They do not certify every colour in the full application or replace real-device testing.

## 4. Behaviour and content checks

- TraitLens guide has a required acknowledgement checkbox before starting a new attempt.
- Career Interest guide has its own required acknowledgement checkbox.
- Existing drafts remain resumable without being reset by the guide acknowledgement.
- InnerCompass remains informational and cannot be started from the preview.
- No public-facing external test or publisher name is used as the InnerCompass product label.
- The draft content explicitly says it is not a clinical diagnosis or a validated scale.

## 5. Validation performed

- `npm run validate:assessment`
- `npm run validate:backup`
- `npm run validate:career`
- `npm run validate:design`
- `npm run validate:innercompass-draft`
- TypeScript JSX parse/transpile check for the React source files.
- Static logo-scale render review at 24 / 32 / 56 / 76 px.
- Contrast calculation for the listed guide text/background pairs.

A complete Vite production build and interactive Chrome test are still required after dependencies are installed. The headless Chrome process in the build environment did not complete reliably, so this report does not claim live-browser verification. The included PNG previews are static QA renders, not screenshots of a running React application.


## 6. InnerCompass question-bank review V0.2.0

- The original V0.1.0 bank is preserved unchanged.
- A separate project-written V0.2.0 bank now uses version-specific IDs and revised Burmese wording.
- The revised draft has six project-defined areas with five distinct prompts per area.
- Item-level editorial notes identify remaining questions for cognitive interviews.
- A separate cognitive-interview guide and provisional scoring blueprint are included.
- The V0.2.0 bank remains inactive in the public app.
- Automated validation checks ID/text uniqueness, area/theme balance, reverse scoring, missing-answer behaviour, and release-gate flags.

These checks do not establish psychological validity. A Burmese language editor, qualified psychology/personality reviewer, cognitive interviews, and a suitable pilot/psychometric study remain necessary before public activation or validation claims.
