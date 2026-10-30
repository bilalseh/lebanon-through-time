import { useEffect } from 'react'
import { HOTSPOTS } from '../data/content'
import { TIMELINE_MAX } from '../data/templeLayout'
import { actions, store, useStore } from '../state/store'

const PLAY_SECONDS = 14
const TOUR_STEP_MS = 8000

/** Animates the timeline from its current value (or from the start) to today. */
export function useHistoryPlayback() {
  const playing = useStore((s) => s.playing)
  useEffect(() => {
    if (!playing) return
    if (store.get().t >= TIMELINE_MAX) actions.setT(0)
    let frame = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = (now - last) / 1000
      last = now
      const next = Math.min(TIMELINE_MAX, store.get().t + (dt * TIMELINE_MAX) / PLAY_SECONDS)
      actions.setT(next)
      if (next >= TIMELINE_MAX) actions.setPlaying(false)
      else frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [playing])
}

/** Guided tour: visits each point of interest in turn, then returns to the overview. */
export function useGuidedTour() {
  const touring = useStore((s) => s.touring)
  useEffect(() => {
    if (!touring) return
    let step = 0
    actions.select(HOTSPOTS[0].id)
    const timer = window.setInterval(() => {
      step += 1
      if (step >= HOTSPOTS.length) {
        actions.select(null)
        actions.setTouring(false)
      } else {
        actions.select(HOTSPOTS[step].id)
      }
    }, TOUR_STEP_MS)
    return () => window.clearInterval(timer)
  }, [touring])
}
