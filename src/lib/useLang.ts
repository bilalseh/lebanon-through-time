import { useStore } from '../state/store'
import type { Localized } from '../data/content'

/** Returns a translator bound to the current language. */
export function useT() {
  const lang = useStore((s) => s.lang)
  return (text: Localized) => text[lang]
}
