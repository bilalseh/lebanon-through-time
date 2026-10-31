import type { Lang, Localized } from './types'

/** "2750 BC", "60 AD", "1759"; Arabic uses ق.م and م. Approximate dates get a "c." prefix. */
export function formatYear(year: number, lang: Lang, approx = false): string {
  const n = Math.abs(year)
  let text: string
  if (lang === 'ar') text = year < 0 ? `${n} ق.م` : `${n} م`
  else text = year < 0 ? `${n} BC` : year < 1000 ? `${n} AD` : `${n}`
  if (!approx) return text
  return lang === 'ar' ? `نحو ${text}` : `c. ${text}`
}

export interface Period {
  id: string
  /** Inclusive start year. */
  from: number
  /** Exclusive end year. */
  to: number
  name: Localized
  color: string
}

/** Broad periods of Lebanese history, used to colour the map scrubber and label years. */
export const PERIODS: Period[] = [
  { id: 'prehistory', from: -Infinity, to: -3200, name: { en: 'Prehistory', ar: 'ما قبل التاريخ' }, color: '#6d6a63' },
  { id: 'bronze', from: -3200, to: -1200, name: { en: 'Bronze Age', ar: 'العصر البرونزي' }, color: '#8c6a3f' },
  { id: 'phoenician', from: -1200, to: -333, name: { en: 'Phoenician', ar: 'العصر الفينيقي' }, color: '#5b3e8c' },
  { id: 'hellenistic', from: -333, to: -64, name: { en: 'Hellenistic', ar: 'العصر الهلنستي' }, color: '#3f6e8c' },
  { id: 'roman', from: -64, to: 395, name: { en: 'Roman', ar: 'العصر الروماني' }, color: '#a03c3c' },
  { id: 'byzantine', from: 395, to: 636, name: { en: 'Byzantine', ar: 'العصر البيزنطي' }, color: '#b58a2a' },
  { id: 'early-islamic', from: 636, to: 1098, name: { en: 'Early Islamic', ar: 'العصر الإسلامي المبكر' }, color: '#2f7a5a' },
  { id: 'crusader', from: 1098, to: 1291, name: { en: 'Crusader and Ayyubid', ar: 'العصر الصليبي والأيوبي' }, color: '#8c4a2f' },
  { id: 'mamluk', from: 1291, to: 1516, name: { en: 'Mamluk', ar: 'العصر المملوكي' }, color: '#3e7a8c' },
  { id: 'ottoman', from: 1516, to: 1918, name: { en: 'Ottoman', ar: 'العصر العثماني' }, color: '#8c2f5a' },
  { id: 'mandate', from: 1918, to: 1943, name: { en: 'French Mandate', ar: 'الانتداب الفرنسي' }, color: '#4f5f8c' },
  { id: 'modern', from: 1943, to: Infinity, name: { en: 'Independent Lebanon', ar: 'لبنان المستقل' }, color: '#c0392b' },
]

export function periodAt(year: number): Period {
  return PERIODS.find((p) => year >= p.from && year < p.to) ?? PERIODS[PERIODS.length - 1]
}

/**
 * The map's time slider covers 11,000 years, so it is not linear: recent
 * centuries, where most events cluster, get more room than early millennia.
 * Knots are [slider position 0..1, year].
 */
const KNOTS: Array<[number, number]> = [
  [0, -9000],
  [0.14, -3000],
  [0.3, -1000],
  [0.46, 0],
  [0.66, 1000],
  [0.82, 1500],
  [1, 2026],
]

export const MAP_YEAR_MIN = KNOTS[0][1]
export const MAP_YEAR_MAX = KNOTS[KNOTS.length - 1][1]

export function yearFromProgress(p: number): number {
  const x = Math.min(1, Math.max(0, p))
  for (let i = 1; i < KNOTS.length; i++) {
    const [p0, y0] = KNOTS[i - 1]
    const [p1, y1] = KNOTS[i]
    if (x <= p1) return Math.round(y0 + ((x - p0) / (p1 - p0)) * (y1 - y0))
  }
  return MAP_YEAR_MAX
}

export function progressFromYear(year: number): number {
  const y = Math.min(MAP_YEAR_MAX, Math.max(MAP_YEAR_MIN, year))
  for (let i = 1; i < KNOTS.length; i++) {
    const [p0, y0] = KNOTS[i - 1]
    const [p1, y1] = KNOTS[i]
    if (y <= y1) return p0 + ((y - y0) / (y1 - y0)) * (p1 - p0)
  }
  return 1
}
