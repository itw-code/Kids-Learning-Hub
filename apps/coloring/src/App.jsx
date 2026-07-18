import React, { useState } from 'react';
import TapToFill from './components/TapToFill';
import CanvasMask from './components/CanvasMask';
import { CATEGORIES, TEMPLATES } from './templates';
import { BRUSH_TYPES, STAMP_SHAPES } from './utils/brushEngine';
import './App.css';

// ---- Color Palettes ----
const SOLID_COLORS = [
  '#ff595e', '#ff924c', '#ffca3a', '#8ac926',
  '#36827f', '#1982c4', '#6a4c93', '#ff70a6',
  '#8b5a2b', '#000000', '#ffffff',
];

const PASTEL_COLORS = [
  '#ffadad', '#ffd6a5', '#fdffb6', '#caffbf',
  '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff',
];

const GRADIENTS = [
  { name: 'Sunset 🌅',  value: 'url(#grad-sunset)' },
  { name: 'Ocean 🌊',   value: 'url(#grad-ocean)'  },
  { name: 'Rainbow 🌈', value: 'url(#grad-rainbow)' },
  { name: 'Forest 🌳',  value: 'url(#grad-forest)' },
  { name: 'Magic 🔮',   value: 'url(#grad-magic)'  },
  { name: 'Cotton 🍬',  value: 'url(#grad-cotton)' },
];

// Brush tool order for the toolbar
const BRUSH_ORDER = ['fill', 'crayon', 'marker', 'pencil', 'watercolor', 'glitter', 'eraser', 'stamp'];

export default function App() {
  const [selectedColor, setSelectedColor]     = useState(SOLID_COLORS[0]);
  const [activePaletteTab, setActivePalette]  = useState('solid');
  const [brushType, setBrushType]             = useState('crayon');
  const [brushSize, setBrushSize]             = useState(18);
  const [stampShape, setStampShape]           = useState('star');
  const [templateKey, setTemplateKey]         = useState('lion');
  const [isGalleryOpen, setIsGalleryOpen]     = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [resetKey, setResetKey]               = useState(0);

  // Derived: fill mode uses TapToFill SVG; everything else uses CanvasMask
  const isFillMode = brushType === 'fill';

  const handlePaletteTab = (tab) => {
    setActivePalette(tab);
    if (tab === 'solid')    setSelectedColor(SOLID_COLORS[0]);
    else if (tab === 'pastel') setSelectedColor(PASTEL_COLORS[0]);
    else                    setSelectedColor(GRADIENTS[0].value);
  };

  const getSwatchStyle = (color) => {
    if (color.startsWith('url(#grad-')) {
      const id = color.slice(5, -1);
      const MAP = {
        'grad-sunset':  'linear-gradient(135deg,#ff5f6d,#ffc371)',
        'grad-ocean':   'linear-gradient(135deg,#2193b0,#6dd5ed)',
        'grad-rainbow': 'linear-gradient(135deg,#ee9ca7,#ffdde1)',
        'grad-forest':  'linear-gradient(135deg,#11998e,#38ef7d)',
        'grad-magic':   'linear-gradient(135deg,#8a2387,#e94057)',
        'grad-cotton':  'linear-gradient(135deg,#ff758c,#ff7eb3)',
      };
      return { background: MAP[id] || '#ccc', border: 'none' };
    }
    return {
      backgroundColor: color,
      border: color === '#ffffff' ? '4px solid #ccc' : `4px solid ${color}`,
    };
  };

  const filteredTemplates = Object.entries(TEMPLATES).filter(([, t]) =>
    selectedCategory === 'all' || t.category === selectedCategory
  );
  const activeTemplate = TEMPLATES[templateKey] || TEMPLATES['lion'];
  const getEmoji = (name) => (name.match(/[\p{Emoji}\u200d]+/gu) || ['🎨'])[0];
  const cleanName = (name) => name.replace(/[\p{Emoji}\u200d]+/gu, '').trim();

  const currentPalette =
    activePaletteTab === 'solid'   ? SOLID_COLORS :
    activePaletteTab === 'pastel'  ? PASTEL_COLORS :
    GRADIENTS.map(g => g.value);

  return (
    <div className="coloring-dashboard">

      {/* ── Brush Toolbar ── */}
      <div className="brush-toolbar">
        {BRUSH_ORDER.map((bt) => {
          const info = BRUSH_TYPES[bt];
          return (
            <button
              key={bt}
              onClick={() => setBrushType(bt)}
              className={`brush-tool-btn ${brushType === bt ? 'active' : ''}`}
              title={info.labelId}
            >
              <span className="brush-icon">{info.label.split(' ')[0]}</span>
              <span className="brush-label">{info.labelId}</span>
            </button>
          );
        })}
      </div>

      {/* ── Secondary Options Row ── */}
      <div className="options-row">
        {/* Brush size — hidden for fill and stamp */}
        {brushType !== 'fill' && brushType !== 'stamp' && (
          <div className="control-group">
            <span className="control-label">Ukuran</span>
            <div className="buttons-row">
              {[{ v: 8, l: 'S' }, { v: 18, l: 'M' }, { v: 28, l: 'L' }].map(({ v, l }) => (
                <button
                  key={v}
                  onClick={() => setBrushSize(v)}
                  className={`size-btn ${brushSize === v ? 'active' : ''}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Stamp shape picker */}
        {brushType === 'stamp' && (
          <div className="control-group">
            <span className="control-label">Bentuk Stempel</span>
            <div className="buttons-row">
              {STAMP_SHAPES.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setStampShape(id)}
                  className={`size-btn ${stampShape === id ? 'active' : ''}`}
                  style={{ fontSize: '22px' }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Gallery picker */}
        <div className="control-group">
          <span className="control-label">Halaman</span>
          <button onClick={() => setIsGalleryOpen(true)} className="open-gallery-btn">
            📂 {activeTemplate.name}
          </button>
        </div>

        {/* Clear */}
        <div className="control-group">
          <button onClick={() => setResetKey(k => k + 1)} className="clear-btn">
            🔄 Hapus
          </button>
        </div>
      </div>

      {/* ── Canvas Area ── */}
      <div className="canvas-viewport">
        {isFillMode ? (
          <div key={`fill-${templateKey}-${resetKey}`} className="canvas-frame">
            <TapToFill svgData={activeTemplate.svg} selectedColor={selectedColor} />
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

      {/* ── Color Palette ── */}
      <div className="palette-panel">
        <div className="palette-tabs-row">
          {['solid', 'pastel', 'gradient'].map((tab) => (
            <button
              key={tab}
              onClick={() => handlePaletteTab(tab)}
              className={`palette-tab-btn ${activePaletteTab === tab ? 'active' : ''}`}
            >
              {tab === 'solid' ? '🎨 Solid' : tab === 'pastel' ? '🌸 Pastel' : '✨ Gradasi'}
            </button>
          ))}
        </div>
        <div className="color-palette-bar">
          {currentPalette.map((color) => (
            <button
              key={color}
              style={getSwatchStyle(color)}
              className={`palette-color ${selectedColor === color ? 'selected' : ''}`}
              onClick={() => setSelectedColor(color)}
              aria-label={`Pilih warna ${color}`}
            />
          ))}
        </div>
      </div>

      {/* ── Gallery Modal ── */}
      {isGalleryOpen && (
        <div className="gallery-modal" onClick={() => setIsGalleryOpen(false)}>
          <div className="gallery-content" onClick={e => e.stopPropagation()}>
            <div className="gallery-header">
              <h2>Pilih Halaman Mewarnai! 🎨</h2>
              <button className="close-gallery-btn" onClick={() => setIsGalleryOpen(false)}>✕</button>
            </div>
            <div className="category-tabs">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`category-tab ${selectedCategory === 'all' ? 'active' : ''}`}
              >
                🎨 Semua
              </button>
              {Object.entries(CATEGORIES).map(([catKey, cat]) => (
                <button
                  key={catKey}
                  onClick={() => setSelectedCategory(catKey)}
                  className={`category-tab ${selectedCategory === catKey ? 'active' : ''}`}
                >
                  {cat.icon} {cat.name.split(' ')[0]}
                </button>
              ))}
            </div>
            <div className="templates-grid-viewport">
              <div className="templates-grid">
                {filteredTemplates.map(([key, t]) => (
                  <div
                    key={key}
                    onClick={() => { setTemplateKey(key); setIsGalleryOpen(false); }}
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
