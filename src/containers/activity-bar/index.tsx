import "./index.css"
import React from "react"
import { useAppSelector } from "../../core/state/hooks/use-app-selector"
import ActivityBarActivity from "./components/activity"

export default function ActivityBar() {
  const activities =
    useAppSelector(state => state?.app?.activityExtensions) ?? []

  return (
    <div className="activity-bar">
      {activities.map(activity => (
        <ActivityBarActivity key={activity.name} activity={activity} />
      ))}
    </div>
  )
}
