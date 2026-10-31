import type { Hotspot } from '../../data/types'
import { actions, useStore } from '../../state/store'
import { useT } from '../../lib/useLang'
import { OverlayHtml, type OverlayRef } from './OverlayHtml'

/** Clickable markers floating above each point of interest; a marker waits until its subject exists on the timeline. */
export function Hotspots({ hotspots, portal }: { hotspots: Hotspot[]; portal: OverlayRef }) {
  const selected = useStore((s) => s.selected)
  const t = useStore((s) => s.t)
  const tr = useT()

  return (
    <>
      {hotspots.map((h, i) => {
        const hidden = h.visibleFrom !== undefined && t < h.visibleFrom && selected !== h.id
        if (hidden) return null
        return (
          <OverlayHtml key={h.id} portal={portal} position={h.position} center zIndexRange={[20, 0]}>
            <button
              type="button"
              className={`marker${selected === h.id ? ' marker--active' : ''}`}
              onClick={() => actions.select(selected === h.id ? null : h.id)}
              aria-pressed={selected === h.id}
            >
              <span className="marker__dot">{i + 1}</span>
              <span className="marker__label">{tr(h.label)}</span>
            </button>
          </OverlayHtml>
        )
      })}
    </>
  )
}
