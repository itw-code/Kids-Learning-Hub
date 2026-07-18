import { create } from 'zustand';
import { idDict } from '../../i18n/id';

export interface WordData {
  id: string;
  word: string;
  displayWord: string;
  image: string;
}

interface SpellingStoreState {
  level: 1 | 2;
  currentWordIndex: number;
  score: number;
  placedLetters: Record<number, string>; // maps slot index to placed letter
  shuffledChoices: { id: string; char: string; originalIndex: number }[]; // unique ID for dragging
  isCurrentWordFinished: boolean;

  // Actions
  setLevel: (level: 1 | 2) => void;
  loadWord: () => void;
  placeLetter: (slotIndex: number, char: string, choiceId: string) => boolean; // returns true if correct
  nextWord: () => void;
  resetGame: () => void;
}

const wordsList: WordData[] = idDict.spelling.words;

function getDistractors(count: number, excludeString: string): string[] {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const distractors: string[] = [];
  while (distractors.length < count) {
    const letter = alphabet[Math.floor(Math.random() * alphabet.length)];
    if (!excludeString.toUpperCase().includes(letter) && !distractors.includes(letter)) {
      distractors.push(letter);
    }
  }
  return distractors;
}

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const useSpellingStore = create<SpellingStoreState>((set, get) => ({
  level: 1,
  currentWordIndex: 0,
  score: 0,
  placedLetters: {},
  shuffledChoices: [],
  isCurrentWordFinished: false,

  setLevel: (level) => {
    set({ level });
    get().loadWord();
  },

  loadWord: () => {
    const { currentWordIndex, level } = get();
    const currentWordData = wordsList[currentWordIndex];
    if (!currentWordData) return;

    const chars = currentWordData.word.toUpperCase().split('');
    
    // Generate choice tiles
    let tiles = chars.map((char, index) => ({
      id: `${char}-${index}-${Math.random().toString(36).substr(2, 4)}`,
      char,
      originalIndex: index
    }));

    // If level 2, add 3 distractor letters
    if (level === 2) {
      const distractors = getDistractors(3, currentWordData.word);
      const distractorTiles = distractors.map((char, index) => ({
        id: `distractor-${char}-${index}-${Math.random().toString(36).substr(2, 4)}`,
        char,
        originalIndex: -1
      }));
      tiles = tiles.concat(distractorTiles);
    }

    set({
      placedLetters: {},
      shuffledChoices: shuffleArray(tiles),
      isCurrentWordFinished: false
    });
  },

  placeLetter: (slotIndex, char, choiceId) => {
    const { currentWordIndex, placedLetters, shuffledChoices } = get();
    const currentWordData = wordsList[currentWordIndex];
    if (!currentWordData) return false;

    const expectedChar = currentWordData.word[slotIndex].toUpperCase();
    if (char.toUpperCase() === expectedChar) {
      const newPlaced = { ...placedLetters, [slotIndex]: char.toUpperCase() };
      const newChoices = shuffledChoices.filter((tile) => tile.id !== choiceId);
      
      const isFinished = Object.keys(newPlaced).length === currentWordData.word.length;

      set({
        placedLetters: newPlaced,
        shuffledChoices: newChoices,
        isCurrentWordFinished: isFinished,
        score: isFinished ? get().score + 1 : get().score
      });
      return true;
    }
    return false;
  },

  nextWord: () => {
    const { currentWordIndex } = get();
    const nextIndex = (currentWordIndex + 1) % wordsList.length;
    set({ currentWordIndex: nextIndex });
    get().loadWord();
  },

  resetGame: () => {
    set({
      currentWordIndex: 0,
      score: 0,
      placedLetters: {},
      shuffledChoices: [],
      isCurrentWordFinished: false
    });
    get().loadWord();
  }
}));
