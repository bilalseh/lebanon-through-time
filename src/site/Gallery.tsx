import { useEffect, useState } from 'react'
import type { Photo } from '../data/types'
import { UI } from '../data/ui'
import { useT } from '../lib/useLang'
import { useStore } from '../state/store'

function Credit({ photo }: { photo: Photo }) {
  const tr = useT()
  return (
    <small className="credit">
      {tr(UI.photoBy)}: {photo.author} ·{' '}
      <a href={photo.licenseUrl || photo.source} target="_blank" rel="noreferrer">
        {photo.license}
      </a>{' '}
      ·{' '}
      <a href={photo.source} target="_blank" rel="noreferrer">
        {tr(UI.photoSource)}
      </a>
    </small>
  )
}

function Lightbox({ photos, index, onClose, onMove }: { photos: Photo[]; index: number; onClose: () => void; onMove: (i: number) => void }) {
  const rtl = useStore((s) => s.lang === 'ar')
  const tr = useT()
  const photo = photos[index]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') onMove(rtl ? index - 1 : index + 1)
      else if (e.key === 'ArrowLeft') onMove(rtl ? index + 1 : index - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, onClose, onMove, rtl])

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={tr(photo.caption)} onClick={onClose}>
      <figure onClick={(e) => e.stopPropagation()}>
        <img src={photo.src} alt={tr(photo.caption)} />
        <figcaption>
          {photo.year && (
            <span className="badge badge--year">
              {tr(UI.historicPhoto)} · {photo.year}
            </span>
          )}
          <p>{tr(photo.caption)}</p>
          <Credit photo={photo} />
        </figcaption>
      </figure>
      <button type="button" className="info__close lightbox__close" onClick={onClose} aria-label={tr(UI.close)}>
        ×
      </button>
      <button type="button" className="btn btn--round lightbox__prev" disabled={index === 0} onClick={() => onMove(index - 1)} aria-label={tr(UI.previous)}>
        {rtl ? '›' : '‹'}
      </button>
      <button
        type="button"
        className="btn btn--round lightbox__next"
        disabled={index === photos.length - 1}
        onClick={() => onMove(index + 1)}
        aria-label={tr(UI.next)}
      >
        {rtl ? '‹' : '›'}
      </button>
    </div>
  )
}

/** Photo grid with credits and a keyboard-friendly lightbox. */
export function Gallery({ photos }: { photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const tr = useT()

  return (
    <>
      <ul className="gallery">
        {photos.map((p, i) => (
          <li key={p.src}>
            <button type="button" className="gallery__item" onClick={() => setOpen(i)}>
              <img src={p.thumb} alt={tr(p.caption)} loading="lazy" />
              {p.year && <span className="badge badge--year">{p.year}</span>}
            </button>
            <p className="gallery__caption">{tr(p.caption)}</p>
            <Credit photo={p} />
          </li>
        ))}
      </ul>
      {open !== null && (
        <Lightbox
          photos={photos}
          index={open}
          onClose={() => setOpen(null)}
          onMove={(i) => {
            if (i >= 0 && i < photos.length) setOpen(i)
          }}
        />
      )}
    </>
  )
}
