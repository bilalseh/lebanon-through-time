/**
 * Helpers for the HTML panels that sit over the 3D canvas: where they are,
 * how far to shift the picture so the scene is centred in the area they leave
 * free, and which markers are hidden underneath them.
 */
export interface Box {
  left: number
  top: number
  right: number
  bottom: number
}

/** Rects of the visible elements matching a selector list. */
export function panelBoxes(selectors: string): Box[] {
  if (!selectors) return []
  return [...document.querySelectorAll<HTMLElement>(selectors)]
    .map((el) => el.getBoundingClientRect())
    .filter((r) => r.width > 0 && r.height > 0)
}

/**
 * Pixels to move the picture (positive x = right, positive y = down) so the
 * scene's centre lands in the middle of the space the panels leave free.
 * Side panels (sidebars, cards) narrow it from the left or right; edge panels
 * (title, timeline) from the top or bottom. A side panel wider than half the
 * canvas, as on phones, counts as an edge panel.
 */
export function freeAreaShift(canvas: Box, sides: Box[], edges: Box[]): { x: number; y: number } {
  const width = canvas.right - canvas.left
  const height = canvas.bottom - canvas.top
  let left = 0
  let right = 0
  let top = 0
  let bottom = 0
  const edge = (b: Box) => {
    if ((b.top + b.bottom) / 2 - canvas.top < height / 2) top = Math.max(top, b.bottom - canvas.top)
    else bottom = Math.max(bottom, canvas.bottom - b.top)
  }
  for (const b of sides) {
    if (b.right - b.left >= width * 0.5) {
      edge(b)
      continue
    }
    if ((b.left + b.right) / 2 - canvas.left < width / 2) left = Math.max(left, b.right - canvas.left)
    else right = Math.max(right, canvas.right - b.left)
  }
  edges.forEach(edge)
  const clamp = (v: number, max: number) => Math.max(-max, Math.min(max, v))
  return { x: clamp((left - right) / 2, width * 0.2), y: clamp((top - bottom) / 2, height * 0.15) }
}

/** True when the box overlaps any of the panels (with a small margin). */
export function underPanel(box: Box, panels: Box[], margin = 4): boolean {
  return panels.some(
    (p) => box.right > p.left - margin && box.left < p.right + margin && box.bottom > p.top - margin && box.top < p.bottom + margin,
  )
}
