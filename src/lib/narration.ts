import type { Lang } from '../data/types'

/**
 * Spoken narration, in order of preference:
 *  1. pre-recorded clips under public/audio/<lang>/<key>.mp3 (made with scripts/tts.ts),
 *  2. the browser's own speech synthesis, if it has a voice for the language,
 *  3. otherwise a silent pause about as long as reading the text would take,
 *     so playback keeps its rhythm and the UI can explain why nothing is heard.
 */
const hasSpeech = typeof window !== 'undefined' && 'speechSynthesis' in window
const inBrowser = typeof window !== 'undefined' && typeof fetch === 'function'

let voices: SpeechSynthesisVoice[] = []
const listeners = new Set<() => void>()
const notify = () => listeners.forEach((l) => l())

if (hasSpeech) {
  voices = speechSynthesis.getVoices()
  speechSynthesis.addEventListener('voiceschanged', () => {
    voices = speechSynthesis.getVoices()
    notify()
  })
}

/** Keys of the recorded clips, per language, from public/audio/manifest.json. */
const clips: Record<Lang, Set<string>> = { en: new Set(), ar: new Set() }
if (inBrowser) {
  fetch('/audio/manifest.json')
    .then((r) => (r.ok && r.headers.get('content-type')?.includes('json') ? r.json() : null))
    .then((m: Partial<Record<Lang, string[]>> | null) => {
      if (!m) return
      for (const lang of ['en', 'ar'] as Lang[]) clips[lang] = new Set(m[lang] ?? [])
      notify()
    })
    .catch(() => {
      /* no recorded narration: the browser voice is used instead */
    })
}

export function hasVoice(lang: Lang): boolean {
  return voices.some((v) => v.lang.toLowerCase().startsWith(lang))
}

export type NarrationStatus = 'audio' | 'voice' | 'none'

export function narrationStatus(lang: Lang): NarrationStatus {
  if (clips[lang].size > 0) return 'audio'
  if (hasVoice(lang)) return 'voice'
  return 'none'
}

/** Notifies when voices load or the clip manifest arrives. */
export function subscribeStatus(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function pickVoice(lang: Lang): SpeechSynthesisVoice | undefined {
  const matching = voices.filter((v) => v.lang.toLowerCase().startsWith(lang))
  // Cloud and "natural" voices sound far better than the basic local ones.
  return matching.find((v) => /natural|google|online|neural/i.test(v.name)) ?? matching[0]
}

let finishCurrent: (() => void) | null = null
let keepAlive = 0
let audio: HTMLAudioElement | null = null

/** Wraps a resolver so it runs once and can be triggered early by cancel(). */
function once(resolve: () => void, cleanup?: () => void): () => void {
  let done = false
  const finish = () => {
    if (done) return
    done = true
    cleanup?.()
    if (finishCurrent === finish) finishCurrent = null
    resolve()
  }
  finishCurrent = finish
  return finish
}

function playClip(url: string): Promise<void> {
  return new Promise((resolve) => {
    const el = new Audio(url)
    audio = el
    const finish = once(resolve, () => {
      if (audio === el) audio = null
    })
    el.onended = finish
    el.onerror = finish
    el.play().catch(finish)
  })
}

function speak(text: string, lang: Lang): Promise<void> {
  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-GB'
    const voice = pickVoice(lang)
    if (voice) utterance.voice = voice
    utterance.rate = lang === 'ar' ? 0.95 : 1
    // Some browsers never fire `end` for a failed utterance, and Chrome can
    // stall long ones unless it is nudged with resume().
    const fallback = window.setTimeout(() => finish(), readingTime(text) * 1.5)
    keepAlive = window.setInterval(() => speechSynthesis.resume(), 8000)
    const finish = once(resolve, () => {
      window.clearTimeout(fallback)
      window.clearInterval(keepAlive)
    })
    utterance.onend = finish
    utterance.onerror = finish
    speechSynthesis.speak(utterance)
  })
}

function pause(ms: number): Promise<void> {
  return new Promise((resolve) => {
    const timer = window.setTimeout(() => finish(), ms)
    const finish = once(resolve, () => window.clearTimeout(timer))
  })
}

/** Milliseconds a listener would need for this text. */
export const readingTime = (text: string) => 1500 + text.length * 65

/** Reads one clip (by key, with its text as the spoken fallback) and resolves when it is over or skipped. */
export function narrate(key: string, text: string, lang: Lang): Promise<void> {
  cancel()
  if (clips[lang].has(key)) return playClip(`/audio/${lang}/${key}.mp3`)
  if (hasSpeech && hasVoice(lang)) return speak(text, lang)
  return pause(readingTime(text))
}

/** Stops whatever is being read; the pending `narrate` promise resolves. */
export function cancel() {
  if (audio) {
    audio.pause()
    audio = null
  }
  if (hasSpeech) speechSynthesis.cancel()
  if (typeof window !== 'undefined') window.clearInterval(keepAlive)
  finishCurrent?.()
  finishCurrent = null
}
