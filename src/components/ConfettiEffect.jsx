import confetti from 'canvas-confetti';

/**
 * Trigger pastel celebratory confetti with hearts and stars.
 */
export function fireConfetti(options = {}) {
  const count = options.count || 80;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#F58BAA', '#DCCBFA', '#FFE59A', '#FFD9C8', '#FFF6E9', '#FFFFFF'],
    shapes: ['circle', 'square'],
    scalar: 1.1,
    ticks: 200,
    gravity: 0.9,
    decay: 0.92,
    startVelocity: 30,
    ...options
  };

  confetti({
    ...defaults,
    particleCount: Math.floor(count * 0.7)
  });

  // Second delayed burst for organic explosion
  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.3),
      angle: 60,
      spread: 55,
      origin: { x: 0.1, y: 0.7 }
    });
    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.3),
      angle: 120,
      spread: 55,
      origin: { x: 0.9, y: 0.7 }
    });
  }, 200);
}

/**
 * Grand celebration confetti for winning gift or final birthday moment
 */
export function fireGrandCelebration() {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;
  const colors = ['#F58BAA', '#DCCBFA', '#FFE59A', '#FFD9C8', '#FFFFFF'];

  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  };
  frame();
}

export default function ConfettiEffect() {
  return null;
}
