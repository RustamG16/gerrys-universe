import React, { useEffect, useState } from 'react';
import { continueRender, delayRender, staticFile } from 'remotion';

export const C = {
  cotton: '#EDEBDD',
  paper: '#F5F3E8',
  noir: '#1B1717',
  space: '#0F0D0D',
  cherry: '#810100',
  red: '#DE5248',
  muted: '#A39C91',
  rule: '#3A3330',
  marina: '#1E9E8F',
  active: '#C97F22',
  villa: '#7484DA',
};

// Self-hosted Convenium fonts; rendering waits until they are ready.
export function useFonts() {
  const [handle] = useState(() => delayRender('fonts'));
  useEffect(() => {
    const faces = [
      new FontFace('Archivo', `url(${staticFile('fonts/archivo.woff2')})`, { weight: '100 900' }),
      new FontFace('Inter', `url(${staticFile('fonts/inter.woff2')})`, { weight: '100 900' }),
      new FontFace('Newsreader', `url(${staticFile('fonts/newsreader.woff2')})`),
    ];
    Promise.all(faces.map((f) => f.load().then((ff) => document.fonts.add(ff))))
      .then(() => continueRender(handle))
      .catch(() => continueRender(handle));
  }, [handle]);
}

export const display = { fontFamily: 'Archivo, sans-serif', fontWeight: 900, letterSpacing: '-0.05em' };
export const ui = { fontFamily: 'Inter, sans-serif', fontWeight: 500 };

export function Label({ children, style }) {
  return <div style={{ ...ui, fontSize: 18, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.muted, ...style }}>{children}</div>;
}

export function Disclosure() {
  return (
    <div style={{ ...ui, position: 'absolute', right: 40, bottom: 28, fontSize: 16, color: C.muted }}>
      Convenium Studio · Gerry’s Universe proposal · animated with Remotion
    </div>
  );
}
