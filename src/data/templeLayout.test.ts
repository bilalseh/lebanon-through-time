import { describe, expect, it } from 'vitest'
import {
  BACCHUS,
  BACCHUS_COLUMNS,
  JUPITER,
  JUPITER_COLUMNS,
  TIMELINE_MAX,
  bays,
  buildColumns,
  columnState,
  isStanding,
  perimeterCount,
} from './templeLayout'

const standingAt = (cols: typeof JUPITER_COLUMNS, t: number) => cols.filter((c) => isStanding(columnState(c, t)))

describe('temple layout', () => {
  it('matches the historical column counts', () => {
    expect(perimeterCount(JUPITER)).toBe(54)
    expect(JUPITER_COLUMNS).toHaveLength(54)
    expect(perimeterCount(BACCHUS)).toBe(42)
    expect(BACCHUS_COLUMNS).toHaveLength(42)
  })

  it('places every column on the perimeter without duplicates', () => {
    for (const cols of [JUPITER_COLUMNS, BACCHUS_COLUMNS]) {
      const keys = new Set(cols.map((c) => `${c.x.toFixed(2)},${c.z.toFixed(2)}`))
      expect(keys.size).toBe(cols.length)
    }
  })

  it('is deterministic for a given seed', () => {
    expect(buildColumns(JUPITER, 54)).toEqual(JUPITER_COLUMNS)
  })

  it('keeps exactly six Jupiter columns standing today', () => {
    expect(JUPITER_COLUMNS.filter((c) => c.survives)).toHaveLength(6)
    expect(standingAt(JUPITER_COLUMNS, TIMELINE_MAX)).toHaveLength(6)
  })
})

describe('timeline', () => {
  it('shows the whole Temple of Jupiter and no Temple of Bacchus at c. 60 AD', () => {
    expect(standingAt(JUPITER_COLUMNS, 0)).toHaveLength(54)
    expect(BACCHUS_COLUMNS.every((c) => columnState(c, 0).build === 0)).toBe(true)
  })

  it('shows both temples complete at c. 150 AD', () => {
    expect(standingAt(JUPITER_COLUMNS, 1)).toHaveLength(54)
    expect(standingAt(BACCHUS_COLUMNS, 1)).toHaveLength(42)
  })

  it('topples non-surviving columns flat by today', () => {
    for (const c of JUPITER_COLUMNS.filter((col) => !col.survives)) {
      expect(columnState(c, TIMELINE_MAX).tilt).toBeCloseTo(Math.PI / 2)
    }
  })

  it('only fells columns, never rebuilds them, as time moves forward', () => {
    for (const c of JUPITER_COLUMNS) {
      let previous = 0
      for (let t = 0; t <= TIMELINE_MAX; t += 0.05) {
        const { tilt } = columnState(c, t)
        expect(tilt).toBeGreaterThanOrEqual(previous)
        previous = tilt
      }
    }
  })

  it('pairs every column with its neighbour for the entablature', () => {
    const pairs = bays(JUPITER_COLUMNS)
    expect(pairs).toHaveLength(54)
    expect(pairs.at(-1)![1]).toBe(JUPITER_COLUMNS[0])
  })
})
