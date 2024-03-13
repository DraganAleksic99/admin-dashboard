import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserType } from '../../models/user-type'
import { profileActionTypes } from './profileActionTypes'
import { getUserAxios, putUserAxios } from '../../services/userDbService'

export const getProfileAction = createAsyncThunk(
  profileActionTypes.FETCH_AND_SAVE_PROFILE,
  async ({ id, token }: { id: string; token: string }) => {
    return (await getUserAxios(id, token)).data
  }
)

export const putProfileAction = createAsyncThunk(
  profileActionTypes.UPDATE_PROFILE,
  async ({ user, token }: { user: UserType; token: string }) => {
    return (await putUserAxios(user, token)).data
  }
)
