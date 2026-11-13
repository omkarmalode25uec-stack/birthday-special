import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { triggerBlossomBurst } from './BlossomEffect';

export default function Envelope({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Trigger celebratory blossom burst
    triggerBlossomBurst(window.innerWidth / 2, window.innerHeight * 0.5, 45);

    // Transition smoothly to letter section
    setTimeout(() => {
      onOpen();
    }, 1300);
  };

  return (
    <section className="section-wrapper bg-warm" style={{ minHeight: '100vh', justifyContent: 'center' }}>
      {/* Background Soft Pastel Clouds (pointer-events none) */}
      <div style={{ position: 'absolute', top: -30, left: -40, width: 220, height: 100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(252,232,224,0.3) 70%, transparent 100%)', filter: 'blur(8px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: -20, right: -30, width: 240, height: 110, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(255,217,200,0.35) 70%, transparent 100%)', filter: 'blur(8px)', pointerEvents: 'none' }} />

      {/* Floating Decorative Elements */}
      <motion.div
        style={{ position: 'absolute', top: '10%', left: '8%', fontSize: 26, pointerEvents: 'none', userSelect: 'none' }}
        animate={{ y: [-6, 6, -6], rotate: [-6, 6, -6] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        🌸
      </motion.div>
      <motion.div
        style={{ position: 'absolute', top: '14%', right: '9%', fontSize: 24, pointerEvents: 'none', userSelect: 'none' }}
        animate={{ y: [6, -6, 6], rotate: [5, -5, 5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        ⭐
      </motion.div>
      <motion.div
        style={{ position: 'absolute', bottom: '15%', left: '7%', fontSize: 24, pointerEvents: 'none', userSelect: 'none' }}
        animate={{ y: [-5, 7, -5], rotate: [-5, 5, -5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        🎀
      </motion.div>
      <motion.div
        style={{ position: 'absolute', bottom: '18%', right: '8%', fontSize: 22, pointerEvents: 'none', userSelect: 'none' }}
        animate={{ y: [5, -5, 5], rotate: [6, -6, 6] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        ❤️
      </motion.div>

      {/* Main Container */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 440, padding: '0 1rem', zIndex: 10 }}>
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: '1.4rem',
            color: '#F58BAA',
            marginBottom: '0.25rem',
            textAlign: 'center'
          }}
        >
          a little something ✦
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 6vw, 2.7rem)',
            fontWeight: 700,
            color: '#35263D',
            textAlign: 'center',
            lineHeight: 1.2,
            margin: '0 0 0.5rem 0'
          }}
        >
          There's <br />
          something <span style={{ fontFamily: "'Dancing Script', cursive", color: '#F58BAA', fontWeight: 600, fontStyle: 'italic' }}>for you</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '0.92rem',
            color: '#705378',
            textAlign: 'center',
            marginBottom: '2rem'
          }}
        >
          A tiny birthday surprise, made just for you.
        </motion.p>

        {/* ─── Envelope Stage ─── */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 290,
            height: 190,
            margin: '0 auto 2.2rem',
            cursor: 'pointer',
            perspective: 800
          }}
          onClick={handleOpen}
        >
          {/* Envelope Body / Pocket Container */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: 18,
              boxShadow: '0 16px 36px rgba(53, 38, 61, 0.12), 0 2px 10px rgba(245, 139, 170, 0.18)',
              background: 'linear-gradient(145deg, #FFF8EE 0%, #FBE9D5 100%)',
              border: '1.5px solid rgba(245, 139, 170, 0.25)',
              overflow: 'visible'
            }}
          >
            {/* The Letter that emerges upward when opened */}
            <motion.div
              style={{
                position: 'absolute',
                top: 15,
                left: 15,
                right: 15,
                height: 155,
                borderRadius: 12,
                background: '#ffffff',
                border: '1px solid rgba(245, 139, 170, 0.2)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
                padding: '12px 14px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                zIndex: isOpening ? 6 : 1
              }}
              initial={{ y: 0 }}
              animate={isOpening ? { y: -80, scale: 1.04 } : { y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: 'easeOut' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #fee3eb', paddingBottom: 6 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#e8436c', letterSpacing: '0.5px' }}>
                  FOR RENUKA 🌸
                </span>
                <span style={{ fontSize: '0.7rem', color: '#F58BAA' }}>★ ★ ★</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, opacity: 0.45 }}>
                <div style={{ height: 4, background: '#F58BAA', borderRadius: 4, width: '85%' }} />
                <div style={{ height: 4, background: '#DCCBFA', borderRadius: 4, width: '65%' }} />
                <div style={{ height: 4, background: '#FFE59A', borderRadius: 4, width: '90%' }} />
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: '0.95rem', color: '#e8436c', fontWeight: 700 }}>
                  With love, Omkar ❤️
                </span>
              </div>
            </motion.div>

            {/* Front Lower Pocket Folds (covers letter inside) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 18,
                clipPath: 'polygon(0% 25%, 50% 62%, 100% 25%, 100% 100%, 0% 100%)',
                background: 'linear-gradient(to top, #ffeef4 0%, #fff7fa 100%)',
                borderBottom: '2.5px solid #f6b5c7',
                zIndex: 3,
                pointerEvents: 'none'
              }}
            />

            {/* Top Flap (opens up 180 degrees) */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 110,
                transformOrigin: 'top center',
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                background: 'linear-gradient(to bottom, #ffe4ec 0%, #ffd0de 100%)',
                boxShadow: '0 4px 12px rgba(53, 38, 61, 0.08)',
                zIndex: 4,
                pointerEvents: 'none'
              }}
              animate={isOpening ? { rotateX: 180, opacity: 0.25 } : { rotateX: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />

            {/* Center Heart Wax Seal & Lavender Ribbon */}
            <motion.div
              style={{
                position: 'absolute',
                top: 85,
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
              animate={isOpening ? { scale: [1, 1.25, 0], opacity: 0 } : { scale: [1, 1.05, 1] }}
              transition={isOpening ? { duration: 0.4 } : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Ribbon Tails */}
              <div style={{ position: 'relative', width: 44, height: 18, marginBottom: -12, pointerEvents: 'none' }}>
                <div style={{ position: 'absolute', left: 4, top: 0, width: 14, height: 26, background: '#c9b3f0', transform: 'rotate(-25deg)', borderRadius: '3px' }} />
                <div style={{ position: 'absolute', right: 4, top: 0, width: 14, height: 26, background: '#c9b3f0', transform: 'rotate(25deg)', borderRadius: '3px' }} />
              </div>

              {/* Heart Wax Seal Circle */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #ff6b8b 0%, #e8436c 65%, #b82348 100%)',
                  boxShadow: '0 6px 16px rgba(232, 67, 108, 0.45)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1.5px solid rgba(255,255,255,0.6)'
                }}
              >
                <Heart size={20} color="#ffffff" fill="#ffffff" />
              </div>
            </motion.div>

            {/* Corner Decorative Flowers on Envelope */}
            <span style={{ position: 'absolute', top: -10, left: -10, fontSize: 22, pointerEvents: 'none', zIndex: 7 }}>🌸</span>
            <span style={{ position: 'absolute', top: -8, right: -10, fontSize: 20, pointerEvents: 'none', zIndex: 7 }}>🌷</span>
            <span style={{ position: 'absolute', bottom: -10, left: -8, fontSize: 18, pointerEvents: 'none', zIndex: 7 }}>🌷</span>
            <span style={{ position: 'absolute', bottom: -8, right: -10, fontSize: 20, pointerEvents: 'none', zIndex: 7 }}>🌸</span>
          </div>
        </div>

        {/* ─── Open Button ─── */}
        <motion.button
          onClick={handleOpen}
          disabled={isOpening}
          className="btn-pink"
          whileHover={!isOpening ? { scale: 1.03 } : {}}
          whileTap={!isOpening ? { scale: 0.97 } : {}}
          style={{
            minWidth: 260,
            cursor: isOpening ? 'default' : 'pointer'
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.3)',
              flexShrink: 0
            }}
          >
            <Heart size={14} color="#ffffff" fill="#ffffff" />
          </span>
          <span>{isOpening ? 'Opening surprise...' : 'Open your surprise ✨'}</span>
        </motion.button>
      </div>
    </section>
  );
}
