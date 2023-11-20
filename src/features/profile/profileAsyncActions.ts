import { createAsyncThunk } from '@reduxjs/toolkit'
import { UserType } from '../../models/user-type'
import { profileActionTypes } from './profileActionTypes'
import { getUserByIdFromDbAxios, putUserFromDbAxios } from '../../services/userDbService'

export const getProfileAction = createAsyncThunk(
  profileActionTypes.FETCH_AND_SAVE_PROFILE,
  async (id: string) => {
    return (await getUserByIdFromDbAxios(id)).data
  }
)

export const putProfileAction = createAsyncThunk(
  profileActionTypes.UPDATE_PROFILE,
  async (user: UserType) => {
    return (await putUserFromDbAxios(user)).data
  }
)
