import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { C, display, ui, Label, Disclosure, useFonts } from './theme.jsx';

const planets = [
  { r: 170, size: 34, color: C.marina, speed: 0.012, phase: 0.4, name: 'Marina Fior' },
  { r: 260, size: 42, color: C.active, speed: 0.008, phase: 2.4, name: 'Active Relaxing' },
  { r: 350, size: 38, color: C.villa, speed: 0.006, phase: 4.6, name: 'Villa Olivija' },
];

export function Intro() {
  useFonts();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = ['Your business.', 'A whole new', 'universe.'];
  const cx = 1350, cy = 560;

  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 70% 55%, #2a1614 0%, ${C.space} 60%)` }}>
      <svg width="1920" height="1080" style={{ position: 'absolute', inset: 0 }}>
        {planets.map((p, i) => {
          const draw = interpolate(frame, [i * 8, 40 + i * 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const circ = 2 * Math.PI * p.r;
          const a = p.phase + frame * p.speed * 2;
          return (
            <g key={p.name}>
              <ellipse cx={cx} cy={cy} rx={p.r} ry={p.r * 0.38} fill="none" stroke="#4a4240" strokeWidth="2" strokeDasharray={circ} strokeDashoffset={circ * (1 - draw)} />
              <circle cx={cx + Math.cos(a) * p.r} cy={cy + Math.sin(a) * p.r * 0.38} r={p.size * draw} fill={p.color} />
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r={70 * spring({ frame, fps, config: { damping: 12 } })} fill={C.red} />
        <circle cx={cx} cy={cy} r={105} fill={C.red} opacity={0.08} />
      </svg>
      <div style={{ position: 'absolute', left: 110, top: 200 }}>
        <Label style={{ opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }) }}>Private proposal · October 2026</Label>
        {words.map((w, i) => {
          const s = spring({ frame: frame - 10 - i * 12, fps, config: { damping: 200 } });
          return (
            <div key={w} style={{ ...display, fontSize: 132, lineHeight: 0.9, color: i === 2 ? C.red : C.paper, opacity: s, transform: `translateY(${(1 - s) * 60}px)`, marginTop: i === 0 ? 24 : 0 }}>
              {w}
            </div>
          );
        })}
        <div style={{ ...ui, fontSize: 30, color: C.muted, marginTop: 40, opacity: interpolate(frame, [70, 95], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) }}>
          Three businesses · five levels · one plan
        </div>
      </div>
      <Disclosure />
    </AbsoluteFill>
  );
}
