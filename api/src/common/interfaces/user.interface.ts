import { Document, ObjectId } from 'mongoose'

export interface IUserEntity {
  readonly userId: ObjectId
  readonly userName: string
  readonly roles: string[]
}

export interface IUser extends Document {
  readonly userName: string
  readonly password: string
  readonly displayName: string
  readonly roles: string[]
}
