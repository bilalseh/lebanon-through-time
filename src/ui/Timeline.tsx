import { ERAS, UI, eraAt } from '../data/content'
import { TIMELINE_MAX } from '../data/templeLayout'
import { actions, useStore } from '../state/store'
import { useT } from '../lib/useLang'

export function Timeline() {
  const t = useStore((s) => s.t)
  const playing = useStore((s) => s.playing)
  const tr = useT()
  const era = eraAt(t)

  return (
    <section className="timeline" aria-label={tr(UI.timeline)}>
      <div className="timeline__era">
        <strong>{tr(era.title)}</strong>
        <span>{tr(era.text)}</span>
      </div>
      <div className="timeline__controls">
        <button
          type="button"
          className="btn btn--round"
          onClick={() => actions.setPlaying(!playing)}
          aria-label={playing ? tr(UI.pause) : tr(UI.play)}
          title={playing ? tr(UI.pause) : tr(UI.play)}
        >
          {playing ? '❚❚' : '▶'}
        </button>
        <div className="timeline__track">
          <input
            type="range"
            min={0}
            max={TIMELINE_MAX}
            step={0.001}
            value={t}
            onChange={(e) => {
              actions.setPlaying(false)
              actions.setT(Number(e.target.value))
            }}
            aria-label={tr(UI.timeline)}
            aria-valuetext={tr(era.label)}
            style={{ '--progress': `${(t / TIMELINE_MAX) * 100}%` } as React.CSSProperties}
          />
          <div className="timeline__ticks">
            {ERAS.map((e) => (
              <button
                type="button"
                key={e.t}
                className={era.t === e.t ? 'is-active' : ''}
                style={{ insetInlineStart: `${(e.t / TIMELINE_MAX) * 100}%` }}
                onClick={() => {
                  actions.setPlaying(false)
                  actions.setT(e.t)
                }}
              >
                {tr(e.label)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
