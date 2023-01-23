import { HIDFilters, start } from "../utils/consts";

export async function connectHID(callback?: CallableFunction) {
    const [device] = await navigator.hid.requestDevice({
        filters: HIDFilters,
    });

    if(device) {
        await device.open();
        await device.sendReport(start[0], start[1]);

        if(callback) {
            callback(device);
        }
    
        return device;
    } else {
        if(callback) {
            callback(undefined);
        }

        return undefined;
    }
}