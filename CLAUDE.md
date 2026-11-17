# lift-log

Strength training tracker. Plan training days (exercises, sets with reps and kg), then log the real results during a workout. Used mostly on a phone, also on desktop. Learning project (React + TypeScript).

Scope, data model and decisions: `notes/HANDOFF.md`. Step by step plan: `notes/PLAN.md`.
Mockups: screens https://claude.ai/artifact/UhwNDW4xysNdqgVC5e2aDn, states and tokens https://claude.ai/artifact/WjRTMk6LNTxr9AcPGhocTj

## Stack

Vite, React, TypeScript, Firebase (Auth + Firestore), react-hook-form with zod (`zodResolver`), CSS Modules, Vitest + Testing Library. Icons only from lucide-react. No UI libraries.
Data fetching: Firestore `onSnapshot` is called only in `services/`, in one `subscribeTo...` function per collection that returns the unsubscribe function. One generic hook (`useCollection`, plus `useDocument` only if needed) takes such a function, starts it in `useEffect` and unsubscribes in the cleanup. No TanStack Query in this app. Hooks and components never import `firebase/firestore`.

## Commands

- `npm run dev` starts the app, `npm test -- --run` runs the tests once, `npx vitest run <path>` runs one test file.
- Before a commit: `npm run lint`, `npm test -- --run` and `npm run build` (it runs `tsc -b`) must pass.

## Conventions

- Code, commits, README and UI in English.
- Commits: imperative, lowercase, one topic each (e.g. `add set row component`). If the message needs "and", split it. A function and its test are one commit, a component and its use in a page are two, the styles of one component are one. Logic, styles and `aria` never share a commit (attributes that `Field` builds are part of `Field`'s own logic commit).
- Never commit `.env` files. Branch: `main` only.
- Firebase SDK calls (reads, writes, listeners, auth) live only in `services/`. Hooks and components call service functions. Types and the `FirebaseError` class may be imported anywhere.
- Errors: log the real error with `console.error(err)`. Show the user only our own text (fixed or mapped, like `getAuthErrorMessage`), never `err.message` from a library.

## Code style

- Components are `function` declarations, not arrows. No `import React`.
- Named exports only, no `export default`.
- Component and file share one name, PascalCase. Pages end with `Page` and live in their own folder (`pages/DaysPage/DaysPage.tsx`). JSX files are `.tsx`, the rest `.ts`.
- Every component lives in its own folder with the same name (`Button/Button.tsx`), together with its `.module.css` and test. Hooks, services, schemas and utils are not components: they stay in their type folders, with the test next to the file.
- Router in Declarative mode (`BrowserRouter`, `Routes`, `Route`), imported from `react-router`. Protected and public routes are nested layout routes with `<Outlet />`, not wrappers around each route.
- Imports: external packages first, then project files (`../` before `./`), then `import type`, then styles. No blank lines between imports, the whole block is one group.
- Folders: `features/<name>/` (auth, days, workout) hold their own components, hooks, services and schemas. `components/` holds only generic parts. Pages stay thin and only compose.
- Types come from zod schemas (`z.infer`), not written twice.
- The auth hook `useAuth` lives in its own file, separate from the provider. No `eslint-disable` comments to work around structure.

## Data

- Firestore paths: `users/{uid}/days/{id}` and `users/{uid}/logs/{id}`. No `userId` field in documents, no `where("userId", ...)`. Security rules: only the owner.
- A set is `{ reps: number, weight: number }`. Weight is kg, stored as a number. Dates are strings `YYYY-MM-DD`.
- A day is a named workout (for example `Chest and biceps`) with a `weekday` number, 1 to 7, Monday is 1. Two days may share a weekday (no validation). `subscribeToDays` sorts with one `orderBy("weekday")`, nothing sorts in the pages. Changing the weekday of a day moves it in the list by itself (`onSnapshot`). The date stays only in logs and History, `weekday` is a plan field.
- A log keeps its own copy of names and sets, so changing the plan never changes history.
- Finishing a workout writes the log and updates the day in one `writeBatch`: each done set overwrites the same set number in the plan (`applyToPlan`), extra done sets are appended, undone sets stay as they were. There is no separate "last time" view.
- One function per document type converts a Firestore snapshot to our type. No copied field lists.
- Security rules live in `firestore.rules` (source of truth). Change them only there, never in the Firebase console, then deploy: `npx firebase-tools deploy --only firestore:rules` (it overwrites the console).

## Forms and inputs

- A `Field` component (label, control, error) builds `id`, `aria-invalid`, `aria-describedby` and `role="alert"` once, with `useId()`. Do not repeat these by hand per field.
- Validation runs on submit (default react-hook-form mode), then live. Not `onBlur`.
- A field error shows right under its field (`Field` renders it) and the field gets a red border. An error that belongs to no single field (wrong email or password at login) shows as one message above the submit button. Login never says which of email or password was wrong. Messages are our own text, mapped from the error code (`getAuthErrorMessage`).
- Reps and kg are `type="text"` with `inputMode="numeric"` (digits only). A decimal kg value (for example 12.5) comes only from the `+` and `-` buttons, see `notes/LIMITATIONS.md`. Not `type="number"`, no wheel picker.
- Focus selects the whole value. An empty field becomes `0` (no restoring of the previous value, no local text state). Zod checks the ranges.
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

- Done per component, right after its styles, as its own commit, not at the end. Attributes that `Field` builds belong to `Field` itself.
- Native HTML first. Add `aria` only where something is missing (names for icon buttons, `aria-pressed` on toggles, `role="alert"` on errors).

## Workflow

- Progress and next steps live in `notes/PLAN.md`. Work on one step at a time. The "Done when" line decides when a step is closed.
- When I confirm something works (browser test or commit done), tick the matching checkbox in `notes/PLAN.md` and update the next-step line at the top of the file at the end of the session. Never tick based on `tsc` alone.
- Always use Context7 for library/API documentation, setup and configuration, without me asking. Use the library version from `package.json`.
- Keep this file under 200 lines (Anthropic docs). Add only what cannot be learned from the code or had to be corrected twice. Before adding a rule, check it does not repeat or contradict an existing one. A rule with no exceptions becomes a hook or a lint rule.

## Styling

- Global tokens only in `src/index.css` (`--color-*`, `--spacing-*`). Use only those values.
- The whole app is mobile first: base styles are for the phone, larger screens are added with `min-width`. Every new component is styled for mobile right away. Touch targets are at least 44 px.
- Media queries are written as `@media screen and (min-width: 641px)` and always go at the bottom of the CSS Module file, grouped.
- On wide screens the app stays one centered column (`max-width` about 480px). No separate desktop layout.
- Interactive elements (buttons, links) get three states, in this order in the CSS Module file: the base rule with `transition` in it (not in `:hover`, so it animates both ways), then `:active` (touch feedback, works on phone and desktop, outside any media query), then `:hover` inside `@media (hover: hover)` at the bottom. Hover never goes outside `@media (hover: hover)`, so it does not stick on the phone.
