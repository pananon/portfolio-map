import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MagneticButton = ({ children, className = "", onClick, href }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        setPosition({ x: middleX * 0.3, y: middleY * 0.3 }); // Magnetic strength
    };

    const content = (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`relative inline-block ${className}`}
        >
            {children}
        </motion.div>
    );

    if (href) {
        return (
            <a href={href} onClick={onClick} className="inline-block">
                {content}
            </a>
        );
    }

    return (
        <div onClick={onClick} className="inline-block cursor-pointer">
            {content}
        </div>
    );
};

export default MagneticButton;
