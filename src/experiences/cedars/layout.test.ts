import { describe, expect, it } from 'vitest'
import { FOREST_TREES, GROVE, GROVE_TREES, SAPLINGS, TIMELINE_MAX, forestState, groundHeight, standingCount } from './layout'

describe('cedars terrain', () => {
  it('rises to a ridge in the east and drops into a gorge in the west', () => {
    expect(groundHeight(800, 0)).toBeGreaterThan(300)
    expect(groundHeight(-500, 0)).toBeLessThan(-100)
    expect(Math.abs(groundHeight(0, 0))).toBeLessThan(20)
  })
})

describe('cedars timeline', () => {
  it('starts with the whole mountainside forested', () => {
    expect(standingCount(FOREST_TREES, 0)).toBe(FOREST_TREES.length)
    expect(standingCount(GROVE_TREES, 0)).toBe(GROVE_TREES.length)
    expect(standingCount(SAPLINGS, 0)).toBe(0)
  })

  it('thins the forest from the outside in', () => {
    const early = standingCount(FOREST_TREES, 1)
    expect(early).toBeGreaterThan(FOREST_TREES.length * 0.3)
    expect(early).toBeLessThan(FOREST_TREES.length * 0.8)
    const survivors = FOREST_TREES.filter((c) => c.cut > 2)
    const felled = FOREST_TREES.filter((c) => c.cut < 1)
    const mean = (list: typeof FOREST_TREES) => list.reduce((s, c) => s + Math.hypot(c.x, c.z), 0) / list.length
    expect(mean(survivors)).toBeLessThan(mean(felled))
  })

  it('leaves only the grove by 1876, when the wall goes up', () => {
    expect(standingCount(FOREST_TREES, 3)).toBe(0)
    expect(standingCount(GROVE_TREES, 3)).toBe(GROVE_TREES.length)
    for (const c of GROVE_TREES) expect(Math.hypot(c.x, c.z)).toBeLessThan(GROVE.radius)
    expect(forestState(3).wall).toBe(1)
    expect(forestState(2.5).wall).toBe(0)
  })

  it('places Hadrian’s markers in the 2nd century and saplings today', () => {
    expect(forestState(1).markers).toBe(0)
    expect(forestState(2).markers).toBe(1)
    expect(standingCount(SAPLINGS, TIMELINE_MAX)).toBe(SAPLINGS.length)
    expect(forestState(TIMELINE_MAX).town).toBe(1)
  })
})
