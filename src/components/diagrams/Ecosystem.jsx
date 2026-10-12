import React, { useState } from 'react';
import { useApp } from '../../lib/store.jsx';
import { nodes, edges } from '../../data/insights.js';
import { brand } from '../../data/levels.js';

const fillFor = (n) => (n.color === 'ink' ? '#241F1F' : brand[n.color].light);

// Interactive ecosystem: select a node to highlight its connections and read what it does.
export default function Ecosystem() {
  const { t, L, paused } = useApp();
  const [active, setActive] = useState('hq');
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const linked = (id) => edges.some(([a, b]) => (a === active && b === id) || (b === active && a === id));
  const current = byId[active];

  return (
    <figure className={'chart ecosystem' + (paused ? ' still' : '')}>
      <div className="chart-top">
        <figcaption>
          <h3>{L('One system, many worlds', 'Ein System, viele Welten')}</h3>
          <p className="caption muted">{L('Select a node to see what it connects to.', 'Knoten wählen, um die Verbindungen zu sehen.')}</p>
        </figcaption>
      </div>
      <div className="eco-wrap">
        <svg viewBox="0 0 1000 560" role="group" aria-label={L('Ecosystem diagram', 'Ökosystem-Diagramm')}>
          {edges.map(([a, b]) => {
            const A = byId[a], B = byId[b];
            const on = a === active || b === active;
            const secret = A.secret || B.secret;
            return (
              <line
                key={a + b}
                x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                className={'edge' + (on ? ' on' : '') + (secret ? ' secret' : '')}
                style={on ? { stroke: fillFor(current) } : undefined}
              />
            );
          })}
          {nodes.map((n) => {
            const on = n.id === active, near = linked(n.id);
            return (
              <g
                key={n.id}
                className={'node' + (on ? ' on' : '') + (near ? ' near' : '') + (n.secret ? ' secret' : '')}
                transform={`translate(${n.x} ${n.y})`}
                role="button"
                tabIndex="0"
                aria-pressed={on}
                aria-label={t(n.label)}
                onClick={() => setActive(n.id)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setActive(n.id))}
              >
                <circle r={n.r + 10} className="halo" style={{ stroke: fillFor(n) }} />
                <circle r={n.r} style={{ fill: n.secret ? 'transparent' : fillFor(n), stroke: fillFor(n) }} className="core" />
                <text y={4} textAnchor="middle" className={'node-label' + (n.secret ? ' ink' : '')}>
                  {t(n.label)}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="eco-detail" aria-live="polite">
          <span className="dot" style={{ background: fillFor(current) }} />
          <strong>{t(current.label)}</strong>
          <p>{t(current.body)}</p>
        </div>
      </div>
    </figure>
  );
}
