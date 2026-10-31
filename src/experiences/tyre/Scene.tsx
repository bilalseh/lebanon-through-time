import { useMemo } from 'react'
import * as THREE from 'three'
import { seeded } from '../../lib/seeded'
import { useStore } from '../../state/store'
import { Atmosphere } from '../shared/Atmosphere'
import { Block } from '../shared/Block'
import { ColumnField } from '../shared/ColumnField'
import {
  ANCIENT_CITY,
  AQUEDUCT_PIERS,
  ARCH,
  BOATS,
  HIPPODROME,
  ISLAND,
  MODERN_TOWN,
  MOLE,
  NECROPOLIS,
  ROAD,
  ROAD_ROWS,
  SIEGE_TOWERS,
  TEMPLE,
  USHU,
  isthmusWidth,
  pairsForRows,
  tyreState,
  type Building,
} from './layout'
import { rowPairs } from '../shared/fieldColumns'

const SAND = '#cdbb93'
const STONE = '#d9c9a4'
const STONE_DARK = '#b7a382'
const SEA = '#2b7fa6'

/** An elliptical ring of wall around the island. */
function useWallGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape()
    s.absellipse(0, 0, ISLAND.rx, ISLAND.rz, 0, Math.PI * 2, false, 0)
    const hole = new THREE.Path()
    hole.absellipse(0, 0, ISLAND.rx - 5, ISLAND.rz - 5, 0, Math.PI * 2, true, 0)
    s.holes.push(hole)
    const g = new THREE.ExtrudeGeometry(s, { depth: 1, bevelEnabled: false, curveSegments: 48 })
    g.rotateX(-Math.PI / 2)
    return g
  }, [])
}

/** Half-annulus of seating closing the eastern end of the hippodrome. */
function useCurveGeometry() {
  return useMemo(() => {
    const outer = HIPPODROME.width / 2 + HIPPODROME.standDepth
    const inner = HIPPODROME.width / 2
    const s = new THREE.Shape()
    s.absarc(0, 0, outer, -Math.PI / 2, Math.PI / 2, false)
    s.absarc(0, 0, inner, Math.PI / 2, -Math.PI / 2, true)
    const g = new THREE.ExtrudeGeometry(s, { depth: 1, bevelEnabled: false, curveSegments: 32 })
    g.rotateX(-Math.PI / 2)
    return g
  }, [])
}

function useArchGeometry() {
  return useMemo(() => {
    const { width, height, opening } = ARCH
    const s = new THREE.Shape()
    s.moveTo(-width / 2, 0)
    s.lineTo(-width / 2, height)
    s.lineTo(width / 2, height)
    s.lineTo(width / 2, 0)
    s.lineTo(opening, 0)
    s.lineTo(opening, height - opening - 4)
    s.absarc(0, height - opening - 4, opening, 0, Math.PI, false)
    s.lineTo(-opening, 0)
    s.closePath()
    const g = new THREE.ExtrudeGeometry(s, { depth: ARCH.depth, bevelEnabled: false })
    g.translate(0, 0, -ARCH.depth / 2)
    g.rotateY(Math.PI / 2)
    return g
  }, [])
}

function Town({ buildings, scaleY, color }: { buildings: Building[]; scaleY: number; color: string }) {
  if (scaleY < 0.01) return null
  return (
    <group>
      {buildings.map((b, i) => (
        <Block key={i} size={[b.w, b.h, b.d]} position={[b.x, 0.6, b.z]} scaleY={scaleY} color={color} />
      ))}
    </group>
  )
}

function Hills() {
  const hills = useMemo(() => {
    const rand = seeded(13)
    return Array.from({ length: 22 }, () => ({ x: 700 + rand() * 500, z: (rand() - 0.5) * 2200, r: 150 + rand() * 200, h: 60 + rand() * 120 }))
  }, [])
  return (
    <group>
      {hills.map((h, i) => (
        <mesh key={i} position={[h.x, h.h / 2 - 3, h.z]}>
          <coneGeometry args={[h.r, h.h, 6, 1]} />
          <meshStandardMaterial color={i % 2 ? '#9fa078' : '#8f9470'} roughness={1} flatShading />
        </mesh>
      ))}
    </group>
  )
}

export function Scene() {
  const t = useStore((s) => s.t)
  const s = tyreState(t)
  const walls = useWallGeometry()
  const curve = useCurveGeometry()
  const arch = useArchGeometry()
  const road = useMemo(() => ROAD_ROWS.flat(), [])
  const roadPairs = useMemo(() => pairsForRows(ROAD_ROWS), [])
  const aqueductPairs = useMemo(() => rowPairs(0, AQUEDUCT_PIERS.length), [])
  const [ix, iz] = ISLAND.center
  const [hx, hz] = HIPPODROME.center
  const width = isthmusWidth(s)

  return (
    <Atmosphere sun={[-300, 200, -150]} fog={['#d6dde0', 600, 2600]} ground={SEA} groundSize={7000} shadowExtent={320}>
      <Hills />
      {/* Mainland */}
      <Block size={[1400, 3, 2400]} position={[700, -2.4, 0]} color={SAND} />
      {/* The island */}
      <mesh position={[ix, -1.2, iz]} scale={[ISLAND.rx, 1, ISLAND.rz]} receiveShadow>
        <cylinderGeometry args={[1, 1.04, 3.6, 40]} />
        <meshStandardMaterial color={SAND} roughness={1} />
      </mesh>
      {/* The mole, growing from the shore, then silting into an isthmus */}
      {s.mole > 0.01 && <Block size={[MOLE.length * s.mole, 3, width]} position={[(-MOLE.length * s.mole) / 2, -2.4, 0]} color={SAND} />}
      {/* Island walls */}
      {s.islandWalls > 0.02 && (
        <mesh geometry={walls} position={[ix, 0.6, iz]} scale={[1, ISLAND.wallHeight * s.islandWalls, 1]} castShadow receiveShadow>
          <meshStandardMaterial color={STONE_DARK} roughness={1} />
        </mesh>
      )}
      <Town buildings={ANCIENT_CITY} scaleY={s.ancientCity} color={STONE} />
      <Block size={TEMPLE.size} position={[TEMPLE.center[0], 0.6, TEMPLE.center[1]]} scaleY={s.temple} color="#e6d9b8" />
      {s.temple > 0.01 &&
        [-6, 6].map((dz) => (
          <mesh key={dz} position={[TEMPLE.center[0] + 20, 0.6 + 7 * s.temple, TEMPLE.center[1] + dz]} scale={[1, s.temple, 1]} castShadow>
            <cylinderGeometry args={[1.4, 1.6, 14, 12]} />
            <meshStandardMaterial color="#c9b08a" roughness={0.8} />
          </mesh>
        ))}
      {SIEGE_TOWERS.map(([x, z], i) => (
        <Block key={i} size={[9, 26, 9]} position={[x, 0.6, z]} scaleY={s.siegeTowers} color="#7d5a3c" />
      ))}
      <Town buildings={USHU} scaleY={s.ushu} color={STONE} />

      {/* Roman Al-Bass */}
      <Block size={[ROAD.to - ROAD.from, 0.5, ROAD.halfWidth * 2]} position={[(ROAD.from + ROAD.to) / 2, 0.6, 0]} scaleY={Math.min(1, s.necropolis * 2)} color="#b9b3a3" />
      <ColumnField columns={road} pairs={roadPairs} connector="lintel" shaft="#e3d6b6" capital="#ede2c7" link="#d5c6a4" />
      {s.arch > 0.01 && (
        <mesh geometry={arch} position={[ARCH.x, 0.6, 0]} scale={[1, s.arch, 1]} castShadow receiveShadow>
          <meshStandardMaterial color={STONE} roughness={0.95} />
        </mesh>
      )}
      <Town buildings={NECROPOLIS} scaleY={s.necropolis} color="#e0d5bd" />
      {/* Hippodrome: two straight stands, the curved end, the starting gates and the spine */}
      <Block size={[HIPPODROME.length, HIPPODROME.seatHeight, HIPPODROME.standDepth]} position={[hx, 0.6, hz - HIPPODROME.width / 2 - HIPPODROME.standDepth / 2]} scaleY={s.seats} color={STONE} />
      <Block size={[HIPPODROME.length, HIPPODROME.seatHeight, HIPPODROME.standDepth]} position={[hx, 0.6, hz + HIPPODROME.width / 2 + HIPPODROME.standDepth / 2]} scaleY={s.seats} color={STONE} />
      {s.seats > 0.01 && (
        <mesh geometry={curve} position={[hx + HIPPODROME.length / 2, 0.6, hz]} scale={[1, HIPPODROME.seatHeight * s.seats, 1]} castShadow receiveShadow>
          <meshStandardMaterial color={STONE} roughness={0.95} />
        </mesh>
      )}
      <Block size={[6, 5, HIPPODROME.width]} position={[hx - HIPPODROME.length / 2, 0.6, hz]} scaleY={s.seats} color={STONE_DARK} />
      <Block size={[HIPPODROME.length * 0.6, 2, 4]} position={[hx, 0.6, hz]} scaleY={s.seats} color={STONE_DARK} />
      <Block size={[2, 14, 2]} position={[hx, 2.6, hz]} scaleY={s.seats} color="#c9b08a" />
      <ColumnField columns={AQUEDUCT_PIERS} pairs={aqueductPairs} connector="arch" connectorHeight={2} shaft={STONE_DARK} capital={STONE_DARK} link={STONE_DARK} />

      <Town buildings={MODERN_TOWN} scaleY={s.modern} color="#e9e2d3" />
      {BOATS.map(([x, z], i) => (
        <Block key={i} size={[7, 1.4, 2.6]} position={[x, 0, z]} scaleY={s.boats} color={i % 2 ? '#f2efe8' : '#3a6fa6'} rotation={[0, 0.5 * i, 0]} />
      ))}
    </Atmosphere>
  )
}
