import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useStore } from '../../state/store'
import { Atmosphere } from '../shared/Atmosphere'
import { Block } from '../shared/Block'
import {
  ALL_TREES,
  CHAPEL,
  HADRIAN_MARKERS,
  LOGS,
  TOWN,
  TREE_HEIGHT,
  WALL,
  cedarScale,
  forestState,
  groundHeight,
  type Cedar,
} from './layout'

const SIZE = 1800
const SEGMENTS = 110
const ROCK = new THREE.Color('#8f8676')
const SNOW = new THREE.Color('#ebe9e3')
const MEADOW = new THREE.Color('#8e9d5f')
const SLOPE = new THREE.Color('#a39a6e')
const GORGE = new THREE.Color('#766a58')

function buildTerrain(): THREE.BufferGeometry {
  const g = new THREE.PlaneGeometry(SIZE, SIZE, SEGMENTS, SEGMENTS)
  g.rotateX(-Math.PI / 2)
  const pos = g.attributes.position as THREE.BufferAttribute
  const colors = new Float32Array(pos.count * 3)
  const c = new THREE.Color()
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const z = pos.getZ(i)
    const h = groundHeight(x, z)
    pos.setY(i, h)
    if (h < -40) c.copy(GORGE)
    else if (h < 130) c.copy(MEADOW).lerp(SLOPE, (h + 40) / 170)
    else if (h < 330) c.copy(SLOPE).lerp(ROCK, (h - 130) / 200)
    else c.copy(ROCK).lerp(SNOW, Math.min(1, (h - 330) / 110))
    colors[i * 3] = c.r
    colors[i * 3 + 1] = c.g
    colors[i * 3 + 2] = c.b
  }
  g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  g.computeVertexNormals()
  return g
}

const m = new THREE.Matrix4()
const HIDDEN = new THREE.Matrix4().makeScale(0, 0, 0)
/** Crown layers as [radius, height, base] fractions of the tree height; cedars grow in flat tiers. */
const LAYERS: Array<[number, number, number]> = [
  [0.3, 0.16, 0.36],
  [0.22, 0.14, 0.56],
  [0.13, 0.14, 0.74],
]

/** Thousands of cedars as four InstancedMeshes: a trunk and three tiers of foliage. */
function CedarForest({ trees }: { trees: Cedar[] }) {
  const t = useStore((s) => s.t)
  const trunks = useRef<THREE.InstancedMesh>(null)
  const tiers = [useRef<THREE.InstancedMesh>(null), useRef<THREE.InstancedMesh>(null), useRef<THREE.InstancedMesh>(null)]
  const geometries = useMemo(
    () => ({ trunk: new THREE.CylinderGeometry(0.7, 1, 1, 6), cone: new THREE.ConeGeometry(1, 1, 7) }),
    [],
  )

  useLayoutEffect(() => {
    trees.forEach((c, i) => {
      const k = cedarScale(c, t)
      if (k < 0.01) {
        trunks.current!.setMatrixAt(i, HIDDEN)
        tiers.forEach((tier) => tier.current!.setMatrixAt(i, HIDDEN))
        return
      }
      const h = TREE_HEIGHT * k
      m.makeTranslation(c.x, c.y + h * 0.25, c.z).scale(new THREE.Vector3(h * 0.035, h * 0.5, h * 0.035))
      trunks.current!.setMatrixAt(i, m)
      LAYERS.forEach(([r, th, base], j) => {
        m.makeTranslation(c.x, c.y + h * (base + th / 2), c.z).scale(new THREE.Vector3(h * r, h * th, h * r))
        tiers[j].current!.setMatrixAt(i, m)
      })
    })
    for (const mesh of [trunks, ...tiers]) {
      mesh.current!.instanceMatrix.needsUpdate = true
      mesh.current!.computeBoundingSphere()
    }
  }, [t, trees, tiers])

  return (
    <group>
      <instancedMesh ref={trunks} args={[geometries.trunk, undefined, trees.length]} castShadow>
        <meshStandardMaterial color="#5a4030" roughness={1} />
      </instancedMesh>
      {['#3a6136', '#46733f', '#4f7d47'].map((color, j) => (
        <instancedMesh key={color} ref={tiers[j]} args={[geometries.cone, undefined, trees.length]} castShadow receiveShadow>
          <meshStandardMaterial color={color} roughness={1} flatShading />
        </instancedMesh>
      ))}
    </group>
  )
}

function useWallGeometry() {
  return useMemo(() => {
    const s = new THREE.Shape()
    s.absellipse(0, 0, WALL.rx, WALL.rz, 0, Math.PI * 2, false, 0)
    const hole = new THREE.Path()
    hole.absellipse(0, 0, WALL.rx - 1.2, WALL.rz - 1.2, 0, Math.PI * 2, true, 0)
    s.holes.push(hole)
    const g = new THREE.ExtrudeGeometry(s, { depth: 1, bevelEnabled: false, curveSegments: 64 })
    g.rotateX(-Math.PI / 2)
    return g
  }, [])
}

export function Scene() {
  const t = useStore((s) => s.t)
  const s = forestState(t)
  const terrain = useMemo(buildTerrain, [])
  const wall = useWallGeometry()
  const [cx, cz] = CHAPEL.position
  const chapelY = groundHeight(cx, cz)

  return (
    <Atmosphere sun={[-400, 500, 300]} fog={['#dfe6ea', 700, 2600]} ground="#8f8676" groundSize={9000} shadowExtent={420}>
      <mesh geometry={terrain} receiveShadow castShadow>
        <meshStandardMaterial vertexColors flatShading roughness={1} />
      </mesh>
      <CedarForest trees={ALL_TREES} />
      {/* Felled trunks on the lower slopes */}
      {LOGS.map(([x, z, rot], i) => (
        <mesh key={i} position={[x, groundHeight(x, z) + 0.6, z]} rotation={[Math.PI / 2, 0, rot]} scale={[s.logs, s.logs, s.logs]} castShadow>
          <cylinderGeometry args={[0.7, 0.8, 12, 7]} />
          <meshStandardMaterial color="#8a6a4a" roughness={1} />
        </mesh>
      ))}
      {/* Hadrian's boundary inscriptions */}
      {HADRIAN_MARKERS.map(([x, z], i) => (
        <Block key={i} size={[1.6, 2, 0.8]} position={[x, groundHeight(x, z), z]} scaleY={s.markers} color="#d8d2c4" rotation={[0, (i / 8) * Math.PI * 2, 0]} />
      ))}
      {/* The 1876 wall */}
      {s.wall > 0.01 && (
        <mesh geometry={wall} position={[0, groundHeight(0, 0) - 2, 0]} scale={[1, (WALL.height + 2) * s.wall, 1]} castShadow receiveShadow>
          <meshStandardMaterial color="#9c9382" roughness={1} />
        </mesh>
      )}
      {/* The chapel */}
      <Block size={CHAPEL.size} position={[cx, chapelY, cz]} scaleY={s.chapel} color="#e6dfd0" />
      <Block size={[CHAPEL.size[0] + 0.8, 1.4, CHAPEL.size[2] + 0.8]} position={[cx, chapelY + CHAPEL.size[1] * s.chapel, cz]} scaleY={s.chapel} color="#8c4a3a" />
      {/* Bsharri */}
      {TOWN.map((b, i) => (
        <group key={i}>
          <Block size={[b.w, b.h, b.d]} position={[b.x, groundHeight(b.x, b.z), b.z]} scaleY={s.town} color="#e3d9c6" />
          <Block size={[b.w + 0.6, 1.2, b.d + 0.6]} position={[b.x, groundHeight(b.x, b.z) + b.h * s.town, b.z]} scaleY={s.town} color="#a24a3a" />
        </group>
      ))}
    </Atmosphere>
  )
}
