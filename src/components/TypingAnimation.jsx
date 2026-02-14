import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypingAnimation = ({
  texts,
  speed = 50,
  deleteSpeed = 30,
  delay = 1500,
  className = "",
  shouldPlaySound = false
}) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(speed);

  useEffect(() => {
    let timer;
    const i = loopNum % texts.length;
    const fullText = texts[i];

    const handleTyping = () => {
      if (isDeleting) {
        if (text === '') {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        } else {
          setText(fullText.substring(0, text.length - 1));
          setTypingSpeed(deleteSpeed);
        }
      } else {
        if (text === fullText) {
          timer = setTimeout(() => setIsDeleting(true), delay);
          return;
        } else {
          const nextChar = fullText.substring(0, text.length + 1);
          setText(nextChar);
          setTypingSpeed(speed + Math.random() * 30);
        }
      }

      timer = setTimeout(handleTyping, typingSpeed);
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, texts, speed, deleteSpeed, delay]);

  return (
    <span className={className}>
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="ml-1 inline-block w-[2px] h-[1em] bg-blue-400 align-middle"
      />
    </span>
  );
};

export default TypingAnimation;