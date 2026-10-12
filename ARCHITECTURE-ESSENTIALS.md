# Architecture essentials

Derived from ARCHITECTURE.md (v2).

- Vite + React 19, `HashRouter`, `base: './'` → static build on GitHub Pages.
- One context (`src/lib/store.jsx`): locale, motion, XP, secret unlock, retreat inputs. Safe localStorage.
- All copy/numbers in `src/data/*` as EN/DE `pair()` records, with sources.
- Six levels in `src/levels/`; five lazy-loaded. HUD + GSAP curtain in `App.jsx`.
- R3F universe is a lazy island with static fallback and HTML mirror; pauses when off-screen or motion off.
- SVG charts via d3-scale/d3-shape with legend, table view and tooltips.
- Remotion clips rendered from `video/` into `public/media`.
- Deploy: `npm run deploy` → `gh-pages`. No live integrations.
