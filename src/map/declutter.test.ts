import { describe, expect, it } from 'vitest'
import { declutter, type ScreenPin } from './declutter'

const pin = (id: string, x: number, y: number, labelWidth = 80): ScreenPin => ({ id, x, y, labelWidth })
const base = { radius: 30, labels: true, rtl: false }

describe('declutter', () => {
  it('keeps distant pins apart and merges pins that would overlap', () => {
    const { groups } = declutter([pin('a', 100, 100), pin('b', 112, 108), pin('c', 400, 300)], base)
    expect(groups).toEqual([['a', 'b'], ['c']])
  })

  it('groups around the most important pin, which is passed first', () => {
    const { groups } = declutter([pin('focused', 100, 100), pin('x', 125, 100), pin('y', 150, 100)], base)
    expect(groups[0]).toEqual(['focused', 'x'])
    expect(groups[1]).toEqual(['y'])
  })

  it('never puts a solo pin (the focused one) into a cluster', () => {
    const { groups } = declutter([pin('focused', 100, 100), pin('x', 110, 100), pin('y', 115, 100)], {
      ...base,
      solo: new Set(['focused']),
    })
    expect(groups).toEqual([['focused'], ['x', 'y']])
  })

  it('only labels single pins, and hides a label that would cover another pin', () => {
    // b sits where a's label would go (to the right of a).
    const { labelled } = declutter([pin('a', 100, 100), pin('b', 160, 100), pin('c', 100, 300)], base)
    expect(labelled.has('a')).toBe(false)
    expect(labelled.has('b')).toBe(true)
    expect(labelled.has('c')).toBe(true)
  })

  it('places labels on the left in right-to-left layouts', () => {
    const { labelled } = declutter([pin('a', 100, 100), pin('b', 160, 100)], { ...base, rtl: true })
    expect(labelled.has('b')).toBe(false)
    expect(labelled.has('a')).toBe(true)
  })

  it('shows no labels when zoomed out, except forced ones', () => {
    const { labelled } = declutter([pin('a', 100, 100), pin('b', 400, 100)], { ...base, labels: false, forceLabel: new Set(['b']) })
    expect([...labelled]).toEqual(['b'])
  })
})
