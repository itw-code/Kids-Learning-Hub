import React, { useRef, useEffect } from 'react';
import { playColorSound } from '../utils/audio';
import { useCanvasPersistence } from '../hooks/useCanvasPersistence';

const prepareSvgString = (svgString: string): string => {
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
      
    const isOutline = id === 'outline' || className.includes('outline') || (fill === 'none' && !className.includes('fillable') && !el.classList.contains('fillable'));
    
    if (!isBackground && !isOutline) {
      el.classList.add('fillable');
    }
  });
  
  return new XMLSerializer().serializeToString(doc);
};

interface TapToFillProps {
  templateId: string;
  svgData: string;
  selectedColor: string;
  onComplete: () => void;
}

export default function TapToFill({ templateId, svgData, selectedColor, onComplete }: TapToFillProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<string>(selectedColor);
  const { getProgress, saveProgress } = useCanvasPersistence(templateId);

  useEffect(() => {
    colorRef.current = selectedColor;
  }, [selectedColor]);

  // Save progress state helper
  const saveProgressState = () => {
    const container = containerRef.current;
    if (!container) return;
    const paths = container.querySelectorAll('.fillable');
    const state = Array.from(paths).map((p, idx) => ({
      idx,
      fill: p.getAttribute('fill'),
    }));
    saveProgress(JSON.stringify({ type: 'tapToFill', state }));
  };

  // Check completion helper
  const checkCompletion = () => {
    const container = containerRef.current;
    if (!container) return;
    
    const fillableElements = container.querySelectorAll('.fillable');
    if (fillableElements.length === 0) return;

    let coloredCount = 0;
    fillableElements.forEach((el) => {
      const fill = el.getAttribute('fill');
      // A patch is considered colored if it has a non-default, non-white fill
      if (fill && fill !== '#ffffff' && fill !== 'white' && fill !== '#fff' && fill !== 'none') {
        coloredCount++;
      }
    });

    if (coloredCount === fillableElements.length) {
      onComplete();
    }
  };

  // Inject the SVG, load progress, and gradients
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const processedSvg = prepareSvgString(svgData);
    container.innerHTML = processedSvg;
    const svg = container.querySelector('svg');
    
    if (svg) {
      // Add premium gradients
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
        <linearGradient id="grad-fire" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f83600" />
          <stop offset="100%" stop-color="#f9d423" />
        </linearGradient>
        <linearGradient id="grad-ice" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#a8edea" />
          <stop offset="100%" stop-color="#fed6e3" />
        </linearGradient>
        <linearGradient id="grad-galaxy" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0f0c29" />
          <stop offset="50%" stop-color="#302b63" />
          <stop offset="100%" stop-color="#24243e" />
        </linearGradient>
        <linearGradient id="grad-lemon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f7971e" />
          <stop offset="100%" stop-color="#ffd200" />
        </linearGradient>
        <linearGradient id="grad-mint" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00b09b" />
          <stop offset="100%" stop-color="#96c93d" />
        </linearGradient>
        <linearGradient id="grad-rose" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f953c6" />
          <stop offset="100%" stop-color="#b91d73" />
        </linearGradient>
      `;
      svg.insertBefore(defs, svg.firstChild);

      // Hydrate progress from localStorage if it exists
      const saved = getProgress();
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.type === 'tapToFill' && Array.isArray(parsed.state)) {
            const paths = svg.querySelectorAll('.fillable');
            parsed.state.forEach((item: any) => {
              const p = paths[item.idx];
              if (p && item.fill) {
                p.setAttribute('fill', item.fill);
              }
            });
            // Initial check in case it's loaded fully colored
            checkCompletion();
          }
        } catch (e) {
          console.warn('[TapToFill] Failed to hydrate progress:', e);
        }
      }
    }
  }, [svgData, getProgress]);

  // Click listener for coloring patches
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleSvgClick = (e: MouseEvent) => {
      const target = e.target as SVGElement;
      const fillableTags = ['path', 'polygon', 'circle', 'ellipse', 'rect'];
      if (fillableTags.includes(target.tagName.toLowerCase())) {
        const id = target.getAttribute('id');
        const isFillable = target.classList.contains('fillable') || 
                           (target.getAttribute('class') && target.getAttribute('class').includes('fillable'));
        
        if (id === 'outline' || !isFillable) {
          return;
        }
        
        target.setAttribute('fill', colorRef.current);
        playColorSound();

        // Haptic feedback
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate(5);
        }

        saveProgressState();
        checkCompletion();
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
