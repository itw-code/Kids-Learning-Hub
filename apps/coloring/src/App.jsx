import React, { useState } from 'react';
import TapToFill from './components/TapToFill';
import CanvasMask, { templates } from './components/CanvasMask';
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

// Simple child-friendly SVGs for Tap-to-Fill mode
const SVG_TEMPLATES = {
  flower: `<svg viewBox="0 0 800 600" width="100%" height="100%">
    <!-- Outer boundary paths (lines are black, fillable patches are white) -->
    <!-- Petals -->
    <circle cx="330" cy="230" r="80" stroke="#000000" stroke-width="12" fill="#ffffff" />
    <circle cx="470" cy="230" r="80" stroke="#000000" stroke-width="12" fill="#ffffff" />
    <circle cx="330" cy="370" r="80" stroke="#000000" stroke-width="12" fill="#ffffff" />
    <circle cx="470" cy="370" r="80" stroke="#000000" stroke-width="12" fill="#ffffff" />
    <!-- Center -->
    <circle cx="400" cy="300" r="90" stroke="#000000" stroke-width="12" fill="#ffffff" />
  </svg>`,
  house: `<svg viewBox="0 0 800 600" width="100%" height="100%">
    <!-- Sky background -->
    <rect x="0" y="0" width="800" height="600" stroke="#000000" stroke-width="12" fill="#ffffff" />
    <!-- Wall -->
    <rect x="220" y="260" width="360" height="240" stroke="#000000" stroke-width="12" fill="#ffffff" />
    <!-- Roof -->
    <polygon points="170,260 400,100 630,260" stroke="#000000" stroke-width="12" fill="#ffffff" />
    <!-- Window -->
    <rect x="270" y="310" width="80" height="80" stroke="#000000" stroke-width="12" fill="#ffffff" />
    <line x1="310" y1="310" x2="310" y2="390" stroke="#000000" stroke-width="12" />
    <line x1="270" y1="350" x2="350" y2="350" stroke="#000000" stroke-width="12" />
    <!-- Door -->
    <rect x="430" y="340" width="90" height="160" stroke="#000000" stroke-width="12" fill="#ffffff" />
  </svg>`
};

export default function App() {
  const [selectedColor, setSelectedColor] = useState(PALETTE[0]);
  const [mode, setMode] = useState('tap'); // 'tap' or 'draw'
  const [templateKey, setTemplateKey] = useState('flower');
  
  // A toggleable reset key to force canvas re-render and clear colors
  const [resetKey, setResetKey] = useState(0);

  const handleClear = () => {
    setResetKey(prev => prev + 1);
  };

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
          <span className="control-label">Select Page</span>
          <div className="buttons-row">
            <button 
              onClick={() => setTemplateKey('flower')} 
              className={`mode-btn ${templateKey === 'flower' ? 'active' : ''}`}
            >
              🌸 Flower
            </button>
            <button 
              onClick={() => setTemplateKey('house')} 
              className={`mode-btn ${templateKey === 'house' ? 'active' : ''}`}
            >
              🏠 House
            </button>
          </div>
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
              svgData={SVG_TEMPLATES[templateKey]} 
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
    </div>
  );
}
