# Public release checklist

## Required before changing repository visibility

- [x] Approve and add the root MIT source-code license
- [ ] Review the complete Git history for secrets and private material
- [ ] Enable GitHub private vulnerability reporting
- [ ] Confirm repository description, topics, and social preview image
- [ ] Protect `main` and require the CI workflow
- [ ] Create and connect the public Storybook site
- [ ] Choose the public package registry and verify a clean install
- [ ] Confirm that all redistributed artwork has provenance under `LICENSES/`

## First release

- [ ] Merge the public-readiness changes through a reviewed pull request
- [ ] Confirm `npm run verify:package` and `npm run build-storybook`
- [ ] Publish `0.1.0` and test it in an empty React application
- [ ] Create a GitHub Release with screenshots and migration notes
- [ ] Link this project from Piensa IT UI Library and the organization profile
