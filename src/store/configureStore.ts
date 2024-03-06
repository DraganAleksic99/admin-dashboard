import { configureStore } from '@reduxjs/toolkit'
import calendarReducer from '../features/calendar/calendarSlice'
import profileReducer from '../features/profile/profileSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    profile: profileReducer,
    auth: authReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
