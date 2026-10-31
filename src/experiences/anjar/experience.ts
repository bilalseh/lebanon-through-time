import type { Experience } from '../types'
import { ERAS, HOTSPOTS } from './content'
import { Scene } from './Scene'
import { TIMELINE_MAX } from './layout'

export const experience: Experience = {
  id: 'anjar',
  timelineMax: TIMELINE_MAX,
  eras: ERAS,
  hotspots: HOTSPOTS,
  overview: { position: [-330, 230, 420], target: [20, 0, 10] },
  controls: { minDistance: 14, maxDistance: 1100 },
  camera: { fov: 45, near: 1, far: 6000 },
  playSeconds: 16,
  Scene,
}
