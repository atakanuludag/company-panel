import { useQuery } from 'react-query'
import { QUERY_NAMES } from '@/core/Constants'
import HolidaysCalendarService from '@/services/HolidaysCalendarService'

const service = HolidaysCalendarService
const queryName = QUERY_NAMES.HOLIDAYS_CALENDAR

const useHolidaysCalendarQuery = (enabled: boolean = false) =>
  useQuery([queryName], () => service.getHolidaysCalendar(), {
    enabled,
  })

export default useHolidaysCalendarQuery
