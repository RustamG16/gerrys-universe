import React, { useState } from 'react';
import { scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';
import { useApp, tabKeyDown, media } from '../lib/store.jsx';
import { retreats } from '../data/plan.js';
import { useTip } from './charts/ChartFrame.jsx';

const FIELDS = [
  ['attendees', ['Participants', 'Teilnehmende'], 4, 14, 1],
  ['price', ['Price / person (€)', 'Preis / Person (€)'], 400, 1600, 10],
  ['variable', ['Variable cost / person (€)', 'Variable Kosten / Person (€)'], 150, 900, 10],
  ['fixed', ['Fixed costs (€)', 'Fixkosten (€)'], 500, 5000, 50],
];

export function retreatMath(r) {
  const revenue = r.attendees * r.price;
  const contribution = r.attendees * (r.price - r.variable) - r.fixed;
  const breakEven = r.price > r.variable ? Math.ceil(r.fixed / (r.price - r.variable)) : null;
  return { revenue, contribution, breakEven };
}

// Contribution line across 4–14 participants; crossing zero = break-even.
function BreakEvenChart({ r }) {
  const { L, euro } = useApp();
  const tip = useTip();
  const W = 520, H = 240, P = { l: 64, r: 16, t: 16, b: 34 };
  const pts = Array.from({ length: 11 }, (_, i) => i + 4).map((n) => ({ n, c: n * (r.price - r.variable) - r.fixed }));
  const ext = [Math.min(0, ...pts.map((p) => p.c)), Math.max(0, ...pts.map((p) => p.c))];
  const x = scaleLinear().domain([4, 14]).range([P.l, W - P.r]);
  const y = scaleLinear().domain(ext).nice().range([H - P.b, P.t]);
  const path = line().x((p) => x(p.n)).y((p) => y(p.c))(pts);
  return (
    <div className="plot breakeven">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={L('Contribution by number of participants', 'Deckungsbeitrag nach Teilnehmerzahl')}>
        {y.ticks(4).map((v) => (
          <g key={v}>
            <line x1={P.l} x2={W - P.r} y1={y(v)} y2={y(v)} className={v === 0 ? 'zero' : 'grid'} />
            <text x={P.l - 8} y={y(v)} textAnchor="end" dominantBaseline="middle" className="axis-label">{euro(v)}</text>
          </g>
        ))}
        {pts.map((p) => (
          <text key={p.n} x={x(p.n)} y={H - 10} textAnchor="middle" className="axis-label">{p.n}</text>
        ))}
        <path d={path} className="be-line" />
        {pts.map((p) => {
          const content = (
            <>
              <b>{p.n} {L('participants', 'Teilnehmende')}</b>
              <span>{L('Contribution', 'Deckungsbeitrag')}: {euro(p.c)}</span>
            </>
          );
          return (
            <g key={p.n} onMouseEnter={(e) => tip.show(e, content)} onMouseLeave={tip.hide}>
              <rect x={x(p.n) - 18} y={P.t} width={36} height={H - P.t - P.b} fill="transparent" />
              <circle cx={x(p.n)} cy={y(p.c)} r={p.n === r.attendees ? 7 : 4} className={p.c < 0 ? 'neg' : 'pos'} />
            </g>
          );
        })}
      </svg>
      {tip.node}
    </div>
  );
}

export default function RetreatLab() {
  const { t, L, euro, retreat: r, setRetreat } = useApp();
  const [tab, setTab] = useState(0);
  const f = retreats[tab];
  const { revenue, contribution, breakEven } = retreatMath(r);

  return (
    <div className="retreat-lab">
      <div className="retreat-intro">
        <figure className="retreat-image">
          <img src={media('villach-retreat.webp')} alt={L('Concept image: a small group in conversation on a lakeside villa terrace near Villach', 'Konzeptbild: kleine Gruppe im Gespräch auf einer Villenterrasse am See bei Villach')} loading="lazy" />
          <figcaption>{L('AI-generated with Higgsfield · concept, not a real villa, people or programme', 'Mit Higgsfield KI-generiert · Konzept, keine reale Villa, Personen oder Programm')}</figcaption>
        </figure>
        <div>
          <div className="retreat-tabs" role="tablist" aria-label={L('Retreat formats', 'Retreat-Formate')}>
            {retreats.map((x, i) => (
              <button key={i} role="tab" id={'rt-' + i} aria-controls="rt-panel" aria-selected={tab === i} tabIndex={tab === i ? 0 : -1} onClick={() => setTab(i)} onKeyDown={(e) => tabKeyDown(e, i, retreats.length, setTab)}>
                {t(x.name)}
              </button>
            ))}
          </div>
          <div id="rt-panel" role="tabpanel" aria-labelledby={'rt-' + tab} tabIndex="0">
            <h3>{t(f.title)}</h3>
            <ol className="programme">
              {f.days.map((d, i) => (
                <li key={i}><span>{L('Day', 'Tag')} {i + 1}</span>{t(d)}</li>
              ))}
            </ol>
          </div>
          <p className="note">
            {L(
              'Group sessions led by Marina within her professional scope as a clinical and health psychologist (qualifications as listed on her website). “Psychotherapie” is a protected title in Austria — wording, safeguarding and insurance need professional review. Clinical records stay out of the guest CRM.',
              'Gruppeneinheiten unter Marinas Leitung im Rahmen ihrer Befugnis als Klinische und Gesundheitspsychologin (Qualifikationen laut ihrer Website). „Psychotherapie“ ist in Österreich eine geschützte Bezeichnung – Formulierung, Schutzkonzept und Versicherung brauchen fachliche Prüfung. Klinische Unterlagen bleiben außerhalb des Gäste-CRM.',
            )}
          </p>
        </div>
      </div>

      <div className="calculator">
        <div className="inputs">
          <h3>{L('Pilot economics', 'Pilot-Wirtschaftlichkeit')}</h3>
          {FIELDS.map(([key, label, min, max, step]) => (
            <label key={key}>
              <span>{L(label[0], label[1])}</span>
              <input type="range" min={min} max={max} step={step} value={r[key]} onChange={(e) => setRetreat((v) => ({ ...v, [key]: Number(e.target.value) }))} />
              <output>{key === 'attendees' ? r[key] : euro(r[key])}</output>
            </label>
          ))}
          <p className="caption muted">{L('Discussion model before taxes and unmodelled costs — not a price or forecast.', 'Besprechungsmodell vor Steuern und nicht erfassten Kosten – kein Preis, keine Prognose.')}</p>
        </div>
        <div>
          <div className="calc-results" aria-live="polite">
            <div><span>{L('Revenue (before tax)', 'Umsatz (vor Steuern)')}</span><strong>{euro(revenue)}</strong></div>
            <div className={contribution < 0 ? 'negative' : ''}><span>{L('Contribution', 'Deckungsbeitrag')}</span><strong>{euro(contribution)}</strong></div>
            <div>
              <span>{L('Break-even', 'Kostendeckung ab')}</span>
              <strong>{breakEven ?? '—'}</strong>
              <small>{breakEven === null ? L('Not reachable with these inputs', 'Mit diesen Annahmen nicht erreichbar') : breakEven > 14 ? L('Above modelled capacity', 'Über der Modellkapazität') : L('participants', 'Teilnehmende')}</small>
            </div>
          </div>
          <BreakEvenChart r={r} />
        </div>
      </div>
    </div>
  );
}
