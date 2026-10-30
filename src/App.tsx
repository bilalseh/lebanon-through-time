import { useEffect } from 'react'
import { Scene } from './scene/Scene'
import { TopBar } from './ui/TopBar'
import { PlacesList } from './ui/PlacesList'
import { InfoPanel } from './ui/InfoPanel'
import { Timeline } from './ui/Timeline'
import { Intro } from './ui/Intro'
import { UI } from './data/content'
import { useStore } from './state/store'
import { useGuidedTour, useHistoryPlayback } from './lib/usePlayback'
import { useT } from './lib/useLang'

export default function App() {
  const lang = useStore((s) => s.lang)
  const started = useStore((s) => s.started)
  const tr = useT()
  useHistoryPlayback()
  useGuidedTour()

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.title = UI.title[lang]
  }, [lang])

  return (
    <div className="app">
      <div className="stage">
        <Scene />
      </div>
      {started && (
        <>
          <TopBar />
          <PlacesList />
          <InfoPanel />
          <Timeline />
          <p className="hint">{tr(UI.hint)}</p>
          <p className="disclaimer">{tr(UI.disclaimer)}</p>
        </>
      )}
      <Intro />
    </div>
  )
}
