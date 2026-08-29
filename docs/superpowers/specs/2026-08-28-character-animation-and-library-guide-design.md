# Character animation + library usage guide — Design

**Date:** 2026-08-28
**Status:** Approved (design)
**Package:** `@piensa-it/illustrations`

## Purpose

Consolidate `app-illustrations` as a self-contained, installable library of
reusable characters for product moments (onboarding, loading, success, empty
states) and add a declarative way to attach animation to a character directly
from code, so a consuming app can accompany its own processes.

This round delivers: (1) a declarative `animation` prop on the existing
characters with a small preset catalog, Storybook, and tests; (2) an initial
usage guide; (3) a recommendations/roadmap doc; (4) reconciled README motion
messaging.

## Decisions locked during brainstorming

- **Motion lives here, integrated.** The library is self-contained: a project
  installs only this package to get artwork *and* character motion. This
  supersedes the previous "motion lives in `@piensa-it/ui-library`" stance;
  app-ui (if used) now orchestrates at a higher level only.
- **API shape: declarative prop.** Consumers set a semantic preset via a prop;
  no control hook in this round.
- **Implementation: CSS-driven** via a `data-animation` attribute on the root
  `<svg>`, mirroring the existing `data-blinking` blink pattern. No new JS
  runtime for looping presets, GPU-friendly transforms, reduced-motion honored
  through a CSS `@media` query, and the existing `paused` prop freezes it.

## Non-goals (deferred)

- `usePeepAnimation` orchestration hook (`onDone`, sequencing).
- A separable arm layer for a "true" wave.
- `error`/shake preset and `scenes/` compositions.
- New Playwright visual snapshots (optional; noted in Testing).

## Architecture

The two character components already share one pattern:

- Root `<svg>` with a component class (`peep-bust` / `peep-standing`).
- Named layers via `SvgLayer`: `__head`, `__face`, `__closed-eyes`,
  `__accessory`, and `__pose` (standing body).
- `blink` (ambient) and `paused` (freeze) props.
- Blink is expressed as `data-blinking` on the root svg + a CSS opacity
  transition, gated by `@media (prefers-reduced-motion: reduce)`.

Animation follows the identical mechanism:

- Root `<svg>` receives `data-animation="<preset>"` (omitted when `none`).
- Keyframes defined in the co-located component CSS (`peep-bust.css`,
  `peep-standing.css`) target specific layers via `transform`.
- When `paused` is true, the root also carries `data-paused="true"` and CSS
  sets `animation-play-state: paused` on the animated layers.
- Keyframes are disabled under `prefers-reduced-motion: reduce`.
- CSS ships in the existing `styles.css` bundle — no new entry point.

### Public API

New optional prop on `PeepBustProps` and `PeepStandingProps`:

```ts
type PeepAnimation =
  | "none"      // default
  | "float"
  | "loading"
  | "thinking"
  | "wave"
  | "success";

animation?: PeepAnimation; // default "none"
```

- Coexists with `blink` and `paused`. `paused` freezes both blink and
  animation.
- `PeepAnimation` is exported from `src/index.ts` alongside the existing types.

Process-driven usage (the core scenario) is just prop swapping:

```tsx
<PeepBust
  animation={isSaving ? "loading" : "success"}
  expression={isSaving ? "calm" : "smile"}
  title={isSaving ? "Guardando" : "Listo"}
/>
```

## Preset catalog

| Preset     | Movement                                   | Loop | Typical moment                 |
| ---------- | ------------------------------------------ | ---- | ------------------------------ |
| `none`     | —                                          | —    | default / static              |
| `float`    | Gentle vertical bob of the whole figure    | yes  | hero, empty state, ambient    |
| `loading`  | Continuous head sway + bob                 | yes  | in-progress process           |
| `thinking` | Head tilt + slow sway                      | yes  | "processing/analyzing"        |
| `wave`     | Greeting: head tilt back-and-forth         | yes  | onboarding / welcome          |
| `success`  | Pop/bounce (scale that settles)            | no   | success / confirmation        |

Notes:

- Peeps have no separable arm, so `wave` is a head-tilt greeting, not an arm
  wave. If an arm layer is added later, the preset improves without an API
  change.
- `success` runs once (`animation-iteration-count: 1`). To replay, the consumer
  changes the prop value or the element `key`. Documented in the guide.
- Presets act on layers that exist in both components (head; whole figure).
  Where a component lacks a targeted layer, the preset degrades to the
  whole-figure transform rather than erroring.

## Accessibility & control

- `@media (prefers-reduced-motion: reduce)` sets `animation: none` on all
  animated layers (consistent with the current blink handling).
- `paused` → `animation-play-state: paused`.
- Decorative vs labelled behavior is unchanged: omit `title` for decorative
  (root `aria-hidden`), provide `title` for a labelled image.

## Deliverables

### Code

- `PeepAnimation` type + `animation` prop in `peep-bust.tsx` and
  `peep-standing.tsx`; render `data-animation` on the root svg (omit when
  `none`), and a paused signal consumed by CSS.
- Keyframes + layer rules in `peep-bust.css` and `peep-standing.css`, guarded by
  the reduced-motion media query.
- Export `PeepAnimation` from `src/index.ts`.

### Storybook

- One story per preset on at least `PeepBust`.
- One "process" story showing the real `loading → success` swap driven by state.

### Tests (Vitest)

- `animation="loading"` sets `data-animation="loading"` on the root svg.
- `animation="none"` (default) does **not** set `data-animation`.
- `paused` reflects the paused signal used to stop motion.
- Existing render-with/without-`title` accessibility assertions still pass.
- Playwright visual snapshots for motion are **optional** and out of scope this
  round (motion frames are timing-sensitive); noted for a follow-up.

### Docs

- `docs/GUIDE.md` — initial usage guide: install (GitHub Packages auth + import
  `styles.css`), pick a figure per moment (onboarding, loading, success, empty,
  error), and animate via code (including the `loading → success` pattern and
  how to replay `success`).
- `docs/RECOMMENDATIONS.md` — recommendations/roadmap to consolidate as a
  library (versioning/release already in place, motion messaging, empty
  `scenes/`+`elements/`, reduced-motion coverage, future arm layer / hook).
- **README** — reconcile the "Motion and UI integration" section so it states
  base character animations ship here now, with app-ui orchestrating higher
  level if used.

## Testing strategy summary

Unit (Vitest + Testing Library) covers the attribute contract and
accessibility. Storybook is the manual/visual verification surface for the
motion itself. `npm run typecheck`, `npm run lint`, `npm run test:run`, and
`npm run verify:package` must pass before completion.
