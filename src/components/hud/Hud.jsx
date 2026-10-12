import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Pause, Play, Check } from 'lucide-react';
import { useApp } from '../../lib/store.jsx';
import { levels, totalXp } from '../../data/levels.js';

export default function Hud({ level }) {
  const { t, L, lang, setLang, paused, setPaused, visited } = useApp();
  const xp = levels.filter((l) => visited.includes(l.id)).reduce((s, l) => s + l.xp, 0);
  const pct = Math.round((xp / totalXp) * 100);
  const mapRef = useRef(null);

  // Keep the current level visible in the scrollable level bar on small screens.
  useEffect(() => {
    const nav = mapRef.current, active = nav?.querySelector('a.active');
    if (nav && active && nav.scrollWidth > nav.clientWidth) nav.scrollTo({ left: active.offsetLeft - nav.clientWidth / 2 + active.offsetWidth / 2 });
  }, [level.id]);

  return (
    <header className="hud" data-theme={level.theme}>
      <NavLink to="/" className="wordmark" aria-label={L('Gerry’s Universe — map', 'Gerry’s Universe — Karte')}>
        convenium<span>.</span>
        <small>GERRY’S UNIVERSE</small>
      </NavLink>

      <nav className="level-map" ref={mapRef} aria-label={L('Levels', 'Level')}>
        <ol>
          {levels.map((l) => {
            const done = visited.includes(l.id);
            return (
              <li key={l.id}>
                <NavLink to={l.path} end className={({ isActive }) => (isActive ? 'active' : '') + (done ? ' done' : '')}>
                  <span className="lvl-num" aria-hidden="true">{done && l.id !== level.id ? <Check size={12} /> : l.num}</span>
                  <span className="lvl-name">{t(l.title)}</span>
                </NavLink>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="hud-actions">
        <div className="xp" role="img" aria-label={L(`Progress ${pct}%, ${xp} of ${totalXp} XP`, `Fortschritt ${pct} %, ${xp} von ${totalXp} XP`)}>
          <span className="xp-label">{xp} XP</span>
          <span className="xp-bar"><i style={{ width: pct + '%' }} /></span>
        </div>
        <div className="locale" role="group" aria-label={L('Language', 'Sprache')}>
          {['en', 'de'].map((x) => (
            <button key={x} aria-pressed={lang === x} onClick={() => setLang(x)}>{x.toUpperCase()}</button>
          ))}
        </div>
        <button
          className="motion"
          onClick={() => setPaused(!paused)}
          aria-pressed={paused}
          aria-label={paused ? L('Motion off — turn on', 'Bewegung aus — einschalten') : L('Motion on — pause', 'Bewegung an — pausieren')}
        >
          {paused ? <Play size={16} /> : <Pause size={16} />}
        </button>
      </div>
    </header>
  );
}
