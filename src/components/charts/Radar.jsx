import React, { useState } from 'react';
import { useApp, tabKeyDown } from '../../lib/store.jsx';
import { axes, maturity, levelNames } from '../../data/insights.js';
import { businesses } from '../../data/businesses.js';
import { brand } from '../../data/levels.js';
import ChartFrame, { useTip } from './ChartFrame.jsx';

const SIZE = 340, C = SIZE / 2, R = 120;
const point = (i, v, n) => {
  const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
  const r = (v / 3) * R;
  return [C + Math.cos(a) * r, C + Math.sin(a) * r];
};
const poly = (vals) => vals.map((v, i) => point(i, v, vals.length).join(',')).join(' ');

export default function Radar() {
  const { t, L } = useApp();
  const [sel, setSel] = useState(0);
  const tip = useTip();
  const biz = businesses[sel];
  const data = maturity[biz.id];
  const color = brand[biz.id].light;
  const n = axes.length;

  return (
    <ChartFrame
      className="radar"
      title={L('Starting point vs planned', 'Ausgangslage vs Plan')}
      note={L('Maturity 0–3 · today = our assessment from the public sites, to confirm together · not performance data', 'Reifegrad 0–3 · heute = unsere Einschätzung anhand der Websites, gemeinsam zu prüfen · keine Leistungsdaten')}
      legend={[
        { label: L('Today', 'Heute'), color: '#8a837a', dashed: true },
        { label: L('Planned', 'Geplant') + ' · ' + t(data.when), color },
      ]}
      table={{
        head: [L('Area', 'Bereich'), L('Today', 'Heute'), L('Planned', 'Geplant')],
        rows: axes.map((a, i) => [t(a), t(levelNames[data.today[i]]), t(levelNames[data.planned[i]])]),
      }}
    >
      <div className="seg" role="tablist" aria-label={L('Business', 'Geschäft')}>
        {businesses.map((b, i) => (
          <button key={b.id} role="tab" aria-selected={sel === i} tabIndex={sel === i ? 0 : -1} onClick={() => setSel(i)} onKeyDown={(e) => tabKeyDown(e, i, businesses.length, setSel)} style={{ '--c': brand[b.id].light }}>
            {b.name}
          </button>
        ))}
      </div>
      <div className="plot">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={L(`Radar chart for ${biz.name}`, `Netzdiagramm für ${biz.name}`)}>
          {[1, 2, 3].map((lv) => (
            <polygon key={lv} points={poly(Array(n).fill(lv))} className="grid" />
          ))}
          {axes.map((a, i) => {
            const [x, y] = point(i, 3, n);
            const [lx, ly] = point(i, 3.62, n);
            return (
              <g key={i}>
                <line x1={C} y1={C} x2={x} y2={y} className="grid" />
                <text x={lx} y={ly} textAnchor={Math.abs(lx - C) < 8 ? 'middle' : lx > C ? 'start' : 'end'} dominantBaseline="middle" className="axis-label">
                  {t(a)}
                </text>
              </g>
            );
          })}
          <polygon points={poly(data.today)} className="series-today" />
          <polygon points={poly(data.planned)} className="series-planned" style={{ fill: color, stroke: color }} />
          {data.planned.map((v, i) => {
            const [x, y] = point(i, v, n);
            const content = (
              <>
                <b>{t(axes[i])}</b>
                <span>{L('Today', 'Heute')}: {t(levelNames[data.today[i]])}</span>
                <span>{L('Planned', 'Geplant')}: {t(levelNames[v])}</span>
              </>
            );
            return (
              <g key={i} tabIndex="0" onMouseEnter={(e) => tip.show(e, content)} onMouseLeave={tip.hide} onFocus={(e) => tip.showAt(e.currentTarget, content)} onBlur={tip.hide}>
                <circle cx={x} cy={y} r="14" fill="transparent" />
                <circle cx={x} cy={y} r="5" fill={color} stroke="var(--surface)" strokeWidth="2" />
              </g>
            );
          })}
        </svg>
        {tip.node}
      </div>
    </ChartFrame>
  );
}
