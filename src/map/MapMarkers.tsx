import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { CATEGORIES } from '../data/regions'
import { SITES, firstYear } from '../data/sites'
import { OverlayHtml, type OverlayRef } from '../experiences/shared/OverlayHtml'
import { useT } from '../lib/useLang'
import { actions, useStore } from '../state/store'
import { filterSites } from './filter'
import { sitePosition } from './positions'

/** Camera distance below which every marker shows its name. */
const LABEL_DISTANCE = 210
const origin = new THREE.Vector3()

/** One pin per site; dimmed until the map's year reaches the start of its story. */
export function MapMarkers({ portal }: { portal: OverlayRef }) {
  const focused = useStore((s) => s.focused)
  const hovered = useStore((s) => s.hovered)
  const year = useStore((s) => s.year)
  const filter = useStore((s) => s.filter)
  const query = useStore((s) => s.query)
  const tr = useT()
  const [zoomed, setZoomed] = useState(false)
  const frame = useRef(0)

  useFrame(({ camera, controls }) => {
    if (frame.current++ % 10 !== 0) return
    const target = (controls as { target?: THREE.Vector3 } | null)?.target ?? origin
    const near = camera.position.distanceTo(target) < LABEL_DISTANCE
    if (near !== zoomed) setZoomed(near)
  })

  const visible = filterSites(SITES, filter, query)

  return (
    <>
      {visible.map((site) => {
        const active = focused === site.id
        const dim = firstYear(site) > year
        const showLabel = zoomed || active || hovered === site.id
        return (
          <OverlayHtml key={site.id} portal={portal} position={sitePosition(site)} center zIndexRange={[12, 0]}>
            <button
              type="button"
              className={`pin${active ? ' pin--active' : ''}${dim ? ' pin--dim' : ''}${showLabel ? ' pin--labelled' : ''}`}
              style={{ '--pin': CATEGORIES[site.category].color } as React.CSSProperties}
              onClick={() => actions.focus(active ? null : site.id)}
              onPointerEnter={() => actions.hover(site.id)}
              onPointerLeave={() => actions.hover(null)}
              aria-pressed={active}
              aria-label={tr(site.name)}
            >
              <span className="pin__dot" />
              <span className="pin__label">{tr(site.name)}</span>
            </button>
          </OverlayHtml>
        )
      })}
    </>
  )
}
