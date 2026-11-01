import { useEffect } from 'react'
import { SITES, firstYear } from '../data/sites'
import { UI } from '../data/ui'
import { MAP_YEAR_MAX, MAP_YEAR_MIN, PERIODS, formatYear, periodAt, progressFromYear, yearFromProgress } from '../data/years'
import { cancel, narrate as readAloud } from '../lib/narration'
import { tourKey, tourText } from '../lib/narrationTexts'
import { useT } from '../lib/useLang'
import { actions, store, useStore } from '../state/store'

const STEPS = 1000
const PLAY_SECONDS = 24

/**
 * Sweeps the map's year from the beginning to today. With narration on it
 * becomes a guided tour: the sweep pauses at each place as its story begins,
 * flies there and reads its first chapter before moving on.
 */
function useYearPlayback() {
  const playing = useStore((s) => s.yearPlaying)
  const narrate = useStore((s) => s.narrate)
  const lang = useStore((s) => s.lang)
  useEffect(() => {
    if (!playing) return
    if (store.get().year >= MAP_YEAR_MAX) actions.setYear(MAP_YEAR_MIN)
    const lit = new Set(SITES.filter((s) => firstYear(s) <= store.get().year).map((s) => s.id))
    let frame = 0
    let alive = true
    let speaking = false
    let last = performance.now()

    const tick = (now: number) => {
      if (!alive) return
      const dt = (now - last) / 1000
      last = now
      if (!speaking) {
        const year = store.get().year
        const newcomer = narrate ? SITES.find((s) => !lit.has(s.id) && firstYear(s) <= year) : undefined
        if (newcomer) {
          lit.add(newcomer.id)
          const first = newcomer.events[0]
          actions.setYear(first.year)
          actions.focus(newcomer.id)
          speaking = true
          readAloud(tourKey(newcomer.id), tourText(newcomer, lang), lang).then(() => {
            speaking = false
            last = performance.now()
          })
        } else {
          const p = Math.min(1, progressFromYear(year) + dt / PLAY_SECONDS)
          const next = yearFromProgress(p)
          actions.setYear(next)
          // Without narration nobody is announced, so just keep the set current.
          if (!narrate) for (const s of SITES) if (firstYear(s) <= next) lit.add(s.id)
          if (p >= 1) {
            actions.setYearPlaying(false)
            return
          }
        }
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => {
      alive = false
      cancelAnimationFrame(frame)
      cancel()
    }
  }, [playing, narrate, lang])
}

/** The map's time slider: 11,000 years of Lebanese history, coloured by period. */
export function TimeScrubber() {
  const year = useStore((s) => s.year)
  const playing = useStore((s) => s.yearPlaying)
  const narrate = useStore((s) => s.narrate)
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
        {playing && narrate && (
          <button type="button" className="btn btn--round" onClick={() => cancel()} aria-label={tr(UI.skip)} title={tr(UI.skip)}>
            ⏭
          </button>
        )}
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
