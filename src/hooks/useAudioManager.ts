import { useCallback, useEffect } from 'react';
import { useAudioStore, SFX } from '../stores/audioStore';
import { useSpeechSynthesis } from '../games/alphabet/useSpeechSynthesis';

export const useAudioManager = () => {
  const {
    bgmMuted,
    sfxMuted,
    bgmVolume,
    sfxVolume,
    currentSongIndex,
    isAudioUnlocked,
    toggleBgm,
    toggleSfx,
    setBgmVolume,
    setSfxVolume,
    setSongIndex,
    unlockAudio,
    playBgm,
    pauseBgm
  } = useAudioStore();

  const { speak } = useSpeechSynthesis();

  // One-time automatic screen click/tap listener to trigger unlockAudio
  useEffect(() => {
    if (typeof window === 'undefined' || isAudioUnlocked) return;

    const performUnlock = async () => {
      await unlockAudio();
      cleanup();
    };

    const cleanup = () => {
      document.removeEventListener('click', performUnlock);
      document.removeEventListener('touchstart', performUnlock);
    };

    document.addEventListener('click', performUnlock);
    document.addEventListener('touchstart', performUnlock);

    return cleanup;
  }, [isAudioUnlocked, unlockAudio]);

  // Synthesize game sound effects using browser Web Audio API
  const playSfx = useCallback((type: SFX) => {
    if (sfxMuted) return;

    const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    try {
      // Lazy load dynamic sound context
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(sfxVolume, now);

      switch (type) {
        case 'tap': {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(800, now);
          osc.frequency.exponentialRampToValueAtTime(1400, now + 0.05);

          gainNode.gain.setValueAtTime(sfxVolume * 0.4, now);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

          osc.connect(gainNode);
          gainNode.connect(ctx.destination);
          
          osc.start();
          osc.stop(now + 0.06);
          break;
        }

        case 'pop': {
          const osc = ctx.createOscillator();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(250, now);
          osc.frequency.exponentialRampToValueAtTime(650, now + 0.08);

          gainNode.gain.setValueAtTime(sfxVolume * 0.5, now);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

          osc.connect(gainNode);
          gainNode.connect(ctx.destination);
          
          osc.start();
          osc.stop(now + 0.1);
          break;
        }

        case 'success': {
          // Play a cheerful major triad arpeggio (C5 -> E5 -> G5 -> C6)
          const freqs = [523.25, 659.25, 783.99, 1046.50];
          freqs.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const noteGain = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + idx * 0.07);

            noteGain.gain.setValueAtTime(sfxVolume * 0.3, now + idx * 0.07);
            noteGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.12);

            osc.connect(noteGain);
            noteGain.connect(ctx.destination);

            osc.start(now + idx * 0.07);
            osc.stop(now + idx * 0.07 + 0.12);
          });

          // Play localized Indonesian success praise word
          const successPhrases = ['Hebat!', 'Pintar!'];
          const randomPhrase = successPhrases[Math.floor(Math.random() * successPhrases.length)];
          setTimeout(() => {
            speak(randomPhrase);
          }, 350);
          break;
        }

        case 'error': {
          // Slide down pitch buzz
          const osc = ctx.createOscillator();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(160, now);
          osc.frequency.linearRampToValueAtTime(70, now + 0.25);

          gainNode.gain.setValueAtTime(sfxVolume * 0.35, now);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

          osc.connect(gainNode);
          gainNode.connect(ctx.destination);
          
          osc.start();
          osc.stop(now + 0.25);
          break;
        }

        case 'sticker': {
          // Sparkly arpeggio chime (D5 -> F5 -> A5 -> D6 -> F6)
          const freqs = [587.33, 698.46, 880.00, 1174.66, 1396.91];
          freqs.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const noteGain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.04);

            noteGain.gain.setValueAtTime(sfxVolume * 0.25, now + idx * 0.04);
            noteGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.2);

            osc.connect(noteGain);
            noteGain.connect(ctx.destination);

            osc.start(now + idx * 0.04);
            osc.stop(now + idx * 0.04 + 0.2);
          });
          break;
        }
      }
    } catch (e) {
      console.warn('Audio Context synthesize failed:', e);
    }
  }, [sfxMuted, sfxVolume, speak]);

  const playTap = useCallback(() => playSfx('tap'), [playSfx]);
  const playPop = useCallback(() => playSfx('pop'), [playSfx]);
  const playSuccess = useCallback(() => playSfx('success'), [playSfx]);
  const playError = useCallback(() => playSfx('error'), [playSfx]);
  const playSticker = useCallback(() => playSfx('sticker'), [playSfx]);

  return {
    bgmMuted,
    sfxMuted,
    bgmVolume,
    sfxVolume,
    currentSongIndex,
    isAudioUnlocked,
    toggleBgm,
    toggleSfx,
    setBgmVolume,
    setSfxVolume,
    setSongIndex,
    unlockAudio,
    playBgm,
    pauseBgm,
    playTap,
    playPop,
    playSuccess,
    playError,
    playSticker
  };
};
export default useAudioManager;
