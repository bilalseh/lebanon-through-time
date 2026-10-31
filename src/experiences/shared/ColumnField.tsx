import { useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useStore } from '../../state/store'
import { fieldColumnState, isUp, type FieldColumn } from './fieldColumns'

export interface ColumnFieldProps {
  columns: FieldColumn[]
  /** Neighbouring columns to span with a lintel or an arch (indices into `columns`). */
  pairs?: Array<[number, number]>
  connector?: 'lintel' | 'arch'
  /** Height of the lintel, or of the arch slab, as a multiple of the column radius. */
  connectorHeight?: number
  shaft?: string
  capital?: string
  link?: string
}

const up = new THREE.Vector3(0, 1, 0)
const axis = new THREE.Vector3()
const dir = new THREE.Vector3()
const m = new THREE.Matrix4()
const pivot = new THREE.Matrix4()
const rotation = new THREE.Matrix4()
const scale = new THREE.Matrix4()
const local = new THREE.Matrix4()
const part = new THREE.Matrix4()
const HIDDEN = new THREE.Matrix4().makeScale(0, 0, 0)

/** A slab spanning x from -0.5 to 0.5 with a round opening along its underside: an arch when stretched between two columns. */
function archGeometry(): THREE.BufferGeometry {
  const s = new THREE.Shape()
  s.moveTo(-0.5, 0)
  s.lineTo(-0.5, 1)
  s.lineTo(0.5, 1)
  s.lineTo(0.5, 0)
  s.lineTo(0.42, 0)
  s.absarc(0, 0, 0.42, 0, Math.PI, false)
  s.closePath()
  const g = new THREE.ExtrudeGeometry(s, { depth: 1, bevelEnabled: false })
  g.translate(0, 0, -0.5)
  return g
}

/** Draws any number of columns with three InstancedMeshes; matrices update only when the timeline moves. */
export function ColumnField({
  columns,
  pairs = [],
  connector = 'lintel',
  connectorHeight = 2.2,
  shaft = '#dcc59a',
  capital = '#e4cfa6',
  link = '#d6bf93',
}: ColumnFieldProps) {
  const t = useStore((s) => s.t)
  const shafts = useRef<THREE.InstancedMesh>(null)
  const capitals = useRef<THREE.InstancedMesh>(null)
  const links = useRef<THREE.InstancedMesh>(null)
  const geometries = useMemo(
    () => ({
      shaft: new THREE.CylinderGeometry(1, 1.08, 1, 14),
      capital: new THREE.CylinderGeometry(1.5, 1.05, 1, 12),
      box: new THREE.BoxGeometry(1, 1, 1),
      arch: archGeometry(),
    }),
    [],
  )

  useLayoutEffect(() => {
    const states = columns.map((c) => fieldColumnState(c, t))
    columns.forEach((c, i) => {
      const s = states[i]
      if (s.build <= 0.001) {
        shafts.current!.setMatrixAt(i, HIDDEN)
        capitals.current!.setMatrixAt(i, HIDDEN)
        return
      }
      const lift = c.radius * Math.sin(s.tilt)
      pivot.makeTranslation(c.x, c.baseY + lift, c.z)
      dir.set(c.fallDir[0], 0, c.fallDir[1])
      axis.crossVectors(up, dir).normalize()
      rotation.makeRotationAxis(axis, s.tilt)
      scale.makeScale(1, s.build, 1)
      m.copy(pivot).multiply(rotation).multiply(scale)
      const capH = c.radius * 1.2
      const shaftH = c.height - capH
      local.makeTranslation(0, shaftH / 2, 0)
      part.makeScale(c.radius, shaftH, c.radius)
      shafts.current!.setMatrixAt(i, pivot.copy(m).multiply(local).multiply(part))
      local.makeTranslation(0, shaftH + capH / 2, 0)
      part.makeScale(c.radius, capH, c.radius)
      capitals.current!.setMatrixAt(i, pivot.copy(m).multiply(local).multiply(part))
    })

    pairs.forEach(([a, b], i) => {
      const ca = columns[a]
      const cb = columns[b]
      if (!isUp(states[a]) || !isUp(states[b])) {
        links.current!.setMatrixAt(i, HIDDEN)
        return
      }
      const dx = cb.x - ca.x
      const dz = cb.z - ca.z
      const span = Math.hypot(dx, dz)
      const h = ca.radius * connectorHeight
      const top = ca.baseY + ca.height
      m.makeTranslation((ca.x + cb.x) / 2, connector === 'arch' ? top : top + h / 2, (ca.z + cb.z) / 2)
      m.multiply(rotation.makeRotationY(-Math.atan2(dz, dx)))
      m.multiply(scale.makeScale(connector === 'arch' ? span : span + ca.radius * 2.2, connector === 'arch' ? span * 0.7 : h, ca.radius * 2.2))
      links.current!.setMatrixAt(i, m)
    })

    for (const mesh of [shafts, capitals, links]) {
      if (!mesh.current) continue
      mesh.current.instanceMatrix.needsUpdate = true
      mesh.current.computeBoundingSphere()
    }
  }, [t, columns, pairs, connector, connectorHeight])

  return (
    <group>
      <instancedMesh ref={shafts} args={[geometries.shaft, undefined, columns.length]} castShadow receiveShadow>
        <meshStandardMaterial color={shaft} roughness={0.9} />
      </instancedMesh>
      <instancedMesh ref={capitals} args={[geometries.capital, undefined, columns.length]} castShadow receiveShadow>
        <meshStandardMaterial color={capital} roughness={0.85} />
      </instancedMesh>
      {pairs.length > 0 && (
        <instancedMesh ref={links} args={[connector === 'arch' ? geometries.arch : geometries.box, undefined, pairs.length]} castShadow receiveShadow>
          <meshStandardMaterial color={link} roughness={0.9} />
        </instancedMesh>
      )}
    </group>
  )
}
