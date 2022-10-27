import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type WeatherDocument = Weather & Document & { updatedAt: Date }

@Schema({
  timestamps: {
    updatedAt: true,
    createdAt: false,
  },
  id: false,
})
export class Weather {
  @Prop({ unique: true, required: true })
  cityId: number

  @Prop({ required: true })
  weatherId: number

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  description: string

  @Prop({ required: true })
  icon: string

  @Prop({ required: true })
  temp: number

  @Prop({ required: true })
  lon: number

  @Prop({ required: true })
  lat: number
}

export const WeatherSchema = SchemaFactory.createForClass(Weather)
