import type { Site, SiteEvent } from '../types'
import { ANJAR } from './anjar'
import { BAALBEK } from './baalbek'
import { BAATARA_GORGE } from './baatara-gorge'
import { BEAUFORT_CASTLE } from './beaufort-castle'
import { BEITEDDINE_PALACE } from './beiteddine-palace'
import { BYBLOS } from './byblos'
import { CEDARS_OF_GOD } from './cedars-of-god'
import { HARISSA } from './harissa'
import { JEITA_GROTTO } from './jeita-grotto'
import { NATIONAL_MUSEUM } from './national-museum'
import { RAOUCHE_ROCKS } from './raouche-rocks'
import { SIDON_SEA_CASTLE } from './sidon-sea-castle'
import { TRIPOLI_CITADEL } from './tripoli-citadel'
import { TYRE } from './tyre'

/** Every place on the map, roughly north to south. */
export const SITES: Site[] = [
  TRIPOLI_CITADEL,
  CEDARS_OF_GOD,
  BAATARA_GORGE,
  BYBLOS,
  HARISSA,
  JEITA_GROTTO,
  BAALBEK,
  RAOUCHE_ROCKS,
  NATIONAL_MUSEUM,
  ANJAR,
  BEITEDDINE_PALACE,
  SIDON_SEA_CASTLE,
  BEAUFORT_CASTLE,
  TYRE,
]

export function siteById(id: string | null | undefined): Site | undefined {
  return SITES.find((s) => s.id === id)
}

/** Great-circle distance between two sites in kilometres. */
export function distanceKm(a: Site, b: Site): number {
  const rad = Math.PI / 180
  const dLat = (b.coords[0] - a.coords[0]) * rad
  const dLon = (b.coords[1] - a.coords[1]) * rad
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(a.coords[0] * rad) * Math.cos(b.coords[0] * rad) * Math.sin(dLon / 2) ** 2
  return 2 * 6371 * Math.asin(Math.sqrt(h))
}

export function nearbySites(site: Site, count = 3): Array<{ site: Site; km: number }> {
  return SITES.filter((s) => s.id !== site.id)
    .map((s) => ({ site: s, km: distanceKm(site, s) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, count)
}

/** The year a site's story begins on the map's time slider. */
export function firstYear(site: Site): number {
  return site.events[0]?.year ?? Infinity
}

/** The most recent event that had already happened by `year`, if any. */
export function latestEventAt(site: Site, year: number): SiteEvent | undefined {
  let latest: SiteEvent | undefined
  for (const e of site.events) {
    if (e.year <= year) latest = e
    else break
  }
  return latest
}
