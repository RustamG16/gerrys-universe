import { pair } from '../lib/store.jsx';

// The game map. Order = level number. theme drives the page surface.
export const levels = [
  { id: 'hub', path: '/', num: '00', theme: 'space', title: pair('Universe', 'Universum'), hint: pair('The map', 'Die Karte'), xp: 50 },
  { id: 'worlds', path: '/worlds', num: '01', theme: 'cream', title: pair('Worlds', 'Welten'), hint: pair('Three businesses', 'Drei Geschäfte'), xp: 100 },
  { id: 'insights', path: '/insights', num: '02', theme: 'paper', title: pair('Insights', 'Einblicke'), hint: pair('See the system', 'Das System sehen'), xp: 150 },
  { id: 'mission', path: '/mission', num: '03', theme: 'noir', title: pair('Mission', 'Mission'), hint: pair('SMART plan', 'SMART-Plan'), xp: 200 },
  { id: 'speedrun', path: '/speedrun', num: '04', theme: 'cream', title: pair('Speedrun', 'Speedrun'), hint: pair('Agency vs me', 'Agentur vs ich'), xp: 150 },
  { id: 'notion', path: '/notion', num: '05', theme: 'paper', title: pair('Notion HQ', 'Notion-HQ'), hint: pair('Workspace design', 'Workspace-Aufbau'), xp: 150 },
];

export const totalXp = levels.reduce((s, l) => s + l.xp, 0);

// Identity colours, validated with the dataviz palette checker (light on #EDEBDD, dark on #1B1717).
export const brand = {
  marina: { light: '#008C7E', dark: '#1E9E8F' },
  active: { light: '#B26A12', dark: '#C97F22' },
  villa: { light: '#4C5BA8', dark: '#7484DA' },
  hq: { light: '#9B1B14', dark: '#DE5248' },
};
