import { AiOutlineEnter } from "react-icons/ai"
import { BsBackspace } from "react-icons/bs"

import "./index.css"
import { Switch } from "@ordo-pink/switch"
import React from "react"

type Props = {
  accelerator: string
}

export default function Accelerator({ accelerator }: Props) {
  const isDarwin = navigator.appVersion.indexOf("Mac") !== -1

  const split = accelerator.split("+")
  const alt = isDarwin ? "⌥" : "Alt"
  const ctrl = isDarwin ? "⌘" : "Ctrl"

  const symbol = split[split.length - 1].toLowerCase()

  const key = Switch.of(symbol)
    .case("backspace", () => <BsBackspace />)
    .case("enter", () => <AiOutlineEnter />)
    .case("escape", () => <span>ESC</span>)
    .default(() => <span>{symbol.toLocaleUpperCase()}</span>)

  return (
    <div className="accelerator">
      {split.includes("alt") && (
        <div className="">
          {alt} +
        </div> /* eslint-disable-line i18next/no-literal-string */
      )}
      {split.includes("option") && (
        <div className="">
          ⌥ +
        </div> /* eslint-disable-line i18next/no-literal-string */
      )}
      {split.includes("ctrl") && (
        <div className="">
          {ctrl} +
        </div> /* eslint-disable-line i18next/no-literal-string */
      )}
      {split.includes("shift") && (
        <div className="">
          ⇧ +
        </div> /* eslint-disable-line i18next/no-literal-string */
      )}
      {key}
    </div>
  )
}
