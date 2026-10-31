export type Lang = 'en' | 'ar'
export type Localized = Record<Lang, string>

export type Category = 'ancient' | 'castle' | 'nature' | 'religious' | 'museum'

export type RegionId =
  | 'akkar'
  | 'north'
  | 'mount-lebanon'
  | 'beirut'
  | 'bekaa'
  | 'baalbek-hermel'
  | 'south'
  | 'nabatieh'

export interface SiteEvent {
  /** Astronomical year: negative for BC, so -332 is 332 BC. */
  year: number
  /** Marks an approximate date, shown as "c. 2750 BC". */
  approx?: boolean
  title: Localized
  text: Localized
}

export interface Photo {
  /** Large image path, e.g. /photos/byblos/castle.jpg (about 1280 px wide). */
  src: string
  /** Small image path for grids and cards (about 480 px wide). */
  thumb: string
  caption: Localized
  author: string
  license: string
  licenseUrl: string
  /** The Wikimedia Commons file page this photo came from. */
  source: string
  /** Year the photograph was taken, for historical photographs. */
  year?: number
}

export interface Site {
  id: string
  name: Localized
  tagline: Localized
  summary: Localized
  category: Category
  region: RegionId
  /** [latitude, longitude] in degrees. */
  coords: [number, number]
  /** Year of inscription on the UNESCO World Heritage List. */
  unesco?: number
  facts: Localized[]
  /** Sorted by year, oldest first. */
  events: SiteEvent[]
  photos: Photo[]
  /** True when a 3D timeline experience is registered for this site. */
  experience?: boolean
}

/** A point of interest inside a 3D experience. */
export interface Hotspot {
  id: string
  label: Localized
  title: Localized
  body: Localized
  facts: Localized[]
  /** Where the marker floats in the scene. */
  position: [number, number, number]
  /** Where the camera flies to, and what it looks at. */
  camera: { position: [number, number, number]; target: [number, number, number] }
  /** Timeline value from which the marker is shown (its subject does not exist before). */
  visibleFrom?: number
}

/** A labelled stop on a 3D experience's timeline (t runs from 0 to the experience's max). */
export interface Era {
  t: number
  label: Localized
  title: Localized
  text: Localized
}
