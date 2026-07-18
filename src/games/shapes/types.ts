export type ShapesGameMode = 
  | 'menu' 
  | 'leaf-sort' 
  | 'shape-web' 
  | 'shape-puzzle' 
  | 'mixing';

export interface LeafPiece {
  id: string;
  color: string;
  originalX: number;
  originalY: number;
  x: number;
  y: number;
  isSorted: boolean;
}

export interface BasketTarget {
  id: string;
  color: string;
  hex: string;
  x: number;
  y: number;
  width: number;
  height: number;
}
