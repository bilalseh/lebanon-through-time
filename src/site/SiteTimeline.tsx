import { useEffect, useRef, useState } from 'react'
import type { Site } from '../data/types'
import { UI } from '../data/ui'
import { formatYear, periodAt } from '../data/years'
import { cancel, narrationSupported, speak } from '../lib/narration'
import { useT } from '../lib/useLang'
import { useStore } from '../state/store'
import { NarrationToggle } from '../ui/NarrationToggle'

const STEP_MS = 4500
const AFTER_SPEECH_MS = 700

/** A site's history as a scrubbable row of dated stops with a card for the active one. */
export function SiteTimeline({ site }: { site: Site }) {
  const { events } = site
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const lang = useStore((s) => s.lang)
  const narrate = useStore((s) => s.narrate) && narrationSupported
  const rtl = lang === 'ar'
  const tr = useT()
  const event = events[index]
  const period = periodAt(event.year)
  const track = useRef<HTMLDivElement>(null)
  const mounted = useRef(false)

  // Keep the active stop in view when the row of ticks scrolls (phones, long timelines).
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    const el = track.current
    const tick = el?.querySelector<HTMLElement>('.is-active')
    if (!el || !tick) return
    // Scroll the track only; scrollIntoView would also shift the page container.
    el.scrollTo({ left: tick.offsetLeft - el.clientWidth / 2 + tick.clientWidth / 2, behavior: 'smooth' })
  }, [index])

  // While playing, each stop is read aloud (or simply shown for a few seconds) before the next one.
  useEffect(() => {
    if (!playing) return
    let alive = true
    let timer = 0
    const advance = () => {
      if (!alive) return
      if (index + 1 >= events.length) setPlaying(false)
      else setIndex(index + 1)
    }
    if (narrate) {
      const current = events[index]
      speak(`${formatYear(current.year, lang, current.approx)}. ${current.title[lang]}. ${current.text[lang]}`, lang).then(() => {
        if (alive) timer = window.setTimeout(advance, AFTER_SPEECH_MS)
      })
    } else {
      timer = window.setTimeout(advance, STEP_MS)
    }
    return () => {
      alive = false
      window.clearTimeout(timer)
      cancel()
    }
  }, [playing, index, narrate, lang, events])

  const go = (i: number) => setIndex(Math.min(events.length - 1, Math.max(0, i)))

  const onKeyDown = (e: React.KeyboardEvent) => {
    const forward = rtl ? 'ArrowLeft' : 'ArrowRight'
    const back = rtl ? 'ArrowRight' : 'ArrowLeft'
    if (e.key === forward) go(index + 1)
    else if (e.key === back) go(index - 1)
    else if (e.key === 'Home') go(0)
    else if (e.key === 'End') go(events.length - 1)
    else return
    e.preventDefault()
  }

  return (
    <div className="stl">
      <div className="stl__track" ref={track} role="list" tabIndex={0} onKeyDown={onKeyDown} aria-label={tr(UI.timeline)}>
        <div className="stl__line" aria-hidden="true" />
        <div className="stl__progress" aria-hidden="true" style={{ width: `${(index / Math.max(1, events.length - 1)) * 100}%` }} />
        {events.map((e, i) => (
          <button
            type="button"
            role="listitem"
            key={`${e.year}-${i}`}
            className={`stl__tick${i === index ? ' is-active' : ''}${i < index ? ' is-past' : ''}`}
            style={{ '--c': periodAt(e.year).color } as React.CSSProperties}
            onClick={() => go(i)}
            aria-current={i === index}
            aria-label={`${formatYear(e.year, lang, e.approx)}: ${tr(e.title)}`}
          >
            <span className="stl__dot" />
            <span className="stl__year">{formatYear(e.year, lang, e.approx)}</span>
          </button>
        ))}
      </div>

      <article className="stl__card" key={index} aria-live="polite">
        <span className="stl__period" style={{ '--c': period.color } as React.CSSProperties}>
          {tr(period.name)}
        </span>
        <h3>
          <span className="stl__big-year">{formatYear(event.year, lang, event.approx)}</span>
          {tr(event.title)}
        </h3>
        <p>{tr(event.text)}</p>
        <div className="stl__nav">
          <button type="button" className="btn btn--ghost" disabled={index === 0} onClick={() => go(index - 1)} aria-label={tr(UI.previous)}>
            {rtl ? '›' : '‹'}
          </button>
          <button type="button" className="btn btn--round" onClick={() => setPlaying((p) => !p)} aria-label={playing ? tr(UI.pause) : tr(UI.play)}>
            {playing ? '❚❚' : '▶'}
          </button>
          <NarrationToggle compact />
          <span className="stl__counter" dir="ltr">
            {index + 1} / {events.length}
          </span>
          <button
            type="button"
            className="btn btn--ghost"
            disabled={index === events.length - 1}
            onClick={() => go(index + 1)}
            aria-label={tr(UI.next)}
          >
            {rtl ? '‹' : '›'}
          </button>
        </div>
      </article>
    </div>
  )
}
