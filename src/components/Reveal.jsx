import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useApp } from '../lib/store.jsx';

gsap.registerPlugin(ScrollTrigger);

// Scroll entrance for a block's direct children. Content is visible by default;
// the animation only runs when motion is on, so nothing stays hidden if JS or motion is off.
export default function Reveal({ as: Tag = 'div', className, children, stagger = 0.08, ...rest }) {
  const ref = useRef(null);
  const { paused } = useApp();
  useLayoutEffect(() => {
    if (paused || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current.children, {
        y: 28,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger,
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, [paused]);
  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
