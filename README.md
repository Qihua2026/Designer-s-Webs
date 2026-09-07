# DESIGN ATLAS

A curated map of design sites and creative resources.

**Live site:** https://the-design-atlas.netlify.app

## Project

The editable website lives in [`prototype/`](prototype/). It is a static HTML/CSS/JavaScript project with no package dependencies.

```bash
cd prototype
node build-preview.js
```

Open `prototype/preview.html` for the standalone local preview.

## Branches

- `main`: production baseline
- `dev`: integration and testing
- Create `feature/*` or `fix/*` branches from the latest `dev` for new work.

## Release

```bash
DESIGN_ATLAS_URL=https://the-design-atlas.netlify.app node prototype/build-release.js
```

The deployable output is generated in `prototype/dist/`.

See [`DESIGN-ATLAS-HANDOFF.md`](DESIGN-ATLAS-HANDOFF.md) for design decisions, content rules, maintenance notes, and the full release checklist.
