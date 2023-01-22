import * as HID from "node-hid";
import { HIDFilters } from "../utils/consts";

export default function connect() {
    const device = new HID.HID(HIDFilters[0].vendorId, HIDFilters[0].productId) || new HID.HID(HIDFilters[1].vendorId, HIDFilters[1].productId);
    return device;
}