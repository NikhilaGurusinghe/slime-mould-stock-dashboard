const seedrandom = require("seedrandom");

// do not include #
// input should look like "ffffff" not "#ffffff"
function hexToRGB(
  hexColour: string,
): [red: number, green: number, blue: number] {
  // https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
  const [r, g, b] = Uint8Array.fromHex(hexColour);
  return [r, g, b];
}

// needs to have # appended to front
// outputs "ffffff" not "#ffffff"
function RGBToHex(red: number, green: number, blue: number): string {
  const bytes = new Uint8Array([red, green, blue]);

  return bytes.toHex();
}

// https://stackoverflow.com/questions/43044/algorithm-to-randomly-generate-an-aesthetically-pleasing-color-palette
// returns hex string of colour outputs "ffffff" not "#ffffff"
export function randomColourFromString(
  seed: string,
  tintColourHex?: string,
): string {
  const prng: () => number = seedrandom(seed);

  let red: number = Math.floor(prng() * 256);
  let green: number = Math.floor(prng() * 256);
  let blue: number = Math.floor(prng() * 256);

  if (tintColourHex !== undefined) {
    const [tintR, tintG, tintB] = hexToRGB(tintColourHex);

    red = (red + tintR) / 2;
    green = (green + tintG) / 2;
    blue = (blue + tintB) / 2;
  }

  return RGBToHex(red, green, blue);
}
