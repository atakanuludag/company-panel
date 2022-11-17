import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AppService } from '@/app.service'
import { IHolidaysCalendar } from '@/common/interfaces/google-calendar.interface'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('Tatil Günleri')
  @ApiOperation({
    summary: 'Tatil günlerini Google Calendar APIsinden getirir.',
  })
  @Get('/holidays-calendar')
  async getHolidaysCalendar(): Promise<IHolidaysCalendar[]> {
    const googleRes = await this.appService.getGoogleApiCalendarHolidays()
    return googleRes.items.map((i) => ({
      title: i.summary,
      description: i.description,
      startDate: i.start.date,
      endDate: i.end.date,
      status: i.status === 'confirmed' ? true : false,
      htmlLink: i.htmlLink,
      created: i.created,
      updated: i.updated,
    }))
  }
}
