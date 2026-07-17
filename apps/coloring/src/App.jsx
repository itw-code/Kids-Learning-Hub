import React, { useState } from 'react';
import TapToFill from './components/TapToFill';
import CanvasMask from './components/CanvasMask';
import { CATEGORIES, TEMPLATES } from './templates';
import './App.css';

// Child-friendly palette (bold, cheerful colors)
const PALETTE = [
  '#ff595e', // Red
  '#ff924c', // Orange
  '#ffca3a', // Yellow
  '#8ac926', // Green
  '#36827f', // Teal
  '#1982c4', // Blue
  '#6a4c93', // Purple
  '#ff70a6', // Pink
  '#ffffff', // White (eraser)
];

export default function App() {
  const [selectedColor, setSelectedColor] = useState(PALETTE[0]);
  const [mode, setMode] = useState('tap'); // 'tap' or 'draw'
  const [templateKey, setTemplateKey] = useState('lion');
  
  // Gallery states
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // A toggleable reset key to force canvas re-render and clear colors
  const [resetKey, setResetKey] = useState(0);

  const handleClear = () => {
    setResetKey(prev => prev + 1);
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

  const filteredTemplates = Object.entries(TEMPLATES).filter(([key, t]) => {
    if (selectedCategory === 'all') return true;
    return t.category === selectedCategory;
  });

  const activeTemplate = TEMPLATES[templateKey] || TEMPLATES['lion'];

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
            />
          </div>
        )}
      </div>

      <div className="color-palette-bar">
        {PALETTE.map((color) => (
          <button
            key={color}
            style={{ 
              backgroundColor: color,
              border: color === '#ffffff' ? '4px solid #ccc' : `4px solid ${color}`
            }}
            className={`palette-color ${selectedColor === color ? 'selected' : ''}`}
            onClick={() => setSelectedColor(color)}
            aria-label={`Select color ${color}`}
          />
        ))}
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
