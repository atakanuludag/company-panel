import { ExhangeRateType } from '@/exchange-rate/interfaces/enums'

export interface IExchangeRate {
  _id?: string
  readonly name: string
  readonly buying: number
  readonly sales: number
  readonly change: number
  readonly type: ExhangeRateType
}
