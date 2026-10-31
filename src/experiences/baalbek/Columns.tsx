import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import {
  ALL_COLUMNS,
  BACCHUS,
  JUPITER,
  bays,
  columnState,
  isStanding,
  type ColumnSpec,
  type ColumnState,
} from './templeLayout'
import { useStore } from '../../state/store'

/**
 * All columns of both temples rendered with four InstancedMeshes (bases, shafts,
 * capitals and entablature segments) instead of hundreds of separate meshes.
 * Matrices are recomputed only when the timeline value changes.
 */

const BASE_H = 0.07
const CAPITAL_H = 0.09
const SHAFT_H = 1 - BASE_H - CAPITAL_H

const up = new THREE.Vector3(0, 1, 0)
const axis = new THREE.Vector3()
const dir = new THREE.Vector3()
const tmp = new THREE.Matrix4()
const pivot = new THREE.Matrix4()
const rotation = new THREE.Matrix4()
const buildScale = new THREE.Matrix4()
const local = new THREE.Matrix4()
const partScale = new THREE.Matrix4()
const HIDDEN = new THREE.Matrix4().makeScale(0, 0, 0)

/** Matrix for one part of a column: offset/height are fractions of the column height. */
function partMatrix(
  out: THREE.Matrix4,
  c: ColumnSpec,
  state: ColumnState,
  offset: number,
  height: number,
  radiusScale: number,
): THREE.Matrix4 {
  if (state.build <= 0.001) return out.copy(HIDDEN)
  // A falling column pivots at its base; lift it by its radius so it rests on the podium.
  const lift = c.radius * Math.sin(state.tilt)
  pivot.makeTranslation(c.x, c.baseY + lift, c.z)
  // Axis is (up x fallDir): rotating "up" about it tips the column toward fallDir.
  dir.set(c.fallDir[0], 0, c.fallDir[1])
  axis.crossVectors(up, dir).normalize()
  rotation.makeRotationAxis(axis, state.tilt)
  // Fallen columns break apart: shorten them as they topple so the rubble stays near the temple.
  const broken = 1 - 0.45 * (state.tilt / (Math.PI / 2))
  buildScale.makeScale(1, state.build * broken, 1)
  local.makeTranslation(0, c.height * (offset + height / 2), 0)
  partScale.makeScale(c.radius * radiusScale, c.height * height, c.radius * radiusScale)
  return out.copy(pivot).multiply(rotation).multiply(buildScale).multiply(local).multiply(partScale)
}

export function Columns() {
  const t = useStore((s) => s.t)
  const bases = useRef<THREE.InstancedMesh>(null)
  const shafts = useRef<THREE.InstancedMesh>(null)
  const capitals = useRef<THREE.InstancedMesh>(null)
  const beams = useRef<THREE.InstancedMesh>(null)

  const bayList = useMemo(() => {
    const j = ALL_COLUMNS.filter((c) => c.temple === 'jupiter')
    const b = ALL_COLUMNS.filter((c) => c.temple === 'bacchus')
    return [...bays(j), ...bays(b)]
  }, [])

  const geometries = useMemo(
    () => ({
      cylinder: new THREE.CylinderGeometry(1, 1, 1, 20),
      fluted: new THREE.CylinderGeometry(1, 1.06, 1, 24, 1),
      capital: new THREE.CylinderGeometry(1.35, 1, 1, 20),
      box: new THREE.BoxGeometry(1, 1, 1),
    }),
    [],
  )

  useLayoutEffect(() => {
    const states = ALL_COLUMNS.map((c) => columnState(c, t))
    const standing = new Map(ALL_COLUMNS.map((c, i) => [c.id, isStanding(states[i])]))

    ALL_COLUMNS.forEach((c, i) => {
      const s = states[i]
      bases.current!.setMatrixAt(i, partMatrix(tmp, c, s, 0, BASE_H, 1.3))
      shafts.current!.setMatrixAt(i, partMatrix(tmp, c, s, BASE_H, SHAFT_H, 1))
      capitals.current!.setMatrixAt(i, partMatrix(tmp, c, s, BASE_H + SHAFT_H, CAPITAL_H, 1))
    })

    bayList.forEach(([a, b], i) => {
      if (!standing.get(a.id) || !standing.get(b.id)) {
        beams.current!.setMatrixAt(i, HIDDEN)
        return
      }
      const spec = a.temple === 'jupiter' ? JUPITER : BACCHUS
      const dx = b.x - a.x
      const dz = b.z - a.z
      const length = Math.hypot(dx, dz) + a.radius * 2.6
      const m = new THREE.Matrix4().makeTranslation(
        (a.x + b.x) / 2,
        a.baseY + a.height + spec.entablatureHeight / 2,
        (a.z + b.z) / 2,
      )
      m.multiply(new THREE.Matrix4().makeRotationY(-Math.atan2(dz, dx)))
      m.multiply(new THREE.Matrix4().makeScale(length, spec.entablatureHeight, a.radius * 2.8))
      beams.current!.setMatrixAt(i, m)
    })

    for (const mesh of [bases, shafts, capitals, beams]) {
      mesh.current!.instanceMatrix.needsUpdate = true
      mesh.current!.computeBoundingSphere()
    }
  }, [t, bayList])

  const n = ALL_COLUMNS.length
  return (
    <group>
      <instancedMesh ref={bases} args={[geometries.cylinder, undefined, n]} castShadow receiveShadow>
        <meshStandardMaterial color="#cdb68c" roughness={0.95} />
      </instancedMesh>
      <instancedMesh ref={shafts} args={[geometries.fluted, undefined, n]} castShadow receiveShadow>
        <meshStandardMaterial color="#dcc59a" roughness={0.9} />
      </instancedMesh>
      <instancedMesh ref={capitals} args={[geometries.capital, undefined, n]} castShadow receiveShadow>
        <meshStandardMaterial color="#e4cfa6" roughness={0.85} />
      </instancedMesh>
      <instancedMesh ref={beams} args={[geometries.box, undefined, bayList.length]} castShadow receiveShadow>
        <meshStandardMaterial color="#d6bf93" roughness={0.9} />
      </instancedMesh>
    </group>
  )
}
