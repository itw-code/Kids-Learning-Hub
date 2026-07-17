import React, { useRef, useEffect, useState } from 'react';

// Programmatic templates for high-contrast line art and ID maps
const templates = {
  flower: {
    name: 'Cute Flower 🌸',
    draw: (ctx, isIdMap) => {
      const cx = 400, cy = 300;
      ctx.lineWidth = 12;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      const colors = isIdMap ? [
        '#ff595e', // Petal 1
        '#ffca3a', // Petal 2
        '#8ac926', // Petal 3
        '#1982c4', // Petal 4
        '#6a4c93'  // Center
      ] : ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'];

      // Draw petals
      const petalOffsets = [
        { dx: -70, dy: -70 },
        { dx: 70, dy: -70 },
        { dx: -70, dy: 70 },
        { dx: 70, dy: 70 }
      ];

      petalOffsets.forEach((offset, idx) => {
        ctx.beginPath();
        ctx.arc(cx + offset.dx, cy + offset.dy, 80, 0, Math.PI * 2);
        ctx.fillStyle = colors[idx];
        ctx.fill();
        ctx.strokeStyle = '#000000';
        ctx.stroke();
      });

      // Draw center circle
      ctx.beginPath();
      ctx.arc(cx, cy, 90, 0, Math.PI * 2);
      ctx.fillStyle = colors[4];
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.stroke();
    }
  },
  house: {
    name: 'Happy Playhouse 🏠',
    draw: (ctx, isIdMap) => {
      ctx.lineWidth = 12;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      const colors = isIdMap ? {
        sky: '#e0f7fa',
        roof: '#ff595e',
        wall: '#ffca3a',
        door: '#8ac926',
        window: '#1982c4'
      } : {
        sky: '#ffffff',
        roof: '#ffffff',
        wall: '#ffffff',
        door: '#ffffff',
        window: '#ffffff'
      };

      // Background Sky area
      ctx.fillStyle = colors.sky;
      ctx.fillRect(0, 0, 800, 600);

      // House Wall
      ctx.beginPath();
      ctx.rect(220, 260, 360, 240);
      ctx.fillStyle = colors.wall;
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.stroke();

      // House Roof
      ctx.beginPath();
      ctx.moveTo(170, 260);
      ctx.lineTo(400, 100);
      ctx.lineTo(630, 260);
      ctx.closePath();
      ctx.fillStyle = colors.roof;
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.stroke();

      // Window
      ctx.beginPath();
      ctx.rect(270, 310, 80, 80);
      ctx.fillStyle = colors.window;
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.stroke();

      // Window Cross lines
      ctx.beginPath();
      ctx.moveTo(310, 310);
      ctx.lineTo(310, 390);
      ctx.moveTo(270, 350);
      ctx.lineTo(350, 350);
      ctx.strokeStyle = '#000000';
      ctx.stroke();

      // Door
      ctx.beginPath();
      ctx.rect(430, 340, 90, 160);
      ctx.fillStyle = colors.door;
      ctx.fill();
      ctx.strokeStyle = '#000000';
      ctx.stroke();
    }
  }
};

export { templates };

export default function CanvasMask({ templateKey = 'flower', selectedColor, brushSize = 18 }) {
  const canvasRef = useRef(null);
  const idCanvasRef = useRef(null);
  const maskCanvasRef = useRef(null);
  const tempCanvasRef = useRef(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeColorId, setActiveColorId] = useState(null);

  // Initialize templates on canvases
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const idCanvas = idCanvasRef.current;
    const idCtx = idCanvas.getContext('2d');

    // Clear and draw template
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    idCtx.clearRect(0, 0, idCanvas.width, idCanvas.height);

    const template = templates[templateKey];
    if (template) {
      template.draw(idCtx, true);   // ID map drawing
      template.draw(ctx, false);    // Visible white drawing template
    }
  }, [templateKey]);

  const getPixelRGB = (ctx, x, y) => {
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    return [pixel[0], pixel[1], pixel[2]];
  };

  const createMaskForRegion = (idCtx, targetR, targetG, targetB) => {
    const maskCanvas = maskCanvasRef.current;
    const maskCtx = maskCanvas.getContext('2d');
    const width = maskCanvas.width;
    const height = maskCanvas.height;
    
    maskCtx.clearRect(0, 0, width, height);

    const idData = idCtx.getImageData(0, 0, width, height);
    const idPixels = idData.data;
    
    const maskData = maskCtx.createImageData(width, height);
    const maskPixels = maskData.data;

    // Tolerance to handle canvas anti-aliasing edges
    const threshold = 18;

    for (let i = 0; i < idPixels.length; i += 4) {
      const r = idPixels[i];
      const g = idPixels[i + 1];
      const b = idPixels[i + 2];
      
      const match = 
        Math.abs(r - targetR) <= threshold &&
        Math.abs(g - targetG) <= threshold &&
        Math.abs(b - targetB) <= threshold;
      
      if (match) {
        maskPixels[i] = 0;
        maskPixels[i + 1] = 0;
        maskPixels[i + 2] = 0;
        maskPixels[i + 3] = 255;
      } else {
        maskPixels[i + 3] = 0;
      }
    }
    
    maskCtx.putImageData(maskData, 0, 0);
  };

  const getEventCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;
    return { x, y };
  };

  const startDrawing = (e) => {
    const { x, y } = getEventCoordinates(e);
    const idCtx = idCanvasRef.current.getContext('2d');
    
    const [r, g, b] = getPixelRGB(idCtx, x, y);
    
    // Ignore pure black outlines (#000000)
    const isOutline = r < 18 && g < 18 && b < 18;

    if (!isOutline) {
      setActiveColorId([r, g, b]);
      createMaskForRegion(idCtx, r, g, b);
      
      const tempCanvas = tempCanvasRef.current;
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
      tempCtx.beginPath();
      tempCtx.moveTo(x, y);
      
      setIsDrawing(true);
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { x, y } = getEventCoordinates(e);

    const tempCanvas = tempCanvasRef.current;
    const tempCtx = tempCanvas.getContext('2d');
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Draw brush line segment on temp canvas
    tempCtx.lineTo(x, y);
    tempCtx.strokeStyle = selectedColor;
    tempCtx.lineWidth = brushSize;
    tempCtx.lineCap = 'round';
    tempCtx.lineJoin = 'round';
    tempCtx.stroke();

    // Clip onto main canvas
    ctx.save();
    
    const scratchCanvas = document.createElement('canvas');
    scratchCanvas.width = canvas.width;
    scratchCanvas.height = canvas.height;
    const scratchCtx = scratchCanvas.getContext('2d');
    
    scratchCtx.drawImage(tempCanvas, 0, 0);
    scratchCtx.globalCompositeOperation = 'destination-in';
    scratchCtx.drawImage(maskCanvasRef.current, 0, 0);
    
    ctx.drawImage(scratchCanvas, 0, 0);
    
    ctx.restore();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    setActiveColorId(null);
    
    // Redraw template outlines to cover overlapping brush edge pixels
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const template = templates[templateKey];
    if (template) {
      template.draw(ctx, false);
    }
  };

  return (
    <div className="canvas-wrapper" style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{
          touchAction: 'none',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          borderRadius: '16px',
          maxWidth: '100%',
          maxHeight: '100%',
          backgroundColor: '#fff',
          cursor: 'crosshair'
        }}
      />
      <canvas ref={idCanvasRef} width={800} height={600} style={{ display: 'none' }} />
      <canvas ref={maskCanvasRef} width={800} height={600} style={{ display: 'none' }} />
      <canvas ref={tempCanvasRef} width={800} height={600} style={{ display: 'none' }} />
    </div>
  );
}
