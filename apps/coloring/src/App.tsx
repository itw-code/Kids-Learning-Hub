import React, { useState } from 'react';
import TapToFill from './components/TapToFill';
import CanvasMask from './components/CanvasMask';
import { KidPalette } from './components/KidPalette';
import { CATEGORIES, TEMPLATES } from './templates';
import { EXTRA_CATEGORIES, EXTRA_TEMPLATES } from './templates-extra';
import { BRUSH_TYPES, STAMP_SHAPES } from './utils/brushEngine';
import { playColorSound } from './utils/audio';
import './App.css';

// ── Merged templates & categories ──────────────────────────────────────────────
const ALL_TEMPLATES: Record<string, any> = { ...TEMPLATES, ...EXTRA_TEMPLATES };
const ALL_CATEGORIES: Record<string, any> = { ...CATEGORIES, ...EXTRA_CATEGORIES };

// ── Creative Color Palettes ─────────────────────────────────────────────────────
const PALETTES = {
  vivid: {
    label: '🎨 Cerah',
    colors: [
      '#ff0000', '#ff4500', '#ff8c00', '#ffd700',
      '#adff2f', '#00fa9a', '#00bfff', '#1e90ff',
      '#9400d3', '#ff1493', '#ff69b4', '#dc143c',
      '#00ced1', '#32cd32', '#ff6347', '#ffffff',
    ],
  },
  pastel: {
    label: '🌸 Pastel',
    colors: [
      '#ffb3ba', '#ffdfba', '#ffffba', '#baffc9',
      '#bae1ff', '#e8baff', '#ffc8dd', '#cdb4db',
      '#a2d2ff', '#b5e48c', '#f8ad9d', '#f4e1d2',
      '#d0f4de', '#e2efda', '#fce4ec', '#f0f4c3',
    ],
  },
  neon: {
    label: '✨ Neon',
    colors: [
      '#ff0080', '#ff00ff', '#8000ff', '#0000ff',
      '#00ffff', '#00ff80', '#00ff00', '#80ff00',
      '#ffff00', '#ff8000', '#ff2020', '#ff005c',
      '#39ff14', '#ff6fff', '#ffe900', '#0ff0fc',
    ],
  },
  skin: {
    label: '👶 Kulit',
    colors: [
      '#FDDBB4', '#F5C89A', '#E8A87C', '#D4895A',
      '#C47A3A', '#A0522D', '#8B4513', '#6B3A2A',
      '#4A2210', '#3B1A0A', '#FFE0BD', '#FDBCB4',
    ],
  },
  metallic: {
    label: '💎 Logam',
    colors: [
      '#D4AF37', '#C0C0C0', '#CD7F32', '#B87333',
      '#E8E8E8', '#FFD700', '#A8C5DA', '#F5F5F5',
      '#9B111E', '#1C1C1C', '#4169E1', '#228B22',
    ],
  },
  gradient: {
    label: '🌈 Gradasi',
    colors: [
      'url(#grad-sunset)', 'url(#grad-ocean)', 'url(#grad-rainbow)',
      'url(#grad-forest)', 'url(#grad-magic)', 'url(#grad-cotton)',
      'url(#grad-fire)',   'url(#grad-ice)',    'url(#grad-galaxy)',
      'url(#grad-lemon)', 'url(#grad-mint)',   'url(#grad-rose)',
    ],
  },
};

const GRADIENT_CSS_MAP: Record<string, string> = {
  'url(#grad-sunset)':  'linear-gradient(135deg,#ff5f6d,#ffc371)',
  'url(#grad-ocean)':   'linear-gradient(135deg,#2193b0,#6dd5ed)',
  'url(#grad-rainbow)': 'linear-gradient(135deg,#ee9ca7,#ffdde1)',
  'url(#grad-forest)':  'linear-gradient(135deg,#11998e,#38ef7d)',
  'url(#grad-magic)':   'linear-gradient(135deg,#8a2387,#e94057)',
  'url(#grad-cotton)':  'linear-gradient(135deg,#ff758c,#ff7eb3)',
  'url(#grad-fire)':    'linear-gradient(135deg,#f83600,#f9d423)',
  'url(#grad-ice)':     'linear-gradient(135deg,#a8edea,#fed6e3)',
  'url(#grad-galaxy)':  'linear-gradient(135deg,#0f0c29,#302b63,#24243e)',
  'url(#grad-lemon)':   'linear-gradient(135deg,#f7971e,#ffd200)',
  'url(#grad-mint)':    'linear-gradient(135deg,#00b09b,#96c93d)',
  'url(#grad-rose)':    'linear-gradient(135deg,#f953c6,#b91d73)',
};

const BRUSH_ORDER = ['fill', 'crayon', 'marker', 'pencil', 'watercolor', 'glitter', 'eraser', 'stamp'];

export default function App() {
  const [selectedColor, setSelectedColor]       = useState<string>(PALETTES.vivid.colors[0]);
  const [brushType, setBrushType]               = useState<string>('crayon');
  const [brushSize, setBrushSize]               = useState<number>(18);
  const [stampShape, setStampShape]             = useState<string>('star');
  const [templateKey, setTemplateKey]           = useState<string>('lion');
  const [isGalleryOpen, setIsGalleryOpen]       = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [resetKey, setResetKey]                 = useState<number>(0);
  const [isCompleted, setIsCompleted]           = useState<boolean>(false);

  const isFillMode  = brushType === 'fill';
  const isStampMode = brushType === 'stamp';

  const filteredTemplates = Object.entries(ALL_TEMPLATES).filter(([, t]) =>
    selectedCategory === 'all' || t.category === selectedCategory
  );
  const activeTemplate = ALL_TEMPLATES[templateKey] || ALL_TEMPLATES['lion'];
  const getEmoji  = (name: string) => (name.match(/[\p{Emoji}\u200d]+/gu) || ['🎨'])[0];
  const cleanName = (name: string) => name.replace(/[\p{Emoji}\u200d]+/gu, '').trim();

  // Completion Reward Callback
  const handleCompletion = () => {
    setIsCompleted(true);
    playColorSound();

    const win = window as any;
    // Confetti animation
    if (win.playConfettiEffect) {
      win.playConfettiEffect();
    }

    // Audio speech feedback
    if (win.speakText) {
      win.speakText("Hebat! Mewarnai selesai!");
    }

    // Award Coloring Master sticker
    if (win.StickerManager) {
      win.StickerManager.awardSticker('coloring_master');
    }
  };

  // Image downloader helper
  const downloadImage = () => {
    playColorSound();
    if (brushType === 'fill') {
      const svgEl = document.querySelector('.svg-fill-container svg');
      if (svgEl) {
        const svgStr = new XMLSerializer().serializeToString(svgEl);
        const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `mewarnai-${templateKey}.svg`;
        link.click();
        URL.revokeObjectURL(url);
      }
    } else {
      const canvas = document.querySelector('.canvas-viewport canvas') as HTMLCanvasElement;
      if (canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `mewarnai-${templateKey}.png`;
        link.click();
      }
    }
  };

  const handleClear = () => {
    setResetKey(k => k + 1);
    localStorage.removeItem(`coloring_progress_${templateKey}`);
    playColorSound();
  };

  return (
    <div className="coloring-dashboard">
      
      {/* ── Completion Reward Overlay ── */}
      {isCompleted && (
        <div className="completion-overlay">
          <div className="completion-card">
            <h2>Hebat! 🎉</h2>
            <p>Kamu mewarnai {cleanName(activeTemplate.name)} dengan sangat indah!</p>
            <div className="completion-stars">⭐⭐⭐</div>
            <div className="completion-buttons">
              <button onClick={downloadImage} className="gallery-download-btn">
                💾 Simpan ke Galeri
              </button>
              <button 
                onClick={() => {
                  setIsCompleted(false);
                  handleClear();
                }} 
                className="play-again-btn"
              >
                🔄 Warnai Lagi
              </button>
              <button 
                onClick={() => window.location.href = '/'} 
                className="back-hub-btn"
              >
                🏠 Kembali ke Menu Utama
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Top Secondary Options Row ── */}
      <div className="options-row">
        {!isFillMode && !isStampMode && (
          <div className="control-group">
            <span className="control-label">Ukuran Brush</span>
            <div className="buttons-row">
              {[{ v: 8, l: 'Kecil' }, { v: 18, l: 'Sedang' }, { v: 28, l: 'Besar' }].map(({ v, l }) => (
                <button 
                  key={v} 
                  onClick={() => { setBrushSize(v); playColorSound(); }} 
                  className={`size-btn ${brushSize === v ? 'active' : ''}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        )}

        {isStampMode && (
          <div className="control-group">
            <span className="control-label">Stempel</span>
            <div className="buttons-row">
              {STAMP_SHAPES.map(({ id, label }) => (
                <button 
                  key={id} 
                  onClick={() => { setStampShape(id); playColorSound(); }} 
                  className={`size-btn ${stampShape === id ? 'active' : ''}`} 
                  style={{ fontSize: '22px' }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="control-group">
          <span className="control-label">Halaman Gambar</span>
          <button 
            onClick={() => { setIsGalleryOpen(true); playColorSound(); }} 
            className="open-gallery-btn"
          >
            📂 {cleanName(activeTemplate.name)}
          </button>
        </div>

        {/* Free Draw mode completion triggers manual Finish button */}
        {!isFillMode && (
          <div className="control-group">
            <span className="control-label">Selesai?</span>
            <button 
              onClick={handleCompletion} 
              className="open-gallery-btn" 
              style={{ backgroundColor: '#4caf50', borderColor: '#81c784', color: 'white' }}
            >
              🏆 Selesai!
            </button>
          </div>
        )}

        <div className="control-group">
          <span className="control-label">Ulang</span>
          <button onClick={handleClear} className="clear-btn">🔄 Bersihkan</button>
        </div>
      </div>

      {/* ── Canvas Viewport Area ── */}
      <div className="canvas-viewport">
        {isFillMode ? (
          <div key={`fill-${templateKey}-${resetKey}`} className="canvas-frame">
            <TapToFill 
              templateId={templateKey} 
              svgData={activeTemplate.svg} 
              selectedColor={selectedColor} 
              onComplete={handleCompletion}
            />
          </div>
        ) : (
          <div key={`draw-${templateKey}-${resetKey}`} className="canvas-frame">
            <CanvasMask
              templateKey={templateKey}
              selectedColor={selectedColor}
              brushSize={brushSize}
              brushType={brushType}
              stampShape={stampShape}
            />
          </div>
        )}
      </div>

      {/* ── Premium Palette & Modes Component ── */}
      <div className="palette-panel">
        <KidPalette 
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          brushType={brushType}
          setBrushType={setBrushType}
          palettes={PALETTES}
          gradientCssMap={GRADIENT_CSS_MAP}
        />
      </div>

      {/* ── Gallery Selection Modal ── */}
      {isGalleryOpen && (
        <div className="gallery-modal" onClick={() => setIsGalleryOpen(false)}>
          <div className="gallery-content" onClick={e => e.stopPropagation()}>
            <div className="gallery-header">
              <h2>Pilih Halaman Mewarnai! 🎨</h2>
              <button className="close-gallery-btn" onClick={() => setIsGalleryOpen(false)}>✕</button>
            </div>
            <div className="category-tabs">
              <button onClick={() => { setSelectedCategory('all'); playColorSound(); }} className={`category-tab ${selectedCategory === 'all' ? 'active' : ''}`}>
                🎨 Semua
              </button>
              {Object.entries(ALL_CATEGORIES).map(([catKey, cat]: [string, any]) => (
                <button key={catKey} onClick={() => { setSelectedCategory(catKey); playColorSound(); }} className={`category-tab ${selectedCategory === catKey ? 'active' : ''}`}>
                  {cat.icon} {cat.name.split(' ')[0]}
                </button>
              ))}
            </div>
            <div className="templates-grid-viewport">
              <div className="templates-grid">
                {filteredTemplates.map(([key, t]: [string, any]) => (
                  <div
                    key={key}
                    onClick={() => { setTemplateKey(key); setIsGalleryOpen(false); playColorSound(); }}
                    className={`template-card ${templateKey === key ? 'active' : ''}`}
                  >
                    <span className="card-emoji">{getEmoji(t.name)}</span>
                    <span className="card-name">{cleanName(t.name)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
