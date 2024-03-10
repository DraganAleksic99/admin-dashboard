import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType } from '../../models/user-type'
import { profileNamespace, ProfileStateType } from './profileActionTypes'
import { getProfileAction, putProfileAction } from './profileAsyncActions'

export const initialState: ProfileStateType = {
  profile: {} as UserType,
  loading: false,
  error: ''
}

export const profileSlice = createSlice({
  name: profileNamespace,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getProfileAction.pending, state => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(getProfileAction.fulfilled, (state, action: PayloadAction<UserType>) => {
      state.profile = action.payload
    })
    builder.addCase(getProfileAction.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false
      state.error = 'Something wrong happened'
      console.log(action?.payload)
    })
    builder.addCase(putProfileAction.pending, (state, action: PayloadAction) => {
      state.loading = true
      state.error = ''
    })
    builder.addCase(putProfileAction.fulfilled, (state, action: PayloadAction<UserType>) => {
      state.loading = false
      state.profile = action.payload
    })
    builder.addCase(putProfileAction.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false
      state.error = 'Something wrong happened'
    })
  }
})

export default profileSlice.reducer
