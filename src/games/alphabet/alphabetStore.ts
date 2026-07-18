import { create } from 'zustand';
import { AlphabetState } from './types';

interface AlphabetStoreState {
  gameMode: 'level1' | 'level2';
  caseMode: 'upper' | 'lower';
  speechMode: 'letter' | 'letterAndWord';
  lettersToFind: string[];
  gameState: AlphabetState;

  // Actions
  startLevel1: () => void;
  startLevel2: (alphabet: string[]) => void;
  setExploringLetter: (letter: string) => void;
  pickNewTargetLetter: () => void;
  toggleCaseMode: () => void;
  toggleSpeechMode: () => void;
  markLetterFound: (letter: string) => boolean; // returns true if all letters have been found
  resetGame: () => void;
}

export const useAlphabetStore = create<AlphabetStoreState>((set, get) => ({
  gameMode: 'level1',
  caseMode: 'upper',
  speechMode: 'letter',
  lettersToFind: [],
  gameState: { status: 'idle' },

  startLevel1: () => {
    set({
      gameMode: 'level1',
      gameState: { status: 'exploring', activeLetter: '' },
    });
  },

  startLevel2: (alphabet: string[]) => {
    const letters = [...alphabet];
    const initialTarget = letters[Math.floor(Math.random() * letters.length)];
    set({
      gameMode: 'level2',
      lettersToFind: letters,
      gameState: { status: 'quiz', targetLetter: initialTarget, score: 0 },
    });
  },

  setExploringLetter: (letter: string) => {
    if (get().gameMode === 'level1') {
      set({
        gameState: { status: 'exploring', activeLetter: letter },
      });
    }
  },

  pickNewTargetLetter: () => {
    const { lettersToFind, gameState } = get();
    if (lettersToFind.length === 0) return;
    const nextTarget = lettersToFind[Math.floor(Math.random() * lettersToFind.length)];
    const currentScore = gameState.status === 'quiz' ? gameState.score : 0;

    set({
      gameState: { status: 'quiz', targetLetter: nextTarget, score: currentScore },
    });
  },

  toggleCaseMode: () => {
    set((state) => ({
      caseMode: state.caseMode === 'upper' ? 'lower' : 'upper',
    }));
  },

  toggleSpeechMode: () => {
    set((state) => ({
      speechMode: state.speechMode === 'letter' ? 'letterAndWord' : 'letter',
    }));
  },

  markLetterFound: (letter: string) => {
    const { lettersToFind, gameState } = get();
    const updatedLetters = lettersToFind.filter((l) => l !== letter);
    const currentScore = gameState.status === 'quiz' ? gameState.score : 0;

    set({
      lettersToFind: updatedLetters,
      gameState: {
        status: 'quiz',
        targetLetter: gameState.status === 'quiz' ? gameState.targetLetter : '',
        score: currentScore + 1,
      },
    });

    return updatedLetters.length === 0;
  },

  resetGame: () => {
    set({
      gameMode: 'level1',
      caseMode: 'upper',
      speechMode: 'letter',
      lettersToFind: [],
      gameState: { status: 'idle' },
    });
  },
}));
export type { AlphabetStoreState };
