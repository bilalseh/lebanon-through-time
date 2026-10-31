import type { Site } from '../data/types'
import { heightAt, project } from '../data/lebanon/terrain'

/** Height of the little 3D glyph that marks a place on the map. */
export const GLYPH_HEIGHT = 7

/** Where a site's glyph stands on the relief map. */
export function sitePosition(site: Site): [number, number, number] {
  const [lat, lon] = site.coords
  const [x, z] = project(lat, lon)
  return [x, Math.max(0, heightAt(lat, lon)) + 0.3, z]
}

/** Where the site's pin floats: just above its glyph. */
export function pinPosition(site: Site): [number, number, number] {
  const [x, y, z] = sitePosition(site)
  return [x, y + GLYPH_HEIGHT + 1.5, z]
}
