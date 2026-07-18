import React from 'react';
import { useShapesStore } from './shapesStore';
import { LeafSortGame } from './LeafSortGame';
import { useSpeechSynthesis } from '../alphabet/useSpeechSynthesis';
import { ShapesGameMode } from './types';

export const ShapesHub: React.FC = () => {
  const { activeGame, setActiveGame } = useShapesStore();
  const { speak } = useSpeechSynthesis();

  const handleGameSelect = (mode: ShapesGameMode, title: string) => {
    speak(title);
    setActiveGame(mode);
  };

  const renderGame = () => {
    switch (activeGame) {
      case 'menu':
        return (
          <div className="w-full max-w-4xl flex flex-col items-center select-none animate-fadeIn">
            <p className="mb-8 text-slate-500 font-bold text-lg text-center">
              Practice sorting colors, identifying shapes, matching puzzles, and mixing pigments!
            </p>

            <div className="w-full grid grid-cols-2 gap-6 sm:gap-8">
              {([
                {
                  id: 'leaf-sort',
                  title: 'Leaf Sort',
                  icon: '🍂',
                  gradient: 'from-amber-400 to-orange-500 shadow-orange-200 border-orange-300',
                  textColor: 'text-orange-950',
                },
                {
                  id: 'shape-web',
                  title: 'Shape Web',
                  icon: '🕸️',
                  gradient: 'from-cyan-400 to-sky-500 shadow-cyan-200 border-cyan-300',
                  textColor: 'text-cyan-950',
                },
                {
                  id: 'shape-puzzle',
                  title: 'Shape Puzzles',
                  icon: '🧩',
                  gradient: 'from-purple-400 to-indigo-500 shadow-indigo-200 border-indigo-300',
                  textColor: 'text-indigo-950',
                },
                {
                  id: 'mixing',
                  title: 'Color Mixing',
                  icon: '🧪',
                  gradient: 'from-pink-400 to-rose-500 shadow-pink-200 border-pink-300',
                  textColor: 'text-rose-950',
                },
              ] as const).map((game) => (
                <button
                  key={game.id}
                  onClick={() => handleGameSelect(game.id, game.title)}
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

      case 'leaf-sort':
        return (
          <div className="w-full flex flex-col items-center animate-fadeIn">
            <LeafSortGame />
            <button
              onClick={() => setActiveGame('menu')}
              className="mt-6 px-6 py-2 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-700 active:scale-95 transition-transform select-none"
            >
              ⬅️ Back to Menu
            </button>
          </div>
        );

      case 'shape-web':
        return (
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 shadow-xl border-4 border-slate-100 flex flex-col items-center animate-fadeIn select-none">
            <h2 className="text-2xl font-black text-slate-800 mb-6">Spider's Shape Web (Coming Soon)</h2>
            <p className="text-slate-600 mb-6">Help the friendly spider fill their web with shape blocks!</p>
            <button
              onClick={() => setActiveGame('menu')}
              className="px-6 py-2 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-700 active:scale-95 transition-transform"
            >
              ⬅️ Back to Menu
            </button>
          </div>
        );

      case 'shape-puzzle':
        return (
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 shadow-xl border-4 border-slate-100 flex flex-col items-center animate-fadeIn select-none">
            <h2 className="text-2xl font-black text-slate-800 mb-6">Shape Puzzles (Coming Soon)</h2>
            <p className="text-slate-600 mb-6">Build sailboats, houses, and fish using matching geometric shapes!</p>
            <button
              onClick={() => setActiveGame('menu')}
              className="px-6 py-2 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-700 active:scale-95 transition-transform"
            >
              ⬅️ Back to Menu
            </button>
          </div>
        );

      case 'mixing':
        return (
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 shadow-xl border-4 border-slate-100 flex flex-col items-center animate-fadeIn select-none">
            <h2 className="text-2xl font-black text-slate-800 mb-6">Color Mixing (Coming Soon)</h2>
            <p className="text-slate-600 mb-6">Mix secondary and primary colors together to find the results!</p>
            <button
              onClick={() => setActiveGame('menu')}
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

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center p-6"
      style={{
        background: 'linear-gradient(135deg, #fffbeb 0%, #fff1f2 100%)',
        fontFamily: "'Comic Neue', 'Outfit', sans-serif"
      }}
    >
      <header className="text-center mb-8 select-none">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-800 drop-shadow-md flex items-center justify-center gap-2">
          Shapes & Colors! 🎨
        </h1>
      </header>

      {renderGame()}
    </div>
  );
};
export default ShapesHub;
