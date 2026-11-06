import { useEffect, useMemo, useRef, type ComponentRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { store, useStore } from '../../state/store'
import type { Experience } from '../types'
import { usePanelViewOffset } from './usePanelViewOffset'

const FLIGHT_SECONDS = 1.6
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)

/**
 * Orbit controls plus smooth "fly to" transitions whenever a point of interest is selected.
 * Dragging during a flight cancels it, so the user always stays in control. The scene
 * rotates slowly on its own until the user first touches it.
 */
export function CameraRig({ experience }: { experience: Experience }) {
  const { hotspots, overview, controls: limits } = experience
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null)
  const camera = useThree((s) => s.camera)
  const size = useThree((s) => s.size)
  const flight = useStore((s) => s.flight)
  const selected = useStore((s) => s.selected)
  const interacted = useRef(false)
  usePanelViewOffset('.places, .info', '.timeline, .topbar .brand')

  // A phone in portrait sees a narrower slice of the scene, so its overview starts further back.
  const portrait = size.width < size.height
  const overviewPosition = useMemo(() => {
    const target = new THREE.Vector3(...overview.target)
    const position = new THREE.Vector3(...overview.position)
    return portrait ? target.add(position.sub(target).multiplyScalar(1.7)) : position
  }, [overview, portrait])

  useEffect(() => {
    if (flight !== 0 || !portrait) return
    camera.position.copy(overviewPosition)
    controls.current?.update()
  }, [portrait, overviewPosition, camera, flight])
  const anim = useRef<{
    progress: number
    fromPos: THREE.Vector3
    fromTarget: THREE.Vector3
    toPos: THREE.Vector3
    toTarget: THREE.Vector3
  } | null>(null)

  useEffect(() => {
    if (flight === 0 || !controls.current) return
    const hotspot = hotspots.find((h) => h.id === store.get().selected)
    anim.current = {
      progress: 0,
      fromPos: camera.position.clone(),
      fromTarget: controls.current.target.clone(),
      toPos: hotspot ? new THREE.Vector3(...hotspot.camera.position) : overviewPosition.clone(),
      toTarget: new THREE.Vector3(...(hotspot ? hotspot.camera.target : overview.target)),
    }
  }, [flight, camera, hotspots, overview, overviewPosition])

  useEffect(() => {
    const c = controls.current
    if (!c) return
    const cancel = () => {
      anim.current = null
      interacted.current = true
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
      target={overview.target}
      enableDamping
      dampingFactor={0.08}
      minDistance={limits.minDistance}
      maxDistance={limits.maxDistance}
      maxPolarAngle={limits.maxPolarAngle ?? Math.PI / 2.08}
      autoRotate={!interacted.current && selected === null}
      autoRotateSpeed={0.35}
    />
  )
}
