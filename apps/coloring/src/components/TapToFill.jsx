import React from 'react';

export default function TapToFill({ svgData, selectedColor }) {
  const handleSvgClick = (e) => {
    const target = e.target;
    // We only want to fill paths, polygons, circles, ellipses, rects
    const fillableTags = ['path', 'polygon', 'circle', 'ellipse', 'rect'];
    if (fillableTags.includes(target.tagName.toLowerCase())) {
      // Avoid filling black line-art outlines or borders
      const stroke = target.getAttribute('stroke');
      const id = target.getAttribute('id');
      
      // If it's a boundary outline path, do not fill it
      if (stroke === '#000000' || stroke === 'black' || id === 'outline') {
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
