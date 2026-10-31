import { describe, expect, it } from 'vitest'
import { fieldColumnState, isUp } from '../shared/fieldColumns'
import { ANCIENT_CITY, AQUEDUCT_PIERS, ISLAND, MOLE, ROAD_ROWS, TIMELINE_MAX, isthmusWidth, tyreState } from './layout'

const upCount = (cols: typeof AQUEDUCT_PIERS, t: number) => cols.filter((c) => isUp(fieldColumnState(c, t))).length
const road = ROAD_ROWS.flat()

describe('tyre layout', () => {
  it('keeps every ancient house on the island', () => {
    for (const b of ANCIENT_CITY) {
      const dx = (b.x - ISLAND.center[0]) / ISLAND.rx
      const dz = (b.z - ISLAND.center[1]) / ISLAND.rz
      expect(dx * dx + dz * dz).toBeLessThan(1)
    }
  })
})

describe('tyre timeline', () => {
  it('starts with an island city and no mole', () => {
    const s = tyreState(0)
    expect(s.mole).toBe(0)
    expect(s.islandWalls).toBe(1)
    expect(s.temple).toBe(1)
    expect(upCount(road, 0)).toBe(0)
  })

  it('has the mole complete and siege towers up in 332 BC', () => {
    const s = tyreState(1)
    expect(s.mole).toBe(1)
    expect(s.siegeTowers).toBe(1)
    expect(isthmusWidth(s)).toBe(MOLE.minWidth)
  })

  it('becomes a wide isthmus with a Roman city by 200 AD', () => {
    const s = tyreState(2)
    expect(s.silt).toBe(1)
    expect(isthmusWidth(s)).toBe(MOLE.maxWidth)
    expect(s.seats).toBe(1)
    expect(s.arch).toBe(1)
    expect(s.siegeTowers).toBe(0)
    expect(upCount(road, 2)).toBe(road.length)
  })

  it('decays after 1291 and is partly re-erected today', () => {
    expect(tyreState(3).seats).toBeCloseTo(0.3)
    expect(upCount(road, 3)).toBeLessThan(road.length * 0.3)
    const today = tyreState(TIMELINE_MAX)
    expect(today.modern).toBe(1)
    expect(upCount(road, TIMELINE_MAX)).toBeGreaterThan(road.length * 0.6)
  })
})
