import type { Platforms } from './types';

export const HIDFilters = [
  { vendorId: 0x2d80, productId: 0x8001 },
  { vendorId: 0x2d80, productId: 0x8002 },
];

export class Constants {
  // used for initializing connection on server to board
  static vendorId = 0x2d80;
  static productIds = [0x8001, 0x8002];

  // Chessnut board may report multiple HID devices when plugged in
  // one will throw an error when connected to because it's treated
  // as a keyboard device, which is disabled by OS for security purposes
  // the correct one to connect to will have this as its usagePage field
  static usagePage = 0xff00;

  private static data = {
    realtime: [0x21, 0x01, 0x00],
    ledHeader: [0x0a, 0x08],
  };

  static getRealtimeHeaders() {
    return {
      Web: this.convertReport(this.data.realtime, 'Web') as [number, Uint8Array],
      Server: this.data.realtime,
    };
  }

  /**
   * Reports have a different format but largely the same data.
   * This function accepts data and a platform and prepares the
   * data to be sent to the board.
   */
  private static convertReport(data: number[], platform: Platforms) {
    if (platform === 'Web') {
      return [data.at(0), new Uint8Array(data.slice(1))];
    } else {
      return data;
    }
  }
}
