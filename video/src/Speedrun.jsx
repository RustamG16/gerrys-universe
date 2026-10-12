import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { C, display, ui, Label, Disclosure, useFonts } from './theme.jsx';

const MY_HOURS = 16; // 2 working days
const AGENCY = [100, 140];
const RACE_START = 60;
const RACE_FRAMES = 150; // frames for 140 h

export function Speedrun() {
  useFonts();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const hoursAt = (limit) =>
    interpolate(frame, [RACE_START, RACE_START + (limit / AGENCY[1]) * RACE_FRAMES], [0, limit], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const me = hoursAt(MY_HOURS);
  const agency = hoursAt(AGENCY[1]);
  const title = spring({ frame, fps, config: { damping: 200 } });
  const verdict = spring({ frame: frame - (RACE_START + RACE_FRAMES + 10), fps, config: { damping: 14 } });
  const meDone = frame > RACE_START + (MY_HOURS / AGENCY[1]) * RACE_FRAMES;

  const lane = (name, value, color, label, done) => (
    <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr 280px', alignItems: 'center', gap: 28 }}>
      <div style={{ ...ui, fontSize: 28, color: C.paper }}>{name}</div>
      <div style={{ position: 'relative', height: 44, borderRadius: 8, background: '#2C2525', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, width: `${(value / AGENCY[1]) * 100}%`, background: color, borderRadius: 8 }} />
      </div>
      <div style={{ ...display, fontSize: 48, color: done ? C.red : C.paper, textAlign: 'right', whiteSpace: 'nowrap' }}>{label}</div>
    </div>
  );

  return (
    <AbsoluteFill style={{ background: C.noir, padding: '90px 110px', justifyContent: 'center' }}>
      <div style={{ opacity: title, transform: `translateY(${(1 - title) * 30}px)` }}>
        <Label>Speedrun · Marina Fior website</Label>
        <div style={{ ...display, fontSize: 92, color: C.paper, lineHeight: 0.95, marginTop: 16 }}>Same website.</div>
        <div style={{ ...display, fontSize: 92, color: C.red, lineHeight: 0.95 }}>Different clock.</div>
      </div>
      <div style={{ display: 'grid', gap: 34, marginTop: 70 }}>
        {lane('Rustam + AI stack', me, C.red, meDone ? '2 days' : `${Math.round(me)} h`, meDone)}
        {lane('Austrian agency', agency, C.muted, frame > RACE_START + RACE_FRAMES ? '100–140 h' : `${Math.round(agency)} h`, false)}
      </div>
      <div
        style={{
          ...display,
          fontSize: 64,
          color: C.paper,
          marginTop: 60,
          opacity: Math.max(0, Math.min(1, verdict)),
          transform: `scale(${interpolate(verdict, [0, 1], [0.8, 1], { extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) })})`,
          transformOrigin: 'left',
        }}
      >
        ≈ 6–9× faster · €12–18k agency price (net)
      </div>
      <div style={{ ...ui, fontSize: 20, color: C.muted, marginTop: 14, opacity: Math.max(0, Math.min(1, verdict)) }}>
        Agency figures: ChatGPT estimate, 11 Oct 2026 · cross-checked with Austrian market ranges
      </div>
      <Disclosure />
    </AbsoluteFill>
  );
}
