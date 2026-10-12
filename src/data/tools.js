import { pair } from '../lib/store.jsx';

// USD→EUR ≈ 0.88 (ECB rate, 25 Sep 2026, as cited by satoriml.com). Before VAT; verify at checkout.
export const USD_EUR = 0.88;

// Monthly tool stack ("power-ups"). Prices are list prices found 11 Oct 2026 — verify at checkout.
export const tools = [
  {
    id: 'claude',
    name: 'Claude Max',
    role: pair('Builds websites, automations and plans with me', 'Baut mit mir Websites, Automationen und Pläne'),
    tiers: [
      { id: '5x', label: 'Max 5x', usd: 100 },
      { id: '20x', label: 'Max 20x', usd: 200 },
    ],
    note: pair('Higher limit = faster and better work.', 'Höheres Limit = schnellere und bessere Arbeit.'),
    url: 'https://claude.com/pricing',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT Plus',
    role: pair('Second opinion, research, image ideas', 'Zweitmeinung, Recherche, Bildideen'),
    eur: 23,
    note: pair('≈ €22.99 in the eurozone', '≈ 22,99 € in der Eurozone'),
    url: 'https://geotoolbox.ai/de/blog/chatgpt-kosten',
  },
  {
    id: 'gemini',
    name: 'Google AI Pro',
    role: pair('Gemini, research and video tools', 'Gemini, Recherche und Videotools'),
    eur: 21.99,
    url: 'https://gemini.google/ie/subscriptions/?hl=en-GB',
  },
  {
    id: 'higgsfield',
    name: 'Higgsfield',
    role: pair('Images, video and 3D for websites, Instagram and other socials', 'Bilder, Video und 3D für Websites, Instagram und weitere Kanäle'),
    min: 350,
    max: 1000,
    note: pair('From €350 — a lot of material for websites + socials. Final amount depends on how much and what kind of content; to discuss.', 'Ab 350 € – viel Material für Websites + Social Media. Endbetrag hängt von Menge und Art des Contents ab; zu besprechen.'),
    url: 'https://higgsfield.ai/pricing',
  },
  {
    id: 'notion',
    name: 'Notion Business',
    role: pair('Gerry’s Universe workspace, AI agents, private teamspaces', 'Gerry’s-Universe-Workspace, KI-Agenten, private Teamspaces'),
    perSeat: 19.5,
    note: pair('Per member/month, billed yearly; guests free', 'Pro Mitglied/Monat bei jährlicher Zahlung; Gäste kostenlos'),
    url: 'https://www.notion.com/pricing',
  },
  {
    id: 'domains',
    name: pair('Domains & hosting', 'Domains & Hosting'),
    role: pair('Three brand domains; static sites host for free', 'Drei Markendomains; statische Websites hosten kostenlos'),
    eur: 25,
    note: pair('≈ €80–120 per domain + hosting per year → ≈ €25/month for three', '≈ 80–120 € pro Domain + Hosting im Jahr → ≈ 25 €/Monat für drei'),
    url: 'https://www.designtiger.at/webdesign-preise-wien/',
  },
];
