// Finds and downloads freely licensed photos from Wikimedia Commons.
//
//   node scripts/commons.mjs search "Sidon Sea Castle" [limit] [--preview <dir>]
//   node scripts/commons.mjs category "Sidon Sea Castle" [limit] [--preview <dir>]
//   node scripts/commons.mjs fetch "File:Example.jpg" <siteId> <slug>
//
// search/category list candidate files with their licence, size and author;
// --preview also downloads 320 px thumbnails into <dir>/<n>.jpg for viewing.
// fetch saves a 1280 px and a 480 px copy under public/photos/<siteId>/ and
// prints the Photo object to paste into the site's photo list.
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const API = 'https://commons.wikimedia.org/w/api.php'
const HEADERS = { 'User-Agent': 'LebanonThroughTime/1.0 (https://github.com/bilalseh/lebanon-through-time)' }
const META = 'Artist|LicenseShortName|LicenseUrl|ImageDescription|Assessments|DateTimeOriginal|Credit'
const ALLOWED = /^(cc0|cc[ -]by(?:[ -]sa)?(?:[ -]\d(?:\.\d)?)?|public domain|pd|no restrictions)/i

const strip = (html = '') =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()

async function api(params) {
  const url = `${API}?${new URLSearchParams({ format: 'json', formatversion: '2', ...params })}`
  const res = await fetch(url, { headers: HEADERS })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`)
  return res.json()
}

async function download(url, path) {
  const res = await fetch(url, { headers: HEADERS })
  if (!res.ok) throw new Error(`${res.status} downloading ${url}`)
  writeFileSync(path, Buffer.from(await res.arrayBuffer()))
}

function describe(page) {
  const info = page.imageinfo?.[0]
  const m = info?.extmetadata ?? {}
  const license = m.LicenseShortName?.value ?? '?'
  return {
    title: page.title,
    width: info?.width,
    height: info?.height,
    license,
    ok: ALLOWED.test(license) && !/nc|nd/i.test(license.replace(/^cc[ -]by[ -]sa/i, '')),
    author: strip(m.Artist?.value ?? ''),
    assessment: m.Assessments?.value ?? '',
    description: strip(m.ImageDescription?.value ?? '').slice(0, 140),
    thumb: info?.thumburl,
    page: info?.descriptionurl,
    licenseUrl: m.LicenseUrl?.value ?? '',
    date: m.DateTimeOriginal?.value ?? '',
  }
}

async function list(generatorParams, limit, previewDir) {
  const data = await api({
    action: 'query',
    prop: 'imageinfo',
    iiprop: 'url|size|extmetadata',
    iiurlwidth: '320',
    iiextmetadatafilter: META,
    ...generatorParams,
  })
  const pages = (data.query?.pages ?? []).filter((p) => /\.(jpe?g|png)$/i.test(p.title))
  const rows = pages.map(describe).filter((r) => r.width)
  // Featured and quality images first, then by resolution.
  rows.sort((a, b) => (b.assessment ? 1 : 0) - (a.assessment ? 1 : 0) || b.width * b.height - a.width * a.height)
  const shown = rows.slice(0, limit)
  if (previewDir) mkdirSync(previewDir, { recursive: true })
  for (const [i, r] of shown.entries()) {
    console.log(
      `${String(i + 1).padStart(2)}. ${r.title}\n    ${r.width}x${r.height}  ${r.ok ? 'OK ' : 'NO '}${r.license}  by ${r.author || '?'}${
        r.assessment ? `  [${r.assessment}]` : ''
      }${r.date ? `  ${r.date.slice(0, 10)}` : ''}\n    ${r.description}`,
    )
    if (previewDir && r.thumb) await download(r.thumb, join(previewDir, `${i + 1}.jpg`))
  }
  if (previewDir) console.log(`\npreviews saved to ${previewDir}`)
}

async function fetchPhoto(title, siteId, slug) {
  const name = title.startsWith('File:') ? title : `File:${title}`
  const get = async (width) => {
    const data = await api({
      action: 'query',
      titles: name,
      prop: 'imageinfo',
      iiprop: 'url|size|extmetadata',
      iiurlwidth: String(width),
      iiextmetadatafilter: META,
    })
    const page = data.query?.pages?.[0]
    if (!page || page.missing) throw new Error(`${name} not found`)
    return describe(page)
  }
  const large = await get(1280)
  const small = await get(480)
  if (!large.ok) throw new Error(`licence "${large.license}" is not free enough to reuse here`)

  const dir = join('public', 'photos', siteId)
  mkdirSync(dir, { recursive: true })
  await download(large.thumb, join(dir, `${slug}.jpg`))
  await download(small.thumb, join(dir, `${slug}-sm.jpg`))

  const photo = {
    src: `/photos/${siteId}/${slug}.jpg`,
    thumb: `/photos/${siteId}/${slug}-sm.jpg`,
    caption: { en: large.description, ar: '' },
    author: large.author || 'Unknown',
    license: large.license,
    licenseUrl: large.licenseUrl,
    source: large.page,
  }
  console.log(JSON.stringify(photo, null, 2))
}

const [cmd, arg, ...rest] = process.argv.slice(2)
const previewIndex = rest.indexOf('--preview')
const previewDir = previewIndex >= 0 ? rest[previewIndex + 1] : undefined
const limit = Number(rest.find((r) => /^\d+$/.test(r)) ?? 12)

try {
  if (cmd === 'search') {
    await list({ generator: 'search', gsrsearch: `${arg} filetype:bitmap`, gsrnamespace: '6', gsrlimit: '50' }, limit, previewDir)
  } else if (cmd === 'category') {
    const cat = arg.startsWith('Category:') ? arg : `Category:${arg}`
    await list({ generator: 'categorymembers', gcmtitle: cat, gcmtype: 'file', gcmlimit: '100' }, limit, previewDir)
  } else if (cmd === 'fetch') {
    await fetchPhoto(arg, rest[0], rest[1])
  } else {
    console.error('usage: commons.mjs search|category <text> [limit] [--preview <dir>] | fetch <File:Name> <siteId> <slug>')
    process.exit(1)
  }
} catch (err) {
  console.error(err.message)
  process.exit(1)
}
