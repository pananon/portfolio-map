import React, { useEffect, useRef } from 'react';
import Icon from './Icon';
import { JOURNEY_DATA } from '../data/journeyData';
import { CHAPTER_META, yearAt } from '../data/journeyGeo';
import { scrollToTarget } from '../lib/motion';

// Scroll distance per chapter, as a share of the viewport height.
const CHAPTER_SVH = 65;

const KIND = { intro: 'The atlas', education: 'Foundations', work: 'Experience' };

// A single scroll calculation keeps the card and globe in sync in both directions.
// Scroll progress (a float, chapter index + fraction) is written to a ref every frame so the
// globe can scrub routes and camera without re-rendering React.
export default function JourneyMap({ activeStep = 0, onStepChange, progressRef, jumpRef }) {
  const sectionRef = useRef(null);
  const yearRef = useRef(null);
  const item = JOURNEY_DATA[activeStep];
  const meta = CHAPTER_META[activeStep];

  // Pixel length of one chapter: the scrollable range divided evenly across chapters.
  const chapterLength = () => {
    const section = sectionRef.current;
    return (section.offsetHeight - section.firstElementChild.offsetHeight) / JOURNEY_DATA.length;
  };

  useEffect(() => {
    let frame;
    const update = () => {
      const section = sectionRef.current;
      const progress = Math.max(0, Math.min(JOURNEY_DATA.length - 0.001, -section.getBoundingClientRect().top / chapterLength()));
      if (progressRef) progressRef.current = progress;
      if (yearRef.current) yearRef.current.textContent = yearAt(progress);
      onStepChange?.(Math.floor(progress));
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, [onStepChange, progressRef]);

  const goTo = index => {
    const section = sectionRef.current;
    scrollToTarget(window.scrollY + section.getBoundingClientRect().top + index * chapterLength() + 1, { immediate: true });
  };
  if (jumpRef) jumpRef.current = goTo;

  return <section id="journey" ref={sectionRef} className="journey" data-tone="dark" aria-labelledby="journey-title" style={{ height: `calc(${JOURNEY_DATA.length * CHAPTER_SVH}svh + 100svh)` }}>
    <div className="atlas-stage">
      <header className="atlas-heading">
        <p className="chapter-label mono">02 — Journey</p>
        <h2 id="journey-title">A career in coordinates</h2>
      </header>
      <div className="atlas-map-caption mono" aria-hidden="true">
        <span ref={yearRef} className="atlas-year">{yearAt(activeStep)}</span>
        <span>India / {item.location}</span>
        <span>{item.coordinates[0].toFixed(2)}° N &nbsp; {item.coordinates[1].toFixed(2)}° E</span>
      </div>
      <article className="atlas-card">
        <div className="atlas-card-top mono"><span>{KIND[item.type]}</span><span>{String(activeStep + 1).padStart(2, '0')} / {String(JOURNEY_DATA.length).padStart(2, '0')}</span></div>
        <div key={item.id} className="atlas-card-body">
          <p className="atlas-date mono">{item.year}</p>
          <h3>{item.title}</h3>
          {item.role && <p className="atlas-role">{item.role}</p>}
          <p className="atlas-city"><Icon name="map-point-linear" size={14} />{item.location}{meta.cityCount > 1 && <span className="atlas-city-count">&nbsp;· {meta.cityIndex + 1} of {meta.cityCount}</span>}</p>
          <p className="atlas-description">{item.description}</p>
          {item.highlights && <ul className="atlas-highlights">{item.highlights.map(text => <li key={text}>{text}</li>)}</ul>}
          {item.technologies.length > 0 && <ul className="tag-row" aria-label="Skills">{item.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>}
        </div>
        <footer className="atlas-card-footer">
          <nav aria-label="Journey chapters" className="atlas-chapters">
            {JOURNEY_DATA.map((chapter, index) => <button key={chapter.id} type="button" aria-label={`Go to ${chapter.title}`} aria-current={index === activeStep ? 'step' : undefined} onClick={() => goTo(index)}><span /></button>)}
          </nav>
          <div className="atlas-controls">
            <span className="mono">Scroll, drag the globe, or pick a pin</span>
            <div>
              <button type="button" aria-label="Previous chapter" disabled={activeStep === 0} onClick={() => goTo(activeStep - 1)}><Icon name="arrow-left-linear" /></button>
              <button type="button" aria-label="Next chapter" disabled={activeStep === JOURNEY_DATA.length - 1} onClick={() => goTo(activeStep + 1)}><Icon name="arrow-right-linear" /></button>
            </div>
          </div>
        </footer>
      </article>
    </div>
  </section>;
}
