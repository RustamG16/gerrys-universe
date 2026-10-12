import { pair } from '../lib/store.jsx';

// "Loadout": services Gerry can pick for the discussion brief. No prices — scope is agreed together.
export const services = [
  {
    title: pair('Websites & demand', 'Websites & Nachfrage'),
    items: [
      pair('Websites for each business', 'Websites für jedes Geschäft'),
      pair('Multilingual copy & conversion', 'Mehrsprachige Texte & Conversion'),
      pair('Local SEO, Google profiles & schema', 'Lokale SEO, Google-Profile & Schema'),
      pair('Search & social ads (budget separate)', 'Such- & Social-Ads (Budget separat)'),
    ],
  },
  {
    title: pair('Content & social', 'Content & Social Media'),
    items: [
      pair('Social accounts & content calendars', 'Social-Accounts & Redaktionspläne'),
      pair('Higgsfield images, reels & films', 'Higgsfield-Bilder, Reels & Filme'),
      pair('Disclosed AI destination guides', 'Gekennzeichnete KI-Destinationsguides'),
      pair('Newsletters & guest emails', 'Newsletter & Gäste-E-Mails'),
    ],
  },
  {
    title: pair('Notion & operations', 'Notion & Betrieb'),
    items: [
      pair('Gerry’s Universe workspace', 'Gerry’s-Universe-Workspace'),
      pair('Knowledge bases & SOPs', 'Wissensdatenbanken & SOPs'),
      pair('Pipelines & HQ dashboard', 'Pipelines & HQ-Dashboard'),
      pair('Owner training & handover', 'Schulung & Übergabe'),
    ],
  },
  {
    title: pair('AI & insights', 'KI & Einblicke'),
    items: [
      pair('AI automations with human review', 'KI-Automationen mit menschlicher Prüfung'),
      pair('Analytics & baselines', 'Analyse & Ausgangswerte'),
      pair('Weekly owner report', 'Wöchentlicher Inhaberbericht'),
    ],
  },
  {
    title: pair('New ventures', 'Neue Vorhaben'),
    items: [
      pair('Villach retreat validation', 'Validierung Villach-Retreat'),
      pair('B2B team offsites', 'B2B-Team-Auszeiten'),
    ],
  },
];
