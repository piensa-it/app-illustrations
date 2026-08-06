# Piensa IT Illustrations

Composable, accessible characters for React products — built by
[Piensa IT](https://github.com/piensa-it) from the Open Peeps illustration system.

Use the same visual language across onboarding, empty states, product tours,
help centers, banners, and documentation. Characters are rendered as real SVG
layers, so consumers can change their pose, expression, accessories, and
appearance without shipping a separate image for every combination.

> This project is preparing its first public release. The API is usable today,
> but may change before `1.0.0`.

## Highlights

- Composable bust and full-body characters
- Interchangeable expressions, accessories, heads, bodies, and poses
- Optional automatic blinking with pause controls
- Accessible decorative and labelled modes
- Native SVG output that stays sharp at every size
- ESM, CommonJS, and TypeScript declarations
- Interactive Storybook playground
- Motion kept separate through
  [`@piensa-it/ui-library`](https://github.com/piensa-it/app-ui)

## Quick start

The package will be published with the first public release. While the project
is in preview, clone the repository and run Storybook:

```bash
git clone https://github.com/piensa-it/app-illustrations.git
cd app-illustrations
npm install
npm run storybook
```

Storybook opens at `http://localhost:6007`.

## Usage

```tsx
import { PeepBust } from "@piensa-it/illustrations";
import "@piensa-it/illustrations/styles.css";

export function WelcomeCharacter() {
  return (
    <PeepBust
      variant="coffee"
      expression="smile"
      accessory="round-glasses"
      blink="auto"
      title="A smiling person holding a cup of coffee"
    />
  );
}
```

Use `PeepStanding` when body language matters:

```tsx
import { PeepStanding } from "@piensa-it/illustrations";

<PeepStanding
  pose="pointing"
  variant="creative"
  expression="awe"
  title="A person pointing at the next step"
/>;
```

Omit `title` for decorative artwork. The component will then be hidden from
assistive technology.

## Motion and UI integration

This package owns artwork and character composition. Shared motion policies,
containers, timing, pause behavior, and `prefers-reduced-motion` support belong
to [Piensa IT UI Library](https://github.com/piensa-it/app-ui).

```tsx
import { Illustration } from "@piensa-it/ui-library";
import { PeepBust } from "@piensa-it/illustrations";

<Illustration motion="float" size="lg">
  <PeepBust variant="coffee" title="A person enjoying coffee" />
</Illustration>;
```

## Project structure

```text
src/
├── characters/  # React character components and their stories
├── elements/    # reusable objects and visual pieces
└── scenes/      # semantic compositions for product moments

assets/
├── source/      # unmodified source artwork and provenance
└── exports/     # assets prepared for non-React use
```

Source artwork is retained for traceability but excluded from the published npm
package. Package verification prevents it from leaking into a release.

## Development

```bash
npm install
npm run storybook
npm run typecheck
npm run lint
npm run test:run
npm run verify:package
npm run build-storybook
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) before proposing a new character,
asset, or public API.

## Credits and licensing

The character artwork is based on
[Open Peeps](https://www.openpeeps.com/) by Pablo Stanley and is available
under CC0 1.0. Full provenance is recorded in
[LICENSES/open-peeps.md](./LICENSES/open-peeps.md).

Original Piensa IT code is available under the [MIT License](./LICENSE).
Third-party artwork and software retain their own licenses; see
[THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).

## About Piensa IT

[Piensa IT](https://github.com/piensa-it) builds thoughtful digital products
and reusable foundations for teams that care about quality, accessibility, and
maintainable design systems.
