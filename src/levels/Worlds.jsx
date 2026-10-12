import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowUpRight, Lock, Zap, Instagram, Bot, Sparkles } from 'lucide-react';
import { useApp, media, tabKeyDown } from '../lib/store.jsx';
import { businesses, socialVoices } from '../data/businesses.js';
import { brand } from '../data/levels.js';
import LevelHead from '../components/LevelHead.jsx';
import Reveal from '../components/Reveal.jsx';

function PowerMeter({ level, color, label }) {
  return (
    <div className="power" role="img" aria-label={label}>
      {[0, 1, 2].map((i) => (
        <i key={i} style={{ background: i < level ? color : undefined }} />
      ))}
    </div>
  );
}

export default function Worlds() {
  const { t, L } = useApp();
  const [params, setParams] = useSearchParams();
  const index = Math.min(2, Math.max(0, Number(params.get('b')) || 0));
  const setIndex = (i) => setParams({ b: String(i) }, { replace: true });
  const b = businesses[index];
  const color = brand[b.id].light;

  return (
    <div className="level worlds">
      <LevelHead num="01" kicker={L('Three worlds', 'Drei Welten')} title={[L('Three worlds.', 'Drei Welten.'), L('One universe.', 'Ein Universum.')]} />

      <section className="wrap">
        <div className="world-tabs" role="tablist" aria-label={L('Businesses', 'Geschäfte')}>
          {businesses.map((x, i) => (
            <button
              key={x.id}
              role="tab"
              id={'world-' + i}
              aria-controls="world-panel"
              aria-selected={index === i}
              tabIndex={index === i ? 0 : -1}
              onKeyDown={(e) => tabKeyDown(e, i, businesses.length, setIndex)}
              onClick={() => setIndex(i)}
              style={{ '--c': brand[x.id].light }}
            >
              <span className="tab-num">0{i + 1}</span>
              <strong>{x.name}</strong>
              <small>{t(x.unlock)}</small>
              {x.status.locked && <Lock size={14} aria-label={L('Locked', 'Gesperrt')} />}
            </button>
          ))}
        </div>

        <div className="world-panel" id="world-panel" role="tabpanel" tabIndex="0" aria-labelledby={'world-' + index} key={b.id} style={{ '--c': color }}>
          <figure className={'world-media' + (b.status.locked ? ' is-locked' : '')}>
            <img src={media(b.img)} alt={b.name + ' — ' + t(b.tag)} />
            {b.status.locked && (
              <div className="lock-badge">
                <Lock size={22} />
                <span>{L('Off-season level', 'Nebensaison-Level')}</span>
              </div>
            )}
            <figcaption>{t(b.imgNote)}</figcaption>
          </figure>
          <div className="world-copy">
            <p className="eyebrow">{t(b.tag)}</p>
            <h3 className="world-title">{t(b.title)}</h3>
            <div className="world-status">
              <PowerMeter level={b.status.level} color={color} label={t(b.status.label)} />
              <span>{t(b.status.label)}</span>
            </div>
            <ol className="quest-tiles">
              {b.actions.map((a, i) => (
                <li key={i}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {t(a)}
                </li>
              ))}
            </ol>
            <a className="button outline" href={b.url} target="_blank" rel="noreferrer">
              {t(b.link)} <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <section className="wrap engine">
        <Reveal className="engine-grid">
          <div>
            <p className="eyebrow">{L('Content engine', 'Content-Engine')}</p>
            <h2 className="h2-sm">{L('Six voices. Staged, not all at once.', 'Sechs Stimmen. Gestaffelt, nicht alle auf einmal.')}</h2>
            <ul className="voices">
              {socialVoices.map((v, i) => (
                <li key={i} className={'voice phase-' + v.phase}>
                  <span className="voice-icon" aria-hidden="true">{v.kind.en.includes('AI') ? <Bot size={18} /> : v.phase === 'secret' ? <Sparkles size={18} /> : <Instagram size={18} />}</span>
                  <span>
                    <strong>{t(v.who)}</strong>
                    <small>{t(v.kind)}</small>
                  </span>
                  <em>
                    {v.phase === 'A' ? L('Now', 'Jetzt') : v.phase === 'villa' ? L('Jan 2027', 'Jän 2027') : v.phase === 'secret' ? L('If yes', 'Bei Ja') : L('After validation', 'Nach Validierung')}
                  </em>
                </li>
              ))}
            </ul>
            <p className="caption muted">{L('Per launched brand: 4 reels + 4 posts per month, weekly stories. AI guides are always clearly disclosed.', 'Pro gestarteter Marke: 4 Reels + 4 Posts im Monat, wöchentliche Stories. KI-Guides sind immer klar gekennzeichnet.')}</p>
          </div>
          <figure className="film">
            <video controls preload="none" poster={media('alpine.webp')} aria-label={L('Alpine destination concept film', 'Alpiner Destinations-Konzeptfilm')}>
              <source src={media('alpine-film.mp4')} type="video/mp4" />
            </video>
            <figcaption>
              <Zap size={14} /> {L('Generated with Higgsfield · AI campaign concept, not real footage', 'Mit Higgsfield generiert · KI-Kampagnenkonzept, keine echte Aufnahme')}
            </figcaption>
          </figure>
        </Reveal>
      </section>
    </div>
  );
}
