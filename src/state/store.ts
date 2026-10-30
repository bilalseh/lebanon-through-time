import { useSyncExternalStore } from 'react'
import type { Lang } from '../data/content'

export interface AppState {
  /** Timeline value, 0 (c. 60 AD) to 3 (today). */
  t: number
  /** Selected hotspot id, or null for the overview. */
  selected: string | null
  lang: Lang
  started: boolean
  touring: boolean
  playing: boolean
  /** Increments whenever the camera should fly to the current selection. */
  flight: number
}

type Listener = () => void

/** A tiny observable store; avoids pulling in a state library for a handful of fields. */
function createStore(initial: AppState) {
  let state = initial
  const listeners = new Set<Listener>()
  return {
    get: () => state,
    set(patch: Partial<AppState> | ((s: AppState) => Partial<AppState>)) {
      const next = typeof patch === 'function' ? patch(state) : patch
      state = { ...state, ...next }
      listeners.forEach((l) => l())
    },
    subscribe(listener: Listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
  }
}

const savedLang = (() => {
  try {
    const v = localStorage.getItem('baalbek-lang')
    return v === 'ar' || v === 'en' ? v : null
  } catch {
    return null
  }
})()

export const store = createStore({
  t: 3,
  selected: null,
  lang: savedLang ?? (navigator.language?.startsWith('ar') ? 'ar' : 'en'),
  started: false,
  touring: false,
  playing: false,
  flight: 0,
})

export function useStore<T>(selector: (s: AppState) => T): T {
  return useSyncExternalStore(store.subscribe, () => selector(store.get()))
}

export const actions = {
  select(id: string | null) {
    store.set((s) => ({ selected: id, flight: s.flight + 1 }))
  },
  setT(t: number) {
    store.set({ t })
  },
  setLang(lang: Lang) {
    try {
      localStorage.setItem('baalbek-lang', lang)
    } catch {
      /* storage unavailable: language just won't be remembered */
    }
    store.set({ lang })
  },
  start() {
    store.set({ started: true })
  },
  setTouring(touring: boolean) {
    store.set({ touring })
  },
  setPlaying(playing: boolean) {
    store.set({ playing })
  },
}
