import { describe, expect, it } from 'vitest'
import { TIMELINE_MAX, castleState } from './layout'

describe('sidon sea castle timeline', () => {
  it('shows only the islet and temple remains before the castle', () => {
    const s = castleState(0)
    expect(s.temple).toBe(1)
    expect(s.causeway).toBe(0)
    expect(s.westTower).toBe(0)
    expect(s.eastUpper).toBe(0)
  })

  it('completes the Crusader castle by 1228', () => {
    const s = castleState(1)
    expect(s.causeway).toBe(1)
    expect(s.platform).toBe(1)
    expect(s.westTower).toBe(1)
    expect(s.eastLower).toBe(1)
    expect(s.eastUpper).toBe(1)
    expect(s.walls).toBe(1)
    expect(s.mosque).toBe(0)
  })

  it('loses the upper east tower and lowers the walls after 1291', () => {
    const s = castleState(2)
    expect(s.eastUpper).toBe(0)
    expect(s.eastLower).toBe(1)
    expect(s.walls).toBeCloseTo(0.5)
  })

  it('is partly restored with a mosque by the 17th century, without rebuilding the east tower', () => {
    const s = castleState(3)
    expect(s.mosque).toBe(1)
    expect(s.khan).toBe(1)
    expect(s.walls).toBeGreaterThan(0.5)
    expect(s.eastUpper).toBe(0)
  })

  it('adds the modern town only at the end', () => {
    expect(castleState(3).modern).toBe(0)
    expect(castleState(TIMELINE_MAX).modern).toBe(1)
    expect(castleState(TIMELINE_MAX).boats).toBe(1)
  })
})
