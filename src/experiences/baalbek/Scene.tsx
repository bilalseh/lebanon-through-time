import { Columns } from './Columns'
import { Environment } from './Environment'
import { Temples } from './Temples'

/** The Baalbek temple complex; reads the timeline value from the store. */
export function Scene() {
  return (
    <>
      <Environment />
      <Temples />
      <Columns />
    </>
  )
}
