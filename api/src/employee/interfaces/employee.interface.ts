import { Document } from 'mongoose'
import { Gender } from '@/common/interfaces/enums'

export interface IEmployee extends Document {
  readonly tcNumber: string
  readonly displayName: string
  readonly gsmNumber: string | null
  readonly homePhone: string | null
  readonly address: string | null
  readonly startingDate: Date
  readonly endDate: Date | null
  readonly gender: Gender
  readonly remainingPermitDays: number
  readonly totalPermitDays: number
}
