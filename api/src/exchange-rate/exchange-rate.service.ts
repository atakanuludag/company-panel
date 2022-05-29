import { HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { differenceInMinutes } from 'date-fns'
import { HttpService } from '@nestjs/axios'
import {
  ExchangeRate,
  ExchangeRateDocument,
} from './schemas/exchange-rate.schema'
import { ExceptionHelper } from '../common/helpers/exception.helper'
import { CoreMessage } from '../common/messages/core.message'
import { IExchangeRate } from './interfaces/exchange-rate.interface'
import {
  DovizType,
  //IDovizObject,
  IDovizResponse,
} from './interfaces/doviz-api.interface'

import { ExhangeRateType } from './interfaces/enums'
import { IEnv } from '../common/interfaces/env.interface'

@Injectable()
export class ExchangeRateService {
  constructor(
    @InjectModel(ExchangeRate.name)
    private readonly serviceModel: Model<ExchangeRateDocument>,
    private httpService: HttpService,
    private readonly coreMessage: CoreMessage,
    private configService: ConfigService<IEnv>,
  ) {}

  private exhangeRateUpdateMin = this.configService.get<number>(
    'EXCHANGE_RATE_UPDATE_MIN',
  )
  async getItems(): Promise<ExchangeRateDocument[]> {
    try {
      const items = await this.serviceModel.find().exec()
      return items
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async create(data: IExchangeRate[]): Promise<IExchangeRate[]> {
    try {
      return await this.serviceModel.insertMany(data)
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async bulkUpdate(data: IExchangeRate[]): Promise<ExchangeRateDocument[]> {
    try {
      const res = new Array<ExchangeRateDocument>()
      for await (const d of data) {
        if (d._id) {
          res.push(await this.serviceModel.findByIdAndUpdate(d._id, d))
        } else {
          res.push(await this.serviceModel.create(d))
        }
      }
      return res
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  // async getTCMB(): Promise<ICurrency[]> {
  //   try {
  //     const res = await new Promise<ITCMB | null>((resolve, reject) =>
  //       this.httpService
  //         .get('https://www.tcmb.gov.tr/kurlar/today.xml', {
  //           headers: {},
  //         })
  //         .pipe()
  //         .subscribe(({ data }) => {
  //           if (!data) reject(null)
  //           else resolve(this.parser.parse(data))
  //         }),
  //     )
  //     const tcmbCurrency = res.Tarih_Date.Currency

  //     if (!Array.isArray(tcmbCurrency))
  //       throw new ExceptionHelper(
  //         this.coreMessage.INTERNAL_SERVER_ERROR,
  //         HttpStatus.BAD_REQUEST,
  //       )
  //     return tcmbCurrency.map((c) => ({
  //       ...c,
  //       ForexBuying: c.ForexBuying === '' ? null : c.ForexBuying,
  //       ForexSelling: c.ForexSelling === '' ? null : c.ForexSelling,
  //       BanknoteBuying: c.BanknoteBuying === '' ? null : c.BanknoteBuying,
  //       BanknoteSelling: c.BanknoteSelling === '' ? null : c.BanknoteSelling,
  //       CrossRateUSD: c.CrossRateUSD === '' ? null : c.CrossRateUSD,
  //       CrossRateOther: c.CrossRateOther === '' ? null : c.CrossRateOther,
  //     }))
  //   } catch (err) {
  //     throw new ExceptionHelper(
  //       this.coreMessage.INTERNAL_SERVER_ERROR,
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     )
  //   }
  // }

  async getGenelParaApi(): Promise<IDovizResponse | null> {
    try {
      const res = await new Promise<IDovizResponse | null>((resolve, reject) =>
        this.httpService
          .get('https://api.genelpara.com/embed/para-birimleri.json', {
            headers: {},
          })
          .pipe()
          .subscribe(({ data }) => {
            if (!data) reject(null)
            else resolve(data)
          }),
      )

      return res
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async getCurrency(): Promise<IExchangeRate[]> {
    try {
      const items = await this.getItems()
      if (items.length <= 0) {
        const data = new Array<IExchangeRate>()
        const genelParaData = await this.getGenelParaApi()

        for (const key of Object.keys(DovizType) as Array<
          keyof typeof DovizType
        >) {
          const item = genelParaData[key]
          const change = Number(item.degisim.replace(',', '.'))
          data.push({
            name: key,
            buying: Number(item.alis),
            sales: Number(item.satis),
            change,
            type:
              change === 0
                ? ExhangeRateType.SAME
                : change < 0
                ? ExhangeRateType.DOWN
                : ExhangeRateType.UP,
          })
        }
        return await this.create(data)
      } else {
        const updatedAt = items[0].updatedAt
        const diff = differenceInMinutes(new Date(), new Date(updatedAt))

        if (diff > this.exhangeRateUpdateMin) {
          //güncellenmesi gerekiyor.
          const genelParaData = await this.getGenelParaApi()
          const data = new Array<IExchangeRate>()

          for (const key of Object.keys(DovizType) as Array<
            keyof typeof DovizType
          >) {
            const item = genelParaData[key]
            const find = items.find((i) => i.name === key)
            const change = Number(item.degisim.replace(',', '.'))
            let d: IExchangeRate = {
              name: key,
              buying: Number(item.alis),
              sales: Number(item.satis),
              change,
              type:
                change === 0
                  ? ExhangeRateType.SAME
                  : change < 0
                  ? ExhangeRateType.DOWN
                  : ExhangeRateType.UP,
            }

            if (find) d._id = find._id
            data.push(d)
          }

          return await this.bulkUpdate(data)
        }
        return items
      }
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
