import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import { MAP_OVERVIEW, MapCamera } from './MapCamera'
import { MapMarkers } from './MapMarkers'
import { MapOverlay } from './MapOverlay'
import { SiteGlyphs } from './SiteGlyphs'
import { Terrain } from './Terrain'

const SUN: [number, number, number] = [-220, 260, 140]

/** The landing view: a relief map of Lebanon with a marker per site. */
export function MapView() {
  const overlay = useRef<HTMLDivElement>(null)
  return (
    <div className="app map-view">
      <div className="stage">
        <Canvas
          shadows="percentage"
          dpr={[1, 2]}
          camera={{ position: MAP_OVERVIEW.position, fov: 42, near: 0.5, far: 2500 }}
          gl={{ antialias: true, preserveDrawingBuffer: true }}
        >
          <AdaptiveDpr pixelated />
          <color attach="background" args={['#15415c']} />
          <fog attach="fog" args={['#15415c', 330, 950]} />
          <hemisphereLight args={['#eef3ff', '#5c6b4a', 0.9]} />
          <directionalLight
            position={SUN}
            intensity={2.1}
            color="#fff3df"
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-left={-220}
            shadow-camera-right={220}
            shadow-camera-top={220}
            shadow-camera-bottom={-220}
            shadow-camera-near={50}
            shadow-camera-far={800}
            shadow-bias={-0.0006}
          />
          <Terrain portal={overlay} />
          <SiteGlyphs />
          <MapMarkers portal={overlay} />
          <MapCamera />
        </Canvas>
        <div ref={overlay} className="overlay" />
      </div>
      <MapOverlay />
    </div>
  )
}
