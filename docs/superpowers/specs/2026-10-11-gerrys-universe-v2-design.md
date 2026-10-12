# Gerry's Universe v2 — a game-style, multi-level proposal

## Context
**What exists now.** `D:\Projects\Gerry's universe` is a single-page EN/DE React 19 + Vite 7 proposal. Its parts:
- `src/main.jsx`: about 40 KB packed onto 28 lines.
- `src/Universe.jsx`: a Three.js orbit sculpture.
- `src/style.css`.
- It follows the Convenium DNA in `DESIGN.md` (cotton #EDEBDD, noir #1B1717, cherry #810100; Archivo, Newsreader and Inter fonts).

Marina's link points to `http://localhost:4173/`, which Gerry can't open.

**What Rustam wants:**
- Point Marina's link to the live site, https://rustamg16.github.io/marina-fior-website/.
- Rebuild the proposal as a **game-like, multi-level experience**: less text, more 3D, charts, diagrams and interaction.
- Add three new levels: **Insights** (visualisations), **Mission Plan** (SMART) and **Speedrun** (agency estimate against Rustam's speed, with a ChatGPT QR prompt and the tool-stack cost).
- Add **Notion HQ**, which shows the recommended workspace architecture.
- Use Higgsfield, Remotion and Three.js/R3F, with a slot for a Spline embed.
- **Hosting is local only for now.**

## Decisions (from Q&A)
- **Visual direction: hybrid by level.** The hub is a dark 3D "space" universe map. The levels are cream/noir Convenium editorial pages. Moving between levels uses a cinematic zoom.
- **3D:** React-Three-Fiber + drei, plus a Higgsfield-generated GLB, plus Remotion clips. There is a slot for an optional Spline embed.
- **Speed comparison:** Rustam built the Marina site in **2 days (≈ 16 working hours)**. The agency benchmark is the ChatGPT/Codex estimate you shared: **€12–18k net (€14.4–21.6k gross), 100–140 h, 4–7 calendar weeks**. It cites a "Werbemonitor 2025" rate of €100–180/h. I couldn't verify that source, so I'll cross-check it with ≥2 Austrian sources and cite everything. Headline: about **6–9× faster**.
- **QR code:** opens `https://chatgpt.com/?q=<encoded prompt>`, with a Copy button next to it. I'll fix the URL typo (the stray space before the trailing `/`). Prompt:
  `https://rustamg16.github.io/marina-fior-website/ estimate the price for this website according to the austrian market prices if it was done in an agency and estimate time for the making`
- **Tool stack (monthly power-ups):**
  - Claude Max, offered as **5x and 20x**, with the line: "higher limit = faster and better work".
  - ChatGPT Plus.
  - Google AI Pro (€21.99).
  - Higgsfield **from €350**, depending on volume. This covers a lot of material for websites, Instagram and other socials, and still needs discussion.
  - Notion Business (€19.50/member).
  - Domains and hosting.
  - Every price gets a source link, a "verify at checkout" note and an as-of date.
- **SMART plan start:** mid-October 2026, so **Mon 19 Oct 2026**.
- **Notion:** one workspace owned and billed by Gerry, called **"Gerry's Universe"**, on the **Business** plan. It has 4 teamspaces: **HQ** (unifies everything), **Marina Fior** (private), **Active Relaxing** and **Villa Olivija**.
  - Rustam joins with his existing Convenium account as Workspace Owner. He switches between workspaces in the sidebar switcher and never has to log out.
  - It's one workspace rather than 4 because relations and rollups can't cross workspaces, so HQ dashboards would break, and 4 workspaces means 4 separate bills.
  - Marina's clinical data stays outside Notion.

## Information architecture (levels)
Hash routing (`#/`, `#/worlds`, …) keeps it static-host friendly. A persistent **HUD** shows the level map, XP/progress bar, EN/DE switch and motion toggle. Achievements are stored in localStorage (wrapped in try/catch).

| Lvl | Route | Content (visual-first) |
|---|---|---|
| 0 Hub | `#/` | Dark R3F universe. Planets: Marina, Active Relaxing, Villa Olivija (🔒 "unlocks Jan 2027 · off-season"). A secret moon for the Villach group-retreat concept (❔ "unlocks if Gerry says yes"). A Notion HQ space station. Clicking a planet flies the camera there, then routes. An HTML button list mirrors the 3D for keyboard and fallback use. |
| 1 Worlds | `#/worlds` | The improved existing content: 3 business cards with media and live links. **Marina now uses the live GitHub Pages URL.** Text trimmed to icon rows. |
| 2 Insights | `#/insights` | Interactive charts and diagrams (see below). |
| 3 Mission | `#/mission` | SMART quest map with two parallel tracks. |
| 4 Speedrun | `#/speedrun` | Agency vs Rustam race, cost/time charts, QR prompt, tool-stack calculator. |
| 5 Notion HQ | `#/notion` | Workspace architecture diagram, access/login diagram, plan cost. |
| — Retreat | inside Mission | Locked card until it's unlocked. Keeps the existing calculator (moved and restyled). |

### Level 2 — Insights (illustrative; no invented KPIs)
- **Ecosystem diagram:** an animated SVG node graph showing the 3 businesses, shared content engine, Notion HQ, AI automations and the retreat.
- **Customer journey funnel:** Discover → Trust → Enquire → Book → Return. Each stage shows the deliverables that serve it.
- **Coverage radar:** per business, the current state against the plan across website, SEO, social, CRM, automation and dashboards. It's a qualitative 0–3 scale, labeled as an assessment.
- **Seasonality ribbon:** shows when each business needs attention (Alpine winter/summer, Adriatic summer, practice year-round). This is what justifies putting Villa in the off-season. Labeled conceptual.
- **Workload allocation donut:** effort by workstream for the plan.
- **Retreat break-even chart:** a live line chart driven by the existing calculator inputs.

### Level 3 — Mission Plan (SMART)
A Gantt-style quest timeline, 19 Oct 2026 → Apr 2027. Each quest card flips to show S, M, A, R and T. M uses output metrics only (live, indexed, N posts published, baseline recorded), never outcome promises.
- **Track A — Launch** (19 Oct – 18 Dec):
  - Marina site goes to production on her own domain, with Google Business Profile, Search Console, schema/local SEO and Instagram.
  - Active Relaxing gets its new website, social accounts, seasonal SEO pages and business strategy.
  - Analytics baselines.
- **Track B — Systems** (in parallel, same dates):
  - Gerry's Universe Notion workspace: HQ and teamspaces.
  - Per-business knowledge bases.
  - AI automations (enquiry capture, reminders, weekly report, human-reviewed AI drafts).
  - Dashboards.
- **Level 3 🔒 Villa Olivija:** Jan – Mar 2027 (off-season), live before the summer season.
- **Secret level ❔ Group retreat in Villach villas:** go/no-go gate after Tracks A and B are done. If yes: validation (interviews → waitlist → professional review → paid pilot).
- A "Today" marker on the timeline, plus dependency lines.

### Level 4 — Speedrun
- **Race animation** (GSAP and a Remotion clip): an agency bar running 100–140 h / 4–7 wks against a Rustam bar at 2 days (≈ 16 h).
- **Cost bars:** agency €12–18k net against Rustam's cost. Rustam's own price is still a placeholder to agree, so the page won't invent one.
- **Breakdown table**, per the shared estimate: briefing/design 20–30 h, build 35–45 h, blog 12–20 h, self-check/animations/booking 15–25 h, QA/launch 18–20 h.
- **QR card:** generated locally with the `qrcode` npm package. It opens ChatGPT with the prompt prefilled, and has a Copy button.
- **Power-ups calculator:** toggle Claude Max 5x/20x, change the number of Notion seats, adjust a Higgsfield volume slider (from €350). It shows the monthly total.

### Level 5 — Notion HQ
- **Interactive tree:** Workspace "Gerry's Universe" → teamspaces → databases (Projects, Tasks, Content, CRM per business, KB, Dashboards). Clicking a node shows what's inside.
- **Login diagram:** one Rustam account → the Convenium OS workspace and the Gerry's Universe workspace, connected by the switcher. "No account switching".
- **Why not 4 workspaces** comparison card.
- **Setup steps:**
  1. Gerry signs up with his business email.
  2. Upgrade to Business.
  3. Invite Rustam as Workspace Owner.
  4. Create the teamspaces.
  5. Rustam builds everything.
- **Note:** the Claude Notion connector authorizes per workspace. If Claude needs to work in both workspaces, that needs a second connection. I'll verify this before stating it on the page.

## Tech & file structure
Refactor the packed `main.jsx` into readable modules. Keep the data-driven `pair(en,de)` i18n pattern and the existing tab keyboard logic.
```
src/main.jsx            (bootstrap only)
src/App.jsx             (HashRouter, HUD, level transitions)
src/i18n/{en,de}.js | i18n.js   (useT hook, persistent locale)
src/data/{businesses,plan,estimate,tools,notion}.js   (all copy/numbers + source URLs)
src/levels/{Hub,Worlds,Insights,Mission,Speedrun,NotionHQ}.jsx
src/components/hud/{Hud,LevelMap,XpBar,Achievement}.jsx
src/components/charts/{Funnel,Radar,Donut,Gantt,BreakEven,RaceBars}.jsx (SVG + d3-scale/d3-shape)
src/components/diagrams/{Ecosystem,WorkspaceTree,LoginFlow}.jsx
src/three/{UniverseScene,Planet,Station}.jsx (R3F, lazy, static fallback)
src/components/{QrPrompt,ToolCalculator,RetreatCalculator,VideoCard,SplineSlot}.jsx
video/ (separate Remotion project → renders MP4s into public/media)
```
**New dependencies:**
- `react-router-dom@7`
- `@react-three/fiber@9`, `@react-three/drei@10` (React 19 compatible)
- `gsap@3.13`, using ScrollTrigger and Flip
- `d3-scale`, `d3-shape`
- `qrcode`
- Remotion 4, only in `video/`

**Motion rules** (from DESIGN.md, relaxed for the hub, which the user explicitly requested): 180 ms on controls. Level transitions are 600–900 ms camera flights. Everything respects reduced motion and the motion toggle, and nothing animates offscreen or in a hidden tab.

## Media (asset manifest, approval before spending credits)
- **Higgsfield:**
  - 1 GLB stylised "universe station/villa" for the hub.
  - 2 stills: a Villach lake-villa retreat concept and a Notion HQ "command deck".
  - Optionally 1 short Villach clip.
  - All labeled "AI-generated concept" and logged in `MEDIA-PROVENANCE.md`.
- **Remotion:**
  1. "Speedrun" race, ~10 s.
  2. "Mission timeline" animated Gantt, ~12 s.
  3. "Universe intro" logo/title sting, ~6 s.
  Rendered locally to MP4 with posters, preload none and native controls.
- **Spline:** an optional `SplineSlot` that renders only if a public scene URL is set in `project-links.json`.

## Execution steps
1. Write the spec to `docs/superpowers/specs/2026-10-11-gerrys-universe-v2-design.md`. The repo isn't a git repo, so there's no commit unless you ask.
2. Update the context docs: extend `ARCHITECTURE.md`, then re-derive `ARCHITECTURE-ESSENTIALS.md`. Update `PRD.md`, `DESIGN.md` (hybrid dark hub tokens), `.olympus/06-build-plan.md` and `PROGRESS-AND-DECISIONS.md`.
3. Hand off to the `writing-plans` skill, per the brainstorming workflow.
4. Implementation order:
   1. Refactor into modules, add the router, HUD and i18n. Change Marina's URL in `src/main.jsx` data and `public/media/project-links.json` (`psychologyUrl`).
   2. Build the levels: Worlds, Insights, Mission, Speedrun, Notion HQ.
   3. Build the R3F hub.
   4. Research and cite prices: Austrian agency rates, Claude, ChatGPT, Google AI, Higgsfield, Notion.
   5. Make the media: Remotion clips; Higgsfield only after you approve the manifest.
   6. QA.
5. Skills to use during the build: `dataviz` (charts), `gsap-*`, `three-guide`/`webgl-experience`, `remotion-*`, `asset-director` (Higgsfield), `visual-qa`, `independent-critic` for the required finish review.

## Verification
- `npm run build` passes, and the Three.js chunk stays lazy.
- Browser pane at 1440 px and 375 px: no horizontal overflow on any level, in both EN and DE.
- Keyboard: tab through the HUD and level map. The hub's HTML mirror reaches every level without WebGL.
- Motion toggle and reduced-motion stop the R3F loop and GSAP.
- QR code: decode the generated PNG and check that it opens `chatgpt.com/?q=` with the exact prompt. Check the Copy button.
- Calculators: the tool-stack total arithmetic and the retreat break-even, including negative contribution.
- Marina links resolve to the live GitHub Pages URL (HTTP 200).
- Every price shows a source and as-of date. Generated media is labeled. No invented KPIs or outcomes.
- Independent finish review (read-only critic) recorded in `.olympus/10-finish-review.md`.
