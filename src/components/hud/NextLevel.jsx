import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Map } from 'lucide-react';
import { useApp } from '../../lib/store.jsx';
import { levels } from '../../data/levels.js';

export default function NextLevel({ level }) {
  const { t, L } = useApp();
  const i = levels.findIndex((l) => l.id === level.id);
  const next = levels[i + 1];
  return (
    <nav className="next-level wrap" aria-label={L('Continue', 'Weiter')}>
      <Link to="/" className="back-map"><Map size={18} /> {L('Back to the map', 'Zurück zur Karte')}</Link>
      {next ? (
        <Link to={next.path} className="next-card">
          <small>{L('Next level', 'Nächstes Level')} · {next.num}</small>
          <strong>{t(next.title)}</strong>
          <span>{t(next.hint)}</span>
          <ArrowRight size={28} aria-hidden="true" />
        </Link>
      ) : (
        <Link to="/" className="next-card">
          <small>{L('Universe complete', 'Universum komplett')}</small>
          <strong>{L('Let’s connect the dots.', 'Verbinden wir die Punkte.')}</strong>
          <span>{L('Return to the map', 'Zurück zur Karte')}</span>
          <ArrowRight size={28} aria-hidden="true" />
        </Link>
      )}
    </nav>
  );
}
