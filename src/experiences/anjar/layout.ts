/**
 * Layout and timeline of Umayyad Anjar. Pure and framework-free.
 * Units are roughly metres; north is -Z. The city is a walled rectangle with
 * two colonnaded streets crossing at a tetrapylon.
 *
 * Timeline value `t` runs from 0 to 4:
 *   0 = 705 (the caliph's surveyors mark out a city on the Bekaa plain)
 *   1 = 715 (the city is complete)
 *   2 = 750 (abandoned after the fall of the Umayyads)
 *   3 = 1900 (buried and forgotten)
 *   4 = today (excavated since 1949, with columns and arcades re-erected)
 */
import { seeded } from '../../lib/seeded'
import { builtThenLost, clamp01, phase } from '../shared/phase'
import { row, rowPairs, type FieldColumn } from '../shared/fieldColumns'

export const TIMELINE_MAX = 4

export const WALL = { width: 310, depth: 370, height: 7, thickness: 2.5 }
export const HALF_W = WALL.width / 2
export const HALF_D = WALL.depth / 2
export const GATE_WIDTH = 8
export const STREET_HALF = 5

/** Round corner towers and half-round towers along the walls: [x, z, radius]. */
export const TOWERS: Array<[number, number, number]> = (() => {
  const list: Array<[number, number, number]> = []
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) list.push([sx * HALF_W, sz * HALF_D, 5.5])
  for (let z = -HALF_D + 46; z < HALF_D - 20; z += 46) {
    if (Math.abs(z) < 12) continue
    list.push([-HALF_W, z, 3.5], [HALF_W, z, 3.5])
  }
  for (let x = -HALF_W + 39; x < HALF_W - 20; x += 39) {
    if (Math.abs(x) < 12) continue
    list.push([x, -HALF_D, 3.5], [x, HALF_D, 3.5])
  }
  return list
})()

export const PALACE = { center: [78, 92] as [number, number], size: [70, 8, 80] as [number, number, number], court: 34 }
export const MOSQUE = { center: [78, 30] as [number, number], size: [46, 6, 30] as [number, number, number] }
export const LITTLE_PALACE = { center: [78, -62] as [number, number], size: [40, 6, 40] as [number, number, number] }
export const BATHS = { center: [42, -150] as [number, number], size: [30, 6, 24] as [number, number, number] }

export interface Building {
  x: number
  z: number
  w: number
  d: number
  h: number
}

function scatter(seed: number, count: number, x: [number, number], z: [number, number], size: [number, number], height: [number, number]): Building[] {
  const rand = seeded(seed)
  return Array.from({ length: count }, () => ({
    x: x[0] + rand() * (x[1] - x[0]),
    z: z[0] + rand() * (z[1] - z[0]),
    w: size[0] + rand() * (size[1] - size[0]),
    d: size[0] + rand() * (size[1] - size[0]),
    h: height[0] + rand() * (height[1] - height[0]),
  }))
}

/** Houses in the western quarters, kept off the streets. */
export const HOUSES = [
  ...scatter(21, 26, [-140, -22], [-170, -20], [8, 14], [4, 5.5]),
  ...scatter(22, 26, [-140, -22], [20, 170], [8, 14], [4, 5.5]),
]
/** The modern Armenian town east of the ruins. */
export const MODERN_TOWN = scatter(23, 40, [200, 340], [-130, 130], [8, 13], [5, 7])

const STREET_COLUMN = { height: 5, radius: 0.45, spacing: 5 }
const fallWindow: [number, number] = [1.6, 3.0]
const restoreWindow: [number, number] = [3.55, 3.95]

function street(from: [number, number], to: [number, number], seed: number, restoreChance: number): FieldColumn[] {
  return row({
    from,
    to,
    spacing: STREET_COLUMN.spacing,
    height: STREET_COLUMN.height,
    radius: STREET_COLUMN.radius,
    build: [0.35, 0.85],
    fallWindow,
    fallChance: 0.78,
    restoreWindow,
    restoreChance,
    seed,
  })
}

/** Colonnades along both streets, each half a separate row so the crossing stays open. */
export const STREET_ROWS: FieldColumn[][] = [
  street([-STREET_HALF, -HALF_D + 10], [-STREET_HALF, -12], 31, 0.15),
  street([STREET_HALF, -HALF_D + 10], [STREET_HALF, -12], 32, 0.15),
  street([-STREET_HALF, 12], [-STREET_HALF, HALF_D - 10], 33, 0.15),
  street([STREET_HALF, 12], [STREET_HALF, HALF_D - 10], 34, 0.15),
  street([-HALF_W + 10, -STREET_HALF], [-12, -STREET_HALF], 35, 0.1),
  street([-HALF_W + 10, STREET_HALF], [-12, STREET_HALF], 36, 0.1),
  street([12, -STREET_HALF], [HALF_W - 10, -STREET_HALF], 37, 0.1),
  street([12, STREET_HALF], [HALF_W - 10, STREET_HALF], 38, 0.1),
]

/** Four pedestals, four columns each, at the crossing; all re-erected by the excavators. */
export const TETRAPYLON: FieldColumn[] = (() => {
  const rand = seeded(41)
  const list: FieldColumn[] = []
  for (const sx of [-1, 1])
    for (const sz of [-1, 1])
      for (const ox of [-1, 1])
        for (const oz of [-1, 1]) {
          const f0 = 1.7 + rand() * 1.0
          const angle = rand() * Math.PI * 2
          list.push({
            x: sx * 4.5 + ox * 1.4,
            z: sz * 4.5 + oz * 1.4,
            baseY: 1.5,
            height: 6.5,
            radius: 0.5,
            build: [0.5, 0.7],
            fall: [f0, f0 + 0.2],
            restore: [3.5, 3.8],
            fallDir: [Math.cos(angle), Math.sin(angle)],
          })
        }
  return list
})()

/** The palace courtyard arcade; the western side's upper storey is the famous re-erected one. */
export const PALACE_ARCADE: FieldColumn[] = (() => {
  const [cx, cz] = PALACE.center
  const half = PALACE.court / 2
  const common = { spacing: 4.25, height: 4.5, radius: 0.42, build: [0.45, 0.8] as [number, number], fallWindow, fallChance: 0.9, restoreWindow, restoreChance: 1 }
  return [
    ...row({ ...common, from: [cx - half, cz - half], to: [cx + half, cz - half], seed: 51 }),
    ...row({ ...common, from: [cx + half, cz - half], to: [cx + half, cz + half], seed: 52 }),
    ...row({ ...common, from: [cx + half, cz + half], to: [cx - half, cz + half], seed: 53 }),
    ...row({ ...common, from: [cx - half, cz + half], to: [cx - half, cz - half], seed: 54 }),
    ...row({ ...common, from: [cx - half, cz - half], to: [cx - half, cz + half], baseY: 5.5, height: 3.6, radius: 0.36, seed: 55 }),
  ]
})()

export function pairsForRows(rows: FieldColumn[][]): Array<[number, number]> {
  const pairs: Array<[number, number]> = []
  let offset = 0
  for (const r of rows) {
    pairs.push(...rowPairs(offset, r.length))
    offset += r.length
  }
  return pairs
}

export const PALACE_ROWS: FieldColumn[][] = (() => {
  const n = Math.round(PALACE.court / 4.25) + 1
  return [0, 1, 2, 3, 4].map((i) => PALACE_ARCADE.slice(i * n, (i + 1) * n))
})()

export interface CityState {
  /** The surveyed outline before building starts. */
  plan: number
  walls: number
  shops: number
  palace: number
  roofs: number
  houses: number
  modern: number
  trees: number
}

export function cityState(t: number): CityState {
  const decay = phase(t, 2.2, 3.0)
  const dig = phase(t, 3.5, 3.9)
  return {
    plan: 1 - phase(t, 0.2, 0.6),
    walls: clamp01(phase(t, 0.05, 0.55) * (1 - 0.65 * decay) + 0.25 * dig),
    shops: phase(t, 0.4, 0.8) * (1 - 0.8 * decay),
    palace: clamp01(phase(t, 0.3, 0.8) * (1 - 0.6 * decay) + 0.15 * dig),
    roofs: builtThenLost(t, [0.75, 0.95], [1.3, 1.9]),
    houses: phase(t, 0.5, 0.9) * (1 - 0.85 * decay),
    modern: phase(t, 3.5, 3.9),
    trees: phase(t, 3.3, 3.8),
  }
}
