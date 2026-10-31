import { UI } from '../data/ui'
import { nearestEra } from '../experiences/eras'
import type { Experience } from '../experiences/types'
import { cancel, narrationSupported } from '../lib/narration'
import { actions, useStore } from '../state/store'
import { useT } from '../lib/useLang'

/** The 3D experience's timeline: a slider over the eras plus "play history". */
export function Timeline({ experience }: { experience: Experience }) {
  const { eras, timelineMax } = experience
  const t = useStore((s) => s.t)
  const playing = useStore((s) => s.playing)
  const narrate = useStore((s) => s.narrate) && narrationSupported
  const tr = useT()
  const era = nearestEra(eras, t)

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
        {playing && narrate && (
          <button type="button" className="btn btn--round" onClick={() => cancel()} aria-label={tr(UI.skip)} title={tr(UI.skip)}>
            ⏭
          </button>
        )}
        <div className="timeline__track">
          <input
            type="range"
            min={0}
            max={timelineMax}
            step={0.001}
            value={t}
            onChange={(e) => {
              actions.setPlaying(false)
              actions.setT(Number(e.target.value))
            }}
            aria-label={tr(UI.timeline)}
            aria-valuetext={tr(era.label)}
            style={{ '--progress': `${(t / timelineMax) * 100}%` } as React.CSSProperties}
          />
          <div className="timeline__ticks">
            {eras.map((e) => (
              <button
                type="button"
                key={e.t}
                className={era.t === e.t ? 'is-active' : ''}
                style={{ insetInlineStart: `${(e.t / timelineMax) * 100}%` }}
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
