import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypingAnimation = ({ texts, speed = 100, delay = 2000 }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentCharIndex < texts[currentTextIndex].length) {
          setCurrentCharIndex(currentCharIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), delay);
        }
      } else {
        if (currentCharIndex > 0) {
          setCurrentCharIndex(currentCharIndex - 1);
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((currentTextIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [currentCharIndex, isDeleting, currentTextIndex, texts, speed, delay]);

  return (
    <div className="inline-block">
      <span className="text-primary-200">
        {texts[currentTextIndex].substring(0, currentCharIndex)}
      </span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="text-primary-200 ml-1"
      >
        |
      </motion.span>
    </div>
  );
};

export default TypingAnimation; 