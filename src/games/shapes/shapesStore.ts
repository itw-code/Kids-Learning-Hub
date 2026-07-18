import { create } from 'zustand';
import { ShapesGameMode } from './types';

interface ShapesStoreState {
  activeGame: ShapesGameMode;
  score: number;
  isCompleted: boolean;

  // Actions
  setActiveGame: (game: ShapesGameMode) => void;
  incrementScore: () => void;
  setCompleted: (completed: boolean) => void;
  resetGame: () => void;
}

export const useShapesStore = create<ShapesStoreState>((set) => ({
  activeGame: 'menu',
  score: 0,
  isCompleted: false,

  setActiveGame: (game) => set({ activeGame: game, score: 0, isCompleted: false }),
  incrementScore: () => set((state) => ({ score: state.score + 1 })),
  setCompleted: (completed) => set({ isCompleted: completed }),
  resetGame: () => set({ activeGame: 'menu', score: 0, isCompleted: false })
}));
export type { ShapesStoreState };
