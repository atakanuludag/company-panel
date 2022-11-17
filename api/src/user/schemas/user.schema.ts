import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { UserRole } from '@/common/interfaces/enums'

export type UserDocument = User & Document

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true, unique: true })
  userName: string

  @Prop({ required: true, select: false })
  password: string

  @Prop({ required: true })
  displayName: string

  @Prop({
    default: [UserRole.EMPLOYEE],
    type: [String],
    enum: UserRole,
  })
  roles: string[]
}

export const UserSchema = SchemaFactory.createForClass(User)
