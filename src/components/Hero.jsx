import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import TypingAnimation from './TypingAnimation';
import MagneticButton from './MagneticButton';

const Hero = ({ data }) => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 md:px-24 pt-20 overflow-hidden">

      {/* Main Content */}
      <div className="container-max relative z-10">
        <div className="flex flex-col gap-2">

          {/* Greeting / Role */}
          <div className="overflow-hidden h-8 mb-4">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-blue-400 font-mono tracking-wide uppercase"
            >
              <TypingAnimation
                texts={['Full Stack Developer', 'Creative Technologist', 'Problem Solver']}
                speed={60}
                delay={2000}
              />
            </motion.div>
          </div>

          {/* Name - Staggered Reveal */}
          <div className="overflow-hidden">
            <h1
              className="font-display text-6xl md:text-9xl font-bold tracking-tighter text-white mix-blend-difference flex relative overflow-hidden"
            >
              {"HARIMANGAL".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 120 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.03, ease: [0.2, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </h1>
          </div>

          <div className="overflow-hidden">
            <h1
              className="font-display text-6xl md:text-9xl font-bold tracking-tighter text-gray-500/50 mix-blend-difference flex relative overflow-hidden"
            >
              {"PANDEY".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 120 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.03, ease: [0.2, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Intro Text */}
          <div className="mt-12 max-w-2xl overflow-hidden">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed text-balance"
            >
              {data.summary}
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 flex gap-6"
          >
            <MagneticButton href="https://mangalcore.com">
              <div className="group relative px-8 py-4 bg-white text-black rounded-full font-medium overflow-hidden transition-transform">
                <span className="relative z-10">Explore Works</span>
                <div className="absolute inset-0 bg-gray-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </div>
            </MagneticButton>

            <MagneticButton href="#contact">
              <div className="px-8 py-4 border border-white/20 text-white rounded-full font-medium hover:bg-white/10 transition-colors">
                Contact Me
              </div>
            </MagneticButton>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 right-6 md:right-24 flex items-center gap-4 text-gray-500"
      >
        <div className="w-12 h-[1px] bg-gray-700" />
        <span className="text-sm uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>

      {/* Abstract Background Element (Subtle) */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

    </section>
  );
};

export default Hero; 