import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { CATEGORIES, REGIONS } from '../regions'
import { insideLebanon } from '../lebanon/terrain'
import type { Localized } from '../types'
import { SITES, distanceKm, latestEventAt, nearbySites } from './index'

const EM_DASH = '—'

function expectLocalized(text: Localized, where: string) {
  expect(text.en.trim(), `${where} (en)`).not.toBe('')
  expect(text.ar.trim(), `${where} (ar)`).not.toBe('')
  expect(text.en, `${where} uses an em dash`).not.toContain(EM_DASH)
  expect(text.ar, `${where} uses an em dash`).not.toContain(EM_DASH)
}

describe('sites', () => {
  it('have unique ids', () => {
    expect(new Set(SITES.map((s) => s.id)).size).toBe(SITES.length)
  })

  it.each(SITES.map((s) => [s.id, s] as const))('%s is complete and bilingual', (_id, site) => {
    expectLocalized(site.name, `${site.id}.name`)
    expectLocalized(site.tagline, `${site.id}.tagline`)
    expectLocalized(site.summary, `${site.id}.summary`)
    expect(site.facts.length).toBeGreaterThanOrEqual(3)
    site.facts.forEach((f, i) => expectLocalized(f, `${site.id}.facts[${i}]`))
    expect(CATEGORIES[site.category]).toBeDefined()
    expect(REGIONS[site.region]).toBeDefined()
  })

  it.each(SITES.map((s) => [s.id, s] as const))('%s lies inside Lebanon', (_id, site) => {
    // Coastal sites can sit right on the simplified shoreline, so also accept a point a few hundred metres inland.
    const [lat, lon] = site.coords
    const inside = [0, 0.006, -0.006].some((dLat) => [0, 0.006, -0.006].some((dLon) => insideLebanon(lon + dLon, lat + dLat)))
    expect(inside).toBe(true)
  })

  it.each(SITES.map((s) => [s.id, s] as const))('%s has a sorted timeline reaching the present', (_id, site) => {
    expect(site.events.length).toBeGreaterThanOrEqual(5)
    for (let i = 1; i < site.events.length; i++) {
      expect(site.events[i].year, `${site.id} event ${i} out of order`).toBeGreaterThanOrEqual(site.events[i - 1].year)
    }
    expect(site.events.at(-1)!.year).toBeGreaterThanOrEqual(1900)
    site.events.forEach((e, i) => {
      expectLocalized(e.title, `${site.id}.events[${i}].title`)
      expectLocalized(e.text, `${site.id}.events[${i}].text`)
    })
  })

  it.each(SITES.map((s) => [s.id, s] as const))('%s has credited photos that exist on disk', (_id, site) => {
    expect(site.photos.length).toBeGreaterThanOrEqual(3)
    for (const p of site.photos) {
      expectLocalized(p.caption, `${site.id} photo ${p.src}`)
      expect(p.author.trim()).not.toBe('')
      expect(p.license).toMatch(/^(CC|Public domain|PD|No restrictions)/i)
      expect(p.source).toMatch(/^https:\/\/commons\.wikimedia\.org\//)
      for (const file of [p.src, p.thumb]) {
        expect(existsSync(join('public', file)), `${file} missing`).toBe(true)
      }
    }
  })
})

describe('site helpers', () => {
  it('measures distances between places', () => {
    const [a, b] = [SITES[0], SITES[SITES.length - 1]]
    expect(distanceKm(a, a)).toBe(0)
    expect(distanceKm(a, b)).toBeCloseTo(distanceKm(b, a), 6)
  })

  it('lists nearby places sorted by distance', () => {
    const near = nearbySites(SITES[0], 3)
    expect(near.length).toBeLessThanOrEqual(3)
    for (let i = 1; i < near.length; i++) expect(near[i].km).toBeGreaterThanOrEqual(near[i - 1].km)
  })

  it('finds the latest event before a year', () => {
    const site = SITES[0]
    expect(latestEventAt(site, -20000)).toBeUndefined()
    expect(latestEventAt(site, 3000)).toBe(site.events.at(-1))
  })
})
