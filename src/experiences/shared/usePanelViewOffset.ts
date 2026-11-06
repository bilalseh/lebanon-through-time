import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import type { PerspectiveCamera } from 'three'
import { freeAreaShift, panelBoxes } from '../../lib/panels'

const MEASURE_EVERY = 10

/**
 * Shifts the camera's projection (not its position) so the scene is centred in
 * the part of the canvas the panels leave free. Orbiting, flights and the HTML
 * markers keep working unchanged, since they all go through the same projection.
 */
export function usePanelViewOffset(sides: string, edges: string) {
  const camera = useThree((s) => s.camera) as PerspectiveCamera
  const gl = useThree((s) => s.gl)
  const size = useThree((s) => s.size)
  const state = useRef({ frame: 0, target: { x: 0, y: 0 }, current: { x: 0, y: 0 }, ready: false, applied: '' })

  useFrame((_, delta) => {
    const s = state.current
    if (s.frame++ % MEASURE_EVERY === 0) {
      s.target = freeAreaShift(gl.domElement.getBoundingClientRect(), panelBoxes(sides), panelBoxes(edges))
      // The first measurement applies at once, so the scene does not slide in on load.
      if (!s.ready) {
        s.current = { ...s.target }
        s.ready = true
      }
    }
    const k = 1 - Math.exp(-delta * 6)
    s.current.x += (s.target.x - s.current.x) * k
    s.current.y += (s.target.y - s.current.y) * k
    const key = `${size.width}x${size.height}:${s.current.x.toFixed(1)},${s.current.y.toFixed(1)}`
    if (key === s.applied) return
    s.applied = key
    camera.setViewOffset(size.width, size.height, -s.current.x, -s.current.y, size.width, size.height)
  })
}
