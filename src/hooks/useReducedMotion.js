import { useSyncExternalStore } from 'react';

function getReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function subscribe(callback) {
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

export default function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    getReducedMotion,
    () => false
  );
}
