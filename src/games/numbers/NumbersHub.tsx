import React from 'react';
import { useNumbersStore } from './numbersStore';
import { NumberTracing } from './NumberTracing';
import { useSpeechSynthesis } from '../alphabet/useSpeechSynthesis';

export const NumbersHub: React.FC = () => {
  const { activeState, level, setLevel, setMode } = useNumbersStore();
  const { speak } = useSpeechSynthesis();

  const handleLevelToggle = () => {
    const nextLevel = level === 1 ? 2 : 1;
    setLevel(nextLevel);
    speak(nextLevel === 1 ? 'Level One' : 'Level Two');
  };

  const renderGame = () => {
    switch (activeState.mode) {
      case 'menu':
        return (
          <div className="w-full max-w-4xl flex flex-col items-center select-none animate-fadeIn">
            {/* Level Toggle Button */}
            <div className="mb-8">
              <button
                onClick={handleLevelToggle}
                className={`
                  px-8 py-3 rounded-2xl text-xl font-bold shadow-md transition-all active:scale-95 border-2
                  ${level === 1
                    ? 'bg-emerald-400 border-emerald-500 text-emerald-950 hover:bg-emerald-300'
                    : 'bg-indigo-600 border-indigo-700 text-white hover:bg-indigo-500'
                  }
                `}
              >
                {level === 1 ? 'Level 1: Easy' : 'Level 2: Challenge'}
              </button>
            </div>

            {/* Grid of Mini-Games */}
            <div className="w-full grid grid-cols-2 gap-6 sm:gap-8">
              {([
                {
                  id: 'counting',
                  title: 'Counting',
                  icon: '🦆',
                  gradient: 'from-sky-400 to-blue-500 shadow-blue-200 border-blue-300',
                  textColor: 'text-blue-950',
                },
                {
                  id: 'tracing',
                  title: 'Tracing',
                  icon: '✍️',
                  gradient: 'from-amber-400 to-orange-500 shadow-amber-200 border-amber-300',
                  textColor: 'text-orange-950',
                },
                {
                  id: 'patterns',
                  title: 'Patterns',
                  icon: '🧩',
                  gradient: 'from-purple-400 to-fuchsia-500 shadow-purple-200 border-purple-300',
                  textColor: 'text-purple-950',
                },
                {
                  id: 'egg-math',
                  title: 'Egg-Math',
                  icon: '🥚',
                  gradient: 'from-pink-400 to-rose-500 shadow-pink-200 border-pink-300',
                  textColor: 'text-rose-950',
                },
              ] as const).map((game) => (
                <button
                  key={game.id}
                  onClick={() => {
                    speak(game.title);
                    setMode(game.id);
                  }}
                  className={`
                    p-6 aspect-square rounded-3xl bg-gradient-to-br ${game.gradient} border-4
                    flex flex-col items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 bouncy-hover active:scale-98
                  `}
                >
                  <span className="text-7xl sm:text-8xl mb-4 filter drop-shadow-md select-none">
                    {game.icon}
                  </span>
                  <span className={`text-2xl sm:text-3xl font-black ${game.textColor}`}>
                    {game.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );

      case 'counting':
        return (
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 shadow-xl border-4 border-slate-100 flex flex-col items-center animate-fadeIn select-none">
            <h2 className="text-2xl font-black text-slate-800 mb-6">Counting Game (Coming Soon)</h2>
            <p className="text-slate-600 mb-6">Learn to count friendly emojis!</p>
            <button
              onClick={() => setMode('menu')}
              className="px-6 py-2 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-700 active:scale-95 transition-transform"
            >
              ⬅️ Back to Menu
            </button>
          </div>
        );

      case 'tracing':
        return (
          <div className="w-full flex flex-col items-center animate-fadeIn">
            <NumberTracing />
            <button
              onClick={() => setMode('menu')}
              className="mt-6 px-6 py-2 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-700 active:scale-95 transition-transform select-none"
            >
              ⬅️ Back to Menu
            </button>
          </div>
        );

      case 'patterns':
        return (
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 shadow-xl border-4 border-slate-100 flex flex-col items-center animate-fadeIn select-none">
            <h2 className="text-2xl font-black text-slate-800 mb-6">Patterns Game (Coming Soon)</h2>
            <p className="text-slate-600 mb-6">Find what comes next in sequence!</p>
            <button
              onClick={() => setMode('menu')}
              className="px-6 py-2 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-700 active:scale-95 transition-transform"
            >
              ⬅️ Back to Menu
            </button>
          </div>
        );

      case 'egg-math':
        return (
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 shadow-xl border-4 border-slate-100 flex flex-col items-center animate-fadeIn select-none">
            <h2 className="text-2xl font-black text-slate-800 mb-6">Egg-Math Game (Coming Soon)</h2>
            <p className="text-slate-600 mb-6">Addition and subtraction with colorful egg nests!</p>
            <button
              onClick={() => setMode('menu')}
              className="px-6 py-2 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-700 active:scale-95 transition-transform"
            >
              ⬅️ Back to Menu
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const currentBgColor = level === 1 ? 'linear-gradient(135deg, #e0f2fe 0%, #ffe6f3 100%)' : 'linear-gradient(135deg, #eef2f3 0%, #e0e7ff 100%)';

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 transition-all duration-500"
      style={{
        background: currentBgColor,
        fontFamily: "'Comic Neue', 'Outfit', sans-serif",
      }}
    >
      <header className="text-center mb-8 select-none">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-800 drop-shadow-md flex items-center justify-center gap-2">
          Numbers Fun! 🔢
        </h1>
        {activeState.mode === 'menu' && (
          <p className="mt-2 text-slate-500 font-bold">
            Select a game to practice counting, tracing, patterns, or math!
          </p>
        )}
      </header>
      
      {renderGame()}
    </div>
  );
};
export default NumbersHub;
