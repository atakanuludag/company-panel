import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ExchangeRateService } from '@/exchange-rate/exchange-rate.service'

@ApiTags('Döviz Kurları')
@Controller('exchange-rate')
export class ExchangeRateController {
  constructor(private readonly service: ExchangeRateService) {}

  //#region Döviz kurları
  @ApiOperation({
    summary: 'Döviz kurlarını getirir.',
  })
  @Get()
  async list() {
    return await this.service.getCurrency()
  }
  //#endregion
}
