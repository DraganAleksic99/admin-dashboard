import { UserType } from '../../models/user-type'

export type ProfileStateType = {
  profile: UserType
  loading: boolean
  error: string
}

export const profileNamespace = 'profile'

export const profileActionTypes = {
  FETCH_AND_SAVE_PROFILE: `${profileNamespace}/FETCH_AND_SAVE_PROFILE`,
  UPDATE_PROFILE: `${profileNamespace}/UPDATE_PROFILE`
}
