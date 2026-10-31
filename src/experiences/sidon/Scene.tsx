import { useMemo } from 'react'
import * as THREE from 'three'
import { useStore } from '../../state/store'
import { Atmosphere } from '../shared/Atmosphere'
import { Block } from '../shared/Block'
import {
  BOATS,
  CAUSEWAY,
  EAST_TOWER,
  ISLET,
  KHAN,
  MINARET,
  MODERN_TOWN,
  MOSQUE,
  OLD_TOWN,
  PLATFORM,
  ROMAN_COLUMNS,
  SHORE,
  WALLS,
  WEST_TOWER,
  castleState,
  type Building,
} from './layout'

const STONE = '#cbb48a'
const STONE_DARK = '#a8916a'
const SAND = '#c9b58c'
const SEA = '#2d7ea3'

/** The arcaded bridge as one extruded outline: a slab with semicircular openings along its underside. */
function useCausewayGeometry() {
  return useMemo(() => {
    const { length, width, height, arches } = CAUSEWAY
    const span = length / arches
    const r = span * 0.36
    const shape = new THREE.Shape()
    shape.moveTo(0, 0)
    shape.lineTo(0, height)
    shape.lineTo(-length, height)
    shape.lineTo(-length, 0)
    for (let i = arches - 1; i >= 0; i--) {
      const center = -(i + 0.5) * span
      shape.lineTo(center - r, 0)
      shape.absarc(center, 0, r, Math.PI, 0, true)
    }
    shape.closePath()
    const geometry = new THREE.ExtrudeGeometry(shape, { depth: width, bevelEnabled: false })
    geometry.translate(0, 0, -width / 2)
    return geometry
  }, [])
}

function Town({ buildings, scaleY = 1, color }: { buildings: Building[]; scaleY?: number; color: string }) {
  return (
    <group>
      {buildings.map((b, i) => (
        <Block key={i} size={[b.w, b.h, b.d]} position={[b.x, 0.5, b.z]} scaleY={scaleY} color={color} />
      ))}
    </group>
  )
}

function Crenellations({ x, z, w, d, y }: { x: number; z: number; w: number; d: number; y: number }) {
  const merlons: Array<[number, number]> = []
  for (let i = -w / 2 + 1; i <= w / 2 - 1; i += 3) merlons.push([x + i, z - d / 2 + 0.5], [x + i, z + d / 2 - 0.5])
  for (let j = -d / 2 + 2.5; j <= d / 2 - 2.5; j += 3) merlons.push([x - w / 2 + 0.5, z + j], [x + w / 2 - 0.5, z + j])
  return (
    <group>
      {merlons.map(([mx, mz], i) => (
        <Block key={i} size={[1.4, 1.2, 1.4]} position={[mx, y, mz]} color={STONE} />
      ))}
    </group>
  )
}

export function Scene() {
  const t = useStore((s) => s.t)
  const s = castleState(t)
  const causeway = useCausewayGeometry()
  const [wx, wz] = WEST_TOWER.center
  const [ex, ez] = EAST_TOWER.center
  const wallHeight = WALLS.height * s.walls

  return (
    <Atmosphere sun={[-160, 110, -90]} fog={['#d3dde3', 260, 900]} ground={SEA} shadowExtent={160}>
      {/* The mainland, raised just above the water */}
      <Block size={[1400, 2.5, 2000]} position={[SHORE.x + 700, -2, 0]} color={SAND} />
      {/* The islet */}
      <mesh position={[ISLET.center[0], ISLET.top - 3.2, ISLET.center[1]]} scale={[ISLET.radiusX, 3.4, ISLET.radiusZ]} castShadow receiveShadow>
        <sphereGeometry args={[1, 12, 8]} />
        <meshStandardMaterial color="#8a7a60" roughness={1} flatShading />
      </mesh>
      {/* Phoenician temple remains, cleared when the castle is built */}
      <Block size={[14, 1.2, 10]} position={[4, ISLET.top, -2]} scaleY={s.temple} color={STONE_DARK} />
      {[-4, 0, 4].map((x) => (
        <Block key={x} size={[1.2, 3, 1.2]} position={[x, ISLET.top, 2]} scaleY={s.temple} color={STONE} />
      ))}

      {/* Castle */}
      <Block size={PLATFORM.size} position={[0, PLATFORM.y, 0]} scaleY={s.platform} color={STONE_DARK} />
      <Block size={WEST_TOWER.size} position={[wx, WEST_TOWER.y, wz]} scaleY={s.westTower} color={STONE} />
      {s.westTower >= 1 && <Crenellations x={wx} z={wz} w={WEST_TOWER.size[0]} d={WEST_TOWER.size[2]} y={WEST_TOWER.y + WEST_TOWER.size[1]} />}
      <Block size={EAST_TOWER.size} position={[ex, EAST_TOWER.y, ez]} scaleY={s.eastLower} color={STONE} />
      <Block size={EAST_TOWER.size} position={[ex, EAST_TOWER.upperY, ez]} scaleY={s.eastUpper} color={STONE} />
      {wallHeight > 0.01 && (
        <>
          <Block size={[WALLS.length, wallHeight, 2]} position={[0, WALLS.y, WALLS.north]} color={STONE} />
          <Block size={[WALLS.length, wallHeight, 2]} position={[0, WALLS.y, WALLS.south]} color={STONE} />
        </>
      )}
      {s.westTower > 0.9 &&
        ROMAN_COLUMNS.map(([x, y, z], i) => (
          <mesh key={i} position={[x, y, z]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.45, 0.45, 3.2, 10]} />
            <meshStandardMaterial color="#6f6a66" roughness={0.8} />
          </mesh>
        ))}
      {/* Ottoman mosque on the west tower */}
      <Block size={MOSQUE.size} position={[MOSQUE.center[0], MOSQUE.y, MOSQUE.center[1]]} scaleY={s.mosque} color="#e2cda3" />
      {s.mosque > 0.01 && (
        <mesh position={[MOSQUE.center[0], MOSQUE.y + MOSQUE.size[1] * s.mosque, MOSQUE.center[1]]} scale={[s.mosque, s.mosque, s.mosque]} castShadow>
          <sphereGeometry args={[MOSQUE.domeRadius, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#e8e2d6" roughness={0.6} />
        </mesh>
      )}
      {/* Causeway grows from the shore toward the islet */}
      {s.causeway > 0.01 && (
        <mesh geometry={causeway} position={[CAUSEWAY.shoreX, 0, CAUSEWAY.z]} scale={[s.causeway, 1, 1]} castShadow receiveShadow>
          <meshStandardMaterial color={STONE} roughness={0.95} />
        </mesh>
      )}

      {/* The town */}
      <Town buildings={OLD_TOWN} color={SAND} />
      <Town buildings={MODERN_TOWN} scaleY={s.modern} color="#b9b4ab" />
      <Block size={KHAN.size} position={[KHAN.center[0], 0.5, KHAN.center[1]]} scaleY={s.khan} color="#d6c39c" />
      <Block size={[18, 1, 14]} position={[KHAN.center[0], KHAN.size[1] * s.khan + 0.5, KHAN.center[1]]} scaleY={s.khan} color="#8a7a60" />
      <mesh position={[MINARET.x, MINARET.height / 2 + 0.5, MINARET.z]} castShadow>
        <cylinderGeometry args={[1, 1.3, MINARET.height, 10]} />
        <meshStandardMaterial color="#e2cda3" roughness={0.9} />
      </mesh>
      {BOATS.map(([x, z], i) => (
        <Block key={i} size={[6, 1.2, 2.4]} position={[x, 0, z]} scaleY={s.boats} color={i % 2 ? '#f0ede6' : '#3d6fa8'} rotation={[0, 0.4 * i, 0]} />
      ))}
    </Atmosphere>
  )
}
