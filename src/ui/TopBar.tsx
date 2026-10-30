import { UI } from '../data/content'
import { actions, useStore } from '../state/store'
import { useT } from '../lib/useLang'

export function TopBar() {
  const lang = useStore((s) => s.lang)
  const touring = useStore((s) => s.touring)
  const tr = useT()
  return (
    <header className="topbar">
      <div className="brand">
        <svg viewBox="0 0 64 64" aria-hidden="true" className="brand__icon">
          <g fill="currentColor">
            <rect x="10" y="14" width="44" height="6" rx="1" />
            <rect x="13" y="22" width="6" height="28" />
            <rect x="23" y="22" width="6" height="28" />
            <rect x="35" y="22" width="6" height="28" />
            <rect x="45" y="22" width="6" height="28" />
            <rect x="8" y="50" width="48" height="5" rx="1" />
          </g>
        </svg>
        <div>
          <h1>{tr(UI.title)}</h1>
          <p>{tr(UI.subtitle)}</p>
        </div>
      </div>
      <div className="topbar__actions">
        <button type="button" className="btn" onClick={() => actions.setTouring(!touring)}>
          {touring ? tr(UI.stopTour) : tr(UI.tour)}
        </button>
        <button
          type="button"
          className="btn btn--ghost"
          lang={lang === 'en' ? 'ar' : 'en'}
          onClick={() => actions.setLang(lang === 'en' ? 'ar' : 'en')}
        >
          {tr(UI.language)}
        </button>
      </div>
    </header>
  )
}
