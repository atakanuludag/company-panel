import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose'
import { ExhangeRateType } from '../interfaces/enums'

export type ExchangeRateDocument = ExchangeRate & Document & { updatedAt: Date }

@Schema({
  timestamps: {
    updatedAt: true,
    createdAt: false,
  },
  id: false,
})
export class ExchangeRate {
  @Prop({ unique: true })
  name: string

  @Prop({ required: false, default: 0 })
  buying: number

  @Prop({ required: false, default: 0 })
  sales: number

  @Prop({ required: false, default: 0 })
  change: number

  @Prop({ type: SchemaTypes.Mixed, required: true, enum: ExhangeRateType })
  type: ExhangeRateType
}

export const ExchangeRateSchema = SchemaFactory.createForClass(ExchangeRate)
