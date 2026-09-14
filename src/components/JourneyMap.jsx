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
    <div className="sticky top-0 h-[100svh] flex items-end md:items-center justify-end p-4 md:p-10 lg:p-16">
      <div className="w-full md:w-[48%] max-h-[75svh] md:max-h-[90svh] overflow-y-auto rounded-2xl border border-white/15 bg-black/85 backdrop-blur-xl p-5 md:p-8">
        <div className="flex justify-between gap-4 text-xs uppercase tracking-widest text-blue-300 mb-4"><span>{item.year}</span><span>{activeStep + 1} / {JOURNEY_DATA.length}</span></div>
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">{item.title}</h2>
        {item.role && <p className="text-blue-200 text-sm mb-3">{item.role}</p>}
        <p className="text-sm text-white mb-4">● {item.location}</p>
        <p className="text-gray-300 leading-relaxed">{item.description}</p>
        {item.highlights && <ul className="list-disc pl-4 mt-4 space-y-2 text-sm text-gray-300 leading-relaxed">{item.highlights.map(text => <li key={text}>{text}</li>)}</ul>}
        <div className="flex flex-wrap gap-2 mt-5">{item.technologies.map(tech => <span key={tech} className="text-xs text-blue-200 bg-blue-900/30 rounded-full px-3 py-1">{tech}</span>)}</div>
        <nav aria-label="Journey chapters" className="mt-6 flex flex-wrap gap-1">{JOURNEY_DATA.map((chapter, index) => <button key={chapter.id} aria-label={`Go to ${chapter.title}`} aria-current={index === activeStep ? 'step' : undefined} onClick={() => goTo(index)} className="min-w-[28px] min-h-[32px] flex-1 flex items-center py-2 group"><span className={`h-1 w-full rounded-full ${index <= activeStep ? 'bg-blue-400' : 'bg-white/20 group-hover:bg-white/60'}`} /></button>)}</nav>
        <p className="text-xs text-gray-400 mt-2">Scroll to follow the journey · or choose a chapter</p>
      </div>
    </div>
  </section>;
}
