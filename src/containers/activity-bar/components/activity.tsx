import React from "react"
import { useTranslation } from "react-i18next"
import { NavLink } from "react-router-dom"
import {
  getExtensionReadableName,
  getActivityRoute,
} from "../../../core/extensions/utils"
import { OrdoActivityExtension } from "../../../core/types"

type Props = {
  activity: OrdoActivityExtension<string>
}

export default function ActivityBarActivity({ activity }: Props) {
  const activityName = getExtensionReadableName(activity)
  const activityRoute = getActivityRoute(activity)
  const Icon = activity.Icon
  const Component = activity.Component

  const handleMouseOver = () => {
    Component.preload()
  }

  const { t } = useTranslation()

  const translatedTitle = t(activityName) ?? activityName

  return (
    <NavLink
      title={translatedTitle}
      onMouseOver={handleMouseOver}
      className="activity-bar_activity"
      to={activityRoute}
    >
      <Icon />
    </NavLink>
  )
}