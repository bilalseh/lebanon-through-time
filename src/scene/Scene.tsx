import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import { CameraRig, OVERVIEW } from './CameraRig'
import { Columns } from './Columns'
import { Environment } from './Environment'
import { Hotspots } from './Hotspots'
import { Temples } from './Temples'

export function Scene() {
  return (
    <Canvas
      shadows="percentage"
      dpr={[1, 2]}
      camera={{ position: OVERVIEW.position.toArray(), fov: 45, near: 1, far: 4000 }}
      gl={{ antialias: true, preserveDrawingBuffer: true }}
    >
      <AdaptiveDpr pixelated />
      <Environment />
      <Temples />
      <Columns />
      <Hotspots />
      <CameraRig />
    </Canvas>
  )
}
