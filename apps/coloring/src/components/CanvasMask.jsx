import React, { useRef, useEffect, useState, useCallback } from 'react';
import { TEMPLATES } from '../templates';
import { EXTRA_TEMPLATES } from '../templates-extra';
import { drawStroke, drawStamp, BRUSH_TYPES, STAMP_SHAPES } from '../utils/brushEngine';
import { playColorSound } from '../utils/audio';

const ALL_TEMPLATES = { ...TEMPLATES, ...EXTRA_TEMPLATES };

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
      
    const isOutline = id === 'outline' || className.includes('outline') || (fill === 'none' && !className.includes('fillable') && !el.classList.contains('fillable'));
    
    if (!isBackground && !isOutline) {
      el.classList.add('fillable');
    }
  });
  
  return new XMLSerializer().serializeToString(doc);
};

// Helper to generate distinct RGB values based on index (for ID map)
const getIdColor = (index) => {
  const r = ((index * 37) % 7) * 35 + 40;
  const g = ((index * 59) % 7) * 35 + 40;
  const b = ((index * 83) % 7) * 35 + 40;
  return [r, g, b];
};

const generateIdMapSvg = (svgString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');
  const svgEl = doc.documentElement;
  svgEl.querySelectorAll('.fillable').forEach((el, index) => {
    const [r, g, b] = getIdColor(index);
    const colorHex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    el.setAttribute('fill', colorHex);
  });
  return new XMLSerializer().serializeToString(doc);
};

const generateOutlineSvg = (svgString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');
  doc.documentElement.querySelectorAll('.fillable').forEach(el => el.setAttribute('fill', 'none'));
  return new XMLSerializer().serializeToString(doc);
};

export default function CanvasMask({
  templateKey = 'flower',
  selectedColor,
  brushSize = 18,
  brushType = 'crayon',
  stampShape = 'star',
}) {
  const canvasRef = useRef(null);
  const idCanvasRef = useRef(null);
  const maskCanvasRef = useRef(null);
  const tempCanvasRef = useRef(null);
  const outlineImageRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const prevPosRef = useRef({ x: 0, y: 0 });

  // ---- Canvas setup on template change ----
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const idCanvas = idCanvasRef.current;
    const idCtx = idCanvas.getContext('2d');

    const template = ALL_TEMPLATES[templateKey];
    if (!template) return;

    const rawSvg = prepareSvgString(template.svg);
    const idMapSvg = generateIdMapSvg(rawSvg);
    const outlineSvg = generateOutlineSvg(rawSvg);

    const loadSvgToCanvas = (svgStr, targetCtx, targetCanvas, onLoad) => {
      const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        if (targetCtx && targetCanvas) {
          targetCtx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
          targetCtx.drawImage(img, 0, 0, targetCanvas.width, targetCanvas.height);
        }
        URL.revokeObjectURL(url);
        if (onLoad) onLoad(img);
      };
      img.onerror = (err) => {
        console.error('loadSvgToCanvas loading error:', err);
        URL.revokeObjectURL(url);
      };
      img.src = url;
    };

    loadSvgToCanvas(rawSvg, ctx, canvas);
    loadSvgToCanvas(idMapSvg, idCtx, idCanvas);
    loadSvgToCanvas(outlineSvg, null, null, (img) => { outlineImageRef.current = img; });
  }, [templateKey]);

  // ---- ID map region mask ----
  const createMaskForRegion = useCallback((idCtx, targetR, targetG, targetB) => {
    const maskCanvas = maskCanvasRef.current;
    const maskCtx = maskCanvas.getContext('2d');
    const { width, height } = maskCanvas;
    maskCtx.clearRect(0, 0, width, height);

    const idData = idCtx.getImageData(0, 0, width, height);
    const maskData = maskCtx.createImageData(width, height);
    const threshold = 18;

    for (let i = 0; i < idData.data.length; i += 4) {
      const match =
        Math.abs(idData.data[i]     - targetR) <= threshold &&
        Math.abs(idData.data[i + 1] - targetG) <= threshold &&
        Math.abs(idData.data[i + 2] - targetB) <= threshold;
      if (match) {
        maskData.data[i] = maskData.data[i + 1] = maskData.data[i + 2] = 0;
        maskData.data[i + 3] = 255;
      }
    }
    maskCtx.putImageData(maskData, 0, 0);
  }, []);

  // ---- Coordinate normalisation ----
  const getCoords = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const { clientX, clientY } = e.touches ? e.touches[0] : e;
    return {
      x: ((clientX - rect.left) / rect.width)  * canvas.width,
      y: ((clientY - rect.top)  / rect.height) * canvas.height,
    };
  };

  // ---- Stamp handler (tap-only) ----
  const handleStamp = (e) => {
    const { x, y } = getCoords(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    playColorSound();
    ctx.save();
    drawStamp(ctx, x, y, selectedColor, brushSize, stampShape);
    ctx.restore();
    // Redraw outlines on top
    if (outlineImageRef.current) {
      ctx.drawImage(outlineImageRef.current, 0, 0, canvas.width, canvas.height);
    }
  };

  // ---- Draw start ----
  const startDrawing = (e) => {
    if (brushType === 'fill' || brushType === 'stamp') return; // handled separately
    const { x, y } = getCoords(e);
    const idCtx = idCanvasRef.current.getContext('2d');
    const [r, g, b] = (() => {
      const px = idCtx.getImageData(Math.round(x), Math.round(y), 1, 1).data;
      return [px[0], px[1], px[2]];
    })();
    const isOutline = r < 18 && g < 18 && b < 18;
    if (!isOutline) {
      createMaskForRegion(idCtx, r, g, b);
      const tempCtx = tempCanvasRef.current.getContext('2d');
      tempCtx.clearRect(0, 0, tempCanvasRef.current.width, tempCanvasRef.current.height);
      prevPosRef.current = { x, y };
      setIsDrawing(true);
      playColorSound();
    }
  };

  // ---- Drawing move ----
  const draw = (e) => {
    if (!isDrawing) return;
    const { x, y } = getCoords(e);
    const { x: prevX, y: prevY } = prevPosRef.current;

    const tempCanvas = tempCanvasRef.current;
    const tempCtx = tempCanvas.getContext('2d');
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Draw onto temp canvas using brush engine
    drawStroke(tempCtx, prevX, prevY, x, y, selectedColor, brushSize, brushType);

    // Clip temp canvas through mask onto main canvas
    const scratch = document.createElement('canvas');
    scratch.width = canvas.width;
    scratch.height = canvas.height;
    const scratchCtx = scratch.getContext('2d');
    scratchCtx.drawImage(tempCanvas, 0, 0);
    scratchCtx.globalCompositeOperation = 'destination-in';
    scratchCtx.drawImage(maskCanvasRef.current, 0, 0);
    ctx.drawImage(scratch, 0, 0);

    prevPosRef.current = { x, y };
  };

  // ---- Drawing end ----
  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (outlineImageRef.current) {
      ctx.drawImage(outlineImageRef.current, 0, 0, canvas.width, canvas.height);
    }
  };

  const isStampOrFill = brushType === 'stamp' || brushType === 'fill';

  return (
    <div
      className="canvas-wrapper"
      style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onTouchStart={isStampOrFill ? (brushType === 'stamp' ? handleStamp : undefined) : startDrawing}
        onTouchMove={isStampOrFill ? undefined : draw}
        onTouchEnd={isStampOrFill ? undefined : stopDrawing}
        onMouseDown={isStampOrFill ? (brushType === 'stamp' ? handleStamp : undefined) : startDrawing}
        onMouseMove={isStampOrFill ? undefined : draw}
        onMouseUp={isStampOrFill ? undefined : stopDrawing}
        onMouseLeave={isStampOrFill ? undefined : stopDrawing}
        style={{
          touchAction: 'none',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          borderRadius: '16px',
          maxWidth: '100%',
          maxHeight: '100%',
          backgroundColor: '#fff',
          cursor: BRUSH_TYPES[brushType]?.cursor || 'crosshair',
        }}
      />
      <canvas ref={idCanvasRef}   width={800} height={600} style={{ display: 'none' }} />
      <canvas ref={maskCanvasRef} width={800} height={600} style={{ display: 'none' }} />
      <canvas ref={tempCanvasRef} width={800} height={600} style={{ display: 'none' }} />
    </div>
  );
}
