import IEmployee from '@/models/IEmployee'

export default interface IEmployeePermit {
  readonly _id?: string
  readonly employee: IEmployee | null
  readonly startDate: Date | null
  readonly endDate: Date | null
  readonly totalDays: number
  readonly description: string
  readonly createdAt: Date
}

export interface IEmployeePermitForm {
  readonly _id?: string
  readonly employee: string | null
  readonly startDate: Date | null
  readonly endDate: Date | null
  readonly totalDays: number | null
  readonly description: string | null
}
