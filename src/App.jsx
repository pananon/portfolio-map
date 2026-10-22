import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
// NEW 3D Component
import JourneyMap from './components/JourneyMap';
import GlobalEarth from './components/GlobalEarth';
import { portfolioData } from './data/portfolioData';

// Reusable Scale-In Section Wrapper
const ZoomSection = ({ children, className, id }) => {
  return (
    <motion.section
      id={id}
      className={className}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: false, amount: 0.3 }}
      variants={{
        offscreen: { opacity: 0, scale: 0.85, filter: 'blur(10px)' },
        onscreen: {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } // Custom easing
        }
      }}
    >
      {children}
    </motion.section>
  );
};

// Component for the main single-page scroll layout
const MainPortfolio = ({ journeyOnly = false }) => {
  const [journeyStep, setJourneyStep] = React.useState(0);

  // Smooth scroll only needed here
  useEffect(() => {
    const handleLinkClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleLinkClick);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleLinkClick);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-white selection:text-black">

      {/* Background Elements */}
      <GlobalEarth activeStep={journeyStep} />

      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* <ParticleBackground /> - Replaced by GlobalEarth */}
        <div className="noise-bg opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* <Navigation /> Removed as per request */}

      <main className="relative z-10">

        {!journeyOnly && <ZoomSection>
          <Hero data={portfolioData.personal} />
        </ZoomSection>}

        {/* JourneyMap - Updates global background state */}
        <JourneyMap activeStep={journeyStep} onStepChange={setJourneyStep} />

        <ZoomSection id="projects" className="section-padding">
          <div className="container-max">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Selected projects</h2>
            <p className="text-gray-300 mb-10 max-w-2xl">Products I founded and built, from AI tooling to fitness platforms and open-source React utilities.</p>
            <Projects projects={portfolioData.projects} />
          </div>
        </ZoomSection>
        {/* Skills Section */}
        <ZoomSection id="skills" className="section-padding">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} // Keep title animation simple
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
                Expertise
              </h2>
              <div className="h-1 w-20 bg-white/20" />
            </motion.div>
            <Skills skills={portfolioData.skills} awards={portfolioData.awards} />
          </div>
        </ZoomSection>

        {/* Contact Section */}
        <ZoomSection id="contact" className="section-padding min-h-[50vh] flex flex-col justify-center">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
                Contact
              </h2>
              <div className="h-1 w-20 bg-white/20" />
            </motion.div>
            <Contact personal={portfolioData.personal} />
          </div>
        </ZoomSection>
      </main>

      {/* Minimal Footer */}
      <footer className="py-8 border-t border-white/10 relative z-10">
        <div className="container-max text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Hari Mangal Pandey. Crafted with precision.
          </p>
        </div>
      </footer>
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