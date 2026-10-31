import { CATEGORIES, REGIONS } from '../data/regions'
import { nearbySites } from '../data/sites'
import type { Site } from '../data/types'
import { UI } from '../data/ui'
import { hasExperience } from '../experiences/types'
import { useT } from '../lib/useLang'
import { actions, useStore } from '../state/store'
import { LangToggle } from '../ui/LangToggle'
import { Gallery } from './Gallery'
import { SiteTimeline } from './SiteTimeline'

/** A site's page: hero, story, interactive timeline, photographs and nearby places. */
export function SitePage({ site }: { site: Site }) {
  const rtl = useStore((s) => s.lang === 'ar')
  const tr = useT()
  const hero = site.photos[0]
  const nearby = nearbySites(site, 3)

  return (
    <main className="site" key={site.id}>
      <header className="site__hero" style={hero ? { backgroundImage: `url(${hero.src})` } : undefined}>
        <div className="site__nav">
          <button type="button" className="btn btn--ghost" onClick={() => actions.navigate({ kind: 'map' })}>
            {rtl ? '→' : '←'} {tr(UI.backToMap)}
          </button>
          <LangToggle />
        </div>
        <div className="site__hero-text">
          <p className="site__eyebrow">
            <span>{tr(REGIONS[site.region])}</span>
            <span>{tr(CATEGORIES[site.category].name)}</span>
            {site.unesco && <span className="badge badge--unesco">{tr(UI.unesco)} · {site.unesco}</span>}
          </p>
          <h1>{tr(site.name)}</h1>
          <p className="site__tagline">{tr(site.tagline)}</p>
          <div className="site__actions">
            {hasExperience(site.id) && (
              <button type="button" className="btn btn--primary" onClick={() => actions.navigate({ kind: 'experience', id: site.id })}>
                {tr(UI.open3d)}
              </button>
            )}
            <button
              type="button"
              className="btn"
              onClick={() => {
                actions.focus(site.id)
                actions.navigate({ kind: 'map' })
              }}
            >
              {tr(UI.showOnMap)}
            </button>
          </div>
        </div>
      </header>

      <div className="site__body">
        <section className="site__story">
          <h2>{tr(UI.summary)}</h2>
          <p>{tr(site.summary)}</p>
          <ul className="info__facts">
            {site.facts.map((f) => (
              <li key={f.en}>{tr(f)}</li>
            ))}
          </ul>
        </section>

        <section className="site__timeline">
          <h2>{tr(UI.timeline)}</h2>
          <SiteTimeline site={site} />
        </section>

        <section className="site__gallery">
          <h2>{tr(UI.gallery)}</h2>
          <Gallery photos={site.photos} />
        </section>

        <section className="site__nearby">
          <h2>{tr(UI.nearby)}</h2>
          <ul className="nearby">
            {nearby.map(({ site: other, km }) => (
              <li key={other.id}>
                <button type="button" className="nearby__card" onClick={() => actions.navigate({ kind: 'site', id: other.id })}>
                  {other.photos[0] && <img src={other.photos[0].thumb} alt="" loading="lazy" />}
                  <span>
                    <strong>{tr(other.name)}</strong>
                    <small>
                      {Math.round(km)} {tr(UI.km)} · {tr(REGIONS[other.region])}
                    </small>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <footer className="site__footer">{tr(UI.credits)}</footer>
      </div>
    </main>
  )
}
