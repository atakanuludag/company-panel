import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserState, setUser, logoutUser, setLogin } from '@/store/user'
import { RootState } from '@/store/rootReducer'

export default function useStoreUser() {
  const dispatch = useDispatch()

  const userStore = useSelector((state: RootState) => state.userSlice)

  const setUserStore = useCallback(
    (data: UserState) => dispatch(setUser(data)),
    [dispatch],
  )

  const setLoginStore = useCallback(
    (data: string) => dispatch(setLogin(data)),
    [dispatch],
  )

  const logoutUserStore = useCallback(() => dispatch(logoutUser()), [dispatch])

  return { userStore, setUserStore, logoutUserStore, setLoginStore }
}
