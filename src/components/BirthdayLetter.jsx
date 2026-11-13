import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { triggerBlossomBurst } from './BlossomEffect';
import CuteDecorations from './CuteDecorations';

export default function BirthdayLetter({ onNext }) {
  const [unrolled, setUnrolled] = useState(false);

  const handleNext = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    triggerBlossomBurst(r.x + r.width / 2, r.y + r.height / 2, 35);
    onNext();
  };

  const paragraphs = [
    "Happy Birthday, Renuka! ❤️",
    "I hope this year turns out to be much better for you, full of happiness, success, new opportunities, and beautiful memories.",
    "And now, you're mature enough, so don't cry over every little problem! 😂",
    "Life won't always go the way we want, and sometimes things get difficult. But that's okay. You don't have to run away from problems; you have to face them, learn from them, and become stronger.",
    "Always remember that you are capable of handling much more than you think.",
    "One thing is missing this birthday, though. Our whole group isn't together to celebrate with you this time.",
    "But don't worry! Once everyone comes back from home, we're definitely going to have a BIG party together. And yes, no excuses! 😂🎉",
    "Until then, consider this little website a small birthday surprise from my side.",
    "Keep smiling, stay strong, and have the most amazing year ahead!"
  ];

  return (
    <section
      className="section-wrapper bg-cream"
      style={{
        minHeight: '100vh',
        justifyContent: 'center',
        padding: '1.5rem 1rem 2rem',
        position: 'relative'
      }}
    >
      {/* Cute Teddy and Cat Corner Companions */}
      <CuteDecorations position="letter-decor" />

      {/* Floating Sparkles & Blossom in background */}
      <motion.div
        style={{ position: 'absolute', top: 20, left: 24, fontSize: 24, pointerEvents: 'none', opacity: 0.6 }}
        animate={{ y: [-4, 5, -4], rotate: [-6, 6, -6] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        🌸
      </motion.div>
      <motion.div
        style={{ position: 'absolute', top: 28, right: 28, fontSize: 20, pointerEvents: 'none', opacity: 0.6 }}
        animate={{ y: [5, -5, 5], rotate: [5, -5, 5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        ✨
      </motion.div>

      {/* ─── VINTAGE PARCHMENT SCROLL CONTAINER (WIDER TO FIT WITHOUT SCROLLING) ─── */}
      <div
        style={{
          width: '100%',
          maxWidth: 740,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Top Scroll Spindle Rod */}
        <div
          style={{
            width: 'calc(100% + 28px)',
            height: 18,
            borderRadius: 9,
            background: 'linear-gradient(180deg, #d4a373 0%, #b07d4b 50%, #8b5a2b 100%)',
            boxShadow: '0 4px 10px rgba(74, 52, 28, 0.35)',
            position: 'relative',
            zIndex: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 6px'
          }}
        >
          {/* Decorative scroll rod knobs */}
          <div style={{ width: 14, height: 26, borderRadius: 5, background: 'linear-gradient(135deg, #e7c08a 0%, #8b5a2b 100%)', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }} />
          {/* Cute pink ribbon tied in the middle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, background: 'rgba(255,255,255,0.25)', padding: '1px 8px', borderRadius: 10 }}>
            <span style={{ fontSize: 13 }}>🎀</span>
          </div>
          <div style={{ width: 14, height: 26, borderRadius: 5, background: 'linear-gradient(135deg, #e7c08a 0%, #8b5a2b 100%)', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }} />
        </div>

        {/* Vintage Parchment Paper Body (Realistic Unrolling Animation) */}
        <motion.div
          initial={{ scaleY: 0.1, opacity: 0.5 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={() => setUnrolled(true)}
          style={{
            transformOrigin: 'top center',
            width: '100%',
            background: 'linear-gradient(180deg, #fdf7ec 0%, #faf0db 40%, #f6e8cc 100%)',
            boxShadow: '0 18px 45px rgba(88, 63, 37, 0.15), inset 0 0 40px rgba(212, 163, 115, 0.18)',
            borderLeft: '3px double #d6b284',
            borderRight: '3px double #d6b284',
            padding: '1.6rem 2.2rem 1.4rem',
            boxSizing: 'border-box',
            position: 'relative',
            marginTop: -6,
            marginBottom: -6,
            zIndex: 10
          }}
        >
          {/* Subtle vintage parchment lines & watermark */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(#d4a373 0.6px, transparent 0.6px)',
              backgroundSize: '24px 24px',
              opacity: 0.25,
              pointerEvents: 'none'
            }}
          />

          {/* Heading */}
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.6rem, 4vw, 2.1rem)',
              fontWeight: 700,
              color: '#3d2614',
              textAlign: 'center',
              marginBottom: 2,
              lineHeight: 1.2
            }}
          >
            For you, Renuka
          </h2>

          {/* Cursive Subtitle */}
          <p
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: '1.25rem',
              color: '#c85a7c',
              textAlign: 'center',
              marginBottom: 8
            }}
          >
            A letter, just for you
          </p>

          {/* Golden Vintage Divider */}
          <div
            style={{
              width: 90,
              height: 2,
              background: 'linear-gradient(90deg, transparent, #c85a7c, transparent)',
              margin: '0 auto 12px'
            }}
          />

          {/* Letter Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={unrolled ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ delay: 0.08 + i * 0.06, duration: 0.45 }}
                style={{
                  fontFamily: i === 0 ? "'Playfair Display', serif" : "'Poppins', sans-serif",
                  fontSize: i === 0 ? '1.15rem' : '0.92rem',
                  fontWeight: i === 0 ? 700 : 400,
                  color: i === 0 ? '#b83358' : '#452d1a',
                  lineHeight: 1.6,
                  margin: 0,
                  textAlign: 'left',
                  letterSpacing: '0.15px',
                  ...(i === 2
                    ? {
                        background: 'rgba(245, 139, 170, 0.12)',
                        padding: '8px 14px',
                        borderRadius: 10,
                        borderLeft: '3.5px solid #c85a7c',
                        fontStyle: 'italic',
                        color: '#63253b'
                      }
                    : {})
                }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Vintage Signature Block */}
          <div
            style={{
              marginTop: 14,
              paddingTop: 12,
              borderTop: '1px dashed rgba(184, 51, 88, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 8,
              paddingLeft: 4,
              paddingRight: 4
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: '#c85a7c' }}>
              <Heart size={14} fill="#c85a7c" color="#c85a7c" />
              <span>Always cheering for you</span>
            </div>
            <div style={{ textAlign: 'right', display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.2rem', color: '#c85a7c' }}>
                With love,
              </span>
              <span
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: '1.9rem',
                  fontWeight: 700,
                  color: '#9e2246',
                  lineHeight: 1,
                  textShadow: '0 2px 6px rgba(184, 51, 88, 0.15)'
                }}
              >
                Omkar ❤️
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bottom Scroll Spindle Rod */}
        <div
          style={{
            width: 'calc(100% + 28px)',
            height: 18,
            borderRadius: 9,
            background: 'linear-gradient(180deg, #b07d4b 0%, #8b5a2b 50%, #68411d 100%)',
            boxShadow: '0 6px 14px rgba(74, 52, 28, 0.4)',
            position: 'relative',
            zIndex: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 6px'
          }}
        >
          <div style={{ width: 14, height: 26, borderRadius: 5, background: 'linear-gradient(135deg, #e7c08a 0%, #8b5a2b 100%)', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }} />
          <div style={{ width: 14, height: 26, borderRadius: 5, background: 'linear-gradient(135deg, #e7c08a 0%, #8b5a2b 100%)', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }} />
        </div>

        {/* Next Button Below Scroll */}
        <div style={{ textAlign: 'center', marginTop: 18 }}>
          <button
            onClick={handleNext}
            className="btn-pink"
            style={{ minWidth: 240, padding: '10px 26px', fontSize: '1rem' }}
          >
            <Sparkles size={16} />
            <span>Look at our memories 📸</span>
          </button>
        </div>
      </div>
    </section>
  );
}
