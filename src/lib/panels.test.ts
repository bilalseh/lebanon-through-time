import { describe, expect, it } from 'vitest'
import { freeAreaShift, underPanel, type Box } from './panels'

const box = (left: number, top: number, right: number, bottom: number): Box => ({ left, top, right, bottom })
const desktop = box(0, 0, 1440, 900)

describe('freeAreaShift', () => {
  it('is zero with no panels', () => {
    expect(freeAreaShift(desktop, [], [])).toEqual({ x: 0, y: 0 })
  })

  it('moves the picture right, away from a left sidebar, and up, away from a bottom timeline', () => {
    const sidebar = box(20, 104, 320, 790)
    const scrubber = box(340, 775, 1100, 880)
    const title = box(20, 16, 400, 64)
    const shift = freeAreaShift(desktop, [sidebar], [scrubber, title])
    expect(shift.x).toBe(160)
    expect(shift.y).toBe((64 - 125) / 2)
  })

  it('mirrors for a right-hand sidebar (Arabic) and balances a card on the other side', () => {
    const rtlSidebar = box(1120, 104, 1420, 790)
    expect(freeAreaShift(desktop, [rtlSidebar], []).x).toBe(-160)
    const card = box(1080, 104, 1420, 440)
    expect(freeAreaShift(desktop, [box(20, 104, 320, 790), card], []).x).toBe(-20)
  })

  it('treats a full-width panel on a phone as a bottom edge', () => {
    const phone = box(0, 0, 400, 860)
    const card = box(16, 520, 384, 680)
    const shift = freeAreaShift(phone, [card], [])
    expect(shift.x).toBe(0)
    expect(shift.y).toBeLessThan(0)
  })

  it('never shifts more than a fifth of the width', () => {
    expect(freeAreaShift(desktop, [box(0, 0, 700, 900)], []).x).toBe(1440 * 0.2)
  })
})

describe('underPanel', () => {
  it('detects overlap, including a small margin', () => {
    const panel = box(20, 100, 250, 420)
    expect(underPanel(box(100, 200, 180, 230), [panel])).toBe(true)
    expect(underPanel(box(252, 200, 300, 230), [panel])).toBe(true)
    expect(underPanel(box(260, 200, 300, 230), [panel])).toBe(false)
  })
})
