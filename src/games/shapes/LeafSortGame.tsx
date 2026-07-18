import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Stage, Layer, Rect, Text, Image as KonvaImage, Group } from 'react-konva';
import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/types';
import { useShapesStore } from './shapesStore';
import { useDragAndDrop, TargetHitbox } from './useDragAndDrop';
import { usePreventIpadGestures } from '../../hooks/usePreventIpadGestures';
import { useSpeechSynthesis } from '../alphabet/useSpeechSynthesis';
import { LeafPiece, BasketTarget } from './types';
import { ExtendedWindow } from '../alphabet/types';

const BASKET_COLORS: Record<string, string> = {
  'green': '#4CAF50',
  'red': '#F44336',
  'yellow': '#FFEB3B',
  'brown': '#795548'
};

const COLOR_NAMES: Record<string, string> = {
  'green': 'Green',
  'red': 'Red',
  'yellow': 'Yellow',
  'brown': 'Brown'
};

export const LeafSortGame: React.FC = () => {
  const { incrementScore, score, setCompleted, isCompleted } = useShapesStore();
  const { speak } = useSpeechSynthesis();
  const { evaluateSnap } = useDragAndDrop();

  const containerRef = useRef<HTMLDivElement>(null);
  const basketRefs = useRef<Record<string, Konva.Rect>>({});
  
  // Custom image loader to avoid external dependencies
  const [leafImages, setLeafImages] = useState<Record<string, HTMLImageElement>>({});
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });
  const [leaves, setLeaves] = useState<LeafPiece[]>([]);

  // Prevent iPad multi-touch scrolling gestures
  usePreventIpadGestures(containerRef);

  // Load leaf textures
  useEffect(() => {
    const colors = ['red', 'green', 'yellow', 'brown'];
    const loaded: Record<string, HTMLImageElement> = {};
    let count = 0;

    colors.forEach((color) => {
      const img = new window.Image();
      img.src = `/apps/shapes/images/leaf-${color}.png`;
      img.onload = () => {
        loaded[color] = img;
        count++;
        if (count === colors.length) {
          setLeafImages(loaded);
          setImagesLoaded(true);
        }
      };
    });
  }, []);

  // Update stage sizes responsively
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth || 600,
          height: containerRef.current.clientHeight || 600
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

  // Initialize leaf models dynamically based on canvas dimensions
  const initLevel = useCallback(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const basketSize = Math.min(dimensions.width / 4.5, dimensions.height / 4.5, 120);
    const pileHeight = dimensions.height - basketSize - 50;
    const leafSize = Math.min(dimensions.width / 8, 110);

    const colors = ['red', 'green', 'yellow', 'brown'];
    const generated: LeafPiece[] = [];

    // Create 2 leaf instances per color
    colors.forEach((color) => {
      for (let i = 0; i < 2; i++) {
        const startX = Math.random() * (dimensions.width - leafSize) + (leafSize / 2);
        const startY = Math.random() * (pileHeight - leafSize) + (leafSize / 2);
        
        generated.push({
          id: `${color}-${i}`,
          color,
          originalX: startX,
          originalY: startY,
          x: startX,
          y: startY,
          isSorted: false
        });
      }
    });

    setLeaves(generated);
    setCompleted(false);
  }, [dimensions, setCompleted]);

  // Trigger init on load or resize
  useEffect(() => {
    if (imagesLoaded) {
      initLevel();
    }
  }, [imagesLoaded, dimensions.width, dimensions.height, initLevel]);

  // Speak prompt on launch
  useEffect(() => {
    speak('Sort the leaves!');
  }, [speak]);

  // Audio trigger
  const playSound = useCallback((isCorrect: boolean) => {
    const audio = new Audio(
      isCorrect
        ? '/apps/shapes/sounds/correct.mp3'
        : '/apps/shapes/sounds/wrong.mp3'
    );
    audio.volume = 0.5;
    audio.play().catch((err) => console.warn('Audio playback failed:', err));
  }, []);

  // Calculations for Basket coordinates
  const basketSize = Math.min(dimensions.width / 4.5, dimensions.height / 4.5, 120);
  const basketY = dimensions.height - basketSize - 30;
  const basketSpacing = (dimensions.width - (basketSize * 4)) / 5;

  const baskets: BasketTarget[] = ['green', 'red', 'yellow', 'brown'].map((color, index) => {
    const x = basketSpacing + index * (basketSize + basketSpacing);
    return {
      id: color,
      color,
      hex: BASKET_COLORS[color],
      x,
      y: basketY,
      width: basketSize,
      height: basketSize
    };
  });

  const handleDragStart = (e: KonvaEventObject<DragEvent>) => {
    // Bring dragged leaf to top level
    e.target.moveToTop();
  };

  const handleDragEnd = (e: KonvaEventObject<DragEvent>, leaf: LeafPiece) => {
    const node = e.target as Konva.Image;
    const leafColor = leaf.color;
    
    // Evaluate drop position coordinates
    const dropPosition = { x: node.x(), y: node.y() };
    
    // Format baskets to target hitboxes
    const targets: TargetHitbox[] = baskets.map((b) => ({
      id: b.id,
      x: b.x,
      y: b.y,
      width: b.width,
      height: b.height
    }));

    const result = evaluateSnap(dropPosition, targets, 60); // 60px radius check

    if (result.snapped && result.targetId === leafColor) {
      // CORRECT: Snap to basket center with a small random dispersion offset
      const dispersionX = (Math.random() - 0.5) * (basketSize / 2.5);
      const dispersionY = (Math.random() - 0.5) * (basketSize / 2.5);
      const snapTargetX = result.snapX + dispersionX;
      const snapTargetY = result.snapY + dispersionY;

      playSound(true);
      node.draggable(false);
      
      node.to({
        x: snapTargetX,
        y: snapTargetY,
        scaleX: 0.5,
        scaleY: 0.5,
        duration: 0.2,
        easing: Konva.Easings.EaseInOut
      });

      // Update state
      setLeaves((prev) => {
        const updated = prev.map((l) => (l.id === leaf.id ? { ...l, isSorted: true } : l));
        
        // Check win condition
        const allSorted = updated.every((l) => l.isSorted);
        if (allSorted) {
          setCompleted(true);
          
          const win = window as unknown as ExtendedWindow;
          if (win.StickerManager) {
            win.StickerManager.awardSticker('color_captain');
          }
          if (win.playConfettiEffect) {
            win.playConfettiEffect();
          }

          speak('Great job!', () => {
            setTimeout(() => {
              initLevel();
            }, 2500);
          });
        }

        return updated;
      });

      incrementScore();

    } else {
      // INCORRECT or dropped outside
      if (result.snapped) {
        // Drop on wrong basket: trigger shake animation feedback on that basket
        playSound(false);
        const basketRectNode = basketRefs.current[result.targetId];
        if (basketRectNode) {
          basketRectNode.to({
            scaleX: 1.08,
            scaleY: 1.08,
            duration: 0.1,
            easing: Konva.Easings.EaseOut,
            onFinish: () => {
              basketRectNode.to({
                scaleX: 1.0,
                scaleY: 1.0,
                duration: 0.15,
                easing: Konva.Easings.EaseIn
              });
            }
          });
        }
      }

      // Tween leaf back to its original spawned coordinates
      node.to({
        x: leaf.originalX,
        y: leaf.originalY,
        duration: 0.35,
        easing: Konva.Easings.ElasticEaseOut
      });
    }
  };

  return (
    <div className="w-full max-w-3xl bg-white rounded-3xl p-6 shadow-xl border-4 border-slate-100 flex flex-col items-center select-none">
      <div className="w-full flex items-center justify-between mb-4">
        <h2 className="text-2xl font-black text-slate-800">
          Leaf Color Sort! 🍁
        </h2>
        <div className="bg-amber-100 border border-amber-300 px-4 py-1.5 rounded-full">
          <span className="text-amber-950 font-bold">Score: {score}</span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="w-full aspect-square border-4 border-dashed border-slate-200 rounded-3xl bg-amber-50/20 overflow-hidden relative"
        style={{ touchAction: 'none' }}
      >
        {isCompleted && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-50 flex items-center justify-center animate-fadeIn">
            <div className="bg-white px-8 py-4 rounded-3xl shadow-2xl border-4 border-emerald-400 text-center animate-bounce">
              <span className="text-6xl mb-2 block">🌟</span>
              <span className="text-3xl font-black text-emerald-950">Awesome Work!</span>
            </div>
          </div>
        )}

        {imagesLoaded ? (
          <Stage width={dimensions.width} height={dimensions.height}>
            <Layer>
              {/* Render Baskets */}
              {baskets.map((basket) => (
                <Group key={basket.id}>
                  <Rect
                    ref={(el) => {
                      if (el) basketRefs.current[basket.id] = el;
                    }}
                    x={basket.x}
                    y={basket.y}
                    width={basket.width}
                    height={basket.height}
                    fill="#ffffff"
                    stroke={basket.hex}
                    strokeWidth={8}
                    cornerRadius={12}
                    opacity={0.9}
                    offsetX={0}
                    offsetY={0}
                  />
                  <Text
                    text={COLOR_NAMES[basket.color]}
                    x={basket.x}
                    y={basket.y + basket.height / 2.5}
                    width={basket.width}
                    fontSize={Math.max(14, basket.width / 7)}
                    fontFamily="'Comic Neue', sans-serif"
                    fontStyle="bold"
                    fill={basket.hex}
                    align="center"
                  />
                </Group>
              ))}

              {/* Render Leaves */}
              {leaves.map((leaf) => {
                const img = leafImages[leaf.color];
                const leafSize = Math.min(dimensions.width / 8, 110);
                
                if (!img) return null;

                return (
                  <KonvaImage
                    key={leaf.id}
                    image={img}
                    x={leaf.x}
                    y={leaf.y}
                    width={leafSize}
                    height={leafSize}
                    offsetX={leafSize / 2}
                    offsetY={leafSize / 2}
                    draggable={!leaf.isSorted}
                    onDragStart={handleDragStart}
                    onDragEnd={(e) => handleDragEnd(e, leaf)}
                  />
                );
              })}
            </Layer>
          </Stage>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-slate-500 animate-pulse">Loading textures...</span>
          </div>
        )}
      </div>

      <div className="w-full flex justify-center mt-6">
        <button
          onClick={initLevel}
          className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl shadow-md active:scale-95 transition-transform"
        >
          Reset Game 🔄
        </button>
      </div>
    </div>
  );
};
export default LeafSortGame;
