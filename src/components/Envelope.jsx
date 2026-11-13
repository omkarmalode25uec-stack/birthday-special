import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { triggerBlossomBurst } from './BlossomEffect';

export default function Envelope({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Celebratory cherry blossom burst
    triggerBlossomBurst(window.innerWidth / 2, window.innerHeight * 0.48, 45);

    // Smooth transition to birthday letter
    setTimeout(() => {
      onOpen();
    }, 1250);
  };

  return (
    <section
      className="section-wrapper bg-warm"
      style={{
        minHeight: '100vh',
        height: '100dvh',
        padding: '0.8rem 1rem 1.2rem',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Soft background pastel clouds */}
      <div
        style={{
          position: 'absolute',
          top: -20,
          left: -30,
          width: 200,
          height: 100,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(252,232,224,0.3) 70%, transparent 100%)',
          filter: 'blur(8px)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: -15,
          right: -20,
          width: 220,
          height: 100,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(255,217,200,0.35) 70%, transparent 100%)',
          filter: 'blur(8px)',
          pointerEvents: 'none'
        }}
      />

      {/* Floating Sparkles & Blossom in corners */}
      <motion.div
        style={{ position: 'absolute', top: 22, left: 24, fontSize: 24, pointerEvents: 'none', userSelect: 'none', opacity: 0.7 }}
        animate={{ y: [-5, 6, -5], rotate: [-6, 6, -6] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        🌸
      </motion.div>
      <motion.div
        style={{ position: 'absolute', top: 28, right: 28, fontSize: 20, pointerEvents: 'none', userSelect: 'none', opacity: 0.7 }}
        animate={{ y: [6, -6, 6], rotate: [6, -6, 6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        ✨
      </motion.div>
      <motion.div
        style={{ position: 'absolute', bottom: 26, left: 28, fontSize: 22, pointerEvents: 'none', userSelect: 'none', opacity: 0.7 }}
        animate={{ y: [-4, 6, -4], rotate: [-4, 4, -4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        🎀
      </motion.div>
      <motion.div
        style={{ position: 'absolute', bottom: 30, right: 26, fontSize: 20, pointerEvents: 'none', userSelect: 'none', opacity: 0.7 }}
        animate={{ y: [5, -5, 5], rotate: [5, -5, 5] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        🌷
      </motion.div>

      {/* ─── Main Content Container (Compact & Perfectly Viewport-Fitted) ─── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 400,
          margin: '0 auto',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Cute cursive pre-heading */}
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: '1.35rem',
            color: '#e8436c',
            margin: '0 0 2px 0',
            textAlign: 'center'
          }}
        >
          a little birthday surprise ✦
        </motion.p>

        {/* Elegant Serif Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.75rem, 5.2vw, 2.35rem)',
            fontWeight: 700,
            color: '#35263D',
            textAlign: 'center',
            lineHeight: 1.2,
            margin: '0 0 4px 0'
          }}
        >
          There's something <span style={{ fontFamily: "'Dancing Script', cursive", color: '#e8436c', fontStyle: 'italic', fontWeight: 600 }}>for you</span>
        </motion.h1>

        {/* Subtitle instructions */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '0.86rem',
            color: '#705378',
            textAlign: 'center',
            margin: '0 0 16px 0'
          }}
        >
          A tiny birthday surprise, made just for you.
        </motion.p>

        {/* ─── CUTE PASTEL ENVELOPE STAGE ─── */}
        <div
          onClick={handleOpen}
          style={{
            position: 'relative',
            width: 'min(330px, 88vw)',
            height: 205,
            margin: '0 auto 18px',
            cursor: isOpening ? 'default' : 'pointer',
            perspective: 1000
          }}
        >
          {/* Adorable Teddy Peeking Behind Top Right of Envelope */}
          <motion.div
            style={{
              position: 'absolute',
              top: -34,
              right: 14,
              width: 58,
              height: 58,
              zIndex: 2,
              pointerEvents: 'none'
            }}
            animate={{ y: [0, -4, 0], rotate: [-2, 3, -2] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img
              src="/images/decorations/teddies/teddy_waving.svg"
              alt="Teddy"
              style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
            />
          </motion.div>

          {/* Envelope Body Base Card */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: 22,
              background: 'linear-gradient(145deg, #fff9fb 0%, #ffeaf0 100%)',
              border: '2px dashed rgba(245, 139, 170, 0.45)',
              boxShadow: '0 16px 38px rgba(245, 139, 170, 0.32), 0 4px 12px rgba(53, 38, 61, 0.08)',
              overflow: 'visible'
            }}
          >
            {/* ─── Note Card That Slides Up ─── */}
            <motion.div
              style={{
                position: 'absolute',
                top: 14,
                left: 16,
                right: 16,
                height: 160,
                borderRadius: 14,
                background: '#ffffff',
                border: '1.5px solid rgba(245, 139, 170, 0.25)',
                boxShadow: '0 6px 18px rgba(88, 63, 37, 0.08)',
                padding: '12px 14px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                zIndex: isOpening ? 6 : 1,
                boxSizing: 'border-box'
              }}
              initial={{ y: 0 }}
              animate={isOpening ? { y: -78, scale: 1.04 } : { y: 0 }}
              transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Top Row with Cute Name Tag */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #fee3eb', paddingBottom: 6 }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#e8436c', letterSpacing: '0.5px' }}>
                  FOR RENUKA 🌸
                </span>
                <span style={{ fontSize: '0.72rem', color: '#ffb3c6' }}>★ ★ ★</span>
              </div>

              {/* Decorative Note Lines */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, opacity: 0.55 }}>
                <div style={{ height: 4.5, background: 'linear-gradient(90deg, #F58BAA, transparent)', borderRadius: 3, width: '85%' }} />
                <div style={{ height: 4.5, background: 'linear-gradient(90deg, #DCCBFA, transparent)', borderRadius: 3, width: '65%' }} />
                <div style={{ height: 4.5, background: 'linear-gradient(90deg, #FFE59A, transparent)', borderRadius: 3, width: '90%' }} />
              </div>

              {/* Signature note */}
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1rem', color: '#e8436c', fontWeight: 700 }}>
                  With love, Omkar ❤️
                </span>
              </div>
            </motion.div>

            {/* ─── Front Pocket Folds (Smooth Anti-Aliased SVG) ─── */}
            <svg
              viewBox="0 0 330 205"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                borderRadius: 22,
                pointerEvents: 'none',
                zIndex: 3,
                overflow: 'hidden'
              }}
            >
              <defs>
                <linearGradient id="pocketGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#ffd9e4" />
                  <stop offset="100%" stopColor="#fff3f7" />
                </linearGradient>
                <linearGradient id="sideLeftGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffe6ee" />
                  <stop offset="100%" stopColor="#ffd1de" />
                </linearGradient>
                <linearGradient id="sideRightGrad" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffe6ee" />
                  <stop offset="100%" stopColor="#ffd1de" />
                </linearGradient>
                <filter id="pocketShadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="-2" stdDeviation="4" floodColor="#a83258" floodOpacity="0.12" />
                </filter>
              </defs>

              {/* Left Side Fold */}
              <path d="M 0 0 L 165 118 L 0 205 Z" fill="url(#sideLeftGrad)" opacity="0.9" />

              {/* Right Side Fold */}
              <path d="M 330 0 L 165 118 L 330 205 Z" fill="url(#sideRightGrad)" opacity="0.9" />

              {/* Bottom V-Fold Pocket */}
              <path
                d="M 0 205 L 165 108 L 330 205 Z"
                fill="url(#pocketGrad)"
                stroke="#f7a8be"
                strokeWidth="1.2"
                filter="url(#pocketShadow)"
              />
            </svg>

            {/* ─── Top Animated Flap (Smooth Rounded Tip) ─── */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 114,
                transformOrigin: 'top center',
                zIndex: isOpening ? 2 : 4,
                pointerEvents: 'none'
              }}
              initial={{ rotateX: 0 }}
              animate={isOpening ? { rotateX: 180, opacity: 0.25 } : { rotateX: 0 }}
              transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
            >
              <svg viewBox="0 0 330 114" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <defs>
                  <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fff4f7" />
                    <stop offset="100%" stopColor="#ffc5d5" />
                  </linearGradient>
                  <filter id="flapShadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#91284b" floodOpacity="0.14" />
                  </filter>
                </defs>
                <path
                  d="M 0 0 L 150 102 Q 165 112 180 102 L 330 0 Z"
                  fill="url(#flapGrad)"
                  stroke="#f59cb4"
                  strokeWidth="1.2"
                  filter="url(#flapShadow)"
                />
              </svg>
            </motion.div>

            {/* ─── Cute Glossy Wax Seal & Satin Ribbons ─── */}
            <motion.div
              style={{
                position: 'absolute',
                top: 104,
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pointerEvents: 'none'
              }}
              animate={
                isOpening
                  ? { scale: [1, 1.3, 0], opacity: 0 }
                  : { scale: [1, 1.05, 1] }
              }
              transition={
                isOpening
                  ? { duration: 0.35, ease: 'easeOut' }
                  : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
              }
            >
              {/* Satin Ribbon Tails */}
              <div style={{ position: 'relative', width: 44, height: 16, marginBottom: -10 }}>
                <div
                  style={{
                    position: 'absolute',
                    left: 6,
                    top: 0,
                    width: 13,
                    height: 24,
                    background: 'linear-gradient(135deg, #d8c6fa 0%, #bca1f5 100%)',
                    transform: 'rotate(-24deg)',
                    borderRadius: '3px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    right: 6,
                    top: 0,
                    width: 13,
                    height: 24,
                    background: 'linear-gradient(135deg, #ffb3c6 0%, #f78da7 100%)',
                    transform: 'rotate(24deg)',
                    borderRadius: '3px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                  }}
                />
              </div>

              {/* 3D Glossy Heart Wax Seal */}
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #ff7596 0%, #e8436c 65%, #ab1a40 100%)',
                  boxShadow: '0 6px 18px rgba(232, 67, 108, 0.45), inset 0 2px 4px rgba(255,255,255,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1.5px solid rgba(255, 240, 245, 0.8)'
                }}
              >
                <Heart size={20} color="#ffffff" fill="#ffffff" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }} />
              </div>
            </motion.div>

            {/* Corner Decorative Flowers */}
            <span style={{ position: 'absolute', top: -10, left: -10, fontSize: 20, pointerEvents: 'none', zIndex: 7 }}>🌸</span>
            <span style={{ position: 'absolute', top: -8, right: -10, fontSize: 18, pointerEvents: 'none', zIndex: 7 }}>🌷</span>
            <span style={{ position: 'absolute', bottom: -10, left: -8, fontSize: 18, pointerEvents: 'none', zIndex: 7 }}>🌷</span>
            <span style={{ position: 'absolute', bottom: -8, right: -10, fontSize: 20, pointerEvents: 'none', zIndex: 7 }}>🌸</span>
          </div>
        </div>

        {/* ─── Open Surprise Button (Always Visible, Perfectly Positioned) ─── */}
        <motion.button
          onClick={handleOpen}
          disabled={isOpening}
          className="btn-pink"
          whileHover={!isOpening ? { scale: 1.03 } : {}}
          whileTap={!isOpening ? { scale: 0.97 } : {}}
          style={{
            minWidth: 240,
            padding: '11px 28px',
            fontSize: '1rem',
            cursor: isOpening ? 'default' : 'pointer'
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.3)',
              flexShrink: 0
            }}
          >
            <Sparkles size={14} color="#ffffff" />
          </span>
          <span>{isOpening ? 'Opening surprise... 🌸' : 'Open your surprise ✨'}</span>
        </motion.button>
      </div>
    </section>
  );
}
