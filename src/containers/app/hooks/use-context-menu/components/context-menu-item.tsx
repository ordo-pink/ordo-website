import React from "react"
import { MouseEvent } from "react"
import { useTranslation } from "react-i18next"
import Accelerator from "../../../../../core/components/accelerator"
import Null from "../../../../../core/components/null"
import { useActionContext } from "../../../../../core/hooks/use-action-context"
import { useAppDispatch } from "../../../../../core/state/hooks/use-app-dispatch"
import { useAppSelector } from "../../../../../core/state/hooks/use-app-selector"
import {
  preventDefault,
  stopPropagation,
} from "../../../../../core/utils/event"
import { lazyBox } from "../../../../../core/utils/lazy-box"
import { hideContextMenu } from "../store"
import { ContextMenuTemplateItem } from "../types"

type Props = {
  item: ContextMenuTemplateItem
}

export default function ContextMenuItem({ item }: Props) {
  const dispatch = useAppDispatch()

  const target = useAppSelector(state => state?.contextMenu?.target) ?? null

  const actionContext = useActionContext(target)

  const handleClick = lazyBox<MouseEvent>(box =>
    box
      .tap(preventDefault)
      .tap(stopPropagation)
      .map(() => dispatch(hideContextMenu()))
      .map(() => actionContext)
      .fold(ctx => item.action(ctx))
  )

  const { t } = useTranslation()

  const Icon = item.Icon ?? Null
  const translatedTitle = t(item.title)

  return (
    <div
      className="context-menu_item hover-active"
      onClick={handleClick}
      role="none"
    >
      <div className="flex items-center space-x-2">
        <div className="shrink-0">
          <Icon />
        </div>
        <div title={translatedTitle} className="truncate">
          {translatedTitle}
        </div>
      </div>
      {item.accelerator && <Accelerator accelerator={item.accelerator} />}
    </div>
  )
}
