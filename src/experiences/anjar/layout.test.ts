import { describe, expect, it } from 'vitest'
import { fieldColumnState, isUp } from '../shared/fieldColumns'
import { PALACE_ARCADE, PALACE_ROWS, STREET_ROWS, TETRAPYLON, TIMELINE_MAX, cityState, pairsForRows } from './layout'

const upCount = (cols: typeof TETRAPYLON, t: number) => cols.filter((c) => isUp(fieldColumnState(c, t))).length
const streets = STREET_ROWS.flat()

describe('anjar layout', () => {
  it('has a tetrapylon of sixteen columns and a four-sided arcade with an upper storey', () => {
    expect(TETRAPYLON).toHaveLength(16)
    expect(PALACE_ROWS).toHaveLength(5)
    expect(PALACE_ROWS.flat()).toHaveLength(PALACE_ARCADE.length)
    expect(PALACE_ROWS[4].every((c) => c.baseY > 0)).toBe(true)
  })

  it('pairs neighbours within a row only', () => {
    const pairs = pairsForRows(STREET_ROWS)
    expect(pairs).toHaveLength(streets.length - STREET_ROWS.length)
    for (const [a, b] of pairs) expect(b).toBe(a + 1)
  })
})

describe('anjar timeline', () => {
  it('starts as a surveyed plan with nothing built', () => {
    const s = cityState(0)
    expect(s.plan).toBe(1)
    expect(s.walls).toBe(0)
    expect(upCount(streets, 0)).toBe(0)
  })

  it('is complete in 715', () => {
    const s = cityState(1)
    expect(s.walls).toBe(1)
    expect(s.roofs).toBe(1)
    expect(upCount(streets, 1)).toBe(streets.length)
    expect(upCount(TETRAPYLON, 1)).toBe(16)
  })

  it('loses its roofs after abandonment and most columns by 1900', () => {
    expect(cityState(2).roofs).toBe(0)
    const standing = upCount(streets, 3)
    expect(standing).toBeLessThan(streets.length * 0.4)
    expect(upCount(TETRAPYLON, 3)).toBe(0)
    expect(cityState(3).walls).toBeCloseTo(0.35)
  })

  it('re-erects the tetrapylon and the palace arcade today, but not the whole city', () => {
    expect(upCount(TETRAPYLON, TIMELINE_MAX)).toBe(16)
    expect(upCount(PALACE_ARCADE, TIMELINE_MAX)).toBe(PALACE_ARCADE.length)
    expect(upCount(streets, TIMELINE_MAX)).toBeLessThan(streets.length * 0.6)
    expect(cityState(TIMELINE_MAX).modern).toBe(1)
  })
})
