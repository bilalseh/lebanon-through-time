import { UI } from '../data/ui'
import { actions, useStore } from '../state/store'
import { useT } from '../lib/useLang'

export function LangToggle({ className = 'btn btn--ghost' }: { className?: string }) {
  const lang = useStore((s) => s.lang)
  const tr = useT()
  return (
    <button
      type="button"
      className={className}
      lang={lang === 'en' ? 'ar' : 'en'}
      onClick={() => actions.setLang(lang === 'en' ? 'ar' : 'en')}
    >
      {tr(UI.language)}
    </button>
  )
}
