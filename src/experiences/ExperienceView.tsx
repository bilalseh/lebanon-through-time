import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import type { Site } from '../data/types'
import { UI } from '../data/ui'
import { useGuidedTour, useHistoryPlayback } from '../lib/usePlayback'
import { useT } from '../lib/useLang'
import { actions, useStore } from '../state/store'
import { InfoPanel } from '../ui/InfoPanel'
import { LangToggle } from '../ui/LangToggle'
import { NarrationToggle } from '../ui/NarrationToggle'
import { PlacesList } from '../ui/PlacesList'
import { Timeline } from '../ui/Timeline'
import { TopBar } from '../ui/TopBar'
import { CameraRig } from './shared/CameraRig'
import { Hotspots } from './shared/Hotspots'
import { EXPERIENCES, type Experience } from './types'

/** Loads a site's 3D experience on demand and renders it with the shared controls. */
export function ExperienceView({ site }: { site: Site }) {
  const [experience, setExperience] = useState<Experience | null>(null)
  const overlay = useRef<HTMLDivElement>(null)
  const touring = useStore((s) => s.touring)
  const tr = useT()
  useHistoryPlayback(experience)
  useGuidedTour(experience)

  useEffect(() => {
    let alive = true
    setExperience(null)
    EXPERIENCES[site.id]?.().then((m) => {
      if (!alive) return
      actions.resetExperience(m.experience.timelineMax)
      setExperience(m.experience)
    })
    return () => {
      alive = false
    }
  }, [site.id])

  if (!experience) {
    return (
      <div className="app">
        <p className="loading">{tr(UI.loading3d)}</p>
      </div>
    )
  }

  const { Scene, camera } = experience
  return (
    <div className="app">
      <div className="stage">
        <Canvas
          shadows="percentage"
          dpr={[1, 2]}
          camera={{ position: experience.overview.position, fov: camera?.fov ?? 45, near: camera?.near ?? 1, far: camera?.far ?? 4000 }}
          gl={{ antialias: true, preserveDrawingBuffer: true }}
        >
          <AdaptiveDpr pixelated />
          <Scene />
          <Hotspots hotspots={experience.hotspots} portal={overlay} />
          <CameraRig experience={experience} />
        </Canvas>
        <div ref={overlay} className="overlay" />
      </div>
      <TopBar title={tr(site.name)} subtitle={tr(site.tagline)} back={{ kind: 'site', id: site.id }}>
        <button type="button" className="btn" onClick={() => actions.setTouring(!touring)}>
          {touring ? tr(UI.stopTour) : tr(UI.tour)}
        </button>
        <NarrationToggle compact />
        <LangToggle />
      </TopBar>
      <PlacesList hotspots={experience.hotspots} />
      <InfoPanel hotspots={experience.hotspots} />
      <Timeline experience={experience} />
      <p className="hint">{tr(UI.hint3d)}</p>
      <p className="disclaimer">{tr(UI.disclaimer)}</p>
    </div>
  )
}
