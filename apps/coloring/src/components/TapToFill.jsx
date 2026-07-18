import React, { useRef, useEffect } from 'react';
import { playColorSound } from '../utils/audio';

const prepareSvgString = (svgString) => {
  if (!svgString) return '';
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');
  const svgEl = doc.documentElement;
  
  const elements = svgEl.querySelectorAll('path, polygon, circle, ellipse, rect');
  
  elements.forEach((el) => {
    const tagName = el.tagName.toLowerCase();
    const fill = el.getAttribute('fill');
    const stroke = el.getAttribute('stroke');
    const id = el.getAttribute('id');
    const className = el.getAttribute('class') || '';
    
    // Check if it's the full-size background rect
    const isBackground = tagName === 'rect' && 
      (el.getAttribute('width') === '800' || el.getAttribute('width') === '100%') &&
      (el.getAttribute('height') === '600' || el.getAttribute('height') === '100%') &&
      (!stroke || stroke === 'none');
      
    const isOutline = id === 'outline' || className.includes('outline') || fill === 'none';
    
    if (!isBackground && !isOutline) {
      el.classList.add('fillable');
    }
  });
  
  return new XMLSerializer().serializeToString(doc);
};

export default function TapToFill({ svgData, selectedColor }) {
  const containerRef = useRef(null);
  
  // Keep selectedColor in a ref so the click handler always has access to the latest color
  // without triggering a re-render/re-injection of the SVG.
  const colorRef = useRef(selectedColor);
  useEffect(() => {
    colorRef.current = selectedColor;
  }, [selectedColor]);

  // Inject the SVG and local gradient definitions when svgData changes
  useEffect(() => {
    if (containerRef.current) {
      const processedSvg = prepareSvgString(svgData);
      containerRef.current.innerHTML = processedSvg;
      const svg = containerRef.current.querySelector('svg');
      if (svg) {
        // Dynamically add a defs block containing premium gradients
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        defs.innerHTML = `
          <linearGradient id="grad-sunset" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ff5f6d" />
            <stop offset="100%" stop-color="#ffc371" />
          </linearGradient>
          <linearGradient id="grad-ocean" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2193b0" />
            <stop offset="100%" stop-color="#6dd5ed" />
          </linearGradient>
          <linearGradient id="grad-rainbow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ee9ca7" />
            <stop offset="100%" stop-color="#ffdde1" />
          </linearGradient>
          <linearGradient id="grad-forest" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#11998e" />
            <stop offset="100%" stop-color="#38ef7d" />
          </linearGradient>
          <linearGradient id="grad-magic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#8a2387" />
            <stop offset="100%" stop-color="#e94057" />
          </linearGradient>
          <linearGradient id="grad-cotton" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ff758c" />
            <stop offset="100%" stop-color="#ff7eb3" />
          </linearGradient>
        `;
        svg.insertBefore(defs, svg.firstChild);
      }
    }
  }, [svgData]);

  // Attach native click listener because dynamically injected HTML nodes
  // do not bubble synthetic onClick events in React virtual DOM.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleSvgClick = (e) => {
      const target = e.target;
      const fillableTags = ['path', 'polygon', 'circle', 'ellipse', 'rect'];
      if (fillableTags.includes(target.tagName.toLowerCase())) {
        const fill = target.getAttribute('fill');
        const id = target.getAttribute('id');
        const isFillable = target.classList.contains('fillable') || 
                           (target.getAttribute('class') && target.getAttribute('class').includes('fillable'));
        
        // Skip if it's explicitly non-fillable or not marked as fillable in templates
        if (fill === 'none' || id === 'outline' || !isFillable) {
          return;
        }
        
        target.setAttribute('fill', colorRef.current);
        playColorSound(); // Sound FX on successful fill
      }
    };

    container.addEventListener('click', handleSvgClick);
    return () => {
      container.removeEventListener('click', handleSvgClick);
    };
  }, [svgData]);

  return (
    <div 
      ref={containerRef}
      className="svg-fill-container"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        boxSizing: 'border-box'
      }}
    />
  );
}
