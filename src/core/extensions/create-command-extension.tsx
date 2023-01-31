import { Slice } from "@reduxjs/toolkit"
import React from "react"
import Null from "../components/null"
import { OrdoCommandExtension, ThunkFn } from "../types"
import { createLoadable } from "./create-loadable"

type Props<Name extends string, State extends Record<string, unknown>> = Omit<
  OrdoCommandExtension<Name>,
  "name" | "storeSlice" | "overlayComponents"
> & {
  storeSlice?: Slice<State>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  overlayComponents: ThunkFn<Promise<any>>[]
}

export const createCommandExtension = <
  Name extends string,
  State extends Record<string, unknown>
>(
  name: Name,
  props: Props<Name, State>
): OrdoCommandExtension<Name, Record<`ordo-command-${Name}`, State>> => ({
  ...props,
  name: `ordo-command-${name}`,
  storeSlice:
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (props.storeSlice as any) ??
    (null as unknown as OrdoCommandExtension<Name>["storeSlice"]),
  overlayComponents: props.overlayComponents.map(component =>
    createLoadable(component, () => <Null />, 200)
  ),
})