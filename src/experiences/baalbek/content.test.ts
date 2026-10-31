import { describe, expect, it } from 'vitest'
import { nearestEra } from '../eras'
import { ERAS, HOTSPOTS } from './content'

describe('baalbek experience content', () => {
  it('translates every hotspot into English and Arabic', () => {
    for (const h of HOTSPOTS) {
      for (const text of [h.label, h.title, h.body, ...h.facts]) {
        expect(text.en.trim()).not.toBe('')
        expect(text.ar.trim()).not.toBe('')
      }
    }
  })

  it('has unique hotspot ids', () => {
    expect(new Set(HOTSPOTS.map((h) => h.id)).size).toBe(HOTSPOTS.length)
  })

  it('picks the nearest era for a timeline value', () => {
    expect(nearestEra(ERAS, 0.2)).toBe(ERAS[0])
    expect(nearestEra(ERAS, 1.4)).toBe(ERAS[1])
    expect(nearestEra(ERAS, 2.9)).toBe(ERAS[3])
  })
})
