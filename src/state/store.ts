import { useSyncExternalStore } from 'react'
import type { Category, Lang } from '../data/types'
import { MAP_YEAR_MAX } from '../data/years'
import { parsePath, type View } from '../lib/router'

export interface AppState {
  lang: Lang
  view: View
  /* Map */
  /** Site highlighted on the map (its card is shown and the camera flies to it). */
  focused: string | null
  hovered: string | null
  /** Year shown by the map's time slider. */
  year: number
  yearPlaying: boolean
  filter: Category | 'all'
  query: string
  /** Increments whenever the map camera should fly to the focused site (or the overview). */
  mapFlight: number
  /* 3D experience */
  /** Timeline value of the open experience, 0 to its timelineMax. */
  t: number
  /** Selected hotspot id, or null for the overview. */
  selected: string | null
  touring: boolean
  playing: boolean
  /** Increments whenever the experience camera should fly to the current selection. */
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

const LANG_KEY = 'ltt-lang'

const savedLang = (() => {
  try {
    const v = localStorage.getItem(LANG_KEY)
    return v === 'ar' || v === 'en' ? v : null
  } catch {
    return null
  }
})()

const initialView = typeof location === 'undefined' ? { kind: 'map' as const } : parsePath(location.pathname)

export const store = createStore({
  lang: savedLang ?? (navigator.language?.startsWith('ar') ? 'ar' : 'en'),
  view: initialView,
  focused: initialView.kind === 'map' ? null : initialView.id,
  hovered: null,
  year: MAP_YEAR_MAX,
  yearPlaying: false,
  filter: 'all',
  query: '',
  mapFlight: 0,
  t: 0,
  selected: null,
  touring: false,
  playing: false,
  flight: 0,
})

export function useStore<T>(selector: (s: AppState) => T): T {
  return useSyncExternalStore(store.subscribe, () => selector(store.get()))
}

export const actions = {
  setLang(lang: Lang) {
    try {
      localStorage.setItem(LANG_KEY, lang)
    } catch {
      /* storage unavailable: language just won't be remembered */
    }
    store.set({ lang })
  },
  /** Navigation goes through here so the URL and the view never drift apart. */
  navigate(view: View) {
    store.set({ view, touring: false, playing: false, yearPlaying: false })
  },
  focus(id: string | null) {
    store.set((s) => ({ focused: id, mapFlight: s.mapFlight + 1 }))
  },
  hover(id: string | null) {
    store.set({ hovered: id })
  },
  setYear(year: number) {
    store.set({ year })
  },
  setYearPlaying(yearPlaying: boolean) {
    store.set({ yearPlaying })
  },
  setFilter(filter: Category | 'all') {
    store.set({ filter })
  },
  setQuery(query: string) {
    store.set({ query })
  },
  /* 3D experience */
  select(id: string | null) {
    store.set((s) => ({ selected: id, flight: s.flight + 1 }))
  },
  setT(t: number) {
    store.set({ t })
  },
  setTouring(touring: boolean) {
    store.set({ touring })
  },
  setPlaying(playing: boolean) {
    store.set({ playing })
  },
  resetExperience(t: number) {
    store.set({ t, selected: null, touring: false, playing: false, flight: 0 })
  },
}
