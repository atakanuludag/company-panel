import { configureStore, PreloadedState } from '@reduxjs/toolkit'
import logger from 'redux-logger'
//import { ThunkAction, ThunkMiddleware } from 'redux-thunk'
import rootReducer, { RootState } from '@/store/rootReducer'
import middlewares from '@/store/middlewares'
import { UserInitialState } from '@/store/user'
import { getLocalStorage } from '@/utils/LocalStorage'
import { LOCAL_STORAGES } from '@/core/Constants'
import { axiosSetTokenInterceptor } from '@/core/Axios'

const preloadedState = () => {
  const state: PreloadedState<RootState> = {}
  const auth: string = getLocalStorage(LOCAL_STORAGES.LS_AUTH)
  if (auth !== null) {
    axiosSetTokenInterceptor(auth)
    state.userSlice = {
      ...UserInitialState,
      accessToken: auth,
      isLoggedIn: true,
    }
  }
  return state
}

const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloadedState(),
  middleware: [...middlewares, logger],
  devTools: process.env.NODE_ENV !== 'production',
})

export type AppDispatch = typeof store.dispatch

// export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default store
