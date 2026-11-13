import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';

/**
 * Cute floating music-player pill matching pastel birthday theme.
 * Displays "A little birthday melody".
 * Supports both /music/birthday.mp3 and Web Audio API synthesized music-box.
 * Continues smoothly across all sections without restarting.
 */
export default function MusicPlayer({ autoPlayTrigger = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioSourceType, setAudioSourceType] = useState('mp3');

  const audioRef = useRef(null);
  const synthCtxRef = useRef(null);
  const synthTimerRef = useRef(null);
  const isPlayingRef = useRef(false);

  // Music box melody for Happy Birthday
  const melody = [
    { note: 261.63, dur: 0.35, pause: 0.1 }, // C4
    { note: 261.63, dur: 0.35, pause: 0.1 }, // C4
    { note: 293.66, dur: 0.6, pause: 0.1 },  // D4
    { note: 261.63, dur: 0.6, pause: 0.1 },  // C4
    { note: 349.23, dur: 0.6, pause: 0.1 },  // F4
    { note: 329.63, dur: 1.1, pause: 0.2 },  // E4

    { note: 261.63, dur: 0.35, pause: 0.1 }, // C4
    { note: 261.63, dur: 0.35, pause: 0.1 }, // C4
    { note: 293.66, dur: 0.6, pause: 0.1 },  // D4
    { note: 261.63, dur: 0.6, pause: 0.1 },  // C4
    { note: 392.00, dur: 0.6, pause: 0.1 },  // G4
    { note: 349.23, dur: 1.1, pause: 0.2 },  // F4

    { note: 261.63, dur: 0.35, pause: 0.1 }, // C4
    { note: 261.63, dur: 0.35, pause: 0.1 }, // C4
    { note: 523.25, dur: 0.6, pause: 0.1 },  // C5
    { note: 440.00, dur: 0.6, pause: 0.1 },  // A4
    { note: 349.23, dur: 0.6, pause: 0.1 },  // F4
    { note: 329.63, dur: 0.6, pause: 0.1 },  // E4
    { note: 293.66, dur: 0.8, pause: 0.2 },  // D4

    { note: 466.16, dur: 0.35, pause: 0.1 }, // Bb4
    { note: 466.16, dur: 0.35, pause: 0.1 }, // Bb4
    { note: 440.00, dur: 0.6, pause: 0.1 },  // A4
    { note: 349.23, dur: 0.6, pause: 0.1 },  // F4
    { note: 392.00, dur: 0.6, pause: 0.1 },  // G4
    { note: 349.23, dur: 1.4, pause: 0.8 }   // F4
  ];

  const playMusicBoxNote = (ctx, freq, duration) => {
    if (!ctx || isMuted) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const overtone = ctx.createOscillator();
      const overtoneGain = ctx.createGain();
      overtone.type = 'triangle';
      overtone.frequency.setValueAtTime(freq * 2, ctx.currentTime);

      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.16, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      overtoneGain.gain.setValueAtTime(0.001, now);
      overtoneGain.gain.exponentialRampToValueAtTime(0.05, now + 0.02);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      overtone.connect(overtoneGain);
      overtoneGain.connect(ctx.destination);

      osc.start(now);
      overtone.start(now);
      osc.stop(now + duration + 0.05);
      overtone.stop(now + duration + 0.05);
    } catch (_) {}
  };

  const startMusicBoxLoop = () => {
    if (!synthCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      synthCtxRef.current = new AudioCtx();
    }
    const ctx = synthCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    let noteIdx = 0;
    const playNext = () => {
      if (!isPlayingRef.current) return;
      const cur = melody[noteIdx];
      playMusicBoxNote(ctx, cur.note, cur.dur);
      noteIdx = (noteIdx + 1) % melody.length;
      synthTimerRef.current = setTimeout(playNext, (cur.dur + cur.pause) * 1000);
    };
    playNext();
  };

  const stopMusicBoxLoop = () => {
    if (synthTimerRef.current) {
      clearTimeout(synthTimerRef.current);
      synthTimerRef.current = null;
    }
  };

  const startAudio = async () => {
    isPlayingRef.current = true;
    setIsPlaying(true);

    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setAudioSourceType('mp3');
        return;
      } catch (_) {
        // Fall back to synth
      }
    }

    setAudioSourceType('synth');
    startMusicBoxLoop();
  };

  const pauseAudio = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (audioRef.current) {
      try { audioRef.current.pause(); } catch (_) {}
    }
    stopMusicBoxLoop();
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      startAudio();
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (audioRef.current) {
      audioRef.current.muted = nextMute;
    }
  };

  // Start on first user interaction
  useEffect(() => {
    if (autoPlayTrigger && !isPlaying) {
      startAudio();
    }
  }, [autoPlayTrigger]);

  useEffect(() => {
    return () => {
      stopMusicBoxLoop();
      if (synthCtxRef.current) {
        try { synthCtxRef.current.close(); } catch (_) {}
      }
    };
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/birthday.mp3"
        loop
        preload="auto"
        onError={() => {
          if (isPlayingRef.current) {
            setAudioSourceType('synth');
            startMusicBoxLoop();
          }
        }}
      />

      {/* Floating Pill Design */}
      <div
        style={{
          position: 'fixed',
          top: 14,
          right: 14,
          zIndex: 80,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(12px)',
          padding: '6px 12px 6px 8px',
          borderRadius: 9999,
          boxShadow: '0 4px 18px rgba(245, 139, 170, 0.28), 0 1px 4px rgba(0,0,0,0.04)',
          border: '1.5px solid rgba(245, 139, 170, 0.35)',
          userSelect: 'none'
        }}
      >
        {/* Play / Pause Circular Button */}
        <button
          onClick={togglePlay}
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f06292 0%, #e8436c 100%)',
            border: 'none',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(232, 67, 108, 0.35)',
            flexShrink: 0
          }}
          title={isPlaying ? "Pause Melody" : "Play Birthday Melody"}
          aria-label={isPlaying ? "Pause Melody" : "Play Birthday Melody"}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: 1 }} />}
        </button>

        {/* Animated Music Equalizer Bars */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2.5, height: 16 }}>
          <span
            style={{
              width: 2.5,
              height: isPlaying && !isMuted ? 14 : 4,
              backgroundColor: '#e8436c',
              borderRadius: 2,
              transition: 'height 0.25s ease'
            }}
          />
          <span
            style={{
              width: 2.5,
              height: isPlaying && !isMuted ? 18 : 6,
              backgroundColor: '#F58BAA',
              borderRadius: 2,
              transition: 'height 0.35s ease'
            }}
          />
          <span
            style={{
              width: 2.5,
              height: isPlaying && !isMuted ? 11 : 3,
              backgroundColor: '#f472b6',
              borderRadius: 2,
              transition: 'height 0.2s ease'
            }}
          />
        </div>

        {/* Song Title Text */}
        <div style={{ display: 'flex', flexDirection: 'column', paddingRight: 4 }}>
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '0.78rem',
              fontWeight: 600,
              color: '#35263D',
              lineHeight: 1.2,
              whiteSpace: 'nowrap'
            }}
          >
            A little birthday melody
          </span>
          <span style={{ fontSize: '0.65rem', color: '#e8436c', fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}>
            {isPlaying ? (isMuted ? "Muted 🔇" : "Playing 🎵") : "Tap to play 🎶"}
          </span>
        </div>

        {/* Mute/Unmute Toggle Button */}
        <button
          onClick={toggleMute}
          style={{
            background: 'none',
            border: 'none',
            color: '#b06180',
            cursor: 'pointer',
            padding: 2,
            display: 'flex',
            alignItems: 'center'
          }}
          title={isMuted ? "Unmute" : "Mute"}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </>
  );
}
