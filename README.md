# Gerry's Universe

Interactive, game-style English/German Convenium Studio proposal for Gerry and Marina. Live: https://rustamg16.github.io/gerrys-universe/

Levels: 00 Universe (3D map) · 01 Worlds · 02 Insights · 03 Mission (SMART plan) · 04 Speedrun (agency vs me, ChatGPT QR prompt, tool stack) · 05 Notion HQ.

## Commands

- `npm install`, then `npm run dev` (port 4180) — or `npx vite --port 4182` if 4180 is taken.
- `npm run build` — static build in `dist/` (relative base, hash routing).
- `npm run deploy` — build and force-push `dist/` to the `gh-pages` branch (GitHub Pages source).
- Videos: `cd video && npm install && npm run render` — Remotion renders MP4s + posters into `public/media`.

## Notes

React 19 + Vite, React Three Fiber/drei, GSAP, d3-scale/d3-shape, qrcode. Locale, XP, loadout and secret unlock are stored only in browser localStorage. The discussion brief is a local `.txt` download. No live CRM, analytics, booking or payment connections. Prices are cited list prices with an as-of date; generated media is labelled (see MEDIA-PROVENANCE.md). Architecture: ARCHITECTURE.md.
