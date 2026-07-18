import { z } from 'zod';

export type AlphabetState = 
  | { status: 'idle' }
  | { status: 'exploring', activeLetter: string }
  | { status: 'quiz', targetLetter: string, score: number };

// Zod Schema to validate the Alphabet Data Structure
export const AlphabetItemSchema = z.object({
  letter: z.string().length(1), // e.g. "A"
  exampleWord: z.string().min(1), // e.g. "Apple"
  letterLower: z.string().length(1), // e.g. "a"
  letterUpper: z.string().length(1), // e.g. "A"
});

export type AlphabetItem = z.infer<typeof AlphabetItemSchema>;

export const AlphabetDataSchema = z.record(z.string().length(1), AlphabetItemSchema);

export type AlphabetData = z.infer<typeof AlphabetDataSchema>;

// Global Window Interfaces
export interface ExtendedWindow extends Window {
  playConfettiEffect?: () => void;
  StickerManager?: {
    awardSticker: (stickerId: string) => boolean;
  };
}
