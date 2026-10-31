import { useEffect, useRef, type ComponentRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { MAP_BOUNDS } from '../data/lebanon/terrain'
import { siteById } from '../data/sites'
import { store, useStore } from '../state/store'
import { sitePosition } from './positions'

export const MAP_OVERVIEW = {
  position: [-70, 175, 235] as [number, number, number],
  target: [0, 0, 10] as [number, number, number],
}
/** Camera offset from a focused marker, so the site is seen from the south-west with context around it. */
const FOCUS_OFFSET = new THREE.Vector3(-36, 40, 56)
const FLIGHT_SECONDS = 1.8
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)

/** Orbit, pan and zoom over the map, with smooth flights to the focused site. */
export function MapCamera() {
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null)
  const camera = useThree((s) => s.camera)
  const flight = useStore((s) => s.mapFlight)
  const anim = useRef<{
    progress: number
    fromPos: THREE.Vector3
    fromTarget: THREE.Vector3
    toPos: THREE.Vector3
    toTarget: THREE.Vector3
  } | null>(null)

  useEffect(() => {
    const site = siteById(store.get().focused)
    if (!controls.current || (flight === 0 && !site)) return
    const target = site ? new THREE.Vector3(...sitePosition(site)) : new THREE.Vector3(...MAP_OVERVIEW.target)
    const position = site ? target.clone().add(FOCUS_OFFSET) : new THREE.Vector3(...MAP_OVERVIEW.position)
    anim.current = {
      progress: 0,
      fromPos: camera.position.clone(),
      fromTarget: controls.current.target.clone(),
      toPos: position,
      toTarget: target,
    }
  }, [flight, camera])

  useEffect(() => {
    const c = controls.current
    if (!c) return
    const cancel = () => {
      anim.current = null
    }
    c.addEventListener('start', cancel)
    return () => c.removeEventListener('start', cancel)
  }, [])

  useFrame((_, delta) => {
    const c = controls.current
    if (!c) return
    const a = anim.current
    if (a) {
      a.progress = Math.min(1, a.progress + delta / FLIGHT_SECONDS)
      const k = ease(a.progress)
      camera.position.lerpVectors(a.fromPos, a.toPos, k)
      c.target.lerpVectors(a.fromTarget, a.toTarget, k)
      if (a.progress >= 1) anim.current = null
    } else {
      // Keep the view over the map area when panning.
      const t = c.target
      const clampedX = Math.min(MAP_BOUNDS.maxX - 20, Math.max(MAP_BOUNDS.minX + 20, t.x))
      const clampedZ = Math.min(MAP_BOUNDS.maxZ - 20, Math.max(MAP_BOUNDS.minZ + 20, t.z))
      if (clampedX !== t.x || clampedZ !== t.z) {
        camera.position.x += clampedX - t.x
        camera.position.z += clampedZ - t.z
        t.set(clampedX, 0, clampedZ)
      }
    }
    c.update()
  })

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      target={MAP_OVERVIEW.target}
      enableDamping
      dampingFactor={0.08}
      minDistance={16}
      maxDistance={420}
      maxPolarAngle={1.25}
      screenSpacePanning={false}
    />
  )
}
