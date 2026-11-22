# Antigravity Start Prompt — Self Discovery Project Handover

Copy the prompt below into a new Antigravity Agent conversation after opening the real `Self_Discovery_Personality` Git repository as the workspace root.

---

You are taking over development of the **Self Discovery** project. First read and follow the repository-root `AGENTS.md`. Also read `.cursorrules` as a compatibility reference, but if any instruction differs, follow `AGENTS.md` and the actual repository state.

## Owner's language and working style

- Communicate with the owner in Burmese, using clear everyday explanations.
- The owner is learning GitHub Desktop and prefers a simple, safe, one-step-at-a-time workflow.
- Do not make them repeat details already present in the repository or this prompt.
- Do not overwhelm them with repeated questionnaires. Make sensible assumptions, state them, and ask only when a decision is genuinely necessary.
- Do not commit, push, or deploy without explicit instruction.

## Product vision

Self Discovery is a Burmese-first app intended to help people, especially people in Myanmar, understand themselves more clearly. It is not primarily a career-finding product. Its core areas are personality, thoughts, feelings, behaviour, self-reflection, and learning psychological concepts in accessible Burmese.

The product should help a user finish an activity thinking: “I understand myself a little better,” not “The app has permanently defined what kind of person I am.” Do not label, shame, diagnose, or rank people.

## Product modules and known history

- **TraitLens**: Big Five-inspired personality reflection assessment. The project has supported 30 / 60 / 120-question modes. Preserve exact question IDs, text, response options, scoring, reverse scoring, trait mapping, and result history.
- **InnerCompass**: an owner-created six-dimension self-reflection pilot. It is NOT the official HEXACO assessment. Preserve its questions, IDs, six dimensions, scoring, and pilot status.
- **Knowledge Center**: Burmese/English psychology and self-understanding glossary. The initial content set contains 30 draft terms across six categories. AI text is not expert-approved. Maintain separate language and psychology review statuses.
- **Career Interest / RIASEC** and Skills are separate, secondary/optional modules. Do not let career features take over the product's main direction.
- Future concepts discussed: Self Reflection notes, HEXACO as a separate assessment, BondSense (relationship patterns), and ValueMap (personal values). These are plans, not proof that they are already in the checked-out repository.

## Version / project-state caution

Recent project history discussed:
- v1.10.1-beta.1: Knowledge Center inline help.
- v1.11.0-beta.1: expanded TraitLens and InnerCompass result explanations.
- v1.11.1-beta.1: mobile bottom navigation and assessment navigation.
- v1.12.0-beta.1: a Self Reflection ZIP was generated in a previous assistant session, but it may NOT have been installed, committed, pushed, or deployed.

Do not assume the repository currently contains v1.12.0. Inspect `package.json`, `CHANGELOG.md`, `git status`, `git log`, and the actual code to determine the real state. Do not import or merge an old ZIP unless the owner explicitly asks you to.

## Your first task: read-only handover audit — do not edit yet

Perform a read-only audit of the opened workspace:

1. Verify the workspace root is the Self Discovery Git repository, not a restaurant project, expense tracker, ZIP extraction folder, or backup.
2. Report repository name, current branch, `git status --short --branch`, latest commit hash/message, package version, Vite base path, and GitHub Pages workflow path.
3. Read README, CHANGELOG, package.json, AGENTS.md, `.cursorrules`, key docs, and deployment configuration.
4. Map the main app routes/components and locate:
   - TraitLens questions, IDs, scoring, result report, and download report code.
   - InnerCompass questions, scoring, pilot status, result report, and download report code.
   - Career Interest module and its scoring.
   - Knowledge Center glossary data, search/category UI, inline help mapping, and review status model.
   - Mobile bottom navigation and assessment previous/next/skip/question-list controls.
   - LocalStorage keys, persistence helpers, draft/history records, JSON backup/restore implementation.
5. Identify any stale/duplicate configs, unused files, TODOs, unsafe dependencies, broken imports, and mobile layout risks. Do not delete or change them during this audit.
6. Inspect available npm scripts and report which validations/builds can run in the current environment. Do not install packages or alter lockfiles.
7. Confirm whether the current checked-out code matches the latest successful GitHub deployment, if this can be established from local git history and workflow logs. Do not claim it if not verifiable.

## Required audit output

Respond in Burmese with these headings:

1. လက်ရှိ Project အခြေအနေ
2. လက်ရှိ Version နဲ့ Git အခြေအနေ
3. Module တစ်ခုချင်းစီရဲ့ လက်ရှိလုပ်ဆောင်ချက်
4. Questions / Scoring / LocalStorage / Backup ထိန်းသိမ်းမှု
5. တွေ့ရှိတဲ့ ပြဿနာများ (Critical / Important / Improvement)
6. စမ်းသပ်နိုင်ခဲ့တာနဲ့ မစမ်းနိုင်ခဲ့တာ
7. အကြံပြုတဲ့ နောက်တစ်ဆင့်နဲ့ ပြောင်းမယ့်ဖိုင်စာရင်း

For each finding, distinguish:
- **Verified**: confirmed by inspected code or executed command.
- **Inferred**: likely, but not proven.
- **Not checked**: could not be verified.

Stop after the audit and wait for the owner's approval before editing. Do not make changes, create a branch, commit, push, deploy, run destructive commands, or overwrite files during this first task.

---

## Follow-up task prompt (use only after the audit and owner approval)

After the owner approves, implement the next agreed feature as a small, focused release. First provide the plan and exact files to change. Preserve all protected invariants in `AGENTS.md`. Make minimal diffs, add/update focused tests, run existing validators and production build when possible, inspect the final diff, and report verified results honestly. Never commit, push, or deploy unless the owner explicitly requests it.
