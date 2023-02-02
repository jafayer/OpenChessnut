import type { PieceString } from './types';
export const pieceMap = new Map<number, PieceString>([
  [0, ''],
  [7, 'P'],
  [9, 'B'],
  [10, 'N'],
  [6, 'R'],
  [11, 'Q'],
  [12, 'K'],
  [4, 'p'],
  [3, 'b'],
  [5, 'n'],
  [8, 'r'],
  [1, 'q'],
  [2, 'k'],
]);

export function convertNibbleToPiece(n: number) {
  const piece = pieceMap.get(n);
  return piece ? piece : '';
}
