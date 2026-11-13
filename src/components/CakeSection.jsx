import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Moon } from 'lucide-react';
import { birthdayContent } from '../data/birthdayContent';
import { triggerBlossomBurst } from './BlossomEffect';
import { fireConfetti } from './ConfettiEffect';
import CuteDecorations from './CuteDecorations';

export default function CakeSection({ onNext }) {
  const [candlesLit, setCandlesLit] = useState(true);
  const [isCut, setIsCut] = useState(false);
  const [showKnife, setShowKnife] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const { cake } = birthdayContent;

  const handleMakeWishAndCut = (e) => {
    if (!candlesLit) return;

    // Step 1: Candles blow out
    setCandlesLit(false);

    // Step 2: Blossom burst
    const rect = e.currentTarget.getBoundingClientRect();
    triggerBlossomBurst(rect.x + rect.width / 2, rect.y, 45);
    fireConfetti({ count: 75 });

    // Step 3: Knife slice down
    setTimeout(() => {
      setShowKnife(true);
    }, 400);

    // Step 4: Cake halves separate smoothly
    setTimeout(() => {
      setShowKnife(false);
      setIsCut(true);
      setShowCelebration(true);
      fireConfetti({ count: 65 });
    }, 1100);
  };

  const handleNextSection = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerBlossomBurst(rect.x + rect.width / 2, rect.y + rect.height / 2, 35);
    onNext();
  };

  return (
    <section className="section-wrapper bg-warm" style={{ minHeight: '100vh', justifyContent: 'center', position: 'relative' }}>
      {/* Cute Cats & Teddy Bear Cheering for Cake */}
      <CuteDecorations position="cake-decor" />

      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: 460, margin: '0 auto 1.2rem', padding: '0 1rem', zIndex: 10 }}>
        <p
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: '1.4rem',
            color: '#F58BAA',
            margin: '0 0 4px 0'
          }}
        >
          {cake.heading}
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 6vw, 2.7rem)',
            fontWeight: 700,
            color: '#35263D',
            margin: '0 0 6px 0',
            lineHeight: 1.2
          }}
        >
          {cake.mainText}
        </h2>
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '0.92rem',
            color: '#705378',
            margin: 0
          }}
        >
          {cake.subtitle}
        </p>
      </div>

      {/* Button (Before cutting) */}
      {!showCelebration && (
        <div style={{ textAlign: 'center', marginBottom: '2rem', zIndex: 10 }}>
          <button
            onClick={handleMakeWishAndCut}
            className="btn-pink"
            style={{ minWidth: 240 }}
          >
            <Moon size={16} />
            <span>{cake.blowButtonText}</span>
          </button>
        </div>
      )}

      {/* ─── Seamless 3-Tier Cake Stage ─── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 360,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          minHeight: 230,
          zIndex: 10
        }}
      >
        {/* Soft magical glow under cake */}
        <div
          style={{
            position: 'absolute',
            bottom: 4,
            width: 270,
            height: 44,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(255, 229, 154, 0.75) 0%, rgba(245, 139, 170, 0.3) 60%, transparent 80%)',
            filter: 'blur(10px)',
            pointerEvents: 'none'
          }}
        />

        {/* Candles on Top */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 20, marginBottom: -1, zIndex: 15 }}>
          {[0, 1, 2].map((idx) => (
            <div key={idx} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <AnimatePresence>
                {candlesLit ? (
                  <motion.div
                    style={{
                      width: 14,
                      height: 22,
                      borderRadius: '50% 50% 35% 35%',
                      background: 'radial-gradient(ellipse at bottom, #ffffff 0%, #ffeb3b 40%, #ff5722 95%)',
                      boxShadow: '0 0 14px #ffc107, 0 0 24px rgba(255, 193, 7, 0.6)'
                    }}
                    animate={{ scale: [1, 1.08, 0.95, 1], rotate: [-2, 2, -1, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                    exit={{ opacity: 0, scale: 0.2 }}
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 0.8, y: 0 }}
                    animate={{ opacity: 0, y: -24, x: (idx - 1) * 8 }}
                    transition={{ duration: 1 }}
                    style={{ fontSize: 13, userSelect: 'none' }}
                  >
                    💨
                  </motion.div>
                )}
              </AnimatePresence>
              <div style={{ width: 2, height: 6, background: '#4a3b32' }} />
              <div
                style={{
                  width: 12,
                  height: 32,
                  borderRadius: '3px 3px 0 0',
                  background: idx === 1
                    ? 'repeating-linear-gradient(45deg, #F58BAA, #F58BAA 4px, #ffffff 4px, #ffffff 8px)'
                    : idx === 0
                    ? 'repeating-linear-gradient(45deg, #DCCBFA, #DCCBFA 4px, #ffffff 4px, #ffffff 8px)'
                    : 'repeating-linear-gradient(45deg, #FFE59A, #FFE59A 4px, #ffffff 4px, #ffffff 8px)',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.06)'
                }}
              />
            </div>
          ))}
        </div>

        {/* Knife Slicing Animation */}
        <AnimatePresence>
          {showKnife && (
            <motion.div
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: 90, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 25,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))'
              }}
            >
              <div style={{ width: 6, height: 90, background: 'linear-gradient(to bottom, #ffe082 0%, #fff 50%, #ffd54f 100%)', borderRadius: 3 }} />
              <span style={{ fontSize: 18 }}>✨</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── CAKE RENDERING: Unified when uncut, Separated smoothly when cut ─── */}
        {!isCut ? (
          /* UNIFIED SEAMLESS CAKE (No vertical gap, no stray lines, perfectly continuous) */
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 5,
              position: 'relative'
            }}
          >
            {/* Top Tier */}
            <div
              style={{
                width: 140,
                height: 42,
                borderRadius: '16px 16px 4px 4px',
                background: 'linear-gradient(180deg, #fff5f8 0%, #ffd9e2 100%)',
                boxShadow: 'inset 0 4px 8px rgba(255,255,255,0.8), 0 3px 6px rgba(53,38,61,0.06)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: '0 12px',
                border: 'none'
              }}
            >
              <span style={{ fontSize: 13, userSelect: 'none' }}>🍓</span>
              <span style={{ fontSize: 13, userSelect: 'none' }}>🍓</span>
              <span style={{ fontSize: 13, userSelect: 'none' }}>🍓</span>
              {/* Scalloped Frosting Drips */}
              <div style={{ position: 'absolute', bottom: -3, left: 0, right: 0, height: 6, background: 'radial-gradient(circle at 10px 0, #fff 6px, transparent 7px) repeat-x', backgroundSize: '20px 6px' }} />
            </div>

            {/* Middle Tier */}
            <div
              style={{
                width: 210,
                height: 48,
                borderRadius: '18px 18px 4px 4px',
                background: 'linear-gradient(180deg, #fffaf2 0%, #ffe3cb 100%)',
                boxShadow: 'inset 0 4px 8px rgba(255,255,255,0.8), 0 3px 8px rgba(53,38,61,0.06)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: '0 16px',
                border: 'none'
              }}
            >
              <span style={{ fontSize: 13, userSelect: 'none' }}>🌸</span>
              <span style={{ fontSize: 13, userSelect: 'none' }}>✨</span>
              <span style={{ fontSize: 13, userSelect: 'none' }}>🌸</span>
              <div style={{ position: 'absolute', bottom: -3, left: 0, right: 0, height: 6, background: 'radial-gradient(circle at 10px 0, #fff 6px, transparent 7px) repeat-x', backgroundSize: '21px 6px' }} />
            </div>

            {/* Bottom Tier */}
            <div
              style={{
                width: 280,
                height: 56,
                borderRadius: '20px 20px 6px 6px',
                background: 'linear-gradient(180deg, #fbf7ff 0%, #e8dbfc 100%)',
                boxShadow: 'inset 0 4px 8px rgba(255,255,255,0.8), 0 6px 14px rgba(53,38,61,0.08)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none'
              }}
            >
              <span
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: '1.45rem',
                  color: '#e8436c',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  textShadow: '0 1px 4px rgba(245, 139, 170, 0.4)'
                }}
              >
                Happy Birthday Renuka ✨
              </span>
              <div style={{ position: 'absolute', bottom: -3, left: 0, right: 0, height: 6, background: 'radial-gradient(circle at 10px 0, #fff 6px, transparent 7px) repeat-x', backgroundSize: '20px 6px' }} />
            </div>
          </div>
        ) : (
          /* CUT CAKE WITH TWO HALVES SLID APART SMOOTHLY */
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, gap: 28 }}>
            {/* Left Cake Half */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: -16, rotate: -2 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}
            >
              <div style={{ width: 70, height: 42, borderRadius: '16px 0 0 4px', background: 'linear-gradient(180deg, #fff5f8 0%, #ffd9e2 100%)', borderRight: '2.5px solid #ffccd8', display: 'flex', alignItems: 'center', paddingLeft: 12 }}>
                <span style={{ fontSize: 13 }}>🍓</span>
              </div>
              <div style={{ width: 105, height: 48, borderRadius: '18px 0 0 4px', background: 'linear-gradient(180deg, #fffaf2 0%, #ffe3cb 100%)', borderRight: '2.5px solid #fed7aa', display: 'flex', alignItems: 'center', paddingLeft: 16 }}>
                <span style={{ fontSize: 13 }}>🌸</span>
              </div>
              <div style={{ width: 140, height: 56, borderRadius: '20px 0 0 6px', background: 'linear-gradient(180deg, #fbf7ff 0%, #e8dbfc 100%)', borderRight: '2.5px solid #d8b4fe', display: 'flex', alignItems: 'center', paddingLeft: 20 }}>
                <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.25rem', color: '#e8436c', fontWeight: 700 }}>
                  Renuka
                </span>
              </div>
            </motion.div>

            {/* Right Cake Half */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: 16, rotate: 2 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
            >
              <div style={{ width: 70, height: 42, borderRadius: '0 16px 4px 0', background: 'linear-gradient(180deg, #fff5f8 0%, #ffd9e2 100%)', borderLeft: '2.5px solid #ffccd8', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 12 }}>
                <span style={{ fontSize: 13 }}>🍓</span>
              </div>
              <div style={{ width: 105, height: 48, borderRadius: '0 18px 4px 0', background: 'linear-gradient(180deg, #fffaf2 0%, #ffe3cb 100%)', borderLeft: '2.5px solid #fed7aa', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 16 }}>
                <span style={{ fontSize: 13 }}>✨</span>
              </div>
              <div style={{ width: 140, height: 56, borderRadius: '0 20px 6px 0', background: 'linear-gradient(180deg, #fbf7ff 0%, #e8dbfc 100%)', borderLeft: '2.5px solid #d8b4fe', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 20 }}>
                <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.25rem', color: '#e8436c', fontWeight: 700 }}>
                  Birthday!
                </span>
              </div>
            </motion.div>
          </div>
        )}

        {/* Cake Stand Plate */}
        <div
          style={{
            width: 310,
            height: 10,
            borderRadius: 12,
            background: 'linear-gradient(to bottom, #ffffff 0%, #f4e1ea 100%)',
            border: '1.5px solid rgba(245, 139, 170, 0.3)',
            boxShadow: '0 6px 14px rgba(53, 38, 61, 0.08)',
            marginTop: 0,
            zIndex: 4
          }}
        />
      </div>

      {/* Celebration Message Box & Continue Button */}
      {showCelebration && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            textAlign: 'center',
            maxWidth: 420,
            margin: '0 auto',
            padding: '1.4rem',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            borderRadius: 22,
            border: '1.5px solid rgba(245, 139, 170, 0.25)',
            boxShadow: '0 12px 28px rgba(245, 139, 170, 0.18)',
            zIndex: 10
          }}
        >
          <p
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: '1.5rem',
              color: '#e8436c',
              fontWeight: 700,
              lineHeight: 1.35,
              margin: '0 0 8px 0'
            }}
          >
            "{cake.wishMessage}"
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: '0.8rem', color: '#F58BAA', marginBottom: 16 }}>
            <Heart size={13} fill="#F58BAA" color="#F58BAA" />
            <span>Cake cut successfully! 🎂✨</span>
          </div>

          <button
            onClick={handleNextSection}
            className="btn-pink"
            style={{ minWidth: 220 }}
          >
            <Sparkles size={16} />
            <span>{cake.nextButtonText}</span>
          </button>
        </motion.div>
      )}
    </section>
  );
}
