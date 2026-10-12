import { pair } from '../lib/store.jsx';

// Recommended architecture: one workspace, four teamspaces. Relations/rollups only work inside one workspace.
export const teamspaces = [
  {
    id: 'hq',
    name: 'HQ · Gerry’s Universe',
    access: pair('Open to the core team', 'Offen für das Kernteam'),
    color: 'hq',
    dbs: [
      { name: pair('Owner dashboard', 'Inhaber-Dashboard'), body: pair('Rollups from every business: enquiries, tasks, content, baselines.', 'Rollups aus allen Geschäften: Anfragen, Aufgaben, Content, Ausgangswerte.') },
      { name: pair('Goals & SMART quests', 'Ziele & SMART-Quests'), body: pair('This mission plan, live, with owners and dates.', 'Dieser Missionsplan, live, mit Verantwortlichen und Terminen.') },
      { name: pair('Decisions log', 'Entscheidungslog'), body: pair('Every yes/no with date and reason.', 'Jedes Ja/Nein mit Datum und Begründung.') },
      { name: pair('Shared asset library', 'Gemeinsame Medienbibliothek'), body: pair('Photos, Higgsfield media, logos — tagged by business and consent.', 'Fotos, Higgsfield-Medien, Logos – nach Geschäft und Freigabe verschlagwortet.') },
      { name: pair('AI agents & automations', 'KI-Agenten & Automationen'), body: pair('Weekly report, enquiry routing, reply drafts — with a run log.', 'Wochenbericht, Anfrage-Routing, Antwortentwürfe – mit Protokoll.') },
    ],
  },
  {
    id: 'marina',
    name: 'Marina Fior',
    access: pair('Private teamspace', 'Privater Teamspace'),
    color: 'marina',
    dbs: [
      { name: pair('Administrative enquiries', 'Administrative Anfragen'), body: pair('Name, channel, next step. No clinical content.', 'Name, Kanal, nächster Schritt. Keine klinischen Inhalte.') },
      { name: pair('Content calendar', 'Content-Kalender'), body: pair('Articles, reels, vlog episodes with approval status.', 'Artikel, Reels, Vlog-Folgen mit Freigabestatus.') },
      { name: pair('Practice knowledge base', 'Praxis-Wissensbasis'), body: pair('FAQs, processes, templates.', 'FAQs, Abläufe, Vorlagen.') },
    ],
  },
  {
    id: 'active',
    name: 'Active Relaxing',
    access: pair('Closed teamspace', 'Geschlossener Teamspace'),
    color: 'active',
    dbs: [
      { name: pair('Booking pipeline', 'Buchungs-Pipeline'), body: pair('Enquiry → offer → confirmed → stayed → review.', 'Anfrage → Angebot → bestätigt → Aufenthalt → Bewertung.') },
      { name: pair('Apartments & turnover', 'Apartments & Wechsel'), body: pair('Cleaning checklists, maintenance, inventory.', 'Reinigungschecklisten, Wartung, Inventar.') },
      { name: pair('Guest guides & SOPs', 'Gästeinfos & SOPs'), body: pair('Arrival guides, partner offers, seasonal tips.', 'Anreiseinfos, Partnerangebote, Saisontipps.') },
    ],
  },
  {
    id: 'villa',
    name: 'Villa Olivija',
    access: pair('Closed teamspace · activated Jan 2027', 'Geschlossener Teamspace · ab Jänner 2027'),
    color: 'villa',
    dbs: [
      { name: pair('Booking pipeline', 'Buchungs-Pipeline'), body: pair('Enquiry → quote → deposit → stay.', 'Anfrage → Angebot → Anzahlung → Aufenthalt.') },
      { name: pair('Property operations', 'Objektbetrieb'), body: pair('Arrival/departure checklists, maintenance records.', 'An-/Abreise-Checklisten, Wartungsprotokolle.') },
      { name: pair('Summer campaign', 'Sommerkampagne'), body: pair('Content bank and schedule.', 'Contentpaket und Zeitplan.') },
    ],
  },
];

export const options = [
  {
    name: pair('One workspace + 4 teamspaces', 'Ein Workspace + 4 Teamspaces'),
    pick: true,
    rows: [true, true, true, true, true],
  },
  {
    name: pair('4 separate workspaces', '4 getrennte Workspaces'),
    rows: [true, false, false, false, true],
  },
  {
    name: pair('Enterprise organisation', 'Enterprise-Organisation'),
    rows: [true, false, true, false, false],
  },
];

export const criteria = [
  pair('Separate spaces per business', 'Getrennte Bereiche pro Geschäft'),
  pair('HQ dashboard pulls data from all businesses', 'HQ-Dashboard zieht Daten aus allen Geschäften'),
  pair('One bill, one admin', 'Eine Rechnung, eine Verwaltung'),
  pair('Right-sized for a family business', 'Passend für ein Familienunternehmen'),
  pair('Available without a sales contract', 'Ohne Vertriebsvertrag verfügbar'),
];

export const setupSteps = [
  pair('Gerry signs up with his business email', 'Gerry registriert sich mit seiner Geschäfts-E-Mail'),
  pair('Upgrade the workspace to Business', 'Workspace auf Business upgraden'),
  pair('Invite Rustam’s existing account as Workspace owner', 'Rustams bestehendes Konto als Workspace-Eigentümer einladen'),
  pair('Rustam creates HQ + 3 teamspaces and sets roles', 'Rustam legt HQ + 3 Teamspaces an und setzt Rollen'),
  pair('Rustam builds databases, dashboards and AI agents', 'Rustam baut Datenbanken, Dashboards und KI-Agenten'),
];

export const modules = [
  [pair('Customers', 'Kunden'), pair('Three clear pipelines; clinical records stay separate.', 'Drei klare Pipelines; klinische Unterlagen bleiben getrennt.')],
  [pair('Money', 'Finanzen'), pair('Booking, payment and invoice overviews.', 'Buchungs-, Zahlungs- und Rechnungsübersichten.')],
  [pair('Automation', 'Automatisierung'), pair('Confirmations, reminders, weekly reports.', 'Bestätigungen, Erinnerungen, Wochenberichte.')],
  [pair('Team', 'Team'), pair('Tasks, onboarding and SOPs.', 'Aufgaben, Einarbeitung und SOPs.')],
  [pair('Online', 'Online'), pair('Websites, booking links and content.', 'Websites, Buchungslinks und Content.')],
  [pair('AI assistant', 'KI-Assistent'), pair('Reviewed drafts, translation, summaries.', 'Geprüfte Entwürfe, Übersetzung, Zusammenfassungen.')],
  [pair('Plans', 'Planung'), pair('Goals, ventures and documents.', 'Ziele, Vorhaben und Dokumente.')],
  [pair('Security', 'Sicherheit'), pair('Access, backups and recovery.', 'Zugänge, Backups und Wiederherstellung.')],
];
