/**
 * Layout and timeline of the Cedars of God above Bsharri. Pure and
 * framework-free. Units are roughly metres; north is -Z, the high ridge is to
 * the east (+X) and the Qadisha gorge drops away to the west.
 *
 * Timeline value `t` runs from 0 to 4:
 *   0 = c. 3000 BC (forest over the whole mountainside)
 *   1 = c. 1000 BC (timber felled for Egypt, Phoenician ships and Solomon's temple)
 *   2 = 138 AD (Hadrian's boundary markers protect what remains)
 *   3 = 1876 (only the grove is left; a wall is built around it)
 *   4 = today (protected, replanted, UNESCO-listed)
 */
import { seeded } from '../../lib/seeded'
import { builtThenLost, easeOutCubic, phase } from '../shared/phase'

export const TIMELINE_MAX = 4
export const GROVE = { radius: 110 }
export const WALL = { rx: 128, rz: 108, height: 1.6 }
export const CHAPEL = { position: [-28, 22] as [number, number], size: [9, 5, 7] as [number, number, number] }
export const HADRIAN_RADIUS = 260
export const HADRIAN_MARKERS: Array<[number, number]> = Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * Math.PI * 2 + 0.3
  return [Math.cos(a) * HADRIAN_RADIUS, Math.sin(a) * HADRIAN_RADIUS]
})
export const TREE_HEIGHT = 22

const smoothstep = (e0: number, e1: number, v: number) => {
  const k = Math.min(1, Math.max(0, (v - e0) / (e1 - e0)))
  return k * k * (3 - 2 * k)
}

/** Stylised terrain: a ridge rising to the east, a gorge to the west, gentle slopes between. */
export function groundHeight(x: number, z: number): number {
  const ridge = 420 * smoothstep(250, 850, x)
  const gorge = -170 * (1 - smoothstep(-550, -150, x)) * Math.exp(-((z / 180) ** 2))
  const slope = 0.12 * x
  const bumps = 6 * Math.sin(x * 0.02) * Math.cos(z * 0.017) + 4 * Math.sin(z * 0.05 + x * 0.01)
  return ridge + gorge + slope + bumps
}

export interface Cedar {
  x: number
  z: number
  y: number
  /** Relative size, 1 = a mature tree. */
  size: number
  /** Timeline value when the tree is felled; Infinity for survivors. */
  cut: number
  /** Timeline value when a replanted tree appears; -Infinity for the old forest. */
  planted: number
}

const canGrow = (x: number, z: number) => {
  const h = groundHeight(x, z)
  return h > -35 && h < 280
}

/** The dense grove at the valley head: the trees that survive to this day. */
export const GROVE_TREES: Cedar[] = (() => {
  const rand = seeded(81)
  const list: Cedar[] = []
  while (list.length < 380) {
    const a = rand() * Math.PI * 2
    const r = Math.sqrt(rand()) * (GROVE.radius - 6)
    const x = Math.cos(a) * r
    const z = Math.sin(a) * r
    if (Math.hypot(x - CHAPEL.position[0], z - CHAPEL.position[1]) < 10) continue
    list.push({ x, z, y: groundHeight(x, z), size: 0.85 + rand() * 0.5, cut: Infinity, planted: -Infinity })
  }
  return list
})()

/** The wider forest, felled from the outside in over four millennia. */
export const FOREST_TREES: Cedar[] = (() => {
  const rand = seeded(82)
  const list: Cedar[] = []
  const outer = 680
  while (list.length < 2400) {
    const x = (rand() - 0.5) * 2 * outer
    const z = (rand() - 0.5) * 2 * outer
    const d = Math.hypot(x, z)
    if (d < GROVE.radius + 4 || d > outer || !canGrow(x, z)) continue
    const far = (d - GROVE.radius) / (outer - GROVE.radius)
    const cut = 2.85 - 2.5 * far + (rand() - 0.5) * 0.35
    list.push({ x, z, y: groundHeight(x, z), size: 0.8 + rand() * 0.5, cut, planted: -Infinity })
  }
  return list
})()

/** Young cedars planted around the grove in recent decades. */
export const SAPLINGS: Cedar[] = (() => {
  const rand = seeded(83)
  const list: Cedar[] = []
  while (list.length < 450) {
    const a = rand() * Math.PI * 2
    const r = 135 + rand() * 200
    const x = Math.cos(a) * r
    const z = Math.sin(a) * r
    if (!canGrow(x, z)) continue
    list.push({ x, z, y: groundHeight(x, z), size: 0.28 + rand() * 0.18, cut: Infinity, planted: 3.45 + rand() * 0.4 })
  }
  return list
})()

export const ALL_TREES: Cedar[] = [...GROVE_TREES, ...FOREST_TREES, ...SAPLINGS]

/** Visible scale of a tree at time t (0 = absent). */
export function cedarScale(c: Cedar, t: number): number {
  const grown = c.planted === -Infinity ? 1 : easeOutCubic(phase(t, c.planted, c.planted + 0.3))
  const felled = c.cut === Infinity ? 0 : phase(t, c.cut - 0.08, c.cut + 0.04)
  return c.size * grown * (1 - felled)
}

export function standingCount(trees: Cedar[], t: number): number {
  return trees.filter((c) => cedarScale(c, t) > c.size * 0.5).length
}

export interface Building {
  x: number
  z: number
  w: number
  d: number
  h: number
}

/** Bsharri, on the slope below the grove to the south-west. */
export const TOWN: Building[] = (() => {
  const rand = seeded(84)
  return Array.from({ length: 70 }, () => ({
    x: -470 + rand() * 170,
    z: 220 + rand() * 150,
    w: 7 + rand() * 6,
    d: 7 + rand() * 6,
    h: 5 + rand() * 4,
  }))
})()

/** Felled trunks waiting to be hauled down to the coast. */
export const LOGS: Array<[number, number, number]> = (() => {
  const rand = seeded(85)
  return Array.from({ length: 14 }, () => [-420 + rand() * 260, (rand() - 0.5) * 500, rand() * Math.PI] as [number, number, number])
})()

export interface ForestState {
  markers: number
  wall: number
  chapel: number
  town: number
  logs: number
}

export function forestState(t: number): ForestState {
  return {
    markers: phase(t, 1.85, 2.0),
    wall: phase(t, 2.9, 3.0),
    chapel: phase(t, 2.8, 2.95),
    town: phase(t, 3.3, 3.8),
    logs: builtThenLost(t, [0.45, 0.8], [1.7, 2.1]),
  }
}
