import { UI } from '../data/content'
import { actions, useStore } from '../state/store'
import { useT } from '../lib/useLang'

export function Intro() {
  const started = useStore((s) => s.started)
  const lang = useStore((s) => s.lang)
  const tr = useT()
  if (started) return null
  return (
    <div className="intro">
      <div className="intro__card">
        <span className="intro__eyebrow">Heliopolis · Baalbek</span>
        <h1>{tr(UI.title)}</h1>
        <p>{tr(UI.intro)}</p>
        <div className="intro__actions">
          <button type="button" className="btn btn--primary" onClick={() => actions.start()} autoFocus>
            {tr(UI.start)}
          </button>
          <button type="button" className="btn btn--ghost" onClick={() => actions.setLang(lang === 'en' ? 'ar' : 'en')}>
            {tr(UI.language)}
          </button>
        </div>
        <small>{tr(UI.disclaimer)}</small>
      </div>
    </div>
  )
}
