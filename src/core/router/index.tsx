import React from "react"
import { createBrowserRouter } from "react-router-dom"

import App from "../../containers/app"
import Loading from "../../core/components/loading"

export const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
    children: [
      {
        path: "*",
        element: (
          <div className="overflow-x-hidden overflow-y-hidden">
            <Loading />
          </div>
        ),
      },
    ],
  },
])
