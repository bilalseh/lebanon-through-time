import { Html } from '@react-three/drei'
import { HOTSPOTS } from '../data/content'
import { actions, useStore } from '../state/store'
import { useT } from '../lib/useLang'

/** Clickable markers floating above each point of interest. */
export function Hotspots() {
  const selected = useStore((s) => s.selected)
  const started = useStore((s) => s.started)
  const tr = useT()
  if (!started) return null

  return (
    <>
      {HOTSPOTS.map((h, i) => (
        <Html key={h.id} position={h.position} center zIndexRange={[20, 0]}>
          <button
            type="button"
            className={`marker${selected === h.id ? ' marker--active' : ''}`}
            onClick={() => actions.select(selected === h.id ? null : h.id)}
            aria-pressed={selected === h.id}
          >
            <span className="marker__dot">{i + 1}</span>
            <span className="marker__label">{tr(h.label)}</span>
          </button>
        </Html>
      ))}
    </>
  )
}
