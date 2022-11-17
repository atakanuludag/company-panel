import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { MongooseModule } from '@nestjs/mongoose'

import { ExchangeRateController } from '@/exchange-rate/exchange-rate.controller'
import { ExchangeRateService } from '@/exchange-rate/exchange-rate.service'
import {
  ExchangeRate,
  ExchangeRateSchema,
} from '@/exchange-rate/schemas/exchange-rate.schema'

import { ExceptionHelper } from '@/common/helpers/exception.helper'
import { CoreMessage } from '@/common/messages/core.message'

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: ExchangeRate.name, schema: ExchangeRateSchema },
    ]),
  ],
  controllers: [ExchangeRateController],
  providers: [CoreMessage, ExceptionHelper, ExchangeRateService],
})
export class ExchangeRateModule {}
