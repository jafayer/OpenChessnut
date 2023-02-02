import type { HID } from 'node-hid';
import type { Platforms, PieceString } from '../utils/types';
import { isWeb, isServer } from '../utils/types';
import { Constants } from '../utils/consts';
import { convertToNibbles } from '../utils/baseConversion';
import { BehaviorSubject } from 'rxjs';
import { convertNibbleToPiece } from '../utils/pieceConversion';
import { LightsController } from '../utils/LightsController';

type device = HIDDevice | HID;

export class ChessNut {
  device;
  platform: Platforms;
  state: BehaviorSubject<PieceString[]>;
  lights: LightsController;

  constructor(d: HID | HIDDevice) {
    this.device = d;
    this.platform = isWeb(this.device) ? 'Web' : 'Server';
    this.open();
    this.state = new BehaviorSubject<PieceString[]>([]);
    this.lights = new LightsController(this.device);
  }

  private async open() {
    const headers = Constants.getRealtimeHeaders();
    if (isWeb(this.device)) {
      await this.device.sendReport(headers.Web[0], headers.Web[1]);
    } else if (isServer(this.device)) {
      await this.device.sendFeatureReport(headers.Server);
    }
  }

  async listen() {
    if (isWeb(this.device)) {
      this.device.addEventListener('inputreport', (event) => {
        const { data, reportId } = event;
        const { productId } = event.device;
        if (reportId === 1 && Constants.productIds.includes(productId)) {
          // UIarr is h8..a1
          const uiarr = new Uint8Array(data.buffer).slice(1, 33);
          const nibbles = this.extractNibbles(uiarr);
          const pieces = nibbles.map(convertNibbleToPiece).reverse();
          this.state.next(pieces);
        }
      });
    } else if (isServer(this.device)) {
      this.device.on('data', (event) => {
        const uiarr = new Uint8Array(event);
        if (uiarr.length === 63) {
          // uiarr is h8..a1
          const nibbles = this.extractNibbles(uiarr.slice(2, 34));
          const pieces = nibbles.map(convertNibbleToPiece).reverse();
          this.state.next(pieces);
        }
      });
    }
  }

  private extractNibbles(uiarr: Uint8Array): number[] {
    const arr = Array.from(uiarr);
    // every Nibble should represent two pieces
    const nibbleArr = arr.map((byte) => convertToNibbles(byte, 2, false));
    return nibbleArr.flat();
  }
}