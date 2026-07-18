import React, { useState, useRef, useEffect } from 'react';
import { useSpellingStore, WordData } from './spellingStore';
import { useSpeechSynthesis } from '../alphabet/useSpeechSynthesis';
import { useAudioManager } from '../../hooks/useAudioManager';
import { useProfileStore } from '../../stores/profileStore';
import { idDict } from '../../i18n/id';

export const SpellingGame: React.FC = () => {
  const {
    level,
    currentWordIndex,
    score,
    placedLetters,
    shuffledChoices,
    isCurrentWordFinished,
    setLevel,
    loadWord,
    placeLetter,
    nextWord,
    resetGame,
  } = useSpellingStore();

  const { speak, unlockSpeech } = useSpeechSynthesis();
  const { playPop, playSuccess, playError, playTap } = useAudioManager();
  const { awardSticker, addStars } = useProfileStore();

  const [activeDrag, setActiveDrag] = useState<{
    id: string;
    char: string;
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
  } | null>(null);

  const dragRef = useRef<HTMLDivElement | null>(null);
  const wordsList: WordData[] = idDict.spelling.words;
  const currentWord = wordsList[currentWordIndex];

  // Initialize word tiles on mount
  useEffect(() => {
    loadWord();
  }, [loadWord]);

  // Handle Confetti / Reward on completion
  useEffect(() => {
    if (isCurrentWordFinished) {
      playSuccess();
      addStars(5);
      // Award spelling sticker
      awardSticker('spelling-master');

      // Speak Indonesian praise
      const praises = ['Hebat!', 'Pintar!', 'Luar biasa!'];
      const randomPraise = praises[Math.floor(Math.random() * praises.length)];
      setTimeout(() => {
        speak(`${randomPraise} Ejaanmu benar!`);
      }, 600);
    }
  }, [isCurrentWordFinished, playSuccess, addStars, awardSticker, speak]);

  // Read full word slowly as a Hint
  const playHint = () => {
    if (!currentWord) return;
    playTap();
    unlockSpeech();

    // Speak full word, then spell it phonetically
    const lettersSpelled = currentWord.word.split('').join('-');
    speak(`${currentWord.displayWord} ... ${lettersSpelled}`);
  };

  // Play letter phonetics sound
  const playLetterPhonics = (char: string) => {
    unlockSpeech();
    const hint = idDict.spelling.phoneticMap[char.toUpperCase()] || char.toLowerCase();
    speak(hint);
  };

  // Pointer/Touch Drag handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, id: string, char: string) => {
    e.preventDefault();
    playPop();
    unlockSpeech();
    
    // Set active drag state
    setActiveDrag({
      id,
      char,
      startX: e.clientX,
      startY: e.clientY,
      currentX: e.clientX,
      currentY: e.clientY,
    });

    // Capture pointer events
    const target = e.currentTarget;
    target.setPointerCapture(e.pointerId);

    // Speak letter when picked up
    playLetterPhonics(char);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!activeDrag) return;
    
    setActiveDrag((prev) =>
      prev
        ? {
            ...prev,
            currentX: e.clientX,
            currentY: e.clientY,
          }
        : null
    );
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>, id: string, char: string) => {
    if (!activeDrag) return;
    e.currentTarget.releasePointerCapture(e.pointerId);

    // Check intersection with blanks
    let snapped = false;
    const targetSlots = document.querySelectorAll('[data-slot-index]');
    
    for (let i = 0; i < targetSlots.length; i++) {
      const slotEl = targetSlots[i] as HTMLElement;
      const slotIndex = parseInt(slotEl.getAttribute('data-slot-index') || '0', 10);
      
      // Calculate distances between center of dragged pointer and target slot bounding box
      const slotRect = slotEl.getBoundingClientRect();
      const slotCenterX = slotRect.left + slotRect.width / 2;
      const slotCenterY = slotRect.top + slotRect.height / 2;

      const deltaX = e.clientX - slotCenterX;
      const deltaY = e.clientY - slotCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Snap radius of 65px
      if (distance < 65) {
        // Attempt placing the letter
        const isCorrect = placeLetter(slotIndex, char, id);
        if (isCorrect) {
          playSuccess();
          snapped = true;
          break;
        }
      }
    }

    if (!snapped) {
      playError();
    }

    setActiveDrag(null);
  };

  if (!currentWord) return null;

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4 sm:p-6 flex flex-col items-center justify-between overflow-x-hidden touch-none select-none"
      style={{ touchAction: 'none' }}
    >
      {/* Top Banner / Scoreboard */}
      <div className="w-full max-w-4xl flex items-center justify-between bg-white/80 backdrop-blur-sm px-6 py-3.5 rounded-3xl border border-slate-200 shadow-sm">
        <h1 className="text-xl sm:text-3xl font-extrabold text-amber-950 flex items-center gap-2">
          ✏️ {idDict.spelling.title}
        </h1>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-amber-400 text-amber-950 font-bold rounded-2xl shadow-sm text-sm sm:text-base">
            🏆 {idDict.spelling.scoreLabel}: {score}
          </div>
          <div className="flex bg-slate-200/80 p-1 rounded-2xl border border-slate-300">
            <button
              onClick={() => { playTap(); setLevel(1); }}
              className={`px-4 py-1.5 font-bold text-xs sm:text-sm rounded-xl transition-all ${
                level === 1 ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-300/40'
              }`}
            >
              Mudah
            </button>
            <button
              onClick={() => { playTap(); setLevel(2); }}
              className={`px-4 py-1.5 font-bold text-xs sm:text-sm rounded-xl transition-all ${
                level === 2 ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-300/40'
              }`}
            >
              Tantangan
            </button>
          </div>
        </div>
      </div>

      {/* Main Board Container */}
      <div className="w-full max-w-3xl flex flex-col items-center justify-center grow my-4 gap-6">
        {/* Word Picture Display Card */}
        <div className="relative group bg-white p-5 rounded-[40px] border-4 border-amber-300 shadow-lg flex flex-col items-center justify-center max-w-sm w-full transition-transform duration-300 hover:scale-[1.02]">
          <img
            src={currentWord.image}
            alt={currentWord.displayWord}
            className="w-48 h-48 sm:w-60 sm:h-60 object-cover rounded-3xl border-2 border-slate-100"
          />
          <button
            onClick={playHint}
            className="mt-4 px-6 py-2 bg-amber-500 text-white font-extrabold rounded-2xl hover:bg-amber-600 active:scale-95 shadow-md flex items-center gap-2 text-sm sm:text-base transition-colors"
          >
            🔊 {idDict.spelling.hintLabel}
          </button>
        </div>

        {/* Word Blanks Slots */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 my-2">
          {currentWord.word.split('').map((char, index) => {
            const placed = placedLetters[index];
            return (
              <div
                key={index}
                data-slot-index={index}
                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-extrabold border-4 transition-all duration-200 ${
                  placed
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-400 scale-105 shadow-sm'
                    : 'bg-white text-slate-300 border-dashed border-amber-300'
                }`}
              >
                {placed ? placed : ''}
              </div>
            );
          })}
        </div>

        {/* Shuffled Choice Tiles */}
        <div className="w-full min-h-[80px] sm:min-h-[100px] flex flex-wrap items-center justify-center gap-3 sm:gap-4 p-4 bg-white/50 backdrop-blur-xs rounded-3xl border border-dashed border-amber-200">
          {shuffledChoices.map((tile) => {
            const isDragged = activeDrag?.id === tile.id;
            const style = isDragged
              ? {
                  position: 'fixed' as const,
                  left: `${activeDrag.currentX - 32}px`,
                  top: `${activeDrag.currentY - 32}px`,
                  zIndex: 9999,
                  pointerEvents: 'none' as const,
                }
              : {};

            return (
              <div
                key={tile.id}
                onPointerDown={(e) => handlePointerDown(e, tile.id, tile.char)}
                onPointerMove={handlePointerMove}
                onPointerUp={(e) => handlePointerUp(e, tile.id, tile.char)}
                style={style}
                className={`w-12 h-12 sm:w-16 sm:h-16 bg-amber-400 hover:bg-amber-300 hover:scale-105 active:scale-95 text-amber-950 font-extrabold text-xl sm:text-2xl rounded-2xl flex items-center justify-center border-b-4 border-amber-600 shadow-md cursor-grab active:cursor-grabbing select-none transition-colors duration-150 ${
                  isDragged ? 'opacity-85 shadow-2xl border-none' : ''
                }`}
              >
                {tile.char.toUpperCase()}
              </div>
            );
          })}
        </div>
      </div>

      {/* Completion Overlay Overlay / Next Action */}
      <div className="w-full max-w-4xl flex items-center justify-center min-h-[70px]">
        {isCurrentWordFinished && (
          <button
            onClick={() => { playTap(); nextWord(); }}
            className="px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-lg sm:text-xl rounded-2xl transition-transform active:scale-95 shadow-lg flex items-center gap-2 animate-bounce"
          >
            Lanjut ➔
          </button>
        )}
      </div>
    </div>
  );
};
export default SpellingGame;
