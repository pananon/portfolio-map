import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Mail, Download, Github, Linkedin, ArrowUp } from 'lucide-react';

const FloatingActionButton = ({ personalData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: Mail,
      label: 'Email',
      href: `mailto:${personalData.email}`,
      color: 'bg-blue-500 hover:bg-blue-600',
      delay: 0.1
    },
    // {
    //   icon: Download,
    //   label: 'Resume',
    //   href: personalData.links.personalSite,
    //   color: 'bg-green-500 hover:bg-green-600',
    //   delay: 0.2
    // },
    {
      icon: Github,
      label: 'GitHub',
      href: personalData.links.github,
      color: 'bg-gray-800 hover:bg-gray-900',
      delay: 0.3
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: personalData.links.linkedin,
      color: 'bg-blue-600 hover:bg-blue-700',
      delay: 0.4
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Scroll to top button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="mb-4 w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>

      {/* Main FAB */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
            isOpen 
              ? 'bg-gradient-to-r from-red-500 to-red-600' 
              : 'bg-gradient-to-r from-primary-600 to-primary-700'
          } text-white`}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Plus className="w-6 h-6" />
          </motion.div>
        </motion.button>

        {/* Action buttons */}
        <AnimatePresence>
          {isOpen && (
            <div className="absolute bottom-16 right-0 space-y-3">
              {actions.map((action, index) => (
                <motion.a
                  key={action.label}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0, x: 20 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: action.delay,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-12 h-12 ${action.color} text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group relative`}
                >
                  <action.icon className="w-5 h-5" />
                  
                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute right-14 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    {action.label}
                  </motion.div>
                </motion.a>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FloatingActionButton; 