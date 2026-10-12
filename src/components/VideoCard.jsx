import React from 'react';
import { Film } from 'lucide-react';
import { useApp } from '../lib/store.jsx';

export default function VideoCard({ src, poster, title, note }) {
  const { lang } = useApp();
  return (
    <figure className="video-card">
      <video controls preload="none" poster={poster} aria-label={title} playsInline>
        <source src={src} type="video/mp4" />
      </video>
      <figcaption>
        <strong>{title}</strong>
        <span><Film size={13} /> {note}{lang === 'de' ? ' · Video auf Englisch' : ''}</span>
      </figcaption>
    </figure>
  );
}
