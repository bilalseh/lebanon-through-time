import { useMemo, useRef, type JSX } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { SITES, firstYear } from '../data/sites'
import type { Category } from '../data/types'
import { useStore } from '../state/store'
import { filterSites } from './filter'
import { sitePosition } from './positions'

const POP_SECONDS = 0.7
const easeOutBack = (x: number) => 1 + 2.70158 * Math.pow(x - 1, 3) + 1.70158 * Math.pow(x - 1, 2)

const STONE = '#e8d7b0'
const STONE_DARK = '#cbb48a'

/** Three columns and a lintel: an ancient city. */
function Columns() {
  return (
    <group>
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[5, 0.6, 3.4]} />
        <meshStandardMaterial color={STONE_DARK} roughness={0.9} />
      </mesh>
      {[-1.6, 0, 1.6].map((x) => (
        <mesh key={x} position={[x, 2.8, 0]} castShadow>
          <cylinderGeometry args={[0.38, 0.42, 4.4, 10]} />
          <meshStandardMaterial color={STONE} roughness={0.9} />
        </mesh>
      ))}
      <mesh position={[0, 5.35, 0]} castShadow>
        <boxGeometry args={[4.8, 0.7, 1.3]} />
        <meshStandardMaterial color="#dcc59a" roughness={0.9} />
      </mesh>
    </group>
  )
}

/** A crenellated keep with a pennant: a castle or palace. */
function Tower() {
  return (
    <group>
      <mesh position={[0, 2.6, 0]} castShadow>
        <boxGeometry args={[3.4, 5.2, 3.4]} />
        <meshStandardMaterial color="#d2b88f" roughness={0.95} />
      </mesh>
      {[-1.25, 1.25].map((x) =>
        [-1.25, 1.25].map((z) => (
          <mesh key={`${x}${z}`} position={[x, 5.6, z]} castShadow>
            <boxGeometry args={[0.9, 0.8, 0.9]} />
            <meshStandardMaterial color="#d2b88f" roughness={0.95} />
          </mesh>
        )),
      )}
      <mesh position={[0, 6.4, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 2.2, 6]} />
        <meshStandardMaterial color="#5c4630" />
      </mesh>
      <mesh position={[0.5, 7.1, 0]}>
        <boxGeometry args={[1, 0.55, 0.06]} />
        <meshStandardMaterial color="#c0392b" />
      </mesh>
    </group>
  )
}

/** A tiered cedar: a natural site. */
function Cedar() {
  return (
    <group>
      <mesh position={[0, 1.3, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.42, 2.6, 7]} />
        <meshStandardMaterial color="#5a4030" roughness={1} />
      </mesh>
      {(
        [
          [2.4, 1.3, 3.0, '#3f6b3b'],
          [1.8, 1.2, 4.2, '#46733f'],
          [1.1, 1.2, 5.3, '#4f7d47'],
        ] as Array<[number, number, number, string]>
      ).map(([r, h, y, color]) => (
        <mesh key={y} position={[0, y, 0]} castShadow>
          <coneGeometry args={[r, h, 7]} />
          <meshStandardMaterial color={color} roughness={1} flatShading />
        </mesh>
      ))}
    </group>
  )
}

/** A domed shrine with a spire: a religious site. */
function Shrine() {
  return (
    <group>
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[3.4, 3, 3.4]} />
        <meshStandardMaterial color="#efe6d6" roughness={0.9} />
      </mesh>
      <mesh position={[0, 3, 0]} castShadow>
        <sphereGeometry args={[1.9, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#c9a86a" roughness={0.6} />
      </mesh>
      <mesh position={[0, 5.8, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 1.8, 6]} />
        <meshStandardMaterial color="#e8c98a" roughness={0.5} />
      </mesh>
    </group>
  )
}

/** A columned facade with a roof: a museum. */
function Museum() {
  return (
    <group>
      <mesh position={[0, 1.6, 0]} castShadow>
        <boxGeometry args={[4.6, 3.2, 3]} />
        <meshStandardMaterial color="#e9e2d3" roughness={0.9} />
      </mesh>
      {[-1.6, -0.55, 0.55, 1.6].map((x) => (
        <mesh key={x} position={[x, 1.6, 1.7]} castShadow>
          <cylinderGeometry args={[0.22, 0.24, 3.2, 8]} />
          <meshStandardMaterial color="#f4efe4" roughness={0.9} />
        </mesh>
      ))}
      <mesh position={[0, 3.45, 0.2]} castShadow>
        <boxGeometry args={[5.2, 0.5, 3.8]} />
        <meshStandardMaterial color="#ddd4c2" roughness={0.9} />
      </mesh>
      <mesh position={[0, 4.3, 0.2]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[3.2, 1.3, 4]} />
        <meshStandardMaterial color="#b9744f" roughness={0.9} flatShading />
      </mesh>
    </group>
  )
}

const GLYPHS: Record<Category, () => JSX.Element> = {
  ancient: Columns,
  castle: Tower,
  nature: Cedar,
  religious: Shrine,
  museum: Museum,
}

/** A small 3D model per place that pops up on the map once the year reaches the start of its story. */
export function SiteGlyphs() {
  const year = useStore((s) => s.year)
  const filter = useStore((s) => s.filter)
  const query = useStore((s) => s.query)
  const visible = useMemo(() => new Set(filterSites(SITES, filter, query).map((s) => s.id)), [filter, query])
  const groups = useRef(new Map<string, THREE.Group>())
  const since = useRef(new Map<string, number>())

  useFrame(({ clock }) => {
    const now = clock.elapsedTime
    for (const site of SITES) {
      const group = groups.current.get(site.id)
      if (!group) continue
      const shown = visible.has(site.id) && firstYear(site) <= year
      if (!shown) {
        since.current.delete(site.id)
        group.visible = false
        continue
      }
      if (!since.current.has(site.id)) since.current.set(site.id, now)
      const k = Math.min(1, (now - since.current.get(site.id)!) / POP_SECONDS)
      group.visible = true
      group.scale.setScalar(Math.max(0.001, easeOutBack(k)))
    }
  })

  return (
    <>
      {SITES.map((site, i) => {
        const Glyph = GLYPHS[site.category]
        return (
          <group
            key={site.id}
            ref={(el) => {
              if (el) groups.current.set(site.id, el)
              else groups.current.delete(site.id)
            }}
            position={sitePosition(site)}
            rotation={[0, (i * 0.9) % Math.PI, 0]}
            visible={false}
          >
            <Glyph />
          </group>
        )
      })}
    </>
  )
}
