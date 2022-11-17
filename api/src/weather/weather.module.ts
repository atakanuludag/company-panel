import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { MongooseModule } from '@nestjs/mongoose'

import { WeatherController } from '@/weather/weather.controller'
import { WeatherService } from '@/weather/weather.service'
import { Weather, WeatherSchema } from '@/weather/schemas/weather.schema'

import { ExceptionHelper } from '@/common/helpers/exception.helper'
import { CoreMessage } from '@/common/messages/core.message'

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Weather.name, schema: WeatherSchema }]),
  ],
  controllers: [WeatherController],
  providers: [CoreMessage, ExceptionHelper, WeatherService],
})
export class WeatherModule {}
