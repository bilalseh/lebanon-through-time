import { SITES } from '../data/sites'
import type { Era, Lang, Site, SiteEvent } from '../data/types'
import { formatYear } from '../data/years'

/**
 * Everything the app can read aloud, with a stable key per clip. The same keys
 * name the pre-recorded files under public/audio/<lang>/<key>.mp3, so the
 * generator script and the player always agree.
 */
export interface Clip {
  key: string
  text: Record<Lang, string>
}

export const eventKey = (siteId: string, index: number) => `site-${siteId}-${index}`
export const tourKey = (siteId: string) => `tour-${siteId}`
export const eraKey = (experienceId: string, index: number) => `era-${experienceId}-${index}`

export function eventText(e: SiteEvent, lang: Lang): string {
  return `${formatYear(e.year, lang, e.approx)}. ${e.title[lang]}. ${e.text[lang]}`
}

/** What the map tour says when a place first appears. */
export function tourText(site: Site, lang: Lang): string {
  return `${site.name[lang]}. ${eventText(site.events[0], lang)}`
}

export function eraText(era: Era, lang: Lang): string {
  return `${era.title[lang]}. ${era.text[lang]}`
}

const both = (f: (lang: Lang) => string): Record<Lang, string> => ({ en: f('en'), ar: f('ar') })

/** All clips for the sites plus the eras of the given 3D experiences. */
export function allClips(experiences: Array<{ id: string; eras: Era[] }>): Clip[] {
  const clips: Clip[] = []
  for (const site of SITES) {
    clips.push({ key: tourKey(site.id), text: both((lang) => tourText(site, lang)) })
    site.events.forEach((e, i) => clips.push({ key: eventKey(site.id, i), text: both((lang) => eventText(e, lang)) }))
  }
  for (const exp of experiences) {
    exp.eras.forEach((era, i) => clips.push({ key: eraKey(exp.id, i), text: both((lang) => eraText(era, lang)) }))
  }
  return clips
}
