import { Html } from '@react-three/drei'
import type { ComponentProps, RefObject } from 'react'

export type OverlayRef = RefObject<HTMLDivElement | null>
type Props = Omit<ComponentProps<typeof Html>, 'portal'> & { portal: OverlayRef }

/**
 * drei's Html picks its DOM container from the element R3F connects events to,
 * which happens a moment after mount; every overlay is then re-parented and the
 * first one gets lost on the way. Rendering into a fixed element beside the
 * canvas (see `.overlay`) avoids that.
 */
export function OverlayHtml({ portal, ...props }: Props) {
  return <Html portal={portal as unknown as RefObject<HTMLElement>} {...props} />
}
