import api, { EndPoints } from '../api/axios'

export type UserModel = {
  email: string
  password: string
}

export type RegisterModel = {
  email: string
  password: string
  name: string
  mobile: string
  policy: boolean
}

export type ChangePasswordModel = {
  email: string
  password: string
  id: string
}

export async function loginAxios(userModel: UserModel) {
  return await api.post<{ user: { _id: string; email: string }; token: string }>(
    EndPoints.login,
    userModel
  )
}

export async function registerAxios(registerModel: RegisterModel) {
  return await api.post<{ user: { _id: string; email: string }; token: string }>(
    EndPoints.register,
    registerModel
  )
}

export async function changePasswordAxios(changePasswordModel: ChangePasswordModel) {
  return await api.put<void>(`${EndPoints.users}/${changePasswordModel.id}`, changePasswordModel)
}
