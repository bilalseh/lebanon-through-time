import { useEffect } from 'react'
import type { Experience } from '../experiences/types'
import { actions, store, useStore } from '../state/store'

const TOUR_STEP_MS = 8000

/** Animates an experience's timeline from its current value (or from the start) to today. */
export function useHistoryPlayback(experience: Experience | null) {
  const playing = useStore((s) => s.playing)
  useEffect(() => {
    if (!playing || !experience) return
    const max = experience.timelineMax
    if (store.get().t >= max) actions.setT(0)
    let frame = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = (now - last) / 1000
      last = now
      const next = Math.min(max, store.get().t + (dt * max) / experience.playSeconds)
      actions.setT(next)
      if (next >= max) actions.setPlaying(false)
      else frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [playing, experience])
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
