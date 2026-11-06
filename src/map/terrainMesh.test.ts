import { describe, expect, it } from 'vitest'
import { project } from '../data/lebanon/terrain'
import { VIGNETTE, buildTerrainArrays, vignette } from './terrainMesh'

const mesh = buildTerrainArrays()

/** The grid vertex nearest to a latitude/longitude. */
function vertexAt(lat: number, lon: number) {
  const [x, z] = project(lat, lon)
  let best = 0
  let bestD = Infinity
  for (let i = 0; i < mesh.positions.length / 3; i++) {
    const d = Math.hypot(mesh.positions[i * 3] - x, mesh.positions[i * 3 + 2] - z)
    if (d < bestD) {
      bestD = d
      best = i
    }
  }
  return {
    height: mesh.positions[best * 3 + 1],
    alpha: mesh.colors[best * 4 + 3],
    rgb: [mesh.colors[best * 4], mesh.colors[best * 4 + 1], mesh.colors[best * 4 + 2]],
  }
}

describe('terrain mesh', () => {
  it('fades to nothing before the edge of the grid, so the map has no hard border', () => {
    expect(vignette(VIGNETTE.x, VIGNETTE.z)).toBe(1)
    expect(vignette(VIGNETTE.x + VIGNETTE.outer + 1, VIGNETTE.z)).toBe(0)
    const { columns, rows, colors } = mesh
    for (let c = 0; c < columns; c++) {
      expect(colors[c * 4 + 3]).toBe(0)
      expect(colors[((rows - 1) * columns + c) * 4 + 3]).toBe(0)
    }
    for (let r = 0; r < rows; r++) {
      expect(colors[r * columns * 4 + 3]).toBe(0)
      expect(colors[(r * columns + columns - 1) * 4 + 3]).toBe(0)
    }
  })

  it('keeps Lebanon fully opaque', () => {
    for (const [lat, lon] of [
      [34.69, 36.3], // north, near Akkar
      [33.27, 35.2], // Tyre
      [34.0, 36.2], // Baalbek
    ]) {
      expect(vertexAt(lat, lon).alpha).toBe(1)
    }
  })

  it('raises Mount Lebanon and keeps the sea flat', () => {
    expect(vertexAt(34.3, 36.11).height).toBeGreaterThan(7)
    expect(vertexAt(33.9, 35.2).height).toBe(0)
  })

  it('has no sea gap along the land border with Syria', () => {
    // Points just on either side of the eastern border in the Bekaa / Anti-Lebanon.
    for (const [lat, lon] of [
      [34.35, 36.55],
      [33.75, 36.08],
    ]) {
      expect(vertexAt(lat, lon).height).toBeGreaterThan(1)
    }
  })

  it('only draws cells that are at least partly visible', () => {
    const fullGrid = (mesh.columns - 1) * (mesh.rows - 1) * 6
    expect(mesh.index.length).toBeGreaterThan(0)
    expect(mesh.index.length).toBeLessThan(fullGrid)
  })
})
