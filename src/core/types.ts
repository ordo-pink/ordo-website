import { EditorPlugin } from "@draft-js-plugins/editor"
import type { Slice } from "@reduxjs/toolkit"
import type { ContentBlock } from "draft-js"
import type { TFunction } from "i18next"
import type Loadable from "react-loadable"
import { Language } from "./constants/language"
import { OrdoExtensionType } from "./constants/ordo-extension-type"
import { router } from "./router"
import { useAppDispatch } from "./state/hooks/use-app-dispatch"
import { RootState } from "./state/types"

export type Nullable<T> = T | null

export type Optional<T> = T | undefined

export type ThunkFn<Result> = () => Result
export type UnaryFn<Arg, Result> = (arg: Arg) => Result
export type BinaryFn<Arg1, Arg2, Result> = (arg1: Arg1, arg2: Arg2) => Result
export type TernaryFn<Arg1, Arg2, Arg3, Result> = (
  arg1: Arg1,
  arg2: Arg2,
  arg3: Arg3
) => Result

export type Unpack<T> = T extends Array<infer U> ? U : T

export type OrdoLoadableComponent = ReturnType<typeof Loadable>

export type FileExtension = `.${string}`

export type FileAssociation = Record<OrdoExtensionName, FileExtension[]>

export type AccessLevel = {
  read: boolean
  write: boolean
  erase: boolean
}

export type ActionContext<
  T extends OrdoExtension<string, OrdoExtensionType> = OrdoExtension<
    string,
    OrdoExtensionType
  >
> = {
  state: RootState<
    T extends OrdoExtension<string, OrdoExtensionType, infer U>
      ? U
      : Record<string, unknown>
  >
  // TODO: Replace with `target` and add a boolean for whether it is `isContextMenuCall`
  contextMenuTarget: Nullable<OrdoFile | OrdoDirectory>
  dispatch: ReturnType<typeof useAppDispatch>
  env: typeof window["ordo"]["env"]
  navigate: typeof router.navigate
  translate: TFunction<"translation", undefined>
}

export type IsmParserRule = {
  validate: UnaryFn<ContentBlock, boolean>
}

export type ExtensionState<T extends OrdoExtension<string, OrdoExtensionType>> =
  Record<
    T["name"],
    T extends OrdoExtension<string, OrdoExtensionType, infer U> ? U : null
  >

export type OrdoCommand<ExtensionName extends string> = {
  Icon: OrdoLoadableComponent
  accelerator?: string
  title: `@${ExtensionName}/${string}`
  action: UnaryFn<ActionContext, void | PromiseLike<void>>
  showInContextMenu?: boolean | UnaryFn<OrdoFile | OrdoDirectory, boolean>
  showInCommandPalette?: boolean | UnaryFn<ActionContext, boolean>
}

export type OrdoExtensionName<
  Name extends string = "",
  ExtensionType extends OrdoExtensionType = OrdoExtensionType
> = `ordo-${ExtensionType}-${Name}`

export type TranslationsRecord<Name extends string> = {
  [Key in Language]?: Record<`@${Name}/${string}`, string>
}

// TODO: Restrict things, provide them via env
// TODO: Put patched fetch here
// @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Feature_Policy
// @see https://w3c.github.io/webappsec-permissions-policy/#permissions-policy-http-header-field
export type OrdoExtensionPermissions = Partial<{
  http: string[]
  clipboard: AccessLevel
  localStorage: Record<string, AccessLevel>
  cookies: Record<string, AccessLevel>
  filesystem: Record<string, AccessLevel>
  readSession: boolean
  indexDB: Record<string, AccessLevel>
}>

export interface OrdoExtension<
  Name extends string,
  ExtensionType extends OrdoExtensionType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TState extends Record<string, any> = Record<string, any>
> {
  name: OrdoExtensionName<Name, ExtensionType>
  translations?: TranslationsRecord<OrdoExtensionName<Name, ExtensionType>>
  readableName?: string
  overlayComponents?: OrdoLoadableComponent[]
  description?: string
  storeSlice?: Slice<TState>
  commands?: OrdoCommand<Name>[]
}

export interface OrdoCommandExtension<
  Name extends string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TState extends Record<string, any> = Record<string, any>
> extends OrdoExtension<Name, OrdoExtensionType.COMMAND, TState> {
  commands: OrdoCommand<Name>[]
}

export interface OrdoEditorPluginExtension<
  Name extends string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TState extends Record<string, any> = Record<string, any>
> extends OrdoExtension<Name, OrdoExtensionType.EDITOR_PLUGIN, TState> {
  plugins: EditorPlugin[]
}

export interface OrdoFileAssociationExtension<
  Name extends string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TState extends Record<string, any> = Record<string, any>
> extends OrdoExtension<Name, OrdoExtensionType.FILE_ASSOCIATION, TState> {
  fileExtensions: FileExtension[]
  Icon?: OrdoLoadableComponent
  Component: OrdoLoadableComponent
}

export interface OrdoActivityExtension<
  Name extends string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TState extends Record<string, any> = Record<string, any>
> extends OrdoExtension<Name, OrdoExtensionType.ACTIVITY, TState> {
  routes: string[]
  accelerator?: string
  Icon: OrdoLoadableComponent
  Component: OrdoLoadableComponent
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OrdoFile<
  Metadata extends Record<string, any> = Record<string, any>
> = {
  path: string
  readableName: string
  extension: FileExtension
  createdAt: Date
  updatedAt: Date
  accessedAt: Date
  depth: number
  size: number
  metadata: Metadata
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OrdoDirectory<
  Metadata extends Record<string, any> = Record<string, any>
> = {
  path: string
  readableName: string
  createdAt: Date
  updatedAt: Date
  accessedAt: Date
  depth: number
  children: Array<OrdoFile | OrdoDirectory>
  metadata: Metadata
}

export type WorkerMessageData<T = unknown> = {
  event: string
  payload: T
}