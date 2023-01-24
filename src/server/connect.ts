import * as HID from 'node-hid';
import { Constants, HIDFilters } from '../utils/consts';

export function connectHID(callback?: CallableFunction) {
  const devices = HID.devices();
  const deviceInfo = devices.find((device) => isValidBoard(device));
  if (deviceInfo && deviceInfo.path) {
    const device = new HID.HID(deviceInfo.path);
    if (callback) {
      return callback(device);
    }
    return device;
  } else {
    if (callback) {
      return callback(undefined);
    }
    return undefined;
  }
}

function checkVendor(device: HID.Device) {
  return device.vendorId === Constants.vendorId;
}

function checkProductId(device: HID.Device) {
  return Constants.productIds.includes(device.productId);
}

function checkUsagePage(device: HID.Device) {
  return device.usagePage === Constants.usagePage;
}

function isValidBoard(device: HID.Device) {
  return checkVendor(device) && checkProductId(device) && checkUsagePage(device);
}
