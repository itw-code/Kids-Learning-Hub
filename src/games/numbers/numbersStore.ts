import { create } from 'zustand';
import { 
  NumbersState, 
  CountingGameState, 
  PatternsGameState, 
  EggMathGameState 
} from './types';

interface NumbersStore {
  activeState: NumbersState;
  level: 1 | 2;
  
  // Game states
  countingState: CountingGameState | null;
  tracingNumber: number;
  patternsState: PatternsGameState | null;
  eggMathState: EggMathGameState | null;

  // Actions
  setLevel: (level: 1 | 2) => void;
  setMode: (mode: NumbersState['mode']) => void;
  startCountingGame: () => void;
  incrementCount: () => boolean; // Returns true if target count is reached
  startTracingGame: (num?: number) => void;
  setTracingNumber: (num: number) => void;
  startPatternsGame: () => void;
  startEggMathGame: () => void;
  resetAll: () => void;
}

const EMOJI_ITEMS = ['🦆', '⭐', '🍎', '🚗', '🎈', '🐶', '🍕', '🐞', '🍪'];
const EGG_COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#F7D842', '#84DCC6', '#FFA07A'];

// Helper to generate choice options around an answer
const generateChoices = (answer: number): number[] => {
  const choices = new Set<number>([answer]);
  
  // Generate random choices near the answer
  while (choices.size < 3) {
    const offset = Math.floor(Math.random() * 5) - 2; // -2 to +2
    const choice = answer + offset;
    if (choice > 0 && choice !== answer) {
      choices.add(choice);
    }
  }
  
  // If we couldn't get 3 choices, add simple fallbacks
  if (choices.size < 3) {
    choices.add(answer + 1);
  }
  if (choices.size < 3) {
    choices.add(answer + 2);
  }
  
  return Array.from(choices).sort(() => Math.random() - 0.5);
};

export const useNumbersStore = create<NumbersStore>((set, get) => ({
  activeState: { mode: 'menu' },
  level: 1,
  countingState: null,
  tracingNumber: 1,
  patternsState: null,
  eggMathState: null,

  setLevel: (level) => {
    set({ level });
    // Reset the active game with new level constraints
    const currentMode = get().activeState.mode;
    if (currentMode === 'counting') get().startCountingGame();
    if (currentMode === 'tracing') {
      const num = level === 1 ? 1 : 10;
      get().startTracingGame(num);
    }
    if (currentMode === 'patterns') get().startPatternsGame();
    if (currentMode === 'egg-math') get().startEggMathGame();
  },

  setMode: (mode) => {
    const { level } = get();
    if (mode === 'menu') {
      set({ activeState: { mode: 'menu' } });
    } else if (mode === 'counting') {
      get().startCountingGame();
    } else if (mode === 'tracing') {
      const num = level === 1 ? 1 : 10;
      get().startTracingGame(num);
    } else if (mode === 'patterns') {
      get().startPatternsGame();
    } else if (mode === 'egg-math') {
      get().startEggMathGame();
    }
  },

  startCountingGame: () => {
    const { level } = get();
    const target = level === 1 
      ? Math.floor(Math.random() * 9) + 1  // 1-9
      : Math.floor(Math.random() * 6) + 10; // 10-15
      
    const itemEmoji = EMOJI_ITEMS[Math.floor(Math.random() * EMOJI_ITEMS.length)];
    const totalItems = level === 1 
      ? target + Math.floor(Math.random() * 3) 
      : target; // Exact fit for higher numbers

    set({
      activeState: { mode: 'counting', target },
      countingState: {
        target,
        currentCount: 0,
        itemEmoji,
        totalItems
      }
    });
  },

  incrementCount: () => {
    const { countingState } = get();
    if (!countingState) return false;

    const nextCount = countingState.currentCount + 1;
    const isFinished = nextCount === countingState.target;

    set({
      countingState: {
        ...countingState,
        currentCount: nextCount
      }
    });

    return isFinished;
  },

  startTracingGame: (num) => {
    const { level, tracingNumber } = get();
    let targetNum = num;
    if (targetNum === undefined) {
      targetNum = level === 1 ? 1 : 10;
    }
    
    set({
      activeState: { mode: 'tracing', activeNumber: targetNum },
      tracingNumber: targetNum
    });
  },

  setTracingNumber: (num) => {
    set({
      activeState: { mode: 'tracing', activeNumber: num },
      tracingNumber: num
    });
  },

  startPatternsGame: () => {
    const { level } = get();
    const patternType = Math.floor(Math.random() * 3);
    const maxStart = level === 1 ? 5 : 15;
    const start = Math.floor(Math.random() * maxStart) + 1;
    
    let sequence: number[] = [];
    let answer = 0;

    switch (patternType) {
      case 0: // Add 1
        sequence = [start, start + 1];
        answer = start + 2;
        break;
      case 1: // Add 2
        sequence = [start, start + 2];
        answer = start + 4;
        break;
      case 2: // Repeat (A A B B)
        sequence = [start, start, start + 1, start + 1];
        answer = start + 2;
        break;
    }

    const choices = generateChoices(answer);

    set({
      activeState: { mode: 'patterns', sequence },
      patternsState: {
        sequence,
        answer,
        choices
      }
    });
  },

  startEggMathGame: () => {
    const { level } = get();
    
    // Choose distinct egg colors
    const color1 = EGG_COLORS[Math.floor(Math.random() * EGG_COLORS.length)];
    let color2 = EGG_COLORS[Math.floor(Math.random() * EGG_COLORS.length)];
    while (color1 === color2) {
      color2 = EGG_COLORS[Math.floor(Math.random() * EGG_COLORS.length)];
    }

    let num1 = 0;
    let num2 = 0;
    let answer = 0;
    let operation: 'add' | 'sub' = 'add';

    if (level === 1) {
      // LEVEL 1: ADDITION
      operation = 'add';
      num1 = Math.floor(Math.random() * 4) + 1; // 1-4
      num2 = Math.floor(Math.random() * 4) + 1; // 1-4
      answer = num1 + num2;
      if (answer > 8) num2 = 1; // Cap sum at 8
      answer = num1 + num2;
    } else {
      // LEVEL 2: SUBTRACTION
      operation = 'sub';
      num1 = Math.floor(Math.random() * 5) + 3; // 3-7
      num2 = Math.floor(Math.random() * (num1 - 1)) + 1; // 1 to num1-1
      answer = num1 - num2;
    }

    const choices = generateChoices(answer);

    set({
      activeState: { mode: 'egg-math', level },
      eggMathState: {
        num1,
        num2,
        answer,
        operation,
        color1,
        color2,
        choices
      }
    });
  },

  resetAll: () => {
    set({
      activeState: { mode: 'menu' },
      level: 1,
      countingState: null,
      tracingNumber: 1,
      patternsState: null,
      eggMathState: null
    });
  }
}));
export type { NumbersStore };
