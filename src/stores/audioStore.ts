import { create } from 'zustand';

export type SFX = 'tap' | 'success' | 'error' | 'pop' | 'sticker';

interface AudioStoreState {
  bgmMuted: boolean;
  sfxMuted: boolean;
  bgmVolume: number;
  sfxVolume: number;
  currentSongIndex: number;
  isAudioUnlocked: boolean;

  // Actions
  toggleBgm: () => void;
  toggleSfx: () => void;
  setBgmVolume: (vol: number) => void;
  setSfxVolume: (vol: number) => void;
  setSongIndex: (idx: number) => void;
  unlockAudio: () => Promise<boolean>;
  playBgm: () => void;
  pauseBgm: () => void;
}

const SONG_LIST = [
  '/apps/music/song1.mp3',
  '/apps/music/song2.mp3',
  '/apps/music/song3.mp3'
];

let bgmAudio: HTMLAudioElement | null = null;
let audioCtx: AudioContext | null = null;

// Initialize Audio Context safely
const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
};

// Initialize Background Music element
const getBgmAudio = (store: AudioStoreState): HTMLAudioElement | null => {
  if (typeof window === 'undefined') return null;
  if (!bgmAudio) {
    bgmAudio = new Audio();
    bgmAudio.volume = store.bgmMuted ? 0 : store.bgmVolume;
    bgmAudio.src = SONG_LIST[store.currentSongIndex];
    
    // Automatically load next song when ended
    bgmAudio.addEventListener('ended', () => {
      const storeState = useAudioStore.getState();
      const nextIdx = (storeState.currentSongIndex + 1) % SONG_LIST.length;
      storeState.setSongIndex(nextIdx);
    });
  }
  return bgmAudio;
};

export const useAudioStore = create<AudioStoreState>((set, get) => {
  // Load persisted states from localStorage
  const savedBgmMuted = localStorage.getItem('klh_bgm_muted') === 'true';
  const savedSfxMuted = localStorage.getItem('klh_sfx_muted') === 'true';
  const savedBgmVolume = parseFloat(localStorage.getItem('klh_bgm_volume') || '0.35');
  const savedSfxVolume = parseFloat(localStorage.getItem('klh_sfx_volume') || '0.5');
  const savedSongIndex = parseInt(localStorage.getItem('klh_song_index') || '0');

  return {
    bgmMuted: savedBgmMuted,
    sfxMuted: savedSfxMuted,
    bgmVolume: savedBgmVolume,
    sfxVolume: savedSfxVolume,
    currentSongIndex: savedSongIndex >= SONG_LIST.length ? 0 : savedSongIndex,
    isAudioUnlocked: false,

    toggleBgm: () => {
      const nextMuted = !get().bgmMuted;
      localStorage.setItem('klh_bgm_muted', String(nextMuted));
      set({ bgmMuted: nextMuted });

      const bgm = getBgmAudio(get());
      if (bgm) {
        bgm.volume = nextMuted ? 0 : get().bgmVolume;
        if (!nextMuted && get().isAudioUnlocked) {
          bgm.play().catch((e) => console.warn('BGM play failed after unmute:', e));
        } else if (nextMuted) {
          bgm.pause();
        }
      }
    },

    toggleSfx: () => {
      const nextMuted = !get().sfxMuted;
      localStorage.setItem('klh_sfx_muted', String(nextMuted));
      set({ sfxMuted: nextMuted });
    },

    setBgmVolume: (vol) => {
      localStorage.setItem('klh_bgm_volume', String(vol));
      set({ bgmVolume: vol });
      const bgm = getBgmAudio(get());
      if (bgm && !get().bgmMuted) {
        bgm.volume = vol;
      }
    },

    setSfxVolume: (vol) => {
      localStorage.setItem('klh_sfx_volume', String(vol));
      set({ sfxVolume: vol });
    },

    setSongIndex: (idx) => {
      localStorage.setItem('klh_song_index', String(idx));
      set({ currentSongIndex: idx });
      const bgm = getBgmAudio(get());
      if (bgm) {
        bgm.src = SONG_LIST[idx];
        if (!get().bgmMuted && get().isAudioUnlocked) {
          bgm.play().catch((e) => console.warn('BGM track skip play failed:', e));
        }
      }
    },

    unlockAudio: async () => {
      if (get().isAudioUnlocked) return true;

      // 1. Resume Web Audio Context
      const ctx = getAudioContext();
      if (ctx && ctx.state === 'suspended') {
        try {
          await ctx.resume();
        } catch (e) {
          console.warn('Failed to resume AudioContext:', e);
        }
      }

      // 2. Play a blank buffer to unlock iOS Audio pipeline
      if (ctx) {
        try {
          const buffer = ctx.createBuffer(1, 1, ctx.sampleRate);
          const src = ctx.createBufferSource();
          src.buffer = buffer;
          src.connect(ctx.destination);
          src.start(0);
        } catch (e) {
          console.warn('Failed to play blank buffer:', e);
        }
      }

      set({ isAudioUnlocked: true });

      // 3. Trigger BGM autoplay if unmuted
      const bgm = getBgmAudio(get());
      if (bgm && !get().bgmMuted) {
        bgm.play().catch((e) => console.warn('Autoplay BGM failed after unlock:', e));
      }

      return true;
    },

    playBgm: () => {
      const bgm = getBgmAudio(get());
      if (bgm && !get().bgmMuted && get().isAudioUnlocked) {
        bgm.play().catch((e) => console.warn('BGM play failed:', e));
      }
    },

    pauseBgm: () => {
      const bgm = getBgmAudio(get());
      if (bgm) {
        bgm.pause();
      }
    }
  };
});

if (typeof window !== 'undefined') {
  window.addEventListener('klh-audio-unlocked', () => {
    useAudioStore.setState({ isAudioUnlocked: true });
    const state = useAudioStore.getState();
    const bgm = getBgmAudio(state);
    if (bgm && !state.bgmMuted) {
      bgm.play().catch((e) => console.warn('Autoplay BGM from window event failed:', e));
    }
  });
}

export type { AudioStoreState };
