### Summary

- What section(s) were added/converted?
- Any notable design or behavior notes?

### Section Integration Checklist (Sanity + Astro)

#### Schema (Studio)

- [ ] New schema added at `studio/schema-types/sections/<name>.ts`
- [ ] Required fields validated; sensible `initialValue`s
- [ ] `preview.prepare` shows helpful `title`/`subtitle`
- [ ] Alignment option included only if original design is center-aligned; default to left
- [ ] Two CTAs present: `primary*` and `secondary*` (label, href, target)

#### Data (Frontend)

- [ ] GROQ: `YOUR_SECTION_FIELDS` added in `frontend/src/data/sanity/groq.ts`
- [ ] GROQ: `YOUR_SECTION_FIELDS` included in `ALL_SECTION_FIELDS`
- [ ] Type: `YourSection` added in `frontend/src/data/sanity/index.ts`
- [ ] Type: `YourSection` included in `Section` union
- [ ] If images are used, selected `asset`, `alt`, and `"assetAltText": asset->altText`

#### Component (Astro)

- [ ] Component accepts `feature?: import("@/data/sanity").YourSection`
- [ ] Safe defaults for optional fields; no runtime crashes when fields are empty
- [ ] Two CTAs wired; `target="_blank"` also sets `rel="noopener noreferrer"`
- [ ] Alignment behavior implemented (center/left) only if relevant
- [ ] Light/Dark supported via Tailwind `dark:` utilities (no background pickers)
- [ ] Tailwind utilities used directly (no `@apply`)
- [ ] No usage of `any`; types are strict

#### Render Map

- [ ] Component imported and mapped in `frontend/src/pages/index.astro`
- [ ] Map key exactly matches schema `name` (i.e., `_type`)

#### Authoring & QA

- [ ] Section added to a page in Studio and published
- [ ] Page renders without console warnings (e.g., no `Unknown section type`)
- [ ] Optional fields empty → UI still renders with sensible defaults
- [ ] Links behave as expected; `_blank` links open in new tab/window
- [ ] Visual pass in both light and dark modes

#### Docs & Maintenance

- [ ] Updated `SECTION_IMPLEMENTATION_GUIDE.md` if patterns changed
- [ ] Lints and typechecks pass (no new errors)
- [ ] No hardcoded content that duplicates CMS fields

### Screenshots / Recordings (optional)

### Notes for Reviewers (optional)
