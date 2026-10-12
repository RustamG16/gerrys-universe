import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { C, display, ui, Label, Disclosure, useFonts } from './theme.jsx';

// Mirrors src/data/plan.js (proposed dates, kickoff 19 Oct 2026).
const tracks = [
  { id: 'A', name: 'Track A · Launch', color: C.marina, quests: [['A1 Marina goes live', '2026-10-19', '2026-11-01'], ['A2 Marina gets found', '2026-11-02', '2026-11-29'], ['A3 Active Relaxing rebuilt', '2026-10-19', '2026-11-22'], ['A4 Active Relaxing is seen', '2026-11-16', '2026-12-18'], ['A5 Baselines', '2026-12-01', '2026-12-18']] },
  { id: 'B', name: 'Track B · Systems', color: C.red, quests: [['B1 Workspace', '2026-10-19', '2026-10-25'], ['B2 Knowledge bases', '2026-10-26', '2026-11-22'], ['B3 Pipelines & dashboards', '2026-11-09', '2026-12-06'], ['B4 AI automations', '2026-11-23', '2026-12-18'], ['B5 Handover', '2026-12-14', '2026-12-18']] },
  { id: 'V', name: 'Level 3 · Villa Olivija (off-season)', color: C.villa, quests: [['V1 Villa website', '2027-01-11', '2027-02-14'], ['V2 Summer campaign', '2027-02-15', '2027-03-31']] },
  { id: 'R', name: 'Secret level · Villach retreat — if yes', color: C.active, secret: true, quests: [['R0 Go / no-go', '2027-01-08', '2027-01-15'], ['R1 Validate', '2027-01-18', '2027-04-16']] },
];
const T0 = new Date('2026-10-12').getTime();
const T1 = new Date('2027-04-30').getTime();
const months = ['Oct', 'Nov', 'Dec', 'Jan 2027', 'Feb', 'Mar', 'Apr'];
const monthStarts = ['2026-10-12', '2026-11-01', '2026-12-01', '2027-01-01', '2027-02-01', '2027-03-01', '2027-04-01'];

export function Mission() {
  useFonts();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const W = 1700, LEFT = 110;
  const x = (d) => LEFT + ((new Date(d).getTime() - T0) / (T1 - T0)) * W;
  const head = spring({ frame, fps, config: { damping: 200 } });
  let row = 0;

  return (
    <AbsoluteFill style={{ background: C.noir, padding: '70px 0' }}>
      <div style={{ padding: '0 110px', opacity: head }}>
        <Label>Mission plan · S.M.A.R.T.</Label>
        <div style={{ ...display, fontSize: 76, color: C.paper, lineHeight: 0.95, marginTop: 12 }}>
          Launch first. <span style={{ color: C.red }}>Systems in parallel.</span>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 250, left: 0, right: 0, bottom: 60 }}>
        {months.map((m, i) => (
          <div key={m} style={{ position: 'absolute', left: x(monthStarts[i]), top: 0, bottom: 0, borderLeft: `1px solid ${C.rule}` }}>
            <div style={{ ...ui, fontSize: 18, color: C.muted, paddingLeft: 8 }}>{m}</div>
          </div>
        ))}
        <div style={{ position: 'absolute', left: x('2026-10-19'), top: 30, bottom: 0, borderLeft: `2px dashed ${C.paper}`, opacity: 0.5 }} />
        {tracks.map((tr, ti) => {
          const trackTop = 40 + row * 34 + ti * 22;
          row += 1;
          return (
            <React.Fragment key={tr.id}>
              <div style={{ ...ui, fontWeight: 700, position: 'absolute', left: LEFT, top: trackTop, fontSize: 18, color: tr.color }}>{tr.name}</div>
              {tr.quests.map(([label, s, e]) => {
                const top = 40 + row * 34 + ti * 22;
                const delay = 25 + row * 9;
                row += 1;
                const p = spring({ frame: frame - delay, fps, config: { damping: 18 } });
                const width = Math.max((x(e) - x(s)) * Math.min(1, p), 4);
                const hidden = tr.secret && frame < 300;
                return (
                  <div key={label} style={{ position: 'absolute', left: x(s), top, height: 26, display: 'flex', alignItems: 'center', gap: 10, opacity: Math.min(1, p) }}>
                    <div style={{ width, height: 26, borderRadius: 6, background: hidden ? 'transparent' : tr.color, border: `2px ${hidden ? 'dashed' : 'solid'} ${tr.color}` }} />
                    <div style={{ ...ui, fontSize: 17, color: C.paper, whiteSpace: 'nowrap' }}>{hidden ? '???' : label}</div>
                  </div>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
      <Disclosure />
    </AbsoluteFill>
  );
}
