import type { OrdoDirectory, OrdoFile, UnaryFn } from "./core/types"

declare global {
  interface Window {
    ordo: {
      env: {
        type: "electron" | "browser"
        fetch: typeof fetch
        openExternal: UnaryFn<string, void>
        isAuthenticated?: boolean
        userData?: {
          firstName: string
          lastName: string
          fullName: string
          username: string
          email: string
          emailVerified: boolean
        }
      }
    }
  }
}
