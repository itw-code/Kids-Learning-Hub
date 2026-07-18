import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Stage, Layer, Text, Line, Star } from 'react-konva';
import { useNumbersStore } from './numbersStore';
import { usePreventIpadGestures } from '../../hooks/usePreventIpadGestures';
import { useSpeechSynthesis } from '../alphabet/useSpeechSynthesis';

import { KonvaEventObject } from 'konva/lib/types';

interface TracingStar {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fill: string;
  scale: number;
  opacity: number;
}

interface DrawLine {
  points: number[];
}

export const NumberTracing: React.FC = () => {
  const { tracingNumber, setTracingNumber, level } = useNumbersStore();
  const { speak } = useSpeechSynthesis();

  const containerRef = useRef<HTMLDivElement>(null);
  
  // Apply iPad scrolling prevention hook
  usePreventIpadGestures(containerRef);

  // Responsive dimensions
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });
  const [lines, setLines] = useState<DrawLine[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [stars, setStars] = useState<TracingStar[]>([]);
  
  const drawStartTime = useRef<number>(0);
  const isMouseDownRef = useRef(false);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth || 500,
          height: containerRef.current.clientHeight || 500
        });
      }
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Speak active number on change
  useEffect(() => {
    speak(String(tracingNumber));
    setLines([]); // Clear board
  }, [tracingNumber, speak]);

  // Star particle animator loop
  useEffect(() => {
    if (stars.length === 0) return;
    let animId = requestAnimationFrame(function animate() {
      setStars((prev) =>
        prev
          .map((s) => ({
            ...s,
            x: s.x + s.vx,
            y: s.y + s.vy,
            opacity: Math.max(0, s.opacity - 0.025),
            scale: s.scale * 1.015
          }))
          .filter((s) => s.opacity > 0)
      );
      animId = requestAnimationFrame(animate);
    });
    return () => cancelAnimationFrame(animId);
  }, [stars.length]);

  const triggerStarBurst = (x: number, y: number) => {
    const numStars = 15;
    const newStars: TracingStar[] = [];
    for (let i = 0; i < numStars; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const speed = Math.random() * 5 + 3;
      newStars.push({
        id: Math.random(),
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        fill: `hsl(${Math.random() * 360}, 95%, 70%)`,
        scale: 0.5,
        opacity: 1
      });
    }
    setStars((prev) => [...prev, ...newStars]);
  };

  // Drawing event handlers
  const handlePointerDown = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    setIsDrawing(true);
    isMouseDownRef.current = true;
    drawStartTime.current = Date.now();

    const stage = e.target.getStage();
    if (!stage) return;
    const pos = stage.getPointerPosition();
    if (pos) {
      setLines((prev) => [...prev, { points: [pos.x, pos.y, pos.x, pos.y] }]);
    }
  };

  const handlePointerMove = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (!isDrawing || !isMouseDownRef.current) return;

    const stage = e.target.getStage();
    if (!stage) return;
    const pos = stage.getPointerPosition();
    if (pos) {
      setLines((prev) => {
        if (prev.length === 0) return prev;
        const lastLine = prev[prev.length - 1];
        const newPoints = lastLine.points.concat([pos.x, pos.y]);
        return [...prev.slice(0, -1), { points: newPoints }];
      });
    }
  };

  const handlePointerUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    isMouseDownRef.current = false;

    const duration = Date.now() - drawStartTime.current;
    if (duration > 500) {
      // Trace complete, trigger burst in the center of the canvas
      triggerStarBurst(dimensions.width / 2, dimensions.height / 2);
    }
  };

  const clearCanvas = () => {
    setLines([]);
  };

  const nextNumber = () => {
    let nextNum = tracingNumber + 1;
    if (level === 1) {
      if (nextNum > 9) nextNum = 1;
    } else {
      if (nextNum > 19) nextNum = 10;
    }
    setTracingNumber(nextNum);
  };

  const prevNumber = () => {
    let prevNum = tracingNumber - 1;
    if (level === 1) {
      if (prevNum < 1) prevNum = 9;
    } else {
      if (prevNum < 10) prevNum = 19;
    }
    setTracingNumber(prevNum);
  };

  // Dynamic layout font sizing based on digits
  const isTwoDigits = tracingNumber >= 10;
  const fontMultiplier = isTwoDigits ? 0.45 : 0.75;
  const fontSize = Math.min(dimensions.width, dimensions.height) * fontMultiplier;

  return (
    <div className="w-full max-w-2xl bg-white rounded-3xl p-6 shadow-xl border-4 border-slate-100 flex flex-col items-center">
      {/* Mini-game header controls */}
      <div className="w-full flex items-center justify-between gap-4 mb-4 select-none">
        <button
          onClick={prevNumber}
          className="px-4 py-2 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-700 active:scale-95 transition-transform"
        >
          ⬅️ Prev
        </button>
        <span className="text-2xl font-black text-slate-800">
          Trace the Number!
        </span>
        <button
          onClick={nextNumber}
          className="px-4 py-2 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-700 active:scale-95 transition-transform"
        >
          Next ➡️
        </button>
      </div>

      {/* Konva drawing canvas container */}
      <div
        ref={containerRef}
        className="w-full aspect-square max-h-[500px] border-4 border-dashed border-slate-300 rounded-3xl bg-slate-50 overflow-hidden relative cursor-crosshair"
        style={{ touchAction: 'none' }}
      >
        <Stage
          width={dimensions.width}
          height={dimensions.height}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
        >
          {/* Masking Layer: Background Text is drawn first, lines are composite clipped atop it */}
          <Layer>
            {/* Guide number outline template */}
            <Text
              text={String(tracingNumber)}
              fontSize={fontSize}
              fontFamily="'Comic Neue', 'Outfit', sans-serif"
              fontStyle="bold"
              fill="#e6e6e6"
              width={dimensions.width}
              height={dimensions.height}
              align="center"
              verticalAlign="middle"
              listening={false}
            />

            {/* Trace lines clipped within number outline boundaries using source-atop */}
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="#38bdf8"
                strokeWidth={35}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation="source-atop"
              />
            ))}
          </Layer>

          {/* Particle Effects Layer */}
          <Layer>
            {stars.map((star) => (
              <Star
                key={star.id}
                x={star.x}
                y={star.y}
                numPoints={5}
                innerRadius={8}
                outerRadius={16}
                fill={star.fill}
                opacity={star.opacity}
                scaleX={star.scale}
                scaleY={star.scale}
              />
            ))}
          </Layer>
        </Stage>
      </div>

      {/* Toolbar actions */}
      <div className="w-full flex justify-center gap-4 mt-6 select-none">
        <button
          onClick={clearCanvas}
          className="px-8 py-3 bg-rose-500 hover:bg-rose-600 text-white text-lg font-bold rounded-2xl shadow-md active:scale-95 transition-transform"
        >
          Clear Screen 🧹
        </button>
      </div>
    </div>
  );
};
