import { describe, expect, it } from 'vitest'
import { heightAt, insideLebanon, landAt, project, relief, unproject } from './terrain'

describe('projection', () => {
  it('puts north at -z and east at +x, with roughly a kilometre per unit', () => {
    const [x, z] = project(34.95, 35.85)
    expect(x).toBeCloseTo(0, 5)
    expect(z).toBeCloseTo(-110.57, 1)
    const [x2] = project(33.95, 36.85)
    expect(x2).toBeGreaterThan(90)
    expect(x2).toBeLessThan(95)
  })

  it('round-trips through unproject', () => {
    const [x, z] = project(34.0069, 36.2039)
    const { lat, lon } = unproject(x, z)
    expect(lat).toBeCloseTo(34.0069, 6)
    expect(lon).toBeCloseTo(36.2039, 6)
  })
})

describe('land mask', () => {
  it('knows Lebanese towns from the sea and the neighbours', () => {
    expect(insideLebanon(35.5018, 33.8938)).toBe(true) // Beirut
    expect(insideLebanon(36.2039, 34.0069)).toBe(true) // Baalbek
    expect(insideLebanon(35.2, 33.27)).toBe(true) // Tyre
    expect(landAt(35.2, 33.9)).toBe('sea') // off the coast of Beirut
    expect(landAt(36.3, 33.5)).toBe('neighbour') // Damascus side
    expect(landAt(35.3, 32.95)).toBe('neighbour') // Galilee
  })
})

describe('relief', () => {
  it('rises from the coast to the Mount Lebanon crest and drops into the Bekaa', () => {
    const coast = relief(35.52, 33.95).elevation
    const crest = relief(35.86, 33.93).elevation
    const bekaa = relief(36.0, 33.85)
    expect(coast).toBeLessThan(0.5)
    expect(crest).toBeGreaterThan(2)
    expect(bekaa.elevation).toBeGreaterThan(0.6)
    expect(bekaa.elevation).toBeLessThan(1.6)
    expect(bekaa.valley).toBeGreaterThan(0.5)
  })

  it('has its highest point near Qurnat as Sawda', () => {
    expect(relief(36.11, 34.3).elevation).toBeGreaterThan(2.7)
  })

  it('puts the sea below the sea plane and land above it', () => {
    expect(heightAt(33.9, 35.2)).toBeLessThan(0)
    expect(heightAt(33.8938, 35.5018)).toBeGreaterThan(0)
  })
})
