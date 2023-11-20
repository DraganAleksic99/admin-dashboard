import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ClaimsType } from '../../models/claims-type'

const authNamespace = 'auth'

export type AuthStateType = {
  readonly accessToken: string
  readonly claims: ClaimsType
}

export const initialState: AuthStateType = {
  accessToken: '',
  claims: null
}

export const authSlice = createSlice({
  name: authNamespace,
  initialState,
  reducers: {
    saveTokenAction: (state, action: PayloadAction<string>) => {
      state.accessToken = action?.payload
    },
    saveClaimsAction: (state, action: PayloadAction<ClaimsType>) => {
      state.claims = action?.payload
    }
  },
  extraReducers(builder) {}
})

export const { saveTokenAction, saveClaimsAction } = authSlice.actions
export default authSlice.reducer
