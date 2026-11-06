import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { CATEGORIES } from '../data/regions'
import { SITES, firstYear, siteById } from '../data/sites'
import type { Site } from '../data/types'
import { OverlayHtml, type OverlayRef } from '../experiences/shared/OverlayHtml'
import { useT } from '../lib/useLang'
import { actions, useStore } from '../state/store'
import { declutter } from './declutter'
import { filterSites } from './filter'
import { pinPosition } from './positions'

/** Camera distance below which pins show their names (where there is room). */
const LABEL_DISTANCE = 210
/** Pins closer than this on screen merge into a cluster. */
const CLUSTER_PX = 30
const LAYOUT_EVERY = 4

const origin = new THREE.Vector3()
const v = new THREE.Vector3()

let measureCtx: CanvasRenderingContext2D | null = null
/** Width of a pin label in px, measured with the label's font. */
function labelWidth(text: string): number {
  measureCtx ??= document.createElement('canvas').getContext('2d')
  if (!measureCtx) return text.length * 7
  measureCtx.font = `600 ${0.78 * 16}px 'Segoe UI', system-ui, sans-serif`
  return measureCtx.measureText(text).width + 6
}

interface Layout {
  groups: string[][]
  labelled: Set<string>
  key: string
}

function Pin({ site, active, dim, labelled }: { site: Site; active: boolean; dim: boolean; labelled: boolean }) {
  const tr = useT()
  return (
    <button
      type="button"
      className={`pin${active ? ' pin--active' : ''}${dim ? ' pin--dim' : ''}${labelled ? ' pin--labelled' : ''}`}
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
  )
}

/** Several places too close to tell apart at this zoom: a count, ringed with their colours, that opens a list. */
function Cluster({ sites, dim, open, onToggle }: { sites: Site[]; dim: boolean; open: boolean; onToggle: () => void }) {
  const tr = useT()
  const step = 100 / sites.length
  const ring = sites.map((s, i) => `${CATEGORIES[s.category].color} ${i * step}% ${(i + 1) * step}%`).join(', ')
  return (
    <div className={`cluster${dim ? ' pin--dim' : ''}`} onKeyDown={(e) => e.key === 'Escape' && open && onToggle()}>
      <button
        type="button"
        className="cluster__button"
        style={{ background: `conic-gradient(${ring})` }}
        onClick={onToggle}
        aria-expanded={open}
        aria-label={sites.map((s) => tr(s.name)).join(', ')}
      >
        <span>{sites.length}</span>
      </button>
      {open && (
        <ul className="cluster__menu">
          {sites.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                style={{ '--pin': CATEGORIES[s.category].color } as React.CSSProperties}
                onClick={() => {
                  onToggle()
                  actions.focus(s.id)
                }}
              >
                <span className="chip__dot" />
                {tr(s.name)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/**
 * One pin per site, dimmed until the map's year reaches the start of its story.
 * Pins that would overlap on screen merge into a cluster, and a name is only
 * shown where it does not cover another pin or label.
 */
export function MapMarkers({ portal }: { portal: OverlayRef }) {
  const focused = useStore((s) => s.focused)
  const hovered = useStore((s) => s.hovered)
  const year = useStore((s) => s.year)
  const filter = useStore((s) => s.filter)
  const query = useStore((s) => s.query)
  const lang = useStore((s) => s.lang)
  const [layout, setLayout] = useState<Layout>({ groups: [], labelled: new Set(), key: '' })
  const [openCluster, setOpenCluster] = useState<string | null>(null)
  const frame = useRef(0)

  const visible = useMemo(() => filterSites(SITES, filter, query), [filter, query])
  const widths = useMemo(() => new Map(SITES.map((s) => [s.id, labelWidth(s.name[lang])])), [lang])

  useFrame(({ camera, controls, size }) => {
    if (frame.current++ % LAYOUT_EVERY !== 0) return
    const target = (controls as { target?: THREE.Vector3 } | null)?.target ?? origin
    const zoomed = camera.position.distanceTo(target) < LABEL_DISTANCE
    // The focused, then the hovered pin lead; the rest keep their north-to-south order.
    const ordered = [...visible].sort((a, b) => Number(b.id === focused) - Number(a.id === focused) || Number(b.id === hovered) - Number(a.id === hovered))
    const pins = ordered.flatMap((site) => {
      v.set(...pinPosition(site)).project(camera)
      if (v.z > 1) return []
      return [{ id: site.id, x: ((v.x + 1) / 2) * size.width, y: ((1 - v.y) / 2) * size.height, labelWidth: widths.get(site.id)! }]
    })
    const forced = new Set([focused, hovered].filter((id): id is string => !!id))
    const { groups, labelled } = declutter(pins, {
      radius: CLUSTER_PX,
      labels: zoomed,
      rtl: lang === 'ar',
      forceLabel: forced,
      solo: new Set(focused ? [focused] : []),
    })
    const key = `${groups.map((g) => g.join('+')).join('|')}#${[...labelled].sort().join(',')}`
    if (key !== layout.key) setLayout({ groups, labelled, key })
  })

  return (
    <>
      {layout.groups.map((group) => {
        const sites = group.map((id) => siteById(id)).filter((s): s is Site => !!s)
        if (sites.length === 0) return null
        if (sites.length === 1) {
          const site = sites[0]
          return (
            <OverlayHtml key={site.id} portal={portal} position={pinPosition(site)} center zIndexRange={[12, 0]}>
              <Pin site={site} active={focused === site.id} dim={firstYear(site) > year} labelled={layout.labelled.has(site.id)} />
            </OverlayHtml>
          )
        }
        const key = group.join('+')
        const centre = sites.map(pinPosition).reduce((sum, p) => [sum[0] + p[0], sum[1] + p[1], sum[2] + p[2]], [0, 0, 0])
        const open = openCluster === key
        return (
          <OverlayHtml
            key={key}
            portal={portal}
            position={[centre[0] / sites.length, centre[1] / sites.length, centre[2] / sites.length]}
            center
            zIndexRange={[12, 0]}
          >
            <Cluster
              sites={sites}
              dim={sites.every((s) => firstYear(s) > year)}
              open={open}
              onToggle={() => setOpenCluster(open ? null : key)}
            />
          </OverlayHtml>
        )
      })}
    </>
  )
}
