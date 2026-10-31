import { describe, expect, it } from 'vitest'
import { MAP_YEAR_MAX, MAP_YEAR_MIN, PERIODS, formatYear, periodAt, progressFromYear, yearFromProgress } from './years'

describe('formatYear', () => {
  it('formats BC, early AD and modern years in English', () => {
    expect(formatYear(-2750, 'en')).toBe('2750 BC')
    expect(formatYear(60, 'en')).toBe('60 AD')
    expect(formatYear(1759, 'en')).toBe('1759')
    expect(formatYear(-332, 'en', true)).toBe('c. 332 BC')
  })

  it('formats years in Arabic', () => {
    expect(formatYear(-2750, 'ar')).toBe('2750 ق.م')
    expect(formatYear(1759, 'ar')).toBe('1759 م')
    expect(formatYear(60, 'ar', true)).toBe('نحو 60 م')
  })
})

describe('periods', () => {
  it('cover every year without gaps or overlaps', () => {
    for (let i = 1; i < PERIODS.length; i++) expect(PERIODS[i].from).toBe(PERIODS[i - 1].to)
    expect(PERIODS[0].from).toBe(-Infinity)
    expect(PERIODS[PERIODS.length - 1].to).toBe(Infinity)
  })

  it('classifies well-known years', () => {
    expect(periodAt(-332).id).toBe('hellenistic')
    expect(periodAt(60).id).toBe('roman')
    expect(periodAt(1228).id).toBe('crusader')
    expect(periodAt(1984).id).toBe('modern')
  })
})

describe('map time slider', () => {
  it('maps the ends of the slider to the first and last year', () => {
    expect(yearFromProgress(0)).toBe(MAP_YEAR_MIN)
    expect(yearFromProgress(1)).toBe(MAP_YEAR_MAX)
  })

  it('is monotonic and round-trips through progress', () => {
    let previous = MAP_YEAR_MIN - 1
    for (let p = 0; p <= 1; p += 0.01) {
      const year = yearFromProgress(p)
      expect(year).toBeGreaterThanOrEqual(previous)
      expect(yearFromProgress(progressFromYear(year))).toBe(year)
      previous = year
    }
  })

  it('gives recent centuries more room than early millennia', () => {
    const early = progressFromYear(-8000) - progressFromYear(-9000)
    const recent = progressFromYear(1900) - progressFromYear(1800)
    expect(recent).toBeGreaterThan(early)
  })
})
