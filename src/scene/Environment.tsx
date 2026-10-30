import { useMemo } from 'react'
import { Sky } from '@react-three/drei'
import { seeded } from '../data/templeLayout'

const SUN: [number, number, number] = [-170, 150, 120]

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

/** Cypress-like trees scattered around the site, kept clear of the temples. */
function Trees() {
  const trees = useMemo(() => {
    const rand = seeded(11)
    const list: Array<{ x: number; z: number; h: number }> = []
    while (list.length < 70) {
      const x = (rand() - 0.5) * 520
      const z = (rand() - 0.5) * 520
      const nearSite = x > -80 && x < 190 && z > -70 && z < 115
      const nearQuarry = Math.hypot(x + 150, z - 120) < 40
      if (!nearSite && !nearQuarry) list.push({ x, z, h: 7 + rand() * 7 })
    }
    return list
  }, [])

  return (
    <group>
      {trees.map((tree, i) => (
        <group key={i} position={[tree.x, 0, tree.z]}>
          <mesh position={[0, tree.h / 2 + 1, 0]} castShadow>
            <coneGeometry args={[1.6, tree.h, 7]} />
            <meshStandardMaterial color="#4f6136" roughness={1} flatShading />
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

export function Environment() {
  return (
    <>
      <Sky sunPosition={SUN} turbidity={6} rayleigh={1.4} mieCoefficient={0.004} mieDirectionalG={0.85} />
      <fog attach="fog" args={['#d8d2c4', 320, 1300]} />
      <hemisphereLight args={['#fff4e0', '#8a7354', 0.85]} />
      <directionalLight
        position={SUN}
        intensity={2.4}
        color="#fff1d6"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-190}
        shadow-camera-right={190}
        shadow-camera-top={190}
        shadow-camera-bottom={-190}
        shadow-camera-near={10}
        shadow-camera-far={600}
        shadow-bias={-0.0004}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[4000, 4000]} />
        <meshStandardMaterial color="#b6a079" roughness={1} />
      </mesh>
      <Mountains />
      <Trees />
    </>
  )
}
