import type { Experience } from '../types'
import { ERAS, HOTSPOTS } from './content'
import { Scene } from './Scene'
import { TIMELINE_MAX } from './layout'

export const experience: Experience = {
  id: 'sidon-sea-castle',
  timelineMax: TIMELINE_MAX,
  eras: ERAS,
  hotspots: HOTSPOTS,
  overview: { position: [-105, 58, 125], target: [40, 4, 0] },
  controls: { minDistance: 10, maxDistance: 420 },
  camera: { fov: 45, near: 0.5, far: 3000 },
  playSeconds: 16,
  Scene,
}
