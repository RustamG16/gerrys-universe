import React, { useState } from 'react';
import { useApp } from '../../lib/store.jsx';
import { stages, journey } from '../../data/insights.js';
import { businesses } from '../../data/businesses.js';
import { brand } from '../../data/levels.js';
import ChartFrame from './ChartFrame.jsx';

// Journey stage × business. Cell = the planned deliverables that serve that stage. Click a stage to focus it.
export default function JourneyMatrix() {
  const { t, L } = useApp();
  const [focus, setFocus] = useState(null);
  return (
    <ChartFrame
      className="journey-matrix"
      title={L('Every post leads somewhere', 'Jeder Beitrag führt irgendwohin')}
      note={L('Customer journey × business — what we build for each step. Select a step to focus.', 'Kundenreise × Geschäft – was wir für jeden Schritt bauen. Schritt wählen zum Fokussieren.')}
    >
      <div className="jm" style={{ '--cols': stages.length }}>
        <div className="jm-corner" />
        {stages.map((s, i) => (
          <button key={i} className={'jm-stage' + (focus === i ? ' on' : '')} aria-pressed={focus === i} onClick={() => setFocus(focus === i ? null : i)}>
            <span>0{i + 1}</span>
            {t(s)}
          </button>
        ))}
        {businesses.map((b) => (
          <React.Fragment key={b.id}>
            <div className="jm-biz" style={{ '--c': brand[b.id].light }}>
              <i />
              {b.name}
            </div>
            {journey[b.id].map((cell, i) => (
              <div key={i} data-stage={t(stages[i])} className={'jm-cell' + (focus !== null && focus !== i ? ' dim' : '')} style={{ '--c': brand[b.id].light, '--n': cell.length }}>
                {cell.map((d, j) => (
                  <span key={j}>{t(d)}</span>
                ))}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </ChartFrame>
  );
}
