import { useMemo } from 'react'
import { seeded } from '../../lib/seeded'

export interface TreesProps {
  count: number
  /** Trees are scattered across this [width, depth] area around `center`. */
  area: [number, number]
  center?: [number, number]
  /** Return true to keep a spot clear (buildings, water, roads). */
  exclude?: (x: number, z: number) => boolean
  seed?: number
  height?: [number, number]
  color?: string
}

/** Cypress-like cone trees scattered deterministically, kept clear of excluded spots. */
export function Trees({
  count,
  area,
  center = [0, 0],
  exclude,
  seed = 11,
  height = [7, 14],
  color = '#4f6136',
}: TreesProps) {
  const trees = useMemo(() => {
    const rand = seeded(seed)
    const list: Array<{ x: number; z: number; h: number }> = []
    let attempts = 0
    while (list.length < count && attempts++ < count * 20) {
      const x = center[0] + (rand() - 0.5) * area[0]
      const z = center[1] + (rand() - 0.5) * area[1]
      if (!exclude?.(x, z)) list.push({ x, z, h: height[0] + rand() * (height[1] - height[0]) })
    }
    return list
  }, [count, area, center, exclude, seed, height])

  return (
    <group>
      {trees.map((tree, i) => (
        <group key={i} position={[tree.x, 0, tree.z]}>
          <mesh position={[0, tree.h / 2 + 1, 0]} castShadow>
            <coneGeometry args={[tree.h * 0.2, tree.h, 7]} />
            <meshStandardMaterial color={color} roughness={1} flatShading />
          </mesh>
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.3, 0.35, 1.2, 6]} />
            <meshStandardMaterial color="#5c4630" />
          </mesh>
        </group>
      ))}
    </group>
  )
}
