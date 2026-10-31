import { useMemo } from 'react'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { LEBANON } from '../data/lebanon/outline'
import {
  MAP_BOUNDS,
  SEA_FLOOR,
  VERTICAL_EXAGGERATION,
  distanceToLebanonKm,
  heightAt,
  landAt,
  project,
  relief,
  unproject,
} from '../data/lebanon/terrain'
import { UI } from '../data/ui'
import { OverlayHtml, type OverlayRef } from '../experiences/shared/OverlayHtml'
import { useT } from '../lib/useLang'

/** Grid spacing in km. */
const CELL = 1.8

const SEA = new THREE.Color('#1f5f80')
const NEIGHBOUR_LOW = new THREE.Color('#cdc4ae')
const NEIGHBOUR_HIGH = new THREE.Color('#a69a82')
const VALLEY = new THREE.Color('#a4bb62')
/** Lebanon's colour ramp by elevation in km. */
const RAMP: Array<[number, THREE.Color]> = [
  [0, new THREE.Color('#86a65a')],
  [0.5, new THREE.Color('#b9b06e')],
  [1.2, new THREE.Color('#a88b63')],
  [2.0, new THREE.Color('#bdb5a4')],
  [2.6, new THREE.Color('#f3f1ec')],
]

const scratch = new THREE.Color()
const smoothstep = (e0: number, e1: number, v: number) => {
  const k = Math.min(1, Math.max(0, (v - e0) / (e1 - e0)))
  return k * k * (3 - 2 * k)
}

function shade(x: number, z: number, out: THREE.Color): number {
  const { lat, lon } = unproject(x, z)
  const land = landAt(lon, lat)
  if (land === 'sea') {
    out.copy(SEA)
    return SEA_FLOOR * VERTICAL_EXAGGERATION
  }
  const { elevation, valley } = relief(lon, lat)
  if (land === 'neighbour') {
    // Neighbouring land is only context: it keeps its relief near the border,
    // then sinks gently into the sea so the map has no hard edge.
    const d = distanceToLebanonKm(x, z)
    if (d > 110) {
      out.copy(SEA)
      return SEA_FLOOR * VERTICAL_EXAGGERATION
    }
    // The colour reaches sea blue first; the land then runs on as a flat, sea-coloured
    // shelf just above the water and drops below it in one small, invisible step.
    const keep = 1 - smoothstep(30, 110, d)
    const tint = 1 - smoothstep(25, 90, d)
    out.copy(NEIGHBOUR_LOW).lerp(NEIGHBOUR_HIGH, Math.min(1, elevation / 2.5)).lerp(SEA, 1 - tint)
    return Math.max(0.12, elevation * keep) * VERTICAL_EXAGGERATION
  }
  let i = 1
  while (i < RAMP.length - 1 && RAMP[i][0] < elevation) i++
  const [e0, c0] = RAMP[i - 1]
  const [e1, c1] = RAMP[i]
  out.copy(c0).lerp(c1, Math.min(1, Math.max(0, (elevation - e0) / (e1 - e0))))
  if (elevation < 1.3) out.lerp(scratch.copy(VALLEY), valley * 0.8)
  return elevation * VERTICAL_EXAGGERATION
}

function buildTerrain(): THREE.BufferGeometry {
  const { minX, maxX, minZ, maxZ } = MAP_BOUNDS
  const nx = Math.ceil((maxX - minX) / CELL)
  const nz = Math.ceil((maxZ - minZ) / CELL)
  const count = (nx + 1) * (nz + 1)
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const color = new THREE.Color()

  for (let i = 0; i <= nz; i++) {
    const z = minZ + (i / nz) * (maxZ - minZ)
    for (let j = 0; j <= nx; j++) {
      const x = minX + (j / nx) * (maxX - minX)
      const v = (i * (nx + 1) + j) * 3
      positions[v] = x
      positions[v + 1] = shade(x, z, color)
      positions[v + 2] = z
      colors[v] = color.r
      colors[v + 1] = color.g
      colors[v + 2] = color.b
    }
  }

  const index = new Uint32Array(nx * nz * 6)
  let k = 0
  for (let i = 0; i < nz; i++) {
    for (let j = 0; j < nx; j++) {
      const a = i * (nx + 1) + j
      const b = a + 1
      const c = a + nx + 1
      const d = c + 1
      index[k++] = a
      index[k++] = c
      index[k++] = b
      index[k++] = b
      index[k++] = c
      index[k++] = d
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setIndex(new THREE.BufferAttribute(index, 1))
  geometry.computeVertexNormals()
  return geometry
}

/** Lebanon's border drawn just above the relief. */
function Border() {
  const rings = useMemo(
    () =>
      LEBANON.map((ring) =>
        ring.map(([lon, lat]) => {
          const [x, z] = project(lat, lon)
          return new THREE.Vector3(x, Math.max(0.05, heightAt(lat, lon)) + 0.25, z)
        }),
      ),
    [],
  )
  return (
    <>
      {rings.map((points, i) => (
        <Line key={i} points={[...points, points[0]]} color="#f3d79c" lineWidth={1.4} transparent opacity={0.85} />
      ))}
    </>
  )
}

export function Terrain({ portal }: { portal: OverlayRef }) {
  const geometry = useMemo(buildTerrain, [])
  const tr = useT()
  return (
    <group>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial vertexColors flatShading roughness={0.95} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[3000, 3000]} />
        <meshStandardMaterial color="#2a6d8f" roughness={0.55} metalness={0.05} />
      </mesh>
      <Border />
      <OverlayHtml portal={portal} position={[-70, 0.5, 60]} center zIndexRange={[5, 0]} style={{ pointerEvents: 'none' }}>
        <span className="map-label">{tr(UI.sea)}</span>
      </OverlayHtml>
    </group>
  )
}
