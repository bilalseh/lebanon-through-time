import type { Hotspot } from '../data/types'
import { UI } from '../data/ui'
import { actions, useStore } from '../state/store'
import { useT } from '../lib/useLang'

export function InfoPanel({ hotspots }: { hotspots: Hotspot[] }) {
  const selected = useStore((s) => s.selected)
  const rtl = useStore((s) => s.lang === 'ar')
  const tr = useT()
  const hotspot = hotspots.find((h) => h.id === selected)
  if (!hotspot) return null
  const index = hotspots.indexOf(hotspot)

  return (
    <aside className="info" aria-live="polite" key={hotspot.id}>
      <button type="button" className="info__close" onClick={() => actions.select(null)} aria-label={tr(UI.close)}>
        ×
      </button>
      <span className="info__eyebrow" dir="ltr">
        {index + 1} / {hotspots.length}
      </span>
      <h2>{tr(hotspot.title)}</h2>
      <p>{tr(hotspot.body)}</p>
      <ul className="info__facts">
        {hotspot.facts.map((f) => (
          <li key={f.en}>{tr(f)}</li>
        ))}
      </ul>
      <div className="info__nav">
        <button
          type="button"
          className="btn btn--ghost"
          disabled={index === 0}
          onClick={() => actions.select(hotspots[index - 1].id)}
          aria-label={tr(UI.previous)}
        >
          {rtl ? '›' : '‹'}
        </button>
        <button
          type="button"
          className="btn btn--ghost"
          disabled={index === hotspots.length - 1}
          onClick={() => actions.select(hotspots[index + 1].id)}
          aria-label={tr(UI.next)}
        >
          {rtl ? '‹' : '›'}
        </button>
      </div>
    </aside>
  )
}
