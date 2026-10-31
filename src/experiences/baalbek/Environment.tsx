import { useMemo } from 'react'
import { seeded } from '../../lib/seeded'
import { Atmosphere } from '../shared/Atmosphere'
import { Trees } from '../shared/Trees'

/** Low-poly mountain ranges on the horizon (the Beqaa valley sits between two ranges). */
function Mountains() {
  const peaks = useMemo(() => {
    const rand = seeded(7)
    return Array.from({ length: 34 }, (_, i) => {
      // Two ranges, east and west of the valley.
      const west = i % 2 === 0
      const along = (rand() - 0.5) * 1700
      const across = (west ? -1 : 1) * (520 + rand() * 260)
      return {
        position: [across, 0, along] as [number, number, number],
        radius: 110 + rand() * 160,
        height: 70 + rand() * 130,
        rotation: rand() * Math.PI,
      }
    })
  }, [])

  return (
    <group>
      {peaks.map((p, i) => (
        <mesh key={i} position={[p.position[0], p.height / 2 - 2, p.position[2]]} rotation={[0, p.rotation, 0]}>
          <coneGeometry args={[p.radius, p.height, 6, 1]} />
          <meshStandardMaterial color={i % 3 === 0 ? '#9a8a72' : '#8b7d68'} roughness={1} flatShading />
        </mesh>
      ))}
    </group>
  )
}

const keepClear = (x: number, z: number) => {
  const nearSite = x > -80 && x < 190 && z > -70 && z < 115
  const nearQuarry = Math.hypot(x + 150, z - 120) < 40
  return nearSite || nearQuarry
}

export function Environment() {
  return (
    <Atmosphere>
      <Mountains />
      <Trees count={70} area={[520, 520]} exclude={keepClear} />
    </Atmosphere>
  )
}
