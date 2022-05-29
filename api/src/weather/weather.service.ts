import { HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { differenceInMinutes } from 'date-fns'
import { HttpService } from '@nestjs/axios'
import { Weather, WeatherDocument } from './schemas/weather.schema'
import { ExceptionHelper } from '../common/helpers/exception.helper'
import { CoreMessage } from '../common/messages/core.message'
import { IWeather } from './interfaces/weather.interface'
import { IOpenWeatherMap } from './interfaces/openweathermap-api.interface'
import { IEnv } from '../common/interfaces/env.interface'

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather.name)
    private readonly serviceModel: Model<WeatherDocument>,
    private httpService: HttpService,
    private readonly coreMessage: CoreMessage,
    private configService: ConfigService<IEnv>,
  ) {}

  private openWeatherMapAppId = this.configService.get<string>(
    'OPEN_WEATHER_MAP_APP_ID',
  )
  private openWeatherMapCityIds = this.configService
    .get<string>('OPEN_WEATHER_MAP_CITY_IDS')
    .split(',')

  private openWeatherMapLang = this.configService.get<string>(
    'OPEN_WEATHER_MAP_LANG',
  )
  private openWeatherMapUnits = this.configService.get<string>(
    'OPEN_WEATHER_MAP_UNITS',
  )
  private openWeatherMapUpdateMin =
    this.configService.get<number>('WEATHER_UPDATE_MIN')

  async getItems(): Promise<WeatherDocument[]> {
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

  async createBulk(data: IWeather[]): Promise<IWeather[]> {
    try {
      return await this.serviceModel.insertMany(data)
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async create(data: IWeather): Promise<IWeather> {
    try {
      const create = new this.serviceModel(data)
      return create.save()
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async update(data: IWeather): Promise<IWeather> {
    try {
      return await this.serviceModel.findByIdAndUpdate(
        data._id,
        {
          $set: data,
        },
        { new: true },
      )
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  async bulkUpdate(data: IWeather[]): Promise<WeatherDocument[]> {
    try {
      const res = new Array<WeatherDocument>()
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

  async getOpenWeatherMapIconToBase64(icon: string): Promise<string | null> {
    try {
      const res = await new Promise<string | null>((resolve, reject) =>
        this.httpService
          .get(`https://openweathermap.org/img/wn/${icon}@4x.png`, {
            headers: {},
            responseType: 'arraybuffer',
          })
          .pipe()
          .subscribe((res) => {
            if (!res.data) reject(null)
            else {
              const base64 =
                'data:' +
                res.headers['content-type'] +
                ';base64,' +
                Buffer.from(res.data).toString('base64')
              resolve(base64)
            }
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

  async getOpenWeatherMapApi(
    cityId: string | number,
  ): Promise<IOpenWeatherMap | null> {
    try {
      const queries = {
        id: cityId.toString(),
        units: this.openWeatherMapUnits,
        lang: this.openWeatherMapLang,
        APPID: this.openWeatherMapAppId,
      }

      const searchParams = new URLSearchParams(queries)
      let res = await new Promise<IOpenWeatherMap | null>((resolve, reject) =>
        this.httpService
          .get(
            `https://api.openweathermap.org/data/2.5/weather?${searchParams.toString()}`,
            {
              headers: {},
            },
          )
          .pipe()
          .subscribe(({ data }) => {
            if (!data) reject(null)
            else resolve(data)
          }),
      )

      const icon = await this.getOpenWeatherMapIconToBase64(res.weather[0].icon)
      res.weather[0].icon = icon

      return res
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async getWeather(): Promise<IWeather[]> {
    try {
      const items = await this.getItems()
      if (items.length <= 0) {
        const data = new Array<IWeather>()

        for await (const openWeatherMapCityId of this.openWeatherMapCityIds) {
          const openWeatherMapData = await this.getOpenWeatherMapApi(
            openWeatherMapCityId,
          )

          data.push({
            cityId: openWeatherMapData.id,
            weatherId: openWeatherMapData.weather[0].id,
            name: openWeatherMapData.name,
            description: openWeatherMapData.weather[0].description,
            icon: openWeatherMapData.weather[0].icon,
            temp: openWeatherMapData.main.temp,
            lon: openWeatherMapData.coord.lon,
            lat: openWeatherMapData.coord.lat,
          })
        }

        return await this.createBulk(data)
      } else {
        const updatedAt = items[0].updatedAt
        const diff = differenceInMinutes(new Date(), new Date(updatedAt))

        if (diff > this.openWeatherMapUpdateMin) {
          //güncellenmesi gerekiyor.
          const data = new Array<IWeather>()

          for await (const openWeatherMapCityId of this.openWeatherMapCityIds) {
            const openWeatherMapData = await this.getOpenWeatherMapApi(
              openWeatherMapCityId,
            )
            const find = items.find(
              (i) => i.cityId.toString() === openWeatherMapCityId.toString(),
            )

            let d: IWeather = {
              cityId: openWeatherMapData.id,
              weatherId: openWeatherMapData.weather[0].id,
              name: openWeatherMapData.name,
              description: openWeatherMapData.weather[0].description,
              icon: openWeatherMapData.weather[0].icon,
              temp: openWeatherMapData.main.temp,
              lon: openWeatherMapData.coord.lon,
              lat: openWeatherMapData.coord.lat,
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

  async getItemByCityId(cityId: number): Promise<IWeather> {
    try {
      let data = {} as IWeather
      const item = await this.serviceModel.findOne({ cityId }).exec()
      if (!item) {
        const openWeatherMapData = await this.getOpenWeatherMapApi(cityId)
        data = {
          cityId: openWeatherMapData.id,
          weatherId: openWeatherMapData.weather[0].id,
          name: openWeatherMapData.name,
          description: openWeatherMapData.weather[0].description,
          icon: openWeatherMapData.weather[0].icon,
          temp: openWeatherMapData.main.temp,
          lon: openWeatherMapData.coord.lon,
          lat: openWeatherMapData.coord.lat,
        }
      } else {
        const { updatedAt, _id } = item
        const diff = differenceInMinutes(new Date(), new Date(updatedAt))

        if (diff > this.openWeatherMapUpdateMin) {
          const openWeatherMapData = await this.getOpenWeatherMapApi(cityId)
          data = {
            _id,
            cityId: openWeatherMapData.id,
            weatherId: openWeatherMapData.weather[0].id,
            name: openWeatherMapData.name,
            description: openWeatherMapData.weather[0].description,
            icon: openWeatherMapData.weather[0].icon,
            temp: openWeatherMapData.main.temp,
            lon: openWeatherMapData.coord.lon,
            lat: openWeatherMapData.coord.lat,
          }
        }
      }
      if (Object.keys(data).length <= 0) return item
      else if (data._id) return await this.update(data)
      else return await this.create(data)
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }
}
