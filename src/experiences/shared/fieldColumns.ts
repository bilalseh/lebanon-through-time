/**
 * Generic colonnades for the 3D experiences: each column is built during a
 * window, may topple during another and may be re-erected by archaeologists
 * later. Pure, so layouts can be unit tested.
 */
import { seeded } from '../../lib/seeded'
import { easeInQuad, easeOutCubic, phase } from './phase'

export type Window = [number, number]

export interface FieldColumn {
  x: number
  z: number
  baseY: number
  height: number
  radius: number
  build: Window
  fall?: Window
  restore?: Window
  /** Unit vector (x, z) the column falls toward. */
  fallDir: [number, number]
}

export interface FieldState {
  /** 0 = not built, 1 = full height. */
  build: number
  /** Radians from vertical. */
  tilt: number
}

export function fieldColumnState(c: FieldColumn, t: number): FieldState {
  const build = easeOutCubic(phase(t, c.build[0], c.build[1]))
  const fallen = c.fall ? easeInQuad(phase(t, c.fall[0], c.fall[1])) : 0
  const restored = c.restore ? easeOutCubic(phase(t, c.restore[0], c.restore[1])) : 0
  return { build, tilt: fallen * (1 - restored) * (Math.PI / 2) }
}

export function isUp(s: FieldState): boolean {
  return s.build >= 0.999 && s.tilt <= 0.001
}

export interface RowOptions {
  from: [number, number]
  to: [number, number]
  spacing: number
  baseY?: number
  height: number
  radius: number
  build: Window
  /** Window inside which columns that fall pick their moment. */
  fallWindow?: Window
  /** Share of columns that fall (0..1). */
  fallChance?: number
  restoreWindow?: Window
  /** Share of fallen columns that are re-erected (0..1). */
  restoreChance?: number
  seed: number
  /** Columns fall away from this point; defaults to the row's own line. */
  awayFrom?: [number, number]
}

/** A straight row of columns from one point to another. */
export function row(o: RowOptions): FieldColumn[] {
  const rand = seeded(o.seed)
  const dx = o.to[0] - o.from[0]
  const dz = o.to[1] - o.from[1]
  const length = Math.hypot(dx, dz)
  const count = Math.max(1, Math.round(length / o.spacing)) + 1
  const buildSpan = o.build[1] - o.build[0]
  return Array.from({ length: count }, (_, i) => {
    const k = count === 1 ? 0 : i / (count - 1)
    const x = o.from[0] + dx * k
    const z = o.from[1] + dz * k
    // Build along the row with a little stagger.
    const start = o.build[0] + buildSpan * 0.5 * k
    const build: Window = [start, start + buildSpan * 0.5]
    const falls = o.fallWindow && rand() < (o.fallChance ?? 1)
    const fall: Window | undefined = falls
      ? (() => {
          const f0 = o.fallWindow![0] + rand() * (o.fallWindow![1] - o.fallWindow![0] - 0.2)
          return [f0, f0 + 0.2]
        })()
      : undefined
    const restore = fall && o.restoreWindow && rand() < (o.restoreChance ?? 0) ? o.restoreWindow : undefined
    let angle: number
    if (o.awayFrom) angle = Math.atan2(z - o.awayFrom[1], x - o.awayFrom[0]) + (rand() - 0.5) * 1.2
    else angle = Math.atan2(dx, -dz) + (rand() < 0.5 ? 0 : Math.PI) + (rand() - 0.5) * 0.8
    return {
      x,
      z,
      baseY: o.baseY ?? 0,
      height: o.height,
      radius: o.radius,
      build,
      fall,
      restore,
      fallDir: [Math.cos(angle), Math.sin(angle)],
    }
  })
}

/** Index pairs of neighbouring columns in one row, for lintels or arches. */
export function rowPairs(offset: number, count: number): Array<[number, number]> {
  return Array.from({ length: count - 1 }, (_, i) => [offset + i, offset + i + 1])
}
