import { useAppSelector } from "./use-app-selector"

export const useState = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const state = useAppSelector(state => state) as any

  return state
}
