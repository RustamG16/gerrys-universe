import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

// Safe localStorage helpers: private windows and blocked storage must never break the page.
export function readStore(key, fallback, validate = () => true) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value !== null && validate(value) ? value : fallback;
  } catch {
    return fallback;
  }
}
export function writeStore(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

const AppContext = createContext(null);

export const DEFAULT_RETREAT = { attendees: 8, price: 850, variable: 420, fixed: 2200 };

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => readStore('universe-locale', 'en', (v) => ['en', 'de'].includes(v)));
  const reduced = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [paused, setPaused] = useState(reduced);
  const [visited, setVisited] = useState(() => readStore('universe-visited', [], Array.isArray));
  const [secret, setSecret] = useState(() => readStore('universe-secret', false, (v) => typeof v === 'boolean'));
  const [retreat, setRetreat] = useState(DEFAULT_RETREAT);
  const [toast, setToast] = useState(null);
  const [links, setLinks] = useState({});

  useEffect(() => {
    document.documentElement.lang = lang;
    writeStore('universe-locale', lang);
  }, [lang]);
  useEffect(() => writeStore('universe-visited', visited), [visited]);
  useEffect(() => {
    document.body.dataset.motion = paused ? 'off' : 'on';
  }, [paused]);
  useEffect(() => writeStore('universe-secret', secret), [secret]);
  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'media/project-links.json')
      .then((r) => (r.ok ? r.json() : {}))
      .then(setLinks)
      .catch(() => {});
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    const update = (e) => e.matches && setPaused(true);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(id);
  }, [toast]);

  const value = useMemo(() => {
    const t = (x) => (x == null ? '' : typeof x === 'string' || typeof x === 'number' ? x : x[lang]);
    const L = (en, de) => (lang === 'en' ? en : de);
    const euro = (n, digits = 0) =>
      new Intl.NumberFormat(lang === 'de' ? 'de-AT' : 'en-IE', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: digits,
        minimumFractionDigits: digits,
      }).format(n);
    const visit = (id, achievement) =>
      setVisited((v) => {
        if (v.includes(id)) return v;
        if (achievement) setToast(achievement);
        return [...v, id];
      });
    return { lang, setLang, t, L, euro, paused, setPaused, visited, visit, secret, setSecret, retreat, setRetreat, toast, setToast, links };
  }, [lang, paused, visited, secret, retreat, toast, links]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);

export const pair = (en, de) => ({ en, de });

export function media(file) {
  return import.meta.env.BASE_URL + 'media/' + file;
}

// Roving-tabindex keyboard behaviour shared by every tablist (arrows, Home, End).
export function tabKeyDown(e, index, count, setIndex) {
  let next;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (index + 1) % count;
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (index + count - 1) % count;
  else if (e.key === 'Home') next = 0;
  else if (e.key === 'End') next = count - 1;
  else return;
  e.preventDefault();
  setIndex(next);
  const tabs = e.currentTarget.parentElement;
  requestAnimationFrame(() => tabs.querySelectorAll('[role=tab]')[next]?.focus());
}
