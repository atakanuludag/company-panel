interface IGoogleCalendarItems {
  status: string
  htmlLink: string
  created: Date
  updated: Date
  summary: string
  description: string
  start: {
    date: string
  }
  end: {
    date: string
  }
}

export interface IGoogleCalendarApi {
  summary: string
  updated: Date
  timeZone: string
  items: IGoogleCalendarItems[]
}

export interface IHolidaysCalendar {
  title: string
  description: string
  startDate: string
  endDate: string
  status: boolean
  htmlLink: string
  created: Date
  updated: Date
}
