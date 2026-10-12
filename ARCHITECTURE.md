# Architecture

## v2 (12 Oct 2026) — multi-level game proposal

**Stack.** React 19 + Vite 7, hash routing (`react-router-dom` `HashRouter`) so the static build runs from any sub-path (GitHub Pages: `https://rustamg16.github.io/gerrys-universe/`). `vite.config.js` sets `base: './'`. Why: no server, no rewrite rules, one artefact.

**State.** `src/lib/store.jsx` — one `AppProvider` context: locale (EN/DE, persisted), motion pause (initialised from `prefers-reduced-motion`), visited levels/XP, secret-level unlock, shared retreat-calculator inputs, toast, `project-links.json`. All `localStorage` access goes through `readStore`/`writeStore` (try/catch). Helpers `pair(en,de)`, `media(file)` (respects `BASE_URL`), `tabKeyDown` (roving tabindex for every tablist).

**Data.** All copy and numbers live in `src/data/*` as `pair()` records — `levels`, `businesses` (Marina live URL), `plan` (SMART quests, tracks, retreat formats), `estimate` (agency benchmark, market ranges with sources, ChatGPT prompt/URL, `MY_DAYS=2` → 16 h), `tools` (monthly stack, USD→EUR 0.88 assumption, sources), `notion` (teamspaces, comparison, setup), `insights` (maturity, seasonality, journey, ecosystem), `services`, `universe` (3D bodies). Components never hard-code numbers.

**Levels** (`src/levels/`): `Hub` (00, dark space, lazy R3F scene + HTML mirror), `Worlds` (01), `Insights` (02, lazy), `Mission` (03, lazy), `Speedrun` (04, lazy), `NotionHQ` (05, lazy), `Partnership` (06, lazy; data in `src/data/partnership.js`, styles in `src/styles/partnership.css`). `App.jsx` owns routing, HUD, GSAP level curtain (skipped on first load and when motion is off), XP toasts and the next-level footer.

**3D.** `src/three/UniverseScene.jsx` — React Three Fiber + drei (Stars, Html labels, OrbitControls, useGLTF). Lazy chunk; `frameloop="demand"` when paused or off-screen; DPR ≤ 1.5; camera view offset places the system right of the headline on desktop. WebGL failure or error → static SVG orbit diagram; every destination is also an HTML link. Optional Higgsfield GLB station via `project-links.json → stationGlb`.

**Charts.** Hand-built SVG with `d3-scale`/`d3-shape` (`src/components/charts/*`), shared `ChartFrame` (legend, table view, tooltip). Brand palette validated with the dataviz checker (light on #EDEBDD, dark on #1B1717, all pairs).

**Motion.** GSAP 3.13 + ScrollTrigger (`Reveal`, `Race`), CSS keyframes for small UI. Everything stops under the motion toggle / reduced motion.

**QR.** `qrcode` renders an SVG locally for `https://chatgpt.com/?q=<prompt>`; nothing is sent anywhere.

**Video.** `video/` is a separate Remotion 4 project (`npm run render` there) that writes `universe-intro`, `speedrun`, `mission-timeline` MP4s + posters into `public/media`.

**Deploy.** `npm run deploy` = build + `scripts/deploy-pages.mjs` force-pushes `dist/` to `gh-pages` (Pages source). No Actions workflow because the local GitHub token lacks the `workflow` scope.

**Boundaries.** No live CRM, analytics, booking or payment connections; no personal or clinical data; prices are cited list prices with an as-of date.

## v1 (11 Oct 2026, archived in `.olympus/legacy-v1/`)

React UI owned locale, business selection, service selector, dashboard demo tabs, roadmap and retreat calculator in one page; a Three.js orbit sculpture with OrbitControls.
