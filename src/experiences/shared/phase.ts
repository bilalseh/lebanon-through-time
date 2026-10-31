export const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
export const easeInQuad = (v: number) => v * v
export const easeOutCubic = (v: number) => 1 - Math.pow(1 - v, 3)

/** Progress (0..1) of something that happens between two timeline values. */
export function phase(t: number, start: number, end: number): number {
  return clamp01((t - start) / (end - start))
}

/** Something that is built between two moments and later destroyed between two others. */
export function builtThenLost(t: number, build: [number, number], loss: [number, number]): number {
  return phase(t, build[0], build[1]) * (1 - phase(t, loss[0], loss[1]))
}
