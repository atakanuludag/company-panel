import { Gender } from '@/models/enums'

export default interface IEmployee {
  readonly _id?: string
  readonly tcNumber: string
  readonly displayName: string
  readonly gsmNumber: string | null
  readonly homePhone: string | null
  readonly address: string | null
  readonly startingDate: Date | null
  readonly endDate: Date | null
  readonly gender: Gender
}
