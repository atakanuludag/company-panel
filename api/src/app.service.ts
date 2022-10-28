import { HttpStatus, Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import { ExceptionHelper } from './common/helpers/exception.helper'
import { CoreMessage } from './common/messages/core.message'
import { IEnv } from './common/interfaces/env.interface'
import { IGoogleCalendarApi } from './common/interfaces/google-calendar.interface'

@Injectable()
export class AppService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService<IEnv>,
    private readonly coreMessage: CoreMessage,
  ) {}

  private googleCalendarApiKey = this.configService.get<string>(
    'GOOGLE_CALENDAR_API_KEY',
  )
  async getGoogleApiCalendarHolidays(): Promise<IGoogleCalendarApi> {
    try {
      return await new Promise<IGoogleCalendarApi | null>((resolve, reject) =>
        this.httpService
          .get(
            `https://www.googleapis.com/calendar/v3/calendars/tr.turkish.official%23holiday%40group.v.calendar.google.com/events?key=${this.googleCalendarApiKey}`,
          )
          .pipe()
          .subscribe({
            next: ({ data }) => {
              if (!data) resolve(null)
              resolve(data)
            },
            error: () => resolve(null),
          }),
      )
    } catch (err) {
      throw new ExceptionHelper(
        this.coreMessage.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      )
    }
  }
}
