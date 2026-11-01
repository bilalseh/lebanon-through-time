/**
 * Records the narration clips with Microsoft neural voices (British English
 * and Lebanese Arabic, which browsers usually lack). Output goes to
 * public/audio/<lang>/<key>.mp3 plus public/audio/manifest.json; the app plays
 * a clip whenever one exists and falls back to the browser voice otherwise.
 *
 *   npm run narration                       # free: Edge's read-aloud voices, no account
 *   npm run narration -- --provider azure   # the same voices through Azure Speech
 *                                           # (AZURE_SPEECH_KEY, AZURE_SPEECH_REGION)
 *
 * Options: --lang en|ar (one language), --dry (count and estimate, no calls),
 * --force (re-record clips that already exist).
 *
 * The Edge provider talks to the service Microsoft Edge uses for "read aloud";
 * it is unofficial, so it suits a one-off recording rather than a live dependency.
 */
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts'
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
const RATE = '-5%'
const OUT = join('public', 'audio')

const args = process.argv.slice(2)
const option = (name: string) => (args.indexOf(name) >= 0 ? args[args.indexOf(name) + 1] : undefined)
const langs: Lang[] = option('--lang') ? [option('--lang') as Lang] : ['en', 'ar']
const provider = option('--provider') ?? 'edge'
const dry = args.includes('--dry')
const force = args.includes('--force')

const clips = allClips([
  { id: 'baalbek', eras: BAALBEK },
  { id: 'sidon-sea-castle', eras: SIDON },
  { id: 'anjar', eras: ANJAR },
  { id: 'tyre', eras: TYRE },
  { id: 'cedars-of-god', eras: CEDARS },
])

const escapeXml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/* Azure Speech REST API */
async function synthesizeAzure(text: string, lang: Lang): Promise<Buffer> {
  const key = process.env.AZURE_SPEECH_KEY
  const region = process.env.AZURE_SPEECH_REGION
  if (!key || !region) throw new Error('Set AZURE_SPEECH_KEY and AZURE_SPEECH_REGION (e.g. westeurope), or use the free Edge provider.')
  const voice = VOICES[lang]
  const ssml =
    `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${voice.locale}">` +
    `<voice name="${voice.name}"><prosody rate="${RATE}">${escapeXml(text)}</prosody></voice></speak>`
  const res = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': key,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
      'User-Agent': 'LebanonThroughTime',
    },
    body: ssml,
  })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${await res.text()}`)
  return Buffer.from(await res.arrayBuffer())
}

/* Edge read-aloud service, one connection per language */
const edge = new Map<Lang, MsEdgeTTS>()
async function synthesizeEdge(text: string, lang: Lang): Promise<Buffer> {
  let tts = edge.get(lang)
  if (!tts) {
    tts = new MsEdgeTTS()
    await tts.setMetadata(VOICES[lang].name, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3)
    edge.set(lang, tts)
  }
  const { audioStream } = tts.toStream(text, { rate: RATE })
  const chunks: Buffer[] = []
  for await (const chunk of audioStream) chunks.push(chunk as Buffer)
  const audio = Buffer.concat(chunks)
  if (audio.length < 1000) throw new Error('empty audio returned')
  return audio
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
  console.log(`${todo.length} clip(s) to record with ${provider}, ${chars} characters (${langs.join(', ')})`)
  if (dry || todo.length === 0) {
    writeManifest()
    return
  }
  const synthesize = provider === 'azure' ? synthesizeAzure : synthesizeEdge
  let done = 0
  let failed = 0
  try {
    for (const clip of todo) {
      const dir = join(OUT, clip.lang)
      mkdirSync(dir, { recursive: true })
      try {
        const audio = await synthesize(clip.text, clip.lang)
        writeFileSync(join(dir, `${clip.key}.mp3`), audio)
        done += 1
        console.log(`${done}/${todo.length}  ${clip.lang}/${clip.key}.mp3  (${Math.round(audio.length / 1024)} KB)`)
      } catch (err) {
        failed += 1
        console.error(`failed ${clip.lang}/${clip.key}: ${(err as Error).message}`)
        // A fresh connection for the next clip.
        edge.get(clip.lang)?.close()
        edge.delete(clip.lang)
      }
      await new Promise((r) => setTimeout(r, 200))
    }
  } finally {
    for (const tts of edge.values()) tts.close()
    writeManifest()
    if (failed) console.error(`${failed} clip(s) failed; run again to retry the missing ones.`)
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err.message)
    process.exit(1)
  })
