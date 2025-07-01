import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Globe, Award, Star, Zap } from 'lucide-react';

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
    // Define skill levels for technical skills
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
    <div ref={ref} className="space-y-8">
      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap justify-center gap-4"
      >
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-secondary-700 hover:bg-primary-50 hover:text-primary-600 shadow-md'
              }`}
            >
              <Icon className="w-5 h-5" />
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
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-secondary-100"
          >
            {activeCategory === 'technical' ? (
              // Technical Skills with Progress Bars
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-secondary-900">{skill}</h3>
                  <span className="text-sm font-medium text-primary-600">
                    {getSkillLevel(skill)}%
                  </span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${getSkillLevel(skill)}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                  />
                </div>
              </div>
            ) : activeCategory === 'languages' ? (
              // Languages
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-secondary-900">{skill}</h3>
                <p className="text-sm text-secondary-600 mt-1">Fluent</p>
              </div>
            ) : activeCategory === 'certifications' ? (
              // Certifications
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-secondary-900">{skill}</h3>
                <p className="text-sm text-secondary-600 mt-1">Certified</p>
              </div>
            ) : (
              // Awards
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold text-secondary-900">{skill}</h3>
                <p className="text-sm text-secondary-600 mt-1">Achievement</p>
              </div>
            )}
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
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Code className="w-6 h-6" />
          </div>
          <div className="text-2xl font-bold mb-2">{skills.technical.length}</div>
          <div className="text-blue-100">Technical Skills</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-6 h-6" />
          </div>
          <div className="text-2xl font-bold mb-2">{skills.certifications.length}</div>
          <div className="text-green-100">Certifications</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-6 h-6" />
          </div>
          <div className="text-2xl font-bold mb-2">{awards.length}</div>
          <div className="text-purple-100">Awards & Recognition</div>
        </div>
      </motion.div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="bg-gradient-to-br from-secondary-50 to-primary-50 rounded-xl p-8 text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Zap className="w-8 h-8 text-primary-600" />
          <h3 className="text-2xl font-bold text-secondary-900">Continuous Learning</h3>
        </div>
        <p className="text-secondary-700 max-w-2xl mx-auto leading-relaxed">
          I believe in staying updated with the latest technologies and best practices. 
          My commitment to continuous learning has helped me adapt to new challenges 
          and deliver innovative solutions throughout my career.
        </p>
      </motion.div>
    </div>
  );
};

export default Skills; 