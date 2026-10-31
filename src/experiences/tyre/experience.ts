import type { Experience } from '../types'
import { ERAS, HOTSPOTS } from './content'
import { Scene } from './Scene'
import { TIMELINE_MAX } from './layout'

export const experience: Experience = {
  id: 'tyre',
  timelineMax: TIMELINE_MAX,
  eras: ERAS,
  hotspots: HOTSPOTS,
  overview: { position: [-120, 300, 620], target: [40, 0, 20] },
  controls: { minDistance: 14, maxDistance: 1400 },
  camera: { fov: 45, near: 1, far: 7000 },
  playSeconds: 18,
  Scene,
}
