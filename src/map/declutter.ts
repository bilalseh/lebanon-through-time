/** A pin projected to screen pixels, with the width its label would take. */
export interface ScreenPin {
  id: string
  x: number
  y: number
  labelWidth: number
}

export interface DeclutterOptions {
  /** Pins closer than this (px) to a group's first pin join that group. */
  radius: number
  /** Whether labels may be shown at all (the camera is close enough). */
  labels: boolean
  rtl: boolean
  /** Pins whose label is always shown (hovered, focused). */
  forceLabel?: ReadonlySet<string>
  /** Pins that always stay on their own (the focused one), however close others are. */
  solo?: ReadonlySet<string>
}

export interface Decluttered {
  /** Each group is one pin, or a cluster of pins too close to tell apart. */
  groups: string[][]
  labelled: Set<string>
}

const DOT = 14
const LABEL_GAP = 16
const LABEL_HALF_HEIGHT = 10

type Rect = [number, number, number, number]
const overlaps = (a: Rect, b: Rect) => a[0] < b[2] && a[2] > b[0] && a[1] < b[3] && a[3] > b[1]

/**
 * Greedy and priority-ordered (pass the most important pin first): each pin
 * starts a group or joins the first group seeded within `radius`. Then labels
 * are placed, in the same order, wherever they overlap neither an earlier
 * label nor another pin.
 */
export function declutter(pins: ScreenPin[], options: DeclutterOptions): Decluttered {
  const seeds: Array<{ pin: ScreenPin; members: string[]; solo: boolean }> = []
  for (const pin of pins) {
    const solo = options.solo?.has(pin.id) ?? false
    const seed = solo ? undefined : seeds.find((s) => !s.solo && Math.hypot(s.pin.x - pin.x, s.pin.y - pin.y) < options.radius)
    if (seed) seed.members.push(pin.id)
    else seeds.push({ pin, members: [pin.id], solo })
  }

  const labelled = new Set<string>()
  const dots: Rect[] = seeds.map(({ pin }) => [pin.x - DOT, pin.y - DOT, pin.x + DOT, pin.y + DOT])
  const placed: Rect[] = []
  seeds.forEach(({ pin, members }, i) => {
    if (members.length > 1) return
    const forced = options.forceLabel?.has(pin.id) ?? false
    if (!forced && !options.labels) return
    const x0 = options.rtl ? pin.x - LABEL_GAP - pin.labelWidth : pin.x + LABEL_GAP
    const rect: Rect = [x0, pin.y - LABEL_HALF_HEIGHT, x0 + pin.labelWidth, pin.y + LABEL_HALF_HEIGHT]
    const clear = !placed.some((p) => overlaps(p, rect)) && !dots.some((d, j) => j !== i && overlaps(d, rect))
    if (forced || clear) {
      labelled.add(pin.id)
      placed.push(rect)
    }
  })
  return { groups: seeds.map((s) => s.members), labelled }
}
