import { describe, expect, it } from 'vitest'
import { SITES } from '../data/sites'
import { ERAS as BAALBEK } from '../experiences/baalbek/content'
import { ERAS as SIDON } from '../experiences/sidon/content'
import { allClips, eraKey, eventKey, tourKey } from './narrationTexts'

const experiences = [
  { id: 'baalbek', eras: BAALBEK },
  { id: 'sidon-sea-castle', eras: SIDON },
]

describe('narration clips', () => {
  const clips = allClips(experiences)

  it('has one clip per event, one tour clip per site and one per era, with unique keys', () => {
    const events = SITES.reduce((n, s) => n + s.events.length, 0)
    expect(clips).toHaveLength(events + SITES.length + BAALBEK.length + SIDON.length)
    expect(new Set(clips.map((c) => c.key)).size).toBe(clips.length)
  })

  it('names clips so they are valid file names', () => {
    for (const c of clips) expect(c.key).toMatch(/^[a-z0-9-]+$/)
    expect(eventKey('tyre', 3)).toBe('site-tyre-3')
    expect(tourKey('tyre')).toBe('tour-tyre')
    expect(eraKey('anjar', 0)).toBe('era-anjar-0')
  })

  it('reads the date, the title and the text in both languages', () => {
    const baalbek = clips.find((c) => c.key === eventKey('baalbek', 7))!
    expect(baalbek.text.en).toMatch(/^1759\. The great earthquake\. /)
    expect(baalbek.text.ar).toMatch(/^1759 م\. /)
    const tour = clips.find((c) => c.key === tourKey('baalbek'))!
    expect(tour.text.en.startsWith('Baalbek. c. 7000 BC.')).toBe(true)
    expect(tour.text.ar.startsWith('بعلبك. نحو 7000 ق.م.')).toBe(true)
  })
})
