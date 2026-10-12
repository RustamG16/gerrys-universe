import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';
import {
  Handshake, Building2, Code2, Users, ArrowRight, ArrowDown, FileSignature, ClipboardCheck,
  Landmark, Search, BadgeCheck, KeyRound, Lock, Check, Repeat, Euro,
} from 'lucide-react';
import { useApp } from '../lib/store.jsx';
import LevelHead from '../components/LevelHead.jsx';
import Reveal from '../components/Reveal.jsx';
import ChartFrame from '../components/charts/ChartFrame.jsx';
import {
  BASE_MONTHLY, PAYMENTS, BASE_YEAR, EMPLOYER_COST, TIER_LIMIT, LOW_RATE, HIGH_RATE, split,
  SALARY_COVERED_AT, timeline, TIMELINE_MONTHS, workTypes, ownership, visaSteps, terms,
} from '../data/partnership.js';
import '../styles/partnership.css';

const pct = (x, de) => Math.round(x * 100) + (de ? '\u00a0%' : '%');

export default function Partnership() {
  const { t, L, euro } = useApp();
  const [revenue, setRevenue] = useState(200000);
  const s = useMemo(() => split(revenue), [revenue]);

  return (
    <div className="level partnership">
      <LevelHead
        num="06"
        kicker={L('Working together · proposal for Gerry', 'Zusammenarbeit · Vorschlag für Gerry')}
        title={[L('One role.', 'Eine Rolle.'), L('Two ways to win.', 'Zwei Wege zu gewinnen.')]}
        lead={L(
          'Rustam joins as Digitalisation Manager. First he builds your three businesses. Then he delivers projects for people from your network — and both of you earn from every deal.',
          'Rustam kommt als Digitalisation Manager. Zuerst baut er deine drei Geschäfte auf. Danach liefert er Projekte für Menschen aus deinem Netzwerk — und ihr beide verdient an jedem Deal.',
        )}
      >
        <ul className="pt-summary" aria-label={L('In short', 'Kurz gesagt')}>
          <li><b>{euro(BASE_MONTHLY)}</b><span>{L('gross base × 14', 'brutto Basis × 14')}</span></li>
          <li><b>{L('10% → 70%', '10 % → 70 %')}</b><span>{L('commission on network projects', 'Provision auf Netzwerk-Projekte')}</span></li>
          <li><b>{L('System', 'System')} ≠ {L('product', 'Produkt')}</b><span>{L('clear ownership', 'klares Eigentum')}</span></li>
        </ul>
      </LevelHead>

      {/* 1 — The deal in one picture */}
      <section className="wrap" aria-labelledby="pt-flow-title">
        <p className="eyebrow">01 · {L('The deal in one picture', 'Der Deal in einem Bild')}</p>
        <h2 id="pt-flow-title" className="h2-sm">{L('You open doors. Rustam builds.', 'Du öffnest Türen. Rustam baut.')}</h2>
        <DealFlow />
      </section>

      {/* 2 — Two kinds of work */}
      <section className="wrap" aria-labelledby="pt-work-title">
        <p className="eyebrow">02 · {L('Two kinds of work', 'Zwei Arten von Arbeit')}</p>
        <h2 id="pt-work-title" className="h2-sm">{L('Your businesses: salary. New clients: salary + commission.', 'Deine Geschäfte: Gehalt. Neue Kunden: Gehalt + Provision.')}</h2>
        <Reveal className="pt-work">
          {workTypes.map((w) => (
            <article key={w.id} className={'pt-work-card ' + w.id}>
              <header>
                <span className="pt-icon" aria-hidden="true">{w.id === 'own' ? <Building2 size={22} /> : <Users size={22} />}</span>
                <div>
                  <h3>{t(w.title)}</h3>
                  <small>{t(w.examples)}</small>
                </div>
              </header>
              <ul>
                {w.items.map((it, i) => (
                  <li key={i}><Check size={16} aria-hidden="true" /> {t(it)}</li>
                ))}
              </ul>
              <p className="pt-pay">{t(w.pay)}</p>
            </article>
          ))}
        </Reveal>
      </section>

      {/* 3 — Timeline */}
      <section className="wrap" aria-labelledby="pt-time-title">
        <p className="eyebrow">03 · {L('Timeline', 'Zeitplan')}</p>
        <h2 id="pt-time-title" className="h2-sm">{L('Two years, three phases.', 'Zwei Jahre, drei Phasen.')}</h2>
        <Timeline />
      </section>

      {/* 4 — Commission */}
      <section className="wrap" aria-labelledby="pt-com-title">
        <p className="eyebrow">04 · {L('Commission', 'Provision')}</p>
        <h2 id="pt-com-title" className="h2-sm">{L('First your salary is covered. Then the upside goes to the builder.', 'Zuerst ist das Gehalt gedeckt. Dann geht der Gewinn an den, der baut.')}</h2>
        <TierBars />

        <div className="pt-calc">
          <div className="pt-calc-head">
            <label htmlFor="pt-rev">
              <small>{L('Net network-project revenue per year', 'Netto-Umsatz Netzwerk-Projekte pro Jahr')}</small>
              <output htmlFor="pt-rev">{euro(revenue)}</output>
            </label>
            <input
              id="pt-rev"
              type="range"
              min="0"
              max="400000"
              step="10000"
              value={revenue}
              onChange={(e) => setRevenue(Number(e.target.value))}
              aria-valuetext={euro(revenue)}
            />
            <div className="pt-presets" role="group" aria-label={L('Examples', 'Beispiele')}>
              {[50000, 100000, 200000, 300000].map((v) => (
                <button key={v} className="chip" aria-pressed={revenue === v} onClick={() => setRevenue(v)}>{euro(v)}</button>
              ))}
            </div>
          </div>

          <div className="pt-split" aria-hidden="true">
            <i className="r" style={{ width: revenue ? (s.commission / revenue) * 100 + '%' : '0%' }} />
            <i className="g" style={{ width: revenue ? (s.gerryShare / revenue) * 100 + '%' : '100%' }} />
          </div>

          <div className="pt-tiles" aria-live="polite">
            <div className="pt-tile r">
              <small>{L('Rustam · commission', 'Rustam · Provision')}</small>
              <b>{euro(s.commission)}</b>
              <span>{L(`+ base ${euro(BASE_YEAR)} = ${euro(s.rustamTotal)} gross`, `+ Basis ${euro(BASE_YEAR)} = ${euro(s.rustamTotal)} brutto`)}</span>
            </div>
            <div className="pt-tile g">
              <small>{L('Gerry · share of revenue', 'Gerry · Anteil am Umsatz')}</small>
              <b>{euro(s.gerryShare)}</b>
              <span>{L('before the salary cost', 'vor den Gehaltskosten')}</span>
            </div>
            <div className={'pt-tile g' + (s.gerryAfterSalary < 0 ? ' neg' : '')}>
              <small>{L('Gerry · after full salary cost', 'Gerry · nach vollen Gehaltskosten')}</small>
              <b>{euro(s.gerryAfterSalary)}</b>
              <span>{L(`salary cost ≈ ${euro(EMPLOYER_COST)} / year`, `Gehaltskosten ≈ ${euro(EMPLOYER_COST)} / Jahr`)}</span>
            </div>
          </div>

          <EarningsChart revenue={revenue} />
          <p className="caption muted">
            {L(
              `Salary cost includes ≈ 30% employer contributions (estimate). Commission is paid as salary, so employer contributions on it come on top, and both sides pay tax. The salary also pays for the setup of your own three businesses, which earns nothing here but is worth a lot.`,
              `Gehaltskosten inkl. ≈ 30 % Lohnnebenkosten (Schätzung). Die Provision wird als Gehalt ausbezahlt — Lohnnebenkosten darauf kommen dazu, Steuern zahlen beide Seiten. Das Gehalt deckt auch den Aufbau deiner drei eigenen Geschäfte, der hier nichts einbringt, aber viel wert ist.`,
            )}
          </p>
        </div>
      </section>

      {/* 5 — Ownership */}
      <section className="wrap" aria-labelledby="pt-own-title">
        <p className="eyebrow">05 · {L('Ownership', 'Eigentum')}</p>
        <h2 id="pt-own-title" className="h2-sm">{L('The toolbox stays with Rustam. The house belongs to you.', 'Der Werkzeugkasten bleibt bei Rustam. Das Haus gehört dir.')}</h2>
        <Ownership />
      </section>

      {/* 6 — Visa: Gerry's part */}
      <section className="wrap" aria-labelledby="pt-visa-title">
        <p className="eyebrow">06 · {L('The Red-White-Red Card', 'Die Rot-Weiß-Rot-Karte')}</p>
        <h2 id="pt-visa-title" className="h2-sm">{L('Your part: one contract, one form.', 'Dein Teil: ein Vertrag, ein Formular.')}</h2>
        <ol className="pt-steps">
          {visaSteps.map((v, i) => {
            const Icon = [FileSignature, ClipboardCheck, Landmark, Search, BadgeCheck][i];
            return (
              <li key={i} style={{ '--i': i }}>
                <span className="pt-step-icon" aria-hidden="true"><Icon size={20} /></span>
                <small>{L('Step', 'Schritt')} {i + 1}</small>
                <strong>{t(v.title)}</strong>
                <p>{t(v.body)}</p>
              </li>
            );
          })}
        </ol>
        <ul className="pt-facts">
          <li><b>{euro(218)}</b><span>{L('application fee', 'Antragsgebühr')}</span></li>
          <li><b>8 {L('weeks', 'Wochen')}</b><span>{L('max. decision time', 'max. Entscheidungsdauer')}</span></li>
          <li><b>2 {L('years', 'Jahre')}</b><span>{L('card validity, tied to your company', 'Gültigkeit, an deine Firma gebunden')}</span></li>
          <li><b>21 {L('months', 'Monate')}</b><span>{L('until the free RWR Card plus', 'bis zur freien RWR-Karte plus')}</span></li>
        </ul>
        <p className="caption muted">
          {L(
            'Category: Red-White-Red Card for graduates of Austrian universities. The job must match the degree and pay at least the local rate for graduates. Source: oesterreich.gv.at, checked 12 Oct 2026.',
            'Kategorie: Rot-Weiß-Rot-Karte für Absolvent:innen österreichischer Hochschulen. Der Job muss zum Studium passen und mindestens das ortsübliche Entgelt für Absolvent:innen zahlen. Quelle: oesterreich.gv.at, geprüft am 12.10.2026.',
          )}
        </p>
      </section>

      {/* 7 — Cost for Gerry */}
      <section className="wrap" aria-labelledby="pt-cost-title">
        <p className="eyebrow">07 · {L('Your cost', 'Deine Kosten')}</p>
        <h2 id="pt-cost-title" className="h2-sm">{L('What the role costs — and when it pays for itself.', 'Was die Rolle kostet — und wann sie sich selbst trägt.')}</h2>
        <div className="pt-cost">
          <div><small>{L('Gross salary', 'Bruttogehalt')}</small><b>{euro(BASE_MONTHLY)}</b><span>× {PAYMENTS} = {euro(BASE_YEAR)} / {L('year', 'Jahr')}</span></div>
          <ArrowRight className="pt-cost-arrow" aria-hidden="true" />
          <div><small>{L('Full employer cost', 'Volle Arbeitgeberkosten')}</small><b>≈ {euro(EMPLOYER_COST)}</b><span>{L('per year, estimate', 'pro Jahr, Schätzung')}</span></div>
          <ArrowRight className="pt-cost-arrow" aria-hidden="true" />
          <div className="hot"><small>{L('Covered at', 'Gedeckt ab')}</small><b>{euro(SALARY_COVERED_AT)}</b><span>{L('network revenue per year', 'Netzwerk-Umsatz pro Jahr')}</span></div>
        </div>
      </section>

      {/* 8 — Terms */}
      <section className="wrap" aria-labelledby="pt-terms-title">
        <p className="eyebrow">08 · {L('What we agree', 'Was wir vereinbaren')}</p>
        <h2 id="pt-terms-title" className="h2-sm">{L('The contract on one page.', 'Der Vertrag auf einer Seite.')}</h2>
        <dl className="pt-terms">
          {terms.map((x, i) => (
            <div key={i}>
              <dt>{t(x.k)}</dt>
              <dd>{t(x.v)}</dd>
            </div>
          ))}
        </dl>
        <div className="pt-after">
          <Repeat size={22} aria-hidden="true" />
          <p>
            <strong>{L('After month 21: ', 'Nach Monat 21: ')}</strong>
            {L(
              'with the RWR Card plus, Rustam is free to run his own studio full-time. The collaboration continues as a partnership — for example, Gerry refers clients for a 30% share. Terms to agree then.',
              'Mit der RWR-Karte plus darf Rustam sein eigenes Studio voll betreiben. Die Zusammenarbeit läuft als Partnerschaft weiter — zum Beispiel vermittelt Gerry Kunden gegen 30 % Anteil. Konditionen werden dann vereinbart.',
            )}
          </p>
        </div>
        <p className="caption muted disclaimer">
          {L(
            'Discussion draft, not a contract. Numbers are proposals. Final wording to be checked with a labour-law advisor; the visa is decided by the authority and the AMS.',
            'Diskussionsentwurf, kein Vertrag. Zahlen sind Vorschläge. Endgültige Formulierung mit einer arbeitsrechtlichen Beratung prüfen; über das Visum entscheiden Behörde und AMS.',
          )}
        </p>
      </section>
    </div>
  );
}

/* ---------- Deal flow ---------- */
function DealFlow() {
  const { L } = useApp();
  const nodes = [
    { id: 'client', icon: <Handshake size={26} />, title: L('Client', 'Kunde'), body: L('A multi-business owner from your network who wants the whole digital side unified and automated.', 'Ein Unternehmer mit mehreren Geschäften aus deinem Netzwerk, der sein Digitales vereinheitlicht und automatisiert haben will.') },
    { id: 'gerry', icon: <Users size={26} />, title: 'Gerry', body: L('Opens the door and makes the introduction.', 'Öffnet die Tür und stellt den Kontakt her.') },
    { id: 'company', icon: <Building2 size={26} />, title: L('Gerry’s company', 'Gerrys Firma'), body: L('Signs the deal, invoices the client, employs Rustam.', 'Unterschreibt, verrechnet dem Kunden, beschäftigt Rustam.') },
    { id: 'rustam', icon: <Code2 size={26} />, title: 'Rustam', body: L('One partner for everything digital — powered by the Convenium system.', 'Ein Partner für alles Digitale — getragen vom Convenium-System.') },
  ];
  return (
    <Reveal className="pt-flow" stagger={0.1}>
      {nodes.map((n, i) => (
        <React.Fragment key={n.id}>
          <div className={'pt-node ' + n.id}>
            <span className="pt-icon" aria-hidden="true">{n.icon}</span>
            <strong>{n.title}</strong>
            <p>{n.body}</p>
          </div>
          {i < nodes.length - 1 && (
            <div className="pt-link" aria-hidden="true">
              <ArrowRight className="h" size={22} />
              <ArrowDown className="v" size={22} />
            </div>
          )}
        </React.Fragment>
      ))}
      <div className="pt-money">
        <Euro size={18} aria-hidden="true" />
        <span>{L('Money flow:', 'Geldfluss:')}</span>
        <b>{L('Client pays your company', 'Kunde zahlt deine Firma')}</b>
        <ArrowRight size={16} aria-hidden="true" />
        <b>{L('your company pays Rustam salary + commission', 'deine Firma zahlt Rustam Gehalt + Provision')}</b>
      </div>
    </Reveal>
  );
}

/* ---------- Timeline ---------- */
function Timeline() {
  const { t, L } = useApp();
  const ticks = [0, 6, 12, 18, 24];
  return (
    <figure className="pt-time chart">
      <div className="pt-time-rows">
        {timeline.map((r) => (
          <div key={r.id} className={'pt-time-row ' + r.kind}>
            <div className="pt-time-label">
              <strong>{t(r.label)}</strong>
              <small>{t(r.note)}</small>
            </div>
            <div className="pt-time-track">
              <i style={{ left: (r.from / TIMELINE_MONTHS) * 100 + '%', width: ((r.to - r.from) / TIMELINE_MONTHS) * 100 + '%' }} />
            </div>
          </div>
        ))}
        <div className="pt-time-row axis" aria-hidden="true">
          <div className="pt-time-label" />
          <div className="pt-time-track">
            {ticks.map((m) => (
              <span key={m} style={{ left: (m / TIMELINE_MONTHS) * 100 + '%' }}>{L(`M${m}`, `M${m}`)}</span>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="caption muted">
        {L(
          'Months from signing. Setup and network projects overlap: introductions can start while the last setup work finishes.',
          'Monate ab Unterschrift. Aufbau und Netzwerk-Projekte überlappen: Kontakte können starten, während der letzte Aufbau läuft.',
        )}
      </figcaption>
    </figure>
  );
}

/* ---------- Tier bars ---------- */
function TierBars() {
  const { L, euro, lang } = useApp();
  const rows = [
    { band: L(`First ${euro(TIER_LIMIT)}`, `Erste ${euro(TIER_LIMIT)}`), why: L('Your salary cost is recovered first', 'Zuerst holst du die Gehaltskosten herein'), r: LOW_RATE },
    { band: L(`Above ${euro(TIER_LIMIT)}`, `Über ${euro(TIER_LIMIT)}`), why: L('The builder takes the bigger share', 'Wer baut, bekommt den größeren Teil'), r: HIGH_RATE },
  ];
  return (
    <div className="pt-tiers" role="table" aria-label={L('Commission bands per contract year', 'Provisionsstufen pro Vertragsjahr')}>
      {rows.map((row, i) => (
        <div key={i} className="pt-tier" role="row">
          <div role="rowheader">
            <strong>{row.band}</strong>
            <small>{row.why}</small>
          </div>
          <div role="cell">
            <div className="pt-tier-bar" aria-hidden="true">
              <i className="r" style={{ width: pct(row.r) }} />
              <i className="g" style={{ width: pct(1 - row.r) }} />
            </div>
            <div className="pt-tier-legend">
              <span className="r">Rustam {pct(row.r, lang === 'de')}</span>
              <span className="g">Gerry {pct(1 - row.r, lang === 'de')}</span>
            </div>
          </div>
        </div>
      ))}
      <p className="caption muted">{L('Net revenue = project revenue minus direct project costs (freelancers, software, ads). Bands restart every contract year.', 'Netto-Umsatz = Projektumsatz minus direkte Projektkosten (Freelancer, Software, Werbung). Die Stufen starten jedes Vertragsjahr neu.')}</p>
    </div>
  );
}

/* ---------- Earnings chart ---------- */
function EarningsChart({ revenue }) {
  const { L, euro } = useApp();
  const clip = useId().replace(/:/g, '');
  // Size to the container so labels stay a readable 11px on phones and desktops alike.
  const box = useRef(null);
  const [W, setW] = useState(720);
  useEffect(() => {
    if (!box.current || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(280, Math.round(e.contentRect.width))));
    ro.observe(box.current);
    return () => ro.disconnect();
  }, []);
  const narrow = W < 520;
  const H = narrow ? 260 : 320, m = { t: 20, r: 16, b: 36, l: narrow ? 40 : 56 };
  const max = 400000;
  const x = scaleLinear().domain([0, max]).range([m.l, W - m.r]);
  const y = scaleLinear().domain([-80000, 220000]).range([H - m.b, m.t]);
  const pts = Array.from({ length: 41 }, (_, i) => i * 10000);
  const rustam = line().x((d) => x(d)).y((d) => y(split(d).commission))(pts);
  const gerry = line().x((d) => x(d)).y((d) => y(split(d).gerryAfterSalary))(pts);
  const cur = split(revenue);
  const kfmt = (v) => (v === 0 ? '0' : (v / 1000).toFixed(0) + 'k');
  const table = {
    head: [L('Revenue', 'Umsatz'), L('Rustam commission', 'Rustam Provision'), L('Gerry after salary cost', 'Gerry nach Gehaltskosten')],
    rows: [50000, 100000, 150000, 200000, 300000, 400000].map((v) => [euro(v), euro(split(v).commission), euro(split(v).gerryAfterSalary)]),
  };
  return (
    <ChartFrame
      className="pt-earn"
      title={L('Who earns what as revenue grows', 'Wer was verdient, wenn der Umsatz wächst')}
      note={L('Yearly, in euros. Gerry’s line is after the full salary cost.', 'Pro Jahr, in Euro. Gerrys Linie ist nach den vollen Gehaltskosten.')}
      legend={[{ label: L('Rustam · commission', 'Rustam · Provision'), color: 'var(--accent)' }, { label: L('Gerry · after salary cost', 'Gerry · nach Gehaltskosten'), color: 'var(--fg)' }]}
      table={table}
    >
      <div className="plot" ref={box}>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} role="img" aria-label={L(`At ${euro(revenue)}: Rustam ${euro(cur.commission)} commission, Gerry ${euro(cur.gerryAfterSalary)} after salary cost.`, `Bei ${euro(revenue)}: Rustam ${euro(cur.commission)} Provision, Gerry ${euro(cur.gerryAfterSalary)} nach Gehaltskosten.`)}>
          <defs>
            <clipPath id={clip}><rect x={m.l} y={m.t} width={W - m.l - m.r} height={H - m.t - m.b} /></clipPath>
          </defs>
          {[-50000, 0, 50000, 100000, 150000, 200000].map((v) => (
            <g key={v}>
              <line className={v === 0 ? 'zero' : 'grid'} x1={m.l} x2={W - m.r} y1={y(v)} y2={y(v)} />
              <text className="axis-label" x={m.l - 10} y={y(v) + 4} textAnchor="end">{kfmt(v)}</text>
            </g>
          ))}
          {(narrow ? [0, 200000, 400000] : [0, 100000, 200000, 300000, 400000]).map((v) => (
            <text key={v} className="axis-label" x={x(v)} y={H - m.b + 22} textAnchor="middle">{kfmt(v)}</text>
          ))}
          {/* markers */}
          <line className="pt-mark" x1={x(SALARY_COVERED_AT)} x2={x(SALARY_COVERED_AT)} y1={m.t} y2={H - m.b} />
          <text className="pt-mark-label" x={x(SALARY_COVERED_AT) + 6} y={y(-60000)}>{L('salary covered', 'Gehalt gedeckt')}</text>
          <line className="pt-mark" x1={x(TIER_LIMIT)} x2={x(TIER_LIMIT)} y1={m.t} y2={H - m.b} />
          <text className="pt-mark-label" x={x(TIER_LIMIT) + 6} y={y(200000)}>{L('70/30 starts', '70/30 beginnt')}</text>
          <g clipPath={`url(#${clip})`}>
            <path d={gerry} className="pt-line g" />
            <path d={rustam} className="pt-line r" />
          </g>
          {/* current value */}
          <line className="pt-cur" x1={x(revenue)} x2={x(revenue)} y1={m.t} y2={H - m.b} />
          <circle className="pt-dot r" cx={x(revenue)} cy={y(Math.min(cur.commission, 220000))} r="6" />
          <circle className="pt-dot g" cx={x(revenue)} cy={y(Math.max(Math.min(cur.gerryAfterSalary, 220000), -80000))} r="6" />
        </svg>
      </div>
    </ChartFrame>
  );
}

/* ---------- Ownership ---------- */
function Ownership() {
  const { t, L } = useApp();
  return (
    <Reveal className="pt-own">
      <div className="pt-own-col r">
        <header>
          <span className="pt-icon" aria-hidden="true"><Lock size={22} /></span>
          <div>
            <h3>{L('Rustam keeps', 'Rustam behält')}</h3>
            <small>{L('The system he builds with', 'Das System, mit dem er baut')}</small>
          </div>
        </header>
        <ul>{ownership.rustam.map((x, i) => <li key={i}>{t(x)}</li>)}</ul>
      </div>
      <div className="pt-own-mid">
        <span className="pt-icon big" aria-hidden="true"><KeyRound size={26} /></span>
        <strong>{L('Free, permanent licence', 'Freie, dauerhafte Lizenz')}</strong>
        <p>{L('Gerry may use the system parts inside his products forever — even if the collaboration ends.', 'Gerry darf die System-Teile in seinen Produkten für immer nutzen — auch wenn die Zusammenarbeit endet.')}</p>
        <ArrowRight className="h" aria-hidden="true" />
        <ArrowDown className="v" aria-hidden="true" />
      </div>
      <div className="pt-own-col g">
        <header>
          <span className="pt-icon" aria-hidden="true"><Building2 size={22} /></span>
          <div>
            <h3>{L('Gerry owns', 'Gerry gehört')}</h3>
            <small>{L('Everything made for him', 'Alles, was für ihn gemacht wird')}</small>
          </div>
        </header>
        <ul>{ownership.gerry.map((x, i) => <li key={i}>{t(x)}</li>)}</ul>
      </div>
    </Reveal>
  );
}
