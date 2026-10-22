import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Icon from './Icon';
import SplitWords from './SplitWords';
import { gsap, prefersReducedMotion } from '../lib/motion';

const istFormat = new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false });

function useIstTime() {
  const [time, setTime] = useState(() => istFormat.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setTime(istFormat.format(new Date())), 20000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Hero({ data }) {
  const root = useRef(null);
  const time = useIstTime();

  // Intro: the name rises, the survey rule draws, the readouts settle.
  // Navigation, positioning copy and CTAs are never hidden, so the page is usable from frame one.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero-title .split-inner', { yPercent: 112, duration: 1.05, stagger: 0.08, ease: 'power4.out' }, 0.15)
        .from('.hero-rule', { scaleX: 0, transformOrigin: 'left center', duration: 1 }, 0.45)
        .from('.hero-coords > *', { y: 10, autoAlpha: 0, duration: 0.5, stagger: 0.06 }, 0.55)
        .from('.hero-facts > div', { y: 16, autoAlpha: 0, duration: 0.6, stagger: 0.07 }, 0.75);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={root} className="hero" data-tone="dark" aria-labelledby="hero-title">
      <div className="hero-inner wrap">
        <p className="hero-coords mono">
          <span>17.39° N · 78.49° E</span>
          <span>Hyderabad, India</span>
          <span><time>{time}</time> IST</span>
        </p>

        <SplitWords as="h1" id="hero-title" className="hero-title" lines={['Hari Mangal', 'Pandey']} />

        <div className="hero-rule" aria-hidden="true" />

        <div className="hero-lede">
          <p className="hero-role">{data.title}</p>
          <p className="hero-summary">
            I build web and mobile products with React, Next.js, React Native and Node.js, and the streaming AI,
            retrieval and agentic features that live inside them.
          </p>
          <div className="hero-ctas">
            <a href="#work" className="btn btn-solid">Selected work <Icon name="arrow-down-linear" /></a>
            <a href="#journey" className="btn btn-line">Open the atlas</a>
          </div>
        </div>

        <dl className="hero-facts">
          <div><dt className="mono">In production</dt><dd>6+ years</dd></div>
          <div><dt className="mono">Built end to end</dt><dd>4 products</dd></div>
          <div><dt className="mono">Now</dt><dd>Tech Mahindra <span>for Microsoft</span></dd></div>
        </dl>
      </div>
    </section>
  );
}
