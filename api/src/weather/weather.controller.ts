import { Controller, Get, HttpStatus, Param } from '@nestjs/common'
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { CityIdParamsDto } from '@/common/dto/params.dto'
import { WeatherService } from '@/weather/weather.service'
import { ExceptionHelper } from '@/common/helpers/exception.helper'
import { CoreMessage } from '@/common/messages/core.message'

@ApiTags('Hava Durumu')
@Controller('weather')
export class WeatherController {
  constructor(
    private readonly service: WeatherService,
    private readonly coreMessage: CoreMessage,
  ) {}

  //#region Hava durumu
  @ApiOperation({
    summary: 'Hava durumunu getirir.',
  })
  @Get()
  async list() {
    return await this.service.getWeather()
  }
  //#endregion

  //#region Şehir idsine göre hava durumunu getirir.
  @ApiOperation({
    summary: 'Şehir idsine göre hava durumunu getirir.',
  })
  @ApiParam({ name: 'cityId', type: Number })
  @Get(':cityId')
  async getItemByName(@Param() params: CityIdParamsDto) {
    const data = await this.service.getItemByCityId(params.cityId)
    if (!data)
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    return data
  }
  //#endregion
}
