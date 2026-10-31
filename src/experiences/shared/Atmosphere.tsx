import { Sky } from '@react-three/drei'
import type { ReactNode } from 'react'

export interface AtmosphereProps {
  sun?: [number, number, number]
  /** Fog colour and the distances where it starts and becomes opaque. */
  fog?: [string, number, number]
  ground?: string
  groundSize?: number
  /** Height of the ground plane; lower it when the scene's own terrain dips below zero. */
  groundY?: number
  /** Half-size of the area that receives shadows; keep it tight for crisp shadows. */
  shadowExtent?: number
  children?: ReactNode
}

/** Sky, sunlight, fog and a ground plane; the common backdrop of every 3D experience. */
export function Atmosphere({
  sun = [-170, 150, 120],
  fog = ['#d8d2c4', 320, 1300],
  ground = '#b6a079',
  groundSize = 4000,
  groundY = 0,
  shadowExtent = 190,
  children,
}: AtmosphereProps) {
  return (
    <>
      <Sky sunPosition={sun} turbidity={6} rayleigh={1.4} mieCoefficient={0.004} mieDirectionalG={0.85} />
      <fog attach="fog" args={fog} />
      <hemisphereLight args={['#fff4e0', '#8a7354', 0.85]} />
      <directionalLight
        position={sun}
        intensity={2.4}
        color="#fff1d6"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-shadowExtent}
        shadow-camera-right={shadowExtent}
        shadow-camera-top={shadowExtent}
        shadow-camera-bottom={-shadowExtent}
        shadow-camera-near={10}
        shadow-camera-far={600}
        shadow-bias={-0.0004}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, groundY, 0]} receiveShadow>
        <planeGeometry args={[groundSize, groundSize]} />
        <meshStandardMaterial color={ground} roughness={1} />
      </mesh>
      {children}
    </>
  )
}
