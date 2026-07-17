import React from 'react';

export default function TapToFill({ svgData, selectedColor }) {
  const handleSvgClick = (e) => {
    const target = e.target;
    const fillableTags = ['path', 'polygon', 'circle', 'ellipse', 'rect'];
    if (fillableTags.includes(target.tagName.toLowerCase())) {
      const fill = target.getAttribute('fill');
      const id = target.getAttribute('id');
      const isFillable = target.classList.contains('fillable');
      
      // Skip if it's explicitly non-fillable or not marked as fillable in templates
      if (fill === 'none' || id === 'outline' || !isFillable) {
        return;
      }
      
      target.setAttribute('fill', selectedColor);
    }
  };

  return (
    <div 
      className="svg-fill-container"
      onClick={handleSvgClick}
      dangerouslySetInnerHTML={{ __html: svgData }}
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
