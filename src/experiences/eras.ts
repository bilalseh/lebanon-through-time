import type { Era } from '../data/types'

/** The era whose stop is closest to timeline value `t`. */
export function nearestEra(eras: Era[], t: number): Era {
  return eras.reduce((best, era) => (Math.abs(era.t - t) < Math.abs(best.t - t) ? era : best), eras[0])
}
