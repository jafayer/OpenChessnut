import type { HID } from 'node-hid';
import type { Platforms } from '../utils/types';
import { Constants } from '../utils/consts';
import { convertToBytes } from '../utils/baseConversion';

type device = HIDDevice | HID;

export class Chessnut {
  device;
  platform: Platforms;

  constructor(d: HID | HIDDevice) {
    this.device = d;
    this.platform = isWeb(this.device) ? 'Web' : 'Server';
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

  private async listen() {
    if (isWeb(this.device)) {
      this.device.addEventListener('inputreport', (event) => {
        const { data, reportId } = event;
        const { productId } = event.device;
        if (reportId === 1 && Constants.productIds.includes(productId)) {
          // set board state
        }
      });
    } else if (isServer(this.device)) {
      this.device.on('data', (event) => {
        // check that it's the correct board event
      });
    }
  }

  private convertToBytes = convertToBytes;
}

function isWeb(board: HIDDevice | HID): board is HIDDevice {
  return (board as HIDDevice).sendReport !== undefined;
}

function isServer(board: HIDDevice | HID): board is HID {
  return (board as HID).write !== undefined;
}
