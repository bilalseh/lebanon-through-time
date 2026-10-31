import { useEffect } from 'react'
import { siteById } from './data/sites'
import { UI } from './data/ui'
import { ExperienceView } from './experiences/ExperienceView'
import { hasExperience } from './experiences/types'
import { useRouter } from './lib/useRouter'
import { MapView } from './map/MapView'
import { SitePage } from './site/SitePage'
import { actions, useStore } from './state/store'

export default function App() {
  useRouter()
  const lang = useStore((s) => s.lang)
  const view = useStore((s) => s.view)
  const site = view.kind === 'map' ? undefined : siteById(view.id)
  const unknown = view.kind !== 'map' && !site

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  useEffect(() => {
    document.title = site ? `${site.name[lang]} · ${UI.title[lang]}` : UI.title[lang]
  }, [site, lang])

  useEffect(() => {
    if (unknown) actions.navigate({ kind: 'map' })
  }, [unknown])

  if (view.kind === 'experience' && site && hasExperience(site.id)) return <ExperienceView site={site} />
  if (view.kind !== 'map' && site) return <SitePage site={site} />
  return <MapView />
}
