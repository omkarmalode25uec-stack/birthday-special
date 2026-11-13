import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Gift, Sparkles } from 'lucide-react';
import { triggerBlossomBurst } from './BlossomEffect';
import { fireConfetti } from './ConfettiEffect';

/* ── tiny CSS injected once ── */
const STYLE_ID = 'lighting-section-styles';
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    @keyframes ls-twinkle {
      0%, 100% { opacity: 0.2; transform: scale(0.8); }
      50% { opacity: 1; transform: scale(1.3); }
    }
    @keyframes ls-swing {
      0%, 100% { transform: rotate(-4deg); }
      50% { transform: rotate(4deg); }
    }
    @keyframes ls-float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-18px); }
    }
    @keyframes ls-float-balloon {
      0%, 100% { transform: translateY(0) rotate(-3deg); }
      50% { transform: translateY(-22px) rotate(3deg); }
    }
    @keyframes ls-glow-pulse {
      0%, 100% { filter: drop-shadow(0 0 18px #ffe066) drop-shadow(0 0 40px #ffe06688); }
      50% { filter: drop-shadow(0 0 30px #ffe066) drop-shadow(0 0 60px #ffe066aa); }
    }
    @keyframes ls-bunting-wave {
      0%, 100% { transform: rotate(-2deg); }
      50% { transform: rotate(2deg); }
    }
    @keyframes ls-zzz {
      0% { opacity: 0; transform: translate(0,0) scale(0.6); }
      50% { opacity: 1; transform: translate(8px,-18px) scale(1); }
      100% { opacity: 0; transform: translate(16px,-36px) scale(0.5); }
    }
    @keyframes ls-confetti-drift {
      0% { transform: translateY(0) rotate(0deg); }
      100% { transform: translateY(6px) rotate(360deg); }
    }
    @keyframes ls-cloud-drift {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(12px); }
    }
    @keyframes ls-fairy-blink {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; }
    }
  `;
  document.head.appendChild(s);
}

/* ── scattered star positions ── */
const STARS = [
  { top: '8%', left: '15%', size: 3, delay: 0 },
  { top: '12%', left: '55%', size: 2, delay: 0.4 },
  { top: '22%', left: '80%', size: 3, delay: 0.8 },
  { top: '30%', left: '10%', size: 2, delay: 1.2 },
  { top: '18%', left: '40%', size: 4, delay: 0.2 },
  { top: '35%', left: '70%', size: 2, delay: 1.6 },
  { top: '6%', left: '68%', size: 3, delay: 0.6 },
  { top: '42%', left: '25%', size: 2, delay: 1 },
  { top: '15%', left: '90%', size: 3, delay: 1.4 },
  { top: '50%', left: '5%', size: 2, delay: 0.3 },
  { top: '26%', left: '50%', size: 3, delay: 0.9 },
  { top: '55%', left: '85%', size: 2, delay: 1.8 },
];

/* ── scattered confetti (dark scene) ── */
const CONFETTI_PIECES = [
  { top: '14%', left: '20%', color: '#F58BAA', shape: 'circle', size: 5, delay: 0 },
  { top: '28%', left: '75%', color: '#FFE59A', shape: 'square', size: 4, delay: 0.5 },
  { top: '38%', left: '12%', color: '#DCCBFA', shape: 'circle', size: 6, delay: 1 },
  { top: '20%', left: '60%', color: '#FFD9C8', shape: 'square', size: 4, delay: 0.3 },
  { top: '48%', left: '88%', color: '#F58BAA', shape: 'circle', size: 5, delay: 0.7 },
  { top: '55%', left: '35%', color: '#FFE59A', shape: 'square', size: 3, delay: 1.2 },
  { top: '10%', left: '45%', color: '#DCCBFA', shape: 'circle', size: 4, delay: 0.9 },
  { top: '62%', left: '65%', color: '#FFD9C8', shape: 'square', size: 5, delay: 0.2 },
  { top: '44%', left: '50%', color: '#F58BAA', shape: 'circle', size: 3, delay: 1.5 },
  { top: '32%', left: '92%', color: '#FFE59A', shape: 'square', size: 4, delay: 0.6 },
];

/* ── balloon data ── */
const BALLOONS = [
  { left: '10%', bottom: '22%', delay: 0, emoji: '🎈', size: '2.6rem' },
  { left: '28%', bottom: '32%', delay: 0.3, emoji: '🎈', size: '2.2rem' },
  { left: '72%', bottom: '28%', delay: 0.5, emoji: '🎈', size: '2.8rem' },
  { left: '88%', bottom: '35%', delay: 0.2, emoji: '🎈', size: '2rem' },
  { left: '50%', bottom: '40%', delay: 0.4, emoji: '🎈', size: '2.4rem' },
  { left: '38%', bottom: '18%', delay: 0.6, emoji: '🎈', size: '2rem' },
];

/* ── bunting text ── */
const BUNTING_TEXT = 'HAPPY BIRTHDAY RENUKA';

/* ── fairy light positions along a curve ── */
const FAIRY_LIGHTS = Array.from({ length: 14 }, (_, i) => {
  const t = i / 13;
  const x = 5 + t * 90;
  const y = 6 + Math.sin(t * Math.PI) * 5;
  const colors = ['#F58BAA', '#FFE59A', '#DCCBFA', '#FFD9C8', '#87CEEB', '#98FB98'];
  return { x, y, color: colors[i % colors.length], delay: i * 0.15 };
});

const LightingSection = ({ onNext }) => {
  const [isLit, setIsLit] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const handleLightsOn = () => {
    setTransitioning(true);
    setIsLit(true);
    setTimeout(() => {
      try { fireConfetti(); } catch (_) {}
      try { triggerBlossomBurst(); } catch (_) {}
    }, 600);
    setTimeout(() => setTransitioning(false), 1200);
  };

  /* ─────── wrapper ─────── */
  const wrapperStyle = {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 1.2s ease-in-out',
    background: isLit
      ? 'linear-gradient(180deg, #FFF6E9 0%, #FFE59A 50%, #FFD9C8 100%)'
      : 'linear-gradient(180deg, #0d0620 0%, #1a0e35 40%, #2d1b4e 100%)',
    fontFamily: "'Poppins', sans-serif",
    padding: '2rem 1rem',
    boxSizing: 'border-box',
  };

  return (
    <div className="section-wrapper" style={wrapperStyle}>

      {/* ══════════ DARK STATE ELEMENTS ══════════ */}
      <AnimatePresence>
        {!isLit && (
          <>
            {/* ── twinkling stars ── */}
            {STARS.map((star, i) => (
              <div
                key={`star-${i}`}
                style={{
                  position: 'absolute',
                  top: star.top,
                  left: star.left,
                  width: star.size,
                  height: star.size,
                  borderRadius: '50%',
                  background: '#fff',
                  animation: `ls-twinkle 2s ease-in-out ${star.delay}s infinite`,
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
              />
            ))}

            {/* ── scattered confetti pieces ── */}
            {CONFETTI_PIECES.map((piece, i) => (
              <div
                key={`conf-${i}`}
                style={{
                  position: 'absolute',
                  top: piece.top,
                  left: piece.left,
                  width: piece.size,
                  height: piece.size,
                  borderRadius: piece.shape === 'circle' ? '50%' : '1px',
                  background: piece.color,
                  opacity: 0.6,
                  animation: `ls-confetti-drift 3s ease-in-out ${piece.delay}s infinite alternate`,
                  zIndex: 1,
                  pointerEvents: 'none',
                }}
              />
            ))}

            {/* ── sleeping crescent moon (top-right) ── */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.6 } }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{
                position: 'absolute',
                top: '5%',
                right: '8%',
                zIndex: 3,
              }}
            >
              {/* moon body */}
              <div style={{ position: 'relative', width: 80, height: 80 }}>
                {/* full yellow circle */}
                <div style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FFE59A 0%, #FFD166 100%)',
                  boxShadow: '0 0 30px rgba(255,229,154,0.4), 0 0 60px rgba(255,229,154,0.15)',
                  position: 'relative',
                }} >
                  {/* crescent cutout */}
                  <div style={{
                    position: 'absolute',
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: '#0d0620',
                    top: -6,
                    right: -8,
                  }} />
                  {/* sleeping eye (closed arc) */}
                  <div style={{
                    position: 'absolute',
                    top: 32,
                    left: 20,
                    width: 14,
                    height: 7,
                    borderBottom: '2.5px solid #6b5c3e',
                    borderRadius: '0 0 50% 50%',
                  }} />
                  {/* blush cheek */}
                  <div style={{
                    position: 'absolute',
                    top: 40,
                    left: 14,
                    width: 10,
                    height: 6,
                    borderRadius: '50%',
                    background: 'rgba(245,139,170,0.5)',
                  }} />
                  {/* tiny mouth */}
                  <div style={{
                    position: 'absolute',
                    top: 44,
                    left: 24,
                    width: 6,
                    height: 3,
                    borderBottom: '1.5px solid #6b5c3e',
                    borderRadius: '0 0 50% 50%',
                  }} />
                </div>
                {/* night cap */}
                <div style={{
                  position: 'absolute',
                  top: -18,
                  left: 8,
                  width: 0,
                  height: 0,
                  borderLeft: '14px solid transparent',
                  borderRight: '14px solid transparent',
                  borderBottom: '28px solid #F58BAA',
                  transform: 'rotate(-15deg)',
                  zIndex: 4,
                }} />
                {/* cap pom-pom */}
                <div style={{
                  position: 'absolute',
                  top: -24,
                  left: 4,
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: '#fff',
                }} />
                {/* tiny stars around moon */}
                {[
                  { top: -8, left: -16, s: 6 },
                  { top: 10, left: -22, s: 4 },
                  { top: -14, left: 50, s: 5 },
                  { top: 60, left: -10, s: 4 },
                ].map((st, i) => (
                  <div key={`ms-${i}`} style={{
                    position: 'absolute',
                    top: st.top,
                    left: st.left,
                    width: st.s,
                    height: st.s,
                    background: '#FFE59A',
                    borderRadius: '50%',
                    animation: `ls-twinkle 1.8s ease-in-out ${i * 0.3}s infinite`,
                  }} />
                ))}
                {/* Zzz */}
                {[0, 1, 2].map(i => (
                  <span key={`z-${i}`} style={{
                    position: 'absolute',
                    top: -10 - i * 12,
                    right: -20 - i * 8,
                    fontSize: 10 + i * 3,
                    color: '#DCCBFA',
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    animation: `ls-zzz 2.5s ease-in-out ${i * 0.6}s infinite`,
                    pointerEvents: 'none',
                  }}>z</span>
                ))}
              </div>
            </motion.div>

            {/* ── hanging light bulb (top-left) ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
              style={{
                position: 'absolute',
                top: 0,
                left: '14%',
                zIndex: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transformOrigin: 'top center',
                animation: 'ls-swing 4s ease-in-out infinite',
              }}
            >
              {/* wire */}
              <div style={{
                width: 2,
                height: 80,
                background: 'linear-gradient(to bottom, #555, #888)',
              }} />
              {/* bulb base/cap */}
              <div style={{
                width: 16,
                height: 10,
                background: '#888',
                borderRadius: '2px 2px 0 0',
              }} />
              {/* bulb glass */}
              <div style={{
                width: 30,
                height: 38,
                background: 'linear-gradient(180deg, #aaa 0%, #777 100%)',
                borderRadius: '6px 6px 50% 50%',
                opacity: 0.7,
                position: 'relative',
              }}>
                {/* filament */}
                <div style={{
                  position: 'absolute',
                  bottom: 10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 8,
                  height: 12,
                  border: '1.5px solid #999',
                  borderTop: 'none',
                  borderRadius: '0 0 4px 4px',
                }} />
              </div>
            </motion.div>

            {/* ── clouds at bottom ── */}
            {[
              { left: '-5%', bottom: '3%', w: 120, h: 40, delay: 0 },
              { left: '30%', bottom: '1%', w: 100, h: 35, delay: 1 },
              { left: '65%', bottom: '4%', w: 130, h: 42, delay: 0.5 },
              { left: '85%', bottom: '2%', w: 90, h: 30, delay: 1.5 },
            ].map((cl, i) => (
              <div key={`cloud-${i}`} style={{
                position: 'absolute',
                left: cl.left,
                bottom: cl.bottom,
                width: cl.w,
                height: cl.h,
                background: 'radial-gradient(ellipse, rgba(100,90,120,0.35) 0%, transparent 70%)',
                borderRadius: '50%',
                animation: `ls-cloud-drift 6s ease-in-out ${cl.delay}s infinite`,
                zIndex: 2,
                pointerEvents: 'none',
              }} />
            ))}

            {/* ── teddy bear (dark / sleepy) ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30, transition: { duration: 0.5 } }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{
                position: 'absolute',
                bottom: '6%',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                zIndex: 4,
              }}
            >
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <span style={{ fontSize: '3.5rem', display: 'block' }}>🧸</span>
                {/* night cap on teddy */}
                <div style={{
                  position: 'absolute',
                  top: -10,
                  left: '50%',
                  transform: 'translateX(-50%) rotate(10deg)',
                  width: 0,
                  height: 0,
                  borderLeft: '10px solid transparent',
                  borderRight: '10px solid transparent',
                  borderBottom: '20px solid #DCCBFA',
                }} />
                <div style={{
                  position: 'absolute',
                  top: -16,
                  left: '55%',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#FFE59A',
                }} />
                {/* floating Zzz */}
                {[0, 1].map(i => (
                  <span key={`tz-${i}`} style={{
                    position: 'absolute',
                    top: -8 - i * 16,
                    right: -18 - i * 10,
                    fontSize: 13 + i * 4,
                    color: '#DCCBFA',
                    fontWeight: 700,
                    animation: `ls-zzz 2.8s ease-in-out ${i * 0.7}s infinite`,
                  }}>💤</span>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ══════════ LIT STATE ELEMENTS ══════════ */}
      <AnimatePresence>
        {isLit && (
          <>
            {/* ── glowing light bulb (top-left, now bright) ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              style={{
                position: 'absolute',
                top: 0,
                left: '14%',
                zIndex: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transformOrigin: 'top center',
              }}
            >
              {/* wire */}
              <div style={{ width: 2, height: 80, background: 'linear-gradient(to bottom, #888, #aaa)' }} />
              {/* bulb cap */}
              <div style={{ width: 16, height: 10, background: '#aaa', borderRadius: '2px 2px 0 0' }} />
              {/* bright bulb */}
              <div style={{
                width: 30,
                height: 38,
                background: 'linear-gradient(180deg, #fff9c4 0%, #ffe066 100%)',
                borderRadius: '6px 6px 50% 50%',
                animation: 'ls-glow-pulse 2s ease-in-out infinite',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  bottom: 10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 8,
                  height: 12,
                  border: '1.5px solid #ffcc00',
                  borderTop: 'none',
                  borderRadius: '0 0 4px 4px',
                }} />
              </div>
              {/* glow halo */}
              <div style={{
                position: 'absolute',
                bottom: -20,
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,229,102,0.4) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />
            </motion.div>

            {/* ── fairy lights string at top ── */}
            {/* wire */}
            <svg style={{
              position: 'absolute',
              top: '4%',
              left: 0,
              width: '100%',
              height: '12%',
              zIndex: 4,
              pointerEvents: 'none',
            }}>
              <path
                d={`M ${0} ${40} Q ${window?.innerWidth ? window.innerWidth * 0.25 : 100} ${70} ${window?.innerWidth ? window.innerWidth * 0.5 : 200} ${35} T ${window?.innerWidth || 400} ${45}`}
                stroke="#888"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
            {FAIRY_LIGHTS.map((fl, i) => (
              <motion.div
                key={`fairy-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + fl.delay }}
                style={{
                  position: 'absolute',
                  top: `${fl.y}%`,
                  left: `${fl.x}%`,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: fl.color,
                  boxShadow: `0 0 8px ${fl.color}, 0 0 16px ${fl.color}88`,
                  animation: `ls-fairy-blink 1.5s ease-in-out ${fl.delay}s infinite`,
                  zIndex: 5,
                  pointerEvents: 'none',
                }}
              />
            ))}

            {/* ── bunting banner ── */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{
                position: 'absolute',
                top: '13%',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 3,
                zIndex: 6,
                flexWrap: 'wrap',
                justifyContent: 'center',
                maxWidth: '95%',
              }}
            >
              {BUNTING_TEXT.split('').map((ch, i) => {
                const colors = ['#F58BAA', '#FFE59A', '#DCCBFA', '#FFD9C8', '#87CEEB', '#98FB98'];
                return (
                  <motion.div
                    key={`bunt-${i}`}
                    initial={{ rotateX: 90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.05 }}
                    style={{
                      width: ch === ' ' ? 10 : 22,
                      height: ch === ' ' ? 0 : 28,
                      background: ch === ' ' ? 'transparent' : colors[i % colors.length],
                      clipPath: ch === ' ' ? 'none' : 'polygon(0 0, 100% 0, 50% 100%)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      paddingTop: 3,
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '0.55rem',
                      fontWeight: 700,
                      color: '#35263D',
                      animation: `ls-bunting-wave 2s ease-in-out ${i * 0.1}s infinite`,
                    }}
                  >
                    {ch !== ' ' ? ch : ''}
                  </motion.div>
                );
              })}
            </motion.div>

            {/* ── floating balloons ── */}
            {BALLOONS.map((b, i) => (
              <motion.div
                key={`balloon-${i}`}
                initial={{ opacity: 0, y: 100, scale: 0 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 100, delay: 0.4 + b.delay }}
                style={{
                  position: 'absolute',
                  left: b.left,
                  bottom: b.bottom,
                  fontSize: b.size,
                  animation: `ls-float-balloon 3.5s ease-in-out ${b.delay}s infinite`,
                  zIndex: 4,
                  pointerEvents: 'none',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
                }}
              >
                {b.emoji}
                {/* balloon string */}
                <div style={{
                  position: 'absolute',
                  bottom: -18,
                  left: '50%',
                  width: 1,
                  height: 20,
                  background: '#ccc',
                  transform: 'translateX(-50%)',
                }} />
              </motion.div>
            ))}

            {/* ── flower decorations ── */}
            {[
              { left: '5%', bottom: '8%', emoji: '🌸', size: '1.8rem', delay: 0.3 },
              { left: '20%', bottom: '5%', emoji: '🌼', size: '1.5rem', delay: 0.6 },
              { left: '78%', bottom: '6%', emoji: '🌺', size: '1.6rem', delay: 0.4 },
              { left: '90%', bottom: '10%', emoji: '🌸', size: '1.4rem', delay: 0.7 },
              { left: '55%', bottom: '4%', emoji: '🌷', size: '1.7rem', delay: 0.5 },
            ].map((f, i) => (
              <motion.span
                key={`flower-${i}`}
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: 'spring', delay: 0.8 + f.delay }}
                style={{
                  position: 'absolute',
                  left: f.left,
                  bottom: f.bottom,
                  fontSize: f.size,
                  animation: `ls-float 4s ease-in-out ${f.delay}s infinite`,
                  zIndex: 4,
                  pointerEvents: 'none',
                }}
              >
                {f.emoji}
              </motion.span>
            ))}

            {/* ── teddy bear (lit / awake) ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', delay: 0.6 }}
              style={{
                position: 'absolute',
                bottom: '6%',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                zIndex: 5,
                fontSize: '3.5rem',
              }}
            >
              <span role="img" aria-label="celebrating teddy">🎉🧸🌸</span>
            </motion.div>

            {/* ── sparkle particles ── */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, delay: 1 + i * 0.3, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  top: `${15 + Math.random() * 50}%`,
                  left: `${5 + Math.random() * 90}%`,
                  zIndex: 5,
                  pointerEvents: 'none',
                }}
              >
                <Sparkles size={14} color="#FFE59A" />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* ══════════ CENTER TEXT ══════════ */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        maxWidth: 420,
        padding: '0 1rem',
      }}>
        <AnimatePresence mode="wait">
          {!isLit ? (
            <motion.div
              key="dark-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Shhh... */}
              <motion.h2
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: '2.8rem',
                  color: '#F58BAA',
                  margin: '0 0 0.6rem 0',
                  textShadow: '0 0 20px rgba(245,139,170,0.4)',
                  lineHeight: 1.2,
                }}
              >
                Shhh...
              </motion.h2>

              {/* The room is waiting for you. */}
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.8rem',
                  color: '#ffffff',
                  margin: '0 0 0.8rem 0',
                  fontWeight: 600,
                  lineHeight: 1.3,
                  textShadow: '0 2px 12px rgba(0,0,0,0.3)',
                }}
              >
                The room is waiting for you.
              </motion.h3>

              {/* Sub text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.95rem',
                  color: '#9e9e9e',
                  margin: '0 0 2rem 0',
                  lineHeight: 1.5,
                }}
              >
                Someone left the lights off on purpose.
              </motion.p>

              {/* Turn on the lights button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                whileHover={{ scale: 1.06, boxShadow: '0 0 30px rgba(255,229,154,0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLightsOn}
                className="btn-yellow btn-pink"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: '#35263D',
                  background: 'linear-gradient(135deg, #FFE59A 0%, #FFD166 100%)',
                  border: '2px dashed #F58BAA',
                  borderRadius: 50,
                  padding: '14px 32px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(255,229,154,0.35)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                <Lightbulb size={20} />
                Turn on the lights 💡
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="lit-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Surprise title */}
              <motion.h2
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 120, delay: 0.8 }}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '2.2rem',
                  color: '#35263D',
                  margin: '0 0 0.6rem 0',
                  fontWeight: 700,
                  lineHeight: 1.3,
                  textShadow: '0 2px 8px rgba(53,38,61,0.1)',
                }}
              >
                Surprise, Renuka! 🎀
              </motion.h2>

              {/* Sub text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: '1.3rem',
                  color: '#6b5c3e',
                  margin: '0 0 2rem 0',
                  lineHeight: 1.5,
                }}
              >
                Even from a distance, you deserve a little celebration.
              </motion.p>

              {/* Next button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                whileHover={{ scale: 1.06, boxShadow: '0 0 30px rgba(245,139,170,0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="btn-pink"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: '#fff',
                  background: 'linear-gradient(135deg, #F58BAA 0%, #e0709a 100%)',
                  border: '2px dashed #DCCBFA',
                  borderRadius: 50,
                  padding: '14px 32px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(245,139,170,0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                <Gift size={20} />
                There's one more surprise 🎁
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LightingSection;
