import { useEffect } from 'react'
import type { Experience } from '../experiences/types'
import { actions, store, useStore } from '../state/store'
import { cancel, narrate as readAloud } from './narration'
import { eraKey, eraText } from './narrationTexts'

const TOUR_STEP_MS = 8000

/**
 * Animates an experience's timeline from its current value (or from the start)
 * to today. With narration on, the animation stops at each era, reads its text
 * and only then moves on (or sooner, if the narration is skipped).
 */
export function useHistoryPlayback(experience: Experience | null) {
  const playing = useStore((s) => s.playing)
  const narrate = useStore((s) => s.narrate)
  const lang = useStore((s) => s.lang)
  useEffect(() => {
    if (!playing || !experience) return
    const { timelineMax: max, eras, playSeconds } = experience
    if (store.get().t >= max) actions.setT(0)
    // Eras already behind the playhead are not read again.
    const spoken = new Set(eras.filter((e) => e.t < store.get().t - 0.001).map((e) => e.t))
    let frame = 0
    let alive = true
    let speaking = false
    let last = performance.now()

    const tick = (now: number) => {
      if (!alive) return
      const dt = (now - last) / 1000
      last = now
      if (!speaking) {
        const t = store.get().t
        const due = narrate ? eras.find((e) => !spoken.has(e.t) && e.t <= t + 0.001) : undefined
        if (due) {
          spoken.add(due.t)
          actions.setT(due.t)
          speaking = true
          readAloud(eraKey(experience.id, eras.indexOf(due)), eraText(due, lang), lang).then(() => {
            speaking = false
            last = performance.now()
          })
        } else {
          const next = Math.min(max, t + (dt * max) / playSeconds)
          actions.setT(next)
          if (next >= max && (!narrate || spoken.has(eras[eras.length - 1].t))) {
            actions.setPlaying(false)
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
  }, [playing, experience, narrate, lang])
}

/** Guided tour: visits each point of interest in turn, then returns to the overview. */
export function useGuidedTour(experience: Experience | null) {
  const touring = useStore((s) => s.touring)
  useEffect(() => {
    if (!touring || !experience) return
    const { hotspots } = experience
    let step = 0
    actions.select(hotspots[0].id)
    const timer = window.setInterval(() => {
      step += 1
      if (step >= hotspots.length) {
        actions.select(null)
        actions.setTouring(false)
      } else {
        actions.select(hotspots[step].id)
      }
    }, TOUR_STEP_MS)
    return () => window.clearInterval(timer)
  }, [touring, experience])
}
