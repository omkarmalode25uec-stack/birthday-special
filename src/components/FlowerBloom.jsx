import React from 'react';
import { motion } from 'framer-motion';

/**
 * Blooming corner flower with 5 petals, gentle scale, rotation,
 * and sparkle animation as sections appear.
 */
export default function FlowerBloom({ position = "top-left", delay = 0.3, color = "#F58BAA" }) {
  const petals = [0, 72, 144, 216, 288];

  return (
    <motion.div
      className={`corner-flower ${position}`}
      initial={{ scale: 0, rotate: -45, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{
        duration: 1.1,
        delay,
        ease: [0.34, 1.56, 0.64, 1]
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
        {/* Flower Petals */}
        <g transform="translate(50, 50)">
          {petals.map((angle, index) => (
            <motion.ellipse
              key={index}
              cx="0"
              cy="-24"
              rx="14"
              ry="22"
              fill={color}
              transform={`rotate(${angle})`}
              initial={{ scale: 0.2 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.8,
                delay: delay + 0.2 + index * 0.08,
                ease: "easeOut"
              }}
            />
          ))}

          {/* Inner petal highlights */}
          {petals.map((angle, index) => (
            <motion.ellipse
              key={`inner-${index}`}
              cx="0"
              cy="-20"
              rx="8"
              ry="14"
              fill="#FFF0F5"
              opacity="0.6"
              transform={`rotate(${angle})`}
            />
          ))}

          {/* Center pistil */}
          <circle cx="0" cy="0" r="10" fill="#FFE59A" stroke="#FFD9C8" strokeWidth="2" />
          <circle cx="-2" cy="-2" r="3" fill="#FFF6E9" />
          <circle cx="2" cy="2" r="1.5" fill="#F58BAA" />
        </g>
      </svg>

      {/* Tiny Sparkle after bloom */}
      <motion.span
        className="absolute -top-1 -right-1 text-xs select-none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 0.8] }}
        transition={{ delay: delay + 1.1, duration: 0.6 }}
      >
        ✨
      </motion.span>
    </motion.div>
  );
}
