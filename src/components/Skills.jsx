import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Globe, Award, Star, Zap } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

const Skills = ({ skills, awards }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeCategory, setActiveCategory] = useState('technical');

  const categories = [
    { id: 'technical', name: 'Technical Skills', icon: Code },
    { id: 'languages', name: 'Languages', icon: Globe },
    { id: 'certifications', name: 'Certifications', icon: Award },
    { id: 'awards', name: 'Awards', icon: Star },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const getSkillsData = () => {
    switch (activeCategory) {
      case 'technical':
        return skills.technical;
      case 'languages':
        return skills.languages;
      case 'certifications':
        return skills.certifications;
      case 'awards':
        return awards;
      default:
        return skills.technical;
    }
  };

  const getSkillLevel = (skill) => {
    const skillLevels = {
      'React.js': 95,
      'React Native': 90,
      'TypeScript': 85,
      'Angular': 80,
      'Node.js': 85,
      'MongoDB': 80,
      'Redux': 90,
      'Express.js': 85,
      'UI/UX': 75,
      'Mapbox': 70,
      'AntD': 85,
      'Rechart': 80,
      'JavaScript': 90,
      'HTML/CSS': 95,
      'Git': 85,
    };
    return skillLevels[skill] || 75;
  };

  return (
    <div ref={ref} className="space-y-12">
      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap justify-center gap-4"
      >
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 border ${isActive
                ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
            >
              <Icon className="w-4 h-4" />
              <span>{category.name}</span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {getSkillsData().map((skill, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="h-full"
          >
            <SpotlightCard className="h-full p-6 transition-all duration-300 group hover:border-white/30">
              {activeCategory === 'technical' ? (
                // Technical Skills with Progress Bars
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-white tracking-wide group-hover:text-blue-400 transition-colors">{skill}</h3>
                    <span className="text-xs font-mono text-gray-400">
                      {getSkillLevel(skill)}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${getSkillLevel(skill)}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="bg-white h-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] group-hover:bg-blue-400 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-500"
                    />
                  </div>
                </div>
              ) : activeCategory === 'languages' ? (
                // Languages
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 group-hover:scale-110 transition-transform duration-300 group-hover:border-blue-500/30 group-hover:bg-blue-500/10">
                    <Globe className="w-6 h-6 text-white group-hover:text-blue-400 transition-colors" />
                  </div>
                  <h3 className="font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{skill}</h3>
                  <p className="text-sm text-gray-400">Fluent proficiency</p>
                </div>
              ) : activeCategory === 'certifications' ? (
                // Certifications
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 group-hover:scale-110 transition-transform duration-300 group-hover:border-purple-500/30 group-hover:bg-purple-500/10">
                    <Award className="w-6 h-6 text-white group-hover:text-purple-400 transition-colors" />
                  </div>
                  <h3 className="font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">{skill}</h3>
                  <p className="text-sm text-gray-400">Professional Certification</p>
                </div>
              ) : (
                // Awards
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 group-hover:scale-110 transition-transform duration-300 group-hover:border-yellow-500/30 group-hover:bg-yellow-500/10">
                    <Star className="w-6 h-6 text-white group-hover:text-yellow-400 transition-colors" />
                  </div>
                  <h3 className="font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">{skill}</h3>
                  <p className="text-sm text-gray-400">Distinguished Achievement</p>
                </div>
              )}
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Skills Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
      >
        <div className="glass-dark rounded-xl p-6 text-center border border-white/5">
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Code className="w-5 h-5 text-white" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">{skills.technical.length}</div>
          <div className="text-sm text-gray-400 uppercase tracking-wider">Technical Skills</div>
        </div>

        <div className="glass-dark rounded-xl p-6 text-center border border-white/5">
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">{skills.certifications.length}</div>
          <div className="text-sm text-gray-400 uppercase tracking-wider">Certifications</div>
        </div>

        <div className="glass-dark rounded-xl p-6 text-center border border-white/5">
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-5 h-5 text-white" />
          </div>
          <div className="text-3xl font-bold text-white mb-1">{awards.length}</div>
          <div className="text-sm text-gray-400 uppercase tracking-wider">Awards</div>
        </div>
      </motion.div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="glass-dark rounded-2xl p-8 text-center border border-white/5 mt-12 bg-gradient-to-b from-white/5 to-transparent"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Zap className="w-6 h-6 text-white" />
          <h3 className="font-display text-2xl font-bold text-white">Continuous Evolution</h3>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
          I am committed to mastering emerging technologies and refining my craft.
          Innovation requires a constant pursuit of knowledge and improvement.
        </p>
      </motion.div>
    </div>
  );
};

export default Skills;