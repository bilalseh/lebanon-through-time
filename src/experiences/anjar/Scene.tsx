import { useMemo } from 'react'
import { useStore } from '../../state/store'
import { Atmosphere } from '../shared/Atmosphere'
import { Block } from '../shared/Block'
import { ColumnField } from '../shared/ColumnField'
import { Trees } from '../shared/Trees'
import { seeded } from '../../lib/seeded'
import {
  BATHS,
  GATE_WIDTH,
  HALF_D,
  HALF_W,
  HOUSES,
  LITTLE_PALACE,
  MODERN_TOWN,
  MOSQUE,
  PALACE,
  PALACE_ARCADE,
  PALACE_ROWS,
  STREET_HALF,
  STREET_ROWS,
  TETRAPYLON,
  TOWERS,
  WALL,
  cityState,
  pairsForRows,
  type Building,
} from './layout'

const STONE = '#d2c3a1'
const STONE_DARK = '#b3a283'
const ROOF = '#9c6b4a'

function Walls({ height }: { height: number }) {
  const { thickness } = WALL
  const h = WALL.height * height
  if (h < 0.05) return null
  const half = (HALF_W - GATE_WIDTH / 2) / 2 + GATE_WIDTH / 2
  const halfD = (HALF_D - GATE_WIDTH / 2) / 2 + GATE_WIDTH / 2
  const segW = HALF_W - GATE_WIDTH / 2
  const segD = HALF_D - GATE_WIDTH / 2
  return (
    <group>
      {/* North and south walls, split at the gates */}
      {[-HALF_D, HALF_D].map((z) =>
        [-half, half].map((x) => <Block key={`${z}${x}`} size={[segW, h, thickness]} position={[x, 0, z]} color={STONE_DARK} />),
      )}
      {/* East and west walls */}
      {[-HALF_W, HALF_W].map((x) =>
        [-halfD, halfD].map((z) => <Block key={`${x}${z}`} size={[thickness, h, segD]} position={[x, 0, z]} color={STONE_DARK} />),
      )}
      {TOWERS.map(([x, z, r], i) => (
        <mesh key={i} position={[x, (h * 1.25) / 2, z]} castShadow receiveShadow>
          <cylinderGeometry args={[r, r * 1.1, h * 1.25, 12]} />
          <meshStandardMaterial color={STONE_DARK} roughness={1} />
        </mesh>
      ))}
    </group>
  )
}

/** Low rows of shops that lined both streets behind the colonnades. */
function Shops({ height }: { height: number }) {
  const h = 4 * height
  if (h < 0.05) return null
  const depth = 9
  const off = STREET_HALF + 1 + depth / 2
  const lenD = HALF_D - 22
  const lenW = HALF_W - 22
  return (
    <group>
      {[-1, 1].map((sx) =>
        [-1, 1].map((sz) => (
          <group key={`${sx}${sz}`}>
            <Block size={[depth, h, lenD]} position={[sx * off, 0, sz * (12 + lenD / 2)]} color={STONE} />
            <Block size={[lenW, h, depth]} position={[sx * (12 + lenW / 2), 0, sz * off]} color={STONE} />
          </group>
        )),
      )}
    </group>
  )
}

function Houses({ buildings, scaleY, color, roofs }: { buildings: Building[]; scaleY: number; color: string; roofs?: number }) {
  return (
    <group>
      {buildings.map((b, i) => (
        <group key={i}>
          <Block size={[b.w, b.h, b.d]} position={[b.x, 0, b.z]} scaleY={scaleY} color={color} />
          {roofs !== undefined && (
            <Block size={[b.w + 0.6, 1.4, b.d + 0.6]} position={[b.x, b.h * scaleY, b.z]} scaleY={roofs * scaleY} color="#a24a3a" />
          )}
        </group>
      ))}
    </group>
  )
}

/** A walled compound with an open court; roofed around the edges while the city lives. */
function Compound({
  center,
  size,
  walls,
  roofs,
  court,
}: {
  center: [number, number]
  size: [number, number, number]
  walls: number
  roofs: number
  court: number
}) {
  const [cx, cz] = center
  const [w, h, d] = size
  const ring = (w - court) / 2
  const ringD = (d - court) / 2
  return (
    <group>
      <Block size={[w, 1.2, d]} position={[cx, 0, cz]} color={STONE} />
      <Block size={[2, h, d]} position={[cx - w / 2 + 1, 0, cz]} scaleY={walls} color={STONE} />
      <Block size={[2, h, d]} position={[cx + w / 2 - 1, 0, cz]} scaleY={walls} color={STONE} />
      <Block size={[w, h, 2]} position={[cx, 0, cz - d / 2 + 1]} scaleY={walls} color={STONE} />
      <Block size={[w, h, 2]} position={[cx, 0, cz + d / 2 - 1]} scaleY={walls} color={STONE} />
      {roofs > 0.01 && (
        <group>
          <Block size={[ring, 1, d]} position={[cx - w / 2 + ring / 2, h * walls, cz]} scaleY={roofs} color={ROOF} />
          <Block size={[ring, 1, d]} position={[cx + w / 2 - ring / 2, h * walls, cz]} scaleY={roofs} color={ROOF} />
          <Block size={[court, 1, ringD]} position={[cx, h * walls, cz - d / 2 + ringD / 2]} scaleY={roofs} color={ROOF} />
          <Block size={[court, 1, ringD]} position={[cx, h * walls, cz + d / 2 - ringD / 2]} scaleY={roofs} color={ROOF} />
        </group>
      )}
    </group>
  )
}

function Mountains() {
  const peaks = useMemo(() => {
    const rand = seeded(9)
    return Array.from({ length: 30 }, (_, i) => ({
      x: i % 2 === 0 ? 900 + rand() * 300 : -1200 - rand() * 300,
      z: (rand() - 0.5) * 2600,
      r: 160 + rand() * 220,
      h: 110 + rand() * 220,
    }))
  }, [])
  return (
    <group>
      {peaks.map((p, i) => (
        <mesh key={i} position={[p.x, p.h / 2 - 4, p.z]}>
          <coneGeometry args={[p.r, p.h, 6, 1]} />
          <meshStandardMaterial color={i % 3 === 0 ? '#8f8470' : '#a39680'} roughness={1} flatShading />
        </mesh>
      ))}
    </group>
  )
}

const insideWalls = (x: number, z: number) => Math.abs(x) < HALF_W + 12 && Math.abs(z) < HALF_D + 12

export function Scene() {
  const t = useStore((s) => s.t)
  const s = cityState(t)
  const streets = useMemo(() => STREET_ROWS.flat(), [])
  const streetPairs = useMemo(() => pairsForRows(STREET_ROWS), [])
  const palacePairs = useMemo(() => pairsForRows(PALACE_ROWS), [])

  return (
    <Atmosphere sun={[-260, 220, 160]} fog={['#d9d6c6', 500, 2200]} ground="#b7ad7c" groundSize={6000} shadowExtent={260}>
      <Mountains />
      {/* The surveyed plan, fading as the walls go up */}
      {s.plan > 0.01 && (
        <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[WALL.width, WALL.depth]} />
          <meshStandardMaterial color="#d8cfa6" transparent opacity={s.plan * 0.9} roughness={1} />
        </mesh>
      )}
      <Walls height={s.walls} />
      <Shops height={s.shops} />
      <ColumnField columns={streets} pairs={streetPairs} connector="arch" shaft={STONE} capital="#e2d4b4" link="#c9b996" />
      {/* Tetrapylon pedestals */}
      {[-1, 1].map((sx) =>
        [-1, 1].map((sz) => <Block key={`${sx}${sz}`} size={[4.4, 1.5, 4.4]} position={[sx * 4.5, 0, sz * 4.5]} scaleY={Math.min(1, s.walls * 2)} color={STONE_DARK} />),
      )}
      <ColumnField columns={TETRAPYLON} shaft="#e6d8b8" capital="#efe3c8" />
      <Compound center={PALACE.center} size={PALACE.size} walls={s.palace} roofs={s.roofs} court={PALACE.court} />
      <ColumnField columns={PALACE_ARCADE} pairs={palacePairs} connector="arch" shaft="#e6d8b8" capital="#efe3c8" link="#d8c8a6" />
      <Compound center={MOSQUE.center} size={MOSQUE.size} walls={s.palace} roofs={s.roofs} court={20} />
      <Compound center={LITTLE_PALACE.center} size={LITTLE_PALACE.size} walls={s.palace} roofs={s.roofs} court={16} />
      <Compound center={BATHS.center} size={BATHS.size} walls={s.palace} roofs={s.roofs} court={10} />
      {s.roofs > 0.01 &&
        [-7, 7].map((dx) => (
          <mesh key={dx} position={[BATHS.center[0] + dx, BATHS.size[1] * s.palace + 1, BATHS.center[1]]} scale={[s.roofs, s.roofs, s.roofs]} castShadow>
            <sphereGeometry args={[4.5, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#e3d9c2" roughness={0.7} />
          </mesh>
        ))}
      <Houses buildings={HOUSES} scaleY={s.houses} color={STONE} />
      <Houses buildings={MODERN_TOWN} scaleY={s.modern} color="#e8e0d0" roofs={1} />
      {s.trees > 0.01 && (
        <group scale={[1, s.trees, 1]}>
          <Trees count={90} area={[900, 900]} exclude={insideWalls} seed={17} height={[12, 20]} color="#4b6a3a" />
        </group>
      )}
    </Atmosphere>
  )
}
