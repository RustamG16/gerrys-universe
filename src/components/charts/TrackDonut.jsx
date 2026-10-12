import React from 'react';
import { arc, pie } from 'd3-shape';
import { useApp } from '../../lib/store.jsx';
import { quests, tracks } from '../../data/plan.js';
import { brand } from '../../data/levels.js';
import ChartFrame, { useTip } from './ChartFrame.jsx';

const days = (a, b) => (new Date(b) - new Date(a)) / 86400000 + 1;

// Share of planned quest-weeks per track, computed from the mission plan itself.
export default function TrackDonut() {
  const { t, L } = useApp();
  const tip = useTip();
  const data = tracks.map((tr) => ({
    ...tr,
    weeks: Math.round(quests.filter((q) => q.track === tr.id).reduce((s, q) => s + days(q.start, q.end), 0) / 7),
    count: quests.filter((q) => q.track === tr.id).length,
  }));
  const total = data.reduce((s, d) => s + d.weeks, 0);
  const arcs = pie().value((d) => d.weeks).sort(null).padAngle(0.02)(data);
  const make = arc().innerRadius(78).outerRadius(118).cornerRadius(4);

  return (
    <ChartFrame
      className="donut"
      title={L('Where the effort goes', 'Wohin der Aufwand fließt')}
      note={L('Quest-weeks per track, summed from the mission plan (parallel quests count separately).', 'Quest-Wochen pro Spur, summiert aus dem Missionsplan (parallele Quests zählen einzeln).')}
      legend={data.map((d) => ({ label: t(d.name), color: brand[d.color].light }))}
      table={{ head: [L('Track', 'Spur'), L('Quests', 'Quests'), L('Quest-weeks', 'Quest-Wochen')], rows: data.map((d) => [t(d.name), d.count, d.weeks]) }}
    >
      <div className="plot donut-plot">
        <svg viewBox="-130 -130 260 260" role="img" aria-label={L('Donut chart of effort per track', 'Ringdiagramm des Aufwands pro Spur')}>
          {arcs.map((a) => {
            const content = (
              <>
                <b>{t(a.data.name)}</b>
                <span>{a.data.count} {L('quests', 'Quests')} · {a.data.weeks} {L('quest-weeks', 'Quest-Wochen')}</span>
                <span>{Math.round((a.data.weeks / total) * 100)}%</span>
              </>
            );
            return (
              <path
                key={a.data.id}
                d={make(a)}
                fill={brand[a.data.color].light}
                stroke="var(--surface)"
                strokeWidth="2"
                tabIndex="0"
                onMouseEnter={(e) => tip.show(e, content)}
                onMouseLeave={tip.hide}
                onFocus={(e) => tip.showAt(e.currentTarget, content)}
                onBlur={tip.hide}
              />
            );
          })}
          <text textAnchor="middle" y="-4" className="donut-big">{quests.length}</text>
          <text textAnchor="middle" y="22" className="axis-label">{L('quests', 'Quests')}</text>
        </svg>
        {tip.node}
      </div>
    </ChartFrame>
  );
}
