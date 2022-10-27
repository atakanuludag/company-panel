import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes, ObjectId } from 'mongoose'

export type EmployeePermitDocument = EmployeePermit & Document

@Schema({
  timestamps: true,
})
export class EmployeePermit {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Employee',
    default: null,
  })
  employee: ObjectId

  @Prop({ required: true })
  startDate: Date

  @Prop({ required: true })
  endDate: Date

  @Prop({ required: true })
  totalDays: number

  @Prop({ required: false, default: '' })
  description: string
}

export const EmployeePermitSchema = SchemaFactory.createForClass(EmployeePermit)
