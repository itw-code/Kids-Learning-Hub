import { useCallback, useEffect, useRef } from 'react';

export const useSpeechSynthesis = () => {
  const preferredVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const voiceListRef = useRef<SpeechSynthesisVoice[]>([]);

  const loadVoices = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    const voices = window.speechSynthesis.getVoices();
    voiceListRef.current = voices;

    if (voices.length > 0) {
      let preferred: SpeechSynthesisVoice | null = null;

      // 1. Prioritize Indonesian voice candidates (Damayanti, Gadis, Larasati, Andika)
      const idVoices = ['Damayanti', 'Gadis', 'Larasati', 'Andika'];
      preferred = voices.find(v =>
        (v.lang === 'id-ID' || v.lang.startsWith('id')) &&
        idVoices.some(name => v.name.includes(name))
      ) || null;

      // 2. Fallback to any Indonesian language voice
      if (!preferred) {
        preferred = voices.find(v => v.lang === 'id-ID' || v.lang.startsWith('id')) || null;
      }

      // 3. Fallback to System saved voice preference
      if (!preferred) {
        const savedName = localStorage.getItem('klh_preferred_voice');
        if (savedName) {
          preferred = voices.find(v => v.name === savedName) || null;
        }
      }

      // 4. Ultimate Default fallback
      if (!preferred) {
        preferred = voices.find(v => v.default) || null;
      }

      preferredVoiceRef.current = preferred;
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, [loadVoices]);

  // Unlock audio context for Safari and iOS
  const unlockSpeech = useCallback(async () => {
    if (typeof window === 'undefined') return;

    try {
      const AudioCtx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const context = new AudioCtx();
        if (context.state === 'suspended') {
          context.resume().catch((err) => console.warn('AudioContext resume failed:', err));
        }
        const buffer = context.createBuffer(1, 1, context.sampleRate);
        const src = context.createBufferSource();
        src.buffer = buffer;
        src.connect(context.destination);
        src.start(0);
      }
    } catch (e) {
      console.warn('AudioContext unlock failed:', e);
    }

    if (window.speechSynthesis) {
      const utter = new SpeechSynthesisUtterance(' ');
      utter.volume = 0;
      window.speechSynthesis.speak(utter);
    }
  }, []);

  const speak = useCallback((text: string, onEnd?: () => void) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      if (onEnd) onEnd();
      return;
    }

    window.speechSynthesis.cancel();

    // Duck background music if playing
    const bgMusic = document.getElementById('bg-music') as HTMLAudioElement | null;
    if (bgMusic && !bgMusic.paused) {
      bgMusic.volume = 0.1;
    }

    // Windows Wake-Up Primer
    const isWindows = typeof navigator !== 'undefined' && navigator.platform.indexOf('Win') > -1;
    if (isWindows) {
      const primer = new SpeechSynthesisUtterance('_');
      primer.volume = 0.01;
      primer.rate = 10;
      window.speechSynthesis.speak(primer);
    }

    const utterance = new SpeechSynthesisUtterance(text);

    // iOS Pitch/Rate Adjustments
    const isIOS = typeof navigator !== 'undefined' && (
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    );

    if (isIOS) {
      utterance.rate = 1.05;
      utterance.pitch = 1.1;
    } else {
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
    }

    // Force Indonesian language config for phonics parsing
    utterance.lang = 'id-ID';
    if (preferredVoiceRef.current) {
      utterance.voice = preferredVoiceRef.current;
    }

    const handleRestoreMusic = () => {
      const music = document.getElementById('bg-music') as HTMLAudioElement | null;
      if (music && !music.paused) {
        music.volume = 0.5;
      }
      if (onEnd) {
        onEnd();
      }
    };

    utterance.onend = handleRestoreMusic;
    utterance.onerror = handleRestoreMusic;

    window.speechSynthesis.speak(utterance);
  }, []);

  return { speak, unlockSpeech };
};
export default useSpeechSynthesis;
