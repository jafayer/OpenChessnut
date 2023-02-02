import { ChessNut } from '../ChessNut';
import { convertNibbleToPiece, pieceMap } from '../utils/pieceConversion';
import { convertToNibbles } from '../utils/baseConversion';

test('Nibbles correctly converts', () => {
  const n1 = 0;
  const n2 = 4;
  const n3 = 16;
  const n4 = 256;
  expect(convertToNibbles(n1, 2)).toEqual([0, 0]);
  expect(convertToNibbles(n2, 2)).toEqual([0, 4]);
  expect(convertToNibbles(n3, 2)).toEqual([1, 0]);
  expect(convertToNibbles(n4, 2)).toEqual([1, 0, 0]);
});

test('Nibbles correctly conver to piece', () => {
  const p1 = convertNibbleToPiece(0);
  const p2 = convertNibbleToPiece(2);
  const p3 = convertNibbleToPiece(14);
  expect(p1).toEqual('');
  expect(p2).toEqual('k');
  expect(p3).toEqual('');
});
