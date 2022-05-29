import { ExhangeRateType } from '@/models/enums'

export enum DovizType {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
}

export default interface IExchangeRate {
  readonly _id: string
  readonly name: DovizType
  readonly sales: number
  readonly buying: number
  readonly change: number
  readonly type: ExhangeRateType
  readonly updatedAt: Date
}
