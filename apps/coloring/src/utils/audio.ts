import { useRef, useEffect } from 'react';

export const playColorSound = (): void => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.12);
    
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch (e) {
    console.warn(e);
  }
};

export function useBrushAudio() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const initAudio = () => {
    if (audioCtxRef.current) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtxRef.current = (window as any).__audioContext || new AudioContextClass();
    }
  };

  const startScribble = () => {
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      stopScribble();

      // Create 1-second loop buffer of waxy textured brown-ish noise
      const bufferSize = ctx.sampleRate;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Low-pass filtering to brown noise
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5; // Amplify for texture
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      // Bandpass filter to make it sound like scratching textured paper
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);
      filter.Q.setValueAtTime(1.8, ctx.currentTime);

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.0, ctx.currentTime);
      // Fast fade in to prevent popping
      gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.05);

      source.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      source.start();

      sourceNodeRef.current = source;
      gainNodeRef.current = gainNode;
    } catch (e) {
      console.warn('[useBrushAudio] startScribble failed:', e);
    }
  };

  const stopScribble = () => {
    try {
      const source = sourceNodeRef.current;
      const gainNode = gainNodeRef.current;
      const ctx = audioCtxRef.current;

      if (source && gainNode && ctx) {
        // Smooth fade out
        gainNode.gain.cancelScheduledValues(ctx.currentTime);
        gainNode.gain.setValueAtTime(gainNode.gain.value, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 0.05);
        
        setTimeout(() => {
          try {
            source.stop();
            source.disconnect();
            gainNode.disconnect();
          } catch (err) {}
        }, 60);
      }
    } catch (e) {
      console.warn('[useBrushAudio] stopScribble failed:', e);
    }
    sourceNodeRef.current = null;
    gainNodeRef.current = null;
  };

  useEffect(() => {
    return () => {
      stopScribble();
    };
  }, []);

  return { startScribble, stopScribble };
}
