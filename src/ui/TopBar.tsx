import type { ReactNode } from 'react'
import { UI } from '../data/ui'
import type { View } from '../lib/router'
import { actions, useStore } from '../state/store'
import { useT } from '../lib/useLang'

/** Stylised cedar: the brand mark used across the app. */
export function CedarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <g fill="currentColor">
        <path d="M32 5 L43 20 H37 L49 34 H41 L55 50 H34 V60 H30 V50 H9 L23 34 H15 L27 20 H21 Z" />
      </g>
    </svg>
  )
}

export function TopBar({
  title,
  subtitle,
  back,
  children,
}: {
  title: string
  subtitle?: string
  /** Where the back button leads; omitted on the map itself. */
  back?: View
  children?: ReactNode
}) {
  const rtl = useStore((s) => s.lang === 'ar')
  const tr = useT()
  return (
    <header className="topbar">
      <div className="brand">
        {back ? (
          <button type="button" className="btn btn--round brand__back" onClick={() => actions.navigate(back)} aria-label={tr(UI.backToMap)}>
            {rtl ? '→' : '←'}
          </button>
        ) : (
          <CedarIcon className="brand__icon" />
        )}
        <div>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
      <div className="topbar__actions">{children}</div>
    </header>
  )
}
