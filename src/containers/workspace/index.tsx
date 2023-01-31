import { PropsWithChildren } from "react"

import "./index.css"
import React from "react"

export default function Workspace({ children }: PropsWithChildren) {
  return <div className="workspace w-full">{children}</div>
}
