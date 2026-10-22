import React, { Suspense, lazy, memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import Hero from './components/Hero';
import Work from './components/Work';
import JourneyMap from './components/JourneyMap';
import Capabilities from './components/Capabilities';
import Contact from './components/Contact';
import SiteFooter from './components/SiteFooter';
import { portfolioData } from './data/portfolioData';
import { ScrollTrigger, scrollToTarget, startSmoothScroll } from './lib/motion';

// Static sections skip re-rendering when the journey step changes.
const StaticHeader = memo(SiteHeader);
const StaticHero = memo(Hero);
const StaticWork = memo(Work);
const StaticCapabilities = memo(Capabilities);
const StaticContact = memo(Contact);
const StaticFooter = memo(SiteFooter);

// three.js loads in its own chunk so the page content paints before the globe.
const GlobalEarth = lazy(() => import('./components/GlobalEarth'));

const MainPortfolio = ({ journeyOnly = false }) => {
  const [journeyStep, setJourneyStep] = useState(0);
  const [heroActive, setHeroActive] = useState(!journeyOnly);
  const [journeyActive, setJourneyActive] = useState(journeyOnly);
  const journeyProgress = useRef(0);
  const journeyJump = useRef(null);
  const selectChapter = useCallback(index => journeyJump.current?.(index), []);

  useEffect(() => startSmoothScroll(), []);

  // In-page anchors go through the scroll engine and move focus to the destination.
  useEffect(() => {
    const onClick = event => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      scrollToTarget(target);
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      history.replaceState(null, '', link.getAttribute('href'));
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // The globe only renders while the hero or the journey is on screen.
  useLayoutEffect(() => {
    const triggers = [
      document.getElementById('top') && ScrollTrigger.create({ trigger: '#top', start: 'top bottom', end: 'bottom top', onToggle: self => setHeroActive(self.isActive) }),
      ScrollTrigger.create({ trigger: '#journey', start: 'top 60%', end: 'bottom 40%', onToggle: self => setJourneyActive(self.isActive) }),
    ].filter(Boolean);
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => {
      triggers.forEach(trigger => trigger.kill());
      window.removeEventListener('load', refresh);
    };
  }, []);

  return (
    <div className="site">
      <a className="skip-link" href="#content">Skip to content</a>
      <Suspense fallback={<div className="atlas-background" data-visible aria-hidden="true" />}>
        <GlobalEarth activeStep={journeyStep} layout={journeyActive ? 'journey' : 'hero'} visible={heroActive || journeyActive} progress={journeyProgress} onSelect={selectChapter} />
      </Suspense>
      <StaticHeader />
      <main id="content" className="site-main">
        {!journeyOnly && <StaticHero data={portfolioData.personal} />}
        {!journeyOnly && <StaticWork projects={portfolioData.projects} />}
        <JourneyMap activeStep={journeyStep} onStepChange={setJourneyStep} progressRef={journeyProgress} jumpRef={journeyJump} />
        <StaticCapabilities skills={portfolioData.skills} awards={portfolioData.awards} />
        <StaticContact personal={portfolioData.personal} />
      </main>
      <StaticFooter personal={portfolioData.personal} />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPortfolio />} />
        <Route path="/journey" element={<MainPortfolio journeyOnly />} />
      </Routes>
    </Router>
  );
}

export default App;
