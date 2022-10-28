export default interface IHolidaysCalendar {
  title: string
  description: string
  startDate: Date
  endDate: Date
}

export interface IGoogleHolidaysCalendar {
  title: string
  description: string
  startDate: string
  endDate: string
  status: boolean
  htmlLink: string
  created: string
  updated: string
}
