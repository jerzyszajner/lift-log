# lift-log

Strength training tracker. Plan training days (exercises, sets with reps and kg), then log the real results during a workout. Used mostly on a phone, also on desktop. Learning project (React + TypeScript).

Scope, data model and decisions: `notes/HANDOFF.md`. Step by step plan: `notes/PLAN.md`.
Mockup: https://claude.ai/artifact/U6qndcpKiGC8V2n8MNRRC7

## Stack

Vite, React, TypeScript, React Router, Firebase (Auth + Firestore), react-hook-form, zod, @hookform/resolvers (`zodResolver`), CSS Modules, lucide-react (icons only), Vitest + Testing Library.
Data fetching: Firestore `onSnapshot` through one generic hook (`useCollection`, plus `useDocument` only if needed) that unsubscribes in the `useEffect` cleanup. No TanStack Query in this app. Components never call `onSnapshot` directly.
No UI libraries.

## Conventions

- Code, commits, README and UI in English.
- Commits: imperative, lowercase, one change each (e.g. `add set row component`).
- Never commit `.env` files. Branch: `main` only.
- Components do not touch Firebase directly: use `services/` and hooks.
- Errors: log the real error with `console.error(err)`. Show the user only our own text (fixed or mapped, like `getAuthErrorMessage`), never `err.message` from a library.

## Code style

- Components are `function` declarations, not arrows. No `import React`.
- Named exports only, no `export default`.
- Component and file share one name, PascalCase. Pages end with `Page` and live in their own folder (`pages/HomePage/HomePage.tsx`). JSX files are `.tsx`, the rest `.ts`.
- Router in Declarative mode (`BrowserRouter`, `Routes`, `Route`), imported from `react-router`. Protected and public routes are nested layout routes with `<Outlet />`, not wrappers around each route.
- Routes (adjust in the auth step): `/`, `/days/new`, `/days/:id`, `/workout/:dayId`, `/history`, `/account`, `/login`, `/signup`, `*`.
- Imports: external packages first, then project files (`../` before `./`), then `import type`, then styles.
- Folders: `features/<name>/` (auth, days, workout) hold their own components, hooks, services and schemas. `components/` holds only generic parts. Pages stay thin and only compose.
- Types come from zod schemas (`z.infer`), not written twice.
- The auth hook `useAuth` lives in its own file, separate from the provider. No `eslint-disable` comments to work around structure.

## Data

- Firestore paths: `users/{uid}/days/{id}` and `users/{uid}/logs/{id}`. No `userId` field in documents, no `where("userId", ...)`. Security rules: only the owner.
- A set is `{ reps: number, weight: number }`. Weight is kg, stored as a number. Dates are strings `YYYY-MM-DD`.
- A day is just a named workout (for example `Chest and biceps`). No weekday field. Days are sorted by an `order` number (a new day gets the highest + 1). The list never reorders by itself. Moving a day swaps the `order` of two neighbours in one `writeBatch`, with up and down buttons, no drag and drop.
- A log keeps its own copy of names and sets, so changing the plan never changes history.
- Finishing a workout writes the log and updates the day in one `writeBatch`: each done set overwrites the same set number in the plan (`applyToPlan`), extra done sets are appended, undone sets stay as they were. There is no separate "last time" view.
- One function per document type converts a Firestore snapshot to our type. No copied field lists.

## Forms and inputs

- A `Field` component (label, control, error) builds `id`, `aria-invalid`, `aria-describedby` and `role="alert"` once, with `useId()`. Do not repeat these by hand per field.
- Validation runs on submit (default react-hook-form mode), then live. Not `onBlur`.
- A field error shows right under its field (`Field` renders it) and the field gets a red border. An error that belongs to no single field (wrong email or password at login) shows as one message above the submit button. Login never says which of email or password was wrong. Messages are our own text, mapped from the error code (`getAuthErrorMessage`).
- Reps and kg are `type="text"` with `inputMode` (`numeric`, `decimal`). Not `type="number"`, no wheel picker.
- Focus selects the whole value. An empty field restores the previous value on blur. Zod checks the ranges.
- Kg buttons use `getNextWeight(current, direction)` (pure function in `utils/`, tested): below 10 kg step 1, from 10 kg up step 2.5, going down from 10 kg gives 9.
- Buttons have general labels ("Increase weight"). Set inputs have `aria-label` ("Reps, set 1").

## Simplicity

- Smallest solution that matches the mockup and the plan. No abstraction before the second use. No features outside version 1.
- New ideas go to `notes/PARKING.md`, not into the code.
- One rule at a time. No alternatives we are not choosing.
- No `letter-spacing` in any style, even if a mockup has it.

## Navigation on the phone

- Top left of every sub screen: a back arrow with the name of the screen it returns to (`‹ Days`, `‹ History`), as a `<Link>`.
- Bottom of the screen: the one main action, full width, in thumb reach (`Save day`, `Finish workout`). A secondary action sits next to it only when it is safe.
- Destructive actions (`Delete day`, `Delete account`) are never next to the main one. They live in the content and ask for confirmation.
- Leaving a workout with done sets asks "Leave without saving?". Screens with the tab bar have no back arrow.

## Accessibility

- Done per component, together with styling, not at the end.
- Native HTML first. Add `aria` only where something is missing (names for icon buttons, `aria-pressed` on toggles, `role="alert"` on errors).
- Styles and `aria` are separate commits. Work in stages: make change 1, say "to commit 1", wait for the commit, then make change 2.

## Workflow

- Progress and next steps live in `notes/PLAN.md`. Work on one step at a time. The "Done when" line decides when a step is closed.
- When I confirm something works (browser test or commit done), tick the matching checkbox in `notes/PLAN.md` and update the "Next time" line at the end of the session. Never tick based on `tsc` alone.
- `notes/` is local (in `.gitignore`). Update it without mentioning Git.
- Before reviewing code or advising a commit, read the files again. I edit between turns.
- Always use Context7 for library/API documentation, setup and configuration, without me asking. Use the library version from `package.json`.

## Styling

- Global tokens only in `src/index.css` (`--color-*`, `--spacing-*`). Use only those values.
- The whole app is mobile first: base styles are for the phone, larger screens are added with `min-width`. Every new component is styled for mobile right away. Touch targets are at least 44 px.
- Media queries are written as `@media screen and (min-width: 641px)` and always go at the bottom of the CSS Module file, grouped.
- On wide screens the app stays one centered column (`max-width` about 480px). No separate desktop layout.
- Interactive elements (buttons, links) get three states, in this order in the CSS Module file: the base rule with `transition` in it (not in `:hover`, so it animates both ways), then `:active` (touch feedback, works on phone and desktop, outside any media query), then `:hover` inside `@media (hover: hover)` at the bottom. Hover never goes outside `@media (hover: hover)`, so it does not stick on the phone.
