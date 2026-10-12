import { pair } from '../lib/store.jsx';

// Level 06 — proposed working model between Gerry and Rustam.
// Discussion draft: every number here is a proposal to agree in writing, not a signed term.

export const BASE_MONTHLY = 3465; // € gross / month — 2026 "other key worker" threshold, used as a safe floor
export const PAYMENTS = 14; // Austrian 14 salaries per year
export const BASE_YEAR = BASE_MONTHLY * PAYMENTS; // 48,510
export const EMPLOYER_FACTOR = 1.3; // ≈ 30 % employer contributions on top of gross (estimate, confirm with payroll)
export const EMPLOYER_COST = Math.round((BASE_YEAR * EMPLOYER_FACTOR) / 1000) * 1000; // ≈ 63,000

export const TIER_LIMIT = 100000; // net network-project revenue per contract year
export const LOW_RATE = 0.1; // Rustam's share up to the limit (Gerry recovers the salary)
export const HIGH_RATE = 0.7; // Rustam's share above the limit

// Commission on network projects only (new clients from Gerry's network, outside his own businesses).
export function split(revenue) {
  const low = Math.min(revenue, TIER_LIMIT) * LOW_RATE;
  const high = Math.max(revenue - TIER_LIMIT, 0) * HIGH_RATE;
  const commission = low + high;
  const gerryShare = revenue - commission;
  return { low, high, commission, gerryShare, gerryAfterSalary: gerryShare - EMPLOYER_COST, rustamTotal: BASE_YEAR + commission };
}

// Revenue at which Gerry's share alone covers the full salary cost.
export const SALARY_COVERED_AT = Math.ceil(EMPLOYER_COST / (1 - LOW_RATE) / 1000) * 1000;

export const timeline = [
  { id: 'visa', from: 0, to: 2, label: pair('Contract & visa', 'Vertrag & Visum'), note: pair('≈ 8 weeks decision', '≈ 8 Wochen Entscheidung'), kind: 'prep' },
  { id: 'setup', from: 2, to: 11, label: pair('Set up Gerry’s 3 businesses', 'Gerrys 3 Geschäfte aufbauen'), note: pair('Salary only', 'Nur Gehalt'), kind: 'own' },
  { id: 'network', from: 9, to: 26, label: pair('Network projects', 'Netzwerk-Projekte'), note: pair('Salary + commission', 'Gehalt + Provision'), kind: 'network' },
  { id: 'plus', from: 23, to: 26, label: pair('RWR Card plus', 'RWR-Karte plus'), note: pair('After 21 of 24 months', 'Nach 21 von 24 Monaten'), kind: 'milestone' },
];
export const TIMELINE_MONTHS = 26;

export const workTypes = [
  {
    id: 'own',
    title: pair('Gerry’s own businesses', 'Gerrys eigene Geschäfte'),
    examples: pair('Marina Fior · Active Relaxing · Villa Olivija', 'Marina Fior · Active Relaxing · Villa Olivija'),
    pay: pair('Salary only', 'Nur Gehalt'),
    items: [pair('Websites & booking paths', 'Websites & Buchungswege'), pair('Notion HQ & workflows', 'Notion-HQ & Abläufe'), pair('Content & social systems', 'Content- & Social-Systeme')],
  },
  {
    id: 'network',
    title: pair('Network projects', 'Netzwerk-Projekte'),
    examples: pair('Multi-business owners from Gerry’s network who need one partner for unification & automation', 'Unternehmer mit mehreren Geschäften aus Gerrys Netzwerk, die einen Partner für Vereinheitlichung & Automatisierung brauchen'),
    pay: pair('Salary + commission', 'Gehalt + Provision'),
    items: [pair('Gerry opens the door', 'Gerry öffnet die Tür'), pair('Gerry’s company signs & invoices', 'Gerrys Firma unterschreibt & verrechnet'), pair('Rustam delivers the project', 'Rustam liefert das Projekt')],
  },
];

export const ownership = {
  rustam: [
    pair('Convenium design system (Apollo)', 'Convenium-Designsystem (Apollo)'),
    pair('Components, templates & code base', 'Komponenten, Vorlagen & Code-Basis'),
    pair('AI agents, prompts & workflows', 'KI-Agenten, Prompts & Workflows'),
    pair('Notion OS templates & SOPs', 'Notion-OS-Vorlagen & SOPs'),
    pair('Every improvement to the system', 'Jede Verbesserung am System'),
  ],
  gerry: [
    pair('His websites & apps — the finished products', 'Seine Websites & Apps — die fertigen Produkte'),
    pair('Texts, photos & videos made for him', 'Für ihn erstellte Texte, Fotos & Videos'),
    pair('His Notion workspace & all data', 'Sein Notion-Workspace & alle Daten'),
    pair('Domains, accounts & customer contacts', 'Domains, Konten & Kundenkontakte'),
    pair('His brands & logos', 'Seine Marken & Logos'),
  ],
};

export const visaSteps = [
  { title: pair('Sign the offer', 'Angebot unterschreiben'), body: pair('Permanent, full-time, Digitalisation Manager.', 'Unbefristet, Vollzeit, Digitalisation Manager.') },
  { title: pair('Employer declaration', 'Arbeitgebererklärung'), body: pair('One form under the AuslBG, signed by Gerry.', 'Ein Formular nach AuslBG, von Gerry unterschrieben.') },
  { title: pair('File the application', 'Antrag einreichen'), body: pair('At the residence authority. Gerry may file it for Rustam. Fee €218.', 'Bei der Niederlassungsbehörde. Gerry darf für Rustam einreichen. Gebühr 218 €.') },
  { title: pair('AMS check', 'AMS-Prüfung'), body: pair('Job matches the degree, salary meets the local rate.', 'Job passt zum Studium, Gehalt entspricht dem ortsüblichen Niveau.') },
  { title: pair('Card & start', 'Karte & Start'), body: pair('Decision within 8 weeks. Work starts after the card is collected.', 'Entscheidung binnen 8 Wochen. Arbeitsbeginn nach Abholung der Karte.') },
];

export const terms = [
  { k: pair('Role', 'Rolle'), v: pair('Digitalisation Manager', 'Digitalisation Manager') },
  { k: pair('Contract', 'Vertrag'), v: pair('Permanent, full-time', 'Unbefristet, Vollzeit') },
  { k: pair('Base salary', 'Grundgehalt'), v: pair(`€${BASE_MONTHLY.toLocaleString('en')} gross × 14`, `${BASE_MONTHLY.toLocaleString('de-AT')} € brutto × 14`) },
  { k: pair('Commission', 'Provision'), v: pair('Network projects only: 10% up to €100k, 70% above', 'Nur Netzwerk-Projekte: 10 % bis 100.000 €, 70 % darüber') },
  { k: pair('Bands reset', 'Stufen-Reset'), v: pair('Every contract year', 'Jedes Vertragsjahr') },
  { k: pair('Transparency', 'Transparenz'), v: pair('Rustam sees invoices & costs of commissioned projects', 'Rustam sieht Rechnungen & Kosten provisionierter Projekte') },
  { k: pair('Paid when', 'Fällig'), v: pair('Quarterly, after the client has paid', 'Quartalsweise, nach Zahlung durch den Kunden') },
  { k: pair('Ownership', 'Eigentum'), v: pair('System stays Rustam’s, products are Gerry’s', 'System bleibt bei Rustam, Produkte gehören Gerry') },
  { k: pair('Side activity', 'Nebentätigkeit'), v: pair('Rustam may run Convenium on a small scale, no non-compete', 'Rustam darf Convenium im kleinen Rahmen führen, kein Konkurrenzverbot') },
];
