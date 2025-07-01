import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building, Calendar, MapPin, Award } from 'lucide-react';

const Experience = ({ experiences }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div ref={ref} className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-secondary-300 hidden lg:block" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="space-y-8"
      >
        {experiences.map((experience, index) => (
          <motion.div
            key={experience.id}
            variants={itemVariants}
            className="relative"
          >
            {/* Timeline Dot */}
            <div className="absolute left-6 top-6 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-lg hidden lg:block" />
            
            <div className="lg:ml-16">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-primary-500 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-secondary-900 mb-1">
                        {experience.position}
                      </h3>
                      <p className="text-lg font-medium text-primary-600 mb-2">
                        {experience.company}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{experience.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{experience.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="mt-4 lg:mt-0">
                    <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                      {experience.duration}
                    </span>
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="font-semibold text-secondary-900 mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary-600" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {experience.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-2 text-secondary-700">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="font-semibold text-secondary-900 mb-3">
                    Technologies & Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, index) => (
                      <motion.span
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 bg-secondary-100 text-secondary-700 text-sm rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors duration-200"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-xl p-6 text-center">
          <div className="text-3xl font-bold mb-2">{experiences.length}</div>
          <div className="text-primary-100">Companies Worked</div>
        </div>
        
        <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 text-white rounded-xl p-6 text-center">
          <div className="text-3xl font-bold mb-2">4+</div>
          <div className="text-secondary-100">Years Experience</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 text-center">
          <div className="text-3xl font-bold mb-2">15+</div>
          <div className="text-green-100">Technologies</div>
        </div>
      </motion.div>
    </div>
  );
};

export default Experience; 