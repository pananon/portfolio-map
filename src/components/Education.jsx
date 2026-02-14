import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Calendar, MapPin, BookOpen } from 'lucide-react';

const Education = ({ education }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="space-y-6"
      >
        {education.map((edu, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="glass-dark rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {edu.degree}
                </h3>
                <p className="text-xl font-medium text-gray-400 mb-4">
                  {edu.institution}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{edu.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{edu.location}</span>
                  </div>
                </div>

                <p className="text-gray-400 leading-relaxed text-sm">
                  {edu.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Education Summary */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="space-y-6"
      >
        <div className="glass-dark rounded-2xl p-8 border border-white/5">
          <div className="flex items-center gap-4 mb-6">
            <BookOpen className="w-8 h-8 text-white" />
            <h3 className="text-2xl font-bold text-white">Academic Journey</h3>
          </div>
          <p className="text-gray-400 leading-relaxed mb-8">
            My academic foundation has been built on rigorous computer science principles,
            focusing on algorithms, data structures, and software engineering practices.
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">Degree</span>
              <span className="font-semibold text-white">BTech Computer Science</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">Graduation</span>
              <span className="font-semibold text-white">2020</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">Focus Areas</span>
              <span className="font-semibold text-white">Algorithms, Systems</span>
            </div>
          </div>
        </div>

        {/* Key Skills from Education */}
        <div className="glass-dark rounded-2xl p-8 border border-white/5">
          <h4 className="text-lg font-semibold text-white mb-6">
            Core Competencies
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              'Problem Solving',
              'Data Structures',
              'Algorithms',
              'System Design',
              'Logical Analysis',
              'Technical Research'
            ].map((skill, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 text-sm text-gray-400 bg-white/5 p-3 rounded-lg border border-white/5"
              >
                <div className="w-1.5 h-1.5 bg-white rounded-full opacity-50" />
                <span>{skill}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Education;