import { useEffect } from 'react'
import { SITES, firstYear } from '../data/sites'
import { UI } from '../data/ui'
import { MAP_YEAR_MAX, MAP_YEAR_MIN, PERIODS, formatYear, periodAt, progressFromYear, yearFromProgress } from '../data/years'
import { useT } from '../lib/useLang'
import { actions, store, useStore } from '../state/store'

const STEPS = 1000
const PLAY_SECONDS = 24

/** Sweeps the map's year from the beginning to today. */
function useYearPlayback() {
  const playing = useStore((s) => s.yearPlaying)
  useEffect(() => {
    if (!playing) return
    if (store.get().year >= MAP_YEAR_MAX) actions.setYear(MAP_YEAR_MIN)
    let frame = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = (now - last) / 1000
      last = now
      const p = Math.min(1, progressFromYear(store.get().year) + dt / PLAY_SECONDS)
      actions.setYear(yearFromProgress(p))
      if (p >= 1) actions.setYearPlaying(false)
      else frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [playing])
}

/** The map's time slider: 11,000 years of Lebanese history, coloured by period. */
export function TimeScrubber() {
  const year = useStore((s) => s.year)
  const playing = useStore((s) => s.yearPlaying)
  const lang = useStore((s) => s.lang)
  const tr = useT()
  useYearPlayback()

  const period = periodAt(year)
  const progress = progressFromYear(year)
  const lit = SITES.filter((s) => firstYear(s) <= year).length

  return (
    <section className="scrubber" aria-label={tr(UI.timeTravel)}>
      <div className="scrubber__head">
        <span className="scrubber__period" style={{ '--c': period.color } as React.CSSProperties}>
          {tr(period.name)}
        </span>
        <strong className="scrubber__year">{year >= MAP_YEAR_MAX ? tr(UI.today) : formatYear(year, lang)}</strong>
        <span className="scrubber__count">
          {lit} / {SITES.length} {tr(UI.sitesByYear)}
        </span>
      </div>
      <div className="scrubber__controls">
        <button
          type="button"
          className="btn btn--round"
          onClick={() => actions.setYearPlaying(!playing)}
          aria-label={playing ? tr(UI.pause) : tr(UI.play)}
          title={playing ? tr(UI.pause) : tr(UI.play)}
        >
          {playing ? '❚❚' : '▶'}
        </button>
        <div className="scrubber__track">
          <div className="scrubber__periods" aria-hidden="true">
            {PERIODS.map((p) => {
              const from = progressFromYear(Math.max(p.from, MAP_YEAR_MIN))
              const to = progressFromYear(Math.min(p.to, MAP_YEAR_MAX))
              return <span key={p.id} style={{ width: `${(to - from) * 100}%`, background: p.color }} title={p.name[lang]} />
            })}
          </div>
          <input
            type="range"
            min={0}
            max={STEPS}
            step={1}
            value={Math.round(progress * STEPS)}
            onChange={(e) => {
              actions.setYearPlaying(false)
              actions.setYear(yearFromProgress(Number(e.target.value) / STEPS))
            }}
            aria-label={tr(UI.year)}
            aria-valuetext={formatYear(year, lang)}
            style={{ '--progress': `${progress * 100}%` } as React.CSSProperties}
          />
        </div>
      </div>
    </section>
  )
}
