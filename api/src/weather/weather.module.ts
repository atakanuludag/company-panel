import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { MongooseModule } from '@nestjs/mongoose'

import { WeatherController } from './weather.controller'
import { WeatherService } from './weather.service'
import { Weather, WeatherSchema } from './schemas/weather.schema'

import { ExceptionHelper } from '../common/helpers/exception.helper'
import { CoreMessage } from '../common/messages/core.message'

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Weather.name, schema: WeatherSchema }]),
  ],
  controllers: [WeatherController],
  providers: [CoreMessage, ExceptionHelper, WeatherService],
})
export class WeatherModule {}
