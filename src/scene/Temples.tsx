import { useMemo } from 'react'
import * as THREE from 'three'
import { BACCHUS, JUPITER, phase } from '../data/templeLayout'
import { QUARRY_STONE } from '../data/content'
import { useStore } from '../state/store'

const STONE = '#cbb48a'
const STONE_DARK = '#a8916a'
const STONE_LIGHT = '#e2cda3'

/** A gable roof: a triangular prism along X, base at y = 0. */
function useRoofGeometry(length: number, width: number, height: number) {
  return useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-width / 2, 0)
    shape.lineTo(width / 2, 0)
    shape.lineTo(0, height)
    shape.closePath()
    const geo = new THREE.ExtrudeGeometry(shape, { depth: length, bevelEnabled: false })
    geo.translate(0, 0, -length / 2)
    geo.rotateY(Math.PI / 2)
    return geo
  }, [length, width, height])
}

/** Grows (or shrinks) a block upward from its base: scale 0 hides it entirely. */
function Block({
  size,
  position,
  scaleY = 1,
  color = STONE,
  rotation,
}: {
  size: [number, number, number]
  position: [number, number, number]
  scaleY?: number
  color?: string
  rotation?: [number, number, number]
}) {
  if (scaleY <= 0.001) return null
  const [w, h, d] = size
  return (
    <mesh
      position={[position[0], position[1] + (h * scaleY) / 2, position[2]]}
      scale={[1, scaleY, 1]}
      rotation={rotation}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[w, h, d]} />
      <meshStandardMaterial color={color} roughness={0.95} />
    </mesh>
  )
}

function TempleOfJupiter({ t }: { t: number }) {
  const { podium, center, longCount, shortCount, spacingX, spacingZ, columnHeight, entablatureHeight } = JUPITER
  const [cx, cz] = center
  const roofLen = (longCount - 1) * spacingX + 6
  const roofWidth = (shortCount - 1) * spacingZ + 6
  const roof = useRoofGeometry(roofLen, roofWidth, 8)
  const roofY = podium.height + columnHeight + entablatureHeight
  const roofScale = 1 - phase(t, 1.3, 1.75)
  const cella = 1 - phase(t, 1.45, 2.4)
  const westFace = cx - podium.length / 2

  return (
    <group>
      {/* Podium */}
      <Block size={[podium.length, podium.height, podium.width]} position={[cx, 0, cz]} color={STONE_DARK} />
      {/* Staircase on the east front */}
      {Array.from({ length: 7 }, (_, i) => (
        <Block key={i} size={[1.4, i + 1, 36]} position={[cx + podium.length / 2 + 7 - i * 1.4, 0, cz]} color={STONE} />
      ))}
      {/* The Trilithon: three colossal blocks in the west face of the podium */}
      {[-19.4, 0, 19.4].map((z) => (
        <Block key={z} size={[1.6, 4.2, 18.8]} position={[westFace - 0.6, 2.2, cz + z]} color="#ead7b0" />
      ))}
      {/* Inner sanctuary (cella) */}
      <Block size={[58, 18, 24]} position={[cx - 4, podium.height, cz]} scaleY={cella} color={STONE} />
      {roofScale > 0.001 && (
        <mesh geometry={roof} position={[cx, roofY, cz]} scale={[1, roofScale, 1]} castShadow receiveShadow>
          <meshStandardMaterial color="#b9744f" roughness={0.8} />
        </mesh>
      )}
    </group>
  )
}

function TempleOfBacchus({ t }: { t: number }) {
  const { podium, center, longCount, shortCount, spacingX, spacingZ, columnHeight, entablatureHeight } = BACCHUS
  const [cx, cz] = center
  const roof = useRoofGeometry((longCount - 1) * spacingX + 5, (shortCount - 1) * spacingZ + 5, 6)

  // Construction (t 0 -> 1), then the roof collapses and part of the walls erode.
  const podiumScale = phase(t, 0.02, 0.3)
  const cellaScale = phase(t, 0.3, 0.75) * (1 - 0.12 * phase(t, 1.8, 2.6))
  const roofScale = phase(t, 0.82, 0.98) * (1 - phase(t, 1.55, 2.0))

  return (
    <group>
      <Block size={[podium.length, podium.height, podium.width]} position={[cx, 0, cz]} scaleY={podiumScale} color={STONE_DARK} />
      {podiumScale >= 1 &&
        Array.from({ length: 5 }, (_, i) => (
          <Block key={i} size={[1.4, (i + 1) * 0.8, 18]} position={[cx + podium.length / 2 + 5.6 - i * 1.4, 0, cz]} color={STONE} />
        ))}
      <Block size={[44, 15, 19]} position={[cx - 2, podium.height, cz]} scaleY={cellaScale} color={STONE_LIGHT} />
      {/* Carved doorway on the east wall */}
      {cellaScale > 0.6 && <Block size={[0.6, 9, 6]} position={[cx + 20.1, podium.height, cz]} color="#5b4a35" />}
      {roofScale > 0.001 && (
        <mesh
          geometry={roof}
          position={[cx, podium.height + columnHeight + entablatureHeight, cz]}
          scale={[1, roofScale, 1]}
          castShadow
          receiveShadow
        >
          <meshStandardMaterial color="#b9744f" roughness={0.8} />
        </mesh>
      )}
    </group>
  )
}

/** The Great Court in front of the Temple of Jupiter, with its altar. */
function GreatCourt() {
  const x0 = JUPITER.center[0] + JUPITER.podium.length / 2 + 8
  return (
    <group>
      <Block size={[90, 1.2, 104]} position={[x0 + 45, 0, 0]} color="#bfa77d" />
      <Block size={[10, 6, 10]} position={[x0 + 40, 1.2, 0]} color={STONE} />
      <Block size={[6, 4, 6]} position={[x0 + 62, 1.2, -22]} color={STONE} />
      <Block size={[6, 4, 6]} position={[x0 + 62, 1.2, 22]} color={STONE} />
    </group>
  )
}

function QuarryStone() {
  const [x, , z] = QUARRY_STONE.position
  const [l, h, w] = QUARRY_STONE.size
  return (
    <group position={[x, 0, z]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]} receiveShadow>
        <circleGeometry args={[26, 40]} />
        <meshStandardMaterial color="#a08a66" roughness={1} />
      </mesh>
      <mesh position={[0, h / 2 - 0.6, 0]} rotation={[0.04, 0.5, 0.22]} castShadow receiveShadow>
        <boxGeometry args={[l, h, w]} />
        <meshStandardMaterial color={STONE_LIGHT} roughness={0.95} />
      </mesh>
    </group>
  )
}

export function Temples() {
  const t = useStore((s) => s.t)
  return (
    <group>
      <TempleOfJupiter t={t} />
      <TempleOfBacchus t={t} />
      <GreatCourt />
      <QuarryStone />
    </group>
  )
}
