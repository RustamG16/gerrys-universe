import React from 'react';
import { useApp } from '../lib/store.jsx';
import LevelHead from '../components/LevelHead.jsx';
import Reveal from '../components/Reveal.jsx';
import Ecosystem from '../components/diagrams/Ecosystem.jsx';
import JourneyMatrix from '../components/charts/JourneyMatrix.jsx';
import Radar from '../components/charts/Radar.jsx';
import Seasonality from '../components/charts/Seasonality.jsx';
import TrackDonut from '../components/charts/TrackDonut.jsx';

export default function Insights() {
  const { L } = useApp();
  return (
    <div className="level insights">
      <LevelHead
        num="02"
        kicker={L('Insights', 'Einblicke')}
        title={[L('See the whole system.', 'Das ganze System sehen.'), L('Then build it.', 'Dann bauen.')]}
        lead={L('Five views. Hover, tap or switch to a table.', 'Fünf Ansichten. Hovern, tippen oder als Tabelle anzeigen.')}
      />
      <Reveal className="wrap insight-grid">
        <div className="span-2"><Ecosystem /></div>
        <Radar />
        <TrackDonut />
        <div className="span-2"><Seasonality /></div>
        <div className="span-2"><JourneyMatrix /></div>
      </Reveal>
      <p className="wrap caption muted disclaimer">
        {L('Illustrative proposal visuals. No revenue, booking or performance data is shown or implied.', 'Illustrative Vorschlagsgrafiken. Es werden keine Umsatz-, Buchungs- oder Leistungsdaten gezeigt oder angedeutet.')}
      </p>
    </div>
  );
}
