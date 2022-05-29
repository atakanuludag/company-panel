export interface UserState {
  loading: boolean
  _id: string | null
  isLoggedIn: boolean | null
  accessToken: string | null
  userName: string | null
  displayName: string | null
  roles: any | null
}
