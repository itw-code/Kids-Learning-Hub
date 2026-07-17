import React, { useRef, useEffect } from 'react';

export default function TapToFill({ svgData, selectedColor }) {
  const containerRef = useRef(null);
  
  // Keep selectedColor in a ref so the click handler always has access to the latest color
  // without triggering a re-render/re-injection of the SVG.
  const colorRef = useRef(selectedColor);
  useEffect(() => {
    colorRef.current = selectedColor;
  }, [selectedColor]);

  // Only inject the SVG when svgData changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = svgData;
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
