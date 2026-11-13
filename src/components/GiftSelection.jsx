import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Award, ArrowRight } from 'lucide-react';
import { birthdayContent } from '../data/birthdayContent';
import { boxThemes, consolationMessages } from '../data/gifts';
import { triggerBlossomBurst } from './BlossomEffect';
import { fireConfetti, fireGrandCelebration } from './ConfettiEffect';
import CuteDecorations from './CuteDecorations';

export default function GiftSelection({ onNext }) {
  const { gifts } = birthdayContent;

  // Exactly one winning box index randomized per session
  const [winningIndex, setWinningIndex] = useState(null);
  const [openedBoxes, setOpenedBoxes] = useState({});
  const [hasWon, setHasWon] = useState(false);
  const [activeMessage, setActiveMessage] = useState(null);

  useEffect(() => {
    const randomWin = Math.floor(Math.random() * 9);
    setWinningIndex(randomWin);
  }, []);

  const handleBoxClick = (index, e) => {
    if (hasWon || openedBoxes[index] !== undefined || winningIndex === null) return;

    const isWinner = index === winningIndex;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.x + rect.width / 2;
    const y = rect.y + rect.height / 2;

    if (isWinner) {
      setHasWon(true);
      setOpenedBoxes((prev) => ({
        ...prev,
        [index]: { isWinner: true }
      }));
      setActiveMessage(null);

      // Grand celebration
      triggerBlossomBurst(x, y, 65);
      fireGrandCelebration();
    } else {
      const openedCount = Object.keys(openedBoxes).length;
      const message = consolationMessages[openedCount % consolationMessages.length];
      
      setOpenedBoxes((prev) => ({
        ...prev,
        [index]: { isWinner: false, message }
      }));
      setActiveMessage(message);
      triggerBlossomBurst(x, y, 20);
    }
  };

  const handleProceed = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerBlossomBurst(rect.x + rect.width / 2, rect.y + rect.height / 2, 40);
    onNext();
  };

  return (
    <section className="section-wrapper bg-cream" style={{ minHeight: '100vh', justifyContent: 'center', position: 'relative' }}>
      {/* Cute Teddy and Cat Corner Companions */}
      <CuteDecorations position="gifts-decor" />
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: 460, margin: '0 auto 1.5rem', padding: '0 1rem' }}>
        <span className="badge-pill">
          <Gift size={13} color="#e8436c" />
          The Mystery Challenge
        </span>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.7rem, 5.5vw, 2.4rem)',
            fontWeight: 700,
            color: '#35263D',
            lineHeight: 1.25,
            margin: '0.4rem 0'
          }}
        >
          {gifts.heading}
        </h2>
        <p
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(1.2rem, 4vw, 1.45rem)',
            color: '#F58BAA',
            margin: 0
          }}
        >
          {gifts.subtitle}
        </p>
      </div>

      {/* ─── 3x3 Gift Box Grid (Explicit CSS Grid, 100% collision-free) ─── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
          width: '100%',
          maxWidth: 330,
          margin: '0 auto',
          boxSizing: 'border-box',
          padding: '0 8px'
        }}
      >
        {boxThemes.map((box, index) => {
          const isOpened = openedBoxes[index] !== undefined;
          const boxData = openedBoxes[index];
          const isWinner = boxData?.isWinner;

          return (
            <motion.div
              key={box.id}
              onClick={(e) => handleBoxClick(index, e)}
              whileHover={!hasWon && !isOpened ? { scale: 1.05 } : {}}
              whileTap={!hasWon && !isOpened ? { scale: 0.95 } : {}}
              style={{
                position: 'relative',
                aspectRatio: '1 / 1',
                width: '100%',
                borderRadius: 16,
                backgroundColor: isOpened ? (isWinner ? '#FFF9E6' : '#F9F6F0') : box.color,
                border: isWinner ? '2.5px solid #FFD54F' : '1.5px solid rgba(255, 255, 255, 0.7)',
                boxShadow: isWinner
                  ? '0 0 25px rgba(255, 213, 79, 0.8), 0 8px 18px rgba(0,0,0,0.08)'
                  : '0 6px 14px rgba(53, 38, 61, 0.08)',
                cursor: !hasWon && !isOpened ? 'pointer' : 'default',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                boxSizing: 'border-box',
                opacity: isOpened && !isWinner ? 0.65 : 1,
                transition: 'all 0.3s ease'
              }}
            >
              {!isOpened ? (
                <>
                  {/* Horizontal Ribbon Stripe */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(50% - 6px)',
                      left: 0,
                      width: '100%',
                      height: 12,
                      backgroundColor: box.ribbonColor,
                      pointerEvents: 'none'
                    }}
                  />

                  {/* Vertical Ribbon Stripe */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 'calc(50% - 6px)',
                      width: 12,
                      height: '100%',
                      backgroundColor: box.ribbonColor,
                      pointerEvents: 'none'
                    }}
                  />

                  {/* Center Badge with Box Icon & Number */}
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      background: 'rgba(255, 255, 255, 0.92)',
                      backdropFilter: 'blur(4px)',
                      padding: '4px 8px',
                      borderRadius: 12,
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#4a3455',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3,
                      pointerEvents: 'none'
                    }}
                  >
                    <span>{box.icon}</span>
                    <span>#{box.id}</span>
                  </div>
                </>
              ) : isWinner ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{ textAlign: 'center', padding: 4 }}
                >
                  <span style={{ fontSize: '1.8rem', display: 'block' }}>☕🎉</span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#b45309', textTransform: 'uppercase' }}>
                    WINNER!
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  style={{ textAlign: 'center', padding: 4 }}
                >
                  <span style={{ fontSize: '1.4rem', display: 'block' }}>🌸</span>
                  <span style={{ fontSize: '0.62rem', color: '#8c7694', fontWeight: 600 }}>
                    Try again!
                  </span>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Consolation Message Floating Banner */}
      <AnimatePresence>
        {activeMessage && !hasWon && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              margin: '1.2rem auto 0',
              padding: '8px 18px',
              background: '#fff0f5',
              border: '1px solid #fbcfe8',
              borderRadius: 20,
              textAlign: 'center',
              color: '#db2777',
              fontSize: '0.85rem',
              fontWeight: 600,
              maxWidth: 320,
              boxShadow: '0 2px 8px rgba(245, 139, 170, 0.15)'
            }}
          >
            {activeMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── GRAND WINNING CARD REVEAL ─── */}
      <AnimatePresence>
        {hasWon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              width: '100%',
              maxWidth: 420,
              margin: '1.8rem auto 0',
              padding: '1.6rem 1.4rem',
              borderRadius: 24,
              background: 'linear-gradient(180deg, #FFFDF8 0%, #FFF4EB 100%)',
              border: '2px solid #FFD54F',
              boxShadow: '0 16px 36px rgba(255, 193, 7, 0.25), 0 0 25px rgba(245, 139, 170, 0.2)',
              position: 'relative',
              textAlign: 'center',
              boxSizing: 'border-box'
            }}
          >
            {/* Top Winner Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                color: '#b45309',
                fontWeight: 700,
                fontSize: '0.82rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: 4
              }}
            >
              <Award size={18} color="#f59e0b" />
              <span>{gifts.winning.title}</span>
            </div>

            {/* Treat Title */}
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.4rem, 4.5vw, 1.85rem)',
                fontWeight: 700,
                color: '#35263D',
                margin: '8px 0 14px'
              }}
            >
              {gifts.winning.treat}
            </h3>

            {/* Icons Display */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 14 }}>
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 16,
                  background: '#fef3c7',
                  border: '1px solid #fde68a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                }}
              >
                ☕
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: 700, color: '#F58BAA' }}>+</span>
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 16,
                  background: '#ffedd5',
                  border: '1px solid #fed7aa',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                }}
              >
                🧅
              </div>
            </div>

            {/* Tagline & Description */}
            <p
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: '1.35rem',
                color: '#e8436c',
                margin: '0 0 6px 0',
                fontWeight: 700
              }}
            >
              {gifts.winning.tagline}
            </p>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.85rem',
                color: '#523e5e',
                lineHeight: 1.6,
                margin: '0 0 14px 0'
              }}
            >
              {gifts.winning.description}
            </p>

            {/* Note Box */}
            <div
              style={{
                background: '#fffbeb',
                borderRadius: 14,
                padding: '10px 14px',
                border: '1px solid #fef08a',
                marginBottom: 18
              }}
            >
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '0.78rem',
                  color: '#92400e',
                  fontStyle: 'italic',
                  margin: 0
                }}
              >
                "{gifts.winning.note}"
              </p>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleProceed}
              className="btn-pink"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>{gifts.nextButtonText}</span>
              <ArrowRight size={17} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
