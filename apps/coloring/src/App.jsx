import React, { useState } from 'react';
import TapToFill from './components/TapToFill';
import CanvasMask from './components/CanvasMask';
import { CATEGORIES, TEMPLATES } from './templates';
import './App.css';

// Child-friendly palettes
const SOLID_COLORS = [
  '#ff595e', // Red
  '#ff924c', // Orange
  '#ffca3a', // Yellow
  '#8ac926', // Green
  '#36827f', // Teal
  '#1982c4', // Blue
  '#6a4c93', // Purple
  '#ff70a6', // Pink
  '#8b5a2b', // Brown
  '#000000', // Black
  '#ffffff', // White (eraser)
];

const PASTEL_COLORS = [
  '#ffadad', // Soft Red
  '#ffd6a5', // Soft Orange
  '#fdffb6', // Soft Yellow
  '#caffbf', // Soft Green
  '#9bf6ff', // Soft Cyan
  '#a0c4ff', // Soft Blue
  '#bdb2ff', // Soft Purple
  '#ffc6ff', // Soft Pink
];

const GRADIENTS = [
  { name: 'Sunset 🌅', value: 'url(#grad-sunset)' },
  { name: 'Ocean 🌊', value: 'url(#grad-ocean)' },
  { name: 'Rainbow 🌈', value: 'url(#grad-rainbow)' },
  { name: 'Forest 🌳', value: 'url(#grad-forest)' },
  { name: 'Magic 🔮', value: 'url(#grad-magic)' },
  { name: 'Cotton 🍬', value: 'url(#grad-cotton)' },
];

export default function App() {
  const [selectedColor, setSelectedColor] = useState(SOLID_COLORS[0]);
  const [mode, setMode] = useState('tap'); // 'tap' or 'draw'
  const [templateKey, setTemplateKey] = useState('lion');
  
  // Gallery states
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // A toggleable reset key to force canvas re-render and clear colors
  const [resetKey, setResetKey] = useState(0);

  // Expanded customization states
  const [activePaletteTab, setActivePaletteTab] = useState('solid'); // 'solid' | 'pastel' | 'gradient'
  const [brushSize, setBrushSize] = useState(18); // 10 | 18 | 28

  const handleClear = () => {
    setResetKey(prev => prev + 1);
  };

  const handlePaletteTabChange = (tab) => {
    setActivePaletteTab(tab);
    if (tab === 'solid') setSelectedColor(SOLID_COLORS[0]);
    else if (tab === 'pastel') setSelectedColor(PASTEL_COLORS[0]);
    else if (tab === 'gradient') setSelectedColor(GRADIENTS[0].value);
  };

  // Helper to extract emoji from template name
  const getTemplateEmoji = (name) => {
    const match = name.match(/[\p{Emoji}\u200d]+/gu);
    return match ? match[0] : '🎨';
  };

  // Helper to clean name of emoji
  const getCleanName = (name) => {
    return name.replace(/[\p{Emoji}\u200d]+/gu, '').trim();
  };

  const getPaletteStyle = (color) => {
    if (typeof color === 'string' && color.startsWith('url(#grad-')) {
      const gradId = color.substring(5, color.length - 1);
      if (gradId === 'grad-sunset') return { background: 'linear-gradient(135deg, #ff5f6d, #ffc371)', border: 'none' };
      if (gradId === 'grad-ocean') return { background: 'linear-gradient(135deg, #2193b0, #6dd5ed)', border: 'none' };
      if (gradId === 'grad-rainbow') return { background: 'linear-gradient(135deg, #ee9ca7, #ffdde1)', border: 'none' };
      if (gradId === 'grad-forest') return { background: 'linear-gradient(135deg, #11998e, #38ef7d)', border: 'none' };
      if (gradId === 'grad-magic') return { background: 'linear-gradient(135deg, #8a2387, #e94057)', border: 'none' };
      if (gradId === 'grad-cotton') return { background: 'linear-gradient(135deg, #ff758c, #ff7eb3)', border: 'none' };
    }
    // Solid / Pastel
    return { 
      backgroundColor: color,
      border: color === '#ffffff' ? '4px solid #ccc' : `4px solid ${color}`
    };
  };

  const filteredTemplates = Object.entries(TEMPLATES).filter(([key, t]) => {
    if (selectedCategory === 'all') return true;
    return t.category === selectedCategory;
  });

  const activeTemplate = TEMPLATES[templateKey] || TEMPLATES['lion'];

  // Select current palette items
  const currentPalette = 
    activePaletteTab === 'solid' 
      ? SOLID_COLORS 
      : activePaletteTab === 'pastel' 
        ? PASTEL_COLORS 
        : GRADIENTS.map(g => g.value);

  return (
    <div className="coloring-dashboard">
      <div className="dashboard-controls">
        <div className="control-group">
          <span className="control-label">Drawing Tools</span>
          <div className="buttons-row">
            <button 
              onClick={() => setMode('tap')} 
              className={`mode-btn ${mode === 'tap' ? 'active' : ''}`}
            >
              👉 Tap to Fill
            </button>
            <button 
              onClick={() => setMode('draw')} 
              className={`mode-btn ${mode === 'draw' ? 'active' : ''}`}
            >
              🖍️ Crayon Brush
            </button>
          </div>
        </div>

        {mode === 'draw' && (
          <div className="control-group">
            <span className="control-label">Brush Size (Ukuran Crayon)</span>
            <div className="buttons-row">
              <button 
                onClick={() => setBrushSize(10)} 
                className={`mode-btn size-btn ${brushSize === 10 ? 'active' : ''}`}
              >
                👶 Kecil
              </button>
              <button 
                onClick={() => setBrushSize(18)} 
                className={`mode-btn size-btn ${brushSize === 18 ? 'active' : ''}`}
              >
                🧒 Sedang
              </button>
              <button 
                onClick={() => setBrushSize(28)} 
                className={`mode-btn size-btn ${brushSize === 28 ? 'active' : ''}`}
              >
                🧑 Besar
              </button>
            </div>
          </div>
        )}

        <div className="control-group">
          <span className="control-label">Drawing Page</span>
          <button 
            onClick={() => setIsGalleryOpen(true)} 
            className="open-gallery-btn"
          >
            📂 {activeTemplate.name}
          </button>
        </div>

        <div className="control-group">
          <button onClick={handleClear} className="clear-btn">
            🔄 Clear Page
          </button>
        </div>
      </div>

      <div className="canvas-viewport">
        {mode === 'tap' ? (
          <div key={`tap-${templateKey}-${resetKey}`} className="canvas-frame">
            <TapToFill 
              svgData={activeTemplate.svg} 
              selectedColor={selectedColor} 
            />
          </div>
        ) : (
          <div key={`draw-${templateKey}-${resetKey}`} className="canvas-frame">
            <CanvasMask 
              templateKey={templateKey} 
              selectedColor={selectedColor} 
              brushSize={brushSize}
            />
          </div>
        )}
      </div>

      {/* Expanded Color Customization Hub */}
      <div className="palette-panel">
        <div className="palette-tabs-row">
          <button 
            onClick={() => handlePaletteTabChange('solid')}
            className={`palette-tab-btn ${activePaletteTab === 'solid' ? 'active' : ''}`}
          >
            🎨 Solid
          </button>
          <button 
            onClick={() => handlePaletteTabChange('pastel')}
            className={`palette-tab-btn ${activePaletteTab === 'pastel' ? 'active' : ''}`}
          >
            🌸 Pastel
          </button>
          <button 
            onClick={() => handlePaletteTabChange('gradient')}
            className={`palette-tab-btn ${activePaletteTab === 'gradient' ? 'active' : ''}`}
          >
            ✨ Gradasi
          </button>
        </div>

        <div className="color-palette-bar">
          {currentPalette.map((color) => (
            <button
              key={color}
              style={getPaletteStyle(color)}
              className={`palette-color ${selectedColor === color ? 'selected' : ''}`}
              onClick={() => setSelectedColor(color)}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
      </div>

      {/* Premium Gallery Modal */}
      {isGalleryOpen && (
        <div className="gallery-modal" onClick={() => setIsGalleryOpen(false)}>
          <div className="gallery-content" onClick={(e) => e.stopPropagation()}>
            <div className="gallery-header">
              <h2>Choose a Page to Color! 🎨</h2>
              <button 
                className="close-gallery-btn" 
                onClick={() => setIsGalleryOpen(false)}
                aria-label="Close Gallery"
              >
                ✕
              </button>
            </div>

            <div className="category-tabs">
              <button 
                onClick={() => setSelectedCategory('all')}
                className={`category-tab ${selectedCategory === 'all' ? 'active' : ''}`}
              >
                🎨 All Pages
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
                {filteredTemplates.map(([key, t]) => {
                  const emoji = getTemplateEmoji(t.name);
                  const cleanName = getCleanName(t.name);
                  return (
                    <div
                      key={key}
                      onClick={() => {
                        setTemplateKey(key);
                        setIsGalleryOpen(false);
                      }}
                      className={`template-card ${templateKey === key ? 'active' : ''}`}
                    >
                      <span className="card-emoji">{emoji}</span>
                      <span className="card-name">{cleanName}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
