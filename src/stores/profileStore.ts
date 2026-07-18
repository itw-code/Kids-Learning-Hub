import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Profile {
  totalStars: number;
  stickers: string[];
  gamesCompleted: Record<string, boolean>;
}

interface ProfileStoreState extends Profile {
  addStars: (amount: number) => void;
  awardSticker: (stickerId: string) => boolean; // returns true if new sticker awarded
  markGameCompleted: (gameId: string) => void;
  resetProfile: () => void;
}

export const useProfileStore = create<ProfileStoreState>()(
  persist(
    (set, get) => ({
      totalStars: 0,
      stickers: [],
      gamesCompleted: {},

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

      resetProfile: () => set({ totalStars: 0, stickers: [], gamesCompleted: {} })
    }),
    {
      name: 'klh_profile_progress' // LocalStorage persistence key
    }
  )
);
export default useProfileStore;
