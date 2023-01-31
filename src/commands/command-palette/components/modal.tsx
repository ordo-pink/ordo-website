import { Switch } from "@ordo-pink/switch"
import Fuse from "fuse.js"
import React from "react"
import {
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
} from "react"
import { useTranslation } from "react-i18next"
import { useModal } from "../../../containers/app/hooks/use-modal"
import Null from "../../../core/components/null"
import { useActionContext } from "../../../core/hooks/use-action-context"
import { useAppDispatch } from "../../../core/state/hooks/use-app-dispatch"
import { useAppSelector } from "../../../core/state/hooks/use-app-selector"
import { useExtensionSelector } from "../../../core/state/hooks/use-extension-selector"
import { OrdoCommand } from "../../../core/types"
import { Either } from "../../../core/utils/either"
import { preventDefault, stopPropagation } from "../../../core/utils/event"
import { lazyBox } from "../../../core/utils/lazy-box"
import { noOp } from "../../../core/utils/no-op"

import "../index.css"
import { hideCommandPalette } from "../store"
import { SearchableCommand, CommandPaletteExtensionStore } from "../types"
import CommandPaletteItem from "./palette-item"

const fuse = new Fuse([] as SearchableCommand[], { keys: ["title"] })

export default function CommandPalette() {
  const dispatch = useAppDispatch()

  const commandPaletteSelector =
    useExtensionSelector<CommandPaletteExtensionStore>()

  const commands = useAppSelector(state => state.app.commands)

  const isShown = commandPaletteSelector(
    state => state["ordo-command-command-palette"].isShown
  )

  const actionContext = useActionContext()

  const { showModal, hideModal, Modal } = useModal()

  const { t } = useTranslation()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const [visibleCommands, setVisibleCommands] = useState(
    commands.filter(command =>
      typeof command.showInCommandPalette === "function"
        ? command.showInCommandPalette(actionContext)
        : command.showInCommandPalette
    )
  )

  useEffect(() => {
    const searchableCommands: SearchableCommand[] = commands
      .filter(command =>
        typeof command.showInCommandPalette === "function"
          ? command.showInCommandPalette(actionContext)
          : command.showInCommandPalette
      )
      .map(command => ({
        ...command,
        title: t(command.title),
      }))

    fuse.setCollection(searchableCommands)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commands])

  useEffect(() => {
    if (inputValue === "") {
      const searchableCommands: SearchableCommand[] = commands
        .filter(command =>
          typeof command.showInCommandPalette === "function"
            ? command.showInCommandPalette(actionContext)
            : command.showInCommandPalette
        )
        .map(command => ({
          ...command,
          title: t(command.title),
        }))

      return void setVisibleCommands(searchableCommands)
    }

    const fusedCommands = fuse.search(inputValue)

    setVisibleCommands(fusedCommands.map(({ item }) => item))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, commands])

  useEffect(() => {
    if (!isShown) showModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShown])

  const handleEnter = lazyBox<KeyboardEvent<HTMLInputElement>>(box =>
    box
      .tap(preventDefault)
      .tap(stopPropagation)
      .map(() => visibleCommands[currentIndex])
      .map(maybeCommand =>
        Either.fromNullable(maybeCommand)
          .map(command => command.action)
          .fold(noOp, action => action(actionContext))
      )
      .fold(hideModal)
  )

  const handleArrowUp = lazyBox(box =>
    box
      .map(() => currentIndex === 0)
      // If it is the first item in the list, skip to the last item.
      .map(isFirstItem =>
        Either.fromBoolean(isFirstItem).fold(
          () => currentIndex - 1,
          () => visibleCommands.length - 1
        )
      )
      .fold(setCurrentIndex)
  )

  const handleArrowDown = lazyBox(box =>
    box
      .map(() => currentIndex === visibleCommands.length - 1)
      // If it is the last item in the list, skip to the first item.
      .map(isLastItem =>
        Either.fromBoolean(isLastItem).fold(
          () => currentIndex + 1,
          () => 0
        )
      )
      .fold(setCurrentIndex)
  )

  const handleClick = lazyBox<OrdoCommand<string>>(box =>
    box
      .map(command => command.action)
      .map(action => action(actionContext))
      .fold(hideModal)
  )

  const handleHideModal = () => {
    setCurrentIndex(0)
    setInputValue("")

    dispatch(hideCommandPalette())
  }

  const handleModalClick = lazyBox<MouseEvent>(box =>
    box.tap(preventDefault).tap(stopPropagation)
  )

  const handleChange = lazyBox<ChangeEvent<HTMLInputElement>>(box =>
    box
      .map(e => e.target)
      .map(t => t.value)
      .map(setInputValue)

      .map(() => 0)
      .fold(setCurrentIndex)
  )

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    Switch.of(event.key)
      .case("Escape", handleHideModal)
      .case("Enter", () => handleEnter(event))
      .case("ArrowUp", () => handleArrowUp(event))
      .case("ArrowDown", () => handleArrowDown(event))
      .default(noOp)
  }

  const translatedPlaceholder = t(`@ordo-command-command-palette/placeholder`)

  return Either.fromBoolean(isShown).fold(Null, () => (
    <Modal onHide={handleHideModal}>
      <div className="command-palette_overlay">
        <div
          role="none"
          className="command-palette_modal"
          onClick={handleModalClick}
        >
          <input
            className="command-palette_modal_input"
            autoFocus
            type="text"
            placeholder={translatedPlaceholder}
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />

          <div className="command-palette_modal_command-container">
            {visibleCommands.map((command, index) => (
              <CommandPaletteItem
                key={command.title}
                command={command}
                onClick={handleClick}
                isCurrent={currentIndex === index}
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  ))
}
