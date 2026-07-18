export type NumbersState = 
  | { mode: 'menu' } 
  | { mode: 'counting'; target: number } 
  | { mode: 'tracing'; activeNumber: number } 
  | { mode: 'patterns'; sequence: number[] } 
  | { mode: 'egg-math'; level: 1 | 2 };

// Interfaces for Counting game
export interface CountingGameState {
  target: number;
  currentCount: number;
  itemEmoji: string;
  totalItems: number;
}

// Interfaces for Patterns game
export interface PatternsGameState {
  sequence: number[];
  answer: number;
  choices: number[];
}

// Interfaces for Egg-Math game (addition/subtraction)
export interface EggMathGameState {
  num1: number;
  num2: number;
  answer: number;
  operation: 'add' | 'sub';
  color1: string;
  color2: string;
  choices: number[];
}
