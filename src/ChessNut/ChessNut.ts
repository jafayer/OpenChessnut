import type { HID } from 'node-hid';
import type { Platforms } from '../utils/types';
import { Constants } from '../utils/consts';

type device = HIDDevice | HID;

export class Chessnut {
  device;
  platform: Platforms;

  constructor(device: HID | HIDDevice) {
    this.device = device;
    this.platform = isWeb(device) ? 'Web' : 'Server';
    this.open();
  }
  
  private async open() {
    const headers = Constants.getRealtimeHeaders();
    if (isWeb(this.device)) {
      await this.device.sendReport(headers.Web[0], headers.Web[1]);
    } else if (isServer(this.device)) {
      await this.device.sendFeatureReport(headers.Server);
    }
  }

  private extractNibbles(uiarr: Uint8Array): Array<number> {
    const arr = Array.from(uiarr);
    const stuff = arr.map((byte) => {
      return this.convertToNibbles(byte, 2, false);
    });

    return stuff.flat();
  }

  private convertToBase =
    (base: number) =>
    (number: number, minLength: number, bigEndian: boolean = true) => {
      let arr = [];
      while (number > 0) {
        const remainder = number % base;
        number = Math.floor(number / base);

        arr.push(remainder);
      }

      while (arr.length < minLength) {
        arr.push(0);
      }

      if (bigEndian) {
        return arr.reverse();
      } else {
        return arr;
      }
    };

  private convertToBytes = this.convertToBase(256);

  private convertToNibbles = this.convertToBase(16);

  private convertToBinary = this.convertToBase(2);
}

function isWeb(board: HIDDevice | HID): board is HIDDevice {
  return (board as HIDDevice).sendReport !== undefined;
}

function isServer(board: HIDDevice | HID): board is HID {
  return (board as HID).write !== undefined;
}