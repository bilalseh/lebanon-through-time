/**
 * Layout and timeline of the Sidon Sea Castle. Pure and framework-free.
 * Units are roughly metres; north is -Z, the open sea is to the west (-X).
 *
 * Timeline value `t` runs from 0 to 4:
 *   0 = c. 1200 (a rocky islet with the remains of a Phoenician temple)
 *   1 = 1228 (the Crusader castle is complete)
 *   2 = 1291 (the Mamluks dismantle the upper works)
 *   3 = c. 1650 (restored by Fakhr al-Din II, with a small domed mosque)
 *   4 = today
 */
import { seeded } from '../../lib/seeded'
import { builtThenLost, phase } from '../shared/phase'

export const TIMELINE_MAX = 4

export const ISLET = { center: [0, 0] as [number, number], radiusX: 40, radiusZ: 28, top: 2 }
export const PLATFORM = { size: [62, 2.5, 42] as [number, number, number], y: ISLET.top }
const DECK = PLATFORM.y + PLATFORM.size[1]

export const WEST_TOWER = { center: [-18, -2] as [number, number], size: [22, 14, 16] as [number, number, number], y: DECK }
export const EAST_TOWER = {
  center: [16, 2] as [number, number],
  size: [18, 6, 14] as [number, number, number],
  y: DECK,
  /** The upper storey sits on top of the lower one. */
  upperY: DECK + 6,
}
export const WALLS = { height: 5, y: DECK, north: -8, south: 8, length: 14 }
export const MOSQUE = { center: WEST_TOWER.center, y: DECK + WEST_TOWER.size[1], size: [8, 4, 8] as [number, number, number], domeRadius: 3.6 }

/** The arcaded stone bridge from the shore (east) to the islet. */
export const CAUSEWAY = { shoreX: 115, length: 80, width: 4, height: 4.5, z: 6, arches: 9 }

/** Granite columns reused as horizontal ties in the walls: [x, y, z]. */
export const ROMAN_COLUMNS: Array<[number, number, number]> = [
  [-29.5, DECK + 4, -6],
  [-29.5, DECK + 9, 1],
  [-14, DECK + 6, 6.5],
  [-22, DECK + 10, 6.5],
]

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

/** Old Sidon on the shore; it already existed before the castle. */
export const OLD_TOWN = scatter(3, 48, [128, 240], [-95, 95], [6, 12], [5, 9])
/** Tall modern blocks behind the old town. */
export const MODERN_TOWN = scatter(5, 26, [215, 330], [-150, 150], [10, 18], [18, 40])
export const KHAN = { center: [152, 42] as [number, number], size: [36, 9, 30] as [number, number, number] }
export const MINARET = { x: 172, z: -22, height: 24 }
export const BOATS: Array<[number, number]> = [
  [104, -28],
  [100, -18],
  [108, 30],
]
export const SHORE = { x: CAUSEWAY.shoreX }

export interface CastleState {
  causeway: number
  platform: number
  westTower: number
  eastLower: number
  eastUpper: number
  /** Height factor of the curtain walls: 1 = full, lowered after 1291, partly restored later. */
  walls: number
  mosque: number
  khan: number
  modern: number
  boats: number
  temple: number
}

export function castleState(t: number): CastleState {
  const lowered = phase(t, 1.5, 1.9)
  const restored = phase(t, 2.3, 2.8)
  return {
    temple: 1 - phase(t, 0.05, 0.3),
    causeway: phase(t, 0.05, 0.4),
    platform: phase(t, 0.25, 0.5),
    westTower: phase(t, 0.45, 0.8),
    eastLower: phase(t, 0.5, 0.75),
    eastUpper: builtThenLost(t, [0.7, 0.95], [1.5, 1.85]),
    walls: phase(t, 0.6, 0.9) * (1 - 0.5 * lowered + 0.35 * restored),
    mosque: phase(t, 2.5, 2.9),
    khan: phase(t, 2.35, 2.75),
    modern: phase(t, 3.45, 3.9),
    boats: phase(t, 3.3, 3.6),
  }
}
