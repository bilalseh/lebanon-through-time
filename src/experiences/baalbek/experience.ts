import type { Experience } from '../types'
import { ERAS, HOTSPOTS } from './content'
import { Scene } from './Scene'
import { TIMELINE_MAX } from './templeLayout'

export const experience: Experience = {
  id: 'baalbek',
  timelineMax: TIMELINE_MAX,
  eras: ERAS,
  hotspots: HOTSPOTS,
  overview: { position: [150, 95, 170], target: [10, 8, 25] },
  controls: { minDistance: 12, maxDistance: 520 },
  camera: { fov: 45, near: 1, far: 4000 },
  playSeconds: 14,
  Scene,
}
