import { pair } from '../lib/store.jsx';

// Objects on the universe map. Shared by the 3D scene and its accessible HTML mirror.
export const bodies = [
  { id: 'core', kind: 'sun', name: pair('The Mission', 'Die Mission'), sub: pair('SMART plan · Level 03', 'SMART-Plan · Level 03'), to: '/mission', color: 'hq', radius: 0, size: 0.95, speed: 0 },
  { id: 'marina', kind: 'planet', name: 'Marina Fior', sub: pair('Website ready · launch now', 'Website fertig · jetzt starten'), to: '/worlds?b=0', color: 'marina', radius: 3.1, size: 0.52, speed: 0.16, phase: 0.4 },
  { id: 'active', kind: 'planet', name: 'Active Relaxing', sub: pair('Rebuild before winter', 'Neubau vor dem Winter'), to: '/worlds?b=1', color: 'active', radius: 4.5, size: 0.62, speed: 0.11, phase: 2.3 },
  { id: 'retreat', kind: 'moon', name: pair('Secret: Villach retreat', 'Geheim: Villach-Retreat'), sub: pair('Unlocks if Gerry says yes', 'Öffnet sich bei Gerrys Ja'), to: '/mission#retreat', color: 'active', parent: 'active', radius: 1.05, size: 0.16, speed: 0.9, phase: 0, secret: true },
  { id: 'villa', kind: 'planet', name: 'Villa Olivija', sub: pair('Locked · Jan 2027', 'Gesperrt · Jän 2027'), to: '/worlds?b=2', color: 'villa', radius: 6.1, size: 0.58, speed: 0.075, phase: 4.4, locked: true },
  { id: 'insights', kind: 'satellite', name: pair('Insights', 'Einblicke'), sub: pair('Charts & diagrams · Level 02', 'Diagramme · Level 02'), to: '/insights', color: 'paper', radius: 2.0, size: 0.2, speed: -0.3, phase: 1.2, tilt: 0.5, labelBelow: true },
  { id: 'speedrun', kind: 'comet', name: 'Speedrun', sub: pair('Agency vs me · Level 04', 'Agentur vs ich · Level 04'), to: '/speedrun', color: 'paper', radius: 6.8, size: 0.14, speed: 0.42, phase: 3.1, tilt: -0.12 },
  { id: 'notion', kind: 'station', name: 'Notion HQ', sub: pair('Workspace design · Level 05', 'Workspace-Aufbau · Level 05'), to: '/notion', color: 'paper', radius: 5.3, size: 0.42, speed: -0.06, phase: 5.6, tilt: 0.18 },
  { id: 'partnership', kind: 'satellite', name: pair('Partnership', 'Partnerschaft'), sub: pair('Working together · Level 06', 'Zusammenarbeit · Level 06'), to: '/partnership', color: 'hq', radius: 7.4, size: 0.22, speed: 0.05, phase: 0.9, tilt: -0.2 },
];

export const spaceColors = {
  hq: '#DE5248',
  marina: '#1E9E8F',
  active: '#C97F22',
  villa: '#7484DA',
  paper: '#F5F3E8',
};
