import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Play, Pause, Cake, Sparkles } from 'lucide-react';
import { memoriesData } from '../data/memories';
import { triggerBlossomBurst } from './BlossomEffect';
import CuteDecorations from './CuteDecorations';

const IMAGE_DURATION = 4000;
const ERROR_SKIP_DELAY = 1800;

export default function MemoryGallery({ onNext }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredSide, setHoveredSide] = useState(null); // 'left' | 'right' | null
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mediaErrors, setMediaErrors] = useState({});

  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const total = memoriesData.length;
  const current = total > 0 ? memoriesData[currentIndex] : null;

  const leftIndex = (currentIndex - 1 + total) % total;
  const rightIndex = (currentIndex + 1) % total;
  const leftItem = memoriesData[leftIndex];
  const rightItem = memoriesData[rightIndex];

  // Clear running auto-timer
  const clearAutoTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const goNext = useCallback(() => {
    if (total === 0) return;
    clearAutoTimer();
    if (videoRef.current) {
      try { videoRef.current.pause(); } catch (_) {}
    }
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
    triggerBlossomBurst(window.innerWidth * 0.55, window.innerHeight * 0.48, 16);
  }, [total, clearAutoTimer]);

  const goPrev = useCallback(() => {
    if (total === 0) return;
    clearAutoTimer();
    if (videoRef.current) {
      try { videoRef.current.pause(); } catch (_) {}
    }
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    triggerBlossomBurst(window.innerWidth * 0.45, window.innerHeight * 0.48, 16);
  }, [total, clearAutoTimer]);

  // Slideshow auto-advance logic
  useEffect(() => {
    if (!isPlaying || total === 0 || lightboxOpen) {
      clearAutoTimer();
      return;
    }

    const item = memoriesData[currentIndex];
    if (!item) return;

    if (item.type === 'video') {
      if (mediaErrors[item.id]) {
        timerRef.current = setTimeout(() => goNext(), ERROR_SKIP_DELAY);
      }
    } else {
      clearAutoTimer();
      timerRef.current = setTimeout(() => {
        goNext();
      }, IMAGE_DURATION);
    }

    return () => clearAutoTimer();
  }, [currentIndex, isPlaying, lightboxOpen, total, mediaErrors, goNext, clearAutoTimer]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        goNext();
      } else {
        goPrev();
      }
    }
  };

  const handleProceed = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    triggerBlossomBurst(r.x + r.width / 2, r.y + r.height / 2, 35);
    onNext();
  };

  // Render individual media inside carousel card (ZERO CAPTIONS, pure photos & videos)
  const renderMedia = (item, isCenter = false) => {
    if (!item) return null;

    if (item.type === 'video') {
      return (
        <div style={{ position: 'relative', width: '100%', height: '100%', background: '#1a0e24', overflow: 'hidden' }}>
          <video
            ref={isCenter ? videoRef : null}
            src={item.src}
            autoPlay={isCenter && isPlaying && !lightboxOpen}
            muted
            playsInline
            loop={false}
            onEnded={isCenter ? goNext : undefined}
            onError={() => setMediaErrors((prev) => ({ ...prev, [item.id]: true }))}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.5s ease'
            }}
          />
          {/* Subtle Video Pill Badge */}
          <div
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'rgba(0, 0, 0, 0.55)',
              color: '#fff',
              fontSize: '0.72rem',
              fontWeight: 600,
              padding: '3px 9px',
              borderRadius: 14,
              backdropFilter: 'blur(6px)',
              pointerEvents: 'none',
              letterSpacing: '0.3px',
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}
          >
            <span>▶</span>
            <span>Video</span>
          </div>
        </div>
      );
    }

    return (
      <img
        src={item.src}
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transition: 'transform 0.5s ease'
        }}
        onError={(e) => {
          e.currentTarget.src = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' fill='%23FFF0F5'><rect width='400' height='400'/><text x='50%25' y='50%25' font-size='60' text-anchor='middle' dominant-baseline='middle'>🌸</text></svg>`;
        }}
      />
    );
  };

  return (
    <section
      className="section-wrapper bg-cream"
      style={{
        minHeight: '100vh',
        justifyContent: 'center',
        padding: '2.5rem 1rem 5.5rem',
        position: 'relative'
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Decorative Cats and Teddies */}
      <CuteDecorations position="carousel-decor" />

      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: 540, margin: '0 auto 1.4rem', padding: '0 1rem', zIndex: 10 }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.8rem, 5.5vw, 2.6rem)',
            fontWeight: 700,
            color: '#35263D',
            margin: '0 0 6px 0',
            lineHeight: 1.25
          }}
        >
          Some moments are worth keeping forever.
        </h2>
        <p
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(1.25rem, 4.2vw, 1.55rem)',
            color: '#F58BAA',
            margin: 0
          }}
        >
          Here's to all the beautiful memories, chaotic moments, and funny moments of you.
        </p>
      </div>

      {/* ─── LARGER 3D COVERFLOW CAROUSEL STAGE ─── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 860,
          height: 470,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: 1200,
          zIndex: 10
        }}
      >
        {/* PREVIOUS ITEM (LEFT) */}
        <motion.div
          onClick={goPrev}
          onMouseEnter={() => setHoveredSide('left')}
          onMouseLeave={() => setHoveredSide(null)}
          animate={{
            x: '-60%',
            scale: hoveredSide === 'left' ? 0.92 : 0.84,
            opacity: hoveredSide === 'left' ? 0.9 : 0.45,
            rotateY: hoveredSide === 'left' ? 14 : 24,
            zIndex: hoveredSide === 'left' ? 8 : 4
          }}
          transition={{ duration: 0.85, ease: [0.32, 0.72, 0, 1] }}
          style={{
            position: 'absolute',
            width: 'min(300px, 74vw)',
            height: 'min(390px, 94vw)',
            borderRadius: 24,
            background: '#ffffff',
            boxShadow: '0 14px 34px rgba(53, 38, 61, 0.16)',
            border: '5px solid #ffffff',
            cursor: 'pointer',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          {renderMedia(leftItem, false)}
        </motion.div>

        {/* ACTIVE ITEM (CENTER) with Soft, Slow & Dreamy Transition */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{
              scale: 0.94,
              opacity: 0,
              x: direction > 0 ? 50 : -50,
              rotateY: direction > 0 ? -6 : 6
            }}
            animate={{
              scale: 1,
              opacity: 1,
              x: 0,
              rotateY: 0,
              zIndex: 10
            }}
            exit={{
              scale: 0.94,
              opacity: 0,
              x: direction > 0 ? -50 : 50,
              rotateY: direction > 0 ? 6 : -6,
              zIndex: 2
            }}
            transition={{
              duration: 0.85,
              ease: [0.32, 0.72, 0, 1]
            }}
            onClick={() => setLightboxOpen(true)}
            style={{
              position: 'relative',
              width: 'min(350px, 84vw)',
              height: 'min(440px, 105vw)',
              borderRadius: 26,
              background: '#ffffff',
              boxShadow: '0 24px 50px rgba(245, 139, 170, 0.38), 0 8px 24px rgba(53, 38, 61, 0.15)',
              border: '6px solid #ffffff',
              cursor: 'zoom-in',
              overflow: 'hidden',
              boxSizing: 'border-box'
            }}
          >
            {/* Gentle inner bob animation for active item */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: '100%', height: '100%', position: 'relative' }}
            >
              {renderMedia(current, true)}

              {/* Sparkle icon at bottom right of active photo */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 12,
                  right: 12,
                  background: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(4px)',
                  borderRadius: '50%',
                  width: 30,
                  height: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                  pointerEvents: 'none'
                }}
              >
                <Sparkles size={16} color="#e8436c" />
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* NEXT ITEM (RIGHT) */}
        <motion.div
          onClick={goNext}
          onMouseEnter={() => setHoveredSide('right')}
          onMouseLeave={() => setHoveredSide(null)}
          animate={{
            x: '60%',
            scale: hoveredSide === 'right' ? 0.92 : 0.84,
            opacity: hoveredSide === 'right' ? 0.9 : 0.45,
            rotateY: hoveredSide === 'right' ? -14 : -24,
            zIndex: hoveredSide === 'right' ? 8 : 4
          }}
          transition={{ duration: 0.85, ease: [0.32, 0.72, 0, 1] }}
          style={{
            position: 'absolute',
            width: 'min(300px, 74vw)',
            height: 'min(390px, 94vw)',
            borderRadius: 24,
            background: '#ffffff',
            boxShadow: '0 14px 34px rgba(53, 38, 61, 0.16)',
            border: '5px solid #ffffff',
            cursor: 'pointer',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          {renderMedia(rightItem, false)}
        </motion.div>

        {/* Previous Arrow Button */}
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          style={{
            position: 'absolute',
            left: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 42,
            height: 42,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.94)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.14)',
            border: '1.5px solid rgba(245, 139, 170, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 15,
            color: '#e8436c',
            transition: 'transform 0.2s ease'
          }}
          aria-label="Previous Memory"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Next Arrow Button */}
        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          style={{
            position: 'absolute',
            right: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 42,
            height: 42,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.94)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.14)',
            border: '1.5px solid rgba(245, 139, 170, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 15,
            color: '#e8436c',
            transition: 'transform 0.2s ease'
          }}
          aria-label="Next Memory"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Counter, Dots & Play/Pause Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, margin: '1.4rem auto 1.4rem', zIndex: 10 }}>
        {/* Navigation Indicator Dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 300 }}>
          {memoriesData.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              style={{
                width: i === currentIndex ? 18 : 6,
                height: 6,
                borderRadius: 4,
                background: i === currentIndex ? '#e8436c' : 'rgba(245, 139, 170, 0.35)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0
              }}
              aria-label={`Go to memory ${i + 1}`}
            />
          ))}
        </div>

        {/* Counter & Toggle Auto */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button
            onClick={() => setIsPlaying((p) => !p)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              padding: '5px 14px',
              borderRadius: 20,
              background: 'rgba(255,255,255,0.9)',
              border: '1px solid rgba(245,139,170,0.3)',
              color: '#e8436c',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            <span>{isPlaying ? "Pause auto" : "Play auto"}</span>
          </button>

          <span style={{ fontSize: '0.85rem', color: '#9d7c95', fontWeight: 600 }}>
            {currentIndex + 1} / {total}
          </span>
        </div>
      </div>

      {/* Button to Cake Section */}
      <div style={{ textAlign: 'center', zIndex: 10 }}>
        <button
          onClick={handleProceed}
          className="btn-pink"
          style={{ minWidth: 220 }}
        >
          <Cake size={17} />
          <span>One last thing 🎂</span>
        </button>
      </div>

      {/* Full-screen Lightbox Modal (ZERO CAPTIONS) */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(20, 10, 28, 0.93)',
              backdropFilter: 'blur(10px)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setLightboxOpen(false)}
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                width: 42,
                height: 42,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.22)',
                color: '#fff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 110
              }}
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Lightbox Media Container */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: '92vw',
                maxHeight: '86vh',
                borderRadius: 22,
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
              }}
            >
              {current?.type === 'video' ? (
                <video
                  src={current.src}
                  controls
                  autoPlay
                  playsInline
                  style={{ maxWidth: '92vw', maxHeight: '84vh', borderRadius: 20, display: 'block' }}
                />
              ) : (
                <img
                  src={current?.src}
                  alt=""
                  style={{ maxWidth: '92vw', maxHeight: '84vh', objectFit: 'contain', borderRadius: 20, display: 'block' }}
                />
              )}
            </div>

            {/* Prev/Next in Lightbox */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              style={{
                position: 'absolute',
                left: 18,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 46,
                height: 46,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.22)',
                color: '#fff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              style={{
                position: 'absolute',
                right: 18,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 46,
                height: 46,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.22)',
                color: '#fff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <ChevronRight size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
