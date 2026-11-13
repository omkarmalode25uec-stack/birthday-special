import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, Heart, Moon } from 'lucide-react';
import { birthdayContent } from '../data/birthdayContent';
import { triggerBlossomBurst } from './BlossomEffect';

export default function WishSection({ onNext }) {
  const [hasWished, setHasWished] = useState(false);
  const [ripples, setRipples] = useState([]);
  const { wish } = birthdayContent;

  const handleMakeWish = (e) => {
    if (hasWished) return;
    setHasWished(true);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.x + rect.width / 2;
    const y = rect.y + rect.height / 2;

    // Trigger blossom burst
    triggerBlossomBurst(x, y, 45);
    setRipples([...ripples, Date.now()]);
  };

  const handleProceed = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerBlossomBurst(rect.x + rect.width / 2, rect.y + rect.height / 2, 30);
    onNext();
  };

  return (
    <section className="section-wrapper bg-warm" style={{ minHeight: '100vh', justifyContent: 'center' }}>
      {/* Ripple Wave Elements */}
      {ripples.map((id) => (
        <motion.div
          key={id}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 80,
            height: 80,
            borderRadius: '50%',
            border: '3px solid rgba(255, 213, 79, 0.7)',
            pointerEvents: 'none',
            zIndex: 1
          }}
          initial={{ scale: 0.8, opacity: 1 }}
          animate={{ scale: 8.5, opacity: 0 }}
          transition={{ duration: 1.8, ease: 'easeOut' }}
        />
      ))}

      {/* Mascot Stage: Cute Teddy Bear & Cake Illustration (matching DilSeCraft) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 320,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          margin: '0 auto 1.5rem',
          zIndex: 5
        }}
      >
        {/* Soft Golden Halo Glow */}
        <motion.div
          style={{
            position: 'absolute',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 229, 154, 0.65) 0%, rgba(255, 217, 200, 0.3) 60%, transparent 80%)',
            filter: 'blur(16px)',
            pointerEvents: 'none'
          }}
          animate={hasWished ? { scale: [1, 1.25, 1.1] } : { scale: [1, 1.08, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Cute Illustrated Teddy Bear */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: '4.5rem',
            userSelect: 'none',
            zIndex: 6
          }}
        >
          <span>🧸</span>
        </motion.div>

        {/* Mini 3-Tier Birthday Cake with Glowing Candle */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.2, delay: 0.3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: '4.5rem',
            userSelect: 'none',
            zIndex: 6
          }}
        >
          <span>🎂</span>
        </motion.div>
      </div>

      {/* Text Hierarchy */}
      <div style={{ textAlign: 'center', maxWidth: 440, margin: '0 auto 1.8rem', padding: '0 1rem', zIndex: 10 }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.9rem, 6vw, 2.6rem)',
            fontWeight: 700,
            color: '#35263D',
            lineHeight: 1.25,
            margin: '0 0 8px 0'
          }}
        >
          {wish.heading}
        </h2>
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '0.95rem',
            color: '#705378',
            margin: 0
          }}
        >
          {wish.subtitle}
        </p>
      </div>

      {/* Button & Reveal Container */}
      <div style={{ textAlign: 'center', zIndex: 10, padding: '0 1rem' }}>
        {!hasWished ? (
          <button
            onClick={handleMakeWish}
            className="btn-pink"
            style={{ minWidth: 240 }}
          >
            <Sparkles size={16} />
            <span>{wish.buttonText}</span>
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              maxWidth: 420,
              margin: '0 auto',
              padding: '1.4rem',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              borderRadius: 22,
              border: '1.5px solid rgba(255, 213, 79, 0.4)',
              boxShadow: '0 12px 28px rgba(255, 213, 79, 0.2)'
            }}
          >
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.15rem',
                color: '#e8436c',
                lineHeight: 1.5,
                margin: '0 0 16px 0',
                fontWeight: 600
              }}
            >
              "{wish.message}"
            </p>

            <button
              onClick={handleProceed}
              className="btn-pink btn-secondary"
              style={{ minWidth: 230 }}
            >
              <Moon size={16} />
              <span>{wish.nextButtonText}</span>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
