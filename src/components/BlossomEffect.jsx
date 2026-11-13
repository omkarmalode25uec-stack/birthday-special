import React, { useEffect, useRef } from 'react';

/**
 * High-performance falling cherry blossom system using HTML5 Canvas.
 * - Dynamic petal shapes and tiny 5-petal sakura flowers
 * - Realistic swaying and 3D rotation
 * - Auto scales down particle count on mobile screens
 * - Pauses rendering when tab is inactive to save battery
 * - Listens for 'trigger-blossom-burst' window events for interactive bursts!
 */
export default function BlossomEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isVisible = true;

    // Detect mobile for particle throttling
    const isMobile = window.innerWidth < 768;
    const maxPetals = isMobile ? 22 : 45;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Color palette for petals & flowers
    const petalColors = [
      'rgba(245, 139, 170, 0.75)', // pastel pink
      'rgba(255, 182, 193, 0.8)',  // light pink
      'rgba(255, 217, 200, 0.7)',  // peach
      'rgba(255, 255, 255, 0.85)', // sakura white
      'rgba(220, 203, 250, 0.65)'  // lavender
    ];

    class Petal {
      constructor(isBurst = false, originX, originY) {
        this.reset(isBurst, originX, originY);
      }

      reset(isBurst = false, originX, originY) {
        this.isFlower = Math.random() < 0.18; // 18% chance of full tiny flower
        this.size = Math.random() * (this.isFlower ? 8 : 7) + 6;
        this.color = petalColors[Math.floor(Math.random() * petalColors.length)];

        if (isBurst) {
          this.x = originX || width / 2;
          this.y = originY || height / 2;
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 8 + 3;
          this.vx = Math.cos(angle) * speed;
          this.vy = Math.sin(angle) * speed;
          this.gravity = 0.12;
          this.alpha = 1;
          this.decay = Math.random() * 0.015 + 0.008;
          this.isBurst = true;
        } else {
          this.x = Math.random() * width;
          this.y = Math.random() * -height * 0.5 - 20;
          this.vx = (Math.random() - 0.5) * 1.5;
          this.vy = Math.random() * 1.2 + 0.8; // gentle fall
          this.gravity = 0;
          this.alpha = Math.random() * 0.5 + 0.5;
          this.decay = 0;
          this.isBurst = false;
        }

        this.rotation = Math.random() * 360;
        this.rotSpeed = (Math.random() - 0.5) * 2;
        this.sway = Math.random() * 100;
        this.swaySpeed = Math.random() * 0.02 + 0.01;
      }

      update() {
        if (this.isBurst) {
          this.x += this.vx;
          this.y += this.vy;
          this.vy += this.gravity;
          this.vx *= 0.98;
          this.alpha -= this.decay;
          this.rotation += this.rotSpeed * 2;
          return this.alpha > 0;
        }

        this.sway += this.swaySpeed;
        this.x += Math.sin(this.sway) * 1.2 + this.vx;
        this.y += this.vy;
        this.rotation += this.rotSpeed;

        if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
          this.reset(false);
        }
        return true;
      }

      draw(c) {
        c.save();
        c.translate(this.x, this.y);
        c.rotate((this.rotation * Math.PI) / 180);
        c.globalAlpha = Math.max(0, this.alpha);

        if (this.isFlower) {
          // Draw tiny 5-petal blossom
          c.fillStyle = this.color;
          for (let i = 0; i < 5; i++) {
            c.save();
            c.rotate((i * 72 * Math.PI) / 180);
            c.beginPath();
            c.ellipse(0, -this.size * 0.7, this.size * 0.45, this.size * 0.7, 0, 0, Math.PI * 2);
            c.fill();
            c.restore();
          }
          // Center pistil
          c.beginPath();
          c.arc(0, 0, this.size * 0.25, 0, Math.PI * 2);
          c.fillStyle = '#FFE59A';
          c.fill();
        } else {
          // Draw single sakura petal
          c.fillStyle = this.color;
          c.beginPath();
          c.moveTo(0, -this.size);
          c.bezierCurveTo(
            this.size * 0.8, -this.size * 0.6,
            this.size * 0.8, this.size * 0.6,
            0, this.size
          );
          c.bezierCurveTo(
            -this.size * 0.8, this.size * 0.6,
            -this.size * 0.8, -this.size * 0.6,
            0, -this.size
          );
          c.fill();
          // Notch at petal tip
          c.beginPath();
          c.arc(0, -this.size + 1, this.size * 0.18, 0, Math.PI);
          c.fillStyle = 'rgba(255, 246, 233, 0.4)';
          c.fill();
        }

        c.restore();
      }
    }

    // Initialize regular falling petals
    const petals = Array.from({ length: maxPetals }, () => new Petal(false));
    let burstPetals = [];

    // Custom event listener for Blossom Bursts
    const handleBlossomBurst = (e) => {
      const { x, y, count = 28 } = e.detail || {};
      const originX = x ?? width / 2;
      const originY = y ?? height / 2;
      for (let i = 0; i < count; i++) {
        burstPetals.push(new Petal(true, originX, originY));
      }
    };
    window.addEventListener('trigger-blossom-burst', handleBlossomBurst);

    // Visibility change handler (tab switch)
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        lastTime = performance.now();
        render();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let lastTime = performance.now();

    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);

      // Render regular falling petals
      for (let i = 0; i < petals.length; i++) {
        petals[i].update();
        petals[i].draw(ctx);
      }

      // Render burst petals
      for (let i = burstPetals.length - 1; i >= 0; i--) {
        const alive = burstPetals[i].update();
        if (alive) {
          burstPetals[i].draw(ctx);
        } else {
          burstPetals.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('trigger-blossom-burst', handleBlossomBurst);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="blossom-overlay" aria-hidden="true" />;
}

/**
 * Helper to dispatch a blossom burst anywhere in the app
 */
export function triggerBlossomBurst(x, y, count = 35) {
  window.dispatchEvent(
    new CustomEvent('trigger-blossom-burst', {
      detail: { x, y, count }
    })
  );
}
