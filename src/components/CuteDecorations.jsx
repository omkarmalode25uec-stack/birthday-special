import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable animated decorative companions (Teddies & Cats)
 * Tastefully placed in section corners/empty spaces.
 * Strictly pointer-events: none to prevent any click blocking.
 */
export default function CuteDecorations({ type = "teddy-cat", position = "bottom-corners" }) {
  if (position === "letter-decor") {
    return (
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 2 }}>
        {/* Cute Waving Teddy sitting on bottom-left */}
        <motion.div
          style={{ position: 'absolute', bottom: 18, left: 12, width: 62, height: 62, opacity: 0.85 }}
          animate={{ y: [0, -6, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img src="/images/decorations/teddies/teddy_waving.svg" alt="" style={{ width: '100%', height: '100%' }} />
        </motion.div>

        {/* Cute Sleeping Cat on bottom-right */}
        <motion.div
          style={{ position: 'absolute', bottom: 16, right: 12, width: 68, height: 68, opacity: 0.85 }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img src="/images/decorations/cats/cat_sleeping.svg" alt="" style={{ width: '100%', height: '100%' }} />
        </motion.div>
      </div>
    );
  }

  if (position === "carousel-decor") {
    return (
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
        {/* Cat playing with yarn at bottom left */}
        <motion.div
          style={{ position: 'absolute', bottom: 25, left: 16, width: 66, height: 66, opacity: 0.8 }}
          animate={{ y: [0, -5, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img src="/images/decorations/cats/cat_playing.svg" alt="" style={{ width: '100%', height: '100%' }} />
        </motion.div>

        {/* Teddy holding heart at bottom right */}
        <motion.div
          style={{ position: 'absolute', bottom: 25, right: 16, width: 64, height: 64, opacity: 0.8 }}
          animate={{ y: [0, -6, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img src="/images/decorations/teddies/teddy_heart.svg" alt="" style={{ width: '100%', height: '100%' }} />
        </motion.div>
      </div>
    );
  }

  if (position === "cake-decor") {
    return (
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 2 }}>
        {/* Waving Cat cheering for cake at bottom left */}
        <motion.div
          style={{ position: 'absolute', bottom: 24, left: 18, width: 64, height: 64, opacity: 0.85 }}
          animate={{ y: [0, -7, 0], rotate: [-2, 3, -2] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img src="/images/decorations/cats/cat_waving.svg" alt="" style={{ width: '100%', height: '100%' }} />
        </motion.div>

        {/* Sitting Teddy at bottom right */}
        <motion.div
          style={{ position: 'absolute', bottom: 22, right: 18, width: 62, height: 62, opacity: 0.85 }}
          animate={{ y: [0, -5, 0], rotate: [2, -2, 2] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img src="/images/decorations/teddies/teddy_sitting.svg" alt="" style={{ width: '100%', height: '100%' }} />
        </motion.div>
      </div>
    );
  }

  if (position === "gifts-decor") {
    return (
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
        {/* Teddy holding heart on left side */}
        <motion.div
          style={{ position: 'absolute', bottom: 15, left: 14, width: 58, height: 58, opacity: 0.8 }}
          animate={{ y: [0, -5, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img src="/images/decorations/teddies/teddy_heart.svg" alt="" style={{ width: '100%', height: '100%' }} />
        </motion.div>

        {/* Playful Cat on right side */}
        <motion.div
          style={{ position: 'absolute', bottom: 15, right: 14, width: 62, height: 62, opacity: 0.8 }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img src="/images/decorations/cats/cat_playing.svg" alt="" style={{ width: '100%', height: '100%' }} />
        </motion.div>
      </div>
    );
  }

  // Final Celebration Decor
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 2 }}>
      <motion.div
        style={{ position: 'absolute', bottom: 20, left: 15, width: 64, height: 64, opacity: 0.85 }}
        animate={{ y: [0, -7, 0], rotate: [-4, 4, -4] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img src="/images/decorations/teddies/teddy_waving.svg" alt="" style={{ width: '100%', height: '100%' }} />
      </motion.div>
      <motion.div
        style={{ position: 'absolute', bottom: 20, right: 15, width: 66, height: 66, opacity: 0.85 }}
        animate={{ y: [0, -7, 0], rotate: [4, -4, 4] }}
        transition={{ duration: 3.4, delay: 0.3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img src="/images/decorations/cats/cat_waving.svg" alt="" style={{ width: '100%', height: '100%' }} />
      </motion.div>
    </div>
  );
}
