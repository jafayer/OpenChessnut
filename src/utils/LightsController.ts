import type { Board } from "./types";
import { isWeb, isServer } from "./types";
import { Constants } from "./consts";
export class LightsController {
    cooldown: number | undefined;
    device: Board;

    constructor(device: Board) {
        this.cooldown = undefined;
        this.device = device;
    }

    /**
     * Sets LEDs for every square given as an argument to the board.
     * 
     * For example, `set('a1')` would turn on the a1 square light.
     * 
     * Call without any arguments to turn off all lights.
     * @param squares A list of squares of any length to turn the LEDs on for.
     * Can be either a list of squares 'a1'..'h8' or a list of indexes of squares 1,64. 
     */
    set(...squares: string[] | number[]): boolean {
        const now = new Date().getTime();
        if(this.cooldown && now - this.cooldown < 500) return false;
        
        // if array is strings, convert to numbers

        if(isWeb(this.device)) {
            
            return true;
        } else if(isServer(this.device)) {
            return false;
        }
        // this should be unreachable but including for typescript's benefit
        return false;
    }
}