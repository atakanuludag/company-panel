import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserState } from '@/store/user/type'
import SliceNames from '@/store/enums'

export let initialState: UserState = {
  loading: true,
  _id: null,
  isLoggedIn: null,
  accessToken: null,
  userName: null,
  displayName: null,
  roles: null,
}

const user = createSlice({
  name: SliceNames.USER_SLICE,
  initialState,
  reducers: {
    setUser(state: UserState, action: PayloadAction<UserState>) {
      return {
        ...state,
        ...action.payload,
      }
    },
    setLogin(state: UserState, action: PayloadAction<string>) {
      return {
        ...state,
        accessToken: action.payload,
        isLoggedIn: true,
      }
    },
    logoutUser() {
      return initialState
    },
  },
})

export const { setUser, logoutUser, setLogin } = user.actions
export default user.reducer
