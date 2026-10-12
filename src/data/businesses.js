import { pair } from '../lib/store.jsx';

export const MARINA_URL = 'https://rustamg16.github.io/marina-fior-website/';

export const businesses = [
  {
    id: 'marina',
    name: 'Marina Fior',
    tag: pair('Psychology · Klagenfurt', 'Psychologie · Klagenfurt'),
    img: 'marina.avif',
    imgNote: pair('AI-visualised practice reference', 'KI-visualisierte Praxisreferenz'),
    title: pair('Space to feel understood.', 'Raum, um verstanden zu werden.'),
    status: { level: 3, label: pair('New website built · ready to launch', 'Neue Website gebaut · startklar') },
    unlock: pair('Launch now', 'Jetzt starten'),
    actions: [
      pair('Go live on her own domain', 'Livegang auf eigener Domain'),
      pair('Google profile + local SEO', 'Google-Profil + lokale SEO'),
      pair('Instagram + educational vlog', 'Instagram + Wissens-Vlog'),
      pair('Enquiry tracking in Notion', 'Anfragen-Tracking in Notion'),
    ],
    url: MARINA_URL,
    link: pair('Open the new website', 'Neue Website öffnen'),
  },
  {
    id: 'active',
    name: 'Active Relaxing',
    tag: pair('Alpine stays · Schladming & Carinthia', 'Alpine Aufenthalte · Schladming & Kärnten'),
    img: 'active-real.jpg',
    imgNote: pair('Official destination photo · current website', 'Offizielles Destinationsfoto · aktuelle Website'),
    title: pair('From a place to stay to a reason to go.', 'Vom Urlaubsort zum Reiseanlass.'),
    status: { level: 1, label: pair('Website rebuild · before winter season', 'Website-Neubau · vor der Wintersaison') },
    unlock: pair('Launch now', 'Jetzt starten'),
    actions: [
      pair('New booking-led website', 'Neue buchungsorientierte Website'),
      pair('Seasonal SEO pages', 'Saisonale SEO-Seiten'),
      pair('Social accounts + content rhythm', 'Social-Accounts + Content-Rhythmus'),
      pair('Business strategy on one page', 'Geschäftsstrategie auf einer Seite'),
    ],
    url: 'https://activerelaxing.com/',
    link: pair('Visit current website', 'Aktuelle Website besuchen'),
  },
  {
    id: 'villa',
    name: 'Villa Olivija',
    tag: pair('Adriatic stays · Stara Novalja', 'Adria-Aufenthalte · Stara Novalja'),
    img: 'villa-real.jpg',
    imgNote: pair('Official property photo · current website', 'Offizielles Objektfoto · aktuelle Website'),
    title: pair('A slower rhythm. A stronger destination.', 'Ein ruhigerer Rhythmus. Ein stärkeres Reiseziel.'),
    status: { level: 0, locked: true, label: pair('Locked until January 2027 · off-season build', 'Gesperrt bis Jänner 2027 · Aufbau in der Nebensaison') },
    unlock: pair('Unlocks Jan 2027', 'Ab Jänner 2027'),
    actions: [
      pair('Multilingual website rebuild', 'Mehrsprachiger Website-Neubau'),
      pair('Direct enquiry path', 'Direkter Anfrageweg'),
      pair('Summer campaign content', 'Content für die Sommerkampagne'),
      pair('Repeat-guest journeys', 'Stammgast-Kommunikation'),
    ],
    url: 'https://villa-novalja.com/',
    link: pair('Visit current website', 'Aktuelle Website besuchen'),
  },
];

export const socialVoices = [
  { who: 'Marina Fior', kind: pair('Brand', 'Marke'), phase: 'A' },
  { who: 'Active Relaxing', kind: pair('Brand', 'Marke'), phase: 'A' },
  { who: 'Active Relaxing AI guide', kind: pair('Disclosed AI creator', 'Gekennzeichnete KI-Figur'), phase: 'later' },
  { who: 'Villa Olivija', kind: pair('Brand', 'Marke'), phase: 'villa' },
  { who: 'Villa AI guide', kind: pair('Disclosed AI creator', 'Gekennzeichnete KI-Figur'), phase: 'villa' },
  { who: 'Villach retreat', kind: pair('Concept', 'Konzept'), phase: 'secret' },
];
