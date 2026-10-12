import React, { useState } from 'react';
import { ExternalLink, Minus, Plus } from 'lucide-react';
import { useApp } from '../lib/store.jsx';
import { tools, USD_EUR } from '../data/tools.js';
import { ASOF } from '../data/estimate.js';

// Monthly "power-ups" — the AI and software stack behind the speed. Totals in EUR before VAT.
export default function ToolCalculator() {
  const { t, L, euro } = useApp();
  const [tier, setTier] = useState('5x');
  const [seats, setSeats] = useState(3);
  const [higgs, setHiggs] = useState(350);

  const cost = (tool) => {
    if (tool.tiers) return tool.tiers.find((x) => x.id === tier).usd * USD_EUR;
    if (tool.perSeat) return tool.perSeat * seats;
    if (tool.min) return higgs;
    return tool.eur;
  };
  const total = tools.reduce((s, x) => s + cost(x), 0);
  const max = Math.max(...tools.map(cost));

  return (
    <div className="powerups">
      <ul className="tool-list">
        {tools.map((tool) => {
          const v = cost(tool);
          return (
            <li key={tool.id} className="tool">
              <div className="tool-head">
                <strong>{t(tool.name)}</strong>
                <span className="tool-cost">{euro(v)}<small>/{L('mo', 'Mon')}</small></span>
              </div>
              <small className="tool-role">{t(tool.role)}</small>
              <span className="tool-bar"><i style={{ width: (v / max) * 100 + '%' }} /></span>

              {tool.tiers && (
                <div className="seg small" role="radiogroup" aria-label={L('Claude Max tier', 'Claude-Max-Stufe')}>
                  {tool.tiers.map((x) => (
                    <button key={x.id} role="radio" aria-checked={tier === x.id} onClick={() => setTier(x.id)}>
                      {x.label} · ${x.usd}
                    </button>
                  ))}
                </div>
              )}
              {tool.perSeat && (
                <div className="stepper" role="group" aria-label={L('Notion members', 'Notion-Mitglieder')}>
                  <button onClick={() => setSeats((s) => Math.max(1, s - 1))} aria-label={L('Fewer members', 'Weniger Mitglieder')}><Minus size={14} /></button>
                  <output>{seats} {L('members', 'Mitglieder')}</output>
                  <button onClick={() => setSeats((s) => Math.min(10, s + 1))} aria-label={L('More members', 'Mehr Mitglieder')}><Plus size={14} /></button>
                </div>
              )}
              {tool.min && (
                <label className="slider">
                  <span>{L('Content volume', 'Content-Menge')}</span>
                  <input type="range" min={tool.min} max={tool.max} step={50} value={higgs} onChange={(e) => setHiggs(Number(e.target.value))} />
                </label>
              )}
              {tool.note && <small className="tool-note">{t(tool.note)}</small>}
              <a className="tool-src" href={tool.url} target="_blank" rel="noreferrer">{L('Source', 'Quelle')} <ExternalLink size={11} /></a>
            </li>
          );
        })}
      </ul>
      <div className="tool-total" aria-live="polite">
        <span>{L('Monthly stack', 'Monatlicher Stack')}</span>
        <strong>{euro(total)}</strong>
        <small>
          {L(`≈ ${euro(total * 12)} per year · before VAT · USD prices × ${USD_EUR} · ${t(ASOF)} · verify at checkout`, `≈ ${euro(total * 12)} pro Jahr · vor USt · USD-Preise × ${USD_EUR} · ${t(ASOF)} · beim Kauf prüfen`)}
        </small>
      </div>
    </div>
  );
}
