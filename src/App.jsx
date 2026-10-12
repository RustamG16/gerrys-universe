import React, { lazy, Suspense, useEffect, useLayoutEffect, useRef } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import gsap from 'gsap';

// Time-based animation: slow frames must not stretch transitions.
gsap.ticker.lagSmoothing(0);
import { useApp } from './lib/store.jsx';
import { levels } from './data/levels.js';
import Hud from './components/hud/Hud.jsx';
import Toast from './components/hud/Toast.jsx';
import NextLevel from './components/hud/NextLevel.jsx';
import Hub from './levels/Hub.jsx';
import Worlds from './levels/Worlds.jsx';

const Insights = lazy(() => import('./levels/Insights.jsx'));
const Mission = lazy(() => import('./levels/Mission.jsx'));
const Edge = lazy(() => import('./levels/Edge.jsx'));
const NotionHQ = lazy(() => import('./levels/NotionHQ.jsx'));
const Partnership = lazy(() => import('./levels/Partnership.jsx'));

export default function App() {
  const location = useLocation();
  const { visit, t, L, paused } = useApp();
  const level = levels.find((l) => l.path === location.pathname) || levels[0];
  const stage = useRef(null);
  const curtain = useRef(null);
  const first = useRef(true);

  useEffect(() => {
    visit(level.id, { title: L('Level reached', 'Level erreicht'), body: `${level.num} · ${t(level.title)}`, xp: level.xp });
    document.title = `${t(level.title)} · Gerry’s Universe`;
    if (!location.hash) window.scrollTo(0, 0);
    document.body.dataset.theme = level.theme;
  }, [level.id]);

  // Level transition: a short curtain wipe with the level number. Skipped when motion is off.
  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (paused || !curtain.current || !stage.current) return;
    const ctx = gsap.context(() => {
      gsap.timeline()
        .set(curtain.current, { display: 'flex', clipPath: 'inset(0 0 0 0)' })
        .fromTo(curtain.current.querySelector('span'), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' })
        .to(curtain.current, { clipPath: 'inset(0 0 100% 0)', duration: 0.55, ease: 'power3.inOut' }, '+=0.15')
        .set(curtain.current, { display: 'none' })
        .fromTo(stage.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.35');
    });
    // Safety net: never leave the curtain up or the level hidden if frames stall (e.g. while 3D loads).
    const safety = setTimeout(() => ctx.revert(), 1600);
    return () => {
      clearTimeout(safety);
      ctx.revert();
    };
  }, [level.id]);

  return (
    <>
      <a className="skip" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }}>
        {L('Skip to content', 'Zum Inhalt springen')}
      </a>
      <Hud level={level} />
      <div className="curtain" ref={curtain} aria-hidden="true" data-theme={level.theme}>
        <span><small>LEVEL</small>{level.num}<em>{t(level.title)}</em></span>
      </div>
      <main id="main" tabIndex="-1" ref={stage} className={'stage theme-' + level.theme}>
        <Suspense fallback={<div className="level-loading" role="status">{L('Loading level…', 'Level lädt…')}</div>}>
          <Routes>
            <Route path="/" element={<Hub />} />
            <Route path="/worlds" element={<Worlds />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/edge" element={<Edge />} />
            <Route path="/speedrun" element={<Navigate to="/edge" replace />} />
            <Route path="/notion" element={<NotionHQ />} />
            <Route path="/partnership" element={<Partnership />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        {level.id !== 'hub' && <NextLevel level={level} />}
      </main>
      <Toast />
    </>
  );
}
