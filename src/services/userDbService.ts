import api, { EndPoints } from '../api/axios'
import { UserType } from '../models/user-type'

export async function getUserAxios(id: string, token: string) {
  return await api.get<UserType>(`${EndPoints.users}/${id}`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
}

export async function putUserAxios(user: UserType, token: string) {
  return await api.put<UserType>(`${EndPoints.users}/${user._id}`, user, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
}
