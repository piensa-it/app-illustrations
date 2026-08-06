# Contributing

Thanks for helping improve Piensa IT Illustrations.

## Before you start

- Open an issue before proposing a large API or visual-system change.
- Keep product-specific copy, routing, data fetching, and business logic out of
  this package.
- Confirm that every new asset can legally be redistributed and record its
  provenance under `LICENSES/`.
- Do not modify files under `assets/source/`; derive reusable components or
  exports from them instead.

## Local development

```bash
npm install
npm run storybook
```

Every exported component must include:

- a TypeScript public API exported from `src/index.ts`;
- an interactive Storybook story with accessibility enabled;
- at least one smoke test;
- accessible behavior for both meaningful and decorative illustrations.

## Validation

Run the complete local check before opening a pull request:

```bash
npm run typecheck
npm run lint
npm run test:run
npm run verify:package
npm run build-storybook
```

Use a focused commit message that explains the user-visible outcome. Pull
requests should include screenshots or a short recording for visual changes.

## Language

Code and public API names use English. User-facing Storybook examples and code
comments may use Spanish, reflecting the project's current audience.

