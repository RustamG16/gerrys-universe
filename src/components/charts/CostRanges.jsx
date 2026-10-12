import React from 'react';
import { scaleLinear } from 'd3-scale';
import { ExternalLink } from 'lucide-react';
import { useApp } from '../../lib/store.jsx';
import { marketRanges } from '../../data/estimate.js';
import ChartFrame, { useTip } from './ChartFrame.jsx';

// Dumbbell ranges on one euro axis: the ChatGPT benchmark against independent Austrian references.
export default function CostRanges() {
  const { t, L, euro } = useApp();
  const tip = useTip();
  const W = 640, ROW = 52, P = { l: 12, r: 24, t: 30 };
  const x = scaleLinear().domain([0, 26000]).range([P.l, W - P.r]);
  const H = P.t + marketRanges.length * ROW;
  return (
    <ChartFrame
      className="ranges"
      title={L('What an agency would charge (net)', 'Was eine Agentur verlangen würde (netto)')}
      note={L('Euro ranges excl. 20% VAT. Sources linked below; agency guides have a commercial interest.', 'Euro-Spannen exkl. 20 % USt. Quellen unten verlinkt; Agenturratgeber haben ein kommerzielles Interesse.')}
      table={{ head: [L('Reference', 'Referenz'), L('From', 'Von'), L('To', 'Bis')], rows: marketRanges.map((m) => [t(m.label), euro(m.range[0]), euro(m.range[1])]) }}
    >
      <div className="plot">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={L('Range chart of agency prices', 'Spannendiagramm der Agenturpreise')}>
          {x.ticks(5).map((v) => (
            <g key={v}>
              <line x1={x(v)} x2={x(v)} y1={P.t - 8} y2={H} className="grid" />
              <text x={x(v)} y={14} textAnchor="middle" className="axis-label">{v === 0 ? '€0' : `€${v / 1000}k`}</text>
            </g>
          ))}
          {marketRanges.map((m, i) => {
            const y = P.t + i * ROW + 30;
            const content = (
              <>
                <b>{t(m.label)}</b>
                <span>{euro(m.range[0])} – {euro(m.range[1])}</span>
                <span>{t(m.note)}</span>
              </>
            );
            return (
              <g key={i} className={m.highlight ? 'hl' : ''} onMouseEnter={(e) => tip.show(e, content)} onMouseLeave={tip.hide}>
                <rect x={0} y={y - 26} width={W} height={ROW} fill="transparent" />
                <text x={x(m.range[0])} y={y - 12} className="range-label">{t(m.label)}</text>
                <line x1={x(m.range[0])} x2={x(m.range[1])} y1={y} y2={y} className="range-bar" />
                <circle cx={x(m.range[0])} cy={y} r="6" className="range-end" />
                <circle cx={x(m.range[1])} cy={y} r="6" className="range-end" />
              </g>
            );
          })}
        </svg>
        {tip.node}
      </div>
      <ul className="sources">
        {marketRanges.filter((m) => m.url).map((m, i) => (
          <li key={i}>
            <a href={m.url} target="_blank" rel="noreferrer">{t(m.note)} <ExternalLink size={12} /></a>
          </li>
        ))}
      </ul>
    </ChartFrame>
  );
}
