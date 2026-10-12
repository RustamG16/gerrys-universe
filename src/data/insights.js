import { pair } from '../lib/store.jsx';

// Qualitative 0–3 maturity scale. "today" is Rustam's assessment from the public websites (to confirm together);
// "planned" is what the mission plan delivers. Not performance data.
export const axes = [
  pair('Website', 'Website'),
  pair('Local SEO', 'Lokale SEO'),
  pair('Social', 'Social Media'),
  pair('Bookings & CRM', 'Buchungen & CRM'),
  pair('Automation', 'Automation'),
  pair('Dashboards', 'Dashboards'),
];
export const maturity = {
  marina: { today: [3, 1, 1, 2, 0, 0], planned: [3, 3, 2, 3, 2, 3], when: pair('by Dec 2026', 'bis Dez 2026') },
  active: { today: [1, 1, 1, 1, 0, 0], planned: [3, 3, 2, 3, 2, 3], when: pair('by Dec 2026', 'bis Dez 2026') },
  villa: { today: [1, 1, 0, 1, 0, 0], planned: [3, 2, 2, 3, 2, 3], when: pair('by Mar 2027', 'bis Mär 2027') },
};
export const levelNames = [pair('none', 'keine'), pair('basic', 'Basis'), pair('good', 'gut'), pair('strong', 'stark')];

// Conceptual demand rhythm (0–3) from general destination seasonality — not booking data.
export const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
export const monthNames = [
  pair('January', 'Jänner'), pair('February', 'Februar'), pair('March', 'März'), pair('April', 'April'), pair('May', 'Mai'), pair('June', 'Juni'),
  pair('July', 'Juli'), pair('August', 'August'), pair('September', 'September'), pair('October', 'Oktober'), pair('November', 'November'), pair('December', 'Dezember'),
];
export const seasonality = [
  { id: 'marina', name: 'Marina Fior', why: pair('Practice: steady all year, quieter in August', 'Praxis: ganzjährig stabil, ruhiger im August'), demand: [3, 3, 3, 3, 3, 2, 2, 1, 3, 3, 3, 2], work: [9, 10, 11] },
  { id: 'active', name: 'Active Relaxing', why: pair('Alps: ski winter + hiking summer', 'Alpen: Skiwinter + Wandersommer'), demand: [3, 3, 2, 1, 1, 2, 3, 3, 2, 1, 1, 3], work: [9, 10, 11] },
  { id: 'villa', name: 'Villa Olivija', why: pair('Adriatic: summer peak, quiet winter', 'Adria: Sommerspitze, ruhiger Winter'), demand: [0, 0, 1, 1, 2, 3, 3, 3, 2, 1, 0, 0], work: [0, 1, 2] },
];

// Customer journey × business: which planned deliverables serve each stage.
export const stages = [pair('Discover', 'Entdecken'), pair('Trust', 'Vertrauen'), pair('Enquire', 'Anfragen'), pair('Book', 'Buchen'), pair('Return', 'Wiederkommen')];
export const journey = {
  marina: [
    [pair('Google profile', 'Google-Profil'), pair('Instagram', 'Instagram'), pair('Articles', 'Artikel')],
    [pair('New website', 'Neue Website'), pair('Real reviews', 'Echte Bewertungen'), pair('Vlog', 'Vlog')],
    [pair('Booking link', 'Buchungslink'), pair('Enquiry pipeline', 'Anfrage-Pipeline')],
    [pair('Online booking (Cituro)', 'Onlinebuchung (Cituro)'), pair('Reminders', 'Erinnerungen')],
    [pair('Newsletter', 'Newsletter')],
  ],
  active: [
    [pair('Seasonal SEO', 'Saisonale SEO'), pair('Reels', 'Reels'), pair('AI guide', 'KI-Guide')],
    [pair('New website', 'Neue Website'), pair('Apartment pages', 'Apartmentseiten')],
    [pair('Enquiry form', 'Anfrageformular'), pair('Booking pipeline', 'Buchungs-Pipeline')],
    [pair('Direct booking', 'Direktbuchung'), pair('Confirmations', 'Bestätigungen')],
    [pair('Guest emails', 'Gäste-E-Mails'), pair('Review requests', 'Bewertungsanfragen')],
  ],
  villa: [
    [pair('Summer campaign', 'Sommerkampagne'), pair('Seasonal SEO', 'Saisonale SEO')],
    [pair('Real property photos', 'Echte Objektfotos'), pair('Multilingual site', 'Mehrsprachige Website')],
    [pair('Direct enquiry', 'Direktanfrage')],
    [pair('Quote → deposit', 'Angebot → Anzahlung')],
    [pair('Repeat-guest offers', 'Stammgastangebote')],
  ],
};

// Ecosystem diagram nodes (x/y in a 1000×560 viewBox) and edges.
export const nodes = [
  { id: 'hq', x: 500, y: 280, r: 64, color: 'hq', label: pair('Notion HQ', 'Notion-HQ'), body: pair('One workspace. Dashboards, plans and AI agents see every business.', 'Ein Workspace. Dashboards, Pläne und KI-Agenten sehen jedes Geschäft.') },
  { id: 'marina', x: 180, y: 120, r: 46, color: 'marina', label: pair('Marina Fior', 'Marina Fior'), body: pair('Trust anchor. Expertise feeds content and the retreat idea.', 'Vertrauensanker. Expertise speist Content und die Retreat-Idee.') },
  { id: 'active', x: 180, y: 440, r: 46, color: 'active', label: pair('Active Relaxing', 'Active Relaxing'), body: pair('Alpine stays. Shares guest workflows with the Villa.', 'Alpine Aufenthalte. Teilt Gäste-Abläufe mit der Villa.') },
  { id: 'villa', x: 820, y: 440, r: 46, color: 'villa', label: pair('Villa Olivija', 'Villa Olivija'), body: pair('Adriatic stays. Reuses the Active Relaxing build in January.', 'Adria-Aufenthalte. Nutzt im Jänner das Active-Relaxing-System.') },
  { id: 'content', x: 500, y: 80, r: 40, color: 'ink', label: pair('Content engine', 'Content-Engine'), body: pair('Higgsfield + real footage → websites, Instagram, vlogs.', 'Higgsfield + echtes Material → Websites, Instagram, Vlogs.') },
  { id: 'ai', x: 820, y: 120, r: 40, color: 'ink', label: pair('AI automations', 'KI-Automationen'), body: pair('Enquiry routing, reminders, weekly report — human-reviewed.', 'Anfrage-Routing, Erinnerungen, Wochenbericht – menschlich geprüft.') },
  { id: 'retreat', x: 500, y: 490, r: 34, color: 'ink', secret: true, label: pair('Villach retreat?', 'Villach-Retreat?'), body: pair('Secret level: Marina’s group sessions × villa stays. Only after the setup is done.', 'Geheimlevel: Marinas Gruppeneinheiten × Villenaufenthalte. Erst nach dem Aufbau.') },
];
export const edges = [
  ['hq', 'marina'], ['hq', 'active'], ['hq', 'villa'], ['hq', 'ai'], ['hq', 'content'],
  ['content', 'marina'], ['content', 'active'], ['content', 'villa'], ['ai', 'villa'], ['ai', 'marina'],
  ['retreat', 'marina'], ['retreat', 'active'], ['retreat', 'villa'],
];
