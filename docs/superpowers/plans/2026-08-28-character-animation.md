# Character Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a declarative `animation` prop with a small preset catalog to `PeepBust` and `PeepStanding`, so a consuming app can accompany its own processes (loading → success, onboarding wave, etc.) with character motion, plus initial usage/recommendations docs.

**Architecture:** CSS-driven motion. The root `<svg>` gets `data-animation="<preset>"` (omitted when `none`) and `data-paused="true"` when frozen, mirroring the existing `data-blinking` pattern. Keyframes live in the co-located component CSS, target the `__head` layer or the whole figure via `transform`, ship in `styles.css`, and are disabled under `prefers-reduced-motion: reduce`.

**Tech Stack:** React 18, TypeScript, Vite (lib build), Vitest + Testing Library, Storybook (react-vite), CSS keyframes.

**Spec:** `docs/superpowers/specs/2026-08-28-character-animation-and-library-guide-design.md`

## File Structure

- Modify: `src/characters/peep-bust.tsx` — define `PeepAnimation` type, add `animation` prop, render `data-animation` / `data-paused`.
- Modify: `src/characters/peep-bust.css` — keyframes + preset rules.
- Modify: `src/characters/peep-bust.test.tsx` — attribute-contract tests.
- Modify: `src/characters/peep-standing.tsx` — import `PeepAnimation`, add `animation` prop, render attributes.
- Modify: `src/characters/peep-standing.css` — keyframes + preset rules.
- Modify: `src/characters/peep-standing.test.tsx` — attribute-contract tests.
- Modify: `src/index.ts` — export `PeepAnimation`.
- Create: `src/characters/peep-animation.stories.tsx` — one story per preset + a process (loading→success) story.
- Create: `docs/GUIDE.md` — usage guide.
- Create: `docs/RECOMMENDATIONS.md` — roadmap.
- Modify: `README.md` — reconcile the motion section.

**Test run reference:** single file with `npx vitest run <path>`; full suite with `npm run test:run`.

---

### Task 1: `animation` prop + attributes on PeepBust

**Files:**
- Modify: `src/characters/peep-bust.tsx`
- Test: `src/characters/peep-bust.test.tsx`

- [ ] **Step 1: Write the failing tests**

Append inside the existing `describe("PeepBust", () => { ... })` block in `src/characters/peep-bust.test.tsx`:

```tsx
  it("expone la animación mediante data-animation", () => {
    const { container } = render(<PeepBust animation="loading" blink="off" />);

    expect(container.querySelector("svg")).toHaveAttribute(
      "data-animation",
      "loading",
    );
  });

  it("no expone data-animation cuando es none (por defecto)", () => {
    const { container } = render(<PeepBust blink="off" />);

    expect(container.querySelector("svg")).not.toHaveAttribute("data-animation");
  });

  it("marca data-paused cuando paused está activo", () => {
    const { container } = render(
      <PeepBust animation="float" paused blink="off" />,
    );

    expect(container.querySelector("svg")).toHaveAttribute("data-paused", "true");
  });
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/characters/peep-bust.test.tsx`
Expected: FAIL — the two new attribute assertions fail (no `data-animation` / `data-paused` rendered). `not.toHaveAttribute` may pass already; the `loading` and `paused` cases must fail.

- [ ] **Step 3: Add the type and prop**

In `src/characters/peep-bust.tsx`, after the `export type PeepBlink = ...` line, add:

```tsx
export type PeepAnimation =
  | "none"
  | "float"
  | "loading"
  | "thinking"
  | "wave"
  | "success";
```

In `PeepBustProps`, add below the `paused` field:

```tsx
  /** Animación semántica ligada a un proceso. Respeta `prefers-reduced-motion`. */
  animation?: PeepAnimation;
```

In the `PeepBust` function parameter list, add a default after `paused = false,`:

```tsx
  animation = "none",
```

On the root `<svg>`, add these two attributes next to `data-blinking`:

```tsx
      data-animation={animation === "none" ? undefined : animation}
      data-paused={paused ? "true" : undefined}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/characters/peep-bust.test.tsx`
Expected: PASS (all PeepBust tests).

- [ ] **Step 5: Commit**

```bash
git add src/characters/peep-bust.tsx src/characters/peep-bust.test.tsx
git commit -m "feat(characters): add animation prop to PeepBust"
```

---

### Task 2: PeepBust animation keyframes (CSS)

**Files:**
- Modify: `src/characters/peep-bust.css`

- [ ] **Step 1: Append the preset rules**

Add to the end of `src/characters/peep-bust.css`:

```css
/* Animation presets */
.peep-bust[data-animation="float"] {
  transform-box: fill-box;
  transform-origin: 50% 50%;
  animation: peep-bust-float 3s ease-in-out infinite;
}

.peep-bust[data-animation="loading"] .peep-bust__head,
.peep-bust[data-animation="thinking"] .peep-bust__head,
.peep-bust[data-animation="wave"] .peep-bust__head {
  transform-box: fill-box;
  transform-origin: 50% 95%;
}

.peep-bust[data-animation="loading"] .peep-bust__head {
  animation: peep-bust-loading 1.4s ease-in-out infinite;
}

.peep-bust[data-animation="thinking"] .peep-bust__head {
  animation: peep-bust-thinking 3.2s ease-in-out infinite;
}

.peep-bust[data-animation="wave"] .peep-bust__head {
  animation: peep-bust-wave 0.9s ease-in-out infinite;
}

.peep-bust[data-animation="success"] {
  transform-box: fill-box;
  transform-origin: 50% 100%;
  animation: peep-bust-success 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 1;
}

.peep-bust[data-paused="true"],
.peep-bust[data-paused="true"] .peep-bust__head {
  animation-play-state: paused;
}

@keyframes peep-bust-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2%);
  }
}

@keyframes peep-bust-loading {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-1%) rotate(-3deg);
  }
  75% {
    transform: translateY(-1%) rotate(3deg);
  }
}

@keyframes peep-bust-thinking {
  0%,
  100% {
    transform: rotate(-2deg);
  }
  50% {
    transform: rotate(4deg);
  }
}

@keyframes peep-bust-wave {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-8deg);
  }
  75% {
    transform: rotate(8deg);
  }
}

@keyframes peep-bust-success {
  0% {
    transform: scale(0.85);
  }
  60% {
    transform: scale(1.06);
  }
  100% {
    transform: scale(1);
  }
}
```

- [ ] **Step 2: Extend the reduced-motion guard**

In `src/characters/peep-bust.css`, replace the existing reduced-motion block:

```css
@media (prefers-reduced-motion: reduce) {
  .peep-bust__face,
  .peep-bust__closed-eyes,
  .peep-bust__accessory {
    transition: none;
  }
}
```

with:

```css
@media (prefers-reduced-motion: reduce) {
  .peep-bust__face,
  .peep-bust__closed-eyes,
  .peep-bust__accessory {
    transition: none;
  }

  .peep-bust[data-animation],
  .peep-bust[data-animation] .peep-bust__head {
    animation: none;
  }
}
```

- [ ] **Step 3: Verify build + visual sanity**

Run: `npm run storybook` and open the animation stories added in Task 6 (revisit after Task 6), or `npm run typecheck` now as a quick guard.
Run: `npm run typecheck`
Expected: PASS (CSS is not type-checked, but confirms nothing broke in TS).

- [ ] **Step 4: Commit**

```bash
git add src/characters/peep-bust.css
git commit -m "feat(characters): add PeepBust animation keyframes"
```

---

### Task 3: `animation` prop + attributes on PeepStanding

**Files:**
- Modify: `src/characters/peep-standing.tsx`
- Test: `src/characters/peep-standing.test.tsx`

- [ ] **Step 1: Write the failing tests**

Append inside the existing `describe("PeepStanding", () => { ... })` block in `src/characters/peep-standing.test.tsx`:

```tsx
  it("expone la animación mediante data-animation", () => {
    const { container } = render(<PeepStanding animation="wave" blink="off" />);

    expect(container.querySelector("svg")).toHaveAttribute(
      "data-animation",
      "wave",
    );
  });

  it("no expone data-animation cuando es none (por defecto)", () => {
    const { container } = render(<PeepStanding blink="off" />);

    expect(container.querySelector("svg")).not.toHaveAttribute("data-animation");
  });

  it("marca data-paused cuando paused está activo", () => {
    const { container } = render(
      <PeepStanding animation="loading" paused blink="off" />,
    );

    expect(container.querySelector("svg")).toHaveAttribute("data-paused", "true");
  });
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx vitest run src/characters/peep-standing.test.tsx`
Expected: FAIL — `data-animation="wave"` and `data-paused="true"` assertions fail.

- [ ] **Step 3: Import the type, add the prop and attributes**

In `src/characters/peep-standing.tsx`, add `PeepAnimation` to the existing type import from `./peep-bust`. Find the import that already brings `PeepBustVariant` (used by `export type PeepStandingVariant = PeepBustVariant;`). If it is a `type` import, extend it; otherwise add:

```tsx
import type { PeepAnimation } from "./peep-bust";
```

In `PeepStandingProps` (the interface with `blink`/`paused`), add:

```tsx
  /** Animación semántica ligada a un proceso. Respeta `prefers-reduced-motion`. */
  animation?: PeepAnimation;
```

In the `PeepStanding` function parameter list, add after `paused = false,`:

```tsx
  animation = "none",
```

On the root `<svg>` (the one with `data-peep-head` / `data-peep-pose`), add:

```tsx
      data-animation={animation === "none" ? undefined : animation}
      data-paused={paused ? "true" : undefined}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx vitest run src/characters/peep-standing.test.tsx`
Expected: PASS (all PeepStanding tests).

- [ ] **Step 5: Commit**

```bash
git add src/characters/peep-standing.tsx src/characters/peep-standing.test.tsx
git commit -m "feat(characters): add animation prop to PeepStanding"
```

---

### Task 4: PeepStanding animation keyframes (CSS)

**Files:**
- Modify: `src/characters/peep-standing.css`

- [ ] **Step 1: Append the preset rules**

Add to the end of `src/characters/peep-standing.css`:

```css
/* Animation presets */
.peep-standing[data-animation="float"] {
  transform-box: fill-box;
  transform-origin: 50% 50%;
  animation: peep-standing-float 3.4s ease-in-out infinite;
}

.peep-standing[data-animation="loading"] .peep-standing__head,
.peep-standing[data-animation="thinking"] .peep-standing__head,
.peep-standing[data-animation="wave"] .peep-standing__head {
  transform-box: fill-box;
  transform-origin: 50% 100%;
}

.peep-standing[data-animation="loading"] .peep-standing__head {
  animation: peep-standing-loading 1.4s ease-in-out infinite;
}

.peep-standing[data-animation="thinking"] .peep-standing__head {
  animation: peep-standing-thinking 3.2s ease-in-out infinite;
}

.peep-standing[data-animation="wave"] .peep-standing__head {
  animation: peep-standing-wave 0.9s ease-in-out infinite;
}

.peep-standing[data-animation="success"] {
  transform-box: fill-box;
  transform-origin: 50% 100%;
  animation: peep-standing-success 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 1;
}

.peep-standing[data-paused="true"],
.peep-standing[data-paused="true"] .peep-standing__head {
  animation-play-state: paused;
}

@keyframes peep-standing-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-1.5%);
  }
}

@keyframes peep-standing-loading {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-1%) rotate(-3deg);
  }
  75% {
    transform: translateY(-1%) rotate(3deg);
  }
}

@keyframes peep-standing-thinking {
  0%,
  100% {
    transform: rotate(-2deg);
  }
  50% {
    transform: rotate(4deg);
  }
}

@keyframes peep-standing-wave {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-8deg);
  }
  75% {
    transform: rotate(8deg);
  }
}

@keyframes peep-standing-success {
  0% {
    transform: scale(0.9);
  }
  60% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
```

- [ ] **Step 2: Extend the reduced-motion guard**

In `src/characters/peep-standing.css`, inside the existing `@media (prefers-reduced-motion: reduce)` block, after the `transition: none;` rule, add:

```css
  .peep-standing[data-animation],
  .peep-standing[data-animation] .peep-standing__head {
    animation: none;
  }
```

- [ ] **Step 3: Verify nothing broke**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/characters/peep-standing.css
git commit -m "feat(characters): add PeepStanding animation keyframes"
```

---

### Task 5: Export `PeepAnimation` from the package entry

**Files:**
- Modify: `src/index.ts`

- [ ] **Step 1: Add the type to the PeepBust export block**

In `src/index.ts`, add `type PeepAnimation,` to the existing `export { PeepBust, ... }` block (alphabetical-ish placement next to `type PeepAccessory,`):

```tsx
export {
  PeepBust,
  type PeepAccessory,
  type PeepAnimation,
  type PeepBlink,
  type PeepBustProps,
  type PeepBustVariant,
  type PeepExpression,
} from "./characters/peep-bust";
```

- [ ] **Step 2: Verify types build**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/index.ts
git commit -m "feat: export PeepAnimation type"
```

---

### Task 6: Storybook stories for animation presets

**Files:**
- Create: `src/characters/peep-animation.stories.tsx`

- [ ] **Step 1: Create the stories file**

Create `src/characters/peep-animation.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { type CSSProperties, useEffect, useState } from "react";

import { PeepBust, type PeepAnimation } from "./peep-bust";

const meta = {
  title: "Characters/PeepBust/Animation",
  component: PeepBust,
  parameters: { layout: "centered" },
} satisfies Meta<typeof PeepBust>;

export default meta;

type Story = StoryObj<typeof meta>;

const frame: React.CSSProperties = { width: 220 };

export const Float: Story = {
  args: { animation: "float", variant: "classic", style: frame },
};

export const Loading: Story = {
  args: { animation: "loading", variant: "coffee", expression: "calm", style: frame },
};

export const Thinking: Story = {
  args: { animation: "thinking", variant: "mentor", expression: "explaining", style: frame },
};

export const Wave: Story = {
  args: { animation: "wave", variant: "creative", expression: "smile", style: frame },
};

export const Success: Story = {
  args: { animation: "success", variant: "classic", expression: "smile-big", style: frame },
};

const ProcessDemo = () => {
  const [state, setState] = useState<PeepAnimation>("loading");

  useEffect(() => {
    const id = setInterval(() => {
      setState((prev) => (prev === "loading" ? "success" : "loading"));
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <PeepBust
      style={frame}
      animation={state}
      variant="coffee"
      expression={state === "loading" ? "calm" : "smile-big"}
      title={state === "loading" ? "Procesando" : "Listo"}
    />
  );
};

export const Process: Story = {
  render: () => <ProcessDemo />,
};
```

- [ ] **Step 2: Verify Storybook builds the stories**

Run: `npm run build-storybook`
Expected: PASS — build completes with no story compilation errors.

- [ ] **Step 3: Commit**

```bash
git add src/characters/peep-animation.stories.tsx
git commit -m "docs(storybook): add animation preset stories"
```

---

### Task 7: Usage guide, recommendations, README reconcile

**Files:**
- Create: `docs/GUIDE.md`
- Create: `docs/RECOMMENDATIONS.md`
- Modify: `README.md`

- [ ] **Step 1: Write `docs/GUIDE.md`**

Create `docs/GUIDE.md`:

````markdown
# Usage Guide

`@piensa-it/illustrations` gives you accessible SVG characters and a small set
of semantic animations you can drive from your own app state.

## Install

Releases ship through GitHub Packages. Add to `.npmrc`:

```ini
@piensa-it:registry=https://npm.pkg.github.com
```

Authenticate with a GitHub token that can read packages, then:

```bash
npm install @piensa-it/illustrations
```

Import the styles once at your app entry point (required for animations):

```tsx
import "@piensa-it/illustrations/styles.css";
```

## Pick a figure per moment

- **Onboarding / welcome** — `PeepBust` or `PeepStanding` with `animation="wave"`.
- **In-progress process** — `animation="loading"` (or `"thinking"` for
  analysis) while the task runs.
- **Success / confirmation** — `animation="success"` (plays once).
- **Empty state / hero** — `animation="float"` for gentle ambient motion.
- **Body language matters** — prefer `PeepStanding` (poses); otherwise `PeepBust`.

## Animate from code

Set `animation` from your process state:

```tsx
import { PeepBust } from "@piensa-it/illustrations";
import "@piensa-it/illustrations/styles.css";

function SaveIndicator({ isSaving }: { isSaving: boolean }) {
  return (
    <PeepBust
      style={{ width: 200 }}
      animation={isSaving ? "loading" : "success"}
      expression={isSaving ? "calm" : "smile-big"}
      title={isSaving ? "Guardando" : "Listo"}
    />
  );
}
```

### Presets

| Preset     | Motion                          | Loops | Use for                  |
| ---------- | ------------------------------- | ----- | ------------------------ |
| `none`     | none (default)                  | —     | static                   |
| `float`    | gentle vertical bob             | yes   | hero, empty state        |
| `loading`  | head sway + bob                 | yes   | in-progress              |
| `thinking` | head tilt + slow sway           | yes   | analyzing                |
| `wave`     | greeting head tilt              | yes   | onboarding / welcome     |
| `success`  | pop/bounce                      | no    | success / confirmation   |

> `wave` is a head-tilt greeting, not an arm wave — the current characters have
> no separable arm layer.

### Replaying `success`

`success` runs once. To replay it (e.g. two saves in a row), change the React
`key` so the element remounts:

```tsx
<PeepBust key={saveId} animation="success" />
```

### Pausing and reduced motion

- `paused` freezes any animation and ambient blinking without changing the art.
- All animations are automatically disabled when the OS requests
  `prefers-reduced-motion: reduce`.

## Accessibility

Provide `title` for a labelled image; omit it for decorative artwork (the SVG is
then hidden from assistive technology).
````

- [ ] **Step 2: Write `docs/RECOMMENDATIONS.md`**

Create `docs/RECOMMENDATIONS.md`:

```markdown
# Library Recommendations & Roadmap

Guidance for keeping `@piensa-it/illustrations` healthy as a reusable,
installable library.

## Already in place

- Dual ESM + CJS build with TypeScript declarations (`vite` + `vite-plugin-dts`).
- Curated public API via `src/index.ts` and package `exports`.
- Publish to GitHub Packages (`publishConfig`, `prepublishOnly`).
- Package hygiene: `files: ["dist"]` + `verify:package` guards against leaking
  source artwork.
- Quality gates: ESLint, Vitest, Playwright visual tests, Husky, commitlint.
- Storybook playground.

## Recommendations

1. **Keep the API surface small and semantic.** Add characters and presets, not
   low-level knobs. Every new export is a maintenance and versioning cost.
2. **Version deliberately.** Pre-1.0 the API may change; document breaking
   changes and bump minor accordingly. Cut `1.0.0` once the character + preset
   set is stable.
3. **Grow `scenes/` and `elements/`.** They are placeholders today. Compose
   product-moment scenes (onboarding, error, empty) from existing atoms rather
   than shipping one-off images.
4. **Cover reduced-motion in tests/stories.** Add a Storybook note or a11y check
   confirming animations are disabled under `prefers-reduced-motion`.
5. **Optional visual regression for motion.** Motion frames are timing-sensitive;
   if added to Playwright, snapshot a paused frame (`paused`) rather than a live
   loop.
6. **Future: `usePeepAnimation` hook.** For apps needing `onDone`/sequencing,
   add a control hook layer without removing the declarative prop.
7. **Future: arm layer for a true `wave`.** Upgrades the preset without an API
   change.

## Motion ownership

Base character animations now ship in this package (declarative `animation`
prop). If `@piensa-it/ui-library` is used, it orchestrates higher-level motion
policy (containers, timing across a flow); it is no longer required just to move
a character.
```

- [ ] **Step 3: Reconcile the README motion section**

In `README.md`, replace the "Motion and UI integration" section (the paragraph
that says motion "belongs to Piensa IT UI Library" and its code block) with:

````markdown
## Motion and UI integration

Base character animations ship in this package. Drive them from your app state
with the declarative `animation` prop:

```tsx
import { PeepBust } from "@piensa-it/illustrations";
import "@piensa-it/illustrations/styles.css";

<PeepBust animation="loading" title="Procesando" />;
```

Available presets: `float`, `loading`, `thinking`, `wave`, `success`. See the
[Usage Guide](./docs/GUIDE.md) for the full catalog and the loading→success
pattern. All animations respect `prefers-reduced-motion` and can be frozen with
`paused`.

Higher-level motion policy across a flow (shared containers, orchestrated
timing) can still be layered on with
[`@piensa-it/ui-library`](https://github.com/piensa-it/app-ui), but it is no
longer required to animate a character.
````

Also update the "Highlights" bullet that currently reads
`Motion kept separate through ...` to:

```markdown
- Declarative character animation presets (`loading`, `success`, `wave`, …)
```

- [ ] **Step 4: Commit**

```bash
git add docs/GUIDE.md docs/RECOMMENDATIONS.md README.md
git commit -m "docs: add usage guide, recommendations, reconcile README motion"
```

---

### Task 8: Full verification

**Files:** none (verification only)

- [ ] **Step 1: Typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: PASS (no errors).

- [ ] **Step 3: Unit tests**

Run: `npm run test:run`
Expected: PASS — all PeepBust and PeepStanding tests green, including the new
`data-animation` / `data-paused` assertions.

- [ ] **Step 4: Package + build guard**

Run: `npm run verify:package`
Expected: PASS — build succeeds and the package verification script reports no
leaked source and a valid `dist`.

- [ ] **Step 5: Storybook build**

Run: `npm run build-storybook`
Expected: PASS.

- [ ] **Step 6: Final commit (if anything regenerated) / done**

If the steps above produced no file changes, there is nothing to commit. Otherwise:

```bash
git add -A
git commit -m "chore: verification artifacts for animation feature"
```
```
