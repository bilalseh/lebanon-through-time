import { useSyncExternalStore } from 'react'
import { UI } from '../data/ui'
import { cancel, narrationStatus, subscribeStatus, type NarrationStatus } from '../lib/narration'
import { useT } from '../lib/useLang'
import { actions, useStore } from '../state/store'

/** Whether the current language will be read from recordings, a browser voice, or not at all. */
export function useNarrationStatus(): NarrationStatus {
  const lang = useStore((s) => s.lang)
  return useSyncExternalStore(subscribeStatus, () => narrationStatus(lang))
}

/** Turns spoken narration on or off. */
export function NarrationToggle({ compact = false }: { compact?: boolean }) {
  const narrate = useStore((s) => s.narrate)
  const tr = useT()
  return (
    <button
      type="button"
      className={`btn btn--ghost btn--narration${narrate ? ' is-on' : ''}`}
      aria-pressed={narrate}
      title={tr(UI.narration)}
      aria-label={tr(UI.narration)}
      onClick={() => {
        if (narrate) cancel()
        actions.setNarrate(!narrate)
      }}
    >
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <path fill="currentColor" d="M3 9v6h4l5 4V5L7 9H3z" />
        {narrate ? (
          <path d="M16 8a4 4 0 0 1 0 8M18.5 5.5a8 8 0 0 1 0 13" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" />
        ) : (
          <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" fill="none" strokeWidth="1.8" strokeLinecap="round" />
        )}
      </svg>
      {!compact && <span>{tr(UI.narration)}</span>}
    </button>
  )
}

/** Explains why narration is silent: no recording and no voice for this language on this device. */
export function NarrationHint() {
  const narrate = useStore((s) => s.narrate)
  const status = useNarrationStatus()
  const tr = useT()
  if (!narrate || status !== 'none') return null
  return (
    <p className="narration-hint" role="status">
      {tr(UI.noVoice)}
    </p>
  )
}
