import React, { Component, lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Lock, HelpCircle } from 'lucide-react';
import { useApp, media } from '../lib/store.jsx';
import { bodies, spaceColors } from '../data/universe.js';
import VideoCard from '../components/VideoCard.jsx';

const UniverseScene = lazy(() => import('../three/UniverseScene.jsx'));

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

// Static orbit diagram used when WebGL is unavailable. Same destinations as the 3D map.
function StaticUniverse() {
  return (
    <svg className="static-universe" viewBox="-80 -50 160 100" aria-hidden="true">
      {[18, 27, 36, 44].map((r) => (
        <ellipse key={r} cx="0" cy="0" rx={r} ry={r * 0.38} fill="none" stroke="#4a4240" strokeWidth="0.3" />
      ))}
      <circle r="5" fill={spaceColors.hq} />
      <circle cx="18" cy="2" r="2.6" fill={spaceColors.marina} />
      <circle cx="-27" cy="-4" r="3.1" fill={spaceColors.active} />
      <circle cx="36" cy="-6" r="2.9" fill="#5a5552" stroke={spaceColors.villa} strokeWidth="0.5" />
    </svg>
  );
}

export default function Hub() {
  const { t, L, paused, links, visited } = useApp();
  const navigate = useNavigate();
  const [webgl] = useState(hasWebGL);
  const [visible, setVisible] = useState(true);
  const stageRef = useRef(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const label = (b) => (typeof b.name === 'string' ? b.name : t(b.name));
  const explored = visited.length - 1;

  return (
    <div className="hub">
      <section className="hub-stage" ref={stageRef}>
        <div className="hub-canvas">
          {webgl ? (
            <SceneBoundary fallback={<StaticUniverse />}>
              <Suspense fallback={<StaticUniverse />}>
                <UniverseScene paused={paused} visible={visible} t={t} onNavigate={(to) => navigate(to)} glbUrl={links.stationGlb ? media(links.stationGlb) : null} />
              </Suspense>
            </SceneBoundary>
          ) : (
            <StaticUniverse />
          )}
        </div>
        <div className="hub-copy wrap">
          <p className="eyebrow">{L('Private proposal · October 2026 · for Gerry & Marina', 'Privater Vorschlag · Oktober 2026 · für Gerry & Marina')}</p>
          <h1>
            {L('Your business.', 'Dein Business.')}
            <br />
            {L('A whole new', 'Ein ganz neues')}
            <br />
            <em>{L('universe.', 'Universum.')}</em>
          </h1>
          <p className="hub-lead">{L('Click a world to fly there. Six levels, one plan.', 'Klicke auf eine Welt, um hinzufliegen. Sechs Level, ein Plan.')}</p>
          <div className="hub-cta">
            <Link className="button cherry" to="/worlds">
              {L('Start the game', 'Spiel starten')} <ArrowRight size={18} />
            </Link>
            <span className="caption">{L(`${Math.max(0, explored)} of 6 levels explored`, `${Math.max(0, explored)} von 6 Level erkundet`)}</span>
          </div>
        </div>
        <p className="hub-hint caption" aria-hidden="true">{L('Drag to orbit · click to fly', 'Ziehen zum Drehen · Klicken zum Fliegen')}</p>
      </section>

      <section className="hub-mirror wrap" aria-labelledby="mirror-title">
        <h2 id="mirror-title" className="eyebrow">{L('Choose a destination', 'Ziel wählen')}</h2>
        <ul>
          {bodies.map((b) => (
            <li key={b.id}>
              <Link to={b.to} className={'dest' + (b.locked ? ' locked' : '') + (b.secret ? ' secret' : '')} style={{ '--c': spaceColors[b.color] }}>
                <span className="dest-dot" aria-hidden="true" />
                <span className="dest-text">
                  <strong>{label(b)}</strong>
                  <small>{t(b.sub)}</small>
                </span>
                {b.locked ? <Lock size={16} aria-label={L('Locked', 'Gesperrt')} /> : b.secret ? <HelpCircle size={16} aria-label={L('Secret', 'Geheim')} /> : <ArrowRight size={16} aria-hidden="true" />}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hub-intro">
          <VideoCard src={media('universe-intro.mp4')} poster={media('universe-intro-poster.jpg')} title={L('Six-second intro', 'Sechs-Sekunden-Intro')} note={L('Animated with Remotion', 'Animiert mit Remotion')} />
        </div>
        <p className="caption muted">
          {L('3D map built with Three.js / React Three Fiber; the Notion HQ station model is AI-generated with Higgsfield. Everything is also reachable from this list and the level bar.', '3D-Karte mit Three.js / React Three Fiber; das Notion-HQ-Stationsmodell ist mit Higgsfield KI-generiert. Alles ist auch über diese Liste und die Levelleiste erreichbar.')}
        </p>
      </section>
    </div>
  );
}
