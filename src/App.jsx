import React from 'react';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import InteractiveMap from './components/InteractiveMap';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Awards from './components/Awards';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import ParticleBackground from './components/ParticleBackground';
import CursorTrail from './components/CursorTrail';
import FloatingActionButton from './components/FloatingActionButton';
import { portfolioData } from './data/portfolioData';

function App() {
  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Cool Background Effects */}
      <ParticleBackground />
      <CursorTrail />
      
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section id="hero">
          <Hero data={portfolioData.personal} />
        </section>
        
        {/* Interactive Map Section */}
        <section id="journey" className="section-padding bg-white">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-secondary-900 mb-4">
                My Journey Across India
              </h2>
              <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                Explore my professional journey through the cities where I've worked and grown
              </p>
            </motion.div>
            <InteractiveMap data={portfolioData} />
          </div>
        </section>
        
        {/* Experience Section */}
        <section id="experience" className="section-padding bg-secondary-50">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-secondary-900 mb-4">
                Professional Experience
              </h2>
              <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                A timeline of my career progression and achievements
              </p>
            </motion.div>
            <Experience experiences={portfolioData.experience} />
          </div>
        </section>
        
        {/* Education Section */}
        <section id="education" className="section-padding bg-white">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-secondary-900 mb-4">
                Education
              </h2>
              <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                My academic background and qualifications
              </p>
            </motion.div>
            <Education education={portfolioData.education} />
          </div>
        </section>
        
        {/* Skills Section */}
        <section id="skills" className="section-padding bg-secondary-50">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-secondary-900 mb-4">
                Skills & Certifications
              </h2>
              <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                Technical skills, languages, and professional certifications
              </p>
            </motion.div>
            <Skills skills={portfolioData.skills} awards={portfolioData.awards} />
          </div>
        </section>
        
        {/* Awards Section */}
        <section id="awards" className="section-padding bg-white">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-secondary-900 mb-4">
                Awards & Recognition
              </h2>
              <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                Celebrating achievements that showcase dedication and excellence across multiple domains
              </p>
            </motion.div>
            <Awards awards={portfolioData.awards} />
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="section-padding bg-secondary-50">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-secondary-900 mb-4">
                Get In Touch
              </h2>
              <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
                Let's connect and discuss opportunities
              </p>
            </motion.div>
            <Contact personal={portfolioData.personal} />
          </div>
        </section>
      </main>
      
      {/* Floating Action Button */}
      <FloatingActionButton personalData={portfolioData.personal} />
      
      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-8">
        <div className="container-max text-center">
          <p className="text-secondary-300">
            © 2024 Harimangal Pandey. All rights reserved.
          </p>
          <p className="text-secondary-400 text-sm mt-2">
            Built with React, Tailwind CSS, and Framer Motion
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App; 