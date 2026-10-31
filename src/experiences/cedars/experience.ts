import type { Experience } from '../types'
import { ERAS, HOTSPOTS } from './content'
import { Scene } from './Scene'
import { TIMELINE_MAX } from './layout'

export const experience: Experience = {
  id: 'cedars-of-god',
  timelineMax: TIMELINE_MAX,
  eras: ERAS,
  hotspots: HOTSPOTS,
  overview: { position: [-470, 260, 440], target: [0, 10, 0] },
  controls: { minDistance: 25, maxDistance: 1900, maxPolarAngle: Math.PI / 2.4 },
  camera: { fov: 45, near: 1, far: 9000 },
  playSeconds: 18,
  Scene,
}
