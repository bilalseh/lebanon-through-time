import type { Category, Localized, RegionId } from './types'

export const REGIONS: Record<RegionId, Localized> = {
  akkar: { en: 'Akkar', ar: 'عكار' },
  north: { en: 'North Lebanon', ar: 'الشمال' },
  'mount-lebanon': { en: 'Mount Lebanon', ar: 'جبل لبنان' },
  beirut: { en: 'Beirut', ar: 'بيروت' },
  bekaa: { en: 'Bekaa', ar: 'البقاع' },
  'baalbek-hermel': { en: 'Baalbek-Hermel', ar: 'بعلبك الهرمل' },
  south: { en: 'South Lebanon', ar: 'الجنوب' },
  nabatieh: { en: 'Nabatieh', ar: 'النبطية' },
}

export interface CategoryInfo {
  name: Localized
  /** Marker colour on the map. */
  color: string
}

export const CATEGORIES: Record<Category, CategoryInfo> = {
  ancient: { name: { en: 'Ancient cities', ar: 'مدن قديمة' }, color: '#e8c98a' },
  castle: { name: { en: 'Castles and palaces', ar: 'قلاع وقصور' }, color: '#d98c6b' },
  nature: { name: { en: 'Nature', ar: 'طبيعة' }, color: '#8fc77a' },
  religious: { name: { en: 'Religious sites', ar: 'مواقع دينية' }, color: '#9fb8e8' },
  museum: { name: { en: 'Museums', ar: 'متاحف' }, color: '#c9a0e8' },
}

export const CATEGORY_IDS = Object.keys(CATEGORIES) as Category[]
