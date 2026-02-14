import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { JOURNEY_DATA } from '../data/journeyData';

// --- MAIN PAGE ---

const JourneyMap = ({ activeStep = 0, onStepChange }) => {

    // Internal state can be removed if specific step logic is handled by parent,
    // but here we just need to report changes.

    return (
        <section className="relative w-full">
            {/* 
          1. STICKY VISUAL LAYER 
          Stays fixed at the top of the viewport while we scroll through the 'triggers' container.
      */}
            <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none">

                {/* HUD / Text Overlay (Fixed) */}
                <div className="absolute inset-0 z-20 flex flex-col justify-center items-center p-6 text-center pointer-events-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeStep}
                            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="max-w-4xl"
                        >
                            <div className="inline-block mb-4 overflow-hidden">
                                <h3 className="text-blue-500 font-mono text-sm tracking-[0.3em] uppercase">
                                    {JOURNEY_DATA[activeStep].year}
                                </h3>
                            </div>

                            <h1 className="font-display text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                                {JOURNEY_DATA[activeStep].title}
                            </h1>

                            <div className="flex items-center justify-center gap-4 text-white/60 mb-6">
                                <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10">
                                    {JOURNEY_DATA[activeStep].location}
                                </span>
                            </div>

                            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light mb-8 text-balance">
                                {JOURNEY_DATA[activeStep].description}
                            </p>

                            {/* Tech Stack Tags */}
                            {JOURNEY_DATA[activeStep].technologies && JOURNEY_DATA[activeStep].technologies.length > 0 && (
                                <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
                                    {JOURNEY_DATA[activeStep].technologies.map(tech => (
                                        <span key={tech} className="text-xs font-mono text-blue-400 bg-blue-900/20 border border-blue-500/20 px-3 py-1.5 rounded-full backdrop-blur-sm transition-colors hover:bg-blue-900/40 hover:border-blue-500/40 cursor-default">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Progress Bar (Fixed) */}
                <div className="absolute left-10 top-1/2 -translate-y-1/2 h-48 w-0.5 bg-white/10 hidden md:block">
                    <motion.div
                        className="w-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                        initial={{ height: '0%' }}
                        animate={{ height: `${(activeStep / (JOURNEY_DATA.length - 1)) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            {/* 
          2. SCROLL TRIGGERS 
          Overlaying the height of the section.
      */}
            <div className="absolute top-0 left-0 w-full z-30 pointer-events-none">
                {JOURNEY_DATA.map((item, index) => (
                    <ScrollTrigger
                        key={item.id}
                        index={index}
                        setActiveStep={onStepChange}
                    />
                ))}
            </div>

            {/* Creates the scrollable height */}
            <div style={{ height: `${JOURNEY_DATA.length * 40}vh` }} />

        </section>
    );
};

// Scroll Trigger Component
const ScrollTrigger = ({ index, setActiveStep }) => {
    const { ref, inView } = useInView({
        threshold: 0.5,
        rootMargin: "-20% 0px -20% 0px" // Trigger when element is more centrally visible
    });

    useEffect(() => {
        if (inView && setActiveStep) setActiveStep(index);
    }, [inView, index, setActiveStep]);

    return (
        <div ref={ref} className="h-[40vh] w-full flex items-center justify-center">
            {/* Visual debugger helper (optional) */}
            {/* <span className="text-xs text-white/10">Step {index + 1}</span> */}
        </div>
    );
};

export default JourneyMap;
