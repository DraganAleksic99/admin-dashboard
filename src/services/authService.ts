import axios from 'axios'
import api, { EndPoints } from '../api/axios'

export type UserModel = {
  email: string
  password: string
}

export async function loginAxios(userModel: UserModel) {
  return await axios.post<{ accessToken: string }>(
    'https://estore-api-oz4z.onrender.com/login',
    userModel
  )
}

export type RegisterModel = {
  email: string
  password: string
  name: string
  mobile: string
  policy: boolean
}

export async function registerAxios(registerModel: RegisterModel) {
  return await axios.post<{ accessToken: string }>(
    'https://estore-api-oz4z.onrender.com/register',
    registerModel
  )
}

export type ChangePasswordModel = {
  email: string
  password: string
  id: string
}

export async function changePasswordAxios(changePasswordModel: ChangePasswordModel) {
  return await api.put<void>(`${EndPoints.users}/${changePasswordModel.id}`, changePasswordModel)
}
