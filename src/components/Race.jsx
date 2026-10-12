import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { RotateCcw, Flag } from 'lucide-react';
import { useApp } from '../lib/store.jsx';
import { agency, MY_HOURS } from '../data/estimate.js';

// Animated race: 1 second of animation ≈ 25 hours of work, so the gap is felt, not read.
export default function Race() {
  const { L, paused } = useApp();
  const root = useRef(null);
  const [run, setRun] = useState(0);
  const max = agency.hours[1];

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const me = el.querySelector('.lane.me .runner');
    const ag = el.querySelector('.lane.agency .runner');
    const meH = el.querySelector('.lane.me output');
    const agH = el.querySelector('.lane.agency output');
    const finalMe = (MY_HOURS / max) * 100;
    if (paused) {
      gsap.set(me, { width: finalMe + '%' });
      gsap.set(ag, { width: '100%' });
      meH.textContent = MY_HOURS + ' h';
      agH.textContent = `${agency.hours[0]}–${agency.hours[1]} h`;
      return;
    }
    const ctx = gsap.context(() => {
      const c = { me: 0, ag: 0 };
      const tl = gsap.timeline({ scrollTrigger: run ? undefined : { trigger: el, start: 'top 75%', once: true } });
      tl.set([me, ag], { width: '0%' })
        .to(c, {
          me: MY_HOURS,
          duration: MY_HOURS / 25,
          ease: 'none',
          onUpdate: () => {
            me.style.width = (c.me / max) * 100 + '%';
            meH.textContent = Math.round(c.me) + ' h';
          },
        }, 0)
        .add(() => el.classList.add('me-done'), MY_HOURS / 25)
        .to(c, {
          ag: max,
          duration: max / 25,
          ease: 'none',
          onUpdate: () => {
            ag.style.width = (c.ag / max) * 100 + '%';
            agH.textContent = Math.round(c.ag) + ' h';
          },
        }, 0)
        .add(() => (agH.textContent = `${agency.hours[0]}–${agency.hours[1]} h`));
    }, el);
    el.classList.remove('me-done');
    return () => ctx.revert();
  }, [paused, run]);

  return (
    <div className="race" ref={root}>
      <div className="lane me">
        <span className="who">{L('Rustam + AI stack', 'Rustam + KI-Stack')}</span>
        <div className="track"><i className="runner" /><Flag size={16} className="flag" style={{ left: `calc(${(MY_HOURS / agency.hours[1]) * 100}% + 6px)` }} /></div>
        <output>{MY_HOURS} h</output>
      </div>
      <div className="lane agency">
        <span className="who">{L('Austrian agency', 'Österreichische Agentur')}</span>
        <div className="track"><i className="runner" /><i className="range" style={{ left: (agency.hours[0] / max) * 100 + '%' }} /></div>
        <output>{agency.hours[0]}–{agency.hours[1]} h</output>
      </div>
      <button className="chip" onClick={() => setRun((r) => r + 1)} disabled={paused}>
        <RotateCcw size={14} /> {L('Race again', 'Nochmal starten')}
      </button>
    </div>
  );
}
