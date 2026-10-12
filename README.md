# Gerry's Business Universe

Interactive English/German Convenium Studio proposal. React + Vite; optional dynamically imported Three.js sculpture and self-hosted media/fonts. The psychology preview at port 4173 remains external and untouched.

Run `npm install`, then `npm run dev` (port 4180). If that port is occupied, use `npm exec vite -- --host 127.0.0.1 --port 4181 --strictPort`. Production: `npm run build`.

The site is a proposal and local demonstration. Locale and scope are saved only in browser localStorage. Export creates a local UTF-8 text discussion brief; printing uses a dedicated stylesheet. Editable retreat economics are assumptions before taxes and unmodeled costs. No live CRM or analytics connection exists.

Assets expected in `public/media`: `alpine.webp`, `coast.webp`, `retreat.webp`, `marina.avif`, `active-real.jpg`, `villa-real.jpg`, and `alpine-film.mp4`. The proposed coastal film is not included; the available `coast.webp` campaign concept image is used instead. Generated concepts are visibly labeled. Optional `project-links.json` accepts a `notionUrl` strategy link.

3D uses Three.js library primitives and OrbitControls, caps DPR at 1.5 and halts animation when offscreen, hidden, paused or initially under reduced-motion preferences. HTML links provide the same business navigation. WebGL failure displays a static sculpture fallback.
