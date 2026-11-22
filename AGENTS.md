# Self Discovery — Project Rules for Antigravity Agents

These instructions apply to the Self Discovery repository. Follow them before inspecting, planning, editing, testing, or explaining code changes.

## 1. Product mission and principles

- Product: **Self Discovery** — a Burmese-first self-understanding and self-reflection web app.
- Mission: help people understand their own personality, thoughts, feelings, behaviours, values, and relationship patterns without labelling, shaming, diagnosing, or telling them who they permanently are.
- Write user-facing Burmese in clear, natural, accessible Myanmar language. Keep established product and assessment names such as TraitLens, InnerCompass, Knowledge Center, BondSense, and ValueMap unchanged unless the owner approves a rename.
- Be culturally sensitive to Myanmar users. Do not assume one life situation, family structure, education level, gender role, or work context fits everyone.
- Personality results are reflective indicators, not clinical diagnoses or fixed identities. A high score is not universally “better”; a low score is not a weakness or disorder.
- Clearly distinguish established frameworks (for example, Big Five / RIASEC) from owner-created reflection tools. InnerCompass is an original six-dimension self-reflection tool; do not describe it as the official HEXACO assessment.
- Do not claim an assessment is scientifically validated, clinically validated, expert-approved, or diagnostic unless the repository contains credible evidence and the owner explicitly approves that claim.

## 2. First action in every new task: inspect before editing

Before changing files:
1. Confirm the opened workspace root and repository name. It must be the Self Discovery repository, not `expense-tracker`, `pos-restaurant-analytics`, a restaurant project, a ZIP extraction folder, or the backup folder.
2. Read `README.md`, `CHANGELOG.md`, `package.json`, the Vite config, the GitHub Pages workflow, and relevant `docs/` files.
3. Inspect `git status --short --branch`, current branch, latest commit, and tracked/untracked/ignored changes.
4. Determine the actual checked-out app version from `package.json` and compare it with the latest commit. Never assume a previously generated ZIP has already been installed or pushed.
5. Map the relevant components, question banks, scoring, persistence, backup/restore, and tests before proposing edits.
6. Report the findings and a concise implementation plan before editing. If the task is ambiguous or may alter user data, ask for approval first.

Do not infer repository state from screenshots, old chat messages, ZIP names, or prior agent claims. Verify the actual workspace.

## 3. Protected assessment and data invariants

Unless the owner explicitly approves a carefully documented migration, NEVER change:
- TraitLens question wording, question IDs, order, answer options, reverse-scoring flags, scoring formulas, trait mapping, or supported assessment lengths (30 / 60 / 120).
- InnerCompass question wording, IDs, order, dimensions, scoring, or pilot status.
- Career Interest / RIASEC question banks, answer options, scoring, or result mapping.
- Existing LocalStorage keys, data shapes, IDs, draft/history records, dates, or import/export compatibility.
- Existing JSON backup/restore formats or merge/replace semantics.

When a feature requires new data:
- Add a separate, namespaced data structure; do not overload assessment records.
- Preserve backward compatibility with existing backups. Add a versioned, tested migration only when necessary and obtain approval before changing a schema.
- Test create, read, update, delete, refresh persistence, export, import, merge, replace, malformed backup, and old-backup compatibility where relevant.
- Never silently clear, overwrite, or migrate a user's data.

The app has historically used browser-local persistence. Verify the exact current keys and storage implementation in source before relying on a remembered key. Do not rename keys.

## 4. Privacy and safety

- Keep assessment answers, reports, reflection notes, and personal data local unless the owner explicitly approves a privacy-reviewed architecture change.
- Do not add Firebase, a database, analytics, telemetry, tracking pixels, external APIs, cloud sync, authentication, or paid services without explicit approval.
- Do not send personal content to third-party services or log it to the console/server.
- Treat reflection notes as sensitive personal writing. Make storage, export, deletion, and backup behaviour clear to users.
- Do not add automatic psychological conclusions, risk labels, mental-health diagnoses, or prescriptive advice.
- Provide gentle language and optional reflective prompts. Users may skip prompts and should not be pressured to disclose private experiences.
- Explain that the app is for self-reflection and is not a substitute for professional mental-health care when relevant.

## 5. Current technology and architecture — verify before changing

The repository has used:
- React with JSX, Vite, and JavaScript (do not convert to TypeScript without approval).
- Tailwind CSS with the Tailwind Vite plugin; Lucide React icons; Recharts for charts.
- GitHub Pages deployment from the `main` branch through GitHub Actions.
- Browser LocalStorage for local data.

Always inspect the current `package.json`, installed versions, `vite.config.*`, `index.html`, CSS entry point, and `.github/workflows/` before making assumptions.

Important build-history note:
- A stale `postcss.config.js` attempted to load `autoprefixer`, which caused a GitHub Actions production-build failure (`Cannot find module 'autoprefixer'`). The file was renamed to `postcss.config.js.disabled.js` as a workaround.
- Do not restore or reactivate that stale PostCSS config, add `autoprefixer`, or change the Tailwind setup without first inspecting the current Tailwind version and Vite plugin configuration and explaining why the change is needed.
- Do not regenerate or alter `package-lock.json` unnecessarily. Never use wildcard `latest` dependency changes as an incidental part of a feature.

GitHub Pages requirements:
- Preserve the repository's deployment workflow and Vite base path for `/Self_Discovery_Personality/` (verify the actual current config).
- Do not change repository name, branch, workflow permissions, artifact paths, or Pages deployment settings unless specifically requested.
- Relative asset paths must work under the GitHub Pages project subpath.

## 6. UI and accessibility standards

- Mobile-first, responsive, and usable on common Android phones as well as desktop browsers.
- Use accessible labels, keyboard focus, adequate touch targets, sufficient contrast, semantic buttons/links, and reduced-motion-friendly behaviour.
- Avoid horizontal overflow, fixed elements covering content, and tiny bottom-navigation tap targets.
- Respect safe-area insets on phones with gesture/home-indicator areas.
- Preserve existing desktop layouts unless the task explicitly includes desktop changes.
- Do not show the main bottom navigation while a focused assessment flow is active if it could cause accidental exit; use the designed assessment controls instead.
- Keep navigation labels short and understandable in Burmese. Do not use icons without accessible text or labels.
- Test narrow widths, long Burmese text, text wrapping, keyboard navigation, and scroll behaviour.

## 7. Knowledge Center content governance

- Knowledge Center entries are drafts unless a real review is recorded.
- Keep language review and psychology review separate.
- Review statuses: Draft → Language Review → Psychology Review → Approved → Published.
- Never mark content Approved or Published based on AI review alone.
- Record actual reviewer identity/role, credentials or verification basis, review date, comments, and content version when that workflow is implemented.
- Any content change after approval creates a new version and requires review again.
- Use plain Burmese explanations, everyday examples, distinctions from similar terms, cautions, and sources. Do not invent references or credentials.

## 8. Development workflow and Git safety

- Do not commit, push, publish, deploy, create releases, or alter Git remotes unless the owner explicitly asks.
- Do not run destructive commands such as `git reset --hard`, `git clean -fd`, force push, bulk delete, or mass replace.
- Never edit another project folder. Do not copy files across repositories. Verify `pwd` / workspace root before commands that write files.
- Do not replace `.git`, `.github`, `node_modules`, or lockfiles by copying a full ZIP into the repository.
- Prefer minimal, targeted diffs. Do not reformat unrelated files or rewrite whole modules for a small feature.
- Before edits, list the files expected to change. After edits, report the actual changed files and why.
- Preserve unrelated user changes. If `git status` shows unexpected modifications, stop and report before proceeding.
- Do not silently skip existing code or remove features to make tests pass.

## 9. Validation requirements

Before declaring a task complete:
1. Inspect available npm scripts in `package.json`.
2. Run relevant focused validation scripts.
3. Run `npm run validate:all` if available.
4. Run `npm run build` if dependencies are installed and the environment supports it.
5. If build/test commands cannot run, state the exact reason and do not claim they passed.
6. Inspect the final diff for accidental changes to question banks, scoring, storage, backup, config, generated files, or unrelated modules.
7. For UI changes, provide a manual test checklist for Android-sized mobile, desktop, and persistence behaviour.
8. For data-related changes, test old backup compatibility and local data preservation.

A static code scan or custom validation script is not a substitute for a production build or real browser/device test. Report each separately.

## 10. Communication with the owner

- Communicate in Burmese unless the owner asks otherwise.
- Explain technical terms simply and give one action at a time when the owner is doing GitHub Desktop/Finder steps.
- Do not repeatedly ask for information already visible in the current workspace or conversation.
- Never claim work was done, tests passed, files were changed, or a deployment succeeded unless the tools/logs prove it.
- Keep the owner informed before long operations. Provide concise summaries: inspected, changed, tested, not tested, risks, next step.
- Before any potentially destructive action, explain exactly what will change and request explicit approval.

## 11. Definition of done

A feature is complete only when:
- The actual repository and version were verified.
- The intended UI and behaviour are implemented without unrelated changes.
- Protected assessment/data invariants remain intact or an approved migration is documented.
- Relevant validation and build results are accurately reported.
- Mobile and desktop manual test steps are supplied when applicable.
- No commit/push/deploy occurs without the owner's explicit instruction.
