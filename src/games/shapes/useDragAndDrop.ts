import { useCallback } from 'react';

interface Point {
  x: number;
  y: number;
}

interface TargetHitbox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const useDragAndDrop = () => {
  const getDistance = useCallback((p1: Point, p2: Point) => {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }, []);

  const evaluateSnap = useCallback((
    dragPos: Point,
    targets: TargetHitbox[],
    snapRadius: number = 50
  ) => {
    for (const target of targets) {
      // Calculate target center coordinate
      const targetCenter = {
        x: target.x + target.width / 2,
        y: target.y + target.height / 2
      };

      const dist = getDistance(dragPos, targetCenter);
      
      if (dist < snapRadius) {
        return {
          snapped: true,
          targetId: target.id,
          snapX: targetCenter.x,
          snapY: targetCenter.y
        };
      }
    }

    return { snapped: false, targetId: null, snapX: 0, snapY: 0 };
  }, [getDistance]);

  return { getDistance, evaluateSnap };
};
export type { Point, TargetHitbox };
