import type { Category, Site } from '../data/types'

/** Sites matching the category chip and the search box (either language). */
export function filterSites(sites: Site[], filter: Category | 'all', query: string): Site[] {
  const q = query.trim().toLowerCase()
  return sites.filter((s) => {
    if (filter !== 'all' && s.category !== filter) return false
    if (!q) return true
    return [s.name.en, s.name.ar, s.tagline.en, s.tagline.ar].some((text) => text.toLowerCase().includes(q))
  })
}
