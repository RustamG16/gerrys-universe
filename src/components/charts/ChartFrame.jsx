import React, { useState } from 'react';
import { Table2, BarChart3 } from 'lucide-react';
import { useApp } from '../../lib/store.jsx';

// Shared chart chrome: title, note, legend, and a table view so identity is never colour-alone.
export default function ChartFrame({ title, note, legend, table, children, className = '' }) {
  const { L } = useApp();
  const [asTable, setAsTable] = useState(false);
  return (
    <figure className={'chart ' + className}>
      <div className="chart-top">
        <figcaption>
          <h3>{title}</h3>
          {note && <p className="caption muted">{note}</p>}
        </figcaption>
        {table && (
          <button className="chip" onClick={() => setAsTable(!asTable)} aria-pressed={asTable}>
            {asTable ? <BarChart3 size={14} /> : <Table2 size={14} />}
            {asTable ? L('Chart', 'Diagramm') : L('Table', 'Tabelle')}
          </button>
        )}
      </div>
      {legend && legend.length > 1 && (
        <ul className="legend">
          {legend.map((l) => (
            <li key={l.label}>
              <i style={{ background: l.color, borderStyle: l.dashed ? 'dashed' : 'solid', borderColor: l.color }} className={l.dashed ? 'dashed' : ''} />
              {l.label}
            </li>
          ))}
        </ul>
      )}
      {asTable && table ? (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>{table.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr>
            </thead>
            <tbody>
              {table.rows.map((r, i) => (
                <tr key={i}>{r.map((c, j) => (j === 0 ? <th key={j} scope="row">{c}</th> : <td key={j}>{c}</td>))}</tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        children
      )}
    </figure>
  );
}

// Lightweight tooltip state for SVG charts.
export function useTip() {
  const [tip, setTip] = useState(null);
  const show = (e, content) => {
    const box = e.currentTarget.ownerSVGElement?.parentElement?.getBoundingClientRect() || e.currentTarget.getBoundingClientRect();
    const x = (e.clientX ?? box.left + box.width / 2) - box.left;
    const y = (e.clientY ?? box.top + 20) - box.top;
    setTip({ x, y, content });
  };
  const showAt = (el, content) => {
    const box = el.ownerSVGElement.parentElement.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setTip({ x: r.left + r.width / 2 - box.left, y: r.top - box.top, content });
  };
  const hide = () => setTip(null);
  const node = tip ? (
    <div className="tip" style={{ left: tip.x, top: tip.y }} role="tooltip">
      {tip.content}
    </div>
  ) : null;
  return { show, showAt, hide, node };
}
