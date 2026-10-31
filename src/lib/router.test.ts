import { describe, expect, it } from 'vitest'
import { parsePath, pathFor } from './router'

describe('router', () => {
  it('parses the three kinds of view', () => {
    expect(parsePath('/')).toEqual({ kind: 'map' })
    expect(parsePath('/sites/byblos')).toEqual({ kind: 'site', id: 'byblos' })
    expect(parsePath('/sites/sidon-sea-castle/')).toEqual({ kind: 'site', id: 'sidon-sea-castle' })
    expect(parsePath('/sites/baalbek/3d')).toEqual({ kind: 'experience', id: 'baalbek' })
  })

  it('falls back to the map for unknown paths', () => {
    expect(parsePath('/nonsense')).toEqual({ kind: 'map' })
    expect(parsePath('/sites/Bad Id')).toEqual({ kind: 'map' })
  })

  it('round-trips every view through its path', () => {
    for (const view of [{ kind: 'map' as const }, { kind: 'site' as const, id: 'tyre' }, { kind: 'experience' as const, id: 'anjar' }]) {
      expect(parsePath(pathFor(view))).toEqual(view)
    }
  })
})
