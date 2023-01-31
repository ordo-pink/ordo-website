import { createCommandExtension } from "../../core/extensions/create-command-extension"
import { slice } from "./store"
import openCommandPalette from "./commands/open-command-palette"

export default createCommandExtension("command-palette", {
  commands: [openCommandPalette],
  overlayComponents: [() => import("./components/modal")],
  translations: {
    ru: {
      "@ordo-command-command-palette/readable-name": "Панель команд",
      "@ordo-command-command-palette/show-command-palette":
        "Показать панель команд",
      "@ordo-command-command-palette/placeholder": "Быстрый поиск",
      "@ordo-command-command-palette/description": "TODO",
    },
    en: {
      "@ordo-command-command-palette/readable-name": "Command Palette",
      "@ordo-command-command-palette/show-command-palette":
        "Show command palette",
      "@ordo-command-command-palette/placeholder": "Quick search",
      "@ordo-command-command-palette/description": "TODO",
    },
  },
  readableName: "@ordo-command-command-palette/readable-name",
  storeSlice: slice,
  description: "@ordo-command-command-palette/description",
})
