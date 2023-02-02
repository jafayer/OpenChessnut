import type { HID } from 'node-hid';
export type Platforms = 'Web' | 'Server';
export type Board = HID | HIDDevice;

export type PieceString = '' | 'P' | 'B' | 'N' | 'R' | 'Q' | 'K' | 'p' | 'b' | 'n' | 'r' | 'q' | 'k';
export type PieceNumerals = 0 | 7 | 9 | 10 | 6 | 11 | 12 | 4 | 3 | 5 | 8 | 1 | 2;
