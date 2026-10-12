import React, { useMemo } from 'react';
import { scaleTime } from 'd3-scale';
import { timeMonth } from 'd3-time';
import { Lock, HelpCircle } from 'lucide-react';
import { useApp } from '../../lib/store.jsx';
import { quests, tracks, PLAN_RANGE } from '../../data/plan.js';
import { brand } from '../../data/levels.js';
import { monthNames } from '../../data/insights.js';
import { useTip } from './ChartFrame.jsx';

const W = 1100, LABEL = 0, ROW = 34, GAP = 10, HEAD = 34, TRACKHEAD = 26;

export default function QuestGantt({ selected, onSelect, secret }) {
  const { t, L, lang } = useApp();
  const tip = useTip();
  const x = useMemo(() => scaleTime().domain(PLAN_RANGE.map((d) => new Date(d))).range([LABEL + 8, W - 8]), []);
  const months = x.ticks(timeMonth.every(1)).filter((m) => m >= x.domain()[0]);
  const today = new Date();
  const todayIn = today >= x.domain()[0] && today <= x.domain()[1];

  // Layout: track header + one row per quest.
  let y = HEAD;
  const layout = tracks.map((tr) => {
    const top = y;
    y += TRACKHEAD;
    const rows = quests.filter((q) => q.track === tr.id).map((q) => {
      const row = { q, y };
      y += ROW;
      return row;
    });
    y += GAP;
    return { tr, top, rows };
  });
  const H = y;
  const fmt = (d) => new Intl.DateTimeFormat(lang === 'de' ? 'de-AT' : 'en-GB', { day: 'numeric', month: 'short' }).format(new Date(d));

  return (
    <div className="gantt-scroll" tabIndex="0" aria-label={L('Mission timeline, scroll horizontally on small screens', 'Missions-Zeitleiste, auf kleinen Bildschirmen horizontal scrollen')}>
      <div className="plot gantt">
        <svg viewBox={`0 0 ${W} ${H}`} role="group" aria-label={L('Quest timeline October 2026 to April 2027', 'Quest-Zeitleiste Oktober 2026 bis April 2027')}>
          {months.map((m) => (
            <g key={+m}>
              <line x1={x(m)} x2={x(m)} y1={HEAD - 8} y2={H} className="grid" />
              <text x={x(m) + 6} y={18} className="axis-label">
                {t(monthNames[m.getMonth()]).slice(0, 3)}{m.getMonth() === 0 || +m === +months[0] ? ' ' + m.getFullYear() : ''}
              </text>
            </g>
          ))}
          {layout.map(({ tr, top, rows }) => {
            const hidden = tr.secret && !secret;
            const c = brand[tr.color].dark;
            return (
              <g key={tr.id}>
                <text x={8} y={top + 17} className="track-label" fill={c}>
                  {t(tr.name)} {tr.locked ? '🔒' : ''}{hidden ? ' ???' : ''}
                </text>
                {rows.map(({ q, y: ry }) => {
                  const x0 = x(new Date(q.start)), x1 = x(new Date(q.end + 'T23:59'));
                  const on = selected === q.id;
                  const content = hidden ? (
                    <b>{L('Secret quest — unlock below', 'Geheime Quest – unten freischalten')}</b>
                  ) : (
                    <>
                      <b>{q.id} · {t(q.title)}</b>
                      <span>{fmt(q.start)} → {fmt(q.end)}</span>
                      <span>{q.owner}</span>
                    </>
                  );
                  return (
                    <g
                      key={q.id}
                      className={'bar' + (on ? ' on' : '') + (hidden ? ' hidden' : '') + (tr.locked ? ' locked' : '')}
                      role="button"
                      tabIndex="0"
                      aria-pressed={on}
                      aria-label={hidden ? L('Secret quest', 'Geheime Quest') : `${q.id} ${t(q.title)}, ${fmt(q.start)} – ${fmt(q.end)}`}
                      onClick={() => !hidden && onSelect(q.id)}
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && !hidden && (e.preventDefault(), onSelect(q.id))}
                      onMouseEnter={(e) => tip.show(e, content)}
                      onMouseLeave={tip.hide}
                      onFocus={(e) => tip.showAt(e.currentTarget.querySelector('rect.fill'), content)}
                      onBlur={tip.hide}
                    >
                      <rect x={x0 - 4} y={ry} width={Math.max(x1 - x0 + 8, 40)} height={ROW - 6} fill="transparent" />
                      <rect className="fill" x={x0} y={ry + 3} width={Math.max(x1 - x0, 6)} height={ROW - 12} rx="4" fill={hidden ? 'transparent' : c} stroke={c} strokeDasharray={hidden ? '4 4' : undefined} />
                      {(() => {
                        const text = hidden ? '???' : `${q.id} · ${t(q.title)}`;
                        const w = Math.max(x1 - x0, 6);
                        const inside = !hidden && w > text.length * 7 + 20;
                        const after = x1 + 8 + text.length * 7 < W;
                        return (
                          <text x={inside ? x0 + 10 : after ? x1 + 8 : x0 - 8} textAnchor={inside || after ? 'start' : 'end'} y={ry + ROW / 2 + 1} dominantBaseline="middle" className={'bar-label' + (inside ? ' inside' : '')}>
                            {text}
                          </text>
                        );
                      })()}
                    </g>
                  );
                })}
              </g>
            );
          })}
          <g className="milestone">
            <line x1={x(new Date('2026-10-19'))} x2={x(new Date('2026-10-19'))} y1={HEAD - 8} y2={H} />
            <text x={x(new Date('2026-10-19')) + 4} y={H - 4} className="axis-label">{L('Kickoff', 'Start')}</text>
          </g>
          {todayIn && (
            <g className="today">
              <line x1={x(today)} x2={x(today)} y1={HEAD - 8} y2={H} />
              <text x={x(today) - 4} y={H - 4} textAnchor="end" className="axis-label">{L('Today', 'Heute')}</text>
            </g>
          )}
        </svg>
        {tip.node}
      </div>
      <p className="gantt-keys caption muted">
        <Lock size={12} /> {L('Locked = planned for the off-season', 'Gesperrt = für die Nebensaison geplant')} · <HelpCircle size={12} /> {L('??? = secret level', '??? = Geheimlevel')}
      </p>
    </div>
  );
}
