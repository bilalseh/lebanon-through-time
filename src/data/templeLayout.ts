/**
 * Pure layout + timeline logic for the temple complex.
 *
 * Everything here is deterministic and framework-free, so it can be unit tested
 * and reused by any renderer. Units are roughly metres. North is -Z, east is +X.
 *
 * Timeline value `t` runs from 0 to 3:
 *   0 = c. 60 AD (Temple of Jupiter complete)
 *   1 = c. 150 AD (Temple of Bacchus complete)
 *   2 = 1759 (centuries of earthquakes)
 *   3 = today
 */

export type TempleId = 'jupiter' | 'bacchus'
export type Side = 'north' | 'east' | 'south' | 'west'

export interface TempleSpec {
  id: TempleId
  center: [number, number]
  /** Columns along the long (east-west) sides, corners included. */
  longCount: number
  /** Columns along the short (north-south) sides, corners included. */
  shortCount: number
  spacingX: number
  spacingZ: number
  columnHeight: number
  columnRadius: number
  podium: { length: number; width: number; height: number }
  entablatureHeight: number
}

export interface ColumnSpec {
  id: string
  temple: TempleId
  /** Position around the perimeter, clockwise from the north-west corner. */
  ring: number
  side: Side
  /** Index along its side, counted from west (long sides) or north (short sides). */
  sideIndex: number
  x: number
  z: number
  baseY: number
  height: number
  radius: number
  survives: boolean
  /** Timeline value when the column starts to fall (Infinity if it survives). */
  fallStart: number
  /** Unit vector (x, z) the column falls toward. */
  fallDir: [number, number]
  /** Timeline value when construction starts (-Infinity if already built at t = 0). */
  buildStart: number
}

export interface ColumnState {
  /** 0 = not built, 1 = full height. */
  build: number
  /** Radians from vertical. 0 = standing, PI / 2 = lying on the ground. */
  tilt: number
}

export const TIMELINE_MAX = 3
export const FALL_DURATION = 0.22
export const BUILD_DURATION = 0.16

export const JUPITER: TempleSpec = {
  id: 'jupiter',
  center: [0, 0],
  longCount: 19,
  shortCount: 10,
  spacingX: 4.6,
  spacingZ: 5,
  columnHeight: 20,
  columnRadius: 1.1,
  podium: { length: 96, width: 60, height: 7 },
  entablatureHeight: 3,
}

export const BACCHUS: TempleSpec = {
  id: 'bacchus',
  center: [14, 72],
  longCount: 15,
  shortCount: 8,
  spacingX: 4.2,
  spacingZ: 4.4,
  columnHeight: 16,
  columnRadius: 0.85,
  podium: { length: 70, width: 40, height: 4 },
  entablatureHeight: 2.4,
}

/** The six standing columns of Jupiter sit on the south colonnade (simplified placement). */
export const JUPITER_SURVIVORS = { side: 'south' as Side, from: 3, to: 8 }

/** Small deterministic PRNG so the layout is identical on every load and in tests. */
export function seeded(seed: number): () => number {
  let s = seed >>> 0
  return () => {
    s = (s + 0x6d2b79f5) >>> 0
    let r = Math.imul(s ^ (s >>> 15), 1 | s)
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

export function perimeterCount(spec: TempleSpec): number {
  return 2 * spec.longCount + 2 * (spec.shortCount - 2)
}

interface RingSlot {
  side: Side
  sideIndex: number
  x: number
  z: number
}

/** Positions around a rectangular colonnade (peristyle), clockwise from the NW corner. */
export function peristyle(spec: TempleSpec): RingSlot[] {
  const [cx, cz] = spec.center
  const halfX = ((spec.longCount - 1) * spec.spacingX) / 2
  const halfZ = ((spec.shortCount - 1) * spec.spacingZ) / 2
  const slots: RingSlot[] = []

  for (let i = 0; i < spec.longCount; i++) {
    slots.push({ side: 'north', sideIndex: i, x: cx - halfX + i * spec.spacingX, z: cz - halfZ })
  }
  for (let j = 1; j < spec.shortCount - 1; j++) {
    slots.push({ side: 'east', sideIndex: j, x: cx + halfX, z: cz - halfZ + j * spec.spacingZ })
  }
  for (let i = spec.longCount - 1; i >= 0; i--) {
    slots.push({ side: 'south', sideIndex: i, x: cx - halfX + i * spec.spacingX, z: cz + halfZ })
  }
  for (let j = spec.shortCount - 2; j >= 1; j--) {
    slots.push({ side: 'west', sideIndex: j, x: cx - halfX, z: cz - halfZ + j * spec.spacingZ })
  }
  return slots
}

function survivesJupiter(slot: RingSlot): boolean {
  return (
    slot.side === JUPITER_SURVIVORS.side &&
    slot.sideIndex >= JUPITER_SURVIVORS.from &&
    slot.sideIndex <= JUPITER_SURVIVORS.to
  )
}

/** Bacchus is well preserved: the north and west colonnades largely stand, the south has mostly fallen. */
function survivesBacchus(slot: RingSlot): boolean {
  if (slot.side === 'north' || slot.side === 'west') return true
  if (slot.side === 'east') return slot.sideIndex <= 2
  return slot.sideIndex <= 2 || slot.sideIndex >= 13
}

export function buildColumns(spec: TempleSpec, seed: number): ColumnSpec[] {
  const rand = seeded(seed)
  const [cx, cz] = spec.center
  const isBacchus = spec.id === 'bacchus'

  return peristyle(spec).map((slot, ring) => {
    const survives = isBacchus ? survivesBacchus(slot) : survivesJupiter(slot)

    // Fall roughly outward from the temple centre, with some variation.
    const outward = Math.atan2(slot.z - cz, slot.x - cx)
    const angle = outward + (rand() - 0.5) * 1.2
    const fallDir: [number, number] = [Math.cos(angle), Math.sin(angle)]

    const fallStart = survives ? Infinity : 1.25 + rand() * (TIMELINE_MAX - 1.25 - FALL_DURATION - 0.05)
    // Bacchus columns rise once its podium is in place (podium is built by t = 0.3).
    const buildStart = isBacchus ? 0.32 + rand() * (0.82 - BUILD_DURATION - 0.32) : -Infinity

    return {
      id: `${spec.id}-${ring}`,
      temple: spec.id,
      ring,
      side: slot.side,
      sideIndex: slot.sideIndex,
      x: slot.x,
      z: slot.z,
      baseY: spec.podium.height,
      height: spec.columnHeight,
      radius: spec.columnRadius,
      survives,
      fallStart,
      fallDir,
      buildStart,
    }
  })
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const easeInQuad = (v: number) => v * v
const easeOutCubic = (v: number) => 1 - Math.pow(1 - v, 3)

export function columnState(column: ColumnSpec, t: number): ColumnState {
  const build = column.buildStart === -Infinity ? 1 : easeOutCubic(clamp01((t - column.buildStart) / BUILD_DURATION))
  const fall = column.fallStart === Infinity ? 0 : easeInQuad(clamp01((t - column.fallStart) / FALL_DURATION))
  return { build, tilt: fall * (Math.PI / 2) }
}

export function isStanding(state: ColumnState): boolean {
  return state.build >= 0.999 && state.tilt <= 0.001
}

/** Adjacent column pairs around the ring (including the closing pair), used for entablature segments. */
export function bays(columns: ColumnSpec[]): Array<[ColumnSpec, ColumnSpec]> {
  return columns.map((c, i) => [c, columns[(i + 1) % columns.length]])
}

/** Progress (0..1) of a temple-wide element (podium, cella, roof) between two timeline values. */
export function phase(t: number, start: number, end: number): number {
  return clamp01((t - start) / (end - start))
}

export const JUPITER_COLUMNS = buildColumns(JUPITER, 54)
export const BACCHUS_COLUMNS = buildColumns(BACCHUS, 42)
export const ALL_COLUMNS = [...JUPITER_COLUMNS, ...BACCHUS_COLUMNS]

/** Where the six surviving Jupiter columns stand, used to place the hotspot. */
export function survivorsCenter(): [number, number] {
  const s = JUPITER_COLUMNS.filter((c) => c.survives)
  const x = s.reduce((sum, c) => sum + c.x, 0) / s.length
  const z = s.reduce((sum, c) => sum + c.z, 0) / s.length
  return [x, z]
}
