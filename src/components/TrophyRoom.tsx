import React from 'react';
import { useProfileStore } from '../stores/profileStore';
import { useAudioManager } from '../hooks/useAudioManager';

interface StickerItem {
  id: string;
  name: string;
  icon: string;
  color: string;
  desc: string;
  hint: string;
}

const ALL_STICKERS: StickerItem[] = [
  {
    id: 'alphabet-master',
    name: 'Bintang Abjad',
    icon: '⭐',
    color: '#FFD700',
    desc: 'Hebat! Kamu sudah menghafal semua huruf abjad!',
    hint: 'Bisa didapatkan dengan menyelesaikan kuis Belajar Abjad.'
  },
  {
    id: 'number_ninja',
    name: 'Ninja Angka',
    icon: '🥷',
    color: '#333333',
    desc: 'Keren! Menghitung angka dengan sangat cepat!',
    hint: 'Bisa didapatkan dengan menyelesaikan game Belajar Angka.'
  },
  {
    id: 'shape_shifter',
    name: 'Bentuk Ajaib',
    icon: '🔷',
    color: '#2196F3',
    desc: 'Luar biasa! Menyelesaikan teka-teki bentuk!',
    hint: 'Bisa didapatkan dengan menyelesaikan game Bentuk & Warna.'
  },
  {
    id: 'color_captain',
    name: 'Kapten Warna',
    icon: '🎨',
    color: '#FF5722',
    desc: 'Hebat! Menyortir warna daun dengan tepat!',
    hint: 'Bisa didapatkan dengan memilah daun di game Bentuk & Warna.'
  },
  {
    id: 'spelling_bee',
    name: 'Lebah Pintar',
    icon: '🐝',
    color: '#FFC107',
    desc: 'Luar biasa! Mengeja semua kata dengan benar!',
    hint: 'Bisa didapatkan dengan menyelesaikan game Mengeja Kata.'
  },
  {
    id: 'book_worm',
    name: 'Kutu Buku',
    icon: '📚',
    color: '#4CAF50',
    desc: 'Pintar! Membaca kalimat dengan baik!',
    hint: 'Bisa didapatkan dengan menyelesaikan kuis membaca.'
  },
  {
    id: 'clicker_owl',
    name: 'Burung Rahasia',
    icon: '🦉',
    color: '#9C27B0',
    desc: 'Rahasia! Menemukan tombol tersembunyi!',
    hint: 'Misteri! Ketuk logo utama di Hub sebanyak 10 kali.'
  },
  {
    id: 'night_owl',
    name: 'Penjelajah Malam',
    icon: '🌙',
    color: '#3F51B5',
    desc: 'Bermain setelah waktu istirahat malam!',
    hint: 'Bisa didapatkan dengan belajar setelah jam 7 malam.'
  }
];

export const TrophyRoom: React.FC = () => {
  const { stickers, totalStars } = useProfileStore();
  const { playSticker, playTap } = useAudioManager();

  const handleStickerClick = (sticker: StickerItem, isUnlocked: boolean) => {
    if (isUnlocked) {
      playSticker();
      // Speak the description
      const win = window as Window & { speakText?: (text: string, onEnd?: () => void) => void };
      if (typeof window !== 'undefined' && win.speakText) {
        win.speakText(sticker.name + ". " + sticker.desc);
      }
    } else {
      playTap();
      const win = window as Window & { speakText?: (text: string, onEnd?: () => void) => void };
      if (typeof window !== 'undefined' && win.speakText) {
        win.speakText(sticker.hint);
      }
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center p-6 sm:p-12"
      style={{
        background: 'linear-gradient(135deg, #fff1f2 0%, #f0fdf4 100%)',
        fontFamily: "'Comic Neue', 'Outfit', sans-serif"
      }}
    >
      {/* Header Profile Dashboard */}
      <header className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-6 mb-10 select-none">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-800 drop-shadow-md flex items-center justify-center sm:justify-start gap-2">
            Buku Stikerku 📖
          </h1>
          <p className="mt-2 text-slate-500 font-bold text-lg">
            Kumpulkan stiker keren dari setiap permainan!
          </p>
        </div>

        {/* Stars Counter display */}
        <div className="flex items-center gap-3 bg-amber-100 border-4 border-amber-300 px-6 py-2 rounded-3xl shadow-md transform hover:scale-105 transition-transform duration-200">
          <span className="text-4xl filter drop-shadow-sm select-none">⭐</span>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-amber-950 leading-none">{totalStars}</span>
            <span className="text-xs font-bold text-amber-800 leading-none mt-1">Bintang</span>
          </div>
        </div>
      </header>

      {/* Main Sticker Grid */}
      <main className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8 bg-white/70 p-6 sm:p-10 rounded-3xl border-4 border-dashed border-slate-200 shadow-inner">
        {ALL_STICKERS.map((sticker) => {
          const isUnlocked = stickers.includes(sticker.id);

          return (
            <button
              key={sticker.id}
              onClick={() => handleStickerClick(sticker, isUnlocked)}
              className={`
                aspect-square flex flex-col items-center justify-center p-4 rounded-2xl border-4 shadow-sm transition-all duration-300 relative group active:scale-95
                ${isUnlocked
                  ? 'bg-white hover:shadow-lg hover:scale-105 hover:rotate-2 cursor-pointer'
                  : 'bg-slate-100/50 border-slate-200 cursor-help opacity-60'
                }
              `}
              style={{
                borderColor: isUnlocked ? sticker.color : '#e2e8f0',
              }}
            >
              {/* Lock overlay for locked stickers */}
              {!isUnlocked && (
                <div className="absolute top-2 right-2 bg-slate-300/80 w-6 h-6 rounded-full flex items-center justify-center">
                  <span className="text-xs text-slate-600">🔒</span>
                </div>
              )}

              {/* Icon */}
              <span
                className={`
                  text-6xl sm:text-7xl mb-3 drop-shadow-sm select-none transition-all duration-300
                  ${isUnlocked ? 'group-hover:scale-110' : 'grayscale filter'}
                `}
                role="img"
                aria-label={sticker.name}
              >
                {sticker.icon}
              </span>

              {/* Title */}
              <span
                className={`
                  text-lg font-black tracking-wide leading-tight text-center
                  ${isUnlocked ? 'text-slate-700' : 'text-slate-400'}
                `}
              >
                {sticker.name}
              </span>

              {/* Hover description popup hint for desktops */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-slate-800 text-white text-xs rounded-xl p-2.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md z-30 select-none">
                {isUnlocked ? sticker.desc : sticker.hint}
                <div className="w-2.5 h-2.5 bg-slate-800 absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1 rotate-45" />
              </div>
            </button>
          );
        })}
      </main>
    </div>
  );
};
export default TrophyRoom;
