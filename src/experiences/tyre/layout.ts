/**
 * Layout and timeline of Tyre. Pure and framework-free. Units are roughly
 * metres (the site is compressed); north is -Z, the mainland is east (+X),
 * the island city lies offshore to the west.
 *
 * Timeline value `t` runs from 0 to 4:
 *   0 = c. 1000 BC (the island city of King Hiram)
 *   1 = 332 BC (Alexander's mole reaches the walls)
 *   2 = c. 200 AD (Roman Tyre: the mole has silted into an isthmus; hippodrome, arch, aqueduct)
 *   3 = 1291 (after the Mamluk conquest the Roman city decays)
 *   4 = today (a peninsula covered by the modern town, with the Al-Bass ruins excavated)
 */
import { seeded } from '../../lib/seeded'
import { row, rowPairs, type FieldColumn } from '../shared/fieldColumns'
import { builtThenLost, clamp01, phase } from '../shared/phase'

export const TIMELINE_MAX = 4

export const ISLAND = { center: [-240, 0] as [number, number], rx: 130, rz: 100, wallHeight: 9 }
export const MOLE = { length: 130, minWidth: 10, maxWidth: 170 }
export const TEMPLE = { center: [-255, -25] as [number, number], size: [30, 10, 18] as [number, number, number] }
export const SIEGE_TOWERS: Array<[number, number]> = [
  [-104, -13],
  [-104, 13],
]
export const ROAD = { from: 80, to: 330, halfWidth: 6 }
export const ARCH = { x: 200, width: 22, height: 19, depth: 7, opening: 7.5 }
export const HIPPODROME = { center: [260, 120] as [number, number], length: 200, width: 70, standDepth: 9, seatHeight: 6 }
export const AQUEDUCT = { from: [200, -90] as [number, number], to: [430, -150] as [number, number] }

export interface Building {
  x: number
  z: number
  w: number
  d: number
  h: number
}

function scatter(seed: number, count: number, pick: (rand: () => number) => [number, number] | null, size: [number, number], height: [number, number]): Building[] {
  const rand = seeded(seed)
  const list: Building[] = []
  let guard = 0
  while (list.length < count && guard++ < count * 30) {
    const p = pick(rand)
    if (!p) continue
    list.push({
      x: p[0],
      z: p[1],
      w: size[0] + rand() * (size[1] - size[0]),
      d: size[0] + rand() * (size[1] - size[0]),
      h: height[0] + rand() * (height[1] - height[0]),
    })
  }
  return list
}

const onIsland = (rand: () => number): [number, number] | null => {
  const x = (rand() - 0.5) * 2 * (ISLAND.rx - 14)
  const z = (rand() - 0.5) * 2 * (ISLAND.rz - 14)
  if ((x / (ISLAND.rx - 14)) ** 2 + (z / (ISLAND.rz - 14)) ** 2 > 1) return null
  if (Math.hypot(x - (TEMPLE.center[0] - ISLAND.center[0]), z - (TEMPLE.center[1] - ISLAND.center[1])) < 26) return null
  return [ISLAND.center[0] + x, ISLAND.center[1] + z]
}

/** Houses of the Phoenician and Roman island city. */
export const ANCIENT_CITY = scatter(61, 110, onIsland, [6, 11], [4, 7])
/** Palaetyrus on the mainland, abandoned during the siege. */
export const USHU = scatter(62, 30, (r) => [50 + r() * 110, (r() - 0.5) * 160], [6, 11], [4, 6])
/** The modern town over the old island and the isthmus. */
export const MODERN_TOWN = [
  ...scatter(63, 120, onIsland, [8, 14], [6, 13]),
  ...scatter(64, 60, (r) => [-120 + r() * 130, (r() - 0.5) * 140], [8, 14], [6, 12]),
]
/** Sarcophagi of the Al-Bass necropolis beside the Roman road. */
export const NECROPOLIS = scatter(65, 18, (r) => [95 + r() * 95, (r() < 0.5 ? -1 : 1) * (14 + r() * 26)], [2.6, 3.4], [1.4, 1.9])
export const BOATS: Array<[number, number]> = [
  [-150, -118],
  [-138, -124],
  [-165, -112],
]

const fallWindow: [number, number] = [2.3, 2.95]
const restoreWindow: [number, number] = [3.6, 3.95]

export const ROAD_ROWS: FieldColumn[][] = [-1, 1].map((side) =>
  row({
    from: [ROAD.from, side * ROAD.halfWidth],
    to: [ROAD.to, side * ROAD.halfWidth],
    spacing: 6,
    height: 7,
    radius: 0.6,
    build: [1.3, 1.9],
    fallWindow,
    fallChance: 0.85,
    restoreWindow,
    restoreChance: 0.8,
    seed: 71 + side,
  }),
)

/** Aqueduct piers, spanned by arches. */
export const AQUEDUCT_PIERS: FieldColumn[] = row({
  from: AQUEDUCT.from,
  to: AQUEDUCT.to,
  spacing: 7,
  height: 9,
  radius: 1.2,
  build: [1.5, 1.9],
  fallWindow,
  fallChance: 0.55,
  seed: 73,
})

export function pairsForRows(rows: FieldColumn[][]): Array<[number, number]> {
  const pairs: Array<[number, number]> = []
  let offset = 0
  for (const r of rows) {
    pairs.push(...rowPairs(offset, r.length))
    offset += r.length
  }
  return pairs
}

export interface TyreState {
  mole: number
  /** How far the mole has widened into an isthmus. */
  silt: number
  siegeTowers: number
  islandWalls: number
  ancientCity: number
  temple: number
  ushu: number
  seats: number
  arch: number
  necropolis: number
  modern: number
  boats: number
}

export function tyreState(t: number): TyreState {
  const roman = phase(t, 1.3, 1.95)
  const decay = phase(t, 2.4, 3.0)
  const restore = phase(t, 3.6, 3.95)
  const modern = phase(t, 3.5, 3.95)
  return {
    mole: phase(t, 0.35, 0.95),
    silt: phase(t, 1.0, 2.0),
    siegeTowers: builtThenLost(t, [0.8, 0.98], [1.05, 1.3]),
    islandWalls: clamp01(1 - 0.3 * phase(t, 0.9, 1.0) - 0.6 * phase(t, 2.5, 3.0) - 0.1 * modern),
    ancientCity: clamp01(1 - 0.75 * decay - 0.25 * modern),
    temple: 1 - phase(t, 1.6, 2.0),
    ushu: 1 - phase(t, 1.2, 1.8),
    seats: clamp01(roman * (1 - 0.7 * decay) + 0.25 * restore),
    arch: clamp01(roman * (1 - 0.4 * decay) + 0.4 * restore),
    necropolis: roman,
    modern,
    boats: phase(t, 3.6, 3.9),
  }
}

/** Width of the land link between the mainland and the island at time t. */
export function isthmusWidth(state: TyreState): number {
  return MOLE.minWidth + (MOLE.maxWidth - MOLE.minWidth) * state.silt
}
