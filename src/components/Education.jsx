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
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-primary-500 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-primary-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-secondary-900 mb-1">
                  {edu.degree}
                </h3>
                <p className="text-lg font-medium text-primary-600 mb-3">
                  {edu.institution}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{edu.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{edu.location}</span>
                  </div>
                </div>
                
                <p className="text-secondary-700 leading-relaxed">
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
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8" />
            <h3 className="text-2xl font-bold">Educational Journey</h3>
          </div>
          <p className="text-primary-100 leading-relaxed mb-6">
            My academic background has provided me with a strong foundation in computer science, 
            problem-solving, and analytical thinking that I apply in my professional work.
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-primary-100">Degree</span>
              <span className="font-semibold">BTech Computer Science</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-primary-100">Graduation</span>
              <span className="font-semibold">2020</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-primary-100">Focus Areas</span>
              <span className="font-semibold">Algorithms, Data Structures</span>
            </div>
          </div>
        </div>

        {/* Key Skills from Education */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h4 className="text-lg font-semibold text-secondary-900 mb-4">
            Skills Developed
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              'Problem Solving',
              'Data Structures',
              'Algorithms',
              'Mathematics',
              'Logical Thinking',
              'Research Skills'
            ].map((skill, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-sm text-secondary-700"
              >
                <div className="w-2 h-2 bg-primary-500 rounded-full" />
                <span>{skill}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Academic Achievements */}
        <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 text-white rounded-xl p-6">
          <h4 className="text-lg font-semibold mb-4">Academic Highlights</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">1</span>
              </div>
              <span>Strong foundation in computer science fundamentals</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">2</span>
              </div>
              <span>Practical experience with programming languages</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">3</span>
              </div>
              <span>Problem-solving and analytical thinking skills</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Education; 