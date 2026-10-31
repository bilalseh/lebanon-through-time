import { useState } from 'react'
import { CATEGORIES, CATEGORY_IDS, REGIONS } from '../data/regions'
import { SITES, latestEventAt, siteById } from '../data/sites'
import { UI } from '../data/ui'
import { MAP_YEAR_MAX, formatYear } from '../data/years'
import { hasExperience } from '../experiences/types'
import { useT } from '../lib/useLang'
import { actions, useStore } from '../state/store'
import { LangToggle } from '../ui/LangToggle'
import { NarrationToggle } from '../ui/NarrationToggle'
import { TopBar } from '../ui/TopBar'
import { TimeScrubber } from './TimeScrubber'
import { filterSites } from './filter'

function SiteList({ onPick }: { onPick: () => void }) {
  const filter = useStore((s) => s.filter)
  const query = useStore((s) => s.query)
  const focused = useStore((s) => s.focused)
  const tr = useT()
  const visible = filterSites(SITES, filter, query)

  return (
    <nav className="sidebar" aria-label={tr(UI.sites)}>
      <input
        type="search"
        className="sidebar__search"
        placeholder={tr(UI.search)}
        value={query}
        onChange={(e) => actions.setQuery(e.target.value)}
        aria-label={tr(UI.search)}
      />
      <div className="chips" role="group">
        <button type="button" className={`chip${filter === 'all' ? ' is-active' : ''}`} onClick={() => actions.setFilter('all')}>
          {tr(UI.all)}
        </button>
        {CATEGORY_IDS.map((c) => (
          <button
            type="button"
            key={c}
            className={`chip${filter === c ? ' is-active' : ''}`}
            style={{ '--pin': CATEGORIES[c].color } as React.CSSProperties}
            onClick={() => actions.setFilter(filter === c ? 'all' : c)}
          >
            <span className="chip__dot" />
            {tr(CATEGORIES[c].name)}
          </button>
        ))}
      </div>
      {visible.length === 0 && <p className="sidebar__empty">{tr(UI.noResults)}</p>}
      <ol className="site-list">
        {visible.map((site) => (
          <li key={site.id}>
            <button
              type="button"
              className={`site-row${focused === site.id ? ' is-active' : ''}`}
              onClick={() => {
                actions.focus(site.id)
                onPick()
              }}
              onPointerEnter={() => actions.hover(site.id)}
              onPointerLeave={() => actions.hover(null)}
            >
              {site.photos[0] && <img src={site.photos[0].thumb} alt="" loading="lazy" />}
              <span className="site-row__text">
                <strong>{tr(site.name)}</strong>
                <small>{tr(REGIONS[site.region])}</small>
              </span>
              <span className="site-row__badges">
                {site.unesco && <span className="badge badge--unesco" title={tr(UI.unesco)}>UNESCO</span>}
                {hasExperience(site.id) && <span className="badge badge--3d">{tr(UI.in3d)}</span>}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}

function FocusCard() {
  const focused = useStore((s) => s.focused)
  const year = useStore((s) => s.year)
  const lang = useStore((s) => s.lang)
  const tr = useT()
  const site = siteById(focused)
  if (!site) return null
  const event = latestEventAt(site, year)
  const hero = site.photos[0]

  return (
    <aside className="focus-card" key={site.id} aria-live="polite">
      <button type="button" className="info__close" onClick={() => actions.focus(null)} aria-label={tr(UI.close)}>
        ×
      </button>
      {hero && <img className="focus-card__img" src={hero.thumb} alt={tr(hero.caption)} />}
      <div className="focus-card__body">
        <span className="info__eyebrow">
          {tr(REGIONS[site.region])} · {tr(CATEGORIES[site.category].name)}
        </span>
        <h2>{tr(site.name)}</h2>
        <p>{tr(site.tagline)}</p>
        {year < MAP_YEAR_MAX && (
          <p className="focus-card__event">
            {event ? (
              <>
                <strong>{formatYear(event.year, lang, event.approx)}</strong> {tr(event.title)}
              </>
            ) : (
              tr(UI.nothingYet)
            )}
          </p>
        )}
        <div className="focus-card__actions">
          <button type="button" className="btn btn--primary" onClick={() => actions.navigate({ kind: 'site', id: site.id })}>
            {tr(UI.explore)}
          </button>
          {hasExperience(site.id) && (
            <button type="button" className="btn" onClick={() => actions.navigate({ kind: 'experience', id: site.id })}>
              {tr(UI.in3d)}
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}

export function MapOverlay() {
  const [drawer, setDrawer] = useState(false)
  const tr = useT()
  return (
    <>
      <TopBar title={tr(UI.title)} subtitle={tr(UI.subtitle)}>
        <button type="button" className="btn sidebar-toggle" onClick={() => setDrawer((d) => !d)} aria-expanded={drawer}>
          {tr(UI.sites)}
        </button>
        <NarrationToggle compact />
        <LangToggle />
      </TopBar>
      <div className={`sidebar-wrap${drawer ? ' is-open' : ''}`}>
        <SiteList onPick={() => setDrawer(false)} />
      </div>
      <FocusCard />
      <TimeScrubber />
      <p className="hint">{tr(UI.mapHint)}</p>
    </>
  )
}
