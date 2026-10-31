import type { ComponentType } from 'react'
import type { Era, Hotspot } from '../data/types'

/**
 * A 3D timeline experience for one site. The scene component reads the
 * timeline value `t` (0 to timelineMax) and the selection from the store and
 * draws the site at that moment; everything else (camera flights, markers,
 * playback, the timeline UI) is shared.
 */
export interface Experience {
  id: string
  timelineMax: number
  eras: Era[]
  hotspots: Hotspot[]
  overview: { position: [number, number, number]; target: [number, number, number] }
  controls: { minDistance: number; maxDistance: number; maxPolarAngle?: number }
  camera?: { fov?: number; near?: number; far?: number }
  /** Seconds "play history" takes to run from the start to today. */
  playSeconds: number
  Scene: ComponentType
}

export type ExperienceModule = { experience: Experience }

/** Lazy loaders so each 3D scene is only downloaded when it is opened. */
export const EXPERIENCES: Record<string, () => Promise<ExperienceModule>> = {
  baalbek: () => import('./baalbek/experience'),
  'sidon-sea-castle': () => import('./sidon/experience'),
  anjar: () => import('./anjar/experience'),
  tyre: () => import('./tyre/experience'),
  'cedars-of-god': () => import('./cedars/experience'),
}

export function hasExperience(id: string): boolean {
  return id in EXPERIENCES
}
