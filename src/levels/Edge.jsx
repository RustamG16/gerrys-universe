import React from 'react';
import {
  Users, Code2, Workflow, Server, Megaphone, CalendarCheck, Brain, MousePointerClick, LayoutGrid,
  Sparkles, Layers, FileCheck2, ShieldCheck, ArrowRight, ArrowDown, X, Check, ExternalLink,
} from 'lucide-react';
import { useApp } from '../lib/store.jsx';
import { MY_DAYS, ASOF } from '../data/estimate.js';
import { MARINA_URL } from '../data/businesses.js';
import LevelHead from '../components/LevelHead.jsx';
import Reveal from '../components/Reveal.jsx';
import ToolCalculator from '../components/ToolCalculator.jsx';
import '../styles/edge.css';

export default function Edge() {
  const { t, L } = useApp();
  return (
    <div className="level edge">
      <LevelHead
        num="04"
        kicker={L('Your edge · why Rustam', 'Dein Vorteil · warum Rustam')}
        title={[L('One partner.', 'Ein Partner.'), L('Everything digital.', 'Alles Digitale.')]}
        lead={L(
          'For owners who have run several businesses for years and are now moving into the digital era. One relationship instead of five providers — built to a high standard, powered by a repeatable system.',
          'Für Unternehmer, die seit Jahren mehrere Geschäfte führen und jetzt ins digitale Zeitalter gehen. Eine Beziehung statt fünf Anbieter — auf hohem Niveau gebaut, getragen von einem wiederholbaren System.',
        )}
      >
        <ol className="eg-pillars" aria-label={L('Three pillars', 'Drei Säulen')}>
          <li><a href="#eg-one"><b>01</b>{L('One partner, not many providers', 'Ein Partner statt vieler Anbieter')}</a></li>
          <li><a href="#eg-custom"><b>02</b>{L('High-end custom, not templates', 'High-End nach Maß statt Vorlagen')}</a></li>
          <li><a href="#eg-system"><b>03</b>{L('Powered by the Convenium system', 'Getragen vom Convenium-System')}</a></li>
        </ol>
      </LevelHead>

      <section className="wrap" id="eg-one" aria-labelledby="eg-one-title">
        <p className="eyebrow">01 · {L('One partner, not many providers', 'Ein Partner statt vieler Anbieter')}</p>
        <h2 id="eg-one-title" className="h2-sm">{L('The simplification is the product.', 'Die Vereinfachung ist das Produkt.')}</h2>
        <Providers />
      </section>

      <section className="wrap" id="eg-custom" aria-labelledby="eg-custom-title">
        <p className="eyebrow">02 · {L('High-end custom, not templates', 'High-End nach Maß statt Vorlagen')}</p>
        <h2 id="eg-custom-title" className="h2-sm">{L('Built for your business — not bent to fit a theme.', 'Für dein Geschäft gebaut — nicht in ein Theme gepresst.')}</h2>
        <Compare />
        <Foundations />
        <a className="eg-proof" href={MARINA_URL} target="_blank" rel="noreferrer">
          <span className="eg-proof-days"><b>{MY_DAYS}</b><small>{L('working days', 'Arbeitstage')}</small></span>
          <span className="eg-proof-text">
            <strong>{L('Example: the Marina Fior website', 'Beispiel: die Website von Marina Fior')}</strong>
            <small>{L('Custom design, scroll animation, booking path — real build time, stated by Rustam.', 'Eigenes Design, Scroll-Animation, Buchungsweg — tatsächliche Bauzeit laut Rustam.')}</small>
          </span>
          <ExternalLink size={20} aria-hidden="true" />
        </a>
      </section>

      <section className="wrap" id="eg-system" aria-labelledby="eg-system-title">
        <p className="eyebrow">03 · {L('Powered by the Convenium system', 'Getragen vom Convenium-System')}</p>
        <h2 id="eg-system-title" className="h2-sm">{L('One contact in front. A repeatable system behind.', 'Ein Ansprechpartner vorne. Ein wiederholbares System dahinter.')}</h2>
        <SystemStack />
      </section>

      <section className="wrap" aria-labelledby="powerups-title">
        <p className="eyebrow">{L('Power-ups', 'Power-ups')}</p>
        <h2 id="powerups-title" className="h2-sm">{L('The tools inside the system.', 'Die Werkzeuge im System.')}</h2>
        <p className="level-lead">{L('Monthly tools for running all of this for Gerry’s businesses. Separate from my own pay.', 'Monatliche Tools, um all das für Gerrys Geschäfte zu betreiben. Getrennt von meiner Bezahlung.')}</p>
        <ToolCalculator />
        <p className="caption muted">{t(ASOF)}</p>
      </section>
    </div>
  );
}

/* ---------- 01 · Providers: before / after ---------- */
function Providers() {
  const { L } = useApp();
  const providers = [
    { icon: <LayoutGrid size={18} />, label: L('Web designer', 'Webdesigner') },
    { icon: <Code2 size={18} />, label: L('Developer', 'Entwickler') },
    { icon: <Workflow size={18} />, label: L('Automation / IT', 'Automation / IT') },
    { icon: <Server size={18} />, label: L('Hosting & domains', 'Hosting & Domains') },
    { icon: <Megaphone size={18} />, label: L('Marketing & social', 'Marketing & Social') },
    { icon: <CalendarCheck size={18} />, label: L('Booking & CRM tools', 'Buchungs- & CRM-Tools') },
  ];
  return (
    <Reveal className="eg-compare-panels">
      <div className="eg-panel before">
        <p className="eg-tag">{L('Today', 'Heute')}</p>
        <div className="eg-owner"><Users size={20} aria-hidden="true" /> {L('You', 'Du')}</div>
        <ul className="eg-many">
          {providers.map((p, i) => (
            <li key={i}><span aria-hidden="true">{p.icon}</span>{p.label}</li>
          ))}
        </ul>
        <p className="eg-count"><b>6</b> {L('contacts', 'Kontakte')} · <b>6</b> {L('briefings', 'Briefings')} · <b>6</b> {L('invoices', 'Rechnungen')}</p>
      </div>
      <div className="eg-arrow" aria-hidden="true"><ArrowRight className="h" size={28} /><ArrowDown className="v" size={28} /></div>
      <div className="eg-panel after">
        <p className="eg-tag">{L('With Rustam', 'Mit Rustam')}</p>
        <div className="eg-owner"><Users size={20} aria-hidden="true" /> {L('You', 'Du')}</div>
        <div className="eg-one">
          <strong>Rustam</strong>
          <small>+ {L('the Convenium system', 'das Convenium-System')}</small>
        </div>
        <ul className="eg-covered">
          {providers.map((p, i) => (
            <li key={i}><Check size={14} aria-hidden="true" />{p.label}</li>
          ))}
        </ul>
        <p className="eg-count"><b>1</b> {L('contact', 'Kontakt')} · <b>1</b> {L('briefing', 'Briefing')} · <b>1</b> {L('plan', 'Plan')}</p>
      </div>
    </Reveal>
  );
}

/* ---------- 02 · Template vs custom ---------- */
function Compare() {
  const { L } = useApp();
  const rows = [
    [L('Look', 'Look'), L('Same theme as thousands of others', 'Dasselbe Theme wie tausende andere'), L('Designed around your brand', 'Rund um deine Marke gestaltet')],
    [L('Motion', 'Bewegung'), L('Static pages', 'Statische Seiten'), L('Cinematic, scroll-animated story', 'Filmische, scroll-animierte Geschichte')],
    [L('Basis', 'Grundlage'), L('Theme defaults', 'Theme-Voreinstellungen'), L('Psychology, human-centered computing, design principles', 'Psychologie, Human-Centered Computing, Gestaltungs\u00ADprinzipien')],
    [L('Build', 'Technik'), L('Plugin stack to maintain', 'Plugin-Stapel, der gewartet werden muss'), L('Clean, fast custom code', 'Schlanker, schneller eigener Code')],
    [L('Fit', 'Passform'), L('Business bent to fit the template', 'Geschäft passt sich der Vorlage an'), L('Built around how your business works', 'Gebaut nach dem, wie dein Geschäft arbeitet')],
  ];
  return (
    <div className="eg-table" role="table" aria-label={L('Template site compared with Convenium custom', 'Vorlagen-Website im Vergleich mit Convenium nach Maß')}>
      <div className="eg-row head" role="row">
        <span role="columnheader" />
        <span role="columnheader" className="tpl">{L('Typical template site (e.g. WordPress theme)', 'Typische Vorlagen-Website (z. B. WordPress-Theme)')}</span>
        <span role="columnheader" className="cv">{L('Convenium custom', 'Convenium nach Maß')}</span>
      </div>
      {rows.map((r, i) => (
        <div className="eg-row" role="row" key={i}>
          <span role="rowheader">{r[0]}</span>
          <span role="cell" className="tpl"><X size={16} aria-hidden="true" />{r[1]}</span>
          <span role="cell" className="cv"><Check size={16} aria-hidden="true" />{r[2]}</span>
        </div>
      ))}
    </div>
  );
}

function Foundations() {
  const { L } = useApp();
  const fields = [
    { icon: <Brain size={22} />, title: L('Psychology', 'Psychologie'), body: L('How people build trust and make decisions — so visitors become enquiries.', 'Wie Menschen Vertrauen fassen und entscheiden — damit aus Besuchern Anfragen werden.') },
    { icon: <MousePointerClick size={22} />, title: L('Human-centered computing', 'Human-Centered Computing'), body: L('Designed and tested around real users, on every screen size.', 'Für echte Nutzer gestaltet und getestet, auf jeder Bildschirmgröße.') },
    { icon: <Sparkles size={22} />, title: L('Design principles (CRAP)', 'Gestaltungsprinzipien (CRAP)'), body: L('Contrast, Repetition, Alignment, Proximity — the basics of a clear, premium layout.', 'Kontrast, Wiederholung, Ausrichtung, Nähe — die Basis eines klaren, hochwertigen Layouts.') },
  ];
  const crap = [
    { k: 'C', name: L('Contrast', 'Kontrast') },
    { k: 'R', name: L('Repetition', 'Wiederholung') },
    { k: 'A', name: L('Alignment', 'Ausrichtung') },
    { k: 'P', name: L('Proximity', 'Nähe') },
  ];
  return (
    <>
      <Reveal className="eg-fields">
        {fields.map((f, i) => (
          <article key={i}>
            <span className="eg-icon" aria-hidden="true">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.body}</p>
          </article>
        ))}
      </Reveal>
      <ul className="eg-crap" aria-label="CRAP">
        {crap.map((c) => (
          <li key={c.k} className={'crap-' + c.k}>
            <svg viewBox="0 0 120 80" aria-hidden="true"><CrapGlyph k={c.k} /></svg>
            <b>{c.k}</b>
            <span>{c.name}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

// Tiny diagrams that show each principle instead of describing it.
function CrapGlyph({ k }) {
  if (k === 'C')
    return (
      <>
        <rect x="14" y="20" width="40" height="40" rx="4" className="g-soft" />
        <rect x="66" y="12" width="40" height="56" rx="4" className="g-hot" />
      </>
    );
  if (k === 'R')
    return [0, 1, 2].map((i) => (
      <g key={i}>
        <rect x={12 + i * 34} y="18" width="28" height="6" rx="3" className="g-hot" />
        <rect x={12 + i * 34} y="30" width="28" height="30" rx="3" className="g-soft" />
      </g>
    ));
  if (k === 'A')
    return (
      <>
        <line x1="20" y1="8" x2="20" y2="72" className="g-guide" />
        {[16, 32, 48, 60].map((y, i) => <rect key={i} x="20" y={y} width={[80, 56, 70, 40][i]} height="7" rx="3" className={i === 0 ? 'g-hot' : 'g-soft'} />)}
      </>
    );
  return (
    <>
      {[0, 1].map((i) => <rect key={'a' + i} x={12 + i * 18} y="24" width="14" height="14" rx="3" className="g-hot" />)}
      {[0, 1].map((i) => <rect key={'b' + i} x={12 + i * 18} y="42" width="14" height="14" rx="3" className="g-hot" />)}
      {[0, 1].map((i) => <rect key={'c' + i} x={76 + i * 18} y="24" width="14" height="14" rx="3" className="g-soft" />)}
      {[0, 1].map((i) => <rect key={'d' + i} x={76 + i * 18} y="42" width="14" height="14" rx="3" className="g-soft" />)}
    </>
  );
}

/* ---------- 03 · System stack ---------- */
function SystemStack() {
  const { L } = useApp();
  const layers = [
    { icon: <Sparkles size={20} />, title: L('AI workflow', 'KI-Workflow'), body: L('Builds, checks and iterates in hours instead of weeks.', 'Baut, prüft und verbessert in Stunden statt Wochen.') },
    { icon: <Layers size={20} />, title: L('Design framework (Apollo)', 'Design-Framework (Apollo)'), body: L('A consistent high-end look, reused and refined on every project.', 'Ein durchgängiger High-End-Look, in jedem Projekt wiederverwendet und verfeinert.') },
    { icon: <FileCheck2 size={20} />, title: L('Templates & SOPs', 'Vorlagen & SOPs'), body: L('Every step documented — briefing, build, launch, care.', 'Jeder Schritt dokumentiert — Briefing, Bau, Launch, Betreuung.') },
    { icon: <ShieldCheck size={20} />, title: L('Quality checks', 'Qualitätsprüfung'), body: L('Desktop, mobile, both languages, accessibility — before anything goes live.', 'Desktop, Mobil, beide Sprachen, Barrierefreiheit — bevor etwas live geht.') },
  ];
  return (
    <div className="eg-system">
      <Reveal className="eg-stack">
        <div className="eg-front">
          <Users size={22} aria-hidden="true" />
          <div>
            <strong>{L('Rustam — your one contact', 'Rustam — dein einziger Ansprechpartner')}</strong>
            <small>{L('Listens, decides, delivers', 'Hört zu, entscheidet, liefert')}</small>
          </div>
        </div>
        {layers.map((l, i) => (
          <div key={i} className="eg-layer" style={{ '--i': i }}>
            <span className="eg-layer-icon" aria-hidden="true">{l.icon}</span>
            <div>
              <strong>{l.title}</strong>
              <small>{l.body}</small>
            </div>
          </div>
        ))}
        <p className="eg-stack-label">{L('The Convenium system', 'Das Convenium-System')}</p>
      </Reveal>
      <div className="eg-why">
        <h3>{L('Why this holds up as clients grow', 'Warum das auch mit mehr Kunden hält')}</h3>
        <ul>
          <li><Check size={16} aria-hidden="true" />{L('Documented, not in one head — the process survives a busy week.', 'Dokumentiert statt nur im Kopf — der Ablauf übersteht auch eine volle Woche.')}</li>
          <li><Check size={16} aria-hidden="true" />{L('Reusable — every project makes the next one faster.', 'Wiederverwendbar — jedes Projekt macht das nächste schneller.')}</li>
          <li><Check size={16} aria-hidden="true" />{L('Not a solo freelancer, not agency overhead — one partner with a system.', 'Kein Einzelkämpfer, kein Agentur-Overhead — ein Partner mit System.')}</li>
        </ul>
      </div>
    </div>
  );
}
