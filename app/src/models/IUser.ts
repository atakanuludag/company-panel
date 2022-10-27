export default interface IUser {
  readonly _id?: string
  readonly userName: string
  readonly displayName: string
  readonly password?: string
  readonly roles: string[]
  readonly createdAt?: Date
  readonly updatedAt?: Date
}

export interface IProfileUpdateUser {
  readonly userName: string
  readonly displayName: string
  readonly oldPassword: string
  readonly newPassword: string
}
