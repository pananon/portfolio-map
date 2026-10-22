import React, { useEffect, useRef } from 'react';
import { JOURNEY_DATA } from '../data/journeyData';

// A single scroll calculation keeps the card and globe in sync in both directions.
export default function JourneyMap({ activeStep = 0, onStepChange }) {
  const sectionRef = useRef(null);
  const item = JOURNEY_DATA[activeStep];
  useEffect(() => {
    let frame;
    const update = () => {
      const section = sectionRef.current;
      const height = section.offsetHeight / (JOURNEY_DATA.length + 1);
      const next = Math.max(0, Math.min(JOURNEY_DATA.length - 1, Math.floor(-section.getBoundingClientRect().top / height)));
      onStepChange?.(next);
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, [onStepChange]);
  const goTo = index => {
    const section = sectionRef.current;
    const height = section.offsetHeight / (JOURNEY_DATA.length + 1);
    window.scrollTo({ top: window.scrollY + section.getBoundingClientRect().top + index * height + 1, behavior: 'instant' });
  };
  return <section id="journey" ref={sectionRef} aria-label="My journey on the map" style={{ height: `${(JOURNEY_DATA.length + 1) * 100}svh` }}>
    <div className="atlas-stage">
      <header className="atlas-heading"><span className="atlas-eyebrow">A CAREER IN COORDINATES</span><p>The journey<span>.</span></p></header>
      <div className="atlas-map-caption" aria-hidden="true"><span>INDIA / {item.location.toUpperCase()}</span><span>{item.coordinates[0].toFixed(2)}° N &nbsp; {item.coordinates[1].toFixed(2)}° E</span></div>
      <article className="atlas-card">
        <div className="atlas-card-top"><span>{item.type === 'intro' ? 'THE ATLAS' : item.type === 'education' ? 'FOUNDATIONS' : 'EXPERIENCE'}</span><span>{String(activeStep + 1).padStart(2, '0')} / {JOURNEY_DATA.length}</span></div>
        <div key={item.id} className="atlas-card-body">
          <p className="atlas-date">{item.year}</p>
          <h2>{item.title}</h2>
          {item.role && <p className="atlas-role">{item.role}</p>}
          <p className="atlas-city"><span />{item.location}</p>
          <p className="atlas-description">{item.description}</p>
          {item.highlights && <ul className="atlas-highlights">{item.highlights.map(text => <li key={text}>{text}</li>)}</ul>}
          <div className="atlas-tags">{item.technologies.map(tech => <span key={tech}>{tech}</span>)}</div>
        </div>
        <footer className="atlas-card-footer">
          <nav aria-label="Journey chapters" className="atlas-chapters">{JOURNEY_DATA.map((chapter, index) => <button key={chapter.id} aria-label={`Go to ${chapter.title}`} aria-current={index === activeStep ? 'step' : undefined} onClick={() => goTo(index)}><span /></button>)}</nav>
          <div className="atlas-controls"><span>SCROLL TO EXPLORE</span><div><button aria-label="Previous chapter" disabled={activeStep === 0} onClick={() => goTo(activeStep - 1)}>←</button><button aria-label="Next chapter" disabled={activeStep === JOURNEY_DATA.length - 1} onClick={() => goTo(activeStep + 1)}>→</button></div></div>
        </footer>
      </article>
    </div>
  </section>;
}
