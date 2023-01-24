import { connectHID } from './server/connect';

const device = connectHID();
if (device) {
  device?.on('data', console.log);
  device?.write([0x21, 0x01, 0x00]);
}
