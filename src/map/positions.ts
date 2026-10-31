import type { Site } from '../data/types'
import { heightAt, project } from '../data/lebanon/terrain'

/** Where a site's marker sits on the relief map. */
export function sitePosition(site: Site): [number, number, number] {
  const [lat, lon] = site.coords
  const [x, z] = project(lat, lon)
  return [x, Math.max(0, heightAt(lat, lon)) + 0.6, z]
}
