import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose'
import { Gender } from '../../common/interfaces/enums'

export type EmployeeDocument = Employee & Document

@Schema({
  timestamps: true,
})
export class Employee {
  @Prop({ required: true, unique: true })
  tcNumber: string

  @Prop({ required: true })
  displayName: string

  @Prop({ required: false, default: null })
  gsmNumber: string

  @Prop({ required: false, default: null })
  homePhone: string

  @Prop({ required: false, default: null })
  address: string

  @Prop({ required: true })
  startingDate: Date

  @Prop({ required: false, default: null })
  endDate: Date

  @Prop({ type: SchemaTypes.Mixed, required: true, enum: Gender })
  gender: Gender

  // Virtual;
  @Prop({ virtual: true })
  remainingPermitDays: number

  // Virtual;
  @Prop({ virtual: true })
  totalPermitDays: number

  //personellerin izin bilgileri permit tablosunda. personelin işe giriş tarihine göre yıllık iznini hesaplayıp sahip olduğu izin sayısını yazdırabiliriz.
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee)
