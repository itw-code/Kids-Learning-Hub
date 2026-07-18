import React, { useRef, useEffect, useState } from 'react';
import { TEMPLATES } from '../templates';
import { playColorSound } from '../utils/audio';

// Helper to generate distinct RGB values based on index
const getIdColor = (index) => {
  const r = ((index * 37) % 7) * 35 + 40;
  const g = ((index * 59) % 7) * 35 + 40;
  const b = ((index * 83) % 7) * 35 + 40;
  return [r, g, b];
};

// Generates an SVG string with unique fill colors for fillable paths
const generateIdMapSvg = (svgString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');
  const svgEl = doc.documentElement;
  
  const fillables = svgEl.querySelectorAll('.fillable');
  fillables.forEach((el, index) => {
    const [r, g, b] = getIdColor(index);
    const colorHex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    el.setAttribute('fill', colorHex);
  });
  
  const serializer = new XMLSerializer();
  return serializer.serializeToString(doc);
};

// Generates an SVG string with fill="none" to isolate outlines
const generateOutlineSvg = (svgString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');
  const svgEl = doc.documentElement;
  
  const fillables = svgEl.querySelectorAll('.fillable');
  fillables.forEach(el => {
    el.setAttribute('fill', 'none');
  });
  
  const serializer = new XMLSerializer();
  return serializer.serializeToString(doc);
};

export default function CanvasMask({ templateKey = 'flower', selectedColor, brushSize = 18 }) {
  const canvasRef = useRef(null);
  const idCanvasRef = useRef(null);
  const maskCanvasRef = useRef(null);
  const tempCanvasRef = useRef(null);
  const outlineImageRef = useRef(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeColorId, setActiveColorId] = useState(null);

  // Initialize templates on canvases
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const idCanvas = idCanvasRef.current;
    const idCtx = idCanvas.getContext('2d');

    const template = TEMPLATES[templateKey];
    if (!template) return;

    const rawSvg = template.svg;
    const idMapSvg = generateIdMapSvg(rawSvg);
    const outlineSvg = generateOutlineSvg(rawSvg);

    // Render visible SVG template (white background + black lines)
    const visibleImg = new Image();
    const visibleBlob = new Blob([rawSvg], { type: 'image/svg+xml;charset=utf-8' });
    const visibleUrl = URL.createObjectURL(visibleBlob);
    visibleImg.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(visibleImg, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(visibleUrl);
    };
    visibleImg.src = visibleUrl;

    // Render ID Map SVG to hidden canvas
    const idImg = new Image();
    const idBlob = new Blob([idMapSvg], { type: 'image/svg+xml;charset=utf-8' });
    const idUrl = URL.createObjectURL(idBlob);
    idImg.onload = () => {
      idCtx.clearRect(0, 0, idCanvas.width, idCanvas.height);
      idCtx.drawImage(idImg, 0, 0, idCanvas.width, idCanvas.height);
      URL.revokeObjectURL(idUrl);
    };
    idImg.src = idUrl;

    // Preload outline image for synchronous drawing on top
    const outlineImg = new Image();
    const outlineBlob = new Blob([outlineSvg], { type: 'image/svg+xml;charset=utf-8' });
    const outlineUrl = URL.createObjectURL(outlineBlob);
    outlineImg.onload = () => {
      outlineImageRef.current = outlineImg;
      URL.revokeObjectURL(outlineUrl);
    };
    outlineImg.src = outlineUrl;

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
      playColorSound(); // Sound FX on draw start
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
    
    // Gradient Stroke Resolution
    let strokeStyle = selectedColor;
    if (selectedColor.startsWith('url(#grad-')) {
      const gradId = selectedColor.substring(5, selectedColor.length - 1);
      const grad = tempCtx.createLinearGradient(x - brushSize, y - brushSize, x + brushSize, y + brushSize);
      if (gradId === 'grad-sunset') {
        grad.addColorStop(0, '#ff5f6d'); grad.addColorStop(1, '#ffc371');
      } else if (gradId === 'grad-ocean') {
        grad.addColorStop(0, '#2193b0'); grad.addColorStop(1, '#6dd5ed');
      } else if (gradId === 'grad-rainbow') {
        grad.addColorStop(0, '#ee9ca7'); grad.addColorStop(1, '#ffdde1');
      } else if (gradId === 'grad-forest') {
        grad.addColorStop(0, '#11998e'); grad.addColorStop(1, '#38ef7d');
      } else if (gradId === 'grad-magic') {
        grad.addColorStop(0, '#8a2387'); grad.addColorStop(1, '#e94057');
      } else if (gradId === 'grad-cotton') {
        grad.addColorStop(0, '#ff758c'); grad.addColorStop(1, '#ff7eb3');
      }
      strokeStyle = grad;
    }

    tempCtx.strokeStyle = strokeStyle;
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
    if (outlineImageRef.current) {
      ctx.drawImage(outlineImageRef.current, 0, 0, canvas.width, canvas.height);
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
