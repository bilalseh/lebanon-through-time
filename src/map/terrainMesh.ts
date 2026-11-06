/**
 * Builds the relief map as plain typed arrays (no three.js), so it can be
 * tested and timed. One mesh holds land and sea: a land mask is rasterised
 * from the outlines, closed (to seal slivers between separately simplified
 * borders) and blurred (to smooth the coastline), and everything fades out
 * in a soft circle around Lebanon so the map has no visible edge.
 */
import { LEBANON, NEIGHBOURS, type Ring } from '../data/lebanon/outline'
import { MAP_BOUNDS, VERTICAL_EXAGGERATION, pointInRing, relief, unproject } from '../data/lebanon/terrain'

/** Grid spacing in km. */
export const CELL = 1.2
/** The soft circular edge of the map: centre, and where the fade starts and ends (km). */
export const VIGNETTE = { x: 0, z: 8, inner: 118, outer: 172 }

type RGB = [number, number, number]
/** three.js expects vertex colours in linear space, so hex (sRGB) values are converted. */
const toLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4))
const hex = (h: string): RGB => [1, 3, 5].map((i) => toLinear(parseInt(h.slice(i, i + 2), 16) / 255)) as RGB
const mix = (a: RGB, b: RGB, k: number): RGB => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k]
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const smoothstep = (e0: number, e1: number, v: number) => {
  const k = clamp01((v - e0) / (e1 - e0))
  return k * k * (3 - 2 * k)
}

const SEA = hex('#2a6d8f')
const VALLEY = hex('#a4bb62')
/** Neighbouring land is context only: muted and darker than Lebanon. */
const NEIGHBOUR_LOW = hex('#8a8875')
const NEIGHBOUR_HIGH = hex('#77735f')
/** Lebanon's colour ramp by elevation in km. */
const RAMP: Array<[number, RGB]> = [
  [0, hex('#86a65a')],
  [0.5, hex('#b9b06e')],
  [1.2, hex('#a88b63')],
  [2.0, hex('#bdb5a4')],
  [2.6, hex('#f3f1ec')],
]

function lebanonColor(elevation: number, valley: number): RGB {
  let i = 1
  while (i < RAMP.length - 1 && RAMP[i][0] < elevation) i++
  const [e0, c0] = RAMP[i - 1]
  const [e1, c1] = RAMP[i]
  const c = mix(c0, c1, clamp01((elevation - e0) / (e1 - e0)))
  // A blend, not a cut-off: a hard threshold would show the grid as steps along the valley edge.
  return mix(c, VALLEY, valley * 0.8 * (1 - smoothstep(1.0, 1.45, elevation)))
}

/** 1 near Lebanon, 0 at and beyond the map's soft edge. */
export function vignette(x: number, z: number): number {
  return 1 - smoothstep(VIGNETTE.inner, VIGNETTE.outer, Math.hypot(x - VIGNETTE.x, z - VIGNETTE.z))
}

interface BoxedRing {
  ring: Ring
  minLon: number
  maxLon: number
  minLat: number
  maxLat: number
}
const boxed = (rings: Ring[]): BoxedRing[] =>
  rings.map((ring) => ({
    ring,
    minLon: Math.min(...ring.map((p) => p[0])),
    maxLon: Math.max(...ring.map((p) => p[0])),
    minLat: Math.min(...ring.map((p) => p[1])),
    maxLat: Math.max(...ring.map((p) => p[1])),
  }))
const inside = (rings: BoxedRing[], lon: number, lat: number) =>
  rings.some((r) => lon >= r.minLon && lon <= r.maxLon && lat >= r.minLat && lat <= r.maxLat && pointInRing(lon, lat, r.ring))

/** Max (dilate) or min (erode) over a square window, separably. */
function morph(src: Float32Array, w: number, h: number, radius: number, pick: (a: number, b: number) => number): Float32Array {
  const tmp = new Float32Array(src.length)
  const out = new Float32Array(src.length)
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      let v = src[y * w + x]
      for (let k = -radius; k <= radius; k++) {
        const xx = Math.min(w - 1, Math.max(0, x + k))
        v = pick(v, src[y * w + xx])
      }
      tmp[y * w + x] = v
    }
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      let v = tmp[y * w + x]
      for (let k = -radius; k <= radius; k++) {
        const yy = Math.min(h - 1, Math.max(0, y + k))
        v = pick(v, tmp[yy * w + x])
      }
      out[y * w + x] = v
    }
  return out
}

/** Two passes of a 3x3 box blur: close to a small Gaussian. */
function blur(src: Float32Array, w: number, h: number): Float32Array {
  let a = src
  for (let pass = 0; pass < 2; pass++) {
    const out = new Float32Array(a.length)
    for (let y = 0; y < h; y++)
      for (let x = 0; x < w; x++) {
        let sum = 0
        for (let dy = -1; dy <= 1; dy++)
          for (let dx = -1; dx <= 1; dx++) {
            const xx = Math.min(w - 1, Math.max(0, x + dx))
            const yy = Math.min(h - 1, Math.max(0, y + dy))
            sum += a[yy * w + xx]
          }
        out[y * w + x] = sum / 9
      }
    a = out
  }
  return a
}

export interface TerrainArrays {
  positions: Float32Array
  /** RGBA, alpha carries the soft edge. */
  colors: Float32Array
  index: Uint32Array
  columns: number
  rows: number
}

export function buildTerrainArrays(cell = CELL): TerrainArrays {
  const { minX, maxX, minZ, maxZ } = MAP_BOUNDS
  const columns = Math.ceil((maxX - minX) / cell) + 1
  const rows = Math.ceil((maxZ - minZ) / cell) + 1
  const count = columns * rows
  const lebanon = boxed(LEBANON)
  const land = boxed([...LEBANON, ...NEIGHBOURS])

  const xs = new Float32Array(count)
  const zs = new Float32Array(count)
  const lebMask = new Float32Array(count)
  const landMask = new Float32Array(count)
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < columns; c++) {
      const i = r * columns + c
      const x = minX + (c / (columns - 1)) * (maxX - minX)
      const z = minZ + (r / (rows - 1)) * (maxZ - minZ)
      xs[i] = x
      zs[i] = z
      if (vignette(x, z) <= 0) continue
      const { lat, lon } = unproject(x, z)
      if (inside(lebanon, lon, lat)) {
        lebMask[i] = 1
        landMask[i] = 1
      } else if (inside(land, lon, lat)) {
        landMask[i] = 1
      }
    }
  // Seal the thin gaps between the separately simplified borders, then soften every edge.
  const closed = morph(morph(landMask, columns, rows, 2, Math.max), columns, rows, 2, Math.min)
  const landW = blur(closed, columns, rows)
  const lebW = blur(lebMask, columns, rows)

  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 4)
  for (let i = 0; i < count; i++) {
    const x = xs[i]
    const z = zs[i]
    const fade = vignette(x, z)
    let height = 0
    let color = SEA
    if (fade > 0 && landW[i] > 0.01) {
      const { lat, lon } = unproject(x, z)
      const { elevation, valley } = relief(lon, lat)
      const share = clamp01(lebW[i] / landW[i])
      // Neighbouring relief flattens away from Lebanon; Lebanon keeps its own.
      const flatten = 1 - smoothstep(95, 150, Math.hypot(x - VIGNETTE.x, z - VIGNETTE.z))
      const elev = elevation * (share + (1 - share) * flatten)
      const coast = smoothstep(0.25, 0.75, landW[i])
      height = coast * Math.max(0.06, elev * VERTICAL_EXAGGERATION)
      const neighbour = mix(NEIGHBOUR_LOW, NEIGHBOUR_HIGH, clamp01(elev / 2.5))
      const landColor = mix(neighbour, lebanonColor(elevation, valley), smoothstep(0.35, 0.65, share))
      color = mix(SEA, landColor, coast)
    }
    positions[i * 3] = x
    positions[i * 3 + 1] = height
    positions[i * 3 + 2] = z
    colors[i * 4] = color[0]
    colors[i * 4 + 1] = color[1]
    colors[i * 4 + 2] = color[2]
    colors[i * 4 + 3] = fade
  }

  // Only cells that are at least partly visible get triangles.
  const quads: number[] = []
  for (let r = 0; r < rows - 1; r++)
    for (let c = 0; c < columns - 1; c++) {
      const a = r * columns + c
      const b = a + 1
      const d = a + columns
      const e = d + 1
      if (colors[a * 4 + 3] + colors[b * 4 + 3] + colors[d * 4 + 3] + colors[e * 4 + 3] <= 0) continue
      quads.push(a, d, b, b, d, e)
    }
  return { positions, colors, index: Uint32Array.from(quads), columns, rows }
}
