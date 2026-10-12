import React from 'react';
import { useApp } from '../../lib/store.jsx';
import { seasonality, months, monthNames } from '../../data/insights.js';
import ChartFrame, { useTip } from './ChartFrame.jsx';

// Sequential single-hue (ink on cream) — magnitude of guest/client attention per month.
const shade = ['#E4E0D0', '#C4BCA8', '#8E8576', '#4A423C'];
const levelWord = (v, L) => [L('quiet', 'ruhig'), L('low', 'gering'), L('medium', 'mittel'), L('peak', 'Spitze')][v];

function SeasonRow({ s, first }) {
  const { t, L } = useApp();
  const tip = useTip();
  const cw = 52, ch = 46, left = 0, top = 26;
  return (
          <div className="season-row" key={s.id}>
            <div className="season-label">
              <strong>{s.name}</strong>
              <small>{t(s.why)}</small>
            </div>
            <div className="plot">
              <svg viewBox={`0 0 ${cw * 12} ${ch + top}`} role="img" aria-label={s.name + ': ' + t(s.why)}>
                {first &&
                  months.map((m, i) => (
                    <text key={i} x={left + i * cw + cw / 2} y={14} textAnchor="middle" className="axis-label">{m}</text>
                  ))}
                {s.demand.map((v, i) => {
                  const working = s.work.includes(i);
                  const content = (
                    <>
                      <b>{s.name} · {t(monthNames[i])}</b>
                      <span>{L('Demand', 'Nachfrage')}: {levelWord(v, L)}</span>
                      {working && <span className="tip-accent">{L('We build in this month', 'In diesem Monat bauen wir')}</span>}
                    </>
                  );
                  return (
                    <g key={i} tabIndex="0" onMouseEnter={(e) => tip.show(e, content)} onMouseLeave={tip.hide} onFocus={(e) => tip.showAt(e.currentTarget, content)} onBlur={tip.hide}>
                      <rect x={left + i * cw + 1} y={top} width={cw - 2} height={ch} rx="4" fill={shade[v]} />
                      {working && <rect x={left + i * cw + 4} y={top + 3} width={cw - 8} height={ch - 6} rx="3" fill="none" stroke="var(--cherry)" strokeWidth="2.5" />}
                    </g>
                  );
                })}
              </svg>
              {tip.node}
            </div>
          </div>
  );
}

export default function Seasonality() {
  const { t, L } = useApp();
  return (
    <ChartFrame
      className="season"
      title={L('Why the Villa waits for winter', 'Warum die Villa auf den Winter wartet')}
      note={L('Conceptual demand rhythm from general destination seasonality — not booking data. Outlined cells = when we build.', 'Konzeptioneller Nachfragerhythmus aus allgemeiner Destinations-Saisonalität – keine Buchungsdaten. Umrandete Zellen = Bauphase.')}
      table={{
        head: [L('Business', 'Geschäft'), ...months.map((m, i) => t(monthNames[i]).slice(0, 3))],
        rows: seasonality.map((s) => [s.name, ...s.demand.map((v) => levelWord(v, L))]),
      }}
    >
      <div className="season-grid">
        {seasonality.map((s, i) => <SeasonRow key={s.id} s={s} first={i === 0} />)}
      </div>
      <ul className="legend scale">
        {shade.map((c, i) => (
          <li key={i}><i style={{ background: c }} />{levelWord(i, L)}</li>
        ))}
        <li><i className="outline" />{L('build window', 'Bauphase')}</li>
      </ul>
    </ChartFrame>
  );
}
