export function extractNibbles(uiarr: Uint8Array): number[] {
  const arr = Array.from(uiarr);
  const stuff = arr.map((byte) => {
    return convertToNibbles(byte, 2, false);
  });

  return stuff.flat();
}

/**
 * A higher-order function that takes a base and returns a function to
 * convert a number into an array representation in that base
 * @param base The base to convert to
 * @returns function to convert a number to an array representing the base
 */
const getConvertToBaseFn =
  (base: number) =>
  /**
   *
   * @param num the number to convert into `base`
   * @param minLength minimum length of the resulting array, with padded 0s added
   * @param bigEndian whether the result is bigEndian or littleEndian
   * @returns an array representing `number` in base `base`
   */
  (num: number, minLength: number, bigEndian: boolean = true) => {
    function convertToBase(n: number, prev: number[] = []): number[] {
      if (n > 0) {
        const remainder = n % base;
        return convertToBase(Math.floor(n / base), [...prev, remainder]);
      } else {
        return prev;
      }
    }

    const conversion = convertToBase(num);
    while (conversion.length < minLength) {
      conversion.push(0);
    }

    if (bigEndian) {
      return conversion.reverse();
    } else {
      return conversion;
    }
  };

export const convertToBytes = getConvertToBaseFn(256);

export const convertToNibbles = getConvertToBaseFn(16);
