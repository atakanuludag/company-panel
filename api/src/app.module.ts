import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { IEnv } from './common/interfaces/env.interface'
import { ExceptionHelper } from './common/helpers/exception.helper'
import { CoreMessage } from './common/messages/core.message'

import { UserModule } from './user/user.module'
import { EmployeeModule } from './employee/employee.module'
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module'
import { WeatherModule } from './weather/weather.module'

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<IEnv>) => ({
        uri: configService.get<string>('MONGODB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        socketTimeoutMS: 0,
        connectTimeoutMS: 0,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    EmployeeModule,
    ExchangeRateModule,
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [CoreMessage, ExceptionHelper, AppService],
})
export class AppModule {}
