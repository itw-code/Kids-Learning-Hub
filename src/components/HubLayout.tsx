import React from 'react';
import { Link } from 'react-router-dom';
import { useProfileStore } from '../stores/profileStore';
import { useAudioManager } from '../hooks/useAudioManager';
import { t } from '../i18n/id';

interface GameCard {
  title: string;
  icon: string;
  gradient: string;
  textColor: string;
  borderColors: string;
  path: string;
  isExternal: boolean;
}

export const HubLayout: React.FC = () => {
  const { totalStars } = useProfileStore();
  const { playTap } = useAudioManager();

  // Localized games configuration from id.ts
  const games: GameCard[] = [
    {
      title: t('hub', 'apps').alphabet,
      icon: '🔤',
      gradient: 'from-blue-400 to-indigo-500 shadow-blue-200',
      textColor: 'text-blue-950',
      borderColors: 'border-blue-300',
      path: '/alphabet',
      isExternal: false,
    },
    {
      title: t('hub', 'apps').numbers,
      icon: '🔢',
      gradient: 'from-emerald-400 to-teal-500 shadow-emerald-200',
      textColor: 'text-emerald-950',
      borderColors: 'border-emerald-300',
      path: '/numbers',
      isExternal: false,
    },
    {
      title: t('hub', 'apps').spelling,
      icon: '✏️',
      gradient: 'from-amber-300 to-orange-400 shadow-amber-200',
      textColor: 'text-amber-950',
      borderColors: 'border-amber-300',
      path: '/spelling',
      isExternal: false,
    },
    {
      title: t('hub', 'apps').shapes,
      icon: '📐',
      gradient: 'from-purple-400 to-fuchsia-500 shadow-purple-200',
      textColor: 'text-purple-950',
      borderColors: 'border-purple-300',
      path: '/shapes',
      isExternal: false,
    },
    {
      title: t('hub', 'apps').coloring,
      icon: '🎨',
      gradient: 'from-pink-400 to-rose-500 shadow-pink-200',
      textColor: 'text-rose-950',
      borderColors: 'border-pink-300',
      path: '/apps/coloring/',
      isExternal: true,
    },
    {
      title: t('hub', 'apps').video,
      icon: '📺',
      gradient: 'from-cyan-400 to-sky-500 shadow-cyan-200',
      textColor: 'text-cyan-950',
      borderColors: 'border-cyan-300',
      path: '/apps/Helper-Scripts/Video-Helper.html',
      isExternal: true,
    },
  ];

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center p-6 sm:p-12 relative"
      style={{
        background: 'linear-gradient(135deg, #eef2f3 0%, #ffeef8 100%)',
        fontFamily: "'Comic Neue', 'Outfit', sans-serif",
      }}
    >
      {/* Decorative floating background elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce select-none pointer-events-none">🎈</div>
      <div className="absolute bottom-10 right-10 text-6xl opacity-20 animate-bounce delay-1000 select-none pointer-events-none">🧸</div>
      <div className="absolute top-20 right-20 text-6xl opacity-15 animate-pulse select-none pointer-events-none">🌟</div>
      <div className="absolute bottom-20 left-20 text-6xl opacity-15 animate-pulse delay-500 select-none pointer-events-none">🎨</div>

      {/* Top Profile Header with Stars Counter & Sticker Book Button */}
      <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 select-none z-20">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-800 drop-shadow-md flex items-center justify-center sm:justify-start gap-2">
            {t('hub', 'title')}
          </h1>
          <p className="mt-2 text-slate-500 font-bold text-base sm:text-lg">
            {t('hub', 'subtitle')}
          </p>
        </div>

        {/* Global Progress Indicators */}
        <div className="flex items-center gap-3">
          {/* Sticker Book Button */}
          <Link
            to="/trophy"
            onClick={playTap}
            className="flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-bold px-5 py-2.5 rounded-2xl shadow-md border-2 border-white hover:scale-105 active:scale-95 transition-transform"
          >
            <span className="text-xl">📖</span>
            <span>Stiker</span>
          </Link>

          {/* Stars Counter */}
          <div className="flex items-center gap-2 bg-amber-100 border-2 border-amber-300 px-5 py-2 rounded-2xl shadow-md">
            <span className="text-2xl filter drop-shadow-sm">⭐</span>
            <span className="text-xl font-black text-amber-950">{totalStars}</span>
          </div>
        </div>
      </div>

      {/* App Grid */}
      <main className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 z-10">
        {games.map((game) => {
          const CardContent = (
            <div className={`
              w-full h-full flex flex-col items-center justify-center p-6 rounded-3xl border-4 bg-gradient-to-br ${game.gradient} ${game.borderColors}
              shadow-lg hover:shadow-2xl transition-all duration-300 text-center text-white cursor-pointer relative overflow-hidden group
            `}>
              {/* Highlight flash effect */}
              <div className="absolute inset-0 w-full h-full bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              
              <span 
                className="text-7xl sm:text-8xl mb-4 select-none drop-shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                role="img"
                aria-label={game.title}
              >
                {game.icon}
              </span>
              <span className={`text-2xl sm:text-3xl font-black tracking-wide drop-shadow-sm ${game.textColor}`}>
                {game.title}
              </span>
            </div>
          );

          return (
            <div key={game.title} className="aspect-square bouncy-hover">
              {game.isExternal ? (
                <a href={game.path} onClick={playTap} className="w-full h-full block">
                  {CardContent}
                </a>
              ) : (
                <Link to={game.path} onClick={playTap} className="w-full h-full block">
                  {CardContent}
                </Link>
              )}
            </div>
          );
        })}
      </main>
    </div>
  );
};
export default HubLayout;
