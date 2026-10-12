import React, { useEffect, useState } from 'react';
import { Download, RotateCcw, Printer, Check } from 'lucide-react';
import { useApp, readStore, writeStore } from '../lib/store.jsx';
import { services } from '../data/services.js';
import { quests, tracks } from '../data/plan.js';
import { retreatMath } from './RetreatLab.jsx';

const valid = (v) => Array.isArray(v) && v.every((id) => typeof id === 'string' && /^\d+-\d+$/.test(id) && services[id.split('-')[0]]?.items[id.split('-')[1]]);

export default function Loadout() {
  const { t, L, euro, lang, retreat, secret } = useApp();
  const [scope, setScope] = useState(() => readStore('universe-scope-v2', [], valid));
  const [notice, setNotice] = useState('');
  useEffect(() => writeStore('universe-scope-v2', scope), [scope]);
  const toggle = (id) => setScope((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const selected = scope.map((id) => services[id.split('-')[0]].items[id.split('-')[1]]);

  function exportBrief() {
    const m = retreatMath(retreat);
    const lines = [
      L('GERRY’S UNIVERSE — DISCUSSION BRIEF', 'GERRY’S UNIVERSE — BESPRECHUNGSBRIEF'),
      'Convenium Studio · ' + new Date().toLocaleDateString(lang === 'de' ? 'de-AT' : 'en-GB'),
      L('Proposal only. Scope and pricing to agree; software and media fees separate.', 'Nur Vorschlag. Umfang und Preise vereinbaren; Software- und Medienkosten separat.'),
      '',
      L('SELECTED SERVICES', 'AUSGEWÄHLTE LEISTUNGEN'),
      ...(selected.length ? selected.map((x) => '• ' + t(x)) : [L('No services selected.', 'Keine Leistungen ausgewählt.')]),
      '',
      L('SMART MISSION PLAN (proposed dates)', 'SMART-MISSIONSPLAN (vorgeschlagene Termine)'),
      ...tracks.flatMap((tr) => [
        '',
        t(tr.name).toUpperCase(),
        ...quests.filter((q) => q.track === tr.id).flatMap((q) => [
          `${q.id} ${t(q.title)} — ${t(q.smart.T)}`,
          `  S: ${t(q.smart.S)}`,
          `  M: ${t(q.smart.M)}`,
        ]),
      ]),
      '',
      ...(secret
        ? [
            L('RETREAT PILOT ASSUMPTIONS (before taxes)', 'RETREAT-PILOT-ANNAHMEN (vor Steuern)'),
            `${L('Participants', 'Teilnehmende')}: ${retreat.attendees} · ${L('Price', 'Preis')}: ${euro(retreat.price)} · ${L('Variable', 'Variabel')}: ${euro(retreat.variable)} · ${L('Fixed', 'Fix')}: ${euro(retreat.fixed)}`,
            `${L('Revenue', 'Umsatz')}: ${euro(m.revenue)} · ${L('Contribution', 'Deckungsbeitrag')}: ${euro(m.contribution)} · ${L('Break-even', 'Kostendeckung')}: ${m.breakEven ?? '—'}`,
            '',
          ]
        : []),
      L('No live integrations or outcome guarantees. Generated media are labelled concepts.', 'Keine Live-Integrationen oder Ergebnisgarantien. Generierte Medien sind gekennzeichnete Konzepte.'),
    ];
    const url = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `Gerrys-Universe-${lang}-brief.txt`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice(L('Your discussion brief has been downloaded.', 'Dein Besprechungsbrief wurde heruntergeladen.'));
  }

  return (
    <div className="loadout">
      <div className="loadout-grid">
        {services.map((g, gi) => (
          <fieldset key={gi}>
            <legend>{t(g.title)}</legend>
            {g.items.map((x, i) => {
              const id = `${gi}-${i}`;
              const on = scope.includes(id);
              return (
                <label key={i} className={on ? 'on' : ''}>
                  <input type="checkbox" checked={on} onChange={() => toggle(id)} />
                  <span className="box" aria-hidden="true">{on && <Check size={14} />}</span>
                  <span>{t(x)}</span>
                </label>
              );
            })}
          </fieldset>
        ))}
      </div>
      <div className="loadout-bar">
        <div className="count">
          <b>{String(selected.length).padStart(2, '0')}</b>
          <span>{L('power-ups equipped', 'Power-ups ausgerüstet')}<small>{L('Saved on this device only.', 'Nur auf diesem Gerät gespeichert.')}</small></span>
        </div>
        <div className="actions">
          <button className="text-link" onClick={() => (setScope([]), setNotice(L('Selection reset.', 'Auswahl zurückgesetzt.')))}>
            <RotateCcw size={16} /> {L('Reset', 'Zurücksetzen')}
          </button>
          <button className="text-link" onClick={() => window.print()}>
            <Printer size={16} /> {L('Print', 'Drucken')}
          </button>
          <button className="button cherry" onClick={exportBrief}>
            {L('Download brief', 'Brief herunterladen')} <Download size={18} />
          </button>
        </div>
      </div>
      <p className="sr-only" role="status">{notice}</p>
    </div>
  );
}
