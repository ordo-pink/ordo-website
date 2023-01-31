import {
  OrdoActivityExtension,
  OrdoCommandExtension,
  OrdoFileAssociationExtension,
  OrdoEditorPluginExtension,
  OrdoCommand,
  OrdoLoadableComponent,
} from "../../core/types"

export type AppState = {
  activityExtensions: OrdoActivityExtension<string>[]
  commandExtensions: OrdoCommandExtension<string>[]
  fileAssociationExtensions: OrdoFileAssociationExtension<string>[]
  editorPluginExtensions: OrdoEditorPluginExtension<string>[]
  commands: OrdoCommand<string>[]
  overlays: OrdoLoadableComponent[]
}

export type UpdatedFilePayload = {
  path: string
  content: string
}
