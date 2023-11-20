import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { forceReducerReload } from 'redux-injectors'
import { createReducer } from './reducers'

export function configureAppStore() {
  const store = configureStore({
    reducer: createReducer(),
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: false
      })
    ],
    devTools: process.env.NODE_ENV !== 'production'
  })
  // if (module.hot) {
  //     module.hot.accept('./reducers', () => {
  //         forceReducerReload(store)
  //     })
  // }
  return store
}
