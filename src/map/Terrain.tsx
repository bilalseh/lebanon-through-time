import { useMemo } from 'react'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { LEBANON } from '../data/lebanon/outline'
import { heightAt, project } from '../data/lebanon/terrain'
import { UI } from '../data/ui'
import { OverlayHtml, type OverlayRef } from '../experiences/shared/OverlayHtml'
import { useT } from '../lib/useLang'
import { buildTerrainArrays } from './terrainMesh'

let cached: THREE.BufferGeometry | null = null

/** Built once per page load; returning to the map reuses it. */
function terrainGeometry(): THREE.BufferGeometry {
  if (cached) return cached
  const { positions, colors, index } = buildTerrainArrays()
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 4))
  geometry.setIndex(new THREE.BufferAttribute(index, 1))
  geometry.computeVertexNormals()
  cached = geometry
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
  const geometry = useMemo(terrainGeometry, [])
  const tr = useT()
  return (
    <group>
      {/* Land and sea in one mesh; its alpha fades the map softly into the background. Drawn first among transparent objects. */}
      <mesh geometry={geometry} castShadow receiveShadow renderOrder={-1}>
        <meshStandardMaterial vertexColors transparent roughness={0.9} />
      </mesh>
      <Border />
      <OverlayHtml portal={portal} position={[-70, 0.5, 60]} center zIndexRange={[5, 0]} style={{ pointerEvents: 'none' }}>
        <span className="map-label">{tr(UI.sea)}</span>
      </OverlayHtml>
    </group>
  )
}
