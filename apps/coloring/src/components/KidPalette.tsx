import React, { useState } from 'react';
import { playColorSound } from '../utils/audio';

interface KidPaletteProps {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  brushType: string;
  setBrushType: (type: string) => void;
  palettes: Record<string, { label: string; colors: string[] }>;
  gradientCssMap: Record<string, string>;
}

const COLOR_MIXES: Record<string, { result: string; label: string }> = {
  // Yellow + Blue -> Green
  '#ffff00+#0000ff': { result: '#00ff00', label: 'Hijau 🟢' },
  '#0000ff+#ffff00': { result: '#00ff00', label: 'Hijau 🟢' },
  // Red + Yellow -> Orange
  '#ff0000+#ffff00': { result: '#ffa500', label: 'Jingga 🟠' },
  '#ffff00+#ff0000': { result: '#ffa500', label: 'Jingga 🟠' },
  // Red + Blue -> Purple
  '#ff0000+#0000ff': { result: '#800080', label: 'Ungu 🟣' },
  '#0000ff+#ff0000': { result: '#800080', label: 'Ungu 🟣' },
  // White + Red -> Pink
  '#ffffff+#ff0000': { result: '#ffc0cb', label: 'Merah Muda 🌸' },
  '#ff0000+#ffffff': { result: '#ffc0cb', label: 'Merah Muda 🌸' },
  // Black + White -> Grey
  '#000000+#ffffff': { result: '#808080', label: 'Abu-abu 🪙' },
  '#ffffff+#000000': { result: '#808080', label: 'Abu-abu 🪙' },
};

export const KidPalette: React.FC<KidPaletteProps> = ({
  selectedColor,
  setSelectedColor,
  brushType,
  setBrushType,
  palettes,
  gradientCssMap,
}) => {
  const [activeTab, setActiveTab] = useState<string>('vivid');
  const [lastTappedColor, setLastTappedColor] = useState<string | null>(null);
  const [mixedColors, setMixedColors] = useState<string[]>([]);
  const [mixAnimation, setMixAnimation] = useState<string | null>(null);

  const handleColorTap = (color: string) => {
    setSelectedColor(color);
    playColorSound();

    // Color mixing logic
    if (lastTappedColor && lastTappedColor !== color) {
      const pairKey = `${lastTappedColor.toLowerCase()}+${color.toLowerCase()}`;
      if (COLOR_MIXES[pairKey]) {
        const mix = COLOR_MIXES[pairKey];
        if (!mixedColors.includes(mix.result)) {
          setMixedColors((prev) => [mix.result, ...prev]);
        }
        setSelectedColor(mix.result);
        setMixAnimation(`Campur! Menjadi ${mix.label}`);
        
        // Voice feedback
        const win = window as any;
        if (win.speakText) {
          win.speakText(`Campur! Menjadi ${mix.label}`);
        }

        setTimeout(() => setMixAnimation(null), 2500);
      }
    }
    setLastTappedColor(color);
  };

  const getSwatchStyle = (color: string) => {
    if (color.startsWith('url(#grad-')) {
      return { background: gradientCssMap[color] || '#ccc' };
    }
    return { backgroundColor: color };
  };

  const currentColors = palettes[activeTab]?.colors || palettes.vivid.colors;

  return (
    <div className="kid-palette-container">
      {/* Dynamic Mix Notification Banner */}
      {mixAnimation && (
        <div className="mix-notification animate-bounce">
          🌈 {mixAnimation} 🎉
        </div>
      )}

      {/* Tactile Mode Selectors (Huge toddler buttons) */}
      <div className="mode-selectors">
        <button
          onClick={() => { setBrushType('fill'); playColorSound(); }}
          className={`mode-btn ${brushType === 'fill' ? 'active' : ''}`}
          title="Isi Ember"
        >
          <span className="mode-icon">🪣</span>
          <span className="mode-label">Isi Warna</span>
        </button>
        <button
          onClick={() => { setBrushType('crayon'); playColorSound(); }}
          className={`mode-btn ${brushType !== 'fill' ? 'active' : ''}`}
          title="Menggambar Bebas"
        >
          <span className="mode-icon">🖍️</span>
          <span className="mode-label">Krayon Gambar</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="palette-tabs">
        {Object.entries(palettes).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => {
              setActiveTab(key);
              setLastTappedColor(null);
              setSelectedColor(palettes[key].colors[0]);
              playColorSound();
            }}
            className={`palette-tab-btn ${activeTab === key ? 'active' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Circular tactile swatches */}
      <div className="swatches-grid">
        {/* Mixed colors prepended */}
        {mixedColors.map((color) => (
          <button
            key={`mix-${color}`}
            onClick={() => handleColorTap(color)}
            style={{ backgroundColor: color }}
            className={`swatch-circle mixed-swatch ${selectedColor === color ? 'selected' : ''}`}
            aria-label={`Mixed color ${color}`}
          >
            <span className="star-indicator">⭐</span>
          </button>
        ))}

        {currentColors.map((color) => (
          <button
            key={color}
            onClick={() => handleColorTap(color)}
            style={getSwatchStyle(color)}
            className={`swatch-circle ${selectedColor === color ? 'selected' : ''}`}
            aria-label={`Pilih warna ${color}`}
          />
        ))}
      </div>
    </div>
  );
};
