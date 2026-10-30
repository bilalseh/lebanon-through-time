import { HOTSPOTS, UI } from '../data/content'
import { actions, useStore } from '../state/store'
import { useT } from '../lib/useLang'

/** Keyboard- and screen-reader-friendly alternative to the 3D markers. */
export function PlacesList() {
  const selected = useStore((s) => s.selected)
  const tr = useT()
  return (
    <nav className="places" aria-label={tr(UI.places)}>
      <h2>{tr(UI.places)}</h2>
      <ol>
        <li>
          <button type="button" className={selected === null ? 'is-active' : ''} onClick={() => actions.select(null)}>
            <span className="places__num">•</span>
            {tr(UI.overview)}
          </button>
        </li>
        {HOTSPOTS.map((h, i) => (
          <li key={h.id}>
            <button
              type="button"
              className={selected === h.id ? 'is-active' : ''}
              onClick={() => actions.select(h.id)}
              aria-current={selected === h.id}
            >
              <span className="places__num">{i + 1}</span>
              {tr(h.label)}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}
