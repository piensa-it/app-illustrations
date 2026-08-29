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
