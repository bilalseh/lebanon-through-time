/**
 * Records the narration clips with Azure Speech neural voices (English, and
 * Lebanese Arabic, which browsers usually lack). Output goes to
 * public/audio/<lang>/<key>.mp3 plus public/audio/manifest.json; the app plays
 * a clip whenever one exists and falls back to the browser voice otherwise.
 *
 * Needs a Speech resource key and its region in the environment:
 *   AZURE_SPEECH_KEY=...  AZURE_SPEECH_REGION=westeurope  npm run narration
 *
 * Options: --lang en|ar (one language), --dry (count and estimate, no calls),
 * --force (re-record clips that already exist).
 */
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Lang } from '../src/data/types'
import { ERAS as ANJAR } from '../src/experiences/anjar/content'
import { ERAS as BAALBEK } from '../src/experiences/baalbek/content'
import { ERAS as CEDARS } from '../src/experiences/cedars/content'
import { ERAS as SIDON } from '../src/experiences/sidon/content'
import { ERAS as TYRE } from '../src/experiences/tyre/content'
import { allClips } from '../src/lib/narrationTexts'

const VOICES: Record<Lang, { locale: string; name: string }> = {
  en: { locale: 'en-GB', name: 'en-GB-SoniaNeural' },
  ar: { locale: 'ar-LB', name: 'ar-LB-LaylaNeural' },
}
const OUT = join('public', 'audio')

const args = process.argv.slice(2)
const langArg = args.indexOf('--lang')
const langs: Lang[] = langArg >= 0 ? [args[langArg + 1] as Lang] : ['en', 'ar']
const dry = args.includes('--dry')
const force = args.includes('--force')
const key = process.env.AZURE_SPEECH_KEY
const region = process.env.AZURE_SPEECH_REGION

const clips = allClips([
  { id: 'baalbek', eras: BAALBEK },
  { id: 'sidon-sea-castle', eras: SIDON },
  { id: 'anjar', eras: ANJAR },
  { id: 'tyre', eras: TYRE },
  { id: 'cedars-of-god', eras: CEDARS },
])

const escapeXml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

async function synthesize(text: string, lang: Lang): Promise<Buffer> {
  const voice = VOICES[lang]
  const ssml =
    `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${voice.locale}">` +
    `<voice name="${voice.name}"><prosody rate="-5%">${escapeXml(text)}</prosody></voice></speak>`
  const res = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': key!,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
      'User-Agent': 'LebanonThroughTime',
    },
    body: ssml,
  })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${await res.text()}`)
  return Buffer.from(await res.arrayBuffer())
}

function writeManifest() {
  const manifest: Record<string, string[]> = {}
  for (const lang of ['en', 'ar']) {
    const dir = join(OUT, lang)
    manifest[lang] = existsSync(dir)
      ? readdirSync(dir)
          .filter((f) => f.endsWith('.mp3'))
          .map((f) => f.slice(0, -4))
          .sort()
      : []
  }
  mkdirSync(OUT, { recursive: true })
  writeFileSync(join(OUT, 'manifest.json'), JSON.stringify(manifest))
  console.log(`manifest: ${manifest.en.length} English and ${manifest.ar.length} Arabic clips`)
}

async function main() {
  const todo = langs.flatMap((lang) =>
    clips.filter((c) => force || !existsSync(join(OUT, lang, `${c.key}.mp3`))).map((c) => ({ lang, key: c.key, text: c.text[lang] })),
  )
  const chars = todo.reduce((n, c) => n + c.text.length, 0)
  console.log(`${todo.length} clip(s) to record, ${chars} characters (${langs.join(', ')})`)
  if (dry || todo.length === 0) {
    writeManifest()
    return
  }
  if (!key || !region) {
    console.error('Set AZURE_SPEECH_KEY and AZURE_SPEECH_REGION (e.g. westeurope). Create a free Speech resource at https://portal.azure.com.')
    process.exit(1)
  }
  let done = 0
  try {
    for (const clip of todo) {
      const dir = join(OUT, clip.lang)
      mkdirSync(dir, { recursive: true })
      const audio = await synthesize(clip.text, clip.lang)
      writeFileSync(join(dir, `${clip.key}.mp3`), audio)
      done += 1
      console.log(`${done}/${todo.length}  ${clip.lang}/${clip.key}.mp3  (${Math.round(audio.length / 1024)} KB)`)
      await new Promise((r) => setTimeout(r, 150))
    }
  } finally {
    writeManifest()
  }
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
