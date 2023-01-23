import * as HID from 'node-hid';
import { HIDFilters } from '../utils/consts';

export default function connect() {
  const devices = HID.devices();
  const deviceInfo = devices.find((d) => {
    return HIDFilters.some((params) => d.vendorId === params.vendorId && d.productId === params.productId);
  });
  if (deviceInfo && deviceInfo.path) {
    const device = new HID.HID(deviceInfo.path);
    return device;
  } else {
    return undefined;
  }
}
