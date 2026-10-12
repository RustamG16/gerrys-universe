import { pair } from '../lib/store.jsx';
import { MARINA_URL } from './businesses.js';

export const ASOF = pair('Researched 11 Oct 2026', 'Recherchiert am 11. Okt 2026');

// Rustam's actual build time for the Marina Fior website (stated by Rustam).
export const MY_HOURS = 4;

// Benchmark: ChatGPT estimate Rustam requested in incognito mode, 11 Oct 2026.
export const agency = {
  hours: [100, 140],
  net: [12000, 18000],
  gross: [14400, 21600],
  weeks: [4, 7],
  workWeeks: [3, 4],
  source: pair('ChatGPT estimate (incognito), 11 Oct 2026', 'ChatGPT-Schätzung (Inkognito), 11. Okt 2026'),
  breakdown: [
    { area: pair('Briefing, structure & visual design', 'Briefing, Struktur & Design'), h: [20, 30] },
    { area: pair('Landing page & responsive build', 'Landingpage & responsive Umsetzung'), h: [35, 45] },
    { area: pair('Blog, articles & content setup', 'Blog, Artikel & Inhalte'), h: [12, 20] },
    { area: pair('Self-check, animations & booking', 'Selbsttest, Animationen & Buchung'), h: [15, 25] },
    { area: pair('Accessibility, QA, launch & coordination', 'Barrierefreiheit, QA, Launch & Koordination'), h: [18, 20] },
  ],
};

// Independent Austrian market references used to cross-check the benchmark (all net of VAT).
export const marketRanges = [
  {
    label: pair('ChatGPT estimate for this site', 'ChatGPT-Schätzung für diese Website'),
    range: [12000, 18000],
    note: pair('100–140 h of agency work', '100–140 h Agenturarbeit'),
    url: null,
    highlight: true,
  },
  {
    label: pair('100–140 h × €80–150/h (WKO-cited average)', '100–140 h × 80–150 €/h (WKO-Durchschnitt lt. Quelle)'),
    range: [8000, 21000],
    note: pair('Average Austrian web-services rate, as cited by DonauBit', 'Durchschnittlicher Stundensatz für Webleistungen, zitiert von DonauBit'),
    url: 'https://donaubit.com/ratgeber/webdesign-kosten-oesterreich',
  },
  {
    label: pair('Classic agency project, Austria', 'Klassische Agentur, Österreich'),
    range: [5000, 25000],
    note: pair('DonauBit 2026 guide; Vienna agencies €120–180/h', 'DonauBit-Ratgeber 2026; Wiener Agenturen 120–180 €/h'),
    url: 'https://donaubit.com/ratgeber/webdesign-kosten-oesterreich',
  },
  {
    label: pair('Corporate website, Austria', 'Unternehmenswebsite (Corporate), Österreich'),
    range: [8000, 20000],
    note: pair('Web Austria price overview, March 2026', 'Web-Austria-Preisübersicht, März 2026'),
    url: 'https://www.web-austria.at/blog/website-kosten-oesterreich-2026/',
  },
];

export const PROMPT = `${MARINA_URL}\nestimate the price for this website according to the austrian market prices if it was done in an agency and estimate time for the making`;
export const chatgptUrl = 'https://chatgpt.com/?q=' + encodeURIComponent(PROMPT);
