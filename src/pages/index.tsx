import React from "react"

import Keycloak from "../core/auth"
import { Helmet } from "react-helmet"
import { RouterProvider } from "react-router-dom"
import { ReactKeycloakProvider } from "../core/auth/provider"
import Loading from "../core/components/loading"
import { router } from "../core/router"

const HOST = process.env.REACT_APP_FS_API_HOST ?? "http://localhost:5000"
const FAKE_TOKEN = process.env.REACT_APP_FAKE_TOKEN

const DIRECTORY_API = "fs/directories"
const FILE_API = "fs/files"

const AUTHORIZATION_HEADER_KEY = "authorization"

const fetch = window.fetch

const host = HOST.endsWith("/") ? HOST.slice(0, -1) : HOST

window.ordo = {
  env: {
    type: "browser",
    // TODO: Extend this to support permissions provided by the user
    fetch: (...[url, params]: Parameters<typeof fetch>) => {
      if (typeof url === "string") {
        if (!url.startsWith(HOST)) {
          throw new Error("Invalid request")
        }
      } else if (url instanceof URL) {
        if (url.host !== HOST) {
          throw new Error("Invalid request")
        }
      } else {
        if (!url.url.startsWith(HOST)) {
          throw new Error("Invalid request")
        }
      }

      return fetch(url, params)
    },
    openExternal: url => {
      window.open(url, "_blank")
    },
  },
}

export default function IndexPage() {
  Keycloak.init({}).then(isAuthenticated => {
    window.ordo.env.isAuthenticated = isAuthenticated
  })

  return (
    <ReactKeycloakProvider
      authClient={Keycloak}
      LoadingComponent={<Loading />}
      // onEvent={(type, error) => console.log(type, error)}
      // onTokens={(tokens) => console.log(tokens)}
    >
      <RouterProvider router={router} fallbackElement={<Loading />} />

      <Helmet>
        <title>{"Ordo.pink"}</title>
      </Helmet>
    </ReactKeycloakProvider>
  )
}
