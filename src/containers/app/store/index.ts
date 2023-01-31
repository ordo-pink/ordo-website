import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { AppState, UpdatedFilePayload } from "../types"
import { registeredExtensionsReducer } from "./reducers/registered-extensions"

const initialState: AppState = {
  activityExtensions: [],
  commandExtensions: [],
  fileAssociationExtensions: [],
  editorPluginExtensions: [],
  commands: [],
  overlays: [],
}

export const appSlice = createSlice({
  name: "@ordo-app",
  initialState,
  reducers: {
    registeredExtensions: registeredExtensionsReducer,
  },
})

export const { registeredExtensions } = appSlice.actions

export default appSlice.reducer
