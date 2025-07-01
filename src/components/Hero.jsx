import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, ExternalLink, Code } from 'lucide-react';
import TypingAnimation from './TypingAnimation';

const Hero = ({ data }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const typingTexts = [
    "Full Stack Developer",
    "Problem Solver", 
    "Tech Enthusiast",
    "Creative Thinker"
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container-max relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center text-white relative"
        >
          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            {data.name}
          </motion.h1>

          {/* Title with Typing Animation */}
          <motion.div
            variants={itemVariants}
            className="text-xl md:text-2xl text-primary-200 mb-8 max-w-4xl mx-auto leading-relaxed h-8 flex items-center justify-center"
          >
            <TypingAnimation texts={typingTexts} speed={80} delay={3000} />
          </motion.div>

          {/* Summary */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-secondary-200 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            {data.summary}
          </motion.p>

          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`mailto:${data.email}`}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/20 transition-all duration-200"
            >
              <Mail size={20} />
              <span>{data.email}</span>
            </motion.a>
            
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-6 mb-16"
          >
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={data.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm p-4 rounded-full hover:bg-white/20 transition-all duration-200"
            >
              <Linkedin size={24} />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={data.links.personalSite}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm p-4 rounded-full hover:bg-white/20 transition-all duration-200"
            >
              <ExternalLink size={24} />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href={data.links.codechef}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm p-4 rounded-full hover:bg-white/20 transition-all duration-200"
            >
              <Code size={24} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Fixed Positioning */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center bg-white/5 backdrop-blur-sm"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/80 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>

      {/* Floating Elements - Enhanced Visibility */}
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-20 right-20 w-32 h-32 bg-primary-500/30 rounded-full blur-xl z-0"
      />
      
      <motion.div
        animate={{ 
          rotate: -360,
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute bottom-20 left-20 w-24 h-24 bg-secondary-500/30 rounded-full blur-xl z-0"
      />

      {/* Additional Floating Elements for Better Visual Appeal */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-1/3 left-10 w-16 h-16 bg-white/10 rounded-full blur-lg z-0"
      />

      <motion.div
        animate={{ 
          y: [0, 15, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute bottom-1/3 right-16 w-20 h-20 bg-primary-400/20 rounded-full blur-lg z-0"
      />
    </section>
  );
};

export default Hero; 