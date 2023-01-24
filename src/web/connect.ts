import { HIDFilters } from '../utils/consts';

export async function connectHID(callback?: CallableFunction) {
  const [device] = await navigator.hid.requestDevice({
    filters: HIDFilters,
  });

  if (device) {
    await device.open();

    if (callback) {
      callback(device);
    }

    return device;
  } else {
    if (callback) {
      callback(undefined);
    }

    return undefined;
  }
}
