/**
 * brushEngine.ts — Premium digital brush rendering engine.
 * Implements 8 distinct brush types for the Kids Learning Hub coloring app:
 * crayon, marker, pencil, watercolor, glitter, eraser, stamp, and fill (via TapToFill).
 */

interface GrainOffset {
  dx: number;
  dy: number;
}

/** Returns a tiny array of random offsets for crayon/pencil grain */
function grainOffsets(count: number): GrainOffset[] {
  const offsets: GrainOffset[] = [];
  for (let i = 0; i < count; i++) {
    offsets.push({ dx: (Math.random() - 0.5) * 2, dy: (Math.random() - 0.5) * 2 });
  }
  return offsets;
}

// ---------- Core draw function ----------

/**
 * Draws a single brush stroke segment from (prevX,prevY) → (x,y).
 */
export function drawStroke(
  ctx: CanvasRenderingContext2D,
  prevX: number,
  prevY: number,
  x: number,
  y: number,
  color: string,
  size: number,
  brushType: string
): void {
  const resolvedColor = resolveColor(ctx, prevX, prevY, x, y, color, size);

  switch (brushType) {
    case 'crayon':     drawCrayon(ctx, prevX, prevY, x, y, resolvedColor, size); break;
    case 'marker':     drawMarker(ctx, prevX, prevY, x, y, resolvedColor, size); break;
    case 'pencil':     drawPencil(ctx, prevX, prevY, x, y, resolvedColor, size); break;
    case 'watercolor': drawWatercolor(ctx, prevX, prevY, x, y, resolvedColor, size); break;
    case 'glitter':    drawGlitter(ctx, x, y, resolvedColor, size); break;
    case 'eraser':     drawEraser(ctx, prevX, prevY, x, y, size); break;
    default:           drawMarker(ctx, prevX, prevY, x, y, resolvedColor, size);
  }
}

/** Stamps a shape at (x,y) — used by the Stamper tool */
export function drawStamp(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  size: number,
  stampShape: string
): void {
  const resolvedColor = resolveColor(ctx, x, y, x + 1, y + 1, color, size);
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = resolvedColor;
  ctx.strokeStyle = 'transparent';

  const s = size * 2; // stamp visual radius

  switch (stampShape) {
    case 'star':   drawStar(ctx, 0, 0, s, 5); break;
    case 'heart':  drawHeart(ctx, 0, 0, s);   break;
    case 'smiley': drawSmiley(ctx, 0, 0, s);  break;
    case 'flower': drawFlower(ctx, 0, 0, s);  break;
    case 'circle': drawCircleStamp(ctx, 0, 0, s); break;
    default:       drawStar(ctx, 0, 0, s, 5);
  }

  ctx.restore();
}

// ---------- Gradient resolver ----------
function resolveColor(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color: string,
  size: number
): string | CanvasGradient {
  if (!color.startsWith('url(#grad-')) return color;
  const gradId = color.substring(5, color.length - 1);
  const grad = ctx.createLinearGradient(x1 - size, y1 - size, x2 + size, y2 + size);
  const GRAD_STOPS: Record<string, [string, string]> = {
    'grad-sunset':  ['#ff5f6d', '#ffc371'],
    'grad-ocean':   ['#2193b0', '#6dd5ed'],
    'grad-rainbow': ['#ee9ca7', '#ffdde1'],
    'grad-forest':  ['#11998e', '#38ef7d'],
    'grad-magic':   ['#8a2387', '#e94057'],
    'grad-cotton':  ['#ff758c', '#ff7eb3'],
    'grad-fire':    ['#f83600', '#f9d423'],
    'grad-ice':     ['#a8edea', '#fed6e3'],
    'grad-galaxy':  ['#0f0c29', '#302b63'],
    'grad-lemon':   ['#f7971e', '#ffd200'],
    'grad-mint':    ['#00b09b', '#96c93d'],
    'grad-rose':    ['#f953c6', '#b91d73'],
  };
  const stops = GRAD_STOPS[gradId] || ['#999', '#ccc'];
  grad.addColorStop(0, stops[0]);
  grad.addColorStop(1, stops[1]);
  return grad;
}


// ---------- Individual brush implementations ----------

/** Crayon: grainy, waxy, slightly opaque with random grain particles */
function drawCrayon(
  ctx: CanvasRenderingContext2D,
  prevX: number,
  prevY: number,
  x: number,
  y: number,
  color: string | CanvasGradient,
  size: number
): void {
  ctx.save();
  ctx.globalAlpha = 0.55;
  ctx.lineWidth = size;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = color;
  
  // Apply visual crayon texture filter in browsers supporting it
  ctx.filter = 'url(#crayon-filter)';

  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(x, y);
  ctx.stroke();

  // Grain particles — scattered dots to simulate wax grain
  ctx.filter = 'none';
  ctx.globalAlpha = 0.12;
  const grains = grainOffsets(Math.floor(size * 2));
  grains.forEach(({ dx, dy }) => {
    const gx = x + dx * size * 0.8;
    const gy = y + dy * size * 0.8;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(gx, gy, Math.random() * (size * 0.25), 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

/** Marker: smooth, thick, fully opaque — simulates felt-tip saturation */
function drawMarker(
  ctx: CanvasRenderingContext2D,
  prevX: number,
  prevY: number,
  x: number,
  y: number,
  color: string | CanvasGradient,
  size: number
): void {
  ctx.save();
  ctx.globalAlpha = 0.92;
  ctx.lineWidth = size * 1.3;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = color;
  
  // Apply marker visual texture filter
  ctx.filter = 'url(#marker-filter)';

  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.restore();
}

/** Pencil: thin, textured, slightly lighter — builds up with repeated strokes */
function drawPencil(
  ctx: CanvasRenderingContext2D,
  prevX: number,
  prevY: number,
  x: number,
  y: number,
  color: string | CanvasGradient,
  size: number
): void {
  const pencilSize = Math.max(size * 0.45, 2);
  ctx.save();
  ctx.globalAlpha = 0.35;
  ctx.lineWidth = pencilSize;
  ctx.lineCap = 'round';
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(x, y);
  ctx.stroke();

  // Fine hair lines for pencil texture
  ctx.globalAlpha = 0.08;
  for (let i = 0; i < 3; i++) {
    const offset = (Math.random() - 0.5) * pencilSize * 3;
    ctx.beginPath();
    ctx.moveTo(prevX + offset, prevY + offset);
    ctx.lineTo(x + offset, y + offset);
    ctx.stroke();
  }
  ctx.restore();
}

/** Watercolor: semi-transparent, soft-edged, with a feathered glow */
function drawWatercolor(
  ctx: CanvasRenderingContext2D,
  prevX: number,
  prevY: number,
  x: number,
  y: number,
  color: string | CanvasGradient,
  size: number
): void {
  ctx.save();
  // Soft base wash
  ctx.globalAlpha = 0.18;
  ctx.lineWidth = size * 2.5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = color;
  ctx.shadowColor = typeof color === 'string' ? color : '#999';
  ctx.shadowBlur = size * 2;
  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(x, y);
  ctx.stroke();

  // Sharper inner stroke
  ctx.globalAlpha = 0.32;
  ctx.lineWidth = size * 0.8;
  ctx.shadowBlur = 0;
  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.restore();
}

/** Glitter: sparkling multi-dot trail — neon/metallic look */
function drawGlitter(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string | CanvasGradient,
  size: number
): void {
  const SPARKLE_COLORS = ['#ffe44d', '#ff70ff', '#70d6ff', '#b5ff70', '#ff9f45', '#ffffff'];
  ctx.save();
  const count = Math.floor(size * 3);
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * size * 1.5;
    const gx = x + Math.cos(angle) * radius;
    const gy = y + Math.sin(angle) * radius;
    const sparkColor = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
    const r = Math.random() * 2.5 + 0.5;

    ctx.globalAlpha = Math.random() * 0.8 + 0.2;
    ctx.fillStyle = sparkColor;
    ctx.shadowColor = sparkColor;
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(gx, gy, r, 0, Math.PI * 2);
    ctx.fill();
  }
  // Core glowing dot
  ctx.globalAlpha = 0.6;
  ctx.fillStyle = color;
  ctx.shadowColor = typeof color === 'string' ? color : '#999';
  ctx.shadowBlur = size;
  ctx.beginPath();
  ctx.arc(x, y, size * 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/** Eraser: clears pixels back to white */
function drawEraser(
  ctx: CanvasRenderingContext2D,
  prevX: number,
  prevY: number,
  x: number,
  y: number,
  size: number
): void {
  ctx.save();
  ctx.globalCompositeOperation = 'source-over';
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = size * 2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.restore();
}

// ---------- Stamp shape helpers ----------

function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, points: number): void {
  const inner = r * 0.45;
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points - Math.PI / 2;
    const dist = i % 2 === 0 ? r : inner;
    if (i === 0) ctx.moveTo(cx + Math.cos(angle) * dist, cy + Math.sin(angle) * dist);
    else ctx.lineTo(cx + Math.cos(angle) * dist, cy + Math.sin(angle) * dist);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function drawHeart(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number): void {
  const s = r * 0.85;
  ctx.beginPath();
  ctx.moveTo(cx, cy + s * 0.3);
  ctx.bezierCurveTo(cx, cy - s * 0.5, cx - s, cy - s * 0.5, cx - s, cy);
  ctx.bezierCurveTo(cx - s, cy + s * 0.55, cx, cy + s * 0.9, cx, cy + s);
  ctx.bezierCurveTo(cx, cy + s * 0.9, cx + s, cy + s * 0.55, cx + s, cy);
  ctx.bezierCurveTo(cx + s, cy - s * 0.5, cx, cy - s * 0.5, cx, cy + s * 0.3);
  ctx.fill();
}

function drawSmiley(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number): void {
  // Face
  ctx.fillStyle = '#ffe44d';
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  // Eyes
  ctx.fillStyle = '#333';
  ctx.beginPath();
  ctx.arc(cx - r * 0.3, cy - r * 0.2, r * 0.1, 0, Math.PI * 2);
  ctx.arc(cx + r * 0.3, cy - r * 0.2, r * 0.1, 0, Math.PI * 2);
  ctx.fill();
  // Smile
  ctx.strokeStyle = '#333';
  ctx.lineWidth = r * 0.1;
  ctx.beginPath();
  ctx.arc(cx, cy + r * 0.05, r * 0.45, 0.2, Math.PI - 0.2);
  ctx.stroke();
}

function drawFlower(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number): void {
  const petals = 6;
  const petalR = r * 0.45;
  for (let i = 0; i < petals; i++) {
    const angle = (i * Math.PI * 2) / petals;
    ctx.beginPath();
    ctx.arc(
      cx + Math.cos(angle) * petalR * 0.9,
      cy + Math.sin(angle) * petalR * 0.9,
      petalR,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
  // Center
  ctx.fillStyle = '#ffe44d';
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.3, 0, Math.PI * 2);
  ctx.fill();
}

function drawCircleStamp(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number): void {
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
}

// ---------- Brush metadata ----------

interface BrushInfo {
  label: string;
  labelId: string;
  cursor: string;
}

export const BRUSH_TYPES: Record<string, BrushInfo> = {
  fill:       { label: '🪣 Cat',       labelId: 'Isi Warna',   cursor: 'cell' },
  crayon:     { label: '🖍️ Krayon',   labelId: 'Krayon',      cursor: 'crosshair' },
  marker:     { label: '✏️ Spidol',   labelId: 'Spidol',      cursor: 'crosshair' },
  pencil:     { label: '✏️ Pensil',   labelId: 'Pensil',      cursor: 'crosshair' },
  watercolor: { label: '🖌️ Cat Air',  labelId: 'Cat Air',     cursor: 'crosshair' },
  glitter:    { label: '✨ Gliter',    labelId: 'Gliter',      cursor: 'crosshair' },
  eraser:     { label: '🧹 Penghapus',labelId: 'Penghapus',   cursor: 'cell' },
  stamp:      { label: '⭐ Stempel',   labelId: 'Stempel',     cursor: 'cell' },
};

export interface StampShape {
  id: string;
  label: string;
}

export const STAMP_SHAPES: StampShape[] = [
  { id: 'star',   label: '⭐' },
  { id: 'heart',  label: '❤️' },
  { id: 'smiley', label: '😊' },
  { id: 'flower', label: '🌸' },
  { id: 'circle', label: '⭕' },
];
