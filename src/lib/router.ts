/** URL <-> view mapping. Pure, so it can be unit tested. */
export type View = { kind: 'map' } | { kind: 'site'; id: string } | { kind: 'experience'; id: string }

const SITE = /^\/sites\/([a-z0-9-]+)\/?$/
const EXPERIENCE = /^\/sites\/([a-z0-9-]+)\/3d\/?$/

export function parsePath(pathname: string): View {
  const experience = pathname.match(EXPERIENCE)
  if (experience) return { kind: 'experience', id: experience[1] }
  const site = pathname.match(SITE)
  if (site) return { kind: 'site', id: site[1] }
  return { kind: 'map' }
}

export function pathFor(view: View): string {
  switch (view.kind) {
    case 'map':
      return '/'
    case 'site':
      return `/sites/${view.id}`
    case 'experience':
      return `/sites/${view.id}/3d`
  }
}

export function sameView(a: View, b: View): boolean {
  return pathFor(a) === pathFor(b)
}
