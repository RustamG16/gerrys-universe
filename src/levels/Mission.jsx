import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Lock, Sparkles, Unlock } from 'lucide-react';
import { useApp } from '../lib/store.jsx';
import { quests, tracks } from '../data/plan.js';
import { brand } from '../data/levels.js';
import LevelHead from '../components/LevelHead.jsx';
import QuestGantt from '../components/charts/QuestGantt.jsx';
import RetreatLab from '../components/RetreatLab.jsx';
import Loadout from '../components/Loadout.jsx';
import Reveal from '../components/Reveal.jsx';

const SMART = [
  ['S', ['Specific', 'Spezifisch']],
  ['M', ['Measurable', 'Messbar']],
  ['A', ['Achievable', 'Erreichbar']],
  ['R', ['Relevant', 'Relevant']],
  ['T', ['Time-bound', 'Terminiert']],
];

function QuestCard({ q }) {
  const { t, L } = useApp();
  const tr = tracks.find((x) => x.id === q.track);
  return (
    <article className="quest-card" key={q.id} style={{ '--c': brand[tr.color].dark }} aria-live="polite">
      <header>
        <span className="quest-id">{q.id}</span>
        <div>
          <small>{t(tr.name)}</small>
          <h3>{t(q.title)}</h3>
        </div>
        <span className="owner">{q.owner}</span>
      </header>
      <ol className="smart-tiles">
        {SMART.map(([k, name], i) => (
          <li key={k} style={{ '--i': i }}>
            <b>{k}</b>
            <small>{L(name[0], name[1])}</small>
            <p>{t(q.smart[k])}</p>
          </li>
        ))}
      </ol>
    </article>
  );
}

export default function Mission() {
  const { t, L, secret, setSecret, setToast } = useApp();
  const [sel, setSel] = useState('A1');
  const location = useLocation();
  const q = quests.find((x) => x.id === sel);

  useEffect(() => {
    if (location.hash === '#retreat') document.getElementById('retreat')?.scrollIntoView({ block: 'start' });
  }, [location.hash]);

  const unlock = () => {
    setSecret(true);
    setToast({ title: L('Secret level unlocked', 'Geheimlevel freigeschaltet'), body: L('Villach retreat preview', 'Vorschau Villach-Retreat'), xp: 250 });
  };

  return (
    <div className="level mission">
      <LevelHead
        num="03"
        kicker={L('Mission plan · S.M.A.R.T.', 'Missionsplan · S.M.A.R.T.')}
        title={[L('Launch first.', 'Erst starten.'), L('Systems in parallel.', 'Systeme parallel.')]}
        lead={L('Kickoff Monday 19 October 2026. Two tracks run at the same time; the Villa waits for the off-season.', 'Start Montag, 19. Oktober 2026. Zwei Spuren laufen gleichzeitig; die Villa wartet auf die Nebensaison.')}
      >
        <ul className="smart-legend" aria-label="SMART">
          {SMART.map(([k, n]) => (
            <li key={k}><b>{k}</b>{L(n[0], n[1])}</li>
          ))}
        </ul>
      </LevelHead>

      <section className="wrap">
        <div className="track-cards">
          {tracks.map((tr) => (
            <div key={tr.id} className={'track-card' + (tr.locked ? ' locked' : '') + (tr.secret && !secret ? ' secret' : '')} style={{ '--c': brand[tr.color].dark }}>
              <span className="track-id">{tr.id}</span>
              <strong>{t(tr.name)}</strong>
              <small>{t(tr.sub)}</small>
              {tr.locked && <Lock size={16} />}
              {tr.secret && !secret && <Sparkles size={16} />}
            </div>
          ))}
        </div>
        <QuestGantt selected={sel} onSelect={setSel} secret={secret} />
        {q && <QuestCard q={q} />}
      </section>

      <section className="wrap secret-level" id="retreat" aria-labelledby="retreat-title">
        <div className="level-chip small">
          <span>{L('SECRET', 'GEHEIM')}</span>
          <b>?</b>
        </div>
        <h2 id="retreat-title">
          {L('Group retreats', 'Gruppenretreats')} <em>{L('in Villach villas.', 'in Villacher Villen.')}</em>
        </h2>
        {!secret ? (
          <div className="gate">
            <Lock size={40} />
            <p>{L('This level opens after Tracks A + B are done — if Gerry and Marina like the idea.', 'Dieses Level öffnet sich nach Spur A + B – wenn Gerry und Marina die Idee gefällt.')}</p>
            <button className="button light" onClick={unlock}>
              <Unlock size={18} /> {L('Peek inside (preview)', 'Hineinschauen (Vorschau)')}
            </button>
          </div>
        ) : (
          <Reveal>
            <RetreatLab />
            <ol className="validation">
              {[
                L('Go / no-go meeting', 'Go/No-Go-Termin'),
                L('10 interviews', '10 Interviews'),
                L('Waitlist page', 'Wartelistenseite'),
                L('Professional & legal review', 'Fachliche & rechtliche Prüfung'),
                L('Small paid pilot', 'Kleiner bezahlter Pilot'),
              ].map((s, i) => (
                <li key={i}><span>0{i + 1}</span>{s}</li>
              ))}
            </ol>
            <button className="text-link" onClick={() => setSecret(false)}>
              <Lock size={14} /> {L('Lock again', 'Wieder sperren')}
            </button>
          </Reveal>
        )}
      </section>

      <section className="wrap loadout-section" aria-labelledby="loadout-title">
        <p className="eyebrow">{L('Your loadout', 'Deine Ausrüstung')}</p>
        <h2 id="loadout-title" className="h2-sm">{L('Pick what to discuss. Download the brief.', 'Wähle, was wir besprechen. Brief herunterladen.')}</h2>
        <Loadout />
      </section>
    </div>
  );
}
