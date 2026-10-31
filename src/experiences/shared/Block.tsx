/** Grows (or shrinks) a box upward from its base: scaleY 0 hides it entirely. */
export function Block({
  size,
  position,
  scaleY = 1,
  color = '#cbb48a',
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
