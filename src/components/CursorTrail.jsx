import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CursorTrail = () => {
  const trailRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Add new trail point
      const newPoint = {
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      };
      
      trailRef.current.push(newPoint);
      
      // Keep only last 20 points
      if (trailRef.current.length > 20) {
        trailRef.current.shift();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {trailRef.current.map((point, index) => {
        const opacity = (index / trailRef.current.length) * 0.6;
        const scale = 1 - (index / trailRef.current.length) * 0.8;
        
        return (
          <motion.div
            key={point.timestamp}
            initial={{ 
              x: point.x - 4, 
              y: point.y - 4,
              scale: 0,
              opacity: 0
            }}
            animate={{ 
              x: point.x - 4, 
              y: point.y - 4,
              scale: scale,
              opacity: opacity
            }}
            transition={{ 
              duration: 0.1,
              ease: "easeOut"
            }}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-sm"
            style={{
              filter: `blur(${1 + index * 0.5}px)`,
            }}
          />
        );
      })}
    </div>
  );
};

export default CursorTrail; 