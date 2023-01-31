import { Slice } from "@reduxjs/toolkit"
import React from "react"
import { BsLock } from "react-icons/bs"
import { OrdoActivityExtension } from "../types"
import { createLoadable } from "./create-loadable"

type Props<Name extends string, State extends Record<string, unknown>> = Omit<
  OrdoActivityExtension<Name>,
  "Component" | "Icon" | "name" | "storeSlice"
> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: () => Promise<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: () => Promise<any>
  storeSlice?: Slice<State>
}

export const createActivityExtension = <
  Name extends string,
  State extends Record<string, unknown>
>(
  name: Name,
  props: Props<Name, State>
): OrdoActivityExtension<Name, Record<`ordo-activity-${Name}`, State>> => ({
  ...props,
  name: `ordo-activity-${name}`,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: createLoadable(props.Component, () => null as any),
  Icon: createLoadable(props.Icon, () => <BsLock />, 200),
  routes: props.routes.map(route =>
    route.startsWith("/") ? route.slice(1) : route
  ),
  storeSlice:
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (props.storeSlice as any) ??
    (null as unknown as OrdoActivityExtension<Name>["storeSlice"]),
})
