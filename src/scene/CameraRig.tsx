import { useEffect, useRef, type ComponentRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { HOTSPOTS } from '../data/content'
import { store, useStore } from '../state/store'

export const OVERVIEW = {
  position: new THREE.Vector3(150, 95, 170),
  target: new THREE.Vector3(10, 8, 25),
}

const FLIGHT_SECONDS = 1.6
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)

/**
 * Orbit controls plus smooth "fly to" transitions whenever a point of interest is selected.
 * Dragging during a flight cancels it, so the user always stays in control.
 */
export function CameraRig() {
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null)
  const camera = useThree((s) => s.camera)
  const flight = useStore((s) => s.flight)
  const started = useStore((s) => s.started)
  const anim = useRef<{
    progress: number
    fromPos: THREE.Vector3
    fromTarget: THREE.Vector3
    toPos: THREE.Vector3
    toTarget: THREE.Vector3
  } | null>(null)

  useEffect(() => {
    if (flight === 0 || !controls.current) return
    const id = store.get().selected
    const hotspot = HOTSPOTS.find((h) => h.id === id)
    anim.current = {
      progress: 0,
      fromPos: camera.position.clone(),
      fromTarget: controls.current.target.clone(),
      toPos: hotspot ? new THREE.Vector3(...hotspot.camera.position) : OVERVIEW.position.clone(),
      toTarget: hotspot ? new THREE.Vector3(...hotspot.camera.target) : OVERVIEW.target.clone(),
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
    const a = anim.current
    if (!a || !controls.current) return
    a.progress = Math.min(1, a.progress + delta / FLIGHT_SECONDS)
    const k = ease(a.progress)
    camera.position.lerpVectors(a.fromPos, a.toPos, k)
    controls.current.target.lerpVectors(a.fromTarget, a.toTarget, k)
    controls.current.update()
    if (a.progress >= 1) anim.current = null
  })

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      target={OVERVIEW.target}
      enableDamping
      dampingFactor={0.08}
      minDistance={12}
      maxDistance={520}
      maxPolarAngle={Math.PI / 2.08}
      autoRotate={!started}
      autoRotateSpeed={0.35}
    />
  )
}
