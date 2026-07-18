import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Profile {
  totalStars: number;
  stickers: string[];
  gamesCompleted: Record<string, boolean>;
  activeProfileId: string;
}

interface ProfileStoreState extends Profile {
  addStars: (amount: number) => void;
  awardSticker: (stickerId: string) => boolean; // returns true if new sticker awarded
  markGameCompleted: (gameId: string) => void;
  resetProfile: () => void;
  setActiveProfile: (profileId: string) => void;
}

export const useProfileStore = create<ProfileStoreState>()(
  persist(
    (set, get) => ({
      totalStars: 0,
      stickers: [],
      gamesCompleted: {},
      activeProfileId: 'default',

      addStars: (amount) => set((state) => ({ totalStars: state.totalStars + amount })),

      awardSticker: (stickerId) => {
        const { stickers } = get();
        if (stickers.includes(stickerId)) return false;
        set({ stickers: [...stickers, stickerId] });
        return true;
      },

      markGameCompleted: (gameId) => {
        set((state) => ({
          gamesCompleted: { ...state.gamesCompleted, [gameId]: true }
        }));
      },

      resetProfile: () => set({ totalStars: 0, stickers: [], gamesCompleted: {}, activeProfileId: 'default' }),

      setActiveProfile: (profileId) => set({ activeProfileId: profileId })
    }),
    {
      name: 'klh_profile_progress' // LocalStorage persistence key
    }
  )
);

// Unified synchronization listener for hybrid cross-framework architecture
if (typeof window !== 'undefined') {
  const syncStore = () => {
    try {
      useProfileStore.persist.rehydrate();
    } catch (e) {
      console.warn('[ProfileStore] Sync failed:', e);
    }
  };

  // Sync when changes happen in another window/iframe
  window.addEventListener('storage', (event) => {
    if (event.key === 'klh_profile_progress') {
      syncStore();
    }
  });

  // Sync when changes happen in the same window/document via StorageAPI custom event
  window.addEventListener('klh-profile-update', syncStore);
}

export default useProfileStore;
