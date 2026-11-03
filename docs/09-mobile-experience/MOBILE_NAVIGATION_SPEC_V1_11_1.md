# Mobile Navigation Specification — v1.11.1-beta.1

## Purpose
Reduce excessive vertical scrolling on phones while preserving the existing desktop layout and assessment behavior.

## Main navigation
On screens narrower than the `sm` breakpoint, show a fixed bottom bar with four destinations:
- Home
- Assessment (returns to Home and scrolls to the assessment dashboard)
- Knowledge Center
- History

The desktop header navigation remains visible from the `sm` breakpoint upward. The mobile bar is shown only on the top-level Home, Knowledge Center, and History pages, avoiding conflicts with assessment controls.

## Question navigation
TraitLens, InnerCompass, and Career Interest question screens use a fixed mobile action area with:
- Previous (disabled on the first question)
- Next / Review (disabled until an answer is selected)
- Skip (only while the current question is unanswered)
- Question list / Review shortcut

Existing in-card controls remain visible on desktop. Main content reserves bottom space so the fixed action area does not cover the last answer option or helper text. Safe-area padding is included for phones with gesture areas and display cutouts.

## Result navigation
TraitLens and InnerCompass reports expose horizontal, scrollable section shortcuts for the overview, scored areas, and interpretation notes. The report content remains in the same document; the shortcuts scroll to existing sections and do not change or recalculate results.

## Data and behavior constraints
This release does not modify question text or IDs, scoring, reverse scoring, assessment completion rules, LocalStorage keys, draft/history shapes, or JSON backup/restore formats.

## Manual device QA checklist
- [ ] 320 px wide viewport: no horizontal page overflow.
- [ ] 360–430 px Android viewport: bottom navigation labels fit and remain tappable.
- [ ] iPhone safe-area viewport: fixed bars do not overlap the home indicator.
- [ ] Previous is disabled on question 1 and advances correctly thereafter.
- [ ] Next is disabled until an answer is chosen.
- [ ] Skip appears only for unanswered questions and preserves draft behavior.
- [ ] Question List shortcut opens the existing review screen.
- [ ] Assessment answers remain saved after leaving and resuming.
- [ ] Result shortcuts scroll to the correct sections.
- [ ] Desktop header and in-card question controls remain unchanged.
