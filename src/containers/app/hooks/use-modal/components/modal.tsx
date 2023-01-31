import { PropsWithChildren, useEffect } from "react"
import { useHotkeys } from "react-hotkeys-hook"

import "../index.css"
import { ThunkFn } from "@ordo-pink/switch"
import React from "react"
import Null from "../../../../../core/components/null"
import { Either } from "../../../../../core/utils/either"
import {
  preventDefault,
  stopPropagation,
} from "../../../../../core/utils/event"
import { lazyBox } from "../../../../../core/utils/lazy-box"
import { noOp } from "../../../../../core/utils/no-op"

type Props = {
  isShown: boolean
  hideModal: ThunkFn<void>
  onShow?: ThunkFn<void>
  onHide?: ThunkFn<void>
}

export default function Modal({
  isShown,
  hideModal,
  children,
  onShow = noOp,
  onHide = noOp,
}: PropsWithChildren<Props>) {
  const hide = lazyBox<{
    preventDefault: ThunkFn<void>
    stopPropagation: ThunkFn<void>
  }>(box =>
    box
      .tap(preventDefault)
      .tap(stopPropagation)
      .fold(() => hideModal())
  )

  useHotkeys("escape", hide)

  useEffect(() => {
    isShown ? onShow() : onHide()
  }, [isShown, onShow, onHide])

  return Either.fromBoolean(isShown).fold(Null, () => (
    <div
      className="modal-overlay"
      onClick={hide}
      onContextMenu={hide}
      role="none"
    >
      {children}
    </div>
  ))
}