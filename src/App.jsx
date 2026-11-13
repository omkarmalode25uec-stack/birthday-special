import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Envelope from './components/Envelope';
import BirthdayLetter from './components/BirthdayLetter';
import MemoryGallery from './components/MemoryGallery';
import CakeSection from './components/CakeSection';
import WishSection from './components/WishSection';
import LightingSection from './components/LightingSection';
import GiftSelection from './components/GiftSelection';
import FinalSection from './components/FinalSection';
import MusicPlayer from './components/MusicPlayer';
import BlossomEffect, { triggerBlossomBurst } from './components/BlossomEffect';

// Styles
import './styles/global.css';
import './styles/animations.css';
import './styles/blossom.css';

const SECTIONS = [
  { id: 'envelope', label: 'Surprise' },
  { id: 'letter', label: 'Letter' },
  { id: 'memories', label: 'Memories' },
  { id: 'cake', label: 'Cake' },
  { id: 'wish', label: 'Wish' },
  { id: 'lighting', label: 'Magic Room' },
  { id: 'gifts', label: 'Mystery Gift' },
  { id: 'final', label: 'Celebration' }
];

export default function App() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const goToSection = (index) => {
    if (index === currentSectionIndex || transitioning) return;
    setTransitioning(true);
    triggerBlossomBurst(window.innerWidth / 2, window.innerHeight / 2, 25);

    setTimeout(() => {
      setCurrentSectionIndex(index);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTransitioning(false);
    }, 400);
  };

  const handleNext = () => {
    if (currentSectionIndex < SECTIONS.length - 1) {
      goToSection(currentSectionIndex + 1);
    }
  };

  const handleOpenEnvelope = () => {
    setHasInteracted(true);
    handleNext();
  };

  const handleReplay = () => {
    goToSection(0);
  };

  const currentSection = SECTIONS[currentSectionIndex].id;

  return (
    <div className="app-container">
      {/* Global Falling Blossom Petals System */}
      <BlossomEffect />

      {/* Persistent Floating Music Player */}
      <MusicPlayer autoPlayTrigger={hasInteracted} />

      {/* Floral Section Transition Glow Overlay */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            className="floral-transition-curtain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-4xl animate-spin-slow">🌸</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Section Content with Animated Switch */}
      <main className="w-full min-h-screen flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {currentSection === 'envelope' && (
            <motion.div
              key="envelope"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Envelope onOpen={handleOpenEnvelope} />
            </motion.div>
          )}

          {currentSection === 'letter' && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <BirthdayLetter onNext={handleNext} />
            </motion.div>
          )}

          {currentSection === 'memories' && (
            <motion.div
              key="memories"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <MemoryGallery onNext={handleNext} />
            </motion.div>
          )}

          {currentSection === 'cake' && (
            <motion.div
              key="cake"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <CakeSection onNext={handleNext} />
            </motion.div>
          )}

          {currentSection === 'wish' && (
            <motion.div
              key="wish"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <WishSection onNext={handleNext} />
            </motion.div>
          )}

          {currentSection === 'lighting' && (
            <motion.div
              key="lighting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <LightingSection onNext={handleNext} />
            </motion.div>
          )}

          {currentSection === 'gifts' && (
            <motion.div
              key="gifts"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <GiftSelection onNext={handleNext} />
            </motion.div>
          )}

          {currentSection === 'final' && (
            <motion.div
              key="final"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <FinalSection onReplay={handleReplay} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Story Progress Navigation Dots */}
      {currentSectionIndex > 0 && (
        <nav className="story-nav" aria-label="Story sections navigation">
          {SECTIONS.map((sec, idx) => (
            <button
              key={sec.id}
              onClick={() => goToSection(idx)}
              className={`story-dot ${idx === currentSectionIndex ? 'active' : ''}`}
              title={sec.label}
              aria-label={`Go to ${sec.label}`}
            />
          ))}
        </nav>
      )}
    </div>
  );
}
