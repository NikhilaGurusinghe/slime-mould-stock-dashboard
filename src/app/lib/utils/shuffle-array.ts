// rng() must return a number in [0, 1)
// shuffles array in place
export default function shuffleArrayInPlace<T>(array: T[], rng: () => number): void {
  for (let i = array.length - 1; i > 0; i--) {
    const randomNumber = rng();

    if (!Number.isFinite(randomNumber) || randomNumber < 0 || randomNumber >= 1) {
      throw new RangeError("rng() must return a number in [0, 1)");
    }

    const j = Math.floor(randomNumber * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
