import React, { useState } from 'react';
import TapToFill from './components/TapToFill';
import CanvasMask from './components/CanvasMask';
import { CATEGORIES, TEMPLATES } from './templates';
import { EXTRA_CATEGORIES, EXTRA_TEMPLATES } from './templates-extra';
import { BRUSH_TYPES, STAMP_SHAPES } from './utils/brushEngine';
import './App.css';

// ── Merged templates & categories ──────────────────────────────────────────────
const ALL_TEMPLATES = { ...TEMPLATES, ...EXTRA_TEMPLATES };
const ALL_CATEGORIES = { ...CATEGORIES, ...EXTRA_CATEGORIES };

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

const GRADIENT_CSS_MAP = {
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
  const [selectedColor, setSelectedColor]       = useState(PALETTES.vivid.colors[0]);
  const [activePaletteTab, setActivePalette]    = useState('vivid');
  const [brushType, setBrushType]               = useState('crayon');
  const [brushSize, setBrushSize]               = useState(18);
  const [stampShape, setStampShape]             = useState('star');
  const [templateKey, setTemplateKey]           = useState('lion');
  const [isGalleryOpen, setIsGalleryOpen]       = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [resetKey, setResetKey]                 = useState(0);

  const isFillMode  = brushType === 'fill';
  const isStampMode = brushType === 'stamp';

  const handlePaletteTab = (tab) => {
    setActivePalette(tab);
    setSelectedColor(PALETTES[tab].colors[0]);
  };

  const getSwatchStyle = (color) => {
    if (color.startsWith('url(#grad-')) {
      return { background: GRADIENT_CSS_MAP[color] || '#ccc', border: '3px solid transparent' };
    }
    return {
      backgroundColor: color,
      border: color === '#ffffff' || color === '#F5F5F5' || color === '#E8E8E8'
        ? '3px solid #ccc'
        : `3px solid ${color}`,
    };
  };

  const filteredTemplates = Object.entries(ALL_TEMPLATES).filter(([, t]) =>
    selectedCategory === 'all' || t.category === selectedCategory
  );
  const activeTemplate = ALL_TEMPLATES[templateKey] || ALL_TEMPLATES['lion'];
  const getEmoji  = (name) => (name.match(/[\p{Emoji}\u200d]+/gu) || ['🎨'])[0];
  const cleanName = (name) => name.replace(/[\p{Emoji}\u200d]+/gu, '').trim();

  const currentPaletteColors = PALETTES[activePaletteTab]?.colors || PALETTES.vivid.colors;

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
        {!isFillMode && !isStampMode && (
          <div className="control-group">
            <span className="control-label">Ukuran</span>
            <div className="buttons-row">
              {[{ v: 8, l: 'S' }, { v: 18, l: 'M' }, { v: 28, l: 'L' }].map(({ v, l }) => (
                <button key={v} onClick={() => setBrushSize(v)} className={`size-btn ${brushSize === v ? 'active' : ''}`}>{l}</button>
              ))}
            </div>
          </div>
        )}

        {isStampMode && (
          <div className="control-group">
            <span className="control-label">Bentuk Stempel</span>
            <div className="buttons-row">
              {STAMP_SHAPES.map(({ id, label }) => (
                <button key={id} onClick={() => setStampShape(id)} className={`size-btn ${stampShape === id ? 'active' : ''}`} style={{ fontSize: '22px' }}>{label}</button>
              ))}
            </div>
          </div>
        )}

        <div className="control-group">
          <span className="control-label">Halaman</span>
          <button onClick={() => setIsGalleryOpen(true)} className="open-gallery-btn">
            📂 {activeTemplate.name}
          </button>
        </div>

        <div className="control-group">
          <button onClick={() => setResetKey(k => k + 1)} className="clear-btn">🔄 Hapus</button>
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
          {Object.entries(PALETTES).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => handlePaletteTab(key)}
              className={`palette-tab-btn ${activePaletteTab === key ? 'active' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="color-palette-bar">
          {currentPaletteColors.map((color) => (
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
              <button onClick={() => setSelectedCategory('all')} className={`category-tab ${selectedCategory === 'all' ? 'active' : ''}`}>
                🎨 Semua
              </button>
              {Object.entries(ALL_CATEGORIES).map(([catKey, cat]) => (
                <button key={catKey} onClick={() => setSelectedCategory(catKey)} className={`category-tab ${selectedCategory === catKey ? 'active' : ''}`}>
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
