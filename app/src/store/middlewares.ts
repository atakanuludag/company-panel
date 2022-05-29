import {
  AnyAction,
  CombinedState,
  Dispatch,
  MiddlewareAPI,
  PayloadAction,
} from '@reduxjs/toolkit'
import IStoreState from '@/store/initialState'
import {
  axiosSetTokenInterceptor,
  axiosRemoveTokenInterceptor,
} from '@/core/Axios'
import { removeLocalStorage, setLocalStorage } from '@/utils/LocalStorage'
import { LOCAL_STORAGES } from '@/core/Constants'

const setLoginMiddleware =
  (store: MiddlewareAPI<Dispatch<AnyAction>, CombinedState<IStoreState>>) =>
  (next: (action: PayloadAction<IStoreState>) => PayloadAction<any>) =>
  (action: PayloadAction<IStoreState>) => {
    const result = next(action)

    if (!result.type.includes('userSlice/setLogin')) return result

    const authState = store.getState().userSlice
    if (authState.accessToken) {
      axiosSetTokenInterceptor(authState.accessToken)
      setLocalStorage(LOCAL_STORAGES.LS_AUTH, authState.accessToken)
    }

    return result
  }

const logoutUserMiddleware =
  (store: MiddlewareAPI<Dispatch<AnyAction>, CombinedState<IStoreState>>) =>
  (next: (action: PayloadAction<IStoreState>) => PayloadAction<any>) =>
  (action: PayloadAction<IStoreState>) => {
    const result = next(action)

    if (!result.type.includes('userSlice/logoutUser')) return result

    removeLocalStorage(LOCAL_STORAGES.LS_AUTH)
    axiosRemoveTokenInterceptor()

    return result
  }

const middlewares = [setLoginMiddleware, logoutUserMiddleware]

export default middlewares
