import { useState } from "../state/hooks/use-state"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../state/hooks/use-app-dispatch"
import { ActionContext } from "../types"
import { useEnv } from "./use-env"

export const useActionContext = (
  contextMenuTarget: ActionContext["contextMenuTarget"] = null
): ActionContext => {
  const dispatch = useAppDispatch()
  const state = useState()
  const env = useEnv()
  const navigate = useNavigate()
  const { t } = useTranslation()

  return {
    dispatch,
    env,
    state,
    contextMenuTarget,
    navigate: navigate as any,
    translate: t,
  }
}
