/**
 * A stylised relief model of Lebanon for the 3D map. Pure and framework-free.
 *
 * Scene units are kilometres: x grows east, z grows south (north is -z),
 * y is elevation times VERTICAL_EXAGGERATION. The elevation is not survey
 * data: it is two mountain ranges, the Bekaa valley between them and Mount
 * Hermon, shaped by hand so the map reads like a relief model.
 */
import { LEBANON, MAP_BBOX, NEIGHBOURS, type Ring } from './outline'

export const CENTER = { lat: 33.95, lon: 35.85 }
export const VERTICAL_EXAGGERATION = 3
/** Elevation assigned to sea-floor vertices so the sea plane covers them. */
export const SEA_FLOOR = -0.4

const KM_PER_DEG_LAT = 110.57
const KM_PER_DEG_LON = 111.32 * Math.cos((CENTER.lat * Math.PI) / 180)

/** Scene [x, z] for a latitude/longitude. */
export function project(lat: number, lon: number): [number, number] {
  return [(lon - CENTER.lon) * KM_PER_DEG_LON, -(lat - CENTER.lat) * KM_PER_DEG_LAT]
}

export function unproject(x: number, z: number): { lat: number; lon: number } {
  return { lat: CENTER.lat - z / KM_PER_DEG_LAT, lon: CENTER.lon + x / KM_PER_DEG_LON }
}

export function pointInRing(lon: number, lat: number, ring: Ring): boolean {
  let inside = false
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i]
    const [xj, yj] = ring[j]
    const crosses = yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi
    if (crosses) inside = !inside
  }
  return inside
}

export function insideLebanon(lon: number, lat: number): boolean {
  return LEBANON.some((r) => pointInRing(lon, lat, r))
}

export function insideNeighbours(lon: number, lat: number): boolean {
  return NEIGHBOURS.some((r) => pointInRing(lon, lat, r))
}

/** [lon, lat, crest height in km] along a mountain crest, north to south. */
type Crest = Array<[number, number, number]>

const MOUNT_LEBANON: Crest = [
  [36.32, 34.62, 1.3],
  [36.2, 34.46, 1.9],
  [36.11, 34.3, 3.0],
  [36.0, 34.15, 2.6],
  [35.9, 34.0, 2.6],
  [35.86, 33.93, 2.5],
  [35.8, 33.8, 2.1],
  [35.72, 33.68, 1.9],
  [35.62, 33.52, 1.8],
  [35.55, 33.38, 1.2],
  [35.5, 33.22, 0.7],
]

const ANTI_LEBANON: Crest = [
  [36.55, 34.35, 1.3],
  [36.58, 34.12, 1.9],
  [36.5, 33.92, 2.4],
  [36.4, 33.72, 2.2],
  [36.25, 33.55, 1.8],
  [36.05, 33.45, 2.0],
  [35.87, 33.42, 2.8],
  [35.78, 33.3, 1.6],
]

interface CrestSample {
  /** Signed distance in km, positive east of the crest. */
  distance: number
  height: number
}

/** Distance from a point to a crest polyline, with the crest height interpolated at the nearest spot. */
function nearestOnCrest(x: number, z: number, crest: Crest): CrestSample {
  let best: CrestSample = { distance: Infinity, height: 0 }
  for (let i = 1; i < crest.length; i++) {
    const [ax, az] = project(crest[i - 1][1], crest[i - 1][0])
    const [bx, bz] = project(crest[i][1], crest[i][0])
    const dx = bx - ax
    const dz = bz - az
    const len2 = dx * dx + dz * dz
    const k = Math.min(1, Math.max(0, ((x - ax) * dx + (z - az) * dz) / len2))
    const px = ax + k * dx
    const pz = az + k * dz
    const d = Math.hypot(x - px, z - pz)
    if (d < Math.abs(best.distance)) {
      // Side of the crest: sign of the cross product with the crest direction (which runs south).
      const side = (x - px) * dz - (z - pz) * dx > 0 ? 1 : -1
      best = { distance: side * d, height: crest[i - 1][2] + k * (crest[i][2] - crest[i - 1][2]) }
    }
  }
  return best
}

const smoothstep = (edge0: number, edge1: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

export interface Relief {
  /** Elevation in km (before exaggeration). */
  elevation: number
  /** 1 on the Bekaa valley floor, 0 elsewhere; used to tint farmland. */
  valley: number
}

/** Stylised elevation of a point on land. */
export function relief(lon: number, lat: number): Relief {
  const [x, z] = project(lat, lon)
  const ml = nearestOnCrest(x, z, MOUNT_LEBANON)
  const al = nearestOnCrest(x, z, ANTI_LEBANON)

  const ridgeA = ml.height * Math.exp(-((ml.distance / 13) ** 2))
  const ridgeB = al.height * Math.exp(-((al.distance / 11) ** 2))
  // The high inland plateau: the Bekaa floor and the land beyond the eastern range.
  const plateau = 0.9 * smoothstep(4, 16, ml.distance)
  const valley = smoothstep(6, 14, ml.distance) * (1 - smoothstep(-14, -6, al.distance))
  // Gentle texture so slopes are not perfectly smooth.
  const texture = 0.06 * (Math.sin(x * 0.9 + z * 0.4) + Math.cos(z * 1.1 - x * 0.3))

  const elevation = Math.max(0.02, plateau + Math.max(ridgeA, ridgeB) + texture)
  return { elevation, valley }
}

export type Land = 'lebanon' | 'neighbour' | 'sea'

export function landAt(lon: number, lat: number): Land {
  if (insideLebanon(lon, lat)) return 'lebanon'
  if (insideNeighbours(lon, lat)) return 'neighbour'
  // The simplified outlines do not share edges, leaving slivers along the land
  // border that would otherwise read as sea; treat anything that close as land.
  const d = 0.025
  for (const [dLon, dLat] of [[d, 0], [-d, 0], [0, d], [0, -d]] as const) {
    if (insideNeighbours(lon + dLon, lat + dLat)) return 'neighbour'
  }
  return 'sea'
}

/** Scene height (already exaggerated) for a point; sea points sit below the sea plane. */
export function heightAt(lat: number, lon: number): number {
  const land = landAt(lon, lat)
  if (land === 'sea') return SEA_FLOOR * VERTICAL_EXAGGERATION
  return relief(lon, lat).elevation * VERTICAL_EXAGGERATION
}

const LEBANON_XZ: Array<Array<[number, number]>> = LEBANON.map((ring) => ring.map(([lon, lat]) => project(lat, lon)))

/** Distance in km from a scene point to the nearest point of Lebanon's border. */
export function distanceToLebanonKm(x: number, z: number): number {
  let best = Infinity
  for (const ring of LEBANON_XZ) {
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [ax, az] = ring[j]
      const [bx, bz] = ring[i]
      const dx = bx - ax
      const dz = bz - az
      const len2 = dx * dx + dz * dz
      const k = len2 === 0 ? 0 : Math.min(1, Math.max(0, ((x - ax) * dx + (z - az) * dz) / len2))
      const d = Math.hypot(x - (ax + k * dx), z - (az + k * dz))
      if (d < best) best = d
    }
  }
  return best
}

/** Scene bounds of the map area. */
export const MAP_BOUNDS = (() => {
  const [minX, maxZ] = project(MAP_BBOX.minLat, MAP_BBOX.minLon)
  const [maxX, minZ] = project(MAP_BBOX.maxLat, MAP_BBOX.maxLon)
  return { minX, maxX, minZ, maxZ }
})()
