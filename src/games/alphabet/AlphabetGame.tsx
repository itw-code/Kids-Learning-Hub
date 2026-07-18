import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAlphabetStore } from './alphabetStore';
import { useSpeechSynthesis } from './useSpeechSynthesis';
import { AlphabetDataSchema, ExtendedWindow } from './types';
import { useProfileStore } from '../../stores/profileStore';
import { useAudioManager } from '../../hooks/useAudioManager';
import { t } from '../../i18n/id';


// Baseline Alphabet Data
const ALPHABET_DATA = {
  'A': { letter: 'A', exampleWord: 'Apple', letterLower: 'a', letterUpper: 'A' },
  'B': { letter: 'B', exampleWord: 'Boy', letterLower: 'b', letterUpper: 'B' },
  'C': { letter: 'C', exampleWord: 'Cat', letterLower: 'c', letterUpper: 'C' },
  'D': { letter: 'D', exampleWord: 'Dog', letterLower: 'd', letterUpper: 'D' },
  'E': { letter: 'E', exampleWord: 'Egg', letterLower: 'e', letterUpper: 'E' },
  'F': { letter: 'F', exampleWord: 'Fish', letterLower: 'f', letterUpper: 'F' },
  'G': { letter: 'G', exampleWord: 'Goat', letterLower: 'g', letterUpper: 'G' },
  'H': { letter: 'H', exampleWord: 'Hat', letterLower: 'h', letterUpper: 'H' },
  'I': { letter: 'I', exampleWord: 'Igloo', letterLower: 'i', letterUpper: 'I' },
  'J': { letter: 'J', exampleWord: 'Jar', letterLower: 'j', letterUpper: 'J' },
  'K': { letter: 'K', exampleWord: 'Kite', letterLower: 'k', letterUpper: 'K' },
  'L': { letter: 'L', exampleWord: 'Lion', letterLower: 'l', letterUpper: 'L' },
  'M': { letter: 'M', exampleWord: 'Moon', letterLower: 'm', letterUpper: 'M' },
  'N': { letter: 'N', exampleWord: 'Nest', letterLower: 'n', letterUpper: 'N' },
  'O': { letter: 'O', exampleWord: 'Octopus', letterLower: 'o', letterUpper: 'O' },
  'P': { letter: 'P', exampleWord: 'Pig', letterLower: 'p', letterUpper: 'P' },
  'Q': { letter: 'Q', exampleWord: 'Queen', letterLower: 'q', letterUpper: 'Q' },
  'R': { letter: 'R', exampleWord: 'Ring', letterLower: 'r', letterUpper: 'R' },
  'S': { letter: 'S', exampleWord: 'Sun', letterLower: 's', letterUpper: 'S' },
  'T': { letter: 'T', exampleWord: 'Turtle', letterLower: 't', letterUpper: 'T' },
  'U': { letter: 'U', exampleWord: 'Umbrella', letterLower: 'u', letterUpper: 'U' },
  'V': { letter: 'V', exampleWord: 'Volcano', letterLower: 'v', letterUpper: 'V' },
  'W': { letter: 'W', exampleWord: 'Watch', letterLower: 'w', letterUpper: 'W' },
  'X': { letter: 'X', exampleWord: 'X-ray', letterLower: 'x', letterUpper: 'X' },
  'Y': { letter: 'Y', exampleWord: 'Yo-yo', letterLower: 'y', letterUpper: 'Y' },
  'Z': { letter: 'Z', exampleWord: 'Zebra', letterLower: 'z', letterUpper: 'Z' }
};

// Validate runtime structures with Zod
const parsedAlphabetData = AlphabetDataSchema.parse(ALPHABET_DATA);
const ALPHABET_KEYS = Object.keys(parsedAlphabetData);

const getRandomBrightColor = (): string => {
  const r = Math.floor(Math.random() * 150) + 100; // 100-250
  const g = Math.floor(Math.random() * 150) + 100; // 100-250
  const b = Math.floor(Math.random() * 150) + 100; // 100-250
  const toHex = (c: number) => `0${c.toString(16)}`.slice(-2);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const AlphabetGame: React.FC = () => {
  const {
    gameMode,
    caseMode,
    speechMode,
    gameState,
    startLevel1,
    startLevel2,
    toggleCaseMode,
    toggleSpeechMode,
    markLetterFound,
    pickNewTargetLetter
  } = useAlphabetStore();

  const { speak, unlockSpeech } = useSpeechSynthesis();
  const { awardSticker, addStars } = useProfileStore();
  const { playPop, playSuccess, playError, playTap } = useAudioManager();

  // Local component states
  const [bgColor, setBgColor] = useState<string>('#f4f4f4');
  const [visitedColors, setVisitedColors] = useState<Record<string, string>>({});
  const [shakingLetters, setShakingLetters] = useState<Record<string, boolean>>({});
  const [hasUnlocked, setHasUnlocked] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isMouseDownRef = useRef(false);
  const lastInteractedLetterRef = useRef<string | null>(null);

  // Initialize level 1 on mount
  useEffect(() => {
    startLevel1();
  }, [startLevel1]);


  // Native DOM Starburst effect
  const playDomStarEffect = useCallback((targetElement: HTMLElement) => {
    const numStars = 12;
    const container = document.body;
    const rect = targetElement.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    if (!document.getElementById('starburst-keyframes')) {
      const style = document.createElement('style');
      style.id = 'starburst-keyframes';
      style.innerHTML = `
        @keyframes starburst {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--dest-x)), calc(-50% + var(--dest-y))) scale(1.2);
            opacity: 0;
          }
        }
        .star-particle {
          position: fixed;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 10000;
        }
      `;
      document.head.appendChild(style);
    }

    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.classList.add('star-particle');
      star.style.backgroundColor = `hsl(${Math.random() * 360}, 95%, 70%)`;

      container.appendChild(star);

      star.style.left = `${startX}px`;
      star.style.top = `${startY}px`;

      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 90 + 60;
      const destX = Math.cos(angle) * distance;
      const destY = Math.sin(angle) * distance;

      star.style.setProperty('--dest-x', `${destX}px`);
      star.style.setProperty('--dest-y', `${destY}px`);
      star.style.animation = 'starburst 0.8s ease-out forwards';

      setTimeout(() => {
        star.remove();
      }, 800);
    }
  }, []);

  // Shared Interaction Handler
  const handleLetterInteraction = useCallback(
    (letter: string, targetEl?: HTMLElement) => {
      // Level 1: Exploring
      if (gameMode === 'level1') {
        if (lastInteractedLetterRef.current === letter) return;
        lastInteractedLetterRef.current = letter;

        let activeColor = visitedColors[letter];
        if (!activeColor) {
          activeColor = getRandomBrightColor();
          setVisitedColors((prev) => ({ ...prev, [letter]: activeColor }));
        }

        const item = parsedAlphabetData[letter];
        if (item) {
          const letterToSpeak = caseMode === 'upper' ? item.letterUpper : item.letterLower;
          if (speechMode === 'letterAndWord') {
            speak(letterToSpeak, () => {
              speak(item.exampleWord);
            });
          } else {
            speak(letterToSpeak);
          }
        }
      }

      // Level 2: Quiz / Sticker Book
      if (gameMode === 'level2') {
        if (gameState.status !== 'quiz') return;
        const { targetLetter } = gameState;

        // Skip if already found
        if (visitedColors[letter]) return;

        if (letter === targetLetter) {
          if (targetEl) {
            playDomStarEffect(targetEl);
          }
          playPop();

          // Give immediate visual styling
          const assignedColor = getRandomBrightColor();
          setVisitedColors((prev) => ({ ...prev, [letter]: assignedColor }));

          const isComplete = markLetterFound(letter);

          if (isComplete) {
            // Award sticker and star progress
            awardSticker('alphabet-master');
            addStars(10);
            playSuccess();

            const win = window as unknown as ExtendedWindow;
            if (win.playConfettiEffect) {
              win.playConfettiEffect();
            }

            speak('Hebat! Kamu menemukan semua huruf!', () => {
              setTimeout(() => {
                setVisitedColors({});
                startLevel2(ALPHABET_KEYS);
              }, 2500);
            });
          } else {
            speak(`Kamu menemukan ${letter}!`, () => {
              pickNewTargetLetter();
            });
          }
        } else {
          // Wrong selection
          playError();
          setShakingLetters((prev) => ({ ...prev, [letter]: true }));
          setTimeout(() => {
            setShakingLetters((prev) => {
              const updated = { ...prev };
              delete updated[letter];
              return updated;
            });
          }, 500);
        }
      }
    },
    [
      gameMode,
      visitedColors,
      caseMode,
      speechMode,
      gameState,
      speak,
      playPop,
      playSuccess,
      playError,
      playDomStarEffect,
      markLetterFound,
      pickNewTargetLetter,
      startLevel2,
      awardSticker,
      addStars
    ]
  );

  // Global mouseup registration to reset drag state
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      isMouseDownRef.current = false;
      lastInteractedLetterRef.current = null;
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  // Web Speech API unlock listener
  const handleInteractionUnlock = useCallback(() => {
    if (!hasUnlocked) {
      unlockSpeech(); // Run asynchronously, do not block main thread
      setHasUnlocked(true);
    }
  }, [hasUnlocked, unlockSpeech]);

  // Touch event handlers for absolute drag capture
  const handleTouchStart = (e: React.TouchEvent) => {
    handleInteractionUnlock();
    isMouseDownRef.current = false;
    lastInteractedLetterRef.current = null;
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement | null;
    const target = e.target as HTMLElement;
    const activeEl = element || target;
    const letter = activeEl?.getAttribute('data-letter') || activeEl?.closest('[data-letter]')?.getAttribute('data-letter');
    if (letter) {
      const targetEl = (activeEl.closest('[data-letter]') as HTMLElement) || activeEl;
      handleLetterInteraction(letter, targetEl);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (gameMode !== 'level1') return;
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement | null;
    const target = e.target as HTMLElement;
    const activeEl = element || target;
    const letter = activeEl?.getAttribute('data-letter') || activeEl?.closest('[data-letter]')?.getAttribute('data-letter');
    if (letter) {
      const targetEl = (activeEl.closest('[data-letter]') as HTMLElement) || activeEl;
      handleLetterInteraction(letter, targetEl);
    }
  };

  const handleTouchEnd = () => {
    lastInteractedLetterRef.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent, letter: string) => {
    handleInteractionUnlock();
    isMouseDownRef.current = true;
    handleLetterInteraction(letter, e.currentTarget as HTMLElement);
  };

  const handleMouseEnter = (e: React.MouseEvent, letter: string) => {
    if (gameMode === 'level1' && isMouseDownRef.current) {
      handleLetterInteraction(letter, e.currentTarget as HTMLElement);
    }
  };

  // Level controllers
  const triggerLevel1 = () => {
    handleInteractionUnlock();
    setVisitedColors({});
    startLevel1();
  };

  const triggerLevel2 = () => {
    handleInteractionUnlock();
    setVisitedColors({});
    startLevel2(ALPHABET_KEYS);
    setTimeout(() => {
      speak('Find the letter');
    }, 100);
  };

  return (
    <div
      className="min-h-screen p-6 flex flex-col items-center justify-between transition-colors duration-500 font-sans select-none"
      style={{
        backgroundColor: bgColor,
        fontFamily: "'Comic Neue', 'Outfit', sans-serif",
        touchAction: 'none'
      }}
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>

      {/* Top Banner Navigation & Theme Selection */}
      <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 drop-shadow-sm flex items-center gap-2">
          {t('alphabet', 'title')}
        </h1>

        {/* Color Palette Choice */}
        <div className="flex items-center gap-2 bg-white/80 p-2 rounded-full shadow-inner border border-slate-200">
          {[
            { hex: '#f4f4f4', label: 'Default' },
            { hex: '#E3F2FD', label: 'Blue' },
            { hex: '#FFF9C4', label: 'Yellow' },
            { hex: '#E8F5E9', label: 'Green' },
            { hex: '#FCE4EC', label: 'Pink' }
          ].map((color) => (
            <button
              key={color.hex}
              onClick={() => setBgColor(color.hex)}
              className="w-8 h-8 rounded-full border border-slate-300 shadow-sm transition-transform hover:scale-110 active:scale-95"
              style={{ backgroundColor: color.hex }}
              title={color.label}
            />
          ))}
        </div>
      </div>

      {/* Prompts for Children */}
      <div className="w-full max-w-4xl text-center my-2">
        {gameMode === 'level1' ? (
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-700">
            {t('alphabet', 'subtitle')}
          </h2>
        ) : (
          <div className="bg-white/95 rounded-2xl py-4 px-8 shadow-md border-2 border-slate-200 inline-block animate-bounce">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
              {gameState.status === 'quiz' ? (
                <span>
                  {t('alphabet', 'findLetter')}{' '}
                  <span className="text-sky-500 text-3xl sm:text-4xl">
                    {caseMode === 'upper'
                      ? gameState.targetLetter
                      : gameState.targetLetter.toLowerCase()}
                  </span>
                </span>
              ) : (
                t('alphabet', 'success')
              )}
            </h2>
          </div>
        )}
      </div>

      {/* Main Alphabet Grid */}
      <div
        className="w-full max-w-4xl grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 gap-3 sm:gap-4 my-6 grow justify-center content-center"
        style={{ touchAction: 'none' }}
      >
        {ALPHABET_KEYS.map((letterKey) => {
          const item = parsedAlphabetData[letterKey];
          const isVisited = !!visitedColors[letterKey];
          const isShaking = !!shakingLetters[letterKey];
          const displayChar = caseMode === 'upper' ? item.letterUpper : item.letterLower;
          const assignedColor = visitedColors[letterKey] || 'transparent';

          return (
            <div
              key={letterKey}
              data-letter={letterKey}
              onMouseDown={(e) => handleMouseDown(e, letterKey)}
              onMouseEnter={(e) => handleMouseEnter(e, letterKey)}
              className={`
                aspect-square flex items-center justify-center rounded-2xl text-3xl sm:text-4xl lg:text-5xl font-bold border-4 select-none cursor-pointer transition-all duration-200 active:scale-95 shadow-sm
                ${isVisited 
                  ? 'text-white border-transparent' 
                  : 'bg-white text-slate-700 hover:text-slate-900 border-slate-200 hover:border-slate-300'
                }
                ${isShaking ? 'animate-shake border-red-400 bg-red-50 text-red-500' : ''}
              `}
              style={{
                backgroundColor: isVisited ? assignedColor : undefined,
                borderColor: isVisited ? assignedColor : undefined,
                transform: isVisited ? 'scale(1.04)' : undefined,
                touchAction: 'none',
                userSelect: 'none'
              }}
            >
              {displayChar}
            </div>
          );
        })}
      </div>

      {/* Bottom Controls / Configuration Dashboard */}
      <div className="w-full max-w-4xl bg-white/90 p-4 rounded-3xl shadow-md border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Toggle Game Options */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              lastInteractedLetterRef.current = null;
              toggleSpeechMode();
            }}
            className="px-5 py-2.5 bg-slate-800 text-white font-semibold rounded-2xl hover:bg-slate-700 transition-colors shadow-sm active:scale-95 text-sm sm:text-base"
          >
            {speechMode === 'letter' ? t('alphabet', 'switchWords') : t('alphabet', 'switchLetters')}
          </button>
          <button
            onClick={() => {
              lastInteractedLetterRef.current = null;
              toggleCaseMode();
            }}
            className="px-5 py-2.5 bg-slate-800 text-white font-semibold rounded-2xl hover:bg-slate-700 transition-colors shadow-sm active:scale-95 text-sm sm:text-base"
          >
            {caseMode === 'upper' ? t('alphabet', 'switchLowercase') : t('alphabet', 'switchUppercase')}
          </button>
        </div>

        {/* Level Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={triggerLevel1}
            className={`
              px-6 py-2.5 font-bold rounded-2xl shadow-sm transition-all active:scale-95 text-sm sm:text-base border-2
              ${gameMode === 'level1'
                ? 'bg-amber-400 border-amber-500 text-amber-950 font-black scale-105'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }
            `}
          >
            Level 1: Jelajah
          </button>
          <button
            onClick={triggerLevel2}
            className={`
              px-6 py-2.5 font-bold rounded-2xl shadow-sm transition-all active:scale-95 text-sm sm:text-base border-2
              ${gameMode === 'level2'
                ? 'bg-amber-400 border-amber-500 text-amber-950 font-black scale-105'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }
            `}
          >
            Level 2: Kuis
          </button>
        </div>
      </div>
    </div>
  );
};
