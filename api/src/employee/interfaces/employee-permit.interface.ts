import { Document, ObjectId, PopulatedDoc } from 'mongoose'
import { IEmployee } from './employee.interface'

export interface IEmployeePermit extends Document {
  readonly employee: ObjectId | PopulatedDoc<IEmployee>
  readonly startDate: Date
  readonly endDate: Date
  readonly totalDays: number
  readonly description: string
}
