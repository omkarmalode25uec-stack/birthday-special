import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Heart, Sparkles } from 'lucide-react';
import { birthdayContent } from '../data/birthdayContent';
import { triggerBlossomBurst } from './BlossomEffect';
import { fireConfetti } from './ConfettiEffect';
import CuteDecorations from './CuteDecorations';

export default function FinalSection({ onReplay }) {
  const { final } = birthdayContent;

  useEffect(() => {
    triggerBlossomBurst(window.innerWidth / 2, window.innerHeight * 0.4, 45);
    fireConfetti({ count: 90 });
  }, []);

  const handleReplayClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    triggerBlossomBurst(rect.x + rect.width / 2, rect.y + rect.height / 2, 35);
    onReplay();
  };

  return (
    <section className="section-wrapper bg-warm" style={{ minHeight: '100vh', justifyContent: 'center', position: 'relative' }}>
      {/* Cute Teddy and Cat Corner Companions */}
      <CuteDecorations position="final-decor" />
      {/* Floating Decorative Elements */}
      <motion.div
        style={{ position: 'absolute', top: 20, left: 20, fontSize: 32, pointerEvents: 'none', userSelect: 'none' }}
        animate={{ y: [-8, 8, -8], rotate: [-6, 6, -6] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        🎈
      </motion.div>
      <motion.div
        style={{ position: 'absolute', top: 25, right: 25, fontSize: 30, pointerEvents: 'none', userSelect: 'none' }}
        animate={{ y: [8, -8, 8], rotate: [6, -6, 6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        🌸
      </motion.div>

      {/* Main Celebration Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          background: '#fffdfa',
          borderRadius: 24,
          boxShadow: '0 16px 40px rgba(53, 38, 61, 0.1), 0 0 30px rgba(245, 139, 170, 0.25)',
          border: '1.5px solid rgba(245, 139, 170, 0.25)',
          width: '100%',
          maxWidth: 480,
          padding: '2.2rem 1.4rem',
          position: 'relative',
          textAlign: 'center',
          boxSizing: 'border-box'
        }}
      >
        {/* Washi Tape */}
        <div
          style={{
            position: 'absolute',
            top: -11,
            left: '50%',
            transform: 'translateX(-50%) rotate(-1deg)',
            width: 100,
            height: 24,
            background: 'rgba(245, 139, 170, 0.65)',
            borderRadius: 3,
            zIndex: 10,
            pointerEvents: 'none'
          }}
        />

        {/* Mascot Icons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, margin: '6px 0 12px' }}>
          <span style={{ fontSize: '2.6rem', userSelect: 'none' }}>🧸</span>
          <span style={{ fontSize: '2.6rem', userSelect: 'none' }}>🎂</span>
          <span style={{ fontSize: '2.6rem', userSelect: 'none' }}>🎀</span>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.9rem, 6vw, 2.7rem)',
            fontWeight: 700,
            color: '#35263D',
            margin: '0 0 6px 0',
            lineHeight: 1.25
          }}
        >
          {final.heading}
        </h1>
        <p
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: '1.35rem',
            color: '#F58BAA',
            margin: '0 0 16px 0'
          }}
        >
          To our favorite superstar ✨
        </p>

        {/* Heart Divider */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 18 }}>
          <div style={{ width: 45, height: 1.5, background: 'rgba(245, 139, 170, 0.3)' }} />
          <Heart size={14} color="#F58BAA" fill="#F58BAA" />
          <div style={{ width: 45, height: 1.5, background: 'rgba(245, 139, 170, 0.3)' }} />
        </div>

        {/* Message Paragraphs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
          {final.paragraphs.map((p, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '0.92rem',
                color: i === final.paragraphs.length - 1 ? '#e8436c' : '#4f3a54',
                fontWeight: i === final.paragraphs.length - 1 ? 600 : 400,
                lineHeight: 1.65,
                margin: 0,
                ...(i === final.paragraphs.length - 1
                  ? {
                      background: 'rgba(245, 139, 170, 0.08)',
                      padding: '10px 14px',
                      borderRadius: 14,
                      border: '1px solid rgba(245, 139, 170, 0.2)'
                    }
                  : {})
              }}
            >
              {p}
            </p>
          ))}
        </div>

        {/* Signature */}
        <div style={{ borderTop: '1px solid rgba(245, 139, 170, 0.2)', paddingTop: 14, marginBottom: 22 }}>
          <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.15rem', color: '#F58BAA', display: 'block' }}>
            {final.closing}
          </span>
          <span
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: '2.1rem',
              fontWeight: 700,
              color: '#35263D',
              display: 'block',
              marginTop: 2
            }}
          >
            {final.signature}
          </span>
        </div>

        {/* Replay Button */}
        <div>
          <button
            onClick={handleReplayClick}
            className="btn-pink btn-secondary"
            style={{ minWidth: 230 }}
          >
            <RotateCcw size={16} />
            <span>{final.replayButtonText}</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
