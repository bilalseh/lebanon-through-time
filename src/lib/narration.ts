import type { Lang } from '../data/types'

/**
 * Spoken narration through the browser's speech synthesis: no audio files,
 * works offline, in whichever English and Arabic voices the device has.
 */
export const narrationSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

let voices: SpeechSynthesisVoice[] = []
if (narrationSupported) {
  voices = speechSynthesis.getVoices()
  speechSynthesis.addEventListener('voiceschanged', () => {
    voices = speechSynthesis.getVoices()
  })
}

function pickVoice(lang: Lang): SpeechSynthesisVoice | undefined {
  const matching = voices.filter((v) => v.lang.toLowerCase().startsWith(lang))
  // Cloud and "natural" voices sound far better than the basic local ones.
  return matching.find((v) => /natural|google|online|neural/i.test(v.name)) ?? matching[0]
}

let current: SpeechSynthesisUtterance | null = null
let finishCurrent: (() => void) | null = null
let keepAlive = 0

/** Speaks `text` and resolves when it ends, is skipped, or (as a safety net) after its estimated duration. */
export function speak(text: string, lang: Lang): Promise<void> {
  cancel()
  return new Promise((resolve) => {
    if (!narrationSupported || !text.trim()) {
      resolve()
      return
    }
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-GB'
    const voice = pickVoice(lang)
    if (voice) utterance.voice = voice
    utterance.rate = lang === 'ar' ? 0.95 : 1

    let done = false
    const finish = () => {
      if (done) return
      done = true
      window.clearTimeout(fallback)
      window.clearInterval(keepAlive)
      if (current === utterance) current = null
      resolve()
    }
    utterance.onend = finish
    utterance.onerror = finish
    // Some browsers never fire `end` when no voice is installed; and Chrome
    // can stall long utterances unless it is nudged with resume().
    const fallback = window.setTimeout(finish, 2500 + text.length * 90)
    keepAlive = window.setInterval(() => speechSynthesis.resume(), 8000)

    current = utterance
    finishCurrent = finish
    speechSynthesis.speak(utterance)
  })
}

/** Stops whatever is being read; the pending `speak` promise resolves. */
export function cancel() {
  if (!narrationSupported) return
  current = null
  window.clearInterval(keepAlive)
  speechSynthesis.cancel()
  // Resolve the pending promise ourselves: browsers without a voice may never fire an event.
  finishCurrent?.()
  finishCurrent = null
}
