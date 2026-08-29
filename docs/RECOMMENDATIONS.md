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
