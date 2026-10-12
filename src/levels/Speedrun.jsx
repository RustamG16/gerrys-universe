import React from 'react';
import { useApp, media } from '../lib/store.jsx';
import { agency, MY_HOURS, MY_DAYS, ASOF } from '../data/estimate.js';
import { MARINA_URL } from '../data/businesses.js';
import LevelHead from '../components/LevelHead.jsx';
import Reveal from '../components/Reveal.jsx';
import Race from '../components/Race.jsx';
import CostRanges from '../components/charts/CostRanges.jsx';
import QrPrompt from '../components/QrPrompt.jsx';
import ToolCalculator from '../components/ToolCalculator.jsx';
import VideoCard from '../components/VideoCard.jsx';

export default function Speedrun() {
  const { t, L, euro, links } = useApp();
  const fastLo = Math.round(agency.hours[0] / MY_HOURS);
  const fastHi = Math.round(agency.hours[1] / MY_HOURS);
  const maxH = agency.hours[1];

  return (
    <div className="level speedrun">
      <LevelHead
        num="04"
        kicker={L('Speedrun · Marina Fior website', 'Speedrun · Website Marina Fior')}
        title={[L(`${fastLo}–${fastHi}× faster`, `${fastLo}–${fastHi}× schneller`), L('than an agency.', 'als eine Agentur.')]}
        lead={
          <>
            {L('Benchmark: ', 'Maßstab: ')}
            <a href={MARINA_URL} target="_blank" rel="noreferrer" className="inline-link">rustamg16.github.io/marina-fior-website</a>
          </>
        }
      />

      <section className="wrap">
        <div className="stat-row">
          <div className="stat me">
            <small>{L('My build time', 'Meine Bauzeit')}</small>
            <b>{L(`${MY_DAYS} days`, `${MY_DAYS} Tage`)}</b>
            <span>{L(`≈ ${MY_HOURS} working hours`, `≈ ${MY_HOURS} Arbeitsstunden`)}</span>
          </div>
          <div className="stat">
            <small>{L('Agency effort', 'Agenturaufwand')}</small>
            <b>{agency.hours[0]}–{agency.hours[1]} h</b>
            <span>{L(`${agency.weeks[0]}–${agency.weeks[1]} calendar weeks`, `${agency.weeks[0]}–${agency.weeks[1]} Kalenderwochen`)}</span>
          </div>
          <div className="stat">
            <small>{L('Agency price', 'Agenturpreis')}</small>
            <b>{L(`€${agency.net[0] / 1000}–${agency.net[1] / 1000}k`, `${agency.net[0] / 1000}–${agency.net[1] / 1000} Tsd. €`)}</b>
            <span>{L(`net · ${euro(agency.gross[0])}–${euro(agency.gross[1])} incl. 20% VAT`, `netto · ${euro(agency.gross[0])}–${euro(agency.gross[1])} inkl. 20 % USt`)}</span>
          </div>
        </div>
        <Race />
        <p className="caption muted">{L(`Agency figures: ${t(agency.source)}, cross-checked below. My time: actual build time stated by Rustam. My price for Gerry is agreed separately.`, `Agenturwerte: ${t(agency.source)}, unten gegengeprüft. Meine Zeit: tatsächliche Bauzeit laut Rustam. Mein Preis für Gerry wird separat vereinbart.`)}</p>
      </section>

      <Reveal className="wrap speed-grid">
        <CostRanges />
        <figure className="chart breakdown">
          <div className="chart-top">
            <figcaption>
              <h3>{L('Where the agency hours go', 'Wohin die Agenturstunden fließen')}</h3>
              <p className="caption muted">{L('Hour ranges per work area, from the same estimate.', 'Stundenspannen je Arbeitsbereich, aus derselben Schätzung.')}</p>
            </figcaption>
          </div>
          <ul className="hour-bars">
            {agency.breakdown.map((b, i) => (
              <li key={i}>
                <span className="hb-label">{t(b.area)}</span>
                <span className="hb-track" aria-hidden="true">
                  <i className="lo" style={{ width: (b.h[0] / 45) * 100 + '%' }} />
                  <i className="hi" style={{ left: (b.h[0] / 45) * 100 + '%', width: ((b.h[1] - b.h[0]) / 45) * 100 + '%' }} />
                </span>
                <span className="hb-val">{b.h[0]}–{b.h[1]} h</span>
              </li>
            ))}
            <li className="me-row">
              <span className="hb-label">{L('Rustam, everything above', 'Rustam, alles oben zusammen')}</span>
              <span className="hb-track" aria-hidden="true"><i className="me" style={{ width: (MY_HOURS / 45) * 100 + '%' }} /></span>
              <span className="hb-val">{MY_HOURS} h</span>
            </li>
          </ul>
          <p className="caption muted">{L(`Total ${agency.hours[0]}–${maxH} h. Scale: 0–45 h per row.`, `Gesamt ${agency.hours[0]}–${maxH} h. Skala: 0–45 h pro Zeile.`)}</p>
        </figure>
      </Reveal>

      <section className="wrap">
        <QrPrompt />
      </section>

      {(
        <section className="wrap">
          <VideoCard src={media('speedrun.mp4')} poster={media('speedrun-poster.jpg')} title={L('Speedrun in 10 seconds', 'Speedrun in 10 Sekunden')} note={L('Animated with Remotion', 'Animiert mit Remotion')} />
        </section>
      )}

      <section className="wrap" aria-labelledby="powerups-title">
        <p className="eyebrow">{L('Power-ups', 'Power-ups')}</p>
        <h2 id="powerups-title" className="h2-sm">{L('The stack behind the speed.', 'Der Stack hinter dem Tempo.')}</h2>
        <p className="level-lead">{L('Monthly tools for running all of this for Gerry’s businesses. Separate from my own fee.', 'Monatliche Tools, um all das für Gerrys Geschäfte zu betreiben. Getrennt von meinem Honorar.')}</p>
        <ToolCalculator />
        <p className="caption muted">{t(ASOF)}</p>
      </section>
    </div>
  );
}
