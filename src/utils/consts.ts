export const HIDFilters = [
  { vendorId: 0x2d80, productId: 0x8001 },
  { vendorId: 0x2d80, productId: 0x8002 },
];

export const start: [number, Uint8Array] = [0x21, new Uint8Array([0x01, 0x00])];
