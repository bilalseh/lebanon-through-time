import { useEffect } from 'react'
import { store } from '../state/store'
import { parsePath, pathFor } from './router'

/** Keeps the browser URL and the store's view in step, in both directions. */
export function useRouter() {
  useEffect(() => {
    const onPop = () => store.set({ view: parsePath(location.pathname), touring: false, playing: false })
    window.addEventListener('popstate', onPop)
    const unsubscribe = store.subscribe(() => {
      const path = pathFor(store.get().view)
      if (path !== location.pathname) {
        history.pushState(null, '', path)
        window.scrollTo(0, 0)
      }
    })
    return () => {
      window.removeEventListener('popstate', onPop)
      unsubscribe()
    }
  }, [])
}
