import { useEffect, type RefObject } from 'react'
import { panelBoxes, underPanel, type Box } from './panels'

const CHECK_MS = 100

const union = (a: Box, b: DOMRect): Box => ({
  left: Math.min(a.left, b.left),
  top: Math.min(a.top, b.top),
  right: Math.max(a.right, b.right),
  bottom: Math.max(a.bottom, b.bottom),
})

/**
 * Markers live in the canvas layer, below the HTML panels, but the panels are
 * translucent so a bright marker would still show through them. This hides
 * any marker (with its visible label) while it is under a panel.
 */
export function useHideUnderPanels(overlay: RefObject<HTMLElement | null>, selectors: string) {
  useEffect(() => {
    const timer = window.setInterval(() => {
      const root = overlay.current
      if (!root) return
      const panels = panelBoxes(selectors)
      for (const wrapper of Array.from(root.children)) {
        const button = wrapper.querySelector('button')
        if (!button) continue
        let box: Box = button.getBoundingClientRect()
        const label = wrapper.querySelector('.pin--labelled .pin__label')
        if (label) box = union(box, label.getBoundingClientRect())
        wrapper.classList.toggle('is-under-panel', underPanel(box, panels))
      }
    }, CHECK_MS)
    return () => window.clearInterval(timer)
  }, [overlay, selectors])
}
