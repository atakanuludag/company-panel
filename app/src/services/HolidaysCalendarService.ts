import axios from '@/core/Axios'
import IHolidaysCalendar, {
  IGoogleHolidaysCalendar,
} from '@/models/IHolidaysCalendar'

const getHolidaysCalendar = async (): Promise<IHolidaysCalendar[]> => {
  try {
    const ret = await axios.get(`/holidays-calendar`)
    const data: IGoogleHolidaysCalendar[] = ret.data
    return data
      .filter((d) => d.status)
      .map((d) => ({
        title: d.title,
        description: d.description,
        startDate: new Date(d.startDate),
        endDate: new Date(d.endDate),
      }))
  } catch (err) {
    console.log('[HolidaysCalendarService] getHolidaysCalendar() Error: ', err)
    return []
  }
}

const service = {
  getHolidaysCalendar,
}

export default service
