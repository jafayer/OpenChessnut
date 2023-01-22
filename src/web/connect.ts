export async function connectHID() {
    const [device] = await navigator.hid.requestDevice({
        filters: [
            { vendorId: 0x2d80, productId: 0x8001 },
            { vendorId: 0x2d80, productId: 0x8002 },
        ],
    });

    return device;
}

export function connectBluetooth() {
    
}