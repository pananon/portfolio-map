import { useLayoutEffect, useSyncExternalStore } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

// Closest GSAP ease to cubic-bezier(.22,.61,.36,1), the site's entrance curve.
export const EASE = 'power3.out';

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia(REDUCED_QUERY).matches;

const subscribeReduced = callback => {
  const query = window.matchMedia(REDUCED_QUERY);
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
};

export const useReducedMotion = () => useSyncExternalStore(subscribeReduced, prefersReducedMotion, () => false);

// Lenis is the only smooth-scroll engine. It is skipped entirely under reduced motion.
let lenis = null;
export const getLenis = () => lenis;

export function startSmoothScroll() {
  if (prefersReducedMotion()) return () => {};
  lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = time => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollToTarget(target, { immediate = false } = {}) {
  if (lenis) {
    lenis.scrollTo(target, { immediate, force: true });
    return;
  }
  const behavior = immediate || prefersReducedMotion() ? 'auto' : 'smooth';
  if (typeof target === 'number') window.scrollTo({ top: target, behavior });
  else target.scrollIntoView({ behavior, block: 'start' });
}

// Section choreography: headings rise word by word, supporting blocks follow.
// Content is fully visible in markup; GSAP only sets the start state when motion is allowed.
export function useReveal(ref) {
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !ref.current) return undefined;
    const ctx = gsap.context(() => {
      const root = ref.current;
      root.querySelectorAll('[data-split]').forEach(el => {
        gsap.from(el.querySelectorAll('.split-inner'), {
          yPercent: 110,
          duration: 0.76,
          ease: EASE,
          stagger: 0.055,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });
      root.querySelectorAll('[data-reveal]').forEach(el => {
        gsap.from(el, {
          y: 22,
          autoAlpha: 0,
          duration: 0.6,
          ease: EASE,
          delay: 0.12,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });
      root.querySelectorAll('[data-reveal-stagger]').forEach(el => {
        gsap.from(el.children, {
          y: 18,
          autoAlpha: 0,
          duration: 0.56,
          ease: EASE,
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });
      root.querySelectorAll('[data-reveal-mask]').forEach(el => {
        gsap.from(el, {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 0.76,
          ease: EASE,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [ref]);
}
